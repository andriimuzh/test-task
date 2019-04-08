const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './img'
                    },
                }

            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'url-loader?limit=8192',
                // loader: 'file-loader', if >= IE 11
                options: {
                    name: '[name].[ext]',
                    outputPath: './fonts'
                },
            },
        ]
    },
    plugins: [
        new HtmlPlugin({
            template: './src/index.html'
        }),
        // new CopyPlugin([
        //     {from: './src/img',to: './img'},
        // ]),
        new CleanWebpackPlugin(),
        // new webpack.ProvidePlugin({
        // })
    ]
}
