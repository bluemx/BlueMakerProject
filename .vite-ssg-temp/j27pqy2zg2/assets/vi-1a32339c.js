const resource = {
  "button": {
    "about": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Về"]);
      };
      fn.source = "Về";
      return fn;
    })(),
    "back": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Quay lại"]);
      };
      fn.source = "Quay lại";
      return fn;
    })(),
    "go": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Đi"]);
      };
      fn.source = "Đi";
      return fn;
    })(),
    "home": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Khởi đầu"]);
      };
      fn.source = "Khởi đầu";
      return fn;
    })(),
    "toggle_dark": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Chuyển đổi chế độ tối"]);
      };
      fn.source = "Chuyển đổi chế độ tối";
      return fn;
    })(),
    "toggle_langs": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Thay đổi ngôn ngữ"]);
      };
      fn.source = "Thay đổi ngôn ngữ";
      return fn;
    })()
  },
  "intro": {
    "desc": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ý kiến cá nhân Vite Template để bắt đầu"]);
      };
      fn.source = "Ý kiến cá nhân Vite Template để bắt đầu";
      return fn;
    })(),
    "dynamic-route": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Bản giới thiệu về dynamic route"]);
      };
      fn.source = "Bản giới thiệu về dynamic route";
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
    "whats-your-name": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Tên bạn là gì?"]);
      };
      fn.source = "Tên bạn là gì?";
      return fn;
    })()
  },
  "not-found": (() => {
    const fn = (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Không tìm thấy"]);
    };
    fn.source = "Không tìm thấy";
    return fn;
  })()
};
export {
  resource as default
};
