const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/index.js', // The entry point of your application
  output: {
    filename: 'main.js',   // The name of the bundled JavaScript file
    path: path.resolve(__dirname, 'dist'), // The output directory
    clean: true             // Clean the output directory before each build
  },
  mode: 'development',       // Set the build mode (either 'development' or 'production')
  module: {
    rules: [
      {
        test: /\.js$/,       // Apply the following rules to .js files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader' // Use the babel-loader for transpilation
        }
      },
      {
        test: /\.css$/,      // Apply the following rules to .css files
        use: ['style-loader', 'css-loader'] // Use these loaders for CSS files
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Specify the template HTML file
      inject:'body'
    })
  ],
  devtool: 'eval-source-map',
  
  devServer: {
    static: path.resolve(__dirname, 'dist'), // Serve content from the 'dist' directory
    compress: true,        // Enable gzip compression
    port: 8080,            // Specify the port number
    open: true             // Open the default browser automatically
  }
  
};
