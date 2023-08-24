const resource = {
  "button": {
    "about": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Haqida"]);
      };
      fn.source = "Haqida";
      return fn;
    })(),
    "back": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Orqaga"]);
      };
      fn.source = "Orqaga";
      return fn;
    })(),
    "go": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Kettik"]);
      };
      fn.source = "Kettik";
      return fn;
    })(),
    "home": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Bosh sahifa"]);
      };
      fn.source = "Bosh sahifa";
      return fn;
    })(),
    "toggle_dark": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Qorong‘i rejimga o‘tish"]);
      };
      fn.source = "Qorong‘i rejimga o‘tish";
      return fn;
    })(),
    "toggle_langs": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Tilni o‘zgartirish"]);
      };
      fn.source = "Tilni o‘zgartirish";
      return fn;
    })()
  },
  "intro": {
    "desc": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["O‘ylangan boshlang‘ich Vite shabloni"]);
      };
      fn.source = "O‘ylangan boshlang‘ich Vite shabloni";
      return fn;
    })(),
    "dynamic-route": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Dynamic route demo'si"]);
      };
      fn.source = "Dynamic route demo'si";
      return fn;
    })(),
    "hi": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
        return _normalize(["Assalomu alaykum, ", _interpolate(_named("name")), "!"]);
      };
      fn.source = "Assalomu alaykum, {name}!";
      return fn;
    })(),
    "aka": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["shuningdek"]);
      };
      fn.source = "shuningdek";
      return fn;
    })(),
    "whats-your-name": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ismingiz nima?"]);
      };
      fn.source = "Ismingiz nima?";
      return fn;
    })()
  },
  "not-found": (() => {
    const fn = (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Topilmadi"]);
    };
    fn.source = "Topilmadi";
    return fn;
  })()
};
export {
  resource as default
};
