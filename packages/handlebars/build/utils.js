var async = require('async'),
    utils = require('kanso-utils/utils'),
    handlebars = require('handlebars'),
    fs = require('fs'),
    _ = require('underscore')._;


exports.registerTemplates = function (dir, doc, p, callback) {
    if (!doc._handlebars) {
        doc._handlebars = {};
    }
    if (!doc._handlebars.templates) {
        doc._handlebars.templates = {};
    }
    var p = utils.abspath(p, dir);
    exports.find(p, function (err, files) {
        if (err) {
            return callback(err);
        }
        _.each(files, function (file) {
            var rel = utils.relpath(file, p);
            var abs = utils.abspath(file, p);
            doc._handlebars.templates[rel] = abs;
        });
        callback(null, doc);
    });
};

exports.safestr = function (str) {
    return str.replace(/"/g, '\\"').replace(/\n/g, '\\n');
};

exports.addTemplates = function (doc, templates, callback) {
    async.forEach(_.keys(templates || {}), function (k, cb) {
        var file = templates[k];
        fs.readFile(file, function (err, content) {
            if (err) {
                return cb(err);
            }
            var src = content.toString();
            src = src.replace(/\.handlebars$/, '');
            try {
                doc.handlebars += '\n(function() {\n' +
                    '  var template = Handlebars.template, ' +
                    'templates = Handlebars.templates = Handlebars.templates || {};\n' +
                    'templates["' + exports.safestr(k) +
                    '"] = template(' +
                    handlebars.precompile(src, {
                        knownHelpers: {},
                        knownHelpersOnly: false
                    }) + ');\n' +
                    '})();\n'
            }
            catch (e) {
                return cb(new Error(
                    'Error compiling handlebars template: ' + k + '\n' +
                    e.message
                ));
            }
            cb();
        });
    }, callback);
};

exports.find = function (p, callback) {
    utils.find(p, exports.filenameFilter(p), callback);
};

exports.filenameFilter = function (p) {
    return function (f) {
        var relpath = utils.relpath(f, p);
        // should not start with a '.'
        if (/^\./.test(relpath)) {
            return false;
        }
        // should not contain a file or folder starting with a '.'
        if (/\/\./.test(relpath)) {
            return false;
        }
        return true;
    };
};
