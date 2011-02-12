var kanso = require('kanso/core'),
    templates = require('kanso/templates'),
    utils = require('./utils'),
    showdown = require('deps/showdown'),
    navigation = require('./navigation');


/* fetches all rows from the view and returns as an array,
 * after mapping each row through iterator */
var getRows = function (iterator) {
    var row, rows = [];
    while (row = getRow()) {
        if (iterator) {
            row = iterator(row);
        }
        rows.push(row);
    }
    return rows;
};


exports.blogposts = function (head, req) {
    start({code: 200, headers: {'Content-Type': 'text/html'}});

    var rows = getRows(function (row) {
        row.value.intro_html = showdown.makeHtml(
            row.value.intro.replace(/\{baseURL\}/g, kanso.getBaseURL(req))
        );
        row.value.pp_date = new Date(row.value.pubdate).toDateString();
        return row;
    });

    var content = templates.render('blogposts.html', req, {
        rows: rows
    });

    if (req.client) {
        utils.showPage(req, 'Caolan McMahon', content, 'nav_blog');
    }
    else {
        var nav = navigation.create(req, 'nav_blog');
        return templates.render('base.html', req, {
            title: 'Caolan McMahon',
            content: content,
            navigation: nav
        });
    }
};


exports.blogpost = function (head, req) {
    start({code: 200, headers: {'Content-Type': 'text/html'}});
    var rows = getRows();

    var doc = rows[0].doc;
    doc.markdown_html = showdown.makeHtml(
        doc.markdown.replace(/\{baseURL\}/g, kanso.getBaseURL(req))
    );
    doc.pp_date = new Date(doc.pubdate).toDateString();

    var content = templates.render('blogpost.html', req, doc);

    if (req.client) {
        utils.showPage(req, doc.title, content, 'nav_blog');
    }
    else {
        var nav = navigation.create(req, 'nav_blog');
        return templates.render('base.html', req, {
            title: doc.title,
            content: content,
            navigation: nav
        });
    }
};


exports.rssfeed = function (head, req) {
    start({code: 200, headers: {'Content-Type': 'application/rss+xml'}});

    var rows = getRows(function (row) {
        var doc = row.doc;
        doc.markdown_html = showdown.makeHtml(
            doc.markdown.replace(/\{baseURL\}/g, kanso.getBaseURL(req))
        );
        doc.guid = 'http://caolanmcmahon.com' + (
            doc.oldurl || '/posts/' + doc.slug
        );
        return row;
    });

    return templates.render('feed.xml', req, {
        rows: rows,
        pubdate: rows[0].doc.pubdate,
        builddate: new Date()
    });
};


exports.projects = function (head, req) {
    start({code: 200, headers: {'Content-Type': 'text/html'}});

    var rows = getRows(function (row) {
        row.doc.description_html = showdown.makeHtml(
            row.doc.description.replace(/\{baseURL\}/g, kanso.getBaseURL(req))
        );
        return row;
    });
    var content = templates.render('projects.html', req, {rows: rows});

    if (req.client) {
        utils.showPage(req, 'Projects', content, 'nav_projects');
    }
    else {
        var nav = navigation.create(req, 'nav_projects');
        return templates.render('base.html', req, {
            title: 'Projects',
            content: content,
            navigation: nav
        });
    }
};
