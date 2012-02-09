var utils = require('./utils');


module.exports = {
    before: 'modules',
    run: function (root, path, settings, doc, callback) {
        utils.prepareDoc(doc);
        try {
            utils.addSettings(root, doc, settings);
        }
        catch (e) {
            return callback(e);
        }
        callback(null, doc);
    }
};
