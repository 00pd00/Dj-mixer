## Supported HPA configurations

**NOTE: DO NOT CHANGE THESE VALUES. In most deployments, these default HPA values are sufficient to handle workloads. Modifying these default values is not currently supported.**         

The following table list of all configurable HPA properties

| Name | Description | Default Values | Guidelines |
|------|-------------|----------------|------------|
| enabled fnd0_fscHpaEnabled | HPA is enabled | true | Toggle HPA (horizontal pods autoscaller) on or off. By default, this setting utilizes the GLBL_HPA_ENABLED configuration. |
| minReplicas fnd0_fscHpaMinReplicas | Minimum number of replicas | 1 | Choose a minimum number of replicas greater than 0, considering ramp-up time for simultaneous start of FMS workloads. |
| maxReplicas fnd0_fscHpaMaxReplicas | Maximum number of replicas | 10 | Select a maximum number of replicas to handle high workloads efficiently. Consider choosing a large number for performance and increased demands, keeping in mind the cost implications. |
| targetCPUUtilizationPercentage fnd0_fscHpaTargetCPUUtilization | Target CPU | 20 | Specify the target average CPU utilization across all pods. A high number indicates proactive capacity planning for anticipated demand spikes, while a low number reflects stable workloads and cost-saving measures. |
