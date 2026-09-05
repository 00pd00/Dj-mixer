# Manual externalized DB backups

The automated backups currently store database snapshots associated with the respective database. Externalized backups export the database information to a designated storage account, which allows to manage the backup information separately.

## Introduction

Ad-hoc backups allow you to create on-demand backups of your SQL Managed Instance databases. This is useful for scenarios such as:
- Preparing for major changes to the database.
- Creating a backup before performing maintenance tasks.
