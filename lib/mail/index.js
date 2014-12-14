"use strict";

var fs              = require('fs');
var path            = require('path');
var async           = require('async');
var Q               = require('Q')
var Hoek            = require('hoek');
var _               = require('lodash');
var mandrill        = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(Nuts.settings.mandrill.api_key);

var templates = {};

function Mailer() { }

Mailer.prototype.sendTemplate = function(name, context, options) {
  Hoek.assert("recipients" in options, "must include recipients");

  var deferred = Q.defer();

  this.getRenderedTemplate.apply(this, [name, context]).then(function(templateInfo) {
    var message = {
      html: templateInfo.html,
      text: templateInfo.text,
      subject: templateInfo.subject,
      from_name: options.fromName || Nuts.settings.email.from_name,
      from_email: options.fromEmail || Nuts.settings.email.from_email,
      to: options.recipients,
      track_opens: true,
      track_clicks: true
    };

    mandrill_client.messages.send({
      message: message,
      async: true,
    }, function(result) {
      deferred.resolve(result);
    }, function(e) {
      deferred.reject(e);
    });
  }).fail(function(err) {
    deferred.reject(err);
  })

  return deferred.promise;
};

Mailer.prototype.getRenderedTemplate = function(name, context) {
  Hoek.assert(name, 'template name is required');

  var deferred = Q.defer();

  this.getTemplate.apply(this, [name]).then(function(templateInfo) {
    deferred.resolve({
      html: _.template(templateInfo.html, context).trim(),
      text: _.template(templateInfo.text, context).trim(),
      subject: _.template(templateInfo.subject, context).trim(),
    });
  }).fail(function(err) {
    deferred.reject(err);
  }).done();

  return deferred.promise;
};

Mailer.prototype.getTemplate = function(name) {
  Hoek.assert(name, 'template name is required');

  var templateDirectory = path.join(__dirname, 'templates', name);

  if(name in templates) {
    return Q.fcall(function() {
      return templates[name];
    });
  }

  var readTemplate = function(templatePath, callback) {
    fs.exists(templatePath, function(exists) {
      if(!exists) return callback(null, '');

      fs.readFile(templatePath, function(err, data) {
        if(err) return callback(err, null);

        return callback(null, data.toString());
      });
    });
  }

  var deferred = Q.defer();

  async.parallel([
    function(callback) {
      readTemplate(path.join(templateDirectory, 'html.template'), callback)
    },
    function(callback) {
      readTemplate(path.join(templateDirectory, 'text.template'), callback)
    },
    function(callback) {
      readTemplate(path.join(templateDirectory, 'subject.template'), callback)
    },
  ], function(err, results) {
    if(err) return deferred.reject(err);

    templates[name] = {
      html: results[0],
      text: results[1],
      subject: results[2],
    };

    deferred.resolve(templates[name]);
  });

  return deferred.promise;
};

module.exports = new Mailer();
