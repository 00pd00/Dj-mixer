## Create a User in Teamcenter Using the `make_user` Utility

After adding the user to SAM, follow these steps to create the user in Teamcenter:

If **AWS** :
1. Log in to the **AWS Management Console**.
2. Ensure that the **Corp-Server** and **RDS** are running for the tenant environment where the CApS user needs to be added.
3. Connect to the corp server of the tenant using **Session Manager**.

If **Azure** :
1. Login to azure portal.

2. Ensure that the **Corp-Server** and **SQL MI** are running for the tenant environment where the CApS user needs to be added.

3. Connect to the CorpServer of the tenant. Follow these steps [Login to CorpServer](../../../020_Operations/030_Day%20N%20Operations/240_Login%20to%20CorpServer.md)

4. Run the following commands:

    ```bash
    sudo su - tcx_user
    . tcc set_context <tenant_id> <environment_type>
    tcc exec 'make_user -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -person=<person_name> -user=<user_name> -OSuser=<os_user> -status=0 -licenselevel=author -group=dba -role=DBA -PA9=<user_email>'
    ```
    Replace all placeholder values (e.g., `<tenant_id>`, `<environment_type>`, `<person_name>`, `<user_name>`, `<os_user>`, `<user_email>`) with the actual details for your environment and user.