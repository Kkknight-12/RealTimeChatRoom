const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/scripts/apps.js',
    output: {
        path: path.resolve( __dirname, './dist/script'),
        filename: 'bundle.js'
    },
    devServer:{
        contentBase: path.resolve( __dirname, './dist' ),
        publicPath: '/script/'
    },
    module: {
        rules: [
            {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: [
                    ['@babel/preset-env']
                ]
                }
            }
            }
        ]
    }
}