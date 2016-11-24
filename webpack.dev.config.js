const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require("webpack-dev-server");
const webpackValidator = require('webpack-validator');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const {resolve} = require('path');

const config = {
    context: resolve('src'),
    entry: './entry.js',
    output: {
        path: resolve('public'),
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.js$/, loader: 'babel-loader', query: {cacheDirectory: true, compact:false}}
        ]
    },
    devServer: {
        hot: false,
        inline: true,
        stats: 'errors-only',
        port: 9000,
        open: true,
        publicPath: '/public/',
        contentBase: './public',
        stats: { colors: true },
        historyApiFallback: {
            index: '/public/'
        },
    },
    devtool: ('source-map'),
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html',
            template: 'index.html'
        }),
        new CleanWebpackPlugin(['public'])
    ]
};

module.exports = webpackValidator(config)
