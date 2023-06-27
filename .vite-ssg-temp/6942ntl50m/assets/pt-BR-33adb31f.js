const resource = {
  "button": {
    "about": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Sobre"]);
      };
      fn.source = "Sobre";
      return fn;
    })(),
    "back": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Voltar"]);
      };
      fn.source = "Voltar";
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
        return _normalize(["Início"]);
      };
      fn.source = "Início";
      return fn;
    })(),
    "toggle_dark": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Alternar modo escuro"]);
      };
      fn.source = "Alternar modo escuro";
      return fn;
    })(),
    "toggle_langs": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Mudar de idioma"]);
      };
      fn.source = "Mudar de idioma";
      return fn;
    })()
  },
  "intro": {
    "desc": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Modelo Opinativo de Partida de Vite"]);
      };
      fn.source = "Modelo Opinativo de Partida de Vite";
      return fn;
    })(),
    "dynamic-route": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Demonstração de rota dinâmica"]);
      };
      fn.source = "Demonstração de rota dinâmica";
      return fn;
    })(),
    "hi": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
        return _normalize(["Olá, ", _interpolate(_named("name")), "!"]);
      };
      fn.source = "Olá, {name}!";
      return fn;
    })(),
    "aka": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Também conhecido como"]);
      };
      fn.source = "Também conhecido como";
      return fn;
    })(),
    "whats-your-name": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Qual é o seu nome?"]);
      };
      fn.source = "Qual é o seu nome?";
      return fn;
    })()
  },
  "not-found": (() => {
    const fn = (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Não encontrado"]);
    };
    fn.source = "Não encontrado";
    return fn;
  })()
};
export {
  resource as default
};
