exports.rewrites = require('./rewrites');

exports.views = require('./views');
exports.lists = require('./lists');
exports.shows = require('./shows');

exports.filters = require('./filters');
exports.validate_doc_update = require('./validate').validate_doc_update;

var events = require('kanso/events');

events.on('init', function () {
  // preload avatar for about page
  var avatar_image = new Image();
  var md5 = 'c911321821c4d7bd1b9bbadf91aa6f2e';
  avatar_image.src = "http://www.gravatar.com/avatar/" + md5 + "?size=92";
});
