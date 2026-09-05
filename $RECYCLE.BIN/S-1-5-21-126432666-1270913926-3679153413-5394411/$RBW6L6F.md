#### Raise Snow ticket for Azure XCR to Admin License connectivity

**Note**: Raise this only when the cluster needs to be connected to the CAPS management plane.

Use below parameters for updating the ticket template below:

| CApS management plane | CIDR | AWS Account ID |
| ------ | ------ | ------ |
| Production | 10.149.18.0/23 | 361500002652 |
| Test | 10.149.26.0/23 | 014376623490 |

##### SNOW ticket for Firewall updates

1. Raise Firewall update request using [Snow Ticket](https://diswsiemens.service-now.com/sp?id=sc_cat_item_guide&sys_id=b9cf95651bfe885c0e21dc27bd4bcb53&table=sc_cat_item&searchTerm=disw:%20firewall%20rule%201%20-%20firewall%20rule%20request)

Refer below details for adding details to the ticket: 

| Argument | Value |
| ------ | ------ |
|  Requested for      |    &lt;&lt; Example :Jadhav, Neha &gt;&gt;    |
|  Requested by       |    &lt;&lt; Example : Jadhav, Neha &gt;&gt;    |
| How many rules would you like to request |   1      |
| Rule Type | Add permanent firewall rules |
| Business Justification |     The FDS cluster is hosted in Azure, and we have a License server in the CApS AWS account. We require reachability from the FDS Azure cluster pod to the AWS License server.  |  
| Source |  IP address(es)     |
| Source IP Address(es) |  Cluster Vnet CIDR provided by [XCR Team](./Request%20XCR%20Cluster#raise-fds-ticket-for-cluster) |
| Destination  |  IP address(es)     |
| Destination IP Address(es)| Select the Prod/Test CAPS management plane CIDR range as per requirement |
| Port or Port Range to Open | 28000, 28001 |
| Protocol  |IP , TCP , UDP |
| Default directionality is source TO destination. Bidirectional is only needed if the destination initiates traffic to the source as a new connection. Response traffic is always allowed without this selection.   |  False |

Example:

![alt text](image-3.png)


##### SNOW ticket for Network connectivity

Raise Network connectivity request using [Snow Ticket](https://diswsiemens.service-now.com/sp?id=sc_cat_item&table=sc_cat_item&sys_id=e0f8cc6fdb8542907571c3440596191b&recordUrl=com.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1&sysparm_id=e0f8cc6fdb8542907571c3440596191b)

Note: The Cluster  Region, Cluster Name, and Cluster VNet CIDR will be provided by the XCR team once the cluster provisioning is completed-> [Request XCR cluster](./Request%20XCR%20Cluster#raise-fds-ticket-for-cluster)


Refer below details for adding details to the ticket: 

| Argument | Value |
| ------ | ------ |
|  Requested for      |    &lt;&lt; Example :Jadhav, Neha &gt;&gt;    |
|  Requested by       |    &lt;&lt; Example : Jadhav, Neha &gt;&gt;    |
| Cloud Vendor |   Azure      |
| Azure Region Selection | &lt;&lt; Provide Cluster  Region &gt;&gt;|  
| Do you have any on-prem dependencies? | No |
| Number of Routable DISW IP Addresses |  0 |
| Is access to Siemens AG (blue) users or services required  |  No   |
| Does your cloud application host CFIUS Data?| No   |
| Cloud Account ID | &lt; Cluster Name &gt; - &lt; Cluster  Region &gt; |
| Description of Application/Service  | We are working across two clouds. The FDS cluster is hosted in Azure &lt; Cluster  Region & zone &gt;, and we have a License server in the CApS AWS account &lt; AWS account ID &gt; (us-east-1). We require reachability from the FDS Azure cluster pod to the CApS AWS License server. <br /> CAPS management plane CIDR range - &lt; CAPS management plane CIDR range &gt; (us-east-1).<br /> FDS Cluster CIDR Range - &lt; Cluster Vnet CIDR &gt; <br /> Please let me know if you required anything else. |
| Who is the contact that can answer any technical questions on network connectivity requirements?  | &lt;&lt; Provide your name &gt;&gt; |

Example:

![alt text](image-4.png)

   


