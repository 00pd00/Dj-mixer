### Testing
    
1. Test Connectivity: 
    1. Try connecting to [http://[IP YOU SPECIFIED FOR NLB]:8081] from a client (in your network or within AWS) that can reach the NLB. 
        1. This request should be forwarded to the VPN-side IP addresses on port 80. 
        2. If you have a simple test (like a web service or a netcat listener), confirm you see the traffic. 
2. Validate Health Checks:  
    1. Go to EC2 → Target Groups, select each target group (customer-http-80), and check the Targets tab to confirm they’re reporting as healthy.  



