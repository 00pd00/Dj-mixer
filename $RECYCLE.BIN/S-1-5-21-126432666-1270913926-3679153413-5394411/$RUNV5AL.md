# Tenant Onboarding Guide

Welcome to the Tenant Onboarding process for deploying a containerized Teamcenter tenant. This guide is designed for both end users and technical operators, providing clear and step-by-step instructions. The following sections detail each major component involved in tenant deployment.

![Image](./image_131.png)

---

## Deployment Components Overview

### 1. Deployment Trigger & User Interface

- **Ansible Tower** serves as the user-friendly front-end for deployments.
- Users log in, configure credentials, and execute the desired Ansible Playbook.
- The playbook sends deployment details to the orchestrator (GitLab Pipeline).

**Note:**  
- Ensure all credentials are correctly entered before starting the deployment.  
- Only released and approved playbooks should be used to maintain system integrity.

---

### 2. Deployment Orchestrator

- **GitLab Pipeline** centrally manages deployment activities:
    - Integrates with all deployment components.
    - Executes and monitors various logic/processes for stable tenant deployment.
    - Receives the initial desired state from Ansible Tower.
    - Updates the tenant-specific Git repository with this desired state.

**Validation Steps:**
- After pipeline execution, confirm that the tenant repository has been correctly updated with the desired state artifacts.

---

### 3. Tenant Desired State Management

- A **tenant-specific GitLab Project** is created/managed by the pipeline.
- Stores all tenant artifacts (e.g., Helm Charts, YAML files).
- Represents the single source of truth for deployment and follows the GitOps approach.

**Note:**  
- Changes to the repository automatically initiate updates in the deployment pipeline.

---

### 4. Continuous Delivery System (Kubernetes)

- **ArgoCD** ensures continuous delivery and synchronization:
    - Reads tenant-specific Helm Charts from the Git repository.
    - Applies and synchronizes desired state to the Kubernetes cluster.
    - Continuously monitors and reconciles any configuration drift.

**Validation Steps:**
- Verify ArgoCD sync status to ensure all changes in the Git repository are reflected in the Kubernetes live state.

---

### 5. Cloud Resource Provisioning

- Resources such as databases (e.g., AWS Aurora PostgreSQL) are provisioned in the cloud.
- **Terraform** is used predominantly for cloud automation; other custom scripts may be involved as needed.

**Warning:**  
- Cloud provider credentials must be securely managed and access should comply with organizational security policies.  
- Misconfigured credentials can cause deployment failure or result in resource orphaning.

---

### 6. Kubernetes as Container Orchestrator

- **Kubernetes** manages all containerized Teamcenter services.
- Services are deployed to a tenant-specific namespace via ArgoCD.

**Validation Steps:**
- Validate namespace creation and confirm all required services are running and healthy in Kubernetes.
