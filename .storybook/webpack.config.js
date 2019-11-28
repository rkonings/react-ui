module.exports = ({ config, mode }) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: ["@babel/react", "@babel/typescript", ["@babel/env", { "modules": false }]],
      },
    });
    config.module.rules.push({
      test: /\.js$/,
      use: ["source-map-loader"],
      enforce: "pre"
    });
    config.resolve.extensions.push('.ts', '.tsx');
    config.devtool = "source-map";
    return config;
  };