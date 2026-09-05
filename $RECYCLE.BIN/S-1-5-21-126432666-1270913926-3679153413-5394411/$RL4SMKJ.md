#### TcX Tenant Administrative Account (AWS Account) setup

This account is used to deploy the majority of tenant-specific infrastructure (e.g., Aurora RDS Database, VPC, EFS). These infrastructure components are bundled in the Tenant VPC. The Tenant VPC is connected via Transit Gateway to the XCR Kubernetes Cluster. Follow the steps below to onboard a new TcX Tenant Administrative Account.