### Vault Integration with Kubernetes
**Note**: Applicable only for the AWS cloud provider.

Integrating Kubernetes with Vault helps pods running in the Kubernetes cluster (XCR Kubernetes cluster) authenticate to XCR Vault and read secrets from a path. This integration needs to be performed for each EKS cluster and is mentioned in section [Request Kubernetes SA for Vault](../XCR%20Kubernetes%20Cluster%20Setup/AWS/Request%20Kubernetes%20SA%20for%20Vault).

- When creating a new root namespace, the secrets of the existing Kubernetes cluster, which were created earlier, need to be stored in the location `xcr/{cluster_name}` as outlined in [Request Kubernetes SA for Vault](../XCR%20Kubernetes%20Cluster%20Setup/AWS/Request%20Kubernetes%20SA%20for%20Vault).

![Kubernetes Vault Integration](./image_119.png)

---
