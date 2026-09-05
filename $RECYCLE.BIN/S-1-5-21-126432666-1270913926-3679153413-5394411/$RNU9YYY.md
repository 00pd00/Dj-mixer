# Shared Resources (OpenAI and AI Vision) Managed by Zeus Team

This section describe the configurations needed to get the shared resources( AI Vision and Open AI ) configuration managed by the Zeus Team.

## Pre-requisite

### 1. Azure Secret Engine Configuration in HC Vault

Ensure that the **Azure Secret Engine** is configured in the HC Vault (e.g., `tcx-ai-preprod-eus-ai-secrets` for dev environment).
Namespace in prod HC Vault - dry-run (caps-tcx-nonproduction_ns) and production (caps-tcx-production_ns).

If Azure secret engine not configured in HC Vault, **please contact the Zeus Team ( zeusops.sisw@siemens.com )**.

> ⚙️ This Azure Secret Engine is set up with a Service Principal (SP) that has access to the Azure Key Vault in the **AI Azure subscription**.

![HC Vault Secret Engine](../image_101.png)

---

### 2. Required Environment Variables in `tcx-pipeline-variables`

Verify that the **AI Azure-related environment variables** are present in the `cell variables` file in the **`tcx-pipeline-variables`** repository.  
If these variables are missing, please add below global variables for region in cell variables file 

#### Required variables and corresponding values per region per environment

Env | Region | GLBL_AI_AZ_VAULT_AZURE_SECRET_ENGINE | GLBL_AI_AZ_VAULT_AZURE_KEYVAULT_ROLE | GLBL_AI_AZ_KEYVAULT_NAME | GLBL_AI_AZ_LLM_PROVIDER_SECRET_NAME | GLBL_AI_AZ_VISION_SECRET_NAME
--------------|-------------|---------|---------|---------|---------|---------|
dev | All | tcx-ai-preprod-eus-ai-secrets | KeyVaultSecretsUser | tcx-ai-preprod-eus-kv | tcx-ai-preprod-eus-openai1-config | tcx-ai-preprod-eus-vision1-config
CApS prod | EastUS | tcx-ai-prod-eus-ai-secrets-prod | KeyVaultSecretsUser | tcx-ai-prod-eus-kv | tcx-ai-prod-eus-openai1-config | tcx-ai-prod-eus-vision1-config
CApS dryrun | EastUS | tcx-ai-prod-eus-ai-secrets-dryrun | KeyVaultSecretsUser | tcx-ai-prod-eus-kv | tcx-ai-prod-eus-openai1-config | tcx-ai-prod-eus-vision1-config
CApS prod | GermanyWestCentral | tcx-ai-prod-gwc-ai-secrets-prod | KeyVaultSecretsUser | tcx-ai-prod-gwc-kv | tcx-ai-prod-gwc-openai1-config | tcx-ai-prod-gwc-vision1-config
CApS dryrun | GermanyWestCentral | tcx-ai-prod-gwc-ai-secrets-dryrun | KeyVaultSecretsUser | tcx-ai-prod-gwc-kv | tcx-ai-prod-gwc-openai1-config | tcx-ai-prod-gwc-vision1-config

Note: If global variable values are missing for your region in above table **please contact the Zeus Team ( zeusops.sisw@siemens.com )**.

---
