## Pipeline fails in post-deploy with 'ldap_add: Already exists (68) ENTRY_ALREADY_EXISTS' message.

In a rare scenario pipeline fails (mostly due to credentials timeout) after creating ldap users and before saving marker (to indicate that ldap users are created) to the ansible state file. In such scenario re-run of post-deploy also fails with ENTRY_ALREADY_EXISTS (68) error as it encounters users already exist.

As a workaround, customer-information/ansible-state.yaml file in tenant repo needs to be modified.

Remove the value for 'ldap_user_md5' (sample value highlighted in yellow in the picture below) and commit changes to git repo.

![Image](./image_431.png)