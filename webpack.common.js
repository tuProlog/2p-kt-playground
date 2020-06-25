const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		"app": './app/control.js',
		"editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js',
	},
	output: {
		globalObject: 'self',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}, {
			test: /\.ttf$/,
			use: ['file-loader']
		}]
	},
	node: { module: "empty", net: "empty", fs: "empty" },
	plugins: [
		new HtmlWebpackPlugin({
		  title: 'tuProlog Playground',
		  template: 'assets/index.html'
		})
	  ]
};
