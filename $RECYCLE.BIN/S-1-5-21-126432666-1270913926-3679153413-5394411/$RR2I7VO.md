## 3 Validation steps

**Test if TcIF is up and running**

- Run the following command to check if TcIF process is running:
```bash
ps -ef | grep tcif
```
- The following command checks if TcIF is listening on it's REST port. The port value can be obtained from `restservices.port` property in `/siemens/tcif/tcif/container/etc/system.properties` file.
```bash
lsof -i:<port value>
```