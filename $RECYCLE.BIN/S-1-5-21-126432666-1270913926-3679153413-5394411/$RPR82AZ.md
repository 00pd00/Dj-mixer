## Customer VPN -> TCX Resource setup Cookbook

This document serves as a step-by-step guide for creating and configuring an Amazon Web Services (AWS) Network Load Balancer (NLB) to act as a connection hub between Tenant VPC resources and Customer Network resources via an established site-to-site VPN connection

 Following is the overall diagram illustrating the components involved. 

 ![Image](./image_436.png)

 The specific addition of the NLB to the “VPN” VPC which are the focus of these instructions are shown here: 

 ![Image](./image_437.png)

 **The process of creating a NLB service port mapped to a resource works in both directions.** We can use the same process to map a NLB port to the TCX Tenant Resource (such as AIG server) which makes it available to the Customer Network and we can map a NLB port to a Customer Network Resource which makes it available to the TCX Tenant Network.

 We use static IP addresses associated to the NLB so both TCX and Customer resources have a known destination for sending traffic, this also eliminates the need for DNS resolution and simplifies the overall design.