/**
 * Require Browsersync along with webpack and middleware for it
 */
var browserSync = require('browser-sync').create();
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');

/**
 * Require ./webpack.config.js and make a bundler from it
 */
var webpackConfig = require('./webpack.config');
webpackConfig.debug = true,
webpackConfig.devtool = '#eval-source-map';

var bundler = webpack(webpackConfig);

/**
 * Reload all devices when bundle is complete
 */
bundler.plugin('done', function (stats) {
    if (stats.hasErrors() || stats.hasWarnings()) {
        return browserSync.notify('Error in bundle, please check console', 5000);
    }
    browserSync.reload();
});

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync.init({
    server: 'app',
    middleware: [
        webpackDevMiddleware(bundler, {
            publicPath: webpackConfig.output.publicPath,
            stats: { colors: true }
        })
    ],
    files: [
        'app/css/*.css',
        'app/*.html'
    ]
});