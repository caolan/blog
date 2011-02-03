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

exports.showPage = function (title, content, navid) {
    $('#main').html(content);
    $('#navigation li').not('#' + navid).removeClass('selected');
    $('#' + navid).addClass('selected');
    exports.highlightPage();
    exports.disqus_num_replies();
    document.title = title;
    window.scrollTo(0, 0);
};
