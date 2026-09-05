
# FSC Virus Scanner

This guide provides clear instructions for Validating and testing the FSC Virus Scanner.

---

## Testing the Virus Scanner on FSC

Testing the virus scanner requires uploading two types of files: a clean file and an EICAR test file.

### Testing with a Clean Text File

Upload a sample text file to FSC using Active Workspace or some other client install. The text may contain any title or sample message. Uploading such a file will display as normal in the proper directories after a successful virus scan.

Perform these steps to validate successful scanning of a clean file.

#### Steps:

1. **Create a Sample File:**  
   Create a file called `test_upload_clean.txt` containing the text:  
   ```
   SAMPLE TEXT MESSAGE IN SAMPLE FILE FOR VIRUS SCANNER
   ```

2. **Upload the File Using Active Workspace (AWC):**
   - Log in to AWC.<br/>
     ![alt text](image_230_00.png)
   - Select **NEW PART**.
   - Modify the Name to `fsc_test_upload` and select **Add**.<br/>
     ![alt text](image_230_01.png)
   - Click on **Attachments** for the `fsc_test_upload` part.<br/>
     ![alt text](image_230_02.png)
   - Under the **FILES** section, click the **+** button.<br/>
     ![alt text](image_230_03.png)
   - Click **Choose File**, select `test_upload_clean.txt`, and click **Add**.<br/>
     ![alt text](image_230_04.png)
   - Confirm the upload was successful; the file should appear in the appropriate directory.<br/>
     ![alt text](image_230_05.png)
   - Delete the uploaded `test_upload_clean.txt` after testing.

### Testing with EICAR Virus Scanner Test File (Disk volume)

Upload a sample text file to FSC using Active Workspace or some other client install. The recommended text should be a non-malicious text string that will be handled the same as a virus. The EICAR test string is available for use. Uploading such a file will not display as normal in the proper directories after a failed virus scan and an error message will alert the user of the upload failure.

#### Steps:

1. **Create the EICAR Test File:**  
   Create a file named `test_upload_eicar.txt` containing the following line:

   ```
   X5O!P%@AP[4\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*
   ```

2. **Upload the EICAR Test File:**
   - Under the **FILES** section, click the **+** button.<br/>
     ![alt text](image_230_06.png)
   - Click **Choose File**, select `test_upload_eicar.txt`, and click **Add**.<br/>
     ![alt text](image_230_07.png)
   - Confirm the upload fails. You should see an error message indicating the upload was unsuccessful.
     ![alt text](image_230_08.png)<br/>
     ![alt text](image_230_09.png)

3. **Optional: Verify Virus Scanner Error in Logs:**  
   Check the web server logs on Datadog for error messages related to the virus scan failure.
   
   > Note : 
   > You might see the message similar to this -
   >```
   > ...the file was not uploaded beacause it contains a virus. Please contact your administrator.
   >```

### Testing with EICAR Virus Scanner Test File (Cloud volume/DSS Volume)
Upload a sample text file to FSC using Active Workspace or some other client install. The recommended text should be a non-malicious text string that will be handled the same as a virus. The EICAR test string is available for use. Uploading such a file will be successful since virus scanning for DSS volumes happens asynchronously in the background. Subsequently, downloading such a file (test virus file), will error out during the download operation with a virus scan failure error, once the file has been scanned by the DSS asynchronous scanner.
#### Steps:
1. **Create the EICAR Test File:**  
   Create a file named `test_upload_eicar.txt` containing the following line:
   ```
   X5O!P%@AP[4\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*
   ```
2. **Upload the EICAR Test File:**
   - Under the **FILES** section, click the **+** button.<br/>
     ![alt text](image_230_06.png)
   - Click **Choose File**, select `test_upload_eicar.txt`, and click **Add**.<br/>
     ![alt text](image_230_10.png)
   - Confirm the upload sucessfull. You should see an sucess message indicating the upload was successful.
     ![alt text](image_230_11.png)
3. **Download the EICAR Test File:**
   - Click **Choose File**, select `test_upload_eicar.txt`, and click **download**.<br/>
   - Confirm the download fails. You should see an error message indicating the download was unsuccessful.
     ![alt text](image_230_12.png)
4. **Optional: Verify Virus Scanner Error in Logs:**  
   Check the web server logs on Datadog for error messages related to the virus scan failure.
   
   > Note : 
   > You might see the message similar to this -
   >```
   > ...-9055:ERROR_DSS_VIRUSSCAN_FAILURE_0 , The file cannot be downloaded because virus scanning failed. Scan status : INFECTED,...
   >```

#### Notes for Cleanup

- Ensure you delete the EICAR test file from both:
  - The `tcx` environment (especially if the virus scanner failed and allowed it through)
  - The local PC where you accessed the AWC URL