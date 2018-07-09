#####Pacotes NPM

`$ npm install webpack webpack-cli babel-core babel-preset-env babel-loader --save-dev`

#####Configuracao do babel .babelrc

    {
      "presets": [
        ["env", {
          "targets": {
            "browsers": ["last 2 versions"]
          }
        }]
      ]
    }

#####Criar arquivo webpack.config.js

    const path = require('path');
    
    module.exports = {
       entry: "./app-src/index.js", // Entry File
       output: {
         path: path.resolve(__dirname, "app"), //Output Directory
         filename: "bundle.js", //Output file
      },
      module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
      }
    };


#####Caso lib javascript de terceiros(Ex Jquery), gerar o arquivo bundle separado para js da aplicacao e js vendors
    plugins.push(
        new webpack.optimize.CommonsChunkPlugin(
            { 
                name: 'vendor', 
                filename: 'vendor.bundle.js'
            }
        )
    );
    
    module.exports = {
    
        entry: {
            app: './app-src/app.js',
            vendor: ['jquery', 'bootstrap', 'reflect-metadata']
        },

#####Gerar index.html com tags link  e script. plugin: html-webpack-plugin
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    
    plugins.push(new HtmlWebpackPlugin({
        hash: true,
        minify: {
            html5: true,
            collapseWhitespace: true,
            removeComments: true,
        },    
        filename: 'index.html',
        template: __dirname + '/main.html'
    }));