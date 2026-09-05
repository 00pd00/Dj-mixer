Triad license setup for TcX on containers is optional for HA deployment. This document describes the post-deployment sequence for triad licensing and related validation.

> **Important:** After performing the triad license setup, DO NOT RUN ANY COMMAND USING THE `infodba` USER.

## Perform the activities in this order
1. [Update the FTS Indexer user and password](#update-fts-indexer-user-and-password).
2. Complete triad license setup. For AWS follow automation, for Azure follow manual setup.  

## Update FTS Indexer User and Password

1. Open the LinuxServer instance.

![Open Linux host](image.png)

2. Run the following commands to edit the FTS Indexer properties:

```bash
sudo su
cd /<customer_id>-<env>/<customer_id>-<env>/deploy/component/config/TcFTSIndexer/conf
vi TcFtsIndexer.properties
```

3. In `TcFtsIndexer.properties`, update `Tc.user` to `tcxadmin`.

![Update Tc.user](image-1.png)

4. Open HashiCorp Vault.
5. Go to the environment namespace.
6. Navigate to `tcx/teamcenter/common/users`.

![Navigate to users in Vault](image-2.png)

7. Copy the `tcxadmin_usr` password.
8. Go back to LinuxServer, switch to tcx_user with: `sudo su - tcx_user`
9. Set tcc context `. tcc set_context <customer-ID> <envType> <userID>`, you can put your name in place of userID.
10. Command to update tcxadmin password: `tcc exec 'export tcenv=<tcxadminPassword copied in step7>; /apps/tc/TR/TcFTSIndexer/bin/encryptPass.sh -tc tcenv'`. Make sure, it's successful with exit_code of 0.
10. Open ArgoCD.
11. Go to the Teamcenter Argo application.
12. Sync the `ftsindexer` deployment.

![Sync in ArgoCD](image-5.png)

![Deployment sync status](image-6.png)

13. Confirm that a new `ftsindexer` pod is created.
14. Check pod logs and confirm there are no errors.
