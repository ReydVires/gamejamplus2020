const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');
const fs = require('fs');
const baseEnvConfig = require("./config/base.config.json");
const version = require('./package.json').version;

module.exports = (env) => {
    return new Promise((resolve, reject) => {
        baseEnvConfig.VERSION = version || "0.0.0";
        const result = (objectConfig) => ({
            entry: path.join(__dirname, 'src/index.ts'),
            output: {
                filename: 'project.bundle.js',
                path: path.resolve(__dirname, 'dist')
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        loader: 'ts-loader',
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.css$/,
                        use: [ 'css-loader' ]
                    },
                ]
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js']
            },
            plugins: [
                new webpack.DefinePlugin({
                    CANVAS_RENDERER: JSON.stringify(true),
					WEBGL_RENDERER: JSON.stringify(true),
					CONFIG: JSON.stringify(objectConfig)
                }),
                new CopyWebpackPlugin([
                    {
                        from: path.resolve(__dirname, 'index.html'),
                        to: path.resolve(__dirname, 'dist')
                    },
                    {
                        from: path.resolve(__dirname, 'assets', '**', '*'),
                        to: path.resolve(__dirname, 'dist')
                    }
                ]),
                new JavaScriptObfuscator({
                    rotateStringArray: true
                }, []),
            ]
        });

        if (!env) resolve(result(baseEnvConfig));
        let envConfig = env.build;
        fs.readFile(
            path.resolve(__dirname, `./config/${envConfig}.config.json`),
            { encoding: 'utf8' },
            (err, data) => {
                if (err) reject(`File ${envConfig} config is error / not found`);
                let newconfig = JSON.parse(data);
                let combinedConfig = {
                    ...baseEnvConfig,
                    ...newconfig
                };
                resolve(result(combinedConfig));
            }
        );
    });
}
