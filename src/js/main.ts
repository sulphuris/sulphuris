console.log('hello 🜍')

export function stickyStateObserver(selector: string): void {
  const elems:NodeListOf<HTMLElement> = document.querySelectorAll(selector);
  const observer:IntersectionObserver = new IntersectionObserver(
    ([e]) => {
      const offset_top = e.target.getBoundingClientRect().top;
      if (window.scrollY < offset_top) {
        e.target.classList.remove('stuck');
        return;
      }
      e.target.classList.toggle('stuck', e.intersectionRatio < 1);
    },
    { threshold: [1] }
  );

  elems.forEach((el) => {
    observer.observe(el);
  });
}

export function tripwire(selector: string, body_class: string): void {
  const elems:NodeListOf<HTMLElement> = document.querySelectorAll(selector);
  const observer:IntersectionObserver = new IntersectionObserver(
    ([e]) => {
      const offset_top = e.target.getBoundingClientRect().top;
      if (window.scrollY < offset_top) {
        document.body.classList.remove(body_class);
        return;
      }
      document.body.classList.toggle(body_class, e.intersectionRatio < 1);
    },
    { threshold: [1] }
  );

  elems.forEach((el) => {
    observer.observe(el);
  });
}

export function onScroll(down: Function, up: Function) {
  let __lastScrollTop = 0;
  let __ticking = false;

  document.addEventListener("scroll", function(e) {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > __lastScrollTop) {
      if (!__ticking) {
        window.requestAnimationFrame(() => {
          down(e);
          __ticking = false;
        });
        __ticking = true;
      }
    } else {
      if (!__ticking) {
        window.requestAnimationFrame(() => {
          up(e);
          __ticking = false;
        });
        __ticking = true;
      }
   }
    __lastScrollTop = st <= 0 ? 0 : st;
  }, false);
}
