#### Setup S2S Connection with Management Plane

To connect with services in Management Plane, we need to setup site-to-site(S2S) connection with its network.
 <!-- TODO: replace personal ids with DL when available -->
1. Update below template and send an **ecrypted email** to [Kishan Santoki and Sayali Patki](mailto:kishan.santoki@siemens.com;sayali.patki@siemens.com;):

    ```text
    Subject: Onboard new cell [cell-id] to [test/prod] management plane
    Description: [your team name] is setting up a new cell and need VPN connection with the [test/prod] management plane. Please find below the necessary details:

        * Cell id: [GLBL_CELL_ID from the cell variable file]
        * Region: [Region of the cell]
        * Virtual Network Gateway Public IP: [Public IP of the virtual network gateway resource]
        * Address space: [Value of GLBL_CELL_EXTERNAL_MAP_ADDRESS_SPACE from cell variable file]
        * PresharedKey: [Value of `management_plane_s2s_preshared_key` from vault at connectivity/[cell_id]]
    ```

2. While processing your email request, the CApS team will take the following actions:
    1. Allow Inbound for the provided cell's `Address space` in their Security Groups for below ports and services:

        | Port | Description |
        |------|-------------|
        | 53 | DNS query |
        | 88 | Kerberos |
        | 123 | NTP |
        | 135 | RPC (DCOM) |
        | 139 | NetBIOS Session Service |
        | 389 | LDAP |
        | 445 | SMB |
        | 464 | Kerberos Password Change |
        | 636 | LDAPS |
        | 3268 | Global Catalog |
        | 3269 | Global Catalog over SSL |
        | 3389 | RDP |
        | 13738 | NetBIOS Name Resolution |
        | 28000-28001 | License Server |

    2. Create two VPN Tunnels using the provided `PresharedKey`.
    3. Reply over email with the public IPs of the two VPN Tunnels.

3. Once CApS replies with two IP addresses — one for each tunnel on their side, update your cell variables file in [tcx-pipeline-variables](https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-variables/) repo with the two IPs:

    ```sh
    GLBL_MANAGEMENT_PUBLIC_IP: "[management public ip1]"
    GLBL_MANAGEMENT_PUBLIC_IP_HA: "[management public ip2]"
    ```

4. Re-run the account pipeline using [this form](https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-account/-/pipelines/new?ref=main&var[CELL_ID]=YOUR_CELL_VARIABLE_FILENAME&var[STREAM_ID]=YOUR_STREAM_ID&var[VARIABLE_BRANCH_NAME]=YOUR_VARIABLE_BRANCH_NAME&var[stage]=manage-bootstrap-rg&var[CLOUD_ID]=YOUR_CLOUD_ID_FILENAME) to complete the VPN connection with the management plane.

    | Argument | Value |
    |----------|-------|
    | YOUR_VARIABLE_BRANCH_NAME | According to your chosen cell variable branch name |
    | YOUR_CELL_VARIABLE_FILENAME | $VARIABLES_FILENAME |
    | YOUR_STREAM_ID | According to your environment. It must match the name of one of the files present in the folder ./variables/stream/ of your YOUR_VARIABLE_BRANCH_NAME-branch |
    | YOUR_STAGE_NAME | manage-bootstrap-rg |
    | YOUR_CLOUD_ID_FILENAME | According to the name you chose for the cloud variables file in your YOUR_VARIABLE_BRANCH_NAME-branch. This variable must match the name of the new cloud variable file located in ./variables/cloud/ |

5. The status of the connection objects ([cell-id]-con & [cell-id]-con-ha) in the shared rg ([cell-id]-shared-rg) should show as `Connected` within 15 minutes of successful pipeline run.
    ![Image](./image_144.png)
    If the status does not change, coordinate with [caps](mailto:caps-platformautomation.sisw@siemens.com) and [azure architects](mailto:tc.azure.deployops.architects.disw@siemens.com) to debug the issue.

6. Commit and Push Changes

    ```bash
    git add .
    git commit -m "Add cell and cloud variables for $CLUSTER_NAME"
    git push origin feat/$CLUSTER_NAME
    ```

7. Raise an MR of `YOUR_VARIABLE_BRANCH_NAME` for merging into `main`.
