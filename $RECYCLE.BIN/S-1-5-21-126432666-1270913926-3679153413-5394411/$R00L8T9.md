## Pre-requisites

- LCS development has released a new updated version of `TcX`.
- The Cloud storage contain the new versions of the `Tc`, `AW`, and other software kits.
- LCS development has tagged the GIT project `tc-version-manifests` indicating a new release is available.
- If updating from 2412.0001 with personalization to greater than or equal to 2412.0007, follow these steps before starting the update pipeline:
  1. Empty the tenant common bucket `tcx-tenantbucket-<tenant AWS region>-<tenant_id>`
  2. Rerun the pipeline using `PipelineVersion: 3.0.13` (2412.0007 release tag) and `PipelineStage: build_infra`. Keep all other input parameters the same as the original deployment. After rerun, a new bucket will be created.
  3. Place the personalization package to the tenant common bucket `tcx-tenantbucket-<tenant AWS region>-<tenant_id>-<AWS_Account_number>`

      **Note:**
      For update or upgrade use cases, the personalization package version must be higher than the version already deployed in the existing environment.