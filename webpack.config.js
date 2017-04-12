require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'client/public');
const APP_DIR = path.resolve(__dirname, 'client');

const config = {
  entry: `${APP_DIR}/render.jsx`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,

        include: [
          APP_DIR,
          path.join(__dirname, 'node_modules/react-codemirror')
        ],
        loader: 'babel-loader'
      },
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
    moduleExtensions: [
      'node_modules',
      path.resolve(__dirname, 'src/scripts'),
      path.resolve(__dirname, 'src')
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
    // this may be pointing at the wrong file endpoint
  ]
};

module.exports = config;
