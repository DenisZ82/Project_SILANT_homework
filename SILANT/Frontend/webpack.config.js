const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js",
        publicPath: '/',
        assetModuleFilename: "assets/[name]-[contenthash][ext]",
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.svg$/,
                use: 'file-loader'
            },
            // {
            //     test: /\.png$/,
            //     use: 'file-loader'
            // },
            {
                test: /\.(png|jpg|jpeg|gif|woff2|mp3)$/i,
                type: "asset/resource",
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
};