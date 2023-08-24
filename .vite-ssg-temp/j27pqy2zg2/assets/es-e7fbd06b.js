const resource = {
  "button": {
    "about": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Acerca de"]);
      };
      fn.source = "Acerca de";
      return fn;
    })(),
    "back": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Atrás"]);
      };
      fn.source = "Atrás";
      return fn;
    })(),
    "go": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ir"]);
      };
      fn.source = "Ir";
      return fn;
    })(),
    "home": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Inicio"]);
      };
      fn.source = "Inicio";
      return fn;
    })(),
    "toggle_dark": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Alternar modo oscuro"]);
      };
      fn.source = "Alternar modo oscuro";
      return fn;
    })(),
    "toggle_langs": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Cambiar idiomas"]);
      };
      fn.source = "Cambiar idiomas";
      return fn;
    })()
  },
  "intro": {
    "desc": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Plantilla de Inicio de Vite Dogmática"]);
      };
      fn.source = "Plantilla de Inicio de Vite Dogmática";
      return fn;
    })(),
    "dynamic-route": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Demo de ruta dinámica"]);
      };
      fn.source = "Demo de ruta dinámica";
      return fn;
    })(),
    "hi": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
        return _normalize(["¡Hola, ", _interpolate(_named("name")), "!"]);
      };
      fn.source = "¡Hola, {name}!";
      return fn;
    })(),
    "aka": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["También conocido como"]);
      };
      fn.source = "También conocido como";
      return fn;
    })(),
    "whats-your-name": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["¿Cómo te llamas?"]);
      };
      fn.source = "¿Cómo te llamas?";
      return fn;
    })()
  },
  "not-found": (() => {
    const fn = (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["No se ha encontrado"]);
    };
    fn.source = "No se ha encontrado";
    return fn;
  })()
};
export {
  resource as default
};
