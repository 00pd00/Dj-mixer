

#### Request Kubernetes Service Account creation for Vault

This is a mandatory step to onboard a new XCR Kubernetes cluster. Integrating Kubernetes to Vault helps pods running in the Kubernetes cluster (XCR Kubernetes cluster) to authenticate to XCR Vault and read secrets from a path. The below section initially provides the steps that need to be executed on the XCR EKS cluster end.

Raise an FDSOne Help Center request to create a Namespace `vault-tcx` in the Cluster. Kindly follow the steps below:

1. Open the FDSOne Help Center XCR request link:  
    [https://fdsone.atlassian.net/servicedesk/customer/portal/26/group/34/create/107](https://fdsone.atlassian.net/servicedesk/customer/portal/26/group/34/create/107)

2. Fill in the following values in the form:
    - **Summary**: Request to create a Namespace `vault-tcx` in the Cluster.
    - **Description**:
      - **Region**: `<Region in which you need EKS cluster>`
      - **Cluster Name**: `<Cluster Name received in "Request Kubernetes Cluster from XCR in the required cell">`
      - **Namespace**: `vault-tcx`
      - Request to create a Namespace `vault-tcx` in the Kubernetes Cluster `<Cluster Name received in "Request Kubernetes Cluster from XCR in the required cell">`. Also, create a service account in the `vault-tcx` namespace and provide required access for resource creation in the namespace.
    - **Severity**: P1
    - **Business unit / Segment**: DISW
    - **Product Name**: Cloud Operation
    - **FDSOne Cloud Operations**: Cloud Runtime
    - **Services**: XCR-Secrets Management
    - **Request Screenshot**:  
      ![Image](./image_8.png)

Once we get the ownership of the namespace from XCR, we can create the following resources in the `vault-tcx` namespace to move forward.

3. Create the service account `vault-token-reviewer` in `vault-tcx` Namespace

Execute the following command using Rancher or an equivalent tool:

```
kubectl apply -f - <<EOF
apiVersion: v1
kind: ServiceAccount
metadata:
  name: vault-token-reviewer
  namespace: vault-tcx
automountServiceAccountToken: false
EOF
```

**How to do this in Rancher:**
- Select the appropriate Cluster and click on the shell icon on top right corner. Once connected, you will see the "Connected" message on the bottom left corner.
- Type in the YAML file for the resource to be created.
  ![Image](./image_9.png)

Verify the created resource using Rancher or an equivalent tool.  
![Image](./image_10.png)

4. Manually create a long-lived API token for the `vault-token-reviewer` ServiceAccount in the `vault-tcx` namespace

Execute the following command using Rancher or an equivalent tool:

```
kubectl apply -f - <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: vault-k8s-auth-secret
  namespace: vault-tcx
  annotations:
    kubernetes.io/service-account.name: vault-token-reviewer
type: kubernetes.io/service-account-token
EOF
```

5. Check the secret `vault-k8s-auth-secret` details in Rancher

a. Navigate to the Rancher dashboard and select the required cluster:
![Image](./image_11.png)

b. On the left panel, navigate to **Storage > Secrets**:
![Image](./image_12.png)

c. Copy the Token and Certificate details shown below to enter into the Vault. This information is required in the next steps.
![Image](./image_13.png)

6. Raise an FDSOne Help Center Ticket to create cluster role binding of the Service Account

Open the FDSOne Help Center XCR request link:  
[https://fdsone.atlassian.net/servicedesk/customer/portal/26/group/34/create/107](https://fdsone.atlassian.net/servicedesk/customer/portal/26/group/34/create/107)

Fill in the following values in the form:
- **Summary**: Request to create Cluster Role Binding for `vault-token-reviewer` service account
- **Description**:
  - **Region**: `<Region in which you need EKS cluster>`
  - **Cluster Name**: `<Cluster Name received in "Request Kubernetes Cluster from XCR in the required cell">`
  - **Namespace**: `vault-tcx`
  - Request to create a cluster role binding for the `vault-token-reviewer` service account and provide the `system:auth-delegator` permissions as this service account token is utilized by Vault to validate the auth requests from a pod.
- **Severity**: P1
- **Business unit / Segment**: DISW
- **Product Name**: Cloud Operation
- **FDSOne Cloud Operations**: Cloud Runtime
- **Services**: XCR - Kubernetes
- **Request Screenshot**:  
  ![Image](./image_14.png)

The XCR team might ask for approval from Matt Anderson (anderson.matthew@siemens.com) or Ben Collar (benjamin.collar@siemens.com). In that situation, please write an email to Matt and Ben, and ask them to update the SNOW ticket with their approval. (This approval is valid only while onboarding dev clusters; for production, respective management should approve.)

7. The XCR team will share a text file while closing the ticket, which will have the following details:
- `kubernetes_host`
- `issuer`
- `kubernetes_ca_cert`

8. Login to the Root namespace for TCX in the Vault and create a new Secret for each cluster

Make sure HashiCorp Vault setup is completed as mentioned in the section [Vault Setup](../../Tools%20Setup/Vault%20Setup).  
Path should be `secrets/secret/xcr/<ClusterName>` as shown below:  
![Image](./image_15.png)

9. Update the below entries in the Vault with the CA certificate and Token details

Use the details captured from step 4 and the details received from the XCR team in step 6. The value of `token_reviewer_jwt` can be fetched (from Rancher) as highlighted in the image below:  
![Image](./image_16.png)  
![Image](./image_17.png)

---
