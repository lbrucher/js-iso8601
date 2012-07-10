/**
 * Date.parse with progressive enhancement for ISO 8601 <https://github.com/csnover/js-iso8601>
 * © 2011 Colin Snover <http://zetafleet.com>
 *
 * Date.toISOString implementation for browsers not having it
 * © 2012 Laurent Brucher
 *
 * Released under MIT license.
 */
Date.__origParse = Date.parse;
Date.parse = function (date) {
    var struct;

    // ES5 §15.9.4.2 states that the string should attempt to be parsed as a Date Time String Format string
    // before falling back to any implementation-specific date parsing, so that’s what we do, even if native
    // implementations could be faster
    //              1 YYYY                2 MM       3 DD           4 HH    5 mm       6 ss        7 msec        8 Z 9 ±    10 tzHH    11 tzmm
    if ((struct = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(date))) {
	    var minutesOffset = 0, numericKeys = [ 1, 4, 5, 6, 7, 10, 11 ];
        // avoid NaN timestamps caused by “undefined” values being passed to Date.UTC
        for (var i = 0, k; (k = numericKeys[i]); ++i) {
            struct[k] = +struct[k] || 0;
        }

        // allow undefined days and months
        struct[2] = (+struct[2] || 1) - 1;
        struct[3] = +struct[3] || 1;

        if (struct[8] !== 'Z' && struct[9] !== undefined) {
            minutesOffset = struct[10] * 60 + struct[11];

            if (struct[9] === '+') {
                minutesOffset = 0 - minutesOffset;
            }
        }

        return Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
    }

    return Date.__origParse(date);
};


/**
 * Add the toISOString() method if the browser does not implement it
 */
if (!Date.prototype.toISOString) {
	Date.prototype.toISOString = function() {
		// @see https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference:Global_Objects:Date
		function pad(n){return n<10 ? '0'+n : n}
		return this.getUTCFullYear()+'-'
		      + pad(this.getUTCMonth()+1)+'-'
		      + pad(this.getUTCDate())+'T'
		      + pad(this.getUTCHours())+':'
		      + pad(this.getUTCMinutes())+':'
		      + pad(this.getUTCSeconds())+'Z'
	};
};


/**
 * Convenience method
 */
Date.parseToDate = function(date) {
	return new Date( Date.parse(date) );
};


/**
 * Similar to Date(year, month, day, hours, minutes, seconds, milliseconds) constructor but taking UTC time
 */
Date.createUTC = function(year, month, day, hours, minutes, seconds, milliseconds) {
	return new Date( Date.UTC(year||1970, month||0, day||1, hours||0, minutes||0, seconds||0, milliseconds||0) );
};

