## Teamcenter Xcelerator Proxy (TXP) microservice endpoints validation

Once deployment is successful, verify that the TXP endpoints have been configured correctly by executing the following steps:
1. In a browser, log in to AWC with the `TcXAdminUser` account.
2. Open another tab and enter the verification URL - `https://[tenant-subdomain].cloud.teamcenter.com/awc/tc/micro/txp/verify/endpoints`.
3. Verify that the page displays "status" as 200, and "data" as "Status Success" or "OK" for all the endpoints.
 ![Image](./image_362.png)