import 'dotenv/config';

export default {
  expo: {
    name: "pick-your-stuff",
    slug: "pick-your-stuff",
    version: "1.0.0",
    extra: {
      SERVER_URL: process.env.SERVER_URL,
    },
  },
};
