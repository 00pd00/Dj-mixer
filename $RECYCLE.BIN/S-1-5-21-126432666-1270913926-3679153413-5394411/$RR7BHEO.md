## Troubleshooting Failure in EC2 instance connection to DB in Shared DB VPC (Dispatcher Server deployment issue)

Note: Each AWS account typically has one cell variable file. However, if multiple cell variable files are created to expand the CIDR range for a tenant VPC, the  from all variable files for a specific cluster must be added to the route table.
![Image](./image_391.png)


Steps to Update Route Table
Navigate to Route Tables:
Log in to your AWS account.
Go to the Route Tables section.
Search for the Route Table:
Look for  .
Update the Route Table:
Open the identified route table.
Under the Routes section, add all the missing CIDR ranges from the multiple cell variable files created for the cluster.
Set the Target to Transit Gateway.
Save Changes:
Save the updated route table.
![Image](./image_392.png)


​​
