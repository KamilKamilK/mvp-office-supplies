/* eslint-disable no-underscore-dangle */
const Encore = require('@symfony/webpack-encore');
const path = require('path');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore.setOutputPath('public/build/')
    .setPublicPath('/build')
    .addEntry('app', './assets/app.js')
    .addEntry('products', './assets/products.js')
    .addEntry('shopping-cart', './assets/shopping-cart.js')

    .splitEntryChunks()
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .configureBabelPresetEnv(config => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })
    .copyFiles({
        from: './assets/images',
        to: Encore.isProduction() ? 'images/[path][name].[hash:8].[ext]' : 'images/[path][name].[ext]',
    })
    .enableSassLoader(options => {
        options.sassOptions = {
            quietDeps: true,
        };
    })
    .enableVueLoader(() => {}, {
        version: 3,
        runtimeCompilerBuild: false,
    })
    .configureDefinePlugin(definitions => {
        definitions.__VUE_OPTIONS_API__ = true;
        definitions.__VUE_PROD_DEVTOOLS__ = false;
        definitions.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;
    })

    // Konfiguracja CSS Modules - czysta metoda Encore
    .configureCssLoader(config => {
        if (config.modules) {
            config.modules.namedExport = false;
            config.modules.exportOnlyLocals = false;
        }
    })

    .addAliases({
        '@': path.resolve(__dirname, 'assets'),
        styles: path.resolve(__dirname, 'assets', 'scss'),
    });

module.exports = Encore.getWebpackConfig();
