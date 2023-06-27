const resource = {
  "button": {
    "about": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Hakkımda"]);
      };
      fn.source = "Hakkımda";
      return fn;
    })(),
    "back": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Geri"]);
      };
      fn.source = "Geri";
      return fn;
    })(),
    "go": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["İLERİ"]);
      };
      fn.source = "İLERİ";
      return fn;
    })(),
    "home": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Anasayfa"]);
      };
      fn.source = "Anasayfa";
      return fn;
    })(),
    "toggle_dark": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Karanlık modu değiştir"]);
      };
      fn.source = "Karanlık modu değiştir";
      return fn;
    })(),
    "toggle_langs": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Dilleri değiştir"]);
      };
      fn.source = "Dilleri değiştir";
      return fn;
    })()
  },
  "intro": {
    "desc": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Görüşlü Vite Başlangıç Şablonu"]);
      };
      fn.source = "Görüşlü Vite Başlangıç Şablonu";
      return fn;
    })(),
    "dynamic-route": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Dinamik rota demosu"]);
      };
      fn.source = "Dinamik rota demosu";
      return fn;
    })(),
    "hi": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
        return _normalize(["Merhaba, ", _interpolate(_named("name")), "!"]);
      };
      fn.source = "Merhaba, {name}!";
      return fn;
    })(),
    "aka": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ayrıca şöyle bilinir"]);
      };
      fn.source = "Ayrıca şöyle bilinir";
      return fn;
    })(),
    "whats-your-name": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Adınız nedir?"]);
      };
      fn.source = "Adınız nedir?";
      return fn;
    })()
  },
  "not-found": (() => {
    const fn = (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Bulunamadı"]);
    };
    fn.source = "Bulunamadı";
    return fn;
  })()
};
export {
  resource as default
};
