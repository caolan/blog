var templates = require('duality/templates');


exports.about = function (doc, req) {
    if (req.client && req.initial_hit) {
        // no need for double render on first hit
        return;
    }
    return {
        title: 'About',
        content: templates.render('about.html', req, {nav: 'about'})
    };
};

exports.moved = function (doc, req) {
    return {code: 301, headers: {location: req.query.loc}};
};
