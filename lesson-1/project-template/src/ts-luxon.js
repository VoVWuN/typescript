class t extends Error {}

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
    if (!t) return !1;
    try {
      return new h.DateTimeFormat('en-US', { timeZone: t }).format(), !0;
    } catch (t) {
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
    if (isNaN(+e)) return NaN;
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
        } catch (e) {
          throw new i(t);
        }
      return d[t];
    })(this.name);
    let n;
    const [r, a, o, u, c, l, f] =
      typeof s.formatToParts == typeof isNaN
        ? (function (t, e) {
            const s = t.formatToParts(e),
              n = [];
            for (let t = 0; t < s.length; t++) {
              const { type: e, value: r } = s[t],
                i = m[e];
              'era' === e ? (n[i] = r) : Mt(i) || (n[i] = parseInt(r, 10));
            }
            return n;
          })(s, e)
        : (function (t, e) {
            const s = t.format(e).replace(/\u200E/g, ''),
              n = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(s),
              [, r, i, a, o, u, c, l] = n;
            return [a, r, i, o, u, c, l];
          })(s, e);
    'BC' === u && (n = 1 - Math.abs(+r));
    let y = +e;
    const g = y % 1e3;
    return (
      (y -= g >= 0 ? g : 1e3 + g),
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
        6e4
    );
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
const g = 'numeric',
  _ = 'short',
  p = 'long',
  w = { year: g, month: g, day: g },
  O = { year: g, month: _, day: g },
  b = { year: g, month: _, day: g, weekday: _ },
  v = { year: g, month: p, day: g },
  T = { year: g, month: p, day: g, weekday: p },
  S = { hour: g, minute: g },
  k = { hour: g, minute: g, second: g },
  M = { hour: g, minute: g, second: g, timeZoneName: _ },
  N = { hour: g, minute: g, second: g, timeZoneName: p },
  D = { hour: g, minute: g, hourCycle: 'h23' },
  E = { hour: g, minute: g, second: g, hourCycle: 'h23' },
  j = { hour: g, minute: g, second: g, hourCycle: 'h23', timeZoneName: _ },
  x = { hour: g, minute: g, second: g, hourCycle: 'h23', timeZoneName: p },
  I = { year: g, month: g, day: g, hour: g, minute: g },
  V = { year: g, month: g, day: g, hour: g, minute: g, second: g },
  C = { year: g, month: _, day: g, hour: g, minute: g },
  F = { year: g, month: _, day: g, hour: g, minute: g, second: g },
  Z = { year: g, month: _, day: g, weekday: _, hour: g, minute: g },
  $ = { year: g, month: p, day: g, hour: g, minute: g, timeZoneName: _ },
  L = {
    year: g,
    month: p,
    day: g,
    hour: g,
    minute: g,
    second: g,
    timeZoneName: _,
  },
  z = {
    year: g,
    month: p,
    day: g,
    weekday: p,
    hour: g,
    minute: g,
    timeZoneName: p,
  },
  q = {
    year: g,
    month: p,
    day: g,
    weekday: p,
    hour: g,
    minute: g,
    second: g,
    timeZoneName: p,
  },
  A = [
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
  ],
  U = [
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
  ],
  W = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

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
  ],
  R = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  Y = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

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

