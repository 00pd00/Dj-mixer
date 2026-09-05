#License Count Check Steps

License count check is required only when below three product ID's are present to allow API based access.

| Product ID | Product Name |
|------------|--------------|
| TC030760-XT | Product Configurator Vol. Gateway XT-S |
| TC030761-XT | Product Configurator Vol. Gateway XT-M |
| TC030762-XT | Product Configurator Vol. Gateway XT-L |

<!-- TODO: LCS-1293330 - Automate license count cookbook instruction in TcX using lambda functions-->
## 1. Execute License Usage Command

Run the following command using the Teamcenter command-line utility:

```bash
sudo su - tcx_user
. tcc set_context <envid>-<envtype>
```

```bash
tcc exec 'configurator_license_usage -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -outputDirPath=.'
```

This command generates the usage report for Configurator API solves.

## 2. Locate Output File

The output file will be named: `configurator_license_usage_report_timestamp.csv` 
for example : `configurator_license_usage_report_2025_12_12_04-49-14.csv`

Prefix the output csv file with customer "Sold To" id before sending the report to target recipients.

This file contains the monthly solve count data.

## 3. License Details and Solve Counting Logic

- The license permits **10,000 solves per month**.
- The solve counter increments under the following conditions:
  - **External API Calls:** Any solve API call made from outside Teamcenter.
  - **High-Value Internal APIs:** For example, calculating buildable combinations that trigger constraint evaluations.

⚠️ **Warning:** If usage exceeds the licensed volume, additional or higher-tier packages will be required.

## 4. Reporting Requirements

- Extract the monthly solve count from the output file.
- Share this report with the following stakeholders:
  - **Account Orchestrator (AO)**
  - **Customer Success Manager (CSM)**
  - **Configurator Product Manager:** Juergen Bauer [jbbauer@siemens.com]
