
##### Prepare the scripts to execute

1. Clone the `tcx-pipeline-account` repo:

    ```bash
    git clone git@gitlab.industrysoftware.automation.siemens.com:tcx-deploy/tcx-pipeline-account.git
    ```

2. Check out the tag provided during handoff:

    ```bash
    cd tcx-pipeline-account
    git checkout <tag-name>
    ```

3. Navigate to the `scripts` folder over any editor .

4. Set valid values for environment variables related to your cell by referring variable referemce guide for [0_cell_env_vars.sh](./010_Variable%20Reference%20Guide/000_cell_env_vars.sh.md) and [0_cloud_env_vars.sh](./010_Variable%20Reference%20Guide/010_cloud_env_vars.sh.md).

5. Zip all files in the `scripts` folder:

    ```bash
    tar -czvf scripts.tar.gz scripts/
    ```
  