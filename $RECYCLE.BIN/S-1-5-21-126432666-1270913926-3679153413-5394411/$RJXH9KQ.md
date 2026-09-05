# Bootstraping SAM Scopes for a New Deployment

## TC-X Essentials

Below steps are required for TC-X Essentials deployments.  These steps are not needed for any other TC-X tiers.

### Ansible Input

For TC-X Essentials new deployment add the following to the ansible input.  This will add the necessary scopes and submit the scopes for approval.

```yaml
SamAuthScope:
  - sam_account
  - samauth.ten
  - profile
  - read:apikey
  - samauth.skey
  - sws.lcs.cs.r
  - sws.lcs.cs.home.con.w
  - sws.lcs.cs.home.all
  - sws.lcs.cs.proj.all
SamAuthScopeApproval: true
```

### Submit FDS Ticket

After running the pipeline once the SAM Auth application is created a ticket needs to be filed with FDS in order for them to approve the scopes.

Open an [FDS ticket](https://fdsone.atlassian.net/servicedesk/customer/portal/302) to request the approval. Provide your appId (from the SAMAuth URL like: /app/&lt;appId&gt; ), and your ECA. NOTE: Unless the app is approved with new scopes, the new scopes will not be active.