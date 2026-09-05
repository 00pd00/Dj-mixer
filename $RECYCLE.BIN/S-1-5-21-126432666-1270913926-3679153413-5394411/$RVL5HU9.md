## 1. Migrate AIG from pTcX to cTcX with AIG AWS (per request by CAPS as this was already tested)

## Scope 

- Migrate from TcX 14.x and AIG 23.1 to cTcX 2512 with AIG 2512

Supported products:

|  ProductID|   DC artefacts   	                                                | 
|TC10316-XT |   GS_Base,ITK,ai0activeintegration,activeintegration4awsource,webdv4awsource,aie0activeintegrationextensions,GS_T4O,t4oebs,FOSS |
|TC10317-XT |   GS_T4EA,t4ea,FOSS |
|TC10318-XT |   GS_Base,ITK,ai0activeintegration,activeintegration4awsource,webdv4awsource,aie0activeintegrationextensions,GS_T4EA,t4ea,FOSS |
|TC10320-XT |   GS_Base,ITK,ai0activeintegration,activeintegration4awsource,webdv4awsource,aie0activeintegrationextensions,GS_T4S4,GS_T4ST,ais0gateway,t4s,GS_4S_EXT_LIB,FOSS |

## Background
- This migration moves TcX from a process-based architecture (pTcX) to containers (cTcX)—a significant  (breaking) change.
- Automation in TcX migration only covers TcX; for AIG only DC artifacts are carried over; you must install AIG from scratch.
- Be sure to back up data, prepare customer configuration files, and verify that all necessary test files and deployment descriptions are available.

### Key Changes: pTcX vs. cTcX AIG

-   No corporate servers: AIG now runs on a standalone box.
- 	AIG GS components: You can use up to 8 GS (beofre it was max 4); business configuration must be split among these.
-	This means the business configuration must now be distributed between 8 GS. 
-	Hostnames: Change from Corporate Server to AIG EC2 in configurations.
-	Connectivity: All external traffic now routes through AIG GS, not the Corporate Server EC2.
-	Resource usage & costs: AIG can’t use Corporate Server resources—some customers may see cost changes (can go down or up).
-   Stricter guidelines in 2512: Keep only 1 GS open for incoming external traffic; business configs (e.g., Pipelines, TCL mappings) must be identical across all 8 GS.

### High level step by step approach installation
1. Migrate pTcX using the TcX Cookbook.
2. Verify TcX functions as expected.
3. Install AIG with previous product IDs.
4. Use the AIG Cookbook for a clean  new installation.
5. If verification passes, AIG migration is complete (except customer specific configuration).
6. Re-run installation verification and update DCs as needed (can also affect other servers).

--> result: AIG migration done; ready to import configuration

### Customer specific configuration 

- Customer-specific configs are handled by the project; product issues don’t cover configuration errors.
-   If needed, create a new service project for unresolved configuration problems. the next aspects helps to guide you in case the configuration descriptions are not sufficent - if general problems occur which only covers project configuration - a new service project must be conducted

Follow these steps:
- Deploy and reexecute everything written in the project description 
- If only encrypted rftd files are available (not .sd), contact the customer—.sd files are required
- Follow the migration guide of the used products - only conduct AIG related steps (configuration updates are not part of cookbook description but as a reference): 
    - T4EA TC10318-XT & TC10317-XT: 
        - https://docs.sw.siemens.com/en-US/doc/281683587/PL20250320470628244.T4EA_sc.xid1395389/xid1394297
    - S4S TC10320: 
        - PLMSI Connector: https://docs.sw.siemens.com/en-US/doc/281683587/PL20250722176361661.T4ST_sc.xid1395389/xid1394297
        - RFC BAPI connector: https://docs.sw.siemens.com/en-US/doc/281683587/PL20250722176373352.T4S_sc.xid1395389/xid1394297
    - T4O TC10316-XT:
        - https://docs.sw.siemens.com/en-US/doc/281683587/PL20250722176368247.T40_sc.xid1395389/xid1394297
- Ensure all configuration/files are identical across all 8 GS (except for server instances handling incoming requests—only one GS should handle these).
- Perform hot deploys/restarts as needed.
- Check and configure security (AIG itself-  VPN or mTLS).
    - Switching from VPN to mTLS can save costs, but must be tested and agreed with the customer (follow cookbook guides).
- Execute all required tests as documented; if not possible, customer is responsible for running them.

Known issue 
* Cyberark Log with attachment not accessible - workaround by CAPS with portforwding known (not part of cookbook)

Troubleshooting & help during Migration / experience from Dry Run  (not related to AIG but to help to find problems)

- Check FSC configuration / DSS policy must be correct
- dcproxy user must be in active state
 