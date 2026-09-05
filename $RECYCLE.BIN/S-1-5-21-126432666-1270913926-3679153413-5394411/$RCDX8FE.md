
> **Note:** For manual indexing, customers should provide a list of item IDs (products or top-level items) to CAPS. The CAPS admin will then use the `tcc` command to index each structure as described in the section on executing Teamcenter ITK Utilities in a containerized environment.

## Indexing after a data load operation

Typically, indexing of the data will be taken care of post data load, as the indexer pod is running in sync mode. When data load is performed with an option to preserve the creation dates of the data being loaded, the imported objects can have creation dates in the past. In this scenario, the sync indexer will not index these objects. To handle this scenario, the following steps need to be performed after data load:

1. Stop the sync indexer pod as per instructions in section [Shutdown and restart workloads](./030_Shutdown%20and%20restart%20workloads.md) with the workload as "Teamcenter FTS indexer".
2. Modify `<EFS-volume-mount>/deploy/component/config/TcFTSIndexer/conf/TcFtsIndexer_objdata.properties` to specify the start and end time for the uploaded data.

    ![EFS volume mount example](./img_241.png)

    > **Note:** Refer to the above image for guidance on how to modify the start time and end time in the properties file.
3. Index data by running the following indexing utilities using the `tcc` command as per instructions in section [Executing Teamcenter ITK Utilities in a containerized environment](./020_Executing%20Teamcenter%20ITK%20Utilities.md#executing-teamcenter-itk-utilities-in-a-containerized-environment):
    ```bash
    tcc exec '$TC_ROOT/TcFTSIndexer/bin/runTcFTSIndexer.sh -task=objdata:index'
    ```
4. Auto indexing executes saved queries listed under the `QSEARCH_filter_queries_by_product_path` preference and marks all such products as requested for Smart Discovery index. If this is needed, the below command should be run in a new shell since this is a blocking call. The command reruns at an interval of 360 seconds:
    ```bash
    tcc exec '$TC_ROOT/TcFTSIndexer/bin/runTcFTSIndexer.sh -task=discovery:create -product=#autoindex# -interval=360'
    ```
5. Restart the sync indexer pod as per instructions in section [Shutdown and restart workloads](./030_Shutdown%20and%20restart%20workloads.md) with the workload as "Teamcenter FTS indexer".

### Smart Discovery Index in Teamcenter relational database

This index requires either a Teamcenter saved query or a human to identify which Items in their database are top-levels of product structures that need to be indexed. Therefore, this can be done by one of two mechanisms:

#### Manual Indexing of each Structure

A customer provides a list of item IDs of products or top-items to CAPS. A CAPS admin then invokes the following indexing utility to index each structure requested using the `tcc` command as per instructions in section [Executing Teamcenter ITK Utilities in a containerized environment](./020_Executing%20Teamcenter%20ITK%20Utilities.md#executing-teamcenter-itk-utilities-in-a-containerized-environment):
```bash
tcc exec '$TC_ROOT/TcFTSIndexer/bin/runTcFTSIndexer.sh -task=discovery:create -product=<item_id of one product>'
```

#### Auto-Indexing

If the customer deployment is such that a Teamcenter saved query can be created to index all products, then a recurring task can be created to automatically index all products.

1. Create a saved query in **Query Builder** that finds all products in the database (e.g., if the user has a specific item type for products or top-level items, or if they have a naming convention or a special attribute on items to denote they are top-level or product Items, then a saved query may be written by CAPS).
    - It is critical to ensure that this Saved Query(s) returns Item IDs with **NO user input**. The system will be performing this query and cannot provide any inputs.
    - Make sure **User Entry L10N Key** & **User Entry Name** have empty values.
2. Populate the following preference with the name of the saved query (or queries):
    ```
    QSEARCH_products_to_index_saved_queries
    ```
3. Set up this recurring command to execute on an interval. It will automatically pick up products and index them every 360 seconds (or as desired). Instructions to execute a utility using the `tcc` command are detailed in section [Executing Teamcenter ITK Utilities in a containerized environment](./020_Executing%20Teamcenter%20ITK%20Utilities.md#executing-teamcenter-itk-utilities-in-a-containerized-environment):
    ```bash
    tcc exec '$TC_ROOT/TcFTSIndexer/bin/runTcFTSIndexer.sh -task=discovery:create -product=#autoindex# -interval=360'
    ```
