const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      assetModuleFilename: '[name][ext]'
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist')
      },
        port: 3001,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
        title: 'Just Another Text Editor',
        filename: 'index.html'
      }),

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        inject: true, 
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description:' simple text editor',
        background_color: '#1D313F',
        theme_color: '#2B1D3F', 
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons')
          }
        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets:[ '@babel/preset-env'],
            }
          }
        },
        // not sure this part is needed. not loading any images in html, except for logo. and that's linking to assets/icons/logo.ico. got this from webpack5 cc traversy but it's not in miniproject
        // {
        // test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // type: 'asset/resource',
        // use:[
        //   {
        //     // loader: 'file-loader',
        //     options:{
        //       name: 'assets/icons/[name].[ext]'
        //     }
        //   }
        // ]
        // }
      ],
    },
  };
};
