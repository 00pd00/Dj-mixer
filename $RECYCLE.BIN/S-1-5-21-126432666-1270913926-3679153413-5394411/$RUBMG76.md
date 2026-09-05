#### Raise FDS ticket for cluster with Private DNS Zone Integration for AI

1. Raise cluster request form at [FDS](https://fdsone.atlassian.net/servicedesk/customer/portal/9/group/105/create/188)
2. Fill in the following ticket fields:

    ```bash
    Contact us about: Product Onboarding Request  
    What can we help you with?: XCR Onboarding
    Summary: Request for [REGION] AZM new Dedicated Cluster
    Request type: Cluster Onboarding Request
    Business Unit/Segment: [Team Segment, eg DI SW LCS] 
    Client Services: All Application
    Team Name: [Your Team Name]
    Component: cluster, rancher, ArgoCD, Harbor  
    Primary Contact Email: [Your Email]

    Description:

    Below details are required as TCX has special requirements

    1. Which Region will the cluster be built in - [region, default: useast]
    2. Which ingress Controller you are looking for - Istio
    3. Node disk size: 250GB
    4. Worker nodes: 
          * Number: 50 (minimum)
          * Size: Standard_D16_v5
    5. Enable calico N/W policy:- yes
    6. Do you require vnet peering - yes
      - If yes, share below details:
        - Subscription ID: [your subscription id]
        - User group ID: [the 'Cell Provisioners' group created as part of roles and groups configuration for your subscription]

    7. Rancher onboarding details:
      - Rancher projects/namespace name: stormruntime (default)
      - Rancher Keycloak Group name (binds the groups with the cluster):
        - User group: tcx-dev
        - Admin-group: tcx-admin

    8. ArgoCD Onboarding:
      - Do you want to enable deployment of TCX CRD?: yes
      - Do you want to enable tcx-stormruntime-helm: yes
      - ArgoCD namespace pattern to whitelist in Argo deployment: uat*, dev*, prod*

    9. Harbor onboarding:
      - Do you require new Project: No

    10. Do you require Vault integration:: yes
      - Vault URL: (Prod) "https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com" / (Non-prod) "https://vaultent.emea1.co.sws.siemens.com/"
      - Do you need TCX RBAC (cluster role binding): yes

    11. Istio gateway creation with certificate:
      - Please share the cert and key files for gateway, which refer in gateway as secret. [name of existing cluster if re-using its certs OR share directly with person working on the ticket via encrypted email]

    12. Connectivity type: Proxied

    [Optional] If you are using AI Capabilities, please add the following details:
    13. Private DNS Zone Integration
      - Do you require Private DNS Zone(s): yes
      - For which Azure service(s): Azure AI Search
      - Expected Private DNS Zone name: "privatelink.search.windows.net"
      - Microsoft Entra ID Group name to grant DNS Zone Record create permission to: "<name-of-onboarding-entra-id-group>"
      - Microsoft Entra ID Group Object ID: "<object-id-of-onboarding-entra-id-group"

    Cloud: Azure
    Cluster Type: Dedicated
    Release Type: preprod (Private)
    Size: No Limit
    Keycloak Group Name: tcx-dev, tcx-admin
    Connectivity type: Private

    Expected information from XCR team after successful provisioning

    Rancher URL:
    Keycloak URL:
    Harbor URL:
    ArgoCD URL:
    Rancher Cluster Name:
    Cluster vnet CIDR:
    Rancher Cluster ID:
    Rancher Project ID:
    AVNM Network Group ID:
    Vault oidc_issuer:
    Vault KUBE_HOST:
    AKS internal-loadbalancer ip
    Cluster node manage identity id :

    [Optional] when Private DNS Zones are hosted in XCR (e.g. for AI Capabilities):
    XCR Tenant ID:
    XCR Subscription ID:
    Private DNS Zone Resource Group Name:
    ```

3. Add below members in the watcher list:
    - anderson.matthew@siemens.com (Matt Anderson)
    - benjamin.collar@siemens.com (Ben Collar) (for dev clusters)
4. Submit the ticket.
5. [Email](mailto:anderson.matthew@siemens.com;benjamin.collar@siemens.com) Matt Anderson and Ben Collar (for dev clusters) for approval:

    ```text
    Subject: Approval for an Azure k8s cluster and a service account
    Description:

    Hi Matt, Ben,

    As a member of [team-name], we need a k8s cluster for hosting TcX deployment in our subscription [subscription id]. 
    Please approve our request for provisioning a k8s cluster and a service account for the same.
    FDS ticket: [link to fds ticket]

    Regards,
    [your name]
    ```

#### Create ServiceAccount

While FDS is working on the above unified ticket, they may ask you to create the service account in the cluster. Follow the below steps to create the same:

1. Select the appropriate Cluster in [Rancher](https://k8s.prod.us-east-1.kaas.sws.siemens.com/) and click on the shell icon on top right corner.

  ![Image](../image_135.png)

2. Type in the below code snippet to create the ServiceAccount:

```bash
kubectl apply -f - <<EOF
apiVersion: v1
kind: ServiceAccount
metadata:
  name: vault-token-reviewer
  namespace: vault-tcx
automountServiceAccountToken: false
EOF
```

  ![Image](../image_136.png)  
3. Verify the created resource in Rancher by navigating `More Resources` -> `Core` -> `ServiceAccounts`. Filter by namespace `vault-tcx` on top right.

  ![Image](../image_137.png)
4. Respond back with confirmation on the ticket so that FDS can continue with `ClusterRoleBinding`.

#### Update Vault with the ServiceAccount details

**Note**: Perform this steps only after FDS ticket for cluster provisioning is complete.

1. Open the Rancher link provided in the ticket, select the cluster mentioned in the FDS ticket and click on the shell icon on top right corner.

![Image](../image_135.png)
2. Type in the below code snippet to create the Secret:

```bash
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

![Image](../image_138.png)
3. Verify the created resource in Rancher by navigating `Storage` -> `Secrets`. Filter by namespace `vault-tcx` on top right.

![Image](../image_139.png)
4. Get the below details from the FDS ticket raised above:
    - issuer
    - kubernetes_host
5. Get the below details from `vault-k8s-auth-secret` created above:
    - ca_certificate
    - token
![Image](../image_140.png)
6. Login to the root namespace of Vault (use appropriate [prod](https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com) or [dev](https://vaultent.emea1.co.sws.siemens.com/) instance) and create a new Secret for the cluster. Path should be `secrets/secret/xcr/<ClusterName>` as shown below:  

  ![Image](../image_15.png)
7. Update the below entries in the Vault with details from 4 and 5:

**Note**:  Ensure that the Kubernetes host includes the https:// prefix.

  ![Image](../image_17.png)
