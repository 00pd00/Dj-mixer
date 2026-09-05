## Automation Pipeline Terminology

- **Cell**: A unit of grouping that consists of the following:
    - AWS region
    - CIDR block
    - Cluster account
    - Cluster name

- **Cloud**: Represents an account in pipeline terms.

- **Stream**: Pipeline variables used to differentiate deployment streams. Originally designed for "customer" and "internal" but can be utilized in other ways. The "domain" concept is most likely implemented by a stream.

- **Env Type**: A value used to distinguish the "type" of deployment within a specified tenant (e.g., `prd`, `uat`, `dev`).
    - Env type is currently just a value and does not impact other deployment properties.
    - Env type does **not** drive any behavior in the deployment pipeline.
    - It is valid to have a customer "dev" env type just as easily as an internal "prd" env type.