const G = ['AM', 'PM'],
  B = ['Before Christ', 'Anno Domini'],
  Q = ['BC', 'AD'],
  K = ['B', 'A'];

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
let rt,
  it = {};

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
      const e = (t.offset / 60) * -1,
        r = e >= 0 ? `Etc/GMT+${e}` : `Etc/GMT${e}`;
      0 !== t.offset && y.create(r).isValid
        ? ((n = r), (this._dt = t))
        : ((n = 'UTC'),
          s.timeZoneName
            ? (this._dt = t)
            : (this._dt =
                0 === t.offset
                  ? t
                  : As.fromMillis(t.ts + 60 * t.offset * 1e3)));
    } else
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
          const r = Re.normalizeUnit(t),
            i = {
              years: ['year', 'yr.'],
              quarters: ['quarter', 'qtr.'],
              months: ['month', 'mo.'],
              weeks: ['week', 'wk.'],
              days: ['day', 'day', 'days'],
              hours: ['hour', 'hr.'],
              minutes: ['minute', 'min.'],
              seconds: ['second', 'sec.'],
              milliseconds: [],
            }[r],
            a = -1 === ['hours', 'minutes', 'seconds'].indexOf(r);
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
          const o = Object.is(e, -0) || e < 0,
            u = Math.abs(e),
            c = 1 === u,
            l = n ? (c ? i[1] : i[2] || i[1]) : c ? i[0] : r;
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
      if (-1 === s) return [t];
      {
        let e, n;
        try {
          (e = st(t).resolvedOptions()), (n = t);
        } catch (r) {
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
    return (
      void 0 === this._fastNumbersCached &&
        (this._fastNumbersCached = this._supportsFastNumbers()),
      this._fastNumbersCached
    );
  }

  static fromOpts(t) {
    return lt.create(
      t.locale,
      t.numberingSystem,
      t.outputCalendar,
      t.defaultToEN,
    );
  }

  static create(t, e, s, n = !1) {
    const r = t || St.defaultLocale,
      i =
        r ||
        (n
          ? 'en-US'
          : (rt || (rt = new h.DateTimeFormat().resolvedOptions().locale), rt)),
      a = e || St.defaultNumberingSystem,
      o = s || St.defaultOutputCalendar;
    return new lt(i, a, o, r);
  }

  static resetCache() {
    (rt = void 0), (tt = {}), (et = {}), (nt = {}), (it = {});
  }

  static fromObject({ locale: t, numberingSystem: e, outputCalendar: s } = {}) {
    return lt.create(t, e, s);
  }

  listingMode() {
    const t = this.isEnglish(),
      e = !(
        (null !== this.numberingSystem && 'latn' !== this.numberingSystem) ||
        (null !== this.outputCalendar && 'gregory' !== this.outputCalendar)
      );
    return t && e ? 'en' : 'intl';
  }

  clone(t) {
    return t && 0 !== Object.getOwnPropertyNames(t).length
      ? lt.create(
          t.locale || this._specifiedLocale,
          t.numberingSystem || this.numberingSystem,
          t.outputCalendar || this.outputCalendar,
          t.defaultToEN || !1,
        )
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
      const s = e ? { month: t, day: 'numeric' } : { month: t },
        n = e ? 'format' : 'standalone';
      return (
        this._monthsCache[n][t] ||
          (this._monthsCache[n][t] = (function (t) {
            const e = [];
            for (let s = 1; s <= 12; s++) {
              const n = As.utc(2016, s, 1);
              e.push(t(n));
            }
            return e;
          })(t => this.extract(t, s, 'month'))),
        this._monthsCache[n][t]
      );
    });
  }

  weekdays(t, e = !1) {
    return at(this, t, J, t => {
      const s = e
          ? { weekday: t, year: 'numeric', month: 'long', day: 'numeric' }
          : { weekday: t },
        n = e ? 'format' : 'standalone';
      return (
        this._weekdaysCache[n][t] ||
          (this._weekdaysCache[n][t] = (function (t) {
            const e = [];
            for (let s = 1; s <= 7; s++) {
              const n = As.utc(2016, 11, 13 + s);
              e.push(t(n));
            }
            return e;
          })(t => this.extract(t, s, 'weekday'))),
        this._weekdaysCache[n][t]
      );
    });
  }

  meridiems() {
    return at(
      this,
      'long',
      () => G,
      () => (
        void 0 === this._meridiemCache &&
          (this._meridiemCache = [
            As.utc(2016, 11, 13, 9),
            As.utc(2016, 11, 13, 19),
          ].map(t =>
            this.extract(
              t,
              {
                hour: 'numeric',
                hourCycle: 'h12',
              },
              'dayPeriod',
            ),
          )),
        this._meridiemCache
      ),
    );
  }

  eras(t) {
    return at(this, t, X, t => {
      const e = { era: t };
      return (
        this._eraCache[t] ||
          (this._eraCache[t] = [As.utc(-40, 1, 1), As.utc(2017, 1, 1)].map(t =>
            this.extract(t, e, 'era'),
          )),
        this._eraCache[t]
      );
    });
  }

  extract(t, e, s) {
    const n = this.dtFormatter(t, e)
      .formatToParts()
      .find(t => t.type.toLowerCase() === s.toLowerCase());
    if (!n) throw new Error(`Invalid extract field ${s}`);
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
    return (
      !!~['en', 'en-us'].indexOf(this.locale.toLowerCase()) ||
      new h.DateTimeFormat(this._intl)
        .resolvedOptions()
        .locale.startsWith('en-us')
    );
  }

  equals(t) {
    return (
      this.locale === t.locale &&
      this.numberingSystem === t.numberingSystem &&
      this.outputCalendar === t.outputCalendar
    );
  }

  _supportsFastNumbers() {
    return (
      (!this.numberingSystem || 'latn' === this.numberingSystem) &&
      ('latn' === this.numberingSystem ||
        !this.locale ||
        this.locale.startsWith('en') ||
        'latn' ===
          h.DateTimeFormat(this._intl).resolvedOptions().numberingSystem)
    );
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
      if (e) return new dt(Pt(e[1], e[2]));
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
  if (Mt(t) || null === t) return e;
  if (t instanceof l) return t;
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
let _t,
  pt,
  wt,
  Ot = () => Date.now(),
  bt = 'system',
  vt = 60,
  Tt = !1;

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
  } catch (t) {
    return !1;
  }
}

function jt(t, e, s) {
  if (0 === t.length) return;
  return t.reduce(
    (t, n) => {
      const r = [e(n), n];
      return s(t[0], r[0]) === t[0] ? t : r;
    },
    [e(t[0]), t[0]],
  )[1];
}

function xt(t, e, s) {
  return Dt(t) && t >= e && t <= s;
}

function It(t, e = 2) {
  const s = t < 0 ? '-' : '',
    n = s ? -1 * +t : t;
  let r;
  return (
    (r =
      n.toString().length < e ? ('0'.repeat(e) + n).slice(-e) : n.toString()),
    `${s}${r}`
  );
}

function Vt(t) {
  if (t) return parseInt(t, 10);
}

