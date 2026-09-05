### Allowlist TcX Tenant Administrative Account for Sharing XCR Kubernetes Cluster VPC Endpoint Service

#### Steps to Allowlist VPC Endpoint Service

1. **Purpose**  
    To connect with XCR Kubernetes cluster ingress endpoints, use the VPC Endpoint Service as per the reference architecture.

2. **Request Sharing**  
    Open the [Image](https://fdsone.atlassian.net/servicedesk/customer/portal/26/group/34/create/107).  
    Fill in the form with the following values:
    - **Summary**: TcX Tenant AWS Account `<TcX Tenant AWS Account Id>` for VPC Endpoints
    - **Description**:
      - **Region**: `<Region in which you need EKS cluster>`
      - **Cluster Name**: `tcx<Your org/team short-name>`
      - **Namespace**: `prd-*`, `dev-*`, `uat-*`
      - **Details**: Request to share VPC Endpoint Service of all TcX Clusters with AWS Account `<TcX Tenant Administrator AWS Account Id>`.
    - **Severity**: P1
    - **Business Unit / Segment**: DISW
    - **Product Name**: Cloud Operation
    - **FDSOne Cloud Operations**: Cloud Runtime
    - **Services**: XCR-Kubernetes

    Attach a screenshot of the request:  
    ![Image](./image_70.png)

Once the request is submitted, coordinate with XCR team for the status & follow-up. Provide additional information if required.