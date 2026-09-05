## Renew Istio/Load Balancer Certificates

Follow the procedure below to renew the Istio/Load Balancer certificates.

### Steps to follow :

1. Verify Access to the AWS Kit S3 Bucket
    - [tcx-release-management-dev](https://tcx-release-management-dev.s3.us-east-1.amazonaws.com/ssl/dev/)

2. If the location is not accessible, send an email to DeployOps using the details below.

| Field | Content |
|-------|---------|
| To | deployops.tc.lcs.disw@internal.siemens.com |
| CC | yuvraj.chaudhari@siemens.com; pravin.magdum@siemens.com |
| Subject | TCX: Require access to the AWS kits S3 bucket (dev) |
| Body | Please provide access to the AWS kits S3 bucket (dev) for account [Account ID] to access the `tcx-release-management-dev` bucket. |

3. Wait for confirmation from DeployOps that access has been granted.

4. Validate if Certificates are Valid or Expired

    **Prerequisite:** Ensure OpenSSL is installed on the machine before performing certificate validation.

    **Note**: If the certificates are expired or missing, then proceed to contact **abhijeet.godase@siemens.com/yuvraj.chaudhari@siemens.com** to request new certificates.

    1. Download certificates :

        1. Navigate to your domain certificates location; it contains two certificates and one key:
            - Dev certificates path: `https://tcx-release-management-dev.s3.us-east-1.amazonaws.com/ssl/dev/testplmcloudsolutions.com/`
            - Customer / DryRun certificates path: `https://tcx-release-management-dev.s3.us-east-1.amazonaws.com/ssl/dev/cloud.teamcenter.com/`
        
        2. Select each certificate and click "Download", as shown below:
        
            ![alt text](image_2.png)
        
    2. Validate certificates locally:
        1. Open Git Bash.
        2. Change directory to where the certificate files are downloaded, e.g. `cd /path/to/certs`.
        3. Execute the following command:
            
            - Replace your_certificate.pem with the actual certificate filename.
              
              ```bash
                openssl x509 -in <your_certificate>.pem -noout -text 
              ```  
        4. Look for the Validity section in the output to confirm whether the certificate is still valid.
            
            ![alt text](image_1.png)

5. Raise an FDS support ticket to renew Istio/Load Balancer certificates: [FDS Portal](https://fdsone.atlassian.net/servicedesk/customer/portal/302)

| Field | Content |
|-------|---------|
| Summary | Azure Istio/Load Balancer certificates have expired and need renewal |
| Description | Please renew the  Istio/Load Balancer certificates. The current certificates have expired and are impacting environments. Cluster name: [Your Cluster Name] |
| Request type | Problem Report |
| Component | XCR Rancher |
| Priority | P1 |
| Business Product Name | All applications |
| Business unit / Segment | [Name of your segment] |

6. Share domain certificate files with FDS only through secure channels:
    - Secure channels:
        - Encrypted email, or
        - [Secure File Exchange](https://secufex.erlm.siemens.de/)
