## Long running SOA requests from clients inside a VPC do not receive response from server

SOA requests made to a cTcX deployment from a client machine that is inside a VPC are routed through NAT gateway in the client VPC to the ALB in the tenant AWS account. An example of this use-case is APA team sending SOA requests from NX client machines inside a VPC in separate AWS account to a cTcX deployment. NAT Gateways have 350 second idle timeout. When a SOA request takes more than 350 seconds, the NAT gateway would close the socket. However, Teamcenter server would continue processing the request and send the response. As the socket is closed, the response does not reach the client.

This issue can be addressed by configuring TCP Keep Alive on the client machine. This configuration ensures that NAT gateway does not timeout while the SOA request is in progress.
If the machine is a Windows machine, then the Keep Alive parameters can be set as per instructions given below:

1. Click Start > Run, in the Open field, enter regedit, and then click OK.
2. Navigate to HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters.
3. Right-click the Parameters folder, then click New > DWORD Value.
4. Change the Name of the new key to "KeepAliveTime".
5. Right-click the parameter, and click Modify.
6. Enter the time value (in decimal) as 60000 in the Value data field.  Values are in thousands of a second (milliseconds)
where 1000 = 1 second. (The default value is 7200000 milliseconds)

7. Similarly, add following keys with specified values:

    key: KeepAliveInterval   value: 60000

    key: TCPMaxDataRetransmissions  value: 60

8. Click OK.
9. Exit the Registry Editor and restart your computer

If the client is running on a Linux machine, the Keep Alive parameters can be set as per instructions given below either using procfs interface or sysctl interface:

Using procfs interface:
1. echo 60 > /proc/sys/net/ipv4/tcp_keepalive_time
2. echo 60 > /proc/sys/net/ipv4/tcp_keepalive_interval
3. echo 60  > /proc/sys/net/ipv4/tcp_keepalive_probes
4. Restart the machine

Using sysctl interface:

1. sysctl -w \   > net.ipv4.tcp_keepalive_time=60 \   > net.ipv4.tcp_keepalive_intvl=60 \   > net.ipv4.tcp_keepalive_probes=60
2. Restart the machine
