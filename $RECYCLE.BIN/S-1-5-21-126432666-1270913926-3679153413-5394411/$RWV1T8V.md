### Verify Routes and Security

1. Routing: 
    1. Ensure that the subnets you placed the NLB in have route tables that can reach: 
        1. The VPN side IP addresses. 
        2. The IP addresses in the other VPC via the Transit Gateway. 
    2. Double-check that the transit gateway route tables are configured so return traffic knows how to get back to the NLB subnets.  
2. Firewall / Security: 
    1. For the VPN side network, ensure your on-premises/customer firewall or security policies allow traffic on the port the NLB is sending traffic to. 
    2. For the Tenant VPC, make sure the target instance(s) or services permit inbound traffic from the NLB subnets on the target port. 

