# Section Reviewers Mapping

This document shows each documentation section with its assigned reviewers, organized by main areas in a table format for easy reading.

---

## Cell-Setup

| Section                                                                                                   | Type      | Reviewers                                                       |
|-----------------------------------------------------------------------------------------------------------|-----------|-----------------------------------------------------------------|
| Main Section                                                                                              | Inherited | shantanu.joshi, yuvraj.chaudhari                               |
| Automation Prerequisites                                                                                  | Inherited | shantanu.joshi, yuvraj.chaudhari                               |
| Automation Prerequisites → Tools Access                                                                   | Direct    | yuvraj.chaudhari                                               |
| Automation Prerequisites → Tools Access → Tools                                                           | Inherited | yuvraj.chaudhari                                               |
| Automation Prerequisites → XCR Kubernetes Cluster Setup                                                   | Direct    | yuvraj.chaudhari                                               |
| Automation Prerequisites → XCR Kubernetes Cluster Setup → AWS                                             | Inherited | yuvraj.chaudhari                                               |
| Automation Prerequisites → XCR Kubernetes Cluster Setup → AZURE                                           | Inherited | yuvraj.chaudhari                                               |
| Automation Prerequisites → TcX Cell Setup                                                                 | Direct    | yuvraj.chaudhari                                               |
| Automation Prerequisites → TcX Cell Setup → AWS                                                           | Inherited | yuvraj.chaudhari                                               |
| Automation Prerequisites → TcX Cell Setup → AWS → TcX Cell Account Setup                                  | Inherited | yuvraj.chaudhari                                               |
| Automation Prerequisites → TcX Cell Setup → AWS → TcX Cell Account Setup → Cell Account                   | Inherited | yuvraj.chaudhari                                               |
| Automation Prerequisites → TcX Cell Setup → AWS → TcX Cell Account Setup → CAPs Management Plane          | Inherited | yuvraj.chaudhari                                               |
| Automation Prerequisites → TcX Cell Setup → AWS → TcX Tenant Administrative AWS Account setup             | Inherited | yuvraj.chaudhari                                               |
| Automation Prerequisites → TcX Cell Setup → AZURE                                                         | Inherited | yuvraj.chaudhari                                               |
| Automation Prerequisites → TcX Cell Setup → AZURE → Setup Admin subscription                              | Inherited | yuvraj.chaudhari                                               |
| Automation Prerequisites → TcX Cell Setup → AZURE → Trigger Admin pipeline                                | Inherited | yuvraj.chaudhari                                               |
| Automation Prerequisites → TcX Cell Setup → AZURE → Setup Cell Subscription                               | Inherited | yuvraj.chaudhari                                               |
| Automation Prerequisites → TcX Cell Setup → AZURE → Setup Cell Subscription → Prepare the scripts to be executed | Inherited | yuvraj.chaudhari                                          |
| Automation Prerequisites → TcX Cell Setup → AZURE → Setup Cell Subscription → Prepare the scripts to be executed → Variable Reference Guide | Inherited | yuvraj.chaudhari |
| Automation Prerequisites → TcX Cell Setup → AZURE → Setup Datadog in Admin subscription                   | Inherited | yuvraj.chaudhari                                               |
| Automation Prerequisites → Teamcenter X Operating SAM Account Set-up                                      | Direct    | bala.subramani                                                 |
| Automation Prerequisites → Teamcenter X Operating SAM Account Set-up → Set-up Teamcenter X Operating SAM Account | Inherited | bala.subramani                                               |
| Automation Prerequisites → Amazon SES SMTP Account Set-up                                                 | Direct    | abhijeet.godase                                                |
| Automation Prerequisites → Tools Setup                                                                    | Direct    | abhijeet.godase, bala.subramani, mridul.maheshwari, sastry.govindu |
| Automation Setup                                                                                          | Direct    | yuvraj.chaudhari                                               |

---

## Tenant Onboarding

