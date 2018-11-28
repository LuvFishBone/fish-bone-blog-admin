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
    devtool: false,
    output: {
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].chunk.js',
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
                            publicPath: '../'
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
                vendors: { 
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    priority: 10,
                    enforce: true,
                    chunks: 'initial', // 只对入口文件处理
                },
                commons: {
                    minChunks: 3,//最少有两个文件共用的代码
                    name: 'commons',
                    enforce: true,
                    chunks: 'all', // 针对所有文件
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