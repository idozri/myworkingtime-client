const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin');

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env' });
}

const common = {
    devtool:
        process.env.NODE_ENV === 'production'
            ? 'inline-source-map'
            : 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: ['css-loader']
            }
        ]
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src/'),
            actions: path.resolve(__dirname, 'src/actions/'),
            components: path.resolve(__dirname, 'src/components/'),
            selectors: path.resolve(__dirname, 'src/selectors/')
        }
    },
    plugins: [
        // Ignore all locale files of moment.js
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-il/),
        // Set environment variable
        new webpack.DefinePlugin({
            'process.env.API_URL': JSON.stringify(process.env.API_URL)
        }),
        new LoadablePlugin()
    ]
};

module.exports = [
    {
        ...common,
        output: {
            path: `${__dirname}/public`
        },
        optimization: {
            minimize: true
        }
    },
    {
        ...common,
        target: 'node',
        entry: './src/server',
        externals: [nodeExternals()]
    }
];
