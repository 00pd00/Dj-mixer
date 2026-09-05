### Reference Architecture Deployment Consideration

#### Provisioning a New TcX Cell (Azure Region)

TcX requires a TcX Cell per Azure region to deploy into. The expectation is one TcX Cell is required per region but multiple TcX Cells maybe required to isolate internal and external customers from using same infrastructure.  The following are the steps that need to be followed to provision a TcX Cell:

1. [XCR Kubernetes Cluster Setup](../../../Documentation/000_Cell-Setup/000_Automation%20Prerequisites/030_XCR%20Kubernetes%20Cluster%20Setup/AZURE/000_Pre-requisites.md)  
2. [TcX Cell Setup](../../../Documentation/000_Cell-Setup/000_Automation%20Prerequisites/040_TcX%20Cell%20Setup/AZURE/000_Setup%20Admin%20subscription/000_Setup%20Admin%20subscription.md)