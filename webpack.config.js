const path = require('path');

module.exports = {
    devServer: {
        static: {
            directory: path.join(__dirname, './'),
        },
        port: 3000,
    },
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
};