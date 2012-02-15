var events = require('duality/events'),
    dutils = require('duality/utils'),
    utils = require('./utils');


function preload(url) {
    var img = new Image();
    img.src = url;
    return img;
}

events.on('init', function () {
    // preload avatar for about page
    var md5 = 'c911321821c4d7bd1b9bbadf91aa6f2e';
    preload("http://www.gravatar.com/avatar/" + md5 + "?size=92");

    // preload project images
    var baseURL = dutils.getBaseURL();
    preload(baseURL + "/static/kan.so.png");
    preload(baseURL + "/static/medicmobile.png");
    preload(baseURL + "/static/northwest.png");
    preload(baseURL + "/static/githubprofile.png");
});

events.on('afterResponse', function (info, req, res) {
    utils.highlightPage();
    utils.disqus_num_replies();
});

events.on('beforeResource', function (info, req) {
    if (!req.initial_hit) {
        if (req.type === 'show' && req.name === 'about') {
            $('#navigation li').removeClass('selected');
            $('#nav_about').addClass('selected');
        }
        else {
            $('#navigation li').removeClass('selected');
            $('#nav_blog').addClass('selected');
        }
        //$('#main').css({visibility: 'hidden'});
        $('#main').css({opacity: 0});
    }
});
