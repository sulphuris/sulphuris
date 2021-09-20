(function () {
    'use strict';

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

}());
