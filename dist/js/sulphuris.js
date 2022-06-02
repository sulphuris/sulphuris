
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
console.log('hello 🜍');
function stickyStateObserver(selector) {
    var elems = document.querySelectorAll(selector);
    var observer = new IntersectionObserver(function (_a) {
        var e = _a[0];
        return e.target.classList.toggle('stuck', e.intersectionRatio < 1);
    }, { threshold: [1] });
    elems.forEach(function (el) {
        el.style.top = '-1px';
        observer.observe(el);
    });
}
stickyStateObserver('.position-sticky');
