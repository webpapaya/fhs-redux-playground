const Dotenv = require('dotenv-webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
	template: "./src/index.html",
	filename: "./index.html"
});

module.exports = {
	module: {
	  rules: [
		{
		  test: /\.js$/,
		  exclude: /node_modules/,
		  use: {
			loader: "babel-loader"
		  },
		},
		{
		  test: /\.css$/,
		  loader: 'style-loader'
		},
		{
		  test: /\.css$/,
		  loader: 'css-loader',
		  query: {
			modules: true
		  }
		}
	  ]
	},
	devServer: {
	  historyApiFallback: true,
	},
	plugins: [
		new Dotenv({ path: process.env.ENV_FILE, systemvars: true }),
		htmlPlugin,
	]
};