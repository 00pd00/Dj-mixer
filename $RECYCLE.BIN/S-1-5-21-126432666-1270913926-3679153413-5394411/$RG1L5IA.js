// ------------------------------------------------------------------------------------------------------------------
fetch('http://localhost:5000/api/poller-jobs/manual-status-update', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    envId: "692407e1e7254cb067f64fda",
    status: "success",
    isDestroy: false,
    jobId: "qsy6nqhm",
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


// fetch('http://localhost:5000/api/poller-jobs/approve-extension', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     extensionId: "6912d9652a8512822fd97147", // The EnvironmentExtension document ID
//     approvedBy: "admin@example.com"
//   })
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error('Error:', error));
// ------------------------------------------------------------------------------------------------------------------
