# Transfer Cloned Vault Ownership

This guide walks you through sharing a cloned DSS vault and transferring its ownership to a target account or user in Teamcenter X environments.

---

## Pre-requisites

> **Warning:**  
> Ensure that the FDS ticket requesting to grant account level policies for CloneVault, GetCloneVaultStatus, ShareVault, and TransferVaultOwnership operations has been resolved and the policies are attached to the SAM Operating account.

- **Privileges:**  

  You need authorization to perform CloneVault, GetCloneVaultStatus, ShareVault, and TransferVaultOwnership operations.

- **IAM Policy Example:**

  ```json
  {
    "policyContent": {
      "rules": [
        {
          "effect": "Permit",
          "actions": ["dss:*"],
          "resources": ["sws::<region>:dss::::*"]
        }
      ]
    }
  }
  ```

- **SAM Credentials:**  
  - `SAM_ACCESS_KEY` and `SAM_SECRET_ACCESS_KEY` for a user authorized to run vault-related commands.

---

### Share the Cloned Vault

Share the cloned vault with the target account or user.

**Arguments:**

- `vaultID` (required): Cloned vault identifier.
- `description` (optional): Policy description (max 256 characters).
- `rule` (required): Policy rule to grant access.

**Example PolicyRule:**

- `effect`: `"Permit"` (allows access)
- `subjects`: List of accounts or user ARNs to be given access
- `actions`: Actions allowed, e.g., `"dss:*"`

**Linux Command Example:**

```bash
aws lambda invoke --region us-east-1 \
  --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD \
  --cli-binary-format raw-in-base64-out \
  --payload '[["d55914d7970d4568802971fed5103d03","BGtYEviQsD1X4TryUtUUVgwI6DCZMUmbEUQDyLUlqa4=","us-east-1.sws.siemens.com"],["dss","ShareVault","vaultID=dsl-fd5241b176554688be1984439586bf9b","description=Vault Sharing", "rule=[effect=Permit,subjects=[urn:siemens:sam:aeadcfcec8a6490fb15addafd057bc30],actions=[dss:*]]","tags="]]' shareOutput.json
```

**Windows Command Example:**

```powershell
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload "[[\"d55914d7970d4568802971fed5103d03\",\"BGtYEviQsD1X4TryUtUUVgwI6DCZMUmbEUQDyLUlqa4=\",\"us-east-1.sws.siemens.com\"],[\"dss\",\"ShareVault\",\"vaultID=dsl-fd5241b176554688be1984439586bf9b\",\"description=Vault Sharing\", \"rule=[effect=Permit,subjects=[urn:siemens:sam:aeadcfcec8a6490fb15addafd057bc30],actions=[dss:*]]\",\"tags=\"]]" shareOutput.json
```

Check the output status code in the command line for success.

**Content of `shareOutput.json`:**

```json
{
    "policyId": "3bf2695cccdc485999895fc14c51b190"
}
```

---

### Takeover Ownership of Shared Vault

After sharing, transfer the vault ownership to the target account.

**Arguments:**

- `vaultID` (required): Identifier of the shared (cloned) vault.
- Use the target account's `DSS_ACCESS_KEY` and `DSS_SECRET_ACCESS_KEY`.

**Linux Command Example:**

```bash
aws lambda invoke --region us-east-1 \
  --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD \
  --cli-binary-format raw-in-base64-out \
  --payload '[["34b38676a0eb4fa1957729fd00443e05","9LsVZcGfb/TRxnylsio2MWJN4Veuu/hjgJ3UyoOTzao=","us-east-1.sws.siemens.com"],["dss","TransferVaultOwnership","dsl-fd5241b176554688be1984439586bf9b"]]' transfervaultOutput.json
```

**Windows Command Example:**

```powershell
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload "[[\"34b38676a0eb4fa1957729fd00443e05\",\"9LsVZcGfb/TRxnylsio2MWJN4Veuu/hjgJ3UyoOTzao=\",\"us-east-1.sws.siemens.com\"],[\"dss\",\"TransferVaultOwnership\",\"dsl-fd5241b176554688be1984439586bf9b\"]]" transfervaultOutput.json
```

Check the output status code in the command line for success.

**Content of `transfervaultOutput.json`:**

```text
200
```

A status code of `200` means the transfer was successful.
