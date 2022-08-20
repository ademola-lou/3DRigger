const path = require('path');

module.exports = {
    entry: './src/index.js',
    
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
          {
            test: /\.?js/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
        ],
      },
      resolve: {
            extensions: [".js", ".jsx"],
            fallback: {
              "fs": false
          },
    },
    devServer: {
        port: 1502,
        static: path.resolve(__dirname, 'dist'),
        hot: true,
        liveReload: true,
    },
    mode: "development"
}