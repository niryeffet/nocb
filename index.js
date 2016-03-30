'use strict'

module.exports = function(g) {
    return function() {
        var a = {}, n = 0, y = 0, f = g(
            arguments,
            function*() {
                if (n) {
                    y = 1; yield; y = 0;
                }
                var r = a; a = {};
                return r;
            },
            function(s, r) {
                if (!r) ++n;
                return function() {
                    if (typeof s === 'undefined')
                        a = arguments;
                    else
                        a[s] = arguments;
                    if (!--n && y) f.next();
                }
            }
        );
        f.next();
    }
}

