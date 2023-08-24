const resource = {
  "button": {
    "about": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["About"]);
      };
      fn.source = "About";
      return fn;
    })(),
    "back": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Back"]);
      };
      fn.source = "Back";
      return fn;
    })(),
    "go": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["GO"]);
      };
      fn.source = "GO";
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
        return _normalize(["Toggle dark mode"]);
      };
      fn.source = "Toggle dark mode";
      return fn;
    })(),
    "toggle_langs": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Change languages"]);
      };
      fn.source = "Change languages";
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
        return _normalize(["Demo of dynamic route"]);
      };
      fn.source = "Demo of dynamic route";
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
        return _normalize(["Also known as"]);
      };
      fn.source = "Also known as";
      return fn;
    })(),
    "whats-your-name": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["What's your name?"]);
      };
      fn.source = "What's your name?";
      return fn;
    })()
  },
  "not-found": (() => {
    const fn = (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Not found"]);
    };
    fn.source = "Not found";
    return fn;
  })()
};
export {
  resource as default
};
