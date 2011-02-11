exports.highlightPage = function () {
    $('pre code').each(function () {
        hljs.highlightBlock(this);
    });
};

exports.disqus_num_replies = function() {
    var links = document.getElementsByTagName('a');
    var query = '?';
    for(var i = 0; i < links.length; i++) {
        if(links[i].href.indexOf('#disqus_thread') >= 0) {
            query += 'url' + i + '=' + encodeURIComponent(links[i].href) + '&';
        }
    }
    $.getScript(
        'http://disqus.com/forums/caolanmcmahon/get_num_replies.js' + query
    );
};

exports.showPage = function (req, title, content, navid) {
    if (!req.initial_hit) {
        $('#main').html(content);
        $('#navigation li').not('#' + navid).removeClass('selected');
        $('#' + navid).addClass('selected');
        document.title = title;
        window.scrollTo(0, 0);
    }
    exports.highlightPage();
    exports.disqus_num_replies();
};
