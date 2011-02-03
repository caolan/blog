exports.validate_doc_update = function (newDoc, oldDoc, userCtx) {

    var is_admin = false

    for (var i = 0; i < userCtx.roles.length; i++) {
        if (userCtx.roles[i] === '_admin') {
            is_admin = true;
            break;
        }
    }

    if (!is_admin) {
        throw({unauthorized: 'You are not a database admin'});
    }

    if (newDoc.type === 'blogpost') {
        if (!newDoc.slug) {
            throw({forbidden: 'slug is a required field'});
        }
        if (!newDoc.title) {
            throw({forbidden: 'title is a required field'});
        }
        if (!newDoc.intro) {
            throw({forbidden: 'intro is a required field'});
        }
        if (!newDoc.markdown) {
            throw({forbidden: 'markdown is a required field'});
        }
        if (newDoc.published) {
            if (!newDoc.pubdate) {
                throw({forbidden: 'Published blogposts must have a pubdate'});
            }
        }
    }

};
