# Ingress: Bootstrapping xAppIssuers and xAppUsers in a New Deployment

For a Teamcenter X deployment to accept your `client_id` at login, the `client_id` must be whitelisted and mapped to a valid Teamcenter (TC) username.

**Example Scenario:** You have three xApps attempting to connect to Teamcenter X using an OAuth token-based authentication system:

- xApp 1: Registered in SAM 1.0 and configured with Client Credential Grant.
- xApp 2: Registered in SAM 2.0 and configured with Client Credential Grant.
- xApp 3: Registered in SAM 2.0 and configured with Token Exchange.

To bootstrap a new deployment, update your pipeline input with the following parameters as needed:

```yaml
XAppIssuers:
  - <xApp 1 client_id> # issuer id is not needed with SAM 1.0
  - <xApp 2 issuer id>
  - <xApp 2 client_id>
  - <xApp 3 issuer id> # client_id is not needed for Token Exchange; this is the issuer id for Token Exchange ooly
XAppUsers:
  - <xApp 1 client_id:tcdaemonusername1>
  - <xApp 2 client_id:tcdaemonusername2>
  - <xApp 3 client_id:tcdaemonusername3>
```

# Product ID-based xAppUsers and xAppIssuers

## Teamcenter X Essentials:
To configure these SKUs, the following parameters are mandatory to pass:

### Dev/Preprod TCX deployment (ECA ID starts with 500* (internal ECA)):
```yaml
XAppUsers:
  - "CVaM0mBQZJFuCVztGld8H:adminconsoledaemonuser" 
```

The above `XAppUsers` is owned by PES. Please contact `Christopher Fronk` or `Bharath Chandrasekhar` to validate whether the value is up to date.

### Dryrun/Prod TCX deployment (ECA ID starts with 100* (external production ECA)):
```yaml
XAppUsers:
  - "57CQZj1Gvy0u9tLFSlMzq:adminconsoledaemonuser"
```

The above `XAppUsers` is owned by PES. Please contact `Christopher Fronk` or `Bharath Chandrasekhar` to validate whether the value is up to date.

## NXX35100 or TC30600-XT with any tier (other than essentials):
Use these SKUs to automatically add pre-defined XAppIssuers and XAppUsers to the deployment.

## TC31301-XT

> **Note:** These entries are not needed for production environment. We are targeting 2612 Release for production.

### Dev/Preprod TCX deployment (ECA ID starts with 500* (internal ECA)):

#### EU Region (eu1):

```yaml
XAppIssuers:
  - "spdmxapi"
  - "spdmxserver"
  - "https://tcsimeupprod.eu1.sws.siemens.com/oauth/token"
```

#### US Region (us1):

```yaml
XAppIssuers:
  - "spdmxapi"
  - "spdmxserver"
  - "https://tcsimpprod.us1.sws.siemens.com/oauth/token"
  - "https://tcsimdev.us1.sws.siemens.com/oauth/token"
```
