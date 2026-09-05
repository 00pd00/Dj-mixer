> **Note:**  
> This is not intended for production use until further communication.  
> It is not for CApS or any external customers and is restricted to development use only.

## CTCx Blue-Green Upgrade Strategy Overview

This document explains the Blue-Green upgrade methodology for Containerized Teamcenter X (CTCx) deployments.

---

### 1. Overview

The Blue-Green upgrade strategy provides a safe, repeatable, and automated approach to upgrading containerized Teamcenter X environments while maintaining production stability and minimizing downtime. This GitLab-driven pipeline enables upgrades to be performed on a replicated environment (Green).

---

### 2. What is Blue-Green Deployment?

In a Blue-Green deployment strategy:
- **Blue Environment:** The current active production environment serving live user traffic
- **Green Environment:** environment created from Blue environment Data snapshots, where the upgrade is performed
- **Smoke Test and Validations:** operations engineer performs smoke test and other validations to verify Upgrade
- **Rollback:** The ability to instantly revert to Blue if issues are detected
- **Switchover:** switch Traffic from Blue to Green once validation is completed

---

### 3. How It Works

The upgrade process follows these key phases:

1. **Snapshot Creation:** Capture complete state of Blue environment (database, FSx/EFS volumes, configurations)
2. **Green Provisioning:** Use Terraform to create new infrastructure with restored snapshots
3. **Upgrade Execution:** Deployment Center performs in-place upgrade including atomic database schema transaction
4. **Validation:** Comprehensive health checks confirm Green environment functionality
5. **Switchover:** Switch production traffic from Blue to Green via DNS/Load Balancer
6. **Rollback (if needed):** Revert traffic to Blue without data restoration

---

### 4. Scope

#### 4.1 In Scope
- Automated Blue-Green upgrade workflow
- Replication of production (Blue) environment to create Green
- Upgrade of Green environment while Blue remains operational
- Controlled switch-over from Blue to Green after successful validation
- Automated rollback capability

#### 4.2 Out of Scope
- Teamcenter Essentials upgrades (not supported in this methodology)
- Upgrades requiring architectural changes beyond version updates

---

### 5. Environment Support

The Blue-Green upgrade methodology supports:
- **Production (prd):** Primary production environments
- **Pre-Production (uat):** Staging environments for validation
- **Development (dev):** Development and testing environments

**Note:** Different tenants and environments can use the same pipeline with parameterized templates and reusable Terraform modules.

---

### 6. Prerequisites

Before initiating a Blue-Green upgrade:
- Source (Blue) environment must be active and healthy
- Deployment Center (DC) services must be running
- Valid GitLab access
- Sufficient infrastructure capacity for Green environment

---

### Next Steps

Proceed to [Ansible Workflow Setup](./010_Ansible%20Workflow%20Setup.md) to learn how to execute the Blue-Green upgrade pipeline.
