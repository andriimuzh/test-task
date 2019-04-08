const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');


module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: './js/[name].[contentHash].js',
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    },
                    'sass-loader',
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/styles.[contentHash].css'
        })
    ]
});