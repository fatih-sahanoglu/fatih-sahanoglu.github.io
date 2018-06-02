const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
//const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const {NODE_ENV} = process.env;
const prod = NODE_ENV === "production";
const ROOT = __dirname;
const OUT_DIR = path.resolve(ROOT, "");

const routes = Object.entries(require("./src/routes.json")).map(
	([, v]) => v.path
);

module.exports = {
	entry: {
		bundle: "./src/app.js"
	},
	output: {
		path: OUT_DIR,
		filename: "[name].js",
		libraryTarget: "umd"
	},
	mode: NODE_ENV || "development",
	devtool: prod ? "source-map" : false,
	module: {
		rules: [
			{
				test: /\.js?$/,
				loader: "babel-loader",
				exclude: /(node_modules)/
			},
			{
				test: /\.pug?$/,
				loader: "pug-loader"
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: "file-loader"
					}
				]
			}
		]
	},
	devServer: {
		contentBase: OUT_DIR,
		compress: false,
		historyApiFallback: false,
		hot: true
	},
	plugins: [
		...routes.map(
			route =>
				new HtmlWebpackPlugin({
					filename: route ? `${route}/index.html` : "index.html",
					template: "views/index.pug",
					alwaysWriteToDisk: true
				})
		),
		new HtmlWebpackHarddiskPlugin({
			outputPath: OUT_DIR
		})
	]
};
