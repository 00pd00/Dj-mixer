# Pre-requisites

## Step 1: Get the triad license file

### AWS

Obtain Triad License Setup file by following [this](../../../../../Documentation/Tenant%20Onboarding/License%20Configuration/Teamcenter%20X%20Cloud%20License/) section or get the triad license file from the following S3 location: `s3://<release-bucket>/admin-console/<TCVersion>cloud_license/triad<TCVersion>_license.lic.txt`.

Place triad license file on your local machine.

## Step 2: Put triad license file in Storage Service

### AWS

Put triad license file aquired in step 1, into environment specific S3 bucket.

Open S3, search `tcx-<region>-<Environment>-<CustomerId>` example: "tcx-us-east-1-prd-triad37".

Create Folder named triad-license-file
![create folder button](image.png)


![create folder](image-1.png)


Inside "triad-license-file" folder, upload triad license file.

![upload license file](image-2.png)

![Add files](image-3.png)

Add triad license file from your local machine.

![upload](image-4.png)


![close](image-5.png)


![copy S3 URI](image-6.png)

Save this copied S3 URI somewhere (ex. Notepad). It is needed while running triad license setup automation operation.