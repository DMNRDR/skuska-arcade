// Pri builde pre GitHub Pages nastav EXPO_BASE_URL=/skuska-arcade
module.exports = ({ config }) => ({
  ...config,
  experiments: { ...(config.experiments || {}), baseUrl: process.env.EXPO_BASE_URL || '' },
});
