#  Copy Files from TCX Essentials EFS to Standard/Advanced/Premium EFS

This guide explains how to identify, copy, and update imanfiles when migrating from Teamcenter X Essentials to Teamcenter X Standard, Advanced, or Premium. The steps ensure that all relevant files are properly migrated between EFS volumes using the `DSSVaultRewiring.jar` utility.

## Overview

When you migrate any Teamcenter X Essentials imanfiles (owned by `infodba`) to Teamcenter X Standard/Advanced/Premium, you need to transfer their physical files from the Essentials EFS volume to the new EFS volume. This process involves:

- Identifying all imanfiles that point to the `tempadminvol` volume
- Copying the physical files from the Essentials EFS volume to the new EFS volume
- Updating the imanfiles to reference the new EFS volume instead of `tempadminvol`

The utility `DSSVaultRewiring.jar` (with the `efsvolume` option) performs these actions.

---

## Prerequisites

- Both the source (Teamcenter X Essentials) and destination (Teamcenter X Standard/Advanced/Premium) EFS volumes must be mounted and accessible from the machine where you will run the utility.
- Obtain the `DSSVaultRewiring.jar` utility (see the related section “DSSVaultRewiring.jar” in your documentation for download instructions).
- Ensure you have necessary credentials for the database and file system.

---

## Migration Steps

### 1. Identify Imanfiles to Migrate

Identify all imanfiles that currently point to the `tempadminvol` volume. These are the files to be migrated.

### 2. Prepare File Copy Locations

Use absolute file paths for both the source and destination folders.

**Example Source Folder Path:**
```
/tc200900-prd/tc200900-prd/deploy/tc_adminutils/admin_work/tcxlite2tcx/tcxlite/tcxlt605-prd-ipdata/tcxlt605-prd-ipdata/ipdata/fms/volumes/DefaultVolume/
```

### 3. Run the Migration Utility

The `DSSVaultRewiring.jar` utility performs identification, copying, and updating in one step.

**Syntax:**
```bash
java -jar DSSVaultRewiring.jar efsvolume \
  databasename=<databasename> \
  databasehostname=<databasehostname> \
  databaseusername=<databaseusername> \
  databasepassword=<databasepassword> \
  sourcevolumename=<sourcevolumename> \
  sourcevolumefolder=<sourcevolumefolder> \
  destinationvolumename=<destinationvolumename> \
  destinationvolumefolder=<destinationvolumefolder> \
  skipfilecopy=false
```
> **Note:** Always use absolute paths for `sourcevolumefolder` and `destinationvolumefolder`.

### 4. Example Usage

```bash
sudo su
export JAVA_HOME=/siemens/openjdk/11.0.16.8.1
export PATH=$PATH:$JAVA_HOME/bin
java -version
cd /administration/admin_work/tcxlite2tcx
java -jar DSSVaultRewiring.jar efsvolume \
  databasehostname=rdsaurora-prd-tc200900-databasecluster.cluster-cxhfm2koelae.us-east-1.rds.amazonaws.com \
  databasename=tcxdb \
  databaseusername=dbuser \
  databasepassword=rOeSvqg6u4yfX8jS \
  sourcevolumename=tempadminvol \
  sourcevolumefolder=/tc200900-prd/tc200900-prd/deploy/tc_adminutils/admin_work/tcxlite2tcx/tcxlite/tcxlt605-prd-ipdata/tcxlt605-prd-ipdata/ipdata/fms/volumes/DefaultVolume/ \
  destinationvolumename=DefaultVolume \
  destinationvolumefolder=/tc200900-prd-ipdata/tc200900-prd-ipdata/ipdata/fms/volumes/DefaultVolume/ \
  skipfilecopy=false
```

### 5. Set Ownership and Permissions

After file migration, assign correct ownership and permissions to the files and folders.

```bash
# Change ownership for the specific file
chown 999:999 jtds_arc_zvp01loaijjhl.jt

# Set secure read permissions for a file
chmod 400 si_imag_ima_pi800nnaijfkf.png

# Set proper execute permissions for the folder
chmod 755 <folder_name>
```

---

## Utility Help Reference

To review available options and arguments, use:

```bash
java -jar DSSVaultRewiring.jar efsvolume \
  databasename=TCXDatabasename \
  databasehostname=TCXhostname \
  databaseusername=TCXdatabaseusername \
  databasepassword=TCXdatabasepassword \
  sourcevolumename=tempadminvol \
  sourcevolumefolder=TCXLiteEFSvolumepath \
  destinationvolumename=TCXEFSvolumename \
  destinationvolumefolder=TCXEFSvolumepath \
  skipfilecopy=false
```

---

## Argument Reference Table

| Argument                | Required | Description                                                                                                                      |
|-------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------|
| `efsvolume`             | Yes      | Specifies that the utility performs EFS volume rewiring.                                                                         |
| `databasehostname`      | Yes      | The endpoint of the RDS service. Find it in `customer_infrastructure.json` (`rds.endpoint`), or AWS Console > Databases.         |
| `databasename`          | Yes      | From `customer_infrastructure.json` (`rds.dbname`). Usually `tcxdb`.                                                            |
| `databaseusername`      | Yes      | From `customer_infrastructure.json` (`rds.dbuser`). Usually `dbuser`.                                                           |
| `databasepassword`      | Yes      | From `customer_infrastructure.json` (`rds.dbpassword`).                                                                          |
| `sourcevolumename`      | Yes      | Name of the source volume in the database (typically `tempadminvol`).                                                            |
| `sourcevolumefolder`    | Yes      | Absolute path to the source EFS volume folder.                                                                                   |
| `destinationvolumename` | Yes      | Name of the destination Teamcenter X EFS volume.                                                                                 |
| `destinationvolumefolder`| Yes     | Absolute path to the destination EFS volume folder.                                                                              |
| `skipfilecopy`          | Yes      | Whether to skip copying OS files. Set to `false` for normal execution, set to `true` only if needed for special scenarios.      |