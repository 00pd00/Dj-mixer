# Pre-Deployment

## Templates Installation Requirements

| Product ID | Product Name | Required Templates |
|------------|--------------|-------------------|
| TC032021-XT | Service Engineer | sen1serviceengineeringaw |
| TC032023-XT | Service Asset Management | sen1serviceengineeringaw, asbuilt, asmaintained, asbasmalignment, serviceeventmanagement |
| TC032026-XT | Service Planner | serviceplanning, sspspralignment, tcslmphysicalstructure, mfevisContainer |
| TC031201-XT | As Built Management | asbuilt |
| TC032020-XT | Service Technician Access | esb0enterpriseservicebom, swi1slmservicewiaw, sen1serviceengineeringaw, asbasmalignment, sspspralignment, serviceplanning, serviceeventmanagement, tcslmphysicalstructure, mfevisContainer |

## Special Configuration Notes

### Microservice Dependencies

For **TC032020-XT** and **TC032026-XT** products:

- **Teamcenter SLM Asset Management Service** (`tcslmphysicalstructure`) is required for visualization on Service Planning page
- This microservice depends on **MFE-Vis** (TCM Visualization) microservice (`mfevisContainer`)

### Version-Specific Configuration (TC2412)

**For versions prior to 2412.0007**, include the following in the "customer-input" file:

#### Product TC032026-XT (Service Planner):
```yaml
TeamcenterPackageIDList:
  - mfevisContainer
```

#### Product TC032020-XT (Service Technician Access):
```yaml
TeamcenterPackageIDList:
  - tcslmphysicalstructure
  - mfevisContainer
```
