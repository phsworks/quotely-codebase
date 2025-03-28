module.exports = {
  expo: {
    name: "Quotely",
    slug: "quotely-codebase",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/Quotely-favicon.png",
    userInterfaceStyle: "light",
    newArchEnabled: false,
    jsEngine: "hermes",
    splash: {
      image: "./assets/Quotely-favicon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: false,
      bundleIdentifier: "com.phsdevelopment.quotely",
      buildNumber: "1",
      deploymentTarget: "15.1",
      infoPlist: {
        UIBackgroundModes: ["fetch", "remote-notification"],
        NSPhotoLibraryUsageDescription:
          "Allow Quotely to access your photos to set profile picture",
        SKAdNetworkItems: [
          {
            SKAdNetworkIdentifier: "cstr6suwn9.skadnetwork",
          },
          {
            SKAdNetworkIdentifier: "4fzdc2evr5.skadnetwork",
          },
          {
            SKAdNetworkIdentifier: "4pfyvq9l8r.skadnetwork",
          },
        ],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.phsdevelopment.quotely",
      versionCode: 1,
    },
    plugins: [
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
            deploymentTarget: "15.1",
          },
        },
      ],
      [
        "react-native-google-mobile-ads",
        {
          ios: {
            googleMobileAdsAppId: "ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy",
          },
          android: {
            googleMobileAdsAppId: "ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy",
          },
        },
      ],
    ],
    web: {
      favicon: "./assets/Quotely-favicon.png",
    },
    assetBundlePatterns: ["**/*"],
    extra: {
      eas: {
        projectId: "0c0c7f5f-1396-4ed9-9365-d26bbff502a2",
      },
    },
  },
};
