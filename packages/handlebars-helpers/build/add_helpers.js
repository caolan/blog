var fs = require('fs');


module.exports = {
    before: 'modules/attachment',
    run: function (root, path, settings, doc, callback) {
        fs.readFile(__dirname + '/helpers.js', function (err, content) {
            if (err) {
                return callback(err);
            }
            doc.handlebars += content.toString();
            callback(null, doc);
        });
    }
};
