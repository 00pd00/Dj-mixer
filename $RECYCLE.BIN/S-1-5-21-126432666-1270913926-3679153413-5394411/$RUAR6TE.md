## User On-Boarding
Our user on-boarding process is structured into two main phases: Data Generation and Comprehensive Onboarding via Script.
 
### Data Generation: Exporting On-Prem User Data
The first step involves extracting the necessary user data from the on-premise Teamcenter environment and formatting it correctly.

File Format: The output file is a pipe-delimited ( | ) CSV. The column sequence is crucial for the next step, following the pattern: 

person_name|user_id|password|SubGroup.ParentGroup|role_name|status|status_value|PA9|email_value.

Example:  
User1|user1||Enginnering.MyOrg|Designer|status|0|PA9|user1@gmail.com

*Note: password column should be empty and no spaces between the columns. Also, the CSV file must be named users.csv.

Hierarchical Groups: This process fully supports hierarchical groups, with the group_name field containing the full path (e.g., Team.Department.Organization).
Note: We are currently keeping third column for passwords empty.

On your on-prem system, use the following command to export the on-prem user data to users.csv:

t2c_report_extract -u=infodba -p=< your_password > -f=extract_admin_data -output_file=< path > /users.csv -input_user=< path > /input.txt

The command options are as follows:

- -u=infodba -p=< replace > are the credentials used to run the extraction utility.
- -f=extract_admin_data specifies the function to perform the data extraction.
- -output_file defines the path where the generated CSV will be saved, and the file must be named users.csv.
- -input_user is optional and can be used to provide a file containing user IDs for selective extraction. If it is not provided, all users are processed.

### Comprehensive Onboarding Script: TCX User Creation, SAM, and LDAP Integration
This single script orchestrates the creation of Teamcenter users and their integration with SAM and LDAP, using the generated user data file as its input.

Script Used: multisite_user_addition.sh 

### Execution Steps:

1. Download the script multisite_user_addition.sh from the following location:

https://artifacts.industrysoftware.automation.siemens.com/ui/native/genericlocal/com/siemens/tcx/multisite_tcx/

2. Export on-prem user data to users.csv using t2c_report_extract. Ensure the generated file is later available as /tmp/users.csv.

3. Upload the required files to cloud storage. You can use either AWS S3 or Azure Blob Storage to store users.csv and multisite_user_addition.sh. You will need to use your own tenant bucket

    If you are using S3, you will do the following:
    In AWS go to Console home and then search for S3 select it and then find your Bucket. Create a folder (or use an existing one) and then upload your file to this location. Copy the S3 URI from the form above by selecting the object and clicking on the copy s3 URI button. Back in your system AWS manager copy the file to the /tmp  directory. To do this you will need to use the "aws s3 cp" command. Then you will need to make a directory in the external directory and copy your file from the /tmp to the external directory.
    example command: 
    aws s3 cp s3://< tenant bucket location >/myfile.xml /tmp
    
4. Login to the TCX Linux server / DC server machine as root.

5. Copy the files from cloud storage to /tmp. You can use either AWS S3 or Azure Blob Storage to place users.csv and multisite_user_addition.sh in /tmp.

6. Change directory to /tmp.

7. Change permissions: chmod 777 multisite_user_addition.sh.

8. Switch user to tcx_user: sudo su - tcx_user.

9. Set the TCC environment context:

    . tcc set_context < tenantId > < environmentType >

10. Run the script:

    ./multisite_user_addition.sh

11. Enter required inputs, such as SAM and LDAP details, when prompted.

12. Validate user addition in TCX, SAM, and LDAP via AWC login after successful execution.
    To do this, Use get_users command:
    aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload '[[ "< SAM_ACCESS_KEY >","< SAM_SECRET_ACCESS_KEY >","us-east-1.sws.siemens.com"],["sam","GetUsers","< SAM_ACCOUNT_ID >" ]]' outputfile.txt

    Also validate the LDAP. Use this command from EC2 Corporate Server:
    tcc exec "tcxldapcli -a ldapsearch -h tc-ldap -p 10389 -D 'uid=admin,ou=system' -b 'ou=users,ou=system' -F '(objectclass=*)'"