import os
import re
import json

import boto3
import jwt
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel

# ── Config ────────────────────────────────────────────────────────────────────
JWT_SECRET     = os.environ["JWT_SECRET"]
REGION         = os.environ.get("AWS_REGION", "us-east-1")
MODEL_ID       = os.environ.get("MODEL_ID", "amazon.nova-micro-v1:0")
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "https://ctcx.code.siemens.io")
MAX_QUERY_LEN  = 300
MAX_CANDIDATES = 10
MAX_TOKENS     = 200

# ── AWS client ────────────────────────────────────────────────────────────────
# boto3 picks up credentials automatically from:
#   EC2  → IAM Instance Profile (attached to the instance)
#   ECS  → IAM Task Role        (attached to the task definition)
# No keys or secrets needed in code.
bedrock = boto3.client("bedrock-runtime", region_name=REGION)

# ── App ───────────────────────────────────────────────────────────────────────
app = FastAPI(title="Cookbook Chat Proxy")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[ALLOWED_ORIGIN],
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

# ── JWT auth ──────────────────────────────────────────────────────────────────
security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        jwt.decode(credentials.credentials, JWT_SECRET, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

# ── Request schema ────────────────────────────────────────────────────────────
class Candidate(BaseModel):
    title: str
    url: str
    breadcrumbs: list[str] = []

class ChatRequest(BaseModel):
    query: str
    candidates: list[Candidate]

# ── Prompt builder ────────────────────────────────────────────────────────────
def build_prompt(query: str, candidates: list[Candidate]) -> str:
    pages = "\n".join(
        f"{i + 1}. \"{c.title}\"  –  {' > '.join(c.breadcrumbs)}"
        for i, c in enumerate(candidates[:MAX_CANDIDATES])
    )
    return (
        "You are a documentation navigation assistant for the TCX Cookbook "
        "(Teamcenter X deployment and operations documentation).\n"
        "A user asked a question. The pages listed below were found by keyword search.\n\n"
        f"User question: {query}\n\n"
        f"Relevant pages:\n{pages}\n\n"
        "In 1–2 short sentences, tell the user which page(s) best answer their question "
        "and why. Do not invent information beyond what the page titles show. Be concise."
    )

# ── Routes ────────────────────────────────────────────────────────────────────
@app.post("/chat", dependencies=[Depends(verify_token)])
async def chat(body: ChatRequest):
    query = re.sub(r"\s+", " ", body.query).strip()[:MAX_QUERY_LEN]
    if not query or not body.candidates:
        raise HTTPException(status_code=400, detail="Missing query or candidates")

    response = bedrock.invoke_model(
        modelId=MODEL_ID,
        contentType="application/json",
        accept="application/json",
        body=json.dumps({
            "messages": [
                {"role": "user", "content": [{"text": build_prompt(query, body.candidates)}]}
            ],
            "inferenceConfig": {"maxTokens": MAX_TOKENS, "temperature": 0.1},
        }),
    )
    result  = json.loads(response["body"].read())
    ai_text = result["output"]["message"]["content"][0]["text"].strip()
    return {"message": ai_text}

@app.get("/health")
def health():
    return {"status": "ok"}
