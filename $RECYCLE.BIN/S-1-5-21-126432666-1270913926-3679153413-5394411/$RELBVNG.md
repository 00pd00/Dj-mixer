### Create Target Group

1. Target type:  

    1. Set this to IP Addresses 

    ![Image](./image_442.png)

2. Target Group:  

    1. Name: Something which reflects the destination and service. In this instance, customer-http-80 
    2. Protocol: TCP 
    3. Port: The Port of the service you will be connecting to, in this instance we are connecting to port 80 on the customer vpn network. 80 
    4. VPC: Choose the same VPC that your load balancer is in. 
    5. Health checks: 
        1. Protocol: TCP (basic check) or HTTP if the application on port 80 can respond to health probes. Usually, a TCP health check is fine for NLB. 
        2. Configure thresholds as desired (e.g., 2 healthy checks to be considered healthy, 2 unhealthy to be considered unhealthy, etc.). 
3. Click Next 

    ![Image](./image_443.png)

4. Choose a Network - Select **Other Private IP Addresses**
5. Add the IP address of the service on the customer VPN network. In this instance: 10.131.112.143  
6. Confirm the port. In this instance: 80  
7. Click Include as Pending Below  
   
    ![Image](./image_444.png)

8. Click Create target group

