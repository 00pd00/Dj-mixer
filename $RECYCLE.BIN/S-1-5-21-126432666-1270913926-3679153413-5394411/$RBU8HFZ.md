`ValuesOverride` input is supported for both:
- a fresh run, and
- the operation action `update_values_override`.

For a fresh run, instead of starting with an empty `tenant-values-override.yaml`, you can start with custom defaults based on the user persona.
This saves one step for the APA Lab use case, where users typically want to start with custom values.

To update or edit these configurations after deployment, use the operation pipelines.

You can override values that are exposed as Helm variables in the chart.
If values are hardcoded in the chart, they cannot be modified through `ValuesOverride`.

If you change values in ConfigMaps, it is recommended to run shutdown and restart operations.

## Verification in the cluster

To verify the changes, log in to Argo CD or Rancher and review the rendered manifest files for updated values.
