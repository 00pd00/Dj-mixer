# Post Deployment Steps for Natural Language Search

This guide provides the structured steps to configure and enable **Natural Language Search** on **TCX** after deployment.

---
## Pre-requisite 

Retreive the 'infodba' password from Vault Secret Engine 

1. Log in to Vault UI
2. Navigate to `secret/tcx/teamcenter/common/users` at the tenant namespace level
3. Copy the secret for `infodba` (This will be used in the step when executing the bmide model tool)

---

## Step 1 – Generate the Dataset File

Run the **`tcc exec`** command to generate the file `TC_EMBED_SCHEMA_DELTA_NEW.xml` in the **FTSIndexer Files Dataset**.

Run the **bmide_modeltool** using the `tcc` command, as explained in:  
[Executing Teamcenter ITK Utilities in a containerized environment](https://ctcx.code.siemens.io/cookbook/docs/2506/Documentation/Operations/Day%20N%20Operations/Executing%20Teamcenter%20ITK%20Utilities#executing-teamcenter-itk-utilities-in-a-containerized-environment)

```bash 

. tcc set_context <tenant_id> <env_id>

. tcc exec "bmide_modeltool.sh -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -tool=tc_embed_schema_gen -mode=install -target_dir=/apps/tc/TD -model_file=/apps/tc/TD/model/model.xml" 
```

---

## Step 2 – Verify successful upload of file to FTSIndexer Dataset 

1. Login to AW client, change workspace to `Default` 

2. Perform an `Advanced Search` based on `Dataset Name` 

![Advanced Search](image_201.png)

> ✅ Verify that the FTSIndexer Files Dataset has the file **TC_EMBED_SCHEMA_DELTA_NEW.xml** in **References** 

---

## Step 3 – Run Embed Schema Flow

### 1. Stop the sync indexer 
Stop sync pod as per instructions in section [Shutdown and restart workloads](https://ctcx.code.siemens.io/cookbook/docs/2506/Documentation/Operations/Day%20N%20Operations/Shutdown%20and%20restart%20workloads) with the workload as "Teamcenter FTS indexer". 

### 2. Embed the schema file 
The **embedschema** flow can be executed by running the following indexing utilities using the tcc command as per instructions in section [Executing Teamcenter ITK Utilities in a containerized environment](https://ctcx.code.siemens.io/cookbook/docs/2506/Documentation/Operations/Day%20N%20Operations/Executing%20Teamcenter%20ITK%20Utilities#executing-teamcenter-itk-utilities-in-a-containerized-environment):

To execute the embedschema flow, run the following command:

```bash
tcc exec '$TC_ROOT/TcFTSIndexer/bin/runTcFTSIndexer.sh -task=objdata:embedschema'
```

### 3. Restart the sync indexer pod
 Restart sync as per instructions in section [Shutdown and restart workloads](https://ctcx.code.siemens.io/cookbook/docs/2506/Documentation/Operations/Day%20N%20Operations/Shutdown%20and%20restart%20workloads) with the workload as "Teamcenter FTS indexer". 

---

## Step 4 – Update Preferences in Active Workspace

1. Enter a list of internal names of specific object types to which natural language search should match in the `TC_AI_natural_language_supported_type_names` preference. **If this preference is not defined, natural language search matches to all indexable object types.**

2. _(Optional)_ Define the number of object types in which natural language search matches to provide results in the `TC_AI_natural_language_max_types` preference. Increasing this value from the default may impact search performance

3. _(Optional)_ You can change the minimum similarity score between the search criteria entered and the available object types that must be met to find a match in the `TC_AI_natural_language_threshold` preference.

---

## Use case 

1. Login to AW client, change workspace to `Default`  

2. Ensure that you have clicked on the Natural Language Search Toggle Button (highlighted in green), and enter the prompt in the search bar. 

> _Example Prompt : Find all items owned by me_

![NLS](image_202.png)


