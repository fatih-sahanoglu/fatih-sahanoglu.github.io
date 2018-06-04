const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminWebp = require("imagemin-webp");
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
				use: [
					{
						loader: "json-loader"
					},
					{
						loader: "yaml-frontmatter-loader"
					}
				]
			},
			{
				test: /\.png$/,
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
			},
			{
				test: /\.(jpe?g)$/,
				use: [
					{
						loader: "sharp-loader",
						query: {
							name: "/images/[hash]",
							cacheDirectory: true,
							presets: {
								default: {
									format: ["webp"],
									width: 2000,
									quality: 70,
									progressive: true
								},
								prefetch: {
									format: ["webp"],
									width: 100,
									quality: 30,
									progressive: true
								},
								small: {
									format: ["webp"],
									width: 640,
									quality: 35,
									progressive: true
								},
								medium: {
									format: ["webp"],
									width: 960,
									quality: 35,
									progressive: true
								},
								large: {
									format: ["webp"],
									width: 1920,
									quality: 35,
									progressive: true
								}
							}
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
						)
				  ]
				: [])(prod),
		new ImageminPlugin({
			test: "*.jpg",
			plugins: [
				imageminMozjpeg({
					quality: 50,
					progressive: true
				})
			]
		}),
		new ImageminPlugin({
			test: "*.webp",
			plugins: [imageminWebp()]
		}),
		new ImageminPlugin({
			test: "*.png",
			optipng: {
				optimizationLevel: 9
			}
		}),
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
