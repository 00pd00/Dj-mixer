# Datamodel Schema Mapping

1. If there are any data model differences between TCX Essentials and TCX Premium, the object types and their properties must be mapped accordingly for the data to be transferred between them.


    If the data model changes are limited to Cad0Design to VER4NX(as in below), then download the xslt from the below location and provide it as input to the tcxml_export commands

    You can download the XSLT file here: [Download XSLT file](TCXE_Cad0Design_VER4NX.xslt?inline=false)

    ```NOTE: This XSLT is generated based on the data model mappings shown below. If any changes are required beyond these mappings, the XSLT should be updated accordingly before use```

        Element Renames
            Cad0Design → VER4NX
            Cad0DesignRevision → VER4NXRevision
            Cad0DesignMasterS → VER4NXMasterS
            Cad0DesignRevMasterS → VER4NXRevMasterS

        Attribute value change mapping for Cad0Design elements

            object_class="Cad0Design" → object_class="VER4NX"
            object_type="Cad0Design" → object_type="VER4NX"

        Attribute value change mapping for Cad0DesignRevision elements

            object_class="Cad0DesignRevision" → object_class="VER4NXRevision"
            object_type="Cad0DesignRevision" → object_type="VER4NXRevision"

        Attribute value change mapping for Master elements

            object_type="Cad0DesignMaster" → object_type="VER4NXMaster"
            object_class="Cad0DesignMasterS" → object_class="VER4NXMasterS"
            object_type="Cad0DesignMasterS" → object_type="VER4NXMasterS"
            object_type="Cad0DesignRevisionMaster" → object_type="VER4NXRevisionMaster"
            object_class="Cad0DesignRevMasterS" → object_class="VER4NXRevMasterS"
            object_type="Cad0DesignRevMasterS" → object_type="VER4NXRevMasterS"

        Attribute Renaming

            Cad0DesignRevision 
                cad0Class       →   ver4_class
                cad0Cost        →   ver4_cost
                cad0Hardness    →   ver4_Hardness
                cad0MakeOrBuy   →   ver4_make_buy
                cad0Material    →   ver4_material
                cad0PartNumber  →   ver4_part_number 
                cad0Process     →   ver4_process
                cad0SystemCode  →   ver4_system_code

2. Copy the xslt to workdir location. Example: tcxlite2tcx/tcxlite/schema_mapping
3. Provide necessary permissions
    ```bash
        sudo chmod 755 tcxlite2tcx/tcxlite/schema_mapping/* --recursive 
    ```

