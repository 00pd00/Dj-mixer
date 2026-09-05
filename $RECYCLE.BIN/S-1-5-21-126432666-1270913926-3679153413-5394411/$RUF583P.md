# Executing an Ansible Playbook 

This guide walks you through running an Ansible playbook in the TCX Production environment, tracking pipeline progress, and verifying application deployment.

## 1. Launching the Ansible Playbook

1. **Log in** to [Ansible TCX Prod](https://ansible-tcx-prod.plmcloudsolutions.com).
2. **Search** for the latest Ansible template (look for the highest release number).
3. **Select the template**, scroll down, and click **"Launch"**.
4. In the UI that appears:
    - Fill in the required values from the [Ansible Template Input](../010_Pre-Reqs/020_Ansible%20Template%20Input/000_Ansible%20Template%20Input.md).
    - Enter your **GitLab Personal Access Token**.
5. After filling in all information, click **"Next"**.
6. On the next screen, click **"Launch"** again to execute the playbook.

> **Note:** Below is a sample of the Ansible UI. Input values will differ based on your deployment. A Vault Token is optional, it must be provided if your template does not contain a Vault AppRole credential.
>
> ![Ansible Template UI](./image_152.png) 

## 2. Monitoring the Ansible Pipeline

- Once the playbook launches, the pipeline runs automatically.
- A successful run appears as shown below:

  ![Ansible Pipeline Success](./image_153.png) 

## 3. Verifying GitLab Pipeline Status

- After the Ansible job completes successfully, it triggers the associated GitLab pipeline.
- To check status:
    1. Open the **tenant repository** link provided at the end of the Ansible job log.
    2. Monitor pipeline progress with visual indicators and logs.

  ![GitLab Pipeline Status](./image_154.png) 

  ![GitLab Pipeline Logs](./image_155.png) 

- The pipeline logs provide direct links to related resources such as Ansible, pipeline stages, Datadog, and more.

  ![Pipeline Logs Overview](./image_156.png) 

## 4. Deployutils Pod Progress and ArgoCD Verification

- The Deployutils pod starts running automatically, typically within an hour.
- Execution can be monitored in ArgoCD and may take over 4 hours, depending on installed components.
- When complete, Helm charts are generated for all installed components and related pods should be running.

### Accessing ArgoCD

1. **Open** [ArgoCD US for XCR US regional clusters](https://argocd.nac1.co.sws.siemens.com/) or [ArgoCD EMEA for XCR EMEA regional clusters](https://argocd.emea1.co.sws.siemens.com/) or [ArgoCD APAC for XCR APAC regional clusters](https://argocd.apac1.co.sws.siemens.com/).
2. **Log in** using the **Keycloak** option.
3. **Search** for your tenant ID in the search bar.
4. You should see the following four applications:
    - `<tenant-id>-prd-deploy-tcx-helm`
    - `<tenant-id>-prd-file-agent-tcx-helm`
    - `<tenant-id>-prd-onboarding-ycx-helm`
    - `<tenant-id>-prd-teamcenter-tcx-helm`
5. **Verify each application's health**. All should show as healthy, indicating the infrastructure is deployed and operational.
6. To view specific pod health, check at the app level within ArgoCD.

  ![Argo App Health](./image_157.png) 

## 5. Accessing Logs in Datadog

- Pipeline and container logs are viewable in [Datadog Pillar0](https://pillar0-siemens.datadoghq.com/).
- To locate logs for a specific `tenant-id` or pod, refer to the instructions in [How to find the syslog information for an AW Client user](../../020_Operations/080_Troubleshooting/010_Enable%20Diagnostic%20logs%20for%20tcservers.md#how-to-find-the-syslog-information-for-an-aw-client-user).

