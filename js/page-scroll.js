! function() {
    var e, t, r, o, a, n = {
            frameRate: 150,
            animationTime: 400,
            stepSize: 100,
            pulseAlgorithm: !0,
            pulseScale: 4,
            pulseNormalize: 1,
            accelerationDelta: 50,
            accelerationMax: 3,
            keyboardSupport: !0,
            arrowScroll: 50,
            fixedBackground: !0,
            excluded: ""
        },
        l = n,
        i = !1,
        s = {
            x: 0,
            y: 0
        },
        c = !1,
        u = document.documentElement,
        d = [],
        f = /^Mac/.test(navigator.platform),
        $ = {
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            spacebar: 32,
            pageup: 33,
            pagedown: 34,
            end: 35,
            home: 36
        },
        h = {
            37: 1,
            38: 1,
            39: 1,
            40: 1
        };

    function p() {
        if (!c && document.body) {
            c = !0;
            var o = document.body,
                a = document.documentElement,
                n = window.innerHeight,
                s = o.scrollHeight;
            if (u = document.compatMode.indexOf("CSS") >= 0 ? a : o, e = o, l.keyboardSupport && X("keydown", g), top != self) i = !0;
            else if (Z && s > n && (o.offsetHeight <= n || a.offsetHeight <= n)) {
                var d, f = document.createElement("div");
                if (f.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + u.scrollHeight + "px", document.body.appendChild(f), r = function() {
                        d || (d = setTimeout(function() {
                            f.style.height = "0", f.style.height = u.scrollHeight + "px", d = null
                        }, 500))
                    }, setTimeout(r, 10), X("resize", r), (t = new q(r)).observe(o, {
                        attributes: !0,
                        childList: !0,
                        characterData: !1
                    }), u.offsetHeight <= n) {
                    var $ = document.createElement("div");
                    $.style.clear = "both", o.appendChild($)
                }
            }
            l.fixedBackground || (o.style.backgroundAttachment = "scroll", a.style.backgroundAttachment = "scroll")
        }
    }
    var v = [],
        m = !1,
        _ = Date.now();

    function y(e, t, r) {
        var o, a;
        if (o = t, o = o > 0 ? 1 : -1, a = (a = r) > 0 ? 1 : -1, (s.x !== o || s.y !== a) && (s.x = o, s.y = a, v = [], _ = 0), 1 != l.accelerationMax) {
            var n = Date.now() - _;
            if (n < l.accelerationDelta) {
                var i = (1 + 50 / n) / 2;
                i > 1 && (t *= i = Math.min(i, l.accelerationMax), r *= i)
            }
            _ = Date.now()
        }
        if (v.push({
                x: t,
                y: r,
                lastX: t < 0 ? .99 : -.99,
                lastY: r < 0 ? .99 : -.99,
                start: Date.now()
            }), !m) {
            var c = e === j() || e === document.body;
            null == e.$scrollBehavior && function e(t) {
                var r = x(t);
                if (null == D[r]) {
                    var o = getComputedStyle(t, "")["scroll-behavior"];
                    D[r] = "smooth" == o
                }
                return D[r]
            }(e) && (e.$scrollBehavior = e.style.scrollBehavior, e.style.scrollBehavior = "auto");
            var u = function(o) {
                for (var a = Date.now(), n = 0, i = 0, s = 0; s < v.length; s++) {
                    var d = v[s],
                        f = a - d.start,
                        $ = f >= l.animationTime,
                        h = $ ? 1 : f / l.animationTime;
                    l.pulseAlgorithm && (h = F(h));
                    var p = d.x * h - d.lastX >> 0,
                        _ = d.y * h - d.lastY >> 0;
                    n += p, i += _, d.lastX += p, d.lastY += _, $ && (v.splice(s, 1), s--)
                }
                c ? window.scrollBy(n, i) : (n && (e.scrollLeft += n), i && (e.scrollTop += i)), t || r || (v = []), v.length ? R(u, e, 1e3 / l.frameRate + 1) : (m = !1, null != e.$scrollBehavior && (e.style.scrollBehavior = e.$scrollBehavior, e.$scrollBehavior = null))
            };
            R(u, e, 0), m = !0
        }
    }

    function b(t) {
        c || p();
        var r = t.target;
        if (t.defaultPrevented || t.ctrlKey || A(e, "embed") || A(r, "embed") && /\.pdf/i.test(r.src) || A(e, "object") || r.shadowRoot) return !0;
        var a = -t.wheelDeltaX || t.deltaX || 0,
            n = -t.wheelDeltaY || t.deltaY || 0;
        f && (t.wheelDeltaX && O(t.wheelDeltaX, 120) && (a = -120 * (t.wheelDeltaX / Math.abs(t.wheelDeltaX))), t.wheelDeltaY && O(t.wheelDeltaY, 120) && (n = -120 * (t.wheelDeltaY / Math.abs(t.wheelDeltaY)))), a || n || (n = -t.wheelDelta || 0), 1 === t.deltaMode && (a *= 40, n *= 40);
        var s = z(r);
        return s ? !! function e(t) {
            if (t) {
                d.length || (d = [t, t, t]), t = Math.abs(t), d.push(t), d.shift(), clearTimeout(o), o = setTimeout(function() {
                    try {
                        localStorage.SS_deltaBuffer = d.join(",")
                    } catch (e) {}
                }, 1e3);
                var r = t > 120 && K(t);
                return !K(120) && !K(100) && !r
            }
        }(n) || void(Math.abs(a) > 1.2 && (a *= l.stepSize / 120), Math.abs(n) > 1.2 && (n *= l.stepSize / 120), y(s, a, n), t.preventDefault(), B()) : !i || !U || (Object.defineProperty(t, "target", {
            value: window.frameElement
        }), parent.wheel(t))
    }

    function g(t) {
        var r = t.target,
            o = t.ctrlKey || t.altKey || t.metaKey || t.shiftKey && t.keyCode !== $.spacebar;
        document.body.contains(e) || (e = document.activeElement);
        var a = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (t.defaultPrevented || /^(textarea|select|embed|object)$/i.test(r.nodeName) || A(r, "input") && !a.test(r.type) || A(e, "video") || function e(t) {
                var r = t.target,
                    o = !1;
                if (-1 != document.URL.indexOf("www.youtube.com/watch"))
                    do
                        if (o = r.classList && r.classList.contains("html5-video-controls")) break; while (r = r.parentNode);
                return o
            }(t) || r.isContentEditable || o || (A(r, "button") || A(r, "input") && a.test(r.type)) && t.keyCode === $.spacebar || A(r, "input") && "radio" == r.type && h[t.keyCode]) return !0;
        var n, s = 0,
            c = 0,
            u = z(e);
        if (!u) return !i || !U || parent.keydown(t);
        var d = u.clientHeight;
        switch (u == document.body && (d = window.innerHeight), t.keyCode) {
            case $.up:
                c = -l.arrowScroll;
                break;
            case $.down:
                c = l.arrowScroll;
                break;
            case $.spacebar:
                c = -(n = t.shiftKey ? 1 : -1) * d * .9;
                break;
            case $.pageup:
                c = -(.9 * d);
                break;
            case $.pagedown:
                c = .9 * d;
                break;
            case $.home:
                u == document.body && document.scrollingElement && (u = document.scrollingElement), c = -u.scrollTop;
                break;
            case $.end:
                var f = u.scrollHeight - u.scrollTop - d;
                c = f > 0 ? f + 10 : 0;
                break;
            case $.left:
                s = -l.arrowScroll;
                break;
            case $.right:
                s = l.arrowScroll;
                break;
            default:
                return !0
        }
        y(u, s, c), t.preventDefault(), B()
    }

    function w(t) {
        e = t.target
    }
    var S, x = (S = 0, function(e) {
            return e.uniqueID || (e.uniqueID = S++)
        }),
        k = {},
        E = {},
        D = {};

    function B() {
        clearTimeout(a), a = setInterval(function() {
            k = E = D = {}
        }, 1e3)
    }

    function H(e, t, r) {
        for (var o = r ? k : E, a = e.length; a--;) o[x(e[a])] = t;
        return t
    }

    function T(e, t) {
        return (t ? k : E)[x(e)]
    }

    function z(e) {
        var t = [],
            r = document.body,
            o = u.scrollHeight;
        do {
            var a = T(e, !1);
            if (a) return H(t, a);
            if (t.push(e), o === e.scrollHeight) {
                var n = L(u) && L(r) || M(u);
                if (i && C(u) || !i && n) return H(t, j())
            } else if (C(e) && M(e)) return H(t, e)
        } while (e = e.parentElement)
    }

    function C(e) {
        return e.clientHeight + 10 < e.scrollHeight
    }

    function L(e) {
        return "hidden" !== getComputedStyle(e, "").getPropertyValue("overflow-y")
    }

    function M(e) {
        var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
        return "scroll" === t || "auto" === t
    }

    function X(e, t, r) {
        window.addEventListener(e, t, r || !1)
    }

    function Y(e, t, r) {
        window.removeEventListener(e, t, r || !1)
    }

    function A(e, t) {
        return e && (e.nodeName || "").toLowerCase() === t.toLowerCase()
    }
    if (window.localStorage && localStorage.SS_deltaBuffer) try {
        d = localStorage.SS_deltaBuffer.split(",")
    } catch (N) {}

    function O(e, t) {
        return Math.floor(e / t) == e / t
    }

    function K(e) {
        return O(d[0], e) && O(d[1], e) && O(d[2], e)
    }
    var P, R = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e, t, r) {
            window.setTimeout(e, r || 1e3 / 60)
        },
        q = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
        j = (P = document.scrollingElement, function() {
            if (!P) {
                var e = document.createElement("div");
                e.style.cssText = "height:10000px;width:1px;", document.body.appendChild(e);
                var t = document.body.scrollTop;
                document.documentElement.scrollTop, window.scrollBy(0, 3), P = document.body.scrollTop != t ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(e)
            }
            return P
        });

    function V(e) {
        var t, r, o;
        return (e *= l.pulseScale) < 1 ? t = e - (1 - Math.exp(-e)) : (e -= 1, t = (r = Math.exp(-1)) + (o = 1 - Math.exp(-e)) * (1 - r)), t * l.pulseNormalize
    }

    function F(e) {
        return e >= 1 ? 1 : e <= 0 ? 0 : (1 == l.pulseNormalize && (l.pulseNormalize /= V(1)), V(e))
    }
    var I = window.navigator.userAgent,
        W = /Edge/.test(I),
        U = /chrome/i.test(I) && !W,
        G = /safari/i.test(I) && !W,
        J = /mobile/i.test(I),
        Q = /Windows NT 6.1/i.test(I) && /rv:11/i.test(I),
        Z = G && (/Version\/8/i.test(I) || /Version\/9/i.test(I)),
        ee = !1;
    try {
        window.addEventListener("test", null, Object.defineProperty({}, "passive", {
            get: function() {
                ee = !0
            }
        }))
    } catch (et) {}
    var er = !!ee && {
            passive: !1
        },
        eo = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

    function ea(e) {
        for (var t in e) n.hasOwnProperty(t) && (l[t] = e[t])
    }
    eo && (U || G || Q) && !J && (X(eo, b, er), X("mousedown", w), X("load", p)), ea.destroy = function e() {
        t && t.disconnect(), Y(eo, b), Y("mousedown", w), Y("keydown", g), Y("resize", r), Y("load", p)
    }, window.SmoothScrollOptions && ea(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function() {
        return ea
    }) : "object" == typeof exports ? module.exports = ea : window.SmoothScroll = ea
}();