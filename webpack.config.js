const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {

  entry: './src/index',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [

      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },

      {

        test: /\.(css|scss)$/,
        use:[
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
      },
      {
        test: /\.json$/,
        type: 'javascript/auto', 
        loader: 'json-loader'
      },
      {
        test: /\.(png|jp(e*)g)$/,  
        use: [{
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
        }]
    }

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};