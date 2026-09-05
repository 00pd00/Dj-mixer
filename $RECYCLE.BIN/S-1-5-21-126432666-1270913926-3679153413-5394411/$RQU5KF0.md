# LDAP Sync

This document outlines the steps required to synchronize LDAP user entries between the source and replica environments. The process involves exporting LDAP users from the source, copying the export file to the replica, importing the file on the replica, and deactivating certain Teamcenter users in the replica environment.

---

## 1. Export LDAP Users File from the Source Environment

1. **Log in to the Source Environment:**  
   Connect to the Linux EC2 machine (DC server) of the **source environment**.

2. **Switch to tcx_user and Set the TCC Context:**  
   Configure the TCC (Teamcenter Command Center) context to enable running administrative utilities by executing:
   ```bash
   sudo su - tcx_user
   . tcc set_context <tenantId> <envType>
   ```
   **Example:**
   ```bash
   sudo su - tcx_user
   . tcc set_context tenant01 prd
   ```

3. **Export LDAP User Entries:**  
   Run the following command to export all LDAP user entries into an LDIF file:
   ```bash
   tcc exec "tcxldapcli -a ldapsearch -h tc-ldap -p 10389 -D 'uid=admin,ou=system' -b 'ou=users,ou=system' -F '(objectclass=*)' > ldap_export_all_entries.ldif"
   ```

---

## 2. Copy LDAP Users File to the Replica Environment

1. **Transfer the Exported File:**  
   Copy the file **/administration/admin_work/ldap_export_all_entries.ldif** from the source environment to the corresponding directory on the Linux EC2 machine (DC server) of the **replica environment**:
   ```
   /administration/admin_work/ldap_export_all_entries.ldif
   ```

---

## 3. Import LDAP Users File to the Replica Environment

1. **Log in to the Replica Environment:**  
   Access the Linux EC2 machine (DC server) of the **replica environment**.

2. **Switch to tcx_user and Set the TCC Context on the Replica:**  
   Set the context using the same command structure:
   ```bash
   sudo su - tcx_user
   . tcc set_context <tenantId> <envType>
   ```
   **Example:**
   ```bash
   sudo su - tcx_user
   . tcc set_context tenant01 dev
   ```
   
3. **Import the LDAP Users:**  
   Execute the following command to import the LDAP user entries:
   ```bash
   tcc exec 'tcxldapcli -a ldapadd -f /administration/admin_work/ldap_export_all_entries.ldif -c'
   ```

---

## 4. Inactivate Teamcenter Users in the Replica Environment

After importing the LDAP entries, you must inactivate certain users to maintain proper operational security in the replica.

1. **Log in to AWC:**  
   Sign in to the AWC interface as a user belonging to the DBA group in the **replica environment**.

2. **Navigate to the People Section:**  
   Go to the **People** tile and select the **Users** tab.

3. **Update User Status:**  
   For each user (except the exceptions listed below), edit the user’s details and change the **Status** to **1 inactive**.

4. **Exceptions:**  
   Do not change the status for the following users (if they exist):
   ```bash
   infodba, tcx_user, tcxadmin, dcproxy, adminconsoledaemonuser, yytcxautotest, ProjProxy
   ```
   
   ![Image](./image_030_inactive_user.png)

---

By following these steps, you will successfully synchronize LDAP entries between the source and replica environments and ensure that the replica is correctly configured for further operations.