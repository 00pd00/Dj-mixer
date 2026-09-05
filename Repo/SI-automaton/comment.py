# import requests

# # ── Configuration ──────────────────────────────────────────
# POLARION_URL = "https://mypolarion.industrysoftware.automation.siemens.com/polarion"
# BEARER_TOKEN = "eyJraWQiOiIyNTM0YWNkNi05MjdhMTZlNi01YmU2NzliNC1mM2NiMDE5MiIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJ6MDA1Njk2diIsImlkIjoiNzY4MmY4MGQtMGE5NDJmMjctMTQwOGM1Y2EtZDJiODIzYWIiLCJleHAiOjE3Nzk0NzQ2MDAsImlhdCI6MTc3NTgwOTc4N30.j4QnJFdtk6BCSEvpAHG2OCRVEYFDlWyustcuPGv5o7vw4iAtbyqBuYQtG8sVR_ndUyGn3_cnlD0pyQ7xUkSMUSll6ikYodInWKEfbEZJrHsOah2vXi7ySgvtzGmOB0_tcOLeB9QM5mPj3fXyh2by8_1svFWQ-PTqPfH16d1CysR433_5PrcY4A0vT8I09AD-mytMm6WWfVrFckRT3u-2_-0ZuQ8UgDw0BBm7fTyxZfa99oL1rtgWl8ou_oWZh1OotrA9mQqhXhEWUzBYntf_xEvZ_L2GspKhfimdNihsv7QYQudrejT5Ipqv2I0A_TRUbvQftfTg9-POwHnZ2WNM-A"
# PROJECT_ID   = "Teamcenter"
# WORK_ITEM_ID = "LCS-1334071"
# COMMENT_TEXT = "This is my comment added via API."
# # ───────────────────────────────────────────────────────────

# headers = {
#     "Authorization": f"Bearer {BEARER_TOKEN}",
#     "Accept":        "application/json",
#     "Content-Type":  "application/json"
# }

# # ── Add Comment ─────────────────────────────────────────────
# url = (
#     f"{POLARION_URL}/rest/v1/projects/{PROJECT_ID}"
#     f"/workitems/{WORK_ITEM_ID}/comments"
# )

# payload = {
#     "data": [
#         {
#             "type": "workitem_comments",
#             "attributes": {
#                 "text": {
#                     "type": "text/html",
#                     "value": f"<p>{COMMENT_TEXT}</p>"
#                 }
#             }
#         }
#     ]
# }

# response = requests.post(url, headers=headers, json=payload)

# if response.status_code in (200, 201):
#     print(f"✅ Comment added successfully to {WORK_ITEM_ID}!")
# else:
#     print(f"❌ Failed to add comment! Status: {response.status_code}")
#     print(response.text)