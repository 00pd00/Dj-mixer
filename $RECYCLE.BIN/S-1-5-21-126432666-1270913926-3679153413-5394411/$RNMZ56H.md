
#### Create Istio Gateway in `istio-xcr` Namespace

Open the FDSOne Help Center XCR request link:  
[https://fdsone.atlassian.net/servicedesk/customer/portal/26/group/34/create/107](https://fdsone.atlassian.net/servicedesk/customer/portal/26/group/34/create/107)

Fill in the following values in the form:
- **Summary**: Create Istio Gateway and its secret in `istio-xcr` namespace.
- **Description**:
  - **Region**: `<Region in which you need EKS cluster>`
  - **Cluster Name**: `<Cluster Name received in "Request Kubernetes Cluster from XCR in the required cell">`
  - **Namespace**: `istio-xcr`
  - Create Istio Gateway and its secret in `istio-xcr` namespace.  
     Command to create secret is as below (you can use another approach if that suits you):  
     `kubectl create secret tls tls-secret --cert=chain.pem --key=private.pem -n istio-xcr`  
     PEM files required to create secret `tls-secret` are placed in Vault at:  
     [https://vaultent.emea1.co.sws.siemens.com/ui/vault/secrets/secret/kv/deployops%2Fistiogw-secret-pem/details?namespace=tcx-development_ns%2Fstorm_playground&version=3](https://vaultent.emea1.co.sws.siemens.com/ui/vault/secrets/secret/kv/deployops%2Fistiogw-secret-pem/details?namespace=tcx-development_ns%2Fstorm_playground&version=3)

Below is a sample YAML to create Istio Gateway:

```yaml
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: istio-gw
  namespace: istio-xcr
spec:
  selector:
     istio: ingressgateway
  servers:
     - hosts:
          - '*'
        port:
          name: https
          number: 443
          protocol: HTTPS
        tls:
          credentialName: tls-secret
          mode: SIMPLE
```

- **Severity**: P1
- **Business unit / Segment**: DISW
- **Product Name**: Cloud Operation
- **FDSOne Cloud Operations**: Cloud Runtime
- **Services**: XCR - Kubernetes
- **Request Screenshot**:  
  
  ![Image](./image_18.png)