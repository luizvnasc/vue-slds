var path = require('path');
var webpack = require('webpack');
const merge = require('webpack-merge');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const commons = {
  entry: path.resolve(__dirname + '/src/index.js'),
  output: {
    filename: '[name].bundle.js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname + '/dist/'),
    // These options are useful if the user wants to load the module with AMD
    library: 'vue-slds',
    umdNamedDefine: true,
    chunkFilename: '[name].bundle.js',
    publicPath: '/dist/'
  },
  externals: {
    moment: 'moment',
    lodash: 'lodash',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.sass$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: ['vue-style-loader', 'css-loader', 'sass-loader'],
            sass: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax'],
          },
          // other vue-loader options go here
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(eot|woff|woff2|ttf|png|jpg)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.svg$/,
        loader: 'vue-svg-sprite-loader', // `vue-svg` for webpack 1.x
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      src: path.resolve(__dirname, './src'),
      assets: path.resolve(__dirname, './node_modules/@salesforce-ux/design-system/assets'),
      components: path.resolve(__dirname, './src/components'),
      node_modules: path.resolve(__dirname, './node_modules'),
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: false,
    //   },
    // }),
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true,
    // }),
    
  ],
};

module.exports = [merge(commons, {})];
