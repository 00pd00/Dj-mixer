### Create the Network Load Balancer 

 Represented by “D” in the diagram.

 1. Navigate to EC2 Console: 

    1. In the AWS Management Console, go to Services → EC2. 
    2. In the left-hand navigation pane, click Load Balancers under Load Balancing.

2. Create Load Balancer: 

    1. Click on Create Load Balancer.
    2. Select Network Load Balancer. 

    ![Image](./image_438.png)

3. Basic Configuration: 

    1. Name: Provide a descriptive name for the Customer (tcx-integration-[customername]-[servicename]-nlb-1). 
    2. Scheme: Internal
    3. IP address type: IPv4 
    
    ![Image](./image_439.png)

4. Network Mapping: 

    1. Select the VPC which the VPN is connected to 
    2. Tick all the zones available 
    3. For each zone: 
        1. Click Specify IP from CIDR 
        2. Under IP from CIDR enter the highest allowed IP. 
        3. In the case of 10.254.52.240/28 the highest value allowed is 10.254.52.254 
    ![Image](./image_440.png)

5. Listeners: 

    1. Update Listener Port to the Port the NLB will listen on for this particular service endpoint. For instance if we want the NLB to route port 8081 to our target service either VPN-side or Tenant VPC side we would enter Port 8081
    2. Choose Create target group. 
    
    ![Image](./image_441.png)

