const Encore = require('@symfony/webpack-encore');
const path = require('path');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore.setOutputPath('public/build/')
    .setPublicPath('/build')
    .addEntry('app', './assets/js/app.js')
    .addEntry('products', './assets/js/products.js')

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
    })
    .configureDefinePlugin(definitions => {
        definitions.__VUE_OPTIONS_API__ = true;
        definitions.__VUE_PROD_DEVTOOLS__ = false;
        definitions.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;
    })

    .addAliases({
        '@': path.resolve(__dirname, 'assets', 'js'),
        styles: path.resolve(__dirname, 'assets', 'scss'),
    });

const webpackConfig = Encore.getWebpackConfig();

// Ręczna konfiguracja CSS Modules dla Vue 3
webpackConfig.module.rules.forEach(rule => {
    if (rule.oneOf) {
        rule.oneOf.forEach(oneOfRule => {
            if (oneOfRule.use) {
                oneOfRule.use.forEach(loader => {
                    if (loader.loader && loader.loader.includes('css-loader')) {
                        if (loader.options && loader.options.modules) {
                            loader.options.modules.namedExport = false;
                            loader.options.modules.exportOnlyLocals = false;
                        }
                    }
                });
            }
        });
    }
});

if (!Encore.isProduction()) {
    Encore.disableCssExtraction();
}

module.exports = webpackConfig;
