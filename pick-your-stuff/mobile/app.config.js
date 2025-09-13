import 'dotenv/config';

export default {
  expo: {
    name: "PYS",
    slug: "pick-your-stuff",
    scheme: "pickyourstuff",
    version: "1.0.0",
    "icon": "./assets/app-icon.png",
    "ios": {
      icon: "./assets/app-icon.png",
      bundleIdentifier: "com.stoyanm.pickyourstuff",
      supportsTablet: true,
    },
    "android": {
      icon: "./assets/icon.png",
      package: "com.stoyanm.pickyourstuff",
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
