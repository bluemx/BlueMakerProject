const resource = {
  "button": {
    "about": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Su di me"]);
      };
      fn.source = "Su di me";
      return fn;
    })(),
    "back": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Indietro"]);
      };
      fn.source = "Indietro";
      return fn;
    })(),
    "go": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Vai"]);
      };
      fn.source = "Vai";
      return fn;
    })(),
    "home": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Home"]);
      };
      fn.source = "Home";
      return fn;
    })(),
    "toggle_dark": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Attiva/disattiva modalità scura"]);
      };
      fn.source = "Attiva/disattiva modalità scura";
      return fn;
    })(),
    "toggle_langs": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Cambia lingua"]);
      };
      fn.source = "Cambia lingua";
      return fn;
    })()
  },
  "intro": {
    "desc": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Modello per una Applicazione Vite"]);
      };
      fn.source = "Modello per una Applicazione Vite";
      return fn;
    })(),
    "dynamic-route": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Demo di rotta dinamica"]);
      };
      fn.source = "Demo di rotta dinamica";
      return fn;
    })(),
    "hi": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
        return _normalize(["Ciao, ", _interpolate(_named("name")), "!"]);
      };
      fn.source = "Ciao, {name}!";
      return fn;
    })(),
    "whats-your-name": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Come ti chiami?"]);
      };
      fn.source = "Come ti chiami?";
      return fn;
    })()
  },
  "not-found": (() => {
    const fn = (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Non trovato"]);
    };
    fn.source = "Non trovato";
    return fn;
  })()
};
export {
  resource as default
};
