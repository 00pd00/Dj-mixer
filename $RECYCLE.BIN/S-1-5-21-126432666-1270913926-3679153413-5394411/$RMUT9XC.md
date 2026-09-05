### Disable Deletion Protection on RDS

Check if the 'Deletion protection' setting is disabled in the RDS Cluster. If it's enabled, follow these steps to disable it:

Steps to Disable Deletion Protection on RDS:

1. Login to the AWS Console.
2. Search for RDS using the search bar.
   ![alt text](image-2.png)
3. In the left navigation pane, select Databases.
   ![alt text](image-1.png)
4. Locate and select the RDS Cluster associated with your environment.
5. Click the Modify button.
   ![alt text](image-3.png)
6. Scroll down to the Deletion Protection section.
7. Uncheck the box labeled Enable deletion protection.
   ![alt text](image-4.png)
8. Click Continue.
9.  When prompted to choose when to apply the changes, select Apply Immediately.
10. Finally, click Modify Cluster to save the changes.
**After Updating RDS Settings:**
- Return to GitLab.
- Rerun the build-infra job.