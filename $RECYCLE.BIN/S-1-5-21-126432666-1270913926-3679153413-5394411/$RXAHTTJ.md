## Pipeline failing at post-deploy stage while accessing secrets from vault

![Image](./image_406.png)

As work around, retry post-deploy stage, since it failed due to vault flakiness.