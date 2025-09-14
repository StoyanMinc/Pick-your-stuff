import 'dotenv/config';

export default {
  expo: {
    name: "PYS",
    slug: "pick-your-stuff",
    "splash": {
      "backgroundColor": "#000000",
      "resizeMode": "contain"
    },
    scheme: "pickyourstuff",
    version: "1.0.0",
    "icon": "./assets/app-icon.png",
    "ios": {
      icon: "./assets/app-icon.png",
      bundleIdentifier: "com.stoyanm.pickyourstuff",
      supportsTablet: true,
      backgroundColor: "#000000",
    },
    "android": {
      icon: "./assets/icon.png",
      package: "com.stoyanm.pickyourstuff",
      backgroundColor: "#000000",
      intentFilters: [
        {
          action: "VIEW",
          data: [
            {
              scheme: "pickyourstuff",
              host: "*",
              pathPrefix: "/"
            }
          ],
          category: ["BROWSABLE", "DEFAULT"]
        }
      ],
    },
    extra: {
      SERVER_URL: process.env.SERVER_URL,
    }
  }
};

