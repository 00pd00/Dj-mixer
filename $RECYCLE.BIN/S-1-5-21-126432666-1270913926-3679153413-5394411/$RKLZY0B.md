

##### Route 53 values

Please use the following values:  
- **dev**: Use values for the parent domain name `cloud.teamcenter.com`.  
- **prod** and **dryrun**: Use values for the parent domain name `cloud.teamcenter.com`.

| Deployment Type | Parameter | Description | Value |
|----------------|-----------|-------------|--------|
| Dev | DNS Hosted Zone Id | The DNS Hosted Zone id for the parent domain name "cloud.teamcenter.com" | Z1CNJUMAD4RNXN |
| Dev | DNS Role ARN | The DNS role ARN which allows the ability to create the subdomain (cloud.teamcenter.com) | arn:aws:iam::593713585809:role/IAMForTestplmcloudsolutions-Route53Role-2 |
| Prod and Dryrun | DNS Hosted Zone Id | The DNS Hosted Zone id for the parent domain name "cloud.teamcenter.com" | Z10188363E1I1FGEBRA9Y |
| Prod and Dryrun | DNS Role ARN | The DNS role ARN which allows the ability to create the subdomain (cloud.teamcenter.com) | arn:aws:iam::338113354125:role/access_addaccount_lambda_with_ext_id |