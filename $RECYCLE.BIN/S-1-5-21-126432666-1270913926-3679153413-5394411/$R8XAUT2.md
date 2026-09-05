## Pool Manager K8s API failures can lead to pool database information loss

If tc-poolmanager is not able to connect to the Kubernetes API server, then it throws exception and eventually the pool manager DB entries are removed. This results in login failure with "No business logic server available" even though pool manager is running and tc-server's are healthy and running.

The **work around** is to delete the tc-server pods using Argo CD application. This would create new servers and they would be registered with the tc-poolmanager. The subsequent operation would work.