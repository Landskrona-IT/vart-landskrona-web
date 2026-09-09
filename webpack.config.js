const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './assets/js/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/', // ensures correct asset URLs
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: { chrome: '70', android: '70' },
                                useBuiltIns: 'usage',
                                corejs: 3,
                            }],
                        ],
                    },
                },
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname),
            watch: {
                usePolling: true,
                interval: 500,
            },
        },
        compress: true,
        port: 8081,
        allowedHosts: 'all',
        host: '0.0.0.0',
        hot: false,
        liveReload: true,
        watchFiles: {
            paths: ['assets/css/**/*.css', 'index.html'],
            options: {
                usePolling: true,
                interval: 500,
            },
        },
    },
    optimization: {
        minimize: false,
    },
    plugins: [
        new webpack.DefinePlugin({
            __BUILD_ID__: JSON.stringify(process.env.BUILD_ID || 'local'),
        }),
    ],
};
