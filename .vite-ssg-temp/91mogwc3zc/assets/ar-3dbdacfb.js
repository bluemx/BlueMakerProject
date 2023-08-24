const resource = {
  "button": {
    "about": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["حول"]);
      };
      fn.source = "حول";
      return fn;
    })(),
    "back": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["رجوع"]);
      };
      fn.source = "رجوع";
      return fn;
    })(),
    "go": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["تجربة"]);
      };
      fn.source = "تجربة";
      return fn;
    })(),
    "home": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["الرئيسية"]);
      };
      fn.source = "الرئيسية";
      return fn;
    })(),
    "toggle_dark": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["التغيير إلى الوضع المظلم"]);
      };
      fn.source = "التغيير إلى الوضع المظلم";
      return fn;
    })(),
    "toggle_langs": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["تغيير اللغة"]);
      };
      fn.source = "تغيير اللغة";
      return fn;
    })()
  },
  "intro": {
    "desc": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["vite مثال لتطبيق"]);
      };
      fn.source = "vite مثال لتطبيق";
      return fn;
    })(),
    "dynamic-route": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["عرض لتوجيهات ديناميكية"]);
      };
      fn.source = "عرض لتوجيهات ديناميكية";
      return fn;
    })(),
    "hi": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
        return _normalize(["مرحبا ", _interpolate(_named("name"))]);
      };
      fn.source = "مرحبا {name}";
      return fn;
    })(),
    "aka": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["معروف أيضا تحت مسمى"]);
      };
      fn.source = "معروف أيضا تحت مسمى";
      return fn;
    })(),
    "whats-your-name": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["ما إسمك؟"]);
      };
      fn.source = "ما إسمك؟";
      return fn;
    })()
  },
  "not-found": (() => {
    const fn = (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["صفحة غير موجودة"]);
    };
    fn.source = "صفحة غير موجودة";
    return fn;
  })()
};
export {
  resource as default
};
