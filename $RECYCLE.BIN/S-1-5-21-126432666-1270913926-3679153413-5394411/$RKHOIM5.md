### Create The Shape Exchange Token

Currently the process for creating an exchange token for this product is not automated. Due to this the process highlighted here must be followed to create an exchange token for this application.

[Create Client ID for XApp Token Exchange App](https://ctcx.code.siemens.io/cookbook/docs/2512/Documentation/Tenant%20Onboarding/Enable%20xApps%20Integration%20with%20Teamcenter%20X/SAMAuth%20Application%20registration%20to%20generate%20client_id%20and%20secret%20for%20XApps/#41-create-client-id-for-xapp-token-exchange-app)

The clientId and clientSecret will be needed below and for the [Geolus Install](https://geolusxdocs.code.siemens.io/geolusxdocumentation/docs/Introduction%20and%20Scope).


### Enable TcSSO for Environment 

This requires the exchange token secret and application id and the credential grant token id and secret.

1. Locate the identityservice.xml file found here on either an Amazon EC2 or Azure FileShare machine /tenantId-envName/tenantId-envName/deploy/component/config/tc-tcss/security_services/config/identity/identityservice.xml

2. Set tcsso.oauth.issuer to the the base SAM Auth URL (including an ending /). This is used to validate the issuer of the SAM Auth Token.

3. Set tcsso.oauth.client_id to the client ID obtained when the Exchange application is registered with SAM Auth.

4. Set tcsso.oauth.client_secret to the client Secret obtained when the Exchange application is registered with SAM Auth.

5. Set tcsso.oauth.token_endpoint to the SAM Auth URL including '/token' in the ending. An example would be: https://samauth.us-east-1.siemens.com/token

6. Set tcsso.oauth.userid_claim to the claim included in the Token Introspection details that the Identity Service should use to when mapping to Teamcenter User ID.

7. Set tcsso.oauth.token_validation_method to 'jwt'.

8. Set tcsso.oauth.jwks_endpoint to the jwks_uri value for SAM Auth.

9. Set tcsso.oauth.exchange_client_id to the client ID obtained when the Exchange application is registered with SAM Auth.

10. Set tcsso.oauth.exchange_client_secret to the client Secret obtained when the Exchange application is registered with SAM Auth.

11. Set tcsso.oauth.client_credentials_scope to 'openid sam_account samauth.ten email profile'


Once all of these are set save the file. Delete the tc-tcsso pods in Argo.