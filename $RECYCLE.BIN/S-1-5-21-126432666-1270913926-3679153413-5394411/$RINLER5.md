#### Ensure DB size and DB parameters settings

Database size and DB parameters were tuned during NX2506 update. Ensure the values tuned for performance is not over written during Teamcenter 2506.0003 upgrade

1. DB size should be set to **r6gd.4xlarge**
2. DB parameters setting should match the following values

| Parameter | Scope | Apply type | Suggested values by APA labs |
|-----------|-------|------------|---------------------------|
| max_locks_per_transaction | instance | Static | 6400 |
| shared_buffers | instance | Static | This value is calculated based on DB size. Formula: (Target percentage x Total RAM in GB x 1024 x 1024) / (100 x 8) It is recommended to set the Target percentage in the range 40%-50%. Example: For **r6gd.4xlarge** DB size and 50% Target percentage the value is **8388608** (50 X 128 X 1024 * 1024)/ (100 X 8) |
| max_connections | instance | Static | 1024 |
| temp_buffers | instance | Dynamic | 262144 |
| work_mem | instance | Dynamic | 131072 |
| synchronous_commit | cluster | Dynamic | off |
| random_page_cost | cluster | Dynamic | 1 |
| wal_buffers | cluster | Static | 32768 |