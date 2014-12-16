Nuts.server.views({
  isCached: !Nuts.isDevelopment,
  engines: {
    jsx: {
      path: "app/assets/javascript/views",
      compileMode: "async",
      module: {
        compile: function(template, options, next) {
          return next(null, function(context, options, callback) {
            var page = require("../../public/assets/server");
            var stats = require('../stats.generated.json');
            page(context.entryPoint || stats.assetsByChunkName.main, context).then(function(renderedView) {
              callback(null, renderedView);
            });
          });
        }
      }
    }
  }
});
