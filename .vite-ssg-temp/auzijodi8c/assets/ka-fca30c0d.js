const resource = {
  "button": {
    "about": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["შესახებ"]);
      };
      fn.source = "შესახებ";
      return fn;
    })(),
    "back": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["უკან"]);
      };
      fn.source = "უკან";
      return fn;
    })(),
    "go": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["დაწყება"]);
      };
      fn.source = "დაწყება";
      return fn;
    })(),
    "home": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["მთავარი"]);
      };
      fn.source = "მთავარი";
      return fn;
    })(),
    "toggle_dark": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["გადართე მუქი რეჟიმი"]);
      };
      fn.source = "გადართე მუქი რეჟიმი";
      return fn;
    })(),
    "toggle_langs": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["ენის შეცვლა"]);
      };
      fn.source = "ენის შეცვლა";
      return fn;
    })()
  },
  "intro": {
    "desc": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Opinionated Vite Starter Template"]);
      };
      fn.source = "Opinionated Vite Starter Template";
      return fn;
    })(),
    "dynamic-route": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["დინამიური როუტინგის დემო"]);
      };
      fn.source = "დინამიური როუტინგის დემო";
      return fn;
    })(),
    "hi": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
        return _normalize(["გამარჯობა, ", _interpolate(_named("name")), "!"]);
      };
      fn.source = "გამარჯობა, {name}!";
      return fn;
    })(),
    "aka": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["ასევე ცნობილი როგორც"]);
      };
      fn.source = "ასევე ცნობილი როგორც";
      return fn;
    })(),
    "whats-your-name": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["რა გქვია?"]);
      };
      fn.source = "რა გქვია?";
      return fn;
    })()
  },
  "not-found": (() => {
    const fn = (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["ვერ მოიძებნა"]);
    };
    fn.source = "ვერ მოიძებნა";
    return fn;
  })()
};
export {
  resource as default
};
