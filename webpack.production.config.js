const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackValidator = require('webpack-validator');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const {resolve} = require('path');

const config = {
    entry: './entry.js',
    context: resolve('src'),
    output: {
        path: resolve('./public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, loader: 'babel-loader', query: {cacheDirectory: true, compact:false}, exclude:'/node_modules/'}
        ]
    },
    devtool: ('source-map'),
    plugins: [
        new CleanWebpackPlugin(['public']),
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html',
            template: 'index.html'
        })
    ]
};

module.exports = () => {
  return webpackValidator(config)
}
