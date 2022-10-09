const path = require("path");

module.exports = ({ config }) => {
  config.resolve.modules = [path.resolve(__dirname, "..", "src"), "node_modules"];
  config.resolve.alias["~"] = path.resolve(__dirname, "..", "src");
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: true,
          },
        },
      },
      "sass-loader",
    ],
    include: path.resolve(__dirname, "../"),
  });
  return config;
};
