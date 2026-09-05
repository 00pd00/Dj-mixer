console.log("🚀 Testing terminal server startup...");

try {
  console.log("📋 Testing basic imports...");
  
  // Test each import individually
  import('./terminalServer.js').then(module => {
    console.log("✅ terminalServer.js imported successfully");
    console.log("Available exports:", Object.keys(module));
  }).catch(err => {
    console.error("❌ Failed to import terminalServer.js:", err.message);
  });
  
} catch (error) {
  console.error("💥 Error:", error.message);
  console.error("Stack:", error.stack);
}