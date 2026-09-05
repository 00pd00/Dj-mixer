## Input needed to enable Visual Part Search feature for Customer

**Note:** `Visual Part Search feature` is part of the product `Teamcenter AI Chat` ( TC030406-XT ). <br />
Hence, if TeamcenterProductIDList has this product ID `TC030406-XT` then only `EnableVisualPartSearch` parameter can be set to `true` if needed.

### Please make sure to add visual part search specific parameter to TCAIChat inputs before triggering tenant pipeline

```bash
TcAIChatInput:
  EnableVisualPartSearch: True
```

Note: This is optional feature, hence if customer wants to opt for Visual Part Search feature under Product ID ( TC030406-XT ), `EnableVisualPartSearch` needs to be pass as true. If the parameter is not provided, it is considered as false. <br/>
The `EnableVisualPartSearch` feature is not supported on AWS. For AWS deployments: Set `EnableVisualPartSearch` to false, or Omit the parameter entirely.