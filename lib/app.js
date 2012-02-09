module.exports = {
    rewrites: require('./rewrites'),
    views: require('./views'),
    lists: require('./lists'),
    shows: require('./shows'),
    filters: require('./filters'),
    validate_doc_update: require('./validate').validate_doc_update
};

// bind event handlers
require('./events');
