TcX uses XCR Kubernetes Clusters (powered by AWS EKS/Azure AKS) to launch its containerized components. XCR Kubernetes Clusters are present in several regions (us-east-1, eu-central-1). Criteria to request a cluster are captured later and could depend on the customer or geographic location.

### AWS

#### Request Kubernetes Cluster from XCR in the required cell

XCR uses FDSOne Help Center (an Atlassian ticketing tool) for attending all requests & incidents. Kindly follow the steps below to request a Kubernetes Cluster for TcX deployment.

Open FDSOne Help Center XCR request link: [https://fdsone.atlassian.net/servicedesk/customer/portal/9/group/105/create/188](https://fdsone.atlassian.net/servicedesk/customer/portal/9/group/105/create/188)

Fill in the following values in the form:

- **Summary**: New Cluster Onboarding Request  
- **Request Type**: Cluster Onboarding Request  
- **Team Name**: Cloud Application Service  
- **Primary Contact Email**: `<Add the email of your Manager/Scrum Master>`  
- **Description**: Add description, as part of onboarding a particular org/team. Also, please make sure the cluster can connect with XCR Vault ([Vault URL](https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com/ui/vault/)).  
    Consider the below properties for reference:  
    - **Region**: `<Region in which you need EKS cluster>`  
    - **Cluster Name**: `tcx<Your org/team short-name>`  
    - **Namespace**: `prd*`, `dev*`, `uat*`  
- **Once cluster is created, provide the following information before closing the request**:  
    - Cluster Name  
    - Cluster VPC CIDR  
    - Cluster support Istio-based deployment (yes/no)  
    - VPC Endpoint Service DNS  
    - Rancher Cluster Project ID  
    - Rancher Project ID  
    - AZ IDs of the cluster VPC with AZ name of respective AZ IDs.  
- **Cloud**: AWS
- **Architecture**: AMD64   
- **AWS Region**: `<Region in which you need EKS cluster to be in>`  
- **Cluster Type**: Dedicated  
- **Release Type**: Pre-Prod  
- **Size**: `<Choose the size as per the requirement>`    
- **Keycloak Group Name**: 
    - For Development: `rancher-tcx-dev-users`
    - For Production:
        - User group: `caps-tcx-production-users`
        - Admin group: `caps-tcx-production-admin`
- **Connectivity**: Proxied
- **Proxied Account Type**: Client Private Link
- **AWS Account ID**: `<Account ID of the AWS Account>`
- Let the other fields be empty.  

**Request Screenshot**:  
![Image](./image_3.png)

Once the request is submitted, coordinate with the XCR team for the status & follow-up. Provide additional information if required.

---

#### Ensure Cluster is enabled for CRD (Only for developers)

All new clusters are by default enabled for Custom Resource Definition (CRD). For clusters where CRD is not enabled, create `config.json` under the respective cluster folder and respective CRD operator.

1. **fqdnnp-operator CRD**  
     Example: For cluster `aws-usea1-tcx-preprod05`, for `fqdnnp-operator` CRD, create the below `config.json` and submit the MR.  
     Please note the name of the app should be less than 50 characters.  

     ```json
     {
         "app": {
             "name": "aws-usea1-tcx-preprod05-fqdnnp-operator",
             "source": "https://gitlab.industrysoftware.automation.siemens.com/gitops/xcr-crds/tcx.git",
             "revision": "main",
             "path": "fqdnnp-operator",
             "clustername": "aws-usea1-tcx-preprod05",
             "namespace": "tcx-cluster-fqdnnp-operator"
         }
     }
     ```

     **Image to show the folder structure for CRD (fqdn-operator):**  
     ![Image](./image_5.png)

2. **tcx-cluster-resources CRD**  
     Example: For cluster `aws-usea1-tcx-preprod05`, for `tcx-cluster-resources` CRD, create the below `config.json` and submit the MR.  
     Please note the name of the app should be less than 50 characters.  

     ```json
     {
         "app": {
             "name": "aws-usea1-tcx-preprod05-cluster-resources",
             "source": "https://gitlab.industrysoftware.automation.siemens.com/gitops/xcr-crds/tcx.git",
             "revision": "main",
             "path": "tcx-cluster-resources",
             "clustername": "aws-usea1-tcx-preprod05",
             "namespace": "tcx-cluster-resources"
         }
     }
     ```

     **Image to show the folder structure for CRD (tcx-cluster-resources):**  
     ![Image](./image_6.png)

---