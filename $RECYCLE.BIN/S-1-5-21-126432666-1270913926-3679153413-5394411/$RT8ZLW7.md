# Cloning Tenant’s DSS Vault in TCX Essentials

This guide provides a step-by-step process to clone a DSS (Dataset Storage Service) vault from Teamcenter X Standard/Advanced/Premium into the TCX Essentials environment. This is useful for backups and User Acceptance Testing (UAT).

---

## Clone Tenant’s DSS Vault in TCX Essentials

### Purpose

Teamcenter X Standard/Advanced/Premium stores file data in a cloud volume, maintained by DSS and referred to as a "vault." Cloning a vault copies all its contents, enabling you to back up files or use the cloned vault in environments like UAT.

---

### Pre-requisites

> **Warning:**  
> Ensure that the FDS ticket requesting to grant account level policies for CloneVault, GetCloneVaultStatus, ShareVault, and TransferVaultOwnership operations has been resolved and the policies are attached to the SAM Operating account.

Before you start, ensure the following:

- **AWS CLI**: Installed and configured using
  ```bash
  aws configure
  ```
- **AWS Account Access**:  
  The required AWS account must have permissions to access  
  ```
  arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD
  ```
  You need a privileged caller (user) authorized to perform the vault clone operation.

- **Sample IAM Policy**:  
  Make sure your user’s policy allows cloning operations:
  ```json
  {
    "policyContent": {
      "rules": [
        {
          "effect": "Permit",
          "actions": [
            "dss:cloneVault"
          ],
          "resources": ["sws::<region>:dss::::*"]
        }
      ]
    }
  }
  ```

- **SAM Credentials**:  
  Gather the following for the user authorized to run CloneVault, GetCloneVaultStatus, ShareVault, and TransferVaultOwnership:
  
  - `DSS_ACCESS_KEY`: Access key for AWS Lambda CLI.
  - `DSS_SECRET_ACCESS_KEY`: Secret key for AWS Lambda CLI.

---

### Command Syntax, Examples, and Status Codes

You use similar syntax for Lambda CLI commands to perform operations like CloneVault, GetCloneVaultStatus, ShareVault, and TransferVaultOwnership.

#### Command Syntax

```bash
aws lambda invoke --region us-east-1 \
  --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD \
  --cli-binary-format raw-in-base64-out \
  --payload '[["<DSS_ACCESS_KEY>","<DSS_SECRET_ACCESS_KEY>","us-east-1.sws.siemens.com"],["dss","CloneVault","vaultID=<vault-id>","tags=[<tag1>=<value1>,<tag2>=<value2>]","cutOffTime=<cutoff-time>"]]' \
  cloneVaultResponse.json
```

- For **Windows**: 
  The `--payload` argument should be double-quoted and escaped:
  ```
  "[[\"<DSS_ACCESS_KEY>\",\"<DSS_SECRET_ACCESS_KEY>\", ... ]]"
  ```
- For **Linux**: 
  The `--payload` argument should be single-quoted:
  ```
  '[["<DSS_ACCESS_KEY>","<DSS_SECRET_ACCESS_KEY>", ... ]]'
  ```

#### Status Codes

 AWS lambda command returns HTTP status codes in StatusCode as shown below - <br/>
 ![alt text](image-1.png)

| Code | Description                                               |
|------|-----------------------------------------------------------|
| 200  | Ownership transferred successfully                        |
| 400  | Invalid input to transfer vault ownership                 |
| 401  | Not authenticated                                         |
| 403  | Not authorized, or vault limit exceeded                   |
| 500  | Internal error                                            |

---

### Cloning Vault

**Required Arguments:**

- `vaultID`: The identifier of the vault to clone (required)
- `tags`: Optional key-value pairs for tagging (max 10 tags)
- `cutOffTime`: Optional cutoff time in UTC (format: `2021-08-05T10:06:00.000Z`)
- Use the target account's `DSS_ACCESS_KEY` and `DSS_SECRET_ACCESS_KEY`.

You can omit tags and cutOffTime if not used.

#### Command Syntax

