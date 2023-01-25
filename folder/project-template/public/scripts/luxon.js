let _exp = {};
Object.defineProperty(_exp, '__esModule', {
    value: true,
}); // these aren't really private, but nor are they really useful to document
/**
 * @private
 */
class LuxonError extends Error {
}
/**
 * @private
 */
class InvalidDateTimeError extends LuxonError {
    constructor(reason) {
        super(`Invalid DateTime: ${reason.toMessage()}`);
    }
}
/**
 * @private
 */
class InvalidIntervalError extends LuxonError {
    constructor(reason) {
        super(`Invalid Interval: ${reason.toMessage()}`);
    }
}
/**
 * @private
 */
class InvalidDurationError extends LuxonError {
    constructor(reason) {
        super(`Invalid Duration: ${reason.toMessage()}`);
    }
}
/**
 * @private
 */
class ConflictingSpecificationError extends LuxonError {
}
/**
 * @private
 */
class InvalidUnitError extends LuxonError {
    constructor(unit) {
        super(`Invalid unit ${unit}`);
    }
}
/**
 * @private
 */
class InvalidArgumentError extends LuxonError {
}
/**
 * @private
 */
class ZoneIsAbstractError extends LuxonError {
    constructor() {
        super('Zone is an abstract class');
    }
}
/**
 * @private
 */
const n = 'numeric', s = 'short', l = 'long';
const DATE_SHORT = {
    year: n,
    month: n,
    day: n,
};
const DATE_MED = {
    year: n,
    month: s,
    day: n,
};
const DATE_FULL = {
    year: n,
    month: l,
    day: n,
};
const DATE_HUGE = {
    year: n,
    month: l,
    day: n,
    weekday: l,
};
const TIME_SIMPLE = {
    hour: n,
    minute: n,
};
const TIME_WITH_SECONDS = {
    hour: n,
    minute: n,
    second: n,
};
const TIME_WITH_SHORT_OFFSET = {
    hour: n,
    minute: n,
    second: n,
    timeZoneName: s,
};
const TIME_WITH_LONG_OFFSET = {
    hour: n,
    minute: n,
    second: n,
    timeZoneName: l,
};
const TIME_24_SIMPLE = {
    hour: n,
    minute: n,
    hour12: false,
};
/**
 * {@link toLocaleString}; format like '09:30:23', always 24-hour.
 */
const TIME_24_WITH_SECONDS = {
    hour: n,
    minute: n,
    second: n,
    hour12: false,
};
/**
 * {@link toLocaleString}; format like '09:30:23 EDT', always 24-hour.
 */
const TIME_24_WITH_SHORT_OFFSET = {
    hour: n,
    minute: n,
    second: n,
    hour12: false,
    timeZoneName: s,
};
/**
 * {@link toLocaleString}; format like '09:30:23 Eastern Daylight Time', always 24-hour.
 */
const TIME_24_WITH_LONG_OFFSET = {
    hour: n,
    minute: n,
    second: n,
    hour12: false,
    timeZoneName: l,
};
/**
 * {@link toLocaleString}; format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
 */
const DATETIME_SHORT = {
    year: n,
    month: n,
    day: n,
    hour: n,
    minute: n,
};
/**
 * {@link toLocaleString}; format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
 */
const DATETIME_SHORT_WITH_SECONDS = {
    year: n,
    month: n,
    day: n,
    hour: n,
    minute: n,
    second: n,
};
const DATETIME_MED = {
    year: n,
    month: s,
    day: n,
    hour: n,
    minute: n,
};
const DATETIME_MED_WITH_SECONDS = {
    year: n,
    month: s,
    day: n,
    hour: n,
    minute: n,
    second: n,
};
const DATETIME_MED_WITH_WEEKDAY = {
    year: n,
    month: s,
    day: n,
    weekday: s,
    hour: n,
    minute: n,
};
const DATETIME_FULL = {
    year: n,
    month: l,
    day: n,
    hour: n,
    minute: n,
    timeZoneName: s,
};
const DATETIME_FULL_WITH_SECONDS = {
    year: n,
    month: l,
    day: n,
    hour: n,
    minute: n,
    second: n,
    timeZoneName: s,
};
const DATETIME_HUGE = {
    year: n,
    month: l,
    day: n,
    weekday: l,
    hour: n,
    minute: n,
    timeZoneName: l,
};
const DATETIME_HUGE_WITH_SECONDS = {
    year: n,
    month: l,
    day: n,
    weekday: l,
    hour: n,
    minute: n,
    second: n,
    timeZoneName: l,
};
/*
  This is just a junk drawer, containing anything used across multiple classes.
  Because Luxon is small(ish), this should stay small and we won't worry about splitting
  it up into, say, parsingUtil.js and basicUtil.js and so on. But they are divided up by feature area.
*/
/**
 * @private
 */
// TYPES
function isUndefined(o) {
    return typeof o === 'undefined';
}
function isNumber(o) {
    return typeof o === 'number';
}
function isInteger(o) {
    return typeof o === 'number' && o % 1 === 0;
}
function isString(o) {
    return typeof o === 'string';
}
function isDate(o) {
    return Object.prototype.toString.call(o) === '[object Date]';
} // CAPABILITIES
function hasIntl() {
    try {
        return typeof Intl !== 'undefined' && Intl.DateTimeFormat;
    }
    catch (e) {
        return false;
    }
}
function hasFormatToParts() {
    return !isUndefined(Intl.DateTimeFormat.prototype.formatToParts);
}
function hasRelative() {
    try {
        return typeof Intl !== 'undefined' && !!Intl.RelativeTimeFormat;
    }
    catch (e) {
        return false;
    }
} // OBJECTS AND ARRAYS
function maybeArray(thing) {
    return Array.isArray(thing) ? thing : [thing];
}
function bestBy(arr, by, compare) {
    if (arr.length === 0) {
        return undefined;
    }
    return arr.reduce((best, next) => {
        const pair = [by(next), next];
        if (!best) {
            return pair;
        }
        else if (compare(best[0], pair[0]) === best[0]) {
            return best;
        }
        else {
            return pair;
        }
    }, null)[1];
}
function pick(obj, keys) {
    return keys.reduce((a, k) => {
        a[k] = obj[k];
        return a;
    }, {});
}
function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
} // NUMBERS AND STRINGS
function integerBetween(thing, bottom, top) {
    return isInteger(thing) && thing >= bottom && thing <= top;
} // x % n but takes the sign of n instead of x
function floorMod(x, n) {
    return x - n * Math.floor(x / n);
}
function padStart(input, n = 2) {
    if (input.toString().length < n) {
        return ('0'.repeat(n) + input).slice(-n);
    }
    else {
        return input.toString();
    }
}
function parseInteger(string) {
    if (isUndefined(string) || string === null || string === '') {
        return undefined;
    }
    else {
        return parseInt(string, 10);
    }
}
function parseMillis(fraction) {
    // Return undefined (instead of 0) in these cases, where fraction is not set
    if (isUndefined(fraction) || fraction === null || fraction === '') {
        return undefined;
    }
    else {
        const f = parseFloat('0.' + fraction) * 1000;
        return Math.floor(f);
    }
}
function roundTo(number, digits, towardZero = false) {
    const factor = Math.pow(10, digits), rounder = towardZero ? Math.trunc : Math.round;
    return rounder(number * factor) / factor;
} // DATE BASICS
function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}
function daysInMonth(year, month) {
    const modMonth = floorMod(month - 1, 12) + 1, modYear = year + (month - modMonth) / 12;
    if (modMonth === 2) {
        return isLeapYear(modYear) ? 29 : 28;
    }
    else {
        return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
    }
} // covert a calendar object to a local timestamp (epoch, but with the offset baked in)
function objToLocalTS(obj) {
    let d = Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond); // for legacy reasons, years between 0 and 99 are interpreted as 19XX; revert that
    if (obj.year < 100 && obj.year >= 0) {
        d = new Date(d);
        d.setUTCFullYear(d.getUTCFullYear() - 1900);
    }
    return +d;
}
function weeksInWeekYear(weekYear) {
    const p1 = (weekYear +
        Math.floor(weekYear / 4) -
        Math.floor(weekYear / 100) +
        Math.floor(weekYear / 400)) %
        7, last = weekYear - 1, p2 = (last +
        Math.floor(last / 4) -
        Math.floor(last / 100) +
        Math.floor(last / 400)) %
        7;
    return p1 === 4 || p2 === 3 ? 53 : 52;
}
function untruncateYear(year) {
    if (year > 99) {
        return year;
    }
    else
        return year > 60 ? 1900 + year : 2000 + year;
} // PARSING
function parseZoneInfo(ts, offsetFormat, locale, timeZone = null) {
    const date = new Date(ts), intlOpts = {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };
    if (timeZone) {
        intlOpts.timeZone = timeZone;
    }
    const modified = Object.assign({
        timeZoneName: offsetFormat,
    }, intlOpts), intl = hasIntl();
    if (intl && hasFormatToParts()) {
        const parsed = new Intl.DateTimeFormat(locale, modified)
            .formatToParts(date)
            .find(m => m.type.toLowerCase() === 'timezonename');
        return parsed ? parsed.value : null;
    }
    else if (intl) {
        // this probably doesn't work for all locales
        const without = new Intl.DateTimeFormat(locale, intlOpts).format(date), included = new Intl.DateTimeFormat(locale, modified).format(date), diffed = included.substring(without.length), trimmed = diffed.replace(/^[, \u200e]+/, '');
        return trimmed;
    }
    else {
        return null;
    }
} // signedOffset('-5', '30') -> -330
function signedOffset(offHourStr, offMinuteStr) {
    let offHour = parseInt(offHourStr, 10); // don't || this because we want to preserve -0
    if (Number.isNaN(offHour)) {
        offHour = 0;
    }
    const offMin = parseInt(offMinuteStr, 10) || 0, offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
    return offHour * 60 + offMinSigned;
} // COERCION
function asNumber(value) {
    const numericValue = Number(value);
    if (typeof value === 'boolean' || value === '' || Number.isNaN(numericValue))
        throw new InvalidArgumentError(`Invalid unit value ${value}`);
    return numericValue;
}
function normalizeObject(obj, normalizer, nonUnitKeys) {
    const normalized = {};
    for (const u in obj) {
        if (hasOwnProperty(obj, u)) {
            if (nonUnitKeys.indexOf(u) >= 0)
                continue;
            const v = obj[u];
            if (v === undefined || v === null)
                continue;
            normalized[normalizer(u)] = asNumber(v);
        }
    }
    return normalized;
}
function formatOffset(offset, format) {
    const hours = Math.trunc(offset / 60), minutes = Math.abs(offset % 60), sign = hours >= 0 && !Object.is(hours, -0) ? '+' : '-', base = `${sign}${Math.abs(hours)}`;
    switch (format) {
        case 'short':
            return `${sign}${padStart(Math.abs(hours), 2)}:${padStart(minutes, 2)}`;
        case 'narrow':
            return minutes > 0 ? `${base}:${minutes}` : base;
        case 'techie':
            return `${sign}${padStart(Math.abs(hours), 2)}${padStart(minutes, 2)}`;
        default:
            throw new RangeError(`Value format ${format} is out of range for property format`);
    }
}
function timeObject(obj) {
    return pick(obj, ['hour', 'minute', 'second', 'millisecond']);
}
const ianaRegex = /[A-Za-z_+-]{1,256}(:?\/[A-Za-z_+-]{1,256}(\/[A-Za-z_+-]{1,256})?)?/;
function stringify(obj) {
    return JSON.stringify(obj, Object.keys(obj).sort());
}
/**
 * @private
 */
const monthsLong = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const monthsShort = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
const monthsNarrow = [
    'J',
    'F',
    'M',
    'A',
    'M',
    'J',
    'J',
    'A',
    'S',
    'O',
    'N',
    'D',
];
function months(length) {
    switch (length) {
        case 'narrow':
            return monthsNarrow;
        case 'short':
            return monthsShort;
        case 'long':
            return monthsLong;
        case 'numeric':
            return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        case '2-digit':
            return [
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '09',
                '10',
                '11',
                '12',
            ];
        default:
            return null;
    }
}
const weekdaysLong = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];
const weekdaysShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const weekdaysNarrow = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
function weekdays(length) {
    switch (length) {
        case 'narrow':
            return weekdaysNarrow;
        case 'short':
            return weekdaysShort;
        case 'long':
            return weekdaysLong;
        case 'numeric':
            return ['1', '2', '3', '4', '5', '6', '7'];
        default:
            return null;
    }
}
const meridiems = ['AM', 'PM'];
const erasLong = ['Before Christ', 'Anno Domini'];
const erasShort = ['BC', 'AD'];
const erasNarrow = ['B', 'A'];
function eras(length) {
    switch (length) {
        case 'narrow':
            return erasNarrow;
        case 'short':
            return erasShort;
        case 'long':
            return erasLong;
        default:
            return null;
    }
}
function meridiemForDateTime(dt) {
    return meridiems[dt.hour < 12 ? 0 : 1];
}
function weekdayForDateTime(dt, length) {
    return weekdays(length)[dt.weekday - 1];
}
function monthForDateTime(dt, length) {
    return months(length)[dt.month - 1];
}
function eraForDateTime(dt, length) {
    return eras(length)[dt.year < 0 ? 0 : 1];
}
function formatRelativeTime(unit, count, numeric = 'always', narrow = false) {
    const units = {
        years: ['year', 'yr.'],
        quarters: ['quarter', 'qtr.'],
        months: ['month', 'mo.'],
        weeks: ['week', 'wk.'],
        days: ['day', 'day', 'days'],
        hours: ['hour', 'hr.'],
        minutes: ['minute', 'min.'],
        seconds: ['second', 'sec.'],
    };
    const lastable = ['hours', 'minutes', 'seconds'].indexOf(unit) === -1;
    if (numeric === 'auto' && lastable) {
        const isDay = unit === 'days';
        switch (count) {
            case 1:
                return isDay ? 'tomorrow' : `next ${units[unit][0]}`;
            case -1:
                return isDay ? 'yesterday' : `last ${units[unit][0]}`;
            case 0:
                return isDay ? 'today' : `this ${units[unit][0]}`;
        }
    }
    const isInPast = Object.is(count, -0) || count < 0, fmtValue = Math.abs(count), singular = fmtValue === 1, lilUnits = units[unit], fmtUnit = narrow
        ? singular
            ? lilUnits[1]
            : lilUnits[2] || lilUnits[1]
        : singular
            ? units[unit][0]
            : unit;
    return isInPast ? `${fmtValue} ${fmtUnit} ago` : `in ${fmtValue} ${fmtUnit}`;
}
function formatString(knownFormat) {
    // these all have the offsets removed because we don't have access to them
    // without all the intl stuff this is backfilling
    const filtered = pick(knownFormat, [
        'weekday',
        'era',
        'year',
        'month',
        'day',
        'hour',
        'minute',
        'second',
        'timeZoneName',
        'hour12',
    ]), key = stringify(filtered), dateTimeHuge = 'EEEE, LLLL d, yyyy, h:mm a';
    switch (key) {
        case stringify(DATE_SHORT):
            return 'M/d/yyyy';
        case stringify(DATE_MED):
            return 'LLL d, yyyy';
        case stringify(DATE_FULL):
            return 'LLLL d, yyyy';
        case stringify(DATE_HUGE):
            return 'EEEE, LLLL d, yyyy';
        case stringify(TIME_SIMPLE):
            return 'h:mm a';
        case stringify(TIME_WITH_SECONDS):
            return 'h:mm:ss a';
        case stringify(TIME_WITH_SHORT_OFFSET):
            return 'h:mm a';
        case stringify(TIME_WITH_LONG_OFFSET):
            return 'h:mm a';
        case stringify(TIME_24_SIMPLE):
            return 'HH:mm';
        case stringify(TIME_24_WITH_SECONDS):
            return 'HH:mm:ss';
        case stringify(TIME_24_WITH_SHORT_OFFSET):
            return 'HH:mm';
        case stringify(TIME_24_WITH_LONG_OFFSET):
            return 'HH:mm';
        case stringify(DATETIME_SHORT):
            return 'M/d/yyyy, h:mm a';
        case stringify(DATETIME_MED):
            return 'LLL d, yyyy, h:mm a';
        case stringify(DATETIME_FULL):
            return 'LLLL d, yyyy, h:mm a';
        case stringify(DATETIME_HUGE):
            return dateTimeHuge;
        case stringify(DATETIME_SHORT_WITH_SECONDS):
            return 'M/d/yyyy, h:mm:ss a';
        case stringify(DATETIME_MED_WITH_SECONDS):
            return 'LLL d, yyyy, h:mm:ss a';
        case stringify(DATETIME_MED_WITH_WEEKDAY):
            return 'EEE, d LLL yyyy, h:mm a';
        case stringify(DATETIME_FULL_WITH_SECONDS):
            return 'LLLL d, yyyy, h:mm:ss a';
        case stringify(DATETIME_HUGE_WITH_SECONDS):
            return 'EEEE, LLLL d, yyyy, h:mm:ss a';
        default:
            return dateTimeHuge;
    }
}
function stringifyTokens(splits, tokenToString) {
    let s = '';
    for (const token of splits) {
        if (token.literal) {
            s += token.val;
        }
        else {
            s += tokenToString(token.val);
        }
    }
    return s;
}
const macroTokenToFormatOpts = {
    D: DATE_SHORT,
    DD: DATE_MED,
    DDD: DATE_FULL,
    DDDD: DATE_HUGE,
    t: TIME_SIMPLE,
    tt: TIME_WITH_SECONDS,
    ttt: TIME_WITH_SHORT_OFFSET,
    tttt: TIME_WITH_LONG_OFFSET,
    T: TIME_24_SIMPLE,
    TT: TIME_24_WITH_SECONDS,
    TTT: TIME_24_WITH_SHORT_OFFSET,
    TTTT: TIME_24_WITH_LONG_OFFSET,
    f: DATETIME_SHORT,
    ff: DATETIME_MED,
    fff: DATETIME_FULL,
    ffff: DATETIME_HUGE,
    F: DATETIME_SHORT_WITH_SECONDS,
    FF: DATETIME_MED_WITH_SECONDS,
    FFF: DATETIME_FULL_WITH_SECONDS,
    FFFF: DATETIME_HUGE_WITH_SECONDS,
};
/**
 * @private
 */
class Formatter {
    constructor(locale, formatOpts) {
        this.opts = formatOpts;
        this.loc = locale;
        this.systemLoc = null;
    }
    static create(locale, opts = {}) {
        return new Formatter(locale, opts);
    }
    static parseFormat(fmt) {
        let current = null, currentFull = '', bracketed = false;
        const splits = [];
        for (let i = 0; i < fmt.length; i++) {
            const c = fmt.charAt(i);
            if (c === "'") {
                if (currentFull.length > 0) {
                    splits.push({
                        literal: bracketed,
                        val: currentFull,
                    });
                }
                current = null;
                currentFull = '';
                bracketed = !bracketed;
            }
            else if (bracketed) {
                currentFull += c;
            }
            else if (c === current) {
                currentFull += c;
            }
            else {
                if (currentFull.length > 0) {
                    splits.push({
                        literal: false,
                        val: currentFull,
                    });
                }
                currentFull = c;
                current = c;
            }
        }
        if (currentFull.length > 0) {
            splits.push({
                literal: bracketed,
                val: currentFull,
            });
        }
        return splits;
    }
    static macroTokenToFormatOpts(token) {
        return macroTokenToFormatOpts[token];
    }
    formatWithSystemDefault(dt, opts) {
        if (this.systemLoc === null) {
            this.systemLoc = this.loc.redefaultToSystem();
        }
        const df = this.systemLoc.dtFormatter(dt, Object.assign({}, this.opts, opts));
        return df.format();
    }
    formatDateTime(dt, opts = {}) {
        const df = this.loc.dtFormatter(dt, Object.assign({}, this.opts, opts));
        return df.format();
    }
    formatDateTimeParts(dt, opts = {}) {
        const df = this.loc.dtFormatter(dt, Object.assign({}, this.opts, opts));
        return df.formatToParts();
    }
    resolvedOptions(dt, opts = {}) {
        const df = this.loc.dtFormatter(dt, Object.assign({}, this.opts, opts));
        return df.resolvedOptions();
    }
    num(n, p = 0) {
        // we get some perf out of doing this here, annoyingly
        if (this.opts.forceSimple) {
            return padStart(n, p);
        }
        const opts = Object.assign({}, this.opts);
        if (p > 0) {
            opts.padTo = p;
        }
        return this.loc.numberFormatter(opts).format(n);
    }
    formatDateTimeFromString(dt, fmt) {
        const knownEnglish = this.loc.listingMode() === 'en', useDateTimeFormatter = this.loc.outputCalendar &&
            this.loc.outputCalendar !== 'gregory' &&
            hasFormatToParts(), string = (opts, extract) => this.loc.extract(dt, opts, extract), formatOffset = opts => {
            if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
                return 'Z';
            }
            return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : '';
        }, meridiem = () => knownEnglish
            ? meridiemForDateTime(dt)
            : string({
                hour: 'numeric',
                hour12: true,
            }, 'dayperiod'), month = (length, standalone) => knownEnglish
            ? monthForDateTime(dt, length)
            : string(standalone
                ? {
                    month: length,
                }
                : {
                    month: length,
                    day: 'numeric',
                }, 'month'), weekday = (length, standalone) => knownEnglish
            ? weekdayForDateTime(dt, length)
            : string(standalone
                ? {
                    weekday: length,
                }
                : {
                    weekday: length,
                    month: 'long',
                    day: 'numeric',
                }, 'weekday'), maybeMacro = token => {
            const formatOpts = Formatter.macroTokenToFormatOpts(token);
            if (formatOpts) {
                return this.formatWithSystemDefault(dt, formatOpts);
            }
            else {
                return token;
            }
        }, era = length => knownEnglish
            ? eraForDateTime(dt, length)
            : string({
                era: length,
            }, 'era'), tokenToString = token => {
            // Where possible: http://cldr.unicode.org/translation/date-time#TOC-Stand-Alone-vs.-Format-Styles
            switch (token) {
                // ms
                case 'S':
                    return this.num(dt.millisecond);
                case 'u': // falls through
                case 'SSS':
                    return this.num(dt.millisecond, 3);
                // seconds
                case 's':
                    return this.num(dt.second);
                case 'ss':
                    return this.num(dt.second, 2);
                // minutes
                case 'm':
                    return this.num(dt.minute);
                case 'mm':
                    return this.num(dt.minute, 2);
                // hours
                case 'h':
                    return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
                case 'hh':
                    return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
                case 'H':
                    return this.num(dt.hour);
                case 'HH':
                    return this.num(dt.hour, 2);
                // offset
                case 'Z':
                    // like +6
                    return formatOffset({
                        format: 'narrow',
                        allowZ: this.opts.allowZ,
                    });
                case 'ZZ':
                    // like +06:00
                    return formatOffset({
                        format: 'short',
                        allowZ: this.opts.allowZ,
                    });
                case 'ZZZ':
                    // like +0600
                    return formatOffset({
                        format: 'techie',
                        allowZ: this.opts.allowZ,
                    });
                case 'ZZZZ':
                    // like EST
                    return dt.zone.offsetName(dt.ts, {
                        format: 'short',
                        locale: this.loc.locale,
                    });
                case 'ZZZZZ':
                    // like Eastern Standard Time
                    return dt.zone.offsetName(dt.ts, {
                        format: 'long',
                        locale: this.loc.locale,
                    });
                // zone
                case 'z':
                    // like America/New_York
                    return dt.zoneName;
                // meridiems
                case 'a':
                    return meridiem();
                // dates
                case 'd':
                    return useDateTimeFormatter
                        ? string({
                            day: 'numeric',
                        }, 'day')
                        : this.num(dt.day);
                case 'dd':
                    return useDateTimeFormatter
                        ? string({
                            day: '2-digit',
                        }, 'day')
                        : this.num(dt.day, 2);
                // weekdays - standalone
                case 'c':
                    // like 1
                    return this.num(dt.weekday);
                case 'ccc':
                    // like 'Tues'
                    return weekday('short', true);
                case 'cccc':
                    // like 'Tuesday'
                    return weekday('long', true);
                case 'ccccc':
                    // like 'T'
                    return weekday('narrow', true);
                // weekdays - format
                case 'E':
                    // like 1
                    return this.num(dt.weekday);
                case 'EEE':
                    // like 'Tues'
                    return weekday('short', false);
                case 'EEEE':
                    // like 'Tuesday'
                    return weekday('long', false);
                case 'EEEEE':
                    // like 'T'
                    return weekday('narrow', false);
                // months - standalone
                case 'L':
                    // like 1
                    return useDateTimeFormatter
                        ? string({
                            month: 'numeric',
                            day: 'numeric',
                        }, 'month')
                        : this.num(dt.month);
                case 'LL':
                    // like 01, doesn't seem to work
                    return useDateTimeFormatter
                        ? string({
                            month: '2-digit',
                            day: 'numeric',
                        }, 'month')
                        : this.num(dt.month, 2);
                case 'LLL':
                    // like Jan
                    return month('short', true);
                case 'LLLL':
                    // like January
                    return month('long', true);
                case 'LLLLL':
                    // like J
                    return month('narrow', true);
                // months - format
                case 'M':
                    // like 1
                    return useDateTimeFormatter
                        ? string({
                            month: 'numeric',
                        }, 'month')
                        : this.num(dt.month);
                case 'MM':
                    // like 01
                    return useDateTimeFormatter
                        ? string({
                            month: '2-digit',
                        }, 'month')
                        : this.num(dt.month, 2);
                case 'MMM':
                    // like Jan
                    return month('short', false);
                case 'MMMM':
                    // like January
                    return month('long', false);
                case 'MMMMM':
                    // like J
                    return month('narrow', false);
                // years
                case 'y':
                    // like 2014
                    return useDateTimeFormatter
                        ? string({
                            year: 'numeric',
                        }, 'year')
                        : this.num(dt.year);
                case 'yy':
                    // like 14
                    return useDateTimeFormatter
                        ? string({
                            year: '2-digit',
                        }, 'year')
                        : this.num(dt.year.toString().slice(-2), 2);
                case 'yyyy':
                    // like 0012
                    return useDateTimeFormatter
                        ? string({
                            year: 'numeric',
                        }, 'year')
                        : this.num(dt.year, 4);
                case 'yyyyyy':
                    // like 000012
                    return useDateTimeFormatter
                        ? string({
                            year: 'numeric',
                        }, 'year')
                        : this.num(dt.year, 6);
                // eras
                case 'G':
                    // like AD
                    return era('short');
                case 'GG':
                    // like Anno Domini
                    return era('long');
                case 'GGGGG':
                    return era('narrow');
                case 'kk':
                    return this.num(dt.weekYear.toString().slice(-2), 2);
                case 'kkkk':
                    return this.num(dt.weekYear, 4);
                case 'W':
                    return this.num(dt.weekNumber);
                case 'WW':
                    return this.num(dt.weekNumber, 2);
                case 'o':
                    return this.num(dt.ordinal);
                case 'ooo':
                    return this.num(dt.ordinal, 3);
                case 'q':
                    // like 1
                    return this.num(dt.quarter);
                case 'qq':
                    // like 01
                    return this.num(dt.quarter, 2);
                case 'X':
                    return this.num(Math.floor(dt.ts / 1000));
                case 'x':
                    return this.num(dt.ts);
                default:
                    return maybeMacro(token);
            }
        };
        return stringifyTokens(Formatter.parseFormat(fmt), tokenToString);
    }
    formatDurationFromString(dur, fmt) {
        const tokenToField = token => {
            switch (token[0]) {
                case 'S':
                    return 'millisecond';
                case 's':
                    return 'second';
                case 'm':
                    return 'minute';
                case 'h':
                    return 'hour';
                case 'd':
                    return 'day';
                case 'M':
                    return 'month';
                case 'y':
                    return 'year';
                default:
                    return null;
            }
        }, tokenToString = lildur => token => {
            const mapped = tokenToField(token);
            if (mapped) {
                return this.num(lildur.get(mapped), token.length);
            }
            else {
                return token;
            }
        }, tokens = Formatter.parseFormat(fmt), realTokens = tokens.reduce((found, { literal, val }) => (literal ? found : found.concat(val)), []), collapsed = dur.shiftTo(...realTokens.map(tokenToField).filter(t => t));
        return stringifyTokens(tokens, tokenToString(collapsed));
    }
}
class Invalid {
    constructor(reason, explanation) {
        this.reason = reason;
        this.explanation = explanation;
    }
    toMessage() {
        if (this.explanation) {
            return `${this.reason}: ${this.explanation}`;
        }
        else {
            return this.reason;
        }
    }
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null)
        return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0)
            continue;
        target[key] = source[key];
    }
    return target;
}
/* eslint no-unused-vars: "off" */
/**
 * @interface
 */
class Zone {
    /**
     * The type of zone
     * @abstract
     * @type {string}
     */
    get type() {
        throw new ZoneIsAbstractError();
    }
    /**
     * The name of this zone.
     * @abstract
     * @type {string}
     */
    get name() {
        throw new ZoneIsAbstractError();
    }
    /**
     * Returns whether the offset is known to be fixed for the whole year.
     * @abstract
     * @type {boolean}
     */
    get universal() {
        throw new ZoneIsAbstractError();
    }
    /**
     * Return whether this Zone is valid.
     * @abstract
     * @type {boolean}
     */
    get isValid() {
        throw new ZoneIsAbstractError();
    }
    /**
     * Returns the offset's common name (such as EST) at the specified timestamp
     * @abstract
     * @param {number} ts - Epoch milliseconds for which to get the name
     * @param {Object} opts - Options to affect the format
     * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
     * @param {string} opts.locale - What locale to return the offset name in.
     * @return {string}
     */
    offsetName(ts, opts) {
        throw new ZoneIsAbstractError();
    }
    /**
     * Returns the offset's value as a string
     * @abstract
     * @param {number} ts - Epoch milliseconds for which to get the offset
     * @param {string} format - What style of offset to return.
     *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
     * @return {string}
     */
    formatOffset(ts, format) {
        throw new ZoneIsAbstractError();
    }
    /**
     * Return the offset in minutes for this zone at the specified timestamp.
     * @abstract
     * @param {number} ts - Epoch milliseconds for which to compute the offset
     * @return {number}
     */
    offset(ts) {
        throw new ZoneIsAbstractError();
    }
    /**
     * Return whether this Zone is equal to another zone
     * @abstract
     * @param {Zone} otherZone - the zone to compare
     * @return {boolean}
     */
    equals(otherZone) {
        throw new ZoneIsAbstractError();
    }
}
let singleton = null;
/**
 * Represents the local zone for this Javascript environment.
 * @implements {Zone}
 */
class LocalZone extends Zone {
    /**
     * Get a singleton instance of the local zone
     * @return {LocalZone}
     */
    static get instance() {
        if (singleton === null) {
            singleton = new LocalZone();
        }
        return singleton;
    }
    /** @override **/
    get type() {
        return 'local';
    }
    /** @override **/
    get name() {
        if (hasIntl()) {
            return new Intl.DateTimeFormat().resolvedOptions().timeZone;
        }
        else
            return 'local';
    }
    /** @override **/
    get universal() {
        return false;
    }
    /** @override **/
    get isValid() {
        return true;
    }
    /** @override **/
    offsetName(ts, { format, locale }) {
        return parseZoneInfo(ts, format, locale);
    }
    /** @override **/
    formatOffset(ts, format) {
        return formatOffset(this.offset(ts), format);
    }
    /** @override **/
    offset(ts) {
        return -new Date(ts).getTimezoneOffset();
    }
    /** @override **/
    equals(otherZone) {
        return otherZone.type === 'local';
    }
}
const matchingRegex = RegExp(`^${ianaRegex.source}$`);
let dtfCache = {};
function makeDTF(zone) {
    if (!dtfCache[zone]) {
        dtfCache[zone] = new Intl.DateTimeFormat('en-US', {
            hour12: false,
            timeZone: zone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    }
    return dtfCache[zone];
}
const typeToPos = {
    year: 0,
    month: 1,
    day: 2,
    hour: 3,
    minute: 4,
    second: 5,
};
function hackyOffset(dtf, date) {
    const formatted = dtf.format(date).replace(/\u200E/g, ''), parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted), [, fMonth, fDay, fYear, fHour, fMinute, fSecond] = parsed;
    return [fYear, fMonth, fDay, fHour, fMinute, fSecond];
}
function partsOffset(dtf, date) {
    const formatted = dtf.formatToParts(date), filled = [];
    for (let i = 0; i < formatted.length; i++) {
        const { type, value } = formatted[i], pos = typeToPos[type];
        if (!isUndefined(pos)) {
            filled[pos] = parseInt(value, 10);
        }
    }
    return filled;
}
let ianaZoneCache = {};
/**
 * A zone identified by an IANA identifier, like America/New_York
 * @implements {Zone}
 */
class IANAZone extends Zone {
    constructor(name) {
        super();
        /** @private **/
        this.zoneName = name;
        /** @private **/
        this.valid = IANAZone.isValidZone(name);
    }
    /** @override **/
    get type() {
        return 'iana';
    }
    /** @override **/
    get name() {
        return this.zoneName;
    }
    /** @override **/
    get universal() {
        return false;
    }
    /** @override **/
    get isValid() {
        return this.valid;
    }
    /**
     * @param {string} name - Zone name
     * @return {IANAZone}
     */
    static create(name) {
        if (!ianaZoneCache[name]) {
            ianaZoneCache[name] = new IANAZone(name);
        }
        return ianaZoneCache[name];
    }
    /**
     * Reset local caches. Should only be necessary in testing scenarios.
     * @return {void}
     */
    static resetCache() {
        ianaZoneCache = {};
        dtfCache = {};
    }
    /**
     * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
     * @param {string} s - The string to check validity on
     * @example IANAZone.isValidSpecifier("America/New_York") //=> true
     * @example IANAZone.isValidSpecifier("Fantasia/Castle") //=> true
     * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
     * @return {boolean}
     */
    static isValidSpecifier(s) {
        return !!(s && s.match(matchingRegex));
    }
    /**
     * Returns whether the provided string identifies a real zone
     * @param {string} zone - The string to check
     * @example IANAZone.isValidZone("America/New_York") //=> true
     * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
     * @example IANAZone.isValidZone("Sport~~blorp") //=> false
     * @return {boolean}
     */
    static isValidZone(zone) {
        try {
            new Intl.DateTimeFormat('en-US', {
                timeZone: zone,
            }).format();
            return true;
        }
        catch (e) {
            return false;
        }
    } // Etc/GMT+8 -> -480
    /** @ignore */
    static parseGMTOffset(specifier) {
        if (specifier) {
            const match = specifier.match(/^Etc\/GMT([+-]\d{1,2})$/i);
            if (match) {
                return -60 * parseInt(match[1]);
            }
        }
        return null;
    }
    /** @override **/
    offsetName(ts, { format, locale }) {
        return parseZoneInfo(ts, format, locale, this.name);
    }
    /** @override **/
    formatOffset(ts, format) {
        return formatOffset(this.offset(ts), format);
    }
    /** @override **/
    offset(ts) {
        const date = new Date(ts), dtf = makeDTF(this.name), [year, month, day, hour, minute, second] = dtf.formatToParts
            ? partsOffset(dtf, date)
            : hackyOffset(dtf, date), 
        // work around https://bugs.chromium.org/p/chromium/issues/detail?id=1025564&can=2&q=%2224%3A00%22%20datetimeformat
        adjustedHour = hour === 24 ? 0 : hour;
        const asUTC = objToLocalTS({
            year,
            month,
            day,
            hour: adjustedHour,
            minute,
            second,
            millisecond: 0,
        });
        let asTS = +date;
        const over = asTS % 1000;
        asTS -= over >= 0 ? over : 1000 + over;
        return (asUTC - asTS) / (60 * 1000);
    }
    /** @override **/
    equals(otherZone) {
        return otherZone.type === 'iana' && otherZone.name === this.name;
    }
}
let singleton$1 = null;
/**
 * A zone with a fixed offset (meaning no DST)
 * @implements {Zone}
 */
class FixedOffsetZone extends Zone {
    constructor(offset) {
        super();
        /** @private **/
        this.fixed = offset;
    }
    /**
     * Get a singleton instance of UTC
     * @return {FixedOffsetZone}
     */
    static get utcInstance() {
        if (singleton$1 === null) {
            singleton$1 = new FixedOffsetZone(0);
        }
        return singleton$1;
    }
    /** @override **/
    get type() {
        return 'fixed';
    }
    /** @override **/
    get name() {
        return this.fixed === 0
            ? 'UTC'
            : `UTC${formatOffset(this.fixed, 'narrow')}`;
    }
    /** @override **/
    get universal() {
        return true;
    }
    /** @override **/
    get isValid() {
        return true;
    }
    /**
     * Get an instance with a specified offset
     * @param {number} offset - The offset in minutes
     * @return {FixedOffsetZone}
     */
    static instance(offset) {
        return offset === 0
            ? FixedOffsetZone.utcInstance
            : new FixedOffsetZone(offset);
    }
    /**
     * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
     * @param {string} s - The offset string to parse
     * @example FixedOffsetZone.parseSpecifier("UTC+6")
     * @example FixedOffsetZone.parseSpecifier("UTC+06")
     * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
     * @return {FixedOffsetZone}
     */
    static parseSpecifier(s) {
        if (s) {
            const r = s.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
            if (r) {
                return new FixedOffsetZone(signedOffset(r[1], r[2]));
            }
        }
        return null;
    }
    /** @override **/
    offsetName() {
        return this.name;
    }
    /** @override **/
    formatOffset(ts, format) {
        return formatOffset(this.fixed, format);
    }
    /** @override **/
    offset() {
        return this.fixed;
    }
    /** @override **/
    equals(otherZone) {
        return otherZone.type === 'fixed' && otherZone.fixed === this.fixed;
    }
}
/**
 * A zone that failed to parse. You should never need to instantiate this.
 * @implements {Zone}
 */
class InvalidZone extends Zone {
    constructor(zoneName) {
        super();
        /**  @private */
        this.zoneName = zoneName;
    }
    /** @override **/
    get type() {
        return 'invalid';
    }
    /** @override **/
    get name() {
        return this.zoneName;
    }
    /** @override **/
    get universal() {
        return false;
    }
    /** @override **/
    get isValid() {
        return false;
    }
    /** @override **/
    offsetName() {
        return null;
    }
    /** @override **/
    formatOffset() {
        return '';
    }
    /** @override **/
    offset() {
        return NaN;
    }
    /** @override **/
    equals() {
        return false;
    }
}
/**
 * @private
 */
function normalizeZone(input, defaultZone) {
    let offset;
    if (isUndefined(input) || input === null) {
        return defaultZone;
    }
    else if (input instanceof Zone) {
        return input;
    }
    else if (isString(input)) {
        const lowered = input.toLowerCase();
        if (lowered === 'local')
            return defaultZone;
        else if (lowered === 'utc' || lowered === 'gmt')
            return FixedOffsetZone.utcInstance;
        else if ((offset = IANAZone.parseGMTOffset(input)) != null) {
            // handle Etc/GMT-4, which V8 chokes on
            return FixedOffsetZone.instance(offset);
        }
        else if (IANAZone.isValidSpecifier(lowered))
            return IANAZone.create(input);
        else
            return FixedOffsetZone.parseSpecifier(lowered) || new InvalidZone(input);
    }
    else if (isNumber(input)) {
        return FixedOffsetZone.instance(input);
    }
    else if (typeof input === 'object' &&
        input.offset &&
        typeof input.offset === 'number') {
        // This is dumb, but the instanceof check above doesn't seem to really work
        // so we're duck checking it
        return input;
    }
    else {
        return new InvalidZone(input);
    }
}
let now = () => Date.now(), defaultZone = null, 
// not setting this directly to LocalZone.instance bc loading order issues
defaultLocale = null, defaultNumberingSystem = null, defaultOutputCalendar = null, throwOnInvalid = false;
/**
 * Settings contains static getters and setters that control Luxon's overall behavior. Luxon is a simple library with few options, but the ones it does have live here.
 */
class Settings {
    /**
     * Get the callback for returning the current timestamp.
     * @type {function}
     */
    static get now() {
        return now;
    }
    /**
     * Set the callback for returning the current timestamp.
     * The function should return a number, which will be interpreted as an Epoch millisecond count
     * @type {function}
     * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
     * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
     */
    static set now(n) {
        now = n;
    }
    /**
     * Get the default time zone to create DateTimes in.
     * @type {string}
     */
    static get defaultZoneName() {
        return Settings.defaultZone.name;
    }
    /**
     * Set the default time zone to create DateTimes in. Does not affect existing instances.
     * @type {string}
     */
    static set defaultZoneName(z) {
        if (!z) {
            defaultZone = null;
        }
        else {
            defaultZone = normalizeZone(z);
        }
    }
    /**
     * Get the default time zone object to create DateTimes in. Does not affect existing instances.
     * @type {Zone}
     */
    static get defaultZone() {
        return defaultZone || LocalZone.instance;
    }
    /**
     * Get the default locale to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static get defaultLocale() {
        return defaultLocale;
    }
    /**
     * Set the default locale to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static set defaultLocale(locale) {
        defaultLocale = locale;
    }
    /**
     * Get the default numbering system to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static get defaultNumberingSystem() {
        return defaultNumberingSystem;
    }
    /**
     * Set the default numbering system to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static set defaultNumberingSystem(numberingSystem) {
        defaultNumberingSystem = numberingSystem;
    }
    /**
     * Get the default output calendar to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static get defaultOutputCalendar() {
        return defaultOutputCalendar;
    }
    /**
     * Set the default output calendar to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static set defaultOutputCalendar(outputCalendar) {
        defaultOutputCalendar = outputCalendar;
    }
    /**
     * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
     * @type {boolean}
     */
    static get throwOnInvalid() {
        return throwOnInvalid;
    }
    /**
     * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
     * @type {boolean}
     */
    static set throwOnInvalid(t) {
        throwOnInvalid = t;
    }
    /**
     * Reset Luxon's global caches. Should only be necessary in testing scenarios.
     * @return {void}
     */
    static resetCaches() {
        Locale.resetCache();
        IANAZone.resetCache();
    }
}
let intlDTCache = {};
function getCachedDTF(locString, opts = {}) {
    const key = JSON.stringify([locString, opts]);
    let dtf = intlDTCache[key];
    if (!dtf) {
        dtf = new Intl.DateTimeFormat(locString, opts);
        intlDTCache[key] = dtf;
    }
    return dtf;
}
let intlNumCache = {};
function getCachedINF(locString, opts = {}) {
    const key = JSON.stringify([locString, opts]);
    let inf = intlNumCache[key];
    if (!inf) {
        inf = new Intl.NumberFormat(locString, opts);
        intlNumCache[key] = inf;
    }
    return inf;
}
let intlRelCache = {};
function getCachedRTF(locString, opts = {}) {
    const cacheKeyOpts = _objectWithoutPropertiesLoose(opts, ['base']); // exclude `base` from the options
    const key = JSON.stringify([locString, cacheKeyOpts]);
    let inf = intlRelCache[key];
    if (!inf) {
        inf = new Intl.RelativeTimeFormat(locString, opts);
        intlRelCache[key] = inf;
    }
    return inf;
}
let sysLocaleCache = null;
function systemLocale() {
    if (sysLocaleCache) {
        return sysLocaleCache;
    }
    else if (hasIntl()) {
        const computedSys = new Intl.DateTimeFormat().resolvedOptions().locale; // node sometimes defaults to "und". Override that because that is dumb
        sysLocaleCache =
            !computedSys || computedSys === 'und' ? 'en-US' : computedSys;
        return sysLocaleCache;
    }
    else {
        sysLocaleCache = 'en-US';
        return sysLocaleCache;
    }
}
function parseLocaleString(localeStr) {
    // I really want to avoid writing a BCP 47 parser
    // see, e.g. https://github.com/wooorm/bcp-47
    // Instead, we'll do this:
    // a) if the string has no -u extensions, just leave it alone
    // b) if it does, use Intl to resolve everything
    // c) if Intl fails, try again without the -u
    const uIndex = localeStr.indexOf('-u-');
    if (uIndex === -1) {
        return [localeStr];
    }
    else {
        let options;
        const smaller = localeStr.substring(0, uIndex);
        try {
            options = getCachedDTF(localeStr).resolvedOptions();
        }
        catch (e) {
            options = getCachedDTF(smaller).resolvedOptions();
        }
        const { numberingSystem, calendar } = options; // return the smaller one so that we can append the calendar and numbering overrides to it
        return [smaller, numberingSystem, calendar];
    }
}
function intlConfigString(localeStr, numberingSystem, outputCalendar) {
    if (hasIntl()) {
        if (outputCalendar || numberingSystem) {
            localeStr += '-u';
            if (outputCalendar) {
                localeStr += `-ca-${outputCalendar}`;
            }
            if (numberingSystem) {
                localeStr += `-nu-${numberingSystem}`;
            }
            return localeStr;
        }
        else {
            return localeStr;
        }
    }
    else {
        return [];
    }
}
function mapMonths(f) {
    const ms = [];
    for (let i = 1; i <= 12; i++) {
        const dt = DateTime.utc(2016, i, 1);
        ms.push(f(dt));
    }
    return ms;
}
function mapWeekdays(f) {
    const ms = [];
    for (let i = 1; i <= 7; i++) {
        const dt = DateTime.utc(2016, 11, 13 + i);
        ms.push(f(dt));
    }
    return ms;
}
function listStuff(loc, length, defaultOK, englishFn, intlFn) {
    const mode = loc.listingMode(defaultOK);
    if (mode === 'error') {
        return null;
    }
    else if (mode === 'en') {
        return englishFn(length);
    }
    else {
        return intlFn(length);
    }
}
function supportsFastNumbers(loc) {
    if (loc.numberingSystem && loc.numberingSystem !== 'latn') {
        return false;
    }
    else {
        return (loc.numberingSystem === 'latn' ||
            !loc.locale ||
            loc.locale.startsWith('en') ||
            (hasIntl() &&
                new Intl.DateTimeFormat(loc.intl).resolvedOptions().numberingSystem ===
                    'latn'));
    }
}
/**
 * @private
 */
class PolyNumberFormatter {
    constructor(intl, forceSimple, opts) {
        this.padTo = opts.padTo || 0;
        this.floor = opts.floor || false;
        if (!forceSimple && hasIntl()) {
            const intlOpts = {
                useGrouping: false,
            };
            if (opts.padTo > 0)
                intlOpts.minimumIntegerDigits = opts.padTo;
            this.inf = getCachedINF(intl, intlOpts);
        }
    }
    format(i) {
        if (this.inf) {
            const fixed = this.floor ? Math.floor(i) : i;
            return this.inf.format(fixed);
        }
        else {
            // to match the browser's numberformatter defaults
            const fixed = this.floor ? Math.floor(i) : roundTo(i, 3);
            return padStart(fixed, this.padTo);
        }
    }
}
/**
 * @private
 */
class PolyDateFormatter {
    constructor(dt, intl, opts) {
        this.opts = opts;
        this.hasIntl = hasIntl();
        let z;
        if (dt.zone.universal && this.hasIntl) {
            // Chromium doesn't support fixed-offset zones like Etc/GMT+8 in its formatter,
            // See https://bugs.chromium.org/p/chromium/issues/detail?id=364374.
            // So we have to make do. Two cases:
            // 1. The format options tell us to show the zone. We can't do that, so the best
            // we can do is format the date in UTC.
            // 2. The format options don't tell us to show the zone. Then we can adjust them
            // the time and tell the formatter to show it to us in UTC, so that the time is right
            // and the bad zone doesn't show up.
            // We can clean all this up when Chrome fixes this.
            z = 'UTC';
            if (opts.timeZoneName) {
                this.dt = dt;
            }
            else {
                this.dt =
                    dt.offset === 0
                        ? dt
                        : DateTime.fromMillis(dt.ts + dt.offset * 60 * 1000);
            }
        }
        else if (dt.zone.type === 'local') {
            this.dt = dt;
        }
        else {
            this.dt = dt;
            z = dt.zone.name;
        }
        if (this.hasIntl) {
            const intlOpts = Object.assign({}, this.opts);
            if (z) {
                intlOpts.timeZone = z;
            }
            this.dtf = getCachedDTF(intl, intlOpts);
        }
    }
    format() {
        if (this.hasIntl) {
            return this.dtf.format(this.dt.toJSDate());
        }
        else {
            const tokenFormat = formatString(this.opts), loc = Locale.create('en-US');
            return Formatter.create(loc).formatDateTimeFromString(this.dt, tokenFormat);
        }
    }
    formatToParts() {
        if (this.hasIntl && hasFormatToParts()) {
            return this.dtf.formatToParts(this.dt.toJSDate());
        }
        else {
            // This is kind of a cop out. We actually could do this for English. However, we couldn't do it for intl strings
            // and IMO it's too weird to have an uncanny valley like that
            return [];
        }
    }
    resolvedOptions() {
        if (this.hasIntl) {
            return this.dtf.resolvedOptions();
        }
        else {
            return {
                locale: 'en-US',
                numberingSystem: 'latn',
                outputCalendar: 'gregory',
            };
        }
    }
}
/**
 * @private
 */
class PolyRelFormatter {
    constructor(intl, isEnglish, opts) {
        this.opts = Object.assign({
            style: 'long',
        }, opts);
        if (!isEnglish && hasRelative()) {
            this.rtf = getCachedRTF(intl, opts);
        }
    }
    format(count, unit) {
        if (this.rtf) {
            return this.rtf.format(count, unit);
        }
        else {
            return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== 'long');
        }
    }
    formatToParts(count, unit) {
        if (this.rtf) {
            return this.rtf.formatToParts(count, unit);
        }
        else {
            return [];
        }
    }
}
/**
 * @private
 */
class Locale {
    constructor(locale, numbering, outputCalendar, specifiedLocale) {
        const [parsedLocale, parsedNumberingSystem, parsedOutputCalendar] = parseLocaleString(locale);
        this.locale = parsedLocale;
        this.numberingSystem = numbering || parsedNumberingSystem || null;
        this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
        this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);
        this.weekdaysCache = {
            format: {},
            standalone: {},
        };
        this.monthsCache = {
            format: {},
            standalone: {},
        };
        this.meridiemCache = null;
        this.eraCache = {};
        this.specifiedLocale = specifiedLocale;
        this.fastNumbersCached = null;
    }
    get fastNumbers() {
        if (this.fastNumbersCached == null) {
            this.fastNumbersCached = supportsFastNumbers(this);
        }
        return this.fastNumbersCached;
    }
    static fromOpts(opts) {
        return Locale.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.defaultToEN);
    }
    static create(locale, numberingSystem, outputCalendar, defaultToEN = false) {
        const specifiedLocale = locale || Settings.defaultLocale, 
        // the system locale is useful for human readable strings but annoying for parsing/formatting known formats
        localeR = specifiedLocale || (defaultToEN ? 'en-US' : systemLocale()), numberingSystemR = numberingSystem || Settings.defaultNumberingSystem, outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
        return new Locale(localeR, numberingSystemR, outputCalendarR, specifiedLocale);
    }
    static resetCache() {
        sysLocaleCache = null;
        intlDTCache = {};
        intlNumCache = {};
        intlRelCache = {};
    }
    static fromObject({ locale, numberingSystem, outputCalendar } = {}) {
        return Locale.create(locale, numberingSystem, outputCalendar);
    }
    listingMode(defaultOK = true) {
        const intl = hasIntl(), hasFTP = intl && hasFormatToParts(), isActuallyEn = this.isEnglish(), hasNoWeirdness = (this.numberingSystem === null || this.numberingSystem === 'latn') &&
            (this.outputCalendar === null || this.outputCalendar === 'gregory');
        if (!hasFTP && !(isActuallyEn && hasNoWeirdness) && !defaultOK) {
            return 'error';
        }
        else if (!hasFTP || (isActuallyEn && hasNoWeirdness)) {
            return 'en';
        }
        else {
            return 'intl';
        }
    }
    clone(alts) {
        if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
            return this;
        }
        else {
            return Locale.create(alts.locale || this.specifiedLocale, alts.numberingSystem || this.numberingSystem, alts.outputCalendar || this.outputCalendar, alts.defaultToEN || false);
        }
    }
    redefaultToEN(alts = {}) {
        return this.clone(Object.assign({}, alts, {
            defaultToEN: true,
        }));
    }
    redefaultToSystem(alts = {}) {
        return this.clone(Object.assign({}, alts, {
            defaultToEN: false,
        }));
    }
    months(length, format = false, defaultOK = true) {
        return listStuff(this, length, defaultOK, months, () => {
            const intl = format
                ? {
                    month: length,
                    day: 'numeric',
                }
                : {
                    month: length,
                }, formatStr = format ? 'format' : 'standalone';
            if (!this.monthsCache[formatStr][length]) {
                this.monthsCache[formatStr][length] = mapMonths(dt => this.extract(dt, intl, 'month'));
            }
            return this.monthsCache[formatStr][length];
        });
    }
    weekdays(length, format = false, defaultOK = true) {
        return listStuff(this, length, defaultOK, weekdays, () => {
            const intl = format
                ? {
                    weekday: length,
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }
                : {
                    weekday: length,
                }, formatStr = format ? 'format' : 'standalone';
            if (!this.weekdaysCache[formatStr][length]) {
                this.weekdaysCache[formatStr][length] = mapWeekdays(dt => this.extract(dt, intl, 'weekday'));
            }
            return this.weekdaysCache[formatStr][length];
        });
    }
    meridiems(defaultOK = true) {
        return listStuff(this, undefined, defaultOK, () => meridiems, () => {
            // In theory there could be aribitrary day periods. We're gonna assume there are exactly two
            // for AM and PM. This is probably wrong, but it's makes parsing way easier.
            if (!this.meridiemCache) {
                const intl = {
                    hour: 'numeric',
                    hour12: true,
                };
                this.meridiemCache = [
                    DateTime.utc(2016, 11, 13, 9),
                    DateTime.utc(2016, 11, 13, 19),
                ].map(dt => this.extract(dt, intl, 'dayperiod'));
            }
            return this.meridiemCache;
        });
    }
    eras(length, defaultOK = true) {
        return listStuff(this, length, defaultOK, eras, () => {
            const intl = {
                era: length,
            }; // This is utter bullshit. Different calendars are going to define eras totally differently. What I need is the minimum set of dates
            // to definitely enumerate them.
            if (!this.eraCache[length]) {
                this.eraCache[length] = [
                    DateTime.utc(-40, 1, 1),
                    DateTime.utc(2017, 1, 1),
                ].map(dt => this.extract(dt, intl, 'era'));
            }
            return this.eraCache[length];
        });
    }
    extract(dt, intlOpts, field) {
        const df = this.dtFormatter(dt, intlOpts), results = df.formatToParts(), matching = results.find(m => m.type.toLowerCase() === field);
        return matching ? matching.value : null;
    }
    numberFormatter(opts = {}) {
        // this forcesimple option is never used (the only caller short-circuits on it, but it seems safer to leave)
        // (in contrast, the rest of the condition is used heavily)
        return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
    }
    dtFormatter(dt, intlOpts = {}) {
        return new PolyDateFormatter(dt, this.intl, intlOpts);
    }
    relFormatter(opts = {}) {
        return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
    }
    isEnglish() {
        return (this.locale === 'en' ||
            this.locale.toLowerCase() === 'en-us' ||
            (hasIntl() &&
                new Intl.DateTimeFormat(this.intl)
                    .resolvedOptions()
                    .locale.startsWith('en-us')));
    }
    equals(other) {
        return (this.locale === other.locale &&
            this.numberingSystem === other.numberingSystem &&
            this.outputCalendar === other.outputCalendar);
    }
}
/*
 * This file handles parsing for well-specified formats. Here's how it works:
 * Two things go into parsing: a regex to match with and an extractor to take apart the groups in the match.
 * An extractor is just a function that takes a regex match array and returns a { year: ..., month: ... } object
 * parse() does the work of executing the regex and applying the extractor. It takes multiple regex/extractor pairs to try in sequence.
 * Extractors can take a "cursor" representing the offset in the match to look at. This makes it easy to combine extractors.
 * combineExtractors() does the work of combining them, keeping track of the cursor through multiple extractions.
 * Some extractions are super dumb and simpleParse and fromStrings help DRY them.
 */
function combineRegexes(...regexes) {
    const full = regexes.reduce((f, r) => f + r.source, '');
    return RegExp(`^${full}$`);
}
function combineExtractors(...extractors) {
    return m => extractors
        .reduce(([mergedVals, mergedZone, cursor], ex) => {
        const [val, zone, next] = ex(m, cursor);
        return [Object.assign(mergedVals, val), mergedZone || zone, next];
    }, [{}, null, 1])
        .slice(0, 2);
}
function parse(s, ...patterns) {
    if (s == null) {
        return [null, null];
    }
    for (const [regex, extractor] of patterns) {
        const m = regex.exec(s);
        if (m) {
            return extractor(m);
        }
    }
    return [null, null];
}
function simpleParse(...keys) {
    return (match, cursor) => {
        const ret = {};
        let i;
        for (i = 0; i < keys.length; i++) {
            ret[keys[i]] = parseInteger(match[cursor + i]);
        }
        return [ret, null, cursor + i];
    };
} // ISO and SQL parsing
const offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/, isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,9}))?)?)?/, isoTimeRegex = RegExp(`${isoTimeBaseRegex.source}${offsetRegex.source}?`), isoTimeExtensionRegex = RegExp(`(?:T${isoTimeRegex.source})?`), isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/, isoOrdinalRegex = /(\d{4})-?(\d{3})/, extractISOWeekData = simpleParse('weekYear', 'weekNumber', 'weekDay'), extractISOOrdinalData = simpleParse('year', 'ordinal'), sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/, 
// dumbed-down version of the ISO one
sqlTimeRegex = RegExp(`${isoTimeBaseRegex.source} ?(?:${offsetRegex.source}|(${ianaRegex.source}))?`), sqlTimeExtensionRegex = RegExp(`(?: ${sqlTimeRegex.source})?`);
function int(match, pos, fallback) {
    const m = match[pos];
    return isUndefined(m) ? fallback : parseInteger(m);
}
function extractISOYmd(match, cursor) {
    const item = {
        year: int(match, cursor),
        month: int(match, cursor + 1, 1),
        day: int(match, cursor + 2, 1),
    };
    return [item, null, cursor + 3];
}
function extractISOTime(match, cursor) {
    const item = {
        hour: int(match, cursor, 0),
        minute: int(match, cursor + 1, 0),
        second: int(match, cursor + 2, 0),
        millisecond: parseMillis(match[cursor + 3]),
    };
    return [item, null, cursor + 4];
}
function extractISOOffset(match, cursor) {
    const local = !match[cursor] && !match[cursor + 1], fullOffset = signedOffset(match[cursor + 1], match[cursor + 2]), zone = local ? null : FixedOffsetZone.instance(fullOffset);
    return [{}, zone, cursor + 3];
}
function extractIANAZone(match, cursor) {
    const zone = match[cursor] ? IANAZone.create(match[cursor]) : null;
    return [{}, zone, cursor + 1];
} // ISO duration parsing
const isoDuration = /^-?P(?:(?:(-?\d{1,9})Y)?(?:(-?\d{1,9})M)?(?:(-?\d{1,9})W)?(?:(-?\d{1,9})D)?(?:T(?:(-?\d{1,9})H)?(?:(-?\d{1,9})M)?(?:(-?\d{1,9})(?:[.,](-?\d{1,9}))?S)?)?)$/;
function extractISODuration(match) {
    const [s, yearStr, monthStr, weekStr, dayStr, hourStr, minuteStr, secondStr, millisecondsStr,] = match;
    const hasNegativePrefix = s[0] === '-';
    const maybeNegate = num => (num && hasNegativePrefix ? -num : num);
    return [
        {
            years: maybeNegate(parseInteger(yearStr)),
            months: maybeNegate(parseInteger(monthStr)),
            weeks: maybeNegate(parseInteger(weekStr)),
            days: maybeNegate(parseInteger(dayStr)),
            hours: maybeNegate(parseInteger(hourStr)),
            minutes: maybeNegate(parseInteger(minuteStr)),
            seconds: maybeNegate(parseInteger(secondStr)),
            milliseconds: maybeNegate(parseMillis(millisecondsStr)),
        },
    ];
} // These are a little braindead. EDT *should* tell us that we're in, say, America/New_York
// and not just that we're in -240 *right now*. But since I don't think these are used that often
// I'm just going to ignore that
const obsOffsets = {
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60,
};
function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    const result = {
        year: yearStr.length === 2
            ? untruncateYear(parseInteger(yearStr))
            : parseInteger(yearStr),
        month: monthsShort.indexOf(monthStr) + 1,
        day: parseInteger(dayStr),
        hour: parseInteger(hourStr),
        minute: parseInteger(minuteStr),
    };
    if (secondStr)
        result.second = parseInteger(secondStr);
    if (weekdayStr) {
        result.weekday =
            weekdayStr.length > 3
                ? weekdaysLong.indexOf(weekdayStr) + 1
                : weekdaysShort.indexOf(weekdayStr) + 1;
    }
    return result;
} // RFC 2822/5322
const rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function extractRFC2822(match) {
    const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr, obsOffset, milOffset, offHourStr, offMinuteStr,] = match, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
    let offset;
    if (obsOffset) {
        offset = obsOffsets[obsOffset];
    }
    else if (milOffset) {
        offset = 0;
    }
    else {
        offset = signedOffset(offHourStr, offMinuteStr);
    }
    return [result, new FixedOffsetZone(offset)];
}
function preprocessRFC2822(s) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s
        .replace(/\([^)]*\)|[\n\t]/g, ' ')
        .replace(/(\s\s+)/g, ' ')
        .trim();
} // http date
const rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, rfc850 = /^(Monday|Tuesday|Wedsday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function extractRFC1123Or850(match) {
    const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr,] = match, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
    return [result, FixedOffsetZone.utcInstance];
}
function extractASCII(match) {
    const [, weekdayStr, monthStr, dayStr, hourStr, minuteStr, secondStr, yearStr,] = match, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
    return [result, FixedOffsetZone.utcInstance];
}
const isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
const isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
const isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
const isoTimeCombinedRegex = combineRegexes(isoTimeRegex);
const extractISOYmdTimeAndOffset = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset);
const extractISOWeekTimeAndOffset = combineExtractors(extractISOWeekData, extractISOTime, extractISOOffset);
const extractISOOrdinalDataAndTime = combineExtractors(extractISOOrdinalData, extractISOTime);
const extractISOTimeAndOffset = combineExtractors(extractISOTime, extractISOOffset);
/**
 * @private
 */
function parseISODate(s) {
    return parse(s, [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset], [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDataAndTime], [isoTimeCombinedRegex, extractISOTimeAndOffset]);
}
function parseRFC2822Date(s) {
    return parse(preprocessRFC2822(s), [rfc2822, extractRFC2822]);
}
function parseHTTPDate(s) {
    return parse(s, [rfc1123, extractRFC1123Or850], [rfc850, extractRFC1123Or850], [ascii, extractASCII]);
}
function parseISODuration(s) {
    return parse(s, [isoDuration, extractISODuration]);
}
const sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
const sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);
const extractISOYmdTimeOffsetAndIANAZone = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset, extractIANAZone);
const extractISOTimeOffsetAndIANAZone = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
function parseSQL(s) {
    return parse(s, [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeOffsetAndIANAZone], [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]);
}
const INVALID = 'Invalid Duration'; // unit conversion constants
const lowOrderMatrix = {
    weeks: {
        days: 7,
        hours: 7 * 24,
        minutes: 7 * 24 * 60,
        seconds: 7 * 24 * 60 * 60,
        milliseconds: 7 * 24 * 60 * 60 * 1000,
    },
    days: {
        hours: 24,
        minutes: 24 * 60,
        seconds: 24 * 60 * 60,
        milliseconds: 24 * 60 * 60 * 1000,
    },
    hours: {
        minutes: 60,
        seconds: 60 * 60,
        milliseconds: 60 * 60 * 1000,
    },
    minutes: {
        seconds: 60,
        milliseconds: 60 * 1000,
    },
    seconds: {
        milliseconds: 1000,
    },
}, casualMatrix = Object.assign({
    years: {
        months: 12,
        weeks: 52,
        days: 365,
        hours: 365 * 24,
        minutes: 365 * 24 * 60,
        seconds: 365 * 24 * 60 * 60,
        milliseconds: 365 * 24 * 60 * 60 * 1000,
    },
    quarters: {
        months: 3,
        weeks: 13,
        days: 91,
        hours: 91 * 24,
        minutes: 91 * 24 * 60,
        milliseconds: 91 * 24 * 60 * 60 * 1000,
    },
    months: {
        weeks: 4,
        days: 30,
        hours: 30 * 24,
        minutes: 30 * 24 * 60,
        seconds: 30 * 24 * 60 * 60,
        milliseconds: 30 * 24 * 60 * 60 * 1000,
    },
}, lowOrderMatrix), daysInYearAccurate = 146097.0 / 400, daysInMonthAccurate = 146097.0 / 4800, accurateMatrix = Object.assign({
    years: {
        months: 12,
        weeks: daysInYearAccurate / 7,
        days: daysInYearAccurate,
        hours: daysInYearAccurate * 24,
        minutes: daysInYearAccurate * 24 * 60,
        seconds: daysInYearAccurate * 24 * 60 * 60,
        milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1000,
    },
    quarters: {
        months: 3,
        weeks: daysInYearAccurate / 28,
        days: daysInYearAccurate / 4,
        hours: (daysInYearAccurate * 24) / 4,
        minutes: (daysInYearAccurate * 24 * 60) / 4,
        seconds: (daysInYearAccurate * 24 * 60 * 60) / 4,
        milliseconds: (daysInYearAccurate * 24 * 60 * 60 * 1000) / 4,
    },
    months: {
        weeks: daysInMonthAccurate / 7,
        days: daysInMonthAccurate,
        hours: daysInMonthAccurate * 24,
        minutes: daysInMonthAccurate * 24 * 60,
        seconds: daysInMonthAccurate * 24 * 60 * 60,
        milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1000,
    },
}, lowOrderMatrix); // units ordered by size
const orderedUnits = [
    'years',
    'quarters',
    'months',
    'weeks',
    'days',
    'hours',
    'minutes',
    'seconds',
    'milliseconds',
];
const reverseUnits = orderedUnits.slice(0).reverse(); // clone really means "create another instance just like this one, but with these changes"
function clone(dur, alts, clear = false) {
    // deep merge for vals
    const conf = {
        values: clear
            ? alts.values
            : Object.assign({}, dur.values, alts.values || {}),
        loc: dur.loc.clone(alts.loc),
        conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy,
    };
    return new Duration(conf);
}
function antiTrunc(n) {
    return n < 0 ? Math.floor(n) : Math.ceil(n);
} // NB: mutates parameters
function convert(matrix, fromMap, fromUnit, toMap, toUnit) {
    const conv = matrix[toUnit][fromUnit], raw = fromMap[fromUnit] / conv, sameSign = Math.sign(raw) === Math.sign(toMap[toUnit]), 
    // ok, so this is wild, but see the matrix in the tests
    added = !sameSign && toMap[toUnit] !== 0 && Math.abs(raw) <= 1
        ? antiTrunc(raw)
        : Math.trunc(raw);
    toMap[toUnit] += added;
    fromMap[fromUnit] -= added * conv;
} // NB: mutates parameters
function normalizeValues(matrix, vals) {
    reverseUnits.reduce((previous, current) => {
        if (!isUndefined(vals[current])) {
            if (previous) {
                convert(matrix, vals, previous, vals, current);
            }
            return current;
        }
        else {
            return previous;
        }
    }, null);
}
/**
 * A Duration object represents a period of time, like "2 months" or "1 day, 1 hour". Conceptually, it's just a map of units to their quantities, accompanied by some additional configuration and methods for creating, parsing, interrogating, transforming, and formatting them. They can be used on their own or in conjunction with other Luxon types; for example, you can use {@link DateTime.plus} to add a Duration object to a DateTime, producing another DateTime.
 *
 * Here is a brief overview of commonly used methods and getters in Duration:
 *
 * * **Creation** To create a Duration, use {@link Duration.fromMillis}, {@link Duration.fromObject}, or {@link Duration.fromISO}.
 * * **Unit values** See the {@link Duration.years}, {@link Duration.months}, {@link Duration.weeks}, {@link Duration.days}, {@link Duration.hours}, {@link Duration.minutes}, {@link Duration.seconds}, {@link Duration.milliseconds} accessors.
 * * **Configuration** See  {@link Duration.locale} and {@link Duration.numberingSystem} accessors.
 * * **Transformation** To create new Durations out of old ones use {@link Duration.plus}, {@link Duration.minus}, {@link Duration.normalize}, {@link Duration.set}, {@link Duration.reconfigure}, {@link Duration.shiftTo}, and {@link Duration.negate}.
 * * **Output** To convert the Duration into other representations, see {@link Duration.as}, {@link Duration.toISO}, {@link Duration.toFormat}, and {@link Duration.toJSON}
 *
 * There's are more methods documented below. In addition, for more information on subtler topics like internationalization and validity, see the external documentation.
 */
class Duration {
    /**
     * @private
     */
    constructor(config) {
        const accurate = config.conversionAccuracy === 'longterm' || false;
        /**
         * @access private
         */
        this.values = config.values;
        /**
         * @access private
         */
        this.loc = config.loc || Locale.create();
        /**
         * @access private
         */
        this.conversionAccuracy = accurate ? 'longterm' : 'casual';
        /**
         * @access private
         */
        this.invalid = config.invalid || null;
        /**
         * @access private
         */
        this.matrix = accurate ? accurateMatrix : casualMatrix;
        /**
         * @access private
         */
        this.isLuxonDuration = true;
    }
    /**
     * Get  the locale of a Duration, such 'en-GB'
     * @type {string}
     */
    get locale() {
        return this.isValid ? this.loc.locale : null;
    }
    /**
     * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
     *
     * @type {string}
     */
    get numberingSystem() {
        return this.isValid ? this.loc.numberingSystem : null;
    }
    /**
     * Get the years.
     * @type {number}
     */
    get years() {
        return this.isValid ? this.values.years || 0 : NaN;
    }
    /**
     * Get the quarters.
     * @type {number}
     */
    get quarters() {
        return this.isValid ? this.values.quarters || 0 : NaN;
    }
    /**
     * Get the months.
     * @type {number}
     */
    get months() {
        return this.isValid ? this.values.months || 0 : NaN;
    }
    /**
     * Get the weeks
     * @type {number}
     */
    get weeks() {
        return this.isValid ? this.values.weeks || 0 : NaN;
    }
    /**
     * Get the days.
     * @type {number}
     */
    get days() {
        return this.isValid ? this.values.days || 0 : NaN;
    }
    /**
     * Get the hours.
     * @type {number}
     */
    get hours() {
        return this.isValid ? this.values.hours || 0 : NaN;
    }
    /**
     * Get the minutes.
     * @type {number}
     */
    get minutes() {
        return this.isValid ? this.values.minutes || 0 : NaN;
    }
    /**
     * Get the seconds.
     * @return {number}
     */
    get seconds() {
        return this.isValid ? this.values.seconds || 0 : NaN;
    }
    /**
     * Get the milliseconds.
     * @return {number}
     */
    get milliseconds() {
        return this.isValid ? this.values.milliseconds || 0 : NaN;
    }
    /**
     * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
     * on invalid DateTimes or Intervals.
     * @return {boolean}
     */
    get isValid() {
        return this.invalid === null;
    }
    /**
     * Returns an error code if this Duration became invalid, or null if the Duration is valid
     * @return {string}
     */
    get invalidReason() {
        return this.invalid ? this.invalid.reason : null;
    }
    /**
     * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
     * @type {string}
     */
    get invalidExplanation() {
        return this.invalid ? this.invalid.explanation : null;
    }
    /**
     * Create Duration from a number of milliseconds.
     * @param {number} count of milliseconds
     * @param {Object} opts - options for parsing
     * @param {string} [opts.locale='en-US'] - the locale to use
     * @param {string} opts.numberingSystem - the numbering system to use
     * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
     * @return {Duration}
     */
    static fromMillis(count, opts) {
        return Duration.fromObject(Object.assign({
            milliseconds: count,
        }, opts));
    }
    /**
     * Create a Duration from a Javascript object with keys like 'years' and 'hours.
     * If this object is empty then a zero milliseconds duration is returned.
     * @param {Object} obj - the object to create the DateTime from
     * @param {number} obj.years
     * @param {number} obj.quarters
     * @param {number} obj.months
     * @param {number} obj.weeks
     * @param {number} obj.days
     * @param {number} obj.hours
     * @param {number} obj.minutes
     * @param {number} obj.seconds
     * @param {number} obj.milliseconds
     * @param {string} [obj.locale='en-US'] - the locale to use
     * @param {string} obj.numberingSystem - the numbering system to use
     * @param {string} [obj.conversionAccuracy='casual'] - the conversion system to use
     * @return {Duration}
     */
    static fromObject(obj) {
        if (obj == null || typeof obj !== 'object') {
            throw new InvalidArgumentError(`Duration.fromObject: argument expected to be an object, got ${obj === null ? 'null' : typeof obj}`);
        }
        return new Duration({
            values: normalizeObject(obj, Duration.normalizeUnit, [
                'locale',
                'numberingSystem',
                'conversionAccuracy',
                'zone', // a bit of debt; it's super inconvenient internally not to be able to blindly pass this
            ]),
            loc: Locale.fromObject(obj),
            conversionAccuracy: obj.conversionAccuracy,
        });
    }
    /**
     * Create a Duration from an ISO 8601 duration string.
     * @param {string} text - text to parse
     * @param {Object} opts - options for parsing
     * @param {string} [opts.locale='en-US'] - the locale to use
     * @param {string} opts.numberingSystem - the numbering system to use
     * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
     * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
     * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
     * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
     * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
     * @return {Duration}
     */
    static fromISO(text, opts) {
        const [parsed] = parseISODuration(text);
        if (parsed) {
            const obj = Object.assign(parsed, opts);
            return Duration.fromObject(obj);
        }
        else {
            return Duration.invalid('unparsable', `the input "${text}" can't be parsed as ISO 8601`);
        }
    }
    /**
     * Create an invalid Duration.
     * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
     * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
     * @return {Duration}
     */
    static invalid(reason, explanation = null) {
        if (!reason) {
            throw new InvalidArgumentError('need to specify a reason the Duration is invalid');
        }
        const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
        if (Settings.throwOnInvalid) {
            throw new InvalidDurationError(invalid);
        }
        else {
            return new Duration({
                invalid,
            });
        }
    }
    /**
     * @private
     */
    static normalizeUnit(unit) {
        const normalized = {
            year: 'years',
            years: 'years',
            quarter: 'quarters',
            quarters: 'quarters',
            month: 'months',
            months: 'months',
            week: 'weeks',
            weeks: 'weeks',
            day: 'days',
            days: 'days',
            hour: 'hours',
            hours: 'hours',
            minute: 'minutes',
            minutes: 'minutes',
            second: 'seconds',
            seconds: 'seconds',
            millisecond: 'milliseconds',
            milliseconds: 'milliseconds',
        }[unit ? unit.toLowerCase() : unit];
        if (!normalized)
            throw new InvalidUnitError(unit);
        return normalized;
    }
    /**
     * Check if an object is a Duration. Works across context boundaries
     * @param {object} o
     * @return {boolean}
     */
    static isDuration(o) {
        return (o && o.isLuxonDuration) || false;
    }
    /**
     * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
     * * `S` for milliseconds
     * * `s` for seconds
     * * `m` for minutes
     * * `h` for hours
     * * `d` for days
     * * `M` for months
     * * `y` for years
     * Notes:
     * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
     * * The duration will be converted to the set of units in the format string using {@link Duration.shiftTo} and the Durations's conversion accuracy setting.
     * @param {string} fmt - the format string
     * @param {Object} opts - options
     * @param {boolean} [opts.floor=true] - floor numerical values
     * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
     * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
     * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
     * @return {string}
     */
    toFormat(fmt, opts = {}) {
        // reverse-compat since 1.2; we always round down now, never up, and we do it by default
        const fmtOpts = Object.assign({}, opts, {
            floor: opts.round !== false && opts.floor !== false,
        });
        return this.isValid
            ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt)
            : INVALID;
    }
    /**
     * Returns a Javascript object with this Duration's values.
     * @param opts - options for generating the object
     * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
     * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
     * @return {Object}
     */
    toObject(opts = {}) {
        if (!this.isValid)
            return {};
        const base = Object.assign({}, this.values);
        if (opts.includeConfig) {
            base.conversionAccuracy = this.conversionAccuracy;
            base.numberingSystem = this.loc.numberingSystem;
            base.locale = this.loc.locale;
        }
        return base;
    }
    /**
     * Returns an ISO 8601-compliant string representation of this Duration.
     * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
     * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
     * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
     * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
     * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
     * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
     * @return {string}
     */
    toISO() {
        // we could use the formatter, but this is an easier way to get the minimum string
        if (!this.isValid)
            return null;
        let s = 'P';
        if (this.years !== 0)
            s += this.years + 'Y';
        if (this.months !== 0 || this.quarters !== 0)
            s += this.months + this.quarters * 3 + 'M';
        if (this.weeks !== 0)
            s += this.weeks + 'W';
        if (this.days !== 0)
            s += this.days + 'D';
        if (this.hours !== 0 ||
            this.minutes !== 0 ||
            this.seconds !== 0 ||
            this.milliseconds !== 0)
            s += 'T';
        if (this.hours !== 0)
            s += this.hours + 'H';
        if (this.minutes !== 0)
            s += this.minutes + 'M';
        if (this.seconds !== 0 || this.milliseconds !== 0)
            // this will handle "floating point madness" by removing extra decimal places
            // https://stackoverflow.com/questions/588004/is-floating-point-math-broken
            s += roundTo(this.seconds + this.milliseconds / 1000, 3) + 'S';
        if (s === 'P')
            s += 'T0S';
        return s;
    }
    /**
     * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
     * @return {string}
     */
    toJSON() {
        return this.toISO();
    }
    /**
     * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
     * @return {string}
     */
    toString() {
        return this.toISO();
    }
    /**
     * Returns an milliseconds value of this Duration.
     * @return {number}
     */
    valueOf() {
        return this.as('milliseconds');
    }
    /**
     * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
     * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
     * @return {Duration}
     */
    plus(duration) {
        if (!this.isValid)
            return this;
        const dur = friendlyDuration(duration), result = {};
        for (const k of orderedUnits) {
            if (hasOwnProperty(dur.values, k) || hasOwnProperty(this.values, k)) {
                result[k] = dur.get(k) + this.get(k);
            }
        }
        return clone(this, {
            values: result,
        }, true);
    }
    /**
     * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
     * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
     * @return {Duration}
     */
    minus(duration) {
        if (!this.isValid)
            return this;
        const dur = friendlyDuration(duration);
        return this.plus(dur.negate());
    }
    /**
     * Scale this Duration by the specified amount. Return a newly-constructed Duration.
     * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
     * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnit(x => x * 2) //=> { hours: 2, minutes: 60 }
     * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnit((x, u) => u === "hour" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
     * @return {Duration}
     */
    mapUnits(fn) {
        if (!this.isValid)
            return this;
        const result = {};
        for (const k of Object.keys(this.values)) {
            result[k] = asNumber(fn(this.values[k], k));
        }
        return clone(this, {
            values: result,
        }, true);
    }
    /**
     * Get the value of unit.
     * @param {string} unit - a unit such as 'minute' or 'day'
     * @example Duration.fromObject({years: 2, days: 3}).years //=> 2
     * @example Duration.fromObject({years: 2, days: 3}).months //=> 0
     * @example Duration.fromObject({years: 2, days: 3}).days //=> 3
     * @return {number}
     */
    get(unit) {
        return this[Duration.normalizeUnit(unit)];
    }
    /**
     * "Set" the values of specified units. Return a newly-constructed Duration.
     * @param {Object} values - a mapping of units to numbers
     * @example dur.set({ years: 2017 })
     * @example dur.set({ hours: 8, minutes: 30 })
     * @return {Duration}
     */
    set(values) {
        if (!this.isValid)
            return this;
        const mixed = Object.assign(this.values, normalizeObject(values, Duration.normalizeUnit, []));
        return clone(this, {
            values: mixed,
        });
    }
    /**
     * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
     * @example dur.reconfigure({ locale: 'en-GB' })
     * @return {Duration}
     */
    reconfigure({ locale, numberingSystem, conversionAccuracy } = {}) {
        const loc = this.loc.clone({
            locale,
            numberingSystem,
        }), opts = {
            loc,
        };
        if (conversionAccuracy) {
            opts.conversionAccuracy = conversionAccuracy;
        }
        return clone(this, opts);
    }
    /**
     * Return the length of the duration in the specified unit.
     * @param {string} unit - a unit such as 'minutes' or 'days'
     * @example Duration.fromObject({years: 1}).as('days') //=> 365
     * @example Duration.fromObject({years: 1}).as('months') //=> 12
     * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
     * @return {number}
     */
    as(unit) {
        return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
    }
    /**
     * Reduce this Duration to its canonical representation in its current units.
     * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
     * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
     * @return {Duration}
     */
    normalize() {
        if (!this.isValid)
            return this;
        const vals = this.toObject();
        normalizeValues(this.matrix, vals);
        return clone(this, {
            values: vals,
        }, true);
    }
    /**
     * Convert this Duration into its representation in a different set of units.
     * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
     * @return {Duration}
     */
    shiftTo(...units) {
        if (!this.isValid)
            return this;
        if (units.length === 0) {
            return this;
        }
        units = units.map(u => Duration.normalizeUnit(u));
        const built = {}, accumulated = {}, vals = this.toObject();
        let lastUnit;
        normalizeValues(this.matrix, vals);
        for (const k of orderedUnits) {
            if (units.indexOf(k) >= 0) {
                lastUnit = k;
                let own = 0; // anything we haven't boiled down yet should get boiled to this unit
                for (const ak in accumulated) {
                    own += this.matrix[ak][k] * accumulated[ak];
                    accumulated[ak] = 0;
                } // plus anything that's already in this unit
                if (isNumber(vals[k])) {
                    own += vals[k];
                }
                const i = Math.trunc(own);
                built[k] = i;
                accumulated[k] = own - i; // we'd like to absorb these fractions in another unit
                // plus anything further down the chain that should be rolled up in to this
                for (const down in vals) {
                    if (orderedUnits.indexOf(down) > orderedUnits.indexOf(k)) {
                        convert(this.matrix, vals, down, built, k);
                    }
                } // otherwise, keep it in the wings to boil it later
            }
            else if (isNumber(vals[k])) {
                accumulated[k] = vals[k];
            }
        } // anything leftover becomes the decimal for the last unit
        // lastUnit must be defined since units is not empty
        for (const key in accumulated) {
            if (accumulated[key] !== 0) {
                built[lastUnit] +=
                    key === lastUnit
                        ? accumulated[key]
                        : accumulated[key] / this.matrix[lastUnit][key];
            }
        }
        return clone(this, {
            values: built,
        }, true).normalize();
    }
    /**
     * Return the negative of this Duration.
     * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
     * @return {Duration}
     */
    negate() {
        if (!this.isValid)
            return this;
        const negated = {};
        for (const k of Object.keys(this.values)) {
            negated[k] = -this.values[k];
        }
        return clone(this, {
            values: negated,
        }, true);
    }
    /**
     * Equality check
     * Two Durations are equal iff they have the same units and the same values for each unit.
     * @param {Duration} other
     * @return {boolean}
     */
    equals(other) {
        if (!this.isValid || !other.isValid) {
            return false;
        }
        if (!this.loc.equals(other.loc)) {
            return false;
        }
        for (const u of orderedUnits) {
            if (this.values[u] !== other.values[u]) {
                return false;
            }
        }
        return true;
    }
}
/**
 * @private
 */
function friendlyDuration(durationish) {
    if (isNumber(durationish)) {
        return Duration.fromMillis(durationish);
    }
    else if (Duration.isDuration(durationish)) {
        return durationish;
    }
    else if (typeof durationish === 'object') {
        return Duration.fromObject(durationish);
    }
    else {
        throw new InvalidArgumentError(`Unknown duration argument ${durationish} of type ${typeof durationish}`);
    }
}
const INVALID$1 = 'Invalid Interval'; // checks if the start is equal to or before the end
function validateStartEnd(start, end) {
    if (!start || !start.isValid) {
        return Interval.invalid('missing or invalid start');
    }
    else if (!end || !end.isValid) {
        return Interval.invalid('missing or invalid end');
    }
    else if (end < start) {
        return Interval.invalid('end before start', `The end of an interval must be after its start, but you had start=${start.toISO()} and end=${end.toISO()}`);
    }
    else {
        return null;
    }
}
/**
 * An Interval object represents a half-open interval of time, where each endpoint is a {@link DateTime}. Conceptually, it's a container for those two endpoints, accompanied by methods for creating, parsing, interrogating, comparing, transforming, and formatting them.
 *
 * Here is a brief overview of the most commonly used methods and getters in Interval:
 *
 * * **Creation** To create an Interval, use {@link fromDateTimes}, {@link after}, {@link before}, or {@link fromISO}.
 * * **Accessors** Use {@link start} and {@link end} to get the start and end.
 * * **Interrogation** To analyze the Interval, use {@link count}, {@link length}, {@link hasSame}, {@link contains}, {@link isAfter}, or {@link isBefore}.
 * * **Transformation** To create other Intervals out of this one, use {@link set}, {@link splitAt}, {@link splitBy}, {@link divideEqually}, {@link merge}, {@link xor}, {@link union}, {@link intersection}, or {@link difference}.
 * * **Comparison** To compare this Interval to another one, use {@link equals}, {@link overlaps}, {@link abutsStart}, {@link abutsEnd}, {@link engulfs}
 * * **Output** To convert the Interval into other representations, see {@link toString}, {@link toISO}, {@link toISODate}, {@link toISOTime}, {@link toFormat}, and {@link toDuration}.
 */
class Interval {
    /**
     * @private
     */
    constructor(config) {
        /**
         * @access private
         */
        this.s = config.start;
        /**
         * @access private
         */
        this.e = config.end;
        /**
         * @access private
         */
        this.invalid = config.invalid || null;
        /**
         * @access private
         */
        this.isLuxonInterval = true;
    }
    /**
     * Returns the start of the Interval
     * @type {DateTime}
     */
    get start() {
        return this.isValid ? this.s : null;
    }
    /**
     * Returns the end of the Interval
     * @type {DateTime}
     */
    get end() {
        return this.isValid ? this.e : null;
    }
    /**
     * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
     * @type {boolean}
     */
    get isValid() {
        return this.invalidReason === null;
    }
    /**
     * Returns an error code if this Interval is invalid, or null if the Interval is valid
     * @type {string}
     */
    get invalidReason() {
        return this.invalid ? this.invalid.reason : null;
    }
    /**
     * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
     * @type {string}
     */
    get invalidExplanation() {
        return this.invalid ? this.invalid.explanation : null;
    }
    /**
     * Create an invalid Interval.
     * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
     * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
     * @return {Interval}
     */
    static invalid(reason, explanation = null) {
        if (!reason) {
            throw new InvalidArgumentError('need to specify a reason the Interval is invalid');
        }
        const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
        if (Settings.throwOnInvalid) {
            throw new InvalidIntervalError(invalid);
        }
        else {
            return new Interval({
                invalid,
            });
        }
    }
    /**
     * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
     * @param {DateTime|Date|Object} start
     * @param {DateTime|Date|Object} end
     * @return {Interval}
     */
    static fromDateTimes(start, end) {
        const builtStart = friendlyDateTime(start), builtEnd = friendlyDateTime(end);
        const validateError = validateStartEnd(builtStart, builtEnd);
        if (validateError == null) {
            return new Interval({
                start: builtStart,
                end: builtEnd,
            });
        }
        else {
            return validateError;
        }
    }
    /**
     * Create an Interval from a start DateTime and a Duration to extend to.
     * @param {DateTime|Date|Object} start
     * @param {Duration|Object|number} duration - the length of the Interval.
     * @return {Interval}
     */
    static after(start, duration) {
        const dur = friendlyDuration(duration), dt = friendlyDateTime(start);
        return Interval.fromDateTimes(dt, dt.plus(dur));
    }
    /**
     * Create an Interval from an end DateTime and a Duration to extend backwards to.
     * @param {DateTime|Date|Object} end
     * @param {Duration|Object|number} duration - the length of the Interval.
     * @return {Interval}
     */
    static before(end, duration) {
        const dur = friendlyDuration(duration), dt = friendlyDateTime(end);
        return Interval.fromDateTimes(dt.minus(dur), dt);
    }
    /**
     * Create an Interval from an ISO 8601 string.
     * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
     * @param {string} text - the ISO string to parse
     * @param {Object} [opts] - options to pass {@link DateTime.fromISO} and optionally {@link Duration.fromISO}
     * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
     * @return {Interval}
     */
    static fromISO(text, opts) {
        const [s, e] = (text || '').split('/', 2);
        if (s && e) {
            const start = DateTime.fromISO(s, opts), end = DateTime.fromISO(e, opts);
            if (start.isValid && end.isValid) {
                return Interval.fromDateTimes(start, end);
            }
            if (start.isValid) {
                const dur = Duration.fromISO(e, opts);
                if (dur.isValid) {
                    return Interval.after(start, dur);
                }
            }
            else if (end.isValid) {
                const dur = Duration.fromISO(s, opts);
                if (dur.isValid) {
                    return Interval.before(end, dur);
                }
            }
        }
        return Interval.invalid('unparsable', `the input "${text}" can't be parsed as ISO 8601`);
    }
    /**
     * Check if an object is an Interval. Works across context boundaries
     * @param {object} o
     * @return {boolean}
     */
    static isInterval(o) {
        return (o && o.isLuxonInterval) || false;
    }
    /**
     * Merge an array of Intervals into a equivalent minimal set of Intervals.
     * Combines overlapping and adjacent Intervals.
     * @param {[Interval]} intervals
     * @return {[Interval]}
     */
    static merge(intervals) {
        const [found, final] = intervals
            .sort((a, b) => a.s - b.s)
            .reduce(([sofar, current], item) => {
            if (!current) {
                return [sofar, item];
            }
            else if (current.overlaps(item) || current.abutsStart(item)) {
                return [sofar, current.union(item)];
            }
            else {
                return [sofar.concat([current]), item];
            }
        }, [[], null]);
        if (final) {
            found.push(final);
        }
        return found;
    }
    /**
     * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
     * @param {[Interval]} intervals
     * @return {[Interval]}
     */
    static xor(intervals) {
        let start = null, currentCount = 0;
        const results = [], ends = intervals.map(i => [
            {
                time: i.s,
                type: 's',
            },
            {
                time: i.e,
                type: 'e',
            },
        ]), flattened = Array.prototype.concat(...ends), arr = flattened.sort((a, b) => a.time - b.time);
        for (const i of arr) {
            currentCount += i.type === 's' ? 1 : -1;
            if (currentCount === 1) {
                start = i.time;
            }
            else {
                if (start && +start !== +i.time) {
                    results.push(Interval.fromDateTimes(start, i.time));
                }
                start = null;
            }
        }
        return Interval.merge(results);
    }
    /**
     * Returns the length of the Interval in the specified unit.
     * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
     * @return {number}
     */
    length(unit = 'milliseconds') {
        return this.isValid ? this.toDuration(...[unit]).get(unit) : NaN;
    }
    /**
     * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
     * Unlike {@link length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
     * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
     * @param {string} [unit='milliseconds'] - the unit of time to count.
     * @return {number}
     */
    count(unit = 'milliseconds') {
        if (!this.isValid)
            return NaN;
        const start = this.start.startOf(unit), end = this.end.startOf(unit);
        return Math.floor(end.diff(start, unit).get(unit)) + 1;
    }
    /**
     * Returns whether this Interval's start and end are both in the same unit of time
     * @param {string} unit - the unit of time to check sameness on
     * @return {boolean}
     */
    hasSame(unit) {
        return this.isValid ? this.e.minus(1).hasSame(this.s, unit) : false;
    }
    /**
     * Return whether this Interval has the same start and end DateTimes.
     * @return {boolean}
     */
    isEmpty() {
        return this.s.valueOf() === this.e.valueOf();
    }
    /**
     * Return whether this Interval's start is after the specified DateTime.
     * @param {DateTime} dateTime
     * @return {boolean}
     */
    isAfter(dateTime) {
        if (!this.isValid)
            return false;
        return this.s > dateTime;
    }
    /**
     * Return whether this Interval's end is before the specified DateTime.
     * @param {DateTime} dateTime
     * @return {boolean}
     */
    isBefore(dateTime) {
        if (!this.isValid)
            return false;
        return this.e <= dateTime;
    }
    /**
     * Return whether this Interval contains the specified DateTime.
     * @param {DateTime} dateTime
     * @return {boolean}
     */
    contains(dateTime) {
        if (!this.isValid)
            return false;
        return this.s <= dateTime && this.e > dateTime;
    }
    /**
     * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
     * @param {Object} values - the values to set
     * @param {DateTime} values.start - the starting DateTime
     * @param {DateTime} values.end - the ending DateTime
     * @return {Interval}
     */
    set({ start, end } = {}) {
        if (!this.isValid)
            return this;
        return Interval.fromDateTimes(start || this.s, end || this.e);
    }
    /**
     * Split this Interval at each of the specified DateTimes
     * @param {...[DateTime]} dateTimes - the unit of time to count.
     * @return {[Interval]}
     */
    splitAt(...dateTimes) {
        if (!this.isValid)
            return [];
        const sorted = dateTimes
            .map(friendlyDateTime)
            .filter(d => this.contains(d))
            .sort(), results = [];
        let { s } = this, i = 0;
        while (s < this.e) {
            const added = sorted[i] || this.e, next = +added > +this.e ? this.e : added;
            results.push(Interval.fromDateTimes(s, next));
            s = next;
            i += 1;
        }
        return results;
    }
    /**
     * Split this Interval into smaller Intervals, each of the specified length.
     * Left over time is grouped into a smaller interval
     * @param {Duration|Object|number} duration - The length of each resulting interval.
     * @return {[Interval]}
     */
    splitBy(duration) {
        const dur = friendlyDuration(duration);
        if (!this.isValid || !dur.isValid || dur.as('milliseconds') === 0) {
            return [];
        }
        let { s } = this, added, next;
        const results = [];
        while (s < this.e) {
            added = s.plus(dur);
            next = +added > +this.e ? this.e : added;
            results.push(Interval.fromDateTimes(s, next));
            s = next;
        }
        return results;
    }
    /**
     * Split this Interval into the specified number of smaller intervals.
     * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
     * @return {[Interval]}
     */
    divideEqually(numberOfParts) {
        if (!this.isValid)
            return [];
        return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
    }
    /**
     * Return whether this Interval overlaps with the specified Interval
     * @param {Interval} other
     * @return {boolean}
     */
    overlaps(other) {
        return this.e > other.s && this.s < other.e;
    }
    /**
     * Return whether this Interval's end is adjacent to the specified Interval's start.
     * @param {Interval} other
     * @return {boolean}
     */
    abutsStart(other) {
        if (!this.isValid)
            return false;
        return +this.e === +other.s;
    }
    /**
     * Return whether this Interval's start is adjacent to the specified Interval's end.
     * @param {Interval} other
     * @return {boolean}
     */
    abutsEnd(other) {
        if (!this.isValid)
            return false;
        return +other.e === +this.s;
    }
    /**
     * Return whether this Interval engulfs the start and end of the specified Interval.
     * @param {Interval} other
     * @return {boolean}
     */
    engulfs(other) {
        if (!this.isValid)
            return false;
        return this.s <= other.s && this.e >= other.e;
    }
    /**
     * Return whether this Interval has the same start and end as the specified Interval.
     * @param {Interval} other
     * @return {boolean}
     */
    equals(other) {
        if (!this.isValid || !other.isValid) {
            return false;
        }
        return this.s.equals(other.s) && this.e.equals(other.e);
    }
    /**
     * Return an Interval representing the intersection of this Interval and the specified Interval.
     * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
     * Returns null if the intersection is empty, meaning, the intervals don't intersect.
     * @param {Interval} other
     * @return {Interval}
     */
    intersection(other) {
        if (!this.isValid)
            return this;
        const s = this.s > other.s ? this.s : other.s, e = this.e < other.e ? this.e : other.e;
        if (s > e) {
            return null;
        }
        else {
            return Interval.fromDateTimes(s, e);
        }
    }
    /**
     * Return an Interval representing the union of this Interval and the specified Interval.
     * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
     * @param {Interval} other
     * @return {Interval}
     */
    union(other) {
        if (!this.isValid)
            return this;
        const s = this.s < other.s ? this.s : other.s, e = this.e > other.e ? this.e : other.e;
        return Interval.fromDateTimes(s, e);
    }
    /**
     * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
     * @param {...Interval} intervals
     * @return {[Interval]}
     */
    difference(...intervals) {
        return Interval.xor([this].concat(intervals))
            .map(i => this.intersection(i))
            .filter(i => i && !i.isEmpty());
    }
    /**
     * Returns a string representation of this Interval appropriate for debugging.
     * @return {string}
     */
    toString() {
        if (!this.isValid)
            return INVALID$1;
        return `[${this.s.toISO()} – ${this.e.toISO()})`;
    }
    /**
     * Returns an ISO 8601-compliant string representation of this Interval.
     * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
     * @param {Object} opts - The same options as {@link DateTime.toISO}
     * @return {string}
     */
    toISO(opts) {
        if (!this.isValid)
            return INVALID$1;
        return `${this.s.toISO(opts)}/${this.e.toISO(opts)}`;
    }
    /**
     * Returns an ISO 8601-compliant string representation of date of this Interval.
     * The time components are ignored.
     * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
     * @return {string}
     */
    toISODate() {
        if (!this.isValid)
            return INVALID$1;
        return `${this.s.toISODate()}/${this.e.toISODate()}`;
    }
    /**
     * Returns an ISO 8601-compliant string representation of time of this Interval.
     * The date components are ignored.
     * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
     * @param {Object} opts - The same options as {@link DateTime.toISO}
     * @return {string}
     */
    toISOTime(opts) {
        if (!this.isValid)
            return INVALID$1;
        return `${this.s.toISOTime(opts)}/${this.e.toISOTime(opts)}`;
    }
    /**
     * Returns a string representation of this Interval formatted according to the specified format string.
     * @param {string} dateFormat - the format string. This string formats the start and end time. See {@link DateTime.toFormat} for details.
     * @param {Object} opts - options
     * @param {string} [opts.separator =  ' – '] - a separator to place between the start and end representations
     * @return {string}
     */
    toFormat(dateFormat, { separator = ' – ' } = {}) {
        if (!this.isValid)
            return INVALID$1;
        return `${this.s.toFormat(dateFormat)}${separator}${this.e.toFormat(dateFormat)}`;
    }
    /**
     * Return a Duration representing the time spanned by this interval.
     * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
     * @param {Object} opts - options that affect the creation of the Duration
     * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
     * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
     * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
     * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
     * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
     * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
     * @return {Duration}
     */
    toDuration(unit, opts) {
        if (!this.isValid) {
            return Duration.invalid(this.invalidReason);
        }
        return this.e.diff(this.s, unit, opts);
    }
    /**
     * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
     * @param {function} mapFn
     * @return {Interval}
     * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
     * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
     */
    mapEndpoints(mapFn) {
        return Interval.fromDateTimes(mapFn(this.s), mapFn(this.e));
    }
}
/**
 * The Info class contains static methods for retrieving general time and date related data. For example, it has methods for finding out if a time zone has a DST, for listing the months in any supported locale, and for discovering which of Luxon features are available in the current environment.
 */
class Info {
    /**
     * Return whether the specified zone contains a DST.
     * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
     * @return {boolean}
     */
    static hasDST(zone = Settings.defaultZone) {
        const proto = DateTime.local().setZone(zone).set({
            month: 12,
        });
        return (!zone.universal &&
            proto.offset !==
                proto.set({
                    month: 6,
                }).offset);
    }
    /**
     * Return whether the specified zone is a valid IANA specifier.
     * @param {string} zone - Zone to check
     * @return {boolean}
     */
    static isValidIANAZone(zone) {
        return IANAZone.isValidSpecifier(zone) && IANAZone.isValidZone(zone);
    }
    /**
     * Converts the input into a {@link Zone} instance.
     *
     * * If `input` is already a Zone instance, it is returned unchanged.
     * * If `input` is a string containing a valid time zone name, a Zone instance
     *   with that name is returned.
     * * If `input` is a string that doesn't refer to a known time zone, a Zone
     *   instance with {@link Zone.isValid} == false is returned.
     * * If `input is a number, a Zone instance with the specified fixed offset
     *   in minutes is returned.
     * * If `input` is `null` or `undefined`, the default zone is returned.
     * @param {string|Zone|number} [input] - the value to be converted
     * @return {Zone}
     */
    static normalizeZone(input) {
        return normalizeZone(input, Settings.defaultZone);
    }
    /**
     * Return an array of standalone month names.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @param {string} [opts.numberingSystem=null] - the numbering system
     * @param {string} [opts.outputCalendar='gregory'] - the calendar
     * @example Info.months()[0] //=> 'January'
     * @example Info.months('short')[0] //=> 'Jan'
     * @example Info.months('numeric')[0] //=> '1'
     * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
     * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
     * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
     * @return {[string]}
     */
    static months(length = 'long', { locale = null, numberingSystem = null, outputCalendar = 'gregory' } = {}) {
        return Locale.create(locale, numberingSystem, outputCalendar).months(length);
    }
    /**
     * Return an array of format month names.
     * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
     * changes the string.
     * See {@link months}
     * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @param {string} [opts.numberingSystem=null] - the numbering system
     * @param {string} [opts.outputCalendar='gregory'] - the calendar
     * @return {[string]}
     */
    static monthsFormat(length = 'long', { locale = null, numberingSystem = null, outputCalendar = 'gregory' } = {}) {
        return Locale.create(locale, numberingSystem, outputCalendar).months(length, true);
    }
    /**
     * Return an array of standalone week names.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @param {string} [opts.numberingSystem=null] - the numbering system
     * @example Info.weekdays()[0] //=> 'Monday'
     * @example Info.weekdays('short')[0] //=> 'Mon'
     * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
     * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
     * @return {[string]}
     */
    static weekdays(length = 'long', { locale = null, numberingSystem = null } = {}) {
        return Locale.create(locale, numberingSystem, null).weekdays(length);
    }
    /**
     * Return an array of format week names.
     * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
     * changes the string.
     * See {@link weekdays}
     * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
     * @param {Object} opts - options
     * @param {string} [opts.locale=null] - the locale code
     * @param {string} [opts.numberingSystem=null] - the numbering system
     * @return {[string]}
     */
    static weekdaysFormat(length = 'long', { locale = null, numberingSystem = null } = {}) {
        return Locale.create(locale, numberingSystem, null).weekdays(length, true);
    }
    /**
     * Return an array of meridiems.
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @example Info.meridiems() //=> [ 'AM', 'PM' ]
     * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
     * @return {[string]}
     */
    static meridiems({ locale = null } = {}) {
        return Locale.create(locale).meridiems();
    }
    /**
     * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
     * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @example Info.eras() //=> [ 'BC', 'AD' ]
     * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
     * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
     * @return {[string]}
     */
    static eras(length = 'short', { locale = null } = {}) {
        return Locale.create(locale, null, 'gregory').eras(length);
    }
    /**
     * Return the set of available features in this environment.
     * Some features of Luxon are not available in all environments. For example, on older browsers, timezone support is not available. Use this function to figure out if that's the case.
     * Keys:
     * * `zones`: whether this environment supports IANA timezones
     * * `intlTokens`: whether this environment supports internationalized token-based formatting/parsing
     * * `intl`: whether this environment supports general internationalization
     * * `relative`: whether this environment supports relative time formatting
     * @example Info.features() //=> { intl: true, intlTokens: false, zones: true, relative: false }
     * @return {Object}
     */
    static features() {
        let intl = false, intlTokens = false, zones = false, relative = false;
        if (hasIntl()) {
            intl = true;
            intlTokens = hasFormatToParts();
            relative = hasRelative();
            try {
                zones =
                    new Intl.DateTimeFormat('en', {
                        timeZone: 'America/New_York',
                    }).resolvedOptions().timeZone === 'America/New_York';
            }
            catch (e) {
                zones = false;
            }
        }
        return {
            intl,
            intlTokens,
            zones,
            relative,
        };
    }
}
function dayDiff(earlier, later) {
    const utcDayStart = dt => dt
        .toUTC(0, {
        keepLocalTime: true,
    })
        .startOf('day')
        .valueOf(), ms = utcDayStart(later) - utcDayStart(earlier);
    return Math.floor(Duration.fromMillis(ms).as('days'));
}
function highOrderDiffs(cursor, later, units) {
    const differs = [
        ['years', (a, b) => b.year - a.year],
        ['months', (a, b) => b.month - a.month + (b.year - a.year) * 12],
        [
            'weeks',
            (a, b) => {
                const days = dayDiff(a, b);
                return (days - (days % 7)) / 7;
            },
        ],
        ['days', dayDiff],
    ];
    const results = {};
    let lowestOrder, highWater;
    for (const [unit, differ] of differs) {
        if (units.indexOf(unit) >= 0) {
            lowestOrder = unit;
            let delta = differ(cursor, later);
            highWater = cursor.plus({
                [unit]: delta,
            });
            if (highWater > later) {
                cursor = cursor.plus({
                    [unit]: delta - 1,
                });
                delta -= 1;
            }
            else {
                cursor = highWater;
            }
            results[unit] = delta;
        }
    }
    return [cursor, results, highWater, lowestOrder];
}
function diff(earlier, later, units, opts) {
    let [cursor, results, highWater, lowestOrder] = highOrderDiffs(earlier, later, units);
    const remainingMillis = later - cursor;
    const lowerOrderUnits = units.filter(u => ['hours', 'minutes', 'seconds', 'milliseconds'].indexOf(u) >= 0);
    if (lowerOrderUnits.length === 0) {
        if (highWater < later) {
            highWater = cursor.plus({
                [lowestOrder]: 1,
            });
        }
        if (highWater !== cursor) {
            results[lowestOrder] =
                (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
        }
    }
    const duration = Duration.fromObject(Object.assign(results, opts));
    if (lowerOrderUnits.length > 0) {
        return Duration.fromMillis(remainingMillis, opts)
            .shiftTo(...lowerOrderUnits)
            .plus(duration);
    }
    else {
        return duration;
    }
}
const numberingSystems = {
    arab: '[\u0660-\u0669]',
    arabext: '[\u06F0-\u06F9]',
    bali: '[\u1B50-\u1B59]',
    beng: '[\u09E6-\u09EF]',
    deva: '[\u0966-\u096F]',
    fullwide: '[\uFF10-\uFF19]',
    gujr: '[\u0AE6-\u0AEF]',
    hanidec: '[〇|一|二|三|四|五|六|七|八|九]',
    khmr: '[\u17E0-\u17E9]',
    knda: '[\u0CE6-\u0CEF]',
    laoo: '[\u0ED0-\u0ED9]',
    limb: '[\u1946-\u194F]',
    mlym: '[\u0D66-\u0D6F]',
    mong: '[\u1810-\u1819]',
    mymr: '[\u1040-\u1049]',
    orya: '[\u0B66-\u0B6F]',
    tamldec: '[\u0BE6-\u0BEF]',
    telu: '[\u0C66-\u0C6F]',
    thai: '[\u0E50-\u0E59]',
    tibt: '[\u0F20-\u0F29]',
    latn: '\\d',
};
const numberingSystemsUTF16 = {
    arab: [1632, 1641],
    arabext: [1776, 1785],
    bali: [6992, 7001],
    beng: [2534, 2543],
    deva: [2406, 2415],
    fullwide: [65296, 65303],
    gujr: [2790, 2799],
    khmr: [6112, 6121],
    knda: [3302, 3311],
    laoo: [3792, 3801],
    limb: [6470, 6479],
    mlym: [3430, 3439],
    mong: [6160, 6169],
    mymr: [4160, 4169],
    orya: [2918, 2927],
    tamldec: [3046, 3055],
    telu: [3174, 3183],
    thai: [3664, 3673],
    tibt: [3872, 3881],
}; // eslint-disable-next-line
const hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, '').split('');
function parseDigits(str) {
    let value = parseInt(str, 10);
    if (isNaN(value)) {
        value = '';
        for (let i = 0; i < str.length; i++) {
            const code = str.charCodeAt(i);
            if (str[i].search(numberingSystems.hanidec) !== -1) {
                value += hanidecChars.indexOf(str[i]);
            }
            else {
                for (const key in numberingSystemsUTF16) {
                    const [min, max] = numberingSystemsUTF16[key];
                    if (code >= min && code <= max) {
                        value += code - min;
                    }
                }
            }
        }
        return parseInt(value, 10);
    }
    else {
        return value;
    }
}
function digitRegex({ numberingSystem }, append = '') {
    return new RegExp(`${numberingSystems[numberingSystem || 'latn']}${append}`);
}
const MISSING_FTP = 'missing Intl.DateTimeFormat.formatToParts support';
function intUnit(regex, post = i => i) {
    return {
        regex,
        deser: ([s]) => post(parseDigits(s)),
    };
}
function fixListRegex(s) {
    // make dots optional and also make them literal
    return s.replace(/\./, '\\.?');
}
function stripInsensitivities(s) {
    return s.replace(/\./, '').toLowerCase();
}
function oneOf(strings, startIndex) {
    if (strings === null) {
        return null;
    }
    else {
        return {
            regex: RegExp(strings.map(fixListRegex).join('|')),
            deser: ([s]) => strings.findIndex(i => stripInsensitivities(s) === stripInsensitivities(i)) + startIndex,
        };
    }
}
function offset(regex, groups) {
    return {
        regex,
        deser: ([, h, m]) => signedOffset(h, m),
        groups,
    };
}
function simple(regex) {
    return {
        regex,
        deser: ([s]) => s,
    };
}
function escapeToken(value) {
    // eslint-disable-next-line no-useless-escape
    return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
}
function unitForToken(token, loc) {
    const one = digitRegex(loc), two = digitRegex(loc, '{2}'), three = digitRegex(loc, '{3}'), four = digitRegex(loc, '{4}'), six = digitRegex(loc, '{6}'), oneOrTwo = digitRegex(loc, '{1,2}'), oneToThree = digitRegex(loc, '{1,3}'), oneToSix = digitRegex(loc, '{1,6}'), oneToNine = digitRegex(loc, '{1,9}'), twoToFour = digitRegex(loc, '{2,4}'), fourToSix = digitRegex(loc, '{4,6}'), literal = t => ({
        regex: RegExp(escapeToken(t.val)),
        deser: ([s]) => s,
        literal: true,
    }), unitate = t => {
        if (token.literal) {
            return literal(t);
        }
        switch (t.val) {
            // era
            case 'G':
                return oneOf(loc.eras('short', false), 0);
            case 'GG':
                return oneOf(loc.eras('long', false), 0);
            // years
            case 'y':
                return intUnit(oneToSix);
            case 'yy':
                return intUnit(twoToFour, untruncateYear);
            case 'yyyy':
                return intUnit(four);
            case 'yyyyy':
                return intUnit(fourToSix);
            case 'yyyyyy':
                return intUnit(six);
            // months
            case 'M':
                return intUnit(oneOrTwo);
            case 'MM':
                return intUnit(two);
            case 'MMM':
                return oneOf(loc.months('short', true, false), 1);
            case 'MMMM':
                return oneOf(loc.months('long', true, false), 1);
            case 'L':
                return intUnit(oneOrTwo);
            case 'LL':
                return intUnit(two);
            case 'LLL':
                return oneOf(loc.months('short', false, false), 1);
            case 'LLLL':
                return oneOf(loc.months('long', false, false), 1);
            // dates
            case 'd':
                return intUnit(oneOrTwo);
            case 'dd':
                return intUnit(two);
            // ordinals
            case 'o':
                return intUnit(oneToThree);
            case 'ooo':
                return intUnit(three);
            // time
            case 'HH':
                return intUnit(two);
            case 'H':
                return intUnit(oneOrTwo);
            case 'hh':
                return intUnit(two);
            case 'h':
                return intUnit(oneOrTwo);
            case 'mm':
                return intUnit(two);
            case 'm':
                return intUnit(oneOrTwo);
            case 'q':
                return intUnit(oneOrTwo);
            case 'qq':
                return intUnit(two);
            case 's':
                return intUnit(oneOrTwo);
            case 'ss':
                return intUnit(two);
            case 'S':
                return intUnit(oneToThree);
            case 'SSS':
                return intUnit(three);
            case 'u':
                return simple(oneToNine);
            // meridiem
            case 'a':
                return oneOf(loc.meridiems(), 0);
            // weekYear (k)
            case 'kkkk':
                return intUnit(four);
            case 'kk':
                return intUnit(twoToFour, untruncateYear);
            // weekNumber (W)
            case 'W':
                return intUnit(oneOrTwo);
            case 'WW':
                return intUnit(two);
            // weekdays
            case 'E':
            case 'c':
                return intUnit(one);
            case 'EEE':
                return oneOf(loc.weekdays('short', false, false), 1);
            case 'EEEE':
                return oneOf(loc.weekdays('long', false, false), 1);
            case 'ccc':
                return oneOf(loc.weekdays('short', true, false), 1);
            case 'cccc':
                return oneOf(loc.weekdays('long', true, false), 1);
            // offset/zone
            case 'Z':
            case 'ZZ':
                return offset(new RegExp(`([+-]${oneOrTwo.source})(?::(${two.source}))?`), 2);
            case 'ZZZ':
                return offset(new RegExp(`([+-]${oneOrTwo.source})(${two.source})?`), 2);
            // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
            // because we don't have any way to figure out what they are
            case 'z':
                return simple(/[a-z_+-/]{1,256}?/i);
            default:
                return literal(t);
        }
    };
    const unit = unitate(token) || {
        invalidReason: MISSING_FTP,
    };
    unit.token = token;
    return unit;
}
const partTypeStyleToTokenVal = {
    year: {
        '2-digit': 'yy',
        numeric: 'yyyyy',
    },
    month: {
        numeric: 'M',
        '2-digit': 'MM',
        short: 'MMM',
        long: 'MMMM',
    },
    day: {
        numeric: 'd',
        '2-digit': 'dd',
    },
    weekday: {
        short: 'EEE',
        long: 'EEEE',
    },
    dayperiod: 'a',
    dayPeriod: 'a',
    hour: {
        numeric: 'h',
        '2-digit': 'hh',
    },
    minute: {
        numeric: 'm',
        '2-digit': 'mm',
    },
    second: {
        numeric: 's',
        '2-digit': 'ss',
    },
};
function tokenForPart(part, locale, formatOpts) {
    const { type, value } = part;
    if (type === 'literal') {
        return {
            literal: true,
            val: value,
        };
    }
    const style = formatOpts[type];
    let val = partTypeStyleToTokenVal[type];
    if (typeof val === 'object') {
        val = val[style];
    }
    if (val) {
        return {
            literal: false,
            val,
        };
    }
    return undefined;
}
function buildRegex(units) {
    const re = units.map(u => u.regex).reduce((f, r) => `${f}(${r.source})`, '');
    return [`^${re}$`, units];
}
function match(input, regex, handlers) {
    const matches = input.match(regex);
    if (matches) {
        const all = {};
        let matchIndex = 1;
        for (const i in handlers) {
            if (hasOwnProperty(handlers, i)) {
                const h = handlers[i], groups = h.groups ? h.groups + 1 : 1;
                if (!h.literal && h.token) {
                    all[h.token.val[0]] = h.deser(matches.slice(matchIndex, matchIndex + groups));
                }
                matchIndex += groups;
            }
        }
        return [matches, all];
    }
    else {
        return [matches, {}];
    }
}
function dateTimeFromMatches(matches) {
    const toField = token => {
        switch (token) {
            case 'S':
                return 'millisecond';
            case 's':
                return 'second';
            case 'm':
                return 'minute';
            case 'h':
            case 'H':
                return 'hour';
            case 'd':
                return 'day';
            case 'o':
                return 'ordinal';
            case 'L':
            case 'M':
                return 'month';
            case 'y':
                return 'year';
            case 'E':
            case 'c':
                return 'weekday';
            case 'W':
                return 'weekNumber';
            case 'k':
                return 'weekYear';
            case 'q':
                return 'quarter';
            default:
                return null;
        }
    };
    let zone;
    if (!isUndefined(matches.Z)) {
        zone = new FixedOffsetZone(matches.Z);
    }
    else if (!isUndefined(matches.z)) {
        zone = IANAZone.create(matches.z);
    }
    else {
        zone = null;
    }
    if (!isUndefined(matches.q)) {
        matches.M = (matches.q - 1) * 3 + 1;
    }
    if (!isUndefined(matches.h)) {
        if (matches.h < 12 && matches.a === 1) {
            matches.h += 12;
        }
        else if (matches.h === 12 && matches.a === 0) {
            matches.h = 0;
        }
    }
    if (matches.G === 0 && matches.y) {
        matches.y = -matches.y;
    }
    if (!isUndefined(matches.u)) {
        matches.S = parseMillis(matches.u);
    }
    const vals = Object.keys(matches).reduce((r, k) => {
        const f = toField(k);
        if (f) {
            r[f] = matches[k];
        }
        return r;
    }, {});
    return [vals, zone];
}
let dummyDateTimeCache = null;
function getDummyDateTime() {
    if (!dummyDateTimeCache) {
        dummyDateTimeCache = DateTime.fromMillis(1555555555555);
    }
    return dummyDateTimeCache;
}
function maybeExpandMacroToken(token, locale) {
    if (token.literal) {
        return token;
    }
    const formatOpts = Formatter.macroTokenToFormatOpts(token.val);
    if (!formatOpts) {
        return token;
    }
    const formatter = Formatter.create(locale, formatOpts);
    const parts = formatter.formatDateTimeParts(getDummyDateTime());
    const tokens = parts.map(p => tokenForPart(p, locale, formatOpts));
    if (tokens.includes(undefined)) {
        return token;
    }
    return tokens;
}
function expandMacroTokens(tokens, locale) {
    return Array.prototype.concat(...tokens.map(t => maybeExpandMacroToken(t, locale)));
}
/**
 * @private
 */
function explainFromTokens(locale, input, format) {
    const tokens = expandMacroTokens(Formatter.parseFormat(format), locale), units = tokens.map(t => unitForToken(t, locale)), disqualifyingUnit = units.find(t => t.invalidReason);
    if (disqualifyingUnit) {
        return {
            input,
            tokens,
            invalidReason: disqualifyingUnit.invalidReason,
        };
    }
    else {
        const [regexString, handlers] = buildRegex(units), regex = RegExp(regexString, 'i'), [rawMatches, matches] = match(input, regex, handlers), [result, zone] = matches ? dateTimeFromMatches(matches) : [null, null];
        if (hasOwnProperty(matches, 'a') && hasOwnProperty(matches, 'H')) {
            throw new ConflictingSpecificationError("Can't include meridiem when specifying 24-hour format");
        }
        return {
            input,
            tokens,
            regex,
            rawMatches,
            matches,
            result,
            zone,
        };
    }
}
function parseFromTokens(locale, input, format) {
    const { result, zone, invalidReason } = explainFromTokens(locale, input, format);
    return [result, zone, invalidReason];
}
const nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function unitOutOfRange(unit, value) {
    return new Invalid('unit out of range', `you specified ${value} (of type ${typeof value}) as a ${unit}, which is invalid`);
}
function dayOfWeek(year, month, day) {
    const js = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
    return js === 0 ? 7 : js;
}
function computeOrdinal(year, month, day) {
    return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
}
function uncomputeOrdinal(year, ordinal) {
    const table = isLeapYear(year) ? leapLadder : nonLeapLadder, month0 = table.findIndex(i => i < ordinal), day = ordinal - table[month0];
    return {
        month: month0 + 1,
        day,
    };
}
/**
 * @private
 */
function gregorianToWeek(gregObj) {
    const { year, month, day } = gregObj, ordinal = computeOrdinal(year, month, day), weekday = dayOfWeek(year, month, day);
    let weekNumber = Math.floor((ordinal - weekday + 10) / 7), weekYear;
    if (weekNumber < 1) {
        weekYear = year - 1;
        weekNumber = weeksInWeekYear(weekYear);
    }
    else if (weekNumber > weeksInWeekYear(year)) {
        weekYear = year + 1;
        weekNumber = 1;
    }
    else {
        weekYear = year;
    }
    return Object.assign({
        weekYear,
        weekNumber,
        weekday,
    }, timeObject(gregObj));
}
function weekToGregorian(weekData) {
    const { weekYear, weekNumber, weekday } = weekData, weekdayOfJan4 = dayOfWeek(weekYear, 1, 4), yearInDays = daysInYear(weekYear);
    let ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 3, year;
    if (ordinal < 1) {
        year = weekYear - 1;
        ordinal += daysInYear(year);
    }
    else if (ordinal > yearInDays) {
        year = weekYear + 1;
        ordinal -= daysInYear(weekYear);
    }
    else {
        year = weekYear;
    }
    const { month, day } = uncomputeOrdinal(year, ordinal);
    return Object.assign({
        year,
        month,
        day,
    }, timeObject(weekData));
}
function gregorianToOrdinal(gregData) {
    const { year, month, day } = gregData, ordinal = computeOrdinal(year, month, day);
    return Object.assign({
        year,
        ordinal,
    }, timeObject(gregData));
}
function ordinalToGregorian(ordinalData) {
    const { year, ordinal } = ordinalData, { month, day } = uncomputeOrdinal(year, ordinal);
    return Object.assign({
        year,
        month,
        day,
    }, timeObject(ordinalData));
}
function hasInvalidWeekData(obj) {
    const validYear = isInteger(obj.weekYear), validWeek = integerBetween(obj.weekNumber, 1, weeksInWeekYear(obj.weekYear)), validWeekday = integerBetween(obj.weekday, 1, 7);
    if (!validYear) {
        return unitOutOfRange('weekYear', obj.weekYear);
    }
    else if (!validWeek) {
        return unitOutOfRange('week', obj.week);
    }
    else if (!validWeekday) {
        return unitOutOfRange('weekday', obj.weekday);
    }
    else
        return false;
}
function hasInvalidOrdinalData(obj) {
    const validYear = isInteger(obj.year), validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));
    if (!validYear) {
        return unitOutOfRange('year', obj.year);
    }
    else if (!validOrdinal) {
        return unitOutOfRange('ordinal', obj.ordinal);
    }
    else
        return false;
}
function hasInvalidGregorianData(obj) {
    const validYear = isInteger(obj.year), validMonth = integerBetween(obj.month, 1, 12), validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));
    if (!validYear) {
        return unitOutOfRange('year', obj.year);
    }
    else if (!validMonth) {
        return unitOutOfRange('month', obj.month);
    }
    else if (!validDay) {
        return unitOutOfRange('day', obj.day);
    }
    else
        return false;
}
function hasInvalidTimeData(obj) {
    const { hour, minute, second, millisecond } = obj;
    const validHour = integerBetween(hour, 0, 23) ||
        (hour === 24 && minute === 0 && second === 0 && millisecond === 0), validMinute = integerBetween(minute, 0, 59), validSecond = integerBetween(second, 0, 59), validMillisecond = integerBetween(millisecond, 0, 999);
    if (!validHour) {
        return unitOutOfRange('hour', hour);
    }
    else if (!validMinute) {
        return unitOutOfRange('minute', minute);
    }
    else if (!validSecond) {
        return unitOutOfRange('second', second);
    }
    else if (!validMillisecond) {
        return unitOutOfRange('millisecond', millisecond);
    }
    else
        return false;
}
const INVALID$2 = 'Invalid DateTime';
const MAX_DATE = 8.64e15;
function unsupportedZone(zone) {
    return new Invalid('unsupported zone', `the zone "${zone.name}" is not supported`);
} // we cache week data on the DT object and this intermediates the cache
function possiblyCachedWeekData(dt) {
    if (dt.weekData === null) {
        dt.weekData = gregorianToWeek(dt.c);
    }
    return dt.weekData;
} // clone really means, "make a new object with these modifications". all "setters" really use this
// to create a new object while only changing some of the properties
function clone$1(inst, alts) {
    const current = {
        ts: inst.ts,
        zone: inst.zone,
        c: inst.c,
        o: inst.o,
        loc: inst.loc,
        invalid: inst.invalid,
    };
    return new DateTime(Object.assign({}, current, alts, {
        old: current,
    }));
} // find the right offset a given local time. The o input is our guess, which determines which
// offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)
function fixOffset(localTS, o, tz) {
    // Our UTC time is just a guess because our offset is just a guess
    let utcGuess = localTS - o * 60 * 1000; // Test whether the zone matches the offset for this ts
    const o2 = tz.offset(utcGuess); // If so, offset didn't change and we're done
    if (o === o2) {
        return [utcGuess, o];
    } // If not, change the ts by the difference in the offset
    utcGuess -= (o2 - o) * 60 * 1000; // If that gives us the local time we want, we're done
    const o3 = tz.offset(utcGuess);
    if (o2 === o3) {
        return [utcGuess, o2];
    } // If it's different, we're in a hole time. The offset has changed, but the we don't adjust the time
    return [localTS - Math.min(o2, o3) * 60 * 1000, Math.max(o2, o3)];
} // convert an epoch timestamp into a calendar object with the given offset
function tsToObj(ts, offset) {
    ts += offset * 60 * 1000;
    const d = new Date(ts);
    return {
        year: d.getUTCFullYear(),
        month: d.getUTCMonth() + 1,
        day: d.getUTCDate(),
        hour: d.getUTCHours(),
        minute: d.getUTCMinutes(),
        second: d.getUTCSeconds(),
        millisecond: d.getUTCMilliseconds(),
    };
} // convert a calendar object to a epoch timestamp
function objToTS(obj, offset, zone) {
    return fixOffset(objToLocalTS(obj), offset, zone);
} // create a new DT instance by adding a duration, adjusting for DSTs
function adjustTime(inst, dur) {
    const keys = Object.keys(dur.values);
    if (keys.indexOf('milliseconds') === -1) {
        keys.push('milliseconds');
    }
    dur = dur.shiftTo(...keys);
    const oPre = inst.o, year = inst.c.year + dur.years, month = inst.c.month + dur.months + dur.quarters * 3, c = Object.assign({}, inst.c, {
        year,
        month,
        day: Math.min(inst.c.day, daysInMonth(year, month)) +
            dur.days +
            dur.weeks * 7,
    }), millisToAdd = Duration.fromObject({
        hours: dur.hours,
        minutes: dur.minutes,
        seconds: dur.seconds,
        milliseconds: dur.milliseconds,
    }).as('milliseconds'), localTS = objToLocalTS(c);
    let [ts, o] = fixOffset(localTS, oPre, inst.zone);
    if (millisToAdd !== 0) {
        ts += millisToAdd; // that could have changed the offset by going over a DST, but we want to keep the ts the same
        o = inst.zone.offset(ts);
    }
    return {
        ts,
        o,
    };
} // helper useful in turning the results of parsing into real dates
// by handling the zone options
function parseDataToDateTime(parsed, parsedZone, opts, format, text) {
    const { setZone, zone } = opts;
    if (parsed && Object.keys(parsed).length !== 0) {
        const interpretationZone = parsedZone || zone, inst = DateTime.fromObject(Object.assign(parsed, opts, {
            zone: interpretationZone,
            // setZone is a valid option in the calling methods, but not in fromObject
            setZone: undefined,
        }));
        return setZone ? inst : inst.setZone(zone);
    }
    else {
        return DateTime.invalid(new Invalid('unparsable', `the input "${text}" can't be parsed as ${format}`));
    }
} // if you want to output a technical format (e.g. RFC 2822), this helper
// helps handle the details
function toTechFormat(dt, format, allowZ = true) {
    return dt.isValid
        ? Formatter.create(Locale.create('en-US'), {
            allowZ,
            forceSimple: true,
        }).formatDateTimeFromString(dt, format)
        : null;
} // technical time formats (e.g. the time part of ISO 8601), take some options
// and this commonizes their handling
function toTechTimeFormat(dt, { suppressSeconds = false, suppressMilliseconds = false, includeOffset, includeZone = false, spaceZone = false, format = 'extended', }) {
    let fmt = format === 'basic' ? 'HHmm' : 'HH:mm';
    if (!suppressSeconds || dt.second !== 0 || dt.millisecond !== 0) {
        fmt += format === 'basic' ? 'ss' : ':ss';
        if (!suppressMilliseconds || dt.millisecond !== 0) {
            fmt += '.SSS';
        }
    }
    if ((includeZone || includeOffset) && spaceZone) {
        fmt += ' ';
    }
    if (includeZone) {
        fmt += 'z';
    }
    else if (includeOffset) {
        fmt += format === 'basic' ? 'ZZZ' : 'ZZ';
    }
    return toTechFormat(dt, fmt);
} // defaults for unspecified units in the supported calendars
const defaultUnitValues = {
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
}, defaultWeekUnitValues = {
    weekNumber: 1,
    weekday: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
}, defaultOrdinalUnitValues = {
    ordinal: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
}; // Units in the supported calendars, sorted by bigness
const orderedUnits$1 = [
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
    'millisecond',
], orderedWeekUnits = [
    'weekYear',
    'weekNumber',
    'weekday',
    'hour',
    'minute',
    'second',
    'millisecond',
], orderedOrdinalUnits = [
    'year',
    'ordinal',
    'hour',
    'minute',
    'second',
    'millisecond',
]; // standardize case and plurality in units
function normalizeUnit(unit) {
    const normalized = {
        year: 'year',
        years: 'year',
        month: 'month',
        months: 'month',
        day: 'day',
        days: 'day',
        hour: 'hour',
        hours: 'hour',
        minute: 'minute',
        minutes: 'minute',
        quarter: 'quarter',
        quarters: 'quarter',
        second: 'second',
        seconds: 'second',
        millisecond: 'millisecond',
        milliseconds: 'millisecond',
        weekday: 'weekday',
        weekdays: 'weekday',
        weeknumber: 'weekNumber',
        weeksnumber: 'weekNumber',
        weeknumbers: 'weekNumber',
        weekyear: 'weekYear',
        weekyears: 'weekYear',
        ordinal: 'ordinal',
    }[unit.toLowerCase()];
    if (!normalized)
        throw new InvalidUnitError(unit);
    return normalized;
} // this is a dumbed down version of fromObject() that runs about 60% faster
// but doesn't do any validation, makes a bunch of assumptions about what units
// are present, and so on.
function quickDT(obj, zone) {
    // assume we have the higher-order units
    for (const u of orderedUnits$1) {
        if (isUndefined(obj[u])) {
            obj[u] = defaultUnitValues[u];
        }
    }
    const invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);
    if (invalid) {
        return DateTime.invalid(invalid);
    }
    const tsNow = Settings.now(), offsetProvis = zone.offset(tsNow), [ts, o] = objToTS(obj, offsetProvis, zone);
    return new DateTime({
        ts,
        zone,
        o,
    });
}
function diffRelative(start, end, opts) {
    const round = isUndefined(opts.round) ? true : opts.round, format = (c, unit) => {
        c = roundTo(c, round || opts.calendary ? 0 : 2, true);
        const formatter = end.loc.clone(opts).relFormatter(opts);
        return formatter.format(c, unit);
    }, differ = unit => {
        if (opts.calendary) {
            if (!end.hasSame(start, unit)) {
                return end.startOf(unit).diff(start.startOf(unit), unit).get(unit);
            }
            else
                return 0;
        }
        else {
            return end.diff(start, unit).get(unit);
        }
    };
    if (opts.unit) {
        return format(differ(opts.unit), opts.unit);
    }
    for (const unit of opts.units) {
        const count = differ(unit);
        if (Math.abs(count) >= 1) {
            return format(count, unit);
        }
    }
    return format(0, opts.units[opts.units.length - 1]);
}
/**
 * A DateTime is an immutable data structure representing a specific date and time and accompanying methods. It contains class and instance methods for creating, parsing, interrogating, transforming, and formatting them.
 *
 * A DateTime comprises of:
 * * A timestamp. Each DateTime instance refers to a specific millisecond of the Unix epoch.
 * * A time zone. Each instance is considered in the context of a specific zone (by default the local system's zone).
 * * Configuration properties that effect how output strings are formatted, such as `locale`, `numberingSystem`, and `outputCalendar`.
 *
 * Here is a brief overview of the most commonly used functionality it provides:
 *
 * * **Creation**: To create a DateTime from its components, use one of its factory class methods: {@link local}, {@link utc}, and (most flexibly) {@link fromObject}. To create one from a standard string format, use {@link fromISO}, {@link fromHTTP}, and {@link fromRFC2822}. To create one from a custom string format, use {@link fromFormat}. To create one from a native JS date, use {@link fromJSDate}.
 * * **Gregorian calendar and time**: To examine the Gregorian properties of a DateTime individually (i.e as opposed to collectively through {@link toObject}), use the {@link year}, {@link month},
 * {@link day}, {@link hour}, {@link minute}, {@link second}, {@link millisecond} accessors.
 * * **Week calendar**: For ISO week calendar attributes, see the {@link weekYear}, {@link weekNumber}, and {@link weekday} accessors.
 * * **Configuration** See the {@link locale} and {@link numberingSystem} accessors.
 * * **Transformation**: To transform the DateTime into other DateTimes, use {@link set}, {@link reconfigure}, {@link setZone}, {@link setLocale}, {@link plus}, {@link minus}, {@link endOf}, {@link startOf}, {@link toUTC}, and {@link toLocal}.
 * * **Output**: To convert the DateTime to other representations, use the {@link toRelative}, {@link toRelativeCalendar}, {@link toJSON}, {@link toISO}, {@link toHTTP}, {@link toObject}, {@link toRFC2822}, {@link toString}, {@link toLocaleString}, {@link toFormat}, {@link toMillis} and {@link toJSDate}.
 *
 * There's plenty others documented below. In addition, for more information on subtler topics like internationalization, time zones, alternative calendars, validity, and so on, see the external documentation.
 */
class DateTime {
    /**
     * @access private
     */
    constructor(config) {
        const zone = config.zone || Settings.defaultZone;
        let invalid = config.invalid ||
            (Number.isNaN(config.ts) ? new Invalid('invalid input') : null) ||
            (!zone.isValid ? unsupportedZone(zone) : null);
        /**
         * @access private
         */
        this.ts = isUndefined(config.ts) ? Settings.now() : config.ts;
        let c = null, o = null;
        if (!invalid) {
            const unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);
            if (unchanged) {
                [c, o] = [config.old.c, config.old.o];
            }
            else {
                const ot = zone.offset(this.ts);
                c = tsToObj(this.ts, ot);
                invalid = Number.isNaN(c.year) ? new Invalid('invalid input') : null;
                c = invalid ? null : c;
                o = invalid ? null : ot;
            }
        }
        /**
         * @access private
         */
        this._zone = zone;
        /**
         * @access private
         */
        this.loc = config.loc || Locale.create();
        /**
         * @access private
         */
        this.invalid = invalid;
        /**
         * @access private
         */
        this.weekData = null;
        /**
         * @access private
         */
        this.c = c;
        /**
         * @access private
         */
        this.o = o;
        /**
         * @access private
         */
        this.isLuxonDateTime = true;
    } // CONSTRUCT
    /**
     * {@link toLocaleString} format like 10/14/1983
     * @type {Object}
     */
    static get DATE_SHORT() {
        return DATE_SHORT;
    }
    /**
     * {@link toLocaleString} format like 'Oct 14, 1983'
     * @type {Object}
     */
    static get DATE_MED() {
        return DATE_MED;
    }
    /**
     * {@link toLocaleString} format like 'October 14, 1983'
     * @type {Object}
     */
    static get DATE_FULL() {
        return DATE_FULL;
    }
    /**
     * {@link toLocaleString} format like 'Tuesday, October 14, 1983'
     * @type {Object}
     */
    static get DATE_HUGE() {
        return DATE_HUGE;
    }
    /**
     * {@link toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get TIME_SIMPLE() {
        return TIME_SIMPLE;
    }
    /**
     * {@link toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get TIME_WITH_SECONDS() {
        return TIME_WITH_SECONDS;
    }
    /**
     * {@link toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get TIME_WITH_SHORT_OFFSET() {
        return TIME_WITH_SHORT_OFFSET;
    }
    /**
     * {@link toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get TIME_WITH_LONG_OFFSET() {
        return TIME_WITH_LONG_OFFSET;
    }
    /**
     * {@link toLocaleString} format like '09:30', always 24-hour.
     * @type {Object}
     */
    static get TIME_24_SIMPLE() {
        return TIME_24_SIMPLE;
    }
    /**
     * {@link toLocaleString} format like '09:30:23', always 24-hour.
     * @type {Object}
     */
    static get TIME_24_WITH_SECONDS() {
        return TIME_24_WITH_SECONDS;
    }
    /**
     * {@link toLocaleString} format like '09:30:23 EDT', always 24-hour.
     * @type {Object}
     */
    static get TIME_24_WITH_SHORT_OFFSET() {
        return TIME_24_WITH_SHORT_OFFSET;
    }
    /**
     * {@link toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
     * @type {Object}
     */
    static get TIME_24_WITH_LONG_OFFSET() {
        return TIME_24_WITH_LONG_OFFSET;
    }
    /**
     * {@link toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_SHORT() {
        return DATETIME_SHORT;
    }
    /**
     * {@link toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_SHORT_WITH_SECONDS() {
        return DATETIME_SHORT_WITH_SECONDS;
    }
    /**
     * {@link toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_MED() {
        return DATETIME_MED;
    }
    /**
     * {@link toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_MED_WITH_SECONDS() {
        return DATETIME_MED_WITH_SECONDS;
    }
    /**
     * {@link toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_MED_WITH_WEEKDAY() {
        return DATETIME_MED_WITH_WEEKDAY;
    }
    /**
     * {@link toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_FULL() {
        return DATETIME_FULL;
    }
    /**
     * {@link toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_FULL_WITH_SECONDS() {
        return DATETIME_FULL_WITH_SECONDS;
    }
    /**
     * {@link toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_HUGE() {
        return DATETIME_HUGE;
    }
    /**
     * {@link toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_HUGE_WITH_SECONDS() {
        return DATETIME_HUGE_WITH_SECONDS;
    }
    /**
     * Returns whether the DateTime is valid. Invalid DateTimes occur when:
     * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
     * * The DateTime was created by an operation on another invalid date
     * @type {boolean}
     */
    get isValid() {
        return this.invalid === null;
    }
    /**
     * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
     * @type {string}
     */
    get invalidReason() {
        return this.invalid ? this.invalid.reason : null;
    }
    /**
     * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
     * @type {string}
     */
    get invalidExplanation() {
        return this.invalid ? this.invalid.explanation : null;
    }
    /**
     * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
     *
     * @type {string}
     */
    get locale() {
        return this.isValid ? this.loc.locale : null;
    }
    /**
     * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
     *
     * @type {string}
     */
    get numberingSystem() {
        return this.isValid ? this.loc.numberingSystem : null;
    }
    /**
     * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
     *
     * @type {string}
     */
    get outputCalendar() {
        return this.isValid ? this.loc.outputCalendar : null;
    }
    /**
     * Get the time zone associated with this DateTime.
     * @type {Zone}
     */
    get zone() {
        return this._zone;
    }
    /**
     * Get the name of the time zone.
     * @type {string}
     */
    get zoneName() {
        return this.isValid ? this.zone.name : null;
    }
    /**
     * Get the year
     * @example DateTime.local(2017, 5, 25).year //=> 2017
     * @type {number}
     */
    get year() {
        return this.isValid ? this.c.year : NaN;
    }
    /**
     * Get the quarter
     * @example DateTime.local(2017, 5, 25).quarter //=> 2
     * @type {number}
     */
    get quarter() {
        return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
    }
    /**
     * Get the month (1-12).
     * @example DateTime.local(2017, 5, 25).month //=> 5
     * @type {number}
     */
    get month() {
        return this.isValid ? this.c.month : NaN;
    }
    /**
     * Get the day of the month (1-30ish).
     * @example DateTime.local(2017, 5, 25).day //=> 25
     * @type {number}
     */
    get day() {
        return this.isValid ? this.c.day : NaN;
    }
    /**
     * Get the hour of the day (0-23).
     * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
     * @type {number}
     */
    get hour() {
        return this.isValid ? this.c.hour : NaN;
    }
    /**
     * Get the minute of the hour (0-59).
     * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
     * @type {number}
     */
    get minute() {
        return this.isValid ? this.c.minute : NaN;
    }
    /**
     * Get the second of the minute (0-59).
     * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
     * @type {number}
     */
    get second() {
        return this.isValid ? this.c.second : NaN;
    }
    /**
     * Get the millisecond of the second (0-999).
     * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
     * @type {number}
     */
    get millisecond() {
        return this.isValid ? this.c.millisecond : NaN;
    }
    /**
     * Get the week year
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2014, 11, 31).weekYear //=> 2015
     * @type {number}
     */
    get weekYear() {
        return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
    }
    /**
     * Get the week number of the week year (1-52ish).
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
     * @type {number}
     */
    get weekNumber() {
        return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
    }
    /**
     * Get the day of the week.
     * 1 is Monday and 7 is Sunday
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2014, 11, 31).weekday //=> 4
     * @type {number}
     */
    get weekday() {
        return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
    }
    /**
     * Get the ordinal (meaning the day of the year)
     * @example DateTime.local(2017, 5, 25).ordinal //=> 145
     * @type {number|DateTime}
     */
    get ordinal() {
        return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
    }
    /**
     * Get the human readable short month name, such as 'Oct'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
     * @type {string}
     */
    get monthShort() {
        return this.isValid
            ? Info.months('short', {
                locale: this.locale,
            })[this.month - 1]
            : null;
    }
    /**
     * Get the human readable long month name, such as 'October'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).monthLong //=> October
     * @type {string}
     */
    get monthLong() {
        return this.isValid
            ? Info.months('long', {
                locale: this.locale,
            })[this.month - 1]
            : null;
    }
    /**
     * Get the human readable short weekday, such as 'Mon'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
     * @type {string}
     */
    get weekdayShort() {
        return this.isValid
            ? Info.weekdays('short', {
                locale: this.locale,
            })[this.weekday - 1]
            : null;
    }
    /**
     * Get the human readable long weekday, such as 'Monday'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
     * @type {string}
     */
    get weekdayLong() {
        return this.isValid
            ? Info.weekdays('long', {
                locale: this.locale,
            })[this.weekday - 1]
            : null;
    }
    /**
     * Get the UTC offset of this DateTime in minutes
     * @example DateTime.local().offset //=> -240
     * @example DateTime.utc().offset //=> 0
     * @type {number}
     */
    get offset() {
        return this.isValid ? +this.o : NaN;
    }
    /**
     * Get the short human name for the zone's current offset, for example "EST" or "EDT".
     * Defaults to the system's locale if no locale has been specified
     * @type {string}
     */
    get offsetNameShort() {
        if (this.isValid) {
            return this.zone.offsetName(this.ts, {
                format: 'short',
                locale: this.locale,
            });
        }
        else {
            return null;
        }
    }
    /**
     * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
     * Defaults to the system's locale if no locale has been specified
     * @type {string}
     */
    get offsetNameLong() {
        if (this.isValid) {
            return this.zone.offsetName(this.ts, {
                format: 'long',
                locale: this.locale,
            });
        }
        else {
            return null;
        }
    }
    /**
     * Get whether this zone's offset ever changes, as in a DST.
     * @type {boolean}
     */
    get isOffsetFixed() {
        return this.isValid ? this.zone.universal : null;
    }
    /**
     * Get whether the DateTime is in a DST.
     * @type {boolean}
     */
    get isInDST() {
        if (this.isOffsetFixed) {
            return false;
        }
        else {
            return (this.offset >
                this.set({
                    month: 1,
                }).offset ||
                this.offset >
                    this.set({
                        month: 5,
                    }).offset);
        }
    }
    /**
     * Returns true if this DateTime is in a leap year, false otherwise
     * @example DateTime.local(2016).isInLeapYear //=> true
     * @example DateTime.local(2013).isInLeapYear //=> false
     * @type {boolean}
     */
    get isInLeapYear() {
        return isLeapYear(this.year);
    }
    /**
     * Returns the number of days in this DateTime's month
     * @example DateTime.local(2016, 2).daysInMonth //=> 29
     * @example DateTime.local(2016, 3).daysInMonth //=> 31
     * @type {number}
     */
    get daysInMonth() {
        return daysInMonth(this.year, this.month);
    }
    /**
     * Returns the number of days in this DateTime's year
     * @example DateTime.local(2016).daysInYear //=> 366
     * @example DateTime.local(2013).daysInYear //=> 365
     * @type {number}
     */
    get daysInYear() {
        return this.isValid ? daysInYear(this.year) : NaN;
    }
    /**
     * Returns the number of weeks in this DateTime's year
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2004).weeksInWeekYear //=> 53
     * @example DateTime.local(2013).weeksInWeekYear //=> 52
     * @type {number}
     */
    get weeksInWeekYear() {
        return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
    }
    /**
     * Create a local DateTime
     * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
     * @param {number} [month=1] - The month, 1-indexed
     * @param {number} [day=1] - The day of the month
     * @param {number} [hour=0] - The hour of the day, in 24-hour time
     * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
     * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
     * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
     * @example DateTime.local()                            //~> now
     * @example DateTime.local(2017)                        //~> 2017-01-01T00:00:00
     * @example DateTime.local(2017, 3)                     //~> 2017-03-01T00:00:00
     * @example DateTime.local(2017, 3, 12)                 //~> 2017-03-12T00:00:00
     * @example DateTime.local(2017, 3, 12, 5)              //~> 2017-03-12T05:00:00
     * @example DateTime.local(2017, 3, 12, 5, 45)          //~> 2017-03-12T05:45:00
     * @example DateTime.local(2017, 3, 12, 5, 45, 10)      //~> 2017-03-12T05:45:10
     * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765) //~> 2017-03-12T05:45:10.765
     * @return {DateTime}
     */
    static local(year, month, day, hour, minute, second, millisecond) {
        if (isUndefined(year)) {
            return new DateTime({
                ts: Settings.now(),
            });
        }
        else {
            return quickDT({
                year,
                month,
                day,
                hour,
                minute,
                second,
                millisecond,
            }, Settings.defaultZone);
        }
    }
    /**
     * Create a DateTime in UTC
     * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
     * @param {number} [month=1] - The month, 1-indexed
     * @param {number} [day=1] - The day of the month
     * @param {number} [hour=0] - The hour of the day, in 24-hour time
     * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
     * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
     * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
     * @example DateTime.utc()                            //~> now
     * @example DateTime.utc(2017)                        //~> 2017-01-01T00:00:00Z
     * @example DateTime.utc(2017, 3)                     //~> 2017-03-01T00:00:00Z
     * @example DateTime.utc(2017, 3, 12)                 //~> 2017-03-12T00:00:00Z
     * @example DateTime.utc(2017, 3, 12, 5)              //~> 2017-03-12T05:00:00Z
     * @example DateTime.utc(2017, 3, 12, 5, 45)          //~> 2017-03-12T05:45:00Z
     * @example DateTime.utc(2017, 3, 12, 5, 45, 10)      //~> 2017-03-12T05:45:10Z
     * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765) //~> 2017-03-12T05:45:10.765Z
     * @return {DateTime}
     */
    static utc(year, month, day, hour, minute, second, millisecond) {
        if (isUndefined(year)) {
            return new DateTime({
                ts: Settings.now(),
                zone: FixedOffsetZone.utcInstance,
            });
        }
        else {
            return quickDT({
                year,
                month,
                day,
                hour,
                minute,
                second,
                millisecond,
            }, FixedOffsetZone.utcInstance);
        }
    }
    /**
     * Create a DateTime from a Javascript Date object. Uses the default zone.
     * @param {Date} date - a Javascript Date object
     * @param {Object} options - configuration options for the DateTime
     * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
     * @return {DateTime}
     */
    static fromJSDate(date, options = {}) {
        const ts = isDate(date) ? date.valueOf() : NaN;
        if (Number.isNaN(ts)) {
            return DateTime.invalid('invalid input');
        }
        const zoneToUse = normalizeZone(options.zone, Settings.defaultZone);
        if (!zoneToUse.isValid) {
            return DateTime.invalid(unsupportedZone(zoneToUse));
        }
        return new DateTime({
            ts: ts,
            zone: zoneToUse,
            loc: Locale.fromObject(options),
        });
    }
    /**
     * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
     * @param {number} milliseconds - a number of milliseconds since 1970 UTC
     * @param {Object} options - configuration options for the DateTime
     * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
     * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
     * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @return {DateTime}
     */
    static fromMillis(milliseconds, options = {}) {
        if (!isNumber(milliseconds)) {
            throw new InvalidArgumentError(`fromMillis requires a numerical input, but received a ${typeof milliseconds} with value ${milliseconds}`);
        }
        else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
            // this isn't perfect because because we can still end up out of range because of additional shifting, but it's a start
            return DateTime.invalid('Timestamp out of range');
        }
        else {
            return new DateTime({
                ts: milliseconds,
                zone: normalizeZone(options.zone, Settings.defaultZone),
                loc: Locale.fromObject(options),
            });
        }
    }
    /**
     * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
     * @param {number} seconds - a number of seconds since 1970 UTC
     * @param {Object} options - configuration options for the DateTime
     * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
     * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
     * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @return {DateTime}
     */
    static fromSeconds(seconds, options = {}) {
        if (!isNumber(seconds)) {
            throw new InvalidArgumentError('fromSeconds requires a numerical input');
        }
        else {
            return new DateTime({
                ts: seconds * 1000,
                zone: normalizeZone(options.zone, Settings.defaultZone),
                loc: Locale.fromObject(options),
            });
        }
    }
    /**
     * Create a DateTime from a Javascript object with keys like 'year' and 'hour' with reasonable defaults.
     * @param {Object} obj - the object to create the DateTime from
     * @param {number} obj.year - a year, such as 1987
     * @param {number} obj.month - a month, 1-12
     * @param {number} obj.day - a day of the month, 1-31, depending on the month
     * @param {number} obj.ordinal - day of the year, 1-365 or 366
     * @param {number} obj.weekYear - an ISO week year
     * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
     * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
     * @param {number} obj.hour - hour of the day, 0-23
     * @param {number} obj.minute - minute of the hour, 0-59
     * @param {number} obj.second - second of the minute, 0-59
     * @param {number} obj.millisecond - millisecond of the second, 0-999
     * @param {string|Zone} [obj.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
     * @param {string} [obj.locale='system's locale'] - a locale to set on the resulting DateTime instance
     * @param {string} obj.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} obj.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
     * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
     * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
     * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6, zone: 'utc' }),
     * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6, zone: 'local' })
     * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6, zone: 'America/New_York' })
     * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
     * @return {DateTime}
     */
    static fromObject(obj) {
        const zoneToUse = normalizeZone(obj.zone, Settings.defaultZone);
        if (!zoneToUse.isValid) {
            return DateTime.invalid(unsupportedZone(zoneToUse));
        }
        const tsNow = Settings.now(), offsetProvis = zoneToUse.offset(tsNow), normalized = normalizeObject(obj, normalizeUnit, [
            'zone',
            'locale',
            'outputCalendar',
            'numberingSystem',
        ]), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber, loc = Locale.fromObject(obj); // cases:
        // just a weekday -> this week's instance of that weekday, no worries
        // (gregorian data or ordinal) + (weekYear or weekNumber) -> error
        // (gregorian month or day) + ordinal -> error
        // otherwise just use weeks or ordinals or gregorian, depending on what's specified
        if ((containsGregor || containsOrdinal) && definiteWeekDef) {
            throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
        }
        if (containsGregorMD && containsOrdinal) {
            throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
        }
        const useWeekData = definiteWeekDef || (normalized.weekday && !containsGregor); // configure ourselves to deal with gregorian dates or week stuff
        let units, defaultValues, objNow = tsToObj(tsNow, offsetProvis);
        if (useWeekData) {
            units = orderedWeekUnits;
            defaultValues = defaultWeekUnitValues;
            objNow = gregorianToWeek(objNow);
        }
        else if (containsOrdinal) {
            units = orderedOrdinalUnits;
            defaultValues = defaultOrdinalUnitValues;
            objNow = gregorianToOrdinal(objNow);
        }
        else {
            units = orderedUnits$1;
            defaultValues = defaultUnitValues;
        } // set default values for missing stuff
        let foundFirst = false;
        for (const u of units) {
            const v = normalized[u];
            if (!isUndefined(v)) {
                foundFirst = true;
            }
            else if (foundFirst) {
                normalized[u] = defaultValues[u];
            }
            else {
                normalized[u] = objNow[u];
            }
        } // make sure the values we have are in range
        const higherOrderInvalid = useWeekData
            ? hasInvalidWeekData(normalized)
            : containsOrdinal
                ? hasInvalidOrdinalData(normalized)
                : hasInvalidGregorianData(normalized), invalid = higherOrderInvalid || hasInvalidTimeData(normalized);
        if (invalid) {
            return DateTime.invalid(invalid);
        } // compute the actual time
        const gregorian = useWeekData
            ? weekToGregorian(normalized)
            : containsOrdinal
                ? ordinalToGregorian(normalized)
                : normalized, [tsFinal, offsetFinal] = objToTS(gregorian, offsetProvis, zoneToUse), inst = new DateTime({
            ts: tsFinal,
            zone: zoneToUse,
            o: offsetFinal,
            loc,
        }); // gregorian data + weekday serves only to validate
        if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
            return DateTime.invalid('mismatched weekday', `you can't specify both a weekday of ${normalized.weekday} and a date of ${inst.toISO()}`);
        }
        return inst;
    }
    /**
     * Create a DateTime from an ISO 8601 string
     * @param {string} text - the ISO string
     * @param {Object} opts - options to affect the creation
     * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
     * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
     * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
     * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @example DateTime.fromISO('2016-05-25T09:08:34.123')
     * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
     * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
     * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
     * @example DateTime.fromISO('2016-W05-4')
     * @return {DateTime}
     */
    static fromISO(text, opts = {}) {
        const [vals, parsedZone] = parseISODate(text);
        return parseDataToDateTime(vals, parsedZone, opts, 'ISO 8601', text);
    }
    /**
     * Create a DateTime from an RFC 2822 string
     * @param {string} text - the RFC 2822 string
     * @param {Object} opts - options to affect the creation
     * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
     * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
     * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
     * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
     * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
     * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
     * @return {DateTime}
     */
    static fromRFC2822(text, opts = {}) {
        const [vals, parsedZone] = parseRFC2822Date(text);
        return parseDataToDateTime(vals, parsedZone, opts, 'RFC 2822', text);
    }
    /**
     * Create a DateTime from an HTTP header date
     * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
     * @param {string} text - the HTTP header date
     * @param {Object} opts - options to affect the creation
     * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
     * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
     * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
     * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
     * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
     * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
     * @return {DateTime}
     */
    static fromHTTP(text, opts = {}) {
        const [vals, parsedZone] = parseHTTPDate(text);
        return parseDataToDateTime(vals, parsedZone, opts, 'HTTP', opts);
    }
    /**
     * Create a DateTime from an input string and format string.
     * Defaults to en-US if no locale has been specified, regardless of the system's locale.
     * @see https://moment.github.io/luxon/docs/manual/parsing.html#table-of-tokens
     * @param {string} text - the string to parse
     * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
     * @param {Object} opts - options to affect the creation
     * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
     * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
     * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
     * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
     * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @return {DateTime}
     */
    static fromFormat(text, fmt, opts = {}) {
        if (isUndefined(text) || isUndefined(fmt)) {
            throw new InvalidArgumentError('fromFormat requires an input string and a format');
        }
        const { locale = null, numberingSystem = null } = opts, localeToUse = Locale.fromOpts({
            locale,
            numberingSystem,
            defaultToEN: true,
        }), [vals, parsedZone, invalid] = parseFromTokens(localeToUse, text, fmt);
        if (invalid) {
            return DateTime.invalid(invalid);
        }
        else {
            return parseDataToDateTime(vals, parsedZone, opts, `format ${fmt}`, text);
        }
    }
    /**
     * @deprecated use fromFormat instead
     */
    static fromString(text, fmt, opts = {}) {
        return DateTime.fromFormat(text, fmt, opts);
    }
    /**
     * Create a DateTime from a SQL date, time, or datetime
     * Defaults to en-US if no locale has been specified, regardless of the system's locale
     * @param {string} text - the string to parse
     * @param {Object} opts - options to affect the creation
     * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
     * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
     * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
     * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
     * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @example DateTime.fromSQL('2017-05-15')
     * @example DateTime.fromSQL('2017-05-15 09:12:34')
     * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
     * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
     * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
     * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
     * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
     * @example DateTime.fromSQL('09:12:34.342')
     * @return {DateTime}
     */
    static fromSQL(text, opts = {}) {
        const [vals, parsedZone] = parseSQL(text);
        return parseDataToDateTime(vals, parsedZone, opts, 'SQL', text);
    }
    /**
     * Create an invalid DateTime.
     * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent
     * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
     * @return {DateTime}
     */
    static invalid(reason, explanation = null) {
        if (!reason) {
            throw new InvalidArgumentError('need to specify a reason the DateTime is invalid');
        }
        const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
        if (Settings.throwOnInvalid) {
            throw new InvalidDateTimeError(invalid);
        }
        else {
            return new DateTime({
                invalid,
            });
        }
    }
    /**
     * Check if an object is a DateTime. Works across context boundaries
     * @param {object} o
     * @return {boolean}
     */
    static isDateTime(o) {
        return (o && o.isLuxonDateTime) || false;
    } // INFO
    /**
     * Return the min of several date times
     * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
     * @return {DateTime} the min DateTime, or undefined if called with no argument
     */
    static min(...dateTimes) {
        if (!dateTimes.every(DateTime.isDateTime)) {
            throw new InvalidArgumentError('min requires all arguments be DateTimes');
        }
        return bestBy(dateTimes, i => i.valueOf(), Math.min);
    }
    /**
     * Return the max of several date times
     * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
     * @return {DateTime} the max DateTime, or undefined if called with no argument
     */
    static max(...dateTimes) {
        if (!dateTimes.every(DateTime.isDateTime)) {
            throw new InvalidArgumentError('max requires all arguments be DateTimes');
        }
        return bestBy(dateTimes, i => i.valueOf(), Math.max);
    } // MISC
    /**
     * Explain how a string would be parsed by fromFormat()
     * @param {string} text - the string to parse
     * @param {string} fmt - the format the string is expected to be in (see description)
     * @param {Object} options - options taken by fromFormat()
     * @return {Object}
     */
    static fromFormatExplain(text, fmt, options = {}) {
        const { locale = null, numberingSystem = null } = options, localeToUse = Locale.fromOpts({
            locale,
            numberingSystem,
            defaultToEN: true,
        });
        return explainFromTokens(localeToUse, text, fmt);
    }
    /**
     * @deprecated use fromFormatExplain instead
     */
    static fromStringExplain(text, fmt, options = {}) {
        return DateTime.fromFormatExplain(text, fmt, options);
    } // FORMAT PRESETS
    /**
     * Get the value of unit.
     * @param {string} unit - a unit such as 'minute' or 'day'
     * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
     * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
     * @return {number}
     */
    get(unit) {
        return this[unit];
    }
    /**
     * Returns the resolved Intl options for this DateTime.
     * This is useful in understanding the behavior of formatting methods
     * @param {Object} opts - the same options as toLocaleString
     * @return {Object}
     */
    resolvedLocaleOpts(opts = {}) {
        const { locale, numberingSystem, calendar } = Formatter.create(this.loc.clone(opts), opts).resolvedOptions(this);
        return {
            locale,
            numberingSystem,
            outputCalendar: calendar,
        };
    } // TRANSFORM
    /**
     * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
     *
     * Equivalent to {@link setZone}('utc')
     * @param {number} [offset=0] - optionally, an offset from UTC in minutes
     * @param {Object} [opts={}] - options to pass to `setZone()`
     * @return {DateTime}
     */
    toUTC(offset = 0, opts = {}) {
        return this.setZone(FixedOffsetZone.instance(offset), opts);
    }
    /**
     * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
     *
     * Equivalent to `setZone('local')`
     * @return {DateTime}
     */
    toLocal() {
        return this.setZone(Settings.defaultZone);
    }
    /**
     * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
     *
     * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link plus}. You may wish to use {@link toLocal} and {@link toUTC} which provide simple convenience wrappers for commonly used zones.
     * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link Zone} class.
     * @param {Object} opts - options
     * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
     * @return {DateTime}
     */
    setZone(zone, { keepLocalTime = false, keepCalendarTime = false } = {}) {
        zone = normalizeZone(zone, Settings.defaultZone);
        if (zone.equals(this.zone)) {
            return this;
        }
        else if (!zone.isValid) {
            return DateTime.invalid(unsupportedZone(zone));
        }
        else {
            let newTS = this.ts;
            if (keepLocalTime || keepCalendarTime) {
                const offsetGuess = zone.offset(this.ts);
                const asObj = this.toObject();
                [newTS] = objToTS(asObj, offsetGuess, zone);
            }
            return clone$1(this, {
                ts: newTS,
                zone,
            });
        }
    }
    /**
     * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
     * @param {Object} properties - the properties to set
     * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
     * @return {DateTime}
     */
    reconfigure({ locale, numberingSystem, outputCalendar } = {}) {
        const loc = this.loc.clone({
            locale,
            numberingSystem,
            outputCalendar,
        });
        return clone$1(this, {
            loc,
        });
    }
    /**
     * "Set" the locale. Returns a newly-constructed DateTime.
     * Just a convenient alias for reconfigure({ locale })
     * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
     * @return {DateTime}
     */
    setLocale(locale) {
        return this.reconfigure({
            locale,
        });
    }
    /**
     * "Set" the values of specified units. Returns a newly-constructed DateTime.
     * You can only set units with this method; for "setting" metadata, see {@link reconfigure} and {@link setZone}.
     * @param {Object} values - a mapping of units to numbers
     * @example dt.set({ year: 2017 })
     * @example dt.set({ hour: 8, minute: 30 })
     * @example dt.set({ weekday: 5 })
     * @example dt.set({ year: 2005, ordinal: 234 })
     * @return {DateTime}
     */
    set(values) {
        if (!this.isValid)
            return this;
        const normalized = normalizeObject(values, normalizeUnit, []), settingWeekStuff = !isUndefined(normalized.weekYear) ||
            !isUndefined(normalized.weekNumber) ||
            !isUndefined(normalized.weekday);
        let mixed;
        if (settingWeekStuff) {
            mixed = weekToGregorian(Object.assign(gregorianToWeek(this.c), normalized));
        }
        else if (!isUndefined(normalized.ordinal)) {
            mixed = ordinalToGregorian(Object.assign(gregorianToOrdinal(this.c), normalized));
        }
        else {
            mixed = Object.assign(this.toObject(), normalized); // if we didn't set the day but we ended up on an overflow date,
            // use the last day of the right month
            if (isUndefined(normalized.day)) {
                mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
            }
        }
        const [ts, o] = objToTS(mixed, this.o, this.zone);
        return clone$1(this, {
            ts,
            o,
        });
    }
    /**
     * Add a period of time to this DateTime and return the resulting DateTime
     *
     * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
     * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
     * @example DateTime.local().plus(123) //~> in 123 milliseconds
     * @example DateTime.local().plus({ minutes: 15 }) //~> in 15 minutes
     * @example DateTime.local().plus({ days: 1 }) //~> this time tomorrow
     * @example DateTime.local().plus({ days: -1 }) //~> this time yesterday
     * @example DateTime.local().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
     * @example DateTime.local().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
     * @return {DateTime}
     */
    plus(duration) {
        if (!this.isValid)
            return this;
        const dur = friendlyDuration(duration);
        return clone$1(this, adjustTime(this, dur));
    }
    /**
     * Subtract a period of time to this DateTime and return the resulting DateTime
     * See {@link plus}
     * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
     @return {DateTime}
     */
    minus(duration) {
        if (!this.isValid)
            return this;
        const dur = friendlyDuration(duration).negate();
        return clone$1(this, adjustTime(this, dur));
    }
    /**
     * "Set" this DateTime to the beginning of a unit of time.
     * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
     * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
     * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
     * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
     * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
     * @return {DateTime}
     */
    startOf(unit) {
        if (!this.isValid)
            return this;
        const o = {}, normalizedUnit = Duration.normalizeUnit(unit);
        switch (normalizedUnit) {
            case 'years':
                o.month = 1;
            // falls through
            case 'quarters':
            case 'months':
                o.day = 1;
            // falls through
            case 'weeks':
            case 'days':
                o.hour = 0;
            // falls through
            case 'hours':
                o.minute = 0;
            // falls through
            case 'minutes':
                o.second = 0;
            // falls through
            case 'seconds':
                o.millisecond = 0;
                break;
            // no default, invalid units throw in normalizeUnit()
        }
        if (normalizedUnit === 'weeks') {
            o.weekday = 1;
        }
        if (normalizedUnit === 'quarters') {
            const q = Math.ceil(this.month / 3);
            o.month = (q - 1) * 3 + 1;
        }
        return this.set(o);
    }
    /**
     * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
     * @param {string} unit - The unit to go to the end of. Can be 'year', 'month', 'day', 'hour', 'minute', 'second', or 'millisecond'.
     * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
     * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
     * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
     * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
     * @return {DateTime}
     */
    endOf(unit) {
        return this.isValid
            ? this.plus({
                [unit]: 1,
            })
                .startOf(unit)
                .minus(1)
            : this;
    } // OUTPUT
    /**
     * Returns a string representation of this DateTime formatted according to the specified format string.
     * **You may not want this.** See {@link toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens).
     * Defaults to en-US if no locale has been specified, regardless of the system's locale.
     * @see https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
     * @param {string} fmt - the format string
     * @param {Object} opts - opts to override the configuration options
     * @example DateTime.local().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
     * @example DateTime.local().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
     * @example DateTime.local().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
     * @example DateTime.local().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
     * @return {string}
     */
    toFormat(fmt, opts = {}) {
        return this.isValid
            ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt)
            : INVALID$2;
    }
    /**
     * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
     * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
     * of the DateTime in the assigned locale.
     * Defaults to the system's locale if no locale has been specified
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     * @param opts {Object} - Intl.DateTimeFormat constructor options and configuration options
     * @example DateTime.local().toLocaleString(); //=> 4/20/2017
     * @example DateTime.local().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
     * @example DateTime.local().toLocaleString({ locale: 'en-gb' }); //=> '20/04/2017'
     * @example DateTime.local().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
     * @example DateTime.local().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
     * @example DateTime.local().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
     * @example DateTime.local().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
     * @example DateTime.local().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
     * @example DateTime.local().toLocaleString({ hour: '2-digit', minute: '2-digit', hour12: false }); //=> '11:32'
     * @return {string}
     */
    toLocaleString(opts = DATE_SHORT) {
        return this.isValid
            ? Formatter.create(this.loc.clone(opts), opts).formatDateTime(this)
            : INVALID$2;
    }
    /**
     * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
     * Defaults to the system's locale if no locale has been specified
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
     * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
     * @example DateTime.local().toLocaleParts(); //=> [
     *                                   //=>   { type: 'day', value: '25' },
     *                                   //=>   { type: 'literal', value: '/' },
     *                                   //=>   { type: 'month', value: '05' },
     *                                   //=>   { type: 'literal', value: '/' },
     *                                   //=>   { type: 'year', value: '1982' }
     *                                   //=> ]
     */
    toLocaleParts(opts = {}) {
        return this.isValid
            ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this)
            : [];
    }
    /**
     * Returns an ISO 8601-compliant string representation of this DateTime
     * @param {Object} opts - options
     * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
     * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
     * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
     * @param {string} [opts.format='extended'] - choose between the basic and extended format
     * @example DateTime.utc(1982, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
     * @example DateTime.local().toISO() //=> '2017-04-22T20:47:05.335-04:00'
     * @example DateTime.local().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
     * @example DateTime.local().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
     * @return {string}
     */
    toISO(opts = {}) {
        if (!this.isValid) {
            return null;
        }
        return `${this.toISODate(opts)}T${this.toISOTime(opts)}`;
    }
    /**
     * Returns an ISO 8601-compliant string representation of this DateTime's date component
     * @param {Object} opts - options
     * @param {string} [opts.format='extended'] - choose between the basic and extended format
     * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
     * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
     * @return {string}
     */
    toISODate({ format = 'extended' } = {}) {
        let fmt = format === 'basic' ? 'yyyyMMdd' : 'yyyy-MM-dd';
        if (this.year > 9999) {
            fmt = '+' + fmt;
        }
        return toTechFormat(this, fmt);
    }
    /**
     * Returns an ISO 8601-compliant string representation of this DateTime's week date
     * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
     * @return {string}
     */
    toISOWeekDate() {
        return toTechFormat(this, "kkkk-'W'WW-c");
    }
    /**
     * Returns an ISO 8601-compliant string representation of this DateTime's time component
     * @param {Object} opts - options
     * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
     * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
     * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
     * @param {string} [opts.format='extended'] - choose between the basic and extended format
     * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
     * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
     * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
     * @return {string}
     */
    toISOTime({ suppressMilliseconds = false, suppressSeconds = false, includeOffset = true, format = 'extended', } = {}) {
        return toTechTimeFormat(this, {
            suppressSeconds,
            suppressMilliseconds,
            includeOffset,
            format,
        });
    }
    /**
     * Returns an RFC 2822-compatible string representation of this DateTime, always in UTC
     * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
     * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
     * @return {string}
     */
    toRFC2822() {
        return toTechFormat(this, 'EEE, dd LLL yyyy HH:mm:ss ZZZ', false);
    }
    /**
     * Returns a string representation of this DateTime appropriate for use in HTTP headers.
     * Specifically, the string conforms to RFC 1123.
     * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
     * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
     * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
     * @return {string}
     */
    toHTTP() {
        return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
    }
    /**
     * Returns a string representation of this DateTime appropriate for use in SQL Date
     * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
     * @return {string}
     */
    toSQLDate() {
        return toTechFormat(this, 'yyyy-MM-dd');
    }
    /**
     * Returns a string representation of this DateTime appropriate for use in SQL Time
     * @param {Object} opts - options
     * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
     * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
     * @example DateTime.utc().toSQL() //=> '05:15:16.345'
     * @example DateTime.local().toSQL() //=> '05:15:16.345 -04:00'
     * @example DateTime.local().toSQL({ includeOffset: false }) //=> '05:15:16.345'
     * @example DateTime.local().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
     * @return {string}
     */
    toSQLTime({ includeOffset = true, includeZone = false } = {}) {
        return toTechTimeFormat(this, {
            includeOffset,
            includeZone,
            spaceZone: true,
        });
    }
    /**
     * Returns a string representation of this DateTime appropriate for use in SQL DateTime
     * @param {Object} opts - options
     * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
     * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
     * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
     * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
     * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
     * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
     * @return {string}
     */
    toSQL(opts = {}) {
        if (!this.isValid) {
            return null;
        }
        return `${this.toSQLDate()} ${this.toSQLTime(opts)}`;
    }
    /**
     * Returns a string representation of this DateTime appropriate for debugging
     * @return {string}
     */
    toString() {
        return this.isValid ? this.toISO() : INVALID$2;
    }
    /**
     * Returns the epoch milliseconds of this DateTime. Alias of {@link toMillis}
     * @return {number}
     */
    valueOf() {
        return this.toMillis();
    }
    /**
     * Returns the epoch milliseconds of this DateTime.
     * @return {number}
     */
    toMillis() {
        return this.isValid ? this.ts : NaN;
    }
    /**
     * Returns the epoch seconds of this DateTime.
     * @return {number}
     */
    toSeconds() {
        return this.isValid ? this.ts / 1000 : NaN;
    }
    /**
     * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
     * @return {string}
     */
    toJSON() {
        return this.toISO();
    }
    /**
     * Returns a BSON serializable equivalent to this DateTime.
     * @return {Date}
     */
    toBSON() {
        return this.toJSDate();
    }
    /**
     * Returns a Javascript object with this DateTime's year, month, day, and so on.
     * @param opts - options for generating the object
     * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
     * @example DateTime.local().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
     * @return {Object}
     */
    toObject(opts = {}) {
        if (!this.isValid)
            return {};
        const base = Object.assign({}, this.c);
        if (opts.includeConfig) {
            base.outputCalendar = this.outputCalendar;
            base.numberingSystem = this.loc.numberingSystem;
            base.locale = this.loc.locale;
        }
        return base;
    }
    /**
     * Returns a Javascript Date equivalent to this DateTime.
     * @return {Date}
     */
    toJSDate() {
        return new Date(this.isValid ? this.ts : NaN);
    } // COMPARE
    /**
     * Return the difference between two DateTimes as a Duration.
     * @param {DateTime} otherDateTime - the DateTime to compare this one to
     * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
     * @param {Object} opts - options that affect the creation of the Duration
     * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
     * @example
     * var i1 = DateTime.fromISO('1982-05-25T09:45'),
     *     i2 = DateTime.fromISO('1983-10-14T10:30');
     * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
     * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
     * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
     * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
     * @return {Duration}
     */
    diff(otherDateTime, unit = 'milliseconds', opts = {}) {
        if (!this.isValid || !otherDateTime.isValid) {
            return Duration.invalid(this.invalid || otherDateTime.invalid, 'created by diffing an invalid DateTime');
        }
        const durOpts = Object.assign({
            locale: this.locale,
            numberingSystem: this.numberingSystem,
        }, opts);
        const units = maybeArray(unit).map(Duration.normalizeUnit), otherIsLater = otherDateTime.valueOf() > this.valueOf(), earlier = otherIsLater ? this : otherDateTime, later = otherIsLater ? otherDateTime : this, diffed = diff(earlier, later, units, durOpts);
        return otherIsLater ? diffed.negate() : diffed;
    }
    /**
     * Return the difference between this DateTime and right now.
     * See {@link diff}
     * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
     * @param {Object} opts - options that affect the creation of the Duration
     * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
     * @return {Duration}
     */
    diffNow(unit = 'milliseconds', opts = {}) {
        return this.diff(DateTime.local(), unit, opts);
    }
    /**
     * Return an Interval spanning between this DateTime and another DateTime
     * @param {DateTime} otherDateTime - the other end point of the Interval
     * @return {Interval}
     */
    until(otherDateTime) {
        return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
    }
    /**
     * Return whether this DateTime is in the same unit of time as another DateTime
     * @param {DateTime} otherDateTime - the other DateTime
     * @param {string} unit - the unit of time to check sameness on
     * @example DateTime.local().hasSame(otherDT, 'day'); //~> true if both the same calendar day
     * @return {boolean}
     */
    hasSame(otherDateTime, unit) {
        if (!this.isValid)
            return false;
        if (unit === 'millisecond') {
            return this.valueOf() === otherDateTime.valueOf();
        }
        else {
            const inputMs = otherDateTime.valueOf();
            return this.startOf(unit) <= inputMs && inputMs <= this.endOf(unit);
        }
    }
    /**
     * Equality check
     * Two DateTimes are equal iff they represent the same millisecond, have the same zone and location, and are both valid.
     * To compare just the millisecond values, use `+dt1 === +dt2`.
     * @param {DateTime} other - the other DateTime
     * @return {boolean}
     */
    equals(other) {
        return (this.isValid &&
            other.isValid &&
            this.valueOf() === other.valueOf() &&
            this.zone.equals(other.zone) &&
            this.loc.equals(other.loc));
    }
    /**
     * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
     * platform supports Intl.RelativeTimeFormat. Rounds down by default.
     * @param {Object} options - options that affect the output
     * @param {DateTime} [options.base=DateTime.local()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
     * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
     * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
     * @param {boolean} [options.round=true] - whether to round the numbers in the output.
     * @param {boolean} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
     * @param {string} options.locale - override the locale of this DateTime
     * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
     * @example DateTime.local().plus({ days: 1 }).toRelative() //=> "in 1 day"
     * @example DateTime.local().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
     * @example DateTime.local().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
     * @example DateTime.local().minus({ days: 2 }).toRelative() //=> "2 days ago"
     * @example DateTime.local().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
     * @example DateTime.local().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
     */
    toRelative(options = {}) {
        if (!this.isValid)
            return null;
        const base = options.base ||
            DateTime.fromObject({
                zone: this.zone,
            }), padding = options.padding
            ? this < base
                ? -options.padding
                : options.padding
            : 0;
        return diffRelative(base, this.plus(padding), Object.assign(options, {
            numeric: 'always',
            units: ['years', 'months', 'days', 'hours', 'minutes', 'seconds'],
        }));
    }
    /**
     * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
     * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
     * @param {Object} options - options that affect the output
     * @param {DateTime} [options.base=DateTime.local()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
     * @param {string} options.locale - override the locale of this DateTime
     * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
     * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
     * @example DateTime.local().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
     * @example DateTime.local().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
     * @example DateTime.local().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
     * @example DateTime.local().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
     */
    toRelativeCalendar(options = {}) {
        if (!this.isValid)
            return null;
        return diffRelative(options.base ||
            DateTime.fromObject({
                zone: this.zone,
            }), this, Object.assign(options, {
            numeric: 'auto',
            units: ['years', 'months', 'days'],
            calendary: true,
        }));
    }
}
/**
 * @private
 */
function friendlyDateTime(dateTimeish) {
    if (DateTime.isDateTime(dateTimeish)) {
        return dateTimeish;
    }
    else if (dateTimeish &&
        dateTimeish.valueOf &&
        isNumber(dateTimeish.valueOf())) {
        return DateTime.fromJSDate(dateTimeish);
    }
    else if (dateTimeish && typeof dateTimeish === 'object') {
        return DateTime.fromObject(dateTimeish);
    }
    else {
        throw new InvalidArgumentError(`Unknown datetime argument: ${dateTimeish}, of type ${typeof dateTimeish}`);
    }
}
export { DateTime };
export { Duration };
export { FixedOffsetZone };
export { IANAZone };
export { Info };
export { Interval };
export { InvalidZone };
export { LocalZone };
export { Settings };
export { Zone }; //# sourceMappingURL=luxon.js.map
export default _exp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHV4b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbHV4b24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO0lBQ3hDLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDLENBQUMsMEVBQTBFO0FBRTlFOztHQUVHO0FBRUgsTUFBTSxVQUFXLFNBQVEsS0FBSztDQUFHO0FBRWpDOztHQUVHO0FBRUgsTUFBTSxvQkFBcUIsU0FBUSxVQUFVO0lBQzNDLFlBQVksTUFBTTtRQUNoQixLQUFLLENBQUMscUJBQXFCLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztDQUNGO0FBRUQ7O0dBRUc7QUFFSCxNQUFNLG9CQUFxQixTQUFRLFVBQVU7SUFDM0MsWUFBWSxNQUFNO1FBQ2hCLEtBQUssQ0FBQyxxQkFBcUIsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNuRCxDQUFDO0NBQ0Y7QUFFRDs7R0FFRztBQUVILE1BQU0sb0JBQXFCLFNBQVEsVUFBVTtJQUMzQyxZQUFZLE1BQU07UUFDaEIsS0FBSyxDQUFDLHFCQUFxQixNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Q0FDRjtBQUVEOztHQUVHO0FBRUgsTUFBTSw2QkFBOEIsU0FBUSxVQUFVO0NBQUc7QUFFekQ7O0dBRUc7QUFFSCxNQUFNLGdCQUFpQixTQUFRLFVBQVU7SUFDdkMsWUFBWSxJQUFJO1FBQ2QsS0FBSyxDQUFDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FDRjtBQUVEOztHQUVHO0FBRUgsTUFBTSxvQkFBcUIsU0FBUSxVQUFVO0NBQUc7QUFFaEQ7O0dBRUc7QUFFSCxNQUFNLG1CQUFvQixTQUFRLFVBQVU7SUFDMUM7UUFD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QU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDdEQsQ0FBQztJQUVEOzs7T0FHRztJQUVILElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDckQsQ0FBQztJQUVEOzs7T0FHRztJQUVILElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7T0FHRztJQUVILElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDckQsQ0FBQztJQUVEOzs7T0FHRztJQUVILElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7T0FHRztJQUVILElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7T0FHRztJQUVILElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFD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LENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7T0FHRztJQUVILElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQ7OztPQUdHO0lBRUgsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzlDLENBQUM7SUFFRDs7OztPQUlHO0lBRUgsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7OztPQUlHO0lBRUgsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDMUQsQ0FBQztJQUVEOzs7O09BSUc7SUFFSCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7O09BSUc7SUFFSCxJQUFJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7O09BSUc7SUFFSCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7O09BSUc7SUFFSCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7O09BSUc7SUFFSCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7O09BSUc7SUFFSCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDakQsQ0FBQztJQUVEOzs7OztPQUtHO0lBRUgsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFFSCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ3RFLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFFSCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ25FLENBQUM7SUFFRDs7OztPQUlHO0lBRUgsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDakUsQ0FBQztJQUVEOzs7OztPQUtHO0lBRUgsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTztZQUNqQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNYLENBQUM7SUFFRDs7Ozs7T0FLRztJQUVILElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU87WUFDakIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNsQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07YUFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDWCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFFSCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxPQUFPO1lBQ2pCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtnQkFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ1gsQ0FBQztJQUVEOzs7OztPQUtHO0lBRUgsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTztZQUNqQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3BCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNYLENBQUM7SUFFRDs7Ozs7T0FLRztJQUVILElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7O09BSUc7SUFFSCxJQUFJLGVBQWU7UUFDakIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDbkMsTUFBTSxFQUFFLE9BQU87Z0JBQ2YsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3BCLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFFSCxJQUFJLGNBQWM7UUFDaEIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDbkMsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3BCLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUVILElBQUksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNuRCxDQUFDO0lBRUQ7OztPQUdHO0lBRUgsSUFBSSxPQUFPO1FBQ1QsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7YUFBTTtZQUNMLE9BQU8sQ0FDTCxJQUFJLENBQUMsTUFBTTtnQkFDVCxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNQLEtBQUssRUFBRSxDQUFDO2lCQUNULENBQUMsQ0FBQyxNQUFNO2dCQUNYLElBQUksQ0FBQyxNQUFNO29CQUNULElBQUksQ0FBQyxHQUFHLENBQUM7d0JBQ1AsS0FBSyxFQUFFLENBQUM7cUJBQ1QsQ0FBQyxDQUFDLE1BQU0sQ0FDWixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFFSCxJQUFJLFlBQVk7UUFDZCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7OztPQUtHO0lBRUgsSUFBSSxXQUFXO1FBQ2IsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7OztPQUtHO0lBRUgsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUVILElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUVILE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVztRQUM5RCxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNyQixPQUFPLElBQUksUUFBUSxDQUFDO2dCQUNsQixFQUFFLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRTthQUNuQixDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsT0FBTyxPQUFPLENBQ1o7Z0JBQ0UsSUFBSTtnQkFDSixLQUFLO2dCQUNMLEdBQUc7Z0JBQ0gsSUFBSTtnQkFDSixNQUFNO2dCQUNOLE1BQU07Z0JBQ04sV0FBVzthQUNaLEVBQ0QsUUFBUSxDQUFDLFdBQVcsQ0FDckIsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFFSCxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVc7UUFDNUQsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDckIsT0FBTyxJQUFJLFFBQVEsQ0FBQztnQkFDbEIsRUFBRSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLElBQUksRUFBRSxlQUFlLENBQUMsV0FBVzthQUNsQyxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsT0FBTyxPQUFPLENBQ1o7Z0JBQ0UsSUFBSTtnQkFDSixLQUFLO2dCQUNMLEdBQUc7Z0JBQ0gsSUFBSTtnQkFDSixNQUFNO2dCQUNOLE1BQU07Z0JBQ04sV0FBVzthQUNaLEVBQ0QsZUFBZSxDQUFDLFdBQVcsQ0FDNUIsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUVILE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sR0FBRyxFQUFFO1FBQ2xDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFFL0MsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUMxQztRQUVELE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVwRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUN0QixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7U0FDckQ7UUFFRCxPQUFPLElBQUksUUFBUSxDQUFDO1lBQ2xCLEVBQUUsRUFBRSxFQUFFO1lBQ04sSUFBSSxFQUFFLFNBQVM7WUFDZixHQUFHLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7U0FDaEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUVILE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLE9BQU8sR0FBRyxFQUFFO1FBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDM0IsTUFBTSxJQUFJLG9CQUFvQixDQUM1Qix5REFBeUQsT0FBTyxZQUFZLGVBQWUsWUFBWSxFQUFFLENBQzFHLENBQUM7U0FDSDthQUFNLElBQUksWUFBWSxHQUFHLENBQUMsUUFBUSxJQUFJLFlBQVksR0FBRyxRQUFRLEVBQUU7WUFDOUQsdUhBQXVIO1lBQ3ZILE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1NBQ25EO2FBQU07WUFDTCxPQUFPLElBQUksUUFBUSxDQUFDO2dCQUNsQixFQUFFLEVBQUUsWUFBWTtnQkFDaEIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUM7Z0JBQ3ZELEdBQUcsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQzthQUNoQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFFSCxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLEdBQUcsRUFBRTtRQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3RCLE1BQU0sSUFBSSxvQkFBb0IsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1NBQzFFO2FBQU07WUFDTCxPQUFPLElBQUksUUFBUSxDQUFDO2dCQUNsQixFQUFFLEVBQUUsT0FBTyxHQUFHLElBQUk7Z0JBQ2xCLElBQUksRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDO2dCQUN2RCxHQUFHLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7YUFDaEMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMEJHO0lBRUgsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHO1FBQ25CLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVoRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUN0QixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7U0FDckQ7UUFFRCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQzFCLFlBQVksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUN0QyxVQUFVLEdBQUcsZUFBZSxDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUU7WUFDL0MsTUFBTTtZQUNOLFFBQVE7WUFDUixnQkFBZ0I7WUFDaEIsaUJBQWlCO1NBQ2xCLENBQUMsRUFDRixlQUFlLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUNsRCxrQkFBa0IsR0FBRyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQ2xELGdCQUFnQixHQUNkLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQ2hFLGNBQWMsR0FBRyxrQkFBa0IsSUFBSSxnQkFBZ0IsRUFDdkQsZUFBZSxHQUFHLFVBQVUsQ0FBQyxRQUFRLElBQUksVUFBVSxDQUFDLFVBQVUsRUFDOUQsR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBQ3pDLHFFQUFxRTtRQUNyRSxrRUFBa0U7UUFDbEUsOENBQThDO1FBQzlDLG1GQUFtRjtRQUVuRixJQUFJLENBQUMsY0FBYyxJQUFJLGVBQWUsQ0FBQyxJQUFJLGVBQWUsRUFBRTtZQUMxRCxNQUFNLElBQUksNkJBQTZCLENBQ3JDLHFFQUFxRSxDQUN0RSxDQUFDO1NBQ0g7UUFFRCxJQUFJLGdCQUFnQixJQUFJLGVBQWUsRUFBRTtZQUN2QyxNQUFNLElBQUksNkJBQTZCLENBQ3JDLHdDQUF3QyxDQUN6QyxDQUFDO1NBQ0g7UUFFRCxNQUFNLFdBQVcsR0FDZixlQUFlLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxpRUFBaUU7UUFFL0gsSUFBSSxLQUFLLEVBQ1AsYUFBYSxFQUNiLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRXhDLElBQUksV0FBVyxFQUFFO1lBQ2YsS0FBSyxHQUFHLGdCQUFnQixDQUFDO1lBQ3pCLGFBQWEsR0FBRyxxQkFBcUIsQ0FBQztZQUN0QyxNQUFNLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2xDO2FBQU0sSUFBSSxlQUFlLEVBQUU7WUFDMUIsS0FBSyxHQUFHLG1CQUFtQixDQUFDO1lBQzVCLGFBQWEsR0FBRyx3QkFBd0IsQ0FBQztZQUN6QyxNQUFNLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDckM7YUFBTTtZQUNMLEtBQUssR0FBRyxjQUFjLENBQUM7WUFDdkIsYUFBYSxHQUFHLGlCQUFpQixDQUFDO1NBQ25DLENBQUMsdUNBQXVDO1FBRXpDLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztRQUV2QixLQUFLLE1BQU0sQ0FBQyxJQUFJLEtBQUssRUFBRTtZQUNyQixNQUFNLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDbkIsVUFBVSxHQUFHLElBQUksQ0FBQzthQUNuQjtpQkFBTSxJQUFJLFVBQVUsRUFBRTtnQkFDckIsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsQztpQkFBTTtnQkFDTCxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNCO1NBQ0YsQ0FBQyw0Q0FBNEM7UUFFOUMsTUFBTSxrQkFBa0IsR0FBRyxXQUFXO1lBQ2xDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUM7WUFDaEMsQ0FBQyxDQUFDLGVBQWU7Z0JBQ2pCLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUM7Z0JBQ25DLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsRUFDdkMsT0FBTyxHQUFHLGtCQUFrQixJQUFJLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWpFLElBQUksT0FBTyxFQUFFO1lBQ1gsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2xDLENBQUMsMEJBQTBCO1FBRTVCLE1BQU0sU0FBUyxHQUFHLFdBQVc7WUFDekIsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7WUFDN0IsQ0FBQyxDQUFDLGVBQWU7Z0JBQ2pCLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxVQUFVLEVBQ2QsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLEVBQ3BFLElBQUksR0FBRyxJQUFJLFFBQVEsQ0FBQztZQUNsQixFQUFFLEVBQUUsT0FBTztZQUNYLElBQUksRUFBRSxTQUFTO1lBQ2YsQ0FBQyxFQUFFLFdBQVc7WUFDZCxHQUFHO1NBQ0osQ0FBQyxDQUFDLENBQUMsbURBQW1EO1FBRXpELElBQUksVUFBVSxDQUFDLE9BQU8sSUFBSSxjQUFjLElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3hFLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FDckIsb0JBQW9CLEVBQ3BCLHVDQUNFLFVBQVUsQ0FBQyxPQUNiLGtCQUFrQixJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDakMsQ0FBQztTQUNIO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBRUgsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxHQUFHLEVBQUU7UUFDNUIsTUFBTSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsT0FBTyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFFSCxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLEdBQUcsRUFBRTtRQUNoQyxNQUFNLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELE9BQU8sbUJBQW1CLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUVILE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksR0FBRyxFQUFFO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLE9BQU8sbUJBQW1CLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBRUgsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksR0FBRyxFQUFFO1FBQ3BDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN6QyxNQUFNLElBQUksb0JBQW9CLENBQzVCLGtEQUFrRCxDQUNuRCxDQUFDO1NBQ0g7UUFFRCxNQUFNLEVBQUUsTUFBTSxHQUFHLElBQUksRUFBRSxlQUFlLEdBQUcsSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUNwRCxXQUFXLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUM1QixNQUFNO1lBQ04sZUFBZTtZQUNmLFdBQVcsRUFBRSxJQUFJO1NBQ2xCLENBQUMsRUFDRixDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLEdBQUcsZUFBZSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFeEUsSUFBSSxPQUFPLEVBQUU7WUFDWCxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbEM7YUFBTTtZQUNMLE9BQU8sbUJBQW1CLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsVUFBVSxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMzRTtJQUNILENBQUM7SUFFRDs7T0FFRztJQUVILE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEdBQUcsRUFBRTtRQUNwQyxPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFFSCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLEdBQUcsRUFBRTtRQUM1QixNQUFNLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxPQUFPLG1CQUFtQixDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFFSCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxXQUFXLEdBQUcsSUFBSTtRQUN2QyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsTUFBTSxJQUFJLG9CQUFvQixDQUM1QixrREFBa0QsQ0FDbkQsQ0FBQztTQUNIO1FBRUQsTUFBTSxPQUFPLEdBQ1gsTUFBTSxZQUFZLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFeEUsSUFBSSxRQUFRLENBQUMsY0FBYyxFQUFFO1lBQzNCLE1BQU0sSUFBSSxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN6QzthQUFNO1lBQ0wsT0FBTyxJQUFJLFFBQVEsQ0FBQztnQkFDbEIsT0FBTzthQUNSLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFFSCxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsZUFBZSxDQUFDLElBQUksS0FBSyxDQUFDO0lBQzNDLENBQUMsQ0FBQyxPQUFPO0lBRVQ7Ozs7T0FJRztJQUVILE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTO1FBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN6QyxNQUFNLElBQUksb0JBQW9CLENBQUMseUNBQXlDLENBQUMsQ0FBQztTQUMzRTtRQUVELE9BQU8sTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7O09BSUc7SUFFSCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUztRQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDekMsTUFBTSxJQUFJLG9CQUFvQixDQUFDLHlDQUF5QyxDQUFDLENBQUM7U0FDM0U7UUFFRCxPQUFPLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQyxPQUFPO0lBRVQ7Ozs7OztPQU1HO0lBRUgsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxHQUFHLEVBQUU7UUFDOUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxJQUFJLEVBQUUsZUFBZSxHQUFHLElBQUksRUFBRSxHQUFHLE9BQU8sRUFDdkQsV0FBVyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDNUIsTUFBTTtZQUNOLGVBQWU7WUFDZixXQUFXLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUM7UUFDTCxPQUFPLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVEOztPQUVHO0lBRUgsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxHQUFHLEVBQUU7UUFDOUMsT0FBTyxRQUFRLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4RCxDQUFDLENBQUMsaUJBQWlCO0lBRW5COzs7Ozs7T0FNRztJQUVILEdBQUcsQ0FBQyxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBRUgsa0JBQWtCLENBQUMsSUFBSSxHQUFHLEVBQUU7UUFDMUIsTUFBTSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FDNUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQ3BCLElBQUksQ0FDTCxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixPQUFPO1lBQ0wsTUFBTTtZQUNOLGVBQWU7WUFDZixjQUFjLEVBQUUsUUFBUTtTQUN6QixDQUFDO0lBQ0osQ0FBQyxDQUFDLFlBQVk7SUFFZDs7Ozs7OztPQU9HO0lBRUgsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLEVBQUU7UUFDekIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOzs7OztPQUtHO0lBRUgsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBRUgsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLGFBQWEsR0FBRyxLQUFLLEVBQUUsZ0JBQWdCLEdBQUcsS0FBSyxFQUFFLEdBQUcsRUFBRTtRQUNwRSxJQUFJLEdBQUcsYUFBYSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFakQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMxQixPQUFPLElBQUksQ0FBQztTQUNiO2FBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDeEIsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2hEO2FBQU07WUFDTCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBRXBCLElBQUksYUFBYSxJQUFJLGdCQUFnQixFQUFFO2dCQUNyQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDekMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM5QixDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzdDO1lBRUQsT0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFO2dCQUNuQixFQUFFLEVBQUUsS0FBSztnQkFDVCxJQUFJO2FBQ0wsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFFSCxXQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUU7UUFDMUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDekIsTUFBTTtZQUNOLGVBQWU7WUFDZixjQUFjO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ25CLEdBQUc7U0FDSixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFFSCxTQUFTLENBQUMsTUFBTTtRQUNkLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUN0QixNQUFNO1NBQ1AsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUVILEdBQUcsQ0FBQyxNQUFNO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDL0IsTUFBTSxVQUFVLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxDQUFDLEVBQzNELGdCQUFnQixHQUNkLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDakMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztZQUNuQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsSUFBSSxLQUFLLENBQUM7UUFFVixJQUFJLGdCQUFnQixFQUFFO1lBQ3BCLEtBQUssR0FBRyxlQUFlLENBQ3JCLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FDbkQsQ0FBQztTQUNIO2FBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDM0MsS0FBSyxHQUFHLGtCQUFrQixDQUN4QixNQUFNLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FDdEQsQ0FBQztTQUNIO2FBQU07WUFDTCxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxnRUFBZ0U7WUFDcEgsc0NBQXNDO1lBRXRDLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDL0IsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdkU7U0FDRjtRQUVELE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDbkIsRUFBRTtZQUNGLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBRUgsSUFBSSxDQUFDLFFBQVE7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPLElBQUksQ0FBQztRQUMvQixNQUFNLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUVILEtBQUssQ0FBQyxRQUFRO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDL0IsTUFBTSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEQsT0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFFSCxPQUFPLENBQUMsSUFBSTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFDVixjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoRCxRQUFRLGNBQWMsRUFBRTtZQUN0QixLQUFLLE9BQU87Z0JBQ1YsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZCxnQkFBZ0I7WUFFaEIsS0FBSyxVQUFVLENBQUM7WUFDaEIsS0FBSyxRQUFRO2dCQUNYLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ1osZ0JBQWdCO1lBRWhCLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxNQUFNO2dCQUNULENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQ2IsZ0JBQWdCO1lBRWhCLEtBQUssT0FBTztnQkFDVixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNmLGdCQUFnQjtZQUVoQixLQUFLLFNBQVM7Z0JBQ1osQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDZixnQkFBZ0I7WUFFaEIsS0FBSyxTQUFTO2dCQUNaLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQixNQUFNO1lBQ1IscURBQXFEO1NBQ3REO1FBRUQsSUFBSSxjQUFjLEtBQUssT0FBTyxFQUFFO1lBQzlCLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1NBQ2Y7UUFFRCxJQUFJLGNBQWMsS0FBSyxVQUFVLEVBQUU7WUFDakMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMzQjtRQUVELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFFSCxLQUFLLENBQUMsSUFBSTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU87WUFDakIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ1IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2FBQ1YsQ0FBQztpQkFDQyxPQUFPLENBQUMsSUFBSSxDQUFDO2lCQUNiLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDYixDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ1gsQ0FBQyxDQUFDLFNBQVM7SUFFWDs7Ozs7Ozs7Ozs7O09BWUc7SUFFSCxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksR0FBRyxFQUFFO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLE9BQU87WUFDakIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FDckUsSUFBSSxFQUNKLEdBQUcsQ0FDSjtZQUNILENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUVILGNBQWMsQ0FBQyxJQUFJLEdBQUcsVUFBVTtRQUM5QixPQUFPLElBQUksQ0FBQyxPQUFPO1lBQ2pCLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7WUFDbkUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBRUgsYUFBYSxDQUFDLElBQUksR0FBRyxFQUFFO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLE9BQU87WUFDakIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1lBQ3hFLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDVCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBRUgsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUVILFNBQVMsQ0FBQyxFQUFFLE1BQU0sR0FBRyxVQUFVLEVBQUUsR0FBRyxFQUFFO1FBQ3BDLElBQUksR0FBRyxHQUFHLE1BQU0sS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1FBRXpELElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEVBQUU7WUFDcEIsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7U0FDakI7UUFFRCxPQUFPLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7O09BSUc7SUFFSCxhQUFhO1FBQ1gsT0FBTyxZQUFZLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUVILFNBQVMsQ0FBQyxFQUNSLG9CQUFvQixHQUFHLEtBQUssRUFDNUIsZUFBZSxHQUFHLEtBQUssRUFDdkIsYUFBYSxHQUFHLElBQUksRUFDcEIsTUFBTSxHQUFHLFVBQVUsR0FDcEIsR0FBRyxFQUFFO1FBQ0osT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUU7WUFDNUIsZUFBZTtZQUNmLG9CQUFvQjtZQUNwQixhQUFhO1lBQ2IsTUFBTTtTQUNQLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUVILFNBQVM7UUFDUCxPQUFPLFlBQVksQ0FBQyxJQUFJLEVBQUUsK0JBQStCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFFSCxNQUFNO1FBQ0osT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLGlDQUFpQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7O09BSUc7SUFFSCxTQUFTO1FBQ1AsT0FBTyxZQUFZLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBRUgsU0FBUyxDQUFDLEVBQUUsYUFBYSxHQUFHLElBQUksRUFBRSxXQUFXLEdBQUcsS0FBSyxFQUFFLEdBQUcsRUFBRTtRQUMxRCxPQUFPLGdCQUFnQixDQUFDLElBQUksRUFBRTtZQUM1QixhQUFhO1lBQ2IsV0FBVztZQUNYLFNBQVMsRUFBRSxJQUFJO1NBQ2hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBRUgsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7O09BR0c7SUFFSCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7OztPQUdHO0lBRUgsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7O09BR0c7SUFFSCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7T0FHRztJQUVILFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7T0FHRztJQUVILE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQ7OztPQUdHO0lBRUgsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFFSCxRQUFRLENBQUMsSUFBSSxHQUFHLEVBQUU7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDN0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDMUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztZQUNoRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO1NBQy9CO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7OztPQUdHO0lBRUgsUUFBUTtRQUNOLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEQsQ0FBQyxDQUFDLFVBQVU7SUFFWjs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUVILElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxHQUFHLGNBQWMsRUFBRSxJQUFJLEdBQUcsRUFBRTtRQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDM0MsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUNyQixJQUFJLENBQUMsT0FBTyxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQ3JDLHdDQUF3QyxDQUN6QyxDQUFDO1NBQ0g7UUFFRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUMzQjtZQUNFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7U0FDdEMsRUFDRCxJQUFJLENBQ0wsQ0FBQztRQUNGLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUN4RCxZQUFZLEdBQUcsYUFBYSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFDdkQsT0FBTyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQzdDLEtBQUssR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUMzQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELE9BQU8sWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNqRCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUVILE9BQU8sQ0FBQyxJQUFJLEdBQUcsY0FBYyxFQUFFLElBQUksR0FBRyxFQUFFO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7OztPQUlHO0lBRUgsS0FBSyxDQUFDLGFBQWE7UUFDakIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzNFLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFFSCxPQUFPLENBQUMsYUFBYSxFQUFFLElBQUk7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFaEMsSUFBSSxJQUFJLEtBQUssYUFBYSxFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNuRDthQUFNO1lBQ0wsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDckU7SUFDSCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBRUgsTUFBTSxDQUFDLEtBQUs7UUFDVixPQUFPLENBQ0wsSUFBSSxDQUFDLE9BQU87WUFDWixLQUFLLENBQUMsT0FBTztZQUNiLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUMzQixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUVILFVBQVUsQ0FBQyxPQUFPLEdBQUcsRUFBRTtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPLElBQUksQ0FBQztRQUMvQixNQUFNLElBQUksR0FDTixPQUFPLENBQUMsSUFBSTtZQUNaLFFBQVEsQ0FBQyxVQUFVLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTthQUNoQixDQUFDLEVBQ0osT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPO1lBQ3ZCLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSTtnQkFDWCxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTztnQkFDbEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPO1lBQ25CLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDUixPQUFPLFlBQVksQ0FDakIsSUFBSSxFQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQ2xCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ3JCLE9BQU8sRUFBRSxRQUFRO1lBQ2pCLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDO1NBQ2xFLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUVILGtCQUFrQixDQUFDLE9BQU8sR0FBRyxFQUFFO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQy9CLE9BQU8sWUFBWSxDQUNqQixPQUFPLENBQUMsSUFBSTtZQUNWLFFBQVEsQ0FBQyxVQUFVLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTthQUNoQixDQUFDLEVBQ0osSUFBSSxFQUNKLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ3JCLE9BQU8sRUFBRSxNQUFNO1lBQ2YsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7WUFDbEMsU0FBUyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRDs7R0FFRztBQUVILFNBQVMsZ0JBQWdCLENBQUMsV0FBVztJQUNuQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDcEMsT0FBTyxXQUFXLENBQUM7S0FDcEI7U0FBTSxJQUNMLFdBQVc7UUFDWCxXQUFXLENBQUMsT0FBTztRQUNuQixRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQy9CO1FBQ0EsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ3pDO1NBQU0sSUFBSSxXQUFXLElBQUksT0FBTyxXQUFXLEtBQUssUUFBUSxFQUFFO1FBQ3pELE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUN6QztTQUFNO1FBQ0wsTUFBTSxJQUFJLG9CQUFvQixDQUM1Qiw4QkFBOEIsV0FBVyxhQUFhLE9BQU8sV0FBVyxFQUFFLENBQzNFLENBQUM7S0FDSDtBQUNILENBQUM7QUFFRCxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7QUFDcEIsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO0FBQ3BCLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQztBQUMzQixPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7QUFDcEIsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0FBQ2hCLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQztBQUNwQixPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQztBQUNwQixPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxpQ0FBaUM7QUFFbEQsZUFBZSxJQUFJLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgX2V4cCA9IHt9O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KF9leHAsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZSxcbn0pOyAvLyB0aGVzZSBhcmVuJ3QgcmVhbGx5IHByaXZhdGUsIGJ1dCBub3IgYXJlIHRoZXkgcmVhbGx5IHVzZWZ1bCB0byBkb2N1bWVudFxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuY2xhc3MgTHV4b25FcnJvciBleHRlbmRzIEVycm9yIHt9XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuXG5jbGFzcyBJbnZhbGlkRGF0ZVRpbWVFcnJvciBleHRlbmRzIEx1eG9uRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihyZWFzb24pIHtcbiAgICBzdXBlcihgSW52YWxpZCBEYXRlVGltZTogJHtyZWFzb24udG9NZXNzYWdlKCl9YCk7XG4gIH1cbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5cbmNsYXNzIEludmFsaWRJbnRlcnZhbEVycm9yIGV4dGVuZHMgTHV4b25FcnJvciB7XG4gIGNvbnN0cnVjdG9yKHJlYXNvbikge1xuICAgIHN1cGVyKGBJbnZhbGlkIEludGVydmFsOiAke3JlYXNvbi50b01lc3NhZ2UoKX1gKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuY2xhc3MgSW52YWxpZER1cmF0aW9uRXJyb3IgZXh0ZW5kcyBMdXhvbkVycm9yIHtcbiAgY29uc3RydWN0b3IocmVhc29uKSB7XG4gICAgc3VwZXIoYEludmFsaWQgRHVyYXRpb246ICR7cmVhc29uLnRvTWVzc2FnZSgpfWApO1xuICB9XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuXG5jbGFzcyBDb25mbGljdGluZ1NwZWNpZmljYXRpb25FcnJvciBleHRlbmRzIEx1eG9uRXJyb3Ige31cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5cbmNsYXNzIEludmFsaWRVbml0RXJyb3IgZXh0ZW5kcyBMdXhvbkVycm9yIHtcbiAgY29uc3RydWN0b3IodW5pdCkge1xuICAgIHN1cGVyKGBJbnZhbGlkIHVuaXQgJHt1bml0fWApO1xuICB9XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuXG5jbGFzcyBJbnZhbGlkQXJndW1lbnRFcnJvciBleHRlbmRzIEx1eG9uRXJyb3Ige31cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5cbmNsYXNzIFpvbmVJc0Fic3RyYWN0RXJyb3IgZXh0ZW5kcyBMdXhvbkVycm9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoJ1pvbmUgaXMgYW4gYWJzdHJhY3QgY2xhc3MnKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuY29uc3QgbiA9ICdudW1lcmljJyxcbiAgcyA9ICdzaG9ydCcsXG4gIGwgPSAnbG9uZyc7XG5jb25zdCBEQVRFX1NIT1JUID0ge1xuICB5ZWFyOiBuLFxuICBtb250aDogbixcbiAgZGF5OiBuLFxufTtcbmNvbnN0IERBVEVfTUVEID0ge1xuICB5ZWFyOiBuLFxuICBtb250aDogcyxcbiAgZGF5OiBuLFxufTtcbmNvbnN0IERBVEVfRlVMTCA9IHtcbiAgeWVhcjogbixcbiAgbW9udGg6IGwsXG4gIGRheTogbixcbn07XG5jb25zdCBEQVRFX0hVR0UgPSB7XG4gIHllYXI6IG4sXG4gIG1vbnRoOiBsLFxuICBkYXk6IG4sXG4gIHdlZWtkYXk6IGwsXG59O1xuY29uc3QgVElNRV9TSU1QTEUgPSB7XG4gIGhvdXI6IG4sXG4gIG1pbnV0ZTogbixcbn07XG5jb25zdCBUSU1FX1dJVEhfU0VDT05EUyA9IHtcbiAgaG91cjogbixcbiAgbWludXRlOiBuLFxuICBzZWNvbmQ6IG4sXG59O1xuY29uc3QgVElNRV9XSVRIX1NIT1JUX09GRlNFVCA9IHtcbiAgaG91cjogbixcbiAgbWludXRlOiBuLFxuICBzZWNvbmQ6IG4sXG4gIHRpbWVab25lTmFtZTogcyxcbn07XG5jb25zdCBUSU1FX1dJVEhfTE9OR19PRkZTRVQgPSB7XG4gIGhvdXI6IG4sXG4gIG1pbnV0ZTogbixcbiAgc2Vjb25kOiBuLFxuICB0aW1lWm9uZU5hbWU6IGwsXG59O1xuY29uc3QgVElNRV8yNF9TSU1QTEUgPSB7XG4gIGhvdXI6IG4sXG4gIG1pbnV0ZTogbixcbiAgaG91cjEyOiBmYWxzZSxcbn07XG4vKipcbiAqIHtAbGluayB0b0xvY2FsZVN0cmluZ307IGZvcm1hdCBsaWtlICcwOTozMDoyMycsIGFsd2F5cyAyNC1ob3VyLlxuICovXG5cbmNvbnN0IFRJTUVfMjRfV0lUSF9TRUNPTkRTID0ge1xuICBob3VyOiBuLFxuICBtaW51dGU6IG4sXG4gIHNlY29uZDogbixcbiAgaG91cjEyOiBmYWxzZSxcbn07XG4vKipcbiAqIHtAbGluayB0b0xvY2FsZVN0cmluZ307IGZvcm1hdCBsaWtlICcwOTozMDoyMyBFRFQnLCBhbHdheXMgMjQtaG91ci5cbiAqL1xuXG5jb25zdCBUSU1FXzI0X1dJVEhfU0hPUlRfT0ZGU0VUID0ge1xuICBob3VyOiBuLFxuICBtaW51dGU6IG4sXG4gIHNlY29uZDogbixcbiAgaG91cjEyOiBmYWxzZSxcbiAgdGltZVpvbmVOYW1lOiBzLFxufTtcbi8qKlxuICoge0BsaW5rIHRvTG9jYWxlU3RyaW5nfTsgZm9ybWF0IGxpa2UgJzA5OjMwOjIzIEVhc3Rlcm4gRGF5bGlnaHQgVGltZScsIGFsd2F5cyAyNC1ob3VyLlxuICovXG5cbmNvbnN0IFRJTUVfMjRfV0lUSF9MT05HX09GRlNFVCA9IHtcbiAgaG91cjogbixcbiAgbWludXRlOiBuLFxuICBzZWNvbmQ6IG4sXG4gIGhvdXIxMjogZmFsc2UsXG4gIHRpbWVab25lTmFtZTogbCxcbn07XG4vKipcbiAqIHtAbGluayB0b0xvY2FsZVN0cmluZ307IGZvcm1hdCBsaWtlICcxMC8xNC8xOTgzLCA5OjMwIEFNJy4gT25seSAxMi1ob3VyIGlmIHRoZSBsb2NhbGUgaXMuXG4gKi9cblxuY29uc3QgREFURVRJTUVfU0hPUlQgPSB7XG4gIHllYXI6IG4sXG4gIG1vbnRoOiBuLFxuICBkYXk6IG4sXG4gIGhvdXI6IG4sXG4gIG1pbnV0ZTogbixcbn07XG4vKipcbiAqIHtAbGluayB0b0xvY2FsZVN0cmluZ307IGZvcm1hdCBsaWtlICcxMC8xNC8xOTgzLCA5OjMwOjMzIEFNJy4gT25seSAxMi1ob3VyIGlmIHRoZSBsb2NhbGUgaXMuXG4gKi9cblxuY29uc3QgREFURVRJTUVfU0hPUlRfV0lUSF9TRUNPTkRTID0ge1xuICB5ZWFyOiBuLFxuICBtb250aDogbixcbiAgZGF5OiBuLFxuICBob3VyOiBuLFxuICBtaW51dGU6IG4sXG4gIHNlY29uZDogbixcbn07XG5jb25zdCBEQVRFVElNRV9NRUQgPSB7XG4gIHllYXI6IG4sXG4gIG1vbnRoOiBzLFxuICBkYXk6IG4sXG4gIGhvdXI6IG4sXG4gIG1pbnV0ZTogbixcbn07XG5jb25zdCBEQVRFVElNRV9NRURfV0lUSF9TRUNPTkRTID0ge1xuICB5ZWFyOiBuLFxuICBtb250aDogcyxcbiAgZGF5OiBuLFxuICBob3VyOiBuLFxuICBtaW51dGU6IG4sXG4gIHNlY29uZDogbixcbn07XG5jb25zdCBEQVRFVElNRV9NRURfV0lUSF9XRUVLREFZID0ge1xuICB5ZWFyOiBuLFxuICBtb250aDogcyxcbiAgZGF5OiBuLFxuICB3ZWVrZGF5OiBzLFxuICBob3VyOiBuLFxuICBtaW51dGU6IG4sXG59O1xuY29uc3QgREFURVRJTUVfRlVMTCA9IHtcbiAgeWVhcjogbixcbiAgbW9udGg6IGwsXG4gIGRheTogbixcbiAgaG91cjogbixcbiAgbWludXRlOiBuLFxuICB0aW1lWm9uZU5hbWU6IHMsXG59O1xuY29uc3QgREFURVRJTUVfRlVMTF9XSVRIX1NFQ09ORFMgPSB7XG4gIHllYXI6IG4sXG4gIG1vbnRoOiBsLFxuICBkYXk6IG4sXG4gIGhvdXI6IG4sXG4gIG1pbnV0ZTogbixcbiAgc2Vjb25kOiBuLFxuICB0aW1lWm9uZU5hbWU6IHMsXG59O1xuY29uc3QgREFURVRJTUVfSFVHRSA9IHtcbiAgeWVhcjogbixcbiAgbW9udGg6IGwsXG4gIGRheTogbixcbiAgd2Vla2RheTogbCxcbiAgaG91cjogbixcbiAgbWludXRlOiBuLFxuICB0aW1lWm9uZU5hbWU6IGwsXG59O1xuY29uc3QgREFURVRJTUVfSFVHRV9XSVRIX1NFQ09ORFMgPSB7XG4gIHllYXI6IG4sXG4gIG1vbnRoOiBsLFxuICBkYXk6IG4sXG4gIHdlZWtkYXk6IGwsXG4gIGhvdXI6IG4sXG4gIG1pbnV0ZTogbixcbiAgc2Vjb25kOiBuLFxuICB0aW1lWm9uZU5hbWU6IGwsXG59O1xuXG4vKlxuICBUaGlzIGlzIGp1c3QgYSBqdW5rIGRyYXdlciwgY29udGFpbmluZyBhbnl0aGluZyB1c2VkIGFjcm9zcyBtdWx0aXBsZSBjbGFzc2VzLlxuICBCZWNhdXNlIEx1eG9uIGlzIHNtYWxsKGlzaCksIHRoaXMgc2hvdWxkIHN0YXkgc21hbGwgYW5kIHdlIHdvbid0IHdvcnJ5IGFib3V0IHNwbGl0dGluZ1xuICBpdCB1cCBpbnRvLCBzYXksIHBhcnNpbmdVdGlsLmpzIGFuZCBiYXNpY1V0aWwuanMgYW5kIHNvIG9uLiBCdXQgdGhleSBhcmUgZGl2aWRlZCB1cCBieSBmZWF0dXJlIGFyZWEuXG4qL1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbi8vIFRZUEVTXG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvID09PSAndW5kZWZpbmVkJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIobykge1xuICByZXR1cm4gdHlwZW9mIG8gPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc0ludGVnZXIobykge1xuICByZXR1cm4gdHlwZW9mIG8gPT09ICdudW1iZXInICYmIG8gJSAxID09PSAwO1xufVxuXG5mdW5jdGlvbiBpc1N0cmluZyhvKSB7XG4gIHJldHVybiB0eXBlb2YgbyA9PT0gJ3N0cmluZyc7XG59XG5cbmZ1bmN0aW9uIGlzRGF0ZShvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykgPT09ICdbb2JqZWN0IERhdGVdJztcbn0gLy8gQ0FQQUJJTElUSUVTXG5cbmZ1bmN0aW9uIGhhc0ludGwoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHR5cGVvZiBJbnRsICE9PSAndW5kZWZpbmVkJyAmJiBJbnRsLkRhdGVUaW1lRm9ybWF0O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhc0Zvcm1hdFRvUGFydHMoKSB7XG4gIHJldHVybiAhaXNVbmRlZmluZWQoSW50bC5EYXRlVGltZUZvcm1hdC5wcm90b3R5cGUuZm9ybWF0VG9QYXJ0cyk7XG59XG5cbmZ1bmN0aW9uIGhhc1JlbGF0aXZlKCkge1xuICB0cnkge1xuICAgIHJldHVybiB0eXBlb2YgSW50bCAhPT0gJ3VuZGVmaW5lZCcgJiYgISFJbnRsLlJlbGF0aXZlVGltZUZvcm1hdDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufSAvLyBPQkpFQ1RTIEFORCBBUlJBWVNcblxuZnVuY3Rpb24gbWF5YmVBcnJheSh0aGluZykge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheSh0aGluZykgPyB0aGluZyA6IFt0aGluZ107XG59XG5cbmZ1bmN0aW9uIGJlc3RCeShhcnIsIGJ5LCBjb21wYXJlKSB7XG4gIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiBhcnIucmVkdWNlKChiZXN0LCBuZXh0KSA9PiB7XG4gICAgY29uc3QgcGFpciA9IFtieShuZXh0KSwgbmV4dF07XG5cbiAgICBpZiAoIWJlc3QpIHtcbiAgICAgIHJldHVybiBwYWlyO1xuICAgIH0gZWxzZSBpZiAoY29tcGFyZShiZXN0WzBdLCBwYWlyWzBdKSA9PT0gYmVzdFswXSkge1xuICAgICAgcmV0dXJuIGJlc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwYWlyO1xuICAgIH1cbiAgfSwgbnVsbClbMV07XG59XG5cbmZ1bmN0aW9uIHBpY2sob2JqLCBrZXlzKSB7XG4gIHJldHVybiBrZXlzLnJlZHVjZSgoYSwgaykgPT4ge1xuICAgIGFba10gPSBvYmpba107XG4gICAgcmV0dXJuIGE7XG4gIH0sIHt9KTtcbn1cblxuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn0gLy8gTlVNQkVSUyBBTkQgU1RSSU5HU1xuXG5mdW5jdGlvbiBpbnRlZ2VyQmV0d2Vlbih0aGluZywgYm90dG9tLCB0b3ApIHtcbiAgcmV0dXJuIGlzSW50ZWdlcih0aGluZykgJiYgdGhpbmcgPj0gYm90dG9tICYmIHRoaW5nIDw9IHRvcDtcbn0gLy8geCAlIG4gYnV0IHRha2VzIHRoZSBzaWduIG9mIG4gaW5zdGVhZCBvZiB4XG5cbmZ1bmN0aW9uIGZsb29yTW9kKHgsIG4pIHtcbiAgcmV0dXJuIHggLSBuICogTWF0aC5mbG9vcih4IC8gbik7XG59XG5cbmZ1bmN0aW9uIHBhZFN0YXJ0KGlucHV0LCBuID0gMikge1xuICBpZiAoaW5wdXQudG9TdHJpbmcoKS5sZW5ndGggPCBuKSB7XG4gICAgcmV0dXJuICgnMCcucmVwZWF0KG4pICsgaW5wdXQpLnNsaWNlKC1uKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaW5wdXQudG9TdHJpbmcoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZUludGVnZXIoc3RyaW5nKSB7XG4gIGlmIChpc1VuZGVmaW5lZChzdHJpbmcpIHx8IHN0cmluZyA9PT0gbnVsbCB8fCBzdHJpbmcgPT09ICcnKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoc3RyaW5nLCAxMCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VNaWxsaXMoZnJhY3Rpb24pIHtcbiAgLy8gUmV0dXJuIHVuZGVmaW5lZCAoaW5zdGVhZCBvZiAwKSBpbiB0aGVzZSBjYXNlcywgd2hlcmUgZnJhY3Rpb24gaXMgbm90IHNldFxuICBpZiAoaXNVbmRlZmluZWQoZnJhY3Rpb24pIHx8IGZyYWN0aW9uID09PSBudWxsIHx8IGZyYWN0aW9uID09PSAnJykge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZiA9IHBhcnNlRmxvYXQoJzAuJyArIGZyYWN0aW9uKSAqIDEwMDA7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoZik7XG4gIH1cbn1cblxuZnVuY3Rpb24gcm91bmRUbyhudW1iZXIsIGRpZ2l0cywgdG93YXJkWmVybyA9IGZhbHNlKSB7XG4gIGNvbnN0IGZhY3RvciA9IE1hdGgucG93KDEwLCBkaWdpdHMpLFxuICAgIHJvdW5kZXIgPSB0b3dhcmRaZXJvID8gTWF0aC50cnVuYyA6IE1hdGgucm91bmQ7XG4gIHJldHVybiByb3VuZGVyKG51bWJlciAqIGZhY3RvcikgLyBmYWN0b3I7XG59IC8vIERBVEUgQkFTSUNTXG5cbmZ1bmN0aW9uIGlzTGVhcFllYXIoeWVhcikge1xuICByZXR1cm4geWVhciAlIDQgPT09IDAgJiYgKHllYXIgJSAxMDAgIT09IDAgfHwgeWVhciAlIDQwMCA9PT0gMCk7XG59XG5cbmZ1bmN0aW9uIGRheXNJblllYXIoeWVhcikge1xuICByZXR1cm4gaXNMZWFwWWVhcih5ZWFyKSA/IDM2NiA6IDM2NTtcbn1cblxuZnVuY3Rpb24gZGF5c0luTW9udGgoeWVhciwgbW9udGgpIHtcbiAgY29uc3QgbW9kTW9udGggPSBmbG9vck1vZChtb250aCAtIDEsIDEyKSArIDEsXG4gICAgbW9kWWVhciA9IHllYXIgKyAobW9udGggLSBtb2RNb250aCkgLyAxMjtcblxuICBpZiAobW9kTW9udGggPT09IDIpIHtcbiAgICByZXR1cm4gaXNMZWFwWWVhcihtb2RZZWFyKSA/IDI5IDogMjg7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFszMSwgbnVsbCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdW21vZE1vbnRoIC0gMV07XG4gIH1cbn0gLy8gY292ZXJ0IGEgY2FsZW5kYXIgb2JqZWN0IHRvIGEgbG9jYWwgdGltZXN0YW1wIChlcG9jaCwgYnV0IHdpdGggdGhlIG9mZnNldCBiYWtlZCBpbilcblxuZnVuY3Rpb24gb2JqVG9Mb2NhbFRTKG9iaikge1xuICBsZXQgZCA9IERhdGUuVVRDKFxuICAgIG9iai55ZWFyLFxuICAgIG9iai5tb250aCAtIDEsXG4gICAgb2JqLmRheSxcbiAgICBvYmouaG91cixcbiAgICBvYmoubWludXRlLFxuICAgIG9iai5zZWNvbmQsXG4gICAgb2JqLm1pbGxpc2Vjb25kLFxuICApOyAvLyBmb3IgbGVnYWN5IHJlYXNvbnMsIHllYXJzIGJldHdlZW4gMCBhbmQgOTkgYXJlIGludGVycHJldGVkIGFzIDE5WFg7IHJldmVydCB0aGF0XG5cbiAgaWYgKG9iai55ZWFyIDwgMTAwICYmIG9iai55ZWFyID49IDApIHtcbiAgICBkID0gbmV3IERhdGUoZCk7XG4gICAgZC5zZXRVVENGdWxsWWVhcihkLmdldFVUQ0Z1bGxZZWFyKCkgLSAxOTAwKTtcbiAgfVxuXG4gIHJldHVybiArZDtcbn1cblxuZnVuY3Rpb24gd2Vla3NJbldlZWtZZWFyKHdlZWtZZWFyKSB7XG4gIGNvbnN0IHAxID1cbiAgICAgICh3ZWVrWWVhciArXG4gICAgICAgIE1hdGguZmxvb3Iod2Vla1llYXIgLyA0KSAtXG4gICAgICAgIE1hdGguZmxvb3Iod2Vla1llYXIgLyAxMDApICtcbiAgICAgICAgTWF0aC5mbG9vcih3ZWVrWWVhciAvIDQwMCkpICVcbiAgICAgIDcsXG4gICAgbGFzdCA9IHdlZWtZZWFyIC0gMSxcbiAgICBwMiA9XG4gICAgICAobGFzdCArXG4gICAgICAgIE1hdGguZmxvb3IobGFzdCAvIDQpIC1cbiAgICAgICAgTWF0aC5mbG9vcihsYXN0IC8gMTAwKSArXG4gICAgICAgIE1hdGguZmxvb3IobGFzdCAvIDQwMCkpICVcbiAgICAgIDc7XG4gIHJldHVybiBwMSA9PT0gNCB8fCBwMiA9PT0gMyA/IDUzIDogNTI7XG59XG5cbmZ1bmN0aW9uIHVudHJ1bmNhdGVZZWFyKHllYXIpIHtcbiAgaWYgKHllYXIgPiA5OSkge1xuICAgIHJldHVybiB5ZWFyO1xuICB9IGVsc2UgcmV0dXJuIHllYXIgPiA2MCA/IDE5MDAgKyB5ZWFyIDogMjAwMCArIHllYXI7XG59IC8vIFBBUlNJTkdcblxuZnVuY3Rpb24gcGFyc2Vab25lSW5mbyh0cywgb2Zmc2V0Rm9ybWF0LCBsb2NhbGUsIHRpbWVab25lID0gbnVsbCkge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUodHMpLFxuICAgIGludGxPcHRzID0ge1xuICAgICAgaG91cjEyOiBmYWxzZSxcbiAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgIG1vbnRoOiAnMi1kaWdpdCcsXG4gICAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICAgIGhvdXI6ICcyLWRpZ2l0JyxcbiAgICAgIG1pbnV0ZTogJzItZGlnaXQnLFxuICAgIH07XG5cbiAgaWYgKHRpbWVab25lKSB7XG4gICAgaW50bE9wdHMudGltZVpvbmUgPSB0aW1lWm9uZTtcbiAgfVxuXG4gIGNvbnN0IG1vZGlmaWVkID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHtcbiAgICAgICAgdGltZVpvbmVOYW1lOiBvZmZzZXRGb3JtYXQsXG4gICAgICB9LFxuICAgICAgaW50bE9wdHMsXG4gICAgKSxcbiAgICBpbnRsID0gaGFzSW50bCgpO1xuXG4gIGlmIChpbnRsICYmIGhhc0Zvcm1hdFRvUGFydHMoKSkge1xuICAgIGNvbnN0IHBhcnNlZCA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgbW9kaWZpZWQpXG4gICAgICAuZm9ybWF0VG9QYXJ0cyhkYXRlKVxuICAgICAgLmZpbmQobSA9PiBtLnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ3RpbWV6b25lbmFtZScpO1xuICAgIHJldHVybiBwYXJzZWQgPyBwYXJzZWQudmFsdWUgOiBudWxsO1xuICB9IGVsc2UgaWYgKGludGwpIHtcbiAgICAvLyB0aGlzIHByb2JhYmx5IGRvZXNuJ3Qgd29yayBmb3IgYWxsIGxvY2FsZXNcbiAgICBjb25zdCB3aXRob3V0ID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBpbnRsT3B0cykuZm9ybWF0KGRhdGUpLFxuICAgICAgaW5jbHVkZWQgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIG1vZGlmaWVkKS5mb3JtYXQoZGF0ZSksXG4gICAgICBkaWZmZWQgPSBpbmNsdWRlZC5zdWJzdHJpbmcod2l0aG91dC5sZW5ndGgpLFxuICAgICAgdHJpbW1lZCA9IGRpZmZlZC5yZXBsYWNlKC9eWywgXFx1MjAwZV0rLywgJycpO1xuICAgIHJldHVybiB0cmltbWVkO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59IC8vIHNpZ25lZE9mZnNldCgnLTUnLCAnMzAnKSAtPiAtMzMwXG5cbmZ1bmN0aW9uIHNpZ25lZE9mZnNldChvZmZIb3VyU3RyLCBvZmZNaW51dGVTdHIpIHtcbiAgbGV0IG9mZkhvdXIgPSBwYXJzZUludChvZmZIb3VyU3RyLCAxMCk7IC8vIGRvbid0IHx8IHRoaXMgYmVjYXVzZSB3ZSB3YW50IHRvIHByZXNlcnZlIC0wXG5cbiAgaWYgKE51bWJlci5pc05hTihvZmZIb3VyKSkge1xuICAgIG9mZkhvdXIgPSAwO1xuICB9XG5cbiAgY29uc3Qgb2ZmTWluID0gcGFyc2VJbnQob2ZmTWludXRlU3RyLCAxMCkgfHwgMCxcbiAgICBvZmZNaW5TaWduZWQgPSBvZmZIb3VyIDwgMCB8fCBPYmplY3QuaXMob2ZmSG91ciwgLTApID8gLW9mZk1pbiA6IG9mZk1pbjtcbiAgcmV0dXJuIG9mZkhvdXIgKiA2MCArIG9mZk1pblNpZ25lZDtcbn0gLy8gQ09FUkNJT05cblxuZnVuY3Rpb24gYXNOdW1iZXIodmFsdWUpIHtcbiAgY29uc3QgbnVtZXJpY1ZhbHVlID0gTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nIHx8IHZhbHVlID09PSAnJyB8fCBOdW1iZXIuaXNOYU4obnVtZXJpY1ZhbHVlKSlcbiAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXJyb3IoYEludmFsaWQgdW5pdCB2YWx1ZSAke3ZhbHVlfWApO1xuICByZXR1cm4gbnVtZXJpY1ZhbHVlO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVPYmplY3Qob2JqLCBub3JtYWxpemVyLCBub25Vbml0S2V5cykge1xuICBjb25zdCBub3JtYWxpemVkID0ge307XG5cbiAgZm9yIChjb25zdCB1IGluIG9iaikge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eShvYmosIHUpKSB7XG4gICAgICBpZiAobm9uVW5pdEtleXMuaW5kZXhPZih1KSA+PSAwKSBjb250aW51ZTtcbiAgICAgIGNvbnN0IHYgPSBvYmpbdV07XG4gICAgICBpZiAodiA9PT0gdW5kZWZpbmVkIHx8IHYgPT09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgbm9ybWFsaXplZFtub3JtYWxpemVyKHUpXSA9IGFzTnVtYmVyKHYpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBub3JtYWxpemVkO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRPZmZzZXQob2Zmc2V0LCBmb3JtYXQpIHtcbiAgY29uc3QgaG91cnMgPSBNYXRoLnRydW5jKG9mZnNldCAvIDYwKSxcbiAgICBtaW51dGVzID0gTWF0aC5hYnMob2Zmc2V0ICUgNjApLFxuICAgIHNpZ24gPSBob3VycyA+PSAwICYmICFPYmplY3QuaXMoaG91cnMsIC0wKSA/ICcrJyA6ICctJyxcbiAgICBiYXNlID0gYCR7c2lnbn0ke01hdGguYWJzKGhvdXJzKX1gO1xuXG4gIHN3aXRjaCAoZm9ybWF0KSB7XG4gICAgY2FzZSAnc2hvcnQnOlxuICAgICAgcmV0dXJuIGAke3NpZ259JHtwYWRTdGFydChNYXRoLmFicyhob3VycyksIDIpfToke3BhZFN0YXJ0KG1pbnV0ZXMsIDIpfWA7XG5cbiAgICBjYXNlICduYXJyb3cnOlxuICAgICAgcmV0dXJuIG1pbnV0ZXMgPiAwID8gYCR7YmFzZX06JHttaW51dGVzfWAgOiBiYXNlO1xuXG4gICAgY2FzZSAndGVjaGllJzpcbiAgICAgIHJldHVybiBgJHtzaWdufSR7cGFkU3RhcnQoTWF0aC5hYnMoaG91cnMpLCAyKX0ke3BhZFN0YXJ0KG1pbnV0ZXMsIDIpfWA7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXG4gICAgICAgIGBWYWx1ZSBmb3JtYXQgJHtmb3JtYXR9IGlzIG91dCBvZiByYW5nZSBmb3IgcHJvcGVydHkgZm9ybWF0YCxcbiAgICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdGltZU9iamVjdChvYmopIHtcbiAgcmV0dXJuIHBpY2sob2JqLCBbJ2hvdXInLCAnbWludXRlJywgJ3NlY29uZCcsICdtaWxsaXNlY29uZCddKTtcbn1cblxuY29uc3QgaWFuYVJlZ2V4ID1cbiAgL1tBLVphLXpfKy1dezEsMjU2fSg6P1xcL1tBLVphLXpfKy1dezEsMjU2fShcXC9bQS1aYS16XystXXsxLDI1Nn0pPyk/LztcblxuZnVuY3Rpb24gc3RyaW5naWZ5KG9iaikge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCBPYmplY3Qua2V5cyhvYmopLnNvcnQoKSk7XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuXG5jb25zdCBtb250aHNMb25nID0gW1xuICAnSmFudWFyeScsXG4gICdGZWJydWFyeScsXG4gICdNYXJjaCcsXG4gICdBcHJpbCcsXG4gICdNYXknLFxuICAnSnVuZScsXG4gICdKdWx5JyxcbiAgJ0F1Z3VzdCcsXG4gICdTZXB0ZW1iZXInLFxuICAnT2N0b2JlcicsXG4gICdOb3ZlbWJlcicsXG4gICdEZWNlbWJlcicsXG5dO1xuY29uc3QgbW9udGhzU2hvcnQgPSBbXG4gICdKYW4nLFxuICAnRmViJyxcbiAgJ01hcicsXG4gICdBcHInLFxuICAnTWF5JyxcbiAgJ0p1bicsXG4gICdKdWwnLFxuICAnQXVnJyxcbiAgJ1NlcCcsXG4gICdPY3QnLFxuICAnTm92JyxcbiAgJ0RlYycsXG5dO1xuY29uc3QgbW9udGhzTmFycm93ID0gW1xuICAnSicsXG4gICdGJyxcbiAgJ00nLFxuICAnQScsXG4gICdNJyxcbiAgJ0onLFxuICAnSicsXG4gICdBJyxcbiAgJ1MnLFxuICAnTycsXG4gICdOJyxcbiAgJ0QnLFxuXTtcblxuZnVuY3Rpb24gbW9udGhzKGxlbmd0aCkge1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgJ25hcnJvdyc6XG4gICAgICByZXR1cm4gbW9udGhzTmFycm93O1xuXG4gICAgY2FzZSAnc2hvcnQnOlxuICAgICAgcmV0dXJuIG1vbnRoc1Nob3J0O1xuXG4gICAgY2FzZSAnbG9uZyc6XG4gICAgICByZXR1cm4gbW9udGhzTG9uZztcblxuICAgIGNhc2UgJ251bWVyaWMnOlxuICAgICAgcmV0dXJuIFsnMScsICcyJywgJzMnLCAnNCcsICc1JywgJzYnLCAnNycsICc4JywgJzknLCAnMTAnLCAnMTEnLCAnMTInXTtcblxuICAgIGNhc2UgJzItZGlnaXQnOlxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgJzAxJyxcbiAgICAgICAgJzAyJyxcbiAgICAgICAgJzAzJyxcbiAgICAgICAgJzA0JyxcbiAgICAgICAgJzA1JyxcbiAgICAgICAgJzA2JyxcbiAgICAgICAgJzA3JyxcbiAgICAgICAgJzA4JyxcbiAgICAgICAgJzA5JyxcbiAgICAgICAgJzEwJyxcbiAgICAgICAgJzExJyxcbiAgICAgICAgJzEyJyxcbiAgICAgIF07XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuY29uc3Qgd2Vla2RheXNMb25nID0gW1xuICAnTW9uZGF5JyxcbiAgJ1R1ZXNkYXknLFxuICAnV2VkbmVzZGF5JyxcbiAgJ1RodXJzZGF5JyxcbiAgJ0ZyaWRheScsXG4gICdTYXR1cmRheScsXG4gICdTdW5kYXknLFxuXTtcbmNvbnN0IHdlZWtkYXlzU2hvcnQgPSBbJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0JywgJ1N1biddO1xuY29uc3Qgd2Vla2RheXNOYXJyb3cgPSBbJ00nLCAnVCcsICdXJywgJ1QnLCAnRicsICdTJywgJ1MnXTtcblxuZnVuY3Rpb24gd2Vla2RheXMobGVuZ3RoKSB7XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAnbmFycm93JzpcbiAgICAgIHJldHVybiB3ZWVrZGF5c05hcnJvdztcblxuICAgIGNhc2UgJ3Nob3J0JzpcbiAgICAgIHJldHVybiB3ZWVrZGF5c1Nob3J0O1xuXG4gICAgY2FzZSAnbG9uZyc6XG4gICAgICByZXR1cm4gd2Vla2RheXNMb25nO1xuXG4gICAgY2FzZSAnbnVtZXJpYyc6XG4gICAgICByZXR1cm4gWycxJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3J107XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuY29uc3QgbWVyaWRpZW1zID0gWydBTScsICdQTSddO1xuY29uc3QgZXJhc0xvbmcgPSBbJ0JlZm9yZSBDaHJpc3QnLCAnQW5ubyBEb21pbmknXTtcbmNvbnN0IGVyYXNTaG9ydCA9IFsnQkMnLCAnQUQnXTtcbmNvbnN0IGVyYXNOYXJyb3cgPSBbJ0InLCAnQSddO1xuXG5mdW5jdGlvbiBlcmFzKGxlbmd0aCkge1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgJ25hcnJvdyc6XG4gICAgICByZXR1cm4gZXJhc05hcnJvdztcblxuICAgIGNhc2UgJ3Nob3J0JzpcbiAgICAgIHJldHVybiBlcmFzU2hvcnQ7XG5cbiAgICBjYXNlICdsb25nJzpcbiAgICAgIHJldHVybiBlcmFzTG9uZztcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiBtZXJpZGllbUZvckRhdGVUaW1lKGR0KSB7XG4gIHJldHVybiBtZXJpZGllbXNbZHQuaG91ciA8IDEyID8gMCA6IDFdO1xufVxuXG5mdW5jdGlvbiB3ZWVrZGF5Rm9yRGF0ZVRpbWUoZHQsIGxlbmd0aCkge1xuICByZXR1cm4gd2Vla2RheXMobGVuZ3RoKVtkdC53ZWVrZGF5IC0gMV07XG59XG5cbmZ1bmN0aW9uIG1vbnRoRm9yRGF0ZVRpbWUoZHQsIGxlbmd0aCkge1xuICByZXR1cm4gbW9udGhzKGxlbmd0aClbZHQubW9udGggLSAxXTtcbn1cblxuZnVuY3Rpb24gZXJhRm9yRGF0ZVRpbWUoZHQsIGxlbmd0aCkge1xuICByZXR1cm4gZXJhcyhsZW5ndGgpW2R0LnllYXIgPCAwID8gMCA6IDFdO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRSZWxhdGl2ZVRpbWUodW5pdCwgY291bnQsIG51bWVyaWMgPSAnYWx3YXlzJywgbmFycm93ID0gZmFsc2UpIHtcbiAgY29uc3QgdW5pdHMgPSB7XG4gICAgeWVhcnM6IFsneWVhcicsICd5ci4nXSxcbiAgICBxdWFydGVyczogWydxdWFydGVyJywgJ3F0ci4nXSxcbiAgICBtb250aHM6IFsnbW9udGgnLCAnbW8uJ10sXG4gICAgd2Vla3M6IFsnd2VlaycsICd3ay4nXSxcbiAgICBkYXlzOiBbJ2RheScsICdkYXknLCAnZGF5cyddLFxuICAgIGhvdXJzOiBbJ2hvdXInLCAnaHIuJ10sXG4gICAgbWludXRlczogWydtaW51dGUnLCAnbWluLiddLFxuICAgIHNlY29uZHM6IFsnc2Vjb25kJywgJ3NlYy4nXSxcbiAgfTtcbiAgY29uc3QgbGFzdGFibGUgPSBbJ2hvdXJzJywgJ21pbnV0ZXMnLCAnc2Vjb25kcyddLmluZGV4T2YodW5pdCkgPT09IC0xO1xuXG4gIGlmIChudW1lcmljID09PSAnYXV0bycgJiYgbGFzdGFibGUpIHtcbiAgICBjb25zdCBpc0RheSA9IHVuaXQgPT09ICdkYXlzJztcblxuICAgIHN3aXRjaCAoY291bnQpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIGlzRGF5ID8gJ3RvbW9ycm93JyA6IGBuZXh0ICR7dW5pdHNbdW5pdF1bMF19YDtcblxuICAgICAgY2FzZSAtMTpcbiAgICAgICAgcmV0dXJuIGlzRGF5ID8gJ3llc3RlcmRheScgOiBgbGFzdCAke3VuaXRzW3VuaXRdWzBdfWA7XG5cbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIGlzRGF5ID8gJ3RvZGF5JyA6IGB0aGlzICR7dW5pdHNbdW5pdF1bMF19YDtcbiAgICB9XG4gIH1cblxuICBjb25zdCBpc0luUGFzdCA9IE9iamVjdC5pcyhjb3VudCwgLTApIHx8IGNvdW50IDwgMCxcbiAgICBmbXRWYWx1ZSA9IE1hdGguYWJzKGNvdW50KSxcbiAgICBzaW5ndWxhciA9IGZtdFZhbHVlID09PSAxLFxuICAgIGxpbFVuaXRzID0gdW5pdHNbdW5pdF0sXG4gICAgZm10VW5pdCA9IG5hcnJvd1xuICAgICAgPyBzaW5ndWxhclxuICAgICAgICA/IGxpbFVuaXRzWzFdXG4gICAgICAgIDogbGlsVW5pdHNbMl0gfHwgbGlsVW5pdHNbMV1cbiAgICAgIDogc2luZ3VsYXJcbiAgICAgID8gdW5pdHNbdW5pdF1bMF1cbiAgICAgIDogdW5pdDtcbiAgcmV0dXJuIGlzSW5QYXN0ID8gYCR7Zm10VmFsdWV9ICR7Zm10VW5pdH0gYWdvYCA6IGBpbiAke2ZtdFZhbHVlfSAke2ZtdFVuaXR9YDtcbn1cblxuZnVuY3Rpb24gZm9ybWF0U3RyaW5nKGtub3duRm9ybWF0KSB7XG4gIC8vIHRoZXNlIGFsbCBoYXZlIHRoZSBvZmZzZXRzIHJlbW92ZWQgYmVjYXVzZSB3ZSBkb24ndCBoYXZlIGFjY2VzcyB0byB0aGVtXG4gIC8vIHdpdGhvdXQgYWxsIHRoZSBpbnRsIHN0dWZmIHRoaXMgaXMgYmFja2ZpbGxpbmdcbiAgY29uc3QgZmlsdGVyZWQgPSBwaWNrKGtub3duRm9ybWF0LCBbXG4gICAgICAnd2Vla2RheScsXG4gICAgICAnZXJhJyxcbiAgICAgICd5ZWFyJyxcbiAgICAgICdtb250aCcsXG4gICAgICAnZGF5JyxcbiAgICAgICdob3VyJyxcbiAgICAgICdtaW51dGUnLFxuICAgICAgJ3NlY29uZCcsXG4gICAgICAndGltZVpvbmVOYW1lJyxcbiAgICAgICdob3VyMTInLFxuICAgIF0pLFxuICAgIGtleSA9IHN0cmluZ2lmeShmaWx0ZXJlZCksXG4gICAgZGF0ZVRpbWVIdWdlID0gJ0VFRUUsIExMTEwgZCwgeXl5eSwgaDptbSBhJztcblxuICBzd2l0Y2ggKGtleSkge1xuICAgIGNhc2Ugc3RyaW5naWZ5KERBVEVfU0hPUlQpOlxuICAgICAgcmV0dXJuICdNL2QveXl5eSc7XG5cbiAgICBjYXNlIHN0cmluZ2lmeShEQVRFX01FRCk6XG4gICAgICByZXR1cm4gJ0xMTCBkLCB5eXl5JztcblxuICAgIGNhc2Ugc3RyaW5naWZ5KERBVEVfRlVMTCk6XG4gICAgICByZXR1cm4gJ0xMTEwgZCwgeXl5eSc7XG5cbiAgICBjYXNlIHN0cmluZ2lmeShEQVRFX0hVR0UpOlxuICAgICAgcmV0dXJuICdFRUVFLCBMTExMIGQsIHl5eXknO1xuXG4gICAgY2FzZSBzdHJpbmdpZnkoVElNRV9TSU1QTEUpOlxuICAgICAgcmV0dXJuICdoOm1tIGEnO1xuXG4gICAgY2FzZSBzdHJpbmdpZnkoVElNRV9XSVRIX1NFQ09ORFMpOlxuICAgICAgcmV0dXJuICdoOm1tOnNzIGEnO1xuXG4gICAgY2FzZSBzdHJpbmdpZnkoVElNRV9XSVRIX1NIT1JUX09GRlNFVCk6XG4gICAgICByZXR1cm4gJ2g6bW0gYSc7XG5cbiAgICBjYXNlIHN0cmluZ2lmeShUSU1FX1dJVEhfTE9OR19PRkZTRVQpOlxuICAgICAgcmV0dXJuICdoOm1tIGEnO1xuXG4gICAgY2FzZSBzdHJpbmdpZnkoVElNRV8yNF9TSU1QTEUpOlxuICAgICAgcmV0dXJuICdISDptbSc7XG5cbiAgICBjYXNlIHN0cmluZ2lmeShUSU1FXzI0X1dJVEhfU0VDT05EUyk6XG4gICAgICByZXR1cm4gJ0hIOm1tOnNzJztcblxuICAgIGNhc2Ugc3RyaW5naWZ5KFRJTUVfMjRfV0lUSF9TSE9SVF9PRkZTRVQpOlxuICAgICAgcmV0dXJuICdISDptbSc7XG5cbiAgICBjYXNlIHN0cmluZ2lmeShUSU1FXzI0X1dJVEhfTE9OR19PRkZTRVQpOlxuICAgICAgcmV0dXJuICdISDptbSc7XG5cbiAgICBjYXNlIHN0cmluZ2lmeShEQVRFVElNRV9TSE9SVCk6XG4gICAgICByZXR1cm4gJ00vZC95eXl5LCBoOm1tIGEnO1xuXG4gICAgY2FzZSBzdHJpbmdpZnkoREFURVRJTUVfTUVEKTpcbiAgICAgIHJldHVybiAnTExMIGQsIHl5eXksIGg6bW0gYSc7XG5cbiAgICBjYXNlIHN0cmluZ2lmeShEQVRFVElNRV9GVUxMKTpcbiAgICAgIHJldHVybiAnTExMTCBkLCB5eXl5LCBoOm1tIGEnO1xuXG4gICAgY2FzZSBzdHJpbmdpZnkoREFURVRJTUVfSFVHRSk6XG4gICAgICByZXR1cm4gZGF0ZVRpbWVIdWdlO1xuXG4gICAgY2FzZSBzdHJpbmdpZnkoREFURVRJTUVfU0hPUlRfV0lUSF9TRUNPTkRTKTpcbiAgICAgIHJldHVybiAnTS9kL3l5eXksIGg6bW06c3MgYSc7XG5cbiAgICBjYXNlIHN0cmluZ2lmeShEQVRFVElNRV9NRURfV0lUSF9TRUNPTkRTKTpcbiAgICAgIHJldHVybiAnTExMIGQsIHl5eXksIGg6bW06c3MgYSc7XG5cbiAgICBjYXNlIHN0cmluZ2lmeShEQVRFVElNRV9NRURfV0lUSF9XRUVLREFZKTpcbiAgICAgIHJldHVybiAnRUVFLCBkIExMTCB5eXl5LCBoOm1tIGEnO1xuXG4gICAgY2FzZSBzdHJpbmdpZnkoREFURVRJTUVfRlVMTF9XSVRIX1NFQ09ORFMpOlxuICAgICAgcmV0dXJuICdMTExMIGQsIHl5eXksIGg6bW06c3MgYSc7XG5cbiAgICBjYXNlIHN0cmluZ2lmeShEQVRFVElNRV9IVUdFX1dJVEhfU0VDT05EUyk6XG4gICAgICByZXR1cm4gJ0VFRUUsIExMTEwgZCwgeXl5eSwgaDptbTpzcyBhJztcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZGF0ZVRpbWVIdWdlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeVRva2VucyhzcGxpdHMsIHRva2VuVG9TdHJpbmcpIHtcbiAgbGV0IHMgPSAnJztcblxuICBmb3IgKGNvbnN0IHRva2VuIG9mIHNwbGl0cykge1xuICAgIGlmICh0b2tlbi5saXRlcmFsKSB7XG4gICAgICBzICs9IHRva2VuLnZhbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcyArPSB0b2tlblRvU3RyaW5nKHRva2VuLnZhbCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHM7XG59XG5cbmNvbnN0IG1hY3JvVG9rZW5Ub0Zvcm1hdE9wdHMgPSB7XG4gIEQ6IERBVEVfU0hPUlQsXG4gIEREOiBEQVRFX01FRCxcbiAgREREOiBEQVRFX0ZVTEwsXG4gIEREREQ6IERBVEVfSFVHRSxcbiAgdDogVElNRV9TSU1QTEUsXG4gIHR0OiBUSU1FX1dJVEhfU0VDT05EUyxcbiAgdHR0OiBUSU1FX1dJVEhfU0hPUlRfT0ZGU0VULFxuICB0dHR0OiBUSU1FX1dJVEhfTE9OR19PRkZTRVQsXG4gIFQ6IFRJTUVfMjRfU0lNUExFLFxuICBUVDogVElNRV8yNF9XSVRIX1NFQ09ORFMsXG4gIFRUVDogVElNRV8yNF9XSVRIX1NIT1JUX09GRlNFVCxcbiAgVFRUVDogVElNRV8yNF9XSVRIX0xPTkdfT0ZGU0VULFxuICBmOiBEQVRFVElNRV9TSE9SVCxcbiAgZmY6IERBVEVUSU1FX01FRCxcbiAgZmZmOiBEQVRFVElNRV9GVUxMLFxuICBmZmZmOiBEQVRFVElNRV9IVUdFLFxuICBGOiBEQVRFVElNRV9TSE9SVF9XSVRIX1NFQ09ORFMsXG4gIEZGOiBEQVRFVElNRV9NRURfV0lUSF9TRUNPTkRTLFxuICBGRkY6IERBVEVUSU1FX0ZVTExfV0lUSF9TRUNPTkRTLFxuICBGRkZGOiBEQVRFVElNRV9IVUdFX1dJVEhfU0VDT05EUyxcbn07XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuXG5jbGFzcyBGb3JtYXR0ZXIge1xuICBjb25zdHJ1Y3Rvcihsb2NhbGUsIGZvcm1hdE9wdHMpIHtcbiAgICB0aGlzLm9wdHMgPSBmb3JtYXRPcHRzO1xuICAgIHRoaXMubG9jID0gbG9jYWxlO1xuICAgIHRoaXMuc3lzdGVtTG9jID0gbnVsbDtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUobG9jYWxlLCBvcHRzID0ge30pIHtcbiAgICByZXR1cm4gbmV3IEZvcm1hdHRlcihsb2NhbGUsIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlRm9ybWF0KGZtdCkge1xuICAgIGxldCBjdXJyZW50ID0gbnVsbCxcbiAgICAgIGN1cnJlbnRGdWxsID0gJycsXG4gICAgICBicmFja2V0ZWQgPSBmYWxzZTtcbiAgICBjb25zdCBzcGxpdHMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm10Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjID0gZm10LmNoYXJBdChpKTtcblxuICAgICAgaWYgKGMgPT09IFwiJ1wiKSB7XG4gICAgICAgIGlmIChjdXJyZW50RnVsbC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgc3BsaXRzLnB1c2goe1xuICAgICAgICAgICAgbGl0ZXJhbDogYnJhY2tldGVkLFxuICAgICAgICAgICAgdmFsOiBjdXJyZW50RnVsbCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnQgPSBudWxsO1xuICAgICAgICBjdXJyZW50RnVsbCA9ICcnO1xuICAgICAgICBicmFja2V0ZWQgPSAhYnJhY2tldGVkO1xuICAgICAgfSBlbHNlIGlmIChicmFja2V0ZWQpIHtcbiAgICAgICAgY3VycmVudEZ1bGwgKz0gYztcbiAgICAgIH0gZWxzZSBpZiAoYyA9PT0gY3VycmVudCkge1xuICAgICAgICBjdXJyZW50RnVsbCArPSBjO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGN1cnJlbnRGdWxsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBzcGxpdHMucHVzaCh7XG4gICAgICAgICAgICBsaXRlcmFsOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbDogY3VycmVudEZ1bGwsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50RnVsbCA9IGM7XG4gICAgICAgIGN1cnJlbnQgPSBjO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjdXJyZW50RnVsbC5sZW5ndGggPiAwKSB7XG4gICAgICBzcGxpdHMucHVzaCh7XG4gICAgICAgIGxpdGVyYWw6IGJyYWNrZXRlZCxcbiAgICAgICAgdmFsOiBjdXJyZW50RnVsbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzcGxpdHM7XG4gIH1cblxuICBzdGF0aWMgbWFjcm9Ub2tlblRvRm9ybWF0T3B0cyh0b2tlbikge1xuICAgIHJldHVybiBtYWNyb1Rva2VuVG9Gb3JtYXRPcHRzW3Rva2VuXTtcbiAgfVxuXG4gIGZvcm1hdFdpdGhTeXN0ZW1EZWZhdWx0KGR0LCBvcHRzKSB7XG4gICAgaWYgKHRoaXMuc3lzdGVtTG9jID09PSBudWxsKSB7XG4gICAgICB0aGlzLnN5c3RlbUxvYyA9IHRoaXMubG9jLnJlZGVmYXVsdFRvU3lzdGVtKCk7XG4gICAgfVxuXG4gICAgY29uc3QgZGYgPSB0aGlzLnN5c3RlbUxvYy5kdEZvcm1hdHRlcihcbiAgICAgIGR0LFxuICAgICAgT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRzLCBvcHRzKSxcbiAgICApO1xuICAgIHJldHVybiBkZi5mb3JtYXQoKTtcbiAgfVxuXG4gIGZvcm1hdERhdGVUaW1lKGR0LCBvcHRzID0ge30pIHtcbiAgICBjb25zdCBkZiA9IHRoaXMubG9jLmR0Rm9ybWF0dGVyKGR0LCBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdHMsIG9wdHMpKTtcbiAgICByZXR1cm4gZGYuZm9ybWF0KCk7XG4gIH1cblxuICBmb3JtYXREYXRlVGltZVBhcnRzKGR0LCBvcHRzID0ge30pIHtcbiAgICBjb25zdCBkZiA9IHRoaXMubG9jLmR0Rm9ybWF0dGVyKGR0LCBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdHMsIG9wdHMpKTtcbiAgICByZXR1cm4gZGYuZm9ybWF0VG9QYXJ0cygpO1xuICB9XG5cbiAgcmVzb2x2ZWRPcHRpb25zKGR0LCBvcHRzID0ge30pIHtcbiAgICBjb25zdCBkZiA9IHRoaXMubG9jLmR0Rm9ybWF0dGVyKGR0LCBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdHMsIG9wdHMpKTtcbiAgICByZXR1cm4gZGYucmVzb2x2ZWRPcHRpb25zKCk7XG4gIH1cblxuICBudW0obiwgcCA9IDApIHtcbiAgICAvLyB3ZSBnZXQgc29tZSBwZXJmIG91dCBvZiBkb2luZyB0aGlzIGhlcmUsIGFubm95aW5nbHlcbiAgICBpZiAodGhpcy5vcHRzLmZvcmNlU2ltcGxlKSB7XG4gICAgICByZXR1cm4gcGFkU3RhcnQobiwgcCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0cyk7XG5cbiAgICBpZiAocCA+IDApIHtcbiAgICAgIG9wdHMucGFkVG8gPSBwO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmxvYy5udW1iZXJGb3JtYXR0ZXIob3B0cykuZm9ybWF0KG4pO1xuICB9XG5cbiAgZm9ybWF0RGF0ZVRpbWVGcm9tU3RyaW5nKGR0LCBmbXQpIHtcbiAgICBjb25zdCBrbm93bkVuZ2xpc2ggPSB0aGlzLmxvYy5saXN0aW5nTW9kZSgpID09PSAnZW4nLFxuICAgICAgdXNlRGF0ZVRpbWVGb3JtYXR0ZXIgPVxuICAgICAgICB0aGlzLmxvYy5vdXRwdXRDYWxlbmRhciAmJlxuICAgICAgICB0aGlzLmxvYy5vdXRwdXRDYWxlbmRhciAhPT0gJ2dyZWdvcnknICYmXG4gICAgICAgIGhhc0Zvcm1hdFRvUGFydHMoKSxcbiAgICAgIHN0cmluZyA9IChvcHRzLCBleHRyYWN0KSA9PiB0aGlzLmxvYy5leHRyYWN0KGR0LCBvcHRzLCBleHRyYWN0KSxcbiAgICAgIGZvcm1hdE9mZnNldCA9IG9wdHMgPT4ge1xuICAgICAgICBpZiAoZHQuaXNPZmZzZXRGaXhlZCAmJiBkdC5vZmZzZXQgPT09IDAgJiYgb3B0cy5hbGxvd1opIHtcbiAgICAgICAgICByZXR1cm4gJ1onO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGR0LmlzVmFsaWQgPyBkdC56b25lLmZvcm1hdE9mZnNldChkdC50cywgb3B0cy5mb3JtYXQpIDogJyc7XG4gICAgICB9LFxuICAgICAgbWVyaWRpZW0gPSAoKSA9PlxuICAgICAgICBrbm93bkVuZ2xpc2hcbiAgICAgICAgICA/IG1lcmlkaWVtRm9yRGF0ZVRpbWUoZHQpXG4gICAgICAgICAgOiBzdHJpbmcoXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBob3VyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgaG91cjEyOiB0cnVlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAnZGF5cGVyaW9kJyxcbiAgICAgICAgICAgICksXG4gICAgICBtb250aCA9IChsZW5ndGgsIHN0YW5kYWxvbmUpID0+XG4gICAgICAgIGtub3duRW5nbGlzaFxuICAgICAgICAgID8gbW9udGhGb3JEYXRlVGltZShkdCwgbGVuZ3RoKVxuICAgICAgICAgIDogc3RyaW5nKFxuICAgICAgICAgICAgICBzdGFuZGFsb25lXG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoOiBsZW5ndGgsXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoOiBsZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIGRheTogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgJ21vbnRoJyxcbiAgICAgICAgICAgICksXG4gICAgICB3ZWVrZGF5ID0gKGxlbmd0aCwgc3RhbmRhbG9uZSkgPT5cbiAgICAgICAga25vd25FbmdsaXNoXG4gICAgICAgICAgPyB3ZWVrZGF5Rm9yRGF0ZVRpbWUoZHQsIGxlbmd0aClcbiAgICAgICAgICA6IHN0cmluZyhcbiAgICAgICAgICAgICAgc3RhbmRhbG9uZVxuICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICB3ZWVrZGF5OiBsZW5ndGgsXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgICAgIHdlZWtkYXk6IGxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6ICdsb25nJyxcbiAgICAgICAgICAgICAgICAgICAgZGF5OiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAnd2Vla2RheScsXG4gICAgICAgICAgICApLFxuICAgICAgbWF5YmVNYWNybyA9IHRva2VuID0+IHtcbiAgICAgICAgY29uc3QgZm9ybWF0T3B0cyA9IEZvcm1hdHRlci5tYWNyb1Rva2VuVG9Gb3JtYXRPcHRzKHRva2VuKTtcblxuICAgICAgICBpZiAoZm9ybWF0T3B0cykge1xuICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFdpdGhTeXN0ZW1EZWZhdWx0KGR0LCBmb3JtYXRPcHRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBlcmEgPSBsZW5ndGggPT5cbiAgICAgICAga25vd25FbmdsaXNoXG4gICAgICAgICAgPyBlcmFGb3JEYXRlVGltZShkdCwgbGVuZ3RoKVxuICAgICAgICAgIDogc3RyaW5nKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZXJhOiBsZW5ndGgsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICdlcmEnLFxuICAgICAgICAgICAgKSxcbiAgICAgIHRva2VuVG9TdHJpbmcgPSB0b2tlbiA9PiB7XG4gICAgICAgIC8vIFdoZXJlIHBvc3NpYmxlOiBodHRwOi8vY2xkci51bmljb2RlLm9yZy90cmFuc2xhdGlvbi9kYXRlLXRpbWUjVE9DLVN0YW5kLUFsb25lLXZzLi1Gb3JtYXQtU3R5bGVzXG4gICAgICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgICAgICAvLyBtc1xuICAgICAgICAgIGNhc2UgJ1MnOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubnVtKGR0Lm1pbGxpc2Vjb25kKTtcblxuICAgICAgICAgIGNhc2UgJ3UnOiAvLyBmYWxscyB0aHJvdWdoXG5cbiAgICAgICAgICBjYXNlICdTU1MnOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubnVtKGR0Lm1pbGxpc2Vjb25kLCAzKTtcbiAgICAgICAgICAvLyBzZWNvbmRzXG5cbiAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bShkdC5zZWNvbmQpO1xuXG4gICAgICAgICAgY2FzZSAnc3MnOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubnVtKGR0LnNlY29uZCwgMik7XG4gICAgICAgICAgLy8gbWludXRlc1xuXG4gICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5udW0oZHQubWludXRlKTtcblxuICAgICAgICAgIGNhc2UgJ21tJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bShkdC5taW51dGUsIDIpO1xuICAgICAgICAgIC8vIGhvdXJzXG5cbiAgICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bShkdC5ob3VyICUgMTIgPT09IDAgPyAxMiA6IGR0LmhvdXIgJSAxMik7XG5cbiAgICAgICAgICBjYXNlICdoaCc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5udW0oZHQuaG91ciAlIDEyID09PSAwID8gMTIgOiBkdC5ob3VyICUgMTIsIDIpO1xuXG4gICAgICAgICAgY2FzZSAnSCc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5udW0oZHQuaG91cik7XG5cbiAgICAgICAgICBjYXNlICdISCc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5udW0oZHQuaG91ciwgMik7XG4gICAgICAgICAgLy8gb2Zmc2V0XG5cbiAgICAgICAgICBjYXNlICdaJzpcbiAgICAgICAgICAgIC8vIGxpa2UgKzZcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXRPZmZzZXQoe1xuICAgICAgICAgICAgICBmb3JtYXQ6ICduYXJyb3cnLFxuICAgICAgICAgICAgICBhbGxvd1o6IHRoaXMub3B0cy5hbGxvd1osXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNhc2UgJ1paJzpcbiAgICAgICAgICAgIC8vIGxpa2UgKzA2OjAwXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0T2Zmc2V0KHtcbiAgICAgICAgICAgICAgZm9ybWF0OiAnc2hvcnQnLFxuICAgICAgICAgICAgICBhbGxvd1o6IHRoaXMub3B0cy5hbGxvd1osXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNhc2UgJ1paWic6XG4gICAgICAgICAgICAvLyBsaWtlICswNjAwXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0T2Zmc2V0KHtcbiAgICAgICAgICAgICAgZm9ybWF0OiAndGVjaGllJyxcbiAgICAgICAgICAgICAgYWxsb3daOiB0aGlzLm9wdHMuYWxsb3daLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjYXNlICdaWlpaJzpcbiAgICAgICAgICAgIC8vIGxpa2UgRVNUXG4gICAgICAgICAgICByZXR1cm4gZHQuem9uZS5vZmZzZXROYW1lKGR0LnRzLCB7XG4gICAgICAgICAgICAgIGZvcm1hdDogJ3Nob3J0JyxcbiAgICAgICAgICAgICAgbG9jYWxlOiB0aGlzLmxvYy5sb2NhbGUsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNhc2UgJ1paWlpaJzpcbiAgICAgICAgICAgIC8vIGxpa2UgRWFzdGVybiBTdGFuZGFyZCBUaW1lXG4gICAgICAgICAgICByZXR1cm4gZHQuem9uZS5vZmZzZXROYW1lKGR0LnRzLCB7XG4gICAgICAgICAgICAgIGZvcm1hdDogJ2xvbmcnLFxuICAgICAgICAgICAgICBsb2NhbGU6IHRoaXMubG9jLmxvY2FsZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIHpvbmVcblxuICAgICAgICAgIGNhc2UgJ3onOlxuICAgICAgICAgICAgLy8gbGlrZSBBbWVyaWNhL05ld19Zb3JrXG4gICAgICAgICAgICByZXR1cm4gZHQuem9uZU5hbWU7XG4gICAgICAgICAgLy8gbWVyaWRpZW1zXG5cbiAgICAgICAgICBjYXNlICdhJzpcbiAgICAgICAgICAgIHJldHVybiBtZXJpZGllbSgpO1xuICAgICAgICAgIC8vIGRhdGVzXG5cbiAgICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgIHJldHVybiB1c2VEYXRlVGltZUZvcm1hdHRlclxuICAgICAgICAgICAgICA/IHN0cmluZyhcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF5OiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ2RheScsXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICA6IHRoaXMubnVtKGR0LmRheSk7XG5cbiAgICAgICAgICBjYXNlICdkZCc6XG4gICAgICAgICAgICByZXR1cm4gdXNlRGF0ZVRpbWVGb3JtYXR0ZXJcbiAgICAgICAgICAgICAgPyBzdHJpbmcoXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRheTogJzItZGlnaXQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICdkYXknLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiB0aGlzLm51bShkdC5kYXksIDIpO1xuICAgICAgICAgIC8vIHdlZWtkYXlzIC0gc3RhbmRhbG9uZVxuXG4gICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAvLyBsaWtlIDFcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bShkdC53ZWVrZGF5KTtcblxuICAgICAgICAgIGNhc2UgJ2NjYyc6XG4gICAgICAgICAgICAvLyBsaWtlICdUdWVzJ1xuICAgICAgICAgICAgcmV0dXJuIHdlZWtkYXkoJ3Nob3J0JywgdHJ1ZSk7XG5cbiAgICAgICAgICBjYXNlICdjY2NjJzpcbiAgICAgICAgICAgIC8vIGxpa2UgJ1R1ZXNkYXknXG4gICAgICAgICAgICByZXR1cm4gd2Vla2RheSgnbG9uZycsIHRydWUpO1xuXG4gICAgICAgICAgY2FzZSAnY2NjY2MnOlxuICAgICAgICAgICAgLy8gbGlrZSAnVCdcbiAgICAgICAgICAgIHJldHVybiB3ZWVrZGF5KCduYXJyb3cnLCB0cnVlKTtcbiAgICAgICAgICAvLyB3ZWVrZGF5cyAtIGZvcm1hdFxuXG4gICAgICAgICAgY2FzZSAnRSc6XG4gICAgICAgICAgICAvLyBsaWtlIDFcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bShkdC53ZWVrZGF5KTtcblxuICAgICAgICAgIGNhc2UgJ0VFRSc6XG4gICAgICAgICAgICAvLyBsaWtlICdUdWVzJ1xuICAgICAgICAgICAgcmV0dXJuIHdlZWtkYXkoJ3Nob3J0JywgZmFsc2UpO1xuXG4gICAgICAgICAgY2FzZSAnRUVFRSc6XG4gICAgICAgICAgICAvLyBsaWtlICdUdWVzZGF5J1xuICAgICAgICAgICAgcmV0dXJuIHdlZWtkYXkoJ2xvbmcnLCBmYWxzZSk7XG5cbiAgICAgICAgICBjYXNlICdFRUVFRSc6XG4gICAgICAgICAgICAvLyBsaWtlICdUJ1xuICAgICAgICAgICAgcmV0dXJuIHdlZWtkYXkoJ25hcnJvdycsIGZhbHNlKTtcbiAgICAgICAgICAvLyBtb250aHMgLSBzdGFuZGFsb25lXG5cbiAgICAgICAgICBjYXNlICdMJzpcbiAgICAgICAgICAgIC8vIGxpa2UgMVxuICAgICAgICAgICAgcmV0dXJuIHVzZURhdGVUaW1lRm9ybWF0dGVyXG4gICAgICAgICAgICAgID8gc3RyaW5nKFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBtb250aDogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgICAgICBkYXk6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAnbW9udGgnLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiB0aGlzLm51bShkdC5tb250aCk7XG5cbiAgICAgICAgICBjYXNlICdMTCc6XG4gICAgICAgICAgICAvLyBsaWtlIDAxLCBkb2Vzbid0IHNlZW0gdG8gd29ya1xuICAgICAgICAgICAgcmV0dXJuIHVzZURhdGVUaW1lRm9ybWF0dGVyXG4gICAgICAgICAgICAgID8gc3RyaW5nKFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBtb250aDogJzItZGlnaXQnLFxuICAgICAgICAgICAgICAgICAgICBkYXk6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAnbW9udGgnLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiB0aGlzLm51bShkdC5tb250aCwgMik7XG5cbiAgICAgICAgICBjYXNlICdMTEwnOlxuICAgICAgICAgICAgLy8gbGlrZSBKYW5cbiAgICAgICAgICAgIHJldHVybiBtb250aCgnc2hvcnQnLCB0cnVlKTtcblxuICAgICAgICAgIGNhc2UgJ0xMTEwnOlxuICAgICAgICAgICAgLy8gbGlrZSBKYW51YXJ5XG4gICAgICAgICAgICByZXR1cm4gbW9udGgoJ2xvbmcnLCB0cnVlKTtcblxuICAgICAgICAgIGNhc2UgJ0xMTExMJzpcbiAgICAgICAgICAgIC8vIGxpa2UgSlxuICAgICAgICAgICAgcmV0dXJuIG1vbnRoKCduYXJyb3cnLCB0cnVlKTtcbiAgICAgICAgICAvLyBtb250aHMgLSBmb3JtYXRcblxuICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgLy8gbGlrZSAxXG4gICAgICAgICAgICByZXR1cm4gdXNlRGF0ZVRpbWVGb3JtYXR0ZXJcbiAgICAgICAgICAgICAgPyBzdHJpbmcoXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ21vbnRoJyxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIDogdGhpcy5udW0oZHQubW9udGgpO1xuXG4gICAgICAgICAgY2FzZSAnTU0nOlxuICAgICAgICAgICAgLy8gbGlrZSAwMVxuICAgICAgICAgICAgcmV0dXJuIHVzZURhdGVUaW1lRm9ybWF0dGVyXG4gICAgICAgICAgICAgID8gc3RyaW5nKFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBtb250aDogJzItZGlnaXQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICdtb250aCcsXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICA6IHRoaXMubnVtKGR0Lm1vbnRoLCAyKTtcblxuICAgICAgICAgIGNhc2UgJ01NTSc6XG4gICAgICAgICAgICAvLyBsaWtlIEphblxuICAgICAgICAgICAgcmV0dXJuIG1vbnRoKCdzaG9ydCcsIGZhbHNlKTtcblxuICAgICAgICAgIGNhc2UgJ01NTU0nOlxuICAgICAgICAgICAgLy8gbGlrZSBKYW51YXJ5XG4gICAgICAgICAgICByZXR1cm4gbW9udGgoJ2xvbmcnLCBmYWxzZSk7XG5cbiAgICAgICAgICBjYXNlICdNTU1NTSc6XG4gICAgICAgICAgICAvLyBsaWtlIEpcbiAgICAgICAgICAgIHJldHVybiBtb250aCgnbmFycm93JywgZmFsc2UpO1xuICAgICAgICAgIC8vIHllYXJzXG5cbiAgICAgICAgICBjYXNlICd5JzpcbiAgICAgICAgICAgIC8vIGxpa2UgMjAxNFxuICAgICAgICAgICAgcmV0dXJuIHVzZURhdGVUaW1lRm9ybWF0dGVyXG4gICAgICAgICAgICAgID8gc3RyaW5nKFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ3llYXInLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiB0aGlzLm51bShkdC55ZWFyKTtcblxuICAgICAgICAgIGNhc2UgJ3l5JzpcbiAgICAgICAgICAgIC8vIGxpa2UgMTRcbiAgICAgICAgICAgIHJldHVybiB1c2VEYXRlVGltZUZvcm1hdHRlclxuICAgICAgICAgICAgICA/IHN0cmluZyhcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeWVhcjogJzItZGlnaXQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICd5ZWFyJyxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIDogdGhpcy5udW0oZHQueWVhci50b1N0cmluZygpLnNsaWNlKC0yKSwgMik7XG5cbiAgICAgICAgICBjYXNlICd5eXl5JzpcbiAgICAgICAgICAgIC8vIGxpa2UgMDAxMlxuICAgICAgICAgICAgcmV0dXJuIHVzZURhdGVUaW1lRm9ybWF0dGVyXG4gICAgICAgICAgICAgID8gc3RyaW5nKFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ3llYXInLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiB0aGlzLm51bShkdC55ZWFyLCA0KTtcblxuICAgICAgICAgIGNhc2UgJ3l5eXl5eSc6XG4gICAgICAgICAgICAvLyBsaWtlIDAwMDAxMlxuICAgICAgICAgICAgcmV0dXJuIHVzZURhdGVUaW1lRm9ybWF0dGVyXG4gICAgICAgICAgICAgID8gc3RyaW5nKFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ3llYXInLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiB0aGlzLm51bShkdC55ZWFyLCA2KTtcbiAgICAgICAgICAvLyBlcmFzXG5cbiAgICAgICAgICBjYXNlICdHJzpcbiAgICAgICAgICAgIC8vIGxpa2UgQURcbiAgICAgICAgICAgIHJldHVybiBlcmEoJ3Nob3J0Jyk7XG5cbiAgICAgICAgICBjYXNlICdHRyc6XG4gICAgICAgICAgICAvLyBsaWtlIEFubm8gRG9taW5pXG4gICAgICAgICAgICByZXR1cm4gZXJhKCdsb25nJyk7XG5cbiAgICAgICAgICBjYXNlICdHR0dHRyc6XG4gICAgICAgICAgICByZXR1cm4gZXJhKCduYXJyb3cnKTtcblxuICAgICAgICAgIGNhc2UgJ2trJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bShkdC53ZWVrWWVhci50b1N0cmluZygpLnNsaWNlKC0yKSwgMik7XG5cbiAgICAgICAgICBjYXNlICdra2trJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bShkdC53ZWVrWWVhciwgNCk7XG5cbiAgICAgICAgICBjYXNlICdXJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bShkdC53ZWVrTnVtYmVyKTtcblxuICAgICAgICAgIGNhc2UgJ1dXJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bShkdC53ZWVrTnVtYmVyLCAyKTtcblxuICAgICAgICAgIGNhc2UgJ28nOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubnVtKGR0Lm9yZGluYWwpO1xuXG4gICAgICAgICAgY2FzZSAnb29vJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bShkdC5vcmRpbmFsLCAzKTtcblxuICAgICAgICAgIGNhc2UgJ3EnOlxuICAgICAgICAgICAgLy8gbGlrZSAxXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5udW0oZHQucXVhcnRlcik7XG5cbiAgICAgICAgICBjYXNlICdxcSc6XG4gICAgICAgICAgICAvLyBsaWtlIDAxXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5udW0oZHQucXVhcnRlciwgMik7XG5cbiAgICAgICAgICBjYXNlICdYJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bShNYXRoLmZsb29yKGR0LnRzIC8gMTAwMCkpO1xuXG4gICAgICAgICAgY2FzZSAneCc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5udW0oZHQudHMpO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBtYXliZU1hY3JvKHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgIHJldHVybiBzdHJpbmdpZnlUb2tlbnMoRm9ybWF0dGVyLnBhcnNlRm9ybWF0KGZtdCksIHRva2VuVG9TdHJpbmcpO1xuICB9XG5cbiAgZm9ybWF0RHVyYXRpb25Gcm9tU3RyaW5nKGR1ciwgZm10KSB7XG4gICAgY29uc3QgdG9rZW5Ub0ZpZWxkID0gdG9rZW4gPT4ge1xuICAgICAgICBzd2l0Y2ggKHRva2VuWzBdKSB7XG4gICAgICAgICAgY2FzZSAnUyc6XG4gICAgICAgICAgICByZXR1cm4gJ21pbGxpc2Vjb25kJztcblxuICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgcmV0dXJuICdzZWNvbmQnO1xuXG4gICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICByZXR1cm4gJ21pbnV0ZSc7XG5cbiAgICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgIHJldHVybiAnaG91cic7XG5cbiAgICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgIHJldHVybiAnZGF5JztcblxuICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgcmV0dXJuICdtb250aCc7XG5cbiAgICAgICAgICBjYXNlICd5JzpcbiAgICAgICAgICAgIHJldHVybiAneWVhcic7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0b2tlblRvU3RyaW5nID0gbGlsZHVyID0+IHRva2VuID0+IHtcbiAgICAgICAgY29uc3QgbWFwcGVkID0gdG9rZW5Ub0ZpZWxkKHRva2VuKTtcblxuICAgICAgICBpZiAobWFwcGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMubnVtKGxpbGR1ci5nZXQobWFwcGVkKSwgdG9rZW4ubGVuZ3RoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0b2tlbnMgPSBGb3JtYXR0ZXIucGFyc2VGb3JtYXQoZm10KSxcbiAgICAgIHJlYWxUb2tlbnMgPSB0b2tlbnMucmVkdWNlKFxuICAgICAgICAoZm91bmQsIHsgbGl0ZXJhbCwgdmFsIH0pID0+IChsaXRlcmFsID8gZm91bmQgOiBmb3VuZC5jb25jYXQodmFsKSksXG4gICAgICAgIFtdLFxuICAgICAgKSxcbiAgICAgIGNvbGxhcHNlZCA9IGR1ci5zaGlmdFRvKC4uLnJlYWxUb2tlbnMubWFwKHRva2VuVG9GaWVsZCkuZmlsdGVyKHQgPT4gdCkpO1xuXG4gICAgcmV0dXJuIHN0cmluZ2lmeVRva2Vucyh0b2tlbnMsIHRva2VuVG9TdHJpbmcoY29sbGFwc2VkKSk7XG4gIH1cbn1cblxuY2xhc3MgSW52YWxpZCB7XG4gIGNvbnN0cnVjdG9yKHJlYXNvbiwgZXhwbGFuYXRpb24pIHtcbiAgICB0aGlzLnJlYXNvbiA9IHJlYXNvbjtcbiAgICB0aGlzLmV4cGxhbmF0aW9uID0gZXhwbGFuYXRpb247XG4gIH1cblxuICB0b01lc3NhZ2UoKSB7XG4gICAgaWYgKHRoaXMuZXhwbGFuYXRpb24pIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLnJlYXNvbn06ICR7dGhpcy5leHBsYW5hdGlvbn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWFzb247XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICB2YXIga2V5LCBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0gc291cmNlS2V5c1tpXTtcbiAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cblxuLyoqXG4gKiBAaW50ZXJmYWNlXG4gKi9cblxuY2xhc3MgWm9uZSB7XG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiB6b25lXG4gICAqIEBhYnN0cmFjdFxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0IHR5cGUoKSB7XG4gICAgdGhyb3cgbmV3IFpvbmVJc0Fic3RyYWN0RXJyb3IoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGlzIHpvbmUuXG4gICAqIEBhYnN0cmFjdFxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cblxuICBnZXQgbmFtZSgpIHtcbiAgICB0aHJvdyBuZXcgWm9uZUlzQWJzdHJhY3RFcnJvcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciB0aGUgb2Zmc2V0IGlzIGtub3duIHRvIGJlIGZpeGVkIGZvciB0aGUgd2hvbGUgeWVhci5cbiAgICogQGFic3RyYWN0XG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cblxuICBnZXQgdW5pdmVyc2FsKCkge1xuICAgIHRocm93IG5ldyBab25lSXNBYnN0cmFjdEVycm9yKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHdoZXRoZXIgdGhpcyBab25lIGlzIHZhbGlkLlxuICAgKiBAYWJzdHJhY3RcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuXG4gIGdldCBpc1ZhbGlkKCkge1xuICAgIHRocm93IG5ldyBab25lSXNBYnN0cmFjdEVycm9yKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgb2Zmc2V0J3MgY29tbW9uIG5hbWUgKHN1Y2ggYXMgRVNUKSBhdCB0aGUgc3BlY2lmaWVkIHRpbWVzdGFtcFxuICAgKiBAYWJzdHJhY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRzIC0gRXBvY2ggbWlsbGlzZWNvbmRzIGZvciB3aGljaCB0byBnZXQgdGhlIG5hbWVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBPcHRpb25zIHRvIGFmZmVjdCB0aGUgZm9ybWF0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLmZvcm1hdCAtIFdoYXQgc3R5bGUgb2Ygb2Zmc2V0IHRvIHJldHVybi4gQWNjZXB0cyAnbG9uZycgb3IgJ3Nob3J0Jy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMubG9jYWxlIC0gV2hhdCBsb2NhbGUgdG8gcmV0dXJuIHRoZSBvZmZzZXQgbmFtZSBpbi5cbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cblxuICBvZmZzZXROYW1lKHRzLCBvcHRzKSB7XG4gICAgdGhyb3cgbmV3IFpvbmVJc0Fic3RyYWN0RXJyb3IoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBvZmZzZXQncyB2YWx1ZSBhcyBhIHN0cmluZ1xuICAgKiBAYWJzdHJhY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRzIC0gRXBvY2ggbWlsbGlzZWNvbmRzIGZvciB3aGljaCB0byBnZXQgdGhlIG9mZnNldFxuICAgKiBAcGFyYW0ge3N0cmluZ30gZm9ybWF0IC0gV2hhdCBzdHlsZSBvZiBvZmZzZXQgdG8gcmV0dXJuLlxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgQWNjZXB0cyAnbmFycm93JywgJ3Nob3J0Jywgb3IgJ3RlY2hpZScuIFJldHVybmluZyAnKzYnLCAnKzA2OjAwJywgb3IgJyswNjAwJyByZXNwZWN0aXZlbHlcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cblxuICBmb3JtYXRPZmZzZXQodHMsIGZvcm1hdCkge1xuICAgIHRocm93IG5ldyBab25lSXNBYnN0cmFjdEVycm9yKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBvZmZzZXQgaW4gbWludXRlcyBmb3IgdGhpcyB6b25lIGF0IHRoZSBzcGVjaWZpZWQgdGltZXN0YW1wLlxuICAgKiBAYWJzdHJhY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRzIC0gRXBvY2ggbWlsbGlzZWNvbmRzIGZvciB3aGljaCB0byBjb21wdXRlIHRoZSBvZmZzZXRcbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cblxuICBvZmZzZXQodHMpIHtcbiAgICB0aHJvdyBuZXcgWm9uZUlzQWJzdHJhY3RFcnJvcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB3aGV0aGVyIHRoaXMgWm9uZSBpcyBlcXVhbCB0byBhbm90aGVyIHpvbmVcbiAgICogQGFic3RyYWN0XG4gICAqIEBwYXJhbSB7Wm9uZX0gb3RoZXJab25lIC0gdGhlIHpvbmUgdG8gY29tcGFyZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cblxuICBlcXVhbHMob3RoZXJab25lKSB7XG4gICAgdGhyb3cgbmV3IFpvbmVJc0Fic3RyYWN0RXJyb3IoKTtcbiAgfVxufVxuXG5sZXQgc2luZ2xldG9uID0gbnVsbDtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBsb2NhbCB6b25lIGZvciB0aGlzIEphdmFzY3JpcHQgZW52aXJvbm1lbnQuXG4gKiBAaW1wbGVtZW50cyB7Wm9uZX1cbiAqL1xuXG5jbGFzcyBMb2NhbFpvbmUgZXh0ZW5kcyBab25lIHtcbiAgLyoqXG4gICAqIEdldCBhIHNpbmdsZXRvbiBpbnN0YW5jZSBvZiB0aGUgbG9jYWwgem9uZVxuICAgKiBAcmV0dXJuIHtMb2NhbFpvbmV9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGluc3RhbmNlKCkge1xuICAgIGlmIChzaW5nbGV0b24gPT09IG51bGwpIHtcbiAgICAgIHNpbmdsZXRvbiA9IG5ldyBMb2NhbFpvbmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2luZ2xldG9uO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqKi9cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ2xvY2FsJztcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKiovXG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgaWYgKGhhc0ludGwoKSkge1xuICAgICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCkucmVzb2x2ZWRPcHRpb25zKCkudGltZVpvbmU7XG4gICAgfSBlbHNlIHJldHVybiAnbG9jYWwnO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqKi9cblxuICBnZXQgdW5pdmVyc2FsKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKiovXG5cbiAgZ2V0IGlzVmFsaWQoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuXG4gIG9mZnNldE5hbWUodHMsIHsgZm9ybWF0LCBsb2NhbGUgfSkge1xuICAgIHJldHVybiBwYXJzZVpvbmVJbmZvKHRzLCBmb3JtYXQsIGxvY2FsZSk7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuXG4gIGZvcm1hdE9mZnNldCh0cywgZm9ybWF0KSB7XG4gICAgcmV0dXJuIGZvcm1hdE9mZnNldCh0aGlzLm9mZnNldCh0cyksIGZvcm1hdCk7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuXG4gIG9mZnNldCh0cykge1xuICAgIHJldHVybiAtbmV3IERhdGUodHMpLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuXG4gIGVxdWFscyhvdGhlclpvbmUpIHtcbiAgICByZXR1cm4gb3RoZXJab25lLnR5cGUgPT09ICdsb2NhbCc7XG4gIH1cbn1cblxuY29uc3QgbWF0Y2hpbmdSZWdleCA9IFJlZ0V4cChgXiR7aWFuYVJlZ2V4LnNvdXJjZX0kYCk7XG5sZXQgZHRmQ2FjaGUgPSB7fTtcblxuZnVuY3Rpb24gbWFrZURURih6b25lKSB7XG4gIGlmICghZHRmQ2FjaGVbem9uZV0pIHtcbiAgICBkdGZDYWNoZVt6b25lXSA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCdlbi1VUycsIHtcbiAgICAgIGhvdXIxMjogZmFsc2UsXG4gICAgICB0aW1lWm9uZTogem9uZSxcbiAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgIG1vbnRoOiAnMi1kaWdpdCcsXG4gICAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICAgIGhvdXI6ICcyLWRpZ2l0JyxcbiAgICAgIG1pbnV0ZTogJzItZGlnaXQnLFxuICAgICAgc2Vjb25kOiAnMi1kaWdpdCcsXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gZHRmQ2FjaGVbem9uZV07XG59XG5cbmNvbnN0IHR5cGVUb1BvcyA9IHtcbiAgeWVhcjogMCxcbiAgbW9udGg6IDEsXG4gIGRheTogMixcbiAgaG91cjogMyxcbiAgbWludXRlOiA0LFxuICBzZWNvbmQ6IDUsXG59O1xuXG5mdW5jdGlvbiBoYWNreU9mZnNldChkdGYsIGRhdGUpIHtcbiAgY29uc3QgZm9ybWF0dGVkID0gZHRmLmZvcm1hdChkYXRlKS5yZXBsYWNlKC9cXHUyMDBFL2csICcnKSxcbiAgICBwYXJzZWQgPSAvKFxcZCspXFwvKFxcZCspXFwvKFxcZCspLD8gKFxcZCspOihcXGQrKTooXFxkKykvLmV4ZWMoZm9ybWF0dGVkKSxcbiAgICBbLCBmTW9udGgsIGZEYXksIGZZZWFyLCBmSG91ciwgZk1pbnV0ZSwgZlNlY29uZF0gPSBwYXJzZWQ7XG4gIHJldHVybiBbZlllYXIsIGZNb250aCwgZkRheSwgZkhvdXIsIGZNaW51dGUsIGZTZWNvbmRdO1xufVxuXG5mdW5jdGlvbiBwYXJ0c09mZnNldChkdGYsIGRhdGUpIHtcbiAgY29uc3QgZm9ybWF0dGVkID0gZHRmLmZvcm1hdFRvUGFydHMoZGF0ZSksXG4gICAgZmlsbGVkID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JtYXR0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB7IHR5cGUsIHZhbHVlIH0gPSBmb3JtYXR0ZWRbaV0sXG4gICAgICBwb3MgPSB0eXBlVG9Qb3NbdHlwZV07XG5cbiAgICBpZiAoIWlzVW5kZWZpbmVkKHBvcykpIHtcbiAgICAgIGZpbGxlZFtwb3NdID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmlsbGVkO1xufVxuXG5sZXQgaWFuYVpvbmVDYWNoZSA9IHt9O1xuXG4vKipcbiAqIEEgem9uZSBpZGVudGlmaWVkIGJ5IGFuIElBTkEgaWRlbnRpZmllciwgbGlrZSBBbWVyaWNhL05ld19Zb3JrXG4gKiBAaW1wbGVtZW50cyB7Wm9uZX1cbiAqL1xuXG5jbGFzcyBJQU5BWm9uZSBleHRlbmRzIFpvbmUge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgc3VwZXIoKTtcbiAgICAvKiogQHByaXZhdGUgKiovXG5cbiAgICB0aGlzLnpvbmVOYW1lID0gbmFtZTtcbiAgICAvKiogQHByaXZhdGUgKiovXG5cbiAgICB0aGlzLnZhbGlkID0gSUFOQVpvbmUuaXNWYWxpZFpvbmUobmFtZSk7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuXG4gIGdldCB0eXBlKCkge1xuICAgIHJldHVybiAnaWFuYSc7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiB0aGlzLnpvbmVOYW1lO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqKi9cblxuICBnZXQgdW5pdmVyc2FsKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKiovXG5cbiAgZ2V0IGlzVmFsaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsaWQ7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBab25lIG5hbWVcbiAgICogQHJldHVybiB7SUFOQVpvbmV9XG4gICAqL1xuICBzdGF0aWMgY3JlYXRlKG5hbWUpIHtcbiAgICBpZiAoIWlhbmFab25lQ2FjaGVbbmFtZV0pIHtcbiAgICAgIGlhbmFab25lQ2FjaGVbbmFtZV0gPSBuZXcgSUFOQVpvbmUobmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlhbmFab25lQ2FjaGVbbmFtZV07XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgbG9jYWwgY2FjaGVzLiBTaG91bGQgb25seSBiZSBuZWNlc3NhcnkgaW4gdGVzdGluZyBzY2VuYXJpb3MuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuXG4gIHN0YXRpYyByZXNldENhY2hlKCkge1xuICAgIGlhbmFab25lQ2FjaGUgPSB7fTtcbiAgICBkdGZDYWNoZSA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgc3RyaW5nIGlzIGEgdmFsaWQgc3BlY2lmaWVyLiBUaGlzIG9ubHkgY2hlY2tzIHRoZSBzdHJpbmcncyBmb3JtYXQsIG5vdCB0aGF0IHRoZSBzcGVjaWZpZXIgaWRlbnRpZmllcyBhIGtub3duIHpvbmU7IHNlZSBpc1ZhbGlkWm9uZSBmb3IgdGhhdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHMgLSBUaGUgc3RyaW5nIHRvIGNoZWNrIHZhbGlkaXR5IG9uXG4gICAqIEBleGFtcGxlIElBTkFab25lLmlzVmFsaWRTcGVjaWZpZXIoXCJBbWVyaWNhL05ld19Zb3JrXCIpIC8vPT4gdHJ1ZVxuICAgKiBAZXhhbXBsZSBJQU5BWm9uZS5pc1ZhbGlkU3BlY2lmaWVyKFwiRmFudGFzaWEvQ2FzdGxlXCIpIC8vPT4gdHJ1ZVxuICAgKiBAZXhhbXBsZSBJQU5BWm9uZS5pc1ZhbGlkU3BlY2lmaWVyKFwiU3BvcnR+fmJsb3JwXCIpIC8vPT4gZmFsc2VcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG5cbiAgc3RhdGljIGlzVmFsaWRTcGVjaWZpZXIocykge1xuICAgIHJldHVybiAhIShzICYmIHMubWF0Y2gobWF0Y2hpbmdSZWdleCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgc3RyaW5nIGlkZW50aWZpZXMgYSByZWFsIHpvbmVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHpvbmUgLSBUaGUgc3RyaW5nIHRvIGNoZWNrXG4gICAqIEBleGFtcGxlIElBTkFab25lLmlzVmFsaWRab25lKFwiQW1lcmljYS9OZXdfWW9ya1wiKSAvLz0+IHRydWVcbiAgICogQGV4YW1wbGUgSUFOQVpvbmUuaXNWYWxpZFpvbmUoXCJGYW50YXNpYS9DYXN0bGVcIikgLy89PiBmYWxzZVxuICAgKiBAZXhhbXBsZSBJQU5BWm9uZS5pc1ZhbGlkWm9uZShcIlNwb3J0fn5ibG9ycFwiKSAvLz0+IGZhbHNlXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuXG4gIHN0YXRpYyBpc1ZhbGlkWm9uZSh6b25lKSB7XG4gICAgdHJ5IHtcbiAgICAgIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCdlbi1VUycsIHtcbiAgICAgICAgdGltZVpvbmU6IHpvbmUsXG4gICAgICB9KS5mb3JtYXQoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gLy8gRXRjL0dNVCs4IC0+IC00ODBcblxuICAvKiogQGlnbm9yZSAqL1xuXG4gIHN0YXRpYyBwYXJzZUdNVE9mZnNldChzcGVjaWZpZXIpIHtcbiAgICBpZiAoc3BlY2lmaWVyKSB7XG4gICAgICBjb25zdCBtYXRjaCA9IHNwZWNpZmllci5tYXRjaCgvXkV0Y1xcL0dNVChbKy1dXFxkezEsMn0pJC9pKTtcblxuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiAtNjAgKiBwYXJzZUludChtYXRjaFsxXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuXG4gIG9mZnNldE5hbWUodHMsIHsgZm9ybWF0LCBsb2NhbGUgfSkge1xuICAgIHJldHVybiBwYXJzZVpvbmVJbmZvKHRzLCBmb3JtYXQsIGxvY2FsZSwgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKiovXG5cbiAgZm9ybWF0T2Zmc2V0KHRzLCBmb3JtYXQpIHtcbiAgICByZXR1cm4gZm9ybWF0T2Zmc2V0KHRoaXMub2Zmc2V0KHRzKSwgZm9ybWF0KTtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKiovXG5cbiAgb2Zmc2V0KHRzKSB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHRzKSxcbiAgICAgIGR0ZiA9IG1ha2VEVEYodGhpcy5uYW1lKSxcbiAgICAgIFt5ZWFyLCBtb250aCwgZGF5LCBob3VyLCBtaW51dGUsIHNlY29uZF0gPSBkdGYuZm9ybWF0VG9QYXJ0c1xuICAgICAgICA/IHBhcnRzT2Zmc2V0KGR0ZiwgZGF0ZSlcbiAgICAgICAgOiBoYWNreU9mZnNldChkdGYsIGRhdGUpLFxuICAgICAgLy8gd29yayBhcm91bmQgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MTAyNTU2NCZjYW49MiZxPSUyMjI0JTNBMDAlMjIlMjBkYXRldGltZWZvcm1hdFxuICAgICAgYWRqdXN0ZWRIb3VyID0gaG91ciA9PT0gMjQgPyAwIDogaG91cjtcbiAgICBjb25zdCBhc1VUQyA9IG9ialRvTG9jYWxUUyh7XG4gICAgICB5ZWFyLFxuICAgICAgbW9udGgsXG4gICAgICBkYXksXG4gICAgICBob3VyOiBhZGp1c3RlZEhvdXIsXG4gICAgICBtaW51dGUsXG4gICAgICBzZWNvbmQsXG4gICAgICBtaWxsaXNlY29uZDogMCxcbiAgICB9KTtcbiAgICBsZXQgYXNUUyA9ICtkYXRlO1xuICAgIGNvbnN0IG92ZXIgPSBhc1RTICUgMTAwMDtcbiAgICBhc1RTIC09IG92ZXIgPj0gMCA/IG92ZXIgOiAxMDAwICsgb3ZlcjtcbiAgICByZXR1cm4gKGFzVVRDIC0gYXNUUykgLyAoNjAgKiAxMDAwKTtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKiovXG5cbiAgZXF1YWxzKG90aGVyWm9uZSkge1xuICAgIHJldHVybiBvdGhlclpvbmUudHlwZSA9PT0gJ2lhbmEnICYmIG90aGVyWm9uZS5uYW1lID09PSB0aGlzLm5hbWU7XG4gIH1cbn1cblxubGV0IHNpbmdsZXRvbiQxID0gbnVsbDtcblxuLyoqXG4gKiBBIHpvbmUgd2l0aCBhIGZpeGVkIG9mZnNldCAobWVhbmluZyBubyBEU1QpXG4gKiBAaW1wbGVtZW50cyB7Wm9uZX1cbiAqL1xuXG5jbGFzcyBGaXhlZE9mZnNldFpvbmUgZXh0ZW5kcyBab25lIHtcbiAgY29uc3RydWN0b3Iob2Zmc2V0KSB7XG4gICAgc3VwZXIoKTtcbiAgICAvKiogQHByaXZhdGUgKiovXG5cbiAgICB0aGlzLmZpeGVkID0gb2Zmc2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHNpbmdsZXRvbiBpbnN0YW5jZSBvZiBVVENcbiAgICogQHJldHVybiB7Rml4ZWRPZmZzZXRab25lfVxuICAgKi9cbiAgc3RhdGljIGdldCB1dGNJbnN0YW5jZSgpIHtcbiAgICBpZiAoc2luZ2xldG9uJDEgPT09IG51bGwpIHtcbiAgICAgIHNpbmdsZXRvbiQxID0gbmV3IEZpeGVkT2Zmc2V0Wm9uZSgwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2luZ2xldG9uJDE7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuXG4gIGdldCB0eXBlKCkge1xuICAgIHJldHVybiAnZml4ZWQnO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqKi9cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5maXhlZCA9PT0gMFxuICAgICAgPyAnVVRDJ1xuICAgICAgOiBgVVRDJHtmb3JtYXRPZmZzZXQodGhpcy5maXhlZCwgJ25hcnJvdycpfWA7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuXG4gIGdldCB1bml2ZXJzYWwoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuXG4gIGdldCBpc1ZhbGlkKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbiBpbnN0YW5jZSB3aXRoIGEgc3BlY2lmaWVkIG9mZnNldFxuICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IC0gVGhlIG9mZnNldCBpbiBtaW51dGVzXG4gICAqIEByZXR1cm4ge0ZpeGVkT2Zmc2V0Wm9uZX1cbiAgICovXG5cbiAgc3RhdGljIGluc3RhbmNlKG9mZnNldCkge1xuICAgIHJldHVybiBvZmZzZXQgPT09IDBcbiAgICAgID8gRml4ZWRPZmZzZXRab25lLnV0Y0luc3RhbmNlXG4gICAgICA6IG5ldyBGaXhlZE9mZnNldFpvbmUob2Zmc2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYW4gaW5zdGFuY2Ugb2YgRml4ZWRPZmZzZXRab25lIGZyb20gYSBVVEMgb2Zmc2V0IHN0cmluZywgbGlrZSBcIlVUQys2XCJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHMgLSBUaGUgb2Zmc2V0IHN0cmluZyB0byBwYXJzZVxuICAgKiBAZXhhbXBsZSBGaXhlZE9mZnNldFpvbmUucGFyc2VTcGVjaWZpZXIoXCJVVEMrNlwiKVxuICAgKiBAZXhhbXBsZSBGaXhlZE9mZnNldFpvbmUucGFyc2VTcGVjaWZpZXIoXCJVVEMrMDZcIilcbiAgICogQGV4YW1wbGUgRml4ZWRPZmZzZXRab25lLnBhcnNlU3BlY2lmaWVyKFwiVVRDLTY6MDBcIilcbiAgICogQHJldHVybiB7Rml4ZWRPZmZzZXRab25lfVxuICAgKi9cblxuICBzdGF0aWMgcGFyc2VTcGVjaWZpZXIocykge1xuICAgIGlmIChzKSB7XG4gICAgICBjb25zdCByID0gcy5tYXRjaCgvXnV0Yyg/OihbKy1dXFxkezEsMn0pKD86OihcXGR7Mn0pKT8pPyQvaSk7XG5cbiAgICAgIGlmIChyKSB7XG4gICAgICAgIHJldHVybiBuZXcgRml4ZWRPZmZzZXRab25lKHNpZ25lZE9mZnNldChyWzFdLCByWzJdKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuXG4gIG9mZnNldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKiovXG5cbiAgZm9ybWF0T2Zmc2V0KHRzLCBmb3JtYXQpIHtcbiAgICByZXR1cm4gZm9ybWF0T2Zmc2V0KHRoaXMuZml4ZWQsIGZvcm1hdCk7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuXG4gIG9mZnNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5maXhlZDtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKiovXG5cbiAgZXF1YWxzKG90aGVyWm9uZSkge1xuICAgIHJldHVybiBvdGhlclpvbmUudHlwZSA9PT0gJ2ZpeGVkJyAmJiBvdGhlclpvbmUuZml4ZWQgPT09IHRoaXMuZml4ZWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBBIHpvbmUgdGhhdCBmYWlsZWQgdG8gcGFyc2UuIFlvdSBzaG91bGQgbmV2ZXIgbmVlZCB0byBpbnN0YW50aWF0ZSB0aGlzLlxuICogQGltcGxlbWVudHMge1pvbmV9XG4gKi9cblxuY2xhc3MgSW52YWxpZFpvbmUgZXh0ZW5kcyBab25lIHtcbiAgY29uc3RydWN0b3Ioem9uZU5hbWUpIHtcbiAgICBzdXBlcigpO1xuICAgIC8qKiAgQHByaXZhdGUgKi9cblxuICAgIHRoaXMuem9uZU5hbWUgPSB6b25lTmFtZTtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKiovXG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdpbnZhbGlkJztcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKiovXG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZU5hbWU7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuXG4gIGdldCB1bml2ZXJzYWwoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqKi9cblxuICBnZXQgaXNWYWxpZCgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuXG4gIG9mZnNldE5hbWUoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuXG4gIGZvcm1hdE9mZnNldCgpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuXG4gIG9mZnNldCgpIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqKi9cblxuICBlcXVhbHMoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBub3JtYWxpemVab25lKGlucHV0LCBkZWZhdWx0Wm9uZSkge1xuICBsZXQgb2Zmc2V0O1xuXG4gIGlmIChpc1VuZGVmaW5lZChpbnB1dCkgfHwgaW5wdXQgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZGVmYXVsdFpvbmU7XG4gIH0gZWxzZSBpZiAoaW5wdXQgaW5zdGFuY2VvZiBab25lKSB7XG4gICAgcmV0dXJuIGlucHV0O1xuICB9IGVsc2UgaWYgKGlzU3RyaW5nKGlucHV0KSkge1xuICAgIGNvbnN0IGxvd2VyZWQgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChsb3dlcmVkID09PSAnbG9jYWwnKSByZXR1cm4gZGVmYXVsdFpvbmU7XG4gICAgZWxzZSBpZiAobG93ZXJlZCA9PT0gJ3V0YycgfHwgbG93ZXJlZCA9PT0gJ2dtdCcpXG4gICAgICByZXR1cm4gRml4ZWRPZmZzZXRab25lLnV0Y0luc3RhbmNlO1xuICAgIGVsc2UgaWYgKChvZmZzZXQgPSBJQU5BWm9uZS5wYXJzZUdNVE9mZnNldChpbnB1dCkpICE9IG51bGwpIHtcbiAgICAgIC8vIGhhbmRsZSBFdGMvR01ULTQsIHdoaWNoIFY4IGNob2tlcyBvblxuICAgICAgcmV0dXJuIEZpeGVkT2Zmc2V0Wm9uZS5pbnN0YW5jZShvZmZzZXQpO1xuICAgIH0gZWxzZSBpZiAoSUFOQVpvbmUuaXNWYWxpZFNwZWNpZmllcihsb3dlcmVkKSlcbiAgICAgIHJldHVybiBJQU5BWm9uZS5jcmVhdGUoaW5wdXQpO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiBGaXhlZE9mZnNldFpvbmUucGFyc2VTcGVjaWZpZXIobG93ZXJlZCkgfHwgbmV3IEludmFsaWRab25lKGlucHV0KTtcbiAgfSBlbHNlIGlmIChpc051bWJlcihpbnB1dCkpIHtcbiAgICByZXR1cm4gRml4ZWRPZmZzZXRab25lLmluc3RhbmNlKGlucHV0KTtcbiAgfSBlbHNlIGlmIChcbiAgICB0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnICYmXG4gICAgaW5wdXQub2Zmc2V0ICYmXG4gICAgdHlwZW9mIGlucHV0Lm9mZnNldCA9PT0gJ251bWJlcidcbiAgKSB7XG4gICAgLy8gVGhpcyBpcyBkdW1iLCBidXQgdGhlIGluc3RhbmNlb2YgY2hlY2sgYWJvdmUgZG9lc24ndCBzZWVtIHRvIHJlYWxseSB3b3JrXG4gICAgLy8gc28gd2UncmUgZHVjayBjaGVja2luZyBpdFxuICAgIHJldHVybiBpbnB1dDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEludmFsaWRab25lKGlucHV0KTtcbiAgfVxufVxuXG5sZXQgbm93ID0gKCkgPT4gRGF0ZS5ub3coKSxcbiAgZGVmYXVsdFpvbmUgPSBudWxsLFxuICAvLyBub3Qgc2V0dGluZyB0aGlzIGRpcmVjdGx5IHRvIExvY2FsWm9uZS5pbnN0YW5jZSBiYyBsb2FkaW5nIG9yZGVyIGlzc3Vlc1xuICBkZWZhdWx0TG9jYWxlID0gbnVsbCxcbiAgZGVmYXVsdE51bWJlcmluZ1N5c3RlbSA9IG51bGwsXG4gIGRlZmF1bHRPdXRwdXRDYWxlbmRhciA9IG51bGwsXG4gIHRocm93T25JbnZhbGlkID0gZmFsc2U7XG5cbi8qKlxuICogU2V0dGluZ3MgY29udGFpbnMgc3RhdGljIGdldHRlcnMgYW5kIHNldHRlcnMgdGhhdCBjb250cm9sIEx1eG9uJ3Mgb3ZlcmFsbCBiZWhhdmlvci4gTHV4b24gaXMgYSBzaW1wbGUgbGlicmFyeSB3aXRoIGZldyBvcHRpb25zLCBidXQgdGhlIG9uZXMgaXQgZG9lcyBoYXZlIGxpdmUgaGVyZS5cbiAqL1xuXG5jbGFzcyBTZXR0aW5ncyB7XG4gIC8qKlxuICAgKiBHZXQgdGhlIGNhbGxiYWNrIGZvciByZXR1cm5pbmcgdGhlIGN1cnJlbnQgdGltZXN0YW1wLlxuICAgKiBAdHlwZSB7ZnVuY3Rpb259XG4gICAqL1xuICBzdGF0aWMgZ2V0IG5vdygpIHtcbiAgICByZXR1cm4gbm93O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgY2FsbGJhY2sgZm9yIHJldHVybmluZyB0aGUgY3VycmVudCB0aW1lc3RhbXAuXG4gICAqIFRoZSBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIGEgbnVtYmVyLCB3aGljaCB3aWxsIGJlIGludGVycHJldGVkIGFzIGFuIEVwb2NoIG1pbGxpc2Vjb25kIGNvdW50XG4gICAqIEB0eXBlIHtmdW5jdGlvbn1cbiAgICogQGV4YW1wbGUgU2V0dGluZ3Mubm93ID0gKCkgPT4gRGF0ZS5ub3coKSArIDMwMDAgLy8gcHJldGVuZCBpdCBpcyAzIHNlY29uZHMgaW4gdGhlIGZ1dHVyZVxuICAgKiBAZXhhbXBsZSBTZXR0aW5ncy5ub3cgPSAoKSA9PiAwIC8vIGFsd2F5cyBwcmV0ZW5kIGl0J3MgSmFuIDEsIDE5NzAgYXQgbWlkbmlnaHQgaW4gVVRDIHRpbWVcbiAgICovXG5cbiAgc3RhdGljIHNldCBub3cobikge1xuICAgIG5vdyA9IG47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkZWZhdWx0IHRpbWUgem9uZSB0byBjcmVhdGUgRGF0ZVRpbWVzIGluLlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRab25lTmFtZSgpIHtcbiAgICByZXR1cm4gU2V0dGluZ3MuZGVmYXVsdFpvbmUubmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGRlZmF1bHQgdGltZSB6b25lIHRvIGNyZWF0ZSBEYXRlVGltZXMgaW4uIERvZXMgbm90IGFmZmVjdCBleGlzdGluZyBpbnN0YW5jZXMuXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuXG4gIHN0YXRpYyBzZXQgZGVmYXVsdFpvbmVOYW1lKHopIHtcbiAgICBpZiAoIXopIHtcbiAgICAgIGRlZmF1bHRab25lID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVmYXVsdFpvbmUgPSBub3JtYWxpemVab25lKHopO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRlZmF1bHQgdGltZSB6b25lIG9iamVjdCB0byBjcmVhdGUgRGF0ZVRpbWVzIGluLiBEb2VzIG5vdCBhZmZlY3QgZXhpc3RpbmcgaW5zdGFuY2VzLlxuICAgKiBAdHlwZSB7Wm9uZX1cbiAgICovXG5cbiAgc3RhdGljIGdldCBkZWZhdWx0Wm9uZSgpIHtcbiAgICByZXR1cm4gZGVmYXVsdFpvbmUgfHwgTG9jYWxab25lLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGVmYXVsdCBsb2NhbGUgdG8gY3JlYXRlIERhdGVUaW1lcyB3aXRoLiBEb2VzIG5vdCBhZmZlY3QgZXhpc3RpbmcgaW5zdGFuY2VzLlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRMb2NhbGUoKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRMb2NhbGU7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBkZWZhdWx0IGxvY2FsZSB0byBjcmVhdGUgRGF0ZVRpbWVzIHdpdGguIERvZXMgbm90IGFmZmVjdCBleGlzdGluZyBpbnN0YW5jZXMuXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuXG4gIHN0YXRpYyBzZXQgZGVmYXVsdExvY2FsZShsb2NhbGUpIHtcbiAgICBkZWZhdWx0TG9jYWxlID0gbG9jYWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGVmYXVsdCBudW1iZXJpbmcgc3lzdGVtIHRvIGNyZWF0ZSBEYXRlVGltZXMgd2l0aC4gRG9lcyBub3QgYWZmZWN0IGV4aXN0aW5nIGluc3RhbmNlcy5cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG5cbiAgc3RhdGljIGdldCBkZWZhdWx0TnVtYmVyaW5nU3lzdGVtKCkge1xuICAgIHJldHVybiBkZWZhdWx0TnVtYmVyaW5nU3lzdGVtO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZGVmYXVsdCBudW1iZXJpbmcgc3lzdGVtIHRvIGNyZWF0ZSBEYXRlVGltZXMgd2l0aC4gRG9lcyBub3QgYWZmZWN0IGV4aXN0aW5nIGluc3RhbmNlcy5cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG5cbiAgc3RhdGljIHNldCBkZWZhdWx0TnVtYmVyaW5nU3lzdGVtKG51bWJlcmluZ1N5c3RlbSkge1xuICAgIGRlZmF1bHROdW1iZXJpbmdTeXN0ZW0gPSBudW1iZXJpbmdTeXN0ZW07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkZWZhdWx0IG91dHB1dCBjYWxlbmRhciB0byBjcmVhdGUgRGF0ZVRpbWVzIHdpdGguIERvZXMgbm90IGFmZmVjdCBleGlzdGluZyBpbnN0YW5jZXMuXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdE91dHB1dENhbGVuZGFyKCkge1xuICAgIHJldHVybiBkZWZhdWx0T3V0cHV0Q2FsZW5kYXI7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBkZWZhdWx0IG91dHB1dCBjYWxlbmRhciB0byBjcmVhdGUgRGF0ZVRpbWVzIHdpdGguIERvZXMgbm90IGFmZmVjdCBleGlzdGluZyBpbnN0YW5jZXMuXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuXG4gIHN0YXRpYyBzZXQgZGVmYXVsdE91dHB1dENhbGVuZGFyKG91dHB1dENhbGVuZGFyKSB7XG4gICAgZGVmYXVsdE91dHB1dENhbGVuZGFyID0gb3V0cHV0Q2FsZW5kYXI7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHdoZXRoZXIgTHV4b24gd2lsbCB0aHJvdyB3aGVuIGl0IGVuY291bnRlcnMgaW52YWxpZCBEYXRlVGltZXMsIER1cmF0aW9ucywgb3IgSW50ZXJ2YWxzXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cblxuICBzdGF0aWMgZ2V0IHRocm93T25JbnZhbGlkKCkge1xuICAgIHJldHVybiB0aHJvd09uSW52YWxpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgd2hldGhlciBMdXhvbiB3aWxsIHRocm93IHdoZW4gaXQgZW5jb3VudGVycyBpbnZhbGlkIERhdGVUaW1lcywgRHVyYXRpb25zLCBvciBJbnRlcnZhbHNcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuXG4gIHN0YXRpYyBzZXQgdGhyb3dPbkludmFsaWQodCkge1xuICAgIHRocm93T25JbnZhbGlkID0gdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBMdXhvbidzIGdsb2JhbCBjYWNoZXMuIFNob3VsZCBvbmx5IGJlIG5lY2Vzc2FyeSBpbiB0ZXN0aW5nIHNjZW5hcmlvcy5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG5cbiAgc3RhdGljIHJlc2V0Q2FjaGVzKCkge1xuICAgIExvY2FsZS5yZXNldENhY2hlKCk7XG4gICAgSUFOQVpvbmUucmVzZXRDYWNoZSgpO1xuICB9XG59XG5cbmxldCBpbnRsRFRDYWNoZSA9IHt9O1xuXG5mdW5jdGlvbiBnZXRDYWNoZWREVEYobG9jU3RyaW5nLCBvcHRzID0ge30pIHtcbiAgY29uc3Qga2V5ID0gSlNPTi5zdHJpbmdpZnkoW2xvY1N0cmluZywgb3B0c10pO1xuICBsZXQgZHRmID0gaW50bERUQ2FjaGVba2V5XTtcblxuICBpZiAoIWR0Zikge1xuICAgIGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY1N0cmluZywgb3B0cyk7XG4gICAgaW50bERUQ2FjaGVba2V5XSA9IGR0ZjtcbiAgfVxuXG4gIHJldHVybiBkdGY7XG59XG5cbmxldCBpbnRsTnVtQ2FjaGUgPSB7fTtcblxuZnVuY3Rpb24gZ2V0Q2FjaGVkSU5GKGxvY1N0cmluZywgb3B0cyA9IHt9KSB7XG4gIGNvbnN0IGtleSA9IEpTT04uc3RyaW5naWZ5KFtsb2NTdHJpbmcsIG9wdHNdKTtcbiAgbGV0IGluZiA9IGludGxOdW1DYWNoZVtrZXldO1xuXG4gIGlmICghaW5mKSB7XG4gICAgaW5mID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KGxvY1N0cmluZywgb3B0cyk7XG4gICAgaW50bE51bUNhY2hlW2tleV0gPSBpbmY7XG4gIH1cblxuICByZXR1cm4gaW5mO1xufVxuXG5sZXQgaW50bFJlbENhY2hlID0ge307XG5cbmZ1bmN0aW9uIGdldENhY2hlZFJURihsb2NTdHJpbmcsIG9wdHMgPSB7fSkge1xuICBjb25zdCBjYWNoZUtleU9wdHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShvcHRzLCBbJ2Jhc2UnXSk7IC8vIGV4Y2x1ZGUgYGJhc2VgIGZyb20gdGhlIG9wdGlvbnNcblxuICBjb25zdCBrZXkgPSBKU09OLnN0cmluZ2lmeShbbG9jU3RyaW5nLCBjYWNoZUtleU9wdHNdKTtcbiAgbGV0IGluZiA9IGludGxSZWxDYWNoZVtrZXldO1xuXG4gIGlmICghaW5mKSB7XG4gICAgaW5mID0gbmV3IEludGwuUmVsYXRpdmVUaW1lRm9ybWF0KGxvY1N0cmluZywgb3B0cyk7XG4gICAgaW50bFJlbENhY2hlW2tleV0gPSBpbmY7XG4gIH1cblxuICByZXR1cm4gaW5mO1xufVxuXG5sZXQgc3lzTG9jYWxlQ2FjaGUgPSBudWxsO1xuXG5mdW5jdGlvbiBzeXN0ZW1Mb2NhbGUoKSB7XG4gIGlmIChzeXNMb2NhbGVDYWNoZSkge1xuICAgIHJldHVybiBzeXNMb2NhbGVDYWNoZTtcbiAgfSBlbHNlIGlmIChoYXNJbnRsKCkpIHtcbiAgICBjb25zdCBjb21wdXRlZFN5cyA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCkucmVzb2x2ZWRPcHRpb25zKCkubG9jYWxlOyAvLyBub2RlIHNvbWV0aW1lcyBkZWZhdWx0cyB0byBcInVuZFwiLiBPdmVycmlkZSB0aGF0IGJlY2F1c2UgdGhhdCBpcyBkdW1iXG5cbiAgICBzeXNMb2NhbGVDYWNoZSA9XG4gICAgICAhY29tcHV0ZWRTeXMgfHwgY29tcHV0ZWRTeXMgPT09ICd1bmQnID8gJ2VuLVVTJyA6IGNvbXB1dGVkU3lzO1xuICAgIHJldHVybiBzeXNMb2NhbGVDYWNoZTtcbiAgfSBlbHNlIHtcbiAgICBzeXNMb2NhbGVDYWNoZSA9ICdlbi1VUyc7XG4gICAgcmV0dXJuIHN5c0xvY2FsZUNhY2hlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlTG9jYWxlU3RyaW5nKGxvY2FsZVN0cikge1xuICAvLyBJIHJlYWxseSB3YW50IHRvIGF2b2lkIHdyaXRpbmcgYSBCQ1AgNDcgcGFyc2VyXG4gIC8vIHNlZSwgZS5nLiBodHRwczovL2dpdGh1Yi5jb20vd29vb3JtL2JjcC00N1xuICAvLyBJbnN0ZWFkLCB3ZSdsbCBkbyB0aGlzOlxuICAvLyBhKSBpZiB0aGUgc3RyaW5nIGhhcyBubyAtdSBleHRlbnNpb25zLCBqdXN0IGxlYXZlIGl0IGFsb25lXG4gIC8vIGIpIGlmIGl0IGRvZXMsIHVzZSBJbnRsIHRvIHJlc29sdmUgZXZlcnl0aGluZ1xuICAvLyBjKSBpZiBJbnRsIGZhaWxzLCB0cnkgYWdhaW4gd2l0aG91dCB0aGUgLXVcbiAgY29uc3QgdUluZGV4ID0gbG9jYWxlU3RyLmluZGV4T2YoJy11LScpO1xuXG4gIGlmICh1SW5kZXggPT09IC0xKSB7XG4gICAgcmV0dXJuIFtsb2NhbGVTdHJdO1xuICB9IGVsc2Uge1xuICAgIGxldCBvcHRpb25zO1xuICAgIGNvbnN0IHNtYWxsZXIgPSBsb2NhbGVTdHIuc3Vic3RyaW5nKDAsIHVJbmRleCk7XG5cbiAgICB0cnkge1xuICAgICAgb3B0aW9ucyA9IGdldENhY2hlZERURihsb2NhbGVTdHIpLnJlc29sdmVkT3B0aW9ucygpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIG9wdGlvbnMgPSBnZXRDYWNoZWREVEYoc21hbGxlcikucmVzb2x2ZWRPcHRpb25zKCk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBudW1iZXJpbmdTeXN0ZW0sIGNhbGVuZGFyIH0gPSBvcHRpb25zOyAvLyByZXR1cm4gdGhlIHNtYWxsZXIgb25lIHNvIHRoYXQgd2UgY2FuIGFwcGVuZCB0aGUgY2FsZW5kYXIgYW5kIG51bWJlcmluZyBvdmVycmlkZXMgdG8gaXRcblxuICAgIHJldHVybiBbc21hbGxlciwgbnVtYmVyaW5nU3lzdGVtLCBjYWxlbmRhcl07XG4gIH1cbn1cblxuZnVuY3Rpb24gaW50bENvbmZpZ1N0cmluZyhsb2NhbGVTdHIsIG51bWJlcmluZ1N5c3RlbSwgb3V0cHV0Q2FsZW5kYXIpIHtcbiAgaWYgKGhhc0ludGwoKSkge1xuICAgIGlmIChvdXRwdXRDYWxlbmRhciB8fCBudW1iZXJpbmdTeXN0ZW0pIHtcbiAgICAgIGxvY2FsZVN0ciArPSAnLXUnO1xuXG4gICAgICBpZiAob3V0cHV0Q2FsZW5kYXIpIHtcbiAgICAgICAgbG9jYWxlU3RyICs9IGAtY2EtJHtvdXRwdXRDYWxlbmRhcn1gO1xuICAgICAgfVxuXG4gICAgICBpZiAobnVtYmVyaW5nU3lzdGVtKSB7XG4gICAgICAgIGxvY2FsZVN0ciArPSBgLW51LSR7bnVtYmVyaW5nU3lzdGVtfWA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBsb2NhbGVTdHI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBsb2NhbGVTdHI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBbXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXBNb250aHMoZikge1xuICBjb25zdCBtcyA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAxOyBpIDw9IDEyOyBpKyspIHtcbiAgICBjb25zdCBkdCA9IERhdGVUaW1lLnV0YygyMDE2LCBpLCAxKTtcbiAgICBtcy5wdXNoKGYoZHQpKTtcbiAgfVxuXG4gIHJldHVybiBtcztcbn1cblxuZnVuY3Rpb24gbWFwV2Vla2RheXMoZikge1xuICBjb25zdCBtcyA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAxOyBpIDw9IDc7IGkrKykge1xuICAgIGNvbnN0IGR0ID0gRGF0ZVRpbWUudXRjKDIwMTYsIDExLCAxMyArIGkpO1xuICAgIG1zLnB1c2goZihkdCkpO1xuICB9XG5cbiAgcmV0dXJuIG1zO1xufVxuXG5mdW5jdGlvbiBsaXN0U3R1ZmYobG9jLCBsZW5ndGgsIGRlZmF1bHRPSywgZW5nbGlzaEZuLCBpbnRsRm4pIHtcbiAgY29uc3QgbW9kZSA9IGxvYy5saXN0aW5nTW9kZShkZWZhdWx0T0spO1xuXG4gIGlmIChtb2RlID09PSAnZXJyb3InKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSBpZiAobW9kZSA9PT0gJ2VuJykge1xuICAgIHJldHVybiBlbmdsaXNoRm4obGVuZ3RoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaW50bEZuKGxlbmd0aCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc3VwcG9ydHNGYXN0TnVtYmVycyhsb2MpIHtcbiAgaWYgKGxvYy5udW1iZXJpbmdTeXN0ZW0gJiYgbG9jLm51bWJlcmluZ1N5c3RlbSAhPT0gJ2xhdG4nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAoXG4gICAgICBsb2MubnVtYmVyaW5nU3lzdGVtID09PSAnbGF0bicgfHxcbiAgICAgICFsb2MubG9jYWxlIHx8XG4gICAgICBsb2MubG9jYWxlLnN0YXJ0c1dpdGgoJ2VuJykgfHxcbiAgICAgIChoYXNJbnRsKCkgJiZcbiAgICAgICAgbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jLmludGwpLnJlc29sdmVkT3B0aW9ucygpLm51bWJlcmluZ1N5c3RlbSA9PT1cbiAgICAgICAgICAnbGF0bicpXG4gICAgKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuY2xhc3MgUG9seU51bWJlckZvcm1hdHRlciB7XG4gIGNvbnN0cnVjdG9yKGludGwsIGZvcmNlU2ltcGxlLCBvcHRzKSB7XG4gICAgdGhpcy5wYWRUbyA9IG9wdHMucGFkVG8gfHwgMDtcbiAgICB0aGlzLmZsb29yID0gb3B0cy5mbG9vciB8fCBmYWxzZTtcblxuICAgIGlmICghZm9yY2VTaW1wbGUgJiYgaGFzSW50bCgpKSB7XG4gICAgICBjb25zdCBpbnRsT3B0cyA9IHtcbiAgICAgICAgdXNlR3JvdXBpbmc6IGZhbHNlLFxuICAgICAgfTtcbiAgICAgIGlmIChvcHRzLnBhZFRvID4gMCkgaW50bE9wdHMubWluaW11bUludGVnZXJEaWdpdHMgPSBvcHRzLnBhZFRvO1xuICAgICAgdGhpcy5pbmYgPSBnZXRDYWNoZWRJTkYoaW50bCwgaW50bE9wdHMpO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdChpKSB7XG4gICAgaWYgKHRoaXMuaW5mKSB7XG4gICAgICBjb25zdCBmaXhlZCA9IHRoaXMuZmxvb3IgPyBNYXRoLmZsb29yKGkpIDogaTtcbiAgICAgIHJldHVybiB0aGlzLmluZi5mb3JtYXQoZml4ZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0byBtYXRjaCB0aGUgYnJvd3NlcidzIG51bWJlcmZvcm1hdHRlciBkZWZhdWx0c1xuICAgICAgY29uc3QgZml4ZWQgPSB0aGlzLmZsb29yID8gTWF0aC5mbG9vcihpKSA6IHJvdW5kVG8oaSwgMyk7XG4gICAgICByZXR1cm4gcGFkU3RhcnQoZml4ZWQsIHRoaXMucGFkVG8pO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuY2xhc3MgUG9seURhdGVGb3JtYXR0ZXIge1xuICBjb25zdHJ1Y3RvcihkdCwgaW50bCwgb3B0cykge1xuICAgIHRoaXMub3B0cyA9IG9wdHM7XG4gICAgdGhpcy5oYXNJbnRsID0gaGFzSW50bCgpO1xuICAgIGxldCB6O1xuXG4gICAgaWYgKGR0LnpvbmUudW5pdmVyc2FsICYmIHRoaXMuaGFzSW50bCkge1xuICAgICAgLy8gQ2hyb21pdW0gZG9lc24ndCBzdXBwb3J0IGZpeGVkLW9mZnNldCB6b25lcyBsaWtlIEV0Yy9HTVQrOCBpbiBpdHMgZm9ybWF0dGVyLFxuICAgICAgLy8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTM2NDM3NC5cbiAgICAgIC8vIFNvIHdlIGhhdmUgdG8gbWFrZSBkby4gVHdvIGNhc2VzOlxuICAgICAgLy8gMS4gVGhlIGZvcm1hdCBvcHRpb25zIHRlbGwgdXMgdG8gc2hvdyB0aGUgem9uZS4gV2UgY2FuJ3QgZG8gdGhhdCwgc28gdGhlIGJlc3RcbiAgICAgIC8vIHdlIGNhbiBkbyBpcyBmb3JtYXQgdGhlIGRhdGUgaW4gVVRDLlxuICAgICAgLy8gMi4gVGhlIGZvcm1hdCBvcHRpb25zIGRvbid0IHRlbGwgdXMgdG8gc2hvdyB0aGUgem9uZS4gVGhlbiB3ZSBjYW4gYWRqdXN0IHRoZW1cbiAgICAgIC8vIHRoZSB0aW1lIGFuZCB0ZWxsIHRoZSBmb3JtYXR0ZXIgdG8gc2hvdyBpdCB0byB1cyBpbiBVVEMsIHNvIHRoYXQgdGhlIHRpbWUgaXMgcmlnaHRcbiAgICAgIC8vIGFuZCB0aGUgYmFkIHpvbmUgZG9lc24ndCBzaG93IHVwLlxuICAgICAgLy8gV2UgY2FuIGNsZWFuIGFsbCB0aGlzIHVwIHdoZW4gQ2hyb21lIGZpeGVzIHRoaXMuXG4gICAgICB6ID0gJ1VUQyc7XG5cbiAgICAgIGlmIChvcHRzLnRpbWVab25lTmFtZSkge1xuICAgICAgICB0aGlzLmR0ID0gZHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmR0ID1cbiAgICAgICAgICBkdC5vZmZzZXQgPT09IDBcbiAgICAgICAgICAgID8gZHRcbiAgICAgICAgICAgIDogRGF0ZVRpbWUuZnJvbU1pbGxpcyhkdC50cyArIGR0Lm9mZnNldCAqIDYwICogMTAwMCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkdC56b25lLnR5cGUgPT09ICdsb2NhbCcpIHtcbiAgICAgIHRoaXMuZHQgPSBkdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kdCA9IGR0O1xuICAgICAgeiA9IGR0LnpvbmUubmFtZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oYXNJbnRsKSB7XG4gICAgICBjb25zdCBpbnRsT3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0cyk7XG5cbiAgICAgIGlmICh6KSB7XG4gICAgICAgIGludGxPcHRzLnRpbWVab25lID0gejtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kdGYgPSBnZXRDYWNoZWREVEYoaW50bCwgaW50bE9wdHMpO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdCgpIHtcbiAgICBpZiAodGhpcy5oYXNJbnRsKSB7XG4gICAgICByZXR1cm4gdGhpcy5kdGYuZm9ybWF0KHRoaXMuZHQudG9KU0RhdGUoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRva2VuRm9ybWF0ID0gZm9ybWF0U3RyaW5nKHRoaXMub3B0cyksXG4gICAgICAgIGxvYyA9IExvY2FsZS5jcmVhdGUoJ2VuLVVTJyk7XG4gICAgICByZXR1cm4gRm9ybWF0dGVyLmNyZWF0ZShsb2MpLmZvcm1hdERhdGVUaW1lRnJvbVN0cmluZyhcbiAgICAgICAgdGhpcy5kdCxcbiAgICAgICAgdG9rZW5Gb3JtYXQsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdFRvUGFydHMoKSB7XG4gICAgaWYgKHRoaXMuaGFzSW50bCAmJiBoYXNGb3JtYXRUb1BhcnRzKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmR0Zi5mb3JtYXRUb1BhcnRzKHRoaXMuZHQudG9KU0RhdGUoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoaXMgaXMga2luZCBvZiBhIGNvcCBvdXQuIFdlIGFjdHVhbGx5IGNvdWxkIGRvIHRoaXMgZm9yIEVuZ2xpc2guIEhvd2V2ZXIsIHdlIGNvdWxkbid0IGRvIGl0IGZvciBpbnRsIHN0cmluZ3NcbiAgICAgIC8vIGFuZCBJTU8gaXQncyB0b28gd2VpcmQgdG8gaGF2ZSBhbiB1bmNhbm55IHZhbGxleSBsaWtlIHRoYXRcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICByZXNvbHZlZE9wdGlvbnMoKSB7XG4gICAgaWYgKHRoaXMuaGFzSW50bCkge1xuICAgICAgcmV0dXJuIHRoaXMuZHRmLnJlc29sdmVkT3B0aW9ucygpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsb2NhbGU6ICdlbi1VUycsXG4gICAgICAgIG51bWJlcmluZ1N5c3RlbTogJ2xhdG4nLFxuICAgICAgICBvdXRwdXRDYWxlbmRhcjogJ2dyZWdvcnknLFxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5cbmNsYXNzIFBvbHlSZWxGb3JtYXR0ZXIge1xuICBjb25zdHJ1Y3RvcihpbnRsLCBpc0VuZ2xpc2gsIG9wdHMpIHtcbiAgICB0aGlzLm9wdHMgPSBPYmplY3QuYXNzaWduKFxuICAgICAge1xuICAgICAgICBzdHlsZTogJ2xvbmcnLFxuICAgICAgfSxcbiAgICAgIG9wdHMsXG4gICAgKTtcblxuICAgIGlmICghaXNFbmdsaXNoICYmIGhhc1JlbGF0aXZlKCkpIHtcbiAgICAgIHRoaXMucnRmID0gZ2V0Q2FjaGVkUlRGKGludGwsIG9wdHMpO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdChjb3VudCwgdW5pdCkge1xuICAgIGlmICh0aGlzLnJ0Zikge1xuICAgICAgcmV0dXJuIHRoaXMucnRmLmZvcm1hdChjb3VudCwgdW5pdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmb3JtYXRSZWxhdGl2ZVRpbWUoXG4gICAgICAgIHVuaXQsXG4gICAgICAgIGNvdW50LFxuICAgICAgICB0aGlzLm9wdHMubnVtZXJpYyxcbiAgICAgICAgdGhpcy5vcHRzLnN0eWxlICE9PSAnbG9uZycsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdFRvUGFydHMoY291bnQsIHVuaXQpIHtcbiAgICBpZiAodGhpcy5ydGYpIHtcbiAgICAgIHJldHVybiB0aGlzLnJ0Zi5mb3JtYXRUb1BhcnRzKGNvdW50LCB1bml0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuY2xhc3MgTG9jYWxlIHtcbiAgY29uc3RydWN0b3IobG9jYWxlLCBudW1iZXJpbmcsIG91dHB1dENhbGVuZGFyLCBzcGVjaWZpZWRMb2NhbGUpIHtcbiAgICBjb25zdCBbcGFyc2VkTG9jYWxlLCBwYXJzZWROdW1iZXJpbmdTeXN0ZW0sIHBhcnNlZE91dHB1dENhbGVuZGFyXSA9XG4gICAgICBwYXJzZUxvY2FsZVN0cmluZyhsb2NhbGUpO1xuICAgIHRoaXMubG9jYWxlID0gcGFyc2VkTG9jYWxlO1xuICAgIHRoaXMubnVtYmVyaW5nU3lzdGVtID0gbnVtYmVyaW5nIHx8IHBhcnNlZE51bWJlcmluZ1N5c3RlbSB8fCBudWxsO1xuICAgIHRoaXMub3V0cHV0Q2FsZW5kYXIgPSBvdXRwdXRDYWxlbmRhciB8fCBwYXJzZWRPdXRwdXRDYWxlbmRhciB8fCBudWxsO1xuICAgIHRoaXMuaW50bCA9IGludGxDb25maWdTdHJpbmcoXG4gICAgICB0aGlzLmxvY2FsZSxcbiAgICAgIHRoaXMubnVtYmVyaW5nU3lzdGVtLFxuICAgICAgdGhpcy5vdXRwdXRDYWxlbmRhcixcbiAgICApO1xuICAgIHRoaXMud2Vla2RheXNDYWNoZSA9IHtcbiAgICAgIGZvcm1hdDoge30sXG4gICAgICBzdGFuZGFsb25lOiB7fSxcbiAgICB9O1xuICAgIHRoaXMubW9udGhzQ2FjaGUgPSB7XG4gICAgICBmb3JtYXQ6IHt9LFxuICAgICAgc3RhbmRhbG9uZToge30sXG4gICAgfTtcbiAgICB0aGlzLm1lcmlkaWVtQ2FjaGUgPSBudWxsO1xuICAgIHRoaXMuZXJhQ2FjaGUgPSB7fTtcbiAgICB0aGlzLnNwZWNpZmllZExvY2FsZSA9IHNwZWNpZmllZExvY2FsZTtcbiAgICB0aGlzLmZhc3ROdW1iZXJzQ2FjaGVkID0gbnVsbDtcbiAgfVxuXG4gIGdldCBmYXN0TnVtYmVycygpIHtcbiAgICBpZiAodGhpcy5mYXN0TnVtYmVyc0NhY2hlZCA9PSBudWxsKSB7XG4gICAgICB0aGlzLmZhc3ROdW1iZXJzQ2FjaGVkID0gc3VwcG9ydHNGYXN0TnVtYmVycyh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5mYXN0TnVtYmVyc0NhY2hlZDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tT3B0cyhvcHRzKSB7XG4gICAgcmV0dXJuIExvY2FsZS5jcmVhdGUoXG4gICAgICBvcHRzLmxvY2FsZSxcbiAgICAgIG9wdHMubnVtYmVyaW5nU3lzdGVtLFxuICAgICAgb3B0cy5vdXRwdXRDYWxlbmRhcixcbiAgICAgIG9wdHMuZGVmYXVsdFRvRU4sXG4gICAgKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUobG9jYWxlLCBudW1iZXJpbmdTeXN0ZW0sIG91dHB1dENhbGVuZGFyLCBkZWZhdWx0VG9FTiA9IGZhbHNlKSB7XG4gICAgY29uc3Qgc3BlY2lmaWVkTG9jYWxlID0gbG9jYWxlIHx8IFNldHRpbmdzLmRlZmF1bHRMb2NhbGUsXG4gICAgICAvLyB0aGUgc3lzdGVtIGxvY2FsZSBpcyB1c2VmdWwgZm9yIGh1bWFuIHJlYWRhYmxlIHN0cmluZ3MgYnV0IGFubm95aW5nIGZvciBwYXJzaW5nL2Zvcm1hdHRpbmcga25vd24gZm9ybWF0c1xuICAgICAgbG9jYWxlUiA9IHNwZWNpZmllZExvY2FsZSB8fCAoZGVmYXVsdFRvRU4gPyAnZW4tVVMnIDogc3lzdGVtTG9jYWxlKCkpLFxuICAgICAgbnVtYmVyaW5nU3lzdGVtUiA9IG51bWJlcmluZ1N5c3RlbSB8fCBTZXR0aW5ncy5kZWZhdWx0TnVtYmVyaW5nU3lzdGVtLFxuICAgICAgb3V0cHV0Q2FsZW5kYXJSID0gb3V0cHV0Q2FsZW5kYXIgfHwgU2V0dGluZ3MuZGVmYXVsdE91dHB1dENhbGVuZGFyO1xuICAgIHJldHVybiBuZXcgTG9jYWxlKFxuICAgICAgbG9jYWxlUixcbiAgICAgIG51bWJlcmluZ1N5c3RlbVIsXG4gICAgICBvdXRwdXRDYWxlbmRhclIsXG4gICAgICBzcGVjaWZpZWRMb2NhbGUsXG4gICAgKTtcbiAgfVxuXG4gIHN0YXRpYyByZXNldENhY2hlKCkge1xuICAgIHN5c0xvY2FsZUNhY2hlID0gbnVsbDtcbiAgICBpbnRsRFRDYWNoZSA9IHt9O1xuICAgIGludGxOdW1DYWNoZSA9IHt9O1xuICAgIGludGxSZWxDYWNoZSA9IHt9O1xuICB9XG5cbiAgc3RhdGljIGZyb21PYmplY3QoeyBsb2NhbGUsIG51bWJlcmluZ1N5c3RlbSwgb3V0cHV0Q2FsZW5kYXIgfSA9IHt9KSB7XG4gICAgcmV0dXJuIExvY2FsZS5jcmVhdGUobG9jYWxlLCBudW1iZXJpbmdTeXN0ZW0sIG91dHB1dENhbGVuZGFyKTtcbiAgfVxuXG4gIGxpc3RpbmdNb2RlKGRlZmF1bHRPSyA9IHRydWUpIHtcbiAgICBjb25zdCBpbnRsID0gaGFzSW50bCgpLFxuICAgICAgaGFzRlRQID0gaW50bCAmJiBoYXNGb3JtYXRUb1BhcnRzKCksXG4gICAgICBpc0FjdHVhbGx5RW4gPSB0aGlzLmlzRW5nbGlzaCgpLFxuICAgICAgaGFzTm9XZWlyZG5lc3MgPVxuICAgICAgICAodGhpcy5udW1iZXJpbmdTeXN0ZW0gPT09IG51bGwgfHwgdGhpcy5udW1iZXJpbmdTeXN0ZW0gPT09ICdsYXRuJykgJiZcbiAgICAgICAgKHRoaXMub3V0cHV0Q2FsZW5kYXIgPT09IG51bGwgfHwgdGhpcy5vdXRwdXRDYWxlbmRhciA9PT0gJ2dyZWdvcnknKTtcblxuICAgIGlmICghaGFzRlRQICYmICEoaXNBY3R1YWxseUVuICYmIGhhc05vV2VpcmRuZXNzKSAmJiAhZGVmYXVsdE9LKSB7XG4gICAgICByZXR1cm4gJ2Vycm9yJztcbiAgICB9IGVsc2UgaWYgKCFoYXNGVFAgfHwgKGlzQWN0dWFsbHlFbiAmJiBoYXNOb1dlaXJkbmVzcykpIHtcbiAgICAgIHJldHVybiAnZW4nO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ2ludGwnO1xuICAgIH1cbiAgfVxuXG4gIGNsb25lKGFsdHMpIHtcbiAgICBpZiAoIWFsdHMgfHwgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYWx0cykubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIExvY2FsZS5jcmVhdGUoXG4gICAgICAgIGFsdHMubG9jYWxlIHx8IHRoaXMuc3BlY2lmaWVkTG9jYWxlLFxuICAgICAgICBhbHRzLm51bWJlcmluZ1N5c3RlbSB8fCB0aGlzLm51bWJlcmluZ1N5c3RlbSxcbiAgICAgICAgYWx0cy5vdXRwdXRDYWxlbmRhciB8fCB0aGlzLm91dHB1dENhbGVuZGFyLFxuICAgICAgICBhbHRzLmRlZmF1bHRUb0VOIHx8IGZhbHNlLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZWRlZmF1bHRUb0VOKGFsdHMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmNsb25lKFxuICAgICAgT2JqZWN0LmFzc2lnbih7fSwgYWx0cywge1xuICAgICAgICBkZWZhdWx0VG9FTjogdHJ1ZSxcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICByZWRlZmF1bHRUb1N5c3RlbShhbHRzID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZShcbiAgICAgIE9iamVjdC5hc3NpZ24oe30sIGFsdHMsIHtcbiAgICAgICAgZGVmYXVsdFRvRU46IGZhbHNlLFxuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIG1vbnRocyhsZW5ndGgsIGZvcm1hdCA9IGZhbHNlLCBkZWZhdWx0T0sgPSB0cnVlKSB7XG4gICAgcmV0dXJuIGxpc3RTdHVmZih0aGlzLCBsZW5ndGgsIGRlZmF1bHRPSywgbW9udGhzLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbnRsID0gZm9ybWF0XG4gICAgICAgICAgPyB7XG4gICAgICAgICAgICAgIG1vbnRoOiBsZW5ndGgsXG4gICAgICAgICAgICAgIGRheTogJ251bWVyaWMnLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIDoge1xuICAgICAgICAgICAgICBtb250aDogbGVuZ3RoLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0U3RyID0gZm9ybWF0ID8gJ2Zvcm1hdCcgOiAnc3RhbmRhbG9uZSc7XG5cbiAgICAgIGlmICghdGhpcy5tb250aHNDYWNoZVtmb3JtYXRTdHJdW2xlbmd0aF0pIHtcbiAgICAgICAgdGhpcy5tb250aHNDYWNoZVtmb3JtYXRTdHJdW2xlbmd0aF0gPSBtYXBNb250aHMoZHQgPT5cbiAgICAgICAgICB0aGlzLmV4dHJhY3QoZHQsIGludGwsICdtb250aCcpLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5tb250aHNDYWNoZVtmb3JtYXRTdHJdW2xlbmd0aF07XG4gICAgfSk7XG4gIH1cblxuICB3ZWVrZGF5cyhsZW5ndGgsIGZvcm1hdCA9IGZhbHNlLCBkZWZhdWx0T0sgPSB0cnVlKSB7XG4gICAgcmV0dXJuIGxpc3RTdHVmZih0aGlzLCBsZW5ndGgsIGRlZmF1bHRPSywgd2Vla2RheXMsICgpID0+IHtcbiAgICAgIGNvbnN0IGludGwgPSBmb3JtYXRcbiAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgd2Vla2RheTogbGVuZ3RoLFxuICAgICAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgIG1vbnRoOiAnbG9uZycsXG4gICAgICAgICAgICAgIGRheTogJ251bWVyaWMnLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIDoge1xuICAgICAgICAgICAgICB3ZWVrZGF5OiBsZW5ndGgsXG4gICAgICAgICAgICB9LFxuICAgICAgICBmb3JtYXRTdHIgPSBmb3JtYXQgPyAnZm9ybWF0JyA6ICdzdGFuZGFsb25lJztcblxuICAgICAgaWYgKCF0aGlzLndlZWtkYXlzQ2FjaGVbZm9ybWF0U3RyXVtsZW5ndGhdKSB7XG4gICAgICAgIHRoaXMud2Vla2RheXNDYWNoZVtmb3JtYXRTdHJdW2xlbmd0aF0gPSBtYXBXZWVrZGF5cyhkdCA9PlxuICAgICAgICAgIHRoaXMuZXh0cmFjdChkdCwgaW50bCwgJ3dlZWtkYXknKSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMud2Vla2RheXNDYWNoZVtmb3JtYXRTdHJdW2xlbmd0aF07XG4gICAgfSk7XG4gIH1cblxuICBtZXJpZGllbXMoZGVmYXVsdE9LID0gdHJ1ZSkge1xuICAgIHJldHVybiBsaXN0U3R1ZmYoXG4gICAgICB0aGlzLFxuICAgICAgdW5kZWZpbmVkLFxuICAgICAgZGVmYXVsdE9LLFxuICAgICAgKCkgPT4gbWVyaWRpZW1zLFxuICAgICAgKCkgPT4ge1xuICAgICAgICAvLyBJbiB0aGVvcnkgdGhlcmUgY291bGQgYmUgYXJpYml0cmFyeSBkYXkgcGVyaW9kcy4gV2UncmUgZ29ubmEgYXNzdW1lIHRoZXJlIGFyZSBleGFjdGx5IHR3b1xuICAgICAgICAvLyBmb3IgQU0gYW5kIFBNLiBUaGlzIGlzIHByb2JhYmx5IHdyb25nLCBidXQgaXQncyBtYWtlcyBwYXJzaW5nIHdheSBlYXNpZXIuXG4gICAgICAgIGlmICghdGhpcy5tZXJpZGllbUNhY2hlKSB7XG4gICAgICAgICAgY29uc3QgaW50bCA9IHtcbiAgICAgICAgICAgIGhvdXI6ICdudW1lcmljJyxcbiAgICAgICAgICAgIGhvdXIxMjogdHJ1ZSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMubWVyaWRpZW1DYWNoZSA9IFtcbiAgICAgICAgICAgIERhdGVUaW1lLnV0YygyMDE2LCAxMSwgMTMsIDkpLFxuICAgICAgICAgICAgRGF0ZVRpbWUudXRjKDIwMTYsIDExLCAxMywgMTkpLFxuICAgICAgICAgIF0ubWFwKGR0ID0+IHRoaXMuZXh0cmFjdChkdCwgaW50bCwgJ2RheXBlcmlvZCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1lcmlkaWVtQ2FjaGU7XG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICBlcmFzKGxlbmd0aCwgZGVmYXVsdE9LID0gdHJ1ZSkge1xuICAgIHJldHVybiBsaXN0U3R1ZmYodGhpcywgbGVuZ3RoLCBkZWZhdWx0T0ssIGVyYXMsICgpID0+IHtcbiAgICAgIGNvbnN0IGludGwgPSB7XG4gICAgICAgIGVyYTogbGVuZ3RoLFxuICAgICAgfTsgLy8gVGhpcyBpcyB1dHRlciBidWxsc2hpdC4gRGlmZmVyZW50IGNhbGVuZGFycyBhcmUgZ29pbmcgdG8gZGVmaW5lIGVyYXMgdG90YWxseSBkaWZmZXJlbnRseS4gV2hhdCBJIG5lZWQgaXMgdGhlIG1pbmltdW0gc2V0IG9mIGRhdGVzXG4gICAgICAvLyB0byBkZWZpbml0ZWx5IGVudW1lcmF0ZSB0aGVtLlxuXG4gICAgICBpZiAoIXRoaXMuZXJhQ2FjaGVbbGVuZ3RoXSkge1xuICAgICAgICB0aGlzLmVyYUNhY2hlW2xlbmd0aF0gPSBbXG4gICAgICAgICAgRGF0ZVRpbWUudXRjKC00MCwgMSwgMSksXG4gICAgICAgICAgRGF0ZVRpbWUudXRjKDIwMTcsIDEsIDEpLFxuICAgICAgICBdLm1hcChkdCA9PiB0aGlzLmV4dHJhY3QoZHQsIGludGwsICdlcmEnKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmVyYUNhY2hlW2xlbmd0aF07XG4gICAgfSk7XG4gIH1cblxuICBleHRyYWN0KGR0LCBpbnRsT3B0cywgZmllbGQpIHtcbiAgICBjb25zdCBkZiA9IHRoaXMuZHRGb3JtYXR0ZXIoZHQsIGludGxPcHRzKSxcbiAgICAgIHJlc3VsdHMgPSBkZi5mb3JtYXRUb1BhcnRzKCksXG4gICAgICBtYXRjaGluZyA9IHJlc3VsdHMuZmluZChtID0+IG0udHlwZS50b0xvd2VyQ2FzZSgpID09PSBmaWVsZCk7XG4gICAgcmV0dXJuIG1hdGNoaW5nID8gbWF0Y2hpbmcudmFsdWUgOiBudWxsO1xuICB9XG5cbiAgbnVtYmVyRm9ybWF0dGVyKG9wdHMgPSB7fSkge1xuICAgIC8vIHRoaXMgZm9yY2VzaW1wbGUgb3B0aW9uIGlzIG5ldmVyIHVzZWQgKHRoZSBvbmx5IGNhbGxlciBzaG9ydC1jaXJjdWl0cyBvbiBpdCwgYnV0IGl0IHNlZW1zIHNhZmVyIHRvIGxlYXZlKVxuICAgIC8vIChpbiBjb250cmFzdCwgdGhlIHJlc3Qgb2YgdGhlIGNvbmRpdGlvbiBpcyB1c2VkIGhlYXZpbHkpXG4gICAgcmV0dXJuIG5ldyBQb2x5TnVtYmVyRm9ybWF0dGVyKFxuICAgICAgdGhpcy5pbnRsLFxuICAgICAgb3B0cy5mb3JjZVNpbXBsZSB8fCB0aGlzLmZhc3ROdW1iZXJzLFxuICAgICAgb3B0cyxcbiAgICApO1xuICB9XG5cbiAgZHRGb3JtYXR0ZXIoZHQsIGludGxPcHRzID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFBvbHlEYXRlRm9ybWF0dGVyKGR0LCB0aGlzLmludGwsIGludGxPcHRzKTtcbiAgfVxuXG4gIHJlbEZvcm1hdHRlcihvcHRzID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFBvbHlSZWxGb3JtYXR0ZXIodGhpcy5pbnRsLCB0aGlzLmlzRW5nbGlzaCgpLCBvcHRzKTtcbiAgfVxuXG4gIGlzRW5nbGlzaCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5sb2NhbGUgPT09ICdlbicgfHxcbiAgICAgIHRoaXMubG9jYWxlLnRvTG93ZXJDYXNlKCkgPT09ICdlbi11cycgfHxcbiAgICAgIChoYXNJbnRsKCkgJiZcbiAgICAgICAgbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5pbnRsKVxuICAgICAgICAgIC5yZXNvbHZlZE9wdGlvbnMoKVxuICAgICAgICAgIC5sb2NhbGUuc3RhcnRzV2l0aCgnZW4tdXMnKSlcbiAgICApO1xuICB9XG5cbiAgZXF1YWxzKG90aGVyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMubG9jYWxlID09PSBvdGhlci5sb2NhbGUgJiZcbiAgICAgIHRoaXMubnVtYmVyaW5nU3lzdGVtID09PSBvdGhlci5udW1iZXJpbmdTeXN0ZW0gJiZcbiAgICAgIHRoaXMub3V0cHV0Q2FsZW5kYXIgPT09IG90aGVyLm91dHB1dENhbGVuZGFyXG4gICAgKTtcbiAgfVxufVxuXG4vKlxuICogVGhpcyBmaWxlIGhhbmRsZXMgcGFyc2luZyBmb3Igd2VsbC1zcGVjaWZpZWQgZm9ybWF0cy4gSGVyZSdzIGhvdyBpdCB3b3JrczpcbiAqIFR3byB0aGluZ3MgZ28gaW50byBwYXJzaW5nOiBhIHJlZ2V4IHRvIG1hdGNoIHdpdGggYW5kIGFuIGV4dHJhY3RvciB0byB0YWtlIGFwYXJ0IHRoZSBncm91cHMgaW4gdGhlIG1hdGNoLlxuICogQW4gZXh0cmFjdG9yIGlzIGp1c3QgYSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgcmVnZXggbWF0Y2ggYXJyYXkgYW5kIHJldHVybnMgYSB7IHllYXI6IC4uLiwgbW9udGg6IC4uLiB9IG9iamVjdFxuICogcGFyc2UoKSBkb2VzIHRoZSB3b3JrIG9mIGV4ZWN1dGluZyB0aGUgcmVnZXggYW5kIGFwcGx5aW5nIHRoZSBleHRyYWN0b3IuIEl0IHRha2VzIG11bHRpcGxlIHJlZ2V4L2V4dHJhY3RvciBwYWlycyB0byB0cnkgaW4gc2VxdWVuY2UuXG4gKiBFeHRyYWN0b3JzIGNhbiB0YWtlIGEgXCJjdXJzb3JcIiByZXByZXNlbnRpbmcgdGhlIG9mZnNldCBpbiB0aGUgbWF0Y2ggdG8gbG9vayBhdC4gVGhpcyBtYWtlcyBpdCBlYXN5IHRvIGNvbWJpbmUgZXh0cmFjdG9ycy5cbiAqIGNvbWJpbmVFeHRyYWN0b3JzKCkgZG9lcyB0aGUgd29yayBvZiBjb21iaW5pbmcgdGhlbSwga2VlcGluZyB0cmFjayBvZiB0aGUgY3Vyc29yIHRocm91Z2ggbXVsdGlwbGUgZXh0cmFjdGlvbnMuXG4gKiBTb21lIGV4dHJhY3Rpb25zIGFyZSBzdXBlciBkdW1iIGFuZCBzaW1wbGVQYXJzZSBhbmQgZnJvbVN0cmluZ3MgaGVscCBEUlkgdGhlbS5cbiAqL1xuXG5mdW5jdGlvbiBjb21iaW5lUmVnZXhlcyguLi5yZWdleGVzKSB7XG4gIGNvbnN0IGZ1bGwgPSByZWdleGVzLnJlZHVjZSgoZiwgcikgPT4gZiArIHIuc291cmNlLCAnJyk7XG4gIHJldHVybiBSZWdFeHAoYF4ke2Z1bGx9JGApO1xufVxuXG5mdW5jdGlvbiBjb21iaW5lRXh0cmFjdG9ycyguLi5leHRyYWN0b3JzKSB7XG4gIHJldHVybiBtID0+XG4gICAgZXh0cmFjdG9yc1xuICAgICAgLnJlZHVjZShcbiAgICAgICAgKFttZXJnZWRWYWxzLCBtZXJnZWRab25lLCBjdXJzb3JdLCBleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IFt2YWwsIHpvbmUsIG5leHRdID0gZXgobSwgY3Vyc29yKTtcbiAgICAgICAgICByZXR1cm4gW09iamVjdC5hc3NpZ24obWVyZ2VkVmFscywgdmFsKSwgbWVyZ2VkWm9uZSB8fCB6b25lLCBuZXh0XTtcbiAgICAgICAgfSxcbiAgICAgICAgW3t9LCBudWxsLCAxXSxcbiAgICAgIClcbiAgICAgIC5zbGljZSgwLCAyKTtcbn1cblxuZnVuY3Rpb24gcGFyc2UocywgLi4ucGF0dGVybnMpIHtcbiAgaWYgKHMgPT0gbnVsbCkge1xuICAgIHJldHVybiBbbnVsbCwgbnVsbF07XG4gIH1cblxuICBmb3IgKGNvbnN0IFtyZWdleCwgZXh0cmFjdG9yXSBvZiBwYXR0ZXJucykge1xuICAgIGNvbnN0IG0gPSByZWdleC5leGVjKHMpO1xuXG4gICAgaWYgKG0pIHtcbiAgICAgIHJldHVybiBleHRyYWN0b3IobSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFtudWxsLCBudWxsXTtcbn1cblxuZnVuY3Rpb24gc2ltcGxlUGFyc2UoLi4ua2V5cykge1xuICByZXR1cm4gKG1hdGNoLCBjdXJzb3IpID0+IHtcbiAgICBjb25zdCByZXQgPSB7fTtcbiAgICBsZXQgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXRba2V5c1tpXV0gPSBwYXJzZUludGVnZXIobWF0Y2hbY3Vyc29yICsgaV0pO1xuICAgIH1cblxuICAgIHJldHVybiBbcmV0LCBudWxsLCBjdXJzb3IgKyBpXTtcbiAgfTtcbn0gLy8gSVNPIGFuZCBTUUwgcGFyc2luZ1xuXG5jb25zdCBvZmZzZXRSZWdleCA9IC8oPzooWil8KFsrLV1cXGRcXGQpKD86Oj8oXFxkXFxkKSk/KS8sXG4gIGlzb1RpbWVCYXNlUmVnZXggPSAvKFxcZFxcZCkoPzo6PyhcXGRcXGQpKD86Oj8oXFxkXFxkKSg/OlsuLF0oXFxkezEsOX0pKT8pPyk/LyxcbiAgaXNvVGltZVJlZ2V4ID0gUmVnRXhwKGAke2lzb1RpbWVCYXNlUmVnZXguc291cmNlfSR7b2Zmc2V0UmVnZXguc291cmNlfT9gKSxcbiAgaXNvVGltZUV4dGVuc2lvblJlZ2V4ID0gUmVnRXhwKGAoPzpUJHtpc29UaW1lUmVnZXguc291cmNlfSk/YCksXG4gIGlzb1ltZFJlZ2V4ID0gLyhbKy1dXFxkezZ9fFxcZHs0fSkoPzotPyhcXGRcXGQpKD86LT8oXFxkXFxkKSk/KT8vLFxuICBpc29XZWVrUmVnZXggPSAvKFxcZHs0fSktP1coXFxkXFxkKSg/Oi0/KFxcZCkpPy8sXG4gIGlzb09yZGluYWxSZWdleCA9IC8oXFxkezR9KS0/KFxcZHszfSkvLFxuICBleHRyYWN0SVNPV2Vla0RhdGEgPSBzaW1wbGVQYXJzZSgnd2Vla1llYXInLCAnd2Vla051bWJlcicsICd3ZWVrRGF5JyksXG4gIGV4dHJhY3RJU09PcmRpbmFsRGF0YSA9IHNpbXBsZVBhcnNlKCd5ZWFyJywgJ29yZGluYWwnKSxcbiAgc3FsWW1kUmVnZXggPSAvKFxcZHs0fSktKFxcZFxcZCktKFxcZFxcZCkvLFxuICAvLyBkdW1iZWQtZG93biB2ZXJzaW9uIG9mIHRoZSBJU08gb25lXG4gIHNxbFRpbWVSZWdleCA9IFJlZ0V4cChcbiAgICBgJHtpc29UaW1lQmFzZVJlZ2V4LnNvdXJjZX0gPyg/OiR7b2Zmc2V0UmVnZXguc291cmNlfXwoJHtpYW5hUmVnZXguc291cmNlfSkpP2AsXG4gICksXG4gIHNxbFRpbWVFeHRlbnNpb25SZWdleCA9IFJlZ0V4cChgKD86ICR7c3FsVGltZVJlZ2V4LnNvdXJjZX0pP2ApO1xuXG5mdW5jdGlvbiBpbnQobWF0Y2gsIHBvcywgZmFsbGJhY2spIHtcbiAgY29uc3QgbSA9IG1hdGNoW3Bvc107XG4gIHJldHVybiBpc1VuZGVmaW5lZChtKSA/IGZhbGxiYWNrIDogcGFyc2VJbnRlZ2VyKG0pO1xufVxuXG5mdW5jdGlvbiBleHRyYWN0SVNPWW1kKG1hdGNoLCBjdXJzb3IpIHtcbiAgY29uc3QgaXRlbSA9IHtcbiAgICB5ZWFyOiBpbnQobWF0Y2gsIGN1cnNvciksXG4gICAgbW9udGg6IGludChtYXRjaCwgY3Vyc29yICsgMSwgMSksXG4gICAgZGF5OiBpbnQobWF0Y2gsIGN1cnNvciArIDIsIDEpLFxuICB9O1xuICByZXR1cm4gW2l0ZW0sIG51bGwsIGN1cnNvciArIDNdO1xufVxuXG5mdW5jdGlvbiBleHRyYWN0SVNPVGltZShtYXRjaCwgY3Vyc29yKSB7XG4gIGNvbnN0IGl0ZW0gPSB7XG4gICAgaG91cjogaW50KG1hdGNoLCBjdXJzb3IsIDApLFxuICAgIG1pbnV0ZTogaW50KG1hdGNoLCBjdXJzb3IgKyAxLCAwKSxcbiAgICBzZWNvbmQ6IGludChtYXRjaCwgY3Vyc29yICsgMiwgMCksXG4gICAgbWlsbGlzZWNvbmQ6IHBhcnNlTWlsbGlzKG1hdGNoW2N1cnNvciArIDNdKSxcbiAgfTtcbiAgcmV0dXJuIFtpdGVtLCBudWxsLCBjdXJzb3IgKyA0XTtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdElTT09mZnNldChtYXRjaCwgY3Vyc29yKSB7XG4gIGNvbnN0IGxvY2FsID0gIW1hdGNoW2N1cnNvcl0gJiYgIW1hdGNoW2N1cnNvciArIDFdLFxuICAgIGZ1bGxPZmZzZXQgPSBzaWduZWRPZmZzZXQobWF0Y2hbY3Vyc29yICsgMV0sIG1hdGNoW2N1cnNvciArIDJdKSxcbiAgICB6b25lID0gbG9jYWwgPyBudWxsIDogRml4ZWRPZmZzZXRab25lLmluc3RhbmNlKGZ1bGxPZmZzZXQpO1xuICByZXR1cm4gW3t9LCB6b25lLCBjdXJzb3IgKyAzXTtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdElBTkFab25lKG1hdGNoLCBjdXJzb3IpIHtcbiAgY29uc3Qgem9uZSA9IG1hdGNoW2N1cnNvcl0gPyBJQU5BWm9uZS5jcmVhdGUobWF0Y2hbY3Vyc29yXSkgOiBudWxsO1xuICByZXR1cm4gW3t9LCB6b25lLCBjdXJzb3IgKyAxXTtcbn0gLy8gSVNPIGR1cmF0aW9uIHBhcnNpbmdcblxuY29uc3QgaXNvRHVyYXRpb24gPVxuICAvXi0/UCg/Oig/OigtP1xcZHsxLDl9KVkpPyg/OigtP1xcZHsxLDl9KU0pPyg/OigtP1xcZHsxLDl9KVcpPyg/OigtP1xcZHsxLDl9KUQpPyg/OlQoPzooLT9cXGR7MSw5fSlIKT8oPzooLT9cXGR7MSw5fSlNKT8oPzooLT9cXGR7MSw5fSkoPzpbLixdKC0/XFxkezEsOX0pKT9TKT8pPykkLztcblxuZnVuY3Rpb24gZXh0cmFjdElTT0R1cmF0aW9uKG1hdGNoKSB7XG4gIGNvbnN0IFtcbiAgICBzLFxuICAgIHllYXJTdHIsXG4gICAgbW9udGhTdHIsXG4gICAgd2Vla1N0cixcbiAgICBkYXlTdHIsXG4gICAgaG91clN0cixcbiAgICBtaW51dGVTdHIsXG4gICAgc2Vjb25kU3RyLFxuICAgIG1pbGxpc2Vjb25kc1N0cixcbiAgXSA9IG1hdGNoO1xuICBjb25zdCBoYXNOZWdhdGl2ZVByZWZpeCA9IHNbMF0gPT09ICctJztcblxuICBjb25zdCBtYXliZU5lZ2F0ZSA9IG51bSA9PiAobnVtICYmIGhhc05lZ2F0aXZlUHJlZml4ID8gLW51bSA6IG51bSk7XG5cbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICB5ZWFyczogbWF5YmVOZWdhdGUocGFyc2VJbnRlZ2VyKHllYXJTdHIpKSxcbiAgICAgIG1vbnRoczogbWF5YmVOZWdhdGUocGFyc2VJbnRlZ2VyKG1vbnRoU3RyKSksXG4gICAgICB3ZWVrczogbWF5YmVOZWdhdGUocGFyc2VJbnRlZ2VyKHdlZWtTdHIpKSxcbiAgICAgIGRheXM6IG1heWJlTmVnYXRlKHBhcnNlSW50ZWdlcihkYXlTdHIpKSxcbiAgICAgIGhvdXJzOiBtYXliZU5lZ2F0ZShwYXJzZUludGVnZXIoaG91clN0cikpLFxuICAgICAgbWludXRlczogbWF5YmVOZWdhdGUocGFyc2VJbnRlZ2VyKG1pbnV0ZVN0cikpLFxuICAgICAgc2Vjb25kczogbWF5YmVOZWdhdGUocGFyc2VJbnRlZ2VyKHNlY29uZFN0cikpLFxuICAgICAgbWlsbGlzZWNvbmRzOiBtYXliZU5lZ2F0ZShwYXJzZU1pbGxpcyhtaWxsaXNlY29uZHNTdHIpKSxcbiAgICB9LFxuICBdO1xufSAvLyBUaGVzZSBhcmUgYSBsaXR0bGUgYnJhaW5kZWFkLiBFRFQgKnNob3VsZCogdGVsbCB1cyB0aGF0IHdlJ3JlIGluLCBzYXksIEFtZXJpY2EvTmV3X1lvcmtcbi8vIGFuZCBub3QganVzdCB0aGF0IHdlJ3JlIGluIC0yNDAgKnJpZ2h0IG5vdyouIEJ1dCBzaW5jZSBJIGRvbid0IHRoaW5rIHRoZXNlIGFyZSB1c2VkIHRoYXQgb2Z0ZW5cbi8vIEknbSBqdXN0IGdvaW5nIHRvIGlnbm9yZSB0aGF0XG5cbmNvbnN0IG9ic09mZnNldHMgPSB7XG4gIEdNVDogMCxcbiAgRURUOiAtNCAqIDYwLFxuICBFU1Q6IC01ICogNjAsXG4gIENEVDogLTUgKiA2MCxcbiAgQ1NUOiAtNiAqIDYwLFxuICBNRFQ6IC02ICogNjAsXG4gIE1TVDogLTcgKiA2MCxcbiAgUERUOiAtNyAqIDYwLFxuICBQU1Q6IC04ICogNjAsXG59O1xuXG5mdW5jdGlvbiBmcm9tU3RyaW5ncyhcbiAgd2Vla2RheVN0cixcbiAgeWVhclN0cixcbiAgbW9udGhTdHIsXG4gIGRheVN0cixcbiAgaG91clN0cixcbiAgbWludXRlU3RyLFxuICBzZWNvbmRTdHIsXG4pIHtcbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIHllYXI6XG4gICAgICB5ZWFyU3RyLmxlbmd0aCA9PT0gMlxuICAgICAgICA/IHVudHJ1bmNhdGVZZWFyKHBhcnNlSW50ZWdlcih5ZWFyU3RyKSlcbiAgICAgICAgOiBwYXJzZUludGVnZXIoeWVhclN0ciksXG4gICAgbW9udGg6IG1vbnRoc1Nob3J0LmluZGV4T2YobW9udGhTdHIpICsgMSxcbiAgICBkYXk6IHBhcnNlSW50ZWdlcihkYXlTdHIpLFxuICAgIGhvdXI6IHBhcnNlSW50ZWdlcihob3VyU3RyKSxcbiAgICBtaW51dGU6IHBhcnNlSW50ZWdlcihtaW51dGVTdHIpLFxuICB9O1xuICBpZiAoc2Vjb25kU3RyKSByZXN1bHQuc2Vjb25kID0gcGFyc2VJbnRlZ2VyKHNlY29uZFN0cik7XG5cbiAgaWYgKHdlZWtkYXlTdHIpIHtcbiAgICByZXN1bHQud2Vla2RheSA9XG4gICAgICB3ZWVrZGF5U3RyLmxlbmd0aCA+IDNcbiAgICAgICAgPyB3ZWVrZGF5c0xvbmcuaW5kZXhPZih3ZWVrZGF5U3RyKSArIDFcbiAgICAgICAgOiB3ZWVrZGF5c1Nob3J0LmluZGV4T2Yod2Vla2RheVN0cikgKyAxO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn0gLy8gUkZDIDI4MjIvNTMyMlxuXG5jb25zdCByZmMyODIyID1cbiAgL14oPzooTW9ufFR1ZXxXZWR8VGh1fEZyaXxTYXR8U3VuKSxcXHMpPyhcXGR7MSwyfSlcXHMoSmFufEZlYnxNYXJ8QXByfE1heXxKdW58SnVsfEF1Z3xTZXB8T2N0fE5vdnxEZWMpXFxzKFxcZHsyLDR9KVxccyhcXGRcXGQpOihcXGRcXGQpKD86OihcXGRcXGQpKT9cXHMoPzooVVR8R01UfFtFQ01QXVtTRF1UKXwoW1p6XSl8KD86KFsrLV1cXGRcXGQpKFxcZFxcZCkpKSQvO1xuXG5mdW5jdGlvbiBleHRyYWN0UkZDMjgyMihtYXRjaCkge1xuICBjb25zdCBbXG4gICAgICAsXG4gICAgICB3ZWVrZGF5U3RyLFxuICAgICAgZGF5U3RyLFxuICAgICAgbW9udGhTdHIsXG4gICAgICB5ZWFyU3RyLFxuICAgICAgaG91clN0cixcbiAgICAgIG1pbnV0ZVN0cixcbiAgICAgIHNlY29uZFN0cixcbiAgICAgIG9ic09mZnNldCxcbiAgICAgIG1pbE9mZnNldCxcbiAgICAgIG9mZkhvdXJTdHIsXG4gICAgICBvZmZNaW51dGVTdHIsXG4gICAgXSA9IG1hdGNoLFxuICAgIHJlc3VsdCA9IGZyb21TdHJpbmdzKFxuICAgICAgd2Vla2RheVN0cixcbiAgICAgIHllYXJTdHIsXG4gICAgICBtb250aFN0cixcbiAgICAgIGRheVN0cixcbiAgICAgIGhvdXJTdHIsXG4gICAgICBtaW51dGVTdHIsXG4gICAgICBzZWNvbmRTdHIsXG4gICAgKTtcbiAgbGV0IG9mZnNldDtcblxuICBpZiAob2JzT2Zmc2V0KSB7XG4gICAgb2Zmc2V0ID0gb2JzT2Zmc2V0c1tvYnNPZmZzZXRdO1xuICB9IGVsc2UgaWYgKG1pbE9mZnNldCkge1xuICAgIG9mZnNldCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgb2Zmc2V0ID0gc2lnbmVkT2Zmc2V0KG9mZkhvdXJTdHIsIG9mZk1pbnV0ZVN0cik7XG4gIH1cblxuICByZXR1cm4gW3Jlc3VsdCwgbmV3IEZpeGVkT2Zmc2V0Wm9uZShvZmZzZXQpXTtcbn1cblxuZnVuY3Rpb24gcHJlcHJvY2Vzc1JGQzI4MjIocykge1xuICAvLyBSZW1vdmUgY29tbWVudHMgYW5kIGZvbGRpbmcgd2hpdGVzcGFjZSBhbmQgcmVwbGFjZSBtdWx0aXBsZS1zcGFjZXMgd2l0aCBhIHNpbmdsZSBzcGFjZVxuICByZXR1cm4gc1xuICAgIC5yZXBsYWNlKC9cXChbXildKlxcKXxbXFxuXFx0XS9nLCAnICcpXG4gICAgLnJlcGxhY2UoLyhcXHNcXHMrKS9nLCAnICcpXG4gICAgLnRyaW0oKTtcbn0gLy8gaHR0cCBkYXRlXG5cbmNvbnN0IHJmYzExMjMgPVxuICAgIC9eKE1vbnxUdWV8V2VkfFRodXxGcml8U2F0fFN1biksIChcXGRcXGQpIChKYW58RmVifE1hcnxBcHJ8TWF5fEp1bnxKdWx8QXVnfFNlcHxPY3R8Tm92fERlYykgKFxcZHs0fSkgKFxcZFxcZCk6KFxcZFxcZCk6KFxcZFxcZCkgR01UJC8sXG4gIHJmYzg1MCA9XG4gICAgL14oTW9uZGF5fFR1ZXNkYXl8V2Vkc2RheXxUaHVyc2RheXxGcmlkYXl8U2F0dXJkYXl8U3VuZGF5KSwgKFxcZFxcZCktKEphbnxGZWJ8TWFyfEFwcnxNYXl8SnVufEp1bHxBdWd8U2VwfE9jdHxOb3Z8RGVjKS0oXFxkXFxkKSAoXFxkXFxkKTooXFxkXFxkKTooXFxkXFxkKSBHTVQkLyxcbiAgYXNjaWkgPVxuICAgIC9eKE1vbnxUdWV8V2VkfFRodXxGcml8U2F0fFN1bikgKEphbnxGZWJ8TWFyfEFwcnxNYXl8SnVufEp1bHxBdWd8U2VwfE9jdHxOb3Z8RGVjKSAoIFxcZHxcXGRcXGQpIChcXGRcXGQpOihcXGRcXGQpOihcXGRcXGQpIChcXGR7NH0pJC87XG5cbmZ1bmN0aW9uIGV4dHJhY3RSRkMxMTIzT3I4NTAobWF0Y2gpIHtcbiAgY29uc3QgW1xuICAgICAgLFxuICAgICAgd2Vla2RheVN0cixcbiAgICAgIGRheVN0cixcbiAgICAgIG1vbnRoU3RyLFxuICAgICAgeWVhclN0cixcbiAgICAgIGhvdXJTdHIsXG4gICAgICBtaW51dGVTdHIsXG4gICAgICBzZWNvbmRTdHIsXG4gICAgXSA9IG1hdGNoLFxuICAgIHJlc3VsdCA9IGZyb21TdHJpbmdzKFxuICAgICAgd2Vla2RheVN0cixcbiAgICAgIHllYXJTdHIsXG4gICAgICBtb250aFN0cixcbiAgICAgIGRheVN0cixcbiAgICAgIGhvdXJTdHIsXG4gICAgICBtaW51dGVTdHIsXG4gICAgICBzZWNvbmRTdHIsXG4gICAgKTtcbiAgcmV0dXJuIFtyZXN1bHQsIEZpeGVkT2Zmc2V0Wm9uZS51dGNJbnN0YW5jZV07XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RBU0NJSShtYXRjaCkge1xuICBjb25zdCBbXG4gICAgICAsXG4gICAgICB3ZWVrZGF5U3RyLFxuICAgICAgbW9udGhTdHIsXG4gICAgICBkYXlTdHIsXG4gICAgICBob3VyU3RyLFxuICAgICAgbWludXRlU3RyLFxuICAgICAgc2Vjb25kU3RyLFxuICAgICAgeWVhclN0cixcbiAgICBdID0gbWF0Y2gsXG4gICAgcmVzdWx0ID0gZnJvbVN0cmluZ3MoXG4gICAgICB3ZWVrZGF5U3RyLFxuICAgICAgeWVhclN0cixcbiAgICAgIG1vbnRoU3RyLFxuICAgICAgZGF5U3RyLFxuICAgICAgaG91clN0cixcbiAgICAgIG1pbnV0ZVN0cixcbiAgICAgIHNlY29uZFN0cixcbiAgICApO1xuICByZXR1cm4gW3Jlc3VsdCwgRml4ZWRPZmZzZXRab25lLnV0Y0luc3RhbmNlXTtcbn1cblxuY29uc3QgaXNvWW1kV2l0aFRpbWVFeHRlbnNpb25SZWdleCA9IGNvbWJpbmVSZWdleGVzKFxuICBpc29ZbWRSZWdleCxcbiAgaXNvVGltZUV4dGVuc2lvblJlZ2V4LFxuKTtcbmNvbnN0IGlzb1dlZWtXaXRoVGltZUV4dGVuc2lvblJlZ2V4ID0gY29tYmluZVJlZ2V4ZXMoXG4gIGlzb1dlZWtSZWdleCxcbiAgaXNvVGltZUV4dGVuc2lvblJlZ2V4LFxuKTtcbmNvbnN0IGlzb09yZGluYWxXaXRoVGltZUV4dGVuc2lvblJlZ2V4ID0gY29tYmluZVJlZ2V4ZXMoXG4gIGlzb09yZGluYWxSZWdleCxcbiAgaXNvVGltZUV4dGVuc2lvblJlZ2V4LFxuKTtcbmNvbnN0IGlzb1RpbWVDb21iaW5lZFJlZ2V4ID0gY29tYmluZVJlZ2V4ZXMoaXNvVGltZVJlZ2V4KTtcbmNvbnN0IGV4dHJhY3RJU09ZbWRUaW1lQW5kT2Zmc2V0ID0gY29tYmluZUV4dHJhY3RvcnMoXG4gIGV4dHJhY3RJU09ZbWQsXG4gIGV4dHJhY3RJU09UaW1lLFxuICBleHRyYWN0SVNPT2Zmc2V0LFxuKTtcbmNvbnN0IGV4dHJhY3RJU09XZWVrVGltZUFuZE9mZnNldCA9IGNvbWJpbmVFeHRyYWN0b3JzKFxuICBleHRyYWN0SVNPV2Vla0RhdGEsXG4gIGV4dHJhY3RJU09UaW1lLFxuICBleHRyYWN0SVNPT2Zmc2V0LFxuKTtcbmNvbnN0IGV4dHJhY3RJU09PcmRpbmFsRGF0YUFuZFRpbWUgPSBjb21iaW5lRXh0cmFjdG9ycyhcbiAgZXh0cmFjdElTT09yZGluYWxEYXRhLFxuICBleHRyYWN0SVNPVGltZSxcbik7XG5jb25zdCBleHRyYWN0SVNPVGltZUFuZE9mZnNldCA9IGNvbWJpbmVFeHRyYWN0b3JzKFxuICBleHRyYWN0SVNPVGltZSxcbiAgZXh0cmFjdElTT09mZnNldCxcbik7XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZUlTT0RhdGUocykge1xuICByZXR1cm4gcGFyc2UoXG4gICAgcyxcbiAgICBbaXNvWW1kV2l0aFRpbWVFeHRlbnNpb25SZWdleCwgZXh0cmFjdElTT1ltZFRpbWVBbmRPZmZzZXRdLFxuICAgIFtpc29XZWVrV2l0aFRpbWVFeHRlbnNpb25SZWdleCwgZXh0cmFjdElTT1dlZWtUaW1lQW5kT2Zmc2V0XSxcbiAgICBbaXNvT3JkaW5hbFdpdGhUaW1lRXh0ZW5zaW9uUmVnZXgsIGV4dHJhY3RJU09PcmRpbmFsRGF0YUFuZFRpbWVdLFxuICAgIFtpc29UaW1lQ29tYmluZWRSZWdleCwgZXh0cmFjdElTT1RpbWVBbmRPZmZzZXRdLFxuICApO1xufVxuXG5mdW5jdGlvbiBwYXJzZVJGQzI4MjJEYXRlKHMpIHtcbiAgcmV0dXJuIHBhcnNlKHByZXByb2Nlc3NSRkMyODIyKHMpLCBbcmZjMjgyMiwgZXh0cmFjdFJGQzI4MjJdKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VIVFRQRGF0ZShzKSB7XG4gIHJldHVybiBwYXJzZShcbiAgICBzLFxuICAgIFtyZmMxMTIzLCBleHRyYWN0UkZDMTEyM09yODUwXSxcbiAgICBbcmZjODUwLCBleHRyYWN0UkZDMTEyM09yODUwXSxcbiAgICBbYXNjaWksIGV4dHJhY3RBU0NJSV0sXG4gICk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlSVNPRHVyYXRpb24ocykge1xuICByZXR1cm4gcGFyc2UocywgW2lzb0R1cmF0aW9uLCBleHRyYWN0SVNPRHVyYXRpb25dKTtcbn1cblxuY29uc3Qgc3FsWW1kV2l0aFRpbWVFeHRlbnNpb25SZWdleCA9IGNvbWJpbmVSZWdleGVzKFxuICBzcWxZbWRSZWdleCxcbiAgc3FsVGltZUV4dGVuc2lvblJlZ2V4LFxuKTtcbmNvbnN0IHNxbFRpbWVDb21iaW5lZFJlZ2V4ID0gY29tYmluZVJlZ2V4ZXMoc3FsVGltZVJlZ2V4KTtcbmNvbnN0IGV4dHJhY3RJU09ZbWRUaW1lT2Zmc2V0QW5kSUFOQVpvbmUgPSBjb21iaW5lRXh0cmFjdG9ycyhcbiAgZXh0cmFjdElTT1ltZCxcbiAgZXh0cmFjdElTT1RpbWUsXG4gIGV4dHJhY3RJU09PZmZzZXQsXG4gIGV4dHJhY3RJQU5BWm9uZSxcbik7XG5jb25zdCBleHRyYWN0SVNPVGltZU9mZnNldEFuZElBTkFab25lID0gY29tYmluZUV4dHJhY3RvcnMoXG4gIGV4dHJhY3RJU09UaW1lLFxuICBleHRyYWN0SVNPT2Zmc2V0LFxuICBleHRyYWN0SUFOQVpvbmUsXG4pO1xuXG5mdW5jdGlvbiBwYXJzZVNRTChzKSB7XG4gIHJldHVybiBwYXJzZShcbiAgICBzLFxuICAgIFtzcWxZbWRXaXRoVGltZUV4dGVuc2lvblJlZ2V4LCBleHRyYWN0SVNPWW1kVGltZU9mZnNldEFuZElBTkFab25lXSxcbiAgICBbc3FsVGltZUNvbWJpbmVkUmVnZXgsIGV4dHJhY3RJU09UaW1lT2Zmc2V0QW5kSUFOQVpvbmVdLFxuICApO1xufVxuXG5jb25zdCBJTlZBTElEID0gJ0ludmFsaWQgRHVyYXRpb24nOyAvLyB1bml0IGNvbnZlcnNpb24gY29uc3RhbnRzXG5cbmNvbnN0IGxvd09yZGVyTWF0cml4ID0ge1xuICAgIHdlZWtzOiB7XG4gICAgICBkYXlzOiA3LFxuICAgICAgaG91cnM6IDcgKiAyNCxcbiAgICAgIG1pbnV0ZXM6IDcgKiAyNCAqIDYwLFxuICAgICAgc2Vjb25kczogNyAqIDI0ICogNjAgKiA2MCxcbiAgICAgIG1pbGxpc2Vjb25kczogNyAqIDI0ICogNjAgKiA2MCAqIDEwMDAsXG4gICAgfSxcbiAgICBkYXlzOiB7XG4gICAgICBob3VyczogMjQsXG4gICAgICBtaW51dGVzOiAyNCAqIDYwLFxuICAgICAgc2Vjb25kczogMjQgKiA2MCAqIDYwLFxuICAgICAgbWlsbGlzZWNvbmRzOiAyNCAqIDYwICogNjAgKiAxMDAwLFxuICAgIH0sXG4gICAgaG91cnM6IHtcbiAgICAgIG1pbnV0ZXM6IDYwLFxuICAgICAgc2Vjb25kczogNjAgKiA2MCxcbiAgICAgIG1pbGxpc2Vjb25kczogNjAgKiA2MCAqIDEwMDAsXG4gICAgfSxcbiAgICBtaW51dGVzOiB7XG4gICAgICBzZWNvbmRzOiA2MCxcbiAgICAgIG1pbGxpc2Vjb25kczogNjAgKiAxMDAwLFxuICAgIH0sXG4gICAgc2Vjb25kczoge1xuICAgICAgbWlsbGlzZWNvbmRzOiAxMDAwLFxuICAgIH0sXG4gIH0sXG4gIGNhc3VhbE1hdHJpeCA9IE9iamVjdC5hc3NpZ24oXG4gICAge1xuICAgICAgeWVhcnM6IHtcbiAgICAgICAgbW9udGhzOiAxMixcbiAgICAgICAgd2Vla3M6IDUyLFxuICAgICAgICBkYXlzOiAzNjUsXG4gICAgICAgIGhvdXJzOiAzNjUgKiAyNCxcbiAgICAgICAgbWludXRlczogMzY1ICogMjQgKiA2MCxcbiAgICAgICAgc2Vjb25kczogMzY1ICogMjQgKiA2MCAqIDYwLFxuICAgICAgICBtaWxsaXNlY29uZHM6IDM2NSAqIDI0ICogNjAgKiA2MCAqIDEwMDAsXG4gICAgICB9LFxuICAgICAgcXVhcnRlcnM6IHtcbiAgICAgICAgbW9udGhzOiAzLFxuICAgICAgICB3ZWVrczogMTMsXG4gICAgICAgIGRheXM6IDkxLFxuICAgICAgICBob3VyczogOTEgKiAyNCxcbiAgICAgICAgbWludXRlczogOTEgKiAyNCAqIDYwLFxuICAgICAgICBtaWxsaXNlY29uZHM6IDkxICogMjQgKiA2MCAqIDYwICogMTAwMCxcbiAgICAgIH0sXG4gICAgICBtb250aHM6IHtcbiAgICAgICAgd2Vla3M6IDQsXG4gICAgICAgIGRheXM6IDMwLFxuICAgICAgICBob3VyczogMzAgKiAyNCxcbiAgICAgICAgbWludXRlczogMzAgKiAyNCAqIDYwLFxuICAgICAgICBzZWNvbmRzOiAzMCAqIDI0ICogNjAgKiA2MCxcbiAgICAgICAgbWlsbGlzZWNvbmRzOiAzMCAqIDI0ICogNjAgKiA2MCAqIDEwMDAsXG4gICAgICB9LFxuICAgIH0sXG4gICAgbG93T3JkZXJNYXRyaXgsXG4gICksXG4gIGRheXNJblllYXJBY2N1cmF0ZSA9IDE0NjA5Ny4wIC8gNDAwLFxuICBkYXlzSW5Nb250aEFjY3VyYXRlID0gMTQ2MDk3LjAgLyA0ODAwLFxuICBhY2N1cmF0ZU1hdHJpeCA9IE9iamVjdC5hc3NpZ24oXG4gICAge1xuICAgICAgeWVhcnM6IHtcbiAgICAgICAgbW9udGhzOiAxMixcbiAgICAgICAgd2Vla3M6IGRheXNJblllYXJBY2N1cmF0ZSAvIDcsXG4gICAgICAgIGRheXM6IGRheXNJblllYXJBY2N1cmF0ZSxcbiAgICAgICAgaG91cnM6IGRheXNJblllYXJBY2N1cmF0ZSAqIDI0LFxuICAgICAgICBtaW51dGVzOiBkYXlzSW5ZZWFyQWNjdXJhdGUgKiAyNCAqIDYwLFxuICAgICAgICBzZWNvbmRzOiBkYXlzSW5ZZWFyQWNjdXJhdGUgKiAyNCAqIDYwICogNjAsXG4gICAgICAgIG1pbGxpc2Vjb25kczogZGF5c0luWWVhckFjY3VyYXRlICogMjQgKiA2MCAqIDYwICogMTAwMCxcbiAgICAgIH0sXG4gICAgICBxdWFydGVyczoge1xuICAgICAgICBtb250aHM6IDMsXG4gICAgICAgIHdlZWtzOiBkYXlzSW5ZZWFyQWNjdXJhdGUgLyAyOCxcbiAgICAgICAgZGF5czogZGF5c0luWWVhckFjY3VyYXRlIC8gNCxcbiAgICAgICAgaG91cnM6IChkYXlzSW5ZZWFyQWNjdXJhdGUgKiAyNCkgLyA0LFxuICAgICAgICBtaW51dGVzOiAoZGF5c0luWWVhckFjY3VyYXRlICogMjQgKiA2MCkgLyA0LFxuICAgICAgICBzZWNvbmRzOiAoZGF5c0luWWVhckFjY3VyYXRlICogMjQgKiA2MCAqIDYwKSAvIDQsXG4gICAgICAgIG1pbGxpc2Vjb25kczogKGRheXNJblllYXJBY2N1cmF0ZSAqIDI0ICogNjAgKiA2MCAqIDEwMDApIC8gNCxcbiAgICAgIH0sXG4gICAgICBtb250aHM6IHtcbiAgICAgICAgd2Vla3M6IGRheXNJbk1vbnRoQWNjdXJhdGUgLyA3LFxuICAgICAgICBkYXlzOiBkYXlzSW5Nb250aEFjY3VyYXRlLFxuICAgICAgICBob3VyczogZGF5c0luTW9udGhBY2N1cmF0ZSAqIDI0LFxuICAgICAgICBtaW51dGVzOiBkYXlzSW5Nb250aEFjY3VyYXRlICogMjQgKiA2MCxcbiAgICAgICAgc2Vjb25kczogZGF5c0luTW9udGhBY2N1cmF0ZSAqIDI0ICogNjAgKiA2MCxcbiAgICAgICAgbWlsbGlzZWNvbmRzOiBkYXlzSW5Nb250aEFjY3VyYXRlICogMjQgKiA2MCAqIDYwICogMTAwMCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBsb3dPcmRlck1hdHJpeCxcbiAgKTsgLy8gdW5pdHMgb3JkZXJlZCBieSBzaXplXG5cbmNvbnN0IG9yZGVyZWRVbml0cyA9IFtcbiAgJ3llYXJzJyxcbiAgJ3F1YXJ0ZXJzJyxcbiAgJ21vbnRocycsXG4gICd3ZWVrcycsXG4gICdkYXlzJyxcbiAgJ2hvdXJzJyxcbiAgJ21pbnV0ZXMnLFxuICAnc2Vjb25kcycsXG4gICdtaWxsaXNlY29uZHMnLFxuXTtcbmNvbnN0IHJldmVyc2VVbml0cyA9IG9yZGVyZWRVbml0cy5zbGljZSgwKS5yZXZlcnNlKCk7IC8vIGNsb25lIHJlYWxseSBtZWFucyBcImNyZWF0ZSBhbm90aGVyIGluc3RhbmNlIGp1c3QgbGlrZSB0aGlzIG9uZSwgYnV0IHdpdGggdGhlc2UgY2hhbmdlc1wiXG5cbmZ1bmN0aW9uIGNsb25lKGR1ciwgYWx0cywgY2xlYXIgPSBmYWxzZSkge1xuICAvLyBkZWVwIG1lcmdlIGZvciB2YWxzXG4gIGNvbnN0IGNvbmYgPSB7XG4gICAgdmFsdWVzOiBjbGVhclxuICAgICAgPyBhbHRzLnZhbHVlc1xuICAgICAgOiBPYmplY3QuYXNzaWduKHt9LCBkdXIudmFsdWVzLCBhbHRzLnZhbHVlcyB8fCB7fSksXG4gICAgbG9jOiBkdXIubG9jLmNsb25lKGFsdHMubG9jKSxcbiAgICBjb252ZXJzaW9uQWNjdXJhY3k6IGFsdHMuY29udmVyc2lvbkFjY3VyYWN5IHx8IGR1ci5jb252ZXJzaW9uQWNjdXJhY3ksXG4gIH07XG4gIHJldHVybiBuZXcgRHVyYXRpb24oY29uZik7XG59XG5cbmZ1bmN0aW9uIGFudGlUcnVuYyhuKSB7XG4gIHJldHVybiBuIDwgMCA/IE1hdGguZmxvb3IobikgOiBNYXRoLmNlaWwobik7XG59IC8vIE5COiBtdXRhdGVzIHBhcmFtZXRlcnNcblxuZnVuY3Rpb24gY29udmVydChtYXRyaXgsIGZyb21NYXAsIGZyb21Vbml0LCB0b01hcCwgdG9Vbml0KSB7XG4gIGNvbnN0IGNvbnYgPSBtYXRyaXhbdG9Vbml0XVtmcm9tVW5pdF0sXG4gICAgcmF3ID0gZnJvbU1hcFtmcm9tVW5pdF0gLyBjb252LFxuICAgIHNhbWVTaWduID0gTWF0aC5zaWduKHJhdykgPT09IE1hdGguc2lnbih0b01hcFt0b1VuaXRdKSxcbiAgICAvLyBvaywgc28gdGhpcyBpcyB3aWxkLCBidXQgc2VlIHRoZSBtYXRyaXggaW4gdGhlIHRlc3RzXG4gICAgYWRkZWQgPVxuICAgICAgIXNhbWVTaWduICYmIHRvTWFwW3RvVW5pdF0gIT09IDAgJiYgTWF0aC5hYnMocmF3KSA8PSAxXG4gICAgICAgID8gYW50aVRydW5jKHJhdylcbiAgICAgICAgOiBNYXRoLnRydW5jKHJhdyk7XG4gIHRvTWFwW3RvVW5pdF0gKz0gYWRkZWQ7XG4gIGZyb21NYXBbZnJvbVVuaXRdIC09IGFkZGVkICogY29udjtcbn0gLy8gTkI6IG11dGF0ZXMgcGFyYW1ldGVyc1xuXG5mdW5jdGlvbiBub3JtYWxpemVWYWx1ZXMobWF0cml4LCB2YWxzKSB7XG4gIHJldmVyc2VVbml0cy5yZWR1Y2UoKHByZXZpb3VzLCBjdXJyZW50KSA9PiB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh2YWxzW2N1cnJlbnRdKSkge1xuICAgICAgaWYgKHByZXZpb3VzKSB7XG4gICAgICAgIGNvbnZlcnQobWF0cml4LCB2YWxzLCBwcmV2aW91cywgdmFscywgY3VycmVudCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcHJldmlvdXM7XG4gICAgfVxuICB9LCBudWxsKTtcbn1cblxuLyoqXG4gKiBBIER1cmF0aW9uIG9iamVjdCByZXByZXNlbnRzIGEgcGVyaW9kIG9mIHRpbWUsIGxpa2UgXCIyIG1vbnRoc1wiIG9yIFwiMSBkYXksIDEgaG91clwiLiBDb25jZXB0dWFsbHksIGl0J3MganVzdCBhIG1hcCBvZiB1bml0cyB0byB0aGVpciBxdWFudGl0aWVzLCBhY2NvbXBhbmllZCBieSBzb21lIGFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBhbmQgbWV0aG9kcyBmb3IgY3JlYXRpbmcsIHBhcnNpbmcsIGludGVycm9nYXRpbmcsIHRyYW5zZm9ybWluZywgYW5kIGZvcm1hdHRpbmcgdGhlbS4gVGhleSBjYW4gYmUgdXNlZCBvbiB0aGVpciBvd24gb3IgaW4gY29uanVuY3Rpb24gd2l0aCBvdGhlciBMdXhvbiB0eXBlczsgZm9yIGV4YW1wbGUsIHlvdSBjYW4gdXNlIHtAbGluayBEYXRlVGltZS5wbHVzfSB0byBhZGQgYSBEdXJhdGlvbiBvYmplY3QgdG8gYSBEYXRlVGltZSwgcHJvZHVjaW5nIGFub3RoZXIgRGF0ZVRpbWUuXG4gKlxuICogSGVyZSBpcyBhIGJyaWVmIG92ZXJ2aWV3IG9mIGNvbW1vbmx5IHVzZWQgbWV0aG9kcyBhbmQgZ2V0dGVycyBpbiBEdXJhdGlvbjpcbiAqXG4gKiAqICoqQ3JlYXRpb24qKiBUbyBjcmVhdGUgYSBEdXJhdGlvbiwgdXNlIHtAbGluayBEdXJhdGlvbi5mcm9tTWlsbGlzfSwge0BsaW5rIER1cmF0aW9uLmZyb21PYmplY3R9LCBvciB7QGxpbmsgRHVyYXRpb24uZnJvbUlTT30uXG4gKiAqICoqVW5pdCB2YWx1ZXMqKiBTZWUgdGhlIHtAbGluayBEdXJhdGlvbi55ZWFyc30sIHtAbGluayBEdXJhdGlvbi5tb250aHN9LCB7QGxpbmsgRHVyYXRpb24ud2Vla3N9LCB7QGxpbmsgRHVyYXRpb24uZGF5c30sIHtAbGluayBEdXJhdGlvbi5ob3Vyc30sIHtAbGluayBEdXJhdGlvbi5taW51dGVzfSwge0BsaW5rIER1cmF0aW9uLnNlY29uZHN9LCB7QGxpbmsgRHVyYXRpb24ubWlsbGlzZWNvbmRzfSBhY2Nlc3NvcnMuXG4gKiAqICoqQ29uZmlndXJhdGlvbioqIFNlZSAge0BsaW5rIER1cmF0aW9uLmxvY2FsZX0gYW5kIHtAbGluayBEdXJhdGlvbi5udW1iZXJpbmdTeXN0ZW19IGFjY2Vzc29ycy5cbiAqICogKipUcmFuc2Zvcm1hdGlvbioqIFRvIGNyZWF0ZSBuZXcgRHVyYXRpb25zIG91dCBvZiBvbGQgb25lcyB1c2Uge0BsaW5rIER1cmF0aW9uLnBsdXN9LCB7QGxpbmsgRHVyYXRpb24ubWludXN9LCB7QGxpbmsgRHVyYXRpb24ubm9ybWFsaXplfSwge0BsaW5rIER1cmF0aW9uLnNldH0sIHtAbGluayBEdXJhdGlvbi5yZWNvbmZpZ3VyZX0sIHtAbGluayBEdXJhdGlvbi5zaGlmdFRvfSwgYW5kIHtAbGluayBEdXJhdGlvbi5uZWdhdGV9LlxuICogKiAqKk91dHB1dCoqIFRvIGNvbnZlcnQgdGhlIER1cmF0aW9uIGludG8gb3RoZXIgcmVwcmVzZW50YXRpb25zLCBzZWUge0BsaW5rIER1cmF0aW9uLmFzfSwge0BsaW5rIER1cmF0aW9uLnRvSVNPfSwge0BsaW5rIER1cmF0aW9uLnRvRm9ybWF0fSwgYW5kIHtAbGluayBEdXJhdGlvbi50b0pTT059XG4gKlxuICogVGhlcmUncyBhcmUgbW9yZSBtZXRob2RzIGRvY3VtZW50ZWQgYmVsb3cuIEluIGFkZGl0aW9uLCBmb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiBzdWJ0bGVyIHRvcGljcyBsaWtlIGludGVybmF0aW9uYWxpemF0aW9uIGFuZCB2YWxpZGl0eSwgc2VlIHRoZSBleHRlcm5hbCBkb2N1bWVudGF0aW9uLlxuICovXG5cbmNsYXNzIER1cmF0aW9uIHtcbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBjb25zdCBhY2N1cmF0ZSA9IGNvbmZpZy5jb252ZXJzaW9uQWNjdXJhY3kgPT09ICdsb25ndGVybScgfHwgZmFsc2U7XG4gICAgLyoqXG4gICAgICogQGFjY2VzcyBwcml2YXRlXG4gICAgICovXG5cbiAgICB0aGlzLnZhbHVlcyA9IGNvbmZpZy52YWx1ZXM7XG4gICAgLyoqXG4gICAgICogQGFjY2VzcyBwcml2YXRlXG4gICAgICovXG5cbiAgICB0aGlzLmxvYyA9IGNvbmZpZy5sb2MgfHwgTG9jYWxlLmNyZWF0ZSgpO1xuICAgIC8qKlxuICAgICAqIEBhY2Nlc3MgcHJpdmF0ZVxuICAgICAqL1xuXG4gICAgdGhpcy5jb252ZXJzaW9uQWNjdXJhY3kgPSBhY2N1cmF0ZSA/ICdsb25ndGVybScgOiAnY2FzdWFsJztcbiAgICAvKipcbiAgICAgKiBAYWNjZXNzIHByaXZhdGVcbiAgICAgKi9cblxuICAgIHRoaXMuaW52YWxpZCA9IGNvbmZpZy5pbnZhbGlkIHx8IG51bGw7XG4gICAgLyoqXG4gICAgICogQGFjY2VzcyBwcml2YXRlXG4gICAgICovXG5cbiAgICB0aGlzLm1hdHJpeCA9IGFjY3VyYXRlID8gYWNjdXJhdGVNYXRyaXggOiBjYXN1YWxNYXRyaXg7XG4gICAgLyoqXG4gICAgICogQGFjY2VzcyBwcml2YXRlXG4gICAgICovXG5cbiAgICB0aGlzLmlzTHV4b25EdXJhdGlvbiA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogR2V0ICB0aGUgbG9jYWxlIG9mIGEgRHVyYXRpb24sIHN1Y2ggJ2VuLUdCJ1xuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cblxuICBnZXQgbG9jYWxlKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLmxvYy5sb2NhbGUgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbnVtYmVyaW5nIHN5c3RlbSBvZiBhIER1cmF0aW9uLCBzdWNoICdiZW5nJy4gVGhlIG51bWJlcmluZyBzeXN0ZW0gaXMgdXNlZCB3aGVuIGZvcm1hdHRpbmcgdGhlIER1cmF0aW9uXG4gICAqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuXG4gIGdldCBudW1iZXJpbmdTeXN0ZW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMubG9jLm51bWJlcmluZ1N5c3RlbSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB5ZWFycy5cbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG5cbiAgZ2V0IHllYXJzKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLnZhbHVlcy55ZWFycyB8fCAwIDogTmFOO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcXVhcnRlcnMuXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuXG4gIGdldCBxdWFydGVycygpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy52YWx1ZXMucXVhcnRlcnMgfHwgMCA6IE5hTjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1vbnRocy5cbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG5cbiAgZ2V0IG1vbnRocygpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy52YWx1ZXMubW9udGhzIHx8IDAgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB3ZWVrc1xuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cblxuICBnZXQgd2Vla3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMudmFsdWVzLndlZWtzIHx8IDAgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkYXlzLlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cblxuICBnZXQgZGF5cygpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy52YWx1ZXMuZGF5cyB8fCAwIDogTmFOO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaG91cnMuXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuXG4gIGdldCBob3VycygpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy52YWx1ZXMuaG91cnMgfHwgMCA6IE5hTjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1pbnV0ZXMuXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuXG4gIGdldCBtaW51dGVzKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLnZhbHVlcy5taW51dGVzIHx8IDAgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBzZWNvbmRzLlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuXG4gIGdldCBzZWNvbmRzKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLnZhbHVlcy5zZWNvbmRzIHx8IDAgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtaWxsaXNlY29uZHMuXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG5cbiAgZ2V0IG1pbGxpc2Vjb25kcygpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy52YWx1ZXMubWlsbGlzZWNvbmRzIHx8IDAgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIHRoZSBEdXJhdGlvbiBpcyBpbnZhbGlkLiBJbnZhbGlkIGR1cmF0aW9ucyBhcmUgcmV0dXJuZWQgYnkgZGlmZiBvcGVyYXRpb25zXG4gICAqIG9uIGludmFsaWQgRGF0ZVRpbWVzIG9yIEludGVydmFscy5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG5cbiAgZ2V0IGlzVmFsaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW52YWxpZCA9PT0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGVycm9yIGNvZGUgaWYgdGhpcyBEdXJhdGlvbiBiZWNhbWUgaW52YWxpZCwgb3IgbnVsbCBpZiB0aGUgRHVyYXRpb24gaXMgdmFsaWRcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cblxuICBnZXQgaW52YWxpZFJlYXNvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pbnZhbGlkID8gdGhpcy5pbnZhbGlkLnJlYXNvbiA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBleHBsYW5hdGlvbiBvZiB3aHkgdGhpcyBEdXJhdGlvbiBiZWNhbWUgaW52YWxpZCwgb3IgbnVsbCBpZiB0aGUgRHVyYXRpb24gaXMgdmFsaWRcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG5cbiAgZ2V0IGludmFsaWRFeHBsYW5hdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pbnZhbGlkID8gdGhpcy5pbnZhbGlkLmV4cGxhbmF0aW9uIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgRHVyYXRpb24gZnJvbSBhIG51bWJlciBvZiBtaWxsaXNlY29uZHMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudCBvZiBtaWxsaXNlY29uZHNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zIGZvciBwYXJzaW5nXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5sb2NhbGU9J2VuLVVTJ10gLSB0aGUgbG9jYWxlIHRvIHVzZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5udW1iZXJpbmdTeXN0ZW0gLSB0aGUgbnVtYmVyaW5nIHN5c3RlbSB0byB1c2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmNvbnZlcnNpb25BY2N1cmFjeT0nY2FzdWFsJ10gLSB0aGUgY29udmVyc2lvbiBzeXN0ZW0gdG8gdXNlXG4gICAqIEByZXR1cm4ge0R1cmF0aW9ufVxuICAgKi9cblxuICBzdGF0aWMgZnJvbU1pbGxpcyhjb3VudCwgb3B0cykge1xuICAgIHJldHVybiBEdXJhdGlvbi5mcm9tT2JqZWN0KFxuICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAge1xuICAgICAgICAgIG1pbGxpc2Vjb25kczogY291bnQsXG4gICAgICAgIH0sXG4gICAgICAgIG9wdHMsXG4gICAgICApLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgRHVyYXRpb24gZnJvbSBhIEphdmFzY3JpcHQgb2JqZWN0IHdpdGgga2V5cyBsaWtlICd5ZWFycycgYW5kICdob3Vycy5cbiAgICogSWYgdGhpcyBvYmplY3QgaXMgZW1wdHkgdGhlbiBhIHplcm8gbWlsbGlzZWNvbmRzIGR1cmF0aW9uIGlzIHJldHVybmVkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gdGhlIG9iamVjdCB0byBjcmVhdGUgdGhlIERhdGVUaW1lIGZyb21cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9iai55ZWFyc1xuICAgKiBAcGFyYW0ge251bWJlcn0gb2JqLnF1YXJ0ZXJzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvYmoubW9udGhzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvYmoud2Vla3NcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9iai5kYXlzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvYmouaG91cnNcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9iai5taW51dGVzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvYmouc2Vjb25kc1xuICAgKiBAcGFyYW0ge251bWJlcn0gb2JqLm1pbGxpc2Vjb25kc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW29iai5sb2NhbGU9J2VuLVVTJ10gLSB0aGUgbG9jYWxlIHRvIHVzZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb2JqLm51bWJlcmluZ1N5c3RlbSAtIHRoZSBudW1iZXJpbmcgc3lzdGVtIHRvIHVzZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29iai5jb252ZXJzaW9uQWNjdXJhY3k9J2Nhc3VhbCddIC0gdGhlIGNvbnZlcnNpb24gc3lzdGVtIHRvIHVzZVxuICAgKiBAcmV0dXJuIHtEdXJhdGlvbn1cbiAgICovXG5cbiAgc3RhdGljIGZyb21PYmplY3Qob2JqKSB7XG4gICAgaWYgKG9iaiA9PSBudWxsIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXJyb3IoXG4gICAgICAgIGBEdXJhdGlvbi5mcm9tT2JqZWN0OiBhcmd1bWVudCBleHBlY3RlZCB0byBiZSBhbiBvYmplY3QsIGdvdCAke1xuICAgICAgICAgIG9iaiA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBvYmpcbiAgICAgICAgfWAsXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRHVyYXRpb24oe1xuICAgICAgdmFsdWVzOiBub3JtYWxpemVPYmplY3Qob2JqLCBEdXJhdGlvbi5ub3JtYWxpemVVbml0LCBbXG4gICAgICAgICdsb2NhbGUnLFxuICAgICAgICAnbnVtYmVyaW5nU3lzdGVtJyxcbiAgICAgICAgJ2NvbnZlcnNpb25BY2N1cmFjeScsXG4gICAgICAgICd6b25lJywgLy8gYSBiaXQgb2YgZGVidDsgaXQncyBzdXBlciBpbmNvbnZlbmllbnQgaW50ZXJuYWxseSBub3QgdG8gYmUgYWJsZSB0byBibGluZGx5IHBhc3MgdGhpc1xuICAgICAgXSksXG4gICAgICBsb2M6IExvY2FsZS5mcm9tT2JqZWN0KG9iaiksXG4gICAgICBjb252ZXJzaW9uQWNjdXJhY3k6IG9iai5jb252ZXJzaW9uQWNjdXJhY3ksXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgRHVyYXRpb24gZnJvbSBhbiBJU08gODYwMSBkdXJhdGlvbiBzdHJpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gdGV4dCB0byBwYXJzZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnMgZm9yIHBhcnNpbmdcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmxvY2FsZT0nZW4tVVMnXSAtIHRoZSBsb2NhbGUgdG8gdXNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLm51bWJlcmluZ1N5c3RlbSAtIHRoZSBudW1iZXJpbmcgc3lzdGVtIHRvIHVzZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMuY29udmVyc2lvbkFjY3VyYWN5PSdjYXN1YWwnXSAtIHRoZSBjb252ZXJzaW9uIHN5c3RlbSB0byB1c2VcbiAgICogQHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fODYwMSNEdXJhdGlvbnNcbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbUlTTygnUDNZNk0xVzREVDEySDMwTTVTJykudG9PYmplY3QoKSAvLz0+IHsgeWVhcnM6IDMsIG1vbnRoczogNiwgd2Vla3M6IDEsIGRheXM6IDQsIGhvdXJzOiAxMiwgbWludXRlczogMzAsIHNlY29uZHM6IDUgfVxuICAgKiBAZXhhbXBsZSBEdXJhdGlvbi5mcm9tSVNPKCdQVDIzSCcpLnRvT2JqZWN0KCkgLy89PiB7IGhvdXJzOiAyMyB9XG4gICAqIEBleGFtcGxlIER1cmF0aW9uLmZyb21JU08oJ1A1WTNNJykudG9PYmplY3QoKSAvLz0+IHsgeWVhcnM6IDUsIG1vbnRoczogMyB9XG4gICAqIEByZXR1cm4ge0R1cmF0aW9ufVxuICAgKi9cblxuICBzdGF0aWMgZnJvbUlTTyh0ZXh0LCBvcHRzKSB7XG4gICAgY29uc3QgW3BhcnNlZF0gPSBwYXJzZUlTT0R1cmF0aW9uKHRleHQpO1xuXG4gICAgaWYgKHBhcnNlZCkge1xuICAgICAgY29uc3Qgb2JqID0gT2JqZWN0LmFzc2lnbihwYXJzZWQsIG9wdHMpO1xuICAgICAgcmV0dXJuIER1cmF0aW9uLmZyb21PYmplY3Qob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIER1cmF0aW9uLmludmFsaWQoXG4gICAgICAgICd1bnBhcnNhYmxlJyxcbiAgICAgICAgYHRoZSBpbnB1dCBcIiR7dGV4dH1cIiBjYW4ndCBiZSBwYXJzZWQgYXMgSVNPIDg2MDFgLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIGludmFsaWQgRHVyYXRpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWFzb24gLSBzaW1wbGUgc3RyaW5nIG9mIHdoeSB0aGlzIGRhdGV0aW1lIGlzIGludmFsaWQuIFNob3VsZCBub3QgY29udGFpbiBwYXJhbWV0ZXJzIG9yIGFueXRoaW5nIGVsc2UgZGF0YS1kZXBlbmRlbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtleHBsYW5hdGlvbj1udWxsXSAtIGxvbmdlciBleHBsYW5hdGlvbiwgbWF5IGluY2x1ZGUgcGFyYW1ldGVycyBhbmQgb3RoZXIgdXNlZnVsIGRlYnVnZ2luZyBpbmZvcm1hdGlvblxuICAgKiBAcmV0dXJuIHtEdXJhdGlvbn1cbiAgICovXG5cbiAgc3RhdGljIGludmFsaWQocmVhc29uLCBleHBsYW5hdGlvbiA9IG51bGwpIHtcbiAgICBpZiAoIXJlYXNvbikge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEVycm9yKFxuICAgICAgICAnbmVlZCB0byBzcGVjaWZ5IGEgcmVhc29uIHRoZSBEdXJhdGlvbiBpcyBpbnZhbGlkJyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgaW52YWxpZCA9XG4gICAgICByZWFzb24gaW5zdGFuY2VvZiBJbnZhbGlkID8gcmVhc29uIDogbmV3IEludmFsaWQocmVhc29uLCBleHBsYW5hdGlvbik7XG5cbiAgICBpZiAoU2V0dGluZ3MudGhyb3dPbkludmFsaWQpIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkRHVyYXRpb25FcnJvcihpbnZhbGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBEdXJhdGlvbih7XG4gICAgICAgIGludmFsaWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG5cbiAgc3RhdGljIG5vcm1hbGl6ZVVuaXQodW5pdCkge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB7XG4gICAgICB5ZWFyOiAneWVhcnMnLFxuICAgICAgeWVhcnM6ICd5ZWFycycsXG4gICAgICBxdWFydGVyOiAncXVhcnRlcnMnLFxuICAgICAgcXVhcnRlcnM6ICdxdWFydGVycycsXG4gICAgICBtb250aDogJ21vbnRocycsXG4gICAgICBtb250aHM6ICdtb250aHMnLFxuICAgICAgd2VlazogJ3dlZWtzJyxcbiAgICAgIHdlZWtzOiAnd2Vla3MnLFxuICAgICAgZGF5OiAnZGF5cycsXG4gICAgICBkYXlzOiAnZGF5cycsXG4gICAgICBob3VyOiAnaG91cnMnLFxuICAgICAgaG91cnM6ICdob3VycycsXG4gICAgICBtaW51dGU6ICdtaW51dGVzJyxcbiAgICAgIG1pbnV0ZXM6ICdtaW51dGVzJyxcbiAgICAgIHNlY29uZDogJ3NlY29uZHMnLFxuICAgICAgc2Vjb25kczogJ3NlY29uZHMnLFxuICAgICAgbWlsbGlzZWNvbmQ6ICdtaWxsaXNlY29uZHMnLFxuICAgICAgbWlsbGlzZWNvbmRzOiAnbWlsbGlzZWNvbmRzJyxcbiAgICB9W3VuaXQgPyB1bml0LnRvTG93ZXJDYXNlKCkgOiB1bml0XTtcbiAgICBpZiAoIW5vcm1hbGl6ZWQpIHRocm93IG5ldyBJbnZhbGlkVW5pdEVycm9yKHVuaXQpO1xuICAgIHJldHVybiBub3JtYWxpemVkO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGFuIG9iamVjdCBpcyBhIER1cmF0aW9uLiBXb3JrcyBhY3Jvc3MgY29udGV4dCBib3VuZGFyaWVzXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuXG4gIHN0YXRpYyBpc0R1cmF0aW9uKG8pIHtcbiAgICByZXR1cm4gKG8gJiYgby5pc0x1eG9uRHVyYXRpb24pIHx8IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEdXJhdGlvbiBmb3JtYXR0ZWQgYWNjb3JkaW5nIHRvIHRoZSBzcGVjaWZpZWQgZm9ybWF0IHN0cmluZy4gWW91IG1heSB1c2UgdGhlc2UgdG9rZW5zOlxuICAgKiAqIGBTYCBmb3IgbWlsbGlzZWNvbmRzXG4gICAqICogYHNgIGZvciBzZWNvbmRzXG4gICAqICogYG1gIGZvciBtaW51dGVzXG4gICAqICogYGhgIGZvciBob3Vyc1xuICAgKiAqIGBkYCBmb3IgZGF5c1xuICAgKiAqIGBNYCBmb3IgbW9udGhzXG4gICAqICogYHlgIGZvciB5ZWFyc1xuICAgKiBOb3RlczpcbiAgICogKiBBZGQgcGFkZGluZyBieSByZXBlYXRpbmcgdGhlIHRva2VuLCBlLmcuIFwieXlcIiBwYWRzIHRoZSB5ZWFycyB0byB0d28gZGlnaXRzLCBcImhoaGhcIiBwYWRzIHRoZSBob3VycyBvdXQgdG8gZm91ciBkaWdpdHNcbiAgICogKiBUaGUgZHVyYXRpb24gd2lsbCBiZSBjb252ZXJ0ZWQgdG8gdGhlIHNldCBvZiB1bml0cyBpbiB0aGUgZm9ybWF0IHN0cmluZyB1c2luZyB7QGxpbmsgRHVyYXRpb24uc2hpZnRUb30gYW5kIHRoZSBEdXJhdGlvbnMncyBjb252ZXJzaW9uIGFjY3VyYWN5IHNldHRpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmbXQgLSB0aGUgZm9ybWF0IHN0cmluZ1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnNcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5mbG9vcj10cnVlXSAtIGZsb29yIG51bWVyaWNhbCB2YWx1ZXNcbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbU9iamVjdCh7IHllYXJzOiAxLCBkYXlzOiA2LCBzZWNvbmRzOiAyIH0pLnRvRm9ybWF0KFwieSBkIHNcIikgLy89PiBcIjEgNiAyXCJcbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbU9iamVjdCh7IHllYXJzOiAxLCBkYXlzOiA2LCBzZWNvbmRzOiAyIH0pLnRvRm9ybWF0KFwieXkgZGQgc3NzXCIpIC8vPT4gXCIwMSAwNiAwMDJcIlxuICAgKiBAZXhhbXBsZSBEdXJhdGlvbi5mcm9tT2JqZWN0KHsgeWVhcnM6IDEsIGRheXM6IDYsIHNlY29uZHM6IDIgfSkudG9Gb3JtYXQoXCJNIFNcIikgLy89PiBcIjEyIDUxODQwMjAwMFwiXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG5cbiAgdG9Gb3JtYXQoZm10LCBvcHRzID0ge30pIHtcbiAgICAvLyByZXZlcnNlLWNvbXBhdCBzaW5jZSAxLjI7IHdlIGFsd2F5cyByb3VuZCBkb3duIG5vdywgbmV2ZXIgdXAsIGFuZCB3ZSBkbyBpdCBieSBkZWZhdWx0XG4gICAgY29uc3QgZm10T3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdHMsIHtcbiAgICAgIGZsb29yOiBvcHRzLnJvdW5kICE9PSBmYWxzZSAmJiBvcHRzLmZsb29yICE9PSBmYWxzZSxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkXG4gICAgICA/IEZvcm1hdHRlci5jcmVhdGUodGhpcy5sb2MsIGZtdE9wdHMpLmZvcm1hdER1cmF0aW9uRnJvbVN0cmluZyh0aGlzLCBmbXQpXG4gICAgICA6IElOVkFMSUQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIEphdmFzY3JpcHQgb2JqZWN0IHdpdGggdGhpcyBEdXJhdGlvbidzIHZhbHVlcy5cbiAgICogQHBhcmFtIG9wdHMgLSBvcHRpb25zIGZvciBnZW5lcmF0aW5nIHRoZSBvYmplY3RcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5pbmNsdWRlQ29uZmlnPWZhbHNlXSAtIGluY2x1ZGUgY29uZmlndXJhdGlvbiBhdHRyaWJ1dGVzIGluIHRoZSBvdXRwdXRcbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbU9iamVjdCh7IHllYXJzOiAxLCBkYXlzOiA2LCBzZWNvbmRzOiAyIH0pLnRvT2JqZWN0KCkgLy89PiB7IHllYXJzOiAxLCBkYXlzOiA2LCBzZWNvbmRzOiAyIH1cbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cblxuICB0b09iamVjdChvcHRzID0ge30pIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIHt9O1xuICAgIGNvbnN0IGJhc2UgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnZhbHVlcyk7XG5cbiAgICBpZiAob3B0cy5pbmNsdWRlQ29uZmlnKSB7XG4gICAgICBiYXNlLmNvbnZlcnNpb25BY2N1cmFjeSA9IHRoaXMuY29udmVyc2lvbkFjY3VyYWN5O1xuICAgICAgYmFzZS5udW1iZXJpbmdTeXN0ZW0gPSB0aGlzLmxvYy5udW1iZXJpbmdTeXN0ZW07XG4gICAgICBiYXNlLmxvY2FsZSA9IHRoaXMubG9jLmxvY2FsZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYmFzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIElTTyA4NjAxLWNvbXBsaWFudCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEdXJhdGlvbi5cbiAgICogQHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fODYwMSNEdXJhdGlvbnNcbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbU9iamVjdCh7IHllYXJzOiAzLCBzZWNvbmRzOiA0NSB9KS50b0lTTygpIC8vPT4gJ1AzWVQ0NVMnXG4gICAqIEBleGFtcGxlIER1cmF0aW9uLmZyb21PYmplY3QoeyBtb250aHM6IDQsIHNlY29uZHM6IDQ1IH0pLnRvSVNPKCkgLy89PiAnUDRNVDQ1UydcbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbU9iamVjdCh7IG1vbnRoczogNSB9KS50b0lTTygpIC8vPT4gJ1A1TSdcbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbU9iamVjdCh7IG1pbnV0ZXM6IDUgfSkudG9JU08oKSAvLz0+ICdQVDVNJ1xuICAgKiBAZXhhbXBsZSBEdXJhdGlvbi5mcm9tT2JqZWN0KHsgbWlsbGlzZWNvbmRzOiA2IH0pLnRvSVNPKCkgLy89PiAnUFQwLjAwNlMnXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG5cbiAgdG9JU08oKSB7XG4gICAgLy8gd2UgY291bGQgdXNlIHRoZSBmb3JtYXR0ZXIsIGJ1dCB0aGlzIGlzIGFuIGVhc2llciB3YXkgdG8gZ2V0IHRoZSBtaW5pbXVtIHN0cmluZ1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gbnVsbDtcbiAgICBsZXQgcyA9ICdQJztcbiAgICBpZiAodGhpcy55ZWFycyAhPT0gMCkgcyArPSB0aGlzLnllYXJzICsgJ1knO1xuICAgIGlmICh0aGlzLm1vbnRocyAhPT0gMCB8fCB0aGlzLnF1YXJ0ZXJzICE9PSAwKVxuICAgICAgcyArPSB0aGlzLm1vbnRocyArIHRoaXMucXVhcnRlcnMgKiAzICsgJ00nO1xuICAgIGlmICh0aGlzLndlZWtzICE9PSAwKSBzICs9IHRoaXMud2Vla3MgKyAnVyc7XG4gICAgaWYgKHRoaXMuZGF5cyAhPT0gMCkgcyArPSB0aGlzLmRheXMgKyAnRCc7XG4gICAgaWYgKFxuICAgICAgdGhpcy5ob3VycyAhPT0gMCB8fFxuICAgICAgdGhpcy5taW51dGVzICE9PSAwIHx8XG4gICAgICB0aGlzLnNlY29uZHMgIT09IDAgfHxcbiAgICAgIHRoaXMubWlsbGlzZWNvbmRzICE9PSAwXG4gICAgKVxuICAgICAgcyArPSAnVCc7XG4gICAgaWYgKHRoaXMuaG91cnMgIT09IDApIHMgKz0gdGhpcy5ob3VycyArICdIJztcbiAgICBpZiAodGhpcy5taW51dGVzICE9PSAwKSBzICs9IHRoaXMubWludXRlcyArICdNJztcbiAgICBpZiAodGhpcy5zZWNvbmRzICE9PSAwIHx8IHRoaXMubWlsbGlzZWNvbmRzICE9PSAwKVxuICAgICAgLy8gdGhpcyB3aWxsIGhhbmRsZSBcImZsb2F0aW5nIHBvaW50IG1hZG5lc3NcIiBieSByZW1vdmluZyBleHRyYSBkZWNpbWFsIHBsYWNlc1xuICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTg4MDA0L2lzLWZsb2F0aW5nLXBvaW50LW1hdGgtYnJva2VuXG4gICAgICBzICs9IHJvdW5kVG8odGhpcy5zZWNvbmRzICsgdGhpcy5taWxsaXNlY29uZHMgLyAxMDAwLCAzKSArICdTJztcbiAgICBpZiAocyA9PT0gJ1AnKSBzICs9ICdUMFMnO1xuICAgIHJldHVybiBzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gSVNPIDg2MDEgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEdXJhdGlvbiBhcHByb3ByaWF0ZSBmb3IgdXNlIGluIEpTT04uXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG5cbiAgdG9KU09OKCkge1xuICAgIHJldHVybiB0aGlzLnRvSVNPKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBJU08gODYwMSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIER1cmF0aW9uIGFwcHJvcHJpYXRlIGZvciB1c2UgaW4gZGVidWdnaW5nLlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLnRvSVNPKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBtaWxsaXNlY29uZHMgdmFsdWUgb2YgdGhpcyBEdXJhdGlvbi5cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cblxuICB2YWx1ZU9mKCkge1xuICAgIHJldHVybiB0aGlzLmFzKCdtaWxsaXNlY29uZHMnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIHRoaXMgRHVyYXRpb24gbG9uZ2VyIGJ5IHRoZSBzcGVjaWZpZWQgYW1vdW50LiBSZXR1cm4gYSBuZXdseS1jb25zdHJ1Y3RlZCBEdXJhdGlvbi5cbiAgICogQHBhcmFtIHtEdXJhdGlvbnxPYmplY3R8bnVtYmVyfSBkdXJhdGlvbiAtIFRoZSBhbW91bnQgdG8gYWRkLiBFaXRoZXIgYSBMdXhvbiBEdXJhdGlvbiwgYSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzLCB0aGUgb2JqZWN0IGFyZ3VtZW50IHRvIER1cmF0aW9uLmZyb21PYmplY3QoKVxuICAgKiBAcmV0dXJuIHtEdXJhdGlvbn1cbiAgICovXG5cbiAgcGx1cyhkdXJhdGlvbikge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gdGhpcztcbiAgICBjb25zdCBkdXIgPSBmcmllbmRseUR1cmF0aW9uKGR1cmF0aW9uKSxcbiAgICAgIHJlc3VsdCA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBrIG9mIG9yZGVyZWRVbml0cykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5KGR1ci52YWx1ZXMsIGspIHx8IGhhc093blByb3BlcnR5KHRoaXMudmFsdWVzLCBrKSkge1xuICAgICAgICByZXN1bHRba10gPSBkdXIuZ2V0KGspICsgdGhpcy5nZXQoayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsb25lKFxuICAgICAgdGhpcyxcbiAgICAgIHtcbiAgICAgICAgdmFsdWVzOiByZXN1bHQsXG4gICAgICB9LFxuICAgICAgdHJ1ZSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2UgdGhpcyBEdXJhdGlvbiBzaG9ydGVyIGJ5IHRoZSBzcGVjaWZpZWQgYW1vdW50LiBSZXR1cm4gYSBuZXdseS1jb25zdHJ1Y3RlZCBEdXJhdGlvbi5cbiAgICogQHBhcmFtIHtEdXJhdGlvbnxPYmplY3R8bnVtYmVyfSBkdXJhdGlvbiAtIFRoZSBhbW91bnQgdG8gc3VidHJhY3QuIEVpdGhlciBhIEx1eG9uIER1cmF0aW9uLCBhIG51bWJlciBvZiBtaWxsaXNlY29uZHMsIHRoZSBvYmplY3QgYXJndW1lbnQgdG8gRHVyYXRpb24uZnJvbU9iamVjdCgpXG4gICAqIEByZXR1cm4ge0R1cmF0aW9ufVxuICAgKi9cblxuICBtaW51cyhkdXJhdGlvbikge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gdGhpcztcbiAgICBjb25zdCBkdXIgPSBmcmllbmRseUR1cmF0aW9uKGR1cmF0aW9uKTtcbiAgICByZXR1cm4gdGhpcy5wbHVzKGR1ci5uZWdhdGUoKSk7XG4gIH1cblxuICAvKipcbiAgICogU2NhbGUgdGhpcyBEdXJhdGlvbiBieSB0aGUgc3BlY2lmaWVkIGFtb3VudC4gUmV0dXJuIGEgbmV3bHktY29uc3RydWN0ZWQgRHVyYXRpb24uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggdW5pdC4gQXJpdHkgaXMgMSBvciAyOiB0aGUgdmFsdWUgb2YgdGhlIHVuaXQgYW5kLCBvcHRpb25hbGx5LCB0aGUgdW5pdCBuYW1lLiBNdXN0IHJldHVybiBhIG51bWJlci5cbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbU9iamVjdCh7IGhvdXJzOiAxLCBtaW51dGVzOiAzMCB9KS5tYXBVbml0KHggPT4geCAqIDIpIC8vPT4geyBob3VyczogMiwgbWludXRlczogNjAgfVxuICAgKiBAZXhhbXBsZSBEdXJhdGlvbi5mcm9tT2JqZWN0KHsgaG91cnM6IDEsIG1pbnV0ZXM6IDMwIH0pLm1hcFVuaXQoKHgsIHUpID0+IHUgPT09IFwiaG91clwiID8geCAqIDIgOiB4KSAvLz0+IHsgaG91cnM6IDIsIG1pbnV0ZXM6IDMwIH1cbiAgICogQHJldHVybiB7RHVyYXRpb259XG4gICAqL1xuXG4gIG1hcFVuaXRzKGZuKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiB0aGlzO1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBrIG9mIE9iamVjdC5rZXlzKHRoaXMudmFsdWVzKSkge1xuICAgICAgcmVzdWx0W2tdID0gYXNOdW1iZXIoZm4odGhpcy52YWx1ZXNba10sIGspKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xvbmUoXG4gICAgICB0aGlzLFxuICAgICAge1xuICAgICAgICB2YWx1ZXM6IHJlc3VsdCxcbiAgICAgIH0sXG4gICAgICB0cnVlLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB2YWx1ZSBvZiB1bml0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdW5pdCAtIGEgdW5pdCBzdWNoIGFzICdtaW51dGUnIG9yICdkYXknXG4gICAqIEBleGFtcGxlIER1cmF0aW9uLmZyb21PYmplY3Qoe3llYXJzOiAyLCBkYXlzOiAzfSkueWVhcnMgLy89PiAyXG4gICAqIEBleGFtcGxlIER1cmF0aW9uLmZyb21PYmplY3Qoe3llYXJzOiAyLCBkYXlzOiAzfSkubW9udGhzIC8vPT4gMFxuICAgKiBAZXhhbXBsZSBEdXJhdGlvbi5mcm9tT2JqZWN0KHt5ZWFyczogMiwgZGF5czogM30pLmRheXMgLy89PiAzXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG5cbiAgZ2V0KHVuaXQpIHtcbiAgICByZXR1cm4gdGhpc1tEdXJhdGlvbi5ub3JtYWxpemVVbml0KHVuaXQpXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcIlNldFwiIHRoZSB2YWx1ZXMgb2Ygc3BlY2lmaWVkIHVuaXRzLiBSZXR1cm4gYSBuZXdseS1jb25zdHJ1Y3RlZCBEdXJhdGlvbi5cbiAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlcyAtIGEgbWFwcGluZyBvZiB1bml0cyB0byBudW1iZXJzXG4gICAqIEBleGFtcGxlIGR1ci5zZXQoeyB5ZWFyczogMjAxNyB9KVxuICAgKiBAZXhhbXBsZSBkdXIuc2V0KHsgaG91cnM6IDgsIG1pbnV0ZXM6IDMwIH0pXG4gICAqIEByZXR1cm4ge0R1cmF0aW9ufVxuICAgKi9cblxuICBzZXQodmFsdWVzKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiB0aGlzO1xuICAgIGNvbnN0IG1peGVkID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHRoaXMudmFsdWVzLFxuICAgICAgbm9ybWFsaXplT2JqZWN0KHZhbHVlcywgRHVyYXRpb24ubm9ybWFsaXplVW5pdCwgW10pLFxuICAgICk7XG4gICAgcmV0dXJuIGNsb25lKHRoaXMsIHtcbiAgICAgIHZhbHVlczogbWl4ZWQsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogXCJTZXRcIiB0aGUgbG9jYWxlIGFuZC9vciBudW1iZXJpbmdTeXN0ZW0uICBSZXR1cm5zIGEgbmV3bHktY29uc3RydWN0ZWQgRHVyYXRpb24uXG4gICAqIEBleGFtcGxlIGR1ci5yZWNvbmZpZ3VyZSh7IGxvY2FsZTogJ2VuLUdCJyB9KVxuICAgKiBAcmV0dXJuIHtEdXJhdGlvbn1cbiAgICovXG5cbiAgcmVjb25maWd1cmUoeyBsb2NhbGUsIG51bWJlcmluZ1N5c3RlbSwgY29udmVyc2lvbkFjY3VyYWN5IH0gPSB7fSkge1xuICAgIGNvbnN0IGxvYyA9IHRoaXMubG9jLmNsb25lKHtcbiAgICAgICAgbG9jYWxlLFxuICAgICAgICBudW1iZXJpbmdTeXN0ZW0sXG4gICAgICB9KSxcbiAgICAgIG9wdHMgPSB7XG4gICAgICAgIGxvYyxcbiAgICAgIH07XG5cbiAgICBpZiAoY29udmVyc2lvbkFjY3VyYWN5KSB7XG4gICAgICBvcHRzLmNvbnZlcnNpb25BY2N1cmFjeSA9IGNvbnZlcnNpb25BY2N1cmFjeTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xvbmUodGhpcywgb3B0cyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBsZW5ndGggb2YgdGhlIGR1cmF0aW9uIGluIHRoZSBzcGVjaWZpZWQgdW5pdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHVuaXQgLSBhIHVuaXQgc3VjaCBhcyAnbWludXRlcycgb3IgJ2RheXMnXG4gICAqIEBleGFtcGxlIER1cmF0aW9uLmZyb21PYmplY3Qoe3llYXJzOiAxfSkuYXMoJ2RheXMnKSAvLz0+IDM2NVxuICAgKiBAZXhhbXBsZSBEdXJhdGlvbi5mcm9tT2JqZWN0KHt5ZWFyczogMX0pLmFzKCdtb250aHMnKSAvLz0+IDEyXG4gICAqIEBleGFtcGxlIER1cmF0aW9uLmZyb21PYmplY3Qoe2hvdXJzOiA2MH0pLmFzKCdkYXlzJykgLy89PiAyLjVcbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cblxuICBhcyh1bml0KSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMuc2hpZnRUbyh1bml0KS5nZXQodW5pdCkgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogUmVkdWNlIHRoaXMgRHVyYXRpb24gdG8gaXRzIGNhbm9uaWNhbCByZXByZXNlbnRhdGlvbiBpbiBpdHMgY3VycmVudCB1bml0cy5cbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbU9iamVjdCh7IHllYXJzOiAyLCBkYXlzOiA1MDAwIH0pLm5vcm1hbGl6ZSgpLnRvT2JqZWN0KCkgLy89PiB7IHllYXJzOiAxNSwgZGF5czogMjU1IH1cbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbU9iamVjdCh7IGhvdXJzOiAxMiwgbWludXRlczogLTQ1IH0pLm5vcm1hbGl6ZSgpLnRvT2JqZWN0KCkgLy89PiB7IGhvdXJzOiAxMSwgbWludXRlczogMTUgfVxuICAgKiBAcmV0dXJuIHtEdXJhdGlvbn1cbiAgICovXG5cbiAgbm9ybWFsaXplKCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gdGhpcztcbiAgICBjb25zdCB2YWxzID0gdGhpcy50b09iamVjdCgpO1xuICAgIG5vcm1hbGl6ZVZhbHVlcyh0aGlzLm1hdHJpeCwgdmFscyk7XG4gICAgcmV0dXJuIGNsb25lKFxuICAgICAgdGhpcyxcbiAgICAgIHtcbiAgICAgICAgdmFsdWVzOiB2YWxzLFxuICAgICAgfSxcbiAgICAgIHRydWUsXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IHRoaXMgRHVyYXRpb24gaW50byBpdHMgcmVwcmVzZW50YXRpb24gaW4gYSBkaWZmZXJlbnQgc2V0IG9mIHVuaXRzLlxuICAgKiBAZXhhbXBsZSBEdXJhdGlvbi5mcm9tT2JqZWN0KHsgaG91cnM6IDEsIHNlY29uZHM6IDMwIH0pLnNoaWZ0VG8oJ21pbnV0ZXMnLCAnbWlsbGlzZWNvbmRzJykudG9PYmplY3QoKSAvLz0+IHsgbWludXRlczogNjAsIG1pbGxpc2Vjb25kczogMzAwMDAgfVxuICAgKiBAcmV0dXJuIHtEdXJhdGlvbn1cbiAgICovXG5cbiAgc2hpZnRUbyguLi51bml0cykge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gdGhpcztcblxuICAgIGlmICh1bml0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHVuaXRzID0gdW5pdHMubWFwKHUgPT4gRHVyYXRpb24ubm9ybWFsaXplVW5pdCh1KSk7XG4gICAgY29uc3QgYnVpbHQgPSB7fSxcbiAgICAgIGFjY3VtdWxhdGVkID0ge30sXG4gICAgICB2YWxzID0gdGhpcy50b09iamVjdCgpO1xuICAgIGxldCBsYXN0VW5pdDtcbiAgICBub3JtYWxpemVWYWx1ZXModGhpcy5tYXRyaXgsIHZhbHMpO1xuXG4gICAgZm9yIChjb25zdCBrIG9mIG9yZGVyZWRVbml0cykge1xuICAgICAgaWYgKHVuaXRzLmluZGV4T2YoaykgPj0gMCkge1xuICAgICAgICBsYXN0VW5pdCA9IGs7XG4gICAgICAgIGxldCBvd24gPSAwOyAvLyBhbnl0aGluZyB3ZSBoYXZlbid0IGJvaWxlZCBkb3duIHlldCBzaG91bGQgZ2V0IGJvaWxlZCB0byB0aGlzIHVuaXRcblxuICAgICAgICBmb3IgKGNvbnN0IGFrIGluIGFjY3VtdWxhdGVkKSB7XG4gICAgICAgICAgb3duICs9IHRoaXMubWF0cml4W2FrXVtrXSAqIGFjY3VtdWxhdGVkW2FrXTtcbiAgICAgICAgICBhY2N1bXVsYXRlZFtha10gPSAwO1xuICAgICAgICB9IC8vIHBsdXMgYW55dGhpbmcgdGhhdCdzIGFscmVhZHkgaW4gdGhpcyB1bml0XG5cbiAgICAgICAgaWYgKGlzTnVtYmVyKHZhbHNba10pKSB7XG4gICAgICAgICAgb3duICs9IHZhbHNba107XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpID0gTWF0aC50cnVuYyhvd24pO1xuICAgICAgICBidWlsdFtrXSA9IGk7XG4gICAgICAgIGFjY3VtdWxhdGVkW2tdID0gb3duIC0gaTsgLy8gd2UnZCBsaWtlIHRvIGFic29yYiB0aGVzZSBmcmFjdGlvbnMgaW4gYW5vdGhlciB1bml0XG4gICAgICAgIC8vIHBsdXMgYW55dGhpbmcgZnVydGhlciBkb3duIHRoZSBjaGFpbiB0aGF0IHNob3VsZCBiZSByb2xsZWQgdXAgaW4gdG8gdGhpc1xuXG4gICAgICAgIGZvciAoY29uc3QgZG93biBpbiB2YWxzKSB7XG4gICAgICAgICAgaWYgKG9yZGVyZWRVbml0cy5pbmRleE9mKGRvd24pID4gb3JkZXJlZFVuaXRzLmluZGV4T2YoaykpIHtcbiAgICAgICAgICAgIGNvbnZlcnQodGhpcy5tYXRyaXgsIHZhbHMsIGRvd24sIGJ1aWx0LCBrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gLy8gb3RoZXJ3aXNlLCBrZWVwIGl0IGluIHRoZSB3aW5ncyB0byBib2lsIGl0IGxhdGVyXG4gICAgICB9IGVsc2UgaWYgKGlzTnVtYmVyKHZhbHNba10pKSB7XG4gICAgICAgIGFjY3VtdWxhdGVkW2tdID0gdmFsc1trXTtcbiAgICAgIH1cbiAgICB9IC8vIGFueXRoaW5nIGxlZnRvdmVyIGJlY29tZXMgdGhlIGRlY2ltYWwgZm9yIHRoZSBsYXN0IHVuaXRcbiAgICAvLyBsYXN0VW5pdCBtdXN0IGJlIGRlZmluZWQgc2luY2UgdW5pdHMgaXMgbm90IGVtcHR5XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhY2N1bXVsYXRlZCkge1xuICAgICAgaWYgKGFjY3VtdWxhdGVkW2tleV0gIT09IDApIHtcbiAgICAgICAgYnVpbHRbbGFzdFVuaXRdICs9XG4gICAgICAgICAga2V5ID09PSBsYXN0VW5pdFxuICAgICAgICAgICAgPyBhY2N1bXVsYXRlZFtrZXldXG4gICAgICAgICAgICA6IGFjY3VtdWxhdGVkW2tleV0gLyB0aGlzLm1hdHJpeFtsYXN0VW5pdF1ba2V5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2xvbmUoXG4gICAgICB0aGlzLFxuICAgICAge1xuICAgICAgICB2YWx1ZXM6IGJ1aWx0LFxuICAgICAgfSxcbiAgICAgIHRydWUsXG4gICAgKS5ub3JtYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIG5lZ2F0aXZlIG9mIHRoaXMgRHVyYXRpb24uXG4gICAqIEBleGFtcGxlIER1cmF0aW9uLmZyb21PYmplY3QoeyBob3VyczogMSwgc2Vjb25kczogMzAgfSkubmVnYXRlKCkudG9PYmplY3QoKSAvLz0+IHsgaG91cnM6IC0xLCBzZWNvbmRzOiAtMzAgfVxuICAgKiBAcmV0dXJuIHtEdXJhdGlvbn1cbiAgICovXG5cbiAgbmVnYXRlKCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gdGhpcztcbiAgICBjb25zdCBuZWdhdGVkID0ge307XG5cbiAgICBmb3IgKGNvbnN0IGsgb2YgT2JqZWN0LmtleXModGhpcy52YWx1ZXMpKSB7XG4gICAgICBuZWdhdGVkW2tdID0gLXRoaXMudmFsdWVzW2tdO1xuICAgIH1cblxuICAgIHJldHVybiBjbG9uZShcbiAgICAgIHRoaXMsXG4gICAgICB7XG4gICAgICAgIHZhbHVlczogbmVnYXRlZCxcbiAgICAgIH0sXG4gICAgICB0cnVlLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRXF1YWxpdHkgY2hlY2tcbiAgICogVHdvIER1cmF0aW9ucyBhcmUgZXF1YWwgaWZmIHRoZXkgaGF2ZSB0aGUgc2FtZSB1bml0cyBhbmQgdGhlIHNhbWUgdmFsdWVzIGZvciBlYWNoIHVuaXQuXG4gICAqIEBwYXJhbSB7RHVyYXRpb259IG90aGVyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuXG4gIGVxdWFscyhvdGhlcikge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkIHx8ICFvdGhlci5pc1ZhbGlkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmxvYy5lcXVhbHMob3RoZXIubG9jKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgdSBvZiBvcmRlcmVkVW5pdHMpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlc1t1XSAhPT0gb3RoZXIudmFsdWVzW3VdKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZnJpZW5kbHlEdXJhdGlvbihkdXJhdGlvbmlzaCkge1xuICBpZiAoaXNOdW1iZXIoZHVyYXRpb25pc2gpKSB7XG4gICAgcmV0dXJuIER1cmF0aW9uLmZyb21NaWxsaXMoZHVyYXRpb25pc2gpO1xuICB9IGVsc2UgaWYgKER1cmF0aW9uLmlzRHVyYXRpb24oZHVyYXRpb25pc2gpKSB7XG4gICAgcmV0dXJuIGR1cmF0aW9uaXNoO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkdXJhdGlvbmlzaCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gRHVyYXRpb24uZnJvbU9iamVjdChkdXJhdGlvbmlzaCk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEVycm9yKFxuICAgICAgYFVua25vd24gZHVyYXRpb24gYXJndW1lbnQgJHtkdXJhdGlvbmlzaH0gb2YgdHlwZSAke3R5cGVvZiBkdXJhdGlvbmlzaH1gLFxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgSU5WQUxJRCQxID0gJ0ludmFsaWQgSW50ZXJ2YWwnOyAvLyBjaGVja3MgaWYgdGhlIHN0YXJ0IGlzIGVxdWFsIHRvIG9yIGJlZm9yZSB0aGUgZW5kXG5cbmZ1bmN0aW9uIHZhbGlkYXRlU3RhcnRFbmQoc3RhcnQsIGVuZCkge1xuICBpZiAoIXN0YXJ0IHx8ICFzdGFydC5pc1ZhbGlkKSB7XG4gICAgcmV0dXJuIEludGVydmFsLmludmFsaWQoJ21pc3Npbmcgb3IgaW52YWxpZCBzdGFydCcpO1xuICB9IGVsc2UgaWYgKCFlbmQgfHwgIWVuZC5pc1ZhbGlkKSB7XG4gICAgcmV0dXJuIEludGVydmFsLmludmFsaWQoJ21pc3Npbmcgb3IgaW52YWxpZCBlbmQnKTtcbiAgfSBlbHNlIGlmIChlbmQgPCBzdGFydCkge1xuICAgIHJldHVybiBJbnRlcnZhbC5pbnZhbGlkKFxuICAgICAgJ2VuZCBiZWZvcmUgc3RhcnQnLFxuICAgICAgYFRoZSBlbmQgb2YgYW4gaW50ZXJ2YWwgbXVzdCBiZSBhZnRlciBpdHMgc3RhcnQsIGJ1dCB5b3UgaGFkIHN0YXJ0PSR7c3RhcnQudG9JU08oKX0gYW5kIGVuZD0ke2VuZC50b0lTTygpfWAsXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vKipcbiAqIEFuIEludGVydmFsIG9iamVjdCByZXByZXNlbnRzIGEgaGFsZi1vcGVuIGludGVydmFsIG9mIHRpbWUsIHdoZXJlIGVhY2ggZW5kcG9pbnQgaXMgYSB7QGxpbmsgRGF0ZVRpbWV9LiBDb25jZXB0dWFsbHksIGl0J3MgYSBjb250YWluZXIgZm9yIHRob3NlIHR3byBlbmRwb2ludHMsIGFjY29tcGFuaWVkIGJ5IG1ldGhvZHMgZm9yIGNyZWF0aW5nLCBwYXJzaW5nLCBpbnRlcnJvZ2F0aW5nLCBjb21wYXJpbmcsIHRyYW5zZm9ybWluZywgYW5kIGZvcm1hdHRpbmcgdGhlbS5cbiAqXG4gKiBIZXJlIGlzIGEgYnJpZWYgb3ZlcnZpZXcgb2YgdGhlIG1vc3QgY29tbW9ubHkgdXNlZCBtZXRob2RzIGFuZCBnZXR0ZXJzIGluIEludGVydmFsOlxuICpcbiAqICogKipDcmVhdGlvbioqIFRvIGNyZWF0ZSBhbiBJbnRlcnZhbCwgdXNlIHtAbGluayBmcm9tRGF0ZVRpbWVzfSwge0BsaW5rIGFmdGVyfSwge0BsaW5rIGJlZm9yZX0sIG9yIHtAbGluayBmcm9tSVNPfS5cbiAqICogKipBY2Nlc3NvcnMqKiBVc2Uge0BsaW5rIHN0YXJ0fSBhbmQge0BsaW5rIGVuZH0gdG8gZ2V0IHRoZSBzdGFydCBhbmQgZW5kLlxuICogKiAqKkludGVycm9nYXRpb24qKiBUbyBhbmFseXplIHRoZSBJbnRlcnZhbCwgdXNlIHtAbGluayBjb3VudH0sIHtAbGluayBsZW5ndGh9LCB7QGxpbmsgaGFzU2FtZX0sIHtAbGluayBjb250YWluc30sIHtAbGluayBpc0FmdGVyfSwgb3Ige0BsaW5rIGlzQmVmb3JlfS5cbiAqICogKipUcmFuc2Zvcm1hdGlvbioqIFRvIGNyZWF0ZSBvdGhlciBJbnRlcnZhbHMgb3V0IG9mIHRoaXMgb25lLCB1c2Uge0BsaW5rIHNldH0sIHtAbGluayBzcGxpdEF0fSwge0BsaW5rIHNwbGl0Qnl9LCB7QGxpbmsgZGl2aWRlRXF1YWxseX0sIHtAbGluayBtZXJnZX0sIHtAbGluayB4b3J9LCB7QGxpbmsgdW5pb259LCB7QGxpbmsgaW50ZXJzZWN0aW9ufSwgb3Ige0BsaW5rIGRpZmZlcmVuY2V9LlxuICogKiAqKkNvbXBhcmlzb24qKiBUbyBjb21wYXJlIHRoaXMgSW50ZXJ2YWwgdG8gYW5vdGhlciBvbmUsIHVzZSB7QGxpbmsgZXF1YWxzfSwge0BsaW5rIG92ZXJsYXBzfSwge0BsaW5rIGFidXRzU3RhcnR9LCB7QGxpbmsgYWJ1dHNFbmR9LCB7QGxpbmsgZW5ndWxmc31cbiAqICogKipPdXRwdXQqKiBUbyBjb252ZXJ0IHRoZSBJbnRlcnZhbCBpbnRvIG90aGVyIHJlcHJlc2VudGF0aW9ucywgc2VlIHtAbGluayB0b1N0cmluZ30sIHtAbGluayB0b0lTT30sIHtAbGluayB0b0lTT0RhdGV9LCB7QGxpbmsgdG9JU09UaW1lfSwge0BsaW5rIHRvRm9ybWF0fSwgYW5kIHtAbGluayB0b0R1cmF0aW9ufS5cbiAqL1xuXG5jbGFzcyBJbnRlcnZhbCB7XG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgLyoqXG4gICAgICogQGFjY2VzcyBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5zID0gY29uZmlnLnN0YXJ0O1xuICAgIC8qKlxuICAgICAqIEBhY2Nlc3MgcHJpdmF0ZVxuICAgICAqL1xuXG4gICAgdGhpcy5lID0gY29uZmlnLmVuZDtcbiAgICAvKipcbiAgICAgKiBAYWNjZXNzIHByaXZhdGVcbiAgICAgKi9cblxuICAgIHRoaXMuaW52YWxpZCA9IGNvbmZpZy5pbnZhbGlkIHx8IG51bGw7XG4gICAgLyoqXG4gICAgICogQGFjY2VzcyBwcml2YXRlXG4gICAgICovXG5cbiAgICB0aGlzLmlzTHV4b25JbnRlcnZhbCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc3RhcnQgb2YgdGhlIEludGVydmFsXG4gICAqIEB0eXBlIHtEYXRlVGltZX1cbiAgICovXG5cbiAgZ2V0IHN0YXJ0KCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLnMgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVuZCBvZiB0aGUgSW50ZXJ2YWxcbiAgICogQHR5cGUge0RhdGVUaW1lfVxuICAgKi9cblxuICBnZXQgZW5kKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLmUgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciB0aGlzIEludGVydmFsJ3MgZW5kIGlzIGF0IGxlYXN0IGl0cyBzdGFydCwgbWVhbmluZyB0aGF0IHRoZSBJbnRlcnZhbCBpc24ndCAnYmFja3dhcmRzJy5cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuXG4gIGdldCBpc1ZhbGlkKCkge1xuICAgIHJldHVybiB0aGlzLmludmFsaWRSZWFzb24gPT09IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBlcnJvciBjb2RlIGlmIHRoaXMgSW50ZXJ2YWwgaXMgaW52YWxpZCwgb3IgbnVsbCBpZiB0aGUgSW50ZXJ2YWwgaXMgdmFsaWRcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG5cbiAgZ2V0IGludmFsaWRSZWFzb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW52YWxpZCA/IHRoaXMuaW52YWxpZC5yZWFzb24gOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gZXhwbGFuYXRpb24gb2Ygd2h5IHRoaXMgSW50ZXJ2YWwgYmVjYW1lIGludmFsaWQsIG9yIG51bGwgaWYgdGhlIEludGVydmFsIGlzIHZhbGlkXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuXG4gIGdldCBpbnZhbGlkRXhwbGFuYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW52YWxpZCA/IHRoaXMuaW52YWxpZC5leHBsYW5hdGlvbiA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIGludmFsaWQgSW50ZXJ2YWwuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWFzb24gLSBzaW1wbGUgc3RyaW5nIG9mIHdoeSB0aGlzIEludGVydmFsIGlzIGludmFsaWQuIFNob3VsZCBub3QgY29udGFpbiBwYXJhbWV0ZXJzIG9yIGFueXRoaW5nIGVsc2UgZGF0YS1kZXBlbmRlbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtleHBsYW5hdGlvbj1udWxsXSAtIGxvbmdlciBleHBsYW5hdGlvbiwgbWF5IGluY2x1ZGUgcGFyYW1ldGVycyBhbmQgb3RoZXIgdXNlZnVsIGRlYnVnZ2luZyBpbmZvcm1hdGlvblxuICAgKiBAcmV0dXJuIHtJbnRlcnZhbH1cbiAgICovXG5cbiAgc3RhdGljIGludmFsaWQocmVhc29uLCBleHBsYW5hdGlvbiA9IG51bGwpIHtcbiAgICBpZiAoIXJlYXNvbikge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEVycm9yKFxuICAgICAgICAnbmVlZCB0byBzcGVjaWZ5IGEgcmVhc29uIHRoZSBJbnRlcnZhbCBpcyBpbnZhbGlkJyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgaW52YWxpZCA9XG4gICAgICByZWFzb24gaW5zdGFuY2VvZiBJbnZhbGlkID8gcmVhc29uIDogbmV3IEludmFsaWQocmVhc29uLCBleHBsYW5hdGlvbik7XG5cbiAgICBpZiAoU2V0dGluZ3MudGhyb3dPbkludmFsaWQpIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkSW50ZXJ2YWxFcnJvcihpbnZhbGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBJbnRlcnZhbCh7XG4gICAgICAgIGludmFsaWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIEludGVydmFsIGZyb20gYSBzdGFydCBEYXRlVGltZSBhbmQgYW4gZW5kIERhdGVUaW1lLiBJbmNsdXNpdmUgb2YgdGhlIHN0YXJ0IGJ1dCBub3QgdGhlIGVuZC5cbiAgICogQHBhcmFtIHtEYXRlVGltZXxEYXRlfE9iamVjdH0gc3RhcnRcbiAgICogQHBhcmFtIHtEYXRlVGltZXxEYXRlfE9iamVjdH0gZW5kXG4gICAqIEByZXR1cm4ge0ludGVydmFsfVxuICAgKi9cblxuICBzdGF0aWMgZnJvbURhdGVUaW1lcyhzdGFydCwgZW5kKSB7XG4gICAgY29uc3QgYnVpbHRTdGFydCA9IGZyaWVuZGx5RGF0ZVRpbWUoc3RhcnQpLFxuICAgICAgYnVpbHRFbmQgPSBmcmllbmRseURhdGVUaW1lKGVuZCk7XG4gICAgY29uc3QgdmFsaWRhdGVFcnJvciA9IHZhbGlkYXRlU3RhcnRFbmQoYnVpbHRTdGFydCwgYnVpbHRFbmQpO1xuXG4gICAgaWYgKHZhbGlkYXRlRXJyb3IgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG5ldyBJbnRlcnZhbCh7XG4gICAgICAgIHN0YXJ0OiBidWlsdFN0YXJ0LFxuICAgICAgICBlbmQ6IGJ1aWx0RW5kLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWxpZGF0ZUVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gSW50ZXJ2YWwgZnJvbSBhIHN0YXJ0IERhdGVUaW1lIGFuZCBhIER1cmF0aW9uIHRvIGV4dGVuZCB0by5cbiAgICogQHBhcmFtIHtEYXRlVGltZXxEYXRlfE9iamVjdH0gc3RhcnRcbiAgICogQHBhcmFtIHtEdXJhdGlvbnxPYmplY3R8bnVtYmVyfSBkdXJhdGlvbiAtIHRoZSBsZW5ndGggb2YgdGhlIEludGVydmFsLlxuICAgKiBAcmV0dXJuIHtJbnRlcnZhbH1cbiAgICovXG5cbiAgc3RhdGljIGFmdGVyKHN0YXJ0LCBkdXJhdGlvbikge1xuICAgIGNvbnN0IGR1ciA9IGZyaWVuZGx5RHVyYXRpb24oZHVyYXRpb24pLFxuICAgICAgZHQgPSBmcmllbmRseURhdGVUaW1lKHN0YXJ0KTtcbiAgICByZXR1cm4gSW50ZXJ2YWwuZnJvbURhdGVUaW1lcyhkdCwgZHQucGx1cyhkdXIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gSW50ZXJ2YWwgZnJvbSBhbiBlbmQgRGF0ZVRpbWUgYW5kIGEgRHVyYXRpb24gdG8gZXh0ZW5kIGJhY2t3YXJkcyB0by5cbiAgICogQHBhcmFtIHtEYXRlVGltZXxEYXRlfE9iamVjdH0gZW5kXG4gICAqIEBwYXJhbSB7RHVyYXRpb258T2JqZWN0fG51bWJlcn0gZHVyYXRpb24gLSB0aGUgbGVuZ3RoIG9mIHRoZSBJbnRlcnZhbC5cbiAgICogQHJldHVybiB7SW50ZXJ2YWx9XG4gICAqL1xuXG4gIHN0YXRpYyBiZWZvcmUoZW5kLCBkdXJhdGlvbikge1xuICAgIGNvbnN0IGR1ciA9IGZyaWVuZGx5RHVyYXRpb24oZHVyYXRpb24pLFxuICAgICAgZHQgPSBmcmllbmRseURhdGVUaW1lKGVuZCk7XG4gICAgcmV0dXJuIEludGVydmFsLmZyb21EYXRlVGltZXMoZHQubWludXMoZHVyKSwgZHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBJbnRlcnZhbCBmcm9tIGFuIElTTyA4NjAxIHN0cmluZy5cbiAgICogQWNjZXB0cyBgPHN0YXJ0Pi88ZW5kPmAsIGA8c3RhcnQ+LzxkdXJhdGlvbj5gLCBhbmQgYDxkdXJhdGlvbj4vPGVuZD5gIGZvcm1hdHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gdGhlIElTTyBzdHJpbmcgdG8gcGFyc2VcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzXSAtIG9wdGlvbnMgdG8gcGFzcyB7QGxpbmsgRGF0ZVRpbWUuZnJvbUlTT30gYW5kIG9wdGlvbmFsbHkge0BsaW5rIER1cmF0aW9uLmZyb21JU099XG4gICAqIEBzZWUgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPXzg2MDEjVGltZV9pbnRlcnZhbHNcbiAgICogQHJldHVybiB7SW50ZXJ2YWx9XG4gICAqL1xuXG4gIHN0YXRpYyBmcm9tSVNPKHRleHQsIG9wdHMpIHtcbiAgICBjb25zdCBbcywgZV0gPSAodGV4dCB8fCAnJykuc3BsaXQoJy8nLCAyKTtcblxuICAgIGlmIChzICYmIGUpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gRGF0ZVRpbWUuZnJvbUlTTyhzLCBvcHRzKSxcbiAgICAgICAgZW5kID0gRGF0ZVRpbWUuZnJvbUlTTyhlLCBvcHRzKTtcblxuICAgICAgaWYgKHN0YXJ0LmlzVmFsaWQgJiYgZW5kLmlzVmFsaWQpIHtcbiAgICAgICAgcmV0dXJuIEludGVydmFsLmZyb21EYXRlVGltZXMoc3RhcnQsIGVuZCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGFydC5pc1ZhbGlkKSB7XG4gICAgICAgIGNvbnN0IGR1ciA9IER1cmF0aW9uLmZyb21JU08oZSwgb3B0cyk7XG5cbiAgICAgICAgaWYgKGR1ci5pc1ZhbGlkKSB7XG4gICAgICAgICAgcmV0dXJuIEludGVydmFsLmFmdGVyKHN0YXJ0LCBkdXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGVuZC5pc1ZhbGlkKSB7XG4gICAgICAgIGNvbnN0IGR1ciA9IER1cmF0aW9uLmZyb21JU08ocywgb3B0cyk7XG5cbiAgICAgICAgaWYgKGR1ci5pc1ZhbGlkKSB7XG4gICAgICAgICAgcmV0dXJuIEludGVydmFsLmJlZm9yZShlbmQsIGR1cik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gSW50ZXJ2YWwuaW52YWxpZChcbiAgICAgICd1bnBhcnNhYmxlJyxcbiAgICAgIGB0aGUgaW5wdXQgXCIke3RleHR9XCIgY2FuJ3QgYmUgcGFyc2VkIGFzIElTTyA4NjAxYCxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGFuIG9iamVjdCBpcyBhbiBJbnRlcnZhbC4gV29ya3MgYWNyb3NzIGNvbnRleHQgYm91bmRhcmllc1xuICAgKiBAcGFyYW0ge29iamVjdH0gb1xuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cblxuICBzdGF0aWMgaXNJbnRlcnZhbChvKSB7XG4gICAgcmV0dXJuIChvICYmIG8uaXNMdXhvbkludGVydmFsKSB8fCBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXJnZSBhbiBhcnJheSBvZiBJbnRlcnZhbHMgaW50byBhIGVxdWl2YWxlbnQgbWluaW1hbCBzZXQgb2YgSW50ZXJ2YWxzLlxuICAgKiBDb21iaW5lcyBvdmVybGFwcGluZyBhbmQgYWRqYWNlbnQgSW50ZXJ2YWxzLlxuICAgKiBAcGFyYW0ge1tJbnRlcnZhbF19IGludGVydmFsc1xuICAgKiBAcmV0dXJuIHtbSW50ZXJ2YWxdfVxuICAgKi9cblxuICBzdGF0aWMgbWVyZ2UoaW50ZXJ2YWxzKSB7XG4gICAgY29uc3QgW2ZvdW5kLCBmaW5hbF0gPSBpbnRlcnZhbHNcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnMgLSBiLnMpXG4gICAgICAucmVkdWNlKFxuICAgICAgICAoW3NvZmFyLCBjdXJyZW50XSwgaXRlbSkgPT4ge1xuICAgICAgICAgIGlmICghY3VycmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIFtzb2ZhciwgaXRlbV07XG4gICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50Lm92ZXJsYXBzKGl0ZW0pIHx8IGN1cnJlbnQuYWJ1dHNTdGFydChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIFtzb2ZhciwgY3VycmVudC51bmlvbihpdGVtKV07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbc29mYXIuY29uY2F0KFtjdXJyZW50XSksIGl0ZW1dO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW1tdLCBudWxsXSxcbiAgICAgICk7XG5cbiAgICBpZiAoZmluYWwpIHtcbiAgICAgIGZvdW5kLnB1c2goZmluYWwpO1xuICAgIH1cblxuICAgIHJldHVybiBmb3VuZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYW4gYXJyYXkgb2YgSW50ZXJ2YWxzIHJlcHJlc2VudGluZyB0aGUgc3BhbnMgb2YgdGltZSB0aGF0IG9ubHkgYXBwZWFyIGluIG9uZSBvZiB0aGUgc3BlY2lmaWVkIEludGVydmFscy5cbiAgICogQHBhcmFtIHtbSW50ZXJ2YWxdfSBpbnRlcnZhbHNcbiAgICogQHJldHVybiB7W0ludGVydmFsXX1cbiAgICovXG5cbiAgc3RhdGljIHhvcihpbnRlcnZhbHMpIHtcbiAgICBsZXQgc3RhcnQgPSBudWxsLFxuICAgICAgY3VycmVudENvdW50ID0gMDtcbiAgICBjb25zdCByZXN1bHRzID0gW10sXG4gICAgICBlbmRzID0gaW50ZXJ2YWxzLm1hcChpID0+IFtcbiAgICAgICAge1xuICAgICAgICAgIHRpbWU6IGkucyxcbiAgICAgICAgICB0eXBlOiAncycsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0aW1lOiBpLmUsXG4gICAgICAgICAgdHlwZTogJ2UnLFxuICAgICAgICB9LFxuICAgICAgXSksXG4gICAgICBmbGF0dGVuZWQgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0KC4uLmVuZHMpLFxuICAgICAgYXJyID0gZmxhdHRlbmVkLnNvcnQoKGEsIGIpID0+IGEudGltZSAtIGIudGltZSk7XG5cbiAgICBmb3IgKGNvbnN0IGkgb2YgYXJyKSB7XG4gICAgICBjdXJyZW50Q291bnQgKz0gaS50eXBlID09PSAncycgPyAxIDogLTE7XG5cbiAgICAgIGlmIChjdXJyZW50Q291bnQgPT09IDEpIHtcbiAgICAgICAgc3RhcnQgPSBpLnRpbWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc3RhcnQgJiYgK3N0YXJ0ICE9PSAraS50aW1lKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKEludGVydmFsLmZyb21EYXRlVGltZXMoc3RhcnQsIGkudGltZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBJbnRlcnZhbC5tZXJnZShyZXN1bHRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsZW5ndGggb2YgdGhlIEludGVydmFsIGluIHRoZSBzcGVjaWZpZWQgdW5pdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHVuaXQgLSB0aGUgdW5pdCAoc3VjaCBhcyAnaG91cnMnIG9yICdkYXlzJykgdG8gcmV0dXJuIHRoZSBsZW5ndGggaW4uXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG5cbiAgbGVuZ3RoKHVuaXQgPSAnbWlsbGlzZWNvbmRzJykge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLnRvRHVyYXRpb24oLi4uW3VuaXRdKS5nZXQodW5pdCkgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY291bnQgb2YgbWludXRlcywgaG91cnMsIGRheXMsIG1vbnRocywgb3IgeWVhcnMgaW5jbHVkZWQgaW4gdGhlIEludGVydmFsLCBldmVuIGluIHBhcnQuXG4gICAqIFVubGlrZSB7QGxpbmsgbGVuZ3RofSB0aGlzIGNvdW50cyBzZWN0aW9ucyBvZiB0aGUgY2FsZW5kYXIsIG5vdCBwZXJpb2RzIG9mIHRpbWUsIGUuZy4gc3BlY2lmeWluZyAnZGF5J1xuICAgKiBhc2tzICd3aGF0IGRhdGVzIGFyZSBpbmNsdWRlZCBpbiB0aGlzIGludGVydmFsPycsIG5vdCAnaG93IG1hbnkgZGF5cyBsb25nIGlzIHRoaXMgaW50ZXJ2YWw/J1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW3VuaXQ9J21pbGxpc2Vjb25kcyddIC0gdGhlIHVuaXQgb2YgdGltZSB0byBjb3VudC5cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cblxuICBjb3VudCh1bml0ID0gJ21pbGxpc2Vjb25kcycpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIE5hTjtcbiAgICBjb25zdCBzdGFydCA9IHRoaXMuc3RhcnQuc3RhcnRPZih1bml0KSxcbiAgICAgIGVuZCA9IHRoaXMuZW5kLnN0YXJ0T2YodW5pdCk7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoZW5kLmRpZmYoc3RhcnQsIHVuaXQpLmdldCh1bml0KSkgKyAxO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciB0aGlzIEludGVydmFsJ3Mgc3RhcnQgYW5kIGVuZCBhcmUgYm90aCBpbiB0aGUgc2FtZSB1bml0IG9mIHRpbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVuaXQgLSB0aGUgdW5pdCBvZiB0aW1lIHRvIGNoZWNrIHNhbWVuZXNzIG9uXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuXG4gIGhhc1NhbWUodW5pdCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLmUubWludXMoMSkuaGFzU2FtZSh0aGlzLnMsIHVuaXQpIDogZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHdoZXRoZXIgdGhpcyBJbnRlcnZhbCBoYXMgdGhlIHNhbWUgc3RhcnQgYW5kIGVuZCBEYXRlVGltZXMuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuXG4gIGlzRW1wdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMucy52YWx1ZU9mKCkgPT09IHRoaXMuZS52YWx1ZU9mKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHdoZXRoZXIgdGhpcyBJbnRlcnZhbCdzIHN0YXJ0IGlzIGFmdGVyIHRoZSBzcGVjaWZpZWQgRGF0ZVRpbWUuXG4gICAqIEBwYXJhbSB7RGF0ZVRpbWV9IGRhdGVUaW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuXG4gIGlzQWZ0ZXIoZGF0ZVRpbWUpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0aGlzLnMgPiBkYXRlVGltZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gd2hldGhlciB0aGlzIEludGVydmFsJ3MgZW5kIGlzIGJlZm9yZSB0aGUgc3BlY2lmaWVkIERhdGVUaW1lLlxuICAgKiBAcGFyYW0ge0RhdGVUaW1lfSBkYXRlVGltZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cblxuICBpc0JlZm9yZShkYXRlVGltZSkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXMuZSA8PSBkYXRlVGltZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gd2hldGhlciB0aGlzIEludGVydmFsIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgRGF0ZVRpbWUuXG4gICAqIEBwYXJhbSB7RGF0ZVRpbWV9IGRhdGVUaW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuXG4gIGNvbnRhaW5zKGRhdGVUaW1lKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdGhpcy5zIDw9IGRhdGVUaW1lICYmIHRoaXMuZSA+IGRhdGVUaW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIFwiU2V0c1wiIHRoZSBzdGFydCBhbmQvb3IgZW5kIGRhdGVzLiBSZXR1cm5zIGEgbmV3bHktY29uc3RydWN0ZWQgSW50ZXJ2YWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZXMgLSB0aGUgdmFsdWVzIHRvIHNldFxuICAgKiBAcGFyYW0ge0RhdGVUaW1lfSB2YWx1ZXMuc3RhcnQgLSB0aGUgc3RhcnRpbmcgRGF0ZVRpbWVcbiAgICogQHBhcmFtIHtEYXRlVGltZX0gdmFsdWVzLmVuZCAtIHRoZSBlbmRpbmcgRGF0ZVRpbWVcbiAgICogQHJldHVybiB7SW50ZXJ2YWx9XG4gICAqL1xuXG4gIHNldCh7IHN0YXJ0LCBlbmQgfSA9IHt9KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiB0aGlzO1xuICAgIHJldHVybiBJbnRlcnZhbC5mcm9tRGF0ZVRpbWVzKHN0YXJ0IHx8IHRoaXMucywgZW5kIHx8IHRoaXMuZSk7XG4gIH1cblxuICAvKipcbiAgICogU3BsaXQgdGhpcyBJbnRlcnZhbCBhdCBlYWNoIG9mIHRoZSBzcGVjaWZpZWQgRGF0ZVRpbWVzXG4gICAqIEBwYXJhbSB7Li4uW0RhdGVUaW1lXX0gZGF0ZVRpbWVzIC0gdGhlIHVuaXQgb2YgdGltZSB0byBjb3VudC5cbiAgICogQHJldHVybiB7W0ludGVydmFsXX1cbiAgICovXG5cbiAgc3BsaXRBdCguLi5kYXRlVGltZXMpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIFtdO1xuICAgIGNvbnN0IHNvcnRlZCA9IGRhdGVUaW1lc1xuICAgICAgICAubWFwKGZyaWVuZGx5RGF0ZVRpbWUpXG4gICAgICAgIC5maWx0ZXIoZCA9PiB0aGlzLmNvbnRhaW5zKGQpKVxuICAgICAgICAuc29ydCgpLFxuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgIGxldCB7IHMgfSA9IHRoaXMsXG4gICAgICBpID0gMDtcblxuICAgIHdoaWxlIChzIDwgdGhpcy5lKSB7XG4gICAgICBjb25zdCBhZGRlZCA9IHNvcnRlZFtpXSB8fCB0aGlzLmUsXG4gICAgICAgIG5leHQgPSArYWRkZWQgPiArdGhpcy5lID8gdGhpcy5lIDogYWRkZWQ7XG4gICAgICByZXN1bHRzLnB1c2goSW50ZXJ2YWwuZnJvbURhdGVUaW1lcyhzLCBuZXh0KSk7XG4gICAgICBzID0gbmV4dDtcbiAgICAgIGkgKz0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBTcGxpdCB0aGlzIEludGVydmFsIGludG8gc21hbGxlciBJbnRlcnZhbHMsIGVhY2ggb2YgdGhlIHNwZWNpZmllZCBsZW5ndGguXG4gICAqIExlZnQgb3ZlciB0aW1lIGlzIGdyb3VwZWQgaW50byBhIHNtYWxsZXIgaW50ZXJ2YWxcbiAgICogQHBhcmFtIHtEdXJhdGlvbnxPYmplY3R8bnVtYmVyfSBkdXJhdGlvbiAtIFRoZSBsZW5ndGggb2YgZWFjaCByZXN1bHRpbmcgaW50ZXJ2YWwuXG4gICAqIEByZXR1cm4ge1tJbnRlcnZhbF19XG4gICAqL1xuXG4gIHNwbGl0QnkoZHVyYXRpb24pIHtcbiAgICBjb25zdCBkdXIgPSBmcmllbmRseUR1cmF0aW9uKGR1cmF0aW9uKTtcblxuICAgIGlmICghdGhpcy5pc1ZhbGlkIHx8ICFkdXIuaXNWYWxpZCB8fCBkdXIuYXMoJ21pbGxpc2Vjb25kcycpID09PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgbGV0IHsgcyB9ID0gdGhpcyxcbiAgICAgIGFkZGVkLFxuICAgICAgbmV4dDtcbiAgICBjb25zdCByZXN1bHRzID0gW107XG5cbiAgICB3aGlsZSAocyA8IHRoaXMuZSkge1xuICAgICAgYWRkZWQgPSBzLnBsdXMoZHVyKTtcbiAgICAgIG5leHQgPSArYWRkZWQgPiArdGhpcy5lID8gdGhpcy5lIDogYWRkZWQ7XG4gICAgICByZXN1bHRzLnB1c2goSW50ZXJ2YWwuZnJvbURhdGVUaW1lcyhzLCBuZXh0KSk7XG4gICAgICBzID0gbmV4dDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBTcGxpdCB0aGlzIEludGVydmFsIGludG8gdGhlIHNwZWNpZmllZCBudW1iZXIgb2Ygc21hbGxlciBpbnRlcnZhbHMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJPZlBhcnRzIC0gVGhlIG51bWJlciBvZiBJbnRlcnZhbHMgdG8gZGl2aWRlIHRoZSBJbnRlcnZhbCBpbnRvLlxuICAgKiBAcmV0dXJuIHtbSW50ZXJ2YWxdfVxuICAgKi9cblxuICBkaXZpZGVFcXVhbGx5KG51bWJlck9mUGFydHMpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIFtdO1xuICAgIHJldHVybiB0aGlzLnNwbGl0QnkodGhpcy5sZW5ndGgoKSAvIG51bWJlck9mUGFydHMpLnNsaWNlKDAsIG51bWJlck9mUGFydHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB3aGV0aGVyIHRoaXMgSW50ZXJ2YWwgb3ZlcmxhcHMgd2l0aCB0aGUgc3BlY2lmaWVkIEludGVydmFsXG4gICAqIEBwYXJhbSB7SW50ZXJ2YWx9IG90aGVyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuXG4gIG92ZXJsYXBzKG90aGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuZSA+IG90aGVyLnMgJiYgdGhpcy5zIDwgb3RoZXIuZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gd2hldGhlciB0aGlzIEludGVydmFsJ3MgZW5kIGlzIGFkamFjZW50IHRvIHRoZSBzcGVjaWZpZWQgSW50ZXJ2YWwncyBzdGFydC5cbiAgICogQHBhcmFtIHtJbnRlcnZhbH0gb3RoZXJcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG5cbiAgYWJ1dHNTdGFydChvdGhlcikge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuICt0aGlzLmUgPT09ICtvdGhlci5zO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB3aGV0aGVyIHRoaXMgSW50ZXJ2YWwncyBzdGFydCBpcyBhZGphY2VudCB0byB0aGUgc3BlY2lmaWVkIEludGVydmFsJ3MgZW5kLlxuICAgKiBAcGFyYW0ge0ludGVydmFsfSBvdGhlclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cblxuICBhYnV0c0VuZChvdGhlcikge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuICtvdGhlci5lID09PSArdGhpcy5zO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB3aGV0aGVyIHRoaXMgSW50ZXJ2YWwgZW5ndWxmcyB0aGUgc3RhcnQgYW5kIGVuZCBvZiB0aGUgc3BlY2lmaWVkIEludGVydmFsLlxuICAgKiBAcGFyYW0ge0ludGVydmFsfSBvdGhlclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cblxuICBlbmd1bGZzKG90aGVyKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdGhpcy5zIDw9IG90aGVyLnMgJiYgdGhpcy5lID49IG90aGVyLmU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHdoZXRoZXIgdGhpcyBJbnRlcnZhbCBoYXMgdGhlIHNhbWUgc3RhcnQgYW5kIGVuZCBhcyB0aGUgc3BlY2lmaWVkIEludGVydmFsLlxuICAgKiBAcGFyYW0ge0ludGVydmFsfSBvdGhlclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cblxuICBlcXVhbHMob3RoZXIpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCB8fCAhb3RoZXIuaXNWYWxpZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnMuZXF1YWxzKG90aGVyLnMpICYmIHRoaXMuZS5lcXVhbHMob3RoZXIuZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFuIEludGVydmFsIHJlcHJlc2VudGluZyB0aGUgaW50ZXJzZWN0aW9uIG9mIHRoaXMgSW50ZXJ2YWwgYW5kIHRoZSBzcGVjaWZpZWQgSW50ZXJ2YWwuXG4gICAqIFNwZWNpZmljYWxseSwgdGhlIHJlc3VsdGluZyBJbnRlcnZhbCBoYXMgdGhlIG1heGltdW0gc3RhcnQgdGltZSBhbmQgdGhlIG1pbmltdW0gZW5kIHRpbWUgb2YgdGhlIHR3byBJbnRlcnZhbHMuXG4gICAqIFJldHVybnMgbnVsbCBpZiB0aGUgaW50ZXJzZWN0aW9uIGlzIGVtcHR5LCBtZWFuaW5nLCB0aGUgaW50ZXJ2YWxzIGRvbid0IGludGVyc2VjdC5cbiAgICogQHBhcmFtIHtJbnRlcnZhbH0gb3RoZXJcbiAgICogQHJldHVybiB7SW50ZXJ2YWx9XG4gICAqL1xuXG4gIGludGVyc2VjdGlvbihvdGhlcikge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gdGhpcztcbiAgICBjb25zdCBzID0gdGhpcy5zID4gb3RoZXIucyA/IHRoaXMucyA6IG90aGVyLnMsXG4gICAgICBlID0gdGhpcy5lIDwgb3RoZXIuZSA/IHRoaXMuZSA6IG90aGVyLmU7XG5cbiAgICBpZiAocyA+IGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gSW50ZXJ2YWwuZnJvbURhdGVUaW1lcyhzLCBlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFuIEludGVydmFsIHJlcHJlc2VudGluZyB0aGUgdW5pb24gb2YgdGhpcyBJbnRlcnZhbCBhbmQgdGhlIHNwZWNpZmllZCBJbnRlcnZhbC5cbiAgICogU3BlY2lmaWNhbGx5LCB0aGUgcmVzdWx0aW5nIEludGVydmFsIGhhcyB0aGUgbWluaW11bSBzdGFydCB0aW1lIGFuZCB0aGUgbWF4aW11bSBlbmQgdGltZSBvZiB0aGUgdHdvIEludGVydmFscy5cbiAgICogQHBhcmFtIHtJbnRlcnZhbH0gb3RoZXJcbiAgICogQHJldHVybiB7SW50ZXJ2YWx9XG4gICAqL1xuXG4gIHVuaW9uKG90aGVyKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiB0aGlzO1xuICAgIGNvbnN0IHMgPSB0aGlzLnMgPCBvdGhlci5zID8gdGhpcy5zIDogb3RoZXIucyxcbiAgICAgIGUgPSB0aGlzLmUgPiBvdGhlci5lID8gdGhpcy5lIDogb3RoZXIuZTtcbiAgICByZXR1cm4gSW50ZXJ2YWwuZnJvbURhdGVUaW1lcyhzLCBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYW4gSW50ZXJ2YWwgcmVwcmVzZW50aW5nIHRoZSBzcGFuIG9mIHRpbWUgaW4gdGhpcyBJbnRlcnZhbCB0aGF0IGRvZXNuJ3Qgb3ZlcmxhcCB3aXRoIGFueSBvZiB0aGUgc3BlY2lmaWVkIEludGVydmFscy5cbiAgICogQHBhcmFtIHsuLi5JbnRlcnZhbH0gaW50ZXJ2YWxzXG4gICAqIEByZXR1cm4ge1tJbnRlcnZhbF19XG4gICAqL1xuXG4gIGRpZmZlcmVuY2UoLi4uaW50ZXJ2YWxzKSB7XG4gICAgcmV0dXJuIEludGVydmFsLnhvcihbdGhpc10uY29uY2F0KGludGVydmFscykpXG4gICAgICAubWFwKGkgPT4gdGhpcy5pbnRlcnNlY3Rpb24oaSkpXG4gICAgICAuZmlsdGVyKGkgPT4gaSAmJiAhaS5pc0VtcHR5KCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBJbnRlcnZhbCBhcHByb3ByaWF0ZSBmb3IgZGVidWdnaW5nLlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuXG4gIHRvU3RyaW5nKCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gSU5WQUxJRCQxO1xuICAgIHJldHVybiBgWyR7dGhpcy5zLnRvSVNPKCl9IOKAkyAke3RoaXMuZS50b0lTTygpfSlgO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gSVNPIDg2MDEtY29tcGxpYW50IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIEludGVydmFsLlxuICAgKiBAc2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT184NjAxI1RpbWVfaW50ZXJ2YWxzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gVGhlIHNhbWUgb3B0aW9ucyBhcyB7QGxpbmsgRGF0ZVRpbWUudG9JU099XG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG5cbiAgdG9JU08ob3B0cykge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gSU5WQUxJRCQxO1xuICAgIHJldHVybiBgJHt0aGlzLnMudG9JU08ob3B0cyl9LyR7dGhpcy5lLnRvSVNPKG9wdHMpfWA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBJU08gODYwMS1jb21wbGlhbnQgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGRhdGUgb2YgdGhpcyBJbnRlcnZhbC5cbiAgICogVGhlIHRpbWUgY29tcG9uZW50cyBhcmUgaWdub3JlZC5cbiAgICogQHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fODYwMSNUaW1lX2ludGVydmFsc1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuXG4gIHRvSVNPRGF0ZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIElOVkFMSUQkMTtcbiAgICByZXR1cm4gYCR7dGhpcy5zLnRvSVNPRGF0ZSgpfS8ke3RoaXMuZS50b0lTT0RhdGUoKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gSVNPIDg2MDEtY29tcGxpYW50IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aW1lIG9mIHRoaXMgSW50ZXJ2YWwuXG4gICAqIFRoZSBkYXRlIGNvbXBvbmVudHMgYXJlIGlnbm9yZWQuXG4gICAqIEBzZWUgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPXzg2MDEjVGltZV9pbnRlcnZhbHNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBUaGUgc2FtZSBvcHRpb25zIGFzIHtAbGluayBEYXRlVGltZS50b0lTT31cbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cblxuICB0b0lTT1RpbWUob3B0cykge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gSU5WQUxJRCQxO1xuICAgIHJldHVybiBgJHt0aGlzLnMudG9JU09UaW1lKG9wdHMpfS8ke3RoaXMuZS50b0lTT1RpbWUob3B0cyl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgSW50ZXJ2YWwgZm9ybWF0dGVkIGFjY29yZGluZyB0byB0aGUgc3BlY2lmaWVkIGZvcm1hdCBzdHJpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlRm9ybWF0IC0gdGhlIGZvcm1hdCBzdHJpbmcuIFRoaXMgc3RyaW5nIGZvcm1hdHMgdGhlIHN0YXJ0IGFuZCBlbmQgdGltZS4gU2VlIHtAbGluayBEYXRlVGltZS50b0Zvcm1hdH0gZm9yIGRldGFpbHMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMuc2VwYXJhdG9yID0gICcg4oCTICddIC0gYSBzZXBhcmF0b3IgdG8gcGxhY2UgYmV0d2VlbiB0aGUgc3RhcnQgYW5kIGVuZCByZXByZXNlbnRhdGlvbnNcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cblxuICB0b0Zvcm1hdChkYXRlRm9ybWF0LCB7IHNlcGFyYXRvciA9ICcg4oCTICcgfSA9IHt9KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiBJTlZBTElEJDE7XG4gICAgcmV0dXJuIGAke3RoaXMucy50b0Zvcm1hdChkYXRlRm9ybWF0KX0ke3NlcGFyYXRvcn0ke3RoaXMuZS50b0Zvcm1hdChcbiAgICAgIGRhdGVGb3JtYXQsXG4gICAgKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIER1cmF0aW9uIHJlcHJlc2VudGluZyB0aGUgdGltZSBzcGFubmVkIGJ5IHRoaXMgaW50ZXJ2YWwuXG4gICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBbdW5pdD1bJ21pbGxpc2Vjb25kcyddXSAtIHRoZSB1bml0IG9yIHVuaXRzIChzdWNoIGFzICdob3Vycycgb3IgJ2RheXMnKSB0byBpbmNsdWRlIGluIHRoZSBkdXJhdGlvbi5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zIHRoYXQgYWZmZWN0IHRoZSBjcmVhdGlvbiBvZiB0aGUgRHVyYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmNvbnZlcnNpb25BY2N1cmFjeT0nY2FzdWFsJ10gLSB0aGUgY29udmVyc2lvbiBzeXN0ZW0gdG8gdXNlXG4gICAqIEBleGFtcGxlIEludGVydmFsLmZyb21EYXRlVGltZXMoZHQxLCBkdDIpLnRvRHVyYXRpb24oKS50b09iamVjdCgpIC8vPT4geyBtaWxsaXNlY29uZHM6IDg4NDg5MjU3IH1cbiAgICogQGV4YW1wbGUgSW50ZXJ2YWwuZnJvbURhdGVUaW1lcyhkdDEsIGR0MikudG9EdXJhdGlvbignZGF5cycpLnRvT2JqZWN0KCkgLy89PiB7IGRheXM6IDEuMDI0MTgxMjE1Mjc3Nzc3OCB9XG4gICAqIEBleGFtcGxlIEludGVydmFsLmZyb21EYXRlVGltZXMoZHQxLCBkdDIpLnRvRHVyYXRpb24oWydob3VycycsICdtaW51dGVzJ10pLnRvT2JqZWN0KCkgLy89PiB7IGhvdXJzOiAyNCwgbWludXRlczogMzQuODIwOTUgfVxuICAgKiBAZXhhbXBsZSBJbnRlcnZhbC5mcm9tRGF0ZVRpbWVzKGR0MSwgZHQyKS50b0R1cmF0aW9uKFsnaG91cnMnLCAnbWludXRlcycsICdzZWNvbmRzJ10pLnRvT2JqZWN0KCkgLy89PiB7IGhvdXJzOiAyNCwgbWludXRlczogMzQsIHNlY29uZHM6IDQ5LjI1NyB9XG4gICAqIEBleGFtcGxlIEludGVydmFsLmZyb21EYXRlVGltZXMoZHQxLCBkdDIpLnRvRHVyYXRpb24oJ3NlY29uZHMnKS50b09iamVjdCgpIC8vPT4geyBzZWNvbmRzOiA4ODQ4OS4yNTcgfVxuICAgKiBAcmV0dXJuIHtEdXJhdGlvbn1cbiAgICovXG5cbiAgdG9EdXJhdGlvbih1bml0LCBvcHRzKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcbiAgICAgIHJldHVybiBEdXJhdGlvbi5pbnZhbGlkKHRoaXMuaW52YWxpZFJlYXNvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZS5kaWZmKHRoaXMucywgdW5pdCwgb3B0cyk7XG4gIH1cblxuICAvKipcbiAgICogUnVuIG1hcEZuIG9uIHRoZSBpbnRlcnZhbCBzdGFydCBhbmQgZW5kLCByZXR1cm5pbmcgYSBuZXcgSW50ZXJ2YWwgZnJvbSB0aGUgcmVzdWx0aW5nIERhdGVUaW1lc1xuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtYXBGblxuICAgKiBAcmV0dXJuIHtJbnRlcnZhbH1cbiAgICogQGV4YW1wbGUgSW50ZXJ2YWwuZnJvbURhdGVUaW1lcyhkdDEsIGR0MikubWFwRW5kcG9pbnRzKGVuZHBvaW50ID0+IGVuZHBvaW50LnRvVVRDKCkpXG4gICAqIEBleGFtcGxlIEludGVydmFsLmZyb21EYXRlVGltZXMoZHQxLCBkdDIpLm1hcEVuZHBvaW50cyhlbmRwb2ludCA9PiBlbmRwb2ludC5wbHVzKHsgaG91cnM6IDIgfSkpXG4gICAqL1xuXG4gIG1hcEVuZHBvaW50cyhtYXBGbikge1xuICAgIHJldHVybiBJbnRlcnZhbC5mcm9tRGF0ZVRpbWVzKG1hcEZuKHRoaXMucyksIG1hcEZuKHRoaXMuZSkpO1xuICB9XG59XG5cbi8qKlxuICogVGhlIEluZm8gY2xhc3MgY29udGFpbnMgc3RhdGljIG1ldGhvZHMgZm9yIHJldHJpZXZpbmcgZ2VuZXJhbCB0aW1lIGFuZCBkYXRlIHJlbGF0ZWQgZGF0YS4gRm9yIGV4YW1wbGUsIGl0IGhhcyBtZXRob2RzIGZvciBmaW5kaW5nIG91dCBpZiBhIHRpbWUgem9uZSBoYXMgYSBEU1QsIGZvciBsaXN0aW5nIHRoZSBtb250aHMgaW4gYW55IHN1cHBvcnRlZCBsb2NhbGUsIGFuZCBmb3IgZGlzY292ZXJpbmcgd2hpY2ggb2YgTHV4b24gZmVhdHVyZXMgYXJlIGF2YWlsYWJsZSBpbiB0aGUgY3VycmVudCBlbnZpcm9ubWVudC5cbiAqL1xuXG5jbGFzcyBJbmZvIHtcbiAgLyoqXG4gICAqIFJldHVybiB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgem9uZSBjb250YWlucyBhIERTVC5cbiAgICogQHBhcmFtIHtzdHJpbmd8Wm9uZX0gW3pvbmU9J2xvY2FsJ10gLSBab25lIHRvIGNoZWNrLiBEZWZhdWx0cyB0byB0aGUgZW52aXJvbm1lbnQncyBsb2NhbCB6b25lLlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIGhhc0RTVCh6b25lID0gU2V0dGluZ3MuZGVmYXVsdFpvbmUpIHtcbiAgICBjb25zdCBwcm90byA9IERhdGVUaW1lLmxvY2FsKCkuc2V0Wm9uZSh6b25lKS5zZXQoe1xuICAgICAgbW9udGg6IDEyLFxuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICAhem9uZS51bml2ZXJzYWwgJiZcbiAgICAgIHByb3RvLm9mZnNldCAhPT1cbiAgICAgICAgcHJvdG8uc2V0KHtcbiAgICAgICAgICBtb250aDogNixcbiAgICAgICAgfSkub2Zmc2V0XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gd2hldGhlciB0aGUgc3BlY2lmaWVkIHpvbmUgaXMgYSB2YWxpZCBJQU5BIHNwZWNpZmllci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHpvbmUgLSBab25lIHRvIGNoZWNrXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuXG4gIHN0YXRpYyBpc1ZhbGlkSUFOQVpvbmUoem9uZSkge1xuICAgIHJldHVybiBJQU5BWm9uZS5pc1ZhbGlkU3BlY2lmaWVyKHpvbmUpICYmIElBTkFab25lLmlzVmFsaWRab25lKHpvbmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHRoZSBpbnB1dCBpbnRvIGEge0BsaW5rIFpvbmV9IGluc3RhbmNlLlxuICAgKlxuICAgKiAqIElmIGBpbnB1dGAgaXMgYWxyZWFkeSBhIFpvbmUgaW5zdGFuY2UsIGl0IGlzIHJldHVybmVkIHVuY2hhbmdlZC5cbiAgICogKiBJZiBgaW5wdXRgIGlzIGEgc3RyaW5nIGNvbnRhaW5pbmcgYSB2YWxpZCB0aW1lIHpvbmUgbmFtZSwgYSBab25lIGluc3RhbmNlXG4gICAqICAgd2l0aCB0aGF0IG5hbWUgaXMgcmV0dXJuZWQuXG4gICAqICogSWYgYGlucHV0YCBpcyBhIHN0cmluZyB0aGF0IGRvZXNuJ3QgcmVmZXIgdG8gYSBrbm93biB0aW1lIHpvbmUsIGEgWm9uZVxuICAgKiAgIGluc3RhbmNlIHdpdGgge0BsaW5rIFpvbmUuaXNWYWxpZH0gPT0gZmFsc2UgaXMgcmV0dXJuZWQuXG4gICAqICogSWYgYGlucHV0IGlzIGEgbnVtYmVyLCBhIFpvbmUgaW5zdGFuY2Ugd2l0aCB0aGUgc3BlY2lmaWVkIGZpeGVkIG9mZnNldFxuICAgKiAgIGluIG1pbnV0ZXMgaXMgcmV0dXJuZWQuXG4gICAqICogSWYgYGlucHV0YCBpcyBgbnVsbGAgb3IgYHVuZGVmaW5lZGAsIHRoZSBkZWZhdWx0IHpvbmUgaXMgcmV0dXJuZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfFpvbmV8bnVtYmVyfSBbaW5wdXRdIC0gdGhlIHZhbHVlIHRvIGJlIGNvbnZlcnRlZFxuICAgKiBAcmV0dXJuIHtab25lfVxuICAgKi9cblxuICBzdGF0aWMgbm9ybWFsaXplWm9uZShpbnB1dCkge1xuICAgIHJldHVybiBub3JtYWxpemVab25lKGlucHV0LCBTZXR0aW5ncy5kZWZhdWx0Wm9uZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFuIGFycmF5IG9mIHN0YW5kYWxvbmUgbW9udGggbmFtZXMuXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRGF0ZVRpbWVGb3JtYXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtsZW5ndGg9J2xvbmcnXSAtIHRoZSBsZW5ndGggb2YgdGhlIG1vbnRoIHJlcHJlc2VudGF0aW9uLCBzdWNoIGFzIFwibnVtZXJpY1wiLCBcIjItZGlnaXRcIiwgXCJuYXJyb3dcIiwgXCJzaG9ydFwiLCBcImxvbmdcIlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnNcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmxvY2FsZV0gLSB0aGUgbG9jYWxlIGNvZGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLm51bWJlcmluZ1N5c3RlbT1udWxsXSAtIHRoZSBudW1iZXJpbmcgc3lzdGVtXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5vdXRwdXRDYWxlbmRhcj0nZ3JlZ29yeSddIC0gdGhlIGNhbGVuZGFyXG4gICAqIEBleGFtcGxlIEluZm8ubW9udGhzKClbMF0gLy89PiAnSmFudWFyeSdcbiAgICogQGV4YW1wbGUgSW5mby5tb250aHMoJ3Nob3J0JylbMF0gLy89PiAnSmFuJ1xuICAgKiBAZXhhbXBsZSBJbmZvLm1vbnRocygnbnVtZXJpYycpWzBdIC8vPT4gJzEnXG4gICAqIEBleGFtcGxlIEluZm8ubW9udGhzKCdzaG9ydCcsIHsgbG9jYWxlOiAnZnItQ0EnIH0gKVswXSAvLz0+ICdqYW52LidcbiAgICogQGV4YW1wbGUgSW5mby5tb250aHMoJ251bWVyaWMnLCB7IGxvY2FsZTogJ2FyJyB9KVswXSAvLz0+ICfZoSdcbiAgICogQGV4YW1wbGUgSW5mby5tb250aHMoJ2xvbmcnLCB7IG91dHB1dENhbGVuZGFyOiAnaXNsYW1pYycgfSlbMF0gLy89PiAnUmFiacq7IEknXG4gICAqIEByZXR1cm4ge1tzdHJpbmddfVxuICAgKi9cblxuICBzdGF0aWMgbW9udGhzKFxuICAgIGxlbmd0aCA9ICdsb25nJyxcbiAgICB7IGxvY2FsZSA9IG51bGwsIG51bWJlcmluZ1N5c3RlbSA9IG51bGwsIG91dHB1dENhbGVuZGFyID0gJ2dyZWdvcnknIH0gPSB7fSxcbiAgKSB7XG4gICAgcmV0dXJuIExvY2FsZS5jcmVhdGUobG9jYWxlLCBudW1iZXJpbmdTeXN0ZW0sIG91dHB1dENhbGVuZGFyKS5tb250aHMoXG4gICAgICBsZW5ndGgsXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYW4gYXJyYXkgb2YgZm9ybWF0IG1vbnRoIG5hbWVzLlxuICAgKiBGb3JtYXQgbW9udGhzIGRpZmZlciBmcm9tIHN0YW5kYWxvbmUgbW9udGhzIGluIHRoYXQgdGhleSdyZSBtZWFudCB0byBhcHBlYXIgbmV4dCB0byB0aGUgZGF5IG9mIHRoZSBtb250aC4gSW4gc29tZSBsYW5ndWFnZXMsIHRoYXRcbiAgICogY2hhbmdlcyB0aGUgc3RyaW5nLlxuICAgKiBTZWUge0BsaW5rIG1vbnRoc31cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtsZW5ndGg9J2xvbmcnXSAtIHRoZSBsZW5ndGggb2YgdGhlIG1vbnRoIHJlcHJlc2VudGF0aW9uLCBzdWNoIGFzIFwibnVtZXJpY1wiLCBcIjItZGlnaXRcIiwgXCJuYXJyb3dcIiwgXCJzaG9ydFwiLCBcImxvbmdcIlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnNcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmxvY2FsZV0gLSB0aGUgbG9jYWxlIGNvZGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLm51bWJlcmluZ1N5c3RlbT1udWxsXSAtIHRoZSBudW1iZXJpbmcgc3lzdGVtXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5vdXRwdXRDYWxlbmRhcj0nZ3JlZ29yeSddIC0gdGhlIGNhbGVuZGFyXG4gICAqIEByZXR1cm4ge1tzdHJpbmddfVxuICAgKi9cblxuICBzdGF0aWMgbW9udGhzRm9ybWF0KFxuICAgIGxlbmd0aCA9ICdsb25nJyxcbiAgICB7IGxvY2FsZSA9IG51bGwsIG51bWJlcmluZ1N5c3RlbSA9IG51bGwsIG91dHB1dENhbGVuZGFyID0gJ2dyZWdvcnknIH0gPSB7fSxcbiAgKSB7XG4gICAgcmV0dXJuIExvY2FsZS5jcmVhdGUobG9jYWxlLCBudW1iZXJpbmdTeXN0ZW0sIG91dHB1dENhbGVuZGFyKS5tb250aHMoXG4gICAgICBsZW5ndGgsXG4gICAgICB0cnVlLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFuIGFycmF5IG9mIHN0YW5kYWxvbmUgd2VlayBuYW1lcy5cbiAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9EYXRlVGltZUZvcm1hdFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2xlbmd0aD0nbG9uZyddIC0gdGhlIGxlbmd0aCBvZiB0aGUgbW9udGggcmVwcmVzZW50YXRpb24sIHN1Y2ggYXMgXCJuYXJyb3dcIiwgXCJzaG9ydFwiLCBcImxvbmdcIi5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5sb2NhbGVdIC0gdGhlIGxvY2FsZSBjb2RlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5udW1iZXJpbmdTeXN0ZW09bnVsbF0gLSB0aGUgbnVtYmVyaW5nIHN5c3RlbVxuICAgKiBAZXhhbXBsZSBJbmZvLndlZWtkYXlzKClbMF0gLy89PiAnTW9uZGF5J1xuICAgKiBAZXhhbXBsZSBJbmZvLndlZWtkYXlzKCdzaG9ydCcpWzBdIC8vPT4gJ01vbidcbiAgICogQGV4YW1wbGUgSW5mby53ZWVrZGF5cygnc2hvcnQnLCB7IGxvY2FsZTogJ2ZyLUNBJyB9KVswXSAvLz0+ICdsdW4uJ1xuICAgKiBAZXhhbXBsZSBJbmZvLndlZWtkYXlzKCdzaG9ydCcsIHsgbG9jYWxlOiAnYXInIH0pWzBdIC8vPT4gJ9in2YTYp9ir2YbZitmGJ1xuICAgKiBAcmV0dXJuIHtbc3RyaW5nXX1cbiAgICovXG5cbiAgc3RhdGljIHdlZWtkYXlzKFxuICAgIGxlbmd0aCA9ICdsb25nJyxcbiAgICB7IGxvY2FsZSA9IG51bGwsIG51bWJlcmluZ1N5c3RlbSA9IG51bGwgfSA9IHt9LFxuICApIHtcbiAgICByZXR1cm4gTG9jYWxlLmNyZWF0ZShsb2NhbGUsIG51bWJlcmluZ1N5c3RlbSwgbnVsbCkud2Vla2RheXMobGVuZ3RoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYW4gYXJyYXkgb2YgZm9ybWF0IHdlZWsgbmFtZXMuXG4gICAqIEZvcm1hdCB3ZWVrZGF5cyBkaWZmZXIgZnJvbSBzdGFuZGFsb25lIHdlZWtkYXlzIGluIHRoYXQgdGhleSdyZSBtZWFudCB0byBhcHBlYXIgbmV4dCB0byBtb3JlIGRhdGUgaW5mb3JtYXRpb24uIEluIHNvbWUgbGFuZ3VhZ2VzLCB0aGF0XG4gICAqIGNoYW5nZXMgdGhlIHN0cmluZy5cbiAgICogU2VlIHtAbGluayB3ZWVrZGF5c31cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtsZW5ndGg9J2xvbmcnXSAtIHRoZSBsZW5ndGggb2YgdGhlIG1vbnRoIHJlcHJlc2VudGF0aW9uLCBzdWNoIGFzIFwibmFycm93XCIsIFwic2hvcnRcIiwgXCJsb25nXCIuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMubG9jYWxlPW51bGxdIC0gdGhlIGxvY2FsZSBjb2RlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5udW1iZXJpbmdTeXN0ZW09bnVsbF0gLSB0aGUgbnVtYmVyaW5nIHN5c3RlbVxuICAgKiBAcmV0dXJuIHtbc3RyaW5nXX1cbiAgICovXG5cbiAgc3RhdGljIHdlZWtkYXlzRm9ybWF0KFxuICAgIGxlbmd0aCA9ICdsb25nJyxcbiAgICB7IGxvY2FsZSA9IG51bGwsIG51bWJlcmluZ1N5c3RlbSA9IG51bGwgfSA9IHt9LFxuICApIHtcbiAgICByZXR1cm4gTG9jYWxlLmNyZWF0ZShsb2NhbGUsIG51bWJlcmluZ1N5c3RlbSwgbnVsbCkud2Vla2RheXMobGVuZ3RoLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYW4gYXJyYXkgb2YgbWVyaWRpZW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnNcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmxvY2FsZV0gLSB0aGUgbG9jYWxlIGNvZGVcbiAgICogQGV4YW1wbGUgSW5mby5tZXJpZGllbXMoKSAvLz0+IFsgJ0FNJywgJ1BNJyBdXG4gICAqIEBleGFtcGxlIEluZm8ubWVyaWRpZW1zKHsgbG9jYWxlOiAnbXknIH0pIC8vPT4gWyAn4YCU4YC24YCU4YCA4YC6JywgJ+GAiuGAlOGAsScgXVxuICAgKiBAcmV0dXJuIHtbc3RyaW5nXX1cbiAgICovXG5cbiAgc3RhdGljIG1lcmlkaWVtcyh7IGxvY2FsZSA9IG51bGwgfSA9IHt9KSB7XG4gICAgcmV0dXJuIExvY2FsZS5jcmVhdGUobG9jYWxlKS5tZXJpZGllbXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYW4gYXJyYXkgb2YgZXJhcywgc3VjaCBhcyBbJ0JDJywgJ0FEJ10uIFRoZSBsb2NhbGUgY2FuIGJlIHNwZWNpZmllZCwgYnV0IHRoZSBjYWxlbmRhciBzeXN0ZW0gaXMgYWx3YXlzIEdyZWdvcmlhbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtsZW5ndGg9J3Nob3J0J10gLSB0aGUgbGVuZ3RoIG9mIHRoZSBlcmEgcmVwcmVzZW50YXRpb24sIHN1Y2ggYXMgXCJzaG9ydFwiIG9yIFwibG9uZ1wiLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnNcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmxvY2FsZV0gLSB0aGUgbG9jYWxlIGNvZGVcbiAgICogQGV4YW1wbGUgSW5mby5lcmFzKCkgLy89PiBbICdCQycsICdBRCcgXVxuICAgKiBAZXhhbXBsZSBJbmZvLmVyYXMoJ2xvbmcnKSAvLz0+IFsgJ0JlZm9yZSBDaHJpc3QnLCAnQW5ubyBEb21pbmknIF1cbiAgICogQGV4YW1wbGUgSW5mby5lcmFzKCdsb25nJywgeyBsb2NhbGU6ICdmcicgfSkgLy89PiBbICdhdmFudCBKw6lzdXMtQ2hyaXN0JywgJ2FwcsOocyBKw6lzdXMtQ2hyaXN0JyBdXG4gICAqIEByZXR1cm4ge1tzdHJpbmddfVxuICAgKi9cblxuICBzdGF0aWMgZXJhcyhsZW5ndGggPSAnc2hvcnQnLCB7IGxvY2FsZSA9IG51bGwgfSA9IHt9KSB7XG4gICAgcmV0dXJuIExvY2FsZS5jcmVhdGUobG9jYWxlLCBudWxsLCAnZ3JlZ29yeScpLmVyYXMobGVuZ3RoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHNldCBvZiBhdmFpbGFibGUgZmVhdHVyZXMgaW4gdGhpcyBlbnZpcm9ubWVudC5cbiAgICogU29tZSBmZWF0dXJlcyBvZiBMdXhvbiBhcmUgbm90IGF2YWlsYWJsZSBpbiBhbGwgZW52aXJvbm1lbnRzLiBGb3IgZXhhbXBsZSwgb24gb2xkZXIgYnJvd3NlcnMsIHRpbWV6b25lIHN1cHBvcnQgaXMgbm90IGF2YWlsYWJsZS4gVXNlIHRoaXMgZnVuY3Rpb24gdG8gZmlndXJlIG91dCBpZiB0aGF0J3MgdGhlIGNhc2UuXG4gICAqIEtleXM6XG4gICAqICogYHpvbmVzYDogd2hldGhlciB0aGlzIGVudmlyb25tZW50IHN1cHBvcnRzIElBTkEgdGltZXpvbmVzXG4gICAqICogYGludGxUb2tlbnNgOiB3aGV0aGVyIHRoaXMgZW52aXJvbm1lbnQgc3VwcG9ydHMgaW50ZXJuYXRpb25hbGl6ZWQgdG9rZW4tYmFzZWQgZm9ybWF0dGluZy9wYXJzaW5nXG4gICAqICogYGludGxgOiB3aGV0aGVyIHRoaXMgZW52aXJvbm1lbnQgc3VwcG9ydHMgZ2VuZXJhbCBpbnRlcm5hdGlvbmFsaXphdGlvblxuICAgKiAqIGByZWxhdGl2ZWA6IHdoZXRoZXIgdGhpcyBlbnZpcm9ubWVudCBzdXBwb3J0cyByZWxhdGl2ZSB0aW1lIGZvcm1hdHRpbmdcbiAgICogQGV4YW1wbGUgSW5mby5mZWF0dXJlcygpIC8vPT4geyBpbnRsOiB0cnVlLCBpbnRsVG9rZW5zOiBmYWxzZSwgem9uZXM6IHRydWUsIHJlbGF0aXZlOiBmYWxzZSB9XG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG5cbiAgc3RhdGljIGZlYXR1cmVzKCkge1xuICAgIGxldCBpbnRsID0gZmFsc2UsXG4gICAgICBpbnRsVG9rZW5zID0gZmFsc2UsXG4gICAgICB6b25lcyA9IGZhbHNlLFxuICAgICAgcmVsYXRpdmUgPSBmYWxzZTtcblxuICAgIGlmIChoYXNJbnRsKCkpIHtcbiAgICAgIGludGwgPSB0cnVlO1xuICAgICAgaW50bFRva2VucyA9IGhhc0Zvcm1hdFRvUGFydHMoKTtcbiAgICAgIHJlbGF0aXZlID0gaGFzUmVsYXRpdmUoKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgem9uZXMgPVxuICAgICAgICAgIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCdlbicsIHtcbiAgICAgICAgICAgIHRpbWVab25lOiAnQW1lcmljYS9OZXdfWW9yaycsXG4gICAgICAgICAgfSkucmVzb2x2ZWRPcHRpb25zKCkudGltZVpvbmUgPT09ICdBbWVyaWNhL05ld19Zb3JrJztcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgem9uZXMgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgaW50bCxcbiAgICAgIGludGxUb2tlbnMsXG4gICAgICB6b25lcyxcbiAgICAgIHJlbGF0aXZlLFxuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gZGF5RGlmZihlYXJsaWVyLCBsYXRlcikge1xuICBjb25zdCB1dGNEYXlTdGFydCA9IGR0ID0+XG4gICAgICBkdFxuICAgICAgICAudG9VVEMoMCwge1xuICAgICAgICAgIGtlZXBMb2NhbFRpbWU6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICAgIC5zdGFydE9mKCdkYXknKVxuICAgICAgICAudmFsdWVPZigpLFxuICAgIG1zID0gdXRjRGF5U3RhcnQobGF0ZXIpIC0gdXRjRGF5U3RhcnQoZWFybGllcik7XG5cbiAgcmV0dXJuIE1hdGguZmxvb3IoRHVyYXRpb24uZnJvbU1pbGxpcyhtcykuYXMoJ2RheXMnKSk7XG59XG5cbmZ1bmN0aW9uIGhpZ2hPcmRlckRpZmZzKGN1cnNvciwgbGF0ZXIsIHVuaXRzKSB7XG4gIGNvbnN0IGRpZmZlcnMgPSBbXG4gICAgWyd5ZWFycycsIChhLCBiKSA9PiBiLnllYXIgLSBhLnllYXJdLFxuICAgIFsnbW9udGhzJywgKGEsIGIpID0+IGIubW9udGggLSBhLm1vbnRoICsgKGIueWVhciAtIGEueWVhcikgKiAxMl0sXG4gICAgW1xuICAgICAgJ3dlZWtzJyxcbiAgICAgIChhLCBiKSA9PiB7XG4gICAgICAgIGNvbnN0IGRheXMgPSBkYXlEaWZmKGEsIGIpO1xuICAgICAgICByZXR1cm4gKGRheXMgLSAoZGF5cyAlIDcpKSAvIDc7XG4gICAgICB9LFxuICAgIF0sXG4gICAgWydkYXlzJywgZGF5RGlmZl0sXG4gIF07XG4gIGNvbnN0IHJlc3VsdHMgPSB7fTtcbiAgbGV0IGxvd2VzdE9yZGVyLCBoaWdoV2F0ZXI7XG5cbiAgZm9yIChjb25zdCBbdW5pdCwgZGlmZmVyXSBvZiBkaWZmZXJzKSB7XG4gICAgaWYgKHVuaXRzLmluZGV4T2YodW5pdCkgPj0gMCkge1xuICAgICAgbG93ZXN0T3JkZXIgPSB1bml0O1xuICAgICAgbGV0IGRlbHRhID0gZGlmZmVyKGN1cnNvciwgbGF0ZXIpO1xuICAgICAgaGlnaFdhdGVyID0gY3Vyc29yLnBsdXMoe1xuICAgICAgICBbdW5pdF06IGRlbHRhLFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChoaWdoV2F0ZXIgPiBsYXRlcikge1xuICAgICAgICBjdXJzb3IgPSBjdXJzb3IucGx1cyh7XG4gICAgICAgICAgW3VuaXRdOiBkZWx0YSAtIDEsXG4gICAgICAgIH0pO1xuICAgICAgICBkZWx0YSAtPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3Vyc29yID0gaGlnaFdhdGVyO1xuICAgICAgfVxuXG4gICAgICByZXN1bHRzW3VuaXRdID0gZGVsdGE7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFtjdXJzb3IsIHJlc3VsdHMsIGhpZ2hXYXRlciwgbG93ZXN0T3JkZXJdO1xufVxuXG5mdW5jdGlvbiBkaWZmKGVhcmxpZXIsIGxhdGVyLCB1bml0cywgb3B0cykge1xuICBsZXQgW2N1cnNvciwgcmVzdWx0cywgaGlnaFdhdGVyLCBsb3dlc3RPcmRlcl0gPSBoaWdoT3JkZXJEaWZmcyhcbiAgICBlYXJsaWVyLFxuICAgIGxhdGVyLFxuICAgIHVuaXRzLFxuICApO1xuICBjb25zdCByZW1haW5pbmdNaWxsaXMgPSBsYXRlciAtIGN1cnNvcjtcbiAgY29uc3QgbG93ZXJPcmRlclVuaXRzID0gdW5pdHMuZmlsdGVyKFxuICAgIHUgPT4gWydob3VycycsICdtaW51dGVzJywgJ3NlY29uZHMnLCAnbWlsbGlzZWNvbmRzJ10uaW5kZXhPZih1KSA+PSAwLFxuICApO1xuXG4gIGlmIChsb3dlck9yZGVyVW5pdHMubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKGhpZ2hXYXRlciA8IGxhdGVyKSB7XG4gICAgICBoaWdoV2F0ZXIgPSBjdXJzb3IucGx1cyh7XG4gICAgICAgIFtsb3dlc3RPcmRlcl06IDEsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoaGlnaFdhdGVyICE9PSBjdXJzb3IpIHtcbiAgICAgIHJlc3VsdHNbbG93ZXN0T3JkZXJdID1cbiAgICAgICAgKHJlc3VsdHNbbG93ZXN0T3JkZXJdIHx8IDApICsgcmVtYWluaW5nTWlsbGlzIC8gKGhpZ2hXYXRlciAtIGN1cnNvcik7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZHVyYXRpb24gPSBEdXJhdGlvbi5mcm9tT2JqZWN0KE9iamVjdC5hc3NpZ24ocmVzdWx0cywgb3B0cykpO1xuXG4gIGlmIChsb3dlck9yZGVyVW5pdHMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBEdXJhdGlvbi5mcm9tTWlsbGlzKHJlbWFpbmluZ01pbGxpcywgb3B0cylcbiAgICAgIC5zaGlmdFRvKC4uLmxvd2VyT3JkZXJVbml0cylcbiAgICAgIC5wbHVzKGR1cmF0aW9uKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZHVyYXRpb247XG4gIH1cbn1cblxuY29uc3QgbnVtYmVyaW5nU3lzdGVtcyA9IHtcbiAgYXJhYjogJ1tcXHUwNjYwLVxcdTA2NjldJyxcbiAgYXJhYmV4dDogJ1tcXHUwNkYwLVxcdTA2RjldJyxcbiAgYmFsaTogJ1tcXHUxQjUwLVxcdTFCNTldJyxcbiAgYmVuZzogJ1tcXHUwOUU2LVxcdTA5RUZdJyxcbiAgZGV2YTogJ1tcXHUwOTY2LVxcdTA5NkZdJyxcbiAgZnVsbHdpZGU6ICdbXFx1RkYxMC1cXHVGRjE5XScsXG4gIGd1anI6ICdbXFx1MEFFNi1cXHUwQUVGXScsXG4gIGhhbmlkZWM6ICdb44CHfOS4gHzkuox85LiJfOWbm3zkupR85YWtfOS4g3zlhat85LmdXScsXG4gIGtobXI6ICdbXFx1MTdFMC1cXHUxN0U5XScsXG4gIGtuZGE6ICdbXFx1MENFNi1cXHUwQ0VGXScsXG4gIGxhb286ICdbXFx1MEVEMC1cXHUwRUQ5XScsXG4gIGxpbWI6ICdbXFx1MTk0Ni1cXHUxOTRGXScsXG4gIG1seW06ICdbXFx1MEQ2Ni1cXHUwRDZGXScsXG4gIG1vbmc6ICdbXFx1MTgxMC1cXHUxODE5XScsXG4gIG15bXI6ICdbXFx1MTA0MC1cXHUxMDQ5XScsXG4gIG9yeWE6ICdbXFx1MEI2Ni1cXHUwQjZGXScsXG4gIHRhbWxkZWM6ICdbXFx1MEJFNi1cXHUwQkVGXScsXG4gIHRlbHU6ICdbXFx1MEM2Ni1cXHUwQzZGXScsXG4gIHRoYWk6ICdbXFx1MEU1MC1cXHUwRTU5XScsXG4gIHRpYnQ6ICdbXFx1MEYyMC1cXHUwRjI5XScsXG4gIGxhdG46ICdcXFxcZCcsXG59O1xuY29uc3QgbnVtYmVyaW5nU3lzdGVtc1VURjE2ID0ge1xuICBhcmFiOiBbMTYzMiwgMTY0MV0sXG4gIGFyYWJleHQ6IFsxNzc2LCAxNzg1XSxcbiAgYmFsaTogWzY5OTIsIDcwMDFdLFxuICBiZW5nOiBbMjUzNCwgMjU0M10sXG4gIGRldmE6IFsyNDA2LCAyNDE1XSxcbiAgZnVsbHdpZGU6IFs2NTI5NiwgNjUzMDNdLFxuICBndWpyOiBbMjc5MCwgMjc5OV0sXG4gIGtobXI6IFs2MTEyLCA2MTIxXSxcbiAga25kYTogWzMzMDIsIDMzMTFdLFxuICBsYW9vOiBbMzc5MiwgMzgwMV0sXG4gIGxpbWI6IFs2NDcwLCA2NDc5XSxcbiAgbWx5bTogWzM0MzAsIDM0MzldLFxuICBtb25nOiBbNjE2MCwgNjE2OV0sXG4gIG15bXI6IFs0MTYwLCA0MTY5XSxcbiAgb3J5YTogWzI5MTgsIDI5MjddLFxuICB0YW1sZGVjOiBbMzA0NiwgMzA1NV0sXG4gIHRlbHU6IFszMTc0LCAzMTgzXSxcbiAgdGhhaTogWzM2NjQsIDM2NzNdLFxuICB0aWJ0OiBbMzg3MiwgMzg4MV0sXG59OyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcblxuY29uc3QgaGFuaWRlY0NoYXJzID0gbnVtYmVyaW5nU3lzdGVtcy5oYW5pZGVjLnJlcGxhY2UoL1tcXFt8XFxdXS9nLCAnJykuc3BsaXQoJycpO1xuXG5mdW5jdGlvbiBwYXJzZURpZ2l0cyhzdHIpIHtcbiAgbGV0IHZhbHVlID0gcGFyc2VJbnQoc3RyLCAxMCk7XG5cbiAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgIHZhbHVlID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY29kZSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuXG4gICAgICBpZiAoc3RyW2ldLnNlYXJjaChudW1iZXJpbmdTeXN0ZW1zLmhhbmlkZWMpICE9PSAtMSkge1xuICAgICAgICB2YWx1ZSArPSBoYW5pZGVjQ2hhcnMuaW5kZXhPZihzdHJbaV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbnVtYmVyaW5nU3lzdGVtc1VURjE2KSB7XG4gICAgICAgICAgY29uc3QgW21pbiwgbWF4XSA9IG51bWJlcmluZ1N5c3RlbXNVVEYxNltrZXldO1xuXG4gICAgICAgICAgaWYgKGNvZGUgPj0gbWluICYmIGNvZGUgPD0gbWF4KSB7XG4gICAgICAgICAgICB2YWx1ZSArPSBjb2RlIC0gbWluO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwYXJzZUludCh2YWx1ZSwgMTApO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkaWdpdFJlZ2V4KHsgbnVtYmVyaW5nU3lzdGVtIH0sIGFwcGVuZCA9ICcnKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKGAke251bWJlcmluZ1N5c3RlbXNbbnVtYmVyaW5nU3lzdGVtIHx8ICdsYXRuJ119JHthcHBlbmR9YCk7XG59XG5cbmNvbnN0IE1JU1NJTkdfRlRQID0gJ21pc3NpbmcgSW50bC5EYXRlVGltZUZvcm1hdC5mb3JtYXRUb1BhcnRzIHN1cHBvcnQnO1xuXG5mdW5jdGlvbiBpbnRVbml0KHJlZ2V4LCBwb3N0ID0gaSA9PiBpKSB7XG4gIHJldHVybiB7XG4gICAgcmVnZXgsXG4gICAgZGVzZXI6IChbc10pID0+IHBvc3QocGFyc2VEaWdpdHMocykpLFxuICB9O1xufVxuXG5mdW5jdGlvbiBmaXhMaXN0UmVnZXgocykge1xuICAvLyBtYWtlIGRvdHMgb3B0aW9uYWwgYW5kIGFsc28gbWFrZSB0aGVtIGxpdGVyYWxcbiAgcmV0dXJuIHMucmVwbGFjZSgvXFwuLywgJ1xcXFwuPycpO1xufVxuXG5mdW5jdGlvbiBzdHJpcEluc2Vuc2l0aXZpdGllcyhzKSB7XG4gIHJldHVybiBzLnJlcGxhY2UoL1xcLi8sICcnKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBvbmVPZihzdHJpbmdzLCBzdGFydEluZGV4KSB7XG4gIGlmIChzdHJpbmdzID09PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlZ2V4OiBSZWdFeHAoc3RyaW5ncy5tYXAoZml4TGlzdFJlZ2V4KS5qb2luKCd8JykpLFxuICAgICAgZGVzZXI6IChbc10pID0+XG4gICAgICAgIHN0cmluZ3MuZmluZEluZGV4KFxuICAgICAgICAgIGkgPT4gc3RyaXBJbnNlbnNpdGl2aXRpZXMocykgPT09IHN0cmlwSW5zZW5zaXRpdml0aWVzKGkpLFxuICAgICAgICApICsgc3RhcnRJbmRleCxcbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIG9mZnNldChyZWdleCwgZ3JvdXBzKSB7XG4gIHJldHVybiB7XG4gICAgcmVnZXgsXG4gICAgZGVzZXI6IChbLCBoLCBtXSkgPT4gc2lnbmVkT2Zmc2V0KGgsIG0pLFxuICAgIGdyb3VwcyxcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2ltcGxlKHJlZ2V4KSB7XG4gIHJldHVybiB7XG4gICAgcmVnZXgsXG4gICAgZGVzZXI6IChbc10pID0+IHMsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGVzY2FwZVRva2VuKHZhbHVlKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICByZXR1cm4gdmFsdWUucmVwbGFjZSgvW1xcLVxcW1xcXXt9KCkqKz8uLFxcXFxcXF4kfCNcXHNdL2csICdcXFxcJCYnKTtcbn1cblxuZnVuY3Rpb24gdW5pdEZvclRva2VuKHRva2VuLCBsb2MpIHtcbiAgY29uc3Qgb25lID0gZGlnaXRSZWdleChsb2MpLFxuICAgIHR3byA9IGRpZ2l0UmVnZXgobG9jLCAnezJ9JyksXG4gICAgdGhyZWUgPSBkaWdpdFJlZ2V4KGxvYywgJ3szfScpLFxuICAgIGZvdXIgPSBkaWdpdFJlZ2V4KGxvYywgJ3s0fScpLFxuICAgIHNpeCA9IGRpZ2l0UmVnZXgobG9jLCAnezZ9JyksXG4gICAgb25lT3JUd28gPSBkaWdpdFJlZ2V4KGxvYywgJ3sxLDJ9JyksXG4gICAgb25lVG9UaHJlZSA9IGRpZ2l0UmVnZXgobG9jLCAnezEsM30nKSxcbiAgICBvbmVUb1NpeCA9IGRpZ2l0UmVnZXgobG9jLCAnezEsNn0nKSxcbiAgICBvbmVUb05pbmUgPSBkaWdpdFJlZ2V4KGxvYywgJ3sxLDl9JyksXG4gICAgdHdvVG9Gb3VyID0gZGlnaXRSZWdleChsb2MsICd7Miw0fScpLFxuICAgIGZvdXJUb1NpeCA9IGRpZ2l0UmVnZXgobG9jLCAnezQsNn0nKSxcbiAgICBsaXRlcmFsID0gdCA9PiAoe1xuICAgICAgcmVnZXg6IFJlZ0V4cChlc2NhcGVUb2tlbih0LnZhbCkpLFxuICAgICAgZGVzZXI6IChbc10pID0+IHMsXG4gICAgICBsaXRlcmFsOiB0cnVlLFxuICAgIH0pLFxuICAgIHVuaXRhdGUgPSB0ID0+IHtcbiAgICAgIGlmICh0b2tlbi5saXRlcmFsKSB7XG4gICAgICAgIHJldHVybiBsaXRlcmFsKHQpO1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKHQudmFsKSB7XG4gICAgICAgIC8vIGVyYVxuICAgICAgICBjYXNlICdHJzpcbiAgICAgICAgICByZXR1cm4gb25lT2YobG9jLmVyYXMoJ3Nob3J0JywgZmFsc2UpLCAwKTtcblxuICAgICAgICBjYXNlICdHRyc6XG4gICAgICAgICAgcmV0dXJuIG9uZU9mKGxvYy5lcmFzKCdsb25nJywgZmFsc2UpLCAwKTtcbiAgICAgICAgLy8geWVhcnNcblxuICAgICAgICBjYXNlICd5JzpcbiAgICAgICAgICByZXR1cm4gaW50VW5pdChvbmVUb1NpeCk7XG5cbiAgICAgICAgY2FzZSAneXknOlxuICAgICAgICAgIHJldHVybiBpbnRVbml0KHR3b1RvRm91ciwgdW50cnVuY2F0ZVllYXIpO1xuXG4gICAgICAgIGNhc2UgJ3l5eXknOlxuICAgICAgICAgIHJldHVybiBpbnRVbml0KGZvdXIpO1xuXG4gICAgICAgIGNhc2UgJ3l5eXl5JzpcbiAgICAgICAgICByZXR1cm4gaW50VW5pdChmb3VyVG9TaXgpO1xuXG4gICAgICAgIGNhc2UgJ3l5eXl5eSc6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQoc2l4KTtcbiAgICAgICAgLy8gbW9udGhzXG5cbiAgICAgICAgY2FzZSAnTSc6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQob25lT3JUd28pO1xuXG4gICAgICAgIGNhc2UgJ01NJzpcbiAgICAgICAgICByZXR1cm4gaW50VW5pdCh0d28pO1xuXG4gICAgICAgIGNhc2UgJ01NTSc6XG4gICAgICAgICAgcmV0dXJuIG9uZU9mKGxvYy5tb250aHMoJ3Nob3J0JywgdHJ1ZSwgZmFsc2UpLCAxKTtcblxuICAgICAgICBjYXNlICdNTU1NJzpcbiAgICAgICAgICByZXR1cm4gb25lT2YobG9jLm1vbnRocygnbG9uZycsIHRydWUsIGZhbHNlKSwgMSk7XG5cbiAgICAgICAgY2FzZSAnTCc6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQob25lT3JUd28pO1xuXG4gICAgICAgIGNhc2UgJ0xMJzpcbiAgICAgICAgICByZXR1cm4gaW50VW5pdCh0d28pO1xuXG4gICAgICAgIGNhc2UgJ0xMTCc6XG4gICAgICAgICAgcmV0dXJuIG9uZU9mKGxvYy5tb250aHMoJ3Nob3J0JywgZmFsc2UsIGZhbHNlKSwgMSk7XG5cbiAgICAgICAgY2FzZSAnTExMTCc6XG4gICAgICAgICAgcmV0dXJuIG9uZU9mKGxvYy5tb250aHMoJ2xvbmcnLCBmYWxzZSwgZmFsc2UpLCAxKTtcbiAgICAgICAgLy8gZGF0ZXNcblxuICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICByZXR1cm4gaW50VW5pdChvbmVPclR3byk7XG5cbiAgICAgICAgY2FzZSAnZGQnOlxuICAgICAgICAgIHJldHVybiBpbnRVbml0KHR3byk7XG4gICAgICAgIC8vIG9yZGluYWxzXG5cbiAgICAgICAgY2FzZSAnbyc6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQob25lVG9UaHJlZSk7XG5cbiAgICAgICAgY2FzZSAnb29vJzpcbiAgICAgICAgICByZXR1cm4gaW50VW5pdCh0aHJlZSk7XG4gICAgICAgIC8vIHRpbWVcblxuICAgICAgICBjYXNlICdISCc6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQodHdvKTtcblxuICAgICAgICBjYXNlICdIJzpcbiAgICAgICAgICByZXR1cm4gaW50VW5pdChvbmVPclR3byk7XG5cbiAgICAgICAgY2FzZSAnaGgnOlxuICAgICAgICAgIHJldHVybiBpbnRVbml0KHR3byk7XG5cbiAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQob25lT3JUd28pO1xuXG4gICAgICAgIGNhc2UgJ21tJzpcbiAgICAgICAgICByZXR1cm4gaW50VW5pdCh0d28pO1xuXG4gICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgIHJldHVybiBpbnRVbml0KG9uZU9yVHdvKTtcblxuICAgICAgICBjYXNlICdxJzpcbiAgICAgICAgICByZXR1cm4gaW50VW5pdChvbmVPclR3byk7XG5cbiAgICAgICAgY2FzZSAncXEnOlxuICAgICAgICAgIHJldHVybiBpbnRVbml0KHR3byk7XG5cbiAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQob25lT3JUd28pO1xuXG4gICAgICAgIGNhc2UgJ3NzJzpcbiAgICAgICAgICByZXR1cm4gaW50VW5pdCh0d28pO1xuXG4gICAgICAgIGNhc2UgJ1MnOlxuICAgICAgICAgIHJldHVybiBpbnRVbml0KG9uZVRvVGhyZWUpO1xuXG4gICAgICAgIGNhc2UgJ1NTUyc6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQodGhyZWUpO1xuXG4gICAgICAgIGNhc2UgJ3UnOlxuICAgICAgICAgIHJldHVybiBzaW1wbGUob25lVG9OaW5lKTtcbiAgICAgICAgLy8gbWVyaWRpZW1cblxuICAgICAgICBjYXNlICdhJzpcbiAgICAgICAgICByZXR1cm4gb25lT2YobG9jLm1lcmlkaWVtcygpLCAwKTtcbiAgICAgICAgLy8gd2Vla1llYXIgKGspXG5cbiAgICAgICAgY2FzZSAna2trayc6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQoZm91cik7XG5cbiAgICAgICAgY2FzZSAna2snOlxuICAgICAgICAgIHJldHVybiBpbnRVbml0KHR3b1RvRm91ciwgdW50cnVuY2F0ZVllYXIpO1xuICAgICAgICAvLyB3ZWVrTnVtYmVyIChXKVxuXG4gICAgICAgIGNhc2UgJ1cnOlxuICAgICAgICAgIHJldHVybiBpbnRVbml0KG9uZU9yVHdvKTtcblxuICAgICAgICBjYXNlICdXVyc6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQodHdvKTtcbiAgICAgICAgLy8gd2Vla2RheXNcblxuICAgICAgICBjYXNlICdFJzpcbiAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQob25lKTtcblxuICAgICAgICBjYXNlICdFRUUnOlxuICAgICAgICAgIHJldHVybiBvbmVPZihsb2Mud2Vla2RheXMoJ3Nob3J0JywgZmFsc2UsIGZhbHNlKSwgMSk7XG5cbiAgICAgICAgY2FzZSAnRUVFRSc6XG4gICAgICAgICAgcmV0dXJuIG9uZU9mKGxvYy53ZWVrZGF5cygnbG9uZycsIGZhbHNlLCBmYWxzZSksIDEpO1xuXG4gICAgICAgIGNhc2UgJ2NjYyc6XG4gICAgICAgICAgcmV0dXJuIG9uZU9mKGxvYy53ZWVrZGF5cygnc2hvcnQnLCB0cnVlLCBmYWxzZSksIDEpO1xuXG4gICAgICAgIGNhc2UgJ2NjY2MnOlxuICAgICAgICAgIHJldHVybiBvbmVPZihsb2Mud2Vla2RheXMoJ2xvbmcnLCB0cnVlLCBmYWxzZSksIDEpO1xuICAgICAgICAvLyBvZmZzZXQvem9uZVxuXG4gICAgICAgIGNhc2UgJ1onOlxuICAgICAgICBjYXNlICdaWic6XG4gICAgICAgICAgcmV0dXJuIG9mZnNldChcbiAgICAgICAgICAgIG5ldyBSZWdFeHAoYChbKy1dJHtvbmVPclR3by5zb3VyY2V9KSg/OjooJHt0d28uc291cmNlfSkpP2ApLFxuICAgICAgICAgICAgMixcbiAgICAgICAgICApO1xuXG4gICAgICAgIGNhc2UgJ1paWic6XG4gICAgICAgICAgcmV0dXJuIG9mZnNldChcbiAgICAgICAgICAgIG5ldyBSZWdFeHAoYChbKy1dJHtvbmVPclR3by5zb3VyY2V9KSgke3R3by5zb3VyY2V9KT9gKSxcbiAgICAgICAgICAgIDIsXG4gICAgICAgICAgKTtcbiAgICAgICAgLy8gd2UgZG9uJ3Qgc3VwcG9ydCBaWlpaIChQU1QpIG9yIFpaWlpaIChQYWNpZmljIFN0YW5kYXJkIFRpbWUpIGluIHBhcnNpbmdcbiAgICAgICAgLy8gYmVjYXVzZSB3ZSBkb24ndCBoYXZlIGFueSB3YXkgdG8gZmlndXJlIG91dCB3aGF0IHRoZXkgYXJlXG5cbiAgICAgICAgY2FzZSAneic6XG4gICAgICAgICAgcmV0dXJuIHNpbXBsZSgvW2Etel8rLS9dezEsMjU2fT8vaSk7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gbGl0ZXJhbCh0KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gIGNvbnN0IHVuaXQgPSB1bml0YXRlKHRva2VuKSB8fCB7XG4gICAgaW52YWxpZFJlYXNvbjogTUlTU0lOR19GVFAsXG4gIH07XG4gIHVuaXQudG9rZW4gPSB0b2tlbjtcbiAgcmV0dXJuIHVuaXQ7XG59XG5cbmNvbnN0IHBhcnRUeXBlU3R5bGVUb1Rva2VuVmFsID0ge1xuICB5ZWFyOiB7XG4gICAgJzItZGlnaXQnOiAneXknLFxuICAgIG51bWVyaWM6ICd5eXl5eScsXG4gIH0sXG4gIG1vbnRoOiB7XG4gICAgbnVtZXJpYzogJ00nLFxuICAgICcyLWRpZ2l0JzogJ01NJyxcbiAgICBzaG9ydDogJ01NTScsXG4gICAgbG9uZzogJ01NTU0nLFxuICB9LFxuICBkYXk6IHtcbiAgICBudW1lcmljOiAnZCcsXG4gICAgJzItZGlnaXQnOiAnZGQnLFxuICB9LFxuICB3ZWVrZGF5OiB7XG4gICAgc2hvcnQ6ICdFRUUnLFxuICAgIGxvbmc6ICdFRUVFJyxcbiAgfSxcbiAgZGF5cGVyaW9kOiAnYScsXG4gIGRheVBlcmlvZDogJ2EnLFxuICBob3VyOiB7XG4gICAgbnVtZXJpYzogJ2gnLFxuICAgICcyLWRpZ2l0JzogJ2hoJyxcbiAgfSxcbiAgbWludXRlOiB7XG4gICAgbnVtZXJpYzogJ20nLFxuICAgICcyLWRpZ2l0JzogJ21tJyxcbiAgfSxcbiAgc2Vjb25kOiB7XG4gICAgbnVtZXJpYzogJ3MnLFxuICAgICcyLWRpZ2l0JzogJ3NzJyxcbiAgfSxcbn07XG5cbmZ1bmN0aW9uIHRva2VuRm9yUGFydChwYXJ0LCBsb2NhbGUsIGZvcm1hdE9wdHMpIHtcbiAgY29uc3QgeyB0eXBlLCB2YWx1ZSB9ID0gcGFydDtcblxuICBpZiAodHlwZSA9PT0gJ2xpdGVyYWwnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxpdGVyYWw6IHRydWUsXG4gICAgICB2YWw6IHZhbHVlLFxuICAgIH07XG4gIH1cblxuICBjb25zdCBzdHlsZSA9IGZvcm1hdE9wdHNbdHlwZV07XG4gIGxldCB2YWwgPSBwYXJ0VHlwZVN0eWxlVG9Ub2tlblZhbFt0eXBlXTtcblxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICB2YWwgPSB2YWxbc3R5bGVdO1xuICB9XG5cbiAgaWYgKHZhbCkge1xuICAgIHJldHVybiB7XG4gICAgICBsaXRlcmFsOiBmYWxzZSxcbiAgICAgIHZhbCxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gYnVpbGRSZWdleCh1bml0cykge1xuICBjb25zdCByZSA9IHVuaXRzLm1hcCh1ID0+IHUucmVnZXgpLnJlZHVjZSgoZiwgcikgPT4gYCR7Zn0oJHtyLnNvdXJjZX0pYCwgJycpO1xuICByZXR1cm4gW2BeJHtyZX0kYCwgdW5pdHNdO1xufVxuXG5mdW5jdGlvbiBtYXRjaChpbnB1dCwgcmVnZXgsIGhhbmRsZXJzKSB7XG4gIGNvbnN0IG1hdGNoZXMgPSBpbnB1dC5tYXRjaChyZWdleCk7XG5cbiAgaWYgKG1hdGNoZXMpIHtcbiAgICBjb25zdCBhbGwgPSB7fTtcbiAgICBsZXQgbWF0Y2hJbmRleCA9IDE7XG5cbiAgICBmb3IgKGNvbnN0IGkgaW4gaGFuZGxlcnMpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eShoYW5kbGVycywgaSkpIHtcbiAgICAgICAgY29uc3QgaCA9IGhhbmRsZXJzW2ldLFxuICAgICAgICAgIGdyb3VwcyA9IGguZ3JvdXBzID8gaC5ncm91cHMgKyAxIDogMTtcblxuICAgICAgICBpZiAoIWgubGl0ZXJhbCAmJiBoLnRva2VuKSB7XG4gICAgICAgICAgYWxsW2gudG9rZW4udmFsWzBdXSA9IGguZGVzZXIoXG4gICAgICAgICAgICBtYXRjaGVzLnNsaWNlKG1hdGNoSW5kZXgsIG1hdGNoSW5kZXggKyBncm91cHMpLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBtYXRjaEluZGV4ICs9IGdyb3VwcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gW21hdGNoZXMsIGFsbF07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFttYXRjaGVzLCB7fV07XG4gIH1cbn1cblxuZnVuY3Rpb24gZGF0ZVRpbWVGcm9tTWF0Y2hlcyhtYXRjaGVzKSB7XG4gIGNvbnN0IHRvRmllbGQgPSB0b2tlbiA9PiB7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgY2FzZSAnUyc6XG4gICAgICAgIHJldHVybiAnbWlsbGlzZWNvbmQnO1xuXG4gICAgICBjYXNlICdzJzpcbiAgICAgICAgcmV0dXJuICdzZWNvbmQnO1xuXG4gICAgICBjYXNlICdtJzpcbiAgICAgICAgcmV0dXJuICdtaW51dGUnO1xuXG4gICAgICBjYXNlICdoJzpcbiAgICAgIGNhc2UgJ0gnOlxuICAgICAgICByZXR1cm4gJ2hvdXInO1xuXG4gICAgICBjYXNlICdkJzpcbiAgICAgICAgcmV0dXJuICdkYXknO1xuXG4gICAgICBjYXNlICdvJzpcbiAgICAgICAgcmV0dXJuICdvcmRpbmFsJztcblxuICAgICAgY2FzZSAnTCc6XG4gICAgICBjYXNlICdNJzpcbiAgICAgICAgcmV0dXJuICdtb250aCc7XG5cbiAgICAgIGNhc2UgJ3knOlxuICAgICAgICByZXR1cm4gJ3llYXInO1xuXG4gICAgICBjYXNlICdFJzpcbiAgICAgIGNhc2UgJ2MnOlxuICAgICAgICByZXR1cm4gJ3dlZWtkYXknO1xuXG4gICAgICBjYXNlICdXJzpcbiAgICAgICAgcmV0dXJuICd3ZWVrTnVtYmVyJztcblxuICAgICAgY2FzZSAnayc6XG4gICAgICAgIHJldHVybiAnd2Vla1llYXInO1xuXG4gICAgICBjYXNlICdxJzpcbiAgICAgICAgcmV0dXJuICdxdWFydGVyJztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9O1xuXG4gIGxldCB6b25lO1xuXG4gIGlmICghaXNVbmRlZmluZWQobWF0Y2hlcy5aKSkge1xuICAgIHpvbmUgPSBuZXcgRml4ZWRPZmZzZXRab25lKG1hdGNoZXMuWik7XG4gIH0gZWxzZSBpZiAoIWlzVW5kZWZpbmVkKG1hdGNoZXMueikpIHtcbiAgICB6b25lID0gSUFOQVpvbmUuY3JlYXRlKG1hdGNoZXMueik7XG4gIH0gZWxzZSB7XG4gICAgem9uZSA9IG51bGw7XG4gIH1cblxuICBpZiAoIWlzVW5kZWZpbmVkKG1hdGNoZXMucSkpIHtcbiAgICBtYXRjaGVzLk0gPSAobWF0Y2hlcy5xIC0gMSkgKiAzICsgMTtcbiAgfVxuXG4gIGlmICghaXNVbmRlZmluZWQobWF0Y2hlcy5oKSkge1xuICAgIGlmIChtYXRjaGVzLmggPCAxMiAmJiBtYXRjaGVzLmEgPT09IDEpIHtcbiAgICAgIG1hdGNoZXMuaCArPSAxMjtcbiAgICB9IGVsc2UgaWYgKG1hdGNoZXMuaCA9PT0gMTIgJiYgbWF0Y2hlcy5hID09PSAwKSB7XG4gICAgICBtYXRjaGVzLmggPSAwO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtYXRjaGVzLkcgPT09IDAgJiYgbWF0Y2hlcy55KSB7XG4gICAgbWF0Y2hlcy55ID0gLW1hdGNoZXMueTtcbiAgfVxuXG4gIGlmICghaXNVbmRlZmluZWQobWF0Y2hlcy51KSkge1xuICAgIG1hdGNoZXMuUyA9IHBhcnNlTWlsbGlzKG1hdGNoZXMudSk7XG4gIH1cblxuICBjb25zdCB2YWxzID0gT2JqZWN0LmtleXMobWF0Y2hlcykucmVkdWNlKChyLCBrKSA9PiB7XG4gICAgY29uc3QgZiA9IHRvRmllbGQoayk7XG5cbiAgICBpZiAoZikge1xuICAgICAgcltmXSA9IG1hdGNoZXNba107XG4gICAgfVxuXG4gICAgcmV0dXJuIHI7XG4gIH0sIHt9KTtcbiAgcmV0dXJuIFt2YWxzLCB6b25lXTtcbn1cblxubGV0IGR1bW15RGF0ZVRpbWVDYWNoZSA9IG51bGw7XG5cbmZ1bmN0aW9uIGdldER1bW15RGF0ZVRpbWUoKSB7XG4gIGlmICghZHVtbXlEYXRlVGltZUNhY2hlKSB7XG4gICAgZHVtbXlEYXRlVGltZUNhY2hlID0gRGF0ZVRpbWUuZnJvbU1pbGxpcygxNTU1NTU1NTU1NTU1KTtcbiAgfVxuXG4gIHJldHVybiBkdW1teURhdGVUaW1lQ2FjaGU7XG59XG5cbmZ1bmN0aW9uIG1heWJlRXhwYW5kTWFjcm9Ub2tlbih0b2tlbiwgbG9jYWxlKSB7XG4gIGlmICh0b2tlbi5saXRlcmFsKSB7XG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG5cbiAgY29uc3QgZm9ybWF0T3B0cyA9IEZvcm1hdHRlci5tYWNyb1Rva2VuVG9Gb3JtYXRPcHRzKHRva2VuLnZhbCk7XG5cbiAgaWYgKCFmb3JtYXRPcHRzKSB7XG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG5cbiAgY29uc3QgZm9ybWF0dGVyID0gRm9ybWF0dGVyLmNyZWF0ZShsb2NhbGUsIGZvcm1hdE9wdHMpO1xuICBjb25zdCBwYXJ0cyA9IGZvcm1hdHRlci5mb3JtYXREYXRlVGltZVBhcnRzKGdldER1bW15RGF0ZVRpbWUoKSk7XG4gIGNvbnN0IHRva2VucyA9IHBhcnRzLm1hcChwID0+IHRva2VuRm9yUGFydChwLCBsb2NhbGUsIGZvcm1hdE9wdHMpKTtcblxuICBpZiAodG9rZW5zLmluY2x1ZGVzKHVuZGVmaW5lZCkpIHtcbiAgICByZXR1cm4gdG9rZW47XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuXG5mdW5jdGlvbiBleHBhbmRNYWNyb1Rva2Vucyh0b2tlbnMsIGxvY2FsZSkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdChcbiAgICAuLi50b2tlbnMubWFwKHQgPT4gbWF5YmVFeHBhbmRNYWNyb1Rva2VuKHQsIGxvY2FsZSkpLFxuICApO1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZXhwbGFpbkZyb21Ub2tlbnMobG9jYWxlLCBpbnB1dCwgZm9ybWF0KSB7XG4gIGNvbnN0IHRva2VucyA9IGV4cGFuZE1hY3JvVG9rZW5zKEZvcm1hdHRlci5wYXJzZUZvcm1hdChmb3JtYXQpLCBsb2NhbGUpLFxuICAgIHVuaXRzID0gdG9rZW5zLm1hcCh0ID0+IHVuaXRGb3JUb2tlbih0LCBsb2NhbGUpKSxcbiAgICBkaXNxdWFsaWZ5aW5nVW5pdCA9IHVuaXRzLmZpbmQodCA9PiB0LmludmFsaWRSZWFzb24pO1xuXG4gIGlmIChkaXNxdWFsaWZ5aW5nVW5pdCkge1xuICAgIHJldHVybiB7XG4gICAgICBpbnB1dCxcbiAgICAgIHRva2VucyxcbiAgICAgIGludmFsaWRSZWFzb246IGRpc3F1YWxpZnlpbmdVbml0LmludmFsaWRSZWFzb24sXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBbcmVnZXhTdHJpbmcsIGhhbmRsZXJzXSA9IGJ1aWxkUmVnZXgodW5pdHMpLFxuICAgICAgcmVnZXggPSBSZWdFeHAocmVnZXhTdHJpbmcsICdpJyksXG4gICAgICBbcmF3TWF0Y2hlcywgbWF0Y2hlc10gPSBtYXRjaChpbnB1dCwgcmVnZXgsIGhhbmRsZXJzKSxcbiAgICAgIFtyZXN1bHQsIHpvbmVdID0gbWF0Y2hlcyA/IGRhdGVUaW1lRnJvbU1hdGNoZXMobWF0Y2hlcykgOiBbbnVsbCwgbnVsbF07XG5cbiAgICBpZiAoaGFzT3duUHJvcGVydHkobWF0Y2hlcywgJ2EnKSAmJiBoYXNPd25Qcm9wZXJ0eShtYXRjaGVzLCAnSCcpKSB7XG4gICAgICB0aHJvdyBuZXcgQ29uZmxpY3RpbmdTcGVjaWZpY2F0aW9uRXJyb3IoXG4gICAgICAgIFwiQ2FuJ3QgaW5jbHVkZSBtZXJpZGllbSB3aGVuIHNwZWNpZnlpbmcgMjQtaG91ciBmb3JtYXRcIixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlucHV0LFxuICAgICAgdG9rZW5zLFxuICAgICAgcmVnZXgsXG4gICAgICByYXdNYXRjaGVzLFxuICAgICAgbWF0Y2hlcyxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHpvbmUsXG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZUZyb21Ub2tlbnMobG9jYWxlLCBpbnB1dCwgZm9ybWF0KSB7XG4gIGNvbnN0IHsgcmVzdWx0LCB6b25lLCBpbnZhbGlkUmVhc29uIH0gPSBleHBsYWluRnJvbVRva2VucyhcbiAgICBsb2NhbGUsXG4gICAgaW5wdXQsXG4gICAgZm9ybWF0LFxuICApO1xuICByZXR1cm4gW3Jlc3VsdCwgem9uZSwgaW52YWxpZFJlYXNvbl07XG59XG5cbmNvbnN0IG5vbkxlYXBMYWRkZXIgPSBbMCwgMzEsIDU5LCA5MCwgMTIwLCAxNTEsIDE4MSwgMjEyLCAyNDMsIDI3MywgMzA0LCAzMzRdLFxuICBsZWFwTGFkZGVyID0gWzAsIDMxLCA2MCwgOTEsIDEyMSwgMTUyLCAxODIsIDIxMywgMjQ0LCAyNzQsIDMwNSwgMzM1XTtcblxuZnVuY3Rpb24gdW5pdE91dE9mUmFuZ2UodW5pdCwgdmFsdWUpIHtcbiAgcmV0dXJuIG5ldyBJbnZhbGlkKFxuICAgICd1bml0IG91dCBvZiByYW5nZScsXG4gICAgYHlvdSBzcGVjaWZpZWQgJHt2YWx1ZX0gKG9mIHR5cGUgJHt0eXBlb2YgdmFsdWV9KSBhcyBhICR7dW5pdH0sIHdoaWNoIGlzIGludmFsaWRgLFxuICApO1xufVxuXG5mdW5jdGlvbiBkYXlPZldlZWsoeWVhciwgbW9udGgsIGRheSkge1xuICBjb25zdCBqcyA9IG5ldyBEYXRlKERhdGUuVVRDKHllYXIsIG1vbnRoIC0gMSwgZGF5KSkuZ2V0VVRDRGF5KCk7XG4gIHJldHVybiBqcyA9PT0gMCA/IDcgOiBqcztcbn1cblxuZnVuY3Rpb24gY29tcHV0ZU9yZGluYWwoeWVhciwgbW9udGgsIGRheSkge1xuICByZXR1cm4gZGF5ICsgKGlzTGVhcFllYXIoeWVhcikgPyBsZWFwTGFkZGVyIDogbm9uTGVhcExhZGRlcilbbW9udGggLSAxXTtcbn1cblxuZnVuY3Rpb24gdW5jb21wdXRlT3JkaW5hbCh5ZWFyLCBvcmRpbmFsKSB7XG4gIGNvbnN0IHRhYmxlID0gaXNMZWFwWWVhcih5ZWFyKSA/IGxlYXBMYWRkZXIgOiBub25MZWFwTGFkZGVyLFxuICAgIG1vbnRoMCA9IHRhYmxlLmZpbmRJbmRleChpID0+IGkgPCBvcmRpbmFsKSxcbiAgICBkYXkgPSBvcmRpbmFsIC0gdGFibGVbbW9udGgwXTtcbiAgcmV0dXJuIHtcbiAgICBtb250aDogbW9udGgwICsgMSxcbiAgICBkYXksXG4gIH07XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBncmVnb3JpYW5Ub1dlZWsoZ3JlZ09iaikge1xuICBjb25zdCB7IHllYXIsIG1vbnRoLCBkYXkgfSA9IGdyZWdPYmosXG4gICAgb3JkaW5hbCA9IGNvbXB1dGVPcmRpbmFsKHllYXIsIG1vbnRoLCBkYXkpLFxuICAgIHdlZWtkYXkgPSBkYXlPZldlZWsoeWVhciwgbW9udGgsIGRheSk7XG4gIGxldCB3ZWVrTnVtYmVyID0gTWF0aC5mbG9vcigob3JkaW5hbCAtIHdlZWtkYXkgKyAxMCkgLyA3KSxcbiAgICB3ZWVrWWVhcjtcblxuICBpZiAod2Vla051bWJlciA8IDEpIHtcbiAgICB3ZWVrWWVhciA9IHllYXIgLSAxO1xuICAgIHdlZWtOdW1iZXIgPSB3ZWVrc0luV2Vla1llYXIod2Vla1llYXIpO1xuICB9IGVsc2UgaWYgKHdlZWtOdW1iZXIgPiB3ZWVrc0luV2Vla1llYXIoeWVhcikpIHtcbiAgICB3ZWVrWWVhciA9IHllYXIgKyAxO1xuICAgIHdlZWtOdW1iZXIgPSAxO1xuICB9IGVsc2Uge1xuICAgIHdlZWtZZWFyID0geWVhcjtcbiAgfVxuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgIHtcbiAgICAgIHdlZWtZZWFyLFxuICAgICAgd2Vla051bWJlcixcbiAgICAgIHdlZWtkYXksXG4gICAgfSxcbiAgICB0aW1lT2JqZWN0KGdyZWdPYmopLFxuICApO1xufVxuXG5mdW5jdGlvbiB3ZWVrVG9HcmVnb3JpYW4od2Vla0RhdGEpIHtcbiAgY29uc3QgeyB3ZWVrWWVhciwgd2Vla051bWJlciwgd2Vla2RheSB9ID0gd2Vla0RhdGEsXG4gICAgd2Vla2RheU9mSmFuNCA9IGRheU9mV2Vlayh3ZWVrWWVhciwgMSwgNCksXG4gICAgeWVhckluRGF5cyA9IGRheXNJblllYXIod2Vla1llYXIpO1xuICBsZXQgb3JkaW5hbCA9IHdlZWtOdW1iZXIgKiA3ICsgd2Vla2RheSAtIHdlZWtkYXlPZkphbjQgLSAzLFxuICAgIHllYXI7XG5cbiAgaWYgKG9yZGluYWwgPCAxKSB7XG4gICAgeWVhciA9IHdlZWtZZWFyIC0gMTtcbiAgICBvcmRpbmFsICs9IGRheXNJblllYXIoeWVhcik7XG4gIH0gZWxzZSBpZiAob3JkaW5hbCA+IHllYXJJbkRheXMpIHtcbiAgICB5ZWFyID0gd2Vla1llYXIgKyAxO1xuICAgIG9yZGluYWwgLT0gZGF5c0luWWVhcih3ZWVrWWVhcik7XG4gIH0gZWxzZSB7XG4gICAgeWVhciA9IHdlZWtZZWFyO1xuICB9XG5cbiAgY29uc3QgeyBtb250aCwgZGF5IH0gPSB1bmNvbXB1dGVPcmRpbmFsKHllYXIsIG9yZGluYWwpO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICB7XG4gICAgICB5ZWFyLFxuICAgICAgbW9udGgsXG4gICAgICBkYXksXG4gICAgfSxcbiAgICB0aW1lT2JqZWN0KHdlZWtEYXRhKSxcbiAgKTtcbn1cblxuZnVuY3Rpb24gZ3JlZ29yaWFuVG9PcmRpbmFsKGdyZWdEYXRhKSB7XG4gIGNvbnN0IHsgeWVhciwgbW9udGgsIGRheSB9ID0gZ3JlZ0RhdGEsXG4gICAgb3JkaW5hbCA9IGNvbXB1dGVPcmRpbmFsKHllYXIsIG1vbnRoLCBkYXkpO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICB7XG4gICAgICB5ZWFyLFxuICAgICAgb3JkaW5hbCxcbiAgICB9LFxuICAgIHRpbWVPYmplY3QoZ3JlZ0RhdGEpLFxuICApO1xufVxuXG5mdW5jdGlvbiBvcmRpbmFsVG9HcmVnb3JpYW4ob3JkaW5hbERhdGEpIHtcbiAgY29uc3QgeyB5ZWFyLCBvcmRpbmFsIH0gPSBvcmRpbmFsRGF0YSxcbiAgICB7IG1vbnRoLCBkYXkgfSA9IHVuY29tcHV0ZU9yZGluYWwoeWVhciwgb3JkaW5hbCk7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgIHtcbiAgICAgIHllYXIsXG4gICAgICBtb250aCxcbiAgICAgIGRheSxcbiAgICB9LFxuICAgIHRpbWVPYmplY3Qob3JkaW5hbERhdGEpLFxuICApO1xufVxuXG5mdW5jdGlvbiBoYXNJbnZhbGlkV2Vla0RhdGEob2JqKSB7XG4gIGNvbnN0IHZhbGlkWWVhciA9IGlzSW50ZWdlcihvYmoud2Vla1llYXIpLFxuICAgIHZhbGlkV2VlayA9IGludGVnZXJCZXR3ZWVuKFxuICAgICAgb2JqLndlZWtOdW1iZXIsXG4gICAgICAxLFxuICAgICAgd2Vla3NJbldlZWtZZWFyKG9iai53ZWVrWWVhciksXG4gICAgKSxcbiAgICB2YWxpZFdlZWtkYXkgPSBpbnRlZ2VyQmV0d2VlbihvYmoud2Vla2RheSwgMSwgNyk7XG5cbiAgaWYgKCF2YWxpZFllYXIpIHtcbiAgICByZXR1cm4gdW5pdE91dE9mUmFuZ2UoJ3dlZWtZZWFyJywgb2JqLndlZWtZZWFyKTtcbiAgfSBlbHNlIGlmICghdmFsaWRXZWVrKSB7XG4gICAgcmV0dXJuIHVuaXRPdXRPZlJhbmdlKCd3ZWVrJywgb2JqLndlZWspO1xuICB9IGVsc2UgaWYgKCF2YWxpZFdlZWtkYXkpIHtcbiAgICByZXR1cm4gdW5pdE91dE9mUmFuZ2UoJ3dlZWtkYXknLCBvYmoud2Vla2RheSk7XG4gIH0gZWxzZSByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGhhc0ludmFsaWRPcmRpbmFsRGF0YShvYmopIHtcbiAgY29uc3QgdmFsaWRZZWFyID0gaXNJbnRlZ2VyKG9iai55ZWFyKSxcbiAgICB2YWxpZE9yZGluYWwgPSBpbnRlZ2VyQmV0d2VlbihvYmoub3JkaW5hbCwgMSwgZGF5c0luWWVhcihvYmoueWVhcikpO1xuXG4gIGlmICghdmFsaWRZZWFyKSB7XG4gICAgcmV0dXJuIHVuaXRPdXRPZlJhbmdlKCd5ZWFyJywgb2JqLnllYXIpO1xuICB9IGVsc2UgaWYgKCF2YWxpZE9yZGluYWwpIHtcbiAgICByZXR1cm4gdW5pdE91dE9mUmFuZ2UoJ29yZGluYWwnLCBvYmoub3JkaW5hbCk7XG4gIH0gZWxzZSByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGhhc0ludmFsaWRHcmVnb3JpYW5EYXRhKG9iaikge1xuICBjb25zdCB2YWxpZFllYXIgPSBpc0ludGVnZXIob2JqLnllYXIpLFxuICAgIHZhbGlkTW9udGggPSBpbnRlZ2VyQmV0d2VlbihvYmoubW9udGgsIDEsIDEyKSxcbiAgICB2YWxpZERheSA9IGludGVnZXJCZXR3ZWVuKG9iai5kYXksIDEsIGRheXNJbk1vbnRoKG9iai55ZWFyLCBvYmoubW9udGgpKTtcblxuICBpZiAoIXZhbGlkWWVhcikge1xuICAgIHJldHVybiB1bml0T3V0T2ZSYW5nZSgneWVhcicsIG9iai55ZWFyKTtcbiAgfSBlbHNlIGlmICghdmFsaWRNb250aCkge1xuICAgIHJldHVybiB1bml0T3V0T2ZSYW5nZSgnbW9udGgnLCBvYmoubW9udGgpO1xuICB9IGVsc2UgaWYgKCF2YWxpZERheSkge1xuICAgIHJldHVybiB1bml0T3V0T2ZSYW5nZSgnZGF5Jywgb2JqLmRheSk7XG4gIH0gZWxzZSByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGhhc0ludmFsaWRUaW1lRGF0YShvYmopIHtcbiAgY29uc3QgeyBob3VyLCBtaW51dGUsIHNlY29uZCwgbWlsbGlzZWNvbmQgfSA9IG9iajtcbiAgY29uc3QgdmFsaWRIb3VyID1cbiAgICAgIGludGVnZXJCZXR3ZWVuKGhvdXIsIDAsIDIzKSB8fFxuICAgICAgKGhvdXIgPT09IDI0ICYmIG1pbnV0ZSA9PT0gMCAmJiBzZWNvbmQgPT09IDAgJiYgbWlsbGlzZWNvbmQgPT09IDApLFxuICAgIHZhbGlkTWludXRlID0gaW50ZWdlckJldHdlZW4obWludXRlLCAwLCA1OSksXG4gICAgdmFsaWRTZWNvbmQgPSBpbnRlZ2VyQmV0d2VlbihzZWNvbmQsIDAsIDU5KSxcbiAgICB2YWxpZE1pbGxpc2Vjb25kID0gaW50ZWdlckJldHdlZW4obWlsbGlzZWNvbmQsIDAsIDk5OSk7XG5cbiAgaWYgKCF2YWxpZEhvdXIpIHtcbiAgICByZXR1cm4gdW5pdE91dE9mUmFuZ2UoJ2hvdXInLCBob3VyKTtcbiAgfSBlbHNlIGlmICghdmFsaWRNaW51dGUpIHtcbiAgICByZXR1cm4gdW5pdE91dE9mUmFuZ2UoJ21pbnV0ZScsIG1pbnV0ZSk7XG4gIH0gZWxzZSBpZiAoIXZhbGlkU2Vjb25kKSB7XG4gICAgcmV0dXJuIHVuaXRPdXRPZlJhbmdlKCdzZWNvbmQnLCBzZWNvbmQpO1xuICB9IGVsc2UgaWYgKCF2YWxpZE1pbGxpc2Vjb25kKSB7XG4gICAgcmV0dXJuIHVuaXRPdXRPZlJhbmdlKCdtaWxsaXNlY29uZCcsIG1pbGxpc2Vjb25kKTtcbiAgfSBlbHNlIHJldHVybiBmYWxzZTtcbn1cblxuY29uc3QgSU5WQUxJRCQyID0gJ0ludmFsaWQgRGF0ZVRpbWUnO1xuY29uc3QgTUFYX0RBVEUgPSA4LjY0ZTE1O1xuXG5mdW5jdGlvbiB1bnN1cHBvcnRlZFpvbmUoem9uZSkge1xuICByZXR1cm4gbmV3IEludmFsaWQoXG4gICAgJ3Vuc3VwcG9ydGVkIHpvbmUnLFxuICAgIGB0aGUgem9uZSBcIiR7em9uZS5uYW1lfVwiIGlzIG5vdCBzdXBwb3J0ZWRgLFxuICApO1xufSAvLyB3ZSBjYWNoZSB3ZWVrIGRhdGEgb24gdGhlIERUIG9iamVjdCBhbmQgdGhpcyBpbnRlcm1lZGlhdGVzIHRoZSBjYWNoZVxuXG5mdW5jdGlvbiBwb3NzaWJseUNhY2hlZFdlZWtEYXRhKGR0KSB7XG4gIGlmIChkdC53ZWVrRGF0YSA9PT0gbnVsbCkge1xuICAgIGR0LndlZWtEYXRhID0gZ3JlZ29yaWFuVG9XZWVrKGR0LmMpO1xuICB9XG5cbiAgcmV0dXJuIGR0LndlZWtEYXRhO1xufSAvLyBjbG9uZSByZWFsbHkgbWVhbnMsIFwibWFrZSBhIG5ldyBvYmplY3Qgd2l0aCB0aGVzZSBtb2RpZmljYXRpb25zXCIuIGFsbCBcInNldHRlcnNcIiByZWFsbHkgdXNlIHRoaXNcbi8vIHRvIGNyZWF0ZSBhIG5ldyBvYmplY3Qgd2hpbGUgb25seSBjaGFuZ2luZyBzb21lIG9mIHRoZSBwcm9wZXJ0aWVzXG5cbmZ1bmN0aW9uIGNsb25lJDEoaW5zdCwgYWx0cykge1xuICBjb25zdCBjdXJyZW50ID0ge1xuICAgIHRzOiBpbnN0LnRzLFxuICAgIHpvbmU6IGluc3Quem9uZSxcbiAgICBjOiBpbnN0LmMsXG4gICAgbzogaW5zdC5vLFxuICAgIGxvYzogaW5zdC5sb2MsXG4gICAgaW52YWxpZDogaW5zdC5pbnZhbGlkLFxuICB9O1xuICByZXR1cm4gbmV3IERhdGVUaW1lKFxuICAgIE9iamVjdC5hc3NpZ24oe30sIGN1cnJlbnQsIGFsdHMsIHtcbiAgICAgIG9sZDogY3VycmVudCxcbiAgICB9KSxcbiAgKTtcbn0gLy8gZmluZCB0aGUgcmlnaHQgb2Zmc2V0IGEgZ2l2ZW4gbG9jYWwgdGltZS4gVGhlIG8gaW5wdXQgaXMgb3VyIGd1ZXNzLCB3aGljaCBkZXRlcm1pbmVzIHdoaWNoXG4vLyBvZmZzZXQgd2UnbGwgcGljayBpbiBhbWJpZ3VvdXMgY2FzZXMgKGUuZy4gdGhlcmUgYXJlIHR3byAzIEFNcyBiL2MgRmFsbGJhY2sgRFNUKVxuXG5mdW5jdGlvbiBmaXhPZmZzZXQobG9jYWxUUywgbywgdHopIHtcbiAgLy8gT3VyIFVUQyB0aW1lIGlzIGp1c3QgYSBndWVzcyBiZWNhdXNlIG91ciBvZmZzZXQgaXMganVzdCBhIGd1ZXNzXG4gIGxldCB1dGNHdWVzcyA9IGxvY2FsVFMgLSBvICogNjAgKiAxMDAwOyAvLyBUZXN0IHdoZXRoZXIgdGhlIHpvbmUgbWF0Y2hlcyB0aGUgb2Zmc2V0IGZvciB0aGlzIHRzXG5cbiAgY29uc3QgbzIgPSB0ei5vZmZzZXQodXRjR3Vlc3MpOyAvLyBJZiBzbywgb2Zmc2V0IGRpZG4ndCBjaGFuZ2UgYW5kIHdlJ3JlIGRvbmVcblxuICBpZiAobyA9PT0gbzIpIHtcbiAgICByZXR1cm4gW3V0Y0d1ZXNzLCBvXTtcbiAgfSAvLyBJZiBub3QsIGNoYW5nZSB0aGUgdHMgYnkgdGhlIGRpZmZlcmVuY2UgaW4gdGhlIG9mZnNldFxuXG4gIHV0Y0d1ZXNzIC09IChvMiAtIG8pICogNjAgKiAxMDAwOyAvLyBJZiB0aGF0IGdpdmVzIHVzIHRoZSBsb2NhbCB0aW1lIHdlIHdhbnQsIHdlJ3JlIGRvbmVcblxuICBjb25zdCBvMyA9IHR6Lm9mZnNldCh1dGNHdWVzcyk7XG5cbiAgaWYgKG8yID09PSBvMykge1xuICAgIHJldHVybiBbdXRjR3Vlc3MsIG8yXTtcbiAgfSAvLyBJZiBpdCdzIGRpZmZlcmVudCwgd2UncmUgaW4gYSBob2xlIHRpbWUuIFRoZSBvZmZzZXQgaGFzIGNoYW5nZWQsIGJ1dCB0aGUgd2UgZG9uJ3QgYWRqdXN0IHRoZSB0aW1lXG5cbiAgcmV0dXJuIFtsb2NhbFRTIC0gTWF0aC5taW4obzIsIG8zKSAqIDYwICogMTAwMCwgTWF0aC5tYXgobzIsIG8zKV07XG59IC8vIGNvbnZlcnQgYW4gZXBvY2ggdGltZXN0YW1wIGludG8gYSBjYWxlbmRhciBvYmplY3Qgd2l0aCB0aGUgZ2l2ZW4gb2Zmc2V0XG5cbmZ1bmN0aW9uIHRzVG9PYmoodHMsIG9mZnNldCkge1xuICB0cyArPSBvZmZzZXQgKiA2MCAqIDEwMDA7XG4gIGNvbnN0IGQgPSBuZXcgRGF0ZSh0cyk7XG4gIHJldHVybiB7XG4gICAgeWVhcjogZC5nZXRVVENGdWxsWWVhcigpLFxuICAgIG1vbnRoOiBkLmdldFVUQ01vbnRoKCkgKyAxLFxuICAgIGRheTogZC5nZXRVVENEYXRlKCksXG4gICAgaG91cjogZC5nZXRVVENIb3VycygpLFxuICAgIG1pbnV0ZTogZC5nZXRVVENNaW51dGVzKCksXG4gICAgc2Vjb25kOiBkLmdldFVUQ1NlY29uZHMoKSxcbiAgICBtaWxsaXNlY29uZDogZC5nZXRVVENNaWxsaXNlY29uZHMoKSxcbiAgfTtcbn0gLy8gY29udmVydCBhIGNhbGVuZGFyIG9iamVjdCB0byBhIGVwb2NoIHRpbWVzdGFtcFxuXG5mdW5jdGlvbiBvYmpUb1RTKG9iaiwgb2Zmc2V0LCB6b25lKSB7XG4gIHJldHVybiBmaXhPZmZzZXQob2JqVG9Mb2NhbFRTKG9iaiksIG9mZnNldCwgem9uZSk7XG59IC8vIGNyZWF0ZSBhIG5ldyBEVCBpbnN0YW5jZSBieSBhZGRpbmcgYSBkdXJhdGlvbiwgYWRqdXN0aW5nIGZvciBEU1RzXG5cbmZ1bmN0aW9uIGFkanVzdFRpbWUoaW5zdCwgZHVyKSB7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhkdXIudmFsdWVzKTtcblxuICBpZiAoa2V5cy5pbmRleE9mKCdtaWxsaXNlY29uZHMnKSA9PT0gLTEpIHtcbiAgICBrZXlzLnB1c2goJ21pbGxpc2Vjb25kcycpO1xuICB9XG5cbiAgZHVyID0gZHVyLnNoaWZ0VG8oLi4ua2V5cyk7XG4gIGNvbnN0IG9QcmUgPSBpbnN0Lm8sXG4gICAgeWVhciA9IGluc3QuYy55ZWFyICsgZHVyLnllYXJzLFxuICAgIG1vbnRoID0gaW5zdC5jLm1vbnRoICsgZHVyLm1vbnRocyArIGR1ci5xdWFydGVycyAqIDMsXG4gICAgYyA9IE9iamVjdC5hc3NpZ24oe30sIGluc3QuYywge1xuICAgICAgeWVhcixcbiAgICAgIG1vbnRoLFxuICAgICAgZGF5OlxuICAgICAgICBNYXRoLm1pbihpbnN0LmMuZGF5LCBkYXlzSW5Nb250aCh5ZWFyLCBtb250aCkpICtcbiAgICAgICAgZHVyLmRheXMgK1xuICAgICAgICBkdXIud2Vla3MgKiA3LFxuICAgIH0pLFxuICAgIG1pbGxpc1RvQWRkID0gRHVyYXRpb24uZnJvbU9iamVjdCh7XG4gICAgICBob3VyczogZHVyLmhvdXJzLFxuICAgICAgbWludXRlczogZHVyLm1pbnV0ZXMsXG4gICAgICBzZWNvbmRzOiBkdXIuc2Vjb25kcyxcbiAgICAgIG1pbGxpc2Vjb25kczogZHVyLm1pbGxpc2Vjb25kcyxcbiAgICB9KS5hcygnbWlsbGlzZWNvbmRzJyksXG4gICAgbG9jYWxUUyA9IG9ialRvTG9jYWxUUyhjKTtcbiAgbGV0IFt0cywgb10gPSBmaXhPZmZzZXQobG9jYWxUUywgb1ByZSwgaW5zdC56b25lKTtcblxuICBpZiAobWlsbGlzVG9BZGQgIT09IDApIHtcbiAgICB0cyArPSBtaWxsaXNUb0FkZDsgLy8gdGhhdCBjb3VsZCBoYXZlIGNoYW5nZWQgdGhlIG9mZnNldCBieSBnb2luZyBvdmVyIGEgRFNULCBidXQgd2Ugd2FudCB0byBrZWVwIHRoZSB0cyB0aGUgc2FtZVxuXG4gICAgbyA9IGluc3Quem9uZS5vZmZzZXQodHMpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0cyxcbiAgICBvLFxuICB9O1xufSAvLyBoZWxwZXIgdXNlZnVsIGluIHR1cm5pbmcgdGhlIHJlc3VsdHMgb2YgcGFyc2luZyBpbnRvIHJlYWwgZGF0ZXNcbi8vIGJ5IGhhbmRsaW5nIHRoZSB6b25lIG9wdGlvbnNcblxuZnVuY3Rpb24gcGFyc2VEYXRhVG9EYXRlVGltZShwYXJzZWQsIHBhcnNlZFpvbmUsIG9wdHMsIGZvcm1hdCwgdGV4dCkge1xuICBjb25zdCB7IHNldFpvbmUsIHpvbmUgfSA9IG9wdHM7XG5cbiAgaWYgKHBhcnNlZCAmJiBPYmplY3Qua2V5cyhwYXJzZWQpLmxlbmd0aCAhPT0gMCkge1xuICAgIGNvbnN0IGludGVycHJldGF0aW9uWm9uZSA9IHBhcnNlZFpvbmUgfHwgem9uZSxcbiAgICAgIGluc3QgPSBEYXRlVGltZS5mcm9tT2JqZWN0KFxuICAgICAgICBPYmplY3QuYXNzaWduKHBhcnNlZCwgb3B0cywge1xuICAgICAgICAgIHpvbmU6IGludGVycHJldGF0aW9uWm9uZSxcbiAgICAgICAgICAvLyBzZXRab25lIGlzIGEgdmFsaWQgb3B0aW9uIGluIHRoZSBjYWxsaW5nIG1ldGhvZHMsIGJ1dCBub3QgaW4gZnJvbU9iamVjdFxuICAgICAgICAgIHNldFpvbmU6IHVuZGVmaW5lZCxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIHJldHVybiBzZXRab25lID8gaW5zdCA6IGluc3Quc2V0Wm9uZSh6b25lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gRGF0ZVRpbWUuaW52YWxpZChcbiAgICAgIG5ldyBJbnZhbGlkKFxuICAgICAgICAndW5wYXJzYWJsZScsXG4gICAgICAgIGB0aGUgaW5wdXQgXCIke3RleHR9XCIgY2FuJ3QgYmUgcGFyc2VkIGFzICR7Zm9ybWF0fWAsXG4gICAgICApLFxuICAgICk7XG4gIH1cbn0gLy8gaWYgeW91IHdhbnQgdG8gb3V0cHV0IGEgdGVjaG5pY2FsIGZvcm1hdCAoZS5nLiBSRkMgMjgyMiksIHRoaXMgaGVscGVyXG4vLyBoZWxwcyBoYW5kbGUgdGhlIGRldGFpbHNcblxuZnVuY3Rpb24gdG9UZWNoRm9ybWF0KGR0LCBmb3JtYXQsIGFsbG93WiA9IHRydWUpIHtcbiAgcmV0dXJuIGR0LmlzVmFsaWRcbiAgICA/IEZvcm1hdHRlci5jcmVhdGUoTG9jYWxlLmNyZWF0ZSgnZW4tVVMnKSwge1xuICAgICAgICBhbGxvd1osXG4gICAgICAgIGZvcmNlU2ltcGxlOiB0cnVlLFxuICAgICAgfSkuZm9ybWF0RGF0ZVRpbWVGcm9tU3RyaW5nKGR0LCBmb3JtYXQpXG4gICAgOiBudWxsO1xufSAvLyB0ZWNobmljYWwgdGltZSBmb3JtYXRzIChlLmcuIHRoZSB0aW1lIHBhcnQgb2YgSVNPIDg2MDEpLCB0YWtlIHNvbWUgb3B0aW9uc1xuLy8gYW5kIHRoaXMgY29tbW9uaXplcyB0aGVpciBoYW5kbGluZ1xuXG5mdW5jdGlvbiB0b1RlY2hUaW1lRm9ybWF0KFxuICBkdCxcbiAge1xuICAgIHN1cHByZXNzU2Vjb25kcyA9IGZhbHNlLFxuICAgIHN1cHByZXNzTWlsbGlzZWNvbmRzID0gZmFsc2UsXG4gICAgaW5jbHVkZU9mZnNldCxcbiAgICBpbmNsdWRlWm9uZSA9IGZhbHNlLFxuICAgIHNwYWNlWm9uZSA9IGZhbHNlLFxuICAgIGZvcm1hdCA9ICdleHRlbmRlZCcsXG4gIH0sXG4pIHtcbiAgbGV0IGZtdCA9IGZvcm1hdCA9PT0gJ2Jhc2ljJyA/ICdISG1tJyA6ICdISDptbSc7XG5cbiAgaWYgKCFzdXBwcmVzc1NlY29uZHMgfHwgZHQuc2Vjb25kICE9PSAwIHx8IGR0Lm1pbGxpc2Vjb25kICE9PSAwKSB7XG4gICAgZm10ICs9IGZvcm1hdCA9PT0gJ2Jhc2ljJyA/ICdzcycgOiAnOnNzJztcblxuICAgIGlmICghc3VwcHJlc3NNaWxsaXNlY29uZHMgfHwgZHQubWlsbGlzZWNvbmQgIT09IDApIHtcbiAgICAgIGZtdCArPSAnLlNTUyc7XG4gICAgfVxuICB9XG5cbiAgaWYgKChpbmNsdWRlWm9uZSB8fCBpbmNsdWRlT2Zmc2V0KSAmJiBzcGFjZVpvbmUpIHtcbiAgICBmbXQgKz0gJyAnO1xuICB9XG5cbiAgaWYgKGluY2x1ZGVab25lKSB7XG4gICAgZm10ICs9ICd6JztcbiAgfSBlbHNlIGlmIChpbmNsdWRlT2Zmc2V0KSB7XG4gICAgZm10ICs9IGZvcm1hdCA9PT0gJ2Jhc2ljJyA/ICdaWlonIDogJ1paJztcbiAgfVxuXG4gIHJldHVybiB0b1RlY2hGb3JtYXQoZHQsIGZtdCk7XG59IC8vIGRlZmF1bHRzIGZvciB1bnNwZWNpZmllZCB1bml0cyBpbiB0aGUgc3VwcG9ydGVkIGNhbGVuZGFyc1xuXG5jb25zdCBkZWZhdWx0VW5pdFZhbHVlcyA9IHtcbiAgICBtb250aDogMSxcbiAgICBkYXk6IDEsXG4gICAgaG91cjogMCxcbiAgICBtaW51dGU6IDAsXG4gICAgc2Vjb25kOiAwLFxuICAgIG1pbGxpc2Vjb25kOiAwLFxuICB9LFxuICBkZWZhdWx0V2Vla1VuaXRWYWx1ZXMgPSB7XG4gICAgd2Vla051bWJlcjogMSxcbiAgICB3ZWVrZGF5OiAxLFxuICAgIGhvdXI6IDAsXG4gICAgbWludXRlOiAwLFxuICAgIHNlY29uZDogMCxcbiAgICBtaWxsaXNlY29uZDogMCxcbiAgfSxcbiAgZGVmYXVsdE9yZGluYWxVbml0VmFsdWVzID0ge1xuICAgIG9yZGluYWw6IDEsXG4gICAgaG91cjogMCxcbiAgICBtaW51dGU6IDAsXG4gICAgc2Vjb25kOiAwLFxuICAgIG1pbGxpc2Vjb25kOiAwLFxuICB9OyAvLyBVbml0cyBpbiB0aGUgc3VwcG9ydGVkIGNhbGVuZGFycywgc29ydGVkIGJ5IGJpZ25lc3NcblxuY29uc3Qgb3JkZXJlZFVuaXRzJDEgPSBbXG4gICAgJ3llYXInLFxuICAgICdtb250aCcsXG4gICAgJ2RheScsXG4gICAgJ2hvdXInLFxuICAgICdtaW51dGUnLFxuICAgICdzZWNvbmQnLFxuICAgICdtaWxsaXNlY29uZCcsXG4gIF0sXG4gIG9yZGVyZWRXZWVrVW5pdHMgPSBbXG4gICAgJ3dlZWtZZWFyJyxcbiAgICAnd2Vla051bWJlcicsXG4gICAgJ3dlZWtkYXknLFxuICAgICdob3VyJyxcbiAgICAnbWludXRlJyxcbiAgICAnc2Vjb25kJyxcbiAgICAnbWlsbGlzZWNvbmQnLFxuICBdLFxuICBvcmRlcmVkT3JkaW5hbFVuaXRzID0gW1xuICAgICd5ZWFyJyxcbiAgICAnb3JkaW5hbCcsXG4gICAgJ2hvdXInLFxuICAgICdtaW51dGUnLFxuICAgICdzZWNvbmQnLFxuICAgICdtaWxsaXNlY29uZCcsXG4gIF07IC8vIHN0YW5kYXJkaXplIGNhc2UgYW5kIHBsdXJhbGl0eSBpbiB1bml0c1xuXG5mdW5jdGlvbiBub3JtYWxpemVVbml0KHVuaXQpIHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHtcbiAgICB5ZWFyOiAneWVhcicsXG4gICAgeWVhcnM6ICd5ZWFyJyxcbiAgICBtb250aDogJ21vbnRoJyxcbiAgICBtb250aHM6ICdtb250aCcsXG4gICAgZGF5OiAnZGF5JyxcbiAgICBkYXlzOiAnZGF5JyxcbiAgICBob3VyOiAnaG91cicsXG4gICAgaG91cnM6ICdob3VyJyxcbiAgICBtaW51dGU6ICdtaW51dGUnLFxuICAgIG1pbnV0ZXM6ICdtaW51dGUnLFxuICAgIHF1YXJ0ZXI6ICdxdWFydGVyJyxcbiAgICBxdWFydGVyczogJ3F1YXJ0ZXInLFxuICAgIHNlY29uZDogJ3NlY29uZCcsXG4gICAgc2Vjb25kczogJ3NlY29uZCcsXG4gICAgbWlsbGlzZWNvbmQ6ICdtaWxsaXNlY29uZCcsXG4gICAgbWlsbGlzZWNvbmRzOiAnbWlsbGlzZWNvbmQnLFxuICAgIHdlZWtkYXk6ICd3ZWVrZGF5JyxcbiAgICB3ZWVrZGF5czogJ3dlZWtkYXknLFxuICAgIHdlZWtudW1iZXI6ICd3ZWVrTnVtYmVyJyxcbiAgICB3ZWVrc251bWJlcjogJ3dlZWtOdW1iZXInLFxuICAgIHdlZWtudW1iZXJzOiAnd2Vla051bWJlcicsXG4gICAgd2Vla3llYXI6ICd3ZWVrWWVhcicsXG4gICAgd2Vla3llYXJzOiAnd2Vla1llYXInLFxuICAgIG9yZGluYWw6ICdvcmRpbmFsJyxcbiAgfVt1bml0LnRvTG93ZXJDYXNlKCldO1xuICBpZiAoIW5vcm1hbGl6ZWQpIHRocm93IG5ldyBJbnZhbGlkVW5pdEVycm9yKHVuaXQpO1xuICByZXR1cm4gbm9ybWFsaXplZDtcbn0gLy8gdGhpcyBpcyBhIGR1bWJlZCBkb3duIHZlcnNpb24gb2YgZnJvbU9iamVjdCgpIHRoYXQgcnVucyBhYm91dCA2MCUgZmFzdGVyXG4vLyBidXQgZG9lc24ndCBkbyBhbnkgdmFsaWRhdGlvbiwgbWFrZXMgYSBidW5jaCBvZiBhc3N1bXB0aW9ucyBhYm91dCB3aGF0IHVuaXRzXG4vLyBhcmUgcHJlc2VudCwgYW5kIHNvIG9uLlxuXG5mdW5jdGlvbiBxdWlja0RUKG9iaiwgem9uZSkge1xuICAvLyBhc3N1bWUgd2UgaGF2ZSB0aGUgaGlnaGVyLW9yZGVyIHVuaXRzXG4gIGZvciAoY29uc3QgdSBvZiBvcmRlcmVkVW5pdHMkMSkge1xuICAgIGlmIChpc1VuZGVmaW5lZChvYmpbdV0pKSB7XG4gICAgICBvYmpbdV0gPSBkZWZhdWx0VW5pdFZhbHVlc1t1XTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBpbnZhbGlkID0gaGFzSW52YWxpZEdyZWdvcmlhbkRhdGEob2JqKSB8fCBoYXNJbnZhbGlkVGltZURhdGEob2JqKTtcblxuICBpZiAoaW52YWxpZCkge1xuICAgIHJldHVybiBEYXRlVGltZS5pbnZhbGlkKGludmFsaWQpO1xuICB9XG5cbiAgY29uc3QgdHNOb3cgPSBTZXR0aW5ncy5ub3coKSxcbiAgICBvZmZzZXRQcm92aXMgPSB6b25lLm9mZnNldCh0c05vdyksXG4gICAgW3RzLCBvXSA9IG9ialRvVFMob2JqLCBvZmZzZXRQcm92aXMsIHpvbmUpO1xuICByZXR1cm4gbmV3IERhdGVUaW1lKHtcbiAgICB0cyxcbiAgICB6b25lLFxuICAgIG8sXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkaWZmUmVsYXRpdmUoc3RhcnQsIGVuZCwgb3B0cykge1xuICBjb25zdCByb3VuZCA9IGlzVW5kZWZpbmVkKG9wdHMucm91bmQpID8gdHJ1ZSA6IG9wdHMucm91bmQsXG4gICAgZm9ybWF0ID0gKGMsIHVuaXQpID0+IHtcbiAgICAgIGMgPSByb3VuZFRvKGMsIHJvdW5kIHx8IG9wdHMuY2FsZW5kYXJ5ID8gMCA6IDIsIHRydWUpO1xuICAgICAgY29uc3QgZm9ybWF0dGVyID0gZW5kLmxvYy5jbG9uZShvcHRzKS5yZWxGb3JtYXR0ZXIob3B0cyk7XG4gICAgICByZXR1cm4gZm9ybWF0dGVyLmZvcm1hdChjLCB1bml0KTtcbiAgICB9LFxuICAgIGRpZmZlciA9IHVuaXQgPT4ge1xuICAgICAgaWYgKG9wdHMuY2FsZW5kYXJ5KSB7XG4gICAgICAgIGlmICghZW5kLmhhc1NhbWUoc3RhcnQsIHVuaXQpKSB7XG4gICAgICAgICAgcmV0dXJuIGVuZC5zdGFydE9mKHVuaXQpLmRpZmYoc3RhcnQuc3RhcnRPZih1bml0KSwgdW5pdCkuZ2V0KHVuaXQpO1xuICAgICAgICB9IGVsc2UgcmV0dXJuIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZW5kLmRpZmYoc3RhcnQsIHVuaXQpLmdldCh1bml0KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gIGlmIChvcHRzLnVuaXQpIHtcbiAgICByZXR1cm4gZm9ybWF0KGRpZmZlcihvcHRzLnVuaXQpLCBvcHRzLnVuaXQpO1xuICB9XG5cbiAgZm9yIChjb25zdCB1bml0IG9mIG9wdHMudW5pdHMpIHtcbiAgICBjb25zdCBjb3VudCA9IGRpZmZlcih1bml0KTtcblxuICAgIGlmIChNYXRoLmFicyhjb3VudCkgPj0gMSkge1xuICAgICAgcmV0dXJuIGZvcm1hdChjb3VudCwgdW5pdCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZvcm1hdCgwLCBvcHRzLnVuaXRzW29wdHMudW5pdHMubGVuZ3RoIC0gMV0pO1xufVxuXG4vKipcbiAqIEEgRGF0ZVRpbWUgaXMgYW4gaW1tdXRhYmxlIGRhdGEgc3RydWN0dXJlIHJlcHJlc2VudGluZyBhIHNwZWNpZmljIGRhdGUgYW5kIHRpbWUgYW5kIGFjY29tcGFueWluZyBtZXRob2RzLiBJdCBjb250YWlucyBjbGFzcyBhbmQgaW5zdGFuY2UgbWV0aG9kcyBmb3IgY3JlYXRpbmcsIHBhcnNpbmcsIGludGVycm9nYXRpbmcsIHRyYW5zZm9ybWluZywgYW5kIGZvcm1hdHRpbmcgdGhlbS5cbiAqXG4gKiBBIERhdGVUaW1lIGNvbXByaXNlcyBvZjpcbiAqICogQSB0aW1lc3RhbXAuIEVhY2ggRGF0ZVRpbWUgaW5zdGFuY2UgcmVmZXJzIHRvIGEgc3BlY2lmaWMgbWlsbGlzZWNvbmQgb2YgdGhlIFVuaXggZXBvY2guXG4gKiAqIEEgdGltZSB6b25lLiBFYWNoIGluc3RhbmNlIGlzIGNvbnNpZGVyZWQgaW4gdGhlIGNvbnRleHQgb2YgYSBzcGVjaWZpYyB6b25lIChieSBkZWZhdWx0IHRoZSBsb2NhbCBzeXN0ZW0ncyB6b25lKS5cbiAqICogQ29uZmlndXJhdGlvbiBwcm9wZXJ0aWVzIHRoYXQgZWZmZWN0IGhvdyBvdXRwdXQgc3RyaW5ncyBhcmUgZm9ybWF0dGVkLCBzdWNoIGFzIGBsb2NhbGVgLCBgbnVtYmVyaW5nU3lzdGVtYCwgYW5kIGBvdXRwdXRDYWxlbmRhcmAuXG4gKlxuICogSGVyZSBpcyBhIGJyaWVmIG92ZXJ2aWV3IG9mIHRoZSBtb3N0IGNvbW1vbmx5IHVzZWQgZnVuY3Rpb25hbGl0eSBpdCBwcm92aWRlczpcbiAqXG4gKiAqICoqQ3JlYXRpb24qKjogVG8gY3JlYXRlIGEgRGF0ZVRpbWUgZnJvbSBpdHMgY29tcG9uZW50cywgdXNlIG9uZSBvZiBpdHMgZmFjdG9yeSBjbGFzcyBtZXRob2RzOiB7QGxpbmsgbG9jYWx9LCB7QGxpbmsgdXRjfSwgYW5kIChtb3N0IGZsZXhpYmx5KSB7QGxpbmsgZnJvbU9iamVjdH0uIFRvIGNyZWF0ZSBvbmUgZnJvbSBhIHN0YW5kYXJkIHN0cmluZyBmb3JtYXQsIHVzZSB7QGxpbmsgZnJvbUlTT30sIHtAbGluayBmcm9tSFRUUH0sIGFuZCB7QGxpbmsgZnJvbVJGQzI4MjJ9LiBUbyBjcmVhdGUgb25lIGZyb20gYSBjdXN0b20gc3RyaW5nIGZvcm1hdCwgdXNlIHtAbGluayBmcm9tRm9ybWF0fS4gVG8gY3JlYXRlIG9uZSBmcm9tIGEgbmF0aXZlIEpTIGRhdGUsIHVzZSB7QGxpbmsgZnJvbUpTRGF0ZX0uXG4gKiAqICoqR3JlZ29yaWFuIGNhbGVuZGFyIGFuZCB0aW1lKio6IFRvIGV4YW1pbmUgdGhlIEdyZWdvcmlhbiBwcm9wZXJ0aWVzIG9mIGEgRGF0ZVRpbWUgaW5kaXZpZHVhbGx5IChpLmUgYXMgb3Bwb3NlZCB0byBjb2xsZWN0aXZlbHkgdGhyb3VnaCB7QGxpbmsgdG9PYmplY3R9KSwgdXNlIHRoZSB7QGxpbmsgeWVhcn0sIHtAbGluayBtb250aH0sXG4gKiB7QGxpbmsgZGF5fSwge0BsaW5rIGhvdXJ9LCB7QGxpbmsgbWludXRlfSwge0BsaW5rIHNlY29uZH0sIHtAbGluayBtaWxsaXNlY29uZH0gYWNjZXNzb3JzLlxuICogKiAqKldlZWsgY2FsZW5kYXIqKjogRm9yIElTTyB3ZWVrIGNhbGVuZGFyIGF0dHJpYnV0ZXMsIHNlZSB0aGUge0BsaW5rIHdlZWtZZWFyfSwge0BsaW5rIHdlZWtOdW1iZXJ9LCBhbmQge0BsaW5rIHdlZWtkYXl9IGFjY2Vzc29ycy5cbiAqICogKipDb25maWd1cmF0aW9uKiogU2VlIHRoZSB7QGxpbmsgbG9jYWxlfSBhbmQge0BsaW5rIG51bWJlcmluZ1N5c3RlbX0gYWNjZXNzb3JzLlxuICogKiAqKlRyYW5zZm9ybWF0aW9uKio6IFRvIHRyYW5zZm9ybSB0aGUgRGF0ZVRpbWUgaW50byBvdGhlciBEYXRlVGltZXMsIHVzZSB7QGxpbmsgc2V0fSwge0BsaW5rIHJlY29uZmlndXJlfSwge0BsaW5rIHNldFpvbmV9LCB7QGxpbmsgc2V0TG9jYWxlfSwge0BsaW5rIHBsdXN9LCB7QGxpbmsgbWludXN9LCB7QGxpbmsgZW5kT2Z9LCB7QGxpbmsgc3RhcnRPZn0sIHtAbGluayB0b1VUQ30sIGFuZCB7QGxpbmsgdG9Mb2NhbH0uXG4gKiAqICoqT3V0cHV0Kio6IFRvIGNvbnZlcnQgdGhlIERhdGVUaW1lIHRvIG90aGVyIHJlcHJlc2VudGF0aW9ucywgdXNlIHRoZSB7QGxpbmsgdG9SZWxhdGl2ZX0sIHtAbGluayB0b1JlbGF0aXZlQ2FsZW5kYXJ9LCB7QGxpbmsgdG9KU09OfSwge0BsaW5rIHRvSVNPfSwge0BsaW5rIHRvSFRUUH0sIHtAbGluayB0b09iamVjdH0sIHtAbGluayB0b1JGQzI4MjJ9LCB7QGxpbmsgdG9TdHJpbmd9LCB7QGxpbmsgdG9Mb2NhbGVTdHJpbmd9LCB7QGxpbmsgdG9Gb3JtYXR9LCB7QGxpbmsgdG9NaWxsaXN9IGFuZCB7QGxpbmsgdG9KU0RhdGV9LlxuICpcbiAqIFRoZXJlJ3MgcGxlbnR5IG90aGVycyBkb2N1bWVudGVkIGJlbG93LiBJbiBhZGRpdGlvbiwgZm9yIG1vcmUgaW5mb3JtYXRpb24gb24gc3VidGxlciB0b3BpY3MgbGlrZSBpbnRlcm5hdGlvbmFsaXphdGlvbiwgdGltZSB6b25lcywgYWx0ZXJuYXRpdmUgY2FsZW5kYXJzLCB2YWxpZGl0eSwgYW5kIHNvIG9uLCBzZWUgdGhlIGV4dGVybmFsIGRvY3VtZW50YXRpb24uXG4gKi9cblxuY2xhc3MgRGF0ZVRpbWUge1xuICAvKipcbiAgICogQGFjY2VzcyBwcml2YXRlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBjb25zdCB6b25lID0gY29uZmlnLnpvbmUgfHwgU2V0dGluZ3MuZGVmYXVsdFpvbmU7XG4gICAgbGV0IGludmFsaWQgPVxuICAgICAgY29uZmlnLmludmFsaWQgfHxcbiAgICAgIChOdW1iZXIuaXNOYU4oY29uZmlnLnRzKSA/IG5ldyBJbnZhbGlkKCdpbnZhbGlkIGlucHV0JykgOiBudWxsKSB8fFxuICAgICAgKCF6b25lLmlzVmFsaWQgPyB1bnN1cHBvcnRlZFpvbmUoem9uZSkgOiBudWxsKTtcbiAgICAvKipcbiAgICAgKiBAYWNjZXNzIHByaXZhdGVcbiAgICAgKi9cblxuICAgIHRoaXMudHMgPSBpc1VuZGVmaW5lZChjb25maWcudHMpID8gU2V0dGluZ3Mubm93KCkgOiBjb25maWcudHM7XG4gICAgbGV0IGMgPSBudWxsLFxuICAgICAgbyA9IG51bGw7XG5cbiAgICBpZiAoIWludmFsaWQpIHtcbiAgICAgIGNvbnN0IHVuY2hhbmdlZCA9XG4gICAgICAgIGNvbmZpZy5vbGQgJiYgY29uZmlnLm9sZC50cyA9PT0gdGhpcy50cyAmJiBjb25maWcub2xkLnpvbmUuZXF1YWxzKHpvbmUpO1xuXG4gICAgICBpZiAodW5jaGFuZ2VkKSB7XG4gICAgICAgIFtjLCBvXSA9IFtjb25maWcub2xkLmMsIGNvbmZpZy5vbGQub107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBvdCA9IHpvbmUub2Zmc2V0KHRoaXMudHMpO1xuICAgICAgICBjID0gdHNUb09iaih0aGlzLnRzLCBvdCk7XG4gICAgICAgIGludmFsaWQgPSBOdW1iZXIuaXNOYU4oYy55ZWFyKSA/IG5ldyBJbnZhbGlkKCdpbnZhbGlkIGlucHV0JykgOiBudWxsO1xuICAgICAgICBjID0gaW52YWxpZCA/IG51bGwgOiBjO1xuICAgICAgICBvID0gaW52YWxpZCA/IG51bGwgOiBvdDtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQGFjY2VzcyBwcml2YXRlXG4gICAgICovXG5cbiAgICB0aGlzLl96b25lID0gem9uZTtcbiAgICAvKipcbiAgICAgKiBAYWNjZXNzIHByaXZhdGVcbiAgICAgKi9cblxuICAgIHRoaXMubG9jID0gY29uZmlnLmxvYyB8fCBMb2NhbGUuY3JlYXRlKCk7XG4gICAgLyoqXG4gICAgICogQGFjY2VzcyBwcml2YXRlXG4gICAgICovXG5cbiAgICB0aGlzLmludmFsaWQgPSBpbnZhbGlkO1xuICAgIC8qKlxuICAgICAqIEBhY2Nlc3MgcHJpdmF0ZVxuICAgICAqL1xuXG4gICAgdGhpcy53ZWVrRGF0YSA9IG51bGw7XG4gICAgLyoqXG4gICAgICogQGFjY2VzcyBwcml2YXRlXG4gICAgICovXG5cbiAgICB0aGlzLmMgPSBjO1xuICAgIC8qKlxuICAgICAqIEBhY2Nlc3MgcHJpdmF0ZVxuICAgICAqL1xuXG4gICAgdGhpcy5vID0gbztcbiAgICAvKipcbiAgICAgKiBAYWNjZXNzIHByaXZhdGVcbiAgICAgKi9cblxuICAgIHRoaXMuaXNMdXhvbkRhdGVUaW1lID0gdHJ1ZTtcbiAgfSAvLyBDT05TVFJVQ1RcblxuICAvKipcbiAgICoge0BsaW5rIHRvTG9jYWxlU3RyaW5nfSBmb3JtYXQgbGlrZSAxMC8xNC8xOTgzXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuXG4gIHN0YXRpYyBnZXQgREFURV9TSE9SVCgpIHtcbiAgICByZXR1cm4gREFURV9TSE9SVDtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgdG9Mb2NhbGVTdHJpbmd9IGZvcm1hdCBsaWtlICdPY3QgMTQsIDE5ODMnXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuXG4gIHN0YXRpYyBnZXQgREFURV9NRUQoKSB7XG4gICAgcmV0dXJuIERBVEVfTUVEO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAbGluayB0b0xvY2FsZVN0cmluZ30gZm9ybWF0IGxpa2UgJ09jdG9iZXIgMTQsIDE5ODMnXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuXG4gIHN0YXRpYyBnZXQgREFURV9GVUxMKCkge1xuICAgIHJldHVybiBEQVRFX0ZVTEw7XG4gIH1cblxuICAvKipcbiAgICoge0BsaW5rIHRvTG9jYWxlU3RyaW5nfSBmb3JtYXQgbGlrZSAnVHVlc2RheSwgT2N0b2JlciAxNCwgMTk4MydcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG5cbiAgc3RhdGljIGdldCBEQVRFX0hVR0UoKSB7XG4gICAgcmV0dXJuIERBVEVfSFVHRTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgdG9Mb2NhbGVTdHJpbmd9IGZvcm1hdCBsaWtlICcwOTozMCBBTScuIE9ubHkgMTItaG91ciBpZiB0aGUgbG9jYWxlIGlzLlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cblxuICBzdGF0aWMgZ2V0IFRJTUVfU0lNUExFKCkge1xuICAgIHJldHVybiBUSU1FX1NJTVBMRTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgdG9Mb2NhbGVTdHJpbmd9IGZvcm1hdCBsaWtlICcwOTozMDoyMyBBTScuIE9ubHkgMTItaG91ciBpZiB0aGUgbG9jYWxlIGlzLlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cblxuICBzdGF0aWMgZ2V0IFRJTUVfV0lUSF9TRUNPTkRTKCkge1xuICAgIHJldHVybiBUSU1FX1dJVEhfU0VDT05EUztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgdG9Mb2NhbGVTdHJpbmd9IGZvcm1hdCBsaWtlICcwOTozMDoyMyBBTSBFRFQnLiBPbmx5IDEyLWhvdXIgaWYgdGhlIGxvY2FsZSBpcy5cbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG5cbiAgc3RhdGljIGdldCBUSU1FX1dJVEhfU0hPUlRfT0ZGU0VUKCkge1xuICAgIHJldHVybiBUSU1FX1dJVEhfU0hPUlRfT0ZGU0VUO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAbGluayB0b0xvY2FsZVN0cmluZ30gZm9ybWF0IGxpa2UgJzA5OjMwOjIzIEFNIEVhc3Rlcm4gRGF5bGlnaHQgVGltZScuIE9ubHkgMTItaG91ciBpZiB0aGUgbG9jYWxlIGlzLlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cblxuICBzdGF0aWMgZ2V0IFRJTUVfV0lUSF9MT05HX09GRlNFVCgpIHtcbiAgICByZXR1cm4gVElNRV9XSVRIX0xPTkdfT0ZGU0VUO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAbGluayB0b0xvY2FsZVN0cmluZ30gZm9ybWF0IGxpa2UgJzA5OjMwJywgYWx3YXlzIDI0LWhvdXIuXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuXG4gIHN0YXRpYyBnZXQgVElNRV8yNF9TSU1QTEUoKSB7XG4gICAgcmV0dXJuIFRJTUVfMjRfU0lNUExFO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAbGluayB0b0xvY2FsZVN0cmluZ30gZm9ybWF0IGxpa2UgJzA5OjMwOjIzJywgYWx3YXlzIDI0LWhvdXIuXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuXG4gIHN0YXRpYyBnZXQgVElNRV8yNF9XSVRIX1NFQ09ORFMoKSB7XG4gICAgcmV0dXJuIFRJTUVfMjRfV0lUSF9TRUNPTkRTO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAbGluayB0b0xvY2FsZVN0cmluZ30gZm9ybWF0IGxpa2UgJzA5OjMwOjIzIEVEVCcsIGFsd2F5cyAyNC1ob3VyLlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cblxuICBzdGF0aWMgZ2V0IFRJTUVfMjRfV0lUSF9TSE9SVF9PRkZTRVQoKSB7XG4gICAgcmV0dXJuIFRJTUVfMjRfV0lUSF9TSE9SVF9PRkZTRVQ7XG4gIH1cblxuICAvKipcbiAgICoge0BsaW5rIHRvTG9jYWxlU3RyaW5nfSBmb3JtYXQgbGlrZSAnMDk6MzA6MjMgRWFzdGVybiBEYXlsaWdodCBUaW1lJywgYWx3YXlzIDI0LWhvdXIuXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuXG4gIHN0YXRpYyBnZXQgVElNRV8yNF9XSVRIX0xPTkdfT0ZGU0VUKCkge1xuICAgIHJldHVybiBUSU1FXzI0X1dJVEhfTE9OR19PRkZTRVQ7XG4gIH1cblxuICAvKipcbiAgICoge0BsaW5rIHRvTG9jYWxlU3RyaW5nfSBmb3JtYXQgbGlrZSAnMTAvMTQvMTk4MywgOTozMCBBTScuIE9ubHkgMTItaG91ciBpZiB0aGUgbG9jYWxlIGlzLlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cblxuICBzdGF0aWMgZ2V0IERBVEVUSU1FX1NIT1JUKCkge1xuICAgIHJldHVybiBEQVRFVElNRV9TSE9SVDtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgdG9Mb2NhbGVTdHJpbmd9IGZvcm1hdCBsaWtlICcxMC8xNC8xOTgzLCA5OjMwOjMzIEFNJy4gT25seSAxMi1ob3VyIGlmIHRoZSBsb2NhbGUgaXMuXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuXG4gIHN0YXRpYyBnZXQgREFURVRJTUVfU0hPUlRfV0lUSF9TRUNPTkRTKCkge1xuICAgIHJldHVybiBEQVRFVElNRV9TSE9SVF9XSVRIX1NFQ09ORFM7XG4gIH1cblxuICAvKipcbiAgICoge0BsaW5rIHRvTG9jYWxlU3RyaW5nfSBmb3JtYXQgbGlrZSAnT2N0IDE0LCAxOTgzLCA5OjMwIEFNJy4gT25seSAxMi1ob3VyIGlmIHRoZSBsb2NhbGUgaXMuXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuXG4gIHN0YXRpYyBnZXQgREFURVRJTUVfTUVEKCkge1xuICAgIHJldHVybiBEQVRFVElNRV9NRUQ7XG4gIH1cblxuICAvKipcbiAgICoge0BsaW5rIHRvTG9jYWxlU3RyaW5nfSBmb3JtYXQgbGlrZSAnT2N0IDE0LCAxOTgzLCA5OjMwOjMzIEFNJy4gT25seSAxMi1ob3VyIGlmIHRoZSBsb2NhbGUgaXMuXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuXG4gIHN0YXRpYyBnZXQgREFURVRJTUVfTUVEX1dJVEhfU0VDT05EUygpIHtcbiAgICByZXR1cm4gREFURVRJTUVfTUVEX1dJVEhfU0VDT05EUztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgdG9Mb2NhbGVTdHJpbmd9IGZvcm1hdCBsaWtlICdGcmksIDE0IE9jdCAxOTgzLCA5OjMwIEFNJy4gT25seSAxMi1ob3VyIGlmIHRoZSBsb2NhbGUgaXMuXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuXG4gIHN0YXRpYyBnZXQgREFURVRJTUVfTUVEX1dJVEhfV0VFS0RBWSgpIHtcbiAgICByZXR1cm4gREFURVRJTUVfTUVEX1dJVEhfV0VFS0RBWTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgdG9Mb2NhbGVTdHJpbmd9IGZvcm1hdCBsaWtlICdPY3RvYmVyIDE0LCAxOTgzLCA5OjMwIEFNIEVEVCcuIE9ubHkgMTItaG91ciBpZiB0aGUgbG9jYWxlIGlzLlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cblxuICBzdGF0aWMgZ2V0IERBVEVUSU1FX0ZVTEwoKSB7XG4gICAgcmV0dXJuIERBVEVUSU1FX0ZVTEw7XG4gIH1cblxuICAvKipcbiAgICoge0BsaW5rIHRvTG9jYWxlU3RyaW5nfSBmb3JtYXQgbGlrZSAnT2N0b2JlciAxNCwgMTk4MywgOTozMDozMyBBTSBFRFQnLiBPbmx5IDEyLWhvdXIgaWYgdGhlIGxvY2FsZSBpcy5cbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG5cbiAgc3RhdGljIGdldCBEQVRFVElNRV9GVUxMX1dJVEhfU0VDT05EUygpIHtcbiAgICByZXR1cm4gREFURVRJTUVfRlVMTF9XSVRIX1NFQ09ORFM7XG4gIH1cblxuICAvKipcbiAgICoge0BsaW5rIHRvTG9jYWxlU3RyaW5nfSBmb3JtYXQgbGlrZSAnRnJpZGF5LCBPY3RvYmVyIDE0LCAxOTgzLCA5OjMwIEFNIEVhc3Rlcm4gRGF5bGlnaHQgVGltZScuIE9ubHkgMTItaG91ciBpZiB0aGUgbG9jYWxlIGlzLlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cblxuICBzdGF0aWMgZ2V0IERBVEVUSU1FX0hVR0UoKSB7XG4gICAgcmV0dXJuIERBVEVUSU1FX0hVR0U7XG4gIH1cblxuICAvKipcbiAgICoge0BsaW5rIHRvTG9jYWxlU3RyaW5nfSBmb3JtYXQgbGlrZSAnRnJpZGF5LCBPY3RvYmVyIDE0LCAxOTgzLCA5OjMwOjMzIEFNIEVhc3Rlcm4gRGF5bGlnaHQgVGltZScuIE9ubHkgMTItaG91ciBpZiB0aGUgbG9jYWxlIGlzLlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cblxuICBzdGF0aWMgZ2V0IERBVEVUSU1FX0hVR0VfV0lUSF9TRUNPTkRTKCkge1xuICAgIHJldHVybiBEQVRFVElNRV9IVUdFX1dJVEhfU0VDT05EUztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIERhdGVUaW1lIGlzIHZhbGlkLiBJbnZhbGlkIERhdGVUaW1lcyBvY2N1ciB3aGVuOlxuICAgKiAqIFRoZSBEYXRlVGltZSB3YXMgY3JlYXRlZCBmcm9tIGludmFsaWQgY2FsZW5kYXIgaW5mb3JtYXRpb24sIHN1Y2ggYXMgdGhlIDEzdGggbW9udGggb3IgRmVicnVhcnkgMzBcbiAgICogKiBUaGUgRGF0ZVRpbWUgd2FzIGNyZWF0ZWQgYnkgYW4gb3BlcmF0aW9uIG9uIGFub3RoZXIgaW52YWxpZCBkYXRlXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cblxuICBnZXQgaXNWYWxpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnZhbGlkID09PSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gZXJyb3IgY29kZSBpZiB0aGlzIERhdGVUaW1lIGlzIGludmFsaWQsIG9yIG51bGwgaWYgdGhlIERhdGVUaW1lIGlzIHZhbGlkXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuXG4gIGdldCBpbnZhbGlkUmVhc29uKCkge1xuICAgIHJldHVybiB0aGlzLmludmFsaWQgPyB0aGlzLmludmFsaWQucmVhc29uIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGV4cGxhbmF0aW9uIG9mIHdoeSB0aGlzIERhdGVUaW1lIGJlY2FtZSBpbnZhbGlkLCBvciBudWxsIGlmIHRoZSBEYXRlVGltZSBpcyB2YWxpZFxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cblxuICBnZXQgaW52YWxpZEV4cGxhbmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmludmFsaWQgPyB0aGlzLmludmFsaWQuZXhwbGFuYXRpb24gOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbG9jYWxlIG9mIGEgRGF0ZVRpbWUsIHN1Y2ggJ2VuLUdCJy4gVGhlIGxvY2FsZSBpcyB1c2VkIHdoZW4gZm9ybWF0dGluZyB0aGUgRGF0ZVRpbWVcbiAgICpcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG5cbiAgZ2V0IGxvY2FsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy5sb2MubG9jYWxlIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG51bWJlcmluZyBzeXN0ZW0gb2YgYSBEYXRlVGltZSwgc3VjaCAnYmVuZycuIFRoZSBudW1iZXJpbmcgc3lzdGVtIGlzIHVzZWQgd2hlbiBmb3JtYXR0aW5nIHRoZSBEYXRlVGltZVxuICAgKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cblxuICBnZXQgbnVtYmVyaW5nU3lzdGVtKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLmxvYy5udW1iZXJpbmdTeXN0ZW0gOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgb3V0cHV0IGNhbGVuZGFyIG9mIGEgRGF0ZVRpbWUsIHN1Y2ggJ2lzbGFtaWMnLiBUaGUgb3V0cHV0IGNhbGVuZGFyIGlzIHVzZWQgd2hlbiBmb3JtYXR0aW5nIHRoZSBEYXRlVGltZVxuICAgKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cblxuICBnZXQgb3V0cHV0Q2FsZW5kYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMubG9jLm91dHB1dENhbGVuZGFyIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHRpbWUgem9uZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBEYXRlVGltZS5cbiAgICogQHR5cGUge1pvbmV9XG4gICAqL1xuXG4gIGdldCB6b25lKCkge1xuICAgIHJldHVybiB0aGlzLl96b25lO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbmFtZSBvZiB0aGUgdGltZSB6b25lLlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cblxuICBnZXQgem9uZU5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMuem9uZS5uYW1lIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHllYXJcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgNSwgMjUpLnllYXIgLy89PiAyMDE3XG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuXG4gIGdldCB5ZWFyKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLmMueWVhciA6IE5hTjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHF1YXJ0ZXJcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgNSwgMjUpLnF1YXJ0ZXIgLy89PiAyXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuXG4gIGdldCBxdWFydGVyKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyBNYXRoLmNlaWwodGhpcy5jLm1vbnRoIC8gMykgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtb250aCAoMS0xMikuXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcsIDUsIDI1KS5tb250aCAvLz0+IDVcbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG5cbiAgZ2V0IG1vbnRoKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLmMubW9udGggOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkYXkgb2YgdGhlIG1vbnRoICgxLTMwaXNoKS5cbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgNSwgMjUpLmRheSAvLz0+IDI1XG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuXG4gIGdldCBkYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMuYy5kYXkgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBob3VyIG9mIHRoZSBkYXkgKDAtMjMpLlxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgyMDE3LCA1LCAyNSwgOSkuaG91ciAvLz0+IDlcbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG5cbiAgZ2V0IGhvdXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMuYy5ob3VyIDogTmFOO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWludXRlIG9mIHRoZSBob3VyICgwLTU5KS5cbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgNSwgMjUsIDksIDMwKS5taW51dGUgLy89PiAzMFxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cblxuICBnZXQgbWludXRlKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLmMubWludXRlIDogTmFOO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc2Vjb25kIG9mIHRoZSBtaW51dGUgKDAtNTkpLlxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgyMDE3LCA1LCAyNSwgOSwgMzAsIDUyKS5zZWNvbmQgLy89PiA1MlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cblxuICBnZXQgc2Vjb25kKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLmMuc2Vjb25kIDogTmFOO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWlsbGlzZWNvbmQgb2YgdGhlIHNlY29uZCAoMC05OTkpLlxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgyMDE3LCA1LCAyNSwgOSwgMzAsIDUyLCA2NTQpLm1pbGxpc2Vjb25kIC8vPT4gNjU0XG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuXG4gIGdldCBtaWxsaXNlY29uZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy5jLm1pbGxpc2Vjb25kIDogTmFOO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgd2VlayB5ZWFyXG4gICAqIEBzZWUgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgyMDE0LCAxMSwgMzEpLndlZWtZZWFyIC8vPT4gMjAxNVxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cblxuICBnZXQgd2Vla1llYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHBvc3NpYmx5Q2FjaGVkV2Vla0RhdGEodGhpcykud2Vla1llYXIgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB3ZWVrIG51bWJlciBvZiB0aGUgd2VlayB5ZWFyICgxLTUyaXNoKS5cbiAgICogQHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcsIDUsIDI1KS53ZWVrTnVtYmVyIC8vPT4gMjFcbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG5cbiAgZ2V0IHdlZWtOdW1iZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHBvc3NpYmx5Q2FjaGVkV2Vla0RhdGEodGhpcykud2Vla051bWJlciA6IE5hTjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRheSBvZiB0aGUgd2Vlay5cbiAgICogMSBpcyBNb25kYXkgYW5kIDcgaXMgU3VuZGF5XG4gICAqIEBzZWUgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgyMDE0LCAxMSwgMzEpLndlZWtkYXkgLy89PiA0XG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuXG4gIGdldCB3ZWVrZGF5KCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyBwb3NzaWJseUNhY2hlZFdlZWtEYXRhKHRoaXMpLndlZWtkYXkgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBvcmRpbmFsIChtZWFuaW5nIHRoZSBkYXkgb2YgdGhlIHllYXIpXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcsIDUsIDI1KS5vcmRpbmFsIC8vPT4gMTQ1XG4gICAqIEB0eXBlIHtudW1iZXJ8RGF0ZVRpbWV9XG4gICAqL1xuXG4gIGdldCBvcmRpbmFsKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyBncmVnb3JpYW5Ub09yZGluYWwodGhpcy5jKS5vcmRpbmFsIDogTmFOO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaHVtYW4gcmVhZGFibGUgc2hvcnQgbW9udGggbmFtZSwgc3VjaCBhcyAnT2N0Jy5cbiAgICogRGVmYXVsdHMgdG8gdGhlIHN5c3RlbSdzIGxvY2FsZSBpZiBubyBsb2NhbGUgaGFzIGJlZW4gc3BlY2lmaWVkXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcsIDEwLCAzMCkubW9udGhTaG9ydCAvLz0+IE9jdFxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cblxuICBnZXQgbW9udGhTaG9ydCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkXG4gICAgICA/IEluZm8ubW9udGhzKCdzaG9ydCcsIHtcbiAgICAgICAgICBsb2NhbGU6IHRoaXMubG9jYWxlLFxuICAgICAgICB9KVt0aGlzLm1vbnRoIC0gMV1cbiAgICAgIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGh1bWFuIHJlYWRhYmxlIGxvbmcgbW9udGggbmFtZSwgc3VjaCBhcyAnT2N0b2JlcicuXG4gICAqIERlZmF1bHRzIHRvIHRoZSBzeXN0ZW0ncyBsb2NhbGUgaWYgbm8gbG9jYWxlIGhhcyBiZWVuIHNwZWNpZmllZFxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgyMDE3LCAxMCwgMzApLm1vbnRoTG9uZyAvLz0+IE9jdG9iZXJcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG5cbiAgZ2V0IG1vbnRoTG9uZygpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkXG4gICAgICA/IEluZm8ubW9udGhzKCdsb25nJywge1xuICAgICAgICAgIGxvY2FsZTogdGhpcy5sb2NhbGUsXG4gICAgICAgIH0pW3RoaXMubW9udGggLSAxXVxuICAgICAgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaHVtYW4gcmVhZGFibGUgc2hvcnQgd2Vla2RheSwgc3VjaCBhcyAnTW9uJy5cbiAgICogRGVmYXVsdHMgdG8gdGhlIHN5c3RlbSdzIGxvY2FsZSBpZiBubyBsb2NhbGUgaGFzIGJlZW4gc3BlY2lmaWVkXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcsIDEwLCAzMCkud2Vla2RheVNob3J0IC8vPT4gTW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuXG4gIGdldCB3ZWVrZGF5U2hvcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZFxuICAgICAgPyBJbmZvLndlZWtkYXlzKCdzaG9ydCcsIHtcbiAgICAgICAgICBsb2NhbGU6IHRoaXMubG9jYWxlLFxuICAgICAgICB9KVt0aGlzLndlZWtkYXkgLSAxXVxuICAgICAgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaHVtYW4gcmVhZGFibGUgbG9uZyB3ZWVrZGF5LCBzdWNoIGFzICdNb25kYXknLlxuICAgKiBEZWZhdWx0cyB0byB0aGUgc3lzdGVtJ3MgbG9jYWxlIGlmIG5vIGxvY2FsZSBoYXMgYmVlbiBzcGVjaWZpZWRcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgMTAsIDMwKS53ZWVrZGF5TG9uZyAvLz0+IE1vbmRheVxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cblxuICBnZXQgd2Vla2RheUxvbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZFxuICAgICAgPyBJbmZvLndlZWtkYXlzKCdsb25nJywge1xuICAgICAgICAgIGxvY2FsZTogdGhpcy5sb2NhbGUsXG4gICAgICAgIH0pW3RoaXMud2Vla2RheSAtIDFdXG4gICAgICA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBVVEMgb2Zmc2V0IG9mIHRoaXMgRGF0ZVRpbWUgaW4gbWludXRlc1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgpLm9mZnNldCAvLz0+IC0yNDBcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUudXRjKCkub2Zmc2V0IC8vPT4gMFxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cblxuICBnZXQgb2Zmc2V0KCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyArdGhpcy5vIDogTmFOO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc2hvcnQgaHVtYW4gbmFtZSBmb3IgdGhlIHpvbmUncyBjdXJyZW50IG9mZnNldCwgZm9yIGV4YW1wbGUgXCJFU1RcIiBvciBcIkVEVFwiLlxuICAgKiBEZWZhdWx0cyB0byB0aGUgc3lzdGVtJ3MgbG9jYWxlIGlmIG5vIGxvY2FsZSBoYXMgYmVlbiBzcGVjaWZpZWRcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG5cbiAgZ2V0IG9mZnNldE5hbWVTaG9ydCgpIHtcbiAgICBpZiAodGhpcy5pc1ZhbGlkKSB7XG4gICAgICByZXR1cm4gdGhpcy56b25lLm9mZnNldE5hbWUodGhpcy50cywge1xuICAgICAgICBmb3JtYXQ6ICdzaG9ydCcsXG4gICAgICAgIGxvY2FsZTogdGhpcy5sb2NhbGUsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbG9uZyBodW1hbiBuYW1lIGZvciB0aGUgem9uZSdzIGN1cnJlbnQgb2Zmc2V0LCBmb3IgZXhhbXBsZSBcIkVhc3Rlcm4gU3RhbmRhcmQgVGltZVwiIG9yIFwiRWFzdGVybiBEYXlsaWdodCBUaW1lXCIuXG4gICAqIERlZmF1bHRzIHRvIHRoZSBzeXN0ZW0ncyBsb2NhbGUgaWYgbm8gbG9jYWxlIGhhcyBiZWVuIHNwZWNpZmllZFxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cblxuICBnZXQgb2Zmc2V0TmFtZUxvbmcoKSB7XG4gICAgaWYgKHRoaXMuaXNWYWxpZCkge1xuICAgICAgcmV0dXJuIHRoaXMuem9uZS5vZmZzZXROYW1lKHRoaXMudHMsIHtcbiAgICAgICAgZm9ybWF0OiAnbG9uZycsXG4gICAgICAgIGxvY2FsZTogdGhpcy5sb2NhbGUsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB3aGV0aGVyIHRoaXMgem9uZSdzIG9mZnNldCBldmVyIGNoYW5nZXMsIGFzIGluIGEgRFNULlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG5cbiAgZ2V0IGlzT2Zmc2V0Rml4ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMuem9uZS51bml2ZXJzYWwgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB3aGV0aGVyIHRoZSBEYXRlVGltZSBpcyBpbiBhIERTVC5cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuXG4gIGdldCBpc0luRFNUKCkge1xuICAgIGlmICh0aGlzLmlzT2Zmc2V0Rml4ZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgdGhpcy5vZmZzZXQgPlxuICAgICAgICAgIHRoaXMuc2V0KHtcbiAgICAgICAgICAgIG1vbnRoOiAxLFxuICAgICAgICAgIH0pLm9mZnNldCB8fFxuICAgICAgICB0aGlzLm9mZnNldCA+XG4gICAgICAgICAgdGhpcy5zZXQoe1xuICAgICAgICAgICAgbW9udGg6IDUsXG4gICAgICAgICAgfSkub2Zmc2V0XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBEYXRlVGltZSBpcyBpbiBhIGxlYXAgeWVhciwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTYpLmlzSW5MZWFwWWVhciAvLz0+IHRydWVcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxMykuaXNJbkxlYXBZZWFyIC8vPT4gZmFsc2VcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuXG4gIGdldCBpc0luTGVhcFllYXIoKSB7XG4gICAgcmV0dXJuIGlzTGVhcFllYXIodGhpcy55ZWFyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGlzIERhdGVUaW1lJ3MgbW9udGhcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNiwgMikuZGF5c0luTW9udGggLy89PiAyOVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgyMDE2LCAzKS5kYXlzSW5Nb250aCAvLz0+IDMxXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuXG4gIGdldCBkYXlzSW5Nb250aCgpIHtcbiAgICByZXR1cm4gZGF5c0luTW9udGgodGhpcy55ZWFyLCB0aGlzLm1vbnRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGlzIERhdGVUaW1lJ3MgeWVhclxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgyMDE2KS5kYXlzSW5ZZWFyIC8vPT4gMzY2XG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTMpLmRheXNJblllYXIgLy89PiAzNjVcbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG5cbiAgZ2V0IGRheXNJblllYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IGRheXNJblllYXIodGhpcy55ZWFyKSA6IE5hTjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2Ygd2Vla3MgaW4gdGhpcyBEYXRlVGltZSdzIHllYXJcbiAgICogQHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMDQpLndlZWtzSW5XZWVrWWVhciAvLz0+IDUzXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTMpLndlZWtzSW5XZWVrWWVhciAvLz0+IDUyXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuXG4gIGdldCB3ZWVrc0luV2Vla1llYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHdlZWtzSW5XZWVrWWVhcih0aGlzLndlZWtZZWFyKSA6IE5hTjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBsb2NhbCBEYXRlVGltZVxuICAgKiBAcGFyYW0ge251bWJlcn0gW3llYXJdIC0gVGhlIGNhbGVuZGFyIHllYXIuIElmIG9taXR0ZWQgKGFzIGluLCBjYWxsIGBsb2NhbCgpYCB3aXRoIG5vIGFyZ3VtZW50cyksIHRoZSBjdXJyZW50IHRpbWUgd2lsbCBiZSB1c2VkXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbW9udGg9MV0gLSBUaGUgbW9udGgsIDEtaW5kZXhlZFxuICAgKiBAcGFyYW0ge251bWJlcn0gW2RheT0xXSAtIFRoZSBkYXkgb2YgdGhlIG1vbnRoXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbaG91cj0wXSAtIFRoZSBob3VyIG9mIHRoZSBkYXksIGluIDI0LWhvdXIgdGltZVxuICAgKiBAcGFyYW0ge251bWJlcn0gW21pbnV0ZT0wXSAtIFRoZSBtaW51dGUgb2YgdGhlIGhvdXIsIG1lYW5pbmcgYSBudW1iZXIgYmV0d2VlbiAwIGFuZCA1OVxuICAgKiBAcGFyYW0ge251bWJlcn0gW3NlY29uZD0wXSAtIFRoZSBzZWNvbmQgb2YgdGhlIG1pbnV0ZSwgbWVhbmluZyBhIG51bWJlciBiZXR3ZWVuIDAgYW5kIDU5XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbWlsbGlzZWNvbmQ9MF0gLSBUaGUgbWlsbGlzZWNvbmQgb2YgdGhlIHNlY29uZCwgbWVhbmluZyBhIG51bWJlciBiZXR3ZWVuIDAgYW5kIDk5OVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgpICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfj4gbm93XG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcpICAgICAgICAgICAgICAgICAgICAgICAgLy9+PiAyMDE3LTAxLTAxVDAwOjAwOjAwXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcsIDMpICAgICAgICAgICAgICAgICAgICAgLy9+PiAyMDE3LTAzLTAxVDAwOjAwOjAwXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcsIDMsIDEyKSAgICAgICAgICAgICAgICAgLy9+PiAyMDE3LTAzLTEyVDAwOjAwOjAwXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcsIDMsIDEyLCA1KSAgICAgICAgICAgICAgLy9+PiAyMDE3LTAzLTEyVDA1OjAwOjAwXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcsIDMsIDEyLCA1LCA0NSkgICAgICAgICAgLy9+PiAyMDE3LTAzLTEyVDA1OjQ1OjAwXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcsIDMsIDEyLCA1LCA0NSwgMTApICAgICAgLy9+PiAyMDE3LTAzLTEyVDA1OjQ1OjEwXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcsIDMsIDEyLCA1LCA0NSwgMTAsIDc2NSkgLy9+PiAyMDE3LTAzLTEyVDA1OjQ1OjEwLjc2NVxuICAgKiBAcmV0dXJuIHtEYXRlVGltZX1cbiAgICovXG5cbiAgc3RhdGljIGxvY2FsKHllYXIsIG1vbnRoLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBtaWxsaXNlY29uZCkge1xuICAgIGlmIChpc1VuZGVmaW5lZCh5ZWFyKSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlVGltZSh7XG4gICAgICAgIHRzOiBTZXR0aW5ncy5ub3coKSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcXVpY2tEVChcbiAgICAgICAge1xuICAgICAgICAgIHllYXIsXG4gICAgICAgICAgbW9udGgsXG4gICAgICAgICAgZGF5LFxuICAgICAgICAgIGhvdXIsXG4gICAgICAgICAgbWludXRlLFxuICAgICAgICAgIHNlY29uZCxcbiAgICAgICAgICBtaWxsaXNlY29uZCxcbiAgICAgICAgfSxcbiAgICAgICAgU2V0dGluZ3MuZGVmYXVsdFpvbmUsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBEYXRlVGltZSBpbiBVVENcbiAgICogQHBhcmFtIHtudW1iZXJ9IFt5ZWFyXSAtIFRoZSBjYWxlbmRhciB5ZWFyLiBJZiBvbWl0dGVkIChhcyBpbiwgY2FsbCBgdXRjKClgIHdpdGggbm8gYXJndW1lbnRzKSwgdGhlIGN1cnJlbnQgdGltZSB3aWxsIGJlIHVzZWRcbiAgICogQHBhcmFtIHtudW1iZXJ9IFttb250aD0xXSAtIFRoZSBtb250aCwgMS1pbmRleGVkXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbZGF5PTFdIC0gVGhlIGRheSBvZiB0aGUgbW9udGhcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtob3VyPTBdIC0gVGhlIGhvdXIgb2YgdGhlIGRheSwgaW4gMjQtaG91ciB0aW1lXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbWludXRlPTBdIC0gVGhlIG1pbnV0ZSBvZiB0aGUgaG91ciwgbWVhbmluZyBhIG51bWJlciBiZXR3ZWVuIDAgYW5kIDU5XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbc2Vjb25kPTBdIC0gVGhlIHNlY29uZCBvZiB0aGUgbWludXRlLCBtZWFuaW5nIGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgNTlcbiAgICogQHBhcmFtIHtudW1iZXJ9IFttaWxsaXNlY29uZD0wXSAtIFRoZSBtaWxsaXNlY29uZCBvZiB0aGUgc2Vjb25kLCBtZWFuaW5nIGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgOTk5XG4gICAqIEBleGFtcGxlIERhdGVUaW1lLnV0YygpICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfj4gbm93XG4gICAqIEBleGFtcGxlIERhdGVUaW1lLnV0YygyMDE3KSAgICAgICAgICAgICAgICAgICAgICAgIC8vfj4gMjAxNy0wMS0wMVQwMDowMDowMFpcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUudXRjKDIwMTcsIDMpICAgICAgICAgICAgICAgICAgICAgLy9+PiAyMDE3LTAzLTAxVDAwOjAwOjAwWlxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS51dGMoMjAxNywgMywgMTIpICAgICAgICAgICAgICAgICAvL34+IDIwMTctMDMtMTJUMDA6MDA6MDBaXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLnV0YygyMDE3LCAzLCAxMiwgNSkgICAgICAgICAgICAgIC8vfj4gMjAxNy0wMy0xMlQwNTowMDowMFpcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUudXRjKDIwMTcsIDMsIDEyLCA1LCA0NSkgICAgICAgICAgLy9+PiAyMDE3LTAzLTEyVDA1OjQ1OjAwWlxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS51dGMoMjAxNywgMywgMTIsIDUsIDQ1LCAxMCkgICAgICAvL34+IDIwMTctMDMtMTJUMDU6NDU6MTBaXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLnV0YygyMDE3LCAzLCAxMiwgNSwgNDUsIDEwLCA3NjUpIC8vfj4gMjAxNy0wMy0xMlQwNTo0NToxMC43NjVaXG4gICAqIEByZXR1cm4ge0RhdGVUaW1lfVxuICAgKi9cblxuICBzdGF0aWMgdXRjKHllYXIsIG1vbnRoLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBtaWxsaXNlY29uZCkge1xuICAgIGlmIChpc1VuZGVmaW5lZCh5ZWFyKSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlVGltZSh7XG4gICAgICAgIHRzOiBTZXR0aW5ncy5ub3coKSxcbiAgICAgICAgem9uZTogRml4ZWRPZmZzZXRab25lLnV0Y0luc3RhbmNlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBxdWlja0RUKFxuICAgICAgICB7XG4gICAgICAgICAgeWVhcixcbiAgICAgICAgICBtb250aCxcbiAgICAgICAgICBkYXksXG4gICAgICAgICAgaG91cixcbiAgICAgICAgICBtaW51dGUsXG4gICAgICAgICAgc2Vjb25kLFxuICAgICAgICAgIG1pbGxpc2Vjb25kLFxuICAgICAgICB9LFxuICAgICAgICBGaXhlZE9mZnNldFpvbmUudXRjSW5zdGFuY2UsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBEYXRlVGltZSBmcm9tIGEgSmF2YXNjcmlwdCBEYXRlIG9iamVjdC4gVXNlcyB0aGUgZGVmYXVsdCB6b25lLlxuICAgKiBAcGFyYW0ge0RhdGV9IGRhdGUgLSBhIEphdmFzY3JpcHQgRGF0ZSBvYmplY3RcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBjb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBEYXRlVGltZVxuICAgKiBAcGFyYW0ge3N0cmluZ3xab25lfSBbb3B0aW9ucy56b25lPSdsb2NhbCddIC0gdGhlIHpvbmUgdG8gcGxhY2UgdGhlIERhdGVUaW1lIGludG9cbiAgICogQHJldHVybiB7RGF0ZVRpbWV9XG4gICAqL1xuXG4gIHN0YXRpYyBmcm9tSlNEYXRlKGRhdGUsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHRzID0gaXNEYXRlKGRhdGUpID8gZGF0ZS52YWx1ZU9mKCkgOiBOYU47XG5cbiAgICBpZiAoTnVtYmVyLmlzTmFOKHRzKSkge1xuICAgICAgcmV0dXJuIERhdGVUaW1lLmludmFsaWQoJ2ludmFsaWQgaW5wdXQnKTtcbiAgICB9XG5cbiAgICBjb25zdCB6b25lVG9Vc2UgPSBub3JtYWxpemVab25lKG9wdGlvbnMuem9uZSwgU2V0dGluZ3MuZGVmYXVsdFpvbmUpO1xuXG4gICAgaWYgKCF6b25lVG9Vc2UuaXNWYWxpZCkge1xuICAgICAgcmV0dXJuIERhdGVUaW1lLmludmFsaWQodW5zdXBwb3J0ZWRab25lKHpvbmVUb1VzZSkpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRGF0ZVRpbWUoe1xuICAgICAgdHM6IHRzLFxuICAgICAgem9uZTogem9uZVRvVXNlLFxuICAgICAgbG9jOiBMb2NhbGUuZnJvbU9iamVjdChvcHRpb25zKSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBEYXRlVGltZSBmcm9tIGEgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBzaW5jZSB0aGUgZXBvY2ggKG1lYW5pbmcgc2luY2UgMSBKYW51YXJ5IDE5NzAgMDA6MDA6MDAgVVRDKS4gVXNlcyB0aGUgZGVmYXVsdCB6b25lLlxuICAgKiBAcGFyYW0ge251bWJlcn0gbWlsbGlzZWNvbmRzIC0gYSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHNpbmNlIDE5NzAgVVRDXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgRGF0ZVRpbWVcbiAgICogQHBhcmFtIHtzdHJpbmd8Wm9uZX0gW29wdGlvbnMuem9uZT0nbG9jYWwnXSAtIHRoZSB6b25lIHRvIHBsYWNlIHRoZSBEYXRlVGltZSBpbnRvXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5sb2NhbGVdIC0gYSBsb2NhbGUgdG8gc2V0IG9uIHRoZSByZXN1bHRpbmcgRGF0ZVRpbWUgaW5zdGFuY2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMub3V0cHV0Q2FsZW5kYXIgLSB0aGUgb3V0cHV0IGNhbGVuZGFyIHRvIHNldCBvbiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm51bWJlcmluZ1N5c3RlbSAtIHRoZSBudW1iZXJpbmcgc3lzdGVtIHRvIHNldCBvbiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGluc3RhbmNlXG4gICAqIEByZXR1cm4ge0RhdGVUaW1lfVxuICAgKi9cblxuICBzdGF0aWMgZnJvbU1pbGxpcyhtaWxsaXNlY29uZHMsIG9wdGlvbnMgPSB7fSkge1xuICAgIGlmICghaXNOdW1iZXIobWlsbGlzZWNvbmRzKSkge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEVycm9yKFxuICAgICAgICBgZnJvbU1pbGxpcyByZXF1aXJlcyBhIG51bWVyaWNhbCBpbnB1dCwgYnV0IHJlY2VpdmVkIGEgJHt0eXBlb2YgbWlsbGlzZWNvbmRzfSB3aXRoIHZhbHVlICR7bWlsbGlzZWNvbmRzfWAsXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAobWlsbGlzZWNvbmRzIDwgLU1BWF9EQVRFIHx8IG1pbGxpc2Vjb25kcyA+IE1BWF9EQVRFKSB7XG4gICAgICAvLyB0aGlzIGlzbid0IHBlcmZlY3QgYmVjYXVzZSBiZWNhdXNlIHdlIGNhbiBzdGlsbCBlbmQgdXAgb3V0IG9mIHJhbmdlIGJlY2F1c2Ugb2YgYWRkaXRpb25hbCBzaGlmdGluZywgYnV0IGl0J3MgYSBzdGFydFxuICAgICAgcmV0dXJuIERhdGVUaW1lLmludmFsaWQoJ1RpbWVzdGFtcCBvdXQgb2YgcmFuZ2UnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlVGltZSh7XG4gICAgICAgIHRzOiBtaWxsaXNlY29uZHMsXG4gICAgICAgIHpvbmU6IG5vcm1hbGl6ZVpvbmUob3B0aW9ucy56b25lLCBTZXR0aW5ncy5kZWZhdWx0Wm9uZSksXG4gICAgICAgIGxvYzogTG9jYWxlLmZyb21PYmplY3Qob3B0aW9ucyksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgRGF0ZVRpbWUgZnJvbSBhIG51bWJlciBvZiBzZWNvbmRzIHNpbmNlIHRoZSBlcG9jaCAobWVhbmluZyBzaW5jZSAxIEphbnVhcnkgMTk3MCAwMDowMDowMCBVVEMpLiBVc2VzIHRoZSBkZWZhdWx0IHpvbmUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzZWNvbmRzIC0gYSBudW1iZXIgb2Ygc2Vjb25kcyBzaW5jZSAxOTcwIFVUQ1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIERhdGVUaW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfFpvbmV9IFtvcHRpb25zLnpvbmU9J2xvY2FsJ10gLSB0aGUgem9uZSB0byBwbGFjZSB0aGUgRGF0ZVRpbWUgaW50b1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMubG9jYWxlXSAtIGEgbG9jYWxlIHRvIHNldCBvbiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm91dHB1dENhbGVuZGFyIC0gdGhlIG91dHB1dCBjYWxlbmRhciB0byBzZXQgb24gdGhlIHJlc3VsdGluZyBEYXRlVGltZSBpbnN0YW5jZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5udW1iZXJpbmdTeXN0ZW0gLSB0aGUgbnVtYmVyaW5nIHN5c3RlbSB0byBzZXQgb24gdGhlIHJlc3VsdGluZyBEYXRlVGltZSBpbnN0YW5jZVxuICAgKiBAcmV0dXJuIHtEYXRlVGltZX1cbiAgICovXG5cbiAgc3RhdGljIGZyb21TZWNvbmRzKHNlY29uZHMsIG9wdGlvbnMgPSB7fSkge1xuICAgIGlmICghaXNOdW1iZXIoc2Vjb25kcykpIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFcnJvcignZnJvbVNlY29uZHMgcmVxdWlyZXMgYSBudW1lcmljYWwgaW5wdXQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlVGltZSh7XG4gICAgICAgIHRzOiBzZWNvbmRzICogMTAwMCxcbiAgICAgICAgem9uZTogbm9ybWFsaXplWm9uZShvcHRpb25zLnpvbmUsIFNldHRpbmdzLmRlZmF1bHRab25lKSxcbiAgICAgICAgbG9jOiBMb2NhbGUuZnJvbU9iamVjdChvcHRpb25zKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBEYXRlVGltZSBmcm9tIGEgSmF2YXNjcmlwdCBvYmplY3Qgd2l0aCBrZXlzIGxpa2UgJ3llYXInIGFuZCAnaG91cicgd2l0aCByZWFzb25hYmxlIGRlZmF1bHRzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gdGhlIG9iamVjdCB0byBjcmVhdGUgdGhlIERhdGVUaW1lIGZyb21cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9iai55ZWFyIC0gYSB5ZWFyLCBzdWNoIGFzIDE5ODdcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9iai5tb250aCAtIGEgbW9udGgsIDEtMTJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9iai5kYXkgLSBhIGRheSBvZiB0aGUgbW9udGgsIDEtMzEsIGRlcGVuZGluZyBvbiB0aGUgbW9udGhcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9iai5vcmRpbmFsIC0gZGF5IG9mIHRoZSB5ZWFyLCAxLTM2NSBvciAzNjZcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9iai53ZWVrWWVhciAtIGFuIElTTyB3ZWVrIHllYXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9iai53ZWVrTnVtYmVyIC0gYW4gSVNPIHdlZWsgbnVtYmVyLCBiZXR3ZWVuIDEgYW5kIDUyIG9yIDUzLCBkZXBlbmRpbmcgb24gdGhlIHllYXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9iai53ZWVrZGF5IC0gYW4gSVNPIHdlZWtkYXksIDEtNywgd2hlcmUgMSBpcyBNb25kYXkgYW5kIDcgaXMgU3VuZGF5XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvYmouaG91ciAtIGhvdXIgb2YgdGhlIGRheSwgMC0yM1xuICAgKiBAcGFyYW0ge251bWJlcn0gb2JqLm1pbnV0ZSAtIG1pbnV0ZSBvZiB0aGUgaG91ciwgMC01OVxuICAgKiBAcGFyYW0ge251bWJlcn0gb2JqLnNlY29uZCAtIHNlY29uZCBvZiB0aGUgbWludXRlLCAwLTU5XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvYmoubWlsbGlzZWNvbmQgLSBtaWxsaXNlY29uZCBvZiB0aGUgc2Vjb25kLCAwLTk5OVxuICAgKiBAcGFyYW0ge3N0cmluZ3xab25lfSBbb2JqLnpvbmU9J2xvY2FsJ10gLSBpbnRlcnByZXQgdGhlIG51bWJlcnMgaW4gdGhlIGNvbnRleHQgb2YgYSBwYXJ0aWN1bGFyIHpvbmUuIENhbiB0YWtlIGFueSB2YWx1ZSB0YWtlbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gc2V0Wm9uZSgpXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb2JqLmxvY2FsZT0nc3lzdGVtJ3MgbG9jYWxlJ10gLSBhIGxvY2FsZSB0byBzZXQgb24gdGhlIHJlc3VsdGluZyBEYXRlVGltZSBpbnN0YW5jZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb2JqLm91dHB1dENhbGVuZGFyIC0gdGhlIG91dHB1dCBjYWxlbmRhciB0byBzZXQgb24gdGhlIHJlc3VsdGluZyBEYXRlVGltZSBpbnN0YW5jZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb2JqLm51bWJlcmluZ1N5c3RlbSAtIHRoZSBudW1iZXJpbmcgc3lzdGVtIHRvIHNldCBvbiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGluc3RhbmNlXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmZyb21PYmplY3QoeyB5ZWFyOiAxOTgyLCBtb250aDogNSwgZGF5OiAyNX0pLnRvSVNPRGF0ZSgpIC8vPT4gJzE5ODItMDUtMjUnXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmZyb21PYmplY3QoeyB5ZWFyOiAxOTgyIH0pLnRvSVNPRGF0ZSgpIC8vPT4gJzE5ODItMDEtMDEnXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmZyb21PYmplY3QoeyBob3VyOiAxMCwgbWludXRlOiAyNiwgc2Vjb25kOiA2IH0pIC8vfj4gdG9kYXkgYXQgMTA6MjY6MDZcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUuZnJvbU9iamVjdCh7IGhvdXI6IDEwLCBtaW51dGU6IDI2LCBzZWNvbmQ6IDYsIHpvbmU6ICd1dGMnIH0pLFxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tT2JqZWN0KHsgaG91cjogMTAsIG1pbnV0ZTogMjYsIHNlY29uZDogNiwgem9uZTogJ2xvY2FsJyB9KVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tT2JqZWN0KHsgaG91cjogMTAsIG1pbnV0ZTogMjYsIHNlY29uZDogNiwgem9uZTogJ0FtZXJpY2EvTmV3X1lvcmsnIH0pXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmZyb21PYmplY3QoeyB3ZWVrWWVhcjogMjAxNiwgd2Vla051bWJlcjogMiwgd2Vla2RheTogMyB9KS50b0lTT0RhdGUoKSAvLz0+ICcyMDE2LTAxLTEzJ1xuICAgKiBAcmV0dXJuIHtEYXRlVGltZX1cbiAgICovXG5cbiAgc3RhdGljIGZyb21PYmplY3Qob2JqKSB7XG4gICAgY29uc3Qgem9uZVRvVXNlID0gbm9ybWFsaXplWm9uZShvYmouem9uZSwgU2V0dGluZ3MuZGVmYXVsdFpvbmUpO1xuXG4gICAgaWYgKCF6b25lVG9Vc2UuaXNWYWxpZCkge1xuICAgICAgcmV0dXJuIERhdGVUaW1lLmludmFsaWQodW5zdXBwb3J0ZWRab25lKHpvbmVUb1VzZSkpO1xuICAgIH1cblxuICAgIGNvbnN0IHRzTm93ID0gU2V0dGluZ3Mubm93KCksXG4gICAgICBvZmZzZXRQcm92aXMgPSB6b25lVG9Vc2Uub2Zmc2V0KHRzTm93KSxcbiAgICAgIG5vcm1hbGl6ZWQgPSBub3JtYWxpemVPYmplY3Qob2JqLCBub3JtYWxpemVVbml0LCBbXG4gICAgICAgICd6b25lJyxcbiAgICAgICAgJ2xvY2FsZScsXG4gICAgICAgICdvdXRwdXRDYWxlbmRhcicsXG4gICAgICAgICdudW1iZXJpbmdTeXN0ZW0nLFxuICAgICAgXSksXG4gICAgICBjb250YWluc09yZGluYWwgPSAhaXNVbmRlZmluZWQobm9ybWFsaXplZC5vcmRpbmFsKSxcbiAgICAgIGNvbnRhaW5zR3JlZ29yWWVhciA9ICFpc1VuZGVmaW5lZChub3JtYWxpemVkLnllYXIpLFxuICAgICAgY29udGFpbnNHcmVnb3JNRCA9XG4gICAgICAgICFpc1VuZGVmaW5lZChub3JtYWxpemVkLm1vbnRoKSB8fCAhaXNVbmRlZmluZWQobm9ybWFsaXplZC5kYXkpLFxuICAgICAgY29udGFpbnNHcmVnb3IgPSBjb250YWluc0dyZWdvclllYXIgfHwgY29udGFpbnNHcmVnb3JNRCxcbiAgICAgIGRlZmluaXRlV2Vla0RlZiA9IG5vcm1hbGl6ZWQud2Vla1llYXIgfHwgbm9ybWFsaXplZC53ZWVrTnVtYmVyLFxuICAgICAgbG9jID0gTG9jYWxlLmZyb21PYmplY3Qob2JqKTsgLy8gY2FzZXM6XG4gICAgLy8ganVzdCBhIHdlZWtkYXkgLT4gdGhpcyB3ZWVrJ3MgaW5zdGFuY2Ugb2YgdGhhdCB3ZWVrZGF5LCBubyB3b3JyaWVzXG4gICAgLy8gKGdyZWdvcmlhbiBkYXRhIG9yIG9yZGluYWwpICsgKHdlZWtZZWFyIG9yIHdlZWtOdW1iZXIpIC0+IGVycm9yXG4gICAgLy8gKGdyZWdvcmlhbiBtb250aCBvciBkYXkpICsgb3JkaW5hbCAtPiBlcnJvclxuICAgIC8vIG90aGVyd2lzZSBqdXN0IHVzZSB3ZWVrcyBvciBvcmRpbmFscyBvciBncmVnb3JpYW4sIGRlcGVuZGluZyBvbiB3aGF0J3Mgc3BlY2lmaWVkXG5cbiAgICBpZiAoKGNvbnRhaW5zR3JlZ29yIHx8IGNvbnRhaW5zT3JkaW5hbCkgJiYgZGVmaW5pdGVXZWVrRGVmKSB7XG4gICAgICB0aHJvdyBuZXcgQ29uZmxpY3RpbmdTcGVjaWZpY2F0aW9uRXJyb3IoXG4gICAgICAgIFwiQ2FuJ3QgbWl4IHdlZWtZZWFyL3dlZWtOdW1iZXIgdW5pdHMgd2l0aCB5ZWFyL21vbnRoL2RheSBvciBvcmRpbmFsc1wiLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoY29udGFpbnNHcmVnb3JNRCAmJiBjb250YWluc09yZGluYWwpIHtcbiAgICAgIHRocm93IG5ldyBDb25mbGljdGluZ1NwZWNpZmljYXRpb25FcnJvcihcbiAgICAgICAgXCJDYW4ndCBtaXggb3JkaW5hbCBkYXRlcyB3aXRoIG1vbnRoL2RheVwiLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VXZWVrRGF0YSA9XG4gICAgICBkZWZpbml0ZVdlZWtEZWYgfHwgKG5vcm1hbGl6ZWQud2Vla2RheSAmJiAhY29udGFpbnNHcmVnb3IpOyAvLyBjb25maWd1cmUgb3Vyc2VsdmVzIHRvIGRlYWwgd2l0aCBncmVnb3JpYW4gZGF0ZXMgb3Igd2VlayBzdHVmZlxuXG4gICAgbGV0IHVuaXRzLFxuICAgICAgZGVmYXVsdFZhbHVlcyxcbiAgICAgIG9iak5vdyA9IHRzVG9PYmoodHNOb3csIG9mZnNldFByb3Zpcyk7XG5cbiAgICBpZiAodXNlV2Vla0RhdGEpIHtcbiAgICAgIHVuaXRzID0gb3JkZXJlZFdlZWtVbml0cztcbiAgICAgIGRlZmF1bHRWYWx1ZXMgPSBkZWZhdWx0V2Vla1VuaXRWYWx1ZXM7XG4gICAgICBvYmpOb3cgPSBncmVnb3JpYW5Ub1dlZWsob2JqTm93KTtcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5zT3JkaW5hbCkge1xuICAgICAgdW5pdHMgPSBvcmRlcmVkT3JkaW5hbFVuaXRzO1xuICAgICAgZGVmYXVsdFZhbHVlcyA9IGRlZmF1bHRPcmRpbmFsVW5pdFZhbHVlcztcbiAgICAgIG9iak5vdyA9IGdyZWdvcmlhblRvT3JkaW5hbChvYmpOb3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1bml0cyA9IG9yZGVyZWRVbml0cyQxO1xuICAgICAgZGVmYXVsdFZhbHVlcyA9IGRlZmF1bHRVbml0VmFsdWVzO1xuICAgIH0gLy8gc2V0IGRlZmF1bHQgdmFsdWVzIGZvciBtaXNzaW5nIHN0dWZmXG5cbiAgICBsZXQgZm91bmRGaXJzdCA9IGZhbHNlO1xuXG4gICAgZm9yIChjb25zdCB1IG9mIHVuaXRzKSB7XG4gICAgICBjb25zdCB2ID0gbm9ybWFsaXplZFt1XTtcblxuICAgICAgaWYgKCFpc1VuZGVmaW5lZCh2KSkge1xuICAgICAgICBmb3VuZEZpcnN0ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZm91bmRGaXJzdCkge1xuICAgICAgICBub3JtYWxpemVkW3VdID0gZGVmYXVsdFZhbHVlc1t1XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vcm1hbGl6ZWRbdV0gPSBvYmpOb3dbdV07XG4gICAgICB9XG4gICAgfSAvLyBtYWtlIHN1cmUgdGhlIHZhbHVlcyB3ZSBoYXZlIGFyZSBpbiByYW5nZVxuXG4gICAgY29uc3QgaGlnaGVyT3JkZXJJbnZhbGlkID0gdXNlV2Vla0RhdGFcbiAgICAgICAgPyBoYXNJbnZhbGlkV2Vla0RhdGEobm9ybWFsaXplZClcbiAgICAgICAgOiBjb250YWluc09yZGluYWxcbiAgICAgICAgPyBoYXNJbnZhbGlkT3JkaW5hbERhdGEobm9ybWFsaXplZClcbiAgICAgICAgOiBoYXNJbnZhbGlkR3JlZ29yaWFuRGF0YShub3JtYWxpemVkKSxcbiAgICAgIGludmFsaWQgPSBoaWdoZXJPcmRlckludmFsaWQgfHwgaGFzSW52YWxpZFRpbWVEYXRhKG5vcm1hbGl6ZWQpO1xuXG4gICAgaWYgKGludmFsaWQpIHtcbiAgICAgIHJldHVybiBEYXRlVGltZS5pbnZhbGlkKGludmFsaWQpO1xuICAgIH0gLy8gY29tcHV0ZSB0aGUgYWN0dWFsIHRpbWVcblxuICAgIGNvbnN0IGdyZWdvcmlhbiA9IHVzZVdlZWtEYXRhXG4gICAgICAgID8gd2Vla1RvR3JlZ29yaWFuKG5vcm1hbGl6ZWQpXG4gICAgICAgIDogY29udGFpbnNPcmRpbmFsXG4gICAgICAgID8gb3JkaW5hbFRvR3JlZ29yaWFuKG5vcm1hbGl6ZWQpXG4gICAgICAgIDogbm9ybWFsaXplZCxcbiAgICAgIFt0c0ZpbmFsLCBvZmZzZXRGaW5hbF0gPSBvYmpUb1RTKGdyZWdvcmlhbiwgb2Zmc2V0UHJvdmlzLCB6b25lVG9Vc2UpLFxuICAgICAgaW5zdCA9IG5ldyBEYXRlVGltZSh7XG4gICAgICAgIHRzOiB0c0ZpbmFsLFxuICAgICAgICB6b25lOiB6b25lVG9Vc2UsXG4gICAgICAgIG86IG9mZnNldEZpbmFsLFxuICAgICAgICBsb2MsXG4gICAgICB9KTsgLy8gZ3JlZ29yaWFuIGRhdGEgKyB3ZWVrZGF5IHNlcnZlcyBvbmx5IHRvIHZhbGlkYXRlXG5cbiAgICBpZiAobm9ybWFsaXplZC53ZWVrZGF5ICYmIGNvbnRhaW5zR3JlZ29yICYmIG9iai53ZWVrZGF5ICE9PSBpbnN0LndlZWtkYXkpIHtcbiAgICAgIHJldHVybiBEYXRlVGltZS5pbnZhbGlkKFxuICAgICAgICAnbWlzbWF0Y2hlZCB3ZWVrZGF5JyxcbiAgICAgICAgYHlvdSBjYW4ndCBzcGVjaWZ5IGJvdGggYSB3ZWVrZGF5IG9mICR7XG4gICAgICAgICAgbm9ybWFsaXplZC53ZWVrZGF5XG4gICAgICAgIH0gYW5kIGEgZGF0ZSBvZiAke2luc3QudG9JU08oKX1gLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBEYXRlVGltZSBmcm9tIGFuIElTTyA4NjAxIHN0cmluZ1xuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIHRoZSBJU08gc3RyaW5nXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0aW9ucyB0byBhZmZlY3QgdGhlIGNyZWF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfFpvbmV9IFtvcHRzLnpvbmU9J2xvY2FsJ10gLSB1c2UgdGhpcyB6b25lIGlmIG5vIG9mZnNldCBpcyBzcGVjaWZpZWQgaW4gdGhlIGlucHV0IHN0cmluZyBpdHNlbGYuIFdpbGwgYWxzbyBjb252ZXJ0IHRoZSB0aW1lIHRvIHRoaXMgem9uZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLnNldFpvbmU9ZmFsc2VdIC0gb3ZlcnJpZGUgdGhlIHpvbmUgd2l0aCBhIGZpeGVkLW9mZnNldCB6b25lIHNwZWNpZmllZCBpbiB0aGUgc3RyaW5nIGl0c2VsZiwgaWYgaXQgc3BlY2lmaWVzIG9uZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMubG9jYWxlPSdzeXN0ZW0ncyBsb2NhbGUnXSAtIGEgbG9jYWxlIHRvIHNldCBvbiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLm91dHB1dENhbGVuZGFyIC0gdGhlIG91dHB1dCBjYWxlbmRhciB0byBzZXQgb24gdGhlIHJlc3VsdGluZyBEYXRlVGltZSBpbnN0YW5jZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5udW1iZXJpbmdTeXN0ZW0gLSB0aGUgbnVtYmVyaW5nIHN5c3RlbSB0byBzZXQgb24gdGhlIHJlc3VsdGluZyBEYXRlVGltZSBpbnN0YW5jZVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tSVNPKCcyMDE2LTA1LTI1VDA5OjA4OjM0LjEyMycpXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmZyb21JU08oJzIwMTYtMDUtMjVUMDk6MDg6MzQuMTIzKzA2OjAwJylcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUuZnJvbUlTTygnMjAxNi0wNS0yNVQwOTowODozNC4xMjMrMDY6MDAnLCB7c2V0Wm9uZTogdHJ1ZX0pXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmZyb21JU08oJzIwMTYtMDUtMjVUMDk6MDg6MzQuMTIzJywge3pvbmU6ICd1dGMnfSlcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUuZnJvbUlTTygnMjAxNi1XMDUtNCcpXG4gICAqIEByZXR1cm4ge0RhdGVUaW1lfVxuICAgKi9cblxuICBzdGF0aWMgZnJvbUlTTyh0ZXh0LCBvcHRzID0ge30pIHtcbiAgICBjb25zdCBbdmFscywgcGFyc2VkWm9uZV0gPSBwYXJzZUlTT0RhdGUodGV4dCk7XG4gICAgcmV0dXJuIHBhcnNlRGF0YVRvRGF0ZVRpbWUodmFscywgcGFyc2VkWm9uZSwgb3B0cywgJ0lTTyA4NjAxJywgdGV4dCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgRGF0ZVRpbWUgZnJvbSBhbiBSRkMgMjgyMiBzdHJpbmdcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSB0aGUgUkZDIDI4MjIgc3RyaW5nXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0aW9ucyB0byBhZmZlY3QgdGhlIGNyZWF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfFpvbmV9IFtvcHRzLnpvbmU9J2xvY2FsJ10gLSBjb252ZXJ0IHRoZSB0aW1lIHRvIHRoaXMgem9uZS4gU2luY2UgdGhlIG9mZnNldCBpcyBhbHdheXMgc3BlY2lmaWVkIGluIHRoZSBzdHJpbmcgaXRzZWxmLCB0aGlzIGhhcyBubyBlZmZlY3Qgb24gdGhlIGludGVycHJldGF0aW9uIG9mIHN0cmluZywgbWVyZWx5IHRoZSB6b25lIHRoZSByZXN1bHRpbmcgRGF0ZVRpbWUgaXMgZXhwcmVzc2VkIGluLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLnNldFpvbmU9ZmFsc2VdIC0gb3ZlcnJpZGUgdGhlIHpvbmUgd2l0aCBhIGZpeGVkLW9mZnNldCB6b25lIHNwZWNpZmllZCBpbiB0aGUgc3RyaW5nIGl0c2VsZiwgaWYgaXQgc3BlY2lmaWVzIG9uZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMubG9jYWxlPSdzeXN0ZW0ncyBsb2NhbGUnXSAtIGEgbG9jYWxlIHRvIHNldCBvbiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLm91dHB1dENhbGVuZGFyIC0gdGhlIG91dHB1dCBjYWxlbmRhciB0byBzZXQgb24gdGhlIHJlc3VsdGluZyBEYXRlVGltZSBpbnN0YW5jZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5udW1iZXJpbmdTeXN0ZW0gLSB0aGUgbnVtYmVyaW5nIHN5c3RlbSB0byBzZXQgb24gdGhlIHJlc3VsdGluZyBEYXRlVGltZSBpbnN0YW5jZVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tUkZDMjgyMignMjUgTm92IDIwMTYgMTM6MjM6MTIgR01UJylcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUuZnJvbVJGQzI4MjIoJ0ZyaSwgMjUgTm92IDIwMTYgMTM6MjM6MTIgKzA2MDAnKVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tUkZDMjgyMignMjUgTm92IDIwMTYgMTM6MjMgWicpXG4gICAqIEByZXR1cm4ge0RhdGVUaW1lfVxuICAgKi9cblxuICBzdGF0aWMgZnJvbVJGQzI4MjIodGV4dCwgb3B0cyA9IHt9KSB7XG4gICAgY29uc3QgW3ZhbHMsIHBhcnNlZFpvbmVdID0gcGFyc2VSRkMyODIyRGF0ZSh0ZXh0KTtcbiAgICByZXR1cm4gcGFyc2VEYXRhVG9EYXRlVGltZSh2YWxzLCBwYXJzZWRab25lLCBvcHRzLCAnUkZDIDI4MjInLCB0ZXh0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBEYXRlVGltZSBmcm9tIGFuIEhUVFAgaGVhZGVyIGRhdGVcbiAgICogQHNlZSBodHRwczovL3d3dy53My5vcmcvUHJvdG9jb2xzL3JmYzI2MTYvcmZjMjYxNi1zZWMzLmh0bWwjc2VjMy4zLjFcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSB0aGUgSFRUUCBoZWFkZXIgZGF0ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnMgdG8gYWZmZWN0IHRoZSBjcmVhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ3xab25lfSBbb3B0cy56b25lPSdsb2NhbCddIC0gY29udmVydCB0aGUgdGltZSB0byB0aGlzIHpvbmUuIFNpbmNlIEhUVFAgZGF0ZXMgYXJlIGFsd2F5cyBpbiBVVEMsIHRoaXMgaGFzIG5vIGVmZmVjdCBvbiB0aGUgaW50ZXJwcmV0YXRpb24gb2Ygc3RyaW5nLCBtZXJlbHkgdGhlIHpvbmUgdGhlIHJlc3VsdGluZyBEYXRlVGltZSBpcyBleHByZXNzZWQgaW4uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdHMuc2V0Wm9uZT1mYWxzZV0gLSBvdmVycmlkZSB0aGUgem9uZSB3aXRoIHRoZSBmaXhlZC1vZmZzZXQgem9uZSBzcGVjaWZpZWQgaW4gdGhlIHN0cmluZy4gRm9yIEhUVFAgZGF0ZXMsIHRoaXMgaXMgYWx3YXlzIFVUQywgc28gdGhpcyBvcHRpb24gaXMgZXF1aXZhbGVudCB0byBzZXR0aW5nIHRoZSBgem9uZWAgb3B0aW9uIHRvICd1dGMnLCBidXQgdGhpcyBvcHRpb24gaXMgaW5jbHVkZWQgZm9yIGNvbnNpc3RlbmN5IHdpdGggc2ltaWxhciBtZXRob2RzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMubG9jYWxlPSdzeXN0ZW0ncyBsb2NhbGUnXSAtIGEgbG9jYWxlIHRvIHNldCBvbiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLm91dHB1dENhbGVuZGFyIC0gdGhlIG91dHB1dCBjYWxlbmRhciB0byBzZXQgb24gdGhlIHJlc3VsdGluZyBEYXRlVGltZSBpbnN0YW5jZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5udW1iZXJpbmdTeXN0ZW0gLSB0aGUgbnVtYmVyaW5nIHN5c3RlbSB0byBzZXQgb24gdGhlIHJlc3VsdGluZyBEYXRlVGltZSBpbnN0YW5jZVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tSFRUUCgnU3VuLCAwNiBOb3YgMTk5NCAwODo0OTozNyBHTVQnKVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tSFRUUCgnU3VuZGF5LCAwNi1Ob3YtOTQgMDg6NDk6MzcgR01UJylcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUuZnJvbUhUVFAoJ1N1biBOb3YgIDYgMDg6NDk6MzcgMTk5NCcpXG4gICAqIEByZXR1cm4ge0RhdGVUaW1lfVxuICAgKi9cblxuICBzdGF0aWMgZnJvbUhUVFAodGV4dCwgb3B0cyA9IHt9KSB7XG4gICAgY29uc3QgW3ZhbHMsIHBhcnNlZFpvbmVdID0gcGFyc2VIVFRQRGF0ZSh0ZXh0KTtcbiAgICByZXR1cm4gcGFyc2VEYXRhVG9EYXRlVGltZSh2YWxzLCBwYXJzZWRab25lLCBvcHRzLCAnSFRUUCcsIG9wdHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIERhdGVUaW1lIGZyb20gYW4gaW5wdXQgc3RyaW5nIGFuZCBmb3JtYXQgc3RyaW5nLlxuICAgKiBEZWZhdWx0cyB0byBlbi1VUyBpZiBubyBsb2NhbGUgaGFzIGJlZW4gc3BlY2lmaWVkLCByZWdhcmRsZXNzIG9mIHRoZSBzeXN0ZW0ncyBsb2NhbGUuXG4gICAqIEBzZWUgaHR0cHM6Ly9tb21lbnQuZ2l0aHViLmlvL2x1eG9uL2RvY3MvbWFudWFsL3BhcnNpbmcuaHRtbCN0YWJsZS1vZi10b2tlbnNcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSB0aGUgc3RyaW5nIHRvIHBhcnNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmbXQgLSB0aGUgZm9ybWF0IHRoZSBzdHJpbmcgaXMgZXhwZWN0ZWQgdG8gYmUgaW4gKHNlZSB0aGUgbGluayBiZWxvdyBmb3IgdGhlIGZvcm1hdHMpXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0aW9ucyB0byBhZmZlY3QgdGhlIGNyZWF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfFpvbmV9IFtvcHRzLnpvbmU9J2xvY2FsJ10gLSB1c2UgdGhpcyB6b25lIGlmIG5vIG9mZnNldCBpcyBzcGVjaWZpZWQgaW4gdGhlIGlucHV0IHN0cmluZyBpdHNlbGYuIFdpbGwgYWxzbyBjb252ZXJ0IHRoZSBEYXRlVGltZSB0byB0aGlzIHpvbmVcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5zZXRab25lPWZhbHNlXSAtIG92ZXJyaWRlIHRoZSB6b25lIHdpdGggYSB6b25lIHNwZWNpZmllZCBpbiB0aGUgc3RyaW5nIGl0c2VsZiwgaWYgaXQgc3BlY2lmaWVzIG9uZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMubG9jYWxlPSdlbi1VUyddIC0gYSBsb2NhbGUgc3RyaW5nIHRvIHVzZSB3aGVuIHBhcnNpbmcuIFdpbGwgYWxzbyBzZXQgdGhlIERhdGVUaW1lIHRvIHRoaXMgbG9jYWxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLm51bWJlcmluZ1N5c3RlbSAtIHRoZSBudW1iZXJpbmcgc3lzdGVtIHRvIHVzZSB3aGVuIHBhcnNpbmcuIFdpbGwgYWxzbyBzZXQgdGhlIHJlc3VsdGluZyBEYXRlVGltZSB0byB0aGlzIG51bWJlcmluZyBzeXN0ZW1cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMub3V0cHV0Q2FsZW5kYXIgLSB0aGUgb3V0cHV0IGNhbGVuZGFyIHRvIHNldCBvbiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGluc3RhbmNlXG4gICAqIEByZXR1cm4ge0RhdGVUaW1lfVxuICAgKi9cblxuICBzdGF0aWMgZnJvbUZvcm1hdCh0ZXh0LCBmbXQsIG9wdHMgPSB7fSkge1xuICAgIGlmIChpc1VuZGVmaW5lZCh0ZXh0KSB8fCBpc1VuZGVmaW5lZChmbXQpKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXJyb3IoXG4gICAgICAgICdmcm9tRm9ybWF0IHJlcXVpcmVzIGFuIGlucHV0IHN0cmluZyBhbmQgYSBmb3JtYXQnLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGxvY2FsZSA9IG51bGwsIG51bWJlcmluZ1N5c3RlbSA9IG51bGwgfSA9IG9wdHMsXG4gICAgICBsb2NhbGVUb1VzZSA9IExvY2FsZS5mcm9tT3B0cyh7XG4gICAgICAgIGxvY2FsZSxcbiAgICAgICAgbnVtYmVyaW5nU3lzdGVtLFxuICAgICAgICBkZWZhdWx0VG9FTjogdHJ1ZSxcbiAgICAgIH0pLFxuICAgICAgW3ZhbHMsIHBhcnNlZFpvbmUsIGludmFsaWRdID0gcGFyc2VGcm9tVG9rZW5zKGxvY2FsZVRvVXNlLCB0ZXh0LCBmbXQpO1xuXG4gICAgaWYgKGludmFsaWQpIHtcbiAgICAgIHJldHVybiBEYXRlVGltZS5pbnZhbGlkKGludmFsaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcGFyc2VEYXRhVG9EYXRlVGltZSh2YWxzLCBwYXJzZWRab25lLCBvcHRzLCBgZm9ybWF0ICR7Zm10fWAsIHRleHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCB1c2UgZnJvbUZvcm1hdCBpbnN0ZWFkXG4gICAqL1xuXG4gIHN0YXRpYyBmcm9tU3RyaW5nKHRleHQsIGZtdCwgb3B0cyA9IHt9KSB7XG4gICAgcmV0dXJuIERhdGVUaW1lLmZyb21Gb3JtYXQodGV4dCwgZm10LCBvcHRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBEYXRlVGltZSBmcm9tIGEgU1FMIGRhdGUsIHRpbWUsIG9yIGRhdGV0aW1lXG4gICAqIERlZmF1bHRzIHRvIGVuLVVTIGlmIG5vIGxvY2FsZSBoYXMgYmVlbiBzcGVjaWZpZWQsIHJlZ2FyZGxlc3Mgb2YgdGhlIHN5c3RlbSdzIGxvY2FsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIHRoZSBzdHJpbmcgdG8gcGFyc2VcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zIHRvIGFmZmVjdCB0aGUgY3JlYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd8Wm9uZX0gW29wdHMuem9uZT0nbG9jYWwnXSAtIHVzZSB0aGlzIHpvbmUgaWYgbm8gb2Zmc2V0IGlzIHNwZWNpZmllZCBpbiB0aGUgaW5wdXQgc3RyaW5nIGl0c2VsZi4gV2lsbCBhbHNvIGNvbnZlcnQgdGhlIERhdGVUaW1lIHRvIHRoaXMgem9uZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLnNldFpvbmU9ZmFsc2VdIC0gb3ZlcnJpZGUgdGhlIHpvbmUgd2l0aCBhIHpvbmUgc3BlY2lmaWVkIGluIHRoZSBzdHJpbmcgaXRzZWxmLCBpZiBpdCBzcGVjaWZpZXMgb25lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5sb2NhbGU9J2VuLVVTJ10gLSBhIGxvY2FsZSBzdHJpbmcgdG8gdXNlIHdoZW4gcGFyc2luZy4gV2lsbCBhbHNvIHNldCB0aGUgRGF0ZVRpbWUgdG8gdGhpcyBsb2NhbGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMubnVtYmVyaW5nU3lzdGVtIC0gdGhlIG51bWJlcmluZyBzeXN0ZW0gdG8gdXNlIHdoZW4gcGFyc2luZy4gV2lsbCBhbHNvIHNldCB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIHRvIHRoaXMgbnVtYmVyaW5nIHN5c3RlbVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5vdXRwdXRDYWxlbmRhciAtIHRoZSBvdXRwdXQgY2FsZW5kYXIgdG8gc2V0IG9uIHRoZSByZXN1bHRpbmcgRGF0ZVRpbWUgaW5zdGFuY2VcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUuZnJvbVNRTCgnMjAxNy0wNS0xNScpXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmZyb21TUUwoJzIwMTctMDUtMTUgMDk6MTI6MzQnKVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tU1FMKCcyMDE3LTA1LTE1IDA5OjEyOjM0LjM0MicpXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmZyb21TUUwoJzIwMTctMDUtMTUgMDk6MTI6MzQuMzQyKzA2OjAwJylcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUuZnJvbVNRTCgnMjAxNy0wNS0xNSAwOToxMjozNC4zNDIgQW1lcmljYS9Mb3NfQW5nZWxlcycpXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmZyb21TUUwoJzIwMTctMDUtMTUgMDk6MTI6MzQuMzQyIEFtZXJpY2EvTG9zX0FuZ2VsZXMnLCB7IHNldFpvbmU6IHRydWUgfSlcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUuZnJvbVNRTCgnMjAxNy0wNS0xNSAwOToxMjozNC4zNDInLCB7IHpvbmU6ICdBbWVyaWNhL0xvc19BbmdlbGVzJyB9KVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tU1FMKCcwOToxMjozNC4zNDInKVxuICAgKiBAcmV0dXJuIHtEYXRlVGltZX1cbiAgICovXG5cbiAgc3RhdGljIGZyb21TUUwodGV4dCwgb3B0cyA9IHt9KSB7XG4gICAgY29uc3QgW3ZhbHMsIHBhcnNlZFpvbmVdID0gcGFyc2VTUUwodGV4dCk7XG4gICAgcmV0dXJuIHBhcnNlRGF0YVRvRGF0ZVRpbWUodmFscywgcGFyc2VkWm9uZSwgb3B0cywgJ1NRTCcsIHRleHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBpbnZhbGlkIERhdGVUaW1lLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVhc29uIC0gc2ltcGxlIHN0cmluZyBvZiB3aHkgdGhpcyBEYXRlVGltZSBpcyBpbnZhbGlkLiBTaG91bGQgbm90IGNvbnRhaW4gcGFyYW1ldGVycyBvciBhbnl0aGluZyBlbHNlIGRhdGEtZGVwZW5kZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZXhwbGFuYXRpb249bnVsbF0gLSBsb25nZXIgZXhwbGFuYXRpb24sIG1heSBpbmNsdWRlIHBhcmFtZXRlcnMgYW5kIG90aGVyIHVzZWZ1bCBkZWJ1Z2dpbmcgaW5mb3JtYXRpb25cbiAgICogQHJldHVybiB7RGF0ZVRpbWV9XG4gICAqL1xuXG4gIHN0YXRpYyBpbnZhbGlkKHJlYXNvbiwgZXhwbGFuYXRpb24gPSBudWxsKSB7XG4gICAgaWYgKCFyZWFzb24pIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFcnJvcihcbiAgICAgICAgJ25lZWQgdG8gc3BlY2lmeSBhIHJlYXNvbiB0aGUgRGF0ZVRpbWUgaXMgaW52YWxpZCcsXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGludmFsaWQgPVxuICAgICAgcmVhc29uIGluc3RhbmNlb2YgSW52YWxpZCA/IHJlYXNvbiA6IG5ldyBJbnZhbGlkKHJlYXNvbiwgZXhwbGFuYXRpb24pO1xuXG4gICAgaWYgKFNldHRpbmdzLnRocm93T25JbnZhbGlkKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZERhdGVUaW1lRXJyb3IoaW52YWxpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZVRpbWUoe1xuICAgICAgICBpbnZhbGlkLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGFuIG9iamVjdCBpcyBhIERhdGVUaW1lLiBXb3JrcyBhY3Jvc3MgY29udGV4dCBib3VuZGFyaWVzXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuXG4gIHN0YXRpYyBpc0RhdGVUaW1lKG8pIHtcbiAgICByZXR1cm4gKG8gJiYgby5pc0x1eG9uRGF0ZVRpbWUpIHx8IGZhbHNlO1xuICB9IC8vIElORk9cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBtaW4gb2Ygc2V2ZXJhbCBkYXRlIHRpbWVzXG4gICAqIEBwYXJhbSB7Li4uRGF0ZVRpbWV9IGRhdGVUaW1lcyAtIHRoZSBEYXRlVGltZXMgZnJvbSB3aGljaCB0byBjaG9vc2UgdGhlIG1pbmltdW1cbiAgICogQHJldHVybiB7RGF0ZVRpbWV9IHRoZSBtaW4gRGF0ZVRpbWUsIG9yIHVuZGVmaW5lZCBpZiBjYWxsZWQgd2l0aCBubyBhcmd1bWVudFxuICAgKi9cblxuICBzdGF0aWMgbWluKC4uLmRhdGVUaW1lcykge1xuICAgIGlmICghZGF0ZVRpbWVzLmV2ZXJ5KERhdGVUaW1lLmlzRGF0ZVRpbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXJyb3IoJ21pbiByZXF1aXJlcyBhbGwgYXJndW1lbnRzIGJlIERhdGVUaW1lcycpO1xuICAgIH1cblxuICAgIHJldHVybiBiZXN0QnkoZGF0ZVRpbWVzLCBpID0+IGkudmFsdWVPZigpLCBNYXRoLm1pbik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBtYXggb2Ygc2V2ZXJhbCBkYXRlIHRpbWVzXG4gICAqIEBwYXJhbSB7Li4uRGF0ZVRpbWV9IGRhdGVUaW1lcyAtIHRoZSBEYXRlVGltZXMgZnJvbSB3aGljaCB0byBjaG9vc2UgdGhlIG1heGltdW1cbiAgICogQHJldHVybiB7RGF0ZVRpbWV9IHRoZSBtYXggRGF0ZVRpbWUsIG9yIHVuZGVmaW5lZCBpZiBjYWxsZWQgd2l0aCBubyBhcmd1bWVudFxuICAgKi9cblxuICBzdGF0aWMgbWF4KC4uLmRhdGVUaW1lcykge1xuICAgIGlmICghZGF0ZVRpbWVzLmV2ZXJ5KERhdGVUaW1lLmlzRGF0ZVRpbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXJyb3IoJ21heCByZXF1aXJlcyBhbGwgYXJndW1lbnRzIGJlIERhdGVUaW1lcycpO1xuICAgIH1cblxuICAgIHJldHVybiBiZXN0QnkoZGF0ZVRpbWVzLCBpID0+IGkudmFsdWVPZigpLCBNYXRoLm1heCk7XG4gIH0gLy8gTUlTQ1xuXG4gIC8qKlxuICAgKiBFeHBsYWluIGhvdyBhIHN0cmluZyB3b3VsZCBiZSBwYXJzZWQgYnkgZnJvbUZvcm1hdCgpXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gdGhlIHN0cmluZyB0byBwYXJzZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZm10IC0gdGhlIGZvcm1hdCB0aGUgc3RyaW5nIGlzIGV4cGVjdGVkIHRvIGJlIGluIChzZWUgZGVzY3JpcHRpb24pXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyB0YWtlbiBieSBmcm9tRm9ybWF0KClcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cblxuICBzdGF0aWMgZnJvbUZvcm1hdEV4cGxhaW4odGV4dCwgZm10LCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7IGxvY2FsZSA9IG51bGwsIG51bWJlcmluZ1N5c3RlbSA9IG51bGwgfSA9IG9wdGlvbnMsXG4gICAgICBsb2NhbGVUb1VzZSA9IExvY2FsZS5mcm9tT3B0cyh7XG4gICAgICAgIGxvY2FsZSxcbiAgICAgICAgbnVtYmVyaW5nU3lzdGVtLFxuICAgICAgICBkZWZhdWx0VG9FTjogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIHJldHVybiBleHBsYWluRnJvbVRva2Vucyhsb2NhbGVUb1VzZSwgdGV4dCwgZm10KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCB1c2UgZnJvbUZvcm1hdEV4cGxhaW4gaW5zdGVhZFxuICAgKi9cblxuICBzdGF0aWMgZnJvbVN0cmluZ0V4cGxhaW4odGV4dCwgZm10LCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gRGF0ZVRpbWUuZnJvbUZvcm1hdEV4cGxhaW4odGV4dCwgZm10LCBvcHRpb25zKTtcbiAgfSAvLyBGT1JNQVQgUFJFU0VUU1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZhbHVlIG9mIHVuaXQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1bml0IC0gYSB1bml0IHN1Y2ggYXMgJ21pbnV0ZScgb3IgJ2RheSdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgNywgNCkuZ2V0KCdtb250aCcpOyAvLz0+IDdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgNywgNCkuZ2V0KCdkYXknKTsgLy89PiA0XG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG5cbiAgZ2V0KHVuaXQpIHtcbiAgICByZXR1cm4gdGhpc1t1bml0XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByZXNvbHZlZCBJbnRsIG9wdGlvbnMgZm9yIHRoaXMgRGF0ZVRpbWUuXG4gICAqIFRoaXMgaXMgdXNlZnVsIGluIHVuZGVyc3RhbmRpbmcgdGhlIGJlaGF2aW9yIG9mIGZvcm1hdHRpbmcgbWV0aG9kc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIHRoZSBzYW1lIG9wdGlvbnMgYXMgdG9Mb2NhbGVTdHJpbmdcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cblxuICByZXNvbHZlZExvY2FsZU9wdHMob3B0cyA9IHt9KSB7XG4gICAgY29uc3QgeyBsb2NhbGUsIG51bWJlcmluZ1N5c3RlbSwgY2FsZW5kYXIgfSA9IEZvcm1hdHRlci5jcmVhdGUoXG4gICAgICB0aGlzLmxvYy5jbG9uZShvcHRzKSxcbiAgICAgIG9wdHMsXG4gICAgKS5yZXNvbHZlZE9wdGlvbnModGhpcyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxvY2FsZSxcbiAgICAgIG51bWJlcmluZ1N5c3RlbSxcbiAgICAgIG91dHB1dENhbGVuZGFyOiBjYWxlbmRhcixcbiAgICB9O1xuICB9IC8vIFRSQU5TRk9STVxuXG4gIC8qKlxuICAgKiBcIlNldFwiIHRoZSBEYXRlVGltZSdzIHpvbmUgdG8gVVRDLiBSZXR1cm5zIGEgbmV3bHktY29uc3RydWN0ZWQgRGF0ZVRpbWUuXG4gICAqXG4gICAqIEVxdWl2YWxlbnQgdG8ge0BsaW5rIHNldFpvbmV9KCd1dGMnKVxuICAgKiBAcGFyYW0ge251bWJlcn0gW29mZnNldD0wXSAtIG9wdGlvbmFsbHksIGFuIG9mZnNldCBmcm9tIFVUQyBpbiBtaW51dGVzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cz17fV0gLSBvcHRpb25zIHRvIHBhc3MgdG8gYHNldFpvbmUoKWBcbiAgICogQHJldHVybiB7RGF0ZVRpbWV9XG4gICAqL1xuXG4gIHRvVVRDKG9mZnNldCA9IDAsIG9wdHMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLnNldFpvbmUoRml4ZWRPZmZzZXRab25lLmluc3RhbmNlKG9mZnNldCksIG9wdHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFwiU2V0XCIgdGhlIERhdGVUaW1lJ3Mgem9uZSB0byB0aGUgaG9zdCdzIGxvY2FsIHpvbmUuIFJldHVybnMgYSBuZXdseS1jb25zdHJ1Y3RlZCBEYXRlVGltZS5cbiAgICpcbiAgICogRXF1aXZhbGVudCB0byBgc2V0Wm9uZSgnbG9jYWwnKWBcbiAgICogQHJldHVybiB7RGF0ZVRpbWV9XG4gICAqL1xuXG4gIHRvTG9jYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0Wm9uZShTZXR0aW5ncy5kZWZhdWx0Wm9uZSk7XG4gIH1cblxuICAvKipcbiAgICogXCJTZXRcIiB0aGUgRGF0ZVRpbWUncyB6b25lIHRvIHNwZWNpZmllZCB6b25lLiBSZXR1cm5zIGEgbmV3bHktY29uc3RydWN0ZWQgRGF0ZVRpbWUuXG4gICAqXG4gICAqIEJ5IGRlZmF1bHQsIHRoZSBzZXR0ZXIga2VlcHMgdGhlIHVuZGVybHlpbmcgdGltZSB0aGUgc2FtZSAoYXMgaW4sIHRoZSBzYW1lIHRpbWVzdGFtcCksIGJ1dCB0aGUgbmV3IGluc3RhbmNlIHdpbGwgcmVwb3J0IGRpZmZlcmVudCBsb2NhbCB0aW1lcyBhbmQgY29uc2lkZXIgRFNUcyB3aGVuIG1ha2luZyBjb21wdXRhdGlvbnMsIGFzIHdpdGgge0BsaW5rIHBsdXN9LiBZb3UgbWF5IHdpc2ggdG8gdXNlIHtAbGluayB0b0xvY2FsfSBhbmQge0BsaW5rIHRvVVRDfSB3aGljaCBwcm92aWRlIHNpbXBsZSBjb252ZW5pZW5jZSB3cmFwcGVycyBmb3IgY29tbW9ubHkgdXNlZCB6b25lcy5cbiAgICogQHBhcmFtIHtzdHJpbmd8Wm9uZX0gW3pvbmU9J2xvY2FsJ10gLSBhIHpvbmUgaWRlbnRpZmllci4gQXMgYSBzdHJpbmcsIHRoYXQgY2FuIGJlIGFueSBJQU5BIHpvbmUgc3VwcG9ydGVkIGJ5IHRoZSBob3N0IGVudmlyb25tZW50LCBvciBhIGZpeGVkLW9mZnNldCBuYW1lIG9mIHRoZSBmb3JtICdVVEMrMycsIG9yIHRoZSBzdHJpbmdzICdsb2NhbCcgb3IgJ3V0YycuIFlvdSBtYXkgYWxzbyBzdXBwbHkgYW4gaW5zdGFuY2Ugb2YgYSB7QGxpbmsgWm9uZX0gY2xhc3MuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLmtlZXBMb2NhbFRpbWU9ZmFsc2VdIC0gSWYgdHJ1ZSwgYWRqdXN0IHRoZSB1bmRlcmx5aW5nIHRpbWUgc28gdGhhdCB0aGUgbG9jYWwgdGltZSBzdGF5cyB0aGUgc2FtZSwgYnV0IGluIHRoZSB0YXJnZXQgem9uZS4gWW91IHNob3VsZCByYXJlbHkgbmVlZCB0aGlzLlxuICAgKiBAcmV0dXJuIHtEYXRlVGltZX1cbiAgICovXG5cbiAgc2V0Wm9uZSh6b25lLCB7IGtlZXBMb2NhbFRpbWUgPSBmYWxzZSwga2VlcENhbGVuZGFyVGltZSA9IGZhbHNlIH0gPSB7fSkge1xuICAgIHpvbmUgPSBub3JtYWxpemVab25lKHpvbmUsIFNldHRpbmdzLmRlZmF1bHRab25lKTtcblxuICAgIGlmICh6b25lLmVxdWFscyh0aGlzLnpvbmUpKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2UgaWYgKCF6b25lLmlzVmFsaWQpIHtcbiAgICAgIHJldHVybiBEYXRlVGltZS5pbnZhbGlkKHVuc3VwcG9ydGVkWm9uZSh6b25lKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBuZXdUUyA9IHRoaXMudHM7XG5cbiAgICAgIGlmIChrZWVwTG9jYWxUaW1lIHx8IGtlZXBDYWxlbmRhclRpbWUpIHtcbiAgICAgICAgY29uc3Qgb2Zmc2V0R3Vlc3MgPSB6b25lLm9mZnNldCh0aGlzLnRzKTtcbiAgICAgICAgY29uc3QgYXNPYmogPSB0aGlzLnRvT2JqZWN0KCk7XG4gICAgICAgIFtuZXdUU10gPSBvYmpUb1RTKGFzT2JqLCBvZmZzZXRHdWVzcywgem9uZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjbG9uZSQxKHRoaXMsIHtcbiAgICAgICAgdHM6IG5ld1RTLFxuICAgICAgICB6b25lLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFwiU2V0XCIgdGhlIGxvY2FsZSwgbnVtYmVyaW5nU3lzdGVtLCBvciBvdXRwdXRDYWxlbmRhci4gUmV0dXJucyBhIG5ld2x5LWNvbnN0cnVjdGVkIERhdGVUaW1lLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcGVydGllcyAtIHRoZSBwcm9wZXJ0aWVzIHRvIHNldFxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgyMDE3LCA1LCAyNSkucmVjb25maWd1cmUoeyBsb2NhbGU6ICdlbi1HQicgfSlcbiAgICogQHJldHVybiB7RGF0ZVRpbWV9XG4gICAqL1xuXG4gIHJlY29uZmlndXJlKHsgbG9jYWxlLCBudW1iZXJpbmdTeXN0ZW0sIG91dHB1dENhbGVuZGFyIH0gPSB7fSkge1xuICAgIGNvbnN0IGxvYyA9IHRoaXMubG9jLmNsb25lKHtcbiAgICAgIGxvY2FsZSxcbiAgICAgIG51bWJlcmluZ1N5c3RlbSxcbiAgICAgIG91dHB1dENhbGVuZGFyLFxuICAgIH0pO1xuICAgIHJldHVybiBjbG9uZSQxKHRoaXMsIHtcbiAgICAgIGxvYyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcIlNldFwiIHRoZSBsb2NhbGUuIFJldHVybnMgYSBuZXdseS1jb25zdHJ1Y3RlZCBEYXRlVGltZS5cbiAgICogSnVzdCBhIGNvbnZlbmllbnQgYWxpYXMgZm9yIHJlY29uZmlndXJlKHsgbG9jYWxlIH0pXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcsIDUsIDI1KS5zZXRMb2NhbGUoJ2VuLUdCJylcbiAgICogQHJldHVybiB7RGF0ZVRpbWV9XG4gICAqL1xuXG4gIHNldExvY2FsZShsb2NhbGUpIHtcbiAgICByZXR1cm4gdGhpcy5yZWNvbmZpZ3VyZSh7XG4gICAgICBsb2NhbGUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogXCJTZXRcIiB0aGUgdmFsdWVzIG9mIHNwZWNpZmllZCB1bml0cy4gUmV0dXJucyBhIG5ld2x5LWNvbnN0cnVjdGVkIERhdGVUaW1lLlxuICAgKiBZb3UgY2FuIG9ubHkgc2V0IHVuaXRzIHdpdGggdGhpcyBtZXRob2Q7IGZvciBcInNldHRpbmdcIiBtZXRhZGF0YSwgc2VlIHtAbGluayByZWNvbmZpZ3VyZX0gYW5kIHtAbGluayBzZXRab25lfS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlcyAtIGEgbWFwcGluZyBvZiB1bml0cyB0byBudW1iZXJzXG4gICAqIEBleGFtcGxlIGR0LnNldCh7IHllYXI6IDIwMTcgfSlcbiAgICogQGV4YW1wbGUgZHQuc2V0KHsgaG91cjogOCwgbWludXRlOiAzMCB9KVxuICAgKiBAZXhhbXBsZSBkdC5zZXQoeyB3ZWVrZGF5OiA1IH0pXG4gICAqIEBleGFtcGxlIGR0LnNldCh7IHllYXI6IDIwMDUsIG9yZGluYWw6IDIzNCB9KVxuICAgKiBAcmV0dXJuIHtEYXRlVGltZX1cbiAgICovXG5cbiAgc2V0KHZhbHVlcykge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gdGhpcztcbiAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplT2JqZWN0KHZhbHVlcywgbm9ybWFsaXplVW5pdCwgW10pLFxuICAgICAgc2V0dGluZ1dlZWtTdHVmZiA9XG4gICAgICAgICFpc1VuZGVmaW5lZChub3JtYWxpemVkLndlZWtZZWFyKSB8fFxuICAgICAgICAhaXNVbmRlZmluZWQobm9ybWFsaXplZC53ZWVrTnVtYmVyKSB8fFxuICAgICAgICAhaXNVbmRlZmluZWQobm9ybWFsaXplZC53ZWVrZGF5KTtcbiAgICBsZXQgbWl4ZWQ7XG5cbiAgICBpZiAoc2V0dGluZ1dlZWtTdHVmZikge1xuICAgICAgbWl4ZWQgPSB3ZWVrVG9HcmVnb3JpYW4oXG4gICAgICAgIE9iamVjdC5hc3NpZ24oZ3JlZ29yaWFuVG9XZWVrKHRoaXMuYyksIG5vcm1hbGl6ZWQpLFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKCFpc1VuZGVmaW5lZChub3JtYWxpemVkLm9yZGluYWwpKSB7XG4gICAgICBtaXhlZCA9IG9yZGluYWxUb0dyZWdvcmlhbihcbiAgICAgICAgT2JqZWN0LmFzc2lnbihncmVnb3JpYW5Ub09yZGluYWwodGhpcy5jKSwgbm9ybWFsaXplZCksXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBtaXhlZCA9IE9iamVjdC5hc3NpZ24odGhpcy50b09iamVjdCgpLCBub3JtYWxpemVkKTsgLy8gaWYgd2UgZGlkbid0IHNldCB0aGUgZGF5IGJ1dCB3ZSBlbmRlZCB1cCBvbiBhbiBvdmVyZmxvdyBkYXRlLFxuICAgICAgLy8gdXNlIHRoZSBsYXN0IGRheSBvZiB0aGUgcmlnaHQgbW9udGhcblxuICAgICAgaWYgKGlzVW5kZWZpbmVkKG5vcm1hbGl6ZWQuZGF5KSkge1xuICAgICAgICBtaXhlZC5kYXkgPSBNYXRoLm1pbihkYXlzSW5Nb250aChtaXhlZC55ZWFyLCBtaXhlZC5tb250aCksIG1peGVkLmRheSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgW3RzLCBvXSA9IG9ialRvVFMobWl4ZWQsIHRoaXMubywgdGhpcy56b25lKTtcbiAgICByZXR1cm4gY2xvbmUkMSh0aGlzLCB7XG4gICAgICB0cyxcbiAgICAgIG8sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgcGVyaW9kIG9mIHRpbWUgdG8gdGhpcyBEYXRlVGltZSBhbmQgcmV0dXJuIHRoZSByZXN1bHRpbmcgRGF0ZVRpbWVcbiAgICpcbiAgICogQWRkaW5nIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBvciBtaWxsaXNlY29uZHMgaW5jcmVhc2VzIHRoZSB0aW1lc3RhbXAgYnkgdGhlIHJpZ2h0IG51bWJlciBvZiBtaWxsaXNlY29uZHMuIEFkZGluZyBkYXlzLCBtb250aHMsIG9yIHllYXJzIHNoaWZ0cyB0aGUgY2FsZW5kYXIsIGFjY291bnRpbmcgZm9yIERTVHMgYW5kIGxlYXAgeWVhcnMgYWxvbmcgdGhlIHdheS4gVGh1cywgYGR0LnBsdXMoeyBob3VyczogMjQgfSlgIG1heSByZXN1bHQgaW4gYSBkaWZmZXJlbnQgdGltZSB0aGFuIGBkdC5wbHVzKHsgZGF5czogMSB9KWAgaWYgdGhlcmUncyBhIERTVCBzaGlmdCBpbiBiZXR3ZWVuLlxuICAgKiBAcGFyYW0ge0R1cmF0aW9ufE9iamVjdHxudW1iZXJ9IGR1cmF0aW9uIC0gVGhlIGFtb3VudCB0byBhZGQuIEVpdGhlciBhIEx1eG9uIER1cmF0aW9uLCBhIG51bWJlciBvZiBtaWxsaXNlY29uZHMsIHRoZSBvYmplY3QgYXJndW1lbnQgdG8gRHVyYXRpb24uZnJvbU9iamVjdCgpXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKCkucGx1cygxMjMpIC8vfj4gaW4gMTIzIG1pbGxpc2Vjb25kc1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgpLnBsdXMoeyBtaW51dGVzOiAxNSB9KSAvL34+IGluIDE1IG1pbnV0ZXNcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoKS5wbHVzKHsgZGF5czogMSB9KSAvL34+IHRoaXMgdGltZSB0b21vcnJvd1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgpLnBsdXMoeyBkYXlzOiAtMSB9KSAvL34+IHRoaXMgdGltZSB5ZXN0ZXJkYXlcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoKS5wbHVzKHsgaG91cnM6IDMsIG1pbnV0ZXM6IDEzIH0pIC8vfj4gaW4gMyBociwgMTMgbWluXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKCkucGx1cyhEdXJhdGlvbi5mcm9tT2JqZWN0KHsgaG91cnM6IDMsIG1pbnV0ZXM6IDEzIH0pKSAvL34+IGluIDMgaHIsIDEzIG1pblxuICAgKiBAcmV0dXJuIHtEYXRlVGltZX1cbiAgICovXG5cbiAgcGx1cyhkdXJhdGlvbikge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gdGhpcztcbiAgICBjb25zdCBkdXIgPSBmcmllbmRseUR1cmF0aW9uKGR1cmF0aW9uKTtcbiAgICByZXR1cm4gY2xvbmUkMSh0aGlzLCBhZGp1c3RUaW1lKHRoaXMsIGR1cikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnRyYWN0IGEgcGVyaW9kIG9mIHRpbWUgdG8gdGhpcyBEYXRlVGltZSBhbmQgcmV0dXJuIHRoZSByZXN1bHRpbmcgRGF0ZVRpbWVcbiAgICogU2VlIHtAbGluayBwbHVzfVxuICAgKiBAcGFyYW0ge0R1cmF0aW9ufE9iamVjdHxudW1iZXJ9IGR1cmF0aW9uIC0gVGhlIGFtb3VudCB0byBzdWJ0cmFjdC4gRWl0aGVyIGEgTHV4b24gRHVyYXRpb24sIGEgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcywgdGhlIG9iamVjdCBhcmd1bWVudCB0byBEdXJhdGlvbi5mcm9tT2JqZWN0KClcbiAgIEByZXR1cm4ge0RhdGVUaW1lfVxuICAgKi9cblxuICBtaW51cyhkdXJhdGlvbikge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gdGhpcztcbiAgICBjb25zdCBkdXIgPSBmcmllbmRseUR1cmF0aW9uKGR1cmF0aW9uKS5uZWdhdGUoKTtcbiAgICByZXR1cm4gY2xvbmUkMSh0aGlzLCBhZGp1c3RUaW1lKHRoaXMsIGR1cikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFwiU2V0XCIgdGhpcyBEYXRlVGltZSB0byB0aGUgYmVnaW5uaW5nIG9mIGEgdW5pdCBvZiB0aW1lLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdW5pdCAtIFRoZSB1bml0IHRvIGdvIHRvIHRoZSBiZWdpbm5pbmcgb2YuIENhbiBiZSAneWVhcicsICdxdWFydGVyJywgJ21vbnRoJywgJ3dlZWsnLCAnZGF5JywgJ2hvdXInLCAnbWludXRlJywgJ3NlY29uZCcsIG9yICdtaWxsaXNlY29uZCcuXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTQsIDMsIDMpLnN0YXJ0T2YoJ21vbnRoJykudG9JU09EYXRlKCk7IC8vPT4gJzIwMTQtMDMtMDEnXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTQsIDMsIDMpLnN0YXJ0T2YoJ3llYXInKS50b0lTT0RhdGUoKTsgLy89PiAnMjAxNC0wMS0wMSdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNCwgMywgMywgNSwgMzApLnN0YXJ0T2YoJ2RheScpLnRvSVNPVGltZSgpOyAvLz0+ICcwMDowMC4wMDAtMDU6MDAnXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTQsIDMsIDMsIDUsIDMwKS5zdGFydE9mKCdob3VyJykudG9JU09UaW1lKCk7IC8vPT4gJzA1OjAwOjAwLjAwMC0wNTowMCdcbiAgICogQHJldHVybiB7RGF0ZVRpbWV9XG4gICAqL1xuXG4gIHN0YXJ0T2YodW5pdCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gdGhpcztcbiAgICBjb25zdCBvID0ge30sXG4gICAgICBub3JtYWxpemVkVW5pdCA9IER1cmF0aW9uLm5vcm1hbGl6ZVVuaXQodW5pdCk7XG5cbiAgICBzd2l0Y2ggKG5vcm1hbGl6ZWRVbml0KSB7XG4gICAgICBjYXNlICd5ZWFycyc6XG4gICAgICAgIG8ubW9udGggPSAxO1xuICAgICAgLy8gZmFsbHMgdGhyb3VnaFxuXG4gICAgICBjYXNlICdxdWFydGVycyc6XG4gICAgICBjYXNlICdtb250aHMnOlxuICAgICAgICBvLmRheSA9IDE7XG4gICAgICAvLyBmYWxscyB0aHJvdWdoXG5cbiAgICAgIGNhc2UgJ3dlZWtzJzpcbiAgICAgIGNhc2UgJ2RheXMnOlxuICAgICAgICBvLmhvdXIgPSAwO1xuICAgICAgLy8gZmFsbHMgdGhyb3VnaFxuXG4gICAgICBjYXNlICdob3Vycyc6XG4gICAgICAgIG8ubWludXRlID0gMDtcbiAgICAgIC8vIGZhbGxzIHRocm91Z2hcblxuICAgICAgY2FzZSAnbWludXRlcyc6XG4gICAgICAgIG8uc2Vjb25kID0gMDtcbiAgICAgIC8vIGZhbGxzIHRocm91Z2hcblxuICAgICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICAgIG8ubWlsbGlzZWNvbmQgPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIG5vIGRlZmF1bHQsIGludmFsaWQgdW5pdHMgdGhyb3cgaW4gbm9ybWFsaXplVW5pdCgpXG4gICAgfVxuXG4gICAgaWYgKG5vcm1hbGl6ZWRVbml0ID09PSAnd2Vla3MnKSB7XG4gICAgICBvLndlZWtkYXkgPSAxO1xuICAgIH1cblxuICAgIGlmIChub3JtYWxpemVkVW5pdCA9PT0gJ3F1YXJ0ZXJzJykge1xuICAgICAgY29uc3QgcSA9IE1hdGguY2VpbCh0aGlzLm1vbnRoIC8gMyk7XG4gICAgICBvLm1vbnRoID0gKHEgLSAxKSAqIDMgKyAxO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNldChvKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcIlNldFwiIHRoaXMgRGF0ZVRpbWUgdG8gdGhlIGVuZCAobWVhbmluZyB0aGUgbGFzdCBtaWxsaXNlY29uZCkgb2YgYSB1bml0IG9mIHRpbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVuaXQgLSBUaGUgdW5pdCB0byBnbyB0byB0aGUgZW5kIG9mLiBDYW4gYmUgJ3llYXInLCAnbW9udGgnLCAnZGF5JywgJ2hvdXInLCAnbWludXRlJywgJ3NlY29uZCcsIG9yICdtaWxsaXNlY29uZCcuXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTQsIDMsIDMpLmVuZE9mKCdtb250aCcpLnRvSVNPKCk7IC8vPT4gJzIwMTQtMDMtMzFUMjM6NTk6NTkuOTk5LTA1OjAwJ1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgyMDE0LCAzLCAzKS5lbmRPZigneWVhcicpLnRvSVNPKCk7IC8vPT4gJzIwMTQtMTItMzFUMjM6NTk6NTkuOTk5LTA1OjAwJ1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgyMDE0LCAzLCAzLCA1LCAzMCkuZW5kT2YoJ2RheScpLnRvSVNPKCk7IC8vPT4gJzIwMTQtMDMtMDNUMjM6NTk6NTkuOTk5LTA1OjAwJ1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgyMDE0LCAzLCAzLCA1LCAzMCkuZW5kT2YoJ2hvdXInKS50b0lTTygpOyAvLz0+ICcyMDE0LTAzLTAzVDA1OjU5OjU5Ljk5OS0wNTowMCdcbiAgICogQHJldHVybiB7RGF0ZVRpbWV9XG4gICAqL1xuXG4gIGVuZE9mKHVuaXQpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkXG4gICAgICA/IHRoaXMucGx1cyh7XG4gICAgICAgICAgW3VuaXRdOiAxLFxuICAgICAgICB9KVxuICAgICAgICAgIC5zdGFydE9mKHVuaXQpXG4gICAgICAgICAgLm1pbnVzKDEpXG4gICAgICA6IHRoaXM7XG4gIH0gLy8gT1VUUFVUXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEYXRlVGltZSBmb3JtYXR0ZWQgYWNjb3JkaW5nIHRvIHRoZSBzcGVjaWZpZWQgZm9ybWF0IHN0cmluZy5cbiAgICogKipZb3UgbWF5IG5vdCB3YW50IHRoaXMuKiogU2VlIHtAbGluayB0b0xvY2FsZVN0cmluZ30gZm9yIGEgbW9yZSBmbGV4aWJsZSBmb3JtYXR0aW5nIHRvb2wuIEZvciBhIHRhYmxlIG9mIHRva2VucyBhbmQgdGhlaXIgaW50ZXJwcmV0YXRpb25zLCBzZWUgW2hlcmVdKGh0dHBzOi8vbW9tZW50LmdpdGh1Yi5pby9sdXhvbi9kb2NzL21hbnVhbC9mb3JtYXR0aW5nLmh0bWwjdGFibGUtb2YtdG9rZW5zKS5cbiAgICogRGVmYXVsdHMgdG8gZW4tVVMgaWYgbm8gbG9jYWxlIGhhcyBiZWVuIHNwZWNpZmllZCwgcmVnYXJkbGVzcyBvZiB0aGUgc3lzdGVtJ3MgbG9jYWxlLlxuICAgKiBAc2VlIGh0dHBzOi8vbW9tZW50LmdpdGh1Yi5pby9sdXhvbi9kb2NzL21hbnVhbC9mb3JtYXR0aW5nLmh0bWwjdGFibGUtb2YtdG9rZW5zXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmbXQgLSB0aGUgZm9ybWF0IHN0cmluZ1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdHMgdG8gb3ZlcnJpZGUgdGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgpLnRvRm9ybWF0KCd5eXl5IExMTCBkZCcpIC8vPT4gJzIwMTcgQXByIDIyJ1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgpLnNldExvY2FsZSgnZnInKS50b0Zvcm1hdCgneXl5eSBMTEwgZGQnKSAvLz0+ICcyMDE3IGF2ci4gMjInXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKCkudG9Gb3JtYXQoJ3l5eXkgTExMIGRkJywgeyBsb2NhbGU6IFwiZnJcIiB9KSAvLz0+ICcyMDE3IGF2ci4gMjInXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKCkudG9Gb3JtYXQoXCJISCAnaG91cnMgYW5kJyBtbSAnbWludXRlcydcIikgLy89PiAnMjAgaG91cnMgYW5kIDU1IG1pbnV0ZXMnXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG5cbiAgdG9Gb3JtYXQoZm10LCBvcHRzID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkXG4gICAgICA/IEZvcm1hdHRlci5jcmVhdGUodGhpcy5sb2MucmVkZWZhdWx0VG9FTihvcHRzKSkuZm9ybWF0RGF0ZVRpbWVGcm9tU3RyaW5nKFxuICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgZm10LFxuICAgICAgICApXG4gICAgICA6IElOVkFMSUQkMjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbG9jYWxpemVkIHN0cmluZyByZXByZXNlbnRpbmcgdGhpcyBkYXRlLiBBY2NlcHRzIHRoZSBzYW1lIG9wdGlvbnMgYXMgdGhlIEludGwuRGF0ZVRpbWVGb3JtYXQgY29uc3RydWN0b3IgYW5kIGFueSBwcmVzZXRzIGRlZmluZWQgYnkgTHV4b24sIHN1Y2ggYXMgYERhdGVUaW1lLkRBVEVfRlVMTGAgb3IgYERhdGVUaW1lLlRJTUVfU0lNUExFYC5cbiAgICogVGhlIGV4YWN0IGJlaGF2aW9yIG9mIHRoaXMgbWV0aG9kIGlzIGJyb3dzZXItc3BlY2lmaWMsIGJ1dCBpbiBnZW5lcmFsIGl0IHdpbGwgcmV0dXJuIGFuIGFwcHJvcHJpYXRlIHJlcHJlc2VudGF0aW9uXG4gICAqIG9mIHRoZSBEYXRlVGltZSBpbiB0aGUgYXNzaWduZWQgbG9jYWxlLlxuICAgKiBEZWZhdWx0cyB0byB0aGUgc3lzdGVtJ3MgbG9jYWxlIGlmIG5vIGxvY2FsZSBoYXMgYmVlbiBzcGVjaWZpZWRcbiAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9EYXRlVGltZUZvcm1hdFxuICAgKiBAcGFyYW0gb3B0cyB7T2JqZWN0fSAtIEludGwuRGF0ZVRpbWVGb3JtYXQgY29uc3RydWN0b3Igb3B0aW9ucyBhbmQgY29uZmlndXJhdGlvbiBvcHRpb25zXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKCkudG9Mb2NhbGVTdHJpbmcoKTsgLy89PiA0LzIwLzIwMTdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoKS5zZXRMb2NhbGUoJ2VuLWdiJykudG9Mb2NhbGVTdHJpbmcoKTsgLy89PiAnMjAvMDQvMjAxNydcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoKS50b0xvY2FsZVN0cmluZyh7IGxvY2FsZTogJ2VuLWdiJyB9KTsgLy89PiAnMjAvMDQvMjAxNydcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoKS50b0xvY2FsZVN0cmluZyhEYXRlVGltZS5EQVRFX0ZVTEwpOyAvLz0+ICdBcHJpbCAyMCwgMjAxNydcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoKS50b0xvY2FsZVN0cmluZyhEYXRlVGltZS5USU1FX1NJTVBMRSk7IC8vPT4gJzExOjMyIEFNJ1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgpLnRvTG9jYWxlU3RyaW5nKERhdGVUaW1lLkRBVEVUSU1FX1NIT1JUKTsgLy89PiAnNC8yMC8yMDE3LCAxMTozMiBBTSdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoKS50b0xvY2FsZVN0cmluZyh7IHdlZWtkYXk6ICdsb25nJywgbW9udGg6ICdsb25nJywgZGF5OiAnMi1kaWdpdCcgfSk7IC8vPT4gJ1RodXJzZGF5LCBBcHJpbCAyMCdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoKS50b0xvY2FsZVN0cmluZyh7IHdlZWtkYXk6ICdzaG9ydCcsIG1vbnRoOiAnc2hvcnQnLCBkYXk6ICcyLWRpZ2l0JywgaG91cjogJzItZGlnaXQnLCBtaW51dGU6ICcyLWRpZ2l0JyB9KTsgLy89PiAnVGh1LCBBcHIgMjAsIDExOjI3IEFNJ1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgpLnRvTG9jYWxlU3RyaW5nKHsgaG91cjogJzItZGlnaXQnLCBtaW51dGU6ICcyLWRpZ2l0JywgaG91cjEyOiBmYWxzZSB9KTsgLy89PiAnMTE6MzInXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG5cbiAgdG9Mb2NhbGVTdHJpbmcob3B0cyA9IERBVEVfU0hPUlQpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkXG4gICAgICA/IEZvcm1hdHRlci5jcmVhdGUodGhpcy5sb2MuY2xvbmUob3B0cyksIG9wdHMpLmZvcm1hdERhdGVUaW1lKHRoaXMpXG4gICAgICA6IElOVkFMSUQkMjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGZvcm1hdCBcInBhcnRzXCIsIG1lYW5pbmcgaW5kaXZpZHVhbCB0b2tlbnMgYWxvbmcgd2l0aCBtZXRhZGF0YS4gVGhpcyBpcyBhbGxvd3MgY2FsbGVycyB0byBwb3N0LXByb2Nlc3MgaW5kaXZpZHVhbCBzZWN0aW9ucyBvZiB0aGUgZm9ybWF0dGVkIG91dHB1dC5cbiAgICogRGVmYXVsdHMgdG8gdGhlIHN5c3RlbSdzIGxvY2FsZSBpZiBubyBsb2NhbGUgaGFzIGJlZW4gc3BlY2lmaWVkXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRGF0ZVRpbWVGb3JtYXQvZm9ybWF0VG9QYXJ0c1xuICAgKiBAcGFyYW0gb3B0cyB7T2JqZWN0fSAtIEludGwuRGF0ZVRpbWVGb3JtYXQgY29uc3RydWN0b3Igb3B0aW9ucywgc2FtZSBhcyBgdG9Mb2NhbGVTdHJpbmdgLlxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgpLnRvTG9jYWxlUGFydHMoKTsgLy89PiBbXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLz0+ICAgeyB0eXBlOiAnZGF5JywgdmFsdWU6ICcyNScgfSxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vPT4gICB7IHR5cGU6ICdsaXRlcmFsJywgdmFsdWU6ICcvJyB9LFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy89PiAgIHsgdHlwZTogJ21vbnRoJywgdmFsdWU6ICcwNScgfSxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vPT4gICB7IHR5cGU6ICdsaXRlcmFsJywgdmFsdWU6ICcvJyB9LFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy89PiAgIHsgdHlwZTogJ3llYXInLCB2YWx1ZTogJzE5ODInIH1cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vPT4gXVxuICAgKi9cblxuICB0b0xvY2FsZVBhcnRzKG9wdHMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWRcbiAgICAgID8gRm9ybWF0dGVyLmNyZWF0ZSh0aGlzLmxvYy5jbG9uZShvcHRzKSwgb3B0cykuZm9ybWF0RGF0ZVRpbWVQYXJ0cyh0aGlzKVxuICAgICAgOiBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIElTTyA4NjAxLWNvbXBsaWFudCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEYXRlVGltZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnNcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5zdXBwcmVzc01pbGxpc2Vjb25kcz1mYWxzZV0gLSBleGNsdWRlIG1pbGxpc2Vjb25kcyBmcm9tIHRoZSBmb3JtYXQgaWYgdGhleSdyZSAwXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdHMuc3VwcHJlc3NTZWNvbmRzPWZhbHNlXSAtIGV4Y2x1ZGUgc2Vjb25kcyBmcm9tIHRoZSBmb3JtYXQgaWYgdGhleSdyZSAwXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdHMuaW5jbHVkZU9mZnNldD10cnVlXSAtIGluY2x1ZGUgdGhlIG9mZnNldCwgc3VjaCBhcyAnWicgb3IgJy0wNDowMCdcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmZvcm1hdD0nZXh0ZW5kZWQnXSAtIGNob29zZSBiZXR3ZWVuIHRoZSBiYXNpYyBhbmQgZXh0ZW5kZWQgZm9ybWF0XG4gICAqIEBleGFtcGxlIERhdGVUaW1lLnV0YygxOTgyLCA1LCAyNSkudG9JU08oKSAvLz0+ICcxOTgyLTA1LTI1VDAwOjAwOjAwLjAwMFonXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKCkudG9JU08oKSAvLz0+ICcyMDE3LTA0LTIyVDIwOjQ3OjA1LjMzNS0wNDowMCdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoKS50b0lTTyh7IGluY2x1ZGVPZmZzZXQ6IGZhbHNlIH0pIC8vPT4gJzIwMTctMDQtMjJUMjA6NDc6MDUuMzM1J1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgpLnRvSVNPKHsgZm9ybWF0OiAnYmFzaWMnIH0pIC8vPT4gJzIwMTcwNDIyVDIwNDcwNS4zMzUtMDQwMCdcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cblxuICB0b0lTTyhvcHRzID0ge30pIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke3RoaXMudG9JU09EYXRlKG9wdHMpfVQke3RoaXMudG9JU09UaW1lKG9wdHMpfWA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBJU08gODYwMS1jb21wbGlhbnQgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRGF0ZVRpbWUncyBkYXRlIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnNcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmZvcm1hdD0nZXh0ZW5kZWQnXSAtIGNob29zZSBiZXR3ZWVuIHRoZSBiYXNpYyBhbmQgZXh0ZW5kZWQgZm9ybWF0XG4gICAqIEBleGFtcGxlIERhdGVUaW1lLnV0YygxOTgyLCA1LCAyNSkudG9JU09EYXRlKCkgLy89PiAnMTk4Mi0wNS0yNSdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUudXRjKDE5ODIsIDUsIDI1KS50b0lTT0RhdGUoeyBmb3JtYXQ6ICdiYXNpYycgfSkgLy89PiAnMTk4MjA1MjUnXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG5cbiAgdG9JU09EYXRlKHsgZm9ybWF0ID0gJ2V4dGVuZGVkJyB9ID0ge30pIHtcbiAgICBsZXQgZm10ID0gZm9ybWF0ID09PSAnYmFzaWMnID8gJ3l5eXlNTWRkJyA6ICd5eXl5LU1NLWRkJztcblxuICAgIGlmICh0aGlzLnllYXIgPiA5OTk5KSB7XG4gICAgICBmbXQgPSAnKycgKyBmbXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvVGVjaEZvcm1hdCh0aGlzLCBmbXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gSVNPIDg2MDEtY29tcGxpYW50IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIERhdGVUaW1lJ3Mgd2VlayBkYXRlXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLnV0YygxOTgyLCA1LCAyNSkudG9JU09XZWVrRGF0ZSgpIC8vPT4gJzE5ODItVzIxLTInXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG5cbiAgdG9JU09XZWVrRGF0ZSgpIHtcbiAgICByZXR1cm4gdG9UZWNoRm9ybWF0KHRoaXMsIFwia2tray0nVydXVy1jXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gSVNPIDg2MDEtY29tcGxpYW50IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIERhdGVUaW1lJ3MgdGltZSBjb21wb25lbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdHMuc3VwcHJlc3NNaWxsaXNlY29uZHM9ZmFsc2VdIC0gZXhjbHVkZSBtaWxsaXNlY29uZHMgZnJvbSB0aGUgZm9ybWF0IGlmIHRoZXkncmUgMFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLnN1cHByZXNzU2Vjb25kcz1mYWxzZV0gLSBleGNsdWRlIHNlY29uZHMgZnJvbSB0aGUgZm9ybWF0IGlmIHRoZXkncmUgMFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLmluY2x1ZGVPZmZzZXQ9dHJ1ZV0gLSBpbmNsdWRlIHRoZSBvZmZzZXQsIHN1Y2ggYXMgJ1onIG9yICctMDQ6MDAnXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5mb3JtYXQ9J2V4dGVuZGVkJ10gLSBjaG9vc2UgYmV0d2VlbiB0aGUgYmFzaWMgYW5kIGV4dGVuZGVkIGZvcm1hdFxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS51dGMoKS5zZXQoeyBob3VyOiA3LCBtaW51dGU6IDM0IH0pLnRvSVNPVGltZSgpIC8vPT4gJzA3OjM0OjE5LjM2MVonXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLnV0YygpLnNldCh7IGhvdXI6IDcsIG1pbnV0ZTogMzQsIHNlY29uZHM6IDAsIG1pbGxpc2Vjb25kczogMCB9KS50b0lTT1RpbWUoeyBzdXBwcmVzc1NlY29uZHM6IHRydWUgfSkgLy89PiAnMDc6MzRaJ1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS51dGMoKS5zZXQoeyBob3VyOiA3LCBtaW51dGU6IDM0IH0pLnRvSVNPVGltZSh7IGZvcm1hdDogJ2Jhc2ljJyB9KSAvLz0+ICcwNzM0MTkuMzYxWidcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cblxuICB0b0lTT1RpbWUoe1xuICAgIHN1cHByZXNzTWlsbGlzZWNvbmRzID0gZmFsc2UsXG4gICAgc3VwcHJlc3NTZWNvbmRzID0gZmFsc2UsXG4gICAgaW5jbHVkZU9mZnNldCA9IHRydWUsXG4gICAgZm9ybWF0ID0gJ2V4dGVuZGVkJyxcbiAgfSA9IHt9KSB7XG4gICAgcmV0dXJuIHRvVGVjaFRpbWVGb3JtYXQodGhpcywge1xuICAgICAgc3VwcHJlc3NTZWNvbmRzLFxuICAgICAgc3VwcHJlc3NNaWxsaXNlY29uZHMsXG4gICAgICBpbmNsdWRlT2Zmc2V0LFxuICAgICAgZm9ybWF0LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gUkZDIDI4MjItY29tcGF0aWJsZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEYXRlVGltZSwgYWx3YXlzIGluIFVUQ1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS51dGMoMjAxNCwgNywgMTMpLnRvUkZDMjgyMigpIC8vPT4gJ1N1biwgMTMgSnVsIDIwMTQgMDA6MDA6MDAgKzAwMDAnXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTQsIDcsIDEzKS50b1JGQzI4MjIoKSAvLz0+ICdTdW4sIDEzIEp1bCAyMDE0IDAwOjAwOjAwIC0wNDAwJ1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuXG4gIHRvUkZDMjgyMigpIHtcbiAgICByZXR1cm4gdG9UZWNoRm9ybWF0KHRoaXMsICdFRUUsIGRkIExMTCB5eXl5IEhIOm1tOnNzIFpaWicsIGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRGF0ZVRpbWUgYXBwcm9wcmlhdGUgZm9yIHVzZSBpbiBIVFRQIGhlYWRlcnMuXG4gICAqIFNwZWNpZmljYWxseSwgdGhlIHN0cmluZyBjb25mb3JtcyB0byBSRkMgMTEyMy5cbiAgICogQHNlZSBodHRwczovL3d3dy53My5vcmcvUHJvdG9jb2xzL3JmYzI2MTYvcmZjMjYxNi1zZWMzLmh0bWwjc2VjMy4zLjFcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUudXRjKDIwMTQsIDcsIDEzKS50b0hUVFAoKSAvLz0+ICdTdW4sIDEzIEp1bCAyMDE0IDAwOjAwOjAwIEdNVCdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUudXRjKDIwMTQsIDcsIDEzLCAxOSkudG9IVFRQKCkgLy89PiAnU3VuLCAxMyBKdWwgMjAxNCAxOTowMDowMCBHTVQnXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG5cbiAgdG9IVFRQKCkge1xuICAgIHJldHVybiB0b1RlY2hGb3JtYXQodGhpcy50b1VUQygpLCBcIkVFRSwgZGQgTExMIHl5eXkgSEg6bW06c3MgJ0dNVCdcIik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIERhdGVUaW1lIGFwcHJvcHJpYXRlIGZvciB1c2UgaW4gU1FMIERhdGVcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUudXRjKDIwMTQsIDcsIDEzKS50b1NRTERhdGUoKSAvLz0+ICcyMDE0LTA3LTEzJ1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuXG4gIHRvU1FMRGF0ZSgpIHtcbiAgICByZXR1cm4gdG9UZWNoRm9ybWF0KHRoaXMsICd5eXl5LU1NLWRkJyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIERhdGVUaW1lIGFwcHJvcHJpYXRlIGZvciB1c2UgaW4gU1FMIFRpbWVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdHMuaW5jbHVkZVpvbmU9ZmFsc2VdIC0gaW5jbHVkZSB0aGUgem9uZSwgc3VjaCBhcyAnQW1lcmljYS9OZXdfWW9yaycuIE92ZXJyaWRlcyBpbmNsdWRlT2Zmc2V0LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLmluY2x1ZGVPZmZzZXQ9dHJ1ZV0gLSBpbmNsdWRlIHRoZSBvZmZzZXQsIHN1Y2ggYXMgJ1onIG9yICctMDQ6MDAnXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLnV0YygpLnRvU1FMKCkgLy89PiAnMDU6MTU6MTYuMzQ1J1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgpLnRvU1FMKCkgLy89PiAnMDU6MTU6MTYuMzQ1IC0wNDowMCdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoKS50b1NRTCh7IGluY2x1ZGVPZmZzZXQ6IGZhbHNlIH0pIC8vPT4gJzA1OjE1OjE2LjM0NSdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoKS50b1NRTCh7IGluY2x1ZGVab25lOiBmYWxzZSB9KSAvLz0+ICcwNToxNToxNi4zNDUgQW1lcmljYS9OZXdfWW9yaydcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cblxuICB0b1NRTFRpbWUoeyBpbmNsdWRlT2Zmc2V0ID0gdHJ1ZSwgaW5jbHVkZVpvbmUgPSBmYWxzZSB9ID0ge30pIHtcbiAgICByZXR1cm4gdG9UZWNoVGltZUZvcm1hdCh0aGlzLCB7XG4gICAgICBpbmNsdWRlT2Zmc2V0LFxuICAgICAgaW5jbHVkZVpvbmUsXG4gICAgICBzcGFjZVpvbmU6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIERhdGVUaW1lIGFwcHJvcHJpYXRlIGZvciB1c2UgaW4gU1FMIERhdGVUaW1lXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLmluY2x1ZGVab25lPWZhbHNlXSAtIGluY2x1ZGUgdGhlIHpvbmUsIHN1Y2ggYXMgJ0FtZXJpY2EvTmV3X1lvcmsnLiBPdmVycmlkZXMgaW5jbHVkZU9mZnNldC5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5pbmNsdWRlT2Zmc2V0PXRydWVdIC0gaW5jbHVkZSB0aGUgb2Zmc2V0LCBzdWNoIGFzICdaJyBvciAnLTA0OjAwJ1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS51dGMoMjAxNCwgNywgMTMpLnRvU1FMKCkgLy89PiAnMjAxNC0wNy0xMyAwMDowMDowMC4wMDAgWidcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNCwgNywgMTMpLnRvU1FMKCkgLy89PiAnMjAxNC0wNy0xMyAwMDowMDowMC4wMDAgLTA0OjAwJ1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgyMDE0LCA3LCAxMykudG9TUUwoeyBpbmNsdWRlT2Zmc2V0OiBmYWxzZSB9KSAvLz0+ICcyMDE0LTA3LTEzIDAwOjAwOjAwLjAwMCdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNCwgNywgMTMpLnRvU1FMKHsgaW5jbHVkZVpvbmU6IHRydWUgfSkgLy89PiAnMjAxNC0wNy0xMyAwMDowMDowMC4wMDAgQW1lcmljYS9OZXdfWW9yaydcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cblxuICB0b1NRTChvcHRzID0ge30pIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke3RoaXMudG9TUUxEYXRlKCl9ICR7dGhpcy50b1NRTFRpbWUob3B0cyl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRGF0ZVRpbWUgYXBwcm9wcmlhdGUgZm9yIGRlYnVnZ2luZ1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLnRvSVNPKCkgOiBJTlZBTElEJDI7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZXBvY2ggbWlsbGlzZWNvbmRzIG9mIHRoaXMgRGF0ZVRpbWUuIEFsaWFzIG9mIHtAbGluayB0b01pbGxpc31cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cblxuICB2YWx1ZU9mKCkge1xuICAgIHJldHVybiB0aGlzLnRvTWlsbGlzKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZXBvY2ggbWlsbGlzZWNvbmRzIG9mIHRoaXMgRGF0ZVRpbWUuXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG5cbiAgdG9NaWxsaXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMudHMgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZXBvY2ggc2Vjb25kcyBvZiB0aGlzIERhdGVUaW1lLlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuXG4gIHRvU2Vjb25kcygpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy50cyAvIDEwMDAgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBJU08gODYwMSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIERhdGVUaW1lIGFwcHJvcHJpYXRlIGZvciB1c2UgaW4gSlNPTi5cbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cblxuICB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXMudG9JU08oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgQlNPTiBzZXJpYWxpemFibGUgZXF1aXZhbGVudCB0byB0aGlzIERhdGVUaW1lLlxuICAgKiBAcmV0dXJuIHtEYXRlfVxuICAgKi9cblxuICB0b0JTT04oKSB7XG4gICAgcmV0dXJuIHRoaXMudG9KU0RhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgSmF2YXNjcmlwdCBvYmplY3Qgd2l0aCB0aGlzIERhdGVUaW1lJ3MgeWVhciwgbW9udGgsIGRheSwgYW5kIHNvIG9uLlxuICAgKiBAcGFyYW0gb3B0cyAtIG9wdGlvbnMgZm9yIGdlbmVyYXRpbmcgdGhlIG9iamVjdFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLmluY2x1ZGVDb25maWc9ZmFsc2VdIC0gaW5jbHVkZSBjb25maWd1cmF0aW9uIGF0dHJpYnV0ZXMgaW4gdGhlIG91dHB1dFxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgpLnRvT2JqZWN0KCkgLy89PiB7IHllYXI6IDIwMTcsIG1vbnRoOiA0LCBkYXk6IDIyLCBob3VyOiAyMCwgbWludXRlOiA0OSwgc2Vjb25kOiA0MiwgbWlsbGlzZWNvbmQ6IDI2OCB9XG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG5cbiAgdG9PYmplY3Qob3B0cyA9IHt9KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiB7fTtcbiAgICBjb25zdCBiYXNlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jKTtcblxuICAgIGlmIChvcHRzLmluY2x1ZGVDb25maWcpIHtcbiAgICAgIGJhc2Uub3V0cHV0Q2FsZW5kYXIgPSB0aGlzLm91dHB1dENhbGVuZGFyO1xuICAgICAgYmFzZS5udW1iZXJpbmdTeXN0ZW0gPSB0aGlzLmxvYy5udW1iZXJpbmdTeXN0ZW07XG4gICAgICBiYXNlLmxvY2FsZSA9IHRoaXMubG9jLmxvY2FsZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYmFzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgSmF2YXNjcmlwdCBEYXRlIGVxdWl2YWxlbnQgdG8gdGhpcyBEYXRlVGltZS5cbiAgICogQHJldHVybiB7RGF0ZX1cbiAgICovXG5cbiAgdG9KU0RhdGUoKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHRoaXMuaXNWYWxpZCA/IHRoaXMudHMgOiBOYU4pO1xuICB9IC8vIENPTVBBUkVcblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdHdvIERhdGVUaW1lcyBhcyBhIER1cmF0aW9uLlxuICAgKiBAcGFyYW0ge0RhdGVUaW1lfSBvdGhlckRhdGVUaW1lIC0gdGhlIERhdGVUaW1lIHRvIGNvbXBhcmUgdGhpcyBvbmUgdG9cbiAgICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IFt1bml0PVsnbWlsbGlzZWNvbmRzJ11dIC0gdGhlIHVuaXQgb3IgYXJyYXkgb2YgdW5pdHMgKHN1Y2ggYXMgJ2hvdXJzJyBvciAnZGF5cycpIHRvIGluY2x1ZGUgaW4gdGhlIGR1cmF0aW9uLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnMgdGhhdCBhZmZlY3QgdGhlIGNyZWF0aW9uIG9mIHRoZSBEdXJhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMuY29udmVyc2lvbkFjY3VyYWN5PSdjYXN1YWwnXSAtIHRoZSBjb252ZXJzaW9uIHN5c3RlbSB0byB1c2VcbiAgICogQGV4YW1wbGVcbiAgICogdmFyIGkxID0gRGF0ZVRpbWUuZnJvbUlTTygnMTk4Mi0wNS0yNVQwOTo0NScpLFxuICAgKiAgICAgaTIgPSBEYXRlVGltZS5mcm9tSVNPKCcxOTgzLTEwLTE0VDEwOjMwJyk7XG4gICAqIGkyLmRpZmYoaTEpLnRvT2JqZWN0KCkgLy89PiB7IG1pbGxpc2Vjb25kczogNDM4MDc1MDAwMDAgfVxuICAgKiBpMi5kaWZmKGkxLCAnaG91cnMnKS50b09iamVjdCgpIC8vPT4geyBob3VyczogMTIxNjguNzUgfVxuICAgKiBpMi5kaWZmKGkxLCBbJ21vbnRocycsICdkYXlzJ10pLnRvT2JqZWN0KCkgLy89PiB7IG1vbnRoczogMTYsIGRheXM6IDE5LjAzMTI1IH1cbiAgICogaTIuZGlmZihpMSwgWydtb250aHMnLCAnZGF5cycsICdob3VycyddKS50b09iamVjdCgpIC8vPT4geyBtb250aHM6IDE2LCBkYXlzOiAxOSwgaG91cnM6IDAuNzUgfVxuICAgKiBAcmV0dXJuIHtEdXJhdGlvbn1cbiAgICovXG5cbiAgZGlmZihvdGhlckRhdGVUaW1lLCB1bml0ID0gJ21pbGxpc2Vjb25kcycsIG9wdHMgPSB7fSkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkIHx8ICFvdGhlckRhdGVUaW1lLmlzVmFsaWQpIHtcbiAgICAgIHJldHVybiBEdXJhdGlvbi5pbnZhbGlkKFxuICAgICAgICB0aGlzLmludmFsaWQgfHwgb3RoZXJEYXRlVGltZS5pbnZhbGlkLFxuICAgICAgICAnY3JlYXRlZCBieSBkaWZmaW5nIGFuIGludmFsaWQgRGF0ZVRpbWUnLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBkdXJPcHRzID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHtcbiAgICAgICAgbG9jYWxlOiB0aGlzLmxvY2FsZSxcbiAgICAgICAgbnVtYmVyaW5nU3lzdGVtOiB0aGlzLm51bWJlcmluZ1N5c3RlbSxcbiAgICAgIH0sXG4gICAgICBvcHRzLFxuICAgICk7XG4gICAgY29uc3QgdW5pdHMgPSBtYXliZUFycmF5KHVuaXQpLm1hcChEdXJhdGlvbi5ub3JtYWxpemVVbml0KSxcbiAgICAgIG90aGVySXNMYXRlciA9IG90aGVyRGF0ZVRpbWUudmFsdWVPZigpID4gdGhpcy52YWx1ZU9mKCksXG4gICAgICBlYXJsaWVyID0gb3RoZXJJc0xhdGVyID8gdGhpcyA6IG90aGVyRGF0ZVRpbWUsXG4gICAgICBsYXRlciA9IG90aGVySXNMYXRlciA/IG90aGVyRGF0ZVRpbWUgOiB0aGlzLFxuICAgICAgZGlmZmVkID0gZGlmZihlYXJsaWVyLCBsYXRlciwgdW5pdHMsIGR1ck9wdHMpO1xuICAgIHJldHVybiBvdGhlcklzTGF0ZXIgPyBkaWZmZWQubmVnYXRlKCkgOiBkaWZmZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhpcyBEYXRlVGltZSBhbmQgcmlnaHQgbm93LlxuICAgKiBTZWUge0BsaW5rIGRpZmZ9XG4gICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBbdW5pdD1bJ21pbGxpc2Vjb25kcyddXSAtIHRoZSB1bml0IG9yIHVuaXRzIHVuaXRzIChzdWNoIGFzICdob3Vycycgb3IgJ2RheXMnKSB0byBpbmNsdWRlIGluIHRoZSBkdXJhdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnMgdGhhdCBhZmZlY3QgdGhlIGNyZWF0aW9uIG9mIHRoZSBEdXJhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMuY29udmVyc2lvbkFjY3VyYWN5PSdjYXN1YWwnXSAtIHRoZSBjb252ZXJzaW9uIHN5c3RlbSB0byB1c2VcbiAgICogQHJldHVybiB7RHVyYXRpb259XG4gICAqL1xuXG4gIGRpZmZOb3codW5pdCA9ICdtaWxsaXNlY29uZHMnLCBvcHRzID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5kaWZmKERhdGVUaW1lLmxvY2FsKCksIHVuaXQsIG9wdHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbiBJbnRlcnZhbCBzcGFubmluZyBiZXR3ZWVuIHRoaXMgRGF0ZVRpbWUgYW5kIGFub3RoZXIgRGF0ZVRpbWVcbiAgICogQHBhcmFtIHtEYXRlVGltZX0gb3RoZXJEYXRlVGltZSAtIHRoZSBvdGhlciBlbmQgcG9pbnQgb2YgdGhlIEludGVydmFsXG4gICAqIEByZXR1cm4ge0ludGVydmFsfVxuICAgKi9cblxuICB1bnRpbChvdGhlckRhdGVUaW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IEludGVydmFsLmZyb21EYXRlVGltZXModGhpcywgb3RoZXJEYXRlVGltZSkgOiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB3aGV0aGVyIHRoaXMgRGF0ZVRpbWUgaXMgaW4gdGhlIHNhbWUgdW5pdCBvZiB0aW1lIGFzIGFub3RoZXIgRGF0ZVRpbWVcbiAgICogQHBhcmFtIHtEYXRlVGltZX0gb3RoZXJEYXRlVGltZSAtIHRoZSBvdGhlciBEYXRlVGltZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdW5pdCAtIHRoZSB1bml0IG9mIHRpbWUgdG8gY2hlY2sgc2FtZW5lc3Mgb25cbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoKS5oYXNTYW1lKG90aGVyRFQsICdkYXknKTsgLy9+PiB0cnVlIGlmIGJvdGggdGhlIHNhbWUgY2FsZW5kYXIgZGF5XG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuXG4gIGhhc1NhbWUob3RoZXJEYXRlVGltZSwgdW5pdCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAodW5pdCA9PT0gJ21pbGxpc2Vjb25kJykge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWVPZigpID09PSBvdGhlckRhdGVUaW1lLnZhbHVlT2YoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5wdXRNcyA9IG90aGVyRGF0ZVRpbWUudmFsdWVPZigpO1xuICAgICAgcmV0dXJuIHRoaXMuc3RhcnRPZih1bml0KSA8PSBpbnB1dE1zICYmIGlucHV0TXMgPD0gdGhpcy5lbmRPZih1bml0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXF1YWxpdHkgY2hlY2tcbiAgICogVHdvIERhdGVUaW1lcyBhcmUgZXF1YWwgaWZmIHRoZXkgcmVwcmVzZW50IHRoZSBzYW1lIG1pbGxpc2Vjb25kLCBoYXZlIHRoZSBzYW1lIHpvbmUgYW5kIGxvY2F0aW9uLCBhbmQgYXJlIGJvdGggdmFsaWQuXG4gICAqIFRvIGNvbXBhcmUganVzdCB0aGUgbWlsbGlzZWNvbmQgdmFsdWVzLCB1c2UgYCtkdDEgPT09ICtkdDJgLlxuICAgKiBAcGFyYW0ge0RhdGVUaW1lfSBvdGhlciAtIHRoZSBvdGhlciBEYXRlVGltZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cblxuICBlcXVhbHMob3RoZXIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5pc1ZhbGlkICYmXG4gICAgICBvdGhlci5pc1ZhbGlkICYmXG4gICAgICB0aGlzLnZhbHVlT2YoKSA9PT0gb3RoZXIudmFsdWVPZigpICYmXG4gICAgICB0aGlzLnpvbmUuZXF1YWxzKG90aGVyLnpvbmUpICYmXG4gICAgICB0aGlzLmxvYy5lcXVhbHMob3RoZXIubG9jKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHRoaXMgdGltZSByZWxhdGl2ZSB0byBub3csIHN1Y2ggYXMgXCJpbiB0d28gZGF5c1wiLiBDYW4gb25seSBpbnRlcm5hdGlvbmFsaXplIGlmIHlvdXJcbiAgICogcGxhdGZvcm0gc3VwcG9ydHMgSW50bC5SZWxhdGl2ZVRpbWVGb3JtYXQuIFJvdW5kcyBkb3duIGJ5IGRlZmF1bHQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyB0aGF0IGFmZmVjdCB0aGUgb3V0cHV0XG4gICAqIEBwYXJhbSB7RGF0ZVRpbWV9IFtvcHRpb25zLmJhc2U9RGF0ZVRpbWUubG9jYWwoKV0gLSB0aGUgRGF0ZVRpbWUgdG8gdXNlIGFzIHRoZSBiYXNpcyB0byB3aGljaCB0aGlzIHRpbWUgaXMgY29tcGFyZWQuIERlZmF1bHRzIHRvIG5vdy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnN0eWxlPVwibG9uZ1wiXSAtIHRoZSBzdHlsZSBvZiB1bml0cywgbXVzdCBiZSBcImxvbmdcIiwgXCJzaG9ydFwiLCBvciBcIm5hcnJvd1wiXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnVuaXQgLSB1c2UgYSBzcGVjaWZpYyB1bml0OyBpZiBvbWl0dGVkLCB0aGUgbWV0aG9kIHdpbGwgcGljayB0aGUgdW5pdC4gVXNlIG9uZSBvZiBcInllYXJzXCIsIFwicXVhcnRlcnNcIiwgXCJtb250aHNcIiwgXCJ3ZWVrc1wiLCBcImRheXNcIiwgXCJob3Vyc1wiLCBcIm1pbnV0ZXNcIiwgb3IgXCJzZWNvbmRzXCJcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5yb3VuZD10cnVlXSAtIHdoZXRoZXIgdG8gcm91bmQgdGhlIG51bWJlcnMgaW4gdGhlIG91dHB1dC5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5wYWRkaW5nPTBdIC0gcGFkZGluZyBpbiBtaWxsaXNlY29uZHMuIFRoaXMgYWxsb3dzIHlvdSB0byByb3VuZCB1cCB0aGUgcmVzdWx0IGlmIGl0IGZpdHMgaW5zaWRlIHRoZSB0aHJlc2hvbGQuIERvbid0IHVzZSBpbiBjb21iaW5hdGlvbiB3aXRoIHtyb3VuZDogZmFsc2V9IGJlY2F1c2UgdGhlIGRlY2ltYWwgb3V0cHV0IHdpbGwgaW5jbHVkZSB0aGUgcGFkZGluZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubG9jYWxlIC0gb3ZlcnJpZGUgdGhlIGxvY2FsZSBvZiB0aGlzIERhdGVUaW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm51bWJlcmluZ1N5c3RlbSAtIG92ZXJyaWRlIHRoZSBudW1iZXJpbmdTeXN0ZW0gb2YgdGhpcyBEYXRlVGltZS4gVGhlIEludGwgc3lzdGVtIG1heSBjaG9vc2Ugbm90IHRvIGhvbm9yIHRoaXNcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoKS5wbHVzKHsgZGF5czogMSB9KS50b1JlbGF0aXZlKCkgLy89PiBcImluIDEgZGF5XCJcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoKS5zZXRMb2NhbGUoXCJlc1wiKS50b1JlbGF0aXZlKHsgZGF5czogMSB9KSAvLz0+IFwiZGVudHJvIGRlIDEgZMOtYVwiXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKCkucGx1cyh7IGRheXM6IDEgfSkudG9SZWxhdGl2ZSh7IGxvY2FsZTogXCJmclwiIH0pIC8vPT4gXCJkYW5zIDIzIGhldXJlc1wiXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKCkubWludXMoeyBkYXlzOiAyIH0pLnRvUmVsYXRpdmUoKSAvLz0+IFwiMiBkYXlzIGFnb1wiXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKCkubWludXMoeyBkYXlzOiAyIH0pLnRvUmVsYXRpdmUoeyB1bml0OiBcImhvdXJzXCIgfSkgLy89PiBcIjQ4IGhvdXJzIGFnb1wiXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKCkubWludXMoeyBob3VyczogMzYgfSkudG9SZWxhdGl2ZSh7IHJvdW5kOiBmYWxzZSB9KSAvLz0+IFwiMS41IGRheXMgYWdvXCJcbiAgICovXG5cbiAgdG9SZWxhdGl2ZShvcHRpb25zID0ge30pIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgYmFzZSA9XG4gICAgICAgIG9wdGlvbnMuYmFzZSB8fFxuICAgICAgICBEYXRlVGltZS5mcm9tT2JqZWN0KHtcbiAgICAgICAgICB6b25lOiB0aGlzLnpvbmUsXG4gICAgICAgIH0pLFxuICAgICAgcGFkZGluZyA9IG9wdGlvbnMucGFkZGluZ1xuICAgICAgICA/IHRoaXMgPCBiYXNlXG4gICAgICAgICAgPyAtb3B0aW9ucy5wYWRkaW5nXG4gICAgICAgICAgOiBvcHRpb25zLnBhZGRpbmdcbiAgICAgICAgOiAwO1xuICAgIHJldHVybiBkaWZmUmVsYXRpdmUoXG4gICAgICBiYXNlLFxuICAgICAgdGhpcy5wbHVzKHBhZGRpbmcpLFxuICAgICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCB7XG4gICAgICAgIG51bWVyaWM6ICdhbHdheXMnLFxuICAgICAgICB1bml0czogWyd5ZWFycycsICdtb250aHMnLCAnZGF5cycsICdob3VycycsICdtaW51dGVzJywgJ3NlY29uZHMnXSxcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGRhdGUgcmVsYXRpdmUgdG8gdG9kYXksIHN1Y2ggYXMgXCJ5ZXN0ZXJkYXlcIiBvciBcIm5leHQgbW9udGhcIi5cbiAgICogT25seSBpbnRlcm5hdGlvbmFsaXplcyBvbiBwbGF0Zm9ybXMgdGhhdCBzdXBwb3J0cyBJbnRsLlJlbGF0aXZlVGltZUZvcm1hdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBvcHRpb25zIHRoYXQgYWZmZWN0IHRoZSBvdXRwdXRcbiAgICogQHBhcmFtIHtEYXRlVGltZX0gW29wdGlvbnMuYmFzZT1EYXRlVGltZS5sb2NhbCgpXSAtIHRoZSBEYXRlVGltZSB0byB1c2UgYXMgdGhlIGJhc2lzIHRvIHdoaWNoIHRoaXMgdGltZSBpcyBjb21wYXJlZC4gRGVmYXVsdHMgdG8gbm93LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5sb2NhbGUgLSBvdmVycmlkZSB0aGUgbG9jYWxlIG9mIHRoaXMgRGF0ZVRpbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMudW5pdCAtIHVzZSBhIHNwZWNpZmljIHVuaXQ7IGlmIG9taXR0ZWQsIHRoZSBtZXRob2Qgd2lsbCBwaWNrIHRoZSB1bml0LiBVc2Ugb25lIG9mIFwieWVhcnNcIiwgXCJxdWFydGVyc1wiLCBcIm1vbnRoc1wiLCBcIndlZWtzXCIsIG9yIFwiZGF5c1wiXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm51bWJlcmluZ1N5c3RlbSAtIG92ZXJyaWRlIHRoZSBudW1iZXJpbmdTeXN0ZW0gb2YgdGhpcyBEYXRlVGltZS4gVGhlIEludGwgc3lzdGVtIG1heSBjaG9vc2Ugbm90IHRvIGhvbm9yIHRoaXNcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoKS5wbHVzKHsgZGF5czogMSB9KS50b1JlbGF0aXZlQ2FsZW5kYXIoKSAvLz0+IFwidG9tb3Jyb3dcIlxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgpLnNldExvY2FsZShcImVzXCIpLnBsdXMoeyBkYXlzOiAxIH0pLnRvUmVsYXRpdmUoKSAvLz0+IFwiXCJtYcOxYW5hXCJcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoKS5wbHVzKHsgZGF5czogMSB9KS50b1JlbGF0aXZlQ2FsZW5kYXIoeyBsb2NhbGU6IFwiZnJcIiB9KSAvLz0+IFwiZGVtYWluXCJcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoKS5taW51cyh7IGRheXM6IDIgfSkudG9SZWxhdGl2ZUNhbGVuZGFyKCkgLy89PiBcIjIgZGF5cyBhZ29cIlxuICAgKi9cblxuICB0b1JlbGF0aXZlQ2FsZW5kYXIob3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBkaWZmUmVsYXRpdmUoXG4gICAgICBvcHRpb25zLmJhc2UgfHxcbiAgICAgICAgRGF0ZVRpbWUuZnJvbU9iamVjdCh7XG4gICAgICAgICAgem9uZTogdGhpcy56b25lLFxuICAgICAgICB9KSxcbiAgICAgIHRoaXMsXG4gICAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHtcbiAgICAgICAgbnVtZXJpYzogJ2F1dG8nLFxuICAgICAgICB1bml0czogWyd5ZWFycycsICdtb250aHMnLCAnZGF5cyddLFxuICAgICAgICBjYWxlbmRhcnk6IHRydWUsXG4gICAgICB9KSxcbiAgICApO1xuICB9XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmcmllbmRseURhdGVUaW1lKGRhdGVUaW1laXNoKSB7XG4gIGlmIChEYXRlVGltZS5pc0RhdGVUaW1lKGRhdGVUaW1laXNoKSkge1xuICAgIHJldHVybiBkYXRlVGltZWlzaDtcbiAgfSBlbHNlIGlmIChcbiAgICBkYXRlVGltZWlzaCAmJlxuICAgIGRhdGVUaW1laXNoLnZhbHVlT2YgJiZcbiAgICBpc051bWJlcihkYXRlVGltZWlzaC52YWx1ZU9mKCkpXG4gICkge1xuICAgIHJldHVybiBEYXRlVGltZS5mcm9tSlNEYXRlKGRhdGVUaW1laXNoKTtcbiAgfSBlbHNlIGlmIChkYXRlVGltZWlzaCAmJiB0eXBlb2YgZGF0ZVRpbWVpc2ggPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIERhdGVUaW1lLmZyb21PYmplY3QoZGF0ZVRpbWVpc2gpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFcnJvcihcbiAgICAgIGBVbmtub3duIGRhdGV0aW1lIGFyZ3VtZW50OiAke2RhdGVUaW1laXNofSwgb2YgdHlwZSAke3R5cGVvZiBkYXRlVGltZWlzaH1gLFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHsgRGF0ZVRpbWUgfTtcbmV4cG9ydCB7IER1cmF0aW9uIH07XG5leHBvcnQgeyBGaXhlZE9mZnNldFpvbmUgfTtcbmV4cG9ydCB7IElBTkFab25lIH07XG5leHBvcnQgeyBJbmZvIH07XG5leHBvcnQgeyBJbnRlcnZhbCB9O1xuZXhwb3J0IHsgSW52YWxpZFpvbmUgfTtcbmV4cG9ydCB7IExvY2FsWm9uZSB9O1xuZXhwb3J0IHsgU2V0dGluZ3MgfTtcbmV4cG9ydCB7IFpvbmUgfTsgLy8jIHNvdXJjZU1hcHBpbmdVUkw9bHV4b24uanMubWFwXG5cbmV4cG9ydCBkZWZhdWx0IF9leHA7XG4iXX0=