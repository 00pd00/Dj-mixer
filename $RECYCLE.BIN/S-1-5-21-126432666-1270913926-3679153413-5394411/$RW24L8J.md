## Modify DB parameters for performance tuning

1. Aurora 

| Parameter | Scope | Apply type | Suggested values by APA labs |
|-----------|-------|------------|---------------------------|
| max_locks_per_transaction | instance | Static | 6400 |
| shared_buffers | instance | Static | 1048576 |
| max_connections | instance | Static | 1024 |
| temp_buffers | instance | Dynamic | 262144 |
| work_mem | instance | Dynamic | 131072 |
| synchronous_commit | cluster | Dynamic | off |

2. Oracle

| Parameter | Scope | Recommended value |
|-----------|-------|------------------|
| commit_logging | instance | BATCH |
| commit_wait | instance | NOWAIT |
| cursor_sharing | instance | EXACT |
| db_block_checksum | instance | FALSE |
| db_cache_size | instance | 0 |
| db_file_multiblock_read_count | instance | 0 |
| dml_locks | instance | 1024 |
| java_pool_size | instance | 0 |
| large_pool_size | instance | 0 |
| log_checkpoint_interval | instance | 0 |
| log_checkpoint_timeout | instance | 1800 |
| open_cursors | instance | 1024 |
| optimizer_dynamic_sampling | instance | 2 |
| optimizer_index_caching | instance | 95 |
| optimizer_index_cost_adj | instance | 10 |
| query_rewrite_enabled | instance | TRUE |
| query_rewrite_integrity | instance | TRUSTED |
| recyclebin | instance | ON |
| session_cached_cursors | instance | 1024 |
| shared_pool_size | instance | 0 |
| statistics_level | instance | TYPICAL |
| streams_pool_size | instance | 0 |
| timed_statistics | instance | TRUE |
| optimizer_adaptive_plans | instance | FALSE |
| temp_undo_enabled | instance | TRUE |
| job_queue_processes | instance | 10 |
| log_checkpoints_to_alert | instance | FALSE |
| optimizer_mode | instance | ALL_ROWS |
| star_transformation_enabled | instance | FALSE |
| undo_retention | instance | 900 |
| undo_tablespace | instance | UNDOTBS1 |
| workarea_size_policy | instance | AUTO |

**Steps to Update RDS DB Tuning Parameters -**
1. Navigate to AWS RDS service.
2. Navigate to Parameter Groups:
    - In the navigation pane, click on "Parameter groups".
    - ![Image](./image_346.png)

3. **Select Parameter Group:**
    - To modify an existing parameter group, click on the parameter group from the list. The name of the parameter group will be in the following format for DB instance parameter group:
      ```
      rdsaurora-<env_type>-<customer_id>-dbparametergroup
      ```
      For Oracle:
      ```
      rdsoracle-<env_type>-<customer_id>-<timestamp>
      ```
      Format for DB cluster parameter group:
      ```
      rdsaurora-<env_type>-<customer_id>-dbclusterparametergroup
      ```
    - ![Image](./image_347.png)

4. **Edit Parameters:**
    - Click on the “Edit” button.
    - ![Image](./image_348.png)
    - Find the parameters you need to update and modify their values.
    - Click "Save changes".
    - ![Image](./image_349.png)

5. **Apply Changes:**
    - If the parameters you are modifying have an apply type as `static`, then a DB restart is needed for those parameters to come into effect. If the apply type is `dynamic`, then a DB restart is not necessary.

### Reboot DB Instance (Only if Modified Parameters are Static)

1. Navigate to the RDS service on the AWS console and click on the “Databases” option.
2. Search for the DB instance that needs to be rebooted, in the following format:
    ```
    rdsaurora-<env_type>-<customer_id>
    rdsoracle-<env_type>-<customer_id>
    ```
3. Select the DB instance and click on the “Actions” button.
4. Click on the reboot option.
    - ![Image](./image_350.png)
5. Wait for the DB instance to be rebooted and ensure that the status of the instance is `available`.
