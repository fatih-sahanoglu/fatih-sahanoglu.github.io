const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const CompressionPlugin = require("compression-webpack-plugin");
const {NODE_ENV} = process.env;
const prod = NODE_ENV === "production";
const ROOT = __dirname;
const OUT_DIR = path.resolve(ROOT, "");

const routes = Object.entries(require("./src/routes.json")).map(
	([, v]) => v.path
);

module.exports = {
	entry: {
		bundle: "./src/client.js",
		react: ["react", "react-dom"],
		"react-addons": [
			"prop-types",
			"react-router-dom",
			"react-scroll",
			"react-spring",
			"styled-components"
		]
	},
	output: {
		path: OUT_DIR,
		filename: "[name].js",
		libraryTarget: "umd"
	},
	mode: NODE_ENV || "development",
	devtool: prod ? "source-map" : false,
	optimization: {
		splitChunks: {
			chunks: "all",
			minSize: 30000,
			minChunks: 2,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: true,
			cacheGroups: {
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				}
			}
		}
	},
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
					filename: route ? `${route}.html` : "index.html",
					template: "views/index.pug",
					alwaysWriteToDisk: true
				})
		),
		new HtmlWebpackHarddiskPlugin({
			outputPath: OUT_DIR
		}),
		...(x =>
			x
				? [
						new MinifyPlugin(
							{},
							{
								sourceMap: false
							}
						),
						new CompressionPlugin({
							algorithm: 'gzip'
						}),
						new BundleAnalyzerPlugin()
				  ]
				: [])(prod),
		new FaviconsWebpackPlugin({
			// Your source logo
			logo: "./assets/favicon.png",
			// The prefix for all image files (might be a folder or a name)
			prefix: "icons/",
			// Emit all stats of the generated icons
			emitStats: false,
			// The name of the json containing all favicon information
			statsFilename: "iconstats.json",
			// Generate a cache file with control hashes and
			// don't rebuild the favicons until those hashes change
			persistentCache: true,
			// Inject the html into the html-webpack-plugin
			inject: true,
			// favicon background color (see https://github.com/haydenbleasel/favicons#usage)
			background: "#333",
			// favicon app title (see https://github.com/haydenbleasel/favicons#usage)
			title: "Fathi Sahanoglu",

			// which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
			icons: {
				android: true,
				appleIcon: true,
				appleStartup: true,
				coast: false,
				favicons: true,
				firefox: true,
				opengraph: false,
				twitter: false,
				yandex: false,
				windows: false
			}
		})
	]
};
