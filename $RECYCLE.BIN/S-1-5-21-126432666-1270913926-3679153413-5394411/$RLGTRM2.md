# Post-Deployment Steps

After completing the [prerequisites](./010_Pre-requisite.md), follow the steps below to configure Teamcenter Copilot for Structures.

The following steps can be executed by running the indexing utilities using the `tcc` command as per instructions in section [Executing Teamcenter ITK Utilities in a containerized environment](https://ctcx.code.siemens.io/cookbook/docs/2506/Documentation/Operations/Day%20N%20Operations/Executing%20Teamcenter%20ITK%20Utilities#executing-teamcenter-itk-utilities-in-a-containerized-environment):

## 1. Embed BOM Parent-Child Relationships and Object Names to the Vector Database

If you are embedding the BOM index **for the first time**, use the following command:

```bash
tcc exec '$TC_ROOT/TcFTSIndexer/bin/runTcFTSIndexer.sh -task=bomai:sync'
```

If you are **updating** the embedded BOM index, use the following command:

```bash
tcc exec '$TC_ROOT/TcFTSIndexer/bin/runTcFTSIndexer.sh -task=bomai:sync -f'
```

## 2. Embed the Property Metadata and Property Display Names

If you are embedding the property metadata **for the first time**, use the following command:

```bash
tcc exec '$TC_ROOT/TcFTSIndexer/bin/runTcFTSIndexer.sh -task=bomai:embedproperty'
```

If you are **updating** the embedded property metadata, use the following command:

```bash
tcc exec '$TC_ROOT/TcFTSIndexer/bin/runTcFTSIndexer.sh -task=bomai:embedproperty -f'
```
