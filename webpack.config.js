const isProd = process.env.NODE_ENV === 'production';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


const cssConfig = [isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
    'css-loader'
    , 'postcss-loader']

const stylusConfig=[isProd?MiniCssExtractPlugin.loader:'vue-style-loader',{
    loader: 'css-loader',
    options: {
        modules: true,
        importLoaders: 2
    }
}, 'stylus-loader',
    'postcss-loader'];



module.exports = {
    entry: {
        main: ['./src/main.js', './src/viewport.js']
    },
    output: {
        filename: isProd ? '[name].[contenthash].js': '[name].js',
        chunkFilename: isProd ? '[name].[contenthash].js': '[name].js',
        path: path.resolve(__dirname, './dist')
    },
    devtool: isProd ? false : 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssConfig
            },
            {
                test: /\.styl(us)?$/,
                use: stylusConfig
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        hotReload: true,
                        loaders: {
                            css: cssConfig,
                            stylus: stylusConfig
                        }
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                ),
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images/',
                        limit: 10240
                    }
                }
            },
            {
                test: /\.(eot|ttf|svg)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }
            }

        ]
    },
    performance: false,
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: isProd ? {} : {
        contentBase: './dist',
        port: 8080,
        open: true,
        compress: true,
        hot: true
    },
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [new OptimizeCssAssetsWebpackPlugin()]
    }
}