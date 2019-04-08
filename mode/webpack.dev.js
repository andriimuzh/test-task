const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
module.exports = merge(common, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: './js/[name].js',
        publicPath: '/'
    },
    devtool: 'cheap-eval-source-map',
    devServer: {
        hot: true,
        compress: true,
        port: 9000,
        contentBase: './src',
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.EvalSourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
});
