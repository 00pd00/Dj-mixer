## IDF Customers update

```bash
sudo su - tcx_user
.  tcc set_context <customer-ID> <envType> <userID>
tcc exec 'import_file -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -f= -d=RHAPSODY _BHM_INT_DEF_FILE -ref=Text -type=Text -de=r'
```

