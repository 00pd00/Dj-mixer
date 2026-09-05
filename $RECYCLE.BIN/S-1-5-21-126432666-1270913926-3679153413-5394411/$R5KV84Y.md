### Proxy User Password File Rotation

Proxy user passwords should be changed periodically for security reasons:

1. Modify the proxy user password in TcSS LDAP on **Site1**.
2. Use that password to update the password `.pwf` file on **Site2** as described above. Keep the password file name and location the same.
3. Repeat for **Site2**.
