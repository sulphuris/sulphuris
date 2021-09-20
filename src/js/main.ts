console.log('hello 🜍')

function stickyStateObserver(selector: string): void {
  const elems:NodeListOf<HTMLElement> = document.querySelectorAll(selector);
  const observer:IntersectionObserver = new IntersectionObserver(
    ([e]) => e.target.classList.toggle('stuck', e.intersectionRatio < 1),
    { threshold: [1] }
  );
  elems.forEach((el) => {
    el.style.top = '-1px';
    observer.observe(el);
  });
}
stickyStateObserver('.position-sticky');
