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
