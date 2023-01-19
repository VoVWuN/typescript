class t extends Error {
}
class e extends t {
    constructor(t) {
        super(`Invalid DateTime: ${t.toMessage()}`);
    }
}
class s extends t {
    constructor(t) {
        super(`Invalid Duration: ${t.toMessage()}`);
    }
}
class n extends t {
    constructor(t) {
        super(`Invalid Interval: ${t.toMessage()}`);
    }
}
class r extends t {
    constructor(t) {
        super(`Invalid unit ${t}`), Object.setPrototypeOf(this, r.prototype);
    }
}
class i extends t {
    constructor(t) {
        super(`${t} is an invalid or unknown zone specifier`),
            Object.setPrototypeOf(this, i.prototype);
    }
}
class a extends t {
    constructor(t) {
        super(t), Object.setPrototypeOf(this, a.prototype);
    }
}
class o extends t {
    constructor(t) {
        super(t), Object.setPrototypeOf(this, o.prototype);
    }
}
class u extends t {
    constructor() {
        super('Zone is an abstract class'),
            Object.setPrototypeOf(this, u.prototype);
    }
}
function c(...t) {
    t.length;
}
class l {
    get type() {
        throw new u();
    }
    get ianaName() {
        return this.name;
    }
    get name() {
        throw new u();
    }
    get isUniversal() {
        throw new u();
    }
    get isValid() {
        throw new u();
    }
    offsetName(t, e) {
        throw (c(t, e), new u());
    }
    formatOffset(t, e) {
        throw (c(t, e), new u());
    }
    offset(t) {
        throw (c(t), new u());
    }
    equals(t) {
        throw (c(t), new u());
    }
}
var h = Intl;
let d = {};
const m = { year: 0, month: 1, day: 2, era: 3, hour: 4, minute: 5, second: 6 };
let f = {};
class y extends l {
    constructor(t) {
        super(), (this._zoneName = t), (this._valid = y.isValidZone(t));
    }
    get type() {
        return 'iana';
    }
    get name() {
        return this._zoneName;
    }
    get isUniversal() {
        return !1;
    }
    get isValid() {
        return this._valid;
    }
    static create(t) {
        return f[t] || (f[t] = new y(t)), f[t];
    }
    static resetCache() {
        (f = {}), (d = {});
    }
    static isValidSpecifier(t) {
        return this.isValidZone(t);
    }
    static isValidZone(t) {
        if (!t)
            return !1;
        try {
            return new h.DateTimeFormat('en-US', { timeZone: t }).format(), !0;
        }
        catch (t) {
            return !1;
        }
    }
    offsetName(t, { format: e, locale: s } = {}) {
        return Wt(t, e, s, this.name);
    }
    formatOffset(t, e) {
        return Yt(this.offset(t), e);
    }
    offset(t) {
        const e = new Date(t);
        if (isNaN(+e))
            return NaN;
        const s = (function (t) {
            if (!d[t])
                try {
                    d[t] = new h.DateTimeFormat('en-US', {
                        hour12: !1,
                        timeZone: t,
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        era: 'short',
                    });
                }
                catch (e) {
                    throw new i(t);
                }
            return d[t];
        })(this.name);
        let n;
        const [r, a, o, u, c, l, f] = typeof s.formatToParts == typeof isNaN
            ? (function (t, e) {
                const s = t.formatToParts(e), n = [];
                for (let t = 0; t < s.length; t++) {
                    const { type: e, value: r } = s[t], i = m[e];
                    'era' === e ? (n[i] = r) : Mt(i) || (n[i] = parseInt(r, 10));
                }
                return n;
            })(s, e)
            : (function (t, e) {
                const s = t.format(e).replace(/\u200E/g, ''), n = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(s), [, r, i, a, o, u, c, l] = n;
                return [a, r, i, o, u, c, l];
            })(s, e);
        'BC' === u && (n = 1 - Math.abs(+r));
        let y = +e;
        const g = y % 1e3;
        return ((y -= g >= 0 ? g : 1e3 + g),
            (qt({
                year: n || +r,
                month: +a,
                day: +o,
                hour: +(24 === c ? 0 : c),
                minute: +l,
                second: +f,
                millisecond: 0,
            }) -
                y) /
                6e4);
    }
    equals(t) {
        return 'iana' === t.type && t.name === this.name;
    }
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
const g = 'numeric', _ = 'short', p = 'long', w = { year: g, month: g, day: g }, O = { year: g, month: _, day: g }, b = { year: g, month: _, day: g, weekday: _ }, v = { year: g, month: p, day: g }, T = { year: g, month: p, day: g, weekday: p }, S = { hour: g, minute: g }, k = { hour: g, minute: g, second: g }, M = { hour: g, minute: g, second: g, timeZoneName: _ }, N = { hour: g, minute: g, second: g, timeZoneName: p }, D = { hour: g, minute: g, hourCycle: 'h23' }, E = { hour: g, minute: g, second: g, hourCycle: 'h23' }, j = { hour: g, minute: g, second: g, hourCycle: 'h23', timeZoneName: _ }, x = { hour: g, minute: g, second: g, hourCycle: 'h23', timeZoneName: p }, I = { year: g, month: g, day: g, hour: g, minute: g }, V = { year: g, month: g, day: g, hour: g, minute: g, second: g }, C = { year: g, month: _, day: g, hour: g, minute: g }, F = { year: g, month: _, day: g, hour: g, minute: g, second: g }, Z = { year: g, month: _, day: g, weekday: _, hour: g, minute: g }, $ = { year: g, month: p, day: g, hour: g, minute: g, timeZoneName: _ }, L = {
    year: g,
    month: p,
    day: g,
    hour: g,
    minute: g,
    second: g,
    timeZoneName: _,
}, z = {
    year: g,
    month: p,
    day: g,
    weekday: p,
    hour: g,
    minute: g,
    timeZoneName: p,
}, q = {
    year: g,
    month: p,
    day: g,
    weekday: p,
    hour: g,
    minute: g,
    second: g,
    timeZoneName: p,
}, A = [
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
], U = [
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
], W = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
function P(t) {
    switch (t) {
        case 'narrow':
            return [...W];
        case 'short':
            return [...U];
        case 'long':
            return [...A];
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
    }
}
const H = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
], R = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], Y = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
function J(t) {
    switch (t) {
        case 'narrow':
            return [...Y];
        case 'short':
            return [...R];
        case 'long':
            return [...H];
        case 'numeric':
            return ['1', '2', '3', '4', '5', '6', '7'];
    }
}
const G = ['AM', 'PM'], B = ['Before Christ', 'Anno Domini'], Q = ['BC', 'AD'], K = ['B', 'A'];
function X(t) {
    switch (t) {
        case 'narrow':
            return [...K];
        case 'short':
            return [...Q];
        case 'long':
            return [...B];
    }
}
let tt = {};
let et = {};
function st(t, e = {}) {
    const s = JSON.stringify([t, e]);
    let n = et[s];
    return n || ((n = new h.DateTimeFormat(t, e)), (et[s] = n)), n;
}
let nt = {};
let rt, it = {};
function at(t, e, s, n) {
    return 'en' === t.listingMode() ? s(e) : n(e);
}
class ot {
    constructor(t, e, s) {
        (this._padTo = s.padTo || 0), (this._floor = s.floor || !1);
        const n = (function (t, e) {
            var s = {};
            for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) &&
                    e.indexOf(n) < 0 &&
                    (s[n] = t[n]);
            if (null != t && 'function' == typeof Object.getOwnPropertySymbols) {
                var r = 0;
                for (n = Object.getOwnPropertySymbols(t); r < n.length; r++)
                    e.indexOf(n[r]) < 0 &&
                        Object.prototype.propertyIsEnumerable.call(t, n[r]) &&
                        (s[n[r]] = t[n[r]]);
            }
            return s;
        })(s, ['padTo', 'floor']);
        if (!e || Object.keys(n).length > 0) {
            const e = Object.assign({ useGrouping: !1 }, s);
            this._padTo > 0 && (e.minimumIntegerDigits = s.padTo),
                (this._inf = (function (t, e) {
                    const s = JSON.stringify([t, e]);
                    let n = nt[s];
                    return n || ((n = new h.NumberFormat(t, e)), (nt[s] = n)), n;
                })(t, e));
        }
    }
    format(t) {
        if (this._inf) {
            const e = this._floor ? Math.floor(t) : t;
            return this._inf.format(e);
        }
        return It(this._floor ? Math.floor(t) : Zt(t, 3), this._padTo);
    }
}
class ut {
    constructor(t, e, s) {
        let n;
        if (((this._opts = s), t.zone.isUniversal)) {
            const e = (t.offset / 60) * -1, r = e >= 0 ? `Etc/GMT+${e}` : `Etc/GMT${e}`;
            0 !== t.offset && y.create(r).isValid
                ? ((n = r), (this._dt = t))
                : ((n = 'UTC'),
                    s.timeZoneName
                        ? (this._dt = t)
                        : (this._dt =
                            0 === t.offset
                                ? t
                                : As.fromMillis(t.ts + 60 * t.offset * 1e3)));
        }
        else
            'system' === t.zone.type
                ? (this._dt = t)
                : ((this._dt = t), (n = t.zone.name));
        const r = Object.assign(Object.assign({}, this._opts), {
            timeZone: this._opts.timeZone || n,
        });
        this._dtf = st(e, r);
    }
    get dtf() {
        return this._dtf;
    }
    format() {
        return this._dtf.format(this._dt.toJSDate());
    }
    formatToParts() {
        return this._dtf.formatToParts(this._dt.toJSDate());
    }
    resolvedOptions() {
        return this._dtf.resolvedOptions();
    }
}
class ct {
    constructor(t, e, s) {
        (this._opts = Object.assign({ style: 'long' }, s)),
            !e &&
                Et() &&
                (this._rtf = (function (t, e = {}) {
                    const s = JSON.stringify([t, e]);
                    let n = it[s];
                    return n || ((n = new h.RelativeTimeFormat(t, e)), (it[s] = n)), n;
                })(t, s));
    }
    format(t, e) {
        return this._rtf
            ? this._rtf.format(t, e)
            : (function (t, e, s = 'always', n = !1) {
                const r = Re.normalizeUnit(t), i = {
                    years: ['year', 'yr.'],
                    quarters: ['quarter', 'qtr.'],
                    months: ['month', 'mo.'],
                    weeks: ['week', 'wk.'],
                    days: ['day', 'day', 'days'],
                    hours: ['hour', 'hr.'],
                    minutes: ['minute', 'min.'],
                    seconds: ['second', 'sec.'],
                    milliseconds: [],
                }[r], a = -1 === ['hours', 'minutes', 'seconds'].indexOf(r);
                if ('auto' === s && a) {
                    const t = 'days' === r;
                    switch (e) {
                        case 1:
                            return t ? 'tomorrow' : `next ${i[0]}`;
                        case -1:
                            return t ? 'yesterday' : `last ${i[0]}`;
                        case 0:
                            return t ? 'today' : `this ${i[0]}`;
                    }
                }
                const o = Object.is(e, -0) || e < 0, u = Math.abs(e), c = 1 === u, l = n ? (c ? i[1] : i[2] || i[1]) : c ? i[0] : r;
                return o ? `${u} ${l} ago` : `in ${u} ${l}`;
            })(e, t, this._opts.numeric, 'long' !== this._opts.style);
    }
    formatToParts(t, e) {
        return this._rtf ? this._rtf.formatToParts(t, e) : [];
    }
}
class lt {
    constructor(t, e, s, n) {
        const [r, i, a] = (function (t) {
            const e = t.indexOf('-x-');
            -1 !== e && (t = t.substring(0, e));
            const s = t.indexOf('-u-');
            if (-1 === s)
                return [t];
            {
                let e, n;
                try {
                    (e = st(t).resolvedOptions()), (n = t);
                }
                catch (r) {
                    const i = t.substring(0, s);
                    (e = st(i).resolvedOptions()), (n = i);
                }
                const { numberingSystem: r, calendar: i } = e;
                return [n, r, i];
            }
        })(t);
        (this.locale = r),
            (this.numberingSystem = e || i),
            (this.outputCalendar = s || a),
            (this._intl = (function (t, e, s) {
                return s || e
                    ? (t.includes('-u-') || (t += '-u'),
                        s && (t += `-ca-${s}`),
                        e && (t += `-nu-${e}`),
                        t)
                    : t;
            })(this.locale, this.numberingSystem, this.outputCalendar)),
            (this._weekdaysCache = {
                format: {},
                standalone: {},
            }),
            (this._monthsCache = {
                format: {},
                standalone: {},
            }),
            (this._meridiemCache = void 0),
            (this._eraCache = {}),
            (this._specifiedLocale = n),
            (this._fastNumbersCached = void 0);
    }
    get fastNumbers() {
        return (void 0 === this._fastNumbersCached &&
            (this._fastNumbersCached = this._supportsFastNumbers()),
            this._fastNumbersCached);
    }
    static fromOpts(t) {
        return lt.create(t.locale, t.numberingSystem, t.outputCalendar, t.defaultToEN);
    }
    static create(t, e, s, n = !1) {
        const r = t || St.defaultLocale, i = r ||
            (n
                ? 'en-US'
                : (rt || (rt = new h.DateTimeFormat().resolvedOptions().locale), rt)), a = e || St.defaultNumberingSystem, o = s || St.defaultOutputCalendar;
        return new lt(i, a, o, r);
    }
    static resetCache() {
        (rt = void 0), (tt = {}), (et = {}), (nt = {}), (it = {});
    }
    static fromObject({ locale: t, numberingSystem: e, outputCalendar: s } = {}) {
        return lt.create(t, e, s);
    }
    listingMode() {
        const t = this.isEnglish(), e = !((null !== this.numberingSystem && 'latn' !== this.numberingSystem) ||
            (null !== this.outputCalendar && 'gregory' !== this.outputCalendar));
        return t && e ? 'en' : 'intl';
    }
    clone(t) {
        return t && 0 !== Object.getOwnPropertyNames(t).length
            ? lt.create(t.locale || this._specifiedLocale, t.numberingSystem || this.numberingSystem, t.outputCalendar || this.outputCalendar, t.defaultToEN || !1)
            : this;
    }
    redefaultToEN(t = {}) {
        return this.clone(Object.assign(Object.assign({}, t), { defaultToEN: !0 }));
    }
    redefaultToSystem(t = {}) {
        return this.clone(Object.assign(Object.assign({}, t), { defaultToEN: !1 }));
    }
    months(t, e = !1) {
        return at(this, t, P, t => {
            const s = e ? { month: t, day: 'numeric' } : { month: t }, n = e ? 'format' : 'standalone';
            return (this._monthsCache[n][t] ||
                (this._monthsCache[n][t] = (function (t) {
                    const e = [];
                    for (let s = 1; s <= 12; s++) {
                        const n = As.utc(2016, s, 1);
                        e.push(t(n));
                    }
                    return e;
                })(t => this.extract(t, s, 'month'))),
                this._monthsCache[n][t]);
        });
    }
    weekdays(t, e = !1) {
        return at(this, t, J, t => {
            const s = e
                ? { weekday: t, year: 'numeric', month: 'long', day: 'numeric' }
                : { weekday: t }, n = e ? 'format' : 'standalone';
            return (this._weekdaysCache[n][t] ||
                (this._weekdaysCache[n][t] = (function (t) {
                    const e = [];
                    for (let s = 1; s <= 7; s++) {
                        const n = As.utc(2016, 11, 13 + s);
                        e.push(t(n));
                    }
                    return e;
                })(t => this.extract(t, s, 'weekday'))),
                this._weekdaysCache[n][t]);
        });
    }
    meridiems() {
        return at(this, 'long', () => G, () => (void 0 === this._meridiemCache &&
            (this._meridiemCache = [
                As.utc(2016, 11, 13, 9),
                As.utc(2016, 11, 13, 19),
            ].map(t => this.extract(t, {
                hour: 'numeric',
                hourCycle: 'h12',
            }, 'dayPeriod'))),
            this._meridiemCache));
    }
    eras(t) {
        return at(this, t, X, t => {
            const e = { era: t };
            return (this._eraCache[t] ||
                (this._eraCache[t] = [As.utc(-40, 1, 1), As.utc(2017, 1, 1)].map(t => this.extract(t, e, 'era'))),
                this._eraCache[t]);
        });
    }
    extract(t, e, s) {
        const n = this.dtFormatter(t, e)
            .formatToParts()
            .find(t => t.type.toLowerCase() === s.toLowerCase());
        if (!n)
            throw new Error(`Invalid extract field ${s}`);
        return n.value;
    }
    numberFormatter(t = {}) {
        return new ot(this._intl, this.fastNumbers, t);
    }
    dtFormatter(t, e = {}) {
        return new ut(t, this._intl, e);
    }
    relFormatter(t = {}) {
        return new ct(this._intl, this.isEnglish(), t);
    }
    listFormatter(t = {}) {
        return (function (t, e = {}) {
            const s = JSON.stringify([t, e]);
            let n = tt[s];
            return n || ((n = new h.ListFormat(t, e)), (tt[s] = n)), n;
        })(this._intl, t);
    }
    isEnglish() {
        return (!!~['en', 'en-us'].indexOf(this.locale.toLowerCase()) ||
            new h.DateTimeFormat(this._intl)
                .resolvedOptions()
                .locale.startsWith('en-us'));
    }
    equals(t) {
        return (this.locale === t.locale &&
            this.numberingSystem === t.numberingSystem &&
            this.outputCalendar === t.outputCalendar);
    }
    _supportsFastNumbers() {
        return ((!this.numberingSystem || 'latn' === this.numberingSystem) &&
            ('latn' === this.numberingSystem ||
                !this.locale ||
                this.locale.startsWith('en') ||
                'latn' ===
                    h.DateTimeFormat(this._intl).resolvedOptions().numberingSystem));
    }
}
let ht = null;
class dt extends l {
    constructor(t) {
        super(), (this._fixed = t);
    }
    static get utcInstance() {
        return null === ht && (ht = new dt(0)), ht;
    }
    get isValid() {
        return !0;
    }
    get ianaName() {
        return 0 === this._fixed
            ? 'Etc/UTC'
            : `Etc/GMT${Yt(-this._fixed, 'narrow')}`;
    }
    get name() {
        return 0 === this._fixed ? 'UTC' : `UTC${Yt(this._fixed, 'narrow')}`;
    }
    get type() {
        return 'fixed';
    }
    get isUniversal() {
        return !0;
    }
    static instance(t) {
        return 0 === t ? dt.utcInstance : new dt(t);
    }
    static parseSpecifier(t) {
        if (t) {
            const e = t.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
            if (e)
                return new dt(Pt(e[1], e[2]));
        }
        return null;
    }
    offsetName() {
        return this.name;
    }
    formatOffset(t, e) {
        return Yt(this._fixed, e);
    }
    offset() {
        return this._fixed;
    }
    equals(t) {
        return 'fixed' === t.type && t._fixed === this._fixed;
    }
}
class mt extends l {
    constructor(t) {
        super(), (this._zoneName = t), Object.setPrototypeOf(this, mt.prototype);
    }
    get type() {
        return 'invalid';
    }
    get name() {
        return this._zoneName;
    }
    get isUniversal() {
        return !1;
    }
    get isValid() {
        return !1;
    }
    offsetName() {
        return null;
    }
    formatOffset() {
        return '';
    }
    offset() {
        return NaN;
    }
    equals() {
        return !1;
    }
}
let ft = null;
class yt extends l {
    static get instance() {
        return null === ft && (ft = new yt()), ft;
    }
    get type() {
        return 'system';
    }
    get name() {
        return new Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    get isUniversal() {
        return !1;
    }
    get isValid() {
        return !0;
    }
    offsetName(t, { format: e, locale: s }) {
        return Wt(t, e, s);
    }
    formatOffset(t, e) {
        return Yt(this.offset(t), e);
    }
    offset(t) {
        return -new Date(t).getTimezoneOffset();
    }
    equals(t) {
        return 'system' === t.type;
    }
}
const gt = (t, e) => {
    if (Mt(t) || null === t)
        return e;
    if (t instanceof l)
        return t;
    if ('string' == typeof t) {
        const s = t.toLowerCase();
        return 'default' === s
            ? e
            : 'local' === s || 'system' === s
                ? yt.instance
                : 'utc' === s || 'gmt' === s
                    ? dt.utcInstance
                    : dt.parseSpecifier(s) || y.create(t);
    }
    return Nt(t)
        ? dt.instance(t)
        : 'object' == typeof t && t.offset && 'number' == typeof t.offset
            ? t
            : new mt(t);
};
let _t, pt, wt, Ot = () => Date.now(), bt = 'system', vt = 60, Tt = !1;
class St {
    static get now() {
        return Ot;
    }
    static set now(t) {
        Ot = t;
    }
    static set defaultZoneLike(t) {
        bt = t;
    }
    static get defaultZone() {
        return gt(bt, yt.instance);
    }
    static set defaultZone(t) {
        bt = t;
    }
    static get defaultLocale() {
        return _t;
    }
    static set defaultLocale(t) {
        _t = t;
    }
    static get defaultNumberingSystem() {
        return pt;
    }
    static set defaultNumberingSystem(t) {
        pt = t;
    }
    static get defaultOutputCalendar() {
        return wt;
    }
    static set defaultOutputCalendar(t) {
        wt = t;
    }
    static get twoDigitCutoffYear() {
        return vt;
    }
    static set twoDigitCutoffYear(t) {
        vt = t % 100;
    }
    static get throwOnInvalid() {
        return Tt;
    }
    static set throwOnInvalid(t) {
        Tt = t;
    }
    static resetCaches() {
        lt.resetCache(), y.resetCache();
    }
}
function kt(t) {
    return void 0 !== t;
}
function Mt(t) {
    return void 0 === t;
}
function Nt(t) {
    return 'number' == typeof t;
}
function Dt(t) {
    return Nt(t) && t % 1 == 0;
}
function Et() {
    try {
        return void 0 !== h && !!h.RelativeTimeFormat;
    }
    catch (t) {
        return !1;
    }
}
function jt(t, e, s) {
    if (0 === t.length)
        return;
    return t.reduce((t, n) => {
        const r = [e(n), n];
        return s(t[0], r[0]) === t[0] ? t : r;
    }, [e(t[0]), t[0]])[1];
}
function xt(t, e, s) {
    return Dt(t) && t >= e && t <= s;
}
function It(t, e = 2) {
    const s = t < 0 ? '-' : '', n = s ? -1 * +t : t;
    let r;
    return ((r =
        n.toString().length < e ? ('0'.repeat(e) + n).slice(-e) : n.toString()),
        `${s}${r}`);
}
function Vt(t) {
    if (t)
        return parseInt(t, 10);
}
function Ct(t) {
    if (t)
        return parseFloat(t);
}
function Ft(t) {
    if (!Mt(t) && null !== t && '' !== t) {
        const e = 1e3 * parseFloat('0.' + t);
        return Math.floor(e);
    }
}
function Zt(t, e, s = !1) {
    const n = Math.pow(10, e);
    return (s ? Math.trunc : Math.round)(t * n) / n;
}
function $t(t) {
    return t % 4 == 0 && (t % 100 != 0 || t % 400 == 0);
}
function Lt(t) {
    return $t(t) ? 366 : 365;
}
function zt(t, e) {
    const s = (function (t, e) {
        return t - e * Math.floor(t / e);
    })(e - 1, 12) + 1;
    return [
        31,
        $t(t + (e - s) / 12) ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ][s - 1];
}
function qt(t) {
    const e = Date.UTC(t.year, t.month - 1, t.day, t.hour, t.minute, t.second, t.millisecond);
    if (xt(t.year, 0, 99)) {
        const t = new Date(e);
        return t.setUTCFullYear(t.getUTCFullYear() - 1900), t.getTime();
    }
    return e;
}
function At(t) {
    const e = (t + Math.floor(t / 4) - Math.floor(t / 100) + Math.floor(t / 400)) % 7, s = t - 1, n = (s + Math.floor(s / 4) - Math.floor(s / 100) + Math.floor(s / 400)) % 7;
    return 4 === e || 3 === n ? 53 : 52;
}
function Ut(t) {
    return t > 99 ? t : t > St.twoDigitCutoffYear ? 1900 + t : 2e3 + t;
}
function Wt(t, e, s, n) {
    const r = new Date(t), i = {
        hourCycle: 'h23',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: n,
    }, a = Object.assign({ timeZoneName: e }, i), o = new h.DateTimeFormat(s, a)
        .formatToParts(r)
        .find(t => 'timezonename' === t.type.toLowerCase());
    return o ? o.value : null;
}
function Pt(t, e) {
    let s = parseInt(t, 10);
    Number.isNaN(s) && (s = 0);
    const n = parseInt(e, 10) || 0;
    return 60 * s + (s < 0 || Object.is(s, -0) ? -n : n);
}
function Ht(t) {
    const e = Number(t);
    if ('boolean' == typeof t || '' === t || Number.isNaN(e))
        throw new o(`Invalid unit value ${t}`);
    return e;
}
function Rt(t, e) {
    return Object.keys(t).reduce((s, n) => (void 0 !== t[n] && null !== t[n] && (s[e(n)] = Ht(t[n])), s), {});
}
function Yt(t, e) {
    const s = Math.trunc(Math.abs(t / 60)), n = Math.trunc(Math.abs(t % 60)), r = t >= 0 ? '+' : '-';
    switch (e) {
        case 'short':
            return `${r}${It(s, 2)}:${It(n, 2)}`;
        case 'narrow':
            return `${r}${s}${n > 0 ? `:${n}` : ''}`;
        case 'techie':
            return `${r}${It(s, 2)}${It(n, 2)}`;
        default:
            throw new RangeError(`Value format ${e} is out of range for property format`);
    }
}
function Jt(t) {
    return (function (t, e) {
        return e.reduce((e, s) => ((e[s] = t[s]), e), {});
    })(t, ['hour', 'minute', 'second', 'millisecond']);
}
const Gt = [
    'years',
    'quarters',
    'months',
    'weeks',
    'days',
    'hours',
    'minutes',
    'seconds',
    'milliseconds',
], Bt = Gt.slice(0).reverse(), Qt = [
    'years',
    'months',
    'days',
    'hours',
    'minutes',
    'seconds',
    'milliseconds',
];
function Kt(t, e) {
    let s = '';
    for (const n of t)
        n.literal ? (s += n.val) : (s += e(n.val));
    return s;
}
const Xt = {
    D: w,
    DD: O,
    DDD: v,
    DDDD: T,
    t: S,
    tt: k,
    ttt: M,
    tttt: N,
    T: D,
    TT: E,
    TTT: j,
    TTTT: x,
    f: I,
    ff: C,
    fff: $,
    ffff: z,
    F: V,
    FF: F,
    FFF: L,
    FFFF: q,
};
class te {
    constructor(t, e) {
        (this._opts = e), (this._loc = t), (this._systemLoc = void 0);
    }
    static create(t, e = {}) {
        return new te(t, e);
    }
    static parseFormat(t) {
        let e = null, s = '', n = !1;
        const r = [];
        for (let i = 0; i < t.length; i++) {
            const a = t.charAt(i);
            "'" === a
                ? (s.length > 0 &&
                    r.push({
                        literal: n,
                        val: s,
                    }),
                    (e = null),
                    (s = ''),
                    (n = !n))
                : n || a === e
                    ? (s += a)
                    : (s.length > 0 &&
                        r.push({
                            literal: !1,
                            val: s,
                        }),
                        (s = a),
                        (e = a));
        }
        return s.length > 0 && r.push({ literal: n, val: s }), r;
    }
    static macroTokenToFormatOpts(t) {
        return Xt[t];
    }
    formatWithSystemDefault(t, e) {
        void 0 === this._systemLoc &&
            (this._systemLoc = this._loc.redefaultToSystem());
        return this._systemLoc
            .dtFormatter(t, Object.assign(Object.assign({}, this._opts), e))
            .format();
    }
    formatDateTime(t, e = {}) {
        return this._loc
            .dtFormatter(t, Object.assign(Object.assign({}, this._opts), e))
            .format();
    }
    formatDateTimeParts(t, e = {}) {
        return this._loc
            .dtFormatter(t, Object.assign(Object.assign({}, this._opts), e))
            .formatToParts();
    }
    formatInterval(t, e = {}) {
        if (t.invalidReason)
            return;
        return this._loc
            .dtFormatter(t.start, Object.assign(Object.assign({}, this._opts), e))
            .dtf.formatRange(t.start.toJSDate(), t.end.toJSDate());
    }
    resolvedOptions(t, e = {}) {
        return this._loc
            .dtFormatter(t, Object.assign(Object.assign({}, this._opts), e))
            .resolvedOptions();
    }
    num(t, e = 0) {
        if (this._opts.forceSimple)
            return It(t, e);
        const s = Object.assign({}, this._opts);
        return e > 0 && (s.padTo = e), this._loc.numberFormatter(s).format(t);
    }
    formatDateTimeFromString(t, e) {
        const s = 'en' === this._loc.listingMode(), n = this._loc.outputCalendar && 'gregory' !== this._loc.outputCalendar, r = (e, s) => this._loc.extract(t, e, s), i = e => t.isOffsetFixed && 0 === t.offset && e.allowZ
            ? 'Z'
            : t.isValid
                ? t.zone.formatOffset(t.ts, e.format)
                : '', a = () => s
            ? (function (t) {
                return G[t.hour < 12 ? 0 : 1];
            })(t)
            : r({ hour: 'numeric', hourCycle: 'h12' }, 'dayPeriod'), o = (e, n) => s
            ? (function (t, e) {
                return P(e)[t.month - 1];
            })(t, e)
            : r(n ? { month: e } : { month: e, day: 'numeric' }, 'month'), u = (e, n) => s
            ? (function (t, e) {
                return J(e)[t.weekday - 1];
            })(t, e)
            : r(n
                ? { weekday: e }
                : { weekday: e, month: 'long', day: 'numeric' }, 'weekday'), c = e => {
            const s = te.macroTokenToFormatOpts(e);
            return s ? this.formatWithSystemDefault(t, s) : e;
        }, l = e => s
            ? (function (t, e) {
                return X(e)[t.year < 0 ? 0 : 1];
            })(t, e)
            : r({ era: e }, 'era');
        return Kt(te.parseFormat(e), e => {
            switch (e) {
                case 'S':
                    return this.num(t.millisecond);
                case 'u':
                case 'SSS':
                    return this.num(t.millisecond, 3);
                case 's':
                    return this.num(t.second);
                case 'ss':
                    return this.num(t.second, 2);
                case 'uu':
                    return this.num(Math.floor(t.millisecond / 10), 2);
                case 'uuu':
                    return this.num(Math.floor(t.millisecond / 100));
                case 'm':
                    return this.num(t.minute);
                case 'mm':
                    return this.num(t.minute, 2);
                case 'h':
                    return this.num(t.hour % 12 == 0 ? 12 : t.hour % 12);
                case 'hh':
                    return this.num(t.hour % 12 == 0 ? 12 : t.hour % 12, 2);
                case 'H':
                    return this.num(t.hour);
                case 'HH':
                    return this.num(t.hour, 2);
                case 'Z':
                    return i({ format: 'narrow', allowZ: this._opts.allowZ });
                case 'ZZ':
                    return i({ format: 'short', allowZ: this._opts.allowZ });
                case 'ZZZ':
                    return i({ format: 'techie', allowZ: this._opts.allowZ });
                case 'ZZZZ':
                    return (t.zone.offsetName(t.ts, {
                        format: 'short',
                        locale: this._loc.locale,
                    }) || '');
                case 'ZZZZZ':
                    return (t.zone.offsetName(t.ts, {
                        format: 'long',
                        locale: this._loc.locale,
                    }) || '');
                case 'z':
                    return t.zoneName || '';
                case 'a':
                    return a();
                case 'd':
                    return n ? r({ day: 'numeric' }, 'day') : this.num(t.day);
                case 'dd':
                    return n ? r({ day: '2-digit' }, 'day') : this.num(t.day, 2);
                case 'c':
                case 'E':
                    return this.num(t.weekday);
                case 'ccc':
                    return u('short', !0);
                case 'cccc':
                    return u('long', !0);
                case 'ccccc':
                    return u('narrow', !0);
                case 'EEE':
                    return u('short', !1);
                case 'EEEE':
                    return u('long', !1);
                case 'EEEEE':
                    return u('narrow', !1);
                case 'L':
                    return n
                        ? r({ month: 'numeric', day: 'numeric' }, 'month')
                        : this.num(t.month);
                case 'LL':
                    return n
                        ? r({ month: '2-digit', day: 'numeric' }, 'month')
                        : this.num(t.month, 2);
                case 'LLL':
                    return o('short', !0);
                case 'LLLL':
                    return o('long', !0);
                case 'LLLLL':
                    return o('narrow', !0);
                case 'M':
                    return n ? r({ month: 'numeric' }, 'month') : this.num(t.month);
                case 'MM':
                    return n ? r({ month: '2-digit' }, 'month') : this.num(t.month, 2);
                case 'MMM':
                    return o('short', !1);
                case 'MMMM':
                    return o('long', !1);
                case 'MMMMM':
                    return o('narrow', !1);
                case 'y':
                    return n ? r({ year: 'numeric' }, 'year') : this.num(t.year);
                case 'yy':
                    return n
                        ? r({ year: '2-digit' }, 'year')
                        : this.num(parseInt(t.year.toString().slice(-2), 10), 2);
                case 'yyyy':
                    return n ? r({ year: 'numeric' }, 'year') : this.num(t.year, 4);
                case 'yyyyyy':
                    return n ? r({ year: 'numeric' }, 'year') : this.num(t.year, 6);
                case 'G':
                    return l('short');
                case 'GG':
                    return l('long');
                case 'GGGGG':
                    return l('narrow');
                case 'kk':
                    return this.num(parseInt(t.weekYear.toString().slice(-2), 10), 2);
                case 'kkkk':
                    return this.num(t.weekYear, 4);
                case 'W':
                    return this.num(t.weekNumber);
                case 'WW':
                    return this.num(t.weekNumber, 2);
                case 'o':
                    return this.num(t.ordinal);
                case 'ooo':
                    return this.num(t.ordinal, 3);
                case 'q':
                    return this.num(t.quarter);
                case 'qq':
                    return this.num(t.quarter, 2);
                case 'X':
                    return this.num(Math.floor(t.ts / 1e3));
                case 'x':
                    return this.num(t.ts);
                default:
                    return c(e);
            }
        });
    }
    formatDurationFromString(t, e) {
        const s = t => {
            switch (t[0]) {
                case 'S':
                    return 'milliseconds';
                case 's':
                    return 'seconds';
                case 'm':
                    return 'minutes';
                case 'h':
                    return 'hours';
                case 'd':
                    return 'days';
                case 'M':
                    return 'months';
                case 'y':
                    return 'years';
                default:
                    return;
            }
        }, n = te.parseFormat(e), r = n.reduce((t, { literal: e, val: s }) => (e ? t : t.concat(s)), []);
        return Kt(n, (t => e => {
            const n = s(e);
            return n ? this.num(t.get(n), e.length) : e;
        })(t.shiftTo(...r.map(s).filter(t => !!t))));
    }
}
function ee(...t) {
    const e = t.reduce((t, e) => t + e.source, '');
    return RegExp(`^${e}$`);
}
function se(...t) {
    return e => t
        .reduce(([t, s, n], r) => {
        const [i, a, o] = r(e, n);
        return [Object.assign(Object.assign({}, t), i), a || s, o];
    }, [{}, null, 1])
        .slice(0, 2);
}
function ne(t, ...e) {
    if (null == t)
        return [null, null];
    for (const [s, n] of e) {
        const e = s.exec(t);
        if (e)
            return n(e);
    }
    return [null, null];
}
function re(...t) {
    return (e, s) => {
        const n = {};
        let r;
        for (r = 0; r < t.length; r++)
            n[t[r]] = Vt(e[s + r]);
        return [n, null, s + r];
    };
}
const ie = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/, ae = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/, oe = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, ue = RegExp(`${oe.source}${`(?:${ae.source}?(?:\\[(${ie.source})\\])?)?`}`), ce = RegExp(`(?:T${ue.source})?`), le = re('weekYear', 'weekNumber', 'weekday'), he = re('year', 'ordinal'), de = RegExp(`${oe.source} ?(?:${ae.source}|(${ie.source}))?`), me = RegExp(`(?: ${de.source})?`);
function fe(t, e, s) {
    return Mt(t[e]) ? s : Vt(t[e]);
}
function ye(t, e) {
    return [
        {
            hour: fe(t, e, 0),
            minute: fe(t, e + 1, 0),
            second: fe(t, e + 2, 0),
            millisecond: Ft(t[e + 3]),
        },
        null,
        e + 4,
    ];
}
function ge(t, e) {
    const s = !t[e] && !t[e + 1], n = Pt(t[e + 1], t[e + 2]);
    return [{}, s ? null : dt.instance(n), e + 3];
}
function _e(t, e) {
    return [{}, t[e] ? y.create(t[e]) : null, e + 1];
}
const pe = RegExp(`^T?${oe.source}$`), we = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function Oe(t) {
    const [e, s, n, r, i, a, o, u, c] = t, l = e.startsWith('-'), h = !!u && u.startsWith('-'), d = (t, e = !1) => ('number' == typeof t && (e || (t && l)) ? -t : t);
    return [
        {
            years: d(Ct(s)),
            months: d(Ct(n)),
            weeks: d(Ct(r)),
            days: d(Ct(i)),
            hours: d(Ct(a)),
            minutes: d(Ct(o)),
            seconds: d(Ct(u), '-0' === u),
            milliseconds: d(Ft(c), h),
        },
    ];
}
const be = {
    GMT: 0,
    EDT: -240,
    EST: -300,
    CDT: -300,
    CST: -360,
    MDT: -360,
    MST: -420,
    PDT: -420,
    PST: -480,
};
function ve(t, e, s, n, r, i, a) {
    let o;
    t && (o = t.length > 3 ? H.indexOf(t) + 1 : R.indexOf(t) + 1);
    return {
        year: 2 === e.length ? Ut(Vt(e)) : Vt(e),
        month: U.indexOf(s) + 1,
        day: Vt(n),
        hour: Vt(r),
        minute: Vt(i),
        second: Vt(a),
        weekday: o,
    };
}
const Te = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function Se(t) {
    const [, e, s, n, r, i, a, o, u, c, l, h] = t, d = ve(e, r, n, s, i, a, o);
    let m;
    return (m = u ? be[u] : c ? 0 : Pt(l, h)), [d, new dt(m)];
}
const ke = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, Me = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, Ne = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function De(t) {
    const [, e, s, n, r, i, a, o] = t;
    return [ve(e, r, n, s, i, a, o), dt.utcInstance];
}
function Ee(t) {
    const [, e, s, n, r, i, a, o] = t;
    return [ve(e, o, s, n, r, i, a), dt.utcInstance];
}
const je = ee(/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, ce), xe = ee(/(\d{4})-?W(\d\d)(?:-?(\d))?/, ce), Ie = ee(/(\d{4})-?(\d{3})/, ce), Ve = ee(ue), Ce = se(function (t, e) {
    return [
        { year: fe(t, e, 0), month: fe(t, e + 1, 1), day: fe(t, e + 2, 1) },
        null,
        e + 3,
    ];
}, ye, ge, _e), Fe = se(le, ye, ge, _e), Ze = se(he, ye, ge, _e), $e = se(ye, ge, _e);
const Le = ee(/(\d{4})-(\d\d)-(\d\d)/, me), ze = ee(de), qe = se(ye, ge, _e);
class Ae {
    constructor(t, e) {
        (this.reason = t),
            (this.explanation = e),
            (this._formattedExplanation = ''),
            e && (this._formattedExplanation = `: ${e}`);
    }
    toMessage() {
        return `${this.reason}${this._formattedExplanation}`;
    }
}
const Ue = {
    weeks: {
        days: 7,
        hours: 168,
        minutes: 10080,
        seconds: 604800,
        milliseconds: 6048e5,
    },
    days: { hours: 24, minutes: 1440, seconds: 86400, milliseconds: 864e5 },
    hours: { minutes: 60, seconds: 3600, milliseconds: 36e5 },
    minutes: { seconds: 60, milliseconds: 6e4 },
    seconds: { milliseconds: 1e3 },
}, We = Object.assign({
    years: {
        quarters: 4,
        months: 12,
        weeks: 52,
        days: 365,
        hours: 8760,
        minutes: 525600,
        seconds: 31536e3,
        milliseconds: 31536e6,
    },
    quarters: {
        months: 3,
        weeks: 13,
        days: 91,
        hours: 2184,
        minutes: 131040,
        seconds: 7862400,
        milliseconds: 78624e5,
    },
    months: {
        weeks: 4,
        days: 30,
        hours: 720,
        minutes: 43200,
        seconds: 2592e3,
        milliseconds: 2592e6,
    },
}, Ue), Pe = Object.assign({
    years: {
        quarters: 4,
        months: 12,
        weeks: 52.1775,
        days: 365.2425,
        hours: 8765.82,
        minutes: 525949.2,
        seconds: 525949.2 * 60,
        milliseconds: 525949.2 * 60 * 1e3,
    },
    quarters: {
        months: 3,
        weeks: 13.044375,
        days: 91.310625,
        hours: 2191.455,
        minutes: 131487.3,
        seconds: (525949.2 * 60) / 4,
        milliseconds: 7889237999.999999,
    },
    months: {
        weeks: 30.436875 / 7,
        days: 30.436875,
        hours: 730.485,
        minutes: 43829.1,
        seconds: 2629746,
        milliseconds: 2629746e3,
    },
}, Ue);
function He(t, e, s, n, r) {
    const i = t[r][s], a = e[s] / i, o = !(Math.sign(a) === Math.sign(n[r])) && 0 !== n[r] && Math.abs(a) <= 1
        ? (function (t) {
            return t < 0 ? Math.floor(t) : Math.ceil(t);
        })(a)
        : Math.trunc(a);
    (n[r] = n[r] + o), (e[s] = e[s] - o * i);
}
class Re {
    constructor(t) {
        let e, s;
        'longterm' === t.conversionAccuracy || !1
            ? ((s = 'longterm'), (e = Pe))
            : ((s = 'casual'), (e = We)),
            t.matrix && (e = t.matrix),
            (this._values = t.values || {}),
            (this._loc = t.loc || lt.create()),
            (this._conversionAccuracy = s),
            (this._invalid = t.invalid || null),
            (this._matrix = e),
            (this._isLuxonDuration = !0);
    }
    get conversionAccuracy() {
        return this._conversionAccuracy;
    }
    get invalidExplanation() {
        return this._invalid ? this._invalid.explanation : null;
    }
    get invalidReason() {
        return this._invalid ? this._invalid.reason : null;
    }
    get isValid() {
        return null === this._invalid;
    }
    get locale() {
        return this.isValid ? this._loc.locale : void 0;
    }
    get matrix() {
        return this._matrix;
    }
    get numberingSystem() {
        return this.isValid ? this._loc.numberingSystem : void 0;
    }
    get years() {
        return this.isValid ? this._values.years || 0 : NaN;
    }
    get quarters() {
        return this.isValid ? this._values.quarters || 0 : NaN;
    }
    get months() {
        return this.isValid ? this._values.months || 0 : NaN;
    }
    get weeks() {
        return this.isValid ? this._values.weeks || 0 : NaN;
    }
    get days() {
        return this.isValid ? this._values.days || 0 : NaN;
    }
    get hours() {
        return this.isValid ? this._values.hours || 0 : NaN;
    }
    get minutes() {
        return this.isValid ? this._values.minutes || 0 : NaN;
    }
    get seconds() {
        return this.isValid ? this._values.seconds || 0 : NaN;
    }
    get milliseconds() {
        return this.isValid ? this._values.milliseconds || 0 : NaN;
    }
    static fromISOTime(t, e = {}) {
        const [s] = (function (t) {
            return ne(t, [pe, se(ye)]);
        })(t);
        return s
            ? Re.fromObject(s, e)
            : Re.invalid('unparsable', `the input "${t}" can't be parsed as ISO 8601`);
    }
    static fromMillis(t, e = {}) {
        return Re.fromObject({ milliseconds: t }, e);
    }
    static fromObject(t, e = {}) {
        if (null == t || 'object' != typeof t)
            throw new o('Duration.fromObject: argument expected to be an object, got ' +
                (null === t ? 'null' : typeof t));
        return new Re({
            values: Rt(t, Re.normalizeUnit),
            loc: lt.fromObject(e),
            conversionAccuracy: e.conversionAccuracy,
            matrix: e.matrix,
        });
    }
    static fromDurationLike(t) {
        if (Nt(t))
            return Re.fromMillis(t);
        if (Re.isDuration(t))
            return t;
        if ('object' == typeof t)
            return Re.fromObject(t);
        throw new o(`Unknown duration argument ${t} of type ${typeof t}`);
    }
    static fromISO(t, e) {
        const [s] = (function (t) {
            return ne(t, [we, Oe]);
        })(t);
        return s
            ? Re.fromObject(s, e)
            : Re.invalid('unparsable', `the input "${t}" can't be parsed as ISO 8601`);
    }
    static isDuration(t) {
        return (!!t && t._isLuxonDuration) || !1;
    }
    static invalid(t, e) {
        if (!t)
            throw new o('need to specify a reason the Duration is invalid');
        const n = t instanceof Ae ? t : new Ae(t, e);
        if (St.throwOnInvalid)
            throw new s(n);
        return new Re({ invalid: n });
    }
    static normalizeUnit(t) {
        const e = {
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
        }[t];
        if (!e)
            throw new r(t);
        return e;
    }
    getMaxUnit(t = !1) {
        const e = t ? Qt : Gt, s = this.shiftTo(...e).toObject();
        return e.find(t => (s[t] || 0) > 0) || Bt[0];
    }
    toFormat(t, e = { floor: !0 }) {
        const s = Object.assign(Object.assign({}, e), {
            floor: !1 !== e.round && !1 !== e.floor,
        });
        return this.isValid
            ? te.create(this._loc, s).formatDurationFromString(this, t)
            : 'Invalid Duration';
    }
    toHuman(t = {}) {
        const e = this.getMaxUnit(!0), s = t.onlyHumanUnits ? Qt : Gt, n = this.shiftTo(...s.slice(s.indexOf(e))).toObject(), r = s
            .map(e => {
            const s = n[e];
            return Mt(s) || 0 === s
                ? null
                : this._loc
                    .numberFormatter(Object.assign(Object.assign({
                    style: 'unit',
                    unitDisplay: 'long',
                }, t), { unit: e.slice(0, -1) }))
                    .format(s);
        })
            .filter(t => t), i = Object.assign({ type: 'conjunction', style: t.listStyle || 'narrow' }, t);
        return this._loc.listFormatter(i).format(r);
    }
    toObject() {
        return this.isValid ? Object.assign({}, this._values) : {};
    }
    toISO() {
        if (!this.isValid)
            return null;
        let t = 'P';
        return (0 !== this.years && (t += this.years + 'Y'),
            (0 === this.months && 0 === this.quarters) ||
                (t += this.months + 3 * this.quarters + 'M'),
            0 !== this.weeks && (t += this.weeks + 'W'),
            0 !== this.days && (t += this.days + 'D'),
            (0 === this.hours &&
                0 === this.minutes &&
                0 === this.seconds &&
                0 === this.milliseconds) ||
                (t += 'T'),
            0 !== this.hours && (t += this.hours + 'H'),
            0 !== this.minutes && (t += this.minutes + 'M'),
            (0 === this.seconds && 0 === this.milliseconds) ||
                (t += Zt(this.seconds + this.milliseconds / 1e3, 3) + 'S'),
            'P' === t && (t += 'T0S'),
            t);
    }
    toISOTime(t = {}) {
        if (!this.isValid)
            return null;
        const e = this.toMillis();
        if (e < 0 || e >= 864e5)
            return null;
        t = Object.assign({
            suppressMilliseconds: !1,
            suppressSeconds: !1,
            includePrefix: !1,
            format: 'extended',
        }, t);
        const s = this.shiftTo('hours', 'minutes', 'seconds', 'milliseconds');
        let n = 'basic' === t.format ? 'hhmm' : 'hh:mm';
        (t.suppressSeconds && 0 === s.seconds && 0 === s.milliseconds) ||
            ((n += 'basic' === t.format ? 'ss' : ':ss'),
                (t.suppressMilliseconds && 0 === s.milliseconds) || (n += '.SSS'));
        let r = s.toFormat(n);
        return t.includePrefix && (r = 'T' + r), r;
    }
    toJSON() {
        return this.toISO();
    }
    toString() {
        return this.toISO();
    }
    toMillis() {
        return this.as('milliseconds');
    }
    valueOf() {
        return this.toMillis();
    }
    plus(t) {
        if (!this.isValid)
            return this;
        const e = Re.fromDurationLike(t), s = {};
        return (Gt.forEach(t => {
            (void 0 === e._values[t] && void 0 === this._values[t]) ||
                (s[t] = e.get(t) + this.get(t));
        }),
            this._clone(this, { values: s }, !0));
    }
    minus(t) {
        if (!this.isValid)
            return this;
        const e = Re.fromDurationLike(t);
        return this.plus(e.negate());
    }
    mapUnits(t) {
        if (!this.isValid)
            return this;
        const e = {};
        return (Object.keys(this._values).forEach(s => {
            e[s] = Ht(t(this._values[s], s));
        }),
            this._clone(this, { values: e }, !0));
    }
    get(t) {
        return this[Re.normalizeUnit(t)];
    }
    set(t) {
        if (!this.isValid)
            return this;
        const e = Object.assign(Object.assign({}, this._values), Rt(t, Re.normalizeUnit));
        return this._clone(this, { values: e });
    }
    reconfigure({ locale: t, numberingSystem: e, conversionAccuracy: s, matrix: n, } = {}) {
        const r = {
            loc: this._loc.clone({ locale: t, numberingSystem: e }),
            matrix: n,
            conversionAccuracy: s,
        };
        return this._clone(this, r);
    }
    as(t) {
        return this.shiftTo(t).get(t);
    }
    normalize() {
        if (!this.isValid)
            return this;
        const t = this.toObject();
        return ((function (t, e) {
            let s;
            Bt.forEach(n => {
                Mt(e[n]) || (s && He(t, e, s, e, n), (s = n));
            });
        })(this._matrix, t),
            this._clone(this, { values: t }, !0));
    }
    rescale() {
        if (!this.isValid)
            return this;
        const t = (function (t = {}) {
            return Object.entries(t).reduce((t, [e, s]) => (0 !== s && (t[e] = s), t), {});
        })(this.normalize().shiftToAll().toObject());
        return this._clone(this, { values: t }, !0);
    }
    shiftTo(...t) {
        if (!this.isValid || 0 === t.length)
            return this;
        t = t.map(t => Re.normalizeUnit(t));
        const e = {}, s = {}, n = this.toObject();
        let r;
        return (Gt.forEach(i => {
            if (t.indexOf(i) >= 0) {
                r = i;
                let t = 0;
                Object.keys(s).forEach(e => {
                    (t += this._matrix[e][i] * s[e]), (s[e] = 0);
                }),
                    Nt(n[i]) && (t += n[i]);
                const a = Math.trunc(t);
                (e[i] = a),
                    (s[i] = (1e3 * t - 1e3 * a) / 1e3),
                    Object.keys(n).forEach(t => {
                        Gt.indexOf(t) > Gt.indexOf(i) && He(this._matrix, n, t, e, i);
                    });
            }
            else
                Nt(n[i]) && (s[i] = n[i]);
        }),
            Object.keys(s).forEach(t => {
                const n = s[t];
                0 !== n && (e[r] += t === r ? n : n / this._matrix[r][t]);
            }),
            this._clone(this, { values: e }, !0).normalize());
    }
    shiftToAll() {
        return this.isValid
            ? this.shiftTo('years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds', 'milliseconds')
            : this;
    }
    negate() {
        if (!this.isValid)
            return this;
        const t = {};
        return (Object.keys(this._values).forEach(e => {
            t[e] = 0 === this._values[e] ? 0 : -this._values[e];
        }),
            this._clone(this, { values: t }, !0));
    }
    equals(t) {
        if (!this.isValid || !t.isValid)
            return !1;
        if (!this._loc.equals(t._loc))
            return !1;
        for (const n of Gt)
            if (((e = this._values[n]),
                (s = t._values[n]),
                !(void 0 === e || 0 === e ? void 0 === s || 0 === s : e === s)))
                return !1;
        var e, s;
        return !0;
    }
    _clone(t, e, s = !1) {
        const n = {
            values: s
                ? e.values
                : Object.assign(Object.assign({}, t._values), e.values || {}),
            loc: t._loc.clone(e.loc),
            conversionAccuracy: e.conversionAccuracy || t.conversionAccuracy,
            matrix: e.matrix || t.matrix,
        };
        return new Re(n);
    }
}
const Ye = 'Invalid Interval';
function Je(t) {
    if (As.isDateTime(t))
        return t;
    if (t && t.valueOf && Nt(t.valueOf()))
        return As.fromJSDate(t);
    if (t && 'object' == typeof t)
        return As.fromObject(t);
    throw new o(`Unknown datetime argument: ${t}, of type ${typeof t}`);
}
class Ge {
    constructor(t) {
        (this._s = t.start),
            (this._e = t.end),
            (this._invalid = t.invalid || null),
            (this._isLuxonInterval = !0);
    }
    get invalidReason() {
        return this._invalid ? this._invalid.reason : null;
    }
    get isValid() {
        return null === this.invalidReason;
    }
    get start() {
        return this.isValid ? this._s : null;
    }
    get end() {
        return this.isValid ? this._e : null;
    }
    static fromDateTimes(t, e) {
        const s = Je(t), n = Je(e), r = (function (t, e) {
            return t && t.isValid
                ? e && e.isValid
                    ? e < t
                        ? Ge.invalid('end before start', `The end of an interval must be after its start, but you had start=${t.toISO()} and end=${e.toISO()}`)
                        : void 0
                    : Ge.invalid('missing or invalid end')
                : Ge.invalid('missing or invalid start');
        })(s, n);
        return r || new Ge({ start: s, end: n });
    }
    static after(t, e) {
        const s = Re.fromDurationLike(e), n = Je(t);
        return new Ge({ start: n, end: n ? n.plus(s) : void 0 });
    }
    static before(t, e) {
        const s = Re.fromDurationLike(e), n = Je(t);
        return new Ge({ start: n ? n.minus(s) : void 0, end: n });
    }
    static fromISO(t, e = {}) {
        const [s, n] = (t || '').split('/', 2);
        if (s && n) {
            let t, r, i, a;
            try {
                (t = As.fromISO(s, e)), (r = t.isValid);
            }
            catch (n) {
                r = !1;
            }
            try {
                (i = As.fromISO(n, e)), (a = i.isValid);
            }
            catch (n) {
                a = !1;
            }
            if (r && a)
                return Ge.fromDateTimes(t, i);
            if (r) {
                const s = Re.fromISO(n, e);
                if (s.isValid)
                    return Ge.after(t, s);
            }
            else if (a) {
                const t = Re.fromISO(s, e);
                if (t.isValid)
                    return Ge.before(i, t);
            }
        }
        return Ge.invalid('unparsable', `the input "${t}" can't be parsed as ISO 8601`);
    }
    static invalid(t, e) {
        if (!t)
            throw new o('need to specify a reason the Interval is invalid');
        const s = t instanceof Ae ? t : new Ae(t, e);
        if (St.throwOnInvalid)
            throw new n(s);
        return new Ge({ invalid: s });
    }
    static isInterval(t) {
        return (!!t && t._isLuxonInterval) || !1;
    }
    static merge(t) {
        const [e, s] = t
            .sort((t, e) => t._s.valueOf() - e._s.valueOf())
            .reduce(([t, e], s) => e
            ? e.overlaps(s) || e.abutsStart(s)
                ? [t, e.union(s)]
                : [t.concat([e]), s]
            : [t, s], [[], null]);
        return s && e.push(s), e;
    }
    static xor(t) {
        let e = null, s = 0;
        const n = [], r = t.map(t => [
            { time: t._s, type: 's' },
            { time: t._e, type: 'e' },
        ]), i = Array.prototype.concat(...r).sort((t, e) => +t.time - +e.time);
        for (const t of i)
            (s += 's' === t.type ? 1 : -1),
                1 === s
                    ? (e = t.time)
                    : (e &&
                        e.valueOf() !== t.time.valueOf() &&
                        n.push(Ge.fromDateTimes(e, t.time)),
                        (e = null));
        return Ge.merge(n);
    }
    length(t = 'milliseconds') {
        return this.toDuration(t).get(t);
    }
    count(t = 'milliseconds') {
        if (!this.isValid)
            return NaN;
        const e = this.start.startOf(t), s = this.end.startOf(t);
        return Math.floor(s.diff(e, t).get(t)) + 1;
    }
    hasSame(t) {
        return (!!this.isValid && (this.isEmpty() || this._e.minus(1).hasSame(this._s, t)));
    }
    isEmpty() {
        return this._s.valueOf() === this._e.valueOf();
    }
    isAfter(t) {
        return !!this.isValid && this._s > t;
    }
    isBefore(t) {
        return !!this.isValid && this._e <= t;
    }
    contains(t) {
        return this._s <= t && this._e > t;
    }
    set({ start: t, end: e } = {}) {
        return this.isValid ? Ge.fromDateTimes(t || this._s, e || this._e) : this;
    }
    splitAt(...t) {
        const e = t
            .map(Je)
            .filter(t => this.contains(t))
            .sort(), s = [];
        let n = this._s, r = 0;
        for (; n < this._e;) {
            const t = e[r] || this._e, i = +t > +this._e ? this._e : t;
            s.push(Ge.fromDateTimes(n, i)), (n = i), (r += 1);
        }
        return s;
    }
    splitBy(t) {
        const e = Re.fromDurationLike(t);
        if (!this.isValid || !e.isValid || 0 === e.as('milliseconds'))
            return [];
        let s, n = this._s, r = 1;
        const i = [];
        for (; n < this._e;) {
            const t = this.start.plus(e.mapUnits(t => t * r));
            (s = +t > +this._e ? this._e : t),
                i.push(Ge.fromDateTimes(n, s)),
                (n = s),
                (r += 1);
        }
        return i;
    }
    divideEqually(t) {
        return this.isValid
            ? this.splitBy({ milliseconds: this.length() / t }).slice(0, t)
            : [];
    }
    overlaps(t) {
        return this._e > t._s && this._s < t._e;
    }
    abutsStart(t) {
        return +this._e == +t._s;
    }
    abutsEnd(t) {
        return +t._e == +this._s;
    }
    engulfs(t) {
        return !!this.isValid && this._s <= t._s && this._e >= t._e;
    }
    equals(t) {
        return (!(!this.isValid || !t.isValid) &&
            this._s.equals(t._s) &&
            this._e.equals(t._e));
    }
    intersection(t) {
        if (!this.isValid)
            return this;
        const e = this._s > t._s ? this._s : t._s, s = this._e < t._e ? this._e : t._e;
        return e >= s ? null : Ge.fromDateTimes(e, s);
    }
    union(t) {
        if (!this.isValid)
            return this;
        const e = this._s < t._s ? this._s : t._s, s = this._e > t._e ? this._e : t._e;
        return Ge.fromDateTimes(e, s);
    }
    difference(...t) {
        return Ge.xor([this].concat(t))
            .map(t => this.intersection(t))
            .filter(t => t && !t.isEmpty());
    }
    toString() {
        return this.isValid ? `[${this._s.toISO()} – ${this._e.toISO()})` : Ye;
    }
    toLocaleString(t = w, e = {}) {
        return this.isValid
            ? te.create(this._s.loc.clone(e), t).formatInterval(this)
            : Ye;
    }
    toISO(t = {}) {
        return this.isValid ? `${this._s.toISO(t)}/${this._e.toISO(t)}` : Ye;
    }
    toISODate() {
        return this.isValid ? `${this._s.toISODate()}/${this._e.toISODate()}` : Ye;
    }
    toISOTime(t = {}) {
        return this.isValid
            ? `${this._s.toISOTime(t)}/${this._e.toISOTime(t)}`
            : Ye;
    }
    toFormat(t, { separator: e = ' - ' } = {}) {
        return this.isValid
            ? `${this._s.toFormat(t)}${e}${this._e.toFormat(t)}`
            : Ye;
    }
    toDuration(t = 'milliseconds', e = {}) {
        return this.isValid
            ? this._e.diff(this._s, t, e)
            : Re.invalid(this._invalid.reason);
    }
    mapEndpoints(t) {
        return Ge.fromDateTimes(t(this._s), t(this._e));
    }
}
class Be {
    static hasDST(t = St.defaultZone) {
        const e = As.now().setZone(t).set({ month: 12 });
        return !t.isUniversal && e.offset !== e.set({ month: 6 }).offset;
    }
    static isValidIANAZone(t) {
        return y.isValidZone(t);
    }
    static normalizeZone(t) {
        return gt(t, St.defaultZone);
    }
    static months(t = 'long', { locale: e, locObj: s, numberingSystem: n, outputCalendar: r = 'gregory', } = {}) {
        return (s || lt.create(e, n, r)).months(t);
    }
    static monthsFormat(t = 'long', { locale: e, locObj: s, numberingSystem: n, outputCalendar: r = 'gregory', } = {}) {
        return (s || lt.create(e, n, r)).months(t, !0);
    }
    static weekdays(t = 'long', { locale: e, locObj: s, numberingSystem: n } = {}) {
        return (s || lt.create(e, n)).weekdays(t);
    }
    static weekdaysFormat(t = 'long', { locale: e, locObj: s, numberingSystem: n } = {}) {
        return (s || lt.create(e, n)).weekdays(t, !0);
    }
    static meridiems({ locale: t } = {}) {
        return lt.create(t).meridiems();
    }
    static eras(t = 'short', { locale: e } = {}) {
        return lt.create(e, void 0, 'gregory').eras(t);
    }
    static features() {
        return { relative: Et() };
    }
}
function Qe(t, e) {
    const s = t => t.toUTC(0, { keepLocalTime: !0 }).startOf('days').valueOf(), n = s(e) - s(t);
    return Math.floor(Re.fromMillis(n).as('days'));
}
const Ke = (t, e, s, n) => {
    let [r, i, a, o] = (function (t, e, s) {
        const n = [
            ['years', (t, e) => e.year - t.year],
            ['quarters', (t, e) => e.quarter - t.quarter + 4 * (e.year - t.year)],
            ['months', (t, e) => e.month - t.month + 12 * (e.year - t.year)],
            [
                'weeks',
                (t, e) => {
                    const s = Qe(t, e);
                    return (s - (s % 7)) / 7;
                },
            ],
            ['days', Qe],
        ], r = {}, i = t;
        let a, o;
        for (const [u, c] of n)
            s.indexOf(u) >= 0 &&
                ((a = u),
                    (r[u] = c(t, e)),
                    (o = i.plus(r)),
                    o > e ? (r[u]--, (t = i.plus(r))) : (t = o));
        return [t, r, o, a];
    })(t, e, s);
    const u = +e - +r, c = s.filter(t => ['hours', 'minutes', 'seconds', 'milliseconds'].indexOf(t) >= 0);
    0 === c.length &&
        (a < e && (a = r.plus({ [o]: 1 })),
            a !== r && (i[o] = (i[o] || 0) + u / (+a - +r)));
    const l = Re.fromObject(i, n);
    return c.length > 0
        ? Re.fromMillis(u, n)
            .shiftTo(...c)
            .plus(l)
        : l;
}, Xe = {
    arab: '[٠-٩]',
    arabext: '[۰-۹]',
    bali: '[᭐-᭙]',
    beng: '[০-৯]',
    deva: '[०-९]',
    fullwide: '[０-９]',
    gujr: '[૦-૯]',
    hanidec: '[〇|一|二|三|四|五|六|七|八|九]',
    khmr: '[០-៩]',
    knda: '[೦-೯]',
    laoo: '[໐-໙]',
    limb: '[᥆-᥏]',
    mlym: '[൦-൯]',
    mong: '[᠐-᠙]',
    mymr: '[၀-၉]',
    orya: '[୦-୯]',
    tamldec: '[௦-௯]',
    telu: '[౦-౯]',
    thai: '[๐-๙]',
    tibt: '[༠-༩]',
    latn: '\\d',
}, ts = {
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
}, es = Xe.hanidec.replace(/[\[|\]]/g, '').split('');
function ss(t, e = '') {
    return new RegExp(`${Xe[t.numberingSystem || 'latn']}${e}`);
}
function ns(t, e = t => t) {
    return {
        regex: t,
        deser: ([t]) => e((function (t) {
            const e = parseInt(t, 10);
            if (!isNaN(e))
                return e;
            let s = '';
            for (let e = 0; e < t.length; e++) {
                const n = t.charCodeAt(e);
                if (-1 !== t[e].search(Xe.hanidec))
                    s += es.indexOf(t[e]);
                else
                    for (const t in ts) {
                        const [e, r] = ts[t];
                        if (n >= e && n <= r) {
                            s += n - e;
                            break;
                        }
                    }
            }
            return parseInt(s, 10);
        })(t)),
    };
}
const rs = `[ ${String.fromCharCode(160)}]`, is = new RegExp(rs, 'g');
function as(t) {
    return t.replace(/\./g, '\\.?').replace(is, rs);
}
function os(t) {
    return t.replace(/\./g, '').replace(is, ' ').toLowerCase();
}
function us(t, e) {
    return {
        regex: RegExp(t.map(as).join('|')),
        deser: ([s]) => t.findIndex(t => os(s) === os(t)) + e,
    };
}
function cs(t, e) {
    return { regex: t, deser: ([, t, e]) => Pt(t, e), groups: e };
}
function ls(t) {
    return { regex: t, deser: ([t]) => t };
}
const hs = {
    year: { '2-digit': 'yy', numeric: 'yyyyy' },
    month: { numeric: 'M', '2-digit': 'MM', short: 'MMM', long: 'MMMM' },
    day: { numeric: 'd', '2-digit': 'dd' },
    weekday: { short: 'EEE', long: 'EEEE' },
    hour: { numeric: 'h', '2-digit': 'hh' },
    minute: { numeric: 'm', '2-digit': 'mm' },
    second: { numeric: 's', '2-digit': 'ss' },
    timeZoneName: { long: 'ZZZZZ', short: 'ZZZ' },
};
let ds;
function ms(t) {
    return !!t && !!t.invalidReason;
}
function fs(t, e) {
    return Array.prototype.concat(...t.map(t => (function (t, e) {
        if (t.literal)
            return t;
        const s = gs(te.macroTokenToFormatOpts(t.val), e);
        return null == s || s.includes(void 0) ? t : s;
    })(t, e)));
}
function ys(t, e, s) {
    const n = fs(te.parseFormat(s), t), r = n.map(e => (function (t, e) {
        const s = ss(e), n = ss(e, '{2}'), r = ss(e, '{3}'), i = ss(e, '{4}'), a = ss(e, '{6}'), o = ss(e, '{1,2}'), u = ss(e, '{1,3}'), c = ss(e, '{1,6}'), l = ss(e, '{1,9}'), h = ss(e, '{2,4}'), d = ss(e, '{4,6}'), m = t => {
            return {
                regex: RegExp(((e = t.val), e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&'))),
                deser: ([t]) => t,
                literal: !0,
            };
            var e;
        }, f = (f => {
            if (t.literal)
                return m(f);
            switch (f.val) {
                case 'G':
                    return us(e.eras('short'), 0);
                case 'GG':
                    return us(e.eras('long'), 0);
                case 'y':
                    return ns(c);
                case 'yy':
                case 'kk':
                    return ns(h, Ut);
                case 'yyyy':
                case 'kkkk':
                    return ns(i);
                case 'yyyyy':
                    return ns(d);
                case 'yyyyyy':
                    return ns(a);
                case 'M':
                case 'L':
                case 'd':
                case 'H':
                case 'h':
                case 'm':
                case 'q':
                case 's':
                case 'W':
                    return ns(o);
                case 'MM':
                case 'LL':
                case 'dd':
                case 'HH':
                case 'hh':
                case 'mm':
                case 'qq':
                case 'ss':
                case 'WW':
                    return ns(n);
                case 'MMM':
                    return us(e.months('short', !0), 1);
                case 'MMMM':
                    return us(e.months('long', !0), 1);
                case 'LLL':
                    return us(e.months('short', !1), 1);
                case 'LLLL':
                    return us(e.months('long', !1), 1);
                case 'o':
                case 'S':
                    return ns(u);
                case 'ooo':
                case 'SSS':
                    return ns(r);
                case 'u':
                    return ls(l);
                case 'a':
                    return us(e.meridiems(), 0);
                case 'E':
                case 'c':
                    return ns(s);
                case 'EEE':
                    return us(e.weekdays('short', !1), 1);
                case 'EEEE':
                    return us(e.weekdays('long', !1), 1);
                case 'ccc':
                    return us(e.weekdays('short', !0), 1);
                case 'cccc':
                    return us(e.weekdays('long', !0), 1);
                case 'Z':
                case 'ZZ':
                    return cs(new RegExp(`([+-]${o.source})(?::(${n.source}))?`), 2);
                case 'ZZZ':
                    return cs(new RegExp(`([+-]${o.source})(${n.source})?`), 2);
                case 'z':
                    return ls(/[a-z_+-/]{1,256}?/i);
                default:
                    return m(f);
            }
        })(t) || {
            invalidReason: 'missing Intl.DateTimeFormat.formatToParts support',
        };
        return Object.assign(Object.assign({}, f), { token: t });
    })(e, t)), i = r.find(ms);
    if (i)
        return { input: e, tokens: n, invalidReason: i.invalidReason };
    {
        const t = (function (t) {
            return `^${t
                .map(t => t.regex)
                .reduce((t, e) => `${t}(${e.source})`, '')}$`;
        })(r), s = RegExp(t, 'i'), [i, o] = (function (t, e, s) {
            const n = e.exec(t), r = {};
            if (null !== n) {
                let t = 1;
                s.forEach(e => {
                    const s = e.groups ? e.groups + 1 : 1;
                    e.literal || (r[e.token.val[0]] = e.deser(n.slice(t, t + s))),
                        (t += s);
                });
            }
            return [n, r];
        })(e, s, r), [u, c, l] = o
            ? (function (t) {
                let e, s = null;
                return (kt(t.z) && (s = y.create(t.z)),
                    kt(t.Z) && (s || (s = new dt(+t.Z)), (e = +t.Z)),
                    Mt(t.q) || (t.M = 3 * (t.q - 1) + 1),
                    Mt(t.h) ||
                        (t.h < 12 && 1 === t.a
                            ? (t.h = t.h + 12)
                            : 12 === t.h && 0 === t.a && (t.h = 0)),
                    0 === t.G && t.y && (t.y = -t.y),
                    Mt(t.u) || (t.S = Ft(t.u) || 0),
                    [
                        Object.keys(t).reduce((e, s) => {
                            const n = (t => {
                                switch (t) {
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
                            })(s);
                            return n && (e[n] = t[s]), e;
                        }, {}),
                        s,
                        e,
                    ]);
            })(o)
            : [null, null, void 0];
        if ('a' in o && 'H' in o)
            throw new a("Can't include meridiem when specifying 24-hour format");
        return {
            input: e,
            tokens: n,
            regex: s,
            rawMatches: i,
            matches: o,
            result: u,
            zone: c,
            specificOffset: l,
        };
    }
}
function gs(t, e) {
    if (!t)
        return null;
    return te
        .create(e, t)
        .formatDateTimeParts((function (t) {
        return (void 0 === ds &&
            (ds = As.fromMillis(1555555555555, { locale: t.locale })),
            ds);
    })(e))
        .map(e => (function (t, e) {
        const { type: s, value: n } = t;
        if ('literal' === s)
            return { literal: !0, val: n };
        if ('dayPeriod' === s)
            return { literal: !1, val: 'a' };
        const r = hs[s];
        if (void 0 !== r) {
            const t = e[s];
            if (t) {
                const e = r[t];
                if (void 0 !== e)
                    return { literal: !1, val: e };
            }
        }
    })(e, t));
}
const _s = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], ps = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function ws(t, e) {
    return new Ae('unit out of range', `you specified ${e} (of type ${typeof e}) as a ${t}, which is invalid`);
}
function Os(t, e, s) {
    const n = new Date(Date.UTC(t, e - 1, s));
    t < 100 && t >= 0 && n.setUTCFullYear(n.getUTCFullYear() - 1900);
    const r = n.getUTCDay();
    return 0 === r ? 7 : r;
}
function bs(t, e, s) {
    return s + ($t(t) ? ps : _s)[e - 1];
}
function vs(t, e) {
    const s = $t(t) ? ps : _s, n = s.findIndex(t => t < e);
    return { month: n + 1, day: e - s[n] };
}
function Ts(t) {
    const { year: e, month: s, day: n } = t, r = bs(e, s, n), i = Os(e, s, n);
    let a, o = Math.floor((r - i + 10) / 7);
    return (o < 1
        ? ((a = e - 1), (o = At(a)))
        : o > At(e)
            ? ((a = e + 1), (o = 1))
            : (a = e),
        Object.assign({
            weekYear: a,
            weekNumber: o,
            weekday: i,
        }, Jt(t)));
}
function Ss(t) {
    const { weekYear: e, weekNumber: s, weekday: n } = t, r = Os(e, 1, 4), i = Lt(e);
    let a, o = 7 * s + n - r - 3;
    o < 1
        ? ((a = e - 1), (o += Lt(a)))
        : o > i
            ? ((a = e + 1), (o -= Lt(e)))
            : (a = e);
    const { month: u, day: c } = vs(a, o);
    return Object.assign({ year: a, month: u, day: c }, Jt(t));
}
function ks(t) {
    const { year: e, month: s, day: n } = t, r = bs(e, s, n);
    return Object.assign({ year: e, ordinal: r }, Jt(t));
}
function Ms(t) {
    const { year: e, ordinal: s } = t, { month: n, day: r } = vs(e, s);
    return Object.assign({ year: e, month: n, day: r }, Jt(t));
}
function Ns(t) {
    const e = Dt(t.year), s = xt(t.month, 1, 12), n = xt(t.day, 1, zt(t.year, t.month));
    return e
        ? s
            ? !n && ws('day', t.day)
            : ws('month', t.month)
        : ws('year', t.year);
}
function Ds(t) {
    const { hour: e, minute: s, second: n, millisecond: r } = t, i = xt(e, 0, 23) || (24 === e && 0 === s && 0 === n && 0 === r), a = xt(s, 0, 59), o = xt(n, 0, 59), u = xt(r, 0, 999);
    return i
        ? a
            ? o
                ? !u && ws('millisecond', r)
                : ws('second', n)
            : ws('minute', s)
        : ws('hour', e);
}
function Es(t, e, s) {
    let n = t - 60 * e * 1e3;
    const r = s.offset(n);
    if (e === r)
        return [n, e];
    n -= 60 * (r - e) * 1e3;
    const i = s.offset(n);
    return r === i ? [n, r] : [t - 60 * Math.min(r, i) * 1e3, Math.max(r, i)];
}
function js(t, e) {
    const s = new Date((t += 60 * e * 1e3));
    return {
        year: s.getUTCFullYear(),
        month: s.getUTCMonth() + 1,
        day: s.getUTCDate(),
        hour: s.getUTCHours(),
        minute: s.getUTCMinutes(),
        second: s.getUTCSeconds(),
        millisecond: s.getUTCMilliseconds(),
    };
}
function xs(t, e, s) {
    return Es(qt(t), e, s);
}
function Is(t, e, s, n, r, i) {
    const { setZone: a, zone: o } = s;
    if (t && Object.keys(t).length > 0) {
        const n = e || o, r = As.fromObject(t, Object.assign(Object.assign({}, s), { zone: n, specificOffset: i }));
        return a ? r : r.setZone(o);
    }
    return As.invalid(new Ae('unparsable', `the input "${r}" can't be parsed as ${n}`));
}
function Vs(t, e, s = !0) {
    return t.isValid
        ? te
            .create(lt.create('en-US'), { allowZ: s, forceSimple: !0 })
            .formatDateTimeFromString(t, e)
        : null;
}
const Cs = {
    year: 0,
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
}, Fs = {
    weekNumber: 1,
    weekday: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
}, Zs = { ordinal: 1, hour: 0, minute: 0, second: 0, millisecond: 0 }, $s = ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'], Ls = [
    'weekYear',
    'weekNumber',
    'weekday',
    'hour',
    'minute',
    'second',
    'millisecond',
], zs = ['year', 'ordinal', 'hour', 'minute', 'second', 'millisecond'];
function qs(t) {
    const e = {
        year: 'year',
        years: 'year',
        quarter: 'quarter',
        quarters: 'quarter',
        month: 'month',
        months: 'month',
        day: 'day',
        days: 'day',
        hour: 'hour',
        hours: 'hour',
        minute: 'minute',
        minutes: 'minute',
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
    }[t.toLowerCase()];
    if (!e)
        throw new r(t);
    return e;
}
class As {
    constructor(t) {
        const e = t.zone || St.defaultZone;
        let s, n, r = t.invalid ||
            (Number.isNaN(t.ts) ? new Ae('invalid timestamp') : null) ||
            (e.isValid ? null : As._unsupportedZone(e));
        if (((this._ts = Mt(t.ts) ? St.now() : t.ts), !r)) {
            if (!!t.old && t.old.ts === this._ts && t.old.zone.equals(e))
                [n, s] = [t.old.c, t.old.o];
            else {
                const t = e.offset(this._ts);
                (n = js(this._ts, t)),
                    (r = Number.isNaN(n.year) ? new Ae('invalid input') : null),
                    (n = r ? void 0 : n),
                    (s = r ? void 0 : t);
            }
        }
        (this._zone = e),
            (this._loc = t.loc || lt.create()),
            (this._invalid = r),
            (this._weekData = null),
            (this._c = n),
            (this._o = s),
            (this._isLuxonDateTime = !0);
    }
    get invalidExplanation() {
        return this._invalid ? this._invalid.explanation : void 0;
    }
    get invalidReason() {
        return this._invalid ? this._invalid.reason : void 0;
    }
    get isValid() {
        return null === this._invalid;
    }
    get loc() {
        return this.isValid ? this._loc.clone() : void 0;
    }
    get locale() {
        return this.isValid ? this._loc.locale : void 0;
    }
    get numberingSystem() {
        return this.isValid ? this._loc.numberingSystem : void 0;
    }
    get outputCalendar() {
        return this.isValid ? this._loc.outputCalendar : void 0;
    }
    get zone() {
        return this._zone;
    }
    get zoneName() {
        return this.isValid ? this.zone.name : null;
    }
    get year() {
        return this.isValid ? this._c.year : NaN;
    }
    get quarter() {
        return this.isValid ? Math.ceil(this._c.month / 3) : NaN;
    }
    get month() {
        return this.isValid ? this._c.month : NaN;
    }
    get day() {
        return this.isValid ? this._c.day : NaN;
    }
    get hour() {
        return this.isValid ? this._c.hour : NaN;
    }
    get minute() {
        return this.isValid ? this._c.minute : NaN;
    }
    get second() {
        return this.isValid ? this._c.second : NaN;
    }
    get millisecond() {
        return this.isValid ? this._c.millisecond : NaN;
    }
    get weekYear() {
        return this.isValid ? this._possiblyCachedWeekData(this).weekYear : NaN;
    }
    get weekNumber() {
        return this.isValid ? this._possiblyCachedWeekData(this).weekNumber : NaN;
    }
    get weekday() {
        return this.isValid ? this._possiblyCachedWeekData(this).weekday : NaN;
    }
    get ordinal() {
        return this.isValid ? ks(this._c).ordinal : NaN;
    }
    get monthShort() {
        return this.isValid
            ? Be.months('short', { locObj: this._loc })[this.month - 1]
            : null;
    }
    get monthLong() {
        return this.isValid
            ? Be.months('long', { locObj: this._loc })[this.month - 1]
            : null;
    }
    get weekdayShort() {
        return this.isValid
            ? Be.weekdays('short', { locObj: this._loc })[this.weekday - 1]
            : null;
    }
    get weekdayLong() {
        return this.isValid
            ? Be.weekdays('long', { locObj: this._loc })[this.weekday - 1]
            : null;
    }
    get offset() {
        return this.isValid ? +this._o : NaN;
    }
    get offsetNameShort() {
        return this.isValid
            ? this.zone.offsetName(this._ts, { format: 'short', locale: this.locale })
            : null;
    }
    get offsetNameLong() {
        return this.isValid
            ? this.zone.offsetName(this._ts, { format: 'long', locale: this.locale })
            : null;
    }
    get isOffsetFixed() {
        return this.isValid ? this.zone.isUniversal : null;
    }
    get isInDST() {
        return (!this.isOffsetFixed &&
            (this.offset >
                this.set({
                    month: 1,
                    day: 1,
                }).offset ||
                this.offset > this.set({ month: 5 }).offset));
    }
    get isInLeapYear() {
        return $t(this.year);
    }
    get daysInMonth() {
        return zt(this.year, this.month);
    }
    get daysInYear() {
        return this.isValid ? Lt(this.year) : NaN;
    }
    get weeksInWeekYear() {
        return this.isValid ? At(this.weekYear) : NaN;
    }
    get ts() {
        return this._ts;
    }
    static now() {
        return new As({});
    }
    static local(...t) {
        const [e, s] = this._lastOpts(t), [n, r, i, a, o, u, c] = s;
        return As._quickDT({
            year: n,
            month: r,
            day: i,
            hour: a,
            minute: o,
            second: u,
            millisecond: c,
        }, e);
    }
    static utc(...t) {
        const [e, s] = this._lastOpts(t), [n, r, i, a, o, u, c] = s;
        return ((e.zone = dt.utcInstance),
            this._quickDT({
                year: n,
                month: r,
                day: i,
                hour: a,
                minute: o,
                second: u,
                millisecond: c,
            }, e));
    }
    static fromJSDate(t, e = {}) {
        const s = ((n = t),
            '[object Date]' === Object.prototype.toString.call(n)
                ? t.valueOf()
                : NaN);
        var n;
        if (Number.isNaN(s))
            return As.invalid('invalid input');
        const r = gt(e.zone, St.defaultZone);
        return r.isValid
            ? new As({ ts: s, zone: r, loc: lt.fromObject(e) })
            : As.invalid(As._unsupportedZone(r));
    }
    static fromMillis(t, e = {}) {
        if (Nt(t))
            return t < -864e13 || t > 864e13
                ? As.invalid('Timestamp out of range')
                : new As({
                    ts: t,
                    zone: gt(e.zone, St.defaultZone),
                    loc: lt.fromObject(e),
                });
        throw new o(`fromMillis requires a numerical input, but received a ${typeof t} with value ${t}`);
    }
    static fromSeconds(t, e = {}) {
        if (!Nt(t))
            throw new o('fromSeconds requires a numerical input');
        return new As({
            ts: 1e3 * t,
            zone: gt(e.zone, St.defaultZone),
            loc: lt.fromObject(e),
        });
    }
    static fromObject(t = {}, e = {}) {
        const s = gt(e.zone, St.defaultZone);
        if (!s.isValid)
            return As.invalid(As._unsupportedZone(s));
        const n = St.now(), r = Nt(e.specificOffset) ? e.specificOffset : s.offset(n), i = Rt(t, qs), o = kt(i.ordinal), u = kt(i.year), c = kt(i.month) || kt(i.day), l = u || c, h = i.weekYear || i.weekNumber, d = lt.fromObject(e);
        if ((l || o) && h)
            throw new a("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
        if (c && o)
            throw new a("Can't mix ordinal dates with month/day");
        const m = h || (i.weekday && !l), f = js(n, r), y = {
            containsGregor: l,
            containsOrdinal: o,
            loc: d,
            normalized: i,
            obj: t,
            offsetProvis: r,
            useWeekData: m,
            zoneToUse: s,
        };
        return m
            ? As._buildObject(y, Ls, Fs, Ts(f))
            : o
                ? As._buildObject(y, zs, Zs, ks(f))
                : As._buildObject(y, $s, Cs, f);
    }
    static fromISO(t, e = {}) {
        const [s, n] = (function (t) {
            return ne(t, [je, Ce], [xe, Fe], [Ie, Ze], [Ve, $e]);
        })(t);
        return Is(s, n, e, 'ISO 8601', t);
    }
    static fromRFC2822(t, e = {}) {
        const [s, n] = (function (t) {
            return ne((function (t) {
                return t
                    .replace(/\([^()]*\)|[\n\t]/g, ' ')
                    .replace(/(\s\s+)/g, ' ')
                    .trim();
            })(t), [Te, Se]);
        })(t);
        return Is(s, n, e, 'RFC 2822', t);
    }
    static fromHTTP(t, e = {}) {
        const [s, n] = (function (t) {
            return ne(t, [ke, De], [Me, De], [Ne, Ee]);
        })(t);
        return Is(s, n, e, 'HTTP', t);
    }
    static fromFormat(t, e, s = {}) {
        if (Mt(t) || Mt(e))
            throw new o('fromFormat requires an input string and a format');
        const { locale: n, numberingSystem: r } = s, i = lt.fromOpts({ locale: n, numberingSystem: r, defaultToEN: !0 }), [a, u, c, l] = (function (t, e, s) {
            const { result: n, zone: r, specificOffset: i, invalidReason: a, } = ys(t, e, s);
            return [n, r, i, a];
        })(i, t, e);
        return l ? As.invalid(l) : Is(a, u || null, s, `format ${e}`, t, c);
    }
    static fromString(t, e, s = {}) {
        return As.fromFormat(t, e, s);
    }
    static fromSQL(t, e = {}) {
        const [s, n] = (function (t) {
            return ne(t, [Le, Ce], [ze, qe]);
        })(t);
        return Is(s, n, e, 'SQL', t);
    }
    static invalid(t, s) {
        if (!t)
            throw new o('need to specify a reason the DateTime is invalid');
        const n = t instanceof Ae ? t : new Ae(t, s);
        if (St.throwOnInvalid)
            throw new e(n);
        return new As({ invalid: n });
    }
    static isDateTime(t) {
        return !(!t || !t._isLuxonDateTime);
    }
    static parseFormatForOpts(t, e = {}) {
        const s = gs(t, lt.fromObject(e));
        return s ? s.map(t => (t ? t.val : null)).join('') : null;
    }
    static min(...t) {
        if (!t.every(As.isDateTime))
            throw new o('min requires all arguments be DateTimes');
        return jt(t, t => t.valueOf(), Math.min);
    }
    static max(...t) {
        if (!t.every(As.isDateTime))
            throw new o('max requires all arguments be DateTimes');
        return jt(t, t => t.valueOf(), Math.max);
    }
    static fromFormatExplain(t, e, s = {}) {
        const { locale: n, numberingSystem: r } = s;
        return ys(lt.fromOpts({ locale: n, numberingSystem: r, defaultToEN: !0 }), t, e);
    }
    static fromStringExplain(t, e, s = {}) {
        return As.fromFormatExplain(t, e, s);
    }
    static expandFormat(t, e = {}) {
        return fs(te.parseFormat(t), lt.fromObject(e))
            .map(t => t.val)
            .join('');
    }
    static _buildObject(t, e, s, n) {
        let r = !1;
        e.forEach(e => {
            kt(t.normalized[e]) ? (r = !0) : (t.normalized[e] = r ? s[e] : n[e]);
        });
        const i = (t.useWeekData
            ? (function (t) {
                const e = Dt(t.weekYear), s = xt(t.weekNumber, 1, At(t.weekYear)), n = xt(t.weekday, 1, 7);
                return e
                    ? s
                        ? !n && ws('weekday', t.weekday)
                        : ws('week', t.weekNumber)
                    : ws('weekYear', t.weekYear);
            })(t.normalized)
            : t.containsOrdinal
                ? (function (t) {
                    const e = Dt(t.year), s = xt(t.ordinal, 1, Lt(t.year));
                    return e ? !s && ws('ordinal', t.ordinal) : ws('year', t.year);
                })(t.normalized)
                : Ns(t.normalized)) || Ds(t.normalized);
        if (i)
            return As.invalid(i);
        const a = t.useWeekData
            ? Ss(t.normalized)
            : t.containsOrdinal
                ? Ms(t.normalized)
                : t.normalized, [o, u] = xs(a, t.offsetProvis, t.zoneToUse), c = new As({ ts: o, zone: t.zoneToUse, o: u, loc: t.loc });
        return t.normalized.weekday &&
            t.containsGregor &&
            t.obj.weekday !== c.weekday
            ? As.invalid('mismatched weekday', `you can't specify both a weekday of ${t.normalized.weekday} and a date of ${c.toISO()}`)
            : c;
    }
    static _lastOpts(t) {
        let e, s = {};
        return (t.length > 0 && 'object' == typeof t[t.length - 1]
            ? ((s = t.pop()), (e = t))
            : (e = Array.from(t)),
            [s, e]);
    }
    static _quickDT(t, e) {
        const s = gt(e.zone, St.defaultZone), n = lt.fromObject(e), r = St.now();
        let i, a;
        if (kt(t.year)) {
            for (const e of $s)
                Mt(t[e]) && (t[e] = Cs[e]);
            const e = Ns(t) || Ds(t);
            if (e)
                return As.invalid(e);
            const n = s.offset(r);
            [i, a] = xs(t, n, s);
        }
        else
            i = r;
        return new As({ ts: i, zone: s, loc: n, o: a });
    }
    static _diffRelative(t, e, s) {
        const n = !!Mt(s.round) || s.round, r = (t, r) => {
            t = Zt(t, n || s.calendary ? 0 : 2, !0);
            return e._loc.clone(s).relFormatter(s).format(t, r);
        }, i = n => s.calendary
            ? e.hasSame(t, n)
                ? 0
                : e.startOf(n).diff(t.startOf(n), n).get(n)
            : e.diff(t, n).get(n);
        if (s.unit)
            return r(i(s.unit), s.unit);
        for (const t of s.units) {
            const e = i(t);
            if (Math.abs(e) >= 1)
                return r(e, t);
        }
        return r(t > e ? -0 : 0, s.units[s.units.length - 1]);
    }
    static _unsupportedZone(t) {
        return new Ae('unsupported zone', `the zone "${t.name}" is not supported`);
    }
    get(t) {
        return this[t];
    }
    resolvedLocaleOptions(t = {}) {
        const { locale: e, numberingSystem: s, calendar: n, } = te.create(this._loc.clone(t), t).resolvedOptions(this);
        return { locale: e, numberingSystem: s, outputCalendar: n };
    }
    toLocal() {
        return this.setZone(St.defaultZone);
    }
    toUTC(t = 0, e = {}) {
        return this.setZone(dt.instance(t), e);
    }
    setZone(t, { keepLocalTime: e = !1, keepCalendarTime: s = !1 } = {}) {
        if ((t = gt(t, St.defaultZone)).equals(this.zone))
            return this;
        if (t.isValid) {
            let n = this._ts;
            if (e || s) {
                const e = t.offset(this._ts);
                n = xs(this.toObject(), e, t)[0];
            }
            return this._clone({ ts: n, zone: t });
        }
        return As.invalid(As._unsupportedZone(t));
    }
    reconfigure(t) {
        const e = this._loc.clone(t);
        return this._clone({ loc: e });
    }
    setLocale(t) {
        return this.reconfigure({ locale: t });
    }
    set(t) {
        if (!this.isValid)
            return this;
        const e = Rt(t, qs), s = kt(e.weekYear) || kt(e.weekNumber) || kt(e.weekday), n = kt(e.ordinal), r = kt(e.year), i = kt(e.month) || kt(e.day), o = r || i, u = e.weekYear || e.weekNumber;
        if ((o || n) && u)
            throw new a("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
        if (i && n)
            throw new a("Can't mix ordinal dates with month/day");
        let c;
        s
            ? (c = Ss(Object.assign(Object.assign({}, Ts(this._c)), e)))
            : Mt(e.ordinal)
                ? ((c = Object.assign(Object.assign({}, this.toObject()), e)),
                    Mt(e.day) && (c.day = Math.min(zt(c.year, c.month), c.day)))
                : (c = Ms(Object.assign(Object.assign({}, ks(this._c)), e)));
        const [l, h] = xs(c, this._o, this.zone);
        return this._clone({ ts: l, o: h });
    }
    plus(t) {
        if (!this.isValid)
            return this;
        const e = Re.fromDurationLike(t);
        return this._clone(this._adjustTime(e));
    }
    minus(t) {
        if (!this.isValid)
            return this;
        const e = Re.fromDurationLike(t).negate();
        return this._clone(this._adjustTime(e));
    }
    startOf(t) {
        if (!this.isValid)
            return this;
        const e = {}, s = Re.normalizeUnit(t);
        switch (s) {
            case 'years':
                e.month = 1;
            case 'quarters':
            case 'months':
                e.day = 1;
            case 'weeks':
            case 'days':
                e.hour = 0;
            case 'hours':
                e.minute = 0;
            case 'minutes':
                e.second = 0;
            case 'seconds':
                e.millisecond = 0;
        }
        if (('weeks' === s && (e.weekday = 1), 'quarters' === s)) {
            const t = Math.ceil(this.month / 3);
            e.month = 3 * (t - 1) + 1;
        }
        return this.set(e);
    }
    endOf(t) {
        return this.plus({ [t]: 1 })
            .startOf(t)
            .minus({ milliseconds: 1 });
    }
    toFormat(t, e = {}) {
        return this.isValid
            ? te.create(this._loc.redefaultToEN(e)).formatDateTimeFromString(this, t)
            : 'Invalid DateTime';
    }
    toLocaleString(t = w, e = {}) {
        return this.isValid
            ? te.create(this._loc.clone(e), t).formatDateTime(this)
            : 'Invalid DateTime';
    }
    toLocaleParts(t = {}) {
        return this.isValid
            ? te.create(this._loc.clone(t), t).formatDateTimeParts(this)
            : [];
    }
    toISO({ format: t = 'extended', suppressSeconds: e = !1, suppressMilliseconds: s = !1, includeOffset: n = !0, extendedZone: r = !1, } = {}) {
        if (!this.isValid)
            return null;
        const i = 'extended' === t;
        return [this._toISODate(i), 'T', this._toISOTime(i, e, s, n, r)].join('');
    }
    toISODate(t = { format: 'extended' }) {
        let e = 'basic' === t.format ? 'yyyyMMdd' : 'yyyy-MM-dd';
        return this.year > 9999 && (e = '+' + e), Vs(this, e);
    }
    toISOWeekDate() {
        return Vs(this, "kkkk-'W'WW-c");
    }
    toISOTime({ suppressMilliseconds: t = !1, suppressSeconds: e = !1, includeOffset: s = !0, includePrefix: n = !1, extendedZone: r = !1, format: i = 'extended', } = {}) {
        return this.isValid
            ? [n ? 'T' : '', this._toISOTime('extended' === i, e, t, s, r)].join('')
            : null;
    }
    toRFC2822() {
        return Vs(this, 'EEE, dd LLL yyyy HH:mm:ss ZZZ', !1);
    }
    toHTTP() {
        return Vs(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
    }
    toSQLDate() {
        return this.isValid ? this._toISODate(!0) : null;
    }
    toSQLTime({ includeOffset: t = !0, includeZone: e = !1, includeOffsetSpace: s = !0, } = {}) {
        let n = 'HH:mm:ss.SSS';
        return ((e || t) && (s && (n += ' '), e ? (n += 'z') : t && (n += 'ZZ')),
            Vs(this, n, !0));
    }
    toSQL(t = {}) {
        return this.isValid ? `${this.toSQLDate()} ${this.toSQLTime(t)}` : null;
    }
    toString() {
        return this.isValid ? this.toISO() : 'Invalid DateTime';
    }
    valueOf() {
        return this.toMillis();
    }
    toMillis() {
        return this.isValid ? this.ts : NaN;
    }
    toSeconds() {
        return this.isValid ? this._ts / 1e3 : NaN;
    }
    toUnixInteger() {
        return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
    }
    toJSON() {
        return this.toISO();
    }
    toBSON() {
        return this.toJSDate();
    }
    toObject(t = { includeConfig: !1 }) {
        if (!this.isValid)
            return {};
        const e = Object.assign({}, this._c);
        return (t.includeConfig &&
            ((e.outputCalendar = this.outputCalendar),
                (e.numberingSystem = this._loc.numberingSystem),
                (e.locale = this._loc.locale)),
            e);
    }
    toJSDate() {
        return new Date(this.isValid ? this._ts : NaN);
    }
    diff(t, e = 'milliseconds', s = {}) {
        if (!this.isValid || !t.isValid) {
            const e = this.invalidReason || t.invalidReason;
            return Re.invalid(e, 'created by diffing an invalid DateTime');
        }
        const n = ((a = e), Array.isArray(a) ? a : [a]).map(Re.normalizeUnit), r = t.valueOf() > this.valueOf(), i = Ke(r ? this : t, r ? t : this, n, Object.assign({
            locale: this.locale,
            numberingSystem: this.numberingSystem,
        }, s));
        var a;
        return r ? i.negate() : i;
    }
    diffNow(t = 'milliseconds', e = {}) {
        return this.diff(As.now(), t, e);
    }
    until(t) {
        return Ge.fromDateTimes(this, t);
    }
    hasSame(t, e) {
        if (!this.isValid)
            return !1;
        const s = t.valueOf(), n = this.setZone(t.zone, { keepLocalTime: !0 });
        return +n.startOf(e) <= s && s <= +n.endOf(e);
    }
    equals(t) {
        return (this.valueOf() === t.valueOf() &&
            this.zone.equals(t.zone) &&
            this._loc.equals(t._loc));
    }
    toRelative(t = {}) {
        if (!this.isValid)
            return null;
        const e = t.base || As.fromObject({}, { zone: this.zone }), s = t.padding ? (this < e ? -t.padding : t.padding) : 0;
        let n = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'], r = t.unit;
        return (Array.isArray(t.unit) && ((n = t.unit), (r = void 0)),
            As._diffRelative(e, this.plus(s), Object.assign(Object.assign({}, t), {
                numeric: 'always',
                units: n,
                unit: r,
            })));
    }
    toRelativeCalendar(t = {}) {
        return this.isValid
            ? As._diffRelative(t.base || As.fromObject({}, { zone: this.zone }), this, Object.assign(Object.assign({}, t), {
                numeric: 'auto',
                units: ['years', 'months', 'days'],
                calendary: !0,
            }))
            : null;
    }
    _possiblyCachedWeekData(t) {
        return null === t._weekData && (t._weekData = Ts(t._c)), t._weekData;
    }
    _clone(t) {
        const e = {
            ts: this._ts,
            zone: this.zone,
            c: this._c,
            o: this._o,
            loc: this._loc,
            invalid: this._invalid || void 0,
        };
        return new As(Object.assign(Object.assign(Object.assign({}, e), t), { old: e }));
    }
    _adjustTime(t) {
        const e = this._o, s = this._c.year + Math.trunc(t.years), n = this._c.month + Math.trunc(t.months) + 3 * Math.trunc(t.quarters), r = Object.assign(Object.assign({}, this._c), {
            year: s,
            month: n,
            day: Math.min(this._c.day, zt(s, n)) +
                Math.trunc(t.days) +
                7 * Math.trunc(t.weeks),
        }), i = Re.fromObject({
            years: t.years - Math.trunc(t.years),
            quarters: t.quarters - Math.trunc(t.quarters),
            months: t.months - Math.trunc(t.months),
            weeks: t.weeks - Math.trunc(t.weeks),
            days: t.days - Math.trunc(t.days),
            hours: t.hours,
            minutes: t.minutes,
            seconds: t.seconds,
            milliseconds: t.milliseconds,
        }).as('milliseconds'), a = qt(r);
        let [o, u] = Es(a, e, this.zone);
        return 0 !== i && ((o += i), (u = this.zone.offset(o))), { ts: o, o: u };
    }
    _toISODate(t) {
        const e = this._c.year > 9999 || this._c.year < 0;
        let s = '';
        return (e && this._c.year >= 0 && (s += '+'),
            (s += It(this._c.year, e ? 6 : 4)),
            t
                ? ((s += '-'),
                    (s += It(this._c.month)),
                    (s += '-'),
                    (s += It(this._c.day)))
                : ((s += It(this._c.month)), (s += It(this._c.day))),
            s);
    }
    _toISOTime(t, e, s, n, r) {
        let i = It(this._c.hour);
        return (t
            ? ((i += ':'),
                (i += It(this._c.minute)),
                (0 === this._c.second && e) || (i += ':'))
            : (i += It(this._c.minute)),
            (0 === this._c.second && e) ||
                ((i += It(this._c.second)),
                    (0 === this._c.millisecond && s) ||
                        ((i += '.'), (i += It(this._c.millisecond, 3)))),
            n &&
                (this.isOffsetFixed && 0 === this.offset && !r
                    ? (i += 'Z')
                    : this._o < 0
                        ? ((i += '-'),
                            (i += It(Math.trunc(-this._o / 60))),
                            (i += ':'),
                            (i += It(Math.trunc(-this._o % 60))))
                        : ((i += '+'),
                            (i += It(Math.trunc(this._o / 60))),
                            (i += ':'),
                            (i += It(Math.trunc(this._o % 60))))),
            r && (i += '[' + this.zone.ianaName + ']'),
            i);
    }
}
(As.DATE_SHORT = w),
    (As.DATE_MED = O),
    (As.DATE_MED_WITH_WEEKDAY = b),
    (As.DATE_FULL = v),
    (As.DATE_HUGE = T),
    (As.TIME_SIMPLE = S),
    (As.TIME_WITH_SECONDS = k),
    (As.TIME_WITH_SHORT_OFFSET = M),
    (As.TIME_WITH_LONG_OFFSET = N),
    (As.TIME_24_SIMPLE = D),
    (As.TIME_24_WITH_SECONDS = E),
    (As.TIME_24_WITH_SHORT_OFFSET = j),
    (As.TIME_24_WITH_LONG_OFFSET = x),
    (As.DATETIME_SHORT = I),
    (As.DATETIME_SHORT_WITH_SECONDS = V),
    (As.DATETIME_MED = C),
    (As.DATETIME_MED_WITH_SECONDS = F),
    (As.DATETIME_MED_WITH_WEEKDAY = Z),
    (As.DATETIME_FULL = $),
    (As.DATETIME_FULL_WITH_SECONDS = L),
    (As.DATETIME_HUGE = z),
    (As.DATETIME_HUGE_WITH_SECONDS = q);
const Us = '4.0.0';
export { As as DateTime, Re as Duration, dt as FixedOffsetZone, y as IANAZone, Be as Info, Ge as Interval, h as Intl, mt as InvalidZone, Gt as ORDERED_UNITS, Bt as REVERSE_ORDERED_UNITS, St as Settings, yt as SystemZone, Us as VERSION, l as Zone, };
//# sourceMappingURL=ts-luxon.es6.js.map
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtbHV4b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHMtbHV4b24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFFLFNBQVEsS0FBSztDQUFHO0FBRXhCLE1BQU0sQ0FBRSxTQUFRLENBQUM7SUFDZixZQUFZLENBQUM7UUFDWCxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFFLFNBQVEsQ0FBQztJQUNmLFlBQVksQ0FBQztRQUNYLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUUsU0FBUSxDQUFDO0lBQ2YsWUFBWSxDQUFDO1FBQ1gsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Q0FDRjtBQUVELE1BQU0sQ0FBRSxTQUFRLENBQUM7SUFDZixZQUFZLENBQUM7UUFDWCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Q0FDRjtBQUVELE1BQU0sQ0FBRSxTQUFRLENBQUM7SUFDZixZQUFZLENBQUM7UUFDWCxLQUFLLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxDQUFDO1lBQ25ELE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUUsU0FBUSxDQUFDO0lBQ2YsWUFBWSxDQUFDO1FBQ1gsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxTQUFT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RSxDQUFDLEVBQUUsRUFBRTtvQkFDakMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDaEMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDWCxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDOUQ7Z0JBQ0QsT0FBTyxDQUFDLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1YsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDYixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQzFDLENBQUMsR0FBRyxpREFBaUQsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQzdELENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlCLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDZixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNYLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbEIsT0FBTyxDQUNMLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUMzQixDQUFDLEVBQUUsQ0FBQztnQkFDRixJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDYixLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNULEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFDVixNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUNWLFdBQVcsRUFBRSxDQUFDO2FBQ2YsQ0FBQztnQkFDQSxDQUFDLENBQUM7Z0JBQ0YsR0FBRyxDQUNOLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLENBQUM7UUFDTixPQUFPLE1BQU0sS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuRCxDQUFDO0NBQ0Y7QUFFRDs7Ozs7Ozs7Ozs7OztnRkFhZ0Y7QUFDaEYsTUFBTSxDQUFDLEdBQUcsU0FBUyxFQUNqQixDQUFDLEdBQUcsT0FBTyxFQUNYLENBQUMsR0FBRyxNQUFNLEVBQ1YsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFDakMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFDakMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUM3QyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUNqQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQzdDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUMxQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUNyQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQ3RELENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFDdEQsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsRUFDNUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxFQUN2RCxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFDeEUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQ3hFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUNyRCxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUNoRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFDckQsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFDaEUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFDakUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUs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LEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxFQUM1QyxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsRUFDMUIsRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLFFBQVEsRUFBRSxDQUFDLE1BQU0sS0FBSyxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsRUFDN0QsRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO0FBRXBDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNqQixPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUVELFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2QsT0FBTztRQUNMO1lBQ0UsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNqQixNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QixNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QixXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDMUI7UUFDRCxJQUFJO1FBQ0osQ0FBQyxHQUFHLENBQUM7S0FDTixDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUMxQixDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdCLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFFRCxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNkLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFFRCxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDbkMsRUFBRSxHQUNBLDhQQUE4UCxDQUFDO0FBRW5RLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDWCxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQ25DLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUNyQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUM1QixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFB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UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDdEQsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDekQsQ0FBQztJQUVELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDdkQsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDdEQsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENB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QUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDWixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FDWCxDQUFDO1FBQ0osT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLElBQUksQ0FBQyxHQUFHLElBQUksRUFDVixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1IsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUNWLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDYixFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDekIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO1NBQzFCLENBQUMsRUFDRixDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckUsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENB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QUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDdkUsQ0FBQztJQUVELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM3RSxDQUFDO0lBRUQsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTztZQUNqQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNuRCxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQUVELFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLEVBQUU7UUFDdkMsT0FBTyxJQUFJLENBQUMsT0FBTztZQUNqQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDcEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNULENBQUM7SUFFRCxVQUFVLENBQUMsQ0FBQyxHQUFHLGNBQWMsRUFBRSxDQUFDLEdBQUcsRUFBRTtRQUNuQyxPQUFPLElBQUksQ0FBQyxPQUFPO1lBQ2pCLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFB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QUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs0QkFDcEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFDbEIsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDM0MsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDL0I7d0JBQ0UsTUFBTSxDQUFD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RSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFDckMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNmLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsQixJQUFJLENBQUMsRUFDSCxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkMsT0FBTyxDQUNMLENBQUMsR0FBRyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsTUFBTSxDQUFDLE1BQU0sQ0FDWDtZQUNFLFFBQVEsRUFBRSxDQUFDO1lBQ1gsVUFBVSxFQUFFLENBQUM7WUFDYixPQUFPLEVBQUUsQ0FBQztTQUNYLEVBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUNOLENBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUNsRCxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVB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RUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDN0MsQ0FBQztJQUVELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUM3QyxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ2xELENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUMxRSxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDNUUsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENB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LEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzlELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxJQUFJLENBQUMsQ0FBQztRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxLQUFLLENBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMxQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxPQUFPLENBQUMsQ0FBQztRQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztZQUFFLE9BQU8sSUFBSSxDQUFD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LFFBQVEsRUFDZCxFQUFFLElBQUksVUFBVSxFQUNoQixFQUFFLElBQUksT0FBTyxFQUNiLENBQUMsSUFBSSxJQUFJLEdBQ1YsQ0FBQztBQUNGLHdDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIHQgZXh0ZW5kcyBFcnJvciB7fVxuXG5jbGFzcyBlIGV4dGVuZHMgdCB7XG4gIGNvbnN0cnVjdG9yKHQpIHtcbiAgICBzdXBlcihgSW52YWxpZCBEYXRlVGltZTogJHt0LnRvTWVzc2FnZSgpfWApO1xuICB9XG59XG5cbmNsYXNzIHMgZXh0ZW5kcyB0IHtcbiAgY29uc3RydWN0b3IodCkge1xuICAgIHN1cGVyKGBJbnZhbGlkIER1cmF0aW9uOiAke3QudG9NZXNzYWdlKCl9YCk7XG4gIH1cbn1cblxuY2xhc3MgbiBleHRlbmRzIHQge1xuICBjb25zdHJ1Y3Rvcih0KSB7XG4gICAgc3VwZXIoYEludmFsaWQgSW50ZXJ2YWw6ICR7dC50b01lc3NhZ2UoKX1gKTtcbiAgfVxufVxuXG5jbGFzcyByIGV4dGVuZHMgdCB7XG4gIGNvbnN0cnVjdG9yKHQpIHtcbiAgICBzdXBlcihgSW52YWxpZCB1bml0ICR7dH1gKSwgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIHIucHJvdG90eXBlKTtcbiAgfVxufVxuXG5jbGFzcyBpIGV4dGVuZHMgdCB7XG4gIGNvbnN0cnVjdG9yKHQpIHtcbiAgICBzdXBlcihgJHt0fSBpcyBhbiBpbnZhbGlkIG9yIHVua25vd24gem9uZSBzcGVjaWZpZXJgKSxcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBpLnByb3RvdHlwZSk7XG4gIH1cbn1cblxuY2xhc3MgYSBleHRlbmRzIHQge1xuICBjb25zdHJ1Y3Rvcih0KSB7XG4gICAgc3VwZXIodCksIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBhLnByb3RvdHlwZSk7XG4gIH1cbn1cblxuY2xhc3MgbyBleHRlbmRzIHQge1xuICBjb25zdHJ1Y3Rvcih0KSB7XG4gICAgc3VwZXIodCksIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBvLnByb3RvdHlwZSk7XG4gIH1cbn1cblxuY2xhc3MgdSBleHRlbmRzIHQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcignWm9uZSBpcyBhbiBhYnN0cmFjdCBjbGFzcycpLFxuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIHUucHJvdG90eXBlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjKC4uLnQpIHtcbiAgdC5sZW5ndGg7XG59XG5cbmNsYXNzIGwge1xuICBnZXQgdHlwZSgpIHtcbiAgICB0aHJvdyBuZXcgdSgpO1xuICB9XG5cbiAgZ2V0IGlhbmFOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICB0aHJvdyBuZXcgdSgpO1xuICB9XG5cbiAgZ2V0IGlzVW5pdmVyc2FsKCkge1xuICAgIHRocm93IG5ldyB1KCk7XG4gIH1cblxuICBnZXQgaXNWYWxpZCgpIHtcbiAgICB0aHJvdyBuZXcgdSgpO1xuICB9XG5cbiAgb2Zmc2V0TmFtZSh0LCBlKSB7XG4gICAgdGhyb3cgKGModCwgZSksIG5ldyB1KCkpO1xuICB9XG5cbiAgZm9ybWF0T2Zmc2V0KHQsIGUpIHtcbiAgICB0aHJvdyAoYyh0LCBlKSwgbmV3IHUoKSk7XG4gIH1cblxuICBvZmZzZXQodCkge1xuICAgIHRocm93IChjKHQpLCBuZXcgdSgpKTtcbiAgfVxuXG4gIGVxdWFscyh0KSB7XG4gICAgdGhyb3cgKGModCksIG5ldyB1KCkpO1xuICB9XG59XG5cbnZhciBoID0gSW50bDtcbmxldCBkID0ge307XG5jb25zdCBtID0geyB5ZWFyOiAwLCBtb250aDogMSwgZGF5OiAyLCBlcmE6IDMsIGhvdXI6IDQsIG1pbnV0ZTogNSwgc2Vjb25kOiA2IH07XG5sZXQgZiA9IHt9O1xuXG5jbGFzcyB5IGV4dGVuZHMgbCB7XG4gIGNvbnN0cnVjdG9yKHQpIHtcbiAgICBzdXBlcigpLCAodGhpcy5fem9uZU5hbWUgPSB0KSwgKHRoaXMuX3ZhbGlkID0geS5pc1ZhbGlkWm9uZSh0KSk7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ2lhbmEnO1xuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmVOYW1lO1xuICB9XG5cbiAgZ2V0IGlzVW5pdmVyc2FsKCkge1xuICAgIHJldHVybiAhMTtcbiAgfVxuXG4gIGdldCBpc1ZhbGlkKCkge1xuICAgIHJldHVybiB0aGlzLl92YWxpZDtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUodCkge1xuICAgIHJldHVybiBmW3RdIHx8IChmW3RdID0gbmV3IHkodCkpLCBmW3RdO1xuICB9XG5cbiAgc3RhdGljIHJlc2V0Q2FjaGUoKSB7XG4gICAgKGYgPSB7fSksIChkID0ge30pO1xuICB9XG5cbiAgc3RhdGljIGlzVmFsaWRTcGVjaWZpZXIodCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWRab25lKHQpO1xuICB9XG5cbiAgc3RhdGljIGlzVmFsaWRab25lKHQpIHtcbiAgICBpZiAoIXQpIHJldHVybiAhMTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIG5ldyBoLkRhdGVUaW1lRm9ybWF0KCdlbi1VUycsIHsgdGltZVpvbmU6IHQgfSkuZm9ybWF0KCksICEwO1xuICAgIH0gY2F0Y2ggKHQpIHtcbiAgICAgIHJldHVybiAhMTtcbiAgICB9XG4gIH1cblxuICBvZmZzZXROYW1lKHQsIHsgZm9ybWF0OiBlLCBsb2NhbGU6IHMgfSA9IHt9KSB7XG4gICAgcmV0dXJuIFd0KHQsIGUsIHMsIHRoaXMubmFtZSk7XG4gIH1cblxuICBmb3JtYXRPZmZzZXQodCwgZSkge1xuICAgIHJldHVybiBZdCh0aGlzLm9mZnNldCh0KSwgZSk7XG4gIH1cblxuICBvZmZzZXQodCkge1xuICAgIGNvbnN0IGUgPSBuZXcgRGF0ZSh0KTtcbiAgICBpZiAoaXNOYU4oK2UpKSByZXR1cm4gTmFOO1xuICAgIGNvbnN0IHMgPSAoZnVuY3Rpb24gKHQpIHtcbiAgICAgIGlmICghZFt0XSlcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkW3RdID0gbmV3IGguRGF0ZVRpbWVGb3JtYXQoJ2VuLVVTJywge1xuICAgICAgICAgICAgaG91cjEyOiAhMSxcbiAgICAgICAgICAgIHRpbWVab25lOiB0LFxuICAgICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICAgICAgbW9udGg6ICcyLWRpZ2l0JyxcbiAgICAgICAgICAgIGRheTogJzItZGlnaXQnLFxuICAgICAgICAgICAgaG91cjogJzItZGlnaXQnLFxuICAgICAgICAgICAgbWludXRlOiAnMi1kaWdpdCcsXG4gICAgICAgICAgICBzZWNvbmQ6ICcyLWRpZ2l0JyxcbiAgICAgICAgICAgIGVyYTogJ3Nob3J0JyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRocm93IG5ldyBpKHQpO1xuICAgICAgICB9XG4gICAgICByZXR1cm4gZFt0XTtcbiAgICB9KSh0aGlzLm5hbWUpO1xuICAgIGxldCBuO1xuICAgIGNvbnN0IFtyLCBhLCBvLCB1LCBjLCBsLCBmXSA9XG4gICAgICB0eXBlb2Ygcy5mb3JtYXRUb1BhcnRzID09IHR5cGVvZiBpc05hTlxuICAgICAgICA/IChmdW5jdGlvbiAodCwgZSkge1xuICAgICAgICAgICAgY29uc3QgcyA9IHQuZm9ybWF0VG9QYXJ0cyhlKSxcbiAgICAgICAgICAgICAgbiA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPCBzLmxlbmd0aDsgdCsrKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgdHlwZTogZSwgdmFsdWU6IHIgfSA9IHNbdF0sXG4gICAgICAgICAgICAgICAgaSA9IG1bZV07XG4gICAgICAgICAgICAgICdlcmEnID09PSBlID8gKG5baV0gPSByKSA6IE10KGkpIHx8IChuW2ldID0gcGFyc2VJbnQociwgMTApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuO1xuICAgICAgICAgIH0pKHMsIGUpXG4gICAgICAgIDogKGZ1bmN0aW9uICh0LCBlKSB7XG4gICAgICAgICAgICBjb25zdCBzID0gdC5mb3JtYXQoZSkucmVwbGFjZSgvXFx1MjAwRS9nLCAnJyksXG4gICAgICAgICAgICAgIG4gPSAvKFxcZCspXFwvKFxcZCspXFwvKFxcZCspIChBRHxCQyksPyAoXFxkKyk6KFxcZCspOihcXGQrKS8uZXhlYyhzKSxcbiAgICAgICAgICAgICAgWywgciwgaSwgYSwgbywgdSwgYywgbF0gPSBuO1xuICAgICAgICAgICAgcmV0dXJuIFthLCByLCBpLCBvLCB1LCBjLCBsXTtcbiAgICAgICAgICB9KShzLCBlKTtcbiAgICAnQkMnID09PSB1ICYmIChuID0gMSAtIE1hdGguYWJzKCtyKSk7XG4gICAgbGV0IHkgPSArZTtcbiAgICBjb25zdCBnID0geSAlIDFlMztcbiAgICByZXR1cm4gKFxuICAgICAgKHkgLT0gZyA+PSAwID8gZyA6IDFlMyArIGcpLFxuICAgICAgKHF0KHtcbiAgICAgICAgeWVhcjogbiB8fCArcixcbiAgICAgICAgbW9udGg6ICthLFxuICAgICAgICBkYXk6ICtvLFxuICAgICAgICBob3VyOiArKDI0ID09PSBjID8gMCA6IGMpLFxuICAgICAgICBtaW51dGU6ICtsLFxuICAgICAgICBzZWNvbmQ6ICtmLFxuICAgICAgICBtaWxsaXNlY29uZDogMCxcbiAgICAgIH0pIC1cbiAgICAgICAgeSkgL1xuICAgICAgICA2ZTRcbiAgICApO1xuICB9XG5cbiAgZXF1YWxzKHQpIHtcbiAgICByZXR1cm4gJ2lhbmEnID09PSB0LnR5cGUgJiYgdC5uYW1lID09PSB0aGlzLm5hbWU7XG4gIH1cbn1cblxuLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cblxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5jb25zdCBnID0gJ251bWVyaWMnLFxuICBfID0gJ3Nob3J0JyxcbiAgcCA9ICdsb25nJyxcbiAgdyA9IHsgeWVhcjogZywgbW9udGg6IGcsIGRheTogZyB9LFxuICBPID0geyB5ZWFyOiBnLCBtb250aDogXywgZGF5OiBnIH0sXG4gIGIgPSB7IHllYXI6IGcsIG1vbnRoOiBfLCBkYXk6IGcsIHdlZWtkYXk6IF8gfSxcbiAgdiA9IHsgeWVhcjogZywgbW9udGg6IHAsIGRheTogZyB9LFxuICBUID0geyB5ZWFyOiBnLCBtb250aDogcCwgZGF5OiBnLCB3ZWVrZGF5OiBwIH0sXG4gIFMgPSB7IGhvdXI6IGcsIG1pbnV0ZTogZyB9LFxuICBrID0geyBob3VyOiBnLCBtaW51dGU6IGcsIHNlY29uZDogZyB9LFxuICBNID0geyBob3VyOiBnLCBtaW51dGU6IGcsIHNlY29uZDogZywgdGltZVpvbmVOYW1lOiBfIH0sXG4gIE4gPSB7IGhvdXI6IGcsIG1pbnV0ZTogZywgc2Vjb25kOiBnLCB0aW1lWm9uZU5hbWU6IHAgfSxcbiAgRCA9IHsgaG91cjogZywgbWludXRlOiBnLCBob3VyQ3ljbGU6ICdoMjMnIH0sXG4gIEUgPSB7IGhvdXI6IGcsIG1pbnV0ZTogZywgc2Vjb25kOiBnLCBob3VyQ3ljbGU6ICdoMjMnIH0sXG4gIGogPSB7IGhvdXI6IGcsIG1pbnV0ZTogZywgc2Vjb25kOiBnLCBob3VyQ3ljbGU6ICdoMjMnLCB0aW1lWm9uZU5hbWU6IF8gfSxcbiAgeCA9IHsgaG91cjogZywgbWludXRlOiBnLCBzZWNvbmQ6IGcsIGhvdXJDeWNsZTogJ2gyMycsIHRpbWVab25lTmFtZTogcCB9LFxuICBJID0geyB5ZWFyOiBnLCBtb250aDogZywgZGF5OiBnLCBob3VyOiBnLCBtaW51dGU6IGcgfSxcbiAgViA9IHsgeWVhcjogZywgbW9udGg6IGcsIGRheTogZywgaG91cjogZywgbWludXRlOiBnLCBzZWNvbmQ6IGcgfSxcbiAgQyA9IHsgeWVhcjogZywgbW9udGg6IF8sIGRheTogZywgaG91cjogZywgbWludXRlOiBnIH0sXG4gIEYgPSB7IHllYXI6IGcsIG1vbnRoOiBfLCBkYXk6IGcsIGhvdXI6IGcsIG1pbnV0ZTogZywgc2Vjb25kOiBnIH0sXG4gIFogPSB7IHllYXI6IGcsIG1vbnRoOiBfLCBkYXk6IGcsIHdlZWtkYXk6IF8sIGhvdXI6IGcsIG1pbnV0ZTogZyB9LFxuICAkID0geyB5ZWFyOiBnLCBtb250aDogcCwgZGF5OiBnLCBob3VyOiBnLCBtaW51dGU6IGcsIHRpbWVab25lTmFtZTogXyB9LFxuICBMID0ge1xuICAgIHllYXI6IGcsXG4gICAgbW9udGg6IHAsXG4gICAgZGF5OiBnLFxuICAgIGhvdXI6IGcsXG4gICAgbWludXRlOiBnLFxuICAgIHNlY29uZDogZyxcbiAgICB0aW1lWm9uZU5hbWU6IF8sXG4gIH0sXG4gIHogPSB7XG4gICAgeWVhcjogZyxcbiAgICBtb250aDogcCxcbiAgICBkYXk6IGcsXG4gICAgd2Vla2RheTogcCxcbiAgICBob3VyOiBnLFxuICAgIG1pbnV0ZTogZyxcbiAgICB0aW1lWm9uZU5hbWU6IHAsXG4gIH0sXG4gIHEgPSB7XG4gICAgeWVhcjogZyxcbiAgICBtb250aDogcCxcbiAgICBkYXk6IGcsXG4gICAgd2Vla2RheTogcCxcbiAgICBob3VyOiBnLFxuICAgIG1pbnV0ZTogZyxcbiAgICBzZWNvbmQ6IGcsXG4gICAgdGltZVpvbmVOYW1lOiBwLFxuICB9LFxuICBBID0gW1xuICAgICdKYW51YXJ5JyxcbiAgICAnRmVicnVhcnknLFxuICAgICdNYXJjaCcsXG4gICAgJ0FwcmlsJyxcbiAgICAnTWF5JyxcbiAgICAnSnVuZScsXG4gICAgJ0p1bHknLFxuICAgICdBdWd1c3QnLFxuICAgICdTZXB0ZW1iZXInLFxuICAgICdPY3RvYmVyJyxcbiAgICAnTm92ZW1iZXInLFxuICAgICdEZWNlbWJlcicsXG4gIF0sXG4gIFUgPSBbXG4gICAgJ0phbicsXG4gICAgJ0ZlYicsXG4gICAgJ01hcicsXG4gICAgJ0FwcicsXG4gICAgJ01heScsXG4gICAgJ0p1bicsXG4gICAgJ0p1bCcsXG4gICAgJ0F1ZycsXG4gICAgJ1NlcCcsXG4gICAgJ09jdCcsXG4gICAgJ05vdicsXG4gICAgJ0RlYycsXG4gIF0sXG4gIFcgPSBbJ0onLCAnRicsICdNJywgJ0EnLCAnTScsICdKJywgJ0onLCAnQScsICdTJywgJ08nLCAnTicsICdEJ107XG5cbmZ1bmN0aW9uIFAodCkge1xuICBzd2l0Y2ggKHQpIHtcbiAgICBjYXNlICduYXJyb3cnOlxuICAgICAgcmV0dXJuIFsuLi5XXTtcbiAgICBjYXNlICdzaG9ydCc6XG4gICAgICByZXR1cm4gWy4uLlVdO1xuICAgIGNhc2UgJ2xvbmcnOlxuICAgICAgcmV0dXJuIFsuLi5BXTtcbiAgICBjYXNlICdudW1lcmljJzpcbiAgICAgIHJldHVybiBbJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5JywgJzEwJywgJzExJywgJzEyJ107XG4gICAgY2FzZSAnMi1kaWdpdCc6XG4gICAgICByZXR1cm4gW1xuICAgICAgICAnMDEnLFxuICAgICAgICAnMDInLFxuICAgICAgICAnMDMnLFxuICAgICAgICAnMDQnLFxuICAgICAgICAnMDUnLFxuICAgICAgICAnMDYnLFxuICAgICAgICAnMDcnLFxuICAgICAgICAnMDgnLFxuICAgICAgICAnMDknLFxuICAgICAgICAnMTAnLFxuICAgICAgICAnMTEnLFxuICAgICAgICAnMTInLFxuICAgICAgXTtcbiAgfVxufVxuXG5jb25zdCBIID0gW1xuICAgICdNb25kYXknLFxuICAgICdUdWVzZGF5JyxcbiAgICAnV2VkbmVzZGF5JyxcbiAgICAnVGh1cnNkYXknLFxuICAgICdGcmlkYXknLFxuICAgICdTYXR1cmRheScsXG4gICAgJ1N1bmRheScsXG4gIF0sXG4gIFIgPSBbJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0JywgJ1N1biddLFxuICBZID0gWydNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUycsICdTJ107XG5cbmZ1bmN0aW9uIEoodCkge1xuICBzd2l0Y2ggKHQpIHtcbiAgICBjYXNlICduYXJyb3cnOlxuICAgICAgcmV0dXJuIFsuLi5ZXTtcbiAgICBjYXNlICdzaG9ydCc6XG4gICAgICByZXR1cm4gWy4uLlJdO1xuICAgIGNhc2UgJ2xvbmcnOlxuICAgICAgcmV0dXJuIFsuLi5IXTtcbiAgICBjYXNlICdudW1lcmljJzpcbiAgICAgIHJldHVybiBbJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnXTtcbiAgfVxufVxuXG5jb25zdCBHID0gWydBTScsICdQTSddLFxuICBCID0gWydCZWZvcmUgQ2hyaXN0JywgJ0Fubm8gRG9taW5pJ10sXG4gIFEgPSBbJ0JDJywgJ0FEJ10sXG4gIEsgPSBbJ0InLCAnQSddO1xuXG5mdW5jdGlvbiBYKHQpIHtcbiAgc3dpdGNoICh0KSB7XG4gICAgY2FzZSAnbmFycm93JzpcbiAgICAgIHJldHVybiBbLi4uS107XG4gICAgY2FzZSAnc2hvcnQnOlxuICAgICAgcmV0dXJuIFsuLi5RXTtcbiAgICBjYXNlICdsb25nJzpcbiAgICAgIHJldHVybiBbLi4uQl07XG4gIH1cbn1cblxubGV0IHR0ID0ge307XG5sZXQgZXQgPSB7fTtcblxuZnVuY3Rpb24gc3QodCwgZSA9IHt9KSB7XG4gIGNvbnN0IHMgPSBKU09OLnN0cmluZ2lmeShbdCwgZV0pO1xuICBsZXQgbiA9IGV0W3NdO1xuICByZXR1cm4gbiB8fCAoKG4gPSBuZXcgaC5EYXRlVGltZUZvcm1hdCh0LCBlKSksIChldFtzXSA9IG4pKSwgbjtcbn1cblxubGV0IG50ID0ge307XG5sZXQgcnQsXG4gIGl0ID0ge307XG5cbmZ1bmN0aW9uIGF0KHQsIGUsIHMsIG4pIHtcbiAgcmV0dXJuICdlbicgPT09IHQubGlzdGluZ01vZGUoKSA/IHMoZSkgOiBuKGUpO1xufVxuXG5jbGFzcyBvdCB7XG4gIGNvbnN0cnVjdG9yKHQsIGUsIHMpIHtcbiAgICAodGhpcy5fcGFkVG8gPSBzLnBhZFRvIHx8IDApLCAodGhpcy5fZmxvb3IgPSBzLmZsb29yIHx8ICExKTtcbiAgICBjb25zdCBuID0gKGZ1bmN0aW9uICh0LCBlKSB7XG4gICAgICB2YXIgcyA9IHt9O1xuICAgICAgZm9yICh2YXIgbiBpbiB0KVxuICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCwgbikgJiZcbiAgICAgICAgICBlLmluZGV4T2YobikgPCAwICYmXG4gICAgICAgICAgKHNbbl0gPSB0W25dKTtcbiAgICAgIGlmIChudWxsICE9IHQgJiYgJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgICAgICB2YXIgciA9IDA7XG4gICAgICAgIGZvciAobiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModCk7IHIgPCBuLmxlbmd0aDsgcisrKVxuICAgICAgICAgIGUuaW5kZXhPZihuW3JdKSA8IDAgJiZcbiAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh0LCBuW3JdKSAmJlxuICAgICAgICAgICAgKHNbbltyXV0gPSB0W25bcl1dKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzO1xuICAgIH0pKHMsIFsncGFkVG8nLCAnZmxvb3InXSk7XG4gICAgaWYgKCFlIHx8IE9iamVjdC5rZXlzKG4pLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGUgPSBPYmplY3QuYXNzaWduKHsgdXNlR3JvdXBpbmc6ICExIH0sIHMpO1xuICAgICAgdGhpcy5fcGFkVG8gPiAwICYmIChlLm1pbmltdW1JbnRlZ2VyRGlnaXRzID0gcy5wYWRUbyksXG4gICAgICAgICh0aGlzLl9pbmYgPSAoZnVuY3Rpb24gKHQsIGUpIHtcbiAgICAgICAgICBjb25zdCBzID0gSlNPTi5zdHJpbmdpZnkoW3QsIGVdKTtcbiAgICAgICAgICBsZXQgbiA9IG50W3NdO1xuICAgICAgICAgIHJldHVybiBuIHx8ICgobiA9IG5ldyBoLk51bWJlckZvcm1hdCh0LCBlKSksIChudFtzXSA9IG4pKSwgbjtcbiAgICAgICAgfSkodCwgZSkpO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdCh0KSB7XG4gICAgaWYgKHRoaXMuX2luZikge1xuICAgICAgY29uc3QgZSA9IHRoaXMuX2Zsb29yID8gTWF0aC5mbG9vcih0KSA6IHQ7XG4gICAgICByZXR1cm4gdGhpcy5faW5mLmZvcm1hdChlKTtcbiAgICB9XG4gICAgcmV0dXJuIEl0KHRoaXMuX2Zsb29yID8gTWF0aC5mbG9vcih0KSA6IFp0KHQsIDMpLCB0aGlzLl9wYWRUbyk7XG4gIH1cbn1cblxuY2xhc3MgdXQge1xuICBjb25zdHJ1Y3Rvcih0LCBlLCBzKSB7XG4gICAgbGV0IG47XG4gICAgaWYgKCgodGhpcy5fb3B0cyA9IHMpLCB0LnpvbmUuaXNVbml2ZXJzYWwpKSB7XG4gICAgICBjb25zdCBlID0gKHQub2Zmc2V0IC8gNjApICogLTEsXG4gICAgICAgIHIgPSBlID49IDAgPyBgRXRjL0dNVCske2V9YCA6IGBFdGMvR01UJHtlfWA7XG4gICAgICAwICE9PSB0Lm9mZnNldCAmJiB5LmNyZWF0ZShyKS5pc1ZhbGlkXG4gICAgICAgID8gKChuID0gciksICh0aGlzLl9kdCA9IHQpKVxuICAgICAgICA6ICgobiA9ICdVVEMnKSxcbiAgICAgICAgICBzLnRpbWVab25lTmFtZVxuICAgICAgICAgICAgPyAodGhpcy5fZHQgPSB0KVxuICAgICAgICAgICAgOiAodGhpcy5fZHQgPVxuICAgICAgICAgICAgICAgIDAgPT09IHQub2Zmc2V0XG4gICAgICAgICAgICAgICAgICA/IHRcbiAgICAgICAgICAgICAgICAgIDogQXMuZnJvbU1pbGxpcyh0LnRzICsgNjAgKiB0Lm9mZnNldCAqIDFlMykpKTtcbiAgICB9IGVsc2VcbiAgICAgICdzeXN0ZW0nID09PSB0LnpvbmUudHlwZVxuICAgICAgICA/ICh0aGlzLl9kdCA9IHQpXG4gICAgICAgIDogKCh0aGlzLl9kdCA9IHQpLCAobiA9IHQuem9uZS5uYW1lKSk7XG4gICAgY29uc3QgciA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fb3B0cyksIHtcbiAgICAgIHRpbWVab25lOiB0aGlzLl9vcHRzLnRpbWVab25lIHx8IG4sXG4gICAgfSk7XG4gICAgdGhpcy5fZHRmID0gc3QoZSwgcik7XG4gIH1cblxuICBnZXQgZHRmKCkge1xuICAgIHJldHVybiB0aGlzLl9kdGY7XG4gIH1cblxuICBmb3JtYXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2R0Zi5mb3JtYXQodGhpcy5fZHQudG9KU0RhdGUoKSk7XG4gIH1cblxuICBmb3JtYXRUb1BhcnRzKCkge1xuICAgIHJldHVybiB0aGlzLl9kdGYuZm9ybWF0VG9QYXJ0cyh0aGlzLl9kdC50b0pTRGF0ZSgpKTtcbiAgfVxuXG4gIHJlc29sdmVkT3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fZHRmLnJlc29sdmVkT3B0aW9ucygpO1xuICB9XG59XG5cbmNsYXNzIGN0IHtcbiAgY29uc3RydWN0b3IodCwgZSwgcykge1xuICAgICh0aGlzLl9vcHRzID0gT2JqZWN0LmFzc2lnbih7IHN0eWxlOiAnbG9uZycgfSwgcykpLFxuICAgICAgIWUgJiZcbiAgICAgICAgRXQoKSAmJlxuICAgICAgICAodGhpcy5fcnRmID0gKGZ1bmN0aW9uICh0LCBlID0ge30pIHtcbiAgICAgICAgICBjb25zdCBzID0gSlNPTi5zdHJpbmdpZnkoW3QsIGVdKTtcbiAgICAgICAgICBsZXQgbiA9IGl0W3NdO1xuICAgICAgICAgIHJldHVybiBuIHx8ICgobiA9IG5ldyBoLlJlbGF0aXZlVGltZUZvcm1hdCh0LCBlKSksIChpdFtzXSA9IG4pKSwgbjtcbiAgICAgICAgfSkodCwgcykpO1xuICB9XG5cbiAgZm9ybWF0KHQsIGUpIHtcbiAgICByZXR1cm4gdGhpcy5fcnRmXG4gICAgICA/IHRoaXMuX3J0Zi5mb3JtYXQodCwgZSlcbiAgICAgIDogKGZ1bmN0aW9uICh0LCBlLCBzID0gJ2Fsd2F5cycsIG4gPSAhMSkge1xuICAgICAgICAgIGNvbnN0IHIgPSBSZS5ub3JtYWxpemVVbml0KHQpLFxuICAgICAgICAgICAgaSA9IHtcbiAgICAgICAgICAgICAgeWVhcnM6IFsneWVhcicsICd5ci4nXSxcbiAgICAgICAgICAgICAgcXVhcnRlcnM6IFsncXVhcnRlcicsICdxdHIuJ10sXG4gICAgICAgICAgICAgIG1vbnRoczogWydtb250aCcsICdtby4nXSxcbiAgICAgICAgICAgICAgd2Vla3M6IFsnd2VlaycsICd3ay4nXSxcbiAgICAgICAgICAgICAgZGF5czogWydkYXknLCAnZGF5JywgJ2RheXMnXSxcbiAgICAgICAgICAgICAgaG91cnM6IFsnaG91cicsICdoci4nXSxcbiAgICAgICAgICAgICAgbWludXRlczogWydtaW51dGUnLCAnbWluLiddLFxuICAgICAgICAgICAgICBzZWNvbmRzOiBbJ3NlY29uZCcsICdzZWMuJ10sXG4gICAgICAgICAgICAgIG1pbGxpc2Vjb25kczogW10sXG4gICAgICAgICAgICB9W3JdLFxuICAgICAgICAgICAgYSA9IC0xID09PSBbJ2hvdXJzJywgJ21pbnV0ZXMnLCAnc2Vjb25kcyddLmluZGV4T2Yocik7XG4gICAgICAgICAgaWYgKCdhdXRvJyA9PT0gcyAmJiBhKSB7XG4gICAgICAgICAgICBjb25zdCB0ID0gJ2RheXMnID09PSByO1xuICAgICAgICAgICAgc3dpdGNoIChlKSB7XG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gdCA/ICd0b21vcnJvdycgOiBgbmV4dCAke2lbMF19YDtcbiAgICAgICAgICAgICAgY2FzZSAtMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gdCA/ICd5ZXN0ZXJkYXknIDogYGxhc3QgJHtpWzBdfWA7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdCA/ICd0b2RheScgOiBgdGhpcyAke2lbMF19YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgbyA9IE9iamVjdC5pcyhlLCAtMCkgfHwgZSA8IDAsXG4gICAgICAgICAgICB1ID0gTWF0aC5hYnMoZSksXG4gICAgICAgICAgICBjID0gMSA9PT0gdSxcbiAgICAgICAgICAgIGwgPSBuID8gKGMgPyBpWzFdIDogaVsyXSB8fCBpWzFdKSA6IGMgPyBpWzBdIDogcjtcbiAgICAgICAgICByZXR1cm4gbyA/IGAke3V9ICR7bH0gYWdvYCA6IGBpbiAke3V9ICR7bH1gO1xuICAgICAgICB9KShlLCB0LCB0aGlzLl9vcHRzLm51bWVyaWMsICdsb25nJyAhPT0gdGhpcy5fb3B0cy5zdHlsZSk7XG4gIH1cblxuICBmb3JtYXRUb1BhcnRzKHQsIGUpIHtcbiAgICByZXR1cm4gdGhpcy5fcnRmID8gdGhpcy5fcnRmLmZvcm1hdFRvUGFydHModCwgZSkgOiBbXTtcbiAgfVxufVxuXG5jbGFzcyBsdCB7XG4gIGNvbnN0cnVjdG9yKHQsIGUsIHMsIG4pIHtcbiAgICBjb25zdCBbciwgaSwgYV0gPSAoZnVuY3Rpb24gKHQpIHtcbiAgICAgIGNvbnN0IGUgPSB0LmluZGV4T2YoJy14LScpO1xuICAgICAgLTEgIT09IGUgJiYgKHQgPSB0LnN1YnN0cmluZygwLCBlKSk7XG4gICAgICBjb25zdCBzID0gdC5pbmRleE9mKCctdS0nKTtcbiAgICAgIGlmICgtMSA9PT0gcykgcmV0dXJuIFt0XTtcbiAgICAgIHtcbiAgICAgICAgbGV0IGUsIG47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgKGUgPSBzdCh0KS5yZXNvbHZlZE9wdGlvbnMoKSksIChuID0gdCk7XG4gICAgICAgIH0gY2F0Y2ggKHIpIHtcbiAgICAgICAgICBjb25zdCBpID0gdC5zdWJzdHJpbmcoMCwgcyk7XG4gICAgICAgICAgKGUgPSBzdChpKS5yZXNvbHZlZE9wdGlvbnMoKSksIChuID0gaSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBudW1iZXJpbmdTeXN0ZW06IHIsIGNhbGVuZGFyOiBpIH0gPSBlO1xuICAgICAgICByZXR1cm4gW24sIHIsIGldO1xuICAgICAgfVxuICAgIH0pKHQpO1xuICAgICh0aGlzLmxvY2FsZSA9IHIpLFxuICAgICAgKHRoaXMubnVtYmVyaW5nU3lzdGVtID0gZSB8fCBpKSxcbiAgICAgICh0aGlzLm91dHB1dENhbGVuZGFyID0gcyB8fCBhKSxcbiAgICAgICh0aGlzLl9pbnRsID0gKGZ1bmN0aW9uICh0LCBlLCBzKSB7XG4gICAgICAgIHJldHVybiBzIHx8IGVcbiAgICAgICAgICA/ICh0LmluY2x1ZGVzKCctdS0nKSB8fCAodCArPSAnLXUnKSxcbiAgICAgICAgICAgIHMgJiYgKHQgKz0gYC1jYS0ke3N9YCksXG4gICAgICAgICAgICBlICYmICh0ICs9IGAtbnUtJHtlfWApLFxuICAgICAgICAgICAgdClcbiAgICAgICAgICA6IHQ7XG4gICAgICB9KSh0aGlzLmxvY2FsZSwgdGhpcy5udW1iZXJpbmdTeXN0ZW0sIHRoaXMub3V0cHV0Q2FsZW5kYXIpKSxcbiAgICAgICh0aGlzLl93ZWVrZGF5c0NhY2hlID0ge1xuICAgICAgICBmb3JtYXQ6IHt9LFxuICAgICAgICBzdGFuZGFsb25lOiB7fSxcbiAgICAgIH0pLFxuICAgICAgKHRoaXMuX21vbnRoc0NhY2hlID0ge1xuICAgICAgICBmb3JtYXQ6IHt9LFxuICAgICAgICBzdGFuZGFsb25lOiB7fSxcbiAgICAgIH0pLFxuICAgICAgKHRoaXMuX21lcmlkaWVtQ2FjaGUgPSB2b2lkIDApLFxuICAgICAgKHRoaXMuX2VyYUNhY2hlID0ge30pLFxuICAgICAgKHRoaXMuX3NwZWNpZmllZExvY2FsZSA9IG4pLFxuICAgICAgKHRoaXMuX2Zhc3ROdW1iZXJzQ2FjaGVkID0gdm9pZCAwKTtcbiAgfVxuXG4gIGdldCBmYXN0TnVtYmVycygpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdm9pZCAwID09PSB0aGlzLl9mYXN0TnVtYmVyc0NhY2hlZCAmJlxuICAgICAgICAodGhpcy5fZmFzdE51bWJlcnNDYWNoZWQgPSB0aGlzLl9zdXBwb3J0c0Zhc3ROdW1iZXJzKCkpLFxuICAgICAgdGhpcy5fZmFzdE51bWJlcnNDYWNoZWRcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIGZyb21PcHRzKHQpIHtcbiAgICByZXR1cm4gbHQuY3JlYXRlKFxuICAgICAgdC5sb2NhbGUsXG4gICAgICB0Lm51bWJlcmluZ1N5c3RlbSxcbiAgICAgIHQub3V0cHV0Q2FsZW5kYXIsXG4gICAgICB0LmRlZmF1bHRUb0VOLFxuICAgICk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlKHQsIGUsIHMsIG4gPSAhMSkge1xuICAgIGNvbnN0IHIgPSB0IHx8IFN0LmRlZmF1bHRMb2NhbGUsXG4gICAgICBpID1cbiAgICAgICAgciB8fFxuICAgICAgICAoblxuICAgICAgICAgID8gJ2VuLVVTJ1xuICAgICAgICAgIDogKHJ0IHx8IChydCA9IG5ldyBoLkRhdGVUaW1lRm9ybWF0KCkucmVzb2x2ZWRPcHRpb25zKCkubG9jYWxlKSwgcnQpKSxcbiAgICAgIGEgPSBlIHx8IFN0LmRlZmF1bHROdW1iZXJpbmdTeXN0ZW0sXG4gICAgICBvID0gcyB8fCBTdC5kZWZhdWx0T3V0cHV0Q2FsZW5kYXI7XG4gICAgcmV0dXJuIG5ldyBsdChpLCBhLCBvLCByKTtcbiAgfVxuXG4gIHN0YXRpYyByZXNldENhY2hlKCkge1xuICAgIChydCA9IHZvaWQgMCksICh0dCA9IHt9KSwgKGV0ID0ge30pLCAobnQgPSB7fSksIChpdCA9IHt9KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tT2JqZWN0KHsgbG9jYWxlOiB0LCBudW1iZXJpbmdTeXN0ZW06IGUsIG91dHB1dENhbGVuZGFyOiBzIH0gPSB7fSkge1xuICAgIHJldHVybiBsdC5jcmVhdGUodCwgZSwgcyk7XG4gIH1cblxuICBsaXN0aW5nTW9kZSgpIHtcbiAgICBjb25zdCB0ID0gdGhpcy5pc0VuZ2xpc2goKSxcbiAgICAgIGUgPSAhKFxuICAgICAgICAobnVsbCAhPT0gdGhpcy5udW1iZXJpbmdTeXN0ZW0gJiYgJ2xhdG4nICE9PSB0aGlzLm51bWJlcmluZ1N5c3RlbSkgfHxcbiAgICAgICAgKG51bGwgIT09IHRoaXMub3V0cHV0Q2FsZW5kYXIgJiYgJ2dyZWdvcnknICE9PSB0aGlzLm91dHB1dENhbGVuZGFyKVxuICAgICAgKTtcbiAgICByZXR1cm4gdCAmJiBlID8gJ2VuJyA6ICdpbnRsJztcbiAgfVxuXG4gIGNsb25lKHQpIHtcbiAgICByZXR1cm4gdCAmJiAwICE9PSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0KS5sZW5ndGhcbiAgICAgID8gbHQuY3JlYXRlKFxuICAgICAgICAgIHQubG9jYWxlIHx8IHRoaXMuX3NwZWNpZmllZExvY2FsZSxcbiAgICAgICAgICB0Lm51bWJlcmluZ1N5c3RlbSB8fCB0aGlzLm51bWJlcmluZ1N5c3RlbSxcbiAgICAgICAgICB0Lm91dHB1dENhbGVuZGFyIHx8IHRoaXMub3V0cHV0Q2FsZW5kYXIsXG4gICAgICAgICAgdC5kZWZhdWx0VG9FTiB8fCAhMSxcbiAgICAgICAgKVxuICAgICAgOiB0aGlzO1xuICB9XG5cbiAgcmVkZWZhdWx0VG9FTih0ID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZShPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHQpLCB7IGRlZmF1bHRUb0VOOiAhMCB9KSk7XG4gIH1cblxuICByZWRlZmF1bHRUb1N5c3RlbSh0ID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZShPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHQpLCB7IGRlZmF1bHRUb0VOOiAhMSB9KSk7XG4gIH1cblxuICBtb250aHModCwgZSA9ICExKSB7XG4gICAgcmV0dXJuIGF0KHRoaXMsIHQsIFAsIHQgPT4ge1xuICAgICAgY29uc3QgcyA9IGUgPyB7IG1vbnRoOiB0LCBkYXk6ICdudW1lcmljJyB9IDogeyBtb250aDogdCB9LFxuICAgICAgICBuID0gZSA/ICdmb3JtYXQnIDogJ3N0YW5kYWxvbmUnO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgdGhpcy5fbW9udGhzQ2FjaGVbbl1bdF0gfHxcbiAgICAgICAgICAodGhpcy5fbW9udGhzQ2FjaGVbbl1bdF0gPSAoZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIGNvbnN0IGUgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IHMgPSAxOyBzIDw9IDEyOyBzKyspIHtcbiAgICAgICAgICAgICAgY29uc3QgbiA9IEFzLnV0YygyMDE2LCBzLCAxKTtcbiAgICAgICAgICAgICAgZS5wdXNoKHQobikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgfSkodCA9PiB0aGlzLmV4dHJhY3QodCwgcywgJ21vbnRoJykpKSxcbiAgICAgICAgdGhpcy5fbW9udGhzQ2FjaGVbbl1bdF1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICB3ZWVrZGF5cyh0LCBlID0gITEpIHtcbiAgICByZXR1cm4gYXQodGhpcywgdCwgSiwgdCA9PiB7XG4gICAgICBjb25zdCBzID0gZVxuICAgICAgICAgID8geyB3ZWVrZGF5OiB0LCB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnIH1cbiAgICAgICAgICA6IHsgd2Vla2RheTogdCB9LFxuICAgICAgICBuID0gZSA/ICdmb3JtYXQnIDogJ3N0YW5kYWxvbmUnO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgdGhpcy5fd2Vla2RheXNDYWNoZVtuXVt0XSB8fFxuICAgICAgICAgICh0aGlzLl93ZWVrZGF5c0NhY2hlW25dW3RdID0gKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBjb25zdCBlID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBzID0gMTsgcyA8PSA3OyBzKyspIHtcbiAgICAgICAgICAgICAgY29uc3QgbiA9IEFzLnV0YygyMDE2LCAxMSwgMTMgKyBzKTtcbiAgICAgICAgICAgICAgZS5wdXNoKHQobikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgfSkodCA9PiB0aGlzLmV4dHJhY3QodCwgcywgJ3dlZWtkYXknKSkpLFxuICAgICAgICB0aGlzLl93ZWVrZGF5c0NhY2hlW25dW3RdXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgbWVyaWRpZW1zKCkge1xuICAgIHJldHVybiBhdChcbiAgICAgIHRoaXMsXG4gICAgICAnbG9uZycsXG4gICAgICAoKSA9PiBHLFxuICAgICAgKCkgPT4gKFxuICAgICAgICB2b2lkIDAgPT09IHRoaXMuX21lcmlkaWVtQ2FjaGUgJiZcbiAgICAgICAgICAodGhpcy5fbWVyaWRpZW1DYWNoZSA9IFtcbiAgICAgICAgICAgIEFzLnV0YygyMDE2LCAxMSwgMTMsIDkpLFxuICAgICAgICAgICAgQXMudXRjKDIwMTYsIDExLCAxMywgMTkpLFxuICAgICAgICAgIF0ubWFwKHQgPT5cbiAgICAgICAgICAgIHRoaXMuZXh0cmFjdChcbiAgICAgICAgICAgICAgdCxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGhvdXI6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICBob3VyQ3ljbGU6ICdoMTInLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAnZGF5UGVyaW9kJyxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgKSksXG4gICAgICAgIHRoaXMuX21lcmlkaWVtQ2FjaGVcbiAgICAgICksXG4gICAgKTtcbiAgfVxuXG4gIGVyYXModCkge1xuICAgIHJldHVybiBhdCh0aGlzLCB0LCBYLCB0ID0+IHtcbiAgICAgIGNvbnN0IGUgPSB7IGVyYTogdCB9O1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgdGhpcy5fZXJhQ2FjaGVbdF0gfHxcbiAgICAgICAgICAodGhpcy5fZXJhQ2FjaGVbdF0gPSBbQXMudXRjKC00MCwgMSwgMSksIEFzLnV0YygyMDE3LCAxLCAxKV0ubWFwKHQgPT5cbiAgICAgICAgICAgIHRoaXMuZXh0cmFjdCh0LCBlLCAnZXJhJyksXG4gICAgICAgICAgKSksXG4gICAgICAgIHRoaXMuX2VyYUNhY2hlW3RdXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgZXh0cmFjdCh0LCBlLCBzKSB7XG4gICAgY29uc3QgbiA9IHRoaXMuZHRGb3JtYXR0ZXIodCwgZSlcbiAgICAgIC5mb3JtYXRUb1BhcnRzKClcbiAgICAgIC5maW5kKHQgPT4gdC50eXBlLnRvTG93ZXJDYXNlKCkgPT09IHMudG9Mb3dlckNhc2UoKSk7XG4gICAgaWYgKCFuKSB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZXh0cmFjdCBmaWVsZCAke3N9YCk7XG4gICAgcmV0dXJuIG4udmFsdWU7XG4gIH1cblxuICBudW1iZXJGb3JtYXR0ZXIodCA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyBvdCh0aGlzLl9pbnRsLCB0aGlzLmZhc3ROdW1iZXJzLCB0KTtcbiAgfVxuXG4gIGR0Rm9ybWF0dGVyKHQsIGUgPSB7fSkge1xuICAgIHJldHVybiBuZXcgdXQodCwgdGhpcy5faW50bCwgZSk7XG4gIH1cblxuICByZWxGb3JtYXR0ZXIodCA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyBjdCh0aGlzLl9pbnRsLCB0aGlzLmlzRW5nbGlzaCgpLCB0KTtcbiAgfVxuXG4gIGxpc3RGb3JtYXR0ZXIodCA9IHt9KSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbiAodCwgZSA9IHt9KSB7XG4gICAgICBjb25zdCBzID0gSlNPTi5zdHJpbmdpZnkoW3QsIGVdKTtcbiAgICAgIGxldCBuID0gdHRbc107XG4gICAgICByZXR1cm4gbiB8fCAoKG4gPSBuZXcgaC5MaXN0Rm9ybWF0KHQsIGUpKSwgKHR0W3NdID0gbikpLCBuO1xuICAgIH0pKHRoaXMuX2ludGwsIHQpO1xuICB9XG5cbiAgaXNFbmdsaXNoKCkge1xuICAgIHJldHVybiAoXG4gICAgICAhIX5bJ2VuJywgJ2VuLXVzJ10uaW5kZXhPZih0aGlzLmxvY2FsZS50b0xvd2VyQ2FzZSgpKSB8fFxuICAgICAgbmV3IGguRGF0ZVRpbWVGb3JtYXQodGhpcy5faW50bClcbiAgICAgICAgLnJlc29sdmVkT3B0aW9ucygpXG4gICAgICAgIC5sb2NhbGUuc3RhcnRzV2l0aCgnZW4tdXMnKVxuICAgICk7XG4gIH1cblxuICBlcXVhbHModCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmxvY2FsZSA9PT0gdC5sb2NhbGUgJiZcbiAgICAgIHRoaXMubnVtYmVyaW5nU3lzdGVtID09PSB0Lm51bWJlcmluZ1N5c3RlbSAmJlxuICAgICAgdGhpcy5vdXRwdXRDYWxlbmRhciA9PT0gdC5vdXRwdXRDYWxlbmRhclxuICAgICk7XG4gIH1cblxuICBfc3VwcG9ydHNGYXN0TnVtYmVycygpIHtcbiAgICByZXR1cm4gKFxuICAgICAgKCF0aGlzLm51bWJlcmluZ1N5c3RlbSB8fCAnbGF0bicgPT09IHRoaXMubnVtYmVyaW5nU3lzdGVtKSAmJlxuICAgICAgKCdsYXRuJyA9PT0gdGhpcy5udW1iZXJpbmdTeXN0ZW0gfHxcbiAgICAgICAgIXRoaXMubG9jYWxlIHx8XG4gICAgICAgIHRoaXMubG9jYWxlLnN0YXJ0c1dpdGgoJ2VuJykgfHxcbiAgICAgICAgJ2xhdG4nID09PVxuICAgICAgICAgIGguRGF0ZVRpbWVGb3JtYXQodGhpcy5faW50bCkucmVzb2x2ZWRPcHRpb25zKCkubnVtYmVyaW5nU3lzdGVtKVxuICAgICk7XG4gIH1cbn1cblxubGV0IGh0ID0gbnVsbDtcblxuY2xhc3MgZHQgZXh0ZW5kcyBsIHtcbiAgY29uc3RydWN0b3IodCkge1xuICAgIHN1cGVyKCksICh0aGlzLl9maXhlZCA9IHQpO1xuICB9XG5cbiAgc3RhdGljIGdldCB1dGNJbnN0YW5jZSgpIHtcbiAgICByZXR1cm4gbnVsbCA9PT0gaHQgJiYgKGh0ID0gbmV3IGR0KDApKSwgaHQ7XG4gIH1cblxuICBnZXQgaXNWYWxpZCgpIHtcbiAgICByZXR1cm4gITA7XG4gIH1cblxuICBnZXQgaWFuYU5hbWUoKSB7XG4gICAgcmV0dXJuIDAgPT09IHRoaXMuX2ZpeGVkXG4gICAgICA/ICdFdGMvVVRDJ1xuICAgICAgOiBgRXRjL0dNVCR7WXQoLXRoaXMuX2ZpeGVkLCAnbmFycm93Jyl9YDtcbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiAwID09PSB0aGlzLl9maXhlZCA/ICdVVEMnIDogYFVUQyR7WXQodGhpcy5fZml4ZWQsICduYXJyb3cnKX1gO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdmaXhlZCc7XG4gIH1cblxuICBnZXQgaXNVbml2ZXJzYWwoKSB7XG4gICAgcmV0dXJuICEwO1xuICB9XG5cbiAgc3RhdGljIGluc3RhbmNlKHQpIHtcbiAgICByZXR1cm4gMCA9PT0gdCA/IGR0LnV0Y0luc3RhbmNlIDogbmV3IGR0KHQpO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlU3BlY2lmaWVyKHQpIHtcbiAgICBpZiAodCkge1xuICAgICAgY29uc3QgZSA9IHQubWF0Y2goL151dGMoPzooWystXVxcZHsxLDJ9KSg/OjooXFxkezJ9KSk/KT8kL2kpO1xuICAgICAgaWYgKGUpIHJldHVybiBuZXcgZHQoUHQoZVsxXSwgZVsyXSkpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIG9mZnNldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGZvcm1hdE9mZnNldCh0LCBlKSB7XG4gICAgcmV0dXJuIFl0KHRoaXMuX2ZpeGVkLCBlKTtcbiAgfVxuXG4gIG9mZnNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZml4ZWQ7XG4gIH1cblxuICBlcXVhbHModCkge1xuICAgIHJldHVybiAnZml4ZWQnID09PSB0LnR5cGUgJiYgdC5fZml4ZWQgPT09IHRoaXMuX2ZpeGVkO1xuICB9XG59XG5cbmNsYXNzIG10IGV4dGVuZHMgbCB7XG4gIGNvbnN0cnVjdG9yKHQpIHtcbiAgICBzdXBlcigpLCAodGhpcy5fem9uZU5hbWUgPSB0KSwgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIG10LnByb3RvdHlwZSk7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ2ludmFsaWQnO1xuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmVOYW1lO1xuICB9XG5cbiAgZ2V0IGlzVW5pdmVyc2FsKCkge1xuICAgIHJldHVybiAhMTtcbiAgfVxuXG4gIGdldCBpc1ZhbGlkKCkge1xuICAgIHJldHVybiAhMTtcbiAgfVxuXG4gIG9mZnNldE5hbWUoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmb3JtYXRPZmZzZXQoKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgb2Zmc2V0KCkge1xuICAgIHJldHVybiBOYU47XG4gIH1cblxuICBlcXVhbHMoKSB7XG4gICAgcmV0dXJuICExO1xuICB9XG59XG5cbmxldCBmdCA9IG51bGw7XG5cbmNsYXNzIHl0IGV4dGVuZHMgbCB7XG4gIHN0YXRpYyBnZXQgaW5zdGFuY2UoKSB7XG4gICAgcmV0dXJuIG51bGwgPT09IGZ0ICYmIChmdCA9IG5ldyB5dCgpKSwgZnQ7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ3N5c3RlbSc7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoKS5yZXNvbHZlZE9wdGlvbnMoKS50aW1lWm9uZTtcbiAgfVxuXG4gIGdldCBpc1VuaXZlcnNhbCgpIHtcbiAgICByZXR1cm4gITE7XG4gIH1cblxuICBnZXQgaXNWYWxpZCgpIHtcbiAgICByZXR1cm4gITA7XG4gIH1cblxuICBvZmZzZXROYW1lKHQsIHsgZm9ybWF0OiBlLCBsb2NhbGU6IHMgfSkge1xuICAgIHJldHVybiBXdCh0LCBlLCBzKTtcbiAgfVxuXG4gIGZvcm1hdE9mZnNldCh0LCBlKSB7XG4gICAgcmV0dXJuIFl0KHRoaXMub2Zmc2V0KHQpLCBlKTtcbiAgfVxuXG4gIG9mZnNldCh0KSB7XG4gICAgcmV0dXJuIC1uZXcgRGF0ZSh0KS5nZXRUaW1lem9uZU9mZnNldCgpO1xuICB9XG5cbiAgZXF1YWxzKHQpIHtcbiAgICByZXR1cm4gJ3N5c3RlbScgPT09IHQudHlwZTtcbiAgfVxufVxuXG5jb25zdCBndCA9ICh0LCBlKSA9PiB7XG4gIGlmIChNdCh0KSB8fCBudWxsID09PSB0KSByZXR1cm4gZTtcbiAgaWYgKHQgaW5zdGFuY2VvZiBsKSByZXR1cm4gdDtcbiAgaWYgKCdzdHJpbmcnID09IHR5cGVvZiB0KSB7XG4gICAgY29uc3QgcyA9IHQudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gJ2RlZmF1bHQnID09PSBzXG4gICAgICA/IGVcbiAgICAgIDogJ2xvY2FsJyA9PT0gcyB8fCAnc3lzdGVtJyA9PT0gc1xuICAgICAgPyB5dC5pbnN0YW5jZVxuICAgICAgOiAndXRjJyA9PT0gcyB8fCAnZ210JyA9PT0gc1xuICAgICAgPyBkdC51dGNJbnN0YW5jZVxuICAgICAgOiBkdC5wYXJzZVNwZWNpZmllcihzKSB8fCB5LmNyZWF0ZSh0KTtcbiAgfVxuICByZXR1cm4gTnQodClcbiAgICA/IGR0Lmluc3RhbmNlKHQpXG4gICAgOiAnb2JqZWN0JyA9PSB0eXBlb2YgdCAmJiB0Lm9mZnNldCAmJiAnbnVtYmVyJyA9PSB0eXBlb2YgdC5vZmZzZXRcbiAgICA/IHRcbiAgICA6IG5ldyBtdCh0KTtcbn07XG5sZXQgX3QsXG4gIHB0LFxuICB3dCxcbiAgT3QgPSAoKSA9PiBEYXRlLm5vdygpLFxuICBidCA9ICdzeXN0ZW0nLFxuICB2dCA9IDYwLFxuICBUdCA9ICExO1xuXG5jbGFzcyBTdCB7XG4gIHN0YXRpYyBnZXQgbm93KCkge1xuICAgIHJldHVybiBPdDtcbiAgfVxuXG4gIHN0YXRpYyBzZXQgbm93KHQpIHtcbiAgICBPdCA9IHQ7XG4gIH1cblxuICBzdGF0aWMgc2V0IGRlZmF1bHRab25lTGlrZSh0KSB7XG4gICAgYnQgPSB0O1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0Wm9uZSgpIHtcbiAgICByZXR1cm4gZ3QoYnQsIHl0Lmluc3RhbmNlKTtcbiAgfVxuXG4gIHN0YXRpYyBzZXQgZGVmYXVsdFpvbmUodCkge1xuICAgIGJ0ID0gdDtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdExvY2FsZSgpIHtcbiAgICByZXR1cm4gX3Q7XG4gIH1cblxuICBzdGF0aWMgc2V0IGRlZmF1bHRMb2NhbGUodCkge1xuICAgIF90ID0gdDtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdE51bWJlcmluZ1N5c3RlbSgpIHtcbiAgICByZXR1cm4gcHQ7XG4gIH1cblxuICBzdGF0aWMgc2V0IGRlZmF1bHROdW1iZXJpbmdTeXN0ZW0odCkge1xuICAgIHB0ID0gdDtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdE91dHB1dENhbGVuZGFyKCkge1xuICAgIHJldHVybiB3dDtcbiAgfVxuXG4gIHN0YXRpYyBzZXQgZGVmYXVsdE91dHB1dENhbGVuZGFyKHQpIHtcbiAgICB3dCA9IHQ7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHR3b0RpZ2l0Q3V0b2ZmWWVhcigpIHtcbiAgICByZXR1cm4gdnQ7XG4gIH1cblxuICBzdGF0aWMgc2V0IHR3b0RpZ2l0Q3V0b2ZmWWVhcih0KSB7XG4gICAgdnQgPSB0ICUgMTAwO1xuICB9XG5cbiAgc3RhdGljIGdldCB0aHJvd09uSW52YWxpZCgpIHtcbiAgICByZXR1cm4gVHQ7XG4gIH1cblxuICBzdGF0aWMgc2V0IHRocm93T25JbnZhbGlkKHQpIHtcbiAgICBUdCA9IHQ7XG4gIH1cblxuICBzdGF0aWMgcmVzZXRDYWNoZXMoKSB7XG4gICAgbHQucmVzZXRDYWNoZSgpLCB5LnJlc2V0Q2FjaGUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBrdCh0KSB7XG4gIHJldHVybiB2b2lkIDAgIT09IHQ7XG59XG5cbmZ1bmN0aW9uIE10KHQpIHtcbiAgcmV0dXJuIHZvaWQgMCA9PT0gdDtcbn1cblxuZnVuY3Rpb24gTnQodCkge1xuICByZXR1cm4gJ251bWJlcicgPT0gdHlwZW9mIHQ7XG59XG5cbmZ1bmN0aW9uIER0KHQpIHtcbiAgcmV0dXJuIE50KHQpICYmIHQgJSAxID09IDA7XG59XG5cbmZ1bmN0aW9uIEV0KCkge1xuICB0cnkge1xuICAgIHJldHVybiB2b2lkIDAgIT09IGggJiYgISFoLlJlbGF0aXZlVGltZUZvcm1hdDtcbiAgfSBjYXRjaCAodCkge1xuICAgIHJldHVybiAhMTtcbiAgfVxufVxuXG5mdW5jdGlvbiBqdCh0LCBlLCBzKSB7XG4gIGlmICgwID09PSB0Lmxlbmd0aCkgcmV0dXJuO1xuICByZXR1cm4gdC5yZWR1Y2UoXG4gICAgKHQsIG4pID0+IHtcbiAgICAgIGNvbnN0IHIgPSBbZShuKSwgbl07XG4gICAgICByZXR1cm4gcyh0WzBdLCByWzBdKSA9PT0gdFswXSA/IHQgOiByO1xuICAgIH0sXG4gICAgW2UodFswXSksIHRbMF1dLFxuICApWzFdO1xufVxuXG5mdW5jdGlvbiB4dCh0LCBlLCBzKSB7XG4gIHJldHVybiBEdCh0KSAmJiB0ID49IGUgJiYgdCA8PSBzO1xufVxuXG5mdW5jdGlvbiBJdCh0LCBlID0gMikge1xuICBjb25zdCBzID0gdCA8IDAgPyAnLScgOiAnJyxcbiAgICBuID0gcyA/IC0xICogK3QgOiB0O1xuICBsZXQgcjtcbiAgcmV0dXJuIChcbiAgICAociA9XG4gICAgICBuLnRvU3RyaW5nKCkubGVuZ3RoIDwgZSA/ICgnMCcucmVwZWF0KGUpICsgbikuc2xpY2UoLWUpIDogbi50b1N0cmluZygpKSxcbiAgICBgJHtzfSR7cn1gXG4gICk7XG59XG5cbmZ1bmN0aW9uIFZ0KHQpIHtcbiAgaWYgKHQpIHJldHVybiBwYXJzZUludCh0LCAxMCk7XG59XG5cbmZ1bmN0aW9uIEN0KHQpIHtcbiAgaWYgKHQpIHJldHVybiBwYXJzZUZsb2F0KHQpO1xufVxuXG5mdW5jdGlvbiBGdCh0KSB7XG4gIGlmICghTXQodCkgJiYgbnVsbCAhPT0gdCAmJiAnJyAhPT0gdCkge1xuICAgIGNvbnN0IGUgPSAxZTMgKiBwYXJzZUZsb2F0KCcwLicgKyB0KTtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBadCh0LCBlLCBzID0gITEpIHtcbiAgY29uc3QgbiA9IE1hdGgucG93KDEwLCBlKTtcbiAgcmV0dXJuIChzID8gTWF0aC50cnVuYyA6IE1hdGgucm91bmQpKHQgKiBuKSAvIG47XG59XG5cbmZ1bmN0aW9uICR0KHQpIHtcbiAgcmV0dXJuIHQgJSA0ID09IDAgJiYgKHQgJSAxMDAgIT0gMCB8fCB0ICUgNDAwID09IDApO1xufVxuXG5mdW5jdGlvbiBMdCh0KSB7XG4gIHJldHVybiAkdCh0KSA/IDM2NiA6IDM2NTtcbn1cblxuZnVuY3Rpb24genQodCwgZSkge1xuICBjb25zdCBzID1cbiAgICAoZnVuY3Rpb24gKHQsIGUpIHtcbiAgICAgIHJldHVybiB0IC0gZSAqIE1hdGguZmxvb3IodCAvIGUpO1xuICAgIH0pKGUgLSAxLCAxMikgKyAxO1xuICByZXR1cm4gW1xuICAgIDMxLFxuICAgICR0KHQgKyAoZSAtIHMpIC8gMTIpID8gMjkgOiAyOCxcbiAgICAzMSxcbiAgICAzMCxcbiAgICAzMSxcbiAgICAzMCxcbiAgICAzMSxcbiAgICAzMSxcbiAgICAzMCxcbiAgICAzMSxcbiAgICAzMCxcbiAgICAzMSxcbiAgXVtzIC0gMV07XG59XG5cbmZ1bmN0aW9uIHF0KHQpIHtcbiAgY29uc3QgZSA9IERhdGUuVVRDKFxuICAgIHQueWVhcixcbiAgICB0Lm1vbnRoIC0gMSxcbiAgICB0LmRheSxcbiAgICB0LmhvdXIsXG4gICAgdC5taW51dGUsXG4gICAgdC5zZWNvbmQsXG4gICAgdC5taWxsaXNlY29uZCxcbiAgKTtcbiAgaWYgKHh0KHQueWVhciwgMCwgOTkpKSB7XG4gICAgY29uc3QgdCA9IG5ldyBEYXRlKGUpO1xuICAgIHJldHVybiB0LnNldFVUQ0Z1bGxZZWFyKHQuZ2V0VVRDRnVsbFllYXIoKSAtIDE5MDApLCB0LmdldFRpbWUoKTtcbiAgfVxuICByZXR1cm4gZTtcbn1cblxuZnVuY3Rpb24gQXQodCkge1xuICBjb25zdCBlID1cbiAgICAgICh0ICsgTWF0aC5mbG9vcih0IC8gNCkgLSBNYXRoLmZsb29yKHQgLyAxMDApICsgTWF0aC5mbG9vcih0IC8gNDAwKSkgJSA3LFxuICAgIHMgPSB0IC0gMSxcbiAgICBuID0gKHMgKyBNYXRoLmZsb29yKHMgLyA0KSAtIE1hdGguZmxvb3IocyAvIDEwMCkgKyBNYXRoLmZsb29yKHMgLyA0MDApKSAlIDc7XG4gIHJldHVybiA0ID09PSBlIHx8IDMgPT09IG4gPyA1MyA6IDUyO1xufVxuXG5mdW5jdGlvbiBVdCh0KSB7XG4gIHJldHVybiB0ID4gOTkgPyB0IDogdCA+IFN0LnR3b0RpZ2l0Q3V0b2ZmWWVhciA/IDE5MDAgKyB0IDogMmUzICsgdDtcbn1cblxuZnVuY3Rpb24gV3QodCwgZSwgcywgbikge1xuICBjb25zdCByID0gbmV3IERhdGUodCksXG4gICAgaSA9IHtcbiAgICAgIGhvdXJDeWNsZTogJ2gyMycsXG4gICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICBtb250aDogJzItZGlnaXQnLFxuICAgICAgZGF5OiAnMi1kaWdpdCcsXG4gICAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgICBtaW51dGU6ICcyLWRpZ2l0JyxcbiAgICAgIHRpbWVab25lOiBuLFxuICAgIH0sXG4gICAgYSA9IE9iamVjdC5hc3NpZ24oeyB0aW1lWm9uZU5hbWU6IGUgfSwgaSksXG4gICAgbyA9IG5ldyBoLkRhdGVUaW1lRm9ybWF0KHMsIGEpXG4gICAgICAuZm9ybWF0VG9QYXJ0cyhyKVxuICAgICAgLmZpbmQodCA9PiAndGltZXpvbmVuYW1lJyA9PT0gdC50eXBlLnRvTG93ZXJDYXNlKCkpO1xuICByZXR1cm4gbyA/IG8udmFsdWUgOiBudWxsO1xufVxuXG5mdW5jdGlvbiBQdCh0LCBlKSB7XG4gIGxldCBzID0gcGFyc2VJbnQodCwgMTApO1xuICBOdW1iZXIuaXNOYU4ocykgJiYgKHMgPSAwKTtcbiAgY29uc3QgbiA9IHBhcnNlSW50KGUsIDEwKSB8fCAwO1xuICByZXR1cm4gNjAgKiBzICsgKHMgPCAwIHx8IE9iamVjdC5pcyhzLCAtMCkgPyAtbiA6IG4pO1xufVxuXG5mdW5jdGlvbiBIdCh0KSB7XG4gIGNvbnN0IGUgPSBOdW1iZXIodCk7XG4gIGlmICgnYm9vbGVhbicgPT0gdHlwZW9mIHQgfHwgJycgPT09IHQgfHwgTnVtYmVyLmlzTmFOKGUpKVxuICAgIHRocm93IG5ldyBvKGBJbnZhbGlkIHVuaXQgdmFsdWUgJHt0fWApO1xuICByZXR1cm4gZTtcbn1cblxuZnVuY3Rpb24gUnQodCwgZSkge1xuICByZXR1cm4gT2JqZWN0LmtleXModCkucmVkdWNlKFxuICAgIChzLCBuKSA9PiAodm9pZCAwICE9PSB0W25dICYmIG51bGwgIT09IHRbbl0gJiYgKHNbZShuKV0gPSBIdCh0W25dKSksIHMpLFxuICAgIHt9LFxuICApO1xufVxuXG5mdW5jdGlvbiBZdCh0LCBlKSB7XG4gIGNvbnN0IHMgPSBNYXRoLnRydW5jKE1hdGguYWJzKHQgLyA2MCkpLFxuICAgIG4gPSBNYXRoLnRydW5jKE1hdGguYWJzKHQgJSA2MCkpLFxuICAgIHIgPSB0ID49IDAgPyAnKycgOiAnLSc7XG4gIHN3aXRjaCAoZSkge1xuICAgIGNhc2UgJ3Nob3J0JzpcbiAgICAgIHJldHVybiBgJHtyfSR7SXQocywgMil9OiR7SXQobiwgMil9YDtcbiAgICBjYXNlICduYXJyb3cnOlxuICAgICAgcmV0dXJuIGAke3J9JHtzfSR7biA+IDAgPyBgOiR7bn1gIDogJyd9YDtcbiAgICBjYXNlICd0ZWNoaWUnOlxuICAgICAgcmV0dXJuIGAke3J9JHtJdChzLCAyKX0ke0l0KG4sIDIpfWA7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFxuICAgICAgICBgVmFsdWUgZm9ybWF0ICR7ZX0gaXMgb3V0IG9mIHJhbmdlIGZvciBwcm9wZXJ0eSBmb3JtYXRgLFxuICAgICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBKdCh0KSB7XG4gIHJldHVybiAoZnVuY3Rpb24gKHQsIGUpIHtcbiAgICByZXR1cm4gZS5yZWR1Y2UoKGUsIHMpID0+ICgoZVtzXSA9IHRbc10pLCBlKSwge30pO1xuICB9KSh0LCBbJ2hvdXInLCAnbWludXRlJywgJ3NlY29uZCcsICdtaWxsaXNlY29uZCddKTtcbn1cblxuY29uc3QgR3QgPSBbXG4gICAgJ3llYXJzJyxcbiAgICAncXVhcnRlcnMnLFxuICAgICdtb250aHMnLFxuICAgICd3ZWVrcycsXG4gICAgJ2RheXMnLFxuICAgICdob3VycycsXG4gICAgJ21pbnV0ZXMnLFxuICAgICdzZWNvbmRzJyxcbiAgICAnbWlsbGlzZWNvbmRzJyxcbiAgXSxcbiAgQnQgPSBHdC5zbGljZSgwKS5yZXZlcnNlKCksXG4gIFF0ID0gW1xuICAgICd5ZWFycycsXG4gICAgJ21vbnRocycsXG4gICAgJ2RheXMnLFxuICAgICdob3VycycsXG4gICAgJ21pbnV0ZXMnLFxuICAgICdzZWNvbmRzJyxcbiAgICAnbWlsbGlzZWNvbmRzJyxcbiAgXTtcblxuZnVuY3Rpb24gS3QodCwgZSkge1xuICBsZXQgcyA9ICcnO1xuICBmb3IgKGNvbnN0IG4gb2YgdCkgbi5saXRlcmFsID8gKHMgKz0gbi52YWwpIDogKHMgKz0gZShuLnZhbCkpO1xuICByZXR1cm4gcztcbn1cblxuY29uc3QgWHQgPSB7XG4gIEQ6IHcsXG4gIEREOiBPLFxuICBEREQ6IHYsXG4gIEREREQ6IFQsXG4gIHQ6IFMsXG4gIHR0OiBrLFxuICB0dHQ6IE0sXG4gIHR0dHQ6IE4sXG4gIFQ6IEQsXG4gIFRUOiBFLFxuICBUVFQ6IGosXG4gIFRUVFQ6IHgsXG4gIGY6IEksXG4gIGZmOiBDLFxuICBmZmY6ICQsXG4gIGZmZmY6IHosXG4gIEY6IFYsXG4gIEZGOiBGLFxuICBGRkY6IEwsXG4gIEZGRkY6IHEsXG59O1xuXG5jbGFzcyB0ZSB7XG4gIGNvbnN0cnVjdG9yKHQsIGUpIHtcbiAgICAodGhpcy5fb3B0cyA9IGUpLCAodGhpcy5fbG9jID0gdCksICh0aGlzLl9zeXN0ZW1Mb2MgPSB2b2lkIDApO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZSh0LCBlID0ge30pIHtcbiAgICByZXR1cm4gbmV3IHRlKHQsIGUpO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlRm9ybWF0KHQpIHtcbiAgICBsZXQgZSA9IG51bGwsXG4gICAgICBzID0gJycsXG4gICAgICBuID0gITE7XG4gICAgY29uc3QgciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYSA9IHQuY2hhckF0KGkpO1xuICAgICAgXCInXCIgPT09IGFcbiAgICAgICAgPyAocy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICByLnB1c2goe1xuICAgICAgICAgICAgICBsaXRlcmFsOiBuLFxuICAgICAgICAgICAgICB2YWw6IHMsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAoZSA9IG51bGwpLFxuICAgICAgICAgIChzID0gJycpLFxuICAgICAgICAgIChuID0gIW4pKVxuICAgICAgICA6IG4gfHwgYSA9PT0gZVxuICAgICAgICA/IChzICs9IGEpXG4gICAgICAgIDogKHMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgci5wdXNoKHtcbiAgICAgICAgICAgICAgbGl0ZXJhbDogITEsXG4gICAgICAgICAgICAgIHZhbDogcyxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIChzID0gYSksXG4gICAgICAgICAgKGUgPSBhKSk7XG4gICAgfVxuICAgIHJldHVybiBzLmxlbmd0aCA+IDAgJiYgci5wdXNoKHsgbGl0ZXJhbDogbiwgdmFsOiBzIH0pLCByO1xuICB9XG5cbiAgc3RhdGljIG1hY3JvVG9rZW5Ub0Zvcm1hdE9wdHModCkge1xuICAgIHJldHVybiBYdFt0XTtcbiAgfVxuXG4gIGZvcm1hdFdpdGhTeXN0ZW1EZWZhdWx0KHQsIGUpIHtcbiAgICB2b2lkIDAgPT09IHRoaXMuX3N5c3RlbUxvYyAmJlxuICAgICAgKHRoaXMuX3N5c3RlbUxvYyA9IHRoaXMuX2xvYy5yZWRlZmF1bHRUb1N5c3RlbSgpKTtcbiAgICByZXR1cm4gdGhpcy5fc3lzdGVtTG9jXG4gICAgICAuZHRGb3JtYXR0ZXIodCwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9vcHRzKSwgZSkpXG4gICAgICAuZm9ybWF0KCk7XG4gIH1cblxuICBmb3JtYXREYXRlVGltZSh0LCBlID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jXG4gICAgICAuZHRGb3JtYXR0ZXIodCwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9vcHRzKSwgZSkpXG4gICAgICAuZm9ybWF0KCk7XG4gIH1cblxuICBmb3JtYXREYXRlVGltZVBhcnRzKHQsIGUgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLl9sb2NcbiAgICAgIC5kdEZvcm1hdHRlcih0LCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX29wdHMpLCBlKSlcbiAgICAgIC5mb3JtYXRUb1BhcnRzKCk7XG4gIH1cblxuICBmb3JtYXRJbnRlcnZhbCh0LCBlID0ge30pIHtcbiAgICBpZiAodC5pbnZhbGlkUmVhc29uKSByZXR1cm47XG4gICAgcmV0dXJuIHRoaXMuX2xvY1xuICAgICAgLmR0Rm9ybWF0dGVyKHQuc3RhcnQsIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fb3B0cyksIGUpKVxuICAgICAgLmR0Zi5mb3JtYXRSYW5nZSh0LnN0YXJ0LnRvSlNEYXRlKCksIHQuZW5kLnRvSlNEYXRlKCkpO1xuICB9XG5cbiAgcmVzb2x2ZWRPcHRpb25zKHQsIGUgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLl9sb2NcbiAgICAgIC5kdEZvcm1hdHRlcih0LCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX29wdHMpLCBlKSlcbiAgICAgIC5yZXNvbHZlZE9wdGlvbnMoKTtcbiAgfVxuXG4gIG51bSh0LCBlID0gMCkge1xuICAgIGlmICh0aGlzLl9vcHRzLmZvcmNlU2ltcGxlKSByZXR1cm4gSXQodCwgZSk7XG4gICAgY29uc3QgcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX29wdHMpO1xuICAgIHJldHVybiBlID4gMCAmJiAocy5wYWRUbyA9IGUpLCB0aGlzLl9sb2MubnVtYmVyRm9ybWF0dGVyKHMpLmZvcm1hdCh0KTtcbiAgfVxuXG4gIGZvcm1hdERhdGVUaW1lRnJvbVN0cmluZyh0LCBlKSB7XG4gICAgY29uc3QgcyA9ICdlbicgPT09IHRoaXMuX2xvYy5saXN0aW5nTW9kZSgpLFxuICAgICAgbiA9IHRoaXMuX2xvYy5vdXRwdXRDYWxlbmRhciAmJiAnZ3JlZ29yeScgIT09IHRoaXMuX2xvYy5vdXRwdXRDYWxlbmRhcixcbiAgICAgIHIgPSAoZSwgcykgPT4gdGhpcy5fbG9jLmV4dHJhY3QodCwgZSwgcyksXG4gICAgICBpID0gZSA9PlxuICAgICAgICB0LmlzT2Zmc2V0Rml4ZWQgJiYgMCA9PT0gdC5vZmZzZXQgJiYgZS5hbGxvd1pcbiAgICAgICAgICA/ICdaJ1xuICAgICAgICAgIDogdC5pc1ZhbGlkXG4gICAgICAgICAgPyB0LnpvbmUuZm9ybWF0T2Zmc2V0KHQudHMsIGUuZm9ybWF0KVxuICAgICAgICAgIDogJycsXG4gICAgICBhID0gKCkgPT5cbiAgICAgICAgc1xuICAgICAgICAgID8gKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgIHJldHVybiBHW3QuaG91ciA8IDEyID8gMCA6IDFdO1xuICAgICAgICAgICAgfSkodClcbiAgICAgICAgICA6IHIoeyBob3VyOiAnbnVtZXJpYycsIGhvdXJDeWNsZTogJ2gxMicgfSwgJ2RheVBlcmlvZCcpLFxuICAgICAgbyA9IChlLCBuKSA9PlxuICAgICAgICBzXG4gICAgICAgICAgPyAoZnVuY3Rpb24gKHQsIGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFAoZSlbdC5tb250aCAtIDFdO1xuICAgICAgICAgICAgfSkodCwgZSlcbiAgICAgICAgICA6IHIobiA/IHsgbW9udGg6IGUgfSA6IHsgbW9udGg6IGUsIGRheTogJ251bWVyaWMnIH0sICdtb250aCcpLFxuICAgICAgdSA9IChlLCBuKSA9PlxuICAgICAgICBzXG4gICAgICAgICAgPyAoZnVuY3Rpb24gKHQsIGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIEooZSlbdC53ZWVrZGF5IC0gMV07XG4gICAgICAgICAgICB9KSh0LCBlKVxuICAgICAgICAgIDogcihcbiAgICAgICAgICAgICAgblxuICAgICAgICAgICAgICAgID8geyB3ZWVrZGF5OiBlIH1cbiAgICAgICAgICAgICAgICA6IHsgd2Vla2RheTogZSwgbW9udGg6ICdsb25nJywgZGF5OiAnbnVtZXJpYycgfSxcbiAgICAgICAgICAgICAgJ3dlZWtkYXknLFxuICAgICAgICAgICAgKSxcbiAgICAgIGMgPSBlID0+IHtcbiAgICAgICAgY29uc3QgcyA9IHRlLm1hY3JvVG9rZW5Ub0Zvcm1hdE9wdHMoZSk7XG4gICAgICAgIHJldHVybiBzID8gdGhpcy5mb3JtYXRXaXRoU3lzdGVtRGVmYXVsdCh0LCBzKSA6IGU7XG4gICAgICB9LFxuICAgICAgbCA9IGUgPT5cbiAgICAgICAgc1xuICAgICAgICAgID8gKGZ1bmN0aW9uICh0LCBlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBYKGUpW3QueWVhciA8IDAgPyAwIDogMV07XG4gICAgICAgICAgICB9KSh0LCBlKVxuICAgICAgICAgIDogcih7IGVyYTogZSB9LCAnZXJhJyk7XG4gICAgcmV0dXJuIEt0KHRlLnBhcnNlRm9ybWF0KGUpLCBlID0+IHtcbiAgICAgIHN3aXRjaCAoZSkge1xuICAgICAgICBjYXNlICdTJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5udW0odC5taWxsaXNlY29uZCk7XG4gICAgICAgIGNhc2UgJ3UnOlxuICAgICAgICBjYXNlICdTU1MnOlxuICAgICAgICAgIHJldHVybiB0aGlzLm51bSh0Lm1pbGxpc2Vjb25kLCAzKTtcbiAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMubnVtKHQuc2Vjb25kKTtcbiAgICAgICAgY2FzZSAnc3MnOlxuICAgICAgICAgIHJldHVybiB0aGlzLm51bSh0LnNlY29uZCwgMik7XG4gICAgICAgIGNhc2UgJ3V1JzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5udW0oTWF0aC5mbG9vcih0Lm1pbGxpc2Vjb25kIC8gMTApLCAyKTtcbiAgICAgICAgY2FzZSAndXV1JzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5udW0oTWF0aC5mbG9vcih0Lm1pbGxpc2Vjb25kIC8gMTAwKSk7XG4gICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgIHJldHVybiB0aGlzLm51bSh0Lm1pbnV0ZSk7XG4gICAgICAgIGNhc2UgJ21tJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5udW0odC5taW51dGUsIDIpO1xuICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5udW0odC5ob3VyICUgMTIgPT0gMCA/IDEyIDogdC5ob3VyICUgMTIpO1xuICAgICAgICBjYXNlICdoaCc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMubnVtKHQuaG91ciAlIDEyID09IDAgPyAxMiA6IHQuaG91ciAlIDEyLCAyKTtcbiAgICAgICAgY2FzZSAnSCc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMubnVtKHQuaG91cik7XG4gICAgICAgIGNhc2UgJ0hIJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5udW0odC5ob3VyLCAyKTtcbiAgICAgICAgY2FzZSAnWic6XG4gICAgICAgICAgcmV0dXJuIGkoeyBmb3JtYXQ6ICduYXJyb3cnLCBhbGxvd1o6IHRoaXMuX29wdHMuYWxsb3daIH0pO1xuICAgICAgICBjYXNlICdaWic6XG4gICAgICAgICAgcmV0dXJuIGkoeyBmb3JtYXQ6ICdzaG9ydCcsIGFsbG93WjogdGhpcy5fb3B0cy5hbGxvd1ogfSk7XG4gICAgICAgIGNhc2UgJ1paWic6XG4gICAgICAgICAgcmV0dXJuIGkoeyBmb3JtYXQ6ICd0ZWNoaWUnLCBhbGxvd1o6IHRoaXMuX29wdHMuYWxsb3daIH0pO1xuICAgICAgICBjYXNlICdaWlpaJzpcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdC56b25lLm9mZnNldE5hbWUodC50cywge1xuICAgICAgICAgICAgICBmb3JtYXQ6ICdzaG9ydCcsXG4gICAgICAgICAgICAgIGxvY2FsZTogdGhpcy5fbG9jLmxvY2FsZSxcbiAgICAgICAgICAgIH0pIHx8ICcnXG4gICAgICAgICAgKTtcbiAgICAgICAgY2FzZSAnWlpaWlonOlxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0LnpvbmUub2Zmc2V0TmFtZSh0LnRzLCB7XG4gICAgICAgICAgICAgIGZvcm1hdDogJ2xvbmcnLFxuICAgICAgICAgICAgICBsb2NhbGU6IHRoaXMuX2xvYy5sb2NhbGUsXG4gICAgICAgICAgICB9KSB8fCAnJ1xuICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgJ3onOlxuICAgICAgICAgIHJldHVybiB0LnpvbmVOYW1lIHx8ICcnO1xuICAgICAgICBjYXNlICdhJzpcbiAgICAgICAgICByZXR1cm4gYSgpO1xuICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICByZXR1cm4gbiA/IHIoeyBkYXk6ICdudW1lcmljJyB9LCAnZGF5JykgOiB0aGlzLm51bSh0LmRheSk7XG4gICAgICAgIGNhc2UgJ2RkJzpcbiAgICAgICAgICByZXR1cm4gbiA/IHIoeyBkYXk6ICcyLWRpZ2l0JyB9LCAnZGF5JykgOiB0aGlzLm51bSh0LmRheSwgMik7XG4gICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICBjYXNlICdFJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5udW0odC53ZWVrZGF5KTtcbiAgICAgICAgY2FzZSAnY2NjJzpcbiAgICAgICAgICByZXR1cm4gdSgnc2hvcnQnLCAhMCk7XG4gICAgICAgIGNhc2UgJ2NjY2MnOlxuICAgICAgICAgIHJldHVybiB1KCdsb25nJywgITApO1xuICAgICAgICBjYXNlICdjY2NjYyc6XG4gICAgICAgICAgcmV0dXJuIHUoJ25hcnJvdycsICEwKTtcbiAgICAgICAgY2FzZSAnRUVFJzpcbiAgICAgICAgICByZXR1cm4gdSgnc2hvcnQnLCAhMSk7XG4gICAgICAgIGNhc2UgJ0VFRUUnOlxuICAgICAgICAgIHJldHVybiB1KCdsb25nJywgITEpO1xuICAgICAgICBjYXNlICdFRUVFRSc6XG4gICAgICAgICAgcmV0dXJuIHUoJ25hcnJvdycsICExKTtcbiAgICAgICAgY2FzZSAnTCc6XG4gICAgICAgICAgcmV0dXJuIG5cbiAgICAgICAgICAgID8gcih7IG1vbnRoOiAnbnVtZXJpYycsIGRheTogJ251bWVyaWMnIH0sICdtb250aCcpXG4gICAgICAgICAgICA6IHRoaXMubnVtKHQubW9udGgpO1xuICAgICAgICBjYXNlICdMTCc6XG4gICAgICAgICAgcmV0dXJuIG5cbiAgICAgICAgICAgID8gcih7IG1vbnRoOiAnMi1kaWdpdCcsIGRheTogJ251bWVyaWMnIH0sICdtb250aCcpXG4gICAgICAgICAgICA6IHRoaXMubnVtKHQubW9udGgsIDIpO1xuICAgICAgICBjYXNlICdMTEwnOlxuICAgICAgICAgIHJldHVybiBvKCdzaG9ydCcsICEwKTtcbiAgICAgICAgY2FzZSAnTExMTCc6XG4gICAgICAgICAgcmV0dXJuIG8oJ2xvbmcnLCAhMCk7XG4gICAgICAgIGNhc2UgJ0xMTExMJzpcbiAgICAgICAgICByZXR1cm4gbygnbmFycm93JywgITApO1xuICAgICAgICBjYXNlICdNJzpcbiAgICAgICAgICByZXR1cm4gbiA/IHIoeyBtb250aDogJ251bWVyaWMnIH0sICdtb250aCcpIDogdGhpcy5udW0odC5tb250aCk7XG4gICAgICAgIGNhc2UgJ01NJzpcbiAgICAgICAgICByZXR1cm4gbiA/IHIoeyBtb250aDogJzItZGlnaXQnIH0sICdtb250aCcpIDogdGhpcy5udW0odC5tb250aCwgMik7XG4gICAgICAgIGNhc2UgJ01NTSc6XG4gICAgICAgICAgcmV0dXJuIG8oJ3Nob3J0JywgITEpO1xuICAgICAgICBjYXNlICdNTU1NJzpcbiAgICAgICAgICByZXR1cm4gbygnbG9uZycsICExKTtcbiAgICAgICAgY2FzZSAnTU1NTU0nOlxuICAgICAgICAgIHJldHVybiBvKCduYXJyb3cnLCAhMSk7XG4gICAgICAgIGNhc2UgJ3knOlxuICAgICAgICAgIHJldHVybiBuID8gcih7IHllYXI6ICdudW1lcmljJyB9LCAneWVhcicpIDogdGhpcy5udW0odC55ZWFyKTtcbiAgICAgICAgY2FzZSAneXknOlxuICAgICAgICAgIHJldHVybiBuXG4gICAgICAgICAgICA/IHIoeyB5ZWFyOiAnMi1kaWdpdCcgfSwgJ3llYXInKVxuICAgICAgICAgICAgOiB0aGlzLm51bShwYXJzZUludCh0LnllYXIudG9TdHJpbmcoKS5zbGljZSgtMiksIDEwKSwgMik7XG4gICAgICAgIGNhc2UgJ3l5eXknOlxuICAgICAgICAgIHJldHVybiBuID8gcih7IHllYXI6ICdudW1lcmljJyB9LCAneWVhcicpIDogdGhpcy5udW0odC55ZWFyLCA0KTtcbiAgICAgICAgY2FzZSAneXl5eXl5JzpcbiAgICAgICAgICByZXR1cm4gbiA/IHIoeyB5ZWFyOiAnbnVtZXJpYycgfSwgJ3llYXInKSA6IHRoaXMubnVtKHQueWVhciwgNik7XG4gICAgICAgIGNhc2UgJ0cnOlxuICAgICAgICAgIHJldHVybiBsKCdzaG9ydCcpO1xuICAgICAgICBjYXNlICdHRyc6XG4gICAgICAgICAgcmV0dXJuIGwoJ2xvbmcnKTtcbiAgICAgICAgY2FzZSAnR0dHR0cnOlxuICAgICAgICAgIHJldHVybiBsKCduYXJyb3cnKTtcbiAgICAgICAgY2FzZSAna2snOlxuICAgICAgICAgIHJldHVybiB0aGlzLm51bShwYXJzZUludCh0LndlZWtZZWFyLnRvU3RyaW5nKCkuc2xpY2UoLTIpLCAxMCksIDIpO1xuICAgICAgICBjYXNlICdra2trJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5udW0odC53ZWVrWWVhciwgNCk7XG4gICAgICAgIGNhc2UgJ1cnOlxuICAgICAgICAgIHJldHVybiB0aGlzLm51bSh0LndlZWtOdW1iZXIpO1xuICAgICAgICBjYXNlICdXVyc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMubnVtKHQud2Vla051bWJlciwgMik7XG4gICAgICAgIGNhc2UgJ28nOlxuICAgICAgICAgIHJldHVybiB0aGlzLm51bSh0Lm9yZGluYWwpO1xuICAgICAgICBjYXNlICdvb28nOlxuICAgICAgICAgIHJldHVybiB0aGlzLm51bSh0Lm9yZGluYWwsIDMpO1xuICAgICAgICBjYXNlICdxJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5udW0odC5xdWFydGVyKTtcbiAgICAgICAgY2FzZSAncXEnOlxuICAgICAgICAgIHJldHVybiB0aGlzLm51bSh0LnF1YXJ0ZXIsIDIpO1xuICAgICAgICBjYXNlICdYJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5udW0oTWF0aC5mbG9vcih0LnRzIC8gMWUzKSk7XG4gICAgICAgIGNhc2UgJ3gnOlxuICAgICAgICAgIHJldHVybiB0aGlzLm51bSh0LnRzKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gYyhlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZvcm1hdER1cmF0aW9uRnJvbVN0cmluZyh0LCBlKSB7XG4gICAgY29uc3QgcyA9IHQgPT4ge1xuICAgICAgICBzd2l0Y2ggKHRbMF0pIHtcbiAgICAgICAgICBjYXNlICdTJzpcbiAgICAgICAgICAgIHJldHVybiAnbWlsbGlzZWNvbmRzJztcbiAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgIHJldHVybiAnc2Vjb25kcyc7XG4gICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICByZXR1cm4gJ21pbnV0ZXMnO1xuICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgcmV0dXJuICdob3Vycyc7XG4gICAgICAgICAgY2FzZSAnZCc6XG4gICAgICAgICAgICByZXR1cm4gJ2RheXMnO1xuICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgcmV0dXJuICdtb250aHMnO1xuICAgICAgICAgIGNhc2UgJ3knOlxuICAgICAgICAgICAgcmV0dXJuICd5ZWFycyc7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG4gPSB0ZS5wYXJzZUZvcm1hdChlKSxcbiAgICAgIHIgPSBuLnJlZHVjZSgodCwgeyBsaXRlcmFsOiBlLCB2YWw6IHMgfSkgPT4gKGUgPyB0IDogdC5jb25jYXQocykpLCBbXSk7XG4gICAgcmV0dXJuIEt0KFxuICAgICAgbixcbiAgICAgICh0ID0+IGUgPT4ge1xuICAgICAgICBjb25zdCBuID0gcyhlKTtcbiAgICAgICAgcmV0dXJuIG4gPyB0aGlzLm51bSh0LmdldChuKSwgZS5sZW5ndGgpIDogZTtcbiAgICAgIH0pKHQuc2hpZnRUbyguLi5yLm1hcChzKS5maWx0ZXIodCA9PiAhIXQpKSksXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlZSguLi50KSB7XG4gIGNvbnN0IGUgPSB0LnJlZHVjZSgodCwgZSkgPT4gdCArIGUuc291cmNlLCAnJyk7XG4gIHJldHVybiBSZWdFeHAoYF4ke2V9JGApO1xufVxuXG5mdW5jdGlvbiBzZSguLi50KSB7XG4gIHJldHVybiBlID0+XG4gICAgdFxuICAgICAgLnJlZHVjZShcbiAgICAgICAgKFt0LCBzLCBuXSwgcikgPT4ge1xuICAgICAgICAgIGNvbnN0IFtpLCBhLCBvXSA9IHIoZSwgbik7XG4gICAgICAgICAgcmV0dXJuIFtPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHQpLCBpKSwgYSB8fCBzLCBvXTtcbiAgICAgICAgfSxcbiAgICAgICAgW3t9LCBudWxsLCAxXSxcbiAgICAgIClcbiAgICAgIC5zbGljZSgwLCAyKTtcbn1cblxuZnVuY3Rpb24gbmUodCwgLi4uZSkge1xuICBpZiAobnVsbCA9PSB0KSByZXR1cm4gW251bGwsIG51bGxdO1xuICBmb3IgKGNvbnN0IFtzLCBuXSBvZiBlKSB7XG4gICAgY29uc3QgZSA9IHMuZXhlYyh0KTtcbiAgICBpZiAoZSkgcmV0dXJuIG4oZSk7XG4gIH1cbiAgcmV0dXJuIFtudWxsLCBudWxsXTtcbn1cblxuZnVuY3Rpb24gcmUoLi4udCkge1xuICByZXR1cm4gKGUsIHMpID0+IHtcbiAgICBjb25zdCBuID0ge307XG4gICAgbGV0IHI7XG4gICAgZm9yIChyID0gMDsgciA8IHQubGVuZ3RoOyByKyspIG5bdFtyXV0gPSBWdChlW3MgKyByXSk7XG4gICAgcmV0dXJuIFtuLCBudWxsLCBzICsgcl07XG4gIH07XG59XG5cbmNvbnN0IGllID1cbiAgICAvW0EtWmEtel8rLV17MSwyNTZ9KD86Oj9cXC9bQS1aYS16MC05XystXXsxLDI1Nn0oPzpcXC9bQS1aYS16MC05XystXXsxLDI1Nn0pPyk/LyxcbiAgYWUgPSAvKD86KFopfChbKy1dXFxkXFxkKSg/Ojo/KFxcZFxcZCkpPykvLFxuICBvZSA9IC8oXFxkXFxkKSg/Ojo/KFxcZFxcZCkoPzo6PyhcXGRcXGQpKD86Wy4sXShcXGR7MSwzMH0pKT8pPyk/LyxcbiAgdWUgPSBSZWdFeHAoYCR7b2Uuc291cmNlfSR7YCg/OiR7YWUuc291cmNlfT8oPzpcXFxcWygke2llLnNvdXJjZX0pXFxcXF0pPyk/YH1gKSxcbiAgY2UgPSBSZWdFeHAoYCg/OlQke3VlLnNvdXJjZX0pP2ApLFxuICBsZSA9IHJlKCd3ZWVrWWVhcicsICd3ZWVrTnVtYmVyJywgJ3dlZWtkYXknKSxcbiAgaGUgPSByZSgneWVhcicsICdvcmRpbmFsJyksXG4gIGRlID0gUmVnRXhwKGAke29lLnNvdXJjZX0gPyg/OiR7YWUuc291cmNlfXwoJHtpZS5zb3VyY2V9KSk/YCksXG4gIG1lID0gUmVnRXhwKGAoPzogJHtkZS5zb3VyY2V9KT9gKTtcblxuZnVuY3Rpb24gZmUodCwgZSwgcykge1xuICByZXR1cm4gTXQodFtlXSkgPyBzIDogVnQodFtlXSk7XG59XG5cbmZ1bmN0aW9uIHllKHQsIGUpIHtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBob3VyOiBmZSh0LCBlLCAwKSxcbiAgICAgIG1pbnV0ZTogZmUodCwgZSArIDEsIDApLFxuICAgICAgc2Vjb25kOiBmZSh0LCBlICsgMiwgMCksXG4gICAgICBtaWxsaXNlY29uZDogRnQodFtlICsgM10pLFxuICAgIH0sXG4gICAgbnVsbCxcbiAgICBlICsgNCxcbiAgXTtcbn1cblxuZnVuY3Rpb24gZ2UodCwgZSkge1xuICBjb25zdCBzID0gIXRbZV0gJiYgIXRbZSArIDFdLFxuICAgIG4gPSBQdCh0W2UgKyAxXSwgdFtlICsgMl0pO1xuICByZXR1cm4gW3t9LCBzID8gbnVsbCA6IGR0Lmluc3RhbmNlKG4pLCBlICsgM107XG59XG5cbmZ1bmN0aW9uIF9lKHQsIGUpIHtcbiAgcmV0dXJuIFt7fSwgdFtlXSA/IHkuY3JlYXRlKHRbZV0pIDogbnVsbCwgZSArIDFdO1xufVxuXG5jb25zdCBwZSA9IFJlZ0V4cChgXlQ/JHtvZS5zb3VyY2V9JGApLFxuICB3ZSA9XG4gICAgL14tP1AoPzooPzooLT9cXGR7MSwyMH0oPzpcXC5cXGR7MSwyMH0pPylZKT8oPzooLT9cXGR7MSwyMH0oPzpcXC5cXGR7MSwyMH0pPylNKT8oPzooLT9cXGR7MSwyMH0oPzpcXC5cXGR7MSwyMH0pPylXKT8oPzooLT9cXGR7MSwyMH0oPzpcXC5cXGR7MSwyMH0pPylEKT8oPzpUKD86KC0/XFxkezEsMjB9KD86XFwuXFxkezEsMjB9KT8pSCk/KD86KC0/XFxkezEsMjB9KD86XFwuXFxkezEsMjB9KT8pTSk/KD86KC0/XFxkezEsMjB9KSg/OlsuLF0oLT9cXGR7MSwyMH0pKT9TKT8pPykkLztcblxuZnVuY3Rpb24gT2UodCkge1xuICBjb25zdCBbZSwgcywgbiwgciwgaSwgYSwgbywgdSwgY10gPSB0LFxuICAgIGwgPSBlLnN0YXJ0c1dpdGgoJy0nKSxcbiAgICBoID0gISF1ICYmIHUuc3RhcnRzV2l0aCgnLScpLFxuICAgIGQgPSAodCwgZSA9ICExKSA9PiAoJ251bWJlcicgPT0gdHlwZW9mIHQgJiYgKGUgfHwgKHQgJiYgbCkpID8gLXQgOiB0KTtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICB5ZWFyczogZChDdChzKSksXG4gICAgICBtb250aHM6IGQoQ3QobikpLFxuICAgICAgd2Vla3M6IGQoQ3QocikpLFxuICAgICAgZGF5czogZChDdChpKSksXG4gICAgICBob3VyczogZChDdChhKSksXG4gICAgICBtaW51dGVzOiBkKEN0KG8pKSxcbiAgICAgIHNlY29uZHM6IGQoQ3QodSksICctMCcgPT09IHUpLFxuICAgICAgbWlsbGlzZWNvbmRzOiBkKEZ0KGMpLCBoKSxcbiAgICB9LFxuICBdO1xufVxuXG5jb25zdCBiZSA9IHtcbiAgR01UOiAwLFxuICBFRFQ6IC0yNDAsXG4gIEVTVDogLTMwMCxcbiAgQ0RUOiAtMzAwLFxuICBDU1Q6IC0zNjAsXG4gIE1EVDogLTM2MCxcbiAgTVNUOiAtNDIwLFxuICBQRFQ6IC00MjAsXG4gIFBTVDogLTQ4MCxcbn07XG5cbmZ1bmN0aW9uIHZlKHQsIGUsIHMsIG4sIHIsIGksIGEpIHtcbiAgbGV0IG87XG4gIHQgJiYgKG8gPSB0Lmxlbmd0aCA+IDMgPyBILmluZGV4T2YodCkgKyAxIDogUi5pbmRleE9mKHQpICsgMSk7XG4gIHJldHVybiB7XG4gICAgeWVhcjogMiA9PT0gZS5sZW5ndGggPyBVdChWdChlKSkgOiBWdChlKSxcbiAgICBtb250aDogVS5pbmRleE9mKHMpICsgMSxcbiAgICBkYXk6IFZ0KG4pLFxuICAgIGhvdXI6IFZ0KHIpLFxuICAgIG1pbnV0ZTogVnQoaSksXG4gICAgc2Vjb25kOiBWdChhKSxcbiAgICB3ZWVrZGF5OiBvLFxuICB9O1xufVxuXG5jb25zdCBUZSA9XG4gIC9eKD86KE1vbnxUdWV8V2VkfFRodXxGcml8U2F0fFN1biksXFxzKT8oXFxkezEsMn0pXFxzKEphbnxGZWJ8TWFyfEFwcnxNYXl8SnVufEp1bHxBdWd8U2VwfE9jdHxOb3Z8RGVjKVxccyhcXGR7Miw0fSlcXHMoXFxkXFxkKTooXFxkXFxkKSg/OjooXFxkXFxkKSk/XFxzKD86KFVUfEdNVHxbRUNNUF1bU0RdVCl8KFtael0pfCg/OihbKy1dXFxkXFxkKShcXGRcXGQpKSkkLztcblxuZnVuY3Rpb24gU2UodCkge1xuICBjb25zdCBbLCBlLCBzLCBuLCByLCBpLCBhLCBvLCB1LCBjLCBsLCBoXSA9IHQsXG4gICAgZCA9IHZlKGUsIHIsIG4sIHMsIGksIGEsIG8pO1xuICBsZXQgbTtcbiAgcmV0dXJuIChtID0gdSA/IGJlW3VdIDogYyA/IDAgOiBQdChsLCBoKSksIFtkLCBuZXcgZHQobSldO1xufVxuXG5jb25zdCBrZSA9XG4gICAgL14oTW9ufFR1ZXxXZWR8VGh1fEZyaXxTYXR8U3VuKSwgKFxcZFxcZCkgKEphbnxGZWJ8TWFyfEFwcnxNYXl8SnVufEp1bHxBdWd8U2VwfE9jdHxOb3Z8RGVjKSAoXFxkezR9KSAoXFxkXFxkKTooXFxkXFxkKTooXFxkXFxkKSBHTVQkLyxcbiAgTWUgPVxuICAgIC9eKE1vbmRheXxUdWVzZGF5fFdlZG5lc2RheXxUaHVyc2RheXxGcmlkYXl8U2F0dXJkYXl8U3VuZGF5KSwgKFxcZFxcZCktKEphbnxGZWJ8TWFyfEFwcnxNYXl8SnVufEp1bHxBdWd8U2VwfE9jdHxOb3Z8RGVjKS0oXFxkXFxkKSAoXFxkXFxkKTooXFxkXFxkKTooXFxkXFxkKSBHTVQkLyxcbiAgTmUgPVxuICAgIC9eKE1vbnxUdWV8V2VkfFRodXxGcml8U2F0fFN1bikgKEphbnxGZWJ8TWFyfEFwcnxNYXl8SnVufEp1bHxBdWd8U2VwfE9jdHxOb3Z8RGVjKSAoIFxcZHxcXGRcXGQpIChcXGRcXGQpOihcXGRcXGQpOihcXGRcXGQpIChcXGR7NH0pJC87XG5cbmZ1bmN0aW9uIERlKHQpIHtcbiAgY29uc3QgWywgZSwgcywgbiwgciwgaSwgYSwgb10gPSB0O1xuICByZXR1cm4gW3ZlKGUsIHIsIG4sIHMsIGksIGEsIG8pLCBkdC51dGNJbnN0YW5jZV07XG59XG5cbmZ1bmN0aW9uIEVlKHQpIHtcbiAgY29uc3QgWywgZSwgcywgbiwgciwgaSwgYSwgb10gPSB0O1xuICByZXR1cm4gW3ZlKGUsIG8sIHMsIG4sIHIsIGksIGEpLCBkdC51dGNJbnN0YW5jZV07XG59XG5cbmNvbnN0IGplID0gZWUoLyhbKy1dXFxkezZ9fFxcZHs0fSkoPzotPyhcXGRcXGQpKD86LT8oXFxkXFxkKSk/KT8vLCBjZSksXG4gIHhlID0gZWUoLyhcXGR7NH0pLT9XKFxcZFxcZCkoPzotPyhcXGQpKT8vLCBjZSksXG4gIEllID0gZWUoLyhcXGR7NH0pLT8oXFxkezN9KS8sIGNlKSxcbiAgVmUgPSBlZSh1ZSksXG4gIENlID0gc2UoXG4gICAgZnVuY3Rpb24gKHQsIGUpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHsgeWVhcjogZmUodCwgZSwgMCksIG1vbnRoOiBmZSh0LCBlICsgMSwgMSksIGRheTogZmUodCwgZSArIDIsIDEpIH0sXG4gICAgICAgIG51bGwsXG4gICAgICAgIGUgKyAzLFxuICAgICAgXTtcbiAgICB9LFxuICAgIHllLFxuICAgIGdlLFxuICAgIF9lLFxuICApLFxuICBGZSA9IHNlKGxlLCB5ZSwgZ2UsIF9lKSxcbiAgWmUgPSBzZShoZSwgeWUsIGdlLCBfZSksXG4gICRlID0gc2UoeWUsIGdlLCBfZSk7XG5jb25zdCBMZSA9IGVlKC8oXFxkezR9KS0oXFxkXFxkKS0oXFxkXFxkKS8sIG1lKSxcbiAgemUgPSBlZShkZSksXG4gIHFlID0gc2UoeWUsIGdlLCBfZSk7XG5cbmNsYXNzIEFlIHtcbiAgY29uc3RydWN0b3IodCwgZSkge1xuICAgICh0aGlzLnJlYXNvbiA9IHQpLFxuICAgICAgKHRoaXMuZXhwbGFuYXRpb24gPSBlKSxcbiAgICAgICh0aGlzLl9mb3JtYXR0ZWRFeHBsYW5hdGlvbiA9ICcnKSxcbiAgICAgIGUgJiYgKHRoaXMuX2Zvcm1hdHRlZEV4cGxhbmF0aW9uID0gYDogJHtlfWApO1xuICB9XG5cbiAgdG9NZXNzYWdlKCkge1xuICAgIHJldHVybiBgJHt0aGlzLnJlYXNvbn0ke3RoaXMuX2Zvcm1hdHRlZEV4cGxhbmF0aW9ufWA7XG4gIH1cbn1cblxuY29uc3QgVWUgPSB7XG4gICAgd2Vla3M6IHtcbiAgICAgIGRheXM6IDcsXG4gICAgICBob3VyczogMTY4LFxuICAgICAgbWludXRlczogMTAwODAsXG4gICAgICBzZWNvbmRzOiA2MDQ4MDAsXG4gICAgICBtaWxsaXNlY29uZHM6IDYwNDhlNSxcbiAgICB9LFxuICAgIGRheXM6IHsgaG91cnM6IDI0LCBtaW51dGVzOiAxNDQwLCBzZWNvbmRzOiA4NjQwMCwgbWlsbGlzZWNvbmRzOiA4NjRlNSB9LFxuICAgIGhvdXJzOiB7IG1pbnV0ZXM6IDYwLCBzZWNvbmRzOiAzNjAwLCBtaWxsaXNlY29uZHM6IDM2ZTUgfSxcbiAgICBtaW51dGVzOiB7IHNlY29uZHM6IDYwLCBtaWxsaXNlY29uZHM6IDZlNCB9LFxuICAgIHNlY29uZHM6IHsgbWlsbGlzZWNvbmRzOiAxZTMgfSxcbiAgfSxcbiAgV2UgPSBPYmplY3QuYXNzaWduKFxuICAgIHtcbiAgICAgIHllYXJzOiB7XG4gICAgICAgIHF1YXJ0ZXJzOiA0LFxuICAgICAgICBtb250aHM6IDEyLFxuICAgICAgICB3ZWVrczogNTIsXG4gICAgICAgIGRheXM6IDM2NSxcbiAgICAgICAgaG91cnM6IDg3NjAsXG4gICAgICAgIG1pbnV0ZXM6IDUyNTYwMCxcbiAgICAgICAgc2Vjb25kczogMzE1MzZlMyxcbiAgICAgICAgbWlsbGlzZWNvbmRzOiAzMTUzNmU2LFxuICAgICAgfSxcbiAgICAgIHF1YXJ0ZXJzOiB7XG4gICAgICAgIG1vbnRoczogMyxcbiAgICAgICAgd2Vla3M6IDEzLFxuICAgICAgICBkYXlzOiA5MSxcbiAgICAgICAgaG91cnM6IDIxODQsXG4gICAgICAgIG1pbnV0ZXM6IDEzMTA0MCxcbiAgICAgICAgc2Vjb25kczogNzg2MjQwMCxcbiAgICAgICAgbWlsbGlzZWNvbmRzOiA3ODYyNGU1LFxuICAgICAgfSxcbiAgICAgIG1vbnRoczoge1xuICAgICAgICB3ZWVrczogNCxcbiAgICAgICAgZGF5czogMzAsXG4gICAgICAgIGhvdXJzOiA3MjAsXG4gICAgICAgIG1pbnV0ZXM6IDQzMjAwLFxuICAgICAgICBzZWNvbmRzOiAyNTkyZTMsXG4gICAgICAgIG1pbGxpc2Vjb25kczogMjU5MmU2LFxuICAgICAgfSxcbiAgICB9LFxuICAgIFVlLFxuICApLFxuICBQZSA9IE9iamVjdC5hc3NpZ24oXG4gICAge1xuICAgICAgeWVhcnM6IHtcbiAgICAgICAgcXVhcnRlcnM6IDQsXG4gICAgICAgIG1vbnRoczogMTIsXG4gICAgICAgIHdlZWtzOiA1Mi4xNzc1LFxuICAgICAgICBkYXlzOiAzNjUuMjQyNSxcbiAgICAgICAgaG91cnM6IDg3NjUuODIsXG4gICAgICAgIG1pbnV0ZXM6IDUyNTk0OS4yLFxuICAgICAgICBzZWNvbmRzOiA1MjU5NDkuMiAqIDYwLFxuICAgICAgICBtaWxsaXNlY29uZHM6IDUyNTk0OS4yICogNjAgKiAxZTMsXG4gICAgICB9LFxuICAgICAgcXVhcnRlcnM6IHtcbiAgICAgICAgbW9udGhzOiAzLFxuICAgICAgICB3ZWVrczogMTMuMDQ0Mzc1LFxuICAgICAgICBkYXlzOiA5MS4zMTA2MjUsXG4gICAgICAgIGhvdXJzOiAyMTkxLjQ1NSxcbiAgICAgICAgbWludXRlczogMTMxNDg3LjMsXG4gICAgICAgIHNlY29uZHM6ICg1MjU5NDkuMiAqIDYwKSAvIDQsXG4gICAgICAgIG1pbGxpc2Vjb25kczogNzg4OTIzNzk5OS45OTk5OTksXG4gICAgICB9LFxuICAgICAgbW9udGhzOiB7XG4gICAgICAgIHdlZWtzOiAzMC40MzY4NzUgLyA3LFxuICAgICAgICBkYXlzOiAzMC40MzY4NzUsXG4gICAgICAgIGhvdXJzOiA3MzAuNDg1LFxuICAgICAgICBtaW51dGVzOiA0MzgyOS4xLFxuICAgICAgICBzZWNvbmRzOiAyNjI5NzQ2LFxuICAgICAgICBtaWxsaXNlY29uZHM6IDI2Mjk3NDZlMyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBVZSxcbiAgKTtcblxuZnVuY3Rpb24gSGUodCwgZSwgcywgbiwgcikge1xuICBjb25zdCBpID0gdFtyXVtzXSxcbiAgICBhID0gZVtzXSAvIGksXG4gICAgbyA9XG4gICAgICAhKE1hdGguc2lnbihhKSA9PT0gTWF0aC5zaWduKG5bcl0pKSAmJiAwICE9PSBuW3JdICYmIE1hdGguYWJzKGEpIDw9IDFcbiAgICAgICAgPyAoZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0IDwgMCA/IE1hdGguZmxvb3IodCkgOiBNYXRoLmNlaWwodCk7XG4gICAgICAgICAgfSkoYSlcbiAgICAgICAgOiBNYXRoLnRydW5jKGEpO1xuICAobltyXSA9IG5bcl0gKyBvKSwgKGVbc10gPSBlW3NdIC0gbyAqIGkpO1xufVxuXG5jbGFzcyBSZSB7XG4gIGNvbnN0cnVjdG9yKHQpIHtcbiAgICBsZXQgZSwgcztcbiAgICAnbG9uZ3Rlcm0nID09PSB0LmNvbnZlcnNpb25BY2N1cmFjeSB8fCAhMVxuICAgICAgPyAoKHMgPSAnbG9uZ3Rlcm0nKSwgKGUgPSBQZSkpXG4gICAgICA6ICgocyA9ICdjYXN1YWwnKSwgKGUgPSBXZSkpLFxuICAgICAgdC5tYXRyaXggJiYgKGUgPSB0Lm1hdHJpeCksXG4gICAgICAodGhpcy5fdmFsdWVzID0gdC52YWx1ZXMgfHwge30pLFxuICAgICAgKHRoaXMuX2xvYyA9IHQubG9jIHx8IGx0LmNyZWF0ZSgpKSxcbiAgICAgICh0aGlzLl9jb252ZXJzaW9uQWNjdXJhY3kgPSBzKSxcbiAgICAgICh0aGlzLl9pbnZhbGlkID0gdC5pbnZhbGlkIHx8IG51bGwpLFxuICAgICAgKHRoaXMuX21hdHJpeCA9IGUpLFxuICAgICAgKHRoaXMuX2lzTHV4b25EdXJhdGlvbiA9ICEwKTtcbiAgfVxuXG4gIGdldCBjb252ZXJzaW9uQWNjdXJhY3koKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnZlcnNpb25BY2N1cmFjeTtcbiAgfVxuXG4gIGdldCBpbnZhbGlkRXhwbGFuYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludmFsaWQgPyB0aGlzLl9pbnZhbGlkLmV4cGxhbmF0aW9uIDogbnVsbDtcbiAgfVxuXG4gIGdldCBpbnZhbGlkUmVhc29uKCkge1xuICAgIHJldHVybiB0aGlzLl9pbnZhbGlkID8gdGhpcy5faW52YWxpZC5yZWFzb24gOiBudWxsO1xuICB9XG5cbiAgZ2V0IGlzVmFsaWQoKSB7XG4gICAgcmV0dXJuIG51bGwgPT09IHRoaXMuX2ludmFsaWQ7XG4gIH1cblxuICBnZXQgbG9jYWxlKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLl9sb2MubG9jYWxlIDogdm9pZCAwO1xuICB9XG5cbiAgZ2V0IG1hdHJpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbWF0cml4O1xuICB9XG5cbiAgZ2V0IG51bWJlcmluZ1N5c3RlbSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy5fbG9jLm51bWJlcmluZ1N5c3RlbSA6IHZvaWQgMDtcbiAgfVxuXG4gIGdldCB5ZWFycygpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy5fdmFsdWVzLnllYXJzIHx8IDAgOiBOYU47XG4gIH1cblxuICBnZXQgcXVhcnRlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMuX3ZhbHVlcy5xdWFydGVycyB8fCAwIDogTmFOO1xuICB9XG5cbiAgZ2V0IG1vbnRocygpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy5fdmFsdWVzLm1vbnRocyB8fCAwIDogTmFOO1xuICB9XG5cbiAgZ2V0IHdlZWtzKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLl92YWx1ZXMud2Vla3MgfHwgMCA6IE5hTjtcbiAgfVxuXG4gIGdldCBkYXlzKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLl92YWx1ZXMuZGF5cyB8fCAwIDogTmFOO1xuICB9XG5cbiAgZ2V0IGhvdXJzKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLl92YWx1ZXMuaG91cnMgfHwgMCA6IE5hTjtcbiAgfVxuXG4gIGdldCBtaW51dGVzKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLl92YWx1ZXMubWludXRlcyB8fCAwIDogTmFOO1xuICB9XG5cbiAgZ2V0IHNlY29uZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMuX3ZhbHVlcy5zZWNvbmRzIHx8IDAgOiBOYU47XG4gIH1cblxuICBnZXQgbWlsbGlzZWNvbmRzKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLl92YWx1ZXMubWlsbGlzZWNvbmRzIHx8IDAgOiBOYU47XG4gIH1cblxuICBzdGF0aWMgZnJvbUlTT1RpbWUodCwgZSA9IHt9KSB7XG4gICAgY29uc3QgW3NdID0gKGZ1bmN0aW9uICh0KSB7XG4gICAgICByZXR1cm4gbmUodCwgW3BlLCBzZSh5ZSldKTtcbiAgICB9KSh0KTtcbiAgICByZXR1cm4gc1xuICAgICAgPyBSZS5mcm9tT2JqZWN0KHMsIGUpXG4gICAgICA6IFJlLmludmFsaWQoXG4gICAgICAgICAgJ3VucGFyc2FibGUnLFxuICAgICAgICAgIGB0aGUgaW5wdXQgXCIke3R9XCIgY2FuJ3QgYmUgcGFyc2VkIGFzIElTTyA4NjAxYCxcbiAgICAgICAgKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTWlsbGlzKHQsIGUgPSB7fSkge1xuICAgIHJldHVybiBSZS5mcm9tT2JqZWN0KHsgbWlsbGlzZWNvbmRzOiB0IH0sIGUpO1xuICB9XG5cbiAgc3RhdGljIGZyb21PYmplY3QodCwgZSA9IHt9KSB7XG4gICAgaWYgKG51bGwgPT0gdCB8fCAnb2JqZWN0JyAhPSB0eXBlb2YgdClcbiAgICAgIHRocm93IG5ldyBvKFxuICAgICAgICAnRHVyYXRpb24uZnJvbU9iamVjdDogYXJndW1lbnQgZXhwZWN0ZWQgdG8gYmUgYW4gb2JqZWN0LCBnb3QgJyArXG4gICAgICAgICAgKG51bGwgPT09IHQgPyAnbnVsbCcgOiB0eXBlb2YgdCksXG4gICAgICApO1xuICAgIHJldHVybiBuZXcgUmUoe1xuICAgICAgdmFsdWVzOiBSdCh0LCBSZS5ub3JtYWxpemVVbml0KSxcbiAgICAgIGxvYzogbHQuZnJvbU9iamVjdChlKSxcbiAgICAgIGNvbnZlcnNpb25BY2N1cmFjeTogZS5jb252ZXJzaW9uQWNjdXJhY3ksXG4gICAgICBtYXRyaXg6IGUubWF0cml4LFxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGZyb21EdXJhdGlvbkxpa2UodCkge1xuICAgIGlmIChOdCh0KSkgcmV0dXJuIFJlLmZyb21NaWxsaXModCk7XG4gICAgaWYgKFJlLmlzRHVyYXRpb24odCkpIHJldHVybiB0O1xuICAgIGlmICgnb2JqZWN0JyA9PSB0eXBlb2YgdCkgcmV0dXJuIFJlLmZyb21PYmplY3QodCk7XG4gICAgdGhyb3cgbmV3IG8oYFVua25vd24gZHVyYXRpb24gYXJndW1lbnQgJHt0fSBvZiB0eXBlICR7dHlwZW9mIHR9YCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUlTTyh0LCBlKSB7XG4gICAgY29uc3QgW3NdID0gKGZ1bmN0aW9uICh0KSB7XG4gICAgICByZXR1cm4gbmUodCwgW3dlLCBPZV0pO1xuICAgIH0pKHQpO1xuICAgIHJldHVybiBzXG4gICAgICA/IFJlLmZyb21PYmplY3QocywgZSlcbiAgICAgIDogUmUuaW52YWxpZChcbiAgICAgICAgICAndW5wYXJzYWJsZScsXG4gICAgICAgICAgYHRoZSBpbnB1dCBcIiR7dH1cIiBjYW4ndCBiZSBwYXJzZWQgYXMgSVNPIDg2MDFgLFxuICAgICAgICApO1xuICB9XG5cbiAgc3RhdGljIGlzRHVyYXRpb24odCkge1xuICAgIHJldHVybiAoISF0ICYmIHQuX2lzTHV4b25EdXJhdGlvbikgfHwgITE7XG4gIH1cblxuICBzdGF0aWMgaW52YWxpZCh0LCBlKSB7XG4gICAgaWYgKCF0KSB0aHJvdyBuZXcgbygnbmVlZCB0byBzcGVjaWZ5IGEgcmVhc29uIHRoZSBEdXJhdGlvbiBpcyBpbnZhbGlkJyk7XG4gICAgY29uc3QgbiA9IHQgaW5zdGFuY2VvZiBBZSA/IHQgOiBuZXcgQWUodCwgZSk7XG4gICAgaWYgKFN0LnRocm93T25JbnZhbGlkKSB0aHJvdyBuZXcgcyhuKTtcbiAgICByZXR1cm4gbmV3IFJlKHsgaW52YWxpZDogbiB9KTtcbiAgfVxuXG4gIHN0YXRpYyBub3JtYWxpemVVbml0KHQpIHtcbiAgICBjb25zdCBlID0ge1xuICAgICAgeWVhcjogJ3llYXJzJyxcbiAgICAgIHllYXJzOiAneWVhcnMnLFxuICAgICAgcXVhcnRlcjogJ3F1YXJ0ZXJzJyxcbiAgICAgIHF1YXJ0ZXJzOiAncXVhcnRlcnMnLFxuICAgICAgbW9udGg6ICdtb250aHMnLFxuICAgICAgbW9udGhzOiAnbW9udGhzJyxcbiAgICAgIHdlZWs6ICd3ZWVrcycsXG4gICAgICB3ZWVrczogJ3dlZWtzJyxcbiAgICAgIGRheTogJ2RheXMnLFxuICAgICAgZGF5czogJ2RheXMnLFxuICAgICAgaG91cjogJ2hvdXJzJyxcbiAgICAgIGhvdXJzOiAnaG91cnMnLFxuICAgICAgbWludXRlOiAnbWludXRlcycsXG4gICAgICBtaW51dGVzOiAnbWludXRlcycsXG4gICAgICBzZWNvbmQ6ICdzZWNvbmRzJyxcbiAgICAgIHNlY29uZHM6ICdzZWNvbmRzJyxcbiAgICAgIG1pbGxpc2Vjb25kOiAnbWlsbGlzZWNvbmRzJyxcbiAgICAgIG1pbGxpc2Vjb25kczogJ21pbGxpc2Vjb25kcycsXG4gICAgfVt0XTtcbiAgICBpZiAoIWUpIHRocm93IG5ldyByKHQpO1xuICAgIHJldHVybiBlO1xuICB9XG5cbiAgZ2V0TWF4VW5pdCh0ID0gITEpIHtcbiAgICBjb25zdCBlID0gdCA/IFF0IDogR3QsXG4gICAgICBzID0gdGhpcy5zaGlmdFRvKC4uLmUpLnRvT2JqZWN0KCk7XG4gICAgcmV0dXJuIGUuZmluZCh0ID0+IChzW3RdIHx8IDApID4gMCkgfHwgQnRbMF07XG4gIH1cblxuICB0b0Zvcm1hdCh0LCBlID0geyBmbG9vcjogITAgfSkge1xuICAgIGNvbnN0IHMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGUpLCB7XG4gICAgICBmbG9vcjogITEgIT09IGUucm91bmQgJiYgITEgIT09IGUuZmxvb3IsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZFxuICAgICAgPyB0ZS5jcmVhdGUodGhpcy5fbG9jLCBzKS5mb3JtYXREdXJhdGlvbkZyb21TdHJpbmcodGhpcywgdClcbiAgICAgIDogJ0ludmFsaWQgRHVyYXRpb24nO1xuICB9XG5cbiAgdG9IdW1hbih0ID0ge30pIHtcbiAgICBjb25zdCBlID0gdGhpcy5nZXRNYXhVbml0KCEwKSxcbiAgICAgIHMgPSB0Lm9ubHlIdW1hblVuaXRzID8gUXQgOiBHdCxcbiAgICAgIG4gPSB0aGlzLnNoaWZ0VG8oLi4ucy5zbGljZShzLmluZGV4T2YoZSkpKS50b09iamVjdCgpLFxuICAgICAgciA9IHNcbiAgICAgICAgLm1hcChlID0+IHtcbiAgICAgICAgICBjb25zdCBzID0gbltlXTtcbiAgICAgICAgICByZXR1cm4gTXQocykgfHwgMCA9PT0gc1xuICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICA6IHRoaXMuX2xvY1xuICAgICAgICAgICAgICAgIC5udW1iZXJGb3JtYXR0ZXIoXG4gICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAndW5pdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB1bml0RGlzcGxheTogJ2xvbmcnLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgdCxcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgeyB1bml0OiBlLnNsaWNlKDAsIC0xKSB9LFxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmZvcm1hdChzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcih0ID0+IHQpLFxuICAgICAgaSA9IE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHsgdHlwZTogJ2Nvbmp1bmN0aW9uJywgc3R5bGU6IHQubGlzdFN0eWxlIHx8ICduYXJyb3cnIH0sXG4gICAgICAgIHQsXG4gICAgICApO1xuICAgIHJldHVybiB0aGlzLl9sb2MubGlzdEZvcm1hdHRlcihpKS5mb3JtYXQocik7XG4gIH1cblxuICB0b09iamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fdmFsdWVzKSA6IHt9O1xuICB9XG5cbiAgdG9JU08oKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiBudWxsO1xuICAgIGxldCB0ID0gJ1AnO1xuICAgIHJldHVybiAoXG4gICAgICAwICE9PSB0aGlzLnllYXJzICYmICh0ICs9IHRoaXMueWVhcnMgKyAnWScpLFxuICAgICAgKDAgPT09IHRoaXMubW9udGhzICYmIDAgPT09IHRoaXMucXVhcnRlcnMpIHx8XG4gICAgICAgICh0ICs9IHRoaXMubW9udGhzICsgMyAqIHRoaXMucXVhcnRlcnMgKyAnTScpLFxuICAgICAgMCAhPT0gdGhpcy53ZWVrcyAmJiAodCArPSB0aGlzLndlZWtzICsgJ1cnKSxcbiAgICAgIDAgIT09IHRoaXMuZGF5cyAmJiAodCArPSB0aGlzLmRheXMgKyAnRCcpLFxuICAgICAgKDAgPT09IHRoaXMuaG91cnMgJiZcbiAgICAgICAgMCA9PT0gdGhpcy5taW51dGVzICYmXG4gICAgICAgIDAgPT09IHRoaXMuc2Vjb25kcyAmJlxuICAgICAgICAwID09PSB0aGlzLm1pbGxpc2Vjb25kcykgfHxcbiAgICAgICAgKHQgKz0gJ1QnKSxcbiAgICAgIDAgIT09IHRoaXMuaG91cnMgJiYgKHQgKz0gdGhpcy5ob3VycyArICdIJyksXG4gICAgICAwICE9PSB0aGlzLm1pbnV0ZXMgJiYgKHQgKz0gdGhpcy5taW51dGVzICsgJ00nKSxcbiAgICAgICgwID09PSB0aGlzLnNlY29uZHMgJiYgMCA9PT0gdGhpcy5taWxsaXNlY29uZHMpIHx8XG4gICAgICAgICh0ICs9IFp0KHRoaXMuc2Vjb25kcyArIHRoaXMubWlsbGlzZWNvbmRzIC8gMWUzLCAzKSArICdTJyksXG4gICAgICAnUCcgPT09IHQgJiYgKHQgKz0gJ1QwUycpLFxuICAgICAgdFxuICAgICk7XG4gIH1cblxuICB0b0lTT1RpbWUodCA9IHt9KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGUgPSB0aGlzLnRvTWlsbGlzKCk7XG4gICAgaWYgKGUgPCAwIHx8IGUgPj0gODY0ZTUpIHJldHVybiBudWxsO1xuICAgIHQgPSBPYmplY3QuYXNzaWduKFxuICAgICAge1xuICAgICAgICBzdXBwcmVzc01pbGxpc2Vjb25kczogITEsXG4gICAgICAgIHN1cHByZXNzU2Vjb25kczogITEsXG4gICAgICAgIGluY2x1ZGVQcmVmaXg6ICExLFxuICAgICAgICBmb3JtYXQ6ICdleHRlbmRlZCcsXG4gICAgICB9LFxuICAgICAgdCxcbiAgICApO1xuICAgIGNvbnN0IHMgPSB0aGlzLnNoaWZ0VG8oJ2hvdXJzJywgJ21pbnV0ZXMnLCAnc2Vjb25kcycsICdtaWxsaXNlY29uZHMnKTtcbiAgICBsZXQgbiA9ICdiYXNpYycgPT09IHQuZm9ybWF0ID8gJ2hobW0nIDogJ2hoOm1tJztcbiAgICAodC5zdXBwcmVzc1NlY29uZHMgJiYgMCA9PT0gcy5zZWNvbmRzICYmIDAgPT09IHMubWlsbGlzZWNvbmRzKSB8fFxuICAgICAgKChuICs9ICdiYXNpYycgPT09IHQuZm9ybWF0ID8gJ3NzJyA6ICc6c3MnKSxcbiAgICAgICh0LnN1cHByZXNzTWlsbGlzZWNvbmRzICYmIDAgPT09IHMubWlsbGlzZWNvbmRzKSB8fCAobiArPSAnLlNTUycpKTtcbiAgICBsZXQgciA9IHMudG9Gb3JtYXQobik7XG4gICAgcmV0dXJuIHQuaW5jbHVkZVByZWZpeCAmJiAociA9ICdUJyArIHIpLCByO1xuICB9XG5cbiAgdG9KU09OKCkge1xuICAgIHJldHVybiB0aGlzLnRvSVNPKCk7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy50b0lTTygpO1xuICB9XG5cbiAgdG9NaWxsaXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXMoJ21pbGxpc2Vjb25kcycpO1xuICB9XG5cbiAgdmFsdWVPZigpIHtcbiAgICByZXR1cm4gdGhpcy50b01pbGxpcygpO1xuICB9XG5cbiAgcGx1cyh0KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiB0aGlzO1xuICAgIGNvbnN0IGUgPSBSZS5mcm9tRHVyYXRpb25MaWtlKHQpLFxuICAgICAgcyA9IHt9O1xuICAgIHJldHVybiAoXG4gICAgICBHdC5mb3JFYWNoKHQgPT4ge1xuICAgICAgICAodm9pZCAwID09PSBlLl92YWx1ZXNbdF0gJiYgdm9pZCAwID09PSB0aGlzLl92YWx1ZXNbdF0pIHx8XG4gICAgICAgICAgKHNbdF0gPSBlLmdldCh0KSArIHRoaXMuZ2V0KHQpKTtcbiAgICAgIH0pLFxuICAgICAgdGhpcy5fY2xvbmUodGhpcywgeyB2YWx1ZXM6IHMgfSwgITApXG4gICAgKTtcbiAgfVxuXG4gIG1pbnVzKHQpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIHRoaXM7XG4gICAgY29uc3QgZSA9IFJlLmZyb21EdXJhdGlvbkxpa2UodCk7XG4gICAgcmV0dXJuIHRoaXMucGx1cyhlLm5lZ2F0ZSgpKTtcbiAgfVxuXG4gIG1hcFVuaXRzKHQpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIHRoaXM7XG4gICAgY29uc3QgZSA9IHt9O1xuICAgIHJldHVybiAoXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLl92YWx1ZXMpLmZvckVhY2gocyA9PiB7XG4gICAgICAgIGVbc10gPSBIdCh0KHRoaXMuX3ZhbHVlc1tzXSwgcykpO1xuICAgICAgfSksXG4gICAgICB0aGlzLl9jbG9uZSh0aGlzLCB7IHZhbHVlczogZSB9LCAhMClcbiAgICApO1xuICB9XG5cbiAgZ2V0KHQpIHtcbiAgICByZXR1cm4gdGhpc1tSZS5ub3JtYWxpemVVbml0KHQpXTtcbiAgfVxuXG4gIHNldCh0KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiB0aGlzO1xuICAgIGNvbnN0IGUgPSBPYmplY3QuYXNzaWduKFxuICAgICAgT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fdmFsdWVzKSxcbiAgICAgIFJ0KHQsIFJlLm5vcm1hbGl6ZVVuaXQpLFxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuX2Nsb25lKHRoaXMsIHsgdmFsdWVzOiBlIH0pO1xuICB9XG5cbiAgcmVjb25maWd1cmUoe1xuICAgIGxvY2FsZTogdCxcbiAgICBudW1iZXJpbmdTeXN0ZW06IGUsXG4gICAgY29udmVyc2lvbkFjY3VyYWN5OiBzLFxuICAgIG1hdHJpeDogbixcbiAgfSA9IHt9KSB7XG4gICAgY29uc3QgciA9IHtcbiAgICAgIGxvYzogdGhpcy5fbG9jLmNsb25lKHsgbG9jYWxlOiB0LCBudW1iZXJpbmdTeXN0ZW06IGUgfSksXG4gICAgICBtYXRyaXg6IG4sXG4gICAgICBjb252ZXJzaW9uQWNjdXJhY3k6IHMsXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5fY2xvbmUodGhpcywgcik7XG4gIH1cblxuICBhcyh0KSB7XG4gICAgcmV0dXJuIHRoaXMuc2hpZnRUbyh0KS5nZXQodCk7XG4gIH1cblxuICBub3JtYWxpemUoKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiB0aGlzO1xuICAgIGNvbnN0IHQgPSB0aGlzLnRvT2JqZWN0KCk7XG4gICAgcmV0dXJuIChcbiAgICAgIChmdW5jdGlvbiAodCwgZSkge1xuICAgICAgICBsZXQgcztcbiAgICAgICAgQnQuZm9yRWFjaChuID0+IHtcbiAgICAgICAgICBNdChlW25dKSB8fCAocyAmJiBIZSh0LCBlLCBzLCBlLCBuKSwgKHMgPSBuKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSkodGhpcy5fbWF0cml4LCB0KSxcbiAgICAgIHRoaXMuX2Nsb25lKHRoaXMsIHsgdmFsdWVzOiB0IH0sICEwKVxuICAgICk7XG4gIH1cblxuICByZXNjYWxlKCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gdGhpcztcbiAgICBjb25zdCB0ID0gKGZ1bmN0aW9uICh0ID0ge30pIHtcbiAgICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0KS5yZWR1Y2UoXG4gICAgICAgICh0LCBbZSwgc10pID0+ICgwICE9PSBzICYmICh0W2VdID0gcyksIHQpLFxuICAgICAgICB7fSxcbiAgICAgICk7XG4gICAgfSkodGhpcy5ub3JtYWxpemUoKS5zaGlmdFRvQWxsKCkudG9PYmplY3QoKSk7XG4gICAgcmV0dXJuIHRoaXMuX2Nsb25lKHRoaXMsIHsgdmFsdWVzOiB0IH0sICEwKTtcbiAgfVxuXG4gIHNoaWZ0VG8oLi4udCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkIHx8IDAgPT09IHQubGVuZ3RoKSByZXR1cm4gdGhpcztcbiAgICB0ID0gdC5tYXAodCA9PiBSZS5ub3JtYWxpemVVbml0KHQpKTtcbiAgICBjb25zdCBlID0ge30sXG4gICAgICBzID0ge30sXG4gICAgICBuID0gdGhpcy50b09iamVjdCgpO1xuICAgIGxldCByO1xuICAgIHJldHVybiAoXG4gICAgICBHdC5mb3JFYWNoKGkgPT4ge1xuICAgICAgICBpZiAodC5pbmRleE9mKGkpID49IDApIHtcbiAgICAgICAgICByID0gaTtcbiAgICAgICAgICBsZXQgdCA9IDA7XG4gICAgICAgICAgT2JqZWN0LmtleXMocykuZm9yRWFjaChlID0+IHtcbiAgICAgICAgICAgICh0ICs9IHRoaXMuX21hdHJpeFtlXVtpXSAqIHNbZV0pLCAoc1tlXSA9IDApO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgICAgTnQobltpXSkgJiYgKHQgKz0gbltpXSk7XG4gICAgICAgICAgY29uc3QgYSA9IE1hdGgudHJ1bmModCk7XG4gICAgICAgICAgKGVbaV0gPSBhKSxcbiAgICAgICAgICAgIChzW2ldID0gKDFlMyAqIHQgLSAxZTMgKiBhKSAvIDFlMyksXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhuKS5mb3JFYWNoKHQgPT4ge1xuICAgICAgICAgICAgICBHdC5pbmRleE9mKHQpID4gR3QuaW5kZXhPZihpKSAmJiBIZSh0aGlzLl9tYXRyaXgsIG4sIHQsIGUsIGkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBOdChuW2ldKSAmJiAoc1tpXSA9IG5baV0pO1xuICAgICAgfSksXG4gICAgICBPYmplY3Qua2V5cyhzKS5mb3JFYWNoKHQgPT4ge1xuICAgICAgICBjb25zdCBuID0gc1t0XTtcbiAgICAgICAgMCAhPT0gbiAmJiAoZVtyXSArPSB0ID09PSByID8gbiA6IG4gLyB0aGlzLl9tYXRyaXhbcl1bdF0pO1xuICAgICAgfSksXG4gICAgICB0aGlzLl9jbG9uZSh0aGlzLCB7IHZhbHVlczogZSB9LCAhMCkubm9ybWFsaXplKClcbiAgICApO1xuICB9XG5cbiAgc2hpZnRUb0FsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkXG4gICAgICA/IHRoaXMuc2hpZnRUbyhcbiAgICAgICAgICAneWVhcnMnLFxuICAgICAgICAgICdtb250aHMnLFxuICAgICAgICAgICd3ZWVrcycsXG4gICAgICAgICAgJ2RheXMnLFxuICAgICAgICAgICdob3VycycsXG4gICAgICAgICAgJ21pbnV0ZXMnLFxuICAgICAgICAgICdzZWNvbmRzJyxcbiAgICAgICAgICAnbWlsbGlzZWNvbmRzJyxcbiAgICAgICAgKVxuICAgICAgOiB0aGlzO1xuICB9XG5cbiAgbmVnYXRlKCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gdGhpcztcbiAgICBjb25zdCB0ID0ge307XG4gICAgcmV0dXJuIChcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuX3ZhbHVlcykuZm9yRWFjaChlID0+IHtcbiAgICAgICAgdFtlXSA9IDAgPT09IHRoaXMuX3ZhbHVlc1tlXSA/IDAgOiAtdGhpcy5fdmFsdWVzW2VdO1xuICAgICAgfSksXG4gICAgICB0aGlzLl9jbG9uZSh0aGlzLCB7IHZhbHVlczogdCB9LCAhMClcbiAgICApO1xuICB9XG5cbiAgZXF1YWxzKHQpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCB8fCAhdC5pc1ZhbGlkKSByZXR1cm4gITE7XG4gICAgaWYgKCF0aGlzLl9sb2MuZXF1YWxzKHQuX2xvYykpIHJldHVybiAhMTtcbiAgICBmb3IgKGNvbnN0IG4gb2YgR3QpXG4gICAgICBpZiAoXG4gICAgICAgICgoZSA9IHRoaXMuX3ZhbHVlc1tuXSksXG4gICAgICAgIChzID0gdC5fdmFsdWVzW25dKSxcbiAgICAgICAgISh2b2lkIDAgPT09IGUgfHwgMCA9PT0gZSA/IHZvaWQgMCA9PT0gcyB8fCAwID09PSBzIDogZSA9PT0gcykpXG4gICAgICApXG4gICAgICAgIHJldHVybiAhMTtcbiAgICB2YXIgZSwgcztcbiAgICByZXR1cm4gITA7XG4gIH1cblxuICBfY2xvbmUodCwgZSwgcyA9ICExKSB7XG4gICAgY29uc3QgbiA9IHtcbiAgICAgIHZhbHVlczogc1xuICAgICAgICA/IGUudmFsdWVzXG4gICAgICAgIDogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0Ll92YWx1ZXMpLCBlLnZhbHVlcyB8fCB7fSksXG4gICAgICBsb2M6IHQuX2xvYy5jbG9uZShlLmxvYyksXG4gICAgICBjb252ZXJzaW9uQWNjdXJhY3k6IGUuY29udmVyc2lvbkFjY3VyYWN5IHx8IHQuY29udmVyc2lvbkFjY3VyYWN5LFxuICAgICAgbWF0cml4OiBlLm1hdHJpeCB8fCB0Lm1hdHJpeCxcbiAgICB9O1xuICAgIHJldHVybiBuZXcgUmUobik7XG4gIH1cbn1cblxuY29uc3QgWWUgPSAnSW52YWxpZCBJbnRlcnZhbCc7XG5cbmZ1bmN0aW9uIEplKHQpIHtcbiAgaWYgKEFzLmlzRGF0ZVRpbWUodCkpIHJldHVybiB0O1xuICBpZiAodCAmJiB0LnZhbHVlT2YgJiYgTnQodC52YWx1ZU9mKCkpKSByZXR1cm4gQXMuZnJvbUpTRGF0ZSh0KTtcbiAgaWYgKHQgJiYgJ29iamVjdCcgPT0gdHlwZW9mIHQpIHJldHVybiBBcy5mcm9tT2JqZWN0KHQpO1xuICB0aHJvdyBuZXcgbyhgVW5rbm93biBkYXRldGltZSBhcmd1bWVudDogJHt0fSwgb2YgdHlwZSAke3R5cGVvZiB0fWApO1xufVxuXG5jbGFzcyBHZSB7XG4gIGNvbnN0cnVjdG9yKHQpIHtcbiAgICAodGhpcy5fcyA9IHQuc3RhcnQpLFxuICAgICAgKHRoaXMuX2UgPSB0LmVuZCksXG4gICAgICAodGhpcy5faW52YWxpZCA9IHQuaW52YWxpZCB8fCBudWxsKSxcbiAgICAgICh0aGlzLl9pc0x1eG9uSW50ZXJ2YWwgPSAhMCk7XG4gIH1cblxuICBnZXQgaW52YWxpZFJlYXNvbigpIHtcbiAgICByZXR1cm4gdGhpcy5faW52YWxpZCA/IHRoaXMuX2ludmFsaWQucmVhc29uIDogbnVsbDtcbiAgfVxuXG4gIGdldCBpc1ZhbGlkKCkge1xuICAgIHJldHVybiBudWxsID09PSB0aGlzLmludmFsaWRSZWFzb247XG4gIH1cblxuICBnZXQgc3RhcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMuX3MgOiBudWxsO1xuICB9XG5cbiAgZ2V0IGVuZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy5fZSA6IG51bGw7XG4gIH1cblxuICBzdGF0aWMgZnJvbURhdGVUaW1lcyh0LCBlKSB7XG4gICAgY29uc3QgcyA9IEplKHQpLFxuICAgICAgbiA9IEplKGUpLFxuICAgICAgciA9IChmdW5jdGlvbiAodCwgZSkge1xuICAgICAgICByZXR1cm4gdCAmJiB0LmlzVmFsaWRcbiAgICAgICAgICA/IGUgJiYgZS5pc1ZhbGlkXG4gICAgICAgICAgICA/IGUgPCB0XG4gICAgICAgICAgICAgID8gR2UuaW52YWxpZChcbiAgICAgICAgICAgICAgICAgICdlbmQgYmVmb3JlIHN0YXJ0JyxcbiAgICAgICAgICAgICAgICAgIGBUaGUgZW5kIG9mIGFuIGludGVydmFsIG11c3QgYmUgYWZ0ZXIgaXRzIHN0YXJ0LCBidXQgeW91IGhhZCBzdGFydD0ke3QudG9JU08oKX0gYW5kIGVuZD0ke2UudG9JU08oKX1gLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiB2b2lkIDBcbiAgICAgICAgICAgIDogR2UuaW52YWxpZCgnbWlzc2luZyBvciBpbnZhbGlkIGVuZCcpXG4gICAgICAgICAgOiBHZS5pbnZhbGlkKCdtaXNzaW5nIG9yIGludmFsaWQgc3RhcnQnKTtcbiAgICAgIH0pKHMsIG4pO1xuICAgIHJldHVybiByIHx8IG5ldyBHZSh7IHN0YXJ0OiBzLCBlbmQ6IG4gfSk7XG4gIH1cblxuICBzdGF0aWMgYWZ0ZXIodCwgZSkge1xuICAgIGNvbnN0IHMgPSBSZS5mcm9tRHVyYXRpb25MaWtlKGUpLFxuICAgICAgbiA9IEplKHQpO1xuICAgIHJldHVybiBuZXcgR2UoeyBzdGFydDogbiwgZW5kOiBuID8gbi5wbHVzKHMpIDogdm9pZCAwIH0pO1xuICB9XG5cbiAgc3RhdGljIGJlZm9yZSh0LCBlKSB7XG4gICAgY29uc3QgcyA9IFJlLmZyb21EdXJhdGlvbkxpa2UoZSksXG4gICAgICBuID0gSmUodCk7XG4gICAgcmV0dXJuIG5ldyBHZSh7IHN0YXJ0OiBuID8gbi5taW51cyhzKSA6IHZvaWQgMCwgZW5kOiBuIH0pO1xuICB9XG5cbiAgc3RhdGljIGZyb21JU08odCwgZSA9IHt9KSB7XG4gICAgY29uc3QgW3MsIG5dID0gKHQgfHwgJycpLnNwbGl0KCcvJywgMik7XG4gICAgaWYgKHMgJiYgbikge1xuICAgICAgbGV0IHQsIHIsIGksIGE7XG4gICAgICB0cnkge1xuICAgICAgICAodCA9IEFzLmZyb21JU08ocywgZSkpLCAociA9IHQuaXNWYWxpZCk7XG4gICAgICB9IGNhdGNoIChuKSB7XG4gICAgICAgIHIgPSAhMTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIChpID0gQXMuZnJvbUlTTyhuLCBlKSksIChhID0gaS5pc1ZhbGlkKTtcbiAgICAgIH0gY2F0Y2ggKG4pIHtcbiAgICAgICAgYSA9ICExO1xuICAgICAgfVxuICAgICAgaWYgKHIgJiYgYSkgcmV0dXJuIEdlLmZyb21EYXRlVGltZXModCwgaSk7XG4gICAgICBpZiAocikge1xuICAgICAgICBjb25zdCBzID0gUmUuZnJvbUlTTyhuLCBlKTtcbiAgICAgICAgaWYgKHMuaXNWYWxpZCkgcmV0dXJuIEdlLmFmdGVyKHQsIHMpO1xuICAgICAgfSBlbHNlIGlmIChhKSB7XG4gICAgICAgIGNvbnN0IHQgPSBSZS5mcm9tSVNPKHMsIGUpO1xuICAgICAgICBpZiAodC5pc1ZhbGlkKSByZXR1cm4gR2UuYmVmb3JlKGksIHQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gR2UuaW52YWxpZChcbiAgICAgICd1bnBhcnNhYmxlJyxcbiAgICAgIGB0aGUgaW5wdXQgXCIke3R9XCIgY2FuJ3QgYmUgcGFyc2VkIGFzIElTTyA4NjAxYCxcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIGludmFsaWQodCwgZSkge1xuICAgIGlmICghdCkgdGhyb3cgbmV3IG8oJ25lZWQgdG8gc3BlY2lmeSBhIHJlYXNvbiB0aGUgSW50ZXJ2YWwgaXMgaW52YWxpZCcpO1xuICAgIGNvbnN0IHMgPSB0IGluc3RhbmNlb2YgQWUgPyB0IDogbmV3IEFlKHQsIGUpO1xuICAgIGlmIChTdC50aHJvd09uSW52YWxpZCkgdGhyb3cgbmV3IG4ocyk7XG4gICAgcmV0dXJuIG5ldyBHZSh7IGludmFsaWQ6IHMgfSk7XG4gIH1cblxuICBzdGF0aWMgaXNJbnRlcnZhbCh0KSB7XG4gICAgcmV0dXJuICghIXQgJiYgdC5faXNMdXhvbkludGVydmFsKSB8fCAhMTtcbiAgfVxuXG4gIHN0YXRpYyBtZXJnZSh0KSB7XG4gICAgY29uc3QgW2UsIHNdID0gdFxuICAgICAgLnNvcnQoKHQsIGUpID0+IHQuX3MudmFsdWVPZigpIC0gZS5fcy52YWx1ZU9mKCkpXG4gICAgICAucmVkdWNlKFxuICAgICAgICAoW3QsIGVdLCBzKSA9PlxuICAgICAgICAgIGVcbiAgICAgICAgICAgID8gZS5vdmVybGFwcyhzKSB8fCBlLmFidXRzU3RhcnQocylcbiAgICAgICAgICAgICAgPyBbdCwgZS51bmlvbihzKV1cbiAgICAgICAgICAgICAgOiBbdC5jb25jYXQoW2VdKSwgc11cbiAgICAgICAgICAgIDogW3QsIHNdLFxuICAgICAgICBbW10sIG51bGxdLFxuICAgICAgKTtcbiAgICByZXR1cm4gcyAmJiBlLnB1c2gocyksIGU7XG4gIH1cblxuICBzdGF0aWMgeG9yKHQpIHtcbiAgICBsZXQgZSA9IG51bGwsXG4gICAgICBzID0gMDtcbiAgICBjb25zdCBuID0gW10sXG4gICAgICByID0gdC5tYXAodCA9PiBbXG4gICAgICAgIHsgdGltZTogdC5fcywgdHlwZTogJ3MnIH0sXG4gICAgICAgIHsgdGltZTogdC5fZSwgdHlwZTogJ2UnIH0sXG4gICAgICBdKSxcbiAgICAgIGkgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0KC4uLnIpLnNvcnQoKHQsIGUpID0+ICt0LnRpbWUgLSArZS50aW1lKTtcbiAgICBmb3IgKGNvbnN0IHQgb2YgaSlcbiAgICAgIChzICs9ICdzJyA9PT0gdC50eXBlID8gMSA6IC0xKSxcbiAgICAgICAgMSA9PT0gc1xuICAgICAgICAgID8gKGUgPSB0LnRpbWUpXG4gICAgICAgICAgOiAoZSAmJlxuICAgICAgICAgICAgICBlLnZhbHVlT2YoKSAhPT0gdC50aW1lLnZhbHVlT2YoKSAmJlxuICAgICAgICAgICAgICBuLnB1c2goR2UuZnJvbURhdGVUaW1lcyhlLCB0LnRpbWUpKSxcbiAgICAgICAgICAgIChlID0gbnVsbCkpO1xuICAgIHJldHVybiBHZS5tZXJnZShuKTtcbiAgfVxuXG4gIGxlbmd0aCh0ID0gJ21pbGxpc2Vjb25kcycpIHtcbiAgICByZXR1cm4gdGhpcy50b0R1cmF0aW9uKHQpLmdldCh0KTtcbiAgfVxuXG4gIGNvdW50KHQgPSAnbWlsbGlzZWNvbmRzJykge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gTmFOO1xuICAgIGNvbnN0IGUgPSB0aGlzLnN0YXJ0LnN0YXJ0T2YodCksXG4gICAgICBzID0gdGhpcy5lbmQuc3RhcnRPZih0KTtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihzLmRpZmYoZSwgdCkuZ2V0KHQpKSArIDE7XG4gIH1cblxuICBoYXNTYW1lKHQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgISF0aGlzLmlzVmFsaWQgJiYgKHRoaXMuaXNFbXB0eSgpIHx8IHRoaXMuX2UubWludXMoMSkuaGFzU2FtZSh0aGlzLl9zLCB0KSlcbiAgICApO1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcy52YWx1ZU9mKCkgPT09IHRoaXMuX2UudmFsdWVPZigpO1xuICB9XG5cbiAgaXNBZnRlcih0KSB7XG4gICAgcmV0dXJuICEhdGhpcy5pc1ZhbGlkICYmIHRoaXMuX3MgPiB0O1xuICB9XG5cbiAgaXNCZWZvcmUodCkge1xuICAgIHJldHVybiAhIXRoaXMuaXNWYWxpZCAmJiB0aGlzLl9lIDw9IHQ7XG4gIH1cblxuICBjb250YWlucyh0KSB7XG4gICAgcmV0dXJuIHRoaXMuX3MgPD0gdCAmJiB0aGlzLl9lID4gdDtcbiAgfVxuXG4gIHNldCh7IHN0YXJ0OiB0LCBlbmQ6IGUgfSA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IEdlLmZyb21EYXRlVGltZXModCB8fCB0aGlzLl9zLCBlIHx8IHRoaXMuX2UpIDogdGhpcztcbiAgfVxuXG4gIHNwbGl0QXQoLi4udCkge1xuICAgIGNvbnN0IGUgPSB0XG4gICAgICAgIC5tYXAoSmUpXG4gICAgICAgIC5maWx0ZXIodCA9PiB0aGlzLmNvbnRhaW5zKHQpKVxuICAgICAgICAuc29ydCgpLFxuICAgICAgcyA9IFtdO1xuICAgIGxldCBuID0gdGhpcy5fcyxcbiAgICAgIHIgPSAwO1xuICAgIGZvciAoOyBuIDwgdGhpcy5fZTsgKSB7XG4gICAgICBjb25zdCB0ID0gZVtyXSB8fCB0aGlzLl9lLFxuICAgICAgICBpID0gK3QgPiArdGhpcy5fZSA/IHRoaXMuX2UgOiB0O1xuICAgICAgcy5wdXNoKEdlLmZyb21EYXRlVGltZXMobiwgaSkpLCAobiA9IGkpLCAociArPSAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHM7XG4gIH1cblxuICBzcGxpdEJ5KHQpIHtcbiAgICBjb25zdCBlID0gUmUuZnJvbUR1cmF0aW9uTGlrZSh0KTtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCB8fCAhZS5pc1ZhbGlkIHx8IDAgPT09IGUuYXMoJ21pbGxpc2Vjb25kcycpKSByZXR1cm4gW107XG4gICAgbGV0IHMsXG4gICAgICBuID0gdGhpcy5fcyxcbiAgICAgIHIgPSAxO1xuICAgIGNvbnN0IGkgPSBbXTtcbiAgICBmb3IgKDsgbiA8IHRoaXMuX2U7ICkge1xuICAgICAgY29uc3QgdCA9IHRoaXMuc3RhcnQucGx1cyhlLm1hcFVuaXRzKHQgPT4gdCAqIHIpKTtcbiAgICAgIChzID0gK3QgPiArdGhpcy5fZSA/IHRoaXMuX2UgOiB0KSxcbiAgICAgICAgaS5wdXNoKEdlLmZyb21EYXRlVGltZXMobiwgcykpLFxuICAgICAgICAobiA9IHMpLFxuICAgICAgICAociArPSAxKTtcbiAgICB9XG4gICAgcmV0dXJuIGk7XG4gIH1cblxuICBkaXZpZGVFcXVhbGx5KHQpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkXG4gICAgICA/IHRoaXMuc3BsaXRCeSh7IG1pbGxpc2Vjb25kczogdGhpcy5sZW5ndGgoKSAvIHQgfSkuc2xpY2UoMCwgdClcbiAgICAgIDogW107XG4gIH1cblxuICBvdmVybGFwcyh0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2UgPiB0Ll9zICYmIHRoaXMuX3MgPCB0Ll9lO1xuICB9XG5cbiAgYWJ1dHNTdGFydCh0KSB7XG4gICAgcmV0dXJuICt0aGlzLl9lID09ICt0Ll9zO1xuICB9XG5cbiAgYWJ1dHNFbmQodCkge1xuICAgIHJldHVybiArdC5fZSA9PSArdGhpcy5fcztcbiAgfVxuXG4gIGVuZ3VsZnModCkge1xuICAgIHJldHVybiAhIXRoaXMuaXNWYWxpZCAmJiB0aGlzLl9zIDw9IHQuX3MgJiYgdGhpcy5fZSA+PSB0Ll9lO1xuICB9XG5cbiAgZXF1YWxzKHQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgISghdGhpcy5pc1ZhbGlkIHx8ICF0LmlzVmFsaWQpICYmXG4gICAgICB0aGlzLl9zLmVxdWFscyh0Ll9zKSAmJlxuICAgICAgdGhpcy5fZS5lcXVhbHModC5fZSlcbiAgICApO1xuICB9XG5cbiAgaW50ZXJzZWN0aW9uKHQpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIHRoaXM7XG4gICAgY29uc3QgZSA9IHRoaXMuX3MgPiB0Ll9zID8gdGhpcy5fcyA6IHQuX3MsXG4gICAgICBzID0gdGhpcy5fZSA8IHQuX2UgPyB0aGlzLl9lIDogdC5fZTtcbiAgICByZXR1cm4gZSA+PSBzID8gbnVsbCA6IEdlLmZyb21EYXRlVGltZXMoZSwgcyk7XG4gIH1cblxuICB1bmlvbih0KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiB0aGlzO1xuICAgIGNvbnN0IGUgPSB0aGlzLl9zIDwgdC5fcyA/IHRoaXMuX3MgOiB0Ll9zLFxuICAgICAgcyA9IHRoaXMuX2UgPiB0Ll9lID8gdGhpcy5fZSA6IHQuX2U7XG4gICAgcmV0dXJuIEdlLmZyb21EYXRlVGltZXMoZSwgcyk7XG4gIH1cblxuICBkaWZmZXJlbmNlKC4uLnQpIHtcbiAgICByZXR1cm4gR2UueG9yKFt0aGlzXS5jb25jYXQodCkpXG4gICAgICAubWFwKHQgPT4gdGhpcy5pbnRlcnNlY3Rpb24odCkpXG4gICAgICAuZmlsdGVyKHQgPT4gdCAmJiAhdC5pc0VtcHR5KCkpO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IGBbJHt0aGlzLl9zLnRvSVNPKCl9IOKAkyAke3RoaXMuX2UudG9JU08oKX0pYCA6IFllO1xuICB9XG5cbiAgdG9Mb2NhbGVTdHJpbmcodCA9IHcsIGUgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWRcbiAgICAgID8gdGUuY3JlYXRlKHRoaXMuX3MubG9jLmNsb25lKGUpLCB0KS5mb3JtYXRJbnRlcnZhbCh0aGlzKVxuICAgICAgOiBZZTtcbiAgfVxuXG4gIHRvSVNPKHQgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyBgJHt0aGlzLl9zLnRvSVNPKHQpfS8ke3RoaXMuX2UudG9JU08odCl9YCA6IFllO1xuICB9XG5cbiAgdG9JU09EYXRlKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyBgJHt0aGlzLl9zLnRvSVNPRGF0ZSgpfS8ke3RoaXMuX2UudG9JU09EYXRlKCl9YCA6IFllO1xuICB9XG5cbiAgdG9JU09UaW1lKHQgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWRcbiAgICAgID8gYCR7dGhpcy5fcy50b0lTT1RpbWUodCl9LyR7dGhpcy5fZS50b0lTT1RpbWUodCl9YFxuICAgICAgOiBZZTtcbiAgfVxuXG4gIHRvRm9ybWF0KHQsIHsgc2VwYXJhdG9yOiBlID0gJyAtICcgfSA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZFxuICAgICAgPyBgJHt0aGlzLl9zLnRvRm9ybWF0KHQpfSR7ZX0ke3RoaXMuX2UudG9Gb3JtYXQodCl9YFxuICAgICAgOiBZZTtcbiAgfVxuXG4gIHRvRHVyYXRpb24odCA9ICdtaWxsaXNlY29uZHMnLCBlID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkXG4gICAgICA/IHRoaXMuX2UuZGlmZih0aGlzLl9zLCB0LCBlKVxuICAgICAgOiBSZS5pbnZhbGlkKHRoaXMuX2ludmFsaWQucmVhc29uKTtcbiAgfVxuXG4gIG1hcEVuZHBvaW50cyh0KSB7XG4gICAgcmV0dXJuIEdlLmZyb21EYXRlVGltZXModCh0aGlzLl9zKSwgdCh0aGlzLl9lKSk7XG4gIH1cbn1cblxuY2xhc3MgQmUge1xuICBzdGF0aWMgaGFzRFNUKHQgPSBTdC5kZWZhdWx0Wm9uZSkge1xuICAgIGNvbnN0IGUgPSBBcy5ub3coKS5zZXRab25lKHQpLnNldCh7IG1vbnRoOiAxMiB9KTtcbiAgICByZXR1cm4gIXQuaXNVbml2ZXJzYWwgJiYgZS5vZmZzZXQgIT09IGUuc2V0KHsgbW9udGg6IDYgfSkub2Zmc2V0O1xuICB9XG5cbiAgc3RhdGljIGlzVmFsaWRJQU5BWm9uZSh0KSB7XG4gICAgcmV0dXJuIHkuaXNWYWxpZFpvbmUodCk7XG4gIH1cblxuICBzdGF0aWMgbm9ybWFsaXplWm9uZSh0KSB7XG4gICAgcmV0dXJuIGd0KHQsIFN0LmRlZmF1bHRab25lKTtcbiAgfVxuXG4gIHN0YXRpYyBtb250aHMoXG4gICAgdCA9ICdsb25nJyxcbiAgICB7XG4gICAgICBsb2NhbGU6IGUsXG4gICAgICBsb2NPYmo6IHMsXG4gICAgICBudW1iZXJpbmdTeXN0ZW06IG4sXG4gICAgICBvdXRwdXRDYWxlbmRhcjogciA9ICdncmVnb3J5JyxcbiAgICB9ID0ge30sXG4gICkge1xuICAgIHJldHVybiAocyB8fCBsdC5jcmVhdGUoZSwgbiwgcikpLm1vbnRocyh0KTtcbiAgfVxuXG4gIHN0YXRpYyBtb250aHNGb3JtYXQoXG4gICAgdCA9ICdsb25nJyxcbiAgICB7XG4gICAgICBsb2NhbGU6IGUsXG4gICAgICBsb2NPYmo6IHMsXG4gICAgICBudW1iZXJpbmdTeXN0ZW06IG4sXG4gICAgICBvdXRwdXRDYWxlbmRhcjogciA9ICdncmVnb3J5JyxcbiAgICB9ID0ge30sXG4gICkge1xuICAgIHJldHVybiAocyB8fCBsdC5jcmVhdGUoZSwgbiwgcikpLm1vbnRocyh0LCAhMCk7XG4gIH1cblxuICBzdGF0aWMgd2Vla2RheXMoXG4gICAgdCA9ICdsb25nJyxcbiAgICB7IGxvY2FsZTogZSwgbG9jT2JqOiBzLCBudW1iZXJpbmdTeXN0ZW06IG4gfSA9IHt9LFxuICApIHtcbiAgICByZXR1cm4gKHMgfHwgbHQuY3JlYXRlKGUsIG4pKS53ZWVrZGF5cyh0KTtcbiAgfVxuXG4gIHN0YXRpYyB3ZWVrZGF5c0Zvcm1hdChcbiAgICB0ID0gJ2xvbmcnLFxuICAgIHsgbG9jYWxlOiBlLCBsb2NPYmo6IHMsIG51bWJlcmluZ1N5c3RlbTogbiB9ID0ge30sXG4gICkge1xuICAgIHJldHVybiAocyB8fCBsdC5jcmVhdGUoZSwgbikpLndlZWtkYXlzKHQsICEwKTtcbiAgfVxuXG4gIHN0YXRpYyBtZXJpZGllbXMoeyBsb2NhbGU6IHQgfSA9IHt9KSB7XG4gICAgcmV0dXJuIGx0LmNyZWF0ZSh0KS5tZXJpZGllbXMoKTtcbiAgfVxuXG4gIHN0YXRpYyBlcmFzKHQgPSAnc2hvcnQnLCB7IGxvY2FsZTogZSB9ID0ge30pIHtcbiAgICByZXR1cm4gbHQuY3JlYXRlKGUsIHZvaWQgMCwgJ2dyZWdvcnknKS5lcmFzKHQpO1xuICB9XG5cbiAgc3RhdGljIGZlYXR1cmVzKCkge1xuICAgIHJldHVybiB7IHJlbGF0aXZlOiBFdCgpIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gUWUodCwgZSkge1xuICBjb25zdCBzID0gdCA9PiB0LnRvVVRDKDAsIHsga2VlcExvY2FsVGltZTogITAgfSkuc3RhcnRPZignZGF5cycpLnZhbHVlT2YoKSxcbiAgICBuID0gcyhlKSAtIHModCk7XG4gIHJldHVybiBNYXRoLmZsb29yKFJlLmZyb21NaWxsaXMobikuYXMoJ2RheXMnKSk7XG59XG5cbmNvbnN0IEtlID0gKHQsIGUsIHMsIG4pID0+IHtcbiAgICBsZXQgW3IsIGksIGEsIG9dID0gKGZ1bmN0aW9uICh0LCBlLCBzKSB7XG4gICAgICBjb25zdCBuID0gW1xuICAgICAgICAgIFsneWVhcnMnLCAodCwgZSkgPT4gZS55ZWFyIC0gdC55ZWFyXSxcbiAgICAgICAgICBbJ3F1YXJ0ZXJzJywgKHQsIGUpID0+IGUucXVhcnRlciAtIHQucXVhcnRlciArIDQgKiAoZS55ZWFyIC0gdC55ZWFyKV0sXG4gICAgICAgICAgWydtb250aHMnLCAodCwgZSkgPT4gZS5tb250aCAtIHQubW9udGggKyAxMiAqIChlLnllYXIgLSB0LnllYXIpXSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICAnd2Vla3MnLFxuICAgICAgICAgICAgKHQsIGUpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcyA9IFFlKHQsIGUpO1xuICAgICAgICAgICAgICByZXR1cm4gKHMgLSAocyAlIDcpKSAvIDc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgWydkYXlzJywgUWVdLFxuICAgICAgICBdLFxuICAgICAgICByID0ge30sXG4gICAgICAgIGkgPSB0O1xuICAgICAgbGV0IGEsIG87XG4gICAgICBmb3IgKGNvbnN0IFt1LCBjXSBvZiBuKVxuICAgICAgICBzLmluZGV4T2YodSkgPj0gMCAmJlxuICAgICAgICAgICgoYSA9IHUpLFxuICAgICAgICAgIChyW3VdID0gYyh0LCBlKSksXG4gICAgICAgICAgKG8gPSBpLnBsdXMocikpLFxuICAgICAgICAgIG8gPiBlID8gKHJbdV0tLSwgKHQgPSBpLnBsdXMocikpKSA6ICh0ID0gbykpO1xuICAgICAgcmV0dXJuIFt0LCByLCBvLCBhXTtcbiAgICB9KSh0LCBlLCBzKTtcbiAgICBjb25zdCB1ID0gK2UgLSArcixcbiAgICAgIGMgPSBzLmZpbHRlcihcbiAgICAgICAgdCA9PiBbJ2hvdXJzJywgJ21pbnV0ZXMnLCAnc2Vjb25kcycsICdtaWxsaXNlY29uZHMnXS5pbmRleE9mKHQpID49IDAsXG4gICAgICApO1xuICAgIDAgPT09IGMubGVuZ3RoICYmXG4gICAgICAoYSA8IGUgJiYgKGEgPSByLnBsdXMoeyBbb106IDEgfSkpLFxuICAgICAgYSAhPT0gciAmJiAoaVtvXSA9IChpW29dIHx8IDApICsgdSAvICgrYSAtICtyKSkpO1xuICAgIGNvbnN0IGwgPSBSZS5mcm9tT2JqZWN0KGksIG4pO1xuICAgIHJldHVybiBjLmxlbmd0aCA+IDBcbiAgICAgID8gUmUuZnJvbU1pbGxpcyh1LCBuKVxuICAgICAgICAgIC5zaGlmdFRvKC4uLmMpXG4gICAgICAgICAgLnBsdXMobClcbiAgICAgIDogbDtcbiAgfSxcbiAgWGUgPSB7XG4gICAgYXJhYjogJ1vZoC3ZqV0nLFxuICAgIGFyYWJleHQ6ICdb27At27ldJyxcbiAgICBiYWxpOiAnW+GtkC3hrZldJyxcbiAgICBiZW5nOiAnW+Cnpi3gp69dJyxcbiAgICBkZXZhOiAnW+Clpi3gpa9dJyxcbiAgICBmdWxsd2lkZTogJ1vvvJAt77yZXScsXG4gICAgZ3VqcjogJ1vgq6Yt4KuvXScsXG4gICAgaGFuaWRlYzogJ1vjgId85LiAfOS6jHzkuIl85ZubfOS6lHzlha185LiDfOWFq3zkuZ1dJyxcbiAgICBraG1yOiAnW+GfoC3hn6ldJyxcbiAgICBrbmRhOiAnW+Czpi3gs69dJyxcbiAgICBsYW9vOiAnW+C7kC3gu5ldJyxcbiAgICBsaW1iOiAnW+Glhi3hpY9dJyxcbiAgICBtbHltOiAnW+C1pi3gta9dJyxcbiAgICBtb25nOiAnW+GgkC3hoJldJyxcbiAgICBteW1yOiAnW+GBgC3hgYldJyxcbiAgICBvcnlhOiAnW+Ctpi3gra9dJyxcbiAgICB0YW1sZGVjOiAnW+Cvpi3gr69dJyxcbiAgICB0ZWx1OiAnW+Cxpi3gsa9dJyxcbiAgICB0aGFpOiAnW+C5kC3guZldJyxcbiAgICB0aWJ0OiAnW+C8oC3gvKldJyxcbiAgICBsYXRuOiAnXFxcXGQnLFxuICB9LFxuICB0cyA9IHtcbiAgICBhcmFiOiBbMTYzMiwgMTY0MV0sXG4gICAgYXJhYmV4dDogWzE3NzYsIDE3ODVdLFxuICAgIGJhbGk6IFs2OTkyLCA3MDAxXSxcbiAgICBiZW5nOiBbMjUzNCwgMjU0M10sXG4gICAgZGV2YTogWzI0MDYsIDI0MTVdLFxuICAgIGZ1bGx3aWRlOiBbNjUyOTYsIDY1MzAzXSxcbiAgICBndWpyOiBbMjc5MCwgMjc5OV0sXG4gICAga2htcjogWzYxMTIsIDYxMjFdLFxuICAgIGtuZGE6IFszMzAyLCAzMzExXSxcbiAgICBsYW9vOiBbMzc5MiwgMzgwMV0sXG4gICAgbGltYjogWzY0NzAsIDY0NzldLFxuICAgIG1seW06IFszNDMwLCAzNDM5XSxcbiAgICBtb25nOiBbNjE2MCwgNjE2OV0sXG4gICAgbXltcjogWzQxNjAsIDQxNjldLFxuICAgIG9yeWE6IFsyOTE4LCAyOTI3XSxcbiAgICB0YW1sZGVjOiBbMzA0NiwgMzA1NV0sXG4gICAgdGVsdTogWzMxNzQsIDMxODNdLFxuICAgIHRoYWk6IFszNjY0LCAzNjczXSxcbiAgICB0aWJ0OiBbMzg3MiwgMzg4MV0sXG4gIH0sXG4gIGVzID0gWGUuaGFuaWRlYy5yZXBsYWNlKC9bXFxbfFxcXV0vZywgJycpLnNwbGl0KCcnKTtcblxuZnVuY3Rpb24gc3ModCwgZSA9ICcnKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKGAke1hlW3QubnVtYmVyaW5nU3lzdGVtIHx8ICdsYXRuJ119JHtlfWApO1xufVxuXG5mdW5jdGlvbiBucyh0LCBlID0gdCA9PiB0KSB7XG4gIHJldHVybiB7XG4gICAgcmVnZXg6IHQsXG4gICAgZGVzZXI6IChbdF0pID0+XG4gICAgICBlKFxuICAgICAgICAoZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICBjb25zdCBlID0gcGFyc2VJbnQodCwgMTApO1xuICAgICAgICAgIGlmICghaXNOYU4oZSkpIHJldHVybiBlO1xuICAgICAgICAgIGxldCBzID0gJyc7XG4gICAgICAgICAgZm9yIChsZXQgZSA9IDA7IGUgPCB0Lmxlbmd0aDsgZSsrKSB7XG4gICAgICAgICAgICBjb25zdCBuID0gdC5jaGFyQ29kZUF0KGUpO1xuICAgICAgICAgICAgaWYgKC0xICE9PSB0W2VdLnNlYXJjaChYZS5oYW5pZGVjKSkgcyArPSBlcy5pbmRleE9mKHRbZV0pO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHQgaW4gdHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBbZSwgcl0gPSB0c1t0XTtcbiAgICAgICAgICAgICAgICBpZiAobiA+PSBlICYmIG4gPD0gcikge1xuICAgICAgICAgICAgICAgICAgcyArPSBuIC0gZTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcGFyc2VJbnQocywgMTApO1xuICAgICAgICB9KSh0KSxcbiAgICAgICksXG4gIH07XG59XG5cbmNvbnN0IHJzID0gYFsgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKDE2MCl9XWAsXG4gIGlzID0gbmV3IFJlZ0V4cChycywgJ2cnKTtcblxuZnVuY3Rpb24gYXModCkge1xuICByZXR1cm4gdC5yZXBsYWNlKC9cXC4vZywgJ1xcXFwuPycpLnJlcGxhY2UoaXMsIHJzKTtcbn1cblxuZnVuY3Rpb24gb3ModCkge1xuICByZXR1cm4gdC5yZXBsYWNlKC9cXC4vZywgJycpLnJlcGxhY2UoaXMsICcgJykudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gdXModCwgZSkge1xuICByZXR1cm4ge1xuICAgIHJlZ2V4OiBSZWdFeHAodC5tYXAoYXMpLmpvaW4oJ3wnKSksXG4gICAgZGVzZXI6IChbc10pID0+IHQuZmluZEluZGV4KHQgPT4gb3MocykgPT09IG9zKHQpKSArIGUsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNzKHQsIGUpIHtcbiAgcmV0dXJuIHsgcmVnZXg6IHQsIGRlc2VyOiAoWywgdCwgZV0pID0+IFB0KHQsIGUpLCBncm91cHM6IGUgfTtcbn1cblxuZnVuY3Rpb24gbHModCkge1xuICByZXR1cm4geyByZWdleDogdCwgZGVzZXI6IChbdF0pID0+IHQgfTtcbn1cblxuY29uc3QgaHMgPSB7XG4gIHllYXI6IHsgJzItZGlnaXQnOiAneXknLCBudW1lcmljOiAneXl5eXknIH0sXG4gIG1vbnRoOiB7IG51bWVyaWM6ICdNJywgJzItZGlnaXQnOiAnTU0nLCBzaG9ydDogJ01NTScsIGxvbmc6ICdNTU1NJyB9LFxuICBkYXk6IHsgbnVtZXJpYzogJ2QnLCAnMi1kaWdpdCc6ICdkZCcgfSxcbiAgd2Vla2RheTogeyBzaG9ydDogJ0VFRScsIGxvbmc6ICdFRUVFJyB9LFxuICBob3VyOiB7IG51bWVyaWM6ICdoJywgJzItZGlnaXQnOiAnaGgnIH0sXG4gIG1pbnV0ZTogeyBudW1lcmljOiAnbScsICcyLWRpZ2l0JzogJ21tJyB9LFxuICBzZWNvbmQ6IHsgbnVtZXJpYzogJ3MnLCAnMi1kaWdpdCc6ICdzcycgfSxcbiAgdGltZVpvbmVOYW1lOiB7IGxvbmc6ICdaWlpaWicsIHNob3J0OiAnWlpaJyB9LFxufTtcbmxldCBkcztcblxuZnVuY3Rpb24gbXModCkge1xuICByZXR1cm4gISF0ICYmICEhdC5pbnZhbGlkUmVhc29uO1xufVxuXG5mdW5jdGlvbiBmcyh0LCBlKSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0KFxuICAgIC4uLnQubWFwKHQgPT5cbiAgICAgIChmdW5jdGlvbiAodCwgZSkge1xuICAgICAgICBpZiAodC5saXRlcmFsKSByZXR1cm4gdDtcbiAgICAgICAgY29uc3QgcyA9IGdzKHRlLm1hY3JvVG9rZW5Ub0Zvcm1hdE9wdHModC52YWwpLCBlKTtcbiAgICAgICAgcmV0dXJuIG51bGwgPT0gcyB8fCBzLmluY2x1ZGVzKHZvaWQgMCkgPyB0IDogcztcbiAgICAgIH0pKHQsIGUpLFxuICAgICksXG4gICk7XG59XG5cbmZ1bmN0aW9uIHlzKHQsIGUsIHMpIHtcbiAgY29uc3QgbiA9IGZzKHRlLnBhcnNlRm9ybWF0KHMpLCB0KSxcbiAgICByID0gbi5tYXAoZSA9PlxuICAgICAgKGZ1bmN0aW9uICh0LCBlKSB7XG4gICAgICAgIGNvbnN0IHMgPSBzcyhlKSxcbiAgICAgICAgICBuID0gc3MoZSwgJ3syfScpLFxuICAgICAgICAgIHIgPSBzcyhlLCAnezN9JyksXG4gICAgICAgICAgaSA9IHNzKGUsICd7NH0nKSxcbiAgICAgICAgICBhID0gc3MoZSwgJ3s2fScpLFxuICAgICAgICAgIG8gPSBzcyhlLCAnezEsMn0nKSxcbiAgICAgICAgICB1ID0gc3MoZSwgJ3sxLDN9JyksXG4gICAgICAgICAgYyA9IHNzKGUsICd7MSw2fScpLFxuICAgICAgICAgIGwgPSBzcyhlLCAnezEsOX0nKSxcbiAgICAgICAgICBoID0gc3MoZSwgJ3syLDR9JyksXG4gICAgICAgICAgZCA9IHNzKGUsICd7NCw2fScpLFxuICAgICAgICAgIG0gPSB0ID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHJlZ2V4OiBSZWdFeHAoXG4gICAgICAgICAgICAgICAgKChlID0gdC52YWwpLCBlLnJlcGxhY2UoL1tcXC1cXFtcXF17fSgpKis/LixcXFxcXFxeJHwjXFxzXS9nLCAnXFxcXCQmJykpLFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBkZXNlcjogKFt0XSkgPT4gdCxcbiAgICAgICAgICAgICAgbGl0ZXJhbDogITAsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmID0gKGYgPT4ge1xuICAgICAgICAgICAgaWYgKHQubGl0ZXJhbCkgcmV0dXJuIG0oZik7XG4gICAgICAgICAgICBzd2l0Y2ggKGYudmFsKSB7XG4gICAgICAgICAgICAgIGNhc2UgJ0cnOlxuICAgICAgICAgICAgICAgIHJldHVybiB1cyhlLmVyYXMoJ3Nob3J0JyksIDApO1xuICAgICAgICAgICAgICBjYXNlICdHRyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVzKGUuZXJhcygnbG9uZycpLCAwKTtcbiAgICAgICAgICAgICAgY2FzZSAneSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5zKGMpO1xuICAgICAgICAgICAgICBjYXNlICd5eSc6XG4gICAgICAgICAgICAgIGNhc2UgJ2trJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbnMoaCwgVXQpO1xuICAgICAgICAgICAgICBjYXNlICd5eXl5JzpcbiAgICAgICAgICAgICAgY2FzZSAna2trayc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5zKGkpO1xuICAgICAgICAgICAgICBjYXNlICd5eXl5eSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5zKGQpO1xuICAgICAgICAgICAgICBjYXNlICd5eXl5eXknOlxuICAgICAgICAgICAgICAgIHJldHVybiBucyhhKTtcbiAgICAgICAgICAgICAgY2FzZSAnTSc6XG4gICAgICAgICAgICAgIGNhc2UgJ0wnOlxuICAgICAgICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgICAgY2FzZSAnSCc6XG4gICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgY2FzZSAncSc6XG4gICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICBjYXNlICdXJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbnMobyk7XG4gICAgICAgICAgICAgIGNhc2UgJ01NJzpcbiAgICAgICAgICAgICAgY2FzZSAnTEwnOlxuICAgICAgICAgICAgICBjYXNlICdkZCc6XG4gICAgICAgICAgICAgIGNhc2UgJ0hIJzpcbiAgICAgICAgICAgICAgY2FzZSAnaGgnOlxuICAgICAgICAgICAgICBjYXNlICdtbSc6XG4gICAgICAgICAgICAgIGNhc2UgJ3FxJzpcbiAgICAgICAgICAgICAgY2FzZSAnc3MnOlxuICAgICAgICAgICAgICBjYXNlICdXVyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5zKG4pO1xuICAgICAgICAgICAgICBjYXNlICdNTU0nOlxuICAgICAgICAgICAgICAgIHJldHVybiB1cyhlLm1vbnRocygnc2hvcnQnLCAhMCksIDEpO1xuICAgICAgICAgICAgICBjYXNlICdNTU1NJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdXMoZS5tb250aHMoJ2xvbmcnLCAhMCksIDEpO1xuICAgICAgICAgICAgICBjYXNlICdMTEwnOlxuICAgICAgICAgICAgICAgIHJldHVybiB1cyhlLm1vbnRocygnc2hvcnQnLCAhMSksIDEpO1xuICAgICAgICAgICAgICBjYXNlICdMTExMJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdXMoZS5tb250aHMoJ2xvbmcnLCAhMSksIDEpO1xuICAgICAgICAgICAgICBjYXNlICdvJzpcbiAgICAgICAgICAgICAgY2FzZSAnUyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5zKHUpO1xuICAgICAgICAgICAgICBjYXNlICdvb28nOlxuICAgICAgICAgICAgICBjYXNlICdTU1MnOlxuICAgICAgICAgICAgICAgIHJldHVybiBucyhyKTtcbiAgICAgICAgICAgICAgY2FzZSAndSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxzKGwpO1xuICAgICAgICAgICAgICBjYXNlICdhJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdXMoZS5tZXJpZGllbXMoKSwgMCk7XG4gICAgICAgICAgICAgIGNhc2UgJ0UnOlxuICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbnMocyk7XG4gICAgICAgICAgICAgIGNhc2UgJ0VFRSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVzKGUud2Vla2RheXMoJ3Nob3J0JywgITEpLCAxKTtcbiAgICAgICAgICAgICAgY2FzZSAnRUVFRSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVzKGUud2Vla2RheXMoJ2xvbmcnLCAhMSksIDEpO1xuICAgICAgICAgICAgICBjYXNlICdjY2MnOlxuICAgICAgICAgICAgICAgIHJldHVybiB1cyhlLndlZWtkYXlzKCdzaG9ydCcsICEwKSwgMSk7XG4gICAgICAgICAgICAgIGNhc2UgJ2NjY2MnOlxuICAgICAgICAgICAgICAgIHJldHVybiB1cyhlLndlZWtkYXlzKCdsb25nJywgITApLCAxKTtcbiAgICAgICAgICAgICAgY2FzZSAnWic6XG4gICAgICAgICAgICAgIGNhc2UgJ1paJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gY3MoXG4gICAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKGAoWystXSR7by5zb3VyY2V9KSg/OjooJHtuLnNvdXJjZX0pKT9gKSxcbiAgICAgICAgICAgICAgICAgIDIsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgY2FzZSAnWlpaJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gY3MobmV3IFJlZ0V4cChgKFsrLV0ke28uc291cmNlfSkoJHtuLnNvdXJjZX0pP2ApLCAyKTtcbiAgICAgICAgICAgICAgY2FzZSAneic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxzKC9bYS16XystL117MSwyNTZ9Py9pKTtcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbShmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSh0KSB8fCB7XG4gICAgICAgICAgICBpbnZhbGlkUmVhc29uOiAnbWlzc2luZyBJbnRsLkRhdGVUaW1lRm9ybWF0LmZvcm1hdFRvUGFydHMgc3VwcG9ydCcsXG4gICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZiksIHsgdG9rZW46IHQgfSk7XG4gICAgICB9KShlLCB0KSxcbiAgICApLFxuICAgIGkgPSByLmZpbmQobXMpO1xuICBpZiAoaSkgcmV0dXJuIHsgaW5wdXQ6IGUsIHRva2VuczogbiwgaW52YWxpZFJlYXNvbjogaS5pbnZhbGlkUmVhc29uIH07XG4gIHtcbiAgICBjb25zdCB0ID0gKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiBgXiR7dFxuICAgICAgICAgIC5tYXAodCA9PiB0LnJlZ2V4KVxuICAgICAgICAgIC5yZWR1Y2UoKHQsIGUpID0+IGAke3R9KCR7ZS5zb3VyY2V9KWAsICcnKX0kYDtcbiAgICAgIH0pKHIpLFxuICAgICAgcyA9IFJlZ0V4cCh0LCAnaScpLFxuICAgICAgW2ksIG9dID0gKGZ1bmN0aW9uICh0LCBlLCBzKSB7XG4gICAgICAgIGNvbnN0IG4gPSBlLmV4ZWModCksXG4gICAgICAgICAgciA9IHt9O1xuICAgICAgICBpZiAobnVsbCAhPT0gbikge1xuICAgICAgICAgIGxldCB0ID0gMTtcbiAgICAgICAgICBzLmZvckVhY2goZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzID0gZS5ncm91cHMgPyBlLmdyb3VwcyArIDEgOiAxO1xuICAgICAgICAgICAgZS5saXRlcmFsIHx8IChyW2UudG9rZW4udmFsWzBdXSA9IGUuZGVzZXIobi5zbGljZSh0LCB0ICsgcykpKSxcbiAgICAgICAgICAgICAgKHQgKz0gcyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtuLCByXTtcbiAgICAgIH0pKGUsIHMsIHIpLFxuICAgICAgW3UsIGMsIGxdID0gb1xuICAgICAgICA/IChmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgbGV0IGUsXG4gICAgICAgICAgICAgIHMgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAga3QodC56KSAmJiAocyA9IHkuY3JlYXRlKHQueikpLFxuICAgICAgICAgICAgICBrdCh0LlopICYmIChzIHx8IChzID0gbmV3IGR0KCt0LlopKSwgKGUgPSArdC5aKSksXG4gICAgICAgICAgICAgIE10KHQucSkgfHwgKHQuTSA9IDMgKiAodC5xIC0gMSkgKyAxKSxcbiAgICAgICAgICAgICAgTXQodC5oKSB8fFxuICAgICAgICAgICAgICAgICh0LmggPCAxMiAmJiAxID09PSB0LmFcbiAgICAgICAgICAgICAgICAgID8gKHQuaCA9IHQuaCArIDEyKVxuICAgICAgICAgICAgICAgICAgOiAxMiA9PT0gdC5oICYmIDAgPT09IHQuYSAmJiAodC5oID0gMCkpLFxuICAgICAgICAgICAgICAwID09PSB0LkcgJiYgdC55ICYmICh0LnkgPSAtdC55KSxcbiAgICAgICAgICAgICAgTXQodC51KSB8fCAodC5TID0gRnQodC51KSB8fCAwKSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHQpLnJlZHVjZSgoZSwgcykgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgbiA9ICh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSAnUyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ21pbGxpc2Vjb25kJztcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnc2Vjb25kJztcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnbWludXRlJztcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlICdIJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnaG91cic7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2RheSc7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ29yZGluYWwnO1xuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0wnOlxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdtb250aCc7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSAneSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3llYXInO1xuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0UnOlxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd3ZWVrZGF5JztcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlICdXJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnd2Vla051bWJlcic7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSAnayc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3dlZWtZZWFyJztcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlICdxJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAncXVhcnRlcic7XG4gICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KShzKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBuICYmIChlW25dID0gdFtzXSksIGU7XG4gICAgICAgICAgICAgICAgfSwge30pLFxuICAgICAgICAgICAgICAgIHMsXG4gICAgICAgICAgICAgICAgZSxcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KShvKVxuICAgICAgICA6IFtudWxsLCBudWxsLCB2b2lkIDBdO1xuICAgIGlmICgnYScgaW4gbyAmJiAnSCcgaW4gbylcbiAgICAgIHRocm93IG5ldyBhKFwiQ2FuJ3QgaW5jbHVkZSBtZXJpZGllbSB3aGVuIHNwZWNpZnlpbmcgMjQtaG91ciBmb3JtYXRcIik7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlucHV0OiBlLFxuICAgICAgdG9rZW5zOiBuLFxuICAgICAgcmVnZXg6IHMsXG4gICAgICByYXdNYXRjaGVzOiBpLFxuICAgICAgbWF0Y2hlczogbyxcbiAgICAgIHJlc3VsdDogdSxcbiAgICAgIHpvbmU6IGMsXG4gICAgICBzcGVjaWZpY09mZnNldDogbCxcbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIGdzKHQsIGUpIHtcbiAgaWYgKCF0KSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIHRlXG4gICAgLmNyZWF0ZShlLCB0KVxuICAgIC5mb3JtYXREYXRlVGltZVBhcnRzKFxuICAgICAgKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgdm9pZCAwID09PSBkcyAmJlxuICAgICAgICAgICAgKGRzID0gQXMuZnJvbU1pbGxpcygxNTU1NTU1NTU1NTU1LCB7IGxvY2FsZTogdC5sb2NhbGUgfSkpLFxuICAgICAgICAgIGRzXG4gICAgICAgICk7XG4gICAgICB9KShlKSxcbiAgICApXG4gICAgLm1hcChlID0+XG4gICAgICAoZnVuY3Rpb24gKHQsIGUpIHtcbiAgICAgICAgY29uc3QgeyB0eXBlOiBzLCB2YWx1ZTogbiB9ID0gdDtcbiAgICAgICAgaWYgKCdsaXRlcmFsJyA9PT0gcykgcmV0dXJuIHsgbGl0ZXJhbDogITAsIHZhbDogbiB9O1xuICAgICAgICBpZiAoJ2RheVBlcmlvZCcgPT09IHMpIHJldHVybiB7IGxpdGVyYWw6ICExLCB2YWw6ICdhJyB9O1xuICAgICAgICBjb25zdCByID0gaHNbc107XG4gICAgICAgIGlmICh2b2lkIDAgIT09IHIpIHtcbiAgICAgICAgICBjb25zdCB0ID0gZVtzXTtcbiAgICAgICAgICBpZiAodCkge1xuICAgICAgICAgICAgY29uc3QgZSA9IHJbdF07XG4gICAgICAgICAgICBpZiAodm9pZCAwICE9PSBlKSByZXR1cm4geyBsaXRlcmFsOiAhMSwgdmFsOiBlIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KShlLCB0KSxcbiAgICApO1xufVxuXG5jb25zdCBfcyA9IFswLCAzMSwgNTksIDkwLCAxMjAsIDE1MSwgMTgxLCAyMTIsIDI0MywgMjczLCAzMDQsIDMzNF0sXG4gIHBzID0gWzAsIDMxLCA2MCwgOTEsIDEyMSwgMTUyLCAxODIsIDIxMywgMjQ0LCAyNzQsIDMwNSwgMzM1XTtcblxuZnVuY3Rpb24gd3ModCwgZSkge1xuICByZXR1cm4gbmV3IEFlKFxuICAgICd1bml0IG91dCBvZiByYW5nZScsXG4gICAgYHlvdSBzcGVjaWZpZWQgJHtlfSAob2YgdHlwZSAke3R5cGVvZiBlfSkgYXMgYSAke3R9LCB3aGljaCBpcyBpbnZhbGlkYCxcbiAgKTtcbn1cblxuZnVuY3Rpb24gT3ModCwgZSwgcykge1xuICBjb25zdCBuID0gbmV3IERhdGUoRGF0ZS5VVEModCwgZSAtIDEsIHMpKTtcbiAgdCA8IDEwMCAmJiB0ID49IDAgJiYgbi5zZXRVVENGdWxsWWVhcihuLmdldFVUQ0Z1bGxZZWFyKCkgLSAxOTAwKTtcbiAgY29uc3QgciA9IG4uZ2V0VVRDRGF5KCk7XG4gIHJldHVybiAwID09PSByID8gNyA6IHI7XG59XG5cbmZ1bmN0aW9uIGJzKHQsIGUsIHMpIHtcbiAgcmV0dXJuIHMgKyAoJHQodCkgPyBwcyA6IF9zKVtlIC0gMV07XG59XG5cbmZ1bmN0aW9uIHZzKHQsIGUpIHtcbiAgY29uc3QgcyA9ICR0KHQpID8gcHMgOiBfcyxcbiAgICBuID0gcy5maW5kSW5kZXgodCA9PiB0IDwgZSk7XG4gIHJldHVybiB7IG1vbnRoOiBuICsgMSwgZGF5OiBlIC0gc1tuXSB9O1xufVxuXG5mdW5jdGlvbiBUcyh0KSB7XG4gIGNvbnN0IHsgeWVhcjogZSwgbW9udGg6IHMsIGRheTogbiB9ID0gdCxcbiAgICByID0gYnMoZSwgcywgbiksXG4gICAgaSA9IE9zKGUsIHMsIG4pO1xuICBsZXQgYSxcbiAgICBvID0gTWF0aC5mbG9vcigociAtIGkgKyAxMCkgLyA3KTtcbiAgcmV0dXJuIChcbiAgICBvIDwgMVxuICAgICAgPyAoKGEgPSBlIC0gMSksIChvID0gQXQoYSkpKVxuICAgICAgOiBvID4gQXQoZSlcbiAgICAgID8gKChhID0gZSArIDEpLCAobyA9IDEpKVxuICAgICAgOiAoYSA9IGUpLFxuICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICB7XG4gICAgICAgIHdlZWtZZWFyOiBhLFxuICAgICAgICB3ZWVrTnVtYmVyOiBvLFxuICAgICAgICB3ZWVrZGF5OiBpLFxuICAgICAgfSxcbiAgICAgIEp0KHQpLFxuICAgIClcbiAgKTtcbn1cblxuZnVuY3Rpb24gU3ModCkge1xuICBjb25zdCB7IHdlZWtZZWFyOiBlLCB3ZWVrTnVtYmVyOiBzLCB3ZWVrZGF5OiBuIH0gPSB0LFxuICAgIHIgPSBPcyhlLCAxLCA0KSxcbiAgICBpID0gTHQoZSk7XG4gIGxldCBhLFxuICAgIG8gPSA3ICogcyArIG4gLSByIC0gMztcbiAgbyA8IDFcbiAgICA/ICgoYSA9IGUgLSAxKSwgKG8gKz0gTHQoYSkpKVxuICAgIDogbyA+IGlcbiAgICA/ICgoYSA9IGUgKyAxKSwgKG8gLT0gTHQoZSkpKVxuICAgIDogKGEgPSBlKTtcbiAgY29uc3QgeyBtb250aDogdSwgZGF5OiBjIH0gPSB2cyhhLCBvKTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyB5ZWFyOiBhLCBtb250aDogdSwgZGF5OiBjIH0sIEp0KHQpKTtcbn1cblxuZnVuY3Rpb24ga3ModCkge1xuICBjb25zdCB7IHllYXI6IGUsIG1vbnRoOiBzLCBkYXk6IG4gfSA9IHQsXG4gICAgciA9IGJzKGUsIHMsIG4pO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7IHllYXI6IGUsIG9yZGluYWw6IHIgfSwgSnQodCkpO1xufVxuXG5mdW5jdGlvbiBNcyh0KSB7XG4gIGNvbnN0IHsgeWVhcjogZSwgb3JkaW5hbDogcyB9ID0gdCxcbiAgICB7IG1vbnRoOiBuLCBkYXk6IHIgfSA9IHZzKGUsIHMpO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7IHllYXI6IGUsIG1vbnRoOiBuLCBkYXk6IHIgfSwgSnQodCkpO1xufVxuXG5mdW5jdGlvbiBOcyh0KSB7XG4gIGNvbnN0IGUgPSBEdCh0LnllYXIpLFxuICAgIHMgPSB4dCh0Lm1vbnRoLCAxLCAxMiksXG4gICAgbiA9IHh0KHQuZGF5LCAxLCB6dCh0LnllYXIsIHQubW9udGgpKTtcbiAgcmV0dXJuIGVcbiAgICA/IHNcbiAgICAgID8gIW4gJiYgd3MoJ2RheScsIHQuZGF5KVxuICAgICAgOiB3cygnbW9udGgnLCB0Lm1vbnRoKVxuICAgIDogd3MoJ3llYXInLCB0LnllYXIpO1xufVxuXG5mdW5jdGlvbiBEcyh0KSB7XG4gIGNvbnN0IHsgaG91cjogZSwgbWludXRlOiBzLCBzZWNvbmQ6IG4sIG1pbGxpc2Vjb25kOiByIH0gPSB0LFxuICAgIGkgPSB4dChlLCAwLCAyMykgfHwgKDI0ID09PSBlICYmIDAgPT09IHMgJiYgMCA9PT0gbiAmJiAwID09PSByKSxcbiAgICBhID0geHQocywgMCwgNTkpLFxuICAgIG8gPSB4dChuLCAwLCA1OSksXG4gICAgdSA9IHh0KHIsIDAsIDk5OSk7XG4gIHJldHVybiBpXG4gICAgPyBhXG4gICAgICA/IG9cbiAgICAgICAgPyAhdSAmJiB3cygnbWlsbGlzZWNvbmQnLCByKVxuICAgICAgICA6IHdzKCdzZWNvbmQnLCBuKVxuICAgICAgOiB3cygnbWludXRlJywgcylcbiAgICA6IHdzKCdob3VyJywgZSk7XG59XG5cbmZ1bmN0aW9uIEVzKHQsIGUsIHMpIHtcbiAgbGV0IG4gPSB0IC0gNjAgKiBlICogMWUzO1xuICBjb25zdCByID0gcy5vZmZzZXQobik7XG4gIGlmIChlID09PSByKSByZXR1cm4gW24sIGVdO1xuICBuIC09IDYwICogKHIgLSBlKSAqIDFlMztcbiAgY29uc3QgaSA9IHMub2Zmc2V0KG4pO1xuICByZXR1cm4gciA9PT0gaSA/IFtuLCByXSA6IFt0IC0gNjAgKiBNYXRoLm1pbihyLCBpKSAqIDFlMywgTWF0aC5tYXgociwgaSldO1xufVxuXG5mdW5jdGlvbiBqcyh0LCBlKSB7XG4gIGNvbnN0IHMgPSBuZXcgRGF0ZSgodCArPSA2MCAqIGUgKiAxZTMpKTtcbiAgcmV0dXJuIHtcbiAgICB5ZWFyOiBzLmdldFVUQ0Z1bGxZZWFyKCksXG4gICAgbW9udGg6IHMuZ2V0VVRDTW9udGgoKSArIDEsXG4gICAgZGF5OiBzLmdldFVUQ0RhdGUoKSxcbiAgICBob3VyOiBzLmdldFVUQ0hvdXJzKCksXG4gICAgbWludXRlOiBzLmdldFVUQ01pbnV0ZXMoKSxcbiAgICBzZWNvbmQ6IHMuZ2V0VVRDU2Vjb25kcygpLFxuICAgIG1pbGxpc2Vjb25kOiBzLmdldFVUQ01pbGxpc2Vjb25kcygpLFxuICB9O1xufVxuXG5mdW5jdGlvbiB4cyh0LCBlLCBzKSB7XG4gIHJldHVybiBFcyhxdCh0KSwgZSwgcyk7XG59XG5cbmZ1bmN0aW9uIElzKHQsIGUsIHMsIG4sIHIsIGkpIHtcbiAgY29uc3QgeyBzZXRab25lOiBhLCB6b25lOiBvIH0gPSBzO1xuICBpZiAodCAmJiBPYmplY3Qua2V5cyh0KS5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgbiA9IGUgfHwgbyxcbiAgICAgIHIgPSBBcy5mcm9tT2JqZWN0KFxuICAgICAgICB0LFxuICAgICAgICBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHMpLCB7IHpvbmU6IG4sIHNwZWNpZmljT2Zmc2V0OiBpIH0pLFxuICAgICAgKTtcbiAgICByZXR1cm4gYSA/IHIgOiByLnNldFpvbmUobyk7XG4gIH1cbiAgcmV0dXJuIEFzLmludmFsaWQoXG4gICAgbmV3IEFlKCd1bnBhcnNhYmxlJywgYHRoZSBpbnB1dCBcIiR7cn1cIiBjYW4ndCBiZSBwYXJzZWQgYXMgJHtufWApLFxuICApO1xufVxuXG5mdW5jdGlvbiBWcyh0LCBlLCBzID0gITApIHtcbiAgcmV0dXJuIHQuaXNWYWxpZFxuICAgID8gdGVcbiAgICAgICAgLmNyZWF0ZShsdC5jcmVhdGUoJ2VuLVVTJyksIHsgYWxsb3daOiBzLCBmb3JjZVNpbXBsZTogITAgfSlcbiAgICAgICAgLmZvcm1hdERhdGVUaW1lRnJvbVN0cmluZyh0LCBlKVxuICAgIDogbnVsbDtcbn1cblxuY29uc3QgQ3MgPSB7XG4gICAgeWVhcjogMCxcbiAgICBtb250aDogMSxcbiAgICBkYXk6IDEsXG4gICAgaG91cjogMCxcbiAgICBtaW51dGU6IDAsXG4gICAgc2Vjb25kOiAwLFxuICAgIG1pbGxpc2Vjb25kOiAwLFxuICB9LFxuICBGcyA9IHtcbiAgICB3ZWVrTnVtYmVyOiAxLFxuICAgIHdlZWtkYXk6IDEsXG4gICAgaG91cjogMCxcbiAgICBtaW51dGU6IDAsXG4gICAgc2Vjb25kOiAwLFxuICAgIG1pbGxpc2Vjb25kOiAwLFxuICB9LFxuICBacyA9IHsgb3JkaW5hbDogMSwgaG91cjogMCwgbWludXRlOiAwLCBzZWNvbmQ6IDAsIG1pbGxpc2Vjb25kOiAwIH0sXG4gICRzID0gWyd5ZWFyJywgJ21vbnRoJywgJ2RheScsICdob3VyJywgJ21pbnV0ZScsICdzZWNvbmQnLCAnbWlsbGlzZWNvbmQnXSxcbiAgTHMgPSBbXG4gICAgJ3dlZWtZZWFyJyxcbiAgICAnd2Vla051bWJlcicsXG4gICAgJ3dlZWtkYXknLFxuICAgICdob3VyJyxcbiAgICAnbWludXRlJyxcbiAgICAnc2Vjb25kJyxcbiAgICAnbWlsbGlzZWNvbmQnLFxuICBdLFxuICB6cyA9IFsneWVhcicsICdvcmRpbmFsJywgJ2hvdXInLCAnbWludXRlJywgJ3NlY29uZCcsICdtaWxsaXNlY29uZCddO1xuXG5mdW5jdGlvbiBxcyh0KSB7XG4gIGNvbnN0IGUgPSB7XG4gICAgeWVhcjogJ3llYXInLFxuICAgIHllYXJzOiAneWVhcicsXG4gICAgcXVhcnRlcjogJ3F1YXJ0ZXInLFxuICAgIHF1YXJ0ZXJzOiAncXVhcnRlcicsXG4gICAgbW9udGg6ICdtb250aCcsXG4gICAgbW9udGhzOiAnbW9udGgnLFxuICAgIGRheTogJ2RheScsXG4gICAgZGF5czogJ2RheScsXG4gICAgaG91cjogJ2hvdXInLFxuICAgIGhvdXJzOiAnaG91cicsXG4gICAgbWludXRlOiAnbWludXRlJyxcbiAgICBtaW51dGVzOiAnbWludXRlJyxcbiAgICBzZWNvbmQ6ICdzZWNvbmQnLFxuICAgIHNlY29uZHM6ICdzZWNvbmQnLFxuICAgIG1pbGxpc2Vjb25kOiAnbWlsbGlzZWNvbmQnLFxuICAgIG1pbGxpc2Vjb25kczogJ21pbGxpc2Vjb25kJyxcbiAgICB3ZWVrZGF5OiAnd2Vla2RheScsXG4gICAgd2Vla2RheXM6ICd3ZWVrZGF5JyxcbiAgICB3ZWVrbnVtYmVyOiAnd2Vla051bWJlcicsXG4gICAgd2Vla3NudW1iZXI6ICd3ZWVrTnVtYmVyJyxcbiAgICB3ZWVrbnVtYmVyczogJ3dlZWtOdW1iZXInLFxuICAgIHdlZWt5ZWFyOiAnd2Vla1llYXInLFxuICAgIHdlZWt5ZWFyczogJ3dlZWtZZWFyJyxcbiAgICBvcmRpbmFsOiAnb3JkaW5hbCcsXG4gIH1bdC50b0xvd2VyQ2FzZSgpXTtcbiAgaWYgKCFlKSB0aHJvdyBuZXcgcih0KTtcbiAgcmV0dXJuIGU7XG59XG5cbmNsYXNzIEFzIHtcbiAgY29uc3RydWN0b3IodCkge1xuICAgIGNvbnN0IGUgPSB0LnpvbmUgfHwgU3QuZGVmYXVsdFpvbmU7XG4gICAgbGV0IHMsXG4gICAgICBuLFxuICAgICAgciA9XG4gICAgICAgIHQuaW52YWxpZCB8fFxuICAgICAgICAoTnVtYmVyLmlzTmFOKHQudHMpID8gbmV3IEFlKCdpbnZhbGlkIHRpbWVzdGFtcCcpIDogbnVsbCkgfHxcbiAgICAgICAgKGUuaXNWYWxpZCA/IG51bGwgOiBBcy5fdW5zdXBwb3J0ZWRab25lKGUpKTtcbiAgICBpZiAoKCh0aGlzLl90cyA9IE10KHQudHMpID8gU3Qubm93KCkgOiB0LnRzKSwgIXIpKSB7XG4gICAgICBpZiAoISF0Lm9sZCAmJiB0Lm9sZC50cyA9PT0gdGhpcy5fdHMgJiYgdC5vbGQuem9uZS5lcXVhbHMoZSkpXG4gICAgICAgIFtuLCBzXSA9IFt0Lm9sZC5jLCB0Lm9sZC5vXTtcbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCB0ID0gZS5vZmZzZXQodGhpcy5fdHMpO1xuICAgICAgICAobiA9IGpzKHRoaXMuX3RzLCB0KSksXG4gICAgICAgICAgKHIgPSBOdW1iZXIuaXNOYU4obi55ZWFyKSA/IG5ldyBBZSgnaW52YWxpZCBpbnB1dCcpIDogbnVsbCksXG4gICAgICAgICAgKG4gPSByID8gdm9pZCAwIDogbiksXG4gICAgICAgICAgKHMgPSByID8gdm9pZCAwIDogdCk7XG4gICAgICB9XG4gICAgfVxuICAgICh0aGlzLl96b25lID0gZSksXG4gICAgICAodGhpcy5fbG9jID0gdC5sb2MgfHwgbHQuY3JlYXRlKCkpLFxuICAgICAgKHRoaXMuX2ludmFsaWQgPSByKSxcbiAgICAgICh0aGlzLl93ZWVrRGF0YSA9IG51bGwpLFxuICAgICAgKHRoaXMuX2MgPSBuKSxcbiAgICAgICh0aGlzLl9vID0gcyksXG4gICAgICAodGhpcy5faXNMdXhvbkRhdGVUaW1lID0gITApO1xuICB9XG5cbiAgZ2V0IGludmFsaWRFeHBsYW5hdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5faW52YWxpZCA/IHRoaXMuX2ludmFsaWQuZXhwbGFuYXRpb24gOiB2b2lkIDA7XG4gIH1cblxuICBnZXQgaW52YWxpZFJlYXNvbigpIHtcbiAgICByZXR1cm4gdGhpcy5faW52YWxpZCA/IHRoaXMuX2ludmFsaWQucmVhc29uIDogdm9pZCAwO1xuICB9XG5cbiAgZ2V0IGlzVmFsaWQoKSB7XG4gICAgcmV0dXJuIG51bGwgPT09IHRoaXMuX2ludmFsaWQ7XG4gIH1cblxuICBnZXQgbG9jKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLl9sb2MuY2xvbmUoKSA6IHZvaWQgMDtcbiAgfVxuXG4gIGdldCBsb2NhbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMuX2xvYy5sb2NhbGUgOiB2b2lkIDA7XG4gIH1cblxuICBnZXQgbnVtYmVyaW5nU3lzdGVtKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLl9sb2MubnVtYmVyaW5nU3lzdGVtIDogdm9pZCAwO1xuICB9XG5cbiAgZ2V0IG91dHB1dENhbGVuZGFyKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLl9sb2Mub3V0cHV0Q2FsZW5kYXIgOiB2b2lkIDA7XG4gIH1cblxuICBnZXQgem9uZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fem9uZTtcbiAgfVxuXG4gIGdldCB6b25lTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy56b25lLm5hbWUgOiBudWxsO1xuICB9XG5cbiAgZ2V0IHllYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMuX2MueWVhciA6IE5hTjtcbiAgfVxuXG4gIGdldCBxdWFydGVyKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyBNYXRoLmNlaWwodGhpcy5fYy5tb250aCAvIDMpIDogTmFOO1xuICB9XG5cbiAgZ2V0IG1vbnRoKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLl9jLm1vbnRoIDogTmFOO1xuICB9XG5cbiAgZ2V0IGRheSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy5fYy5kYXkgOiBOYU47XG4gIH1cblxuICBnZXQgaG91cigpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy5fYy5ob3VyIDogTmFOO1xuICB9XG5cbiAgZ2V0IG1pbnV0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy5fYy5taW51dGUgOiBOYU47XG4gIH1cblxuICBnZXQgc2Vjb25kKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLl9jLnNlY29uZCA6IE5hTjtcbiAgfVxuXG4gIGdldCBtaWxsaXNlY29uZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy5fYy5taWxsaXNlY29uZCA6IE5hTjtcbiAgfVxuXG4gIGdldCB3ZWVrWWVhcigpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy5fcG9zc2libHlDYWNoZWRXZWVrRGF0YSh0aGlzKS53ZWVrWWVhciA6IE5hTjtcbiAgfVxuXG4gIGdldCB3ZWVrTnVtYmVyKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLl9wb3NzaWJseUNhY2hlZFdlZWtEYXRhKHRoaXMpLndlZWtOdW1iZXIgOiBOYU47XG4gIH1cblxuICBnZXQgd2Vla2RheSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy5fcG9zc2libHlDYWNoZWRXZWVrRGF0YSh0aGlzKS53ZWVrZGF5IDogTmFOO1xuICB9XG5cbiAgZ2V0IG9yZGluYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IGtzKHRoaXMuX2MpLm9yZGluYWwgOiBOYU47XG4gIH1cblxuICBnZXQgbW9udGhTaG9ydCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkXG4gICAgICA/IEJlLm1vbnRocygnc2hvcnQnLCB7IGxvY09iajogdGhpcy5fbG9jIH0pW3RoaXMubW9udGggLSAxXVxuICAgICAgOiBudWxsO1xuICB9XG5cbiAgZ2V0IG1vbnRoTG9uZygpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkXG4gICAgICA/IEJlLm1vbnRocygnbG9uZycsIHsgbG9jT2JqOiB0aGlzLl9sb2MgfSlbdGhpcy5tb250aCAtIDFdXG4gICAgICA6IG51bGw7XG4gIH1cblxuICBnZXQgd2Vla2RheVNob3J0KCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWRcbiAgICAgID8gQmUud2Vla2RheXMoJ3Nob3J0JywgeyBsb2NPYmo6IHRoaXMuX2xvYyB9KVt0aGlzLndlZWtkYXkgLSAxXVxuICAgICAgOiBudWxsO1xuICB9XG5cbiAgZ2V0IHdlZWtkYXlMb25nKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWRcbiAgICAgID8gQmUud2Vla2RheXMoJ2xvbmcnLCB7IGxvY09iajogdGhpcy5fbG9jIH0pW3RoaXMud2Vla2RheSAtIDFdXG4gICAgICA6IG51bGw7XG4gIH1cblxuICBnZXQgb2Zmc2V0KCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyArdGhpcy5fbyA6IE5hTjtcbiAgfVxuXG4gIGdldCBvZmZzZXROYW1lU2hvcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZFxuICAgICAgPyB0aGlzLnpvbmUub2Zmc2V0TmFtZSh0aGlzLl90cywgeyBmb3JtYXQ6ICdzaG9ydCcsIGxvY2FsZTogdGhpcy5sb2NhbGUgfSlcbiAgICAgIDogbnVsbDtcbiAgfVxuXG4gIGdldCBvZmZzZXROYW1lTG9uZygpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkXG4gICAgICA/IHRoaXMuem9uZS5vZmZzZXROYW1lKHRoaXMuX3RzLCB7IGZvcm1hdDogJ2xvbmcnLCBsb2NhbGU6IHRoaXMubG9jYWxlIH0pXG4gICAgICA6IG51bGw7XG4gIH1cblxuICBnZXQgaXNPZmZzZXRGaXhlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy56b25lLmlzVW5pdmVyc2FsIDogbnVsbDtcbiAgfVxuXG4gIGdldCBpc0luRFNUKCkge1xuICAgIHJldHVybiAoXG4gICAgICAhdGhpcy5pc09mZnNldEZpeGVkICYmXG4gICAgICAodGhpcy5vZmZzZXQgPlxuICAgICAgICB0aGlzLnNldCh7XG4gICAgICAgICAgbW9udGg6IDEsXG4gICAgICAgICAgZGF5OiAxLFxuICAgICAgICB9KS5vZmZzZXQgfHxcbiAgICAgICAgdGhpcy5vZmZzZXQgPiB0aGlzLnNldCh7IG1vbnRoOiA1IH0pLm9mZnNldClcbiAgICApO1xuICB9XG5cbiAgZ2V0IGlzSW5MZWFwWWVhcigpIHtcbiAgICByZXR1cm4gJHQodGhpcy55ZWFyKTtcbiAgfVxuXG4gIGdldCBkYXlzSW5Nb250aCgpIHtcbiAgICByZXR1cm4genQodGhpcy55ZWFyLCB0aGlzLm1vbnRoKTtcbiAgfVxuXG4gIGdldCBkYXlzSW5ZZWFyKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyBMdCh0aGlzLnllYXIpIDogTmFOO1xuICB9XG5cbiAgZ2V0IHdlZWtzSW5XZWVrWWVhcigpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gQXQodGhpcy53ZWVrWWVhcikgOiBOYU47XG4gIH1cblxuICBnZXQgdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RzO1xuICB9XG5cbiAgc3RhdGljIG5vdygpIHtcbiAgICByZXR1cm4gbmV3IEFzKHt9KTtcbiAgfVxuXG4gIHN0YXRpYyBsb2NhbCguLi50KSB7XG4gICAgY29uc3QgW2UsIHNdID0gdGhpcy5fbGFzdE9wdHModCksXG4gICAgICBbbiwgciwgaSwgYSwgbywgdSwgY10gPSBzO1xuICAgIHJldHVybiBBcy5fcXVpY2tEVChcbiAgICAgIHtcbiAgICAgICAgeWVhcjogbixcbiAgICAgICAgbW9udGg6IHIsXG4gICAgICAgIGRheTogaSxcbiAgICAgICAgaG91cjogYSxcbiAgICAgICAgbWludXRlOiBvLFxuICAgICAgICBzZWNvbmQ6IHUsXG4gICAgICAgIG1pbGxpc2Vjb25kOiBjLFxuICAgICAgfSxcbiAgICAgIGUsXG4gICAgKTtcbiAgfVxuXG4gIHN0YXRpYyB1dGMoLi4udCkge1xuICAgIGNvbnN0IFtlLCBzXSA9IHRoaXMuX2xhc3RPcHRzKHQpLFxuICAgICAgW24sIHIsIGksIGEsIG8sIHUsIGNdID0gcztcbiAgICByZXR1cm4gKFxuICAgICAgKGUuem9uZSA9IGR0LnV0Y0luc3RhbmNlKSxcbiAgICAgIHRoaXMuX3F1aWNrRFQoXG4gICAgICAgIHtcbiAgICAgICAgICB5ZWFyOiBuLFxuICAgICAgICAgIG1vbnRoOiByLFxuICAgICAgICAgIGRheTogaSxcbiAgICAgICAgICBob3VyOiBhLFxuICAgICAgICAgIG1pbnV0ZTogbyxcbiAgICAgICAgICBzZWNvbmQ6IHUsXG4gICAgICAgICAgbWlsbGlzZWNvbmQ6IGMsXG4gICAgICAgIH0sXG4gICAgICAgIGUsXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSlNEYXRlKHQsIGUgPSB7fSkge1xuICAgIGNvbnN0IHMgPVxuICAgICAgKChuID0gdCksXG4gICAgICAnW29iamVjdCBEYXRlXScgPT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuKVxuICAgICAgICA/IHQudmFsdWVPZigpXG4gICAgICAgIDogTmFOKTtcbiAgICB2YXIgbjtcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHMpKSByZXR1cm4gQXMuaW52YWxpZCgnaW52YWxpZCBpbnB1dCcpO1xuICAgIGNvbnN0IHIgPSBndChlLnpvbmUsIFN0LmRlZmF1bHRab25lKTtcbiAgICByZXR1cm4gci5pc1ZhbGlkXG4gICAgICA/IG5ldyBBcyh7IHRzOiBzLCB6b25lOiByLCBsb2M6IGx0LmZyb21PYmplY3QoZSkgfSlcbiAgICAgIDogQXMuaW52YWxpZChBcy5fdW5zdXBwb3J0ZWRab25lKHIpKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTWlsbGlzKHQsIGUgPSB7fSkge1xuICAgIGlmIChOdCh0KSlcbiAgICAgIHJldHVybiB0IDwgLTg2NGUxMyB8fCB0ID4gODY0ZTEzXG4gICAgICAgID8gQXMuaW52YWxpZCgnVGltZXN0YW1wIG91dCBvZiByYW5nZScpXG4gICAgICAgIDogbmV3IEFzKHtcbiAgICAgICAgICAgIHRzOiB0LFxuICAgICAgICAgICAgem9uZTogZ3QoZS56b25lLCBTdC5kZWZhdWx0Wm9uZSksXG4gICAgICAgICAgICBsb2M6IGx0LmZyb21PYmplY3QoZSksXG4gICAgICAgICAgfSk7XG4gICAgdGhyb3cgbmV3IG8oXG4gICAgICBgZnJvbU1pbGxpcyByZXF1aXJlcyBhIG51bWVyaWNhbCBpbnB1dCwgYnV0IHJlY2VpdmVkIGEgJHt0eXBlb2YgdH0gd2l0aCB2YWx1ZSAke3R9YCxcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIGZyb21TZWNvbmRzKHQsIGUgPSB7fSkge1xuICAgIGlmICghTnQodCkpIHRocm93IG5ldyBvKCdmcm9tU2Vjb25kcyByZXF1aXJlcyBhIG51bWVyaWNhbCBpbnB1dCcpO1xuICAgIHJldHVybiBuZXcgQXMoe1xuICAgICAgdHM6IDFlMyAqIHQsXG4gICAgICB6b25lOiBndChlLnpvbmUsIFN0LmRlZmF1bHRab25lKSxcbiAgICAgIGxvYzogbHQuZnJvbU9iamVjdChlKSxcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tT2JqZWN0KHQgPSB7fSwgZSA9IHt9KSB7XG4gICAgY29uc3QgcyA9IGd0KGUuem9uZSwgU3QuZGVmYXVsdFpvbmUpO1xuICAgIGlmICghcy5pc1ZhbGlkKSByZXR1cm4gQXMuaW52YWxpZChBcy5fdW5zdXBwb3J0ZWRab25lKHMpKTtcbiAgICBjb25zdCBuID0gU3Qubm93KCksXG4gICAgICByID0gTnQoZS5zcGVjaWZpY09mZnNldCkgPyBlLnNwZWNpZmljT2Zmc2V0IDogcy5vZmZzZXQobiksXG4gICAgICBpID0gUnQodCwgcXMpLFxuICAgICAgbyA9IGt0KGkub3JkaW5hbCksXG4gICAgICB1ID0ga3QoaS55ZWFyKSxcbiAgICAgIGMgPSBrdChpLm1vbnRoKSB8fCBrdChpLmRheSksXG4gICAgICBsID0gdSB8fCBjLFxuICAgICAgaCA9IGkud2Vla1llYXIgfHwgaS53ZWVrTnVtYmVyLFxuICAgICAgZCA9IGx0LmZyb21PYmplY3QoZSk7XG4gICAgaWYgKChsIHx8IG8pICYmIGgpXG4gICAgICB0aHJvdyBuZXcgYShcbiAgICAgICAgXCJDYW4ndCBtaXggd2Vla1llYXIvd2Vla051bWJlciB1bml0cyB3aXRoIHllYXIvbW9udGgvZGF5IG9yIG9yZGluYWxzXCIsXG4gICAgICApO1xuICAgIGlmIChjICYmIG8pIHRocm93IG5ldyBhKFwiQ2FuJ3QgbWl4IG9yZGluYWwgZGF0ZXMgd2l0aCBtb250aC9kYXlcIik7XG4gICAgY29uc3QgbSA9IGggfHwgKGkud2Vla2RheSAmJiAhbCksXG4gICAgICBmID0ganMobiwgciksXG4gICAgICB5ID0ge1xuICAgICAgICBjb250YWluc0dyZWdvcjogbCxcbiAgICAgICAgY29udGFpbnNPcmRpbmFsOiBvLFxuICAgICAgICBsb2M6IGQsXG4gICAgICAgIG5vcm1hbGl6ZWQ6IGksXG4gICAgICAgIG9iajogdCxcbiAgICAgICAgb2Zmc2V0UHJvdmlzOiByLFxuICAgICAgICB1c2VXZWVrRGF0YTogbSxcbiAgICAgICAgem9uZVRvVXNlOiBzLFxuICAgICAgfTtcbiAgICByZXR1cm4gbVxuICAgICAgPyBBcy5fYnVpbGRPYmplY3QoeSwgTHMsIEZzLCBUcyhmKSlcbiAgICAgIDogb1xuICAgICAgPyBBcy5fYnVpbGRPYmplY3QoeSwgenMsIFpzLCBrcyhmKSlcbiAgICAgIDogQXMuX2J1aWxkT2JqZWN0KHksICRzLCBDcywgZik7XG4gIH1cblxuICBzdGF0aWMgZnJvbUlTTyh0LCBlID0ge30pIHtcbiAgICBjb25zdCBbcywgbl0gPSAoZnVuY3Rpb24gKHQpIHtcbiAgICAgIHJldHVybiBuZSh0LCBbamUsIENlXSwgW3hlLCBGZV0sIFtJZSwgWmVdLCBbVmUsICRlXSk7XG4gICAgfSkodCk7XG4gICAgcmV0dXJuIElzKHMsIG4sIGUsICdJU08gODYwMScsIHQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21SRkMyODIyKHQsIGUgPSB7fSkge1xuICAgIGNvbnN0IFtzLCBuXSA9IChmdW5jdGlvbiAodCkge1xuICAgICAgcmV0dXJuIG5lKFxuICAgICAgICAoZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICByZXR1cm4gdFxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcKFteKCldKlxcKXxbXFxuXFx0XS9nLCAnICcpXG4gICAgICAgICAgICAucmVwbGFjZSgvKFxcc1xccyspL2csICcgJylcbiAgICAgICAgICAgIC50cmltKCk7XG4gICAgICAgIH0pKHQpLFxuICAgICAgICBbVGUsIFNlXSxcbiAgICAgICk7XG4gICAgfSkodCk7XG4gICAgcmV0dXJuIElzKHMsIG4sIGUsICdSRkMgMjgyMicsIHQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVFRQKHQsIGUgPSB7fSkge1xuICAgIGNvbnN0IFtzLCBuXSA9IChmdW5jdGlvbiAodCkge1xuICAgICAgcmV0dXJuIG5lKHQsIFtrZSwgRGVdLCBbTWUsIERlXSwgW05lLCBFZV0pO1xuICAgIH0pKHQpO1xuICAgIHJldHVybiBJcyhzLCBuLCBlLCAnSFRUUCcsIHQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Gb3JtYXQodCwgZSwgcyA9IHt9KSB7XG4gICAgaWYgKE10KHQpIHx8IE10KGUpKVxuICAgICAgdGhyb3cgbmV3IG8oJ2Zyb21Gb3JtYXQgcmVxdWlyZXMgYW4gaW5wdXQgc3RyaW5nIGFuZCBhIGZvcm1hdCcpO1xuICAgIGNvbnN0IHsgbG9jYWxlOiBuLCBudW1iZXJpbmdTeXN0ZW06IHIgfSA9IHMsXG4gICAgICBpID0gbHQuZnJvbU9wdHMoeyBsb2NhbGU6IG4sIG51bWJlcmluZ1N5c3RlbTogciwgZGVmYXVsdFRvRU46ICEwIH0pLFxuICAgICAgW2EsIHUsIGMsIGxdID0gKGZ1bmN0aW9uICh0LCBlLCBzKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICByZXN1bHQ6IG4sXG4gICAgICAgICAgem9uZTogcixcbiAgICAgICAgICBzcGVjaWZpY09mZnNldDogaSxcbiAgICAgICAgICBpbnZhbGlkUmVhc29uOiBhLFxuICAgICAgICB9ID0geXModCwgZSwgcyk7XG4gICAgICAgIHJldHVybiBbbiwgciwgaSwgYV07XG4gICAgICB9KShpLCB0LCBlKTtcbiAgICByZXR1cm4gbCA/IEFzLmludmFsaWQobCkgOiBJcyhhLCB1IHx8IG51bGwsIHMsIGBmb3JtYXQgJHtlfWAsIHQsIGMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21TdHJpbmcodCwgZSwgcyA9IHt9KSB7XG4gICAgcmV0dXJuIEFzLmZyb21Gb3JtYXQodCwgZSwgcyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVNRTCh0LCBlID0ge30pIHtcbiAgICBjb25zdCBbcywgbl0gPSAoZnVuY3Rpb24gKHQpIHtcbiAgICAgIHJldHVybiBuZSh0LCBbTGUsIENlXSwgW3plLCBxZV0pO1xuICAgIH0pKHQpO1xuICAgIHJldHVybiBJcyhzLCBuLCBlLCAnU1FMJywgdCk7XG4gIH1cblxuICBzdGF0aWMgaW52YWxpZCh0LCBzKSB7XG4gICAgaWYgKCF0KSB0aHJvdyBuZXcgbygnbmVlZCB0byBzcGVjaWZ5IGEgcmVhc29uIHRoZSBEYXRlVGltZSBpcyBpbnZhbGlkJyk7XG4gICAgY29uc3QgbiA9IHQgaW5zdGFuY2VvZiBBZSA/IHQgOiBuZXcgQWUodCwgcyk7XG4gICAgaWYgKFN0LnRocm93T25JbnZhbGlkKSB0aHJvdyBuZXcgZShuKTtcbiAgICByZXR1cm4gbmV3IEFzKHsgaW52YWxpZDogbiB9KTtcbiAgfVxuXG4gIHN0YXRpYyBpc0RhdGVUaW1lKHQpIHtcbiAgICByZXR1cm4gISghdCB8fCAhdC5faXNMdXhvbkRhdGVUaW1lKTtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZUZvcm1hdEZvck9wdHModCwgZSA9IHt9KSB7XG4gICAgY29uc3QgcyA9IGdzKHQsIGx0LmZyb21PYmplY3QoZSkpO1xuICAgIHJldHVybiBzID8gcy5tYXAodCA9PiAodCA/IHQudmFsIDogbnVsbCkpLmpvaW4oJycpIDogbnVsbDtcbiAgfVxuXG4gIHN0YXRpYyBtaW4oLi4udCkge1xuICAgIGlmICghdC5ldmVyeShBcy5pc0RhdGVUaW1lKSlcbiAgICAgIHRocm93IG5ldyBvKCdtaW4gcmVxdWlyZXMgYWxsIGFyZ3VtZW50cyBiZSBEYXRlVGltZXMnKTtcbiAgICByZXR1cm4ganQodCwgdCA9PiB0LnZhbHVlT2YoKSwgTWF0aC5taW4pO1xuICB9XG5cbiAgc3RhdGljIG1heCguLi50KSB7XG4gICAgaWYgKCF0LmV2ZXJ5KEFzLmlzRGF0ZVRpbWUpKVxuICAgICAgdGhyb3cgbmV3IG8oJ21heCByZXF1aXJlcyBhbGwgYXJndW1lbnRzIGJlIERhdGVUaW1lcycpO1xuICAgIHJldHVybiBqdCh0LCB0ID0+IHQudmFsdWVPZigpLCBNYXRoLm1heCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUZvcm1hdEV4cGxhaW4odCwgZSwgcyA9IHt9KSB7XG4gICAgY29uc3QgeyBsb2NhbGU6IG4sIG51bWJlcmluZ1N5c3RlbTogciB9ID0gcztcbiAgICByZXR1cm4geXMoXG4gICAgICBsdC5mcm9tT3B0cyh7IGxvY2FsZTogbiwgbnVtYmVyaW5nU3lzdGVtOiByLCBkZWZhdWx0VG9FTjogITAgfSksXG4gICAgICB0LFxuICAgICAgZSxcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIGZyb21TdHJpbmdFeHBsYWluKHQsIGUsIHMgPSB7fSkge1xuICAgIHJldHVybiBBcy5mcm9tRm9ybWF0RXhwbGFpbih0LCBlLCBzKTtcbiAgfVxuXG4gIHN0YXRpYyBleHBhbmRGb3JtYXQodCwgZSA9IHt9KSB7XG4gICAgcmV0dXJuIGZzKHRlLnBhcnNlRm9ybWF0KHQpLCBsdC5mcm9tT2JqZWN0KGUpKVxuICAgICAgLm1hcCh0ID0+IHQudmFsKVxuICAgICAgLmpvaW4oJycpO1xuICB9XG5cbiAgc3RhdGljIF9idWlsZE9iamVjdCh0LCBlLCBzLCBuKSB7XG4gICAgbGV0IHIgPSAhMTtcbiAgICBlLmZvckVhY2goZSA9PiB7XG4gICAgICBrdCh0Lm5vcm1hbGl6ZWRbZV0pID8gKHIgPSAhMCkgOiAodC5ub3JtYWxpemVkW2VdID0gciA/IHNbZV0gOiBuW2VdKTtcbiAgICB9KTtcbiAgICBjb25zdCBpID1cbiAgICAgICh0LnVzZVdlZWtEYXRhXG4gICAgICAgID8gKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBjb25zdCBlID0gRHQodC53ZWVrWWVhciksXG4gICAgICAgICAgICAgIHMgPSB4dCh0LndlZWtOdW1iZXIsIDEsIEF0KHQud2Vla1llYXIpKSxcbiAgICAgICAgICAgICAgbiA9IHh0KHQud2Vla2RheSwgMSwgNyk7XG4gICAgICAgICAgICByZXR1cm4gZVxuICAgICAgICAgICAgICA/IHNcbiAgICAgICAgICAgICAgICA/ICFuICYmIHdzKCd3ZWVrZGF5JywgdC53ZWVrZGF5KVxuICAgICAgICAgICAgICAgIDogd3MoJ3dlZWsnLCB0LndlZWtOdW1iZXIpXG4gICAgICAgICAgICAgIDogd3MoJ3dlZWtZZWFyJywgdC53ZWVrWWVhcik7XG4gICAgICAgICAgfSkodC5ub3JtYWxpemVkKVxuICAgICAgICA6IHQuY29udGFpbnNPcmRpbmFsXG4gICAgICAgID8gKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBjb25zdCBlID0gRHQodC55ZWFyKSxcbiAgICAgICAgICAgICAgcyA9IHh0KHQub3JkaW5hbCwgMSwgTHQodC55ZWFyKSk7XG4gICAgICAgICAgICByZXR1cm4gZSA/ICFzICYmIHdzKCdvcmRpbmFsJywgdC5vcmRpbmFsKSA6IHdzKCd5ZWFyJywgdC55ZWFyKTtcbiAgICAgICAgICB9KSh0Lm5vcm1hbGl6ZWQpXG4gICAgICAgIDogTnModC5ub3JtYWxpemVkKSkgfHwgRHModC5ub3JtYWxpemVkKTtcbiAgICBpZiAoaSkgcmV0dXJuIEFzLmludmFsaWQoaSk7XG4gICAgY29uc3QgYSA9IHQudXNlV2Vla0RhdGFcbiAgICAgICAgPyBTcyh0Lm5vcm1hbGl6ZWQpXG4gICAgICAgIDogdC5jb250YWluc09yZGluYWxcbiAgICAgICAgPyBNcyh0Lm5vcm1hbGl6ZWQpXG4gICAgICAgIDogdC5ub3JtYWxpemVkLFxuICAgICAgW28sIHVdID0geHMoYSwgdC5vZmZzZXRQcm92aXMsIHQuem9uZVRvVXNlKSxcbiAgICAgIGMgPSBuZXcgQXMoeyB0czogbywgem9uZTogdC56b25lVG9Vc2UsIG86IHUsIGxvYzogdC5sb2MgfSk7XG4gICAgcmV0dXJuIHQubm9ybWFsaXplZC53ZWVrZGF5ICYmXG4gICAgICB0LmNvbnRhaW5zR3JlZ29yICYmXG4gICAgICB0Lm9iai53ZWVrZGF5ICE9PSBjLndlZWtkYXlcbiAgICAgID8gQXMuaW52YWxpZChcbiAgICAgICAgICAnbWlzbWF0Y2hlZCB3ZWVrZGF5JyxcbiAgICAgICAgICBgeW91IGNhbid0IHNwZWNpZnkgYm90aCBhIHdlZWtkYXkgb2YgJHtcbiAgICAgICAgICAgIHQubm9ybWFsaXplZC53ZWVrZGF5XG4gICAgICAgICAgfSBhbmQgYSBkYXRlIG9mICR7Yy50b0lTTygpfWAsXG4gICAgICAgIClcbiAgICAgIDogYztcbiAgfVxuXG4gIHN0YXRpYyBfbGFzdE9wdHModCkge1xuICAgIGxldCBlLFxuICAgICAgcyA9IHt9O1xuICAgIHJldHVybiAoXG4gICAgICB0Lmxlbmd0aCA+IDAgJiYgJ29iamVjdCcgPT0gdHlwZW9mIHRbdC5sZW5ndGggLSAxXVxuICAgICAgICA/ICgocyA9IHQucG9wKCkpLCAoZSA9IHQpKVxuICAgICAgICA6IChlID0gQXJyYXkuZnJvbSh0KSksXG4gICAgICBbcywgZV1cbiAgICApO1xuICB9XG5cbiAgc3RhdGljIF9xdWlja0RUKHQsIGUpIHtcbiAgICBjb25zdCBzID0gZ3QoZS56b25lLCBTdC5kZWZhdWx0Wm9uZSksXG4gICAgICBuID0gbHQuZnJvbU9iamVjdChlKSxcbiAgICAgIHIgPSBTdC5ub3coKTtcbiAgICBsZXQgaSwgYTtcbiAgICBpZiAoa3QodC55ZWFyKSkge1xuICAgICAgZm9yIChjb25zdCBlIG9mICRzKSBNdCh0W2VdKSAmJiAodFtlXSA9IENzW2VdKTtcbiAgICAgIGNvbnN0IGUgPSBOcyh0KSB8fCBEcyh0KTtcbiAgICAgIGlmIChlKSByZXR1cm4gQXMuaW52YWxpZChlKTtcbiAgICAgIGNvbnN0IG4gPSBzLm9mZnNldChyKTtcbiAgICAgIFtpLCBhXSA9IHhzKHQsIG4sIHMpO1xuICAgIH0gZWxzZSBpID0gcjtcbiAgICByZXR1cm4gbmV3IEFzKHsgdHM6IGksIHpvbmU6IHMsIGxvYzogbiwgbzogYSB9KTtcbiAgfVxuXG4gIHN0YXRpYyBfZGlmZlJlbGF0aXZlKHQsIGUsIHMpIHtcbiAgICBjb25zdCBuID0gISFNdChzLnJvdW5kKSB8fCBzLnJvdW5kLFxuICAgICAgciA9ICh0LCByKSA9PiB7XG4gICAgICAgIHQgPSBadCh0LCBuIHx8IHMuY2FsZW5kYXJ5ID8gMCA6IDIsICEwKTtcbiAgICAgICAgcmV0dXJuIGUuX2xvYy5jbG9uZShzKS5yZWxGb3JtYXR0ZXIocykuZm9ybWF0KHQsIHIpO1xuICAgICAgfSxcbiAgICAgIGkgPSBuID0+XG4gICAgICAgIHMuY2FsZW5kYXJ5XG4gICAgICAgICAgPyBlLmhhc1NhbWUodCwgbilcbiAgICAgICAgICAgID8gMFxuICAgICAgICAgICAgOiBlLnN0YXJ0T2YobikuZGlmZih0LnN0YXJ0T2YobiksIG4pLmdldChuKVxuICAgICAgICAgIDogZS5kaWZmKHQsIG4pLmdldChuKTtcbiAgICBpZiAocy51bml0KSByZXR1cm4gcihpKHMudW5pdCksIHMudW5pdCk7XG4gICAgZm9yIChjb25zdCB0IG9mIHMudW5pdHMpIHtcbiAgICAgIGNvbnN0IGUgPSBpKHQpO1xuICAgICAgaWYgKE1hdGguYWJzKGUpID49IDEpIHJldHVybiByKGUsIHQpO1xuICAgIH1cbiAgICByZXR1cm4gcih0ID4gZSA/IC0wIDogMCwgcy51bml0c1tzLnVuaXRzLmxlbmd0aCAtIDFdKTtcbiAgfVxuXG4gIHN0YXRpYyBfdW5zdXBwb3J0ZWRab25lKHQpIHtcbiAgICByZXR1cm4gbmV3IEFlKCd1bnN1cHBvcnRlZCB6b25lJywgYHRoZSB6b25lIFwiJHt0Lm5hbWV9XCIgaXMgbm90IHN1cHBvcnRlZGApO1xuICB9XG5cbiAgZ2V0KHQpIHtcbiAgICByZXR1cm4gdGhpc1t0XTtcbiAgfVxuXG4gIHJlc29sdmVkTG9jYWxlT3B0aW9ucyh0ID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICBsb2NhbGU6IGUsXG4gICAgICBudW1iZXJpbmdTeXN0ZW06IHMsXG4gICAgICBjYWxlbmRhcjogbixcbiAgICB9ID0gdGUuY3JlYXRlKHRoaXMuX2xvYy5jbG9uZSh0KSwgdCkucmVzb2x2ZWRPcHRpb25zKHRoaXMpO1xuICAgIHJldHVybiB7IGxvY2FsZTogZSwgbnVtYmVyaW5nU3lzdGVtOiBzLCBvdXRwdXRDYWxlbmRhcjogbiB9O1xuICB9XG5cbiAgdG9Mb2NhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXRab25lKFN0LmRlZmF1bHRab25lKTtcbiAgfVxuXG4gIHRvVVRDKHQgPSAwLCBlID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5zZXRab25lKGR0Lmluc3RhbmNlKHQpLCBlKTtcbiAgfVxuXG4gIHNldFpvbmUodCwgeyBrZWVwTG9jYWxUaW1lOiBlID0gITEsIGtlZXBDYWxlbmRhclRpbWU6IHMgPSAhMSB9ID0ge30pIHtcbiAgICBpZiAoKHQgPSBndCh0LCBTdC5kZWZhdWx0Wm9uZSkpLmVxdWFscyh0aGlzLnpvbmUpKSByZXR1cm4gdGhpcztcbiAgICBpZiAodC5pc1ZhbGlkKSB7XG4gICAgICBsZXQgbiA9IHRoaXMuX3RzO1xuICAgICAgaWYgKGUgfHwgcykge1xuICAgICAgICBjb25zdCBlID0gdC5vZmZzZXQodGhpcy5fdHMpO1xuICAgICAgICBuID0geHModGhpcy50b09iamVjdCgpLCBlLCB0KVswXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLl9jbG9uZSh7IHRzOiBuLCB6b25lOiB0IH0pO1xuICAgIH1cbiAgICByZXR1cm4gQXMuaW52YWxpZChBcy5fdW5zdXBwb3J0ZWRab25lKHQpKTtcbiAgfVxuXG4gIHJlY29uZmlndXJlKHQpIHtcbiAgICBjb25zdCBlID0gdGhpcy5fbG9jLmNsb25lKHQpO1xuICAgIHJldHVybiB0aGlzLl9jbG9uZSh7IGxvYzogZSB9KTtcbiAgfVxuXG4gIHNldExvY2FsZSh0KSB7XG4gICAgcmV0dXJuIHRoaXMucmVjb25maWd1cmUoeyBsb2NhbGU6IHQgfSk7XG4gIH1cblxuICBzZXQodCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gdGhpcztcbiAgICBjb25zdCBlID0gUnQodCwgcXMpLFxuICAgICAgcyA9IGt0KGUud2Vla1llYXIpIHx8IGt0KGUud2Vla051bWJlcikgfHwga3QoZS53ZWVrZGF5KSxcbiAgICAgIG4gPSBrdChlLm9yZGluYWwpLFxuICAgICAgciA9IGt0KGUueWVhciksXG4gICAgICBpID0ga3QoZS5tb250aCkgfHwga3QoZS5kYXkpLFxuICAgICAgbyA9IHIgfHwgaSxcbiAgICAgIHUgPSBlLndlZWtZZWFyIHx8IGUud2Vla051bWJlcjtcbiAgICBpZiAoKG8gfHwgbikgJiYgdSlcbiAgICAgIHRocm93IG5ldyBhKFxuICAgICAgICBcIkNhbid0IG1peCB3ZWVrWWVhci93ZWVrTnVtYmVyIHVuaXRzIHdpdGggeWVhci9tb250aC9kYXkgb3Igb3JkaW5hbHNcIixcbiAgICAgICk7XG4gICAgaWYgKGkgJiYgbikgdGhyb3cgbmV3IGEoXCJDYW4ndCBtaXggb3JkaW5hbCBkYXRlcyB3aXRoIG1vbnRoL2RheVwiKTtcbiAgICBsZXQgYztcbiAgICBzXG4gICAgICA/IChjID0gU3MoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBUcyh0aGlzLl9jKSksIGUpKSlcbiAgICAgIDogTXQoZS5vcmRpbmFsKVxuICAgICAgPyAoKGMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMudG9PYmplY3QoKSksIGUpKSxcbiAgICAgICAgTXQoZS5kYXkpICYmIChjLmRheSA9IE1hdGgubWluKHp0KGMueWVhciwgYy5tb250aCksIGMuZGF5KSkpXG4gICAgICA6IChjID0gTXMoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBrcyh0aGlzLl9jKSksIGUpKSk7XG4gICAgY29uc3QgW2wsIGhdID0geHMoYywgdGhpcy5fbywgdGhpcy56b25lKTtcbiAgICByZXR1cm4gdGhpcy5fY2xvbmUoeyB0czogbCwgbzogaCB9KTtcbiAgfVxuXG4gIHBsdXModCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gdGhpcztcbiAgICBjb25zdCBlID0gUmUuZnJvbUR1cmF0aW9uTGlrZSh0KTtcbiAgICByZXR1cm4gdGhpcy5fY2xvbmUodGhpcy5fYWRqdXN0VGltZShlKSk7XG4gIH1cblxuICBtaW51cyh0KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiB0aGlzO1xuICAgIGNvbnN0IGUgPSBSZS5mcm9tRHVyYXRpb25MaWtlKHQpLm5lZ2F0ZSgpO1xuICAgIHJldHVybiB0aGlzLl9jbG9uZSh0aGlzLl9hZGp1c3RUaW1lKGUpKTtcbiAgfVxuXG4gIHN0YXJ0T2YodCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gdGhpcztcbiAgICBjb25zdCBlID0ge30sXG4gICAgICBzID0gUmUubm9ybWFsaXplVW5pdCh0KTtcbiAgICBzd2l0Y2ggKHMpIHtcbiAgICAgIGNhc2UgJ3llYXJzJzpcbiAgICAgICAgZS5tb250aCA9IDE7XG4gICAgICBjYXNlICdxdWFydGVycyc6XG4gICAgICBjYXNlICdtb250aHMnOlxuICAgICAgICBlLmRheSA9IDE7XG4gICAgICBjYXNlICd3ZWVrcyc6XG4gICAgICBjYXNlICdkYXlzJzpcbiAgICAgICAgZS5ob3VyID0gMDtcbiAgICAgIGNhc2UgJ2hvdXJzJzpcbiAgICAgICAgZS5taW51dGUgPSAwO1xuICAgICAgY2FzZSAnbWludXRlcyc6XG4gICAgICAgIGUuc2Vjb25kID0gMDtcbiAgICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgICAgICBlLm1pbGxpc2Vjb25kID0gMDtcbiAgICB9XG4gICAgaWYgKCgnd2Vla3MnID09PSBzICYmIChlLndlZWtkYXkgPSAxKSwgJ3F1YXJ0ZXJzJyA9PT0gcykpIHtcbiAgICAgIGNvbnN0IHQgPSBNYXRoLmNlaWwodGhpcy5tb250aCAvIDMpO1xuICAgICAgZS5tb250aCA9IDMgKiAodCAtIDEpICsgMTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc2V0KGUpO1xuICB9XG5cbiAgZW5kT2YodCkge1xuICAgIHJldHVybiB0aGlzLnBsdXMoeyBbdF06IDEgfSlcbiAgICAgIC5zdGFydE9mKHQpXG4gICAgICAubWludXMoeyBtaWxsaXNlY29uZHM6IDEgfSk7XG4gIH1cblxuICB0b0Zvcm1hdCh0LCBlID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkXG4gICAgICA/IHRlLmNyZWF0ZSh0aGlzLl9sb2MucmVkZWZhdWx0VG9FTihlKSkuZm9ybWF0RGF0ZVRpbWVGcm9tU3RyaW5nKHRoaXMsIHQpXG4gICAgICA6ICdJbnZhbGlkIERhdGVUaW1lJztcbiAgfVxuXG4gIHRvTG9jYWxlU3RyaW5nKHQgPSB3LCBlID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkXG4gICAgICA/IHRlLmNyZWF0ZSh0aGlzLl9sb2MuY2xvbmUoZSksIHQpLmZvcm1hdERhdGVUaW1lKHRoaXMpXG4gICAgICA6ICdJbnZhbGlkIERhdGVUaW1lJztcbiAgfVxuXG4gIHRvTG9jYWxlUGFydHModCA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZFxuICAgICAgPyB0ZS5jcmVhdGUodGhpcy5fbG9jLmNsb25lKHQpLCB0KS5mb3JtYXREYXRlVGltZVBhcnRzKHRoaXMpXG4gICAgICA6IFtdO1xuICB9XG5cbiAgdG9JU08oe1xuICAgIGZvcm1hdDogdCA9ICdleHRlbmRlZCcsXG4gICAgc3VwcHJlc3NTZWNvbmRzOiBlID0gITEsXG4gICAgc3VwcHJlc3NNaWxsaXNlY29uZHM6IHMgPSAhMSxcbiAgICBpbmNsdWRlT2Zmc2V0OiBuID0gITAsXG4gICAgZXh0ZW5kZWRab25lOiByID0gITEsXG4gIH0gPSB7fSkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBpID0gJ2V4dGVuZGVkJyA9PT0gdDtcbiAgICByZXR1cm4gW3RoaXMuX3RvSVNPRGF0ZShpKSwgJ1QnLCB0aGlzLl90b0lTT1RpbWUoaSwgZSwgcywgbiwgcildLmpvaW4oJycpO1xuICB9XG5cbiAgdG9JU09EYXRlKHQgPSB7IGZvcm1hdDogJ2V4dGVuZGVkJyB9KSB7XG4gICAgbGV0IGUgPSAnYmFzaWMnID09PSB0LmZvcm1hdCA/ICd5eXl5TU1kZCcgOiAneXl5eS1NTS1kZCc7XG4gICAgcmV0dXJuIHRoaXMueWVhciA+IDk5OTkgJiYgKGUgPSAnKycgKyBlKSwgVnModGhpcywgZSk7XG4gIH1cblxuICB0b0lTT1dlZWtEYXRlKCkge1xuICAgIHJldHVybiBWcyh0aGlzLCBcImtra2stJ1cnV1ctY1wiKTtcbiAgfVxuXG4gIHRvSVNPVGltZSh7XG4gICAgc3VwcHJlc3NNaWxsaXNlY29uZHM6IHQgPSAhMSxcbiAgICBzdXBwcmVzc1NlY29uZHM6IGUgPSAhMSxcbiAgICBpbmNsdWRlT2Zmc2V0OiBzID0gITAsXG4gICAgaW5jbHVkZVByZWZpeDogbiA9ICExLFxuICAgIGV4dGVuZGVkWm9uZTogciA9ICExLFxuICAgIGZvcm1hdDogaSA9ICdleHRlbmRlZCcsXG4gIH0gPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWRcbiAgICAgID8gW24gPyAnVCcgOiAnJywgdGhpcy5fdG9JU09UaW1lKCdleHRlbmRlZCcgPT09IGksIGUsIHQsIHMsIHIpXS5qb2luKCcnKVxuICAgICAgOiBudWxsO1xuICB9XG5cbiAgdG9SRkMyODIyKCkge1xuICAgIHJldHVybiBWcyh0aGlzLCAnRUVFLCBkZCBMTEwgeXl5eSBISDptbTpzcyBaWlonLCAhMSk7XG4gIH1cblxuICB0b0hUVFAoKSB7XG4gICAgcmV0dXJuIFZzKHRoaXMudG9VVEMoKSwgXCJFRUUsIGRkIExMTCB5eXl5IEhIOm1tOnNzICdHTVQnXCIpO1xuICB9XG5cbiAgdG9TUUxEYXRlKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLl90b0lTT0RhdGUoITApIDogbnVsbDtcbiAgfVxuXG4gIHRvU1FMVGltZSh7XG4gICAgaW5jbHVkZU9mZnNldDogdCA9ICEwLFxuICAgIGluY2x1ZGVab25lOiBlID0gITEsXG4gICAgaW5jbHVkZU9mZnNldFNwYWNlOiBzID0gITAsXG4gIH0gPSB7fSkge1xuICAgIGxldCBuID0gJ0hIOm1tOnNzLlNTUyc7XG4gICAgcmV0dXJuIChcbiAgICAgIChlIHx8IHQpICYmIChzICYmIChuICs9ICcgJyksIGUgPyAobiArPSAneicpIDogdCAmJiAobiArPSAnWlonKSksXG4gICAgICBWcyh0aGlzLCBuLCAhMClcbiAgICApO1xuICB9XG5cbiAgdG9TUUwodCA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IGAke3RoaXMudG9TUUxEYXRlKCl9ICR7dGhpcy50b1NRTFRpbWUodCl9YCA6IG51bGw7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy50b0lTTygpIDogJ0ludmFsaWQgRGF0ZVRpbWUnO1xuICB9XG5cbiAgdmFsdWVPZigpIHtcbiAgICByZXR1cm4gdGhpcy50b01pbGxpcygpO1xuICB9XG5cbiAgdG9NaWxsaXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMudHMgOiBOYU47XG4gIH1cblxuICB0b1NlY29uZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMuX3RzIC8gMWUzIDogTmFOO1xuICB9XG5cbiAgdG9Vbml4SW50ZWdlcigpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gTWF0aC5mbG9vcih0aGlzLnRzIC8gMWUzKSA6IE5hTjtcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpcy50b0lTTygpO1xuICB9XG5cbiAgdG9CU09OKCkge1xuICAgIHJldHVybiB0aGlzLnRvSlNEYXRlKCk7XG4gIH1cblxuICB0b09iamVjdCh0ID0geyBpbmNsdWRlQ29uZmlnOiAhMSB9KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiB7fTtcbiAgICBjb25zdCBlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fYyk7XG4gICAgcmV0dXJuIChcbiAgICAgIHQuaW5jbHVkZUNvbmZpZyAmJlxuICAgICAgICAoKGUub3V0cHV0Q2FsZW5kYXIgPSB0aGlzLm91dHB1dENhbGVuZGFyKSxcbiAgICAgICAgKGUubnVtYmVyaW5nU3lzdGVtID0gdGhpcy5fbG9jLm51bWJlcmluZ1N5c3RlbSksXG4gICAgICAgIChlLmxvY2FsZSA9IHRoaXMuX2xvYy5sb2NhbGUpKSxcbiAgICAgIGVcbiAgICApO1xuICB9XG5cbiAgdG9KU0RhdGUoKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHRoaXMuaXNWYWxpZCA/IHRoaXMuX3RzIDogTmFOKTtcbiAgfVxuXG4gIGRpZmYodCwgZSA9ICdtaWxsaXNlY29uZHMnLCBzID0ge30pIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCB8fCAhdC5pc1ZhbGlkKSB7XG4gICAgICBjb25zdCBlID0gdGhpcy5pbnZhbGlkUmVhc29uIHx8IHQuaW52YWxpZFJlYXNvbjtcbiAgICAgIHJldHVybiBSZS5pbnZhbGlkKGUsICdjcmVhdGVkIGJ5IGRpZmZpbmcgYW4gaW52YWxpZCBEYXRlVGltZScpO1xuICAgIH1cbiAgICBjb25zdCBuID0gKChhID0gZSksIEFycmF5LmlzQXJyYXkoYSkgPyBhIDogW2FdKS5tYXAoUmUubm9ybWFsaXplVW5pdCksXG4gICAgICByID0gdC52YWx1ZU9mKCkgPiB0aGlzLnZhbHVlT2YoKSxcbiAgICAgIGkgPSBLZShcbiAgICAgICAgciA/IHRoaXMgOiB0LFxuICAgICAgICByID8gdCA6IHRoaXMsXG4gICAgICAgIG4sXG4gICAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAge1xuICAgICAgICAgICAgbG9jYWxlOiB0aGlzLmxvY2FsZSxcbiAgICAgICAgICAgIG51bWJlcmluZ1N5c3RlbTogdGhpcy5udW1iZXJpbmdTeXN0ZW0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzLFxuICAgICAgICApLFxuICAgICAgKTtcbiAgICB2YXIgYTtcbiAgICByZXR1cm4gciA/IGkubmVnYXRlKCkgOiBpO1xuICB9XG5cbiAgZGlmZk5vdyh0ID0gJ21pbGxpc2Vjb25kcycsIGUgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmRpZmYoQXMubm93KCksIHQsIGUpO1xuICB9XG5cbiAgdW50aWwodCkge1xuICAgIHJldHVybiBHZS5mcm9tRGF0ZVRpbWVzKHRoaXMsIHQpO1xuICB9XG5cbiAgaGFzU2FtZSh0LCBlKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiAhMTtcbiAgICBjb25zdCBzID0gdC52YWx1ZU9mKCksXG4gICAgICBuID0gdGhpcy5zZXRab25lKHQuem9uZSwgeyBrZWVwTG9jYWxUaW1lOiAhMCB9KTtcbiAgICByZXR1cm4gK24uc3RhcnRPZihlKSA8PSBzICYmIHMgPD0gK24uZW5kT2YoZSk7XG4gIH1cblxuICBlcXVhbHModCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnZhbHVlT2YoKSA9PT0gdC52YWx1ZU9mKCkgJiZcbiAgICAgIHRoaXMuem9uZS5lcXVhbHModC56b25lKSAmJlxuICAgICAgdGhpcy5fbG9jLmVxdWFscyh0Ll9sb2MpXG4gICAgKTtcbiAgfVxuXG4gIHRvUmVsYXRpdmUodCA9IHt9KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGUgPSB0LmJhc2UgfHwgQXMuZnJvbU9iamVjdCh7fSwgeyB6b25lOiB0aGlzLnpvbmUgfSksXG4gICAgICBzID0gdC5wYWRkaW5nID8gKHRoaXMgPCBlID8gLXQucGFkZGluZyA6IHQucGFkZGluZykgOiAwO1xuICAgIGxldCBuID0gWyd5ZWFycycsICdtb250aHMnLCAnZGF5cycsICdob3VycycsICdtaW51dGVzJywgJ3NlY29uZHMnXSxcbiAgICAgIHIgPSB0LnVuaXQ7XG4gICAgcmV0dXJuIChcbiAgICAgIEFycmF5LmlzQXJyYXkodC51bml0KSAmJiAoKG4gPSB0LnVuaXQpLCAociA9IHZvaWQgMCkpLFxuICAgICAgQXMuX2RpZmZSZWxhdGl2ZShcbiAgICAgICAgZSxcbiAgICAgICAgdGhpcy5wbHVzKHMpLFxuICAgICAgICBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHQpLCB7XG4gICAgICAgICAgbnVtZXJpYzogJ2Fsd2F5cycsXG4gICAgICAgICAgdW5pdHM6IG4sXG4gICAgICAgICAgdW5pdDogcixcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHRvUmVsYXRpdmVDYWxlbmRhcih0ID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkXG4gICAgICA/IEFzLl9kaWZmUmVsYXRpdmUoXG4gICAgICAgICAgdC5iYXNlIHx8IEFzLmZyb21PYmplY3Qoe30sIHsgem9uZTogdGhpcy56b25lIH0pLFxuICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0KSwge1xuICAgICAgICAgICAgbnVtZXJpYzogJ2F1dG8nLFxuICAgICAgICAgICAgdW5pdHM6IFsneWVhcnMnLCAnbW9udGhzJywgJ2RheXMnXSxcbiAgICAgICAgICAgIGNhbGVuZGFyeTogITAsXG4gICAgICAgICAgfSksXG4gICAgICAgIClcbiAgICAgIDogbnVsbDtcbiAgfVxuXG4gIF9wb3NzaWJseUNhY2hlZFdlZWtEYXRhKHQpIHtcbiAgICByZXR1cm4gbnVsbCA9PT0gdC5fd2Vla0RhdGEgJiYgKHQuX3dlZWtEYXRhID0gVHModC5fYykpLCB0Ll93ZWVrRGF0YTtcbiAgfVxuXG4gIF9jbG9uZSh0KSB7XG4gICAgY29uc3QgZSA9IHtcbiAgICAgIHRzOiB0aGlzLl90cyxcbiAgICAgIHpvbmU6IHRoaXMuem9uZSxcbiAgICAgIGM6IHRoaXMuX2MsXG4gICAgICBvOiB0aGlzLl9vLFxuICAgICAgbG9jOiB0aGlzLl9sb2MsXG4gICAgICBpbnZhbGlkOiB0aGlzLl9pbnZhbGlkIHx8IHZvaWQgMCxcbiAgICB9O1xuICAgIHJldHVybiBuZXcgQXMoXG4gICAgICBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZSksIHQpLCB7IG9sZDogZSB9KSxcbiAgICApO1xuICB9XG5cbiAgX2FkanVzdFRpbWUodCkge1xuICAgIGNvbnN0IGUgPSB0aGlzLl9vLFxuICAgICAgcyA9IHRoaXMuX2MueWVhciArIE1hdGgudHJ1bmModC55ZWFycyksXG4gICAgICBuID0gdGhpcy5fYy5tb250aCArIE1hdGgudHJ1bmModC5tb250aHMpICsgMyAqIE1hdGgudHJ1bmModC5xdWFydGVycyksXG4gICAgICByID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9jKSwge1xuICAgICAgICB5ZWFyOiBzLFxuICAgICAgICBtb250aDogbixcbiAgICAgICAgZGF5OlxuICAgICAgICAgIE1hdGgubWluKHRoaXMuX2MuZGF5LCB6dChzLCBuKSkgK1xuICAgICAgICAgIE1hdGgudHJ1bmModC5kYXlzKSArXG4gICAgICAgICAgNyAqIE1hdGgudHJ1bmModC53ZWVrcyksXG4gICAgICB9KSxcbiAgICAgIGkgPSBSZS5mcm9tT2JqZWN0KHtcbiAgICAgICAgeWVhcnM6IHQueWVhcnMgLSBNYXRoLnRydW5jKHQueWVhcnMpLFxuICAgICAgICBxdWFydGVyczogdC5xdWFydGVycyAtIE1hdGgudHJ1bmModC5xdWFydGVycyksXG4gICAgICAgIG1vbnRoczogdC5tb250aHMgLSBNYXRoLnRydW5jKHQubW9udGhzKSxcbiAgICAgICAgd2Vla3M6IHQud2Vla3MgLSBNYXRoLnRydW5jKHQud2Vla3MpLFxuICAgICAgICBkYXlzOiB0LmRheXMgLSBNYXRoLnRydW5jKHQuZGF5cyksXG4gICAgICAgIGhvdXJzOiB0LmhvdXJzLFxuICAgICAgICBtaW51dGVzOiB0Lm1pbnV0ZXMsXG4gICAgICAgIHNlY29uZHM6IHQuc2Vjb25kcyxcbiAgICAgICAgbWlsbGlzZWNvbmRzOiB0Lm1pbGxpc2Vjb25kcyxcbiAgICAgIH0pLmFzKCdtaWxsaXNlY29uZHMnKSxcbiAgICAgIGEgPSBxdChyKTtcbiAgICBsZXQgW28sIHVdID0gRXMoYSwgZSwgdGhpcy56b25lKTtcbiAgICByZXR1cm4gMCAhPT0gaSAmJiAoKG8gKz0gaSksICh1ID0gdGhpcy56b25lLm9mZnNldChvKSkpLCB7IHRzOiBvLCBvOiB1IH07XG4gIH1cblxuICBfdG9JU09EYXRlKHQpIHtcbiAgICBjb25zdCBlID0gdGhpcy5fYy55ZWFyID4gOTk5OSB8fCB0aGlzLl9jLnllYXIgPCAwO1xuICAgIGxldCBzID0gJyc7XG4gICAgcmV0dXJuIChcbiAgICAgIGUgJiYgdGhpcy5fYy55ZWFyID49IDAgJiYgKHMgKz0gJysnKSxcbiAgICAgIChzICs9IEl0KHRoaXMuX2MueWVhciwgZSA/IDYgOiA0KSksXG4gICAgICB0XG4gICAgICAgID8gKChzICs9ICctJyksXG4gICAgICAgICAgKHMgKz0gSXQodGhpcy5fYy5tb250aCkpLFxuICAgICAgICAgIChzICs9ICctJyksXG4gICAgICAgICAgKHMgKz0gSXQodGhpcy5fYy5kYXkpKSlcbiAgICAgICAgOiAoKHMgKz0gSXQodGhpcy5fYy5tb250aCkpLCAocyArPSBJdCh0aGlzLl9jLmRheSkpKSxcbiAgICAgIHNcbiAgICApO1xuICB9XG5cbiAgX3RvSVNPVGltZSh0LCBlLCBzLCBuLCByKSB7XG4gICAgbGV0IGkgPSBJdCh0aGlzLl9jLmhvdXIpO1xuICAgIHJldHVybiAoXG4gICAgICB0XG4gICAgICAgID8gKChpICs9ICc6JyksXG4gICAgICAgICAgKGkgKz0gSXQodGhpcy5fYy5taW51dGUpKSxcbiAgICAgICAgICAoMCA9PT0gdGhpcy5fYy5zZWNvbmQgJiYgZSkgfHwgKGkgKz0gJzonKSlcbiAgICAgICAgOiAoaSArPSBJdCh0aGlzLl9jLm1pbnV0ZSkpLFxuICAgICAgKDAgPT09IHRoaXMuX2Muc2Vjb25kICYmIGUpIHx8XG4gICAgICAgICgoaSArPSBJdCh0aGlzLl9jLnNlY29uZCkpLFxuICAgICAgICAoMCA9PT0gdGhpcy5fYy5taWxsaXNlY29uZCAmJiBzKSB8fFxuICAgICAgICAgICgoaSArPSAnLicpLCAoaSArPSBJdCh0aGlzLl9jLm1pbGxpc2Vjb25kLCAzKSkpKSxcbiAgICAgIG4gJiZcbiAgICAgICAgKHRoaXMuaXNPZmZzZXRGaXhlZCAmJiAwID09PSB0aGlzLm9mZnNldCAmJiAhclxuICAgICAgICAgID8gKGkgKz0gJ1onKVxuICAgICAgICAgIDogdGhpcy5fbyA8IDBcbiAgICAgICAgICA/ICgoaSArPSAnLScpLFxuICAgICAgICAgICAgKGkgKz0gSXQoTWF0aC50cnVuYygtdGhpcy5fbyAvIDYwKSkpLFxuICAgICAgICAgICAgKGkgKz0gJzonKSxcbiAgICAgICAgICAgIChpICs9IEl0KE1hdGgudHJ1bmMoLXRoaXMuX28gJSA2MCkpKSlcbiAgICAgICAgICA6ICgoaSArPSAnKycpLFxuICAgICAgICAgICAgKGkgKz0gSXQoTWF0aC50cnVuYyh0aGlzLl9vIC8gNjApKSksXG4gICAgICAgICAgICAoaSArPSAnOicpLFxuICAgICAgICAgICAgKGkgKz0gSXQoTWF0aC50cnVuYyh0aGlzLl9vICUgNjApKSkpKSxcbiAgICAgIHIgJiYgKGkgKz0gJ1snICsgdGhpcy56b25lLmlhbmFOYW1lICsgJ10nKSxcbiAgICAgIGlcbiAgICApO1xuICB9XG59XG5cbihBcy5EQVRFX1NIT1JUID0gdyksXG4gIChBcy5EQVRFX01FRCA9IE8pLFxuICAoQXMuREFURV9NRURfV0lUSF9XRUVLREFZID0gYiksXG4gIChBcy5EQVRFX0ZVTEwgPSB2KSxcbiAgKEFzLkRBVEVfSFVHRSA9IFQpLFxuICAoQXMuVElNRV9TSU1QTEUgPSBTKSxcbiAgKEFzLlRJTUVfV0lUSF9TRUNPTkRTID0gayksXG4gIChBcy5USU1FX1dJVEhfU0hPUlRfT0ZGU0VUID0gTSksXG4gIChBcy5USU1FX1dJVEhfTE9OR19PRkZTRVQgPSBOKSxcbiAgKEFzLlRJTUVfMjRfU0lNUExFID0gRCksXG4gIChBcy5USU1FXzI0X1dJVEhfU0VDT05EUyA9IEUpLFxuICAoQXMuVElNRV8yNF9XSVRIX1NIT1JUX09GRlNFVCA9IGopLFxuICAoQXMuVElNRV8yNF9XSVRIX0xPTkdfT0ZGU0VUID0geCksXG4gIChBcy5EQVRFVElNRV9TSE9SVCA9IEkpLFxuICAoQXMuREFURVRJTUVfU0hPUlRfV0lUSF9TRUNPTkRTID0gViksXG4gIChBcy5EQVRFVElNRV9NRUQgPSBDKSxcbiAgKEFzLkRBVEVUSU1FX01FRF9XSVRIX1NFQ09ORFMgPSBGKSxcbiAgKEFzLkRBVEVUSU1FX01FRF9XSVRIX1dFRUtEQVkgPSBaKSxcbiAgKEFzLkRBVEVUSU1FX0ZVTEwgPSAkKSxcbiAgKEFzLkRBVEVUSU1FX0ZVTExfV0lUSF9TRUNPTkRTID0gTCksXG4gIChBcy5EQVRFVElNRV9IVUdFID0geiksXG4gIChBcy5EQVRFVElNRV9IVUdFX1dJVEhfU0VDT05EUyA9IHEpO1xuY29uc3QgVXMgPSAnNC4wLjAnO1xuZXhwb3J0IHtcbiAgQXMgYXMgRGF0ZVRpbWUsXG4gIFJlIGFzIER1cmF0aW9uLFxuICBkdCBhcyBGaXhlZE9mZnNldFpvbmUsXG4gIHkgYXMgSUFOQVpvbmUsXG4gIEJlIGFzIEluZm8sXG4gIEdlIGFzIEludGVydmFsLFxuICBoIGFzIEludGwsXG4gIG10IGFzIEludmFsaWRab25lLFxuICBHdCBhcyBPUkRFUkVEX1VOSVRTLFxuICBCdCBhcyBSRVZFUlNFX09SREVSRURfVU5JVFMsXG4gIFN0IGFzIFNldHRpbmdzLFxuICB5dCBhcyBTeXN0ZW1ab25lLFxuICBVcyBhcyBWRVJTSU9OLFxuICBsIGFzIFpvbmUsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHMtbHV4b24uZXM2LmpzLm1hcFxuIl19