function Ct(t) {
  if (t) return parseFloat(t);
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
  const s =
    (function (t, e) {
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
  const e = Date.UTC(
    t.year,
    t.month - 1,
    t.day,
    t.hour,
    t.minute,
    t.second,
    t.millisecond,
  );
  if (xt(t.year, 0, 99)) {
    const t = new Date(e);
    return t.setUTCFullYear(t.getUTCFullYear() - 1900), t.getTime();
  }
  return e;
}

function At(t) {
  const e =
      (t + Math.floor(t / 4) - Math.floor(t / 100) + Math.floor(t / 400)) % 7,
    s = t - 1,
    n = (s + Math.floor(s / 4) - Math.floor(s / 100) + Math.floor(s / 400)) % 7;
  return 4 === e || 3 === n ? 53 : 52;
}

function Ut(t) {
  return t > 99 ? t : t > St.twoDigitCutoffYear ? 1900 + t : 2e3 + t;
}

function Wt(t, e, s, n) {
  const r = new Date(t),
    i = {
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: n,
    },
    a = Object.assign({ timeZoneName: e }, i),
    o = new h.DateTimeFormat(s, a)
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
  return Object.keys(t).reduce(
    (s, n) => (void 0 !== t[n] && null !== t[n] && (s[e(n)] = Ht(t[n])), s),
    {},
  );
}

function Yt(t, e) {
  const s = Math.trunc(Math.abs(t / 60)),
    n = Math.trunc(Math.abs(t % 60)),
    r = t >= 0 ? '+' : '-';
  switch (e) {
    case 'short':
      return `${r}${It(s, 2)}:${It(n, 2)}`;
    case 'narrow':
      return `${r}${s}${n > 0 ? `:${n}` : ''}`;
    case 'techie':
      return `${r}${It(s, 2)}${It(n, 2)}`;
    default:
      throw new RangeError(
        `Value format ${e} is out of range for property format`,
      );
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
  ],
  Bt = Gt.slice(0).reverse(),
  Qt = [
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
  for (const n of t) n.literal ? (s += n.val) : (s += e(n.val));
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
    let e = null,
      s = '',
      n = !1;
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
    if (t.invalidReason) return;
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
    if (this._opts.forceSimple) return It(t, e);
    const s = Object.assign({}, this._opts);
    return e > 0 && (s.padTo = e), this._loc.numberFormatter(s).format(t);
  }

  formatDateTimeFromString(t, e) {
    const s = 'en' === this._loc.listingMode(),
      n = this._loc.outputCalendar && 'gregory' !== this._loc.outputCalendar,
      r = (e, s) => this._loc.extract(t, e, s),
      i = e =>
        t.isOffsetFixed && 0 === t.offset && e.allowZ
          ? 'Z'
          : t.isValid
          ? t.zone.formatOffset(t.ts, e.format)
          : '',
      a = () =>
        s
          ? (function (t) {
              return G[t.hour < 12 ? 0 : 1];
            })(t)
          : r({ hour: 'numeric', hourCycle: 'h12' }, 'dayPeriod'),
      o = (e, n) =>
        s
          ? (function (t, e) {
              return P(e)[t.month - 1];
            })(t, e)
          : r(n ? { month: e } : { month: e, day: 'numeric' }, 'month'),
      u = (e, n) =>
        s
          ? (function (t, e) {
              return J(e)[t.weekday - 1];
            })(t, e)
          : r(
              n
                ? { weekday: e }
                : { weekday: e, month: 'long', day: 'numeric' },
              'weekday',
            ),
      c = e => {
        const s = te.macroTokenToFormatOpts(e);
        return s ? this.formatWithSystemDefault(t, s) : e;
      },
      l = e =>
        s
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
          return (
            t.zone.offsetName(t.ts, {
              format: 'short',
              locale: this._loc.locale,
            }) || ''
          );
        case 'ZZZZZ':
          return (
            t.zone.offsetName(t.ts, {
              format: 'long',
              locale: this._loc.locale,
            }) || ''
          );
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
      },
      n = te.parseFormat(e),
      r = n.reduce((t, { literal: e, val: s }) => (e ? t : t.concat(s)), []);
    return Kt(
      n,
      (t => e => {
        const n = s(e);
        return n ? this.num(t.get(n), e.length) : e;
      })(t.shiftTo(...r.map(s).filter(t => !!t))),
    );
  }
}

function ee(...t) {
  const e = t.reduce((t, e) => t + e.source, '');
  return RegExp(`^${e}$`);
}

function se(...t) {
  return e =>
    t
      .reduce(
        ([t, s, n], r) => {
          const [i, a, o] = r(e, n);
          return [Object.assign(Object.assign({}, t), i), a || s, o];
        },
        [{}, null, 1],
      )
      .slice(0, 2);
}

function ne(t, ...e) {
  if (null == t) return [null, null];
  for (const [s, n] of e) {
    const e = s.exec(t);
    if (e) return n(e);
  }
  return [null, null];
}

function re(...t) {
  return (e, s) => {
    const n = {};
    let r;
    for (r = 0; r < t.length; r++) n[t[r]] = Vt(e[s + r]);
    return [n, null, s + r];
  };
}

const ie =
    /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/,
  ae = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,
  oe = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,
  ue = RegExp(`${oe.source}${`(?:${ae.source}?(?:\\[(${ie.source})\\])?)?`}`),
  ce = RegExp(`(?:T${ue.source})?`),
  le = re('weekYear', 'weekNumber', 'weekday'),
  he = re('year', 'ordinal'),
  de = RegExp(`${oe.source} ?(?:${ae.source}|(${ie.source}))?`),
  me = RegExp(`(?: ${de.source})?`);

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
  const s = !t[e] && !t[e + 1],
    n = Pt(t[e + 1], t[e + 2]);
  return [{}, s ? null : dt.instance(n), e + 3];
}

function _e(t, e) {
  return [{}, t[e] ? y.create(t[e]) : null, e + 1];
}

const pe = RegExp(`^T?${oe.source}$`),
  we =
    /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;

function Oe(t) {
  const [e, s, n, r, i, a, o, u, c] = t,
    l = e.startsWith('-'),
    h = !!u && u.startsWith('-'),
    d = (t, e = !1) => ('number' == typeof t && (e || (t && l)) ? -t : t);
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

const Te =
  /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;

function Se(t) {
  const [, e, s, n, r, i, a, o, u, c, l, h] = t,
    d = ve(e, r, n, s, i, a, o);
  let m;
  return (m = u ? be[u] : c ? 0 : Pt(l, h)), [d, new dt(m)];
}

const ke =
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,
  Me =
    /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,
  Ne =
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;

function De(t) {
  const [, e, s, n, r, i, a, o] = t;
  return [ve(e, r, n, s, i, a, o), dt.utcInstance];
}

function Ee(t) {
  const [, e, s, n, r, i, a, o] = t;
  return [ve(e, o, s, n, r, i, a), dt.utcInstance];
}

const je = ee(/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, ce),
  xe = ee(/(\d{4})-?W(\d\d)(?:-?(\d))?/, ce),
  Ie = ee(/(\d{4})-?(\d{3})/, ce),
  Ve = ee(ue),
  Ce = se(
    function (t, e) {
      return [
        { year: fe(t, e, 0), month: fe(t, e + 1, 1), day: fe(t, e + 2, 1) },
        null,
        e + 3,
      ];
    },
    ye,
    ge,
    _e,
  ),
  Fe = se(le, ye, ge, _e),
  Ze = se(he, ye, ge, _e),
  $e = se(ye, ge, _e);
const Le = ee(/(\d{4})-(\d\d)-(\d\d)/, me),
  ze = ee(de),
  qe = se(ye, ge, _e);

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
  },
  We = Object.assign(
    {
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
    },
    Ue,
  ),
  Pe = Object.assign(
    {
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
    },
    Ue,
  );

