// For instructions about this file refer to
// webpack and webpack-hot-middleware documentation
var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.join(__dirname, 'app', 'js'),
    entry: [
        './main'
    ],
    output: {
        path: path.join(__dirname, 'app', 'js'),
        publicPath: '/js/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
