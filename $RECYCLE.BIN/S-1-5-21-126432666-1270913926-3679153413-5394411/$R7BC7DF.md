# Create Admin License Server

To enable Teamcenter X operating users to connect to the tenant deployment, it is necessary to create a separate admin license server object within the tenant deployment. This can be accomplished using the `license_server_maintain` admin utility with required parameters through the `tcc` command. For detailed instructions, please refer to the section on [Executing Teamcenter ITK Utilities in a Containerized Environment](../../020_Operations/030_Day%20N%20Operations/020_Executing%20Teamcenter%20ITK%20Utilities.md#executing-teamcenter-itk-utilities-in-a-containerized-environment).

## Command to Create Admin License Server Object

Run the following command after replacing the placeholders with appropriate values for `<infodba-passwordfile-path>`, `-server_name`, `-host_name`, and `-port_number` parameters:
- `-server_name=<license server name>`: The admin license server name.
- `-host_name=<host name>`: The machine hosting the admin license server.
- `-port_number=<port number>`: The port number of the admin license server.

```bash
tcc exec 'license_server_maintain -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -server_name=<server name> -host_name=<host name or host IP> -port_number=<port number> -f=create'
```

Example:
```bash
tcc exec 'license_server_maintain -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -server_name=managementlicense -host_name=managementlicense -port_number=28000 -f=create'
```

**Note**: If the server name contains SPACES, then wrap it in `"\"`

Example:
```bash
tcc exec 'license_server_maintain -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -server_name=\"Default Admin License Server\" -host_name=\"10.149.27.75\" -port_number=28000 -f=create'
```

Once the license object is created successfully, make sure it is listed in the `-f=list` command result:
```bash
tcc exec 'license_server_maintain -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -f=list'