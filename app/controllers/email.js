"use strict";

var ConfirmEmail = Nuts.actions.confirmEmail;


module.exports = {
  confirmation: {
    handler: function(request, reply) {
      ConfirmEmail(request.query.id).then(function(success) {
        request.session.flash('success', 'Your email was successfully validated.');
        reply.redirect('/');
      }).fail(function(err){
        request.session.flash('error', 'That confirmation link has already been used or is expired.');
        reply.redirect('/');
      }).done();
    }
  }
}