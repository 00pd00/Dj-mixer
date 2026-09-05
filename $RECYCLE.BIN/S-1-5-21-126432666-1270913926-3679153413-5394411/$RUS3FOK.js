fetch('http://localhost:5000/api/poller-jobs/manual-status-update', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    envId: "6908739ce2b150ec6c3c9149",
    status: "success",
    isDestroy: false,
    jobId: "v4xs2p73",
    pipelineId: "67890"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
// ------------------------------------------------------------------------------------------------------------------
