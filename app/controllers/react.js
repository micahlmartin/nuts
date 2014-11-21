module.exports = {
  index: {
    handler: function(request, reply) {
      var stats = require("../../config/stats.generated.json");
      var page = require("../../server/page");
      reply(page(request, stats.assetsByChunkName.main));
    }
  }
}
