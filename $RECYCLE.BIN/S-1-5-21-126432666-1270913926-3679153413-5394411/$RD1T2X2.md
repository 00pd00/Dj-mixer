# Ingress: xAppIssuers and xAppUsers

From the prerequisite sections, you should have the following values:

- The `client_id` of the Client Credential Grant app for the xApp, or the Token Exchange app used by the xApp (this must be in the same Teamcenter X SAM account). This is optional if the access token is created directly via the Token Exchange app.
- The `iss` (Issuer ID) for the Client Credential app or Token Exchange app of the xApp (required for SAM 2.0 only). This is basically the SAMAuth `/token` endpoint.
- The list of Teamcenter Users who will act as proxies for xApp login. This is essentially a map of Teamcenter Users to their corresponding `client_id`.

The pipeline is automated to allow a set of `client_ids` to be accepted by Teamcenter X. This section provides an overview of how to define and configure Teamcenter X using `xAppIssuers` and `xAppUsers` for different SAM versions and authentication flows when integrating an xApp with Teamcenter.

## xAppIssuers

**If your xApp uses SAM 2.0:**
- Both the `iss` (Issuer ID) and the `client_id` used to generate the access token must be included. For Token Exchange, use the `iss` (Issuer ID) to generate the Exchange Token, not the initial Client Credential Grant Token. 

**If your xApp uses SAM 1.0:**
- Only the `client_id` is required.

### Examples

#### SAM 2.0 with Client Credential Grant

```yaml
XAppIssuers:
  - "sam2test-xfmauthpprod" # client_id for SAM 2.0
  - "https://nxxprod.us1.sws.siemens.com/oauth/token" # iss for SAM 2.0
```

#### SAM 1.0 with Client Credential Grant

```yaml
XAppIssuers:
  - "RSJhxFMbEmcwSojNGjl2Z" # client_id for SAM 1.0
```

#### SAM 2.0 with Token Exchange

```yaml
XAppIssuers:
  - "https://nxxprod.us1.sws.siemens.com/oauth/token" # iss for SAM 2.0
```

## xAppUsers

- Map of Teamcenter Users to their corresponding `client_id`.
- For xApps using Client Credential Grant in SAM 1.0 and 2.0, use the same `client_id` as listed in `xAppIssuers`.
- For xApps using Token Exchange, use the `client_id` of the Token Exchange app, not the xApp Client Credential Grant app's `client_id`.

### Example

#### Client Credential Grant

```yaml
XAppUsers:
  - "RSJhxFMbEmcwSojNGjl2Z:daemonuser" # client_id:tcusername
```

#### Token Exchange

```yaml
XAppUsers:
  - "sam2test-xfmauthpprod:daemonuser" # client_id:tcusername
```