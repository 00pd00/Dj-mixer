# Password Maintenance

This section covers credential rotation operations organized by rotation frequency according to security best practices.

## Rotation Schedule Overview

### Annual Rotation (1 Year)
- [Azure Storage Account Key Rotation](./010_Annual_Rotation/010_Azure%20Storage%20Account%20Key%20Rotation.md) - Symmetric keys for datastore/volume encryption
- [Azure Root SP Key Rotation](./010_Annual_Rotation/020_Azure%20Root%20SP%20Key%20Rotation.md) - Service principal credentials
- [Azure OIDC App Key Rotation](./010_Annual_Rotation/030_Azure%20OIDC%20App%20Key%20Rotation.md) - OpenID Connect application keys
- [GitLab Access Token Rotation](./010_Annual_Rotation/040_GitOps%20File%20Agent%20Access%20Token%20Rotation.md) - Static API keys for GitLab

### On-Demand Update
- [Admin infodba Password Update](./020_On_Demand_Update/010_Admin%20infodba%20Password%20Update.md) - Initial database administrator password setup
- [DC Password Change](./020_On_Demand_Update/020_DC%20Password%20Change.md) -  Deployment Center password change
- [Day N Password Rotation](./020_On_Demand_Update/040_Day%20N%20Password%20Rotation/000_Intro.md) - Database and application passwords  
