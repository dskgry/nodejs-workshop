/**
 * @author Sven Koelpin
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['babel-polyfill', 'react', 'react-dom', 'react-router-dom', 'axios', 'reactstrap'],
        twttr: ['./src/main/Twttr.js']
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/'
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
        historyApiFallback: true
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
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            localIdentName: '[local]_[hash:base64:5]'
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|eot|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.js'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]

};