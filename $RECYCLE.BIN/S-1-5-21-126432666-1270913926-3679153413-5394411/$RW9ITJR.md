**tcx-pipeline-account pipeline : manage-bootstrap-rg stage fails with invalid credentials issue**  

**Issue Description**:

Pipeline fails in manage-bootstrap-rg stage with invalid credentials .
TASK [Configure Bootstrap Storage Account]  

![Image](./image_500.png) 

Pointers to verify : 

1. Login to vault using Root token .
2. Perform command 
   > vault read auth/jwt_v2/role/tcx-deploy 

3. Analyze the value of "token_explicit_max_ttl"

Expected value : 6h   # This resolves to 6 hours 

4. Steps to update the value if not as expected 


a. Create the tcx-deploy-role.json file and save it inside the folder where you extracted the Vault zip download (e.g., vault_1.17.6_windows_amd64_7). 
   
Contents of the file 
```json
  {
    "role_type": "jwt",
    "policies": ["tcx/vault-integration"],
    "token_explicit_max_ttl": 6h,
    "user_claim": "namespace_id",
    "bound_claims": {
      "namespace_path": ["tcx-deploy"]
    },
  "bound_audiences": ["<<VAULT_ADDR>>"]
  }

b. Launch a bash shell and navigate to the directory where you extracted the Vault zip 

c. Update the token_explicit_max_ttl 
   
   - vault write auth/jwt_v2/role/tcx-deploy @tcx-deploy-role.json

d. Once a success message then hit the read command to check updated values 

   - vault read auth/jwt_v2/role/tcx-deploy   

![Image](image_495.png)