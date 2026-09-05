## nxtocgmdirect and nxtopvdirect Translator Configuration

Execute following steps to configure the translators:

1. Download the [dispatcher_artifacts.zip](https://artifacts.industrysoftware.automation.siemens.com/ui/repos/tree/General/generic-local/com/siemens/tcx/tcx_documentation/tcx_install_documentation/tcx_solution_install_documentation/nx/nxtocgmdirect_nxtopvdirect.zip).
2. Unzip the content to the directory C:\temp.
3. Launch command prompt and execute following commands: 
   ```cmd
   for /D %D in (D:\Siemens\Teamcenter_*) do set INSTALL_DIR=%D
   set TC_ROOT=%INSTALL_DIR%\tc_root
   set TC_DATA=%INSTALL_DIR%\tcdata
   set FMS_HOME=%TC_ROOT%\tccs
   set TC_JRE_HOME=D:\Siemens\jdk\<java_version>
   set UGII_BASE_DIR=%INSTALL_DIR%\Dispatcher\NX
   cd /d C:\temp\nxtocgmdirect_nxtopvdirect\scripts
   powershell -ExecutionPolicy Bypass -File configure_nxtocgmdirect_nxtopvdirect.ps1 <tc_env_name>
   
   ```

   Sample output of executing the powershell command will looks like following:

   ![translator_powershell](./image362.png)

4. Launch services and restart the Teamcenter Dispatcher Module service.
##
### Testing the translators

This test will verify the nxtocgmdirect and nxtopvdirect translators are successfully configured and installed by importing a sample NX model, and then importing a workflow which will invoke the translator. If the workflow executes successfully, the translators have been successfully installed. After testing, be sure to delete all workflows and sample parts from the Teamcenter environment.

__Importing Workflow__
1. Make sure the following prerequisites are complete.
    - NX Translators installed via DC.
    - NX installed on Vis Server.
    - License Server on Vis Server updated for NX.
    - 4-Tier RAC installed and connected to the TCX environment.
    - "Dispatcher Client for Rich Client" feature installed on RAC.
2. Launch TC RAC and login using tcxadmin user.
3. Launch 'Workflow Designer'from bottom-left toolbar.

    ![Workflow Designer](./image352.png)

4. Click on <kbd>Tools</kbd> -> <kbd>Import</kbd>.
5. 'Import Workflow Template' dialog will pop. In this dialog browse to select "C:\Temp\nxtocgmdirect_nxtopvdirect\verification_artifacts\validate_nx_translator_workflows.xml".

    ![Workflow Designer](./image353.png)

6. Click <kbd>Ok</kbd> to import the workflow.
##
__Importing Test Parts__

1. Close Workflow Designer and Come back to Home screen.
2. From Menu bar navigate to <kbd>Tools</kbd> -> <kbd>Import</kbd> -> <kbd>From PLMXML</kbd>.
3. In the PLMXML Import dialog browse to select 'C:\Temp\nxtocgmdirect_nxtopvdirect\verification_artifacts\000298.xml'.
4. For Transfer mode select 'Incremental_import' option from drop-down menu.
5. Click <kbd>OK</kbd> to import the xml.
6. Check the import logs for any error. If error message as shown below is present in the log. Please ensure that prerequisites are configured appropriately.
    ```text
    ERROR      26042    Teamcenter cannot acquire a license for the module key(s): . Please contact your system administrator responsible for licensing.
    ```
7. Close the import log window.
##
__Submitting Parts for translation__

1. Search for __000298__.

    ![Search](./image354.png)
2. Imported part should be displayed.
3. Expand the __000298__ to select __000298/A;1__.

    ![SelectRevision](./image355.png)

4. With Revision Selected hit <kbd>Ctrl</kbd> + <kbd>P</kbd>.
5. 'New Workflow Process' dialog will pop. In this dialog select 'validate_nxtocgmdirect' as Process template. and Click <kbd>Ok</kbd>.

    ![AttachCGMWorkflow](./image356.png)
6. Again select __000298/A;1__ and hit <kbd>Ctrl</kbd> + <kbd>P</kbd>.
7. In 'New Workflow Process' dialog will pop. In this dialog select 'validate_nxtopvdirect' as Process template. and Click <kbd>Ok</kbd>.

__Note:__ Parts can also be submitted for translation from AW by selecting item revision and submitting it to respective workflow mentioned above.
##
__Validate the translation__

1. To validate the translation completion, Click on <kbd>Translation</kbd> menu and then click on <kbd>Administrator Console - ALL</kbd>.

    ![AdminConsole](./image357.png)

2. The Dispatcher Request Administration Console will open.
3. This should display the created nxtocgmdirect and nxtopvdirect translations. If it does not, select the __Magnifying Glass__ on the top-left toolbar to refresh. Check to make sure it is correct by comparing the part revision under Primary Objects.
4. Once the task is marked as **COMPLETE** (in green), exit the window. The translations have finished successfully. If there is an issue with Dispatcher or the translators, the task will remain in an **INITIAL** state (in red) for an extended period of time or will be marked as being in a TERMINAL State

    ![TranslationRequest](./image358.png)

5. Close the Admin Console.
##
__Delete the Data__

1. In Home window expand the __000298/A__ revision and check for directmodel dataset.

    ![TranslatedData](./image359.png)

2. RMB on __UGMASTER__ dataset under __000298/A;1__ and select __Open With__ -> __Impact Analysis__.
3. From Impact Analysis window, select both Referenced workflow and delete them by clicking on &#10060; icon in tool bar.

    ![ImpactAnalysis](./image360.png)

4. A __Delete__ window will appear listing selected workflows. Click on <kbd>OK</kbd> to confirm delete.
5. Now select the Item __000298__ and click on &#10060; icon to delete the item.
6. Launch Workflow Designer.
7. Select __validate_nxtopvdirect__  and __validate_nxtocgmdirect__ workflows one by one and delete them by clicking on &#10060; button.

    ![DeleteWorkflow](./image361.png)

    For each workflow __Delete__ dialog will pop and Click on <kbd>OK</kbd> to confirm delete action.