| Section                                                                                   | Type      | Reviewers                                                                             |
|-------------------------------------------------------------------------------------------|-----------|---------------------------------------------------------------------------------------|
| Main Section                                                                              | Inherited | shantanu.joshi, yuvraj.chaudhari                                                     |
| Intro                                                                                     | Inherited | shantanu.joshi, yuvraj.chaudhari                                                     |
| Pre-Reqs                                                                                  | Direct    | mridul.maheshwari                                                                    |
| Pre-Reqs → Ansible Template Input                                                         | Inherited | mridul.maheshwari                                                                    |
| Pre-Reqs → Ansible Template Input → AWS                                                   | Inherited | mridul.maheshwari                                                                    |
| Pre-Reqs → Ansible Template Input → AZURE                                                 | Inherited | mridul.maheshwari                                                                    |
| Basic Flow                                                                               | Direct    | mridul.maheshwari                                                                    |
| Post Deploy Operations                                                                   | Direct    | abhijit.aklujkar, deepesh.jain, kailas.phanashikar, kilian.knoll, mridul.maheshwari, prashanth.bijamwar, rao.bandaru, upadhyay.saurabh |
| Post Deploy Operations → AWS                                                              | Inherited | abhijit.aklujkar, deepesh.jain, kailas.phanashikar, kilian.knoll, mridul.maheshwari, prashanth.bijamwar, rao.bandaru, upadhyay.saurabh |
| Teamcenter Dispatcher and Translators                                                     | Direct    | rao.bandaru                                                                          |
| Validation Steps for Teamcenter X Products                                                | Direct    | dave.keith, derek.piette, jbbauer, matthew.carney             |
| Enable Xcelerator Admin Console for Teamcenter X                                          | Direct    | upadhyay.saurabh                                                                     |
| Create CApS users in Teamcenter                                                          | Inherited | shantanu.joshi, yuvraj.chaudhari                                                     |
| Create CApS users in Teamcenter → Automated Script approach                              | Inherited | shantanu.joshi, yuvraj.chaudhari                                                     |
| Create CApS users in Teamcenter → Manual Steps approach                                  | Inherited | shantanu.joshi, yuvraj.chaudhari                                                     |
| License Configuration                                                                    | Inherited | shantanu.joshi, yuvraj.chaudhari                                                     |
| Datadog monitor and slo setup                                                            | Direct    | bala.subramani                                                                       |
| TcX Reports Configuration                                                                | Direct    | shantanu.joshi                                                                       |
| Enable xApps Integration with Teamcenter X                                               | Inherited | shantanu.joshi, yuvraj.chaudhari                                                     |

---

## Operations

| Section                                                                                           | Type      | Reviewers                           |
|---------------------------------------------------------------------------------------------------|-----------|-------------------------------------|
| Main Section                                                                                      | Inherited | shantanu.joshi, yuvraj.chaudhari   |
| Full Clone Environment                                                                            | Direct    | deepesh.jain                       |
| Partial Clone Environment                                                                         | Direct    | deepesh.jain                       |
| Applying Personalization                                                                          | Inherited | shantanu.joshi, yuvraj.chaudhari   |
| Azure Policies                                                                                    | Inherited | shantanu.joshi, yuvraj.chaudhari   |
| Day N Operations                                                                                  | Direct    | deepesh.jain, mridul.maheshwari    |
| Day N Operations → LDAP configuration for users                                                   | Inherited | deepesh.jain, mridul.maheshwari    |
| Day N Operations → Adding additional modules                                                      | Inherited | deepesh.jain, mridul.maheshwari    |
| Updating-an-Existing-Deployment                                                                   | Direct    | mridul.maheshwari                  |
| Upgrading an existing Deployment                                                                  | Direct    | upadhyay.saurabh                   |
| Upgrading an existing Deployment → Pre-requisites                                                 | Inherited | upadhyay.saurabh                   |
| Upgrading an existing Deployment → Known issues and workarounds                                   | Inherited | upadhyay.saurabh                   |
| Upgrading an existing Deployment → Setup triad license for HA environments                        | Inherited | upadhyay.saurabh                   |
| Password Maintenance                                                                              | Direct    | mridul.maheshwari                  |
| Password Maintenance → Day N Password Rotation                                                    | Inherited | mridul.maheshwari                  |
| Environment Cleanup Teardown                                                                     | Direct    | mridul.maheshwari                  |
| Environment Cleanup Teardown → Cleanup Teardown Validation                                        | Inherited | mridul.maheshwari                  |
| Environment Cleanup Teardown → Cleanup Teardown Validation → Identify Resources                   | Inherited | mridul.maheshwari                  |
| Environment Cleanup Teardown → Cleanup Teardown Validation → Check if the ENV Namespace is Deleted from the Vault | Inherited | mridul.maheshwari       |
| Environment Cleanup Teardown → Cleanup Teardown Validation → Check for the Destroy Action in Tenant Repo | Inherited | mridul.maheshwari           |
| Automated Backup and Restore of TcX environment                                                  | Direct    | upadhyay.saurabh                   |
| Troubleshooting                                                                                  | Direct    | deepesh.jain, mridul.maheshwari    |
| Optional Product Integrations                                                                    | Inherited | shantanu.joshi, yuvraj.chaudhari   |
| Optional Product Integrations → Teamcenter X Essentials                                          | Inherited | Panchu   |
| Optional Product Integrations → Multi-Site Deployment                                            | Inherited | Rahul Raut   |
| Optional Product Integrations → Supplier Connect Deployment                                      | Inherited | Hardik  Makadia   |
| Optional Product Integrations → Customer VPN -TCX Resource setup                                 | Inherited | shantanu.joshi, yuvraj.chaudhari   |
| DevOps Team Operations                                                                           | Direct    | sarang.deshpande                   |
| DevOps Team Operations → AWS                                                                     | Inherited | sarang.deshpande                   |
| DevOps Team Operations → AZURE                                                                   | Inherited | sarang.deshpande                   |
| Hashicorp Vault access for operator users                                                        | Direct    | deepesh.jain                       |
| Horizontal Pod Autoscaling HPA Configurations                                                    | Inherited | Bala Subramani   |
| Non-production Topics                                                                            | Inherited | shantanu.joshi, yuvraj.chaudhari   |
| References                                                                                       | Inherited | shantanu.joshi, yuvraj.chaudhari   |
| Appendix                                                                                         | Direct    | bala.subramani, mridul.maheshwari, yuvraj.chaudhari |
| Azure Certificate Renewal using Ansible Tower Scheduler                                          | Inherited | Tushar Bhasme   |
| Upgrading an Existing Teamcenter X Essentials Deployment                                         | Direct    | panchu.palaniappan                 |

---

## Handoffs

| Section         | Type      | Reviewers                          |
|-----------------|-----------|------------------------------------|
| Main Section    | Inherited | shantanu.joshi, yuvraj.chaudhari   |

---

## CTCX-Intro

| Section                                             | Type      | Reviewers                          |
|-----------------------------------------------------|-----------|------------------------------------|
| Main Section                                        | Inherited | shantanu.joshi, yuvraj.chaudhari   |
| Introduction and Scope                              | Inherited | shantanu.joshi, yuvraj.chaudhari   |
| Introduction and Scope → AZURE                      | Inherited | Tushar Bhasme   |
| Containerized TcX Architecture Overview             | Inherited | shantanu.joshi, yuvraj.chaudhari   |
| Containerized TcX Architecture Overview → AWS       | Inherited | shantanu.joshi, yuvraj.chaudhari   |
| Containerized TcX Architecture Overview → AZURE     | Inherited | Tushar Bhasme   |

---

## Community

| Section           | Type      | Reviewers                          |
|-------------------|-----------|------------------------------------|
| Main Section      | Inherited | shantanu.joshi, yuvraj.chaudhari   |
| Contribution Guide| Inherited | shantanu.joshi, yuvraj.chaudhari   |

---

## Product Integration Documentation

| Section          | Type      | Reviewers                          |
|------------------|-----------|------------------------------------|
| Main Section     | Inherited | shantanu.joshi, yuvraj.chaudhari   |
| About            | Inherited | shantanu.joshi, yuvraj.chaudhari   |

---

## Documentation Root

| Section           | Type      | Reviewers                          |
|-------------------|-----------|------------------------------------|
| Main Section      | Inherited | shantanu.joshi, yuvraj.chaudhari   |

---

## Table of Contents

| Section           | Type      | Reviewers                          |
|-------------------|-----------|------------------------------------|
| Main Section      | Inherited | shantanu.joshi, yuvraj.chaudhari   |

---

## 📊 Summary Statistics

- **Total Documentation Sections:** 94
- **Sections with Reviewers:** 94
- **Coverage:** 100.0%
- **Unique Reviewers:** 20

---

## 👥 All Active Reviewers

| Reviewer                   | Sections Involved |
|----------------------------|------------------|
| abhijeet.godase            | 2                |
| abhijit.aklujkar           | 2                |
| bala.subramani             | 5                |
| dave.keith                 | 1                |
| deepesh.jain               | 9                |
| derek.piette               | 1                |
| jbbauer                    | 1                |
| kailas.phanashikar         | 2                |
| kilian.knoll               | 2                |
| matthew.carney             | 1                |
| mridul.maheshwari          | 21               |
| panchu.palaniappan         | 1                |
| prashanth.bijamwar         | 2                |
| rao.bandaru                | 3                |
| sarang.deshpande           | 3                |
| sastry.govindu             | 1                |
| shantanu.joshi             | 35               |
| upadhyay.saurabh           | 8                |
| yuvraj.chaudhari           | 54               |

---

## 🎯 Assignment Types Legend

- 🎯 **Direct**: Section has its own `.git-reviewers.json` file
- ⬆️ **Inherited**: Uses reviewers from parent directory
- ❌ **No Assignment**: No reviewers found in hierarchy

---

## 📝 How to Read This Document

- **Main Sections (📁)** are the top-level areas of documentation
- Each bullet point shows a subsection with its assigned reviewers
- **Assignment types** indicate whether reviewers are directly assigned or inherited from parent directories
- Reviewer names are the GitLab handles responsible for that section

---

## 🔄 Last Updated

This document was automatically generated on: **August 1, 2025**
