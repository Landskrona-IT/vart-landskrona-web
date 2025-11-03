// babel.config.js
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    chrome: '70',
                    android: '70',
                },
                useBuiltIns: 'usage',
                corejs: 3,
            },
        ],
    ],
};