const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackValidator = require('webpack-validator');
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
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [new HtmlWebpackPlugin()]
};

module.exports = () => {
  return webpackValidator(config)
}
