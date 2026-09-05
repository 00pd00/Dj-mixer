// ------------------------------------------------------------------------------------------------------------------
fetch('http://localhost:5000/api/poller-jobs/manual-status-update', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    envId: "694520c37a8f52558b958016",
    status: "success",
    isDestroy: false,
    jobId: "cmkxeam7",
    pipelineId: "67890"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
// ------------------------------------------------------------------------------------------------------------------

// fetch('http://localhost:5000/api/poller-jobs/approve-extension', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     extensionId: "6912f6295c67575b5ca8ed1f", // The EnvironmentExtension document ID
//     approvedBy: "admin@example.com"
//   })
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error('Error:', error));



// ------------------------------------------------------------------------------------------------------------------
