# Smoke Test Validations

After deploying your application, perform these essential smoke tests to verify key system functions. These checks are designed to ensure that core components are operating as expected. As your system evolves, regularly update and expand this list of smoke tests.

## Test Cases and Expected Outcomes

| **Test Case**                           | **URL**                                                         | **Expected Result**                                                    |
|-----------------------------------------|-------------------------------------------------------------------------|-----------------------------------------------------------------------|
| **AW Login URL is Operational**         | `https://[tenant-subdomain].cloud.teamcenter.com/awc`                   | Log in successfully with the `TcXAdminUser` account.                  |
| **Authentication FSC is Operating**     | `https://[tenant-subdomain].cloud.teamcenter.com/tc/fms/authenticatingfsc` | Browser displays an error related to a missing ticket.                |
| **Fmsmaster Endpoint Accessibility**    | `https://[tenant-subdomain].cloud.teamcenter.com/tc/fms/fmsmaster`      | - **AWS:** Browser shows "Page Not Found" error - **Azure:** Browser shows "403 Forbidden" error |
| **AW Client Ping**                      | `https://[tenant-subdomain].cloud.teamcenter.com/awc/ping`              | Browser returns a "403 Forbidden" error.                              |

## Instructions for Running Smoke Tests

Follow these steps for each test case:

1. Open your web browser.
2. Navigate to the URL listed under the **URL** column.
3. Verify the result matches the **Expected Result**.
4. Record any discrepancies or unexpected behaviors for further investigation.