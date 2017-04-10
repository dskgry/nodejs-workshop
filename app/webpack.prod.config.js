/**
 * @author Sven Koelpin
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    context: path.resolve(__dirname),
    entry: {
        vendor: ['babel-polyfill', 'react', 'react-dom', 'react-router-dom', 'axios', 'reactstrap'],
        twttr: ['./src/main/Twttr.js']
    },
    output: {
        filename: './dist/[name].js',
        chunkFilename: './dist/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "env",
                                {
                                    targets: {
                                        browsers: ["last 2 versions"]
                                    },
                                    modules: false,
                                    useBuiltIns: true
                                }
                            ],
                            'react'
                        ]
                    }
                }],
            },
            {
                test: /\.(less|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false, //otherwise all classes are modules
                                localIdentName: '[local]_[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg|eot|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: './dist/[hash].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
            __DEVELOPMENT__: JSON.stringify(false)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: './dist/vendor.js'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            output: {
                comments: false
            },
        }),
        new ExtractTextPlugin({
            filename: './dist/twttr.css',
            allChunks: true
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: './dist/report.html',
            openAnalyzer: false
        })
    ]
};