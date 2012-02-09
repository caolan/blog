/**
 * Module dependencies
 */

var utils = require('duality/utils'),
    handlebars = require('handlebars'),
    flashmessages;

try {
    flashmessages = require('./flashmessages');
}
catch (e) {
    // flashmessages module may not be available
}




/**
 * Synchronously render dust template and return result, automatically adding
 * baseURL to the template's context. The request object is required so we
 * can determine the value of baseURL.
 *
 * @name render(name, req, context)
 * @param {String} name
 * @param {Object} req
 * @param {Object} context
 * @returns {String}
 * @api public
 */

exports.render = function (name, req, context) {
    handlebars.registerHelper('baseURL', function () {
        return utils.getBaseURL(req);
    });
    handlebars.registerHelper('isBrowser', utils.isBrowser);
    context.userCtx = req.userCtx;
    if (!context.flashMessages && flashmessages) {
        context.flashMessages = flashmessages.getMessages(req);
    }
    if (!handlebars.templates[name]) {
        throw new Error('Template Not Found: ' + name);
    }
    return handlebars.templates[name](context, {});
};
