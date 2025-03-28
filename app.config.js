module.exports = {
  expo: {
    name: "quotely-codebase",
    // ... other existing properties from app.json
    plugins: [
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static",
            "deploymentTarget": "13.0"
          }
        }
      ]
    ]
  }
};