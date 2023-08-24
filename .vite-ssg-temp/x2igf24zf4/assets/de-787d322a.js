const resource = {
  "button": {
    "about": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Über"]);
      };
      fn.source = "Über";
      return fn;
    })(),
    "back": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Zurück"]);
      };
      fn.source = "Zurück";
      return fn;
    })(),
    "go": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Los"]);
      };
      fn.source = "Los";
      return fn;
    })(),
    "home": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Startseite"]);
      };
      fn.source = "Startseite";
      return fn;
    })(),
    "toggle_dark": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Dunkelmodus umschalten"]);
      };
      fn.source = "Dunkelmodus umschalten";
      return fn;
    })(),
    "toggle_langs": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Sprachen ändern"]);
      };
      fn.source = "Sprachen ändern";
      return fn;
    })()
  },
  "intro": {
    "desc": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Vite Startvorlage mit Vorlieben"]);
      };
      fn.source = "Vite Startvorlage mit Vorlieben";
      return fn;
    })(),
    "dynamic-route": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Demo einer dynamischen Route"]);
      };
      fn.source = "Demo einer dynamischen Route";
      return fn;
    })(),
    "hi": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
        return _normalize(["Hi, ", _interpolate(_named("name")), "!"]);
      };
      fn.source = "Hi, {name}!";
      return fn;
    })(),
    "aka": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Auch bekannt als"]);
      };
      fn.source = "Auch bekannt als";
      return fn;
    })(),
    "whats-your-name": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Wie heißt du?"]);
      };
      fn.source = "Wie heißt du?";
      return fn;
    })()
  },
  "not-found": (() => {
    const fn = (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Nicht gefunden"]);
    };
    fn.source = "Nicht gefunden";
    return fn;
  })()
};
export {
  resource as default
};
