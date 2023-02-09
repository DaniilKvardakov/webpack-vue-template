const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: {
    index: [
      path.join(__dirname, 'src', 'index.ts'),
      path.join(__dirname, 'src', 'style.css'),
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.[contenthash:4].js',
    assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
  },
  plugins: [
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'template.pug'),
      filename: 'index.html',
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['dist'],
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:4].css',
    }),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.(css)$/,
      use: [ 'style-loader', 'css-loader', 'postcss-loader'],

    },
    {
      test: /\.pug$/,
      use: 'pug-loader',
    },
    {
      test: /\.(woff2?|eot|ttf|otf)$/i,
      type: 'asset/resource',
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    },
    {
      test: /\.svg$/,
      type: 'asset/resource',
      generator: {
        filename: path.join('icons', '[name].[contenthash][ext]'),
      },
    },
   
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', {
                interlaced: true,
              }],
              ['jpegtran', {
                progressive: true,
              }],
              ['optipng', {
                optimizationLevel: 5,
              }],
              ['svgo', {
                name: 'preset-default',
              }],
            ],
          },
        },
      }),
    ],
  },
  devServer: {
    watchFiles: path.join(__dirname, 'src'),
  },
};
