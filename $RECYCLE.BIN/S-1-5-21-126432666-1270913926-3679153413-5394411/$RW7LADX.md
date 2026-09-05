# Override Values

The APA lab team often shares optimized Helm parameters and application-level configuration updates (for example, for Pool Manager and TC Server) to improve scalability and performance. These optimizations should be applied selectively, not globally across all tenant environments.

To support this, use a tenant-specific override file:

- File name: `tenant-values-override.yaml`
- Location: outside the `teamcenter` folder
- Behavior: GFA does not sync or update this file automatically


## Pipeline Operation

Use the `update_values_override` operation to update override values. This operation supports scaling up/down and other value changes.

## Example

Operation input:

```yaml
Description: Test update_values_override action
CustomerID: 
Environment: prd
TcxCliRequirement: 'teamcenterx==5.1.2'
PipelineStage: operations
PipelineVariableVersion: main
PipelineVersion: main
TcXVersion: br.2606.0000
OperationsAction: update_values_override
OverrideInputs:
  ValuesOverride:
    tc-poolmanager-pool1:
      configServerPoolPropertiesPath: config_custom
      livenessProbesInitialDelaySeconds: 15
      readinessProbesInitialDelaySeconds: 25
      resources:
        requests:
          cpu: 3
          memory: 4Gi
      startupProbesFailureThreshold: 8
      startupProbesInitialDelaySeconds: 15
      startupProbesPeriodSeconds: 5
    tc-solr:
      aws2_indexingProfile: High
    tc-tcserver-pool1:
      startupProbesFailureThreshold: 25
      startupProbesInitialDelaySeconds: 10
      startupProbesPeriodSeconds: 10
      timeoutSeconds: 2
    tc-tcweb:
      resources:
        requests:
          cpu: 100m
          memory: 10Gi
    tc_clamav:
      replicaCount: 3
```

- Values Override chart name should be picked from chart.yml file e.g. fmsmaster  available at `<TENANT_ID>-prd/helm_charts/teamcenter/charts/fmsmaster/Chart.yaml`
- include all values for nested values resources.
  requests:
    cpu: 1
    memory: 4Gi
- Configuration realted changes need to connect EFS, create copy of config file and update configuration at copied file as per requirement and pass copied file name to config path as input.
example
```yaml
OverrideInputs:
  ValuesOverride:
    tc-poolmanager-pool1:
       configServerPoolPropertiesPath: config_custom # updated copied config file
```
Run shutdownrestart workflow to restart pool manager pod
- Check inputs indentation, all should be spaces only

## Behavior and Examples

### 1) Fresh deployment with `ValuesOverride`

Input:

```yaml
ValuesOverride:
  tc_clamav:
    replicaCount: 3
```

Tenant repo values:

```yaml
# values.yaml (default chart values)
tc_clamav:
   replicaCount: 1
```

```yaml
# tenant-values-override.yaml
tc_clamav:
  replicaCount: 3
```

Result in cluster: `tc_clamav` runs with `3` replicas.

### 2) Modify overrides using operation run

For Operation Run Command Template link, please refer to [Ansible Templates Table](https://ctcx.code.siemens.io/cookbook/docs/Documentation/Tenant%20Onboarding/Basic%20Flow/Ansible%20Templates%20Table/) Run Operation Run Command Template with below survey parameter.

Operation input:

```yaml
OperationsAction: update_values_override
OverrideInputs:
  ValuesOverride:
    tc_clamav:
      replicaCount: 3
```

Updated override file:

```yaml
tc_clamav:
  replicaCount: 3
```

Result in cluster: `tc_clamav` runs with `3` replicas.

### 3) Re-run pipeline with original deployment input

If the pipeline is re-run with the original deployment input (`replicaCount: 1`), the existing override file is not modified.

Current override file remains:

```yaml
tc_clamav:
  replicaCount: 3
```

Result in cluster: `tc_clamav` continues running with `3` replicas.

> Re-run supports adding new values during deployment flow. Modifying existing override values must be done through the `update_values_override` operation.

### 4) Full cleanup

Operation input:

```yaml
OperationsAction: update_values_override
OverrideInputs:
  CleanUp: true
  ValuesOverride:
    tc_clamav:
      replicaCount: 3
```

Resulting override file:

```yaml
{}
```

Result in cluster: chart default from `values.yaml` is used (`replicaCount: 1`).

### 5) Partial cleanup

Initial `tenant-values-override.yaml`:

```yaml
tc_clamav:
  replicaCount: 3
tc-web:
  replicaCount: 10
```

Operation input:

```yaml
OperationsAction: update_values_override
OverrideInputs:
  CleanUp: true
  ValuesOverride:
    tc_clamav:
      replicaCount: 3
```

Modified `tenant-values-override.yaml`:

```yaml
tc-web:
  replicaCount: 10
```

## Input Parameters

| Key | Description | Remarks |
|---|---|---|
| `OperationsAction` | Operation name to execute override update logic. | Use `update_values_override`. |
| `OverrideInputs` | Container for override operation inputs. | Includes `ValuesOverride` and optional `CleanUp`. |
| `CleanUp` | Removes matching keys from `tenant-values-override.yaml`. | Optional. Use `true` for cleanup mode. |
| `ValuesOverride` | YAML object containing chart/value overrides. | Supports nested keys such as `replicaCount`. |