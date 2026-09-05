# Validate the FMS Master and AuthFSC Volume Entries

This section describes how to verify that all cloud and EFS volume entries in the Teamcenter environment are correctly configured. Use your backup files and compare them with the current FMS configuration to ensure each volume points to the proper storage target.

---

## Validation Steps

### Locate Configuration Files

- **FMS Master File:**  
  ```
  /<Customer_ID>-<envtype>/<Customer_ID>-<envtype>/deploy/component/config/fmsmaster/fsc
  ```

- **Authenticating FSC File:**  
  ```
  /<Customer_ID>-<envtype>/<Customer_ID>-<envtype>/deploy/component/config/authenticatingfsc/fsc
  ```