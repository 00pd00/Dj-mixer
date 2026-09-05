## How to Request a Teamcenter X Cloud License

To obtain a Teamcenter X Cloud License file, follow the steps outlined below:

### 1. Log TAC LX IRs

- Log TAC LX Incident Reports (IRs) to request:
  - Customized licensing
  - Non-integrated licensing
  - Shipments

### 2. Request a New License via TAC LX

After ensuring you have a TAC account and are logged in at the [TAC Portal](https://tac.industrysoftware.automation.siemens.com/):

1. Select **New IR**.
2. Enter `1105626` in the **Site** field.
3. In the **Contact** field, enter `+` and add yourself by completing all required fields (marked with a red bar).
4. For **Assignee**, enter `GDS_LIC_NSTD`.
5. The **Family** will default to `FIN_O2C` and **Application** to `GDS_LICENSING`.
6. Set **Function** as `NON_INTEGRATED`.
7. Set **Subfunction** as `MISCELLANEOUS`.
8. In **Subject**, enter:  
   “Request non-standard license”
9. In the **Case Description** text field, provide:
    - **Container ID**: (See Step 3 on how to obtain this)
      *Note*: For triad license file provide 3 container ids
    - **Host ID**: if applicable (See Step 4 for details)
    - **Price book products**: For example, `TC030108-XT`  
      *Note*: You must use product ID numbers from the [PriceBook Application](https://siemens.com). Files with only feature names or descriptions cannot be accepted.
    - **Quantity**: Specify quantity.  
      If you have more than 10 products to request, submit a spreadsheet with products listed in the first column and quantities in the second column for clarity and efficiency.  
      *Note*: To get the product ID and license quantity per product, refer to the [LIO Tool](https://lio.preprod.bas.sws.siemens.com/).
    - **Version**: For example, `TcX 2412`
    - **Expiry Date**: `xx/xx/xxxx`
10. Click **Create**.
11. The Licensing team will review your case and respond to you.

### 3. Generate a Container ID String

- The Container ID is unique and formatted as `CTCX` followed by the customer’s 10-digit sold-to ID (e.g., `CTCX0123456789`).

**How to Get the Sold-to ID:**
- Go to the corporate server of the instance and run:
  ```bash
  cd /siemens/LicenseServer/ActiveLicenses/
  cat ugslmd.lic
  ```
- Look for the entry: `Sold-To/Install: <sold-to ID>`

### 4. Get the Hostname

Run:
```bash
echo $HOSTNAME
```

### 5. Additional Notes

- This request is for a Teamcenter X Cloud License, intended for environments managed by Siemens DISW personnel.

### 6. Contact & Support

- For assistance, email: [licensing-component-help.plm@siemens.com](mailto:licensing-component-help.plm@siemens.com)

---

**Reference**  
Below is an example of a completed IR form:

![Sample IR Form](./image_325.png)  
**Figure 2**: A sample IR form.
