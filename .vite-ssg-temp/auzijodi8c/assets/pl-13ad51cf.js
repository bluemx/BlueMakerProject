const resource = {
  "button": {
    "about": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["O nas"]);
      };
      fn.source = "O nas";
      return fn;
    })(),
    "back": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Wróć"]);
      };
      fn.source = "Wróć";
      return fn;
    })(),
    "go": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["WEJDŹ"]);
      };
      fn.source = "WEJDŹ";
      return fn;
    })(),
    "home": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Strona główna"]);
      };
      fn.source = "Strona główna";
      return fn;
    })(),
    "toggle_dark": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ustaw tryb nocny"]);
      };
      fn.source = "Ustaw tryb nocny";
      return fn;
    })(),
    "toggle_langs": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Zmień język"]);
      };
      fn.source = "Zmień język";
      return fn;
    })()
  },
  "intro": {
    "desc": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Opiniowany szablon startowy Vite"]);
      };
      fn.source = "Opiniowany szablon startowy Vite";
      return fn;
    })(),
    "dynamic-route": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Demonstracja dynamicznego route"]);
      };
      fn.source = "Demonstracja dynamicznego route";
      return fn;
    })(),
    "hi": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
        return _normalize(["Cześć, ", _interpolate(_named("name")), "!"]);
      };
      fn.source = "Cześć, {name}!";
      return fn;
    })(),
    "aka": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Znany też jako"]);
      };
      fn.source = "Znany też jako";
      return fn;
    })(),
    "whats-your-name": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Jak masz na imię?"]);
      };
      fn.source = "Jak masz na imię?";
      return fn;
    })()
  },
  "not-found": (() => {
    const fn = (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Nie znaleziono"]);
    };
    fn.source = "Nie znaleziono";
    return fn;
  })()
};
export {
  resource as default
};
