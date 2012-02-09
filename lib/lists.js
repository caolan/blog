var templates = require('duality/templates'),
    dutils = require('duality/utils'),
    utils = require('./utils'),
    Showdown = require('showdown');


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
    if (req.client && req.initial_hit) {
        // no need for double render on first hit
        return;
    }
    start({code: 200, headers: {'Content-Type': 'text/html'}});

    var converter = new Showdown.converter();

    var rows = getRows(function (row) {
        row.value.intro_html = converter.makeHtml(
            row.value.intro.replace(/\{\{?baseURL\}?\}/g, dutils.getBaseURL(req))
        );
        row.value.pp_date = new Date(row.value.pubdate).toDateString();
        return row;
    });

    return {
        title: 'Caolan McMahon',
        content: templates.render('blogposts.html', req, {
            rows: rows,
            nav: 'blog'
        })
    };
};


exports.blogpost = function (head, req) {
    if (req.client && req.initial_hit) {
        // no need for double render on first hit
        return;
    }
    start({code: 200, headers: {'Content-Type': 'text/html'}});
    var rows = getRows();

    var doc = rows[0].doc;
    var converter = new Showdown.converter();
    doc.markdown_html = converter.makeHtml(
        doc.markdown.replace(/\{\{?baseURL\}?\}/g, dutils.getBaseURL(req))
    );
    doc.pp_date = new Date(doc.pubdate).toDateString();

    return {
        title: doc.title,
        content: templates.render('blogpost.html', req, {
            doc: doc,
            nav: 'blog'
        })
    };
};


exports.rssfeed = function (head, req) {
    start({code: 200, headers: {'Content-Type': 'application/rss+xml'}});

    var converter = new Showdown.converter();

    var rows = getRows(function (row) {
        var doc = row.doc;
        doc.markdown_html = converter.makeHtml(
            doc.markdown.replace(/\{\{?baseURL\}?\}/g, dutils.getBaseURL(req))
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
