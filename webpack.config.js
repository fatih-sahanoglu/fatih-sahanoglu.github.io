const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const imageminMozjpeg = require("imagemin-mozjpeg");
// const CompressionPlugin = require("compression-webpack-plugin");
const {NODE_ENV} = process.env;
const prod = NODE_ENV === "production";
const ROOT = __dirname;
const OUT_DIR = path.resolve(ROOT, "");

const routes = Object.entries(require("./src/routes.json")).map(([, v]) => v);

module.exports = {
	entry: {
		bundle: "./src/client.js",
		react: ["react", "react-dom"],
		"react-addons": [
			"prop-types",
			"react-router-dom",
			"react-scroll",
			"react-spring",
			"styled-components",
			"markdown-react-js"
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
				test: /\.md?$/,
				loader: "raw-loader"
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[hash].[ext]",
							outputPath: "images/",
							publicPath: "/images/"
						}
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
					filename: route.path ? `${route.path}/index.html` : "index.html",
					template: "./src/views/index.pug",
					title: "Fatih Sahanoglu | Standard, I cant live with that",
					alwaysWriteToDisk: true
				})
		),
		new HtmlWebpackPlugin({
			filename: "404.html",
			template: "./src/views/index.pug",
			title: "Page not found",
			alwaysWriteToDisk: true
		}),
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
						//new CompressionPlugin({
						//    algorithm: "gzip"
						//}),
						new ImageminPlugin({
							test: "src/**/*.jpg",
							plugins: [
								imageminMozjpeg({
									quality: 75,
									progressive: true
								})
							]
						}),
						new ImageminPlugin({
							test: "src/**/*.png",
							optipng: {
								optimizationLevel: 9
							}
						})
				  ]
				: [])(prod),
		new FaviconsWebpackPlugin({
			logo: "./src/assets/favicon.png",
			prefix: "/icons/",
			emitStats: false,
			statsFilename: "iconstats.json",
			persistentCache: true,
			inject: true,
			background: "#333",
			title: "Fatih Sahanoglu",
			icons: {
				android: true,
				appleIcon: true,
				appleStartup: true,
				coast: true,
				favicons: true,
				firefox: true,
				opengraph: true,
				twitter: true,
				yandex: true,
				windows: true
			}
		})
	]
};
