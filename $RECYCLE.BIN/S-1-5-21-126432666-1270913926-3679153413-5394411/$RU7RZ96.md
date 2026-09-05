## License Server Maintenance and Failover Procedure

This guide explains how to verify and add license server entries using `license_server_maintain` on the DC server and perform a license server failover from the RAC.

---

### Step 1: Login to DC Server and Set Context

1. Login to the DC server.
2. Switch to `tcx_user`:
   sudo su - tcx_user
3. Set the TCC context:
   . tcc set_context `<customerID>` tcx_user

---

### Step 2: List Existing License Server Entries

To get a list of current license server entries, run:

```
tcc exec 'license_server_maintain -u=tcxadmin -pf=\"$TC_SECURITY_DIR/tcxadmin.pwf\" -g=dba -f=list'
```

---

### Step 3: Add Missing License Server Entries

To add a license server entry, use the following format:
```
tcc exec 'license_server_maintain -u=tcxadmin -pf=\"$TC_SECURITY_DIR/tcxadmin.pwf\" -g=dba -server_name=28000_splmlicense3 -host_name=splmlicense3 -port_number=28000 -f=create'
```

Repeat the above command for other missing license servers, replacing the server name, hostname, and port as required.

---

### Example Triad Entries

Below is a sample of a complete triad license server setup:

1. 28001_ctcxpd13.license-service.prd.tcxservices.com : 28001 : ctcxpd13.license-service.prd.tcxservices.com  
2. 28000_splmlicense2 : 28000 : splmlicense2  
3. Default Local License Server : 28000 : splmlicense  
4. 28000_splmlicense3 : 28000 : splmlicense3  

---

### Step 4: Perform License Server Failover

Run 

```
tcc exec 'license_server_maintain -u=tcxadmin -pf=\"$TC_SECURITY_DIR/tcxadmin.pwf\" -g=dba -f=list'
```

You can see such table:

![alt text](image.png)


Compare your entries with the entries in above image (sequence doesn't matter). If your entries are different, adjust following commands accordingly. In the above image, first column is server_name and the last column is host_name.

Essentially we have `Default Local License Server`, `28000_splmlicense2`, `28000_splmlicense3` and `28001_<dns_subdomain_name>.license-service.prd.tcxservices.com`.

For Default Local License Server -> splmlicense2, splmlicense3, 28001_`<dns_subdomain_name>`.license-service.prd.tcxservices.com

For splmlicense2 -> Default Local License Server, splmlicense3, 28001_`<dns_subdomain_name>`.license-service.prd.tcxservices.com

For splmlicense3 -> Default Local License Server, splmlicense2, 28001_`<dns_subdomain_name>`.license-service.prd.tcxservices.com

Make sure you are providing the correct server_name, -host_name and -failover_server_list


Command to add failover entries for Default Local License Server
```
tcc exec 'license_server_maintain -u=tcxadmin -pf=\"$TC_SECURITY_DIR/tcxadmin.pwf\" -g=dba -server_name=\"Default Local License Server\" -host_name=\"splmlicense\" -port_number=28000 -failover_server_list=\"28000_splmlicense2,28000_splmlicense3,28001_<dns_subdomain_name>.license-service.prd.tcxservices.com\" -f=modify'
```

Image for reference:
![alt text](image-1.png)



Command to add for failover entries for splmlicense2,
```
tcc exec 'license_server_maintain -u=tcxadmin -pf=\"$TC_SECURITY_DIR/tcxadmin.pwf\" -g=dba -server_name=\"28000_splmlicense2\" -host_name=\"splmlicense2\" -port_number=28000 -failover_server_list=\"Default Local License Server,28000_splmlicense3,28001_<dns_subdomain_name>.license-service.prd.tcxservices.com\" -f=modify'
```

Command to add failover entries for splmlicense3,
```
tcc exec 'license_server_maintain -u=tcxadmin -pf=\"$TC_SECURITY_DIR/tcxadmin.pwf\" -g=dba -server_name=\"28000_splmlicense3\" -host_name=\"splmlicense3\" -port_number=28000 -failover_server_list=\"Default Local License Server,28000_splmlicense2,28001_<dns_subdomain_name>.license-service.prd.tcxservices.com\" -f=modify'
```

> **Important:** After completing the triad license setup, DO NOT RUN ANY COMMAND USING THE `infodba` USER.
