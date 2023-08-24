const resource = {
  "button": {
    "about": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["소개"]);
      };
      fn.source = "소개";
      return fn;
    })(),
    "back": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["뒤로가기"]);
      };
      fn.source = "뒤로가기";
      return fn;
    })(),
    "go": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["이동"]);
      };
      fn.source = "이동";
      return fn;
    })(),
    "home": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["홈"]);
      };
      fn.source = "홈";
      return fn;
    })(),
    "toggle_dark": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["다크모드 토글"]);
      };
      fn.source = "다크모드 토글";
      return fn;
    })(),
    "toggle_langs": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["언어 변경"]);
      };
      fn.source = "언어 변경";
      return fn;
    })()
  },
  "intro": {
    "desc": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Vite 애플리케이션 템플릿"]);
      };
      fn.source = "Vite 애플리케이션 템플릿";
      return fn;
    })(),
    "dynamic-route": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["다이나믹 라우트 데모"]);
      };
      fn.source = "다이나믹 라우트 데모";
      return fn;
    })(),
    "hi": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
        return _normalize(["안녕, ", _interpolate(_named("name")), "!"]);
      };
      fn.source = "안녕, {name}!";
      return fn;
    })(),
    "whats-your-name": (() => {
      const fn = (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["이름이 뭐예요?"]);
      };
      fn.source = "이름이 뭐예요?";
      return fn;
    })()
  },
  "not-found": (() => {
    const fn = (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["찾을 수 없습니다"]);
    };
    fn.source = "찾을 수 없습니다";
    return fn;
  })()
};
export {
  resource as default
};
