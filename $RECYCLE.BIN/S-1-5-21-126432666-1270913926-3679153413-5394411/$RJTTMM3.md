# Monitoring and Health Checks

**Responsibility: CApS Team and Customer Operations Team**

Regular monitoring and health checks ensure the TcOOSPE integration remains operational and performs optimally.


Overview:

Use the following health-check endpoints:

| Service | Health-check endpoint |
| --- | --- |
|  Microservice health check through the webtier | `<AW_URL>/tc/micro/tcoospe/v1/alive` |
| Microservice health check through Service Dispatcher | `<AW_URL>/sd/tcoospe/v1/alive` |