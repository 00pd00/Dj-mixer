# Post Deployment Steps for Visual Part Search on TCX Azure

===================================================

## Install NX in DC windows server

NX needs to be installed on the Dispatcher client windows machine.

> ✅ NX release should be NX 2506.4000, NX 2506.4001 or NX 2506.6001 onwards because Part Image extractor are available in this version.

Please refer this link - [NX Installation Steps](https://mypolarion.industrysoftware.automation.siemens.com/polarion/#/project/Teamcenter/wiki/Project%20Storm/cTcX%20CookBook%202506)


## Create Knowledge Base

### 1. Create Saved Search for UGMASTER Datasets

Create a **Saved Search** where the dataset type is set to `UGMASTER`.  
Below is an example where a saved search named **"NX_parts_1"** is created.

![Saved Search Creation Step 1](../image_115.png)  
![Saved Search Creation Step 2](../image_116.png)

### 2. Update the `TC_AI_NX_KNOWLEDGE_BASES` Preference

Update the preference `TC_AI_NX_KNOWLEDGE_BASES` with the saved search details.

### **Format:**
`<UGMASTER knowledge base name>;<UGMASTER Saved Search name>:<username>`


- **UGMASTER knowledge base name** – A name that represents the kind of UGMASTER parts grouped under the saved search.
- **Saved Search name** – Name of the saved search you created (e.g., `NX_parts_1`).
- **Username** – The Teamcenter username of the user who created the saved search.

Example:
NX_Parts_KB:NX_parts_1;infodba


![Preference Update Screenshot](../image_117.png)

---

You can repeat the above steps to create and register multiple UGMASTER knowledge bases for different categories of NX parts.


## Embed UGMASTER datasets

### 1. Run the objdata:embed-image.

embed UGMASTER dataset by running the following indexing utilities using the tcc command as per instructions in section [Executing Teamcenter ITK Utilities in a containerized environment](https://ctcx.code.siemens.io/cookbook/docs/2506/Documentation/Operations/Day%20N%20Operations/Executing%20Teamcenter%20ITK%20Utilities#executing-teamcenter-itk-utilities-in-a-containerized-environment):

```bash
. tcc set_context <tenant_id> <env_id>
tcc exec '$TC_ROOT/TcFTSIndexer/bin/runTcFTSIndexer.sh -task=objdata:embed-image'
```

# Use case

===================================================

## Visual Part Search

- AWC Home Page

![Part Search](../image_122.png)

- Upload Image 

Supported Input Images - .jpg, .jpeg, .png

![Part Search](../image_123.png)

- Search Result

![Part Search](../image_124.png)
