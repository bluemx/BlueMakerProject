const resource = {
  "button": {
    "about": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Tentang"]);
      };
      fn.source = "Tentang";
      return fn;
    })(),
    "back": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Kembali"]);
      };
      fn.source = "Kembali";
      return fn;
    })(),
    "go": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Pergi"]);
      };
      fn.source = "Pergi";
      return fn;
    })(),
    "home": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Beranda"]);
      };
      fn.source = "Beranda";
      return fn;
    })(),
    "toggle_dark": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ubah ke mode gelap"]);
      };
      fn.source = "Ubah ke mode gelap";
      return fn;
    })(),
    "toggle_langs": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ubah bahasa"]);
      };
      fn.source = "Ubah bahasa";
      return fn;
    })()
  },
  "intro": {
    "desc": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Template awal vite"]);
      };
      fn.source = "Template awal vite";
      return fn;
    })(),
    "dynamic-route": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Contoh rute dinamik"]);
      };
      fn.source = "Contoh rute dinamik";
      return fn;
    })(),
    "hi": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
        return _normalize(["Halo, ", _interpolate(_named("name")), "!"]);
      };
      fn.source = "Halo, {name}!";
      return fn;
    })(),
    "aka": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Juga diketahui sebagai"]);
      };
      fn.source = "Juga diketahui sebagai";
      return fn;
    })(),
    "whats-your-name": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Siapa nama anda?"]);
      };
      fn.source = "Siapa nama anda?";
      return fn;
    })()
  },
  "not-found": (() => {
    const fn = (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Tidak ditemukan"]);
    };
    fn.source = "Tidak ditemukan";
    return fn;
  })()
};
export {
  resource as default
};
