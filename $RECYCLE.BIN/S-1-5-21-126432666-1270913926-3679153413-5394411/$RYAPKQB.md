**Post deploy fails with 404 or 502 Error**  

**Issue Description**:

Whenever Pipeline fails in post deploy stage with 404 or 502 error as shown in the below screenshot, go to ArgoCD tenant deploy application and check for the status of tc-deployutils job. 

![Image](./image_post_deploy_404.png) 

**Work Around:**  

If the deployutils is still in progress, the post deploy pipeline job can be retried and wait for the deployutils to complete its execution and proceed with its further tasks to get executed.

If the deployutils is in degraded state, download the logs of the tc-deployutils job and look out for errors for the next steps.