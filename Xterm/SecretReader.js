import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";
import aws4 from "aws4";
import https from "https";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));


class TCXSecretsManager {
    // Fill or get from environment
    constructor(tenantid,envtype,awsaccountid, region) {
        this.tenantId = tenantid;
        this.envType = envtype;
        this.awsaccountid = awsaccountid;
        this.region = region || "us-east-1";
        this.vaultAddr = process.env.VAULT_ADDR || "https://vaultent.emea1.co.sws.siemens.com/";
        this.vaultNamespace = process.env.VAULT_NAMESPACE || `tcx-development_ns/storm_playground/`;
        this.vaultPath = `aws_operator_read_${this.tenantId}_${this.awsaccountid}`;
        this.vaultRole = `VaultOperatorReadAccessRole-${this.tenantId}`;
        this.roleArn = `arn:aws:iam::${this.awsaccountid}:role/VaultOperatorReadAccessRole-${this.tenantId}`;
    }

    async getAssumedCreds() {
    const sts = new STSClient({ region: "us-east-1" });
    const resp = await sts.send(new AssumeRoleCommand({
        RoleArn: this.roleArn,
        RoleSessionName: "secrets-vault"
    }));
    return {
        accessKeyId: resp.Credentials.AccessKeyId,
        secretAccessKey: resp.Credentials.SecretAccessKey,
        sessionToken: resp.Credentials.SessionToken
    };
}

 getSignedIamPayload(awsCreds) {
    const action = "GetCallerIdentity";
    const service = "sts";
    const region = "us-east-1";
    const host = `sts.${region}.amazonaws.com`;
    const body = `Action=${action}&Version=2011-06-15`;

    const opts = {
        host,
        path: "/",
        service,
        region,
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body
    };

    const signed = aws4.sign(opts, awsCreds);

    // Prepare headers as a JSON object NOT as a string!
    // ONLY include headers starting with `Authorization`, `X-Amz-Date`, `X-Amz-Security-Token`, `Content-Type`, and `Host`
    let headersObject = {
        "Authorization": signed.headers["Authorization"],
        "X-Amz-Date": signed.headers["X-Amz-Date"],
        "Host": signed.headers["Host"],
        "Content-Type": signed.headers["Content-Type"]
    };
    if (awsCreds.sessionToken) {
        headersObject["X-Amz-Security-Token"] = signed.headers["X-Amz-Security-Token"];
    }

    return {
        iam_http_request_method: "POST",
        iam_request_url: Buffer.from("https://" + host + "/").toString("base64"),
        iam_request_body: Buffer.from(body).toString("base64"),
        iam_request_headers: Buffer.from(JSON.stringify(headersObject)).toString("base64"),
        role: this.vaultRole,
        header_value: this.vaultAddr // as per CLI
    };
}

 vaultLogin(payload) {
    return new Promise((resolve, reject) => {
        const uri = `${this.vaultAddr}v1/auth/${this.vaultPath}/login`;
        const req = https.request(uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Vault-Namespace": this.vaultNamespace,
            }
        }, res => {
            let data = '';
            res.on('data', d => data += d);
            res.on('end', () => {
                if (res.statusCode !== 200) {
                    reject(new Error(`Vault login failed: ${res.statusCode}\n${data}`));
                } else {
                    resolve(JSON.parse(data).auth.client_token);
                }
            });
        });
        req.on('error', reject);
        req.write(JSON.stringify(payload));
        req.end();
    });
}

readVaultSecret({ vaultAddr, vaultNamespace, vaultToken, mount, secretPath, fieldName = null }) {
    return new Promise((resolve, reject) => {
        const urlPath = `/v1/${mount}/data/${secretPath}`;
        const options = {
            hostname: vaultAddr.replace(/^https?:\/\//, '').replace(/\/$/, ''),
            path: urlPath,
            method: 'GET',
            headers: {
                'X-Vault-Token': vaultToken,
                'X-Vault-Namespace': vaultNamespace,
                'Content-Type': 'application/json'
            }
        };
        const req = https.request(options, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode !== 200) {
                    reject(new Error(`Vault secret read failed: ${res.statusCode}\n${data}`));
                } else {
                    const secretObj = JSON.parse(data);
                    const value = secretObj.data && secretObj.data.data;
                    if (fieldName) {
                        resolve(value ? value[fieldName] : undefined);
                    } else {
                        resolve(value);
                    }
                }
            });
        });
        req.on('error', reject);
        req.end();
    });
}

saveSecretDataToFile(secretData, tenantId, envType, secretKey) {
    const dirPath = path.join(__dirname, 'secrets', tenantId, envType);
    const filePath = path.join(dirPath, secretKey);

    try {
        // Ensure the directory exists
        fs.mkdirSync(dirPath, { recursive: true });

        // Check if the file already exists and ensure write permissions
        if (fs.existsSync(filePath)) {
            try {
                fs.chmodSync(filePath, 0o600); // Set write permissions temporarily
                fs.accessSync(filePath, fs.constants.W_OK);
            } catch (err) {
                if (err.code === 'EACCES') {
                    console.log(`File already exists with read-only permission: ${filePath}`);
                    return filePath;
                }
            }
        }
        // Write the secret data to the file
        fs.writeFileSync(filePath, secretData, 'utf8');

        if (fs.existsSync(filePath)) {
            fs.chmodSync(filePath, 0o400);
        } else {
            console.error(`File not found: ${filePath}`);
        }
        console.log(`Secret data saved to ${filePath}`);
        return filePath;
    } catch (err) {
        console.error(`Failed to save secret data to file: ${err.message}`);
    }
}


async getSecrets(secretpath,secretkey,writetofile) {
    try {
        const awsCreds = await this.getAssumedCreds();

        // Optionally set to env for compatible AWS CLI calls later
        process.env.AWS_ACCESS_KEY_ID = awsCreds.accessKeyId;
        process.env.AWS_SECRET_ACCESS_KEY = awsCreds.secretAccessKey;
        process.env.AWS_SESSION_TOKEN = awsCreds.sessionToken;

        const payload = this.getSignedIamPayload(awsCreds);
        const token = await this.vaultLogin(payload);

        console.log("Vault Token:", token);

    //     const tcx_user_password = await readVaultSecret({
    //     vaultAddr: VAULT_ADDR,
    //     vaultNamespace: `${VAULT_NAMESPACE}${TENANT_ID}/${ENV_TYPE}`,
    //     vaultToken: token,
    //     mount: 'secret',
    //     secretPath: 'tcx/automation/servers/os_users',
    //     fieldName: 'tcx_user_password'
    // });
    //console.log('tcx_user_password:', tcx_user_password);

    // To get the entire secret:
    const secretData = await this.readVaultSecret({
        vaultAddr: this.vaultAddr,
        vaultNamespace: `${this.vaultNamespace}${this.tenantId}/${this.envType}`,
        vaultToken: token,
        mount: 'secret',
        secretPath: secretpath,
        fieldName: secretkey
        // fieldName not needed
    });
    if(writetofile){
        return this.saveSecretDataToFile(secretData, this.tenantId, this.envType, secretkey);
    } else {
        console.log('Secret Data:', secretData);
        return secretData;
    }

    } catch (e) {
        console.error("Vault login error:", e);
    }
}

}

export default TCXSecretsManager;