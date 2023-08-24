const resource = {
  "button": {
    "about": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["À propos"]);
      };
      fn.source = "À propos";
      return fn;
    })(),
    "back": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Retour"]);
      };
      fn.source = "Retour";
      return fn;
    })(),
    "go": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Essayer"]);
      };
      fn.source = "Essayer";
      return fn;
    })(),
    "home": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Accueil"]);
      };
      fn.source = "Accueil";
      return fn;
    })(),
    "toggle_dark": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Basculer en mode sombre"]);
      };
      fn.source = "Basculer en mode sombre";
      return fn;
    })(),
    "toggle_langs": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Changer de langue"]);
      };
      fn.source = "Changer de langue";
      return fn;
    })()
  },
  "intro": {
    "desc": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Exemple d'application Vite"]);
      };
      fn.source = "Exemple d'application Vite";
      return fn;
    })(),
    "dynamic-route": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Démo de route dynamique"]);
      };
      fn.source = "Démo de route dynamique";
      return fn;
    })(),
    "hi": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
        return _normalize(["Salut, ", _interpolate(_named("name")), "!"]);
      };
      fn.source = "Salut, {name}!";
      return fn;
    })(),
    "aka": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Aussi connu sous le nom de"]);
      };
      fn.source = "Aussi connu sous le nom de";
      return fn;
    })(),
    "whats-your-name": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Comment t'appelles-tu ?"]);
      };
      fn.source = "Comment t'appelles-tu ?";
      return fn;
    })()
  },
  "not-found": (() => {
    const fn = (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Page non trouvée"]);
    };
    fn.source = "Page non trouvée";
    return fn;
  })()
};
export {
  resource as default
};
