var DEFAULT_CONCURRENCY   = 5;
var jobs                  = require('./queue').connect();

module.exports = {
  process: function(concurrency) {
    jobs.process('send_email_confirmation', (concurrency || DEFAULT_CONCURRENCY), function(job, done) {

      Nuts.actions.sendEmailConfirmation(job.data.email).then(function(result) {
        done();
      }).fail(function(err) {
        Nuts.reportError(err);
        done(err);
      });

    });
  }
}
