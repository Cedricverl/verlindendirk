// Fade elements marked .reveal in as they scroll into view, and start the slow zoom on
// the side photos. The inline script in each page's <head> only adds .reveal-ready when
// the visitor allows motion, so without it (or without this file) nothing is hidden.
(function () {
    window.revealStarted = true;
    var root = document.documentElement;
    if (!root.classList.contains('reveal-ready')) return;

    if (!('IntersectionObserver' in window)) {
        root.classList.remove('reveal-ready');
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        var shown = 0;
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            observer.unobserve(el);
            if (el.classList.contains('reveal')) {
                // stagger elements that come into view together, e.g. a row of products
                var delay = Math.min(shown * 90, 450);
                el.style.transitionDelay = delay + 'ms';
                shown++;
                // Once it has faded in (0.8s transition), drop the reveal classes so the
                // element's own hover transitions apply again without the reveal delay.
                setTimeout(function () {
                    el.classList.remove('reveal', 'is-visible');
                    el.style.transitionDelay = '';
                }, delay + 900);
            }
            el.classList.add('is-visible');
        });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.1 });

    document.querySelectorAll('.reveal, .full-height, .mobile-banner').forEach(function (el) {
        observer.observe(el);
    });
})();
