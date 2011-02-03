exports.blogposts_by_title = {
    map: function (doc) {
        if (doc.type === 'blogpost') {
            emit(doc.title, null);
        }
    }
};

exports.blogposts_by_pubdate = {
    map: function (doc) {
        if (doc.type === 'blogpost' && (doc.pubdate || !doc.published)) {
            var timestamp;
            if (doc.pubdate) {
                timestamp = new Date(doc.pubdate).getTime()
            }
            else {
                // doc is unpublished, use current timestamp
                timestamp = new Date().getTime()
            }
            emit(timestamp, {
                title: doc.title,
                intro: doc.intro,
                slug: doc.slug,
                pubdate: doc.pubdate,
                published: doc.published
            });
        }
    }
};

exports.blogposts_by_slug = {
    map: function (doc) {
        if (doc.type === 'blogpost') {
            emit([doc.slug, new Date(doc.pubdate).getTime()], null);
        }
    }
};

exports.docs_by_type = {
    map: function (doc) {
        if (doc.type) {
            emit(doc.type, null);
        }
    }
};
