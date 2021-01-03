const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const path = require("path");

module.exports = withPlugins([[optimizedImages]], {
  webpack(config) {
    config.resolve.alias.images = path.join(__dirname, "src/images");
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
});
