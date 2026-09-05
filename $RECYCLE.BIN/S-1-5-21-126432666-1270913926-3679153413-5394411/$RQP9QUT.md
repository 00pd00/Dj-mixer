#### Raise FDS ticket for cluster

1. Raise cluster request form at [FDS](https://fdsone.atlassian.net/servicedesk/customer/portal/9/group/105/create/188)
2. Fill in the following ticket fields:

    Note: from TC2506.0002 patch release, Teamcenter AI Chat (Product ID: TC030406-XT) is supported, hence if required to configure XCR cluster for Teamcenter AI Chat, you need to provide few extra inputs along with current inputs in FDS cluster request, please refer this link [here](../../../../../Product%20Integration%20Documentation/Teamcenter%20AI%20Chat/Cell%20Onboarding/AZURE/AI%20Search)

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
        - For Development: `rancher-tcx-dev-users`
        - For Production: `tcx-dev`
            - (Yes, `tcx-dev`.)      

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

    13. Cluster will connect with CApS Management Plane via Siemens network? <Yes/No>

    14. Deploy overprovisioner pods on the cluster ? <Yes/No>

    Cloud: Azure
    Cluster Type: Dedicated
    Release Type: preprod (Private)
    Size: No Limit
    Keycloak Group Name: 
    - For Development: `rancher-tcx-dev-users`
    - For Production:
        - User group: `caps-tcx-production-users`
        - Admin group: `caps-tcx-production-admin`
    Connectivity type: Private

    Please note : These are the expected values **from XCR team** after successful provisioning

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
    Availability zone mappings:
    Cluster region + zone: 
    Transit gateway id:

    Note: Availability zone mappings of the cluster can be retrieved by executing the following command-
    az rest --method get --uri "/subscriptions/${AZURE_SUBSCRIPTION_ID}/locations?api-version=2022-12-01" --query "value[?availabilityZoneMappings != 'null' && name == '${REGION}'].{name: name, availabilityZoneMappings: availabilityZoneMappings}"
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

  ![Image](./image_135.png)
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

  ![Image](./image_136.png)
3. Verify the created resource in Rancher by navigating `More Resources` -> `Core` -> `ServiceAccounts`. Filter by namespace `vault-tcx` on top right.

  ![Image](./image_137.png)
4. Respond back with confirmation on the ticket so that FDS can continue with `ClusterRoleBinding`.

#### Update Vault with the ServiceAccount details

**Note**: Perform this steps only after FDS ticket for cluster provisioning is complete.

1. Open the Rancher link provided in the ticket, select the cluster mentioned in the FDS ticket and click on the shell icon on top right corner.

  ![Image](./image_135.png)
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

![Image](./image_138.png)
3. Verify the created resource in Rancher by navigating `Storage` -> `Secrets`. Filter by namespace `vault-tcx` on top right.

![Image](./image_139.png)
4. Get the below details from the FDS ticket raised above:
    - issuer
    - kubernetes_host
5. Get the below details from `vault-k8s-auth-secret` created above:
    - ca_certificate
    - token
  ![Image](./image_140.png)
6. Login to the root namespace of Vault (use appropriate [prod](https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com) or [dev](https://vaultent.emea1.co.sws.siemens.com/) instance) and create a new Secret for the cluster. Path should be `secrets/secret/xcr/<ClusterName>` as shown below:  

  ![Image](./image_15.png)
7. Update the below entries in the Vault with details from 4 and 5:

**Note**:  Ensure that the Kubernetes host includes the https:// prefix.

  ![Image](./image_17.png)
