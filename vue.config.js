module.exports = {
    pwa: {
        workboxPluginMode: "InjectManifest",
        workboxOptions: {
            swSrc: "src/service-worker.js",
        },
        themeColor:'#FFFFFF',
        msTileColor: '#FFFFFF',
    },
    transpileDependencies: ['vuetify'],
};