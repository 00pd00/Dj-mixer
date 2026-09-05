# Product Configurator Deployment

**Applicable Product IDs:** TC030718-XT, TC030719-XT, TC030720-XT, TC030722-XT, TC030760-XT

To deploy Product Configurator, add a specific entry to the AM Rule Tree. Execute the following commands from the DC Server Linux machine:

```bash
sudo su - tcx_user
. tcc set_context <tenant_id> <env_type>
tcc exec 'cfg0_install_am_rule -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf  -g=dba -mode=install'
```
