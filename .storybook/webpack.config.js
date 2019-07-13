module.exports = ({ config, mode }) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: ["@babel/react", "@babel/typescript", ["@babel/env", { "modules": false }]],
      },
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  };