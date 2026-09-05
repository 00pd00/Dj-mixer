# Post Deployment

To perform the below steps, it may take 10min of your time.

Add users under the below selected roles using Admin role.

![Image](./image_1.png)
![Image](./image_2.png)
![Image](./image_3.png)
![Image](./image_4.png)

## AW Full Index
Run a full index.

1. Login to DC Server Linux EC2 machine as tcx_user

2. Set context for tcc CLI by running following command:
   (Substitute appropriate values for tenantID and environmentType parameters)
   ```bash
   . tcc set_context \<tenantID\> \<environmentType\> tcx_user
3. Administrator would then execute the utility using tcc exec command. Please refer examples below for more details.
    ```bash
    tcc exec \<admin-util-cmd-with-args\>
    tcc exec '$TC_ROOT/TcFTSIndexer/bin/runTcFTSIndexer.sh -task=objdata:index'

**Please Note: This  AW Full Index step is not necessary if EasyPlan X is being installed as part of a fresh install along with other templates.
It needs to be executed if EasyPlanX is being added as part of an add on install.**