function He(t, e, s, n, r) {
  const i = t[r][s],
    a = e[s] / i,
    o =
      !(Math.sign(a) === Math.sign(n[r])) && 0 !== n[r] && Math.abs(a) <= 1
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
      : Re.invalid(
          'unparsable',
          `the input "${t}" can't be parsed as ISO 8601`,
        );
  }

  static fromMillis(t, e = {}) {
    return Re.fromObject({ milliseconds: t }, e);
  }

  static fromObject(t, e = {}) {
    if (null == t || 'object' != typeof t)
      throw new o(
        'Duration.fromObject: argument expected to be an object, got ' +
          (null === t ? 'null' : typeof t),
      );
    return new Re({
      values: Rt(t, Re.normalizeUnit),
      loc: lt.fromObject(e),
      conversionAccuracy: e.conversionAccuracy,
      matrix: e.matrix,
    });
  }

  static fromDurationLike(t) {
    if (Nt(t)) return Re.fromMillis(t);
    if (Re.isDuration(t)) return t;
    if ('object' == typeof t) return Re.fromObject(t);
    throw new o(`Unknown duration argument ${t} of type ${typeof t}`);
  }

  static fromISO(t, e) {
    const [s] = (function (t) {
      return ne(t, [we, Oe]);
    })(t);
    return s
      ? Re.fromObject(s, e)
      : Re.invalid(
          'unparsable',
          `the input "${t}" can't be parsed as ISO 8601`,
        );
  }

  static isDuration(t) {
    return (!!t && t._isLuxonDuration) || !1;
  }

  static invalid(t, e) {
    if (!t) throw new o('need to specify a reason the Duration is invalid');
    const n = t instanceof Ae ? t : new Ae(t, e);
    if (St.throwOnInvalid) throw new s(n);
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
    if (!e) throw new r(t);
    return e;
  }

  getMaxUnit(t = !1) {
    const e = t ? Qt : Gt,
      s = this.shiftTo(...e).toObject();
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
    const e = this.getMaxUnit(!0),
      s = t.onlyHumanUnits ? Qt : Gt,
      n = this.shiftTo(...s.slice(s.indexOf(e))).toObject(),
      r = s
        .map(e => {
          const s = n[e];
          return Mt(s) || 0 === s
            ? null
            : this._loc
                .numberFormatter(
                  Object.assign(
                    Object.assign(
                      {
                        style: 'unit',
                        unitDisplay: 'long',
                      },
                      t,
                    ),
                    { unit: e.slice(0, -1) },
                  ),
                )
                .format(s);
        })
        .filter(t => t),
      i = Object.assign(
        { type: 'conjunction', style: t.listStyle || 'narrow' },
        t,
      );
    return this._loc.listFormatter(i).format(r);
  }

  toObject() {
    return this.isValid ? Object.assign({}, this._values) : {};
  }

  toISO() {
    if (!this.isValid) return null;
    let t = 'P';
    return (
      0 !== this.years && (t += this.years + 'Y'),
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
      t
    );
  }

  toISOTime(t = {}) {
    if (!this.isValid) return null;
    const e = this.toMillis();
    if (e < 0 || e >= 864e5) return null;
    t = Object.assign(
      {
        suppressMilliseconds: !1,
        suppressSeconds: !1,
        includePrefix: !1,
        format: 'extended',
      },
      t,
    );
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
    if (!this.isValid) return this;
    const e = Re.fromDurationLike(t),
      s = {};
    return (
      Gt.forEach(t => {
        (void 0 === e._values[t] && void 0 === this._values[t]) ||
          (s[t] = e.get(t) + this.get(t));
      }),
      this._clone(this, { values: s }, !0)
    );
  }

  minus(t) {
    if (!this.isValid) return this;
    const e = Re.fromDurationLike(t);
    return this.plus(e.negate());
  }

  mapUnits(t) {
    if (!this.isValid) return this;
    const e = {};
    return (
      Object.keys(this._values).forEach(s => {
        e[s] = Ht(t(this._values[s], s));
      }),
      this._clone(this, { values: e }, !0)
    );
  }

  get(t) {
    return this[Re.normalizeUnit(t)];
  }

  set(t) {
    if (!this.isValid) return this;
    const e = Object.assign(
      Object.assign({}, this._values),
      Rt(t, Re.normalizeUnit),
    );
    return this._clone(this, { values: e });
  }

  reconfigure({
    locale: t,
    numberingSystem: e,
    conversionAccuracy: s,
    matrix: n,
  } = {}) {
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
    if (!this.isValid) return this;
    const t = this.toObject();
    return (
      (function (t, e) {
        let s;
        Bt.forEach(n => {
          Mt(e[n]) || (s && He(t, e, s, e, n), (s = n));
        });
      })(this._matrix, t),
      this._clone(this, { values: t }, !0)
    );
  }

  rescale() {
    if (!this.isValid) return this;
    const t = (function (t = {}) {
      return Object.entries(t).reduce(
        (t, [e, s]) => (0 !== s && (t[e] = s), t),
        {},
      );
    })(this.normalize().shiftToAll().toObject());
    return this._clone(this, { values: t }, !0);
  }

  shiftTo(...t) {
    if (!this.isValid || 0 === t.length) return this;
    t = t.map(t => Re.normalizeUnit(t));
    const e = {},
      s = {},
      n = this.toObject();
    let r;
    return (
      Gt.forEach(i => {
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
        } else Nt(n[i]) && (s[i] = n[i]);
      }),
      Object.keys(s).forEach(t => {
        const n = s[t];
        0 !== n && (e[r] += t === r ? n : n / this._matrix[r][t]);
      }),
      this._clone(this, { values: e }, !0).normalize()
    );
  }

  shiftToAll() {
    return this.isValid
      ? this.shiftTo(
          'years',
          'months',
          'weeks',
          'days',
          'hours',
          'minutes',
          'seconds',
          'milliseconds',
        )
      : this;
  }

  negate() {
    if (!this.isValid) return this;
    const t = {};
    return (
      Object.keys(this._values).forEach(e => {
        t[e] = 0 === this._values[e] ? 0 : -this._values[e];
      }),
      this._clone(this, { values: t }, !0)
    );
  }

  equals(t) {
    if (!this.isValid || !t.isValid) return !1;
    if (!this._loc.equals(t._loc)) return !1;
    for (const n of Gt)
      if (
        ((e = this._values[n]),
        (s = t._values[n]),
        !(void 0 === e || 0 === e ? void 0 === s || 0 === s : e === s))
      )
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
  if (As.isDateTime(t)) return t;
  if (t && t.valueOf && Nt(t.valueOf())) return As.fromJSDate(t);
  if (t && 'object' == typeof t) return As.fromObject(t);
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
    const s = Je(t),
      n = Je(e),
      r = (function (t, e) {
        return t && t.isValid
          ? e && e.isValid
            ? e < t
              ? Ge.invalid(
                  'end before start',
                  `The end of an interval must be after its start, but you had start=${t.toISO()} and end=${e.toISO()}`,
                )
              : void 0
            : Ge.invalid('missing or invalid end')
          : Ge.invalid('missing or invalid start');
      })(s, n);
    return r || new Ge({ start: s, end: n });
  }

  static after(t, e) {
    const s = Re.fromDurationLike(e),
      n = Je(t);
    return new Ge({ start: n, end: n ? n.plus(s) : void 0 });
  }

  static before(t, e) {
    const s = Re.fromDurationLike(e),
      n = Je(t);
    return new Ge({ start: n ? n.minus(s) : void 0, end: n });
  }

  static fromISO(t, e = {}) {
    const [s, n] = (t || '').split('/', 2);
    if (s && n) {
      let t, r, i, a;
      try {
        (t = As.fromISO(s, e)), (r = t.isValid);
      } catch (n) {
        r = !1;
      }
      try {
        (i = As.fromISO(n, e)), (a = i.isValid);
      } catch (n) {
        a = !1;
      }
      if (r && a) return Ge.fromDateTimes(t, i);
      if (r) {
        const s = Re.fromISO(n, e);
        if (s.isValid) return Ge.after(t, s);
      } else if (a) {
        const t = Re.fromISO(s, e);
        if (t.isValid) return Ge.before(i, t);
      }
    }
    return Ge.invalid(
      'unparsable',
      `the input "${t}" can't be parsed as ISO 8601`,
    );
  }

  static invalid(t, e) {
    if (!t) throw new o('need to specify a reason the Interval is invalid');
    const s = t instanceof Ae ? t : new Ae(t, e);
    if (St.throwOnInvalid) throw new n(s);
    return new Ge({ invalid: s });
  }

  static isInterval(t) {
    return (!!t && t._isLuxonInterval) || !1;
  }

  static merge(t) {
    const [e, s] = t
      .sort((t, e) => t._s.valueOf() - e._s.valueOf())
      .reduce(
        ([t, e], s) =>
          e
            ? e.overlaps(s) || e.abutsStart(s)
              ? [t, e.union(s)]
              : [t.concat([e]), s]
            : [t, s],
        [[], null],
      );
    return s && e.push(s), e;
  }

  static xor(t) {
    let e = null,
      s = 0;
    const n = [],
      r = t.map(t => [
        { time: t._s, type: 's' },
        { time: t._e, type: 'e' },
      ]),
      i = Array.prototype.concat(...r).sort((t, e) => +t.time - +e.time);
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
    if (!this.isValid) return NaN;
    const e = this.start.startOf(t),
      s = this.end.startOf(t);
    return Math.floor(s.diff(e, t).get(t)) + 1;
  }

  hasSame(t) {
    return (
      !!this.isValid && (this.isEmpty() || this._e.minus(1).hasSame(this._s, t))
    );
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
        .sort(),
      s = [];
    let n = this._s,
      r = 0;
    for (; n < this._e; ) {
      const t = e[r] || this._e,
        i = +t > +this._e ? this._e : t;
      s.push(Ge.fromDateTimes(n, i)), (n = i), (r += 1);
    }
    return s;
  }

  splitBy(t) {
    const e = Re.fromDurationLike(t);
    if (!this.isValid || !e.isValid || 0 === e.as('milliseconds')) return [];
    let s,
      n = this._s,
      r = 1;
    const i = [];
    for (; n < this._e; ) {
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
    return (
      !(!this.isValid || !t.isValid) &&
      this._s.equals(t._s) &&
      this._e.equals(t._e)
    );
  }

  intersection(t) {
    if (!this.isValid) return this;
    const e = this._s > t._s ? this._s : t._s,
      s = this._e < t._e ? this._e : t._e;
    return e >= s ? null : Ge.fromDateTimes(e, s);
  }

  union(t) {
    if (!this.isValid) return this;
    const e = this._s < t._s ? this._s : t._s,
      s = this._e > t._e ? this._e : t._e;
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

  static months(
    t = 'long',
    {
      locale: e,
      locObj: s,
      numberingSystem: n,
      outputCalendar: r = 'gregory',
    } = {},
  ) {
    return (s || lt.create(e, n, r)).months(t);
  }

  static monthsFormat(
    t = 'long',
    {
      locale: e,
      locObj: s,
      numberingSystem: n,
      outputCalendar: r = 'gregory',
    } = {},
  ) {
    return (s || lt.create(e, n, r)).months(t, !0);
  }

  static weekdays(
    t = 'long',
    { locale: e, locObj: s, numberingSystem: n } = {},
  ) {
    return (s || lt.create(e, n)).weekdays(t);
  }

  static weekdaysFormat(
    t = 'long',
    { locale: e, locObj: s, numberingSystem: n } = {},
  ) {
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
  const s = t => t.toUTC(0, { keepLocalTime: !0 }).startOf('days').valueOf(),
    n = s(e) - s(t);
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
        ],
        r = {},
        i = t;
      let a, o;
      for (const [u, c] of n)
        s.indexOf(u) >= 0 &&
          ((a = u),
          (r[u] = c(t, e)),
          (o = i.plus(r)),
          o > e ? (r[u]--, (t = i.plus(r))) : (t = o));
      return [t, r, o, a];
    })(t, e, s);
    const u = +e - +r,
      c = s.filter(
        t => ['hours', 'minutes', 'seconds', 'milliseconds'].indexOf(t) >= 0,
      );
    0 === c.length &&
      (a < e && (a = r.plus({ [o]: 1 })),
      a !== r && (i[o] = (i[o] || 0) + u / (+a - +r)));
    const l = Re.fromObject(i, n);
    return c.length > 0
      ? Re.fromMillis(u, n)
          .shiftTo(...c)
          .plus(l)
      : l;
  },
  Xe = {
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
  },
  ts = {
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
  },
  es = Xe.hanidec.replace(/[\[|\]]/g, '').split('');

