/**
 * @author Sven Koelpin
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['@babel/polyfill', 'react', 'react-dom', 'react-router-dom', 'reactstrap', 'styled-components', 'react-transition-group'],
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
                use: [{loader: 'babel-loader'}]
            },
            {
                test: /\.(css)$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    test: 'vendor',
                    name: 'vendor',
                    enforce: true,
                    filename: `vendor.js`
                },
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    name: 'twttr',
                    enforce: true,
                    filename: `twttr.js`,
                    reuseExistingChunk: true
                },
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('development')}}),
    ]

};