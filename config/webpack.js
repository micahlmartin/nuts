var path = require('path');
var webpack = require('webpack');

var argv = require('optimist')
            .alias('e','env').default('e','development')
            .alias('m','minify')
            .argv;

var assetsPath = path.resolve(__dirname, "..", "public", "assets");
var publicPath = "assets/";
var commonLoaders = [
  { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff" },
  { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream" },
  { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
  { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=image/svg+xml" },
  { test: /\.png$/, loader: "url-loader" },
  { test: /\.jpg$/, loader: "file-loader" },
  { test: /\.jsx$/, loader: 'jsx' }
]

clientConfig = {
  name: "client",
  entry: ['./app/assets/javascript/entry.jsx'],
  output: {
    path: assetsPath,
    publicPath: publicPath,
    filename: '[hash].js'
  },
  module: {
    loaders: commonLoaders.concat([
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader:
        "style!css!sass?outputStyle=compressed&" +
          "includePaths[]=" + (path.resolve(__dirname, "..", "./app/assets/bower_components")) + "&" +
          "includePaths[]=" + (path.resolve(__dirname, "..", "./node_modules"))
      }
    ])
  },
  plugins: [
    function(compiler) {
      this.plugin("done", function(stats) {
        require('fs').writeFileSync(path.join(__dirname, "stats.generated.json"), JSON.stringify(stats.toJson(), null, 4))
      })
    }
  ]
};

serverConfig = {
  name: "server",
  entry: ["./app/assets/javascript/page.jsx"],
  target: "node",
  output: {
    path: assetsPath,
    filename: "../../server/page.js",
    publicPath: publicPath,
    libraryTarget: "commonjs2"
  },
  externals: /^[a-z\-0-9]+$/,
  module: {
    loaders: commonLoaders.concat([
      { test: /\.css$/, loader: path.resolve(__dirname, "..", "lib", "webpack", "style-collector") + "!css-loader" },
      {
        test: /\.scss$/, loader:
        path.resolve(__dirname, "..", "lib", "webpack", "style-collector") +
          '!css!sass?outputStyle=compressed&' +
            "includePaths[]=" + (path.resolve(__dirname, "..", "./app/assets/bower_components")) + "&" +
            "includePaths[]=" + (path.resolve(__dirname, "..", "./node_modules"))
      }
    ])
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
  ]
};

if(argv.minify){
  clientConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({mangle:false}));
  serverConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({mangle:false}));
}

module.exports = [
  clientConfig,
  serverConfig
]
