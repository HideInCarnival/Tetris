const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    entry: {
        main: "./src/index.ts"
    },
    output: {
        path: path.resolve('dist'),
        filename: "[name].js"
    },
    devServer: {
    },
    module: {
        rules: [
            {test:/.ts$/, use: {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            }}
        ]
    },
    resolve: {
        extensions: ['.ts','.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new CleanWebpackPlugin(),
    ]
}