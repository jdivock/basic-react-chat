'use strict';
var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    cache: true,
    entry: './js/app',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.(jsx|js)$/,
            loader: 'jsx-loader'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", 'css-loader')
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style-loader", 'css-loader!sass-loader?outputStyle=expanded')
        }]
    },
    plugins: [
        new ExtractTextPlugin("style.css", {
            allChunks: true
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
