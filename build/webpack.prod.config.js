const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBase = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = webpackMerge(webpackBase, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: 'js/[name].[chunkhash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../dist'
                        },
                    },
                    'css-loader',
                    'less-loader'
                ]
            },
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash].css'
        }),
        new webpack.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({
            title: 'fish bone front-end admin',
            inject: true,
            template: path.resolve(__dirname ,'../index.html'),
            //favicon: './favicon.ico'
        }),
        new webpack.ProvidePlugin({
            axios: 'axios'
        })
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
})