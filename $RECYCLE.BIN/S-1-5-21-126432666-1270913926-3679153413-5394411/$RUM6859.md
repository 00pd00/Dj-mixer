# Egress: Sharing the Teamcenter X client_id with Other xApps

For any xApp to accept incoming REST calls from Teamcenter X, the xApp's authentication subsystem must whitelist the Teamcenter X `client_id`.

To facilitate this, you will need to share the Teamcenter X `client_id` with the administrator of the respective xApp.

- The `client_id` should be provided to the xApp administrator as required.
- The `client_id` and secret for the new SAM Auth client are securely stored at the following Vault path:
  ```
  <environment-namespace>/tcx/teamcenter/administration/client_credentials/common/client_id
  ```

> **Note: It is imperative to ensure that only authorized personnel have access to these credentials to maintain robust security. Once this `client_id` leaves the Teamcenter X Vault, it becomes the responsibility of the xApp administrator to secure it appropriately within their system.**