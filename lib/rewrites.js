var moved = function (from, to) {
    return {
        from: from,
        to: '_show/moved',
        query: {loc: to}
    };
};

module.exports = [
    {from: '/favicon.ico', to: 'static/favicon.ico'},
    {from: '/static/*', to: 'static/*'},
    {from: '/files/*', to: 'files/*'},
    {from: '/feed.xml', to: '_list/rssfeed/blogposts_by_pubdate', query: {
        include_docs: 'true',
        descending: 'true'
    }},
    {from: '/', to: '_list/blogposts/blogposts_by_pubdate', query: {
        descending: 'true'
    }},
    {from: '/posts', to: '_list/blogposts/blogposts_by_pubdate', query: {
        descending: 'true'
    }},
    {from: '/posts/:slug', to: '_list/blogpost/blogposts_by_slug', query: {
        startkey: [':slug'],
        endkey: [':slug', {}],
        limit: '1',
        include_docs: 'true'
    }},
    {from: '/projects', to: '_list/projects/docs_by_type', query: {
        include_docs: 'true',
        key: '"project"'
    }},
    {from: '/about', to: '_show/about'},


    /***** Redirect old urls *****/

    /* pages */
    moved('/about.html', '/about'),
    moved('/projects.html', '/projects'),

    /* projects */
    moved('/async.html', 'https://github.com/caolan/async'),
    moved('/dispatch.html', 'https://github.com/caolan/dispatch'),
    moved('/forms.html', 'https://github.com/caolan/forms'),
    moved('/nodeunit.html', 'https://github.com/caolan/nodeunit'),
    moved('/quip.html', 'https://github.com/caolan/quip'),

    /* posts */
    moved('/async_in_node_js.html',
          '/posts/asynchronous_code_in_node_js'),
    moved('/async_js_console_utils.html',
          '/posts/async_js_update_and_console_utils'),
    moved('/commonjs_in_couchdb.html',
          '/posts/commonjs_modules_in_couchdb'),
    moved('/deploying_nodejs_applications_with_upstart.html',
          '/posts/deploying_node_js_with_upstart'),
    moved('/erlang_syntax_highlighting.html',
          '/posts/erlang_syntax_highlighting'),
    moved('/erlmpd.html',
          '/posts/erlmpd_an_erlang_library_for_mpd'),
    moved('/flatten_for_python.html',
          '/posts/flatten_for_python'),
    moved('/multiple_set_cookie_headers_in_node_js.html',
          '/posts/multiple_set_cookie_headers_in_node_js'),
    moved('/native_erlang_views_couchdb.html',
          '/posts/erlang_map_reduce_in_couchdb'),
    moved('/notifications.html',
          '/posts/ubuntu_notifications_in_javascript'),
    moved('/notifications_update.html',
          '/posts/notifications_update'),
    moved('/on_designs_undocumented.html',
          '/posts/on__designs_undocumented'),
    moved('/unit_testing_nodejs.html',
          '/posts/unit_testing_in_node_js'),
    moved('/writing_for_node_and_the_browser.html',
          '/posts/writing_for_node_and_the_browser')
];
