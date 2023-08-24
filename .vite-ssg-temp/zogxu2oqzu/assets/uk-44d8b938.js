const resource = {
  "button": {
    "about": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Про шаблон"]);
      };
      fn.source = "Про шаблон";
      return fn;
    })(),
    "back": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Назад"]);
      };
      fn.source = "Назад";
      return fn;
    })(),
    "go": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Перейти"]);
      };
      fn.source = "Перейти";
      return fn;
    })(),
    "home": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Головна"]);
      };
      fn.source = "Головна";
      return fn;
    })(),
    "toggle_dark": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Переключити темний режим"]);
      };
      fn.source = "Переключити темний режим";
      return fn;
    })(),
    "toggle_langs": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Змінити мову"]);
      };
      fn.source = "Змінити мову";
      return fn;
    })()
  },
  "intro": {
    "desc": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Самостійний початковий шаблон Vite"]);
      };
      fn.source = "Самостійний початковий шаблон Vite";
      return fn;
    })(),
    "dynamic-route": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Демо динамічного маршруту"]);
      };
      fn.source = "Демо динамічного маршруту";
      return fn;
    })(),
    "hi": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
        return _normalize(["Привіт, ", _interpolate(_named("name")), "!"]);
      };
      fn.source = "Привіт, {name}!";
      return fn;
    })(),
    "whats-your-name": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Як тебе звати?"]);
      };
      fn.source = "Як тебе звати?";
      return fn;
    })()
  },
  "not-found": (() => {
    const fn = (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Не знайдено"]);
    };
    fn.source = "Не знайдено";
    return fn;
  })()
};
export {
  resource as default
};
