### Reference Architecture Deployment Consideration

#### Provisioning a New TcX Cell (Azure Region)

TcX requires a TcX Cell per Azure region to deploy into. The expectation is one TcX Cell is required per region but multiple TcX Cells maybe required to isolate internal and external customers from using same infrastructure.  The following are the steps that need to be followed to provision a TcX Cell:

1. [XCR Kubernetes Cluster Setup](../../../Documentation/Cell-Setup/Automation%20Prerequisites/XCR%20Kubernetes%20Cluster%20Setup/AZURE/Pre-requisites)  
2. [TcX Cell Setup](../../../Documentation/Cell-Setup/Automation%20Prerequisites/TcX%20Cell%20Setup/AZURE/Setup%20Admin%20subscription/Pre-requisites)