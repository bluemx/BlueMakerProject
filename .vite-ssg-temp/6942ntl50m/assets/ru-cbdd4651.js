const resource = {
  "button": {
    "about": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["О шаблоне"]);
      };
      fn.source = "О шаблоне";
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
        return _normalize(["Главная"]);
      };
      fn.source = "Главная";
      return fn;
    })(),
    "toggle_dark": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Включить темный режим"]);
      };
      fn.source = "Включить темный режим";
      return fn;
    })(),
    "toggle_langs": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Сменить язык"]);
      };
      fn.source = "Сменить язык";
      return fn;
    })()
  },
  "intro": {
    "desc": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Самостоятельный начальный шаблон Vite"]);
      };
      fn.source = "Самостоятельный начальный шаблон Vite";
      return fn;
    })(),
    "dynamic-route": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Демо динамического маршрута"]);
      };
      fn.source = "Демо динамического маршрута";
      return fn;
    })(),
    "hi": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
        return _normalize(["Привет, ", _interpolate(_named("name")), "!"]);
      };
      fn.source = "Привет, {name}!";
      return fn;
    })(),
    "whats-your-name": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Как тебя зовут?"]);
      };
      fn.source = "Как тебя зовут?";
      return fn;
    })()
  },
  "not-found": (() => {
    const fn = (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Не найден"]);
    };
    fn.source = "Не найден";
    return fn;
  })()
};
export {
  resource as default
};
