###### Export Object IDs from Azure Entra

###### 1. Export Entra Object IDs

By executing the script below, the object ID for the following variable will be exported to your `0_cell_env_vars.sh` file:

1. CLUSTER_MANAGED_IDENTITY_OBJECT_ID

Run the following commands:

```bash
./13_fetch_az_object_ids.sh
```