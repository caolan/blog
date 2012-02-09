var dutils = require('duality/utils');


exports.create = function (req, selected) {
    var baseURL = dutils.getBaseURL(req);
    var nav = [
        {id: "nav_blog", url: baseURL + "/", text: "Blog"},
        {id: "nav_projects", url: baseURL + "/projects", text: "Projects"},
        {id: "nav_about", url: baseURL + "/about", text: "About"},
        {
            id: "nav_twitter",
            url: "http://twitter.com/caolan",
            text: "Twitter →"
        },
        {id: "nav_github", url: "http://github.com/caolan", text: "Github →"},
    ];
    return nav.map(function (x) {
        if (x.id === selected) {
            x.selected = true;
        }
        return x;
    });
}
