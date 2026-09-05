### Prerequisites

 Depends on a pre-existing Virtual Private Cloud (VPC) that is already connected to on-premises networks via a Virtual Private Network (VPN), and to the Tenant VPC via a Transit Gateway (TGW). 

 1. **VPC with VPN Connection:** Confirm your VPC is up (See “A”) 
 2. Confirm the VPN connection is active and functioning. (See  “C” in the diagram) This means you can pass traffic over the VPN between your on-premises/customer network and the AWS VPC.  The steps to set up the VPN are defined by the Operations team.
 3. **Transit Gateway Setup:** Confirm that the Transit Gateway is correctly attached to the Tenant VPC (See “E”) 
 4. Confirm your VPN VPC routing is configured so traffic can flow between them. (See "F” in the diagram.) Traffic flow between the VPN VPC and tenant VPC.  The steps to set up the TGW and configuration are defined as part of the Cell setup in the CTcX Cookbook.   **TcX Cell Administrative Account Setup**
 