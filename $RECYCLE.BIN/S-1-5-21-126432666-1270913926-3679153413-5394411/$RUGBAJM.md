#### Get the Tenant CIDR Range

To establish the connection between the XCR Kubernetes cluster and TcX Tenant VPC Resources, a TcX Tenant VPC needs to be created using IP Addresses provided by XCR. This IP Address CIDR is referred to as the TcX Tenant VPC CIDR block, which is configured in the Subcell definition of the TcX Automation Pipeline.  

While onboarding a new TcX Administrative AWS Account, the TcX Tenant VPC CIDR is required to be decided and configured in Subcell. This TcX Tenant VPC CIDR will determine the number of tenants you can onboard to that AWS Account. Reach out to the TcX Cell Administrative Account owner deployops.tc.lcs.disw@internal.siemens.com to get a Tenant VPC CIDR block for your new TcX Tenant Administrative Account.
