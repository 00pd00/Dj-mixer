## Updating the License File in an Existing Environment

This section outlines the process for updating a license file in an existing environment. These steps are similar to the [License Configuration for the Initial Installations](./010_License%20Configuration%20for%20the%20Initial%20Installations.md) process described previously.

### 1. Update License Server Host in the License File

- Replace `localhost` with your License Server Host's hostname (e.g., `ip-10-254-9-166`).

### 2. Specify the `saltd` Port Number

- Locate the line in the license file where `VENDOR` is mentioned.
- Add the following details:
  - Specify the `saltd` location.
  - Set the port number: `PORT=28001`.

  ![Cloud License File Updated](./image_326.png)  
  **Figure 3**: Cloud License File updated for a specific environment (updates highlighted in yellow).

- **Note**: If the license file uses `Composite` instead of `CONTAINER`, manually replace all instances of `Composite` with `CONTAINER`.

  ![Composite ID Example](./image_327.png)  
  **Figure 4**: License File showing `Composite ID` instead of `CONTAINER`.

### 3. Configure the Teamcenter License Server

- Replace the current Teamcenter License Server License File with the Cloud License file (`ctcx.lic`) obtained from the tenant’s GitLab repository.
- Create a file named `/opt/Siemens/siemens_container_id.txt` on the license server machine and add the `CONTAINER` value from your license file.

  **If the `/opt/Siemens` directory does not exist, create it with the following commands (run as root):**
  ```bash
  mkdir /opt  # This command might not be needed if /opt already exists.
  cd /opt
  mkdir Siemens
  cd Siemens
  touch siemens_container_id.txt
  vi siemens_container_id.txt
  ```
  - Paste the `CONTAINER` value into `siemens_container_id.txt`.

  ![Siemens Container ID File](./image_328.png)  
  **Figure 5**: Example Siemens Container ID File.

  ![Sample siemens_container_id.txt](./image_329.png)  
  **Figure 6**: Sample `siemens_container_id.txt` file.

### 4. Update and Reapply the License

1. Log in to the DC corporate server as `tcx_user`.
2. Stop the `saltd` service:
   ```bash
   sudo systemctl stop saltd
   ```
3. Navigate to the ActiveLicenses directory:
   ```bash
   cd /siemens/LicenseServer/ActiveLicenses/
   ```
4. Change ownership of the Cloud License File (`ugslmd.lic`):
   ```bash
   sudo chown saltd:saltd ugslmd.lic
   ```
5. Reboot the corporate server:
   ```bash
   sudo reboot
   ```
6. After reboot, check the status of the license daemon:
   ```bash
   sudo systemctl status saltd
   ```
   - Verify that the service is up and running.
   - **Note**: If `saltd` does not start automatically, start it manually:
     ```bash
     sudo systemctl start saltd
     ```
