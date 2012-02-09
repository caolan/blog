var events = require('duality/events'),
    utils = require('./utils');


events.on('init', function () {
  // preload avatar for about page
  var avatar_image = new Image();
  var md5 = 'c911321821c4d7bd1b9bbadf91aa6f2e';
  avatar_image.src = "http://www.gravatar.com/avatar/" + md5 + "?size=92";
});

events.on('afterResponse', function (info, req, res) {
    utils.highlightPage();
    utils.disqus_num_replies();
});
