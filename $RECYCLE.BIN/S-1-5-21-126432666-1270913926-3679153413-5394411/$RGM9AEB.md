## Using custom TLS certificates

To use custom TLS certificate, for example custom.testdomain.com, follow steps below:
Import your custom.testdomain.com certificate to AWS Certificate Manager as per steps 3.4.1.2.21- Create AWS ACM Certificate for ALB. 
In appropriate stream file present in variables/stream · main · TcX-Deploy / tcx-pipeline-variables · GitLab update GLBL_DNS_HOST_NAME as GLBL_DNS_HOST_NAME: "testdomain.com"
Deploying a tenant that uses custom.testdomain.com TLS certificate.
While deploying from Ansible Tower, in customer_input, specify value of dnsSubdomainName as dnsSubdomainName: custom
Deployment will create the fully qualified name as custom.testdomain.com using dnsSubdomainName and GLBL_DNS_HOST_NAME. This certificate will get attached to ALB
​​
