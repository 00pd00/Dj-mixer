

#### Deploy required CRDs in the cluster

1. Checkout a branch in https://gitlab.industrysoftware.automation.siemens.com/gitops/tcx-stormruntime/-/tree/main

    ```bash
    git clone git@gitlab.industrysoftware.automation.siemens.com:gitops/tcx-stormruntime.git 
    cd tcx-stormruntime/
    git checkout -b crds/[cluster-name]
    ```

2. Go to crds folder according to your region.

    | **No.** | **Region** | **Folder Name** | 
    |---------|--------|-----------------|
    | 1 | us-east-1, us-central | crds |
    | 2 | eu-central-1, germany-west-central | crds-emea |
    | 3 | ap-northeast-1 | crds-apac |

    ```bash
        cd <Your Folder Name>
    ```

3. Create a new folder for your cluster by copying existing folder (eg. azm-eaus-tcx-preprod53)

    ```bash
    mkdir [cluster_name]
    cp -r azm-eaus-tcx-preprod53/* ./[cluster-name]
    cd [cluster-name]
    ```

4. Update fqdnnp-operator/config.json to point to your cluster:

    ```json
    {
      "app": {
        "name": "<cluster-name>-fqdnnp-operator",
        "source": "https://gitlab.industrysoftware.automation.siemens.com/gitops/xcr-crds/tcx.git",
        "revision": "main",
        "path": "fqdnnp-operator",
        "clustername": "<cluster-name>",
        "namespace": "tcx-cluster-fqdnnp-operator"
      }
    }
    ```

5. Update tcx-cluster-resources/config.json to point to your cluster:

    ```json
    {
      "app": {
        "name": "<cluster-name>-cluster-resources",
        "source": "https://gitlab.industrysoftware.automation.siemens.com/gitops/xcr-crds/tcx.git",
        "revision": "main",
        "path": "tcx-cluster-resources",
        "clustername": "<cluster-name>",
        "namespace": "tcx-cluster-resources"
      }
    }
    ```
6. Add, commit and push your changes.

   ```bash
   git add .
   git commit -m "Add CRDs for [cluster-name]"
   git push origin crds/[cluster-name]
   ```

7. Create an MR and mark below for review:
    - Yuvraj Chaudhary
    - Tushar Bhasme
    - Aishwarya Mehta
