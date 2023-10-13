const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./client/src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "bundle"),
  },
  performance: {
    hints: false
  },
  mode: process.env.NODE_ENV,
  resolve: {
    modules: [__dirname, "client", "node_modules"],
    extensions: [".*", ".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'ts-loader',
        }
      },
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './client/src/index.ts',
      filename: './index.html'
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
    static: [
      {
        directory: path.resolve(__dirname, './'),
        publicPath: '/',
      },
      {
        directory: path.resolve(__dirname, 'bundle'),
        publicPath: '/',
      }
    ],
    hot: true, //nice
    proxy: {
      '/**': {
        target: 'http://localhost:3000/',
        secure: false,
      }
    }
  },
}