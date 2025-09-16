module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    ["@babel/plugin-transform-private-methods", { loose: true }],
    "react-native-worklets/plugin", // must be last
  ],
};
