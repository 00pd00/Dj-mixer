# Generating Client Metacache for RAC/CAD in Non-English Locales

Follow these steps to generate the client metacache, enabling RAC or CAD clients to operate correctly in non-English locale environments.

## Step-by-Step Instructions

1. Log In to the CorpServer Machine

2. Switch to the Application User
   ```bash
   sudo su - tcx_user
   ```

3. Establish the context for your customer environment
   ```bash
   . tcc set_context <customer-ID> <envType> <userID>
   ```

> **Note:**  
>  
>`<userID>` is optional and can be omitted if not needed

4. Generate the Client Metacache
   ```bash
   tcc exec 'bmide_generate_client_cache.sh -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -mode=generate -model_file=$TC_DATA/model/model.xml -target_dir=$TC_DATA/clientcache'
   ```

