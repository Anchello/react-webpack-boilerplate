const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.js',
  output: {
	path: path.join(__dirname, '/build'),
	filename: 'bundle.js'
  },
  module: {
	rules: [
	  {
		test: /\.js$/,
		exclude: /node_modules/,
		use: {
		  loader: 'babel-loader'
		},
	  },
	  {
		test: /\.(scss|sass|css)$/,
		exclude: /node_modules/,
		loaders: [
		  MiniCssExtractPlugin.loader,
		  {
			loader: 'css-loader',
			options: {
			  modules: {
				localIdentName: '[local]___[hash:base64:5]',
			  },
			  sourceMap: true,
			  importLoaders: 1,
			}
		  },
		  'sass-loader',
		]
	  },
	]
  },
  plugins: [
	new HtmlWebpackPlugin({
	  template: './src/index.html'
	}),
	new MiniCssExtractPlugin({
	  filename: devMode ? '[name].css' : '[name].[hash].css',
	  chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
	})
  ]
};