## Prepare Pipeline Inputs
### Following additional are required when AI Chat product ID is included in list of products to be deployed.

```bash
TcAIChatInput:
  TCAIChatIAMUserARN: 'IAMUserARN'
  TCAIChatAccessKey: 'AccessKeyID'
  TCAIChatSecretAccessKey: 'SecreteAccessKey'
```
Values of these parameters are obtained from the IAM user details created earlier.