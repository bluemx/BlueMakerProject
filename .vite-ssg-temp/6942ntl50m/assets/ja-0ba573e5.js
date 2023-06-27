const resource = {
  "button": {
    "about": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["これは？"]);
      };
      fn.source = "これは？";
      return fn;
    })(),
    "back": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["戻る"]);
      };
      fn.source = "戻る";
      return fn;
    })(),
    "go": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["進む"]);
      };
      fn.source = "進む";
      return fn;
    })(),
    "home": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["ホーム"]);
      };
      fn.source = "ホーム";
      return fn;
    })(),
    "toggle_dark": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["ダークモード切り替え"]);
      };
      fn.source = "ダークモード切り替え";
      return fn;
    })(),
    "toggle_langs": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["言語切り替え"]);
      };
      fn.source = "言語切り替え";
      return fn;
    })()
  },
  "intro": {
    "desc": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["固執された Vite スターターテンプレート"]);
      };
      fn.source = "固執された Vite スターターテンプレート";
      return fn;
    })(),
    "dynamic-route": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["動的ルートのデモ"]);
      };
      fn.source = "動的ルートのデモ";
      return fn;
    })(),
    "hi": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
        return _normalize(["こんにちは、", _interpolate(_named("name")), "!"]);
      };
      fn.source = "こんにちは、{name}!";
      return fn;
    })(),
    "whats-your-name": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["君の名は。"]);
      };
      fn.source = "君の名は。";
      return fn;
    })()
  },
  "not-found": (() => {
    const fn = (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["見つかりませんでした"]);
    };
    fn.source = "見つかりませんでした";
    return fn;
  })()
};
export {
  resource as default
};
