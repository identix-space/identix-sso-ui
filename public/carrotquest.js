/* eslint-disable */

!(function () {
    function t(t, e) {
        return function () {
            window.carrotquestasync.push(t, arguments);
        };
    }

    if (typeof carrotquest === 'undefined') {
        let e = document.createElement('script');
        e.type = 'text/javascript', e.async = !0, e.src = 'https://cdn.carrotquest.app/api.min.js', document.getElementsByTagName('head')[0].appendChild(e), window.carrotquest = {}, window.carrotquestasync = [], carrotquest.settings = {};
        for (let n = ['connect', 'track', 'identify', 'auth', 'onReady', 'addCallback', 'removeCallback', 'trackMessageInteraction'], a = 0; a < n.length; a++) {
            carrotquest[n[a]] = t(n[a]);
        }
    }
}()), carrotquest.connect('48366-e79080b10653550e3d05d47fca');
