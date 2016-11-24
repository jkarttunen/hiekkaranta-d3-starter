const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require("webpack-dev-server");
const webpackValidator = require('webpack-validator');
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
    devServer: {
        hot: false,
        inline: true,
        stats: 'errors-only',
        port: 9000,
        open: true,
        contentBase: './public',
        stats: { colors: true },
        historyApiFallback: {
            index: '/public/'
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html'
        })
    ]
};

module.exports = webpackValidator(config)
