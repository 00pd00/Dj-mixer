## NxTransDirect Translator Test for TcX Essentials, TcX Standard and TcX Advanced

NxTransDirect translation request is created during NX save to translate NX Model to JT.

To verify the NxTransDirect translator:

1. On your client machine, confirm that all setup steps are complete so you can launch NX in Teamcenter Integration mode.
2. Launch NX in Teamcenter Integration mode.
3. Open an NX part or create a new part and add new geometry to it.
5. The **Save** operation will trigger the NX Direct translator:
   - NX files (`.prt`) will be translated into JT (`.jt`) and other supported formats.
   - JT files are directly stored in Teamcenter.

## Known Issues

### License Server Environment Variable

If you see a dialog box with a license server error when launching the NX Desktop application, ensure you set the environment variable as follows:

```bash
SPLM_LICENSE_SERVER=28001@<tenant-subdomain>.license-service.prd.tcxservices.com
```

![License Server Error](./image_200.png)