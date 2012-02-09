_isFunction = function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
};

Handlebars.registerHelper('uc', function (str) {
    return encodeURIComponent(str);
});

var head = function (arr, fn) {
    if (_isFunction(fn)) {
        // block helper
        return fn(arr[0]);
    }
    else {
        return arr[0];
    }
};

Handlebars.registerHelper('first', head);
Handlebars.registerHelper('head', head);

Handlebars.registerHelper('tail', function (arr, fn) {
    if (_isFunction(fn)) {
        // block helper
        var out = '';
        for (var i = 1, len = arr.length; i < len; i++) {
            out += fn(arr[i]);
        }
        return out;
    }
    else {
        return arr.slice(1);
    }
});

// TODO: add optional context argument?
Handlebars.registerHelper('include', function (name) {
    if (!exports.templates[name]) {
        throw new Error('Template Not Found: ' + name);
    }
    return exports.templates[name](this, {});
});

Handlebars.registerHelper('ifequal', function (val1, val2, fn, elseFn) {
    if (val1 === val2) {
        return fn();
    }
    else if (elseFn) {
        return elseFn();
    }
});

/*
    Handlebars "join" block helper that supports arrays of objects or strings.
    (implementation found here: https://github.com/wycats/handlebars.js/issues/133)
    
    If "delimiter" is not speficified, then it defaults to ",".
    You can use "start", and "end" to do a "slice" of the array.

    Use with objects:
    {{#join people delimiter=" and "}}{{name}}, {{age}}{{/join}}
    
    Use with arrays:
    {{join jobs delimiter=", " start="1" end="2"}}
*/

Handlebars.registerHelper('join', function(items, block) {
    var delimiter = block.hash.delimiter || ",", 
        start = start = block.hash.start || 0, 
        len = items ? items.length : 0,
        end = block.hash.end || len,
        out = "";
    
        if(end > len) end = len;
    
    if ('function' === typeof block) {
        for (i = start; i < end; i++) {
            if (i > start) out += delimiter;
            if('string' === typeof items[i])
                out += items[i];
            else
                out += block(items[i]);
        }
        return out;
    } else { 
        return [].concat(items).slice(start, end).join(delimiter);
    }
});
