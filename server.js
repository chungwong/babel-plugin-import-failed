import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const APP_PORT = 3000;
const APP_URL = `http://localhost:${APP_PORT}`;
const GRAPHQL_PORT = 80;
const GRAPHQL_URL = 'http://localhost:4000/graphql';

// Serve the Relay app
const compiler = webpack({
  entry: ['whatwg-fetch', path.resolve(__dirname, 'js', 'app.js')],
  resolve: {
    extensions: ['.js', '.scss', '.css', '.json']
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js)$/,
        use: [
                {loader: 'babel-loader'},
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
        ]
      },
    ],
  },
  output: {filename: 'app.js', path: '/'},
});
const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: {
    '/graphql': GRAPHQL_URL,
  },
  disableHostCheck: true,
  publicPath: '/js/',
  stats: {colors: true},
});
// Serve static resources
app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT, () => {
  console.log(`App is now running on ${APP_URL}`);
});