```bash
aws lambda invoke --region us-east-1 \
  --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD \
  --cli-binary-format raw-in-base64-out \
  --payload '[["<DSS_ACCESS_KEY>","<DSS_SECRET_ACCESS_KEY>","us-east-1.sws.siemens.com"],["dss","CloneVault","vaultID=<vault-id>","tags=[<tag1>=<value1>,<tag2>=<value2>]","cutOffTime=<cutoff-time>"]]' \
  cloneVaultResponse.json
```

**Linux Command Example:**

```bash
aws lambda invoke --region us-east-1 \
  --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD \
  --cli-binary-format raw-in-base64-out \
  --payload '[["d55914d7970d4568802971fed5103d03","BGtYEviQsD1X4TryUtUUVgwI6DCZMUmbEUQDyLUlqa4=","us-east-1.sws.siemens.com"],["dss","CloneVault","vaultID=dsl-f324f74aa2d74d638006a4b4bb179b87","tags=","cutOffTime="]]' \
  cloneOutput.json
```

**Windows Command Example:**

```powershell
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload "[[\"d55914d7970d4568802971fed5103d03\",\"BGtYEviQsD1X4TryUtUUVgwI6DCZMUmbEUQDyLUlqa4=\",\"us-east-1.sws.siemens.com\"],[\"dss\",\"CloneVault\",\"vaultID=dsl-f324f74aa2d74d638006a4b4bb179b87\",\"tags=\",\"cutOffTime=\"]]" cloneOutput.json
```

---

**Content of `cloneOutput.json`:**

After the command completes, check the contents of `cloneOutput.json` for task and vault IDs:

```json
{
    "taskId": "CloneSimpleVaultTask-472a9cfd-aae9-4ce9-8458-8b207998694d",
    "srcVaultId": "dsl-f324f74aa2d74d638006a4b4bb179b87",
    "destVaultId": "dsl-fd5241b176554688be1984439586bf9b"
}
```

---

### Checking the Status of the Cloning Task

To check the completion status, use the `taskId` and `srcVaultId` from the previous step.

#### Command Syntax

```bash
aws lambda invoke --region us-east-1 \
  --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD \
  --cli-binary-format raw-in-base64-out \
  --payload '[["<DSS_ACCESS_KEY>","<DSS_SECRET_ACCESS_KEY>","us-east-1.sws.siemens.com"],["dss","GetCloneVaultStatus","<SRC_VAULT_ID>","<TASKID>"]]' \
  cloneStatus.json
```

**Linux Command Example:**

```bash
aws lambda invoke --region us-east-1 \
  --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD \
  --cli-binary-format raw-in-base64-out \
  --payload '[["d55914d7970d4568802971fed5103d03","BGtYEviQsD1X4TryUtUUVgwI6DCZMUmbEUQDyLUlqa4=","us-east-1.sws.siemens.com"],["dss","GetCloneVaultStatus","dsl-f324f74aa2d74d638006a4b4bb179b87","CloneSimpleVaultTask-472a9cfd-aae9-4ce9-8458-8b207998694d"]]' cloneStatus.json
```

**Windows Command Example:**

```powershell
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload "[[\"d55914d7970d4568802971fed5103d03\",\"BGtYEviQsD1X4TryUtUUVgwI6DCZMUmbEUQDyLUlqa4=\",\"us-east-1.sws.siemens.com\"],[\"dss\",\"GetCloneVaultStatus\",\"dsl-f324f74aa2d74d638006a4b4bb179b87\",\"CloneSimpleVaultTask-472a9cfd-aae9-4ce9-8458-8b207998694d\"]]" cloneStatus.json
```

**Content of `cloneStatus.json`:**

Review `cloneStatus.json` to confirm completion.  
A successful response appears as:

```json
{
    "taskId": "CloneSimpleVaultTask-472a9cfd-aae9-4ce9-8458-8b207998694d",
    "srcVaultId": "dsl-f324f74aa2d74d638006a4b4bb179b87",
    "destVaultId": "dsl-fd5241b176554688be1984439586bf9b",
    "status": "Completed",
    "totalFiles": 1148,
    "totalSize": 384952772,
    "creationDate": "2024-04-03T17:33:31.395Z",
    "elapsedTime": "00:01:04.211",
    "attempts": 0
}
```

When `status` is `Completed`, the cloning task has finished. The response also shows total files and total size. Cloning may take several minutes for larger vaults.