function ss(t, e = '') {
  return new RegExp(`${Xe[t.numberingSystem || 'latn']}${e}`);
}

function ns(t, e = t => t) {
  return {
    regex: t,
    deser: ([t]) =>
      e(
        (function (t) {
          const e = parseInt(t, 10);
          if (!isNaN(e)) return e;
          let s = '';
          for (let e = 0; e < t.length; e++) {
            const n = t.charCodeAt(e);
            if (-1 !== t[e].search(Xe.hanidec)) s += es.indexOf(t[e]);
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
        })(t),
      ),
  };
}

const rs = `[ ${String.fromCharCode(160)}]`,
  is = new RegExp(rs, 'g');

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
  return Array.prototype.concat(
    ...t.map(t =>
      (function (t, e) {
        if (t.literal) return t;
        const s = gs(te.macroTokenToFormatOpts(t.val), e);
        return null == s || s.includes(void 0) ? t : s;
      })(t, e),
    ),
  );
}

function ys(t, e, s) {
  const n = fs(te.parseFormat(s), t),
    r = n.map(e =>
      (function (t, e) {
        const s = ss(e),
          n = ss(e, '{2}'),
          r = ss(e, '{3}'),
          i = ss(e, '{4}'),
          a = ss(e, '{6}'),
          o = ss(e, '{1,2}'),
          u = ss(e, '{1,3}'),
          c = ss(e, '{1,6}'),
          l = ss(e, '{1,9}'),
          h = ss(e, '{2,4}'),
          d = ss(e, '{4,6}'),
          m = t => {
            return {
              regex: RegExp(
                ((e = t.val), e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')),
              ),
              deser: ([t]) => t,
              literal: !0,
            };
            var e;
          },
          f = (f => {
            if (t.literal) return m(f);
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
                return cs(
                  new RegExp(`([+-]${o.source})(?::(${n.source}))?`),
                  2,
                );
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
      })(e, t),
    ),
    i = r.find(ms);
  if (i) return { input: e, tokens: n, invalidReason: i.invalidReason };
  {
    const t = (function (t) {
        return `^${t
          .map(t => t.regex)
          .reduce((t, e) => `${t}(${e.source})`, '')}$`;
      })(r),
      s = RegExp(t, 'i'),
      [i, o] = (function (t, e, s) {
        const n = e.exec(t),
          r = {};
        if (null !== n) {
          let t = 1;
          s.forEach(e => {
            const s = e.groups ? e.groups + 1 : 1;
            e.literal || (r[e.token.val[0]] = e.deser(n.slice(t, t + s))),
              (t += s);
          });
        }
        return [n, r];
      })(e, s, r),
      [u, c, l] = o
        ? (function (t) {
            let e,
              s = null;
            return (
              kt(t.z) && (s = y.create(t.z)),
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
              ]
            );
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
  if (!t) return null;
  return te
    .create(e, t)
    .formatDateTimeParts(
      (function (t) {
        return (
          void 0 === ds &&
            (ds = As.fromMillis(1555555555555, { locale: t.locale })),
          ds
        );
      })(e),
    )
    .map(e =>
      (function (t, e) {
        const { type: s, value: n } = t;
        if ('literal' === s) return { literal: !0, val: n };
        if ('dayPeriod' === s) return { literal: !1, val: 'a' };
        const r = hs[s];
        if (void 0 !== r) {
          const t = e[s];
          if (t) {
            const e = r[t];
            if (void 0 !== e) return { literal: !1, val: e };
          }
        }
      })(e, t),
    );
}

const _s = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
  ps = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];

function ws(t, e) {
  return new Ae(
    'unit out of range',
    `you specified ${e} (of type ${typeof e}) as a ${t}, which is invalid`,
  );
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
  const s = $t(t) ? ps : _s,
    n = s.findIndex(t => t < e);
  return { month: n + 1, day: e - s[n] };
}

function Ts(t) {
  const { year: e, month: s, day: n } = t,
    r = bs(e, s, n),
    i = Os(e, s, n);
  let a,
    o = Math.floor((r - i + 10) / 7);
  return (
    o < 1
      ? ((a = e - 1), (o = At(a)))
      : o > At(e)
      ? ((a = e + 1), (o = 1))
      : (a = e),
    Object.assign(
      {
        weekYear: a,
        weekNumber: o,
        weekday: i,
      },
      Jt(t),
    )
  );
}

function Ss(t) {
  const { weekYear: e, weekNumber: s, weekday: n } = t,
    r = Os(e, 1, 4),
    i = Lt(e);
  let a,
    o = 7 * s + n - r - 3;
  o < 1
    ? ((a = e - 1), (o += Lt(a)))
    : o > i
    ? ((a = e + 1), (o -= Lt(e)))
    : (a = e);
  const { month: u, day: c } = vs(a, o);
  return Object.assign({ year: a, month: u, day: c }, Jt(t));
}

function ks(t) {
  const { year: e, month: s, day: n } = t,
    r = bs(e, s, n);
  return Object.assign({ year: e, ordinal: r }, Jt(t));
}

function Ms(t) {
  const { year: e, ordinal: s } = t,
    { month: n, day: r } = vs(e, s);
  return Object.assign({ year: e, month: n, day: r }, Jt(t));
}

function Ns(t) {
  const e = Dt(t.year),
    s = xt(t.month, 1, 12),
    n = xt(t.day, 1, zt(t.year, t.month));
  return e
    ? s
      ? !n && ws('day', t.day)
      : ws('month', t.month)
    : ws('year', t.year);
}

function Ds(t) {
  const { hour: e, minute: s, second: n, millisecond: r } = t,
    i = xt(e, 0, 23) || (24 === e && 0 === s && 0 === n && 0 === r),
    a = xt(s, 0, 59),
    o = xt(n, 0, 59),
    u = xt(r, 0, 999);
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
  if (e === r) return [n, e];
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
    const n = e || o,
      r = As.fromObject(
        t,
        Object.assign(Object.assign({}, s), { zone: n, specificOffset: i }),
      );
    return a ? r : r.setZone(o);
  }
  return As.invalid(
    new Ae('unparsable', `the input "${r}" can't be parsed as ${n}`),
  );
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
  },
  Fs = {
    weekNumber: 1,
    weekday: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  },
  Zs = { ordinal: 1, hour: 0, minute: 0, second: 0, millisecond: 0 },
  $s = ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'],
  Ls = [
    'weekYear',
    'weekNumber',
    'weekday',
    'hour',
    'minute',
    'second',
    'millisecond',
  ],
  zs = ['year', 'ordinal', 'hour', 'minute', 'second', 'millisecond'];

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
  if (!e) throw new r(t);
  return e;
}

class As {
  constructor(t) {
    const e = t.zone || St.defaultZone;
    let s,
      n,
      r =
        t.invalid ||
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
    return (
      !this.isOffsetFixed &&
      (this.offset >
        this.set({
          month: 1,
          day: 1,
        }).offset ||
        this.offset > this.set({ month: 5 }).offset)
    );
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
    const [e, s] = this._lastOpts(t),
      [n, r, i, a, o, u, c] = s;
    return As._quickDT(
      {
        year: n,
        month: r,
        day: i,
        hour: a,
        minute: o,
        second: u,
        millisecond: c,
      },
      e,
    );
  }

  static utc(...t) {
    const [e, s] = this._lastOpts(t),
      [n, r, i, a, o, u, c] = s;
    return (
      (e.zone = dt.utcInstance),
      this._quickDT(
        {
          year: n,
          month: r,
          day: i,
          hour: a,
          minute: o,
          second: u,
          millisecond: c,
        },
        e,
      )
    );
  }

  static fromJSDate(t, e = {}) {
    const s =
      ((n = t),
      '[object Date]' === Object.prototype.toString.call(n)
        ? t.valueOf()
        : NaN);
    var n;
    if (Number.isNaN(s)) return As.invalid('invalid input');
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
    throw new o(
      `fromMillis requires a numerical input, but received a ${typeof t} with value ${t}`,
    );
  }

  static fromSeconds(t, e = {}) {
    if (!Nt(t)) throw new o('fromSeconds requires a numerical input');
    return new As({
      ts: 1e3 * t,
      zone: gt(e.zone, St.defaultZone),
      loc: lt.fromObject(e),
    });
  }

  static fromObject(t = {}, e = {}) {
    const s = gt(e.zone, St.defaultZone);
    if (!s.isValid) return As.invalid(As._unsupportedZone(s));
    const n = St.now(),
      r = Nt(e.specificOffset) ? e.specificOffset : s.offset(n),
      i = Rt(t, qs),
      o = kt(i.ordinal),
      u = kt(i.year),
      c = kt(i.month) || kt(i.day),
      l = u || c,
      h = i.weekYear || i.weekNumber,
      d = lt.fromObject(e);
    if ((l || o) && h)
      throw new a(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals",
      );
    if (c && o) throw new a("Can't mix ordinal dates with month/day");
    const m = h || (i.weekday && !l),
      f = js(n, r),
      y = {
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
      return ne(
        (function (t) {
          return t
            .replace(/\([^()]*\)|[\n\t]/g, ' ')
            .replace(/(\s\s+)/g, ' ')
            .trim();
        })(t),
        [Te, Se],
      );
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
    const { locale: n, numberingSystem: r } = s,
      i = lt.fromOpts({ locale: n, numberingSystem: r, defaultToEN: !0 }),
      [a, u, c, l] = (function (t, e, s) {
        const {
          result: n,
          zone: r,
          specificOffset: i,
          invalidReason: a,
        } = ys(t, e, s);
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
    if (!t) throw new o('need to specify a reason the DateTime is invalid');
    const n = t instanceof Ae ? t : new Ae(t, s);
    if (St.throwOnInvalid) throw new e(n);
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
    return ys(
      lt.fromOpts({ locale: n, numberingSystem: r, defaultToEN: !0 }),
      t,
      e,
    );
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
    const i =
      (t.useWeekData
        ? (function (t) {
            const e = Dt(t.weekYear),
              s = xt(t.weekNumber, 1, At(t.weekYear)),
              n = xt(t.weekday, 1, 7);
            return e
              ? s
                ? !n && ws('weekday', t.weekday)
                : ws('week', t.weekNumber)
              : ws('weekYear', t.weekYear);
          })(t.normalized)
        : t.containsOrdinal
        ? (function (t) {
            const e = Dt(t.year),
              s = xt(t.ordinal, 1, Lt(t.year));
            return e ? !s && ws('ordinal', t.ordinal) : ws('year', t.year);
          })(t.normalized)
        : Ns(t.normalized)) || Ds(t.normalized);
    if (i) return As.invalid(i);
    const a = t.useWeekData
        ? Ss(t.normalized)
        : t.containsOrdinal
        ? Ms(t.normalized)
        : t.normalized,
      [o, u] = xs(a, t.offsetProvis, t.zoneToUse),
      c = new As({ ts: o, zone: t.zoneToUse, o: u, loc: t.loc });
    return t.normalized.weekday &&
      t.containsGregor &&
      t.obj.weekday !== c.weekday
      ? As.invalid(
          'mismatched weekday',
          `you can't specify both a weekday of ${
            t.normalized.weekday
          } and a date of ${c.toISO()}`,
        )
      : c;
  }

  static _lastOpts(t) {
    let e,
      s = {};
    return (
      t.length > 0 && 'object' == typeof t[t.length - 1]
        ? ((s = t.pop()), (e = t))
        : (e = Array.from(t)),
      [s, e]
    );
  }

  static _quickDT(t, e) {
    const s = gt(e.zone, St.defaultZone),
      n = lt.fromObject(e),
      r = St.now();
    let i, a;
    if (kt(t.year)) {
      for (const e of $s) Mt(t[e]) && (t[e] = Cs[e]);
      const e = Ns(t) || Ds(t);
      if (e) return As.invalid(e);
      const n = s.offset(r);
      [i, a] = xs(t, n, s);
    } else i = r;
    return new As({ ts: i, zone: s, loc: n, o: a });
  }

  static _diffRelative(t, e, s) {
    const n = !!Mt(s.round) || s.round,
      r = (t, r) => {
        t = Zt(t, n || s.calendary ? 0 : 2, !0);
        return e._loc.clone(s).relFormatter(s).format(t, r);
      },
      i = n =>
        s.calendary
          ? e.hasSame(t, n)
            ? 0
            : e.startOf(n).diff(t.startOf(n), n).get(n)
          : e.diff(t, n).get(n);
    if (s.unit) return r(i(s.unit), s.unit);
    for (const t of s.units) {
      const e = i(t);
      if (Math.abs(e) >= 1) return r(e, t);
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
    const {
      locale: e,
      numberingSystem: s,
      calendar: n,
    } = te.create(this._loc.clone(t), t).resolvedOptions(this);
    return { locale: e, numberingSystem: s, outputCalendar: n };
  }

  toLocal() {
    return this.setZone(St.defaultZone);
  }

  toUTC(t = 0, e = {}) {
    return this.setZone(dt.instance(t), e);
  }

  setZone(t, { keepLocalTime: e = !1, keepCalendarTime: s = !1 } = {}) {
    if ((t = gt(t, St.defaultZone)).equals(this.zone)) return this;
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
    if (!this.isValid) return this;
    const e = Rt(t, qs),
      s = kt(e.weekYear) || kt(e.weekNumber) || kt(e.weekday),
      n = kt(e.ordinal),
      r = kt(e.year),
      i = kt(e.month) || kt(e.day),
      o = r || i,
      u = e.weekYear || e.weekNumber;
    if ((o || n) && u)
      throw new a(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals",
      );
    if (i && n) throw new a("Can't mix ordinal dates with month/day");
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
    if (!this.isValid) return this;
    const e = Re.fromDurationLike(t);
    return this._clone(this._adjustTime(e));
  }

  minus(t) {
    if (!this.isValid) return this;
    const e = Re.fromDurationLike(t).negate();
    return this._clone(this._adjustTime(e));
  }

  startOf(t) {
    if (!this.isValid) return this;
    const e = {},
      s = Re.normalizeUnit(t);
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

  toISO({
    format: t = 'extended',
    suppressSeconds: e = !1,
    suppressMilliseconds: s = !1,
    includeOffset: n = !0,
    extendedZone: r = !1,
  } = {}) {
    if (!this.isValid) return null;
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

  toISOTime({
    suppressMilliseconds: t = !1,
    suppressSeconds: e = !1,
    includeOffset: s = !0,
    includePrefix: n = !1,
    extendedZone: r = !1,
    format: i = 'extended',
  } = {}) {
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

  toSQLTime({
    includeOffset: t = !0,
    includeZone: e = !1,
    includeOffsetSpace: s = !0,
  } = {}) {
    let n = 'HH:mm:ss.SSS';
    return (
      (e || t) && (s && (n += ' '), e ? (n += 'z') : t && (n += 'ZZ')),
      Vs(this, n, !0)
    );
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
    if (!this.isValid) return {};
    const e = Object.assign({}, this._c);
    return (
      t.includeConfig &&
        ((e.outputCalendar = this.outputCalendar),
        (e.numberingSystem = this._loc.numberingSystem),
        (e.locale = this._loc.locale)),
      e
    );
  }

  toJSDate() {
    return new Date(this.isValid ? this._ts : NaN);
  }

  diff(t, e = 'milliseconds', s = {}) {
    if (!this.isValid || !t.isValid) {
      const e = this.invalidReason || t.invalidReason;
      return Re.invalid(e, 'created by diffing an invalid DateTime');
    }
    const n = ((a = e), Array.isArray(a) ? a : [a]).map(Re.normalizeUnit),
      r = t.valueOf() > this.valueOf(),
      i = Ke(
        r ? this : t,
        r ? t : this,
        n,
        Object.assign(
          {
            locale: this.locale,
            numberingSystem: this.numberingSystem,
          },
          s,
        ),
      );
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
    if (!this.isValid) return !1;
    const s = t.valueOf(),
      n = this.setZone(t.zone, { keepLocalTime: !0 });
    return +n.startOf(e) <= s && s <= +n.endOf(e);
  }

  equals(t) {
    return (
      this.valueOf() === t.valueOf() &&
      this.zone.equals(t.zone) &&
      this._loc.equals(t._loc)
    );
  }

  toRelative(t = {}) {
    if (!this.isValid) return null;
    const e = t.base || As.fromObject({}, { zone: this.zone }),
      s = t.padding ? (this < e ? -t.padding : t.padding) : 0;
    let n = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'],
      r = t.unit;
    return (
      Array.isArray(t.unit) && ((n = t.unit), (r = void 0)),
      As._diffRelative(
        e,
        this.plus(s),
        Object.assign(Object.assign({}, t), {
          numeric: 'always',
          units: n,
          unit: r,
        }),
      )
    );
  }

  toRelativeCalendar(t = {}) {
    return this.isValid
      ? As._diffRelative(
          t.base || As.fromObject({}, { zone: this.zone }),
          this,
          Object.assign(Object.assign({}, t), {
            numeric: 'auto',
            units: ['years', 'months', 'days'],
            calendary: !0,
          }),
        )
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
    return new As(
      Object.assign(Object.assign(Object.assign({}, e), t), { old: e }),
    );
  }

  _adjustTime(t) {
    const e = this._o,
      s = this._c.year + Math.trunc(t.years),
      n = this._c.month + Math.trunc(t.months) + 3 * Math.trunc(t.quarters),
      r = Object.assign(Object.assign({}, this._c), {
        year: s,
        month: n,
        day:
          Math.min(this._c.day, zt(s, n)) +
          Math.trunc(t.days) +
          7 * Math.trunc(t.weeks),
      }),
      i = Re.fromObject({
        years: t.years - Math.trunc(t.years),
        quarters: t.quarters - Math.trunc(t.quarters),
        months: t.months - Math.trunc(t.months),
        weeks: t.weeks - Math.trunc(t.weeks),
        days: t.days - Math.trunc(t.days),
        hours: t.hours,
        minutes: t.minutes,
        seconds: t.seconds,
        milliseconds: t.milliseconds,
      }).as('milliseconds'),
      a = qt(r);
    let [o, u] = Es(a, e, this.zone);
    return 0 !== i && ((o += i), (u = this.zone.offset(o))), { ts: o, o: u };
  }

  _toISODate(t) {
    const e = this._c.year > 9999 || this._c.year < 0;
    let s = '';
    return (
      e && this._c.year >= 0 && (s += '+'),
      (s += It(this._c.year, e ? 6 : 4)),
      t
        ? ((s += '-'),
          (s += It(this._c.month)),
          (s += '-'),
          (s += It(this._c.day)))
        : ((s += It(this._c.month)), (s += It(this._c.day))),
      s
    );
  }

  _toISOTime(t, e, s, n, r) {
    let i = It(this._c.hour);
    return (
      t
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
      i
    );
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
export {
  As as DateTime,
  Re as Duration,
  dt as FixedOffsetZone,
  y as IANAZone,
  Be as Info,
  Ge as Interval,
  h as Intl,
  mt as InvalidZone,
  Gt as ORDERED_UNITS,
  Bt as REVERSE_ORDERED_UNITS,
  St as Settings,
  yt as SystemZone,
  Us as VERSION,
  l as Zone,
};
//# sourceMappingURL=ts-luxon.es6.js.map