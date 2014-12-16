'use strict';
var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    cache: true,
    entry: './public/js/app',
    output: {
        filename: './public/bundle.js'
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
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // without this moment pulls in every locale
        new ExtractTextPlugin('./public/style.css', {
            allChunks: true
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
