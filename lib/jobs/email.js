var _                     = require('lodash');
var DEFAULT_CONCURRENCY   = 5;
var jobs                  = require('./queue').connect();


var updateQueryLog = function(ql, report, message) {
  ql.completed = true;
  ql._report = report;
  ql.message = message;
  ql.save();
}

module.exports = {
  process: function(concurrency) {
    jobs.process('email_confirmation', (concurrency || DEFAULT_CONCURRENCY), function(job, done) {
      // QueryLog
      //   .findById(job.data.queryLogId.toString())
      //   .exec().then(function(ql) {
      //     var reportService = new ReportService();
      //     reportService.getOrGenerateReport(job.data.address, job.data.city, job.data.state, job.data.zip, true).then(function(report) {
      //       updateQueryLog(ql, report, null);
      //       done();
      //     }).fail(function(error) {
      //       updateQueryLog(ql, null, error.error);
      //       done();
      //     });
      //   }, function(error) {
      //       done(error);
      //   });
    });
  }
}
