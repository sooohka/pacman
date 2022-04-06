import { Configuration } from "webpack";
import { resolve } from "path";
import { Configuration as DevServerConfig } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config: DevServerConfig & Configuration = {
  mode: "development",
  entry: "./src/index.ts",
  devtool: "source-map",
  devServer: {
    port: 3000,
    hot: true,
    liveReload: true,
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "index.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@src": "./src",
    },
  },
};

export default config;
