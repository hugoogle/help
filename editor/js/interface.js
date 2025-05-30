if (
  (!(function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery"], t)
      : t(jQuery);
  })(function (l) {
    function o(s, e) {
      var t,
        d,
        p,
        c = s.nodeName.toLowerCase();
      return "area" === c
        ? ((d = (t = s.parentNode).name),
          s.href &&
            d &&
            "map" === t.nodeName.toLowerCase() &&
            !!(p = l("img[usemap='#" + d + "']")[0]) &&
            a(p))
        : (/^(input|select|textarea|button|object)$/.test(c)
            ? !s.disabled
            : ("a" === c && s.href) || e) && a(s);
    }
    function a(t) {
      return (
        l.expr.filters.visible(t) &&
        !l(t)
          .parents()
          .addBack()
          .filter(function () {
            return "hidden" === l.css(this, "visibility");
          }).length
      );
    }
    var s, r, d, p;
    (l.ui = l.ui || {}),
      l.extend(l.ui, {
        version: "1.11.4",
        keyCode: {
          BACKSPACE: 8,
          COMMA: 188,
          DELETE: 46,
          DOWN: 40,
          END: 35,
          ENTER: 13,
          ESCAPE: 27,
          HOME: 36,
          LEFT: 37,
          PAGE_DOWN: 34,
          PAGE_UP: 33,
          PERIOD: 190,
          RIGHT: 39,
          SPACE: 32,
          TAB: 9,
          UP: 38,
        },
      }),
      l.fn.extend({
        scrollParent: function (o) {
          var a = this.css("position"),
            t = o ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
            e = this.parents()
              .filter(function () {
                var o = l(this);
                return (
                  (!("absolute" === a) || "static" !== o.css("position")) &&
                  t.test(
                    o.css("overflow") +
                      o.css("overflow-y") +
                      o.css("overflow-x")
                  )
                );
              })
              .eq(0);
          return "fixed" !== a && e.length
            ? e
            : l(this[0].ownerDocument || document);
        },
        uniqueId:
          ((s = 0),
          function () {
            return this.each(function () {
              this.id || (this.id = "ui-id-" + ++s);
            });
          }),
        removeUniqueId: function () {
          return this.each(function () {
            /^ui-id-\d+$/.test(this.id) && l(this).removeAttr("id");
          });
        },
      }),
      l.extend(l.expr[":"], {
        data: l.expr.createPseudo
          ? l.expr.createPseudo(function (o) {
              return function (t) {
                return !!l.data(t, o);
              };
            })
          : function (o, e, t) {
              return !!l.data(o, t[3]);
            },
        focusable: function (t) {
          return o(t, !isNaN(l.attr(t, "tabindex")));
        },
        tabbable: function (i) {
          var e = l.attr(i, "tabindex"),
            t = isNaN(e);
          return (t || 0 <= e) && o(i, !t);
        },
      }),
      l("<a>").outerWidth(1).jquery ||
        l.each(["Width", "Height"], function (t, a) {
          function n(o, e, a, n) {
            return (
              l.each(s, function () {
                (e -= parseFloat(l.css(o, "padding" + this)) || 0),
                  a &&
                    (e -= parseFloat(l.css(o, "border" + this + "Width")) || 0),
                  n && (e -= parseFloat(l.css(o, "margin" + this)) || 0);
              }),
              e
            );
          }
          var s = "Width" === a ? ["Left", "Right"] : ["Top", "Bottom"],
            r = a.toLowerCase(),
            i = {
              innerWidth: l.fn.innerWidth,
              innerHeight: l.fn.innerHeight,
              outerWidth: l.fn.outerWidth,
              outerHeight: l.fn.outerHeight,
            };
          (l.fn["inner" + a] = function (t) {
            return void 0 === t
              ? i["inner" + a].call(this)
              : this.each(function () {
                  l(this).css(r, n(this, t) + "px");
                });
          }),
            (l.fn["outer" + a] = function (o, e) {
              return "number" == typeof o
                ? this.each(function () {
                    l(this).css(r, n(this, o, !0, e) + "px");
                  })
                : i["outer" + a].call(this, o);
            });
        }),
      l.fn.addBack ||
        (l.fn.addBack = function (t) {
          return this.add(
            null == t ? this.prevObject : this.prevObject.filter(t)
          );
        }),
      l("<a>").data("a-b", "a").removeData("a-b").data("a-b") &&
        (l.fn.removeData =
          ((r = l.fn.removeData),
          function (t) {
            return arguments.length
              ? r.call(this, l.camelCase(t))
              : r.call(this);
          })),
      (l.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())),
      l.fn.extend({
        focus:
          ((p = l.fn.focus),
          function (o, t) {
            return "number" == typeof o
              ? this.each(function () {
                  var i = this;
                  setTimeout(function () {
                    l(i).focus(), t && t.call(i);
                  }, o);
                })
              : p.apply(this, arguments);
          }),
        disableSelection:
          ((d =
            "onselectstart" in document.createElement("div")
              ? "selectstart"
              : "mousedown"),
          function () {
            return this.bind(d + ".ui-disableSelection", function (t) {
              t.preventDefault();
            });
          }),
        enableSelection: function () {
          return this.unbind(".ui-disableSelection");
        },
        zIndex: function (o) {
          if (void 0 !== o) return this.css("zIndex", o);
          if (this.length)
            for (var e, a, s = l(this[0]); s.length && s[0] !== document; ) {
              if (
                ("absolute" === (e = s.css("position")) ||
                  "relative" === e ||
                  "fixed" === e) &&
                ((a = parseInt(s.css("zIndex"), 10)), !isNaN(a) && 0 !== a)
              )
                return a;
              s = s.parent();
            }
          return 0;
        },
      }),
      (l.ui.plugin = {
        add: function (o, e, t) {
          var a,
            s = l.ui[o].prototype;
          for (a in t)
            (s.plugins[a] = s.plugins[a] || []), s.plugins[a].push([e, t[a]]);
        },
        call: function (a, e, t, s) {
          var i,
            n = a.plugins[e];
          if (
            n &&
            (s ||
              (a.element[0].parentNode &&
                11 !== a.element[0].parentNode.nodeType))
          )
            for (i = 0; i < n.length; i++)
              a.options[n[i][0]] && n[i][1].apply(a.element, t);
        },
      });
  }),
  !(function (e) {
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : e(jQuery);
  })(function (l) {
    var o,
      n = 0,
      d = Array.prototype.slice;
    return (
      (l.cleanData =
        ((o = l.cleanData),
        function (a) {
          var t, s, r;
          for (r = 0; null != (s = a[r]); r++)
            try {
              (t = l._data(s, "events")) &&
                t.remove &&
                l(s).triggerHandler("remove");
            } catch (e) {}
          o(a);
        })),
      (l.widget = function (d, p, c) {
        var m,
          g,
          f,
          h,
          v = {},
          a = d.split(".")[0];
        return (
          (d = d.split(".")[1]),
          (m = a + "-" + d),
          c || ((c = p), (p = l.Widget)),
          (l.expr[":"][m.toLowerCase()] = function (e) {
            return !!l.data(e, m);
          }),
          (l[a] = l[a] || {}),
          (g = l[a][d]),
          (f = l[a][d] =
            function (o, t) {
              return this._createWidget
                ? void (arguments.length && this._createWidget(o, t))
                : new f(o, t);
            }),
          l.extend(f, g, {
            version: c.version,
            _proto: l.extend({}, c),
            _childConstructors: [],
          }),
          ((h = new p()).options = l.widget.extend({}, h.options)),
          l.each(c, function (i, a) {
            function n() {
              return p.prototype[i].apply(this, arguments);
            }
            function s(e) {
              return p.prototype[i].apply(this, e);
            }
            v[i] = l.isFunction(a)
              ? function () {
                  var o,
                    r = this._super,
                    e = this._superApply;
                  return (
                    (this._super = n),
                    (this._superApply = s),
                    (o = a.apply(this, arguments)),
                    (this._super = r),
                    (this._superApply = e),
                    o
                  );
                }
              : a;
          }),
          (f.prototype = l.widget.extend(
            h,
            { widgetEventPrefix: (g && h.widgetEventPrefix) || d },
            v,
            { constructor: f, namespace: a, widgetName: d, widgetFullName: m }
          )),
          g
            ? (l.each(g._childConstructors, function (o, t) {
                var e = t.prototype;
                l.widget(e.namespace + "." + e.widgetName, f, t._proto);
              }),
              delete g._childConstructors)
            : p._childConstructors.push(f),
          l.widget.bridge(d, f),
          f
        );
      }),
      (l.widget.extend = function (a) {
        for (
          var t, r, p = d.call(arguments, 1), n = 0, c = p.length;
          n < c;
          n++
        )
          for (t in p[n])
            (r = p[n][t]),
              p[n].hasOwnProperty(t) &&
                void 0 !== r &&
                (l.isPlainObject(r)
                  ? (a[t] = l.isPlainObject(a[t])
                      ? l.widget.extend({}, a[t], r)
                      : l.widget.extend({}, r))
                  : (a[t] = r));
        return a;
      }),
      (l.widget.bridge = function (a, o) {
        var p = o.prototype.widgetFullName || a;
        l.fn[a] = function (r) {
          var e = "string" == typeof r,
            c = d.call(arguments, 1),
            n = this;
          return (
            e
              ? this.each(function () {
                  var o,
                    i = l.data(this, p);
                  return "instance" === r
                    ? ((n = i), !1)
                    : i
                    ? l.isFunction(i[r]) && "_" !== r.charAt(0)
                      ? (o = i[r].apply(i, c)) !== i && void 0 !== o
                        ? ((n = o && o.jquery ? n.pushStack(o.get()) : o), !1)
                        : void 0
                      : l.error(
                          "no such method '" +
                            r +
                            "' for " +
                            a +
                            " widget instance"
                        )
                    : l.error(
                        "cannot call methods on " +
                          a +
                          " prior to initialization; attempted to call method '" +
                          r +
                          "'"
                      );
                })
              : (c.length && (r = l.widget.extend.apply(null, [r].concat(c))),
                this.each(function () {
                  var e = l.data(this, p);
                  e
                    ? (e.option(r || {}), e._init && e._init())
                    : l.data(this, p, new o(r, this));
                })),
            n
          );
        };
      }),
      (l.Widget = function () {}),
      (l.Widget._childConstructors = []),
      (l.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: { disabled: !1, create: null },
        _createWidget: function (o, i) {
          (i = l(i || this.defaultElement || this)[0]),
            (this.element = l(i)),
            (this.uuid = n++),
            (this.eventNamespace = "." + this.widgetName + this.uuid),
            (this.bindings = l()),
            (this.hoverable = l()),
            (this.focusable = l()),
            i !== this &&
              (l.data(i, this.widgetFullName, this),
              this._on(!0, this.element, {
                remove: function (e) {
                  e.target === i && this.destroy();
                },
              }),
              (this.document = l(i.style ? i.ownerDocument : i.document || i)),
              (this.window = l(
                this.document[0].defaultView || this.document[0].parentWindow
              ))),
            (this.options = l.widget.extend(
              {},
              this.options,
              this._getCreateOptions(),
              o
            )),
            this._create(),
            this._trigger("create", null, this._getCreateEventData()),
            this._init();
        },
        _getCreateOptions: l.noop,
        _getCreateEventData: l.noop,
        _create: l.noop,
        _init: l.noop,
        destroy: function () {
          this._destroy(),
            this.element
              .unbind(this.eventNamespace)
              .removeData(this.widgetFullName)
              .removeData(l.camelCase(this.widgetFullName)),
            this.widget()
              .unbind(this.eventNamespace)
              .removeAttr("aria-disabled")
              .removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
            this.bindings.unbind(this.eventNamespace),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus");
        },
        _destroy: l.noop,
        widget: function () {
          return this.element;
        },
        option: function (a, r) {
          var e,
            d,
            p,
            c = a;
          if (0 === arguments.length) return l.widget.extend({}, this.options);
          if ("string" == typeof a)
            if (((c = {}), (a = (e = a.split(".")).shift()), e.length)) {
              for (
                d = c[a] = l.widget.extend({}, this.options[a]), p = 0;
                p < e.length - 1;
                p++
              )
                (d[e[p]] = d[e[p]] || {}), (d = d[e[p]]);
              if (((a = e.pop()), 1 === arguments.length))
                return void 0 === d[a] ? null : d[a];
              d[a] = r;
            } else {
              if (1 === arguments.length)
                return void 0 === this.options[a] ? null : this.options[a];
              c[a] = r;
            }
          return this._setOptions(c), this;
        },
        _setOptions: function (o) {
          for (var t in o) this._setOption(t, o[t]);
          return this;
        },
        _setOption: function (o, t) {
          return (
            (this.options[o] = t),
            "disabled" === o &&
              (this.widget().toggleClass(
                this.widgetFullName + "-disabled",
                !!t
              ),
              t &&
                (this.hoverable.removeClass("ui-state-hover"),
                this.focusable.removeClass("ui-state-focus"))),
            this
          );
        },
        enable: function () {
          return this._setOptions({ disabled: !1 });
        },
        disable: function () {
          return this._setOptions({ disabled: !0 });
        },
        _on: function (o, p, e) {
          var c,
            m = this;
          "boolean" != typeof o && ((e = p), (p = o), (o = !1)),
            e
              ? ((p = c = l(p)), (this.bindings = this.bindings.add(p)))
              : ((e = p), (p = this.element), (c = this.widget())),
            l.each(e, function (a, t) {
              function e() {
                if (
                  o ||
                  (!0 !== m.options.disabled &&
                    !l(this).hasClass("ui-state-disabled"))
                )
                  return ("string" == typeof t ? m[t] : t).apply(m, arguments);
              }
              "string" != typeof t &&
                (e.guid = t.guid = t.guid || e.guid || l.guid++);
              var i = a.match(/^([\w:-]*)\s*(.*)$/),
                n = i[1] + m.eventNamespace,
                s = i[2];
              s ? c.delegate(s, n, e) : p.bind(n, e);
            });
        },
        _off: function (o, t) {
          (t =
            (t || "").split(" ").join(this.eventNamespace + " ") +
            this.eventNamespace),
            o.unbind(t).undelegate(t),
            (this.bindings = l(this.bindings.not(o).get())),
            (this.focusable = l(this.focusable.not(o).get())),
            (this.hoverable = l(this.hoverable.not(o).get()));
        },
        _delay: function (o, t) {
          var e = this;
          return setTimeout(function () {
            return ("string" == typeof o ? e[o] : o).apply(e, arguments);
          }, t || 0);
        },
        _hoverable: function (e) {
          (this.hoverable = this.hoverable.add(e)),
            this._on(e, {
              mouseenter: function (e) {
                l(e.currentTarget).addClass("ui-state-hover");
              },
              mouseleave: function (e) {
                l(e.currentTarget).removeClass("ui-state-hover");
              },
            });
        },
        _focusable: function (e) {
          (this.focusable = this.focusable.add(e)),
            this._on(e, {
              focusin: function (e) {
                l(e.currentTarget).addClass("ui-state-focus");
              },
              focusout: function (e) {
                l(e.currentTarget).removeClass("ui-state-focus");
              },
            });
        },
        _trigger: function (a, t, r) {
          var d,
            p,
            c = this.options[a];
          if (
            ((r = r || {}),
            ((t = l.Event(t)).type = (
              a === this.widgetEventPrefix ? a : this.widgetEventPrefix + a
            ).toLowerCase()),
            (t.target = this.element[0]),
            (p = t.originalEvent))
          )
            for (d in p) d in t || (t[d] = p[d]);
          return (
            this.element.trigger(t, r),
            !(
              (l.isFunction(c) &&
                !1 === c.apply(this.element[0], [t].concat(r))) ||
              t.isDefaultPrevented()
            )
          );
        },
      }),
      l.each({ show: "fadeIn", hide: "fadeOut" }, function (a, o) {
        l.Widget.prototype["_" + a] = function (r, e, d) {
          "string" == typeof e && (e = { effect: e });
          var i,
            p = e ? (!0 === e || "number" == typeof e ? o : e.effect || o) : a;
          "number" == typeof (e = e || {}) && (e = { duration: e }),
            (i = !l.isEmptyObject(e)),
            (e.complete = d),
            e.delay && r.delay(e.delay),
            i && l.effects && l.effects.effect[p]
              ? r[a](e)
              : p !== a && r[p]
              ? r[p](e.duration, e.easing, d)
              : r.queue(function (e) {
                  l(this)[a](), d && d.call(r[0]), e();
                });
        };
      }),
      l.widget
    );
  }),
  !(function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery", "./widget"], t)
      : t(jQuery);
  })(function (a) {
    var o = !1;
    return (
      a(document).mouseup(function () {
        o = !1;
      }),
      a.widget("ui.mouse", {
        version: "1.11.4",
        options: {
          cancel: "input,textarea,button,select,option",
          distance: 1,
          delay: 0,
        },
        _mouseInit: function () {
          var o = this;
          this.element
            .bind("mousedown." + this.widgetName, function (t) {
              return o._mouseDown(t);
            })
            .bind("click." + this.widgetName, function (t) {
              if (!0 === a.data(t.target, o.widgetName + ".preventClickEvent"))
                return (
                  a.removeData(t.target, o.widgetName + ".preventClickEvent"),
                  t.stopImmediatePropagation(),
                  !1
                );
            }),
            (this.started = !1);
        },
        _mouseDestroy: function () {
          this.element.unbind("." + this.widgetName),
            this._mouseMoveDelegate &&
              this.document
                .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
                .unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
        },
        _mouseDown: function (n) {
          if (!o) {
            (this._mouseMoved = !1),
              this._mouseStarted && this._mouseUp(n),
              (this._mouseDownEvent = n);
            var r = this,
              e = 1 === n.which,
              t =
                "string" == typeof this.options.cancel &&
                n.target.nodeName &&
                a(n.target).closest(this.options.cancel).length;
            return (
              !(e && !t && this._mouseCapture(n)) ||
              ((this.mouseDelayMet = !this.options.delay),
              this.mouseDelayMet ||
                (this._mouseDelayTimer = setTimeout(function () {
                  r.mouseDelayMet = !0;
                }, this.options.delay)),
              this._mouseDistanceMet(n) &&
              this._mouseDelayMet(n) &&
              ((this._mouseStarted = !1 !== this._mouseStart(n)),
              !this._mouseStarted)
                ? (n.preventDefault(), !0)
                : (!0 ===
                    a.data(n.target, this.widgetName + ".preventClickEvent") &&
                    a.removeData(
                      n.target,
                      this.widgetName + ".preventClickEvent"
                    ),
                  (this._mouseMoveDelegate = function (t) {
                    return r._mouseMove(t);
                  }),
                  (this._mouseUpDelegate = function (t) {
                    return r._mouseUp(t);
                  }),
                  this.document
                    .bind(
                      "mousemove." + this.widgetName,
                      this._mouseMoveDelegate
                    )
                    .bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                  n.preventDefault(),
                  (o = !0)))
            );
          }
        },
        _mouseMove: function (t) {
          if (this._mouseMoved) {
            if (
              a.ui.ie &&
              (!document.documentMode || 9 > document.documentMode) &&
              !t.button
            )
              return this._mouseUp(t);
            if (!t.which) return this._mouseUp(t);
          }
          return (
            (t.which || t.button) && (this._mouseMoved = !0),
            this._mouseStarted
              ? (this._mouseDrag(t), t.preventDefault())
              : (this._mouseDistanceMet(t) &&
                  this._mouseDelayMet(t) &&
                  ((this._mouseStarted =
                    !1 !== this._mouseStart(this._mouseDownEvent, t)),
                  this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)),
                !this._mouseStarted)
          );
        },
        _mouseUp: function (t) {
          return (
            this.document
              .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
              .unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
            this._mouseStarted &&
              ((this._mouseStarted = !1),
              t.target === this._mouseDownEvent.target &&
                a.data(t.target, this.widgetName + ".preventClickEvent", !0),
              this._mouseStop(t)),
            (o = !1)
          );
        },
        _mouseDistanceMet: function (t) {
          return (
            Math.max(
              Math.abs(this._mouseDownEvent.pageX - t.pageX),
              Math.abs(this._mouseDownEvent.pageY - t.pageY)
            ) >= this.options.distance
          );
        },
        _mouseDelayMet: function () {
          return this.mouseDelayMet;
        },
        _mouseStart: function () {},
        _mouseDrag: function () {},
        _mouseStop: function () {},
        _mouseCapture: function () {
          return !0;
        },
      })
    );
  }),
  !(function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery", "./core", "./mouse", "./widget"], t)
      : t(jQuery);
  })(function (d) {
    return d.widget("ui.slider", d.ui.mouse, {
      version: "1.11.4",
      widgetEventPrefix: "slide",
      options: {
        animate: !1,
        distance: 0,
        max: 100,
        min: 0,
        orientation: "horizontal",
        range: !1,
        step: 1,
        value: 0,
        values: null,
        change: null,
        slide: null,
        start: null,
        stop: null,
      },
      numPages: 5,
      _create: function () {
        (this._keySliding = !1),
          (this._mouseSliding = !1),
          (this._animateOff = !0),
          (this._handleIndex = null),
          this._detectOrientation(),
          this._mouseInit(),
          this._calculateNewMax(),
          this.element.addClass(
            "ui-slider ui-slider-" +
              this.orientation +
              " ui-widget ui-widget-content ui-corner-all"
          ),
          this._refresh(),
          this._setOption("disabled", this.options.disabled),
          (this._animateOff = !1);
      },
      _refresh: function () {
        this._createRange(),
          this._createHandles(),
          this._setupEvents(),
          this._refreshValue();
      },
      _createHandles: function () {
        var o,
          n,
          r = this.options,
          i = this.element
            .find(".ui-slider-handle")
            .addClass("ui-state-default ui-corner-all"),
          l = [];
        for (
          n = (r.values && r.values.length) || 1,
            i.length > n && (i.slice(n).remove(), (i = i.slice(0, n))),
            o = i.length;
          o < n;
          o++
        )
          l.push(
            "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>"
          );
        (this.handles = i.add(d(l.join("")).appendTo(this.element))),
          (this.handle = this.handles.eq(0)),
          this.handles.each(function (t) {
            d(this).data("ui-slider-handle-index", t);
          });
      },
      _createRange: function () {
        var o = this.options,
          e = "";
        o.range
          ? (!0 === o.range &&
              (o.values
                ? o.values.length && 2 !== o.values.length
                  ? (o.values = [o.values[0], o.values[0]])
                  : d.isArray(o.values) && (o.values = o.values.slice(0))
                : (o.values = [this._valueMin(), this._valueMin()])),
            this.range && this.range.length
              ? this.range
                  .removeClass("ui-slider-range-min ui-slider-range-max")
                  .css({ left: "", bottom: "" })
              : ((this.range = d("<div></div>").appendTo(this.element)),
                (e = "ui-slider-range ui-widget-header ui-corner-all")),
            this.range.addClass(
              e +
                ("min" === o.range || "max" === o.range
                  ? " ui-slider-range-" + o.range
                  : "")
            ))
          : (this.range && this.range.remove(), (this.range = null));
      },
      _setupEvents: function () {
        this._off(this.handles),
          this._on(this.handles, this._handleEvents),
          this._hoverable(this.handles),
          this._focusable(this.handles);
      },
      _destroy: function () {
        this.handles.remove(),
          this.range && this.range.remove(),
          this.element.removeClass(
            "ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"
          ),
          this._mouseDestroy();
      },
      _mouseCapture: function (r) {
        var e,
          p,
          c,
          m,
          g,
          f,
          v,
          _ = this,
          o = this.options;
        return (
          !o.disabled &&
          ((this.elementSize = {
            width: this.element.outerWidth(),
            height: this.element.outerHeight(),
          }),
          (this.elementOffset = this.element.offset()),
          (e = { x: r.pageX, y: r.pageY }),
          (p = this._normValueFromMouse(e)),
          (c = this._valueMax() - this._valueMin() + 1),
          this.handles.each(function (i) {
            var e = Math.abs(p - _.values(i));
            (e < c ||
              (c === e &&
                (i === _._lastChangedValue || _.values(i) === o.min))) &&
              ((c = e), (m = d(this)), (g = i));
          }),
          !1 !== this._start(r, g) &&
            ((this._mouseSliding = !0),
            (this._handleIndex = g),
            m.addClass("ui-state-active").focus(),
            (f = m.offset()),
            (v = !d(r.target).parents().addBack().is(".ui-slider-handle")),
            (this._clickOffset = v
              ? { left: 0, top: 0 }
              : {
                  left: r.pageX - f.left - m.width() / 2,
                  top:
                    r.pageY -
                    f.top -
                    m.height() / 2 -
                    (parseInt(m.css("borderTopWidth"), 10) || 0) -
                    (parseInt(m.css("borderBottomWidth"), 10) || 0) +
                    (parseInt(m.css("marginTop"), 10) || 0),
                }),
            this.handles.hasClass("ui-state-hover") || this._slide(r, g, p),
            (this._animateOff = !0)))
        );
      },
      _mouseStart: function () {
        return !0;
      },
      _mouseDrag: function (o) {
        var e = { x: o.pageX, y: o.pageY },
          t = this._normValueFromMouse(e);
        return this._slide(o, this._handleIndex, t), !1;
      },
      _mouseStop: function (t) {
        return (
          this.handles.removeClass("ui-state-active"),
          (this._mouseSliding = !1),
          this._stop(t, this._handleIndex),
          this._change(t, this._handleIndex),
          (this._handleIndex = null),
          (this._clickOffset = null),
          (this._animateOff = !1)
        );
      },
      _detectOrientation: function () {
        this.orientation =
          "vertical" === this.options.orientation ? "vertical" : "horizontal";
      },
      _normValueFromMouse: function (o) {
        var e, n, r, l;
        return (
          1 <
            (n =
              ("horizontal" === this.orientation
                ? ((e = this.elementSize.width),
                  o.x -
                    this.elementOffset.left -
                    (this._clickOffset ? this._clickOffset.left : 0))
                : ((e = this.elementSize.height),
                  o.y -
                    this.elementOffset.top -
                    (this._clickOffset ? this._clickOffset.top : 0))) / e) &&
            (n = 1),
          0 > n && (n = 0),
          "vertical" === this.orientation && (n = 1 - n),
          (r = this._valueMax() - this._valueMin()),
          (l = this._valueMin() + n * r),
          this._trimAlignValue(l)
        );
      },
      _start: function (o, e) {
        var t = { handle: this.handles[e], value: this.value() };
        return (
          this.options.values &&
            this.options.values.length &&
            ((t.value = this.values(e)), (t.values = this.values())),
          this._trigger("start", o, t)
        );
      },
      _slide: function (o, e, t) {
        var r, l, d;
        this.options.values && this.options.values.length
          ? ((r = this.values(e ? 0 : 1)),
            2 === this.options.values.length &&
              !0 === this.options.range &&
              ((0 === e && r < t) || (1 === e && t < r)) &&
              (t = r),
            t !== this.values(e) &&
              (((l = this.values())[e] = t),
              (d = this._trigger("slide", o, {
                handle: this.handles[e],
                value: t,
                values: l,
              })),
              (r = this.values(e ? 0 : 1)),
              !1 !== d && this.values(e, t)))
          : t !== this.value() &&
            !1 !==
              (d = this._trigger("slide", o, {
                handle: this.handles[e],
                value: t,
              })) &&
            this.value(t);
      },
      _stop: function (o, e) {
        var t = { handle: this.handles[e], value: this.value() };
        this.options.values &&
          this.options.values.length &&
          ((t.value = this.values(e)), (t.values = this.values())),
          this._trigger("stop", o, t);
      },
      _change: function (o, e) {
        if (!this._keySliding && !this._mouseSliding) {
          var t = { handle: this.handles[e], value: this.value() };
          this.options.values &&
            this.options.values.length &&
            ((t.value = this.values(e)), (t.values = this.values())),
            (this._lastChangedValue = e),
            this._trigger("change", o, t);
        }
      },
      value: function (t) {
        return arguments.length
          ? ((this.options.value = this._trimAlignValue(t)),
            this._refreshValue(),
            void this._change(null, 0))
          : this._value();
      },
      values: function (o, e) {
        var t, n, r;
        if (1 < arguments.length)
          return (
            (this.options.values[o] = this._trimAlignValue(e)),
            this._refreshValue(),
            void this._change(null, o)
          );
        if (!arguments.length) return this._values();
        if (!d.isArray(o))
          return this.options.values && this.options.values.length
            ? this._values(o)
            : this.value();
        for (t = this.options.values, n = o, r = 0; r < t.length; r += 1)
          (t[r] = this._trimAlignValue(n[r])), this._change(null, r);
        this._refreshValue();
      },
      _setOption: function (o, e) {
        var t,
          a = 0;
        switch (
          ("range" === o &&
            !0 === this.options.range &&
            ("min" === e
              ? ((this.options.value = this._values(0)),
                (this.options.values = null))
              : "max" == e &&
                ((this.options.value = this._values(
                  this.options.values.length - 1
                )),
                (this.options.values = null))),
          d.isArray(this.options.values) && (a = this.options.values.length),
          "disabled" === o &&
            this.element.toggleClass("ui-state-disabled", !!e),
          this._super(o, e),
          o)
        ) {
          case "orientation":
            this._detectOrientation(),
              this.element
                .removeClass("ui-slider-horizontal ui-slider-vertical")
                .addClass("ui-slider-" + this.orientation),
              this._refreshValue(),
              this.handles.css("horizontal" === e ? "bottom" : "left", "");
            break;
          case "value":
            (this._animateOff = !0),
              this._refreshValue(),
              this._change(null, 0),
              (this._animateOff = !1);
            break;
          case "values":
            for (
              this._animateOff = !0, this._refreshValue(), t = 0;
              t < a;
              t += 1
            )
              this._change(null, t);
            this._animateOff = !1;
            break;
          case "step":
          case "min":
          case "max":
            (this._animateOff = !0),
              this._calculateNewMax(),
              this._refreshValue(),
              (this._animateOff = !1);
            break;
          case "range":
            (this._animateOff = !0), this._refresh(), (this._animateOff = !1);
        }
      },
      _value: function () {
        var t = this.options.value;
        return (t = this._trimAlignValue(t));
      },
      _values: function (o) {
        var e, a, n;
        if (arguments.length)
          return (e = this.options.values[o]), (e = this._trimAlignValue(e));
        if (this.options.values && this.options.values.length) {
          for (a = this.options.values.slice(), n = 0; n < a.length; n += 1)
            a[n] = this._trimAlignValue(a[n]);
          return a;
        }
        return [];
      },
      _trimAlignValue: function (o) {
        if (o <= this._valueMin()) return this._valueMin();
        if (o >= this._valueMax()) return this._valueMax();
        var e = 0 < this.options.step ? this.options.step : 1,
          t = (o - this._valueMin()) % e,
          i = o - t;
        return (
          2 * Math.abs(t) >= e && (i += 0 < t ? e : -e),
          parseFloat(i.toFixed(5))
        );
      },
      _calculateNewMax: function () {
        var o = this.options.max,
          a = this._valueMin(),
          t = this.options.step;
        (o = Math.floor(+(o - a).toFixed(this._precision()) / t) * t + a),
          (this.max = parseFloat(o.toFixed(this._precision())));
      },
      _precision: function () {
        var t = this._precisionOf(this.options.step);
        return (
          null !== this.options.min &&
            (t = Math.max(t, this._precisionOf(this.options.min))),
          t
        );
      },
      _precisionOf: function (o) {
        var e = o.toString(),
          t = e.indexOf(".");
        return -1 === t ? 0 : e.length - t - 1;
      },
      _valueMin: function () {
        return this.options.min;
      },
      _valueMax: function () {
        return this.max;
      },
      _refreshValue: function () {
        var r,
          p,
          c,
          m,
          g,
          f = this.options.range,
          n = this.options,
          h = this,
          l = !this._animateOff && n.animate,
          o = {};
        this.options.values && this.options.values.length
          ? this.handles.each(function (t) {
              (p =
                100 *
                ((h.values(t) - h._valueMin()) /
                  (h._valueMax() - h._valueMin()))),
                (o["horizontal" === h.orientation ? "left" : "bottom"] =
                  p + "%"),
                d(this).stop(1, 1)[l ? "animate" : "css"](o, n.animate),
                !0 === h.options.range &&
                  ("horizontal" === h.orientation
                    ? (0 === t &&
                        h.range
                          .stop(1, 1)
                          [l ? "animate" : "css"]({ left: p + "%" }, n.animate),
                      1 === t &&
                        h.range[l ? "animate" : "css"](
                          { width: p - r + "%" },
                          { queue: !1, duration: n.animate }
                        ))
                    : (0 === t &&
                        h.range
                          .stop(1, 1)
                          [l ? "animate" : "css"](
                            { bottom: p + "%" },
                            n.animate
                          ),
                      1 === t &&
                        h.range[l ? "animate" : "css"](
                          { height: p - r + "%" },
                          { queue: !1, duration: n.animate }
                        ))),
                (r = p);
            })
          : ((c = this.value()),
            (m = this._valueMin()),
            (g = this._valueMax()),
            (p = g === m ? 0 : 100 * ((c - m) / (g - m))),
            (o["horizontal" === this.orientation ? "left" : "bottom"] =
              p + "%"),
            this.handle.stop(1, 1)[l ? "animate" : "css"](o, n.animate),
            "min" === f &&
              "horizontal" === this.orientation &&
              this.range
                .stop(1, 1)
                [l ? "animate" : "css"]({ width: p + "%" }, n.animate),
            "max" === f &&
              "horizontal" === this.orientation &&
              this.range[l ? "animate" : "css"](
                { width: 100 - p + "%" },
                { queue: !1, duration: n.animate }
              ),
            "min" === f &&
              "vertical" === this.orientation &&
              this.range
                .stop(1, 1)
                [l ? "animate" : "css"]({ height: p + "%" }, n.animate),
            "max" === f &&
              "vertical" === this.orientation &&
              this.range[l ? "animate" : "css"](
                { height: 100 - p + "%" },
                { queue: !1, duration: n.animate }
              ));
      },
      _handleEvents: {
        keydown: function (o) {
          var e,
            n,
            r,
            l = d(o.target).data("ui-slider-handle-index");
          switch (o.keyCode) {
            case d.ui.keyCode.HOME:
            case d.ui.keyCode.END:
            case d.ui.keyCode.PAGE_UP:
            case d.ui.keyCode.PAGE_DOWN:
            case d.ui.keyCode.UP:
            case d.ui.keyCode.RIGHT:
            case d.ui.keyCode.DOWN:
            case d.ui.keyCode.LEFT:
              if (
                (o.preventDefault(),
                !this._keySliding &&
                  ((this._keySliding = !0),
                  d(o.target).addClass("ui-state-active"),
                  !1 === this._start(o, l)))
              )
                return;
          }
          switch (
            ((r = this.options.step),
            (e = n =
              this.options.values && this.options.values.length
                ? this.values(l)
                : this.value()),
            o.keyCode)
          ) {
            case d.ui.keyCode.HOME:
              n = this._valueMin();
              break;
            case d.ui.keyCode.END:
              n = this._valueMax();
              break;
            case d.ui.keyCode.PAGE_UP:
              n = this._trimAlignValue(
                e + (this._valueMax() - this._valueMin()) / this.numPages
              );
              break;
            case d.ui.keyCode.PAGE_DOWN:
              n = this._trimAlignValue(
                e - (this._valueMax() - this._valueMin()) / this.numPages
              );
              break;
            case d.ui.keyCode.UP:
            case d.ui.keyCode.RIGHT:
              if (e === this._valueMax()) return;
              n = this._trimAlignValue(e + r);
              break;
            case d.ui.keyCode.DOWN:
            case d.ui.keyCode.LEFT:
              if (e === this._valueMin()) return;
              n = this._trimAlignValue(e - r);
          }
          this._slide(o, l, n);
        },
        keyup: function (o) {
          var e = d(o.target).data("ui-slider-handle-index");
          this._keySliding &&
            ((this._keySliding = !1),
            this._stop(o, e),
            this._change(o, e),
            d(o.target).removeClass("ui-state-active"));
        },
      },
    });
  }),
  !(function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery", "./core", "./widget", "./position"], t)
      : t(jQuery);
  })(function (r) {
    return r.widget("ui.menu", {
      version: "1.11.4",
      defaultElement: "<ul>",
      delay: 300,
      options: {
        icons: { submenu: "ui-icon-carat-1-e" },
        items: "> *",
        menus: "ul",
        position: { my: "left-1 top", at: "right top" },
        role: "menu",
        blur: null,
        focus: null,
        select: null,
      },
      _create: function () {
        (this.activeMenu = this.element),
          (this.mouseHandled = !1),
          this.element
            .uniqueId()
            .addClass("ui-menu ui-widget ui-widget-content")
            .toggleClass(
              "ui-menu-icons",
              !!this.element.find(".ui-icon").length
            )
            .attr({ role: this.options.role, tabIndex: 0 }),
          this.options.disabled &&
            this.element
              .addClass("ui-state-disabled")
              .attr("aria-disabled", "true"),
          this._on({
            "mousedown .ui-menu-item": function (t) {
              t.preventDefault();
            },
            "click .ui-menu-item": function (o) {
              var e = r(o.target);
              !this.mouseHandled &&
                e.not(".ui-state-disabled").length &&
                (this.select(o),
                o.isPropagationStopped() || (this.mouseHandled = !0),
                e.has(".ui-menu").length
                  ? this.expand(o)
                  : !this.element.is(":focus") &&
                    r(this.document[0].activeElement).closest(".ui-menu")
                      .length &&
                    (this.element.trigger("focus", [!0]),
                    this.active &&
                      1 === this.active.parents(".ui-menu").length &&
                      clearTimeout(this.timer)));
            },
            "mouseenter .ui-menu-item": function (o) {
              if (!this.previousFilter) {
                var e = r(o.currentTarget);
                e.siblings(".ui-state-active").removeClass("ui-state-active"),
                  this.focus(o, e);
              }
            },
            mouseleave: "collapseAll",
            "mouseleave .ui-menu": "collapseAll",
            focus: function (o, e) {
              var t =
                this.active || this.element.find(this.options.items).eq(0);
              e || this.focus(o, t);
            },
            blur: function (t) {
              this._delay(function () {
                r.contains(this.element[0], this.document[0].activeElement) ||
                  this.collapseAll(t);
              });
            },
            keydown: "_keydown",
          }),
          this.refresh(),
          this._on(this.document, {
            click: function (t) {
              this._closeOnDocumentClick(t) && this.collapseAll(t),
                (this.mouseHandled = !1);
            },
          });
      },
      _destroy: function () {
        this.element
          .removeAttr("aria-activedescendant")
          .find(".ui-menu")
          .addBack()
          .removeClass(
            "ui-menu ui-widget ui-widget-content ui-menu-icons ui-front"
          )
          .removeAttr("role")
          .removeAttr("tabIndex")
          .removeAttr("aria-labelledby")
          .removeAttr("aria-expanded")
          .removeAttr("aria-hidden")
          .removeAttr("aria-disabled")
          .removeUniqueId()
          .show(),
          this.element
            .find(".ui-menu-item")
            .removeClass("ui-menu-item")
            .removeAttr("role")
            .removeAttr("aria-disabled")
            .removeUniqueId()
            .removeClass("ui-state-hover")
            .removeAttr("tabIndex")
            .removeAttr("role")
            .removeAttr("aria-haspopup")
            .children()
            .each(function () {
              var t = r(this);
              t.data("ui-menu-submenu-carat") && t.remove();
            }),
          this.element
            .find(".ui-menu-divider")
            .removeClass("ui-menu-divider ui-widget-content");
      },
      _keydown: function (o) {
        var e,
          l,
          d,
          p,
          c = !0;
        switch (o.keyCode) {
          case r.ui.keyCode.PAGE_UP:
            this.previousPage(o);
            break;
          case r.ui.keyCode.PAGE_DOWN:
            this.nextPage(o);
            break;
          case r.ui.keyCode.HOME:
            this._move("first", "first", o);
            break;
          case r.ui.keyCode.END:
            this._move("last", "last", o);
            break;
          case r.ui.keyCode.UP:
            this.previous(o);
            break;
          case r.ui.keyCode.DOWN:
            this.next(o);
            break;
          case r.ui.keyCode.LEFT:
            this.collapse(o);
            break;
          case r.ui.keyCode.RIGHT:
            this.active &&
              !this.active.is(".ui-state-disabled") &&
              this.expand(o);
            break;
          case r.ui.keyCode.ENTER:
          case r.ui.keyCode.SPACE:
            this._activate(o);
            break;
          case r.ui.keyCode.ESCAPE:
            this.collapse(o);
            break;
          default:
            (c = !1),
              (l = this.previousFilter || ""),
              (d = String.fromCharCode(o.keyCode)),
              (p = !1),
              clearTimeout(this.filterTimer),
              d === l ? (p = !0) : (d = l + d),
              (e = this._filterMenuItems(d)),
              (e =
                p && -1 !== e.index(this.active.next())
                  ? this.active.nextAll(".ui-menu-item")
                  : e).length ||
                ((d = String.fromCharCode(o.keyCode)),
                (e = this._filterMenuItems(d))),
              e.length
                ? (this.focus(o, e),
                  (this.previousFilter = d),
                  (this.filterTimer = this._delay(function () {
                    delete this.previousFilter;
                  }, 1e3)))
                : delete this.previousFilter;
        }
        c && o.preventDefault();
      },
      _activate: function (t) {
        this.active.is(".ui-state-disabled") ||
          (this.active.is("[aria-haspopup='true']")
            ? this.expand(t)
            : this.select(t));
      },
      refresh: function () {
        var o,
          a = this,
          n = this.options.icons.submenu,
          t = this.element.find(this.options.menus);
        this.element.toggleClass(
          "ui-menu-icons",
          !!this.element.find(".ui-icon").length
        ),
          t
            .filter(":not(.ui-menu)")
            .addClass("ui-menu ui-widget ui-widget-content ui-front")
            .hide()
            .attr({
              role: this.options.role,
              "aria-hidden": "true",
              "aria-expanded": "false",
            })
            .each(function () {
              var o = r(this),
                e = o.parent(),
                t = r("<span>")
                  .addClass("ui-menu-icon ui-icon " + n)
                  .data("ui-menu-submenu-carat", !0);
              e.attr("aria-haspopup", "true").prepend(t),
                o.attr("aria-labelledby", e.attr("id"));
            }),
          (o = t.add(this.element).find(this.options.items))
            .not(".ui-menu-item")
            .each(function () {
              var t = r(this);
              a._isDivider(t) &&
                t.addClass("ui-widget-content ui-menu-divider");
            }),
          o
            .not(".ui-menu-item, .ui-menu-divider")
            .addClass("ui-menu-item")
            .uniqueId()
            .attr({ tabIndex: -1, role: this._itemRole() }),
          o.filter(".ui-state-disabled").attr("aria-disabled", "true"),
          this.active &&
            !r.contains(this.element[0], this.active[0]) &&
            this.blur();
      },
      _itemRole: function () {
        return { menu: "menuitem", listbox: "option" }[this.options.role];
      },
      _setOption: function (o, e) {
        "icons" === o &&
          this.element
            .find(".ui-menu-icon")
            .removeClass(this.options.icons.submenu)
            .addClass(e.submenu),
          "disabled" === o &&
            this.element
              .toggleClass("ui-state-disabled", !!e)
              .attr("aria-disabled", e),
          this._super(o, e);
      },
      focus: function (o, e) {
        var t, a;
        this.blur(o, o && "focus" === o.type),
          this._scrollIntoView(e),
          (this.active = e.first()),
          (a = this.active
            .addClass("ui-state-focus")
            .removeClass("ui-state-active")),
          this.options.role &&
            this.element.attr("aria-activedescendant", a.attr("id")),
          this.active
            .parent()
            .closest(".ui-menu-item")
            .addClass("ui-state-active"),
          o && "keydown" === o.type
            ? this._close()
            : (this.timer = this._delay(function () {
                this._close();
              }, this.delay)),
          (t = e.children(".ui-menu")).length &&
            o &&
            /^mouse/.test(o.type) &&
            this._startOpening(t),
          (this.activeMenu = e.parent()),
          this._trigger("focus", o, { item: e });
      },
      _scrollIntoView: function (o) {
        var e, l, d, p, c, m;
        this._hasScroll() &&
          ((e = parseFloat(r.css(this.activeMenu[0], "borderTopWidth")) || 0),
          (l = parseFloat(r.css(this.activeMenu[0], "paddingTop")) || 0),
          (d = o.offset().top - this.activeMenu.offset().top - e - l),
          (p = this.activeMenu.scrollTop()),
          (c = this.activeMenu.height()),
          (m = o.outerHeight()),
          0 > d
            ? this.activeMenu.scrollTop(p + d)
            : c < d + m && this.activeMenu.scrollTop(p + d - c + m));
      },
      blur: function (o, e) {
        e || clearTimeout(this.timer),
          this.active &&
            (this.active.removeClass("ui-state-focus"),
            (this.active = null),
            this._trigger("blur", o, { item: this.active }));
      },
      _startOpening: function (t) {
        clearTimeout(this.timer),
          "true" === t.attr("aria-hidden") &&
            (this.timer = this._delay(function () {
              this._close(), this._open(t);
            }, this.delay));
      },
      _open: function (o) {
        var e = r.extend({ of: this.active }, this.options.position);
        clearTimeout(this.timer),
          this.element
            .find(".ui-menu")
            .not(o.parents(".ui-menu"))
            .hide()
            .attr("aria-hidden", "true"),
          o
            .show()
            .removeAttr("aria-hidden")
            .attr("aria-expanded", "true")
            .position(e);
      },
      collapseAll: function (o, t) {
        clearTimeout(this.timer),
          (this.timer = this._delay(function () {
            var i = t
              ? this.element
              : r(o && o.target).closest(this.element.find(".ui-menu"));
            i.length || (i = this.element),
              this._close(i),
              this.blur(o),
              (this.activeMenu = i);
          }, this.delay));
      },
      _close: function (t) {
        (t = t || (this.active ? this.active.parent() : this.element))
          .find(".ui-menu")
          .hide()
          .attr("aria-hidden", "true")
          .attr("aria-expanded", "false")
          .end()
          .find(".ui-state-active")
          .not(".ui-state-focus")
          .removeClass("ui-state-active");
      },
      _closeOnDocumentClick: function (t) {
        return !r(t.target).closest(".ui-menu").length;
      },
      _isDivider: function (t) {
        return !/[^\-\u2014\u2013\s]/.test(t.text());
      },
      collapse: function (o) {
        var e =
          this.active &&
          this.active.parent().closest(".ui-menu-item", this.element);
        e && e.length && (this._close(), this.focus(o, e));
      },
      expand: function (o) {
        var e =
          this.active &&
          this.active.children(".ui-menu ").find(this.options.items).first();
        e &&
          e.length &&
          (this._open(e.parent()),
          this._delay(function () {
            this.focus(o, e);
          }));
      },
      next: function (t) {
        this._move("next", "first", t);
      },
      previous: function (t) {
        this._move("prev", "last", t);
      },
      isFirstItem: function () {
        return this.active && !this.active.prevAll(".ui-menu-item").length;
      },
      isLastItem: function () {
        return this.active && !this.active.nextAll(".ui-menu-item").length;
      },
      _move: function (o, e, t) {
        var i;
        this.active &&
          (i =
            "first" === o || "last" === o
              ? this.active["first" === o ? "prevAll" : "nextAll"](
                  ".ui-menu-item"
                ).eq(-1)
              : this.active[o + "All"](".ui-menu-item").eq(0)),
          (i && i.length && this.active) ||
            (i = this.activeMenu.find(this.options.items)[e]()),
          this.focus(t, i);
      },
      nextPage: function (o) {
        var e, a, n;
        this.active
          ? this.isLastItem() ||
            (this._hasScroll()
              ? ((a = this.active.offset().top),
                (n = this.element.height()),
                this.active.nextAll(".ui-menu-item").each(function () {
                  return 0 > (e = r(this)).offset().top - a - n;
                }),
                this.focus(o, e))
              : this.focus(
                  o,
                  this.activeMenu
                    .find(this.options.items)
                    [this.active ? "last" : "first"]()
                ))
          : this.next(o);
      },
      previousPage: function (o) {
        var e, a, n;
        this.active
          ? this.isFirstItem() ||
            (this._hasScroll()
              ? ((a = this.active.offset().top),
                (n = this.element.height()),
                this.active.prevAll(".ui-menu-item").each(function () {
                  return 0 < (e = r(this)).offset().top - a + n;
                }),
                this.focus(o, e))
              : this.focus(o, this.activeMenu.find(this.options.items).first()))
          : this.next(o);
      },
      _hasScroll: function () {
        return this.element.outerHeight() < this.element.prop("scrollHeight");
      },
      select: function (o) {
        this.active = this.active || r(o.target).closest(".ui-menu-item");
        var e = { item: this.active };
        this.active.has(".ui-menu").length || this.collapseAll(o, !0),
          this._trigger("select", o, e);
      },
      _filterMenuItems: function (o) {
        var e = o.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
          t = new RegExp("^" + e, "i");
        return this.activeMenu
          .find(this.options.items)
          .filter(".ui-menu-item")
          .filter(function () {
            return t.test(r.trim(r(this).text()));
          });
      },
    });
  }),
  !(function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery", "./core", "./widget", "./position", "./menu"], t)
      : t(jQuery);
  })(function (a) {
    return (
      a.widget("ui.autocomplete", {
        version: "1.11.4",
        defaultElement: "<input>",
        options: {
          appendTo: null,
          autoFocus: !1,
          delay: 300,
          minLength: 1,
          position: { my: "left top", at: "left bottom", collision: "none" },
          source: null,
          change: null,
          close: null,
          focus: null,
          open: null,
          response: null,
          search: null,
          select: null,
        },
        requestIndex: 0,
        pending: 0,
        _create: function () {
          var r,
            l,
            d,
            p = this.element[0].nodeName.toLowerCase(),
            e = "textarea" === p,
            t = "input" === p;
          (this.isMultiLine =
            e || (!t && this.element.prop("isContentEditable"))),
            (this.valueMethod = this.element[e || t ? "val" : "text"]),
            (this.isNewMenu = !0),
            this.element
              .addClass("ui-autocomplete-input")
              .attr("autocomplete", "off"),
            this._on(this.element, {
              keydown: function (o) {
                if (this.element.prop("readOnly")) l = d = r = !0;
                else {
                  l = d = r = !1;
                  var e = a.ui.keyCode;
                  switch (o.keyCode) {
                    case e.PAGE_UP:
                      (r = !0), this._move("previousPage", o);
                      break;
                    case e.PAGE_DOWN:
                      (r = !0), this._move("nextPage", o);
                      break;
                    case e.UP:
                      (r = !0), this._keyEvent("previous", o);
                      break;
                    case e.DOWN:
                      (r = !0), this._keyEvent("next", o);
                      break;
                    case e.ENTER:
                      this.menu.active &&
                        ((r = !0), o.preventDefault(), this.menu.select(o));
                      break;
                    case e.TAB:
                      this.menu.active && this.menu.select(o);
                      break;
                    case e.ESCAPE:
                      this.menu.element.is(":visible") &&
                        (this.isMultiLine || this._value(this.term),
                        this.close(o),
                        o.preventDefault());
                      break;
                    default:
                      (l = !0), this._searchTimeout(o);
                  }
                }
              },
              keypress: function (o) {
                if (r)
                  return (
                    (r = !1),
                    void (
                      (this.isMultiLine && !this.menu.element.is(":visible")) ||
                      o.preventDefault()
                    )
                  );
                if (!l) {
                  var e = a.ui.keyCode;
                  switch (o.keyCode) {
                    case e.PAGE_UP:
                      this._move("previousPage", o);
                      break;
                    case e.PAGE_DOWN:
                      this._move("nextPage", o);
                      break;
                    case e.UP:
                      this._keyEvent("previous", o);
                      break;
                    case e.DOWN:
                      this._keyEvent("next", o);
                  }
                }
              },
              input: function (t) {
                return d
                  ? ((d = !1), void t.preventDefault())
                  : void this._searchTimeout(t);
              },
              focus: function () {
                (this.selectedItem = null), (this.previous = this._value());
              },
              blur: function (t) {
                this.cancelBlur
                  ? delete this.cancelBlur
                  : (clearTimeout(this.searching),
                    this.close(t),
                    this._change(t));
              },
            }),
            this._initSource(),
            (this.menu = a("<ul>")
              .addClass("ui-autocomplete ui-front")
              .appendTo(this._appendTo())
              .menu({ role: null })
              .hide()
              .menu("instance")),
            this._on(this.menu.element, {
              mousedown: function (t) {
                t.preventDefault(),
                  (this.cancelBlur = !0),
                  this._delay(function () {
                    delete this.cancelBlur;
                  });
                var o = this.menu.element[0];
                a(t.target).closest(".ui-menu-item").length ||
                  this._delay(function () {
                    var i = this;
                    this.document.one("mousedown", function (t) {
                      t.target === i.element[0] ||
                        t.target === o ||
                        a.contains(o, t.target) ||
                        i.close();
                    });
                  });
              },
              menufocus: function (o, e) {
                var t, n;
                return this.isNewMenu &&
                  ((this.isNewMenu = !1),
                  o.originalEvent && /^mouse/.test(o.originalEvent.type))
                  ? (this.menu.blur(),
                    void this.document.one("mousemove", function () {
                      a(o.target).trigger(o.originalEvent);
                    }))
                  : void ((n = e.item.data("ui-autocomplete-item")),
                    !1 !== this._trigger("focus", o, { item: n }) &&
                      o.originalEvent &&
                      /^key/.test(o.originalEvent.type) &&
                      this._value(n.value),
                    (t = e.item.attr("aria-label") || n.value) &&
                      a.trim(t).length &&
                      (this.liveRegion.children().hide(),
                      a("<div>").text(t).appendTo(this.liveRegion)));
              },
              menuselect: function (o, e) {
                var t = e.item.data("ui-autocomplete-item"),
                  i = this.previous;
                this.element[0] !== this.document[0].activeElement &&
                  (this.element.focus(),
                  (this.previous = i),
                  this._delay(function () {
                    (this.previous = i), (this.selectedItem = t);
                  })),
                  !1 !== this._trigger("select", o, { item: t }) &&
                    this._value(t.value),
                  (this.term = this._value()),
                  this.close(o),
                  (this.selectedItem = t);
              },
            }),
            (this.liveRegion = a("<span>", {
              role: "status",
              "aria-live": "assertive",
              "aria-relevant": "additions",
            })
              .addClass("ui-helper-hidden-accessible")
              .appendTo(this.document[0].body)),
            this._on(this.window, {
              beforeunload: function () {
                this.element.removeAttr("autocomplete");
              },
            });
        },
        _destroy: function () {
          clearTimeout(this.searching),
            this.element
              .removeClass("ui-autocomplete-input")
              .removeAttr("autocomplete"),
            this.menu.element.remove(),
            this.liveRegion.remove();
        },
        _setOption: function (o, e) {
          this._super(o, e),
            "source" === o && this._initSource(),
            "appendTo" === o && this.menu.element.appendTo(this._appendTo()),
            "disabled" === o && e && this.xhr && this.xhr.abort();
        },
        _appendTo: function () {
          var t = this.options.appendTo;
          return (
            ((t =
              t &&
              (t.jquery || t.nodeType ? a(t) : this.document.find(t).eq(0))) &&
              t[0]) ||
              (t = this.element.closest(".ui-front")),
            t.length || (t = this.document[0].body),
            t
          );
        },
        _initSource: function () {
          var o,
            r,
            l = this;
          a.isArray(this.options.source)
            ? ((o = this.options.source),
              (this.source = function (i, e) {
                e(a.ui.autocomplete.filter(o, i.term));
              }))
            : "string" == typeof this.options.source
            ? ((r = this.options.source),
              (this.source = function (o, i) {
                l.xhr && l.xhr.abort(),
                  (l.xhr = a.ajax({
                    url: r,
                    data: o,
                    dataType: "json",
                    success: function (t) {
                      i(t);
                    },
                    error: function () {
                      i([]);
                    },
                  }));
              }))
            : (this.source = this.options.source);
        },
        _searchTimeout: function (o) {
          clearTimeout(this.searching),
            (this.searching = this._delay(function () {
              var a = this.term === this._value(),
                e = this.menu.element.is(":visible"),
                t = o.altKey || o.ctrlKey || o.metaKey || o.shiftKey;
              (a && (!a || e || t)) ||
                ((this.selectedItem = null), this.search(null, o));
            }, this.options.delay));
        },
        search: function (o, i) {
          return (
            (o = null == o ? this._value() : o),
            (this.term = this._value()),
            o.length < this.options.minLength
              ? this.close(i)
              : !1 === this._trigger("search", i)
              ? void 0
              : this._search(o)
          );
        },
        _search: function (t) {
          this.pending++,
            this.element.addClass("ui-autocomplete-loading"),
            (this.cancelSearch = !1),
            this.source({ term: t }, this._response());
        },
        _response: function () {
          var o = ++this.requestIndex;
          return a.proxy(function (t) {
            o === this.requestIndex && this.__response(t),
              this.pending--,
              this.pending ||
                this.element.removeClass("ui-autocomplete-loading");
          }, this);
        },
        __response: function (t) {
          (t = t && this._normalize(t)),
            this._trigger("response", null, { content: t }),
            !this.options.disabled && t && t.length && !this.cancelSearch
              ? (this._suggest(t), this._trigger("open"))
              : this._close();
        },
        close: function (t) {
          (this.cancelSearch = !0), this._close(t);
        },
        _close: function (t) {
          this.menu.element.is(":visible") &&
            (this.menu.element.hide(),
            this.menu.blur(),
            (this.isNewMenu = !0),
            this._trigger("close", t));
        },
        _change: function (t) {
          this.previous !== this._value() &&
            this._trigger("change", t, { item: this.selectedItem });
        },
        _normalize: function (t) {
          return t.length && t[0].label && t[0].value
            ? t
            : a.map(t, function (t) {
                return "string" == typeof t
                  ? { label: t, value: t }
                  : a.extend({}, t, {
                      label: t.label || t.value,
                      value: t.value || t.label,
                    });
              });
        },
        _suggest: function (o) {
          var e = this.menu.element.empty();
          this._renderMenu(e, o),
            (this.isNewMenu = !0),
            this.menu.refresh(),
            e.show(),
            this._resizeMenu(),
            e.position(a.extend({ of: this.element }, this.options.position)),
            this.options.autoFocus && this.menu.next();
        },
        _resizeMenu: function () {
          var t = this.menu.element;
          t.outerWidth(
            Math.max(t.width("").outerWidth() + 1, this.element.outerWidth())
          );
        },
        _renderMenu: function (o, t) {
          var i = this;
          a.each(t, function (a, e) {
            i._renderItemData(o, e);
          });
        },
        _renderItemData: function (o, e) {
          return this._renderItem(o, e).data("ui-autocomplete-item", e);
        },
        _renderItem: function (o, e) {
          return a("<li>").text(e.label).appendTo(o);
        },
        _move: function (o, e) {
          return this.menu.element.is(":visible")
            ? (this.menu.isFirstItem() && /^previous/.test(o)) ||
              (this.menu.isLastItem() && /^next/.test(o))
              ? (this.isMultiLine || this._value(this.term),
                void this.menu.blur())
              : void this.menu[o](e)
            : void this.search(null, e);
        },
        widget: function () {
          return this.menu.element;
        },
        _value: function () {
          return this.valueMethod.apply(this.element, arguments);
        },
        _keyEvent: function (o, e) {
          (this.isMultiLine && !this.menu.element.is(":visible")) ||
            (this._move(o, e), e.preventDefault());
        },
      }),
      a.extend(a.ui.autocomplete, {
        escapeRegex: function (t) {
          return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        },
        filter: function (o, e) {
          var t = new RegExp(a.ui.autocomplete.escapeRegex(e), "i");
          return a.grep(o, function (o) {
            return t.test(o.label || o.value || o);
          });
        },
      }),
      a.widget("ui.autocomplete", a.ui.autocomplete, {
        options: {
          messages: {
            noResults: "No search results.",
            results: function (t) {
              return (
                t +
                (1 < t ? " results are" : " result is") +
                " available, use up and down arrow keys to navigate."
              );
            },
          },
        },
        __response: function (o) {
          var e;
          this._superApply(arguments),
            this.options.disabled ||
              this.cancelSearch ||
              ((e =
                o && o.length
                  ? this.options.messages.results(o.length)
                  : this.options.messages.noResults),
              this.liveRegion.children().hide(),
              a("<div>").text(e).appendTo(this.liveRegion));
        },
      }),
      a.ui.autocomplete
    );
  }),
  !(function (e) {
    "function" == typeof define && define.amd
      ? define(["jquery", "./core", "./mouse", "./widget"], e)
      : e(jQuery);
  })(function (b) {
    return (
      b.widget("ui.draggable", b.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "drag",
        options: {
          addClasses: !0,
          appendTo: "parent",
          axis: !1,
          connectToSortable: !1,
          containment: !1,
          cursor: "auto",
          cursorAt: !1,
          grid: !1,
          handle: !1,
          helper: "original",
          iframeFix: !1,
          opacity: !1,
          refreshPositions: !1,
          revert: !1,
          revertDuration: 500,
          scope: "default",
          scroll: !0,
          scrollSensitivity: 20,
          scrollSpeed: 20,
          snap: !1,
          snapMode: "both",
          snapTolerance: 20,
          stack: !1,
          zIndex: !1,
          drag: null,
          start: null,
          stop: null,
        },
        _create: function () {
          "original" === this.options.helper && this._setPositionRelative(),
            this.options.addClasses && this.element.addClass("ui-draggable"),
            this.options.disabled &&
              this.element.addClass("ui-draggable-disabled"),
            this._setHandleClassName(),
            this._mouseInit();
        },
        _setOption: function (o, t) {
          this._super(o, t),
            "handle" === o &&
              (this._removeHandleClassName(), this._setHandleClassName());
        },
        _destroy: function () {
          (this.helper || this.element).is(".ui-draggable-dragging")
            ? (this.destroyOnClear = !0)
            : (this.element.removeClass(
                "ui-draggable ui-draggable-dragging ui-draggable-disabled"
              ),
              this._removeHandleClassName(),
              this._mouseDestroy());
        },
        _mouseCapture: function (o) {
          var t = this.options;
          return (
            this._blurActiveElement(o),
            !(
              this.helper ||
              t.disabled ||
              0 < b(o.target).closest(".ui-resizable-handle").length
            ) &&
              ((this.handle = this._getHandle(o)),
              !!this.handle &&
                (this._blockFrames(!0 === t.iframeFix ? "iframe" : t.iframeFix),
                !0))
          );
        },
        _blockFrames: function (e) {
          this.iframeBlocks = this.document.find(e).map(function () {
            var e = b(this);
            return b("<div>")
              .css("position", "absolute")
              .appendTo(e.parent())
              .outerWidth(e.outerWidth())
              .outerHeight(e.outerHeight())
              .offset(e.offset())[0];
          });
        },
        _unblockFrames: function () {
          this.iframeBlocks &&
            (this.iframeBlocks.remove(), delete this.iframeBlocks);
        },
        _blurActiveElement: function (o) {
          var t = this.document[0];
          if (this.handleElement.is(o.target))
            try {
              t.activeElement &&
                "body" !== t.activeElement.nodeName.toLowerCase() &&
                b(t.activeElement).blur();
            } catch (e) {}
        },
        _mouseStart: function (o) {
          var t = this.options;
          return (
            (this.helper = this._createHelper(o)),
            this.helper.addClass("ui-draggable-dragging"),
            this._cacheHelperProportions(),
            b.ui.ddmanager && (b.ui.ddmanager.current = this),
            this._cacheMargins(),
            (this.cssPosition = this.helper.css("position")),
            (this.scrollParent = this.helper.scrollParent(!0)),
            (this.offsetParent = this.helper.offsetParent()),
            (this.hasFixedAncestor =
              0 <
              this.helper.parents().filter(function () {
                return "fixed" === b(this).css("position");
              }).length),
            (this.positionAbs = this.element.offset()),
            this._refreshOffsets(o),
            (this.originalPosition = this.position =
              this._generatePosition(o, !1)),
            (this.originalPageX = o.pageX),
            (this.originalPageY = o.pageY),
            t.cursorAt && this._adjustOffsetFromHelper(t.cursorAt),
            this._setContainment(),
            !1 === this._trigger("start", o)
              ? (this._clear(), !1)
              : (this._cacheHelperProportions(),
                b.ui.ddmanager &&
                  !t.dropBehaviour &&
                  b.ui.ddmanager.prepareOffsets(this, o),
                this._normalizeRightBottom(),
                this._mouseDrag(o, !0),
                b.ui.ddmanager && b.ui.ddmanager.dragStart(this, o),
                !0)
          );
        },
        _refreshOffsets: function (e) {
          (this.offset = {
            top: this.positionAbs.top - this.margins.top,
            left: this.positionAbs.left - this.margins.left,
            scroll: !1,
            parent: this._getParentOffset(),
            relative: this._getRelativeOffset(),
          }),
            (this.offset.click = {
              left: e.pageX - this.offset.left,
              top: e.pageY - this.offset.top,
            });
        },
        _mouseDrag: function (o, t) {
          if (
            (this.hasFixedAncestor &&
              (this.offset.parent = this._getParentOffset()),
            (this.position = this._generatePosition(o, !0)),
            (this.positionAbs = this._convertPositionTo("absolute")),
            !t)
          ) {
            var e = this._uiHash();
            if (!1 === this._trigger("drag", o, e))
              return this._mouseUp({}), !1;
            this.position = e.position;
          }
          return (
            (this.helper[0].style.left = this.position.left + "px"),
            (this.helper[0].style.top = this.position.top + "px"),
            b.ui.ddmanager && b.ui.ddmanager.drag(this, o),
            !1
          );
        },
        _mouseStop: function (o) {
          var t = this,
            e = !1;
          return (
            b.ui.ddmanager &&
              !this.options.dropBehaviour &&
              (e = b.ui.ddmanager.drop(this, o)),
            this.dropped && ((e = this.dropped), (this.dropped = !1)),
            ("invalid" === this.options.revert && !e) ||
            ("valid" === this.options.revert && e) ||
            !0 === this.options.revert ||
            (b.isFunction(this.options.revert) &&
              this.options.revert.call(this.element, e))
              ? b(this.helper).animate(
                  this.originalPosition,
                  parseInt(this.options.revertDuration, 10),
                  function () {
                    !1 !== t._trigger("stop", o) && t._clear();
                  }
                )
              : !1 !== this._trigger("stop", o) && this._clear(),
            !1
          );
        },
        _mouseUp: function (e) {
          return (
            this._unblockFrames(),
            b.ui.ddmanager && b.ui.ddmanager.dragStop(this, e),
            this.handleElement.is(e.target) && this.element.focus(),
            b.ui.mouse.prototype._mouseUp.call(this, e)
          );
        },
        cancel: function () {
          return (
            this.helper.is(".ui-draggable-dragging")
              ? this._mouseUp({})
              : this._clear(),
            this
          );
        },
        _getHandle: function (e) {
          return (
            !this.options.handle ||
            !!b(e.target).closest(this.element.find(this.options.handle)).length
          );
        },
        _setHandleClassName: function () {
          (this.handleElement = this.options.handle
            ? this.element.find(this.options.handle)
            : this.element),
            this.handleElement.addClass("ui-draggable-handle");
        },
        _removeHandleClassName: function () {
          this.handleElement.removeClass("ui-draggable-handle");
        },
        _createHelper: function (o) {
          var t = this.options,
            e = b.isFunction(t.helper),
            a = e
              ? b(t.helper.apply(this.element[0], [o]))
              : "clone" === t.helper
              ? this.element.clone().removeAttr("id")
              : this.element;
          return (
            a.parents("body").length ||
              a.appendTo(
                "parent" === t.appendTo
                  ? this.element[0].parentNode
                  : t.appendTo
              ),
            e && a[0] === this.element[0] && this._setPositionRelative(),
            a[0] === this.element[0] ||
              /(fixed|absolute)/.test(a.css("position")) ||
              a.css("position", "absolute"),
            a
          );
        },
        _setPositionRelative: function () {
          /^(?:r|a|f)/.test(this.element.css("position")) ||
            (this.element[0].style.position = "relative");
        },
        _adjustOffsetFromHelper: function (e) {
          "string" == typeof e && (e = e.split(" ")),
            b.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }),
            "left" in e &&
              (this.offset.click.left = e.left + this.margins.left),
            "right" in e &&
              (this.offset.click.left =
                this.helperProportions.width - e.right + this.margins.left),
            "top" in e && (this.offset.click.top = e.top + this.margins.top),
            "bottom" in e &&
              (this.offset.click.top =
                this.helperProportions.height - e.bottom + this.margins.top);
        },
        _isRootNode: function (e) {
          return /(html|body)/i.test(e.tagName) || e === this.document[0];
        },
        _getParentOffset: function () {
          var o = this.offsetParent.offset(),
            i = this.document[0];
          return (
            "absolute" === this.cssPosition &&
              this.scrollParent[0] !== i &&
              b.contains(this.scrollParent[0], this.offsetParent[0]) &&
              ((o.left += this.scrollParent.scrollLeft()),
              (o.top += this.scrollParent.scrollTop())),
            this._isRootNode(this.offsetParent[0]) && (o = { top: 0, left: 0 }),
            {
              top:
                o.top +
                (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
              left:
                o.left +
                (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
            }
          );
        },
        _getRelativeOffset: function () {
          if ("relative" !== this.cssPosition) return { top: 0, left: 0 };
          var o = this.element.position(),
            t = this._isRootNode(this.scrollParent[0]);
          return {
            top:
              o.top -
              (parseInt(this.helper.css("top"), 10) || 0) +
              (t ? 0 : this.scrollParent.scrollTop()),
            left:
              o.left -
              (parseInt(this.helper.css("left"), 10) || 0) +
              (t ? 0 : this.scrollParent.scrollLeft()),
          };
        },
        _cacheMargins: function () {
          this.margins = {
            left: parseInt(this.element.css("marginLeft"), 10) || 0,
            top: parseInt(this.element.css("marginTop"), 10) || 0,
            right: parseInt(this.element.css("marginRight"), 10) || 0,
            bottom: parseInt(this.element.css("marginBottom"), 10) || 0,
          };
        },
        _cacheHelperProportions: function () {
          this.helperProportions = {
            width: this.helper.outerWidth(),
            height: this.helper.outerHeight(),
          };
        },
        _setContainment: function () {
          var a,
            n,
            r,
            l = this.options,
            i = this.document[0];
          (this.relativeContainer = null),
            l.containment
              ? "window" === l.containment
                ? (this.containment = [
                    b(window).scrollLeft() -
                      this.offset.relative.left -
                      this.offset.parent.left,
                    b(window).scrollTop() -
                      this.offset.relative.top -
                      this.offset.parent.top,
                    b(window).scrollLeft() +
                      b(window).width() -
                      this.helperProportions.width -
                      this.margins.left,
                    b(window).scrollTop() +
                      (b(window).height() || i.body.parentNode.scrollHeight) -
                      this.helperProportions.height -
                      this.margins.top,
                  ])
                : "document" === l.containment
                ? (this.containment = [
                    0,
                    0,
                    b(i).width() -
                      this.helperProportions.width -
                      this.margins.left,
                    (b(i).height() || i.body.parentNode.scrollHeight) -
                      this.helperProportions.height -
                      this.margins.top,
                  ])
                : l.containment.constructor === Array
                ? (this.containment = l.containment)
                : ("parent" === l.containment &&
                    (l.containment = this.helper[0].parentNode),
                  (r = (n = b(l.containment))[0]) &&
                    ((a = /(scroll|auto)/.test(n.css("overflow"))),
                    (this.containment = [
                      (parseInt(n.css("borderLeftWidth"), 10) || 0) +
                        (parseInt(n.css("paddingLeft"), 10) || 0),
                      (parseInt(n.css("borderTopWidth"), 10) || 0) +
                        (parseInt(n.css("paddingTop"), 10) || 0),
                      (a
                        ? Math.max(r.scrollWidth, r.offsetWidth)
                        : r.offsetWidth) -
                        (parseInt(n.css("borderRightWidth"), 10) || 0) -
                        (parseInt(n.css("paddingRight"), 10) || 0) -
                        this.helperProportions.width -
                        this.margins.left -
                        this.margins.right,
                      (a
                        ? Math.max(r.scrollHeight, r.offsetHeight)
                        : r.offsetHeight) -
                        (parseInt(n.css("borderBottomWidth"), 10) || 0) -
                        (parseInt(n.css("paddingBottom"), 10) || 0) -
                        this.helperProportions.height -
                        this.margins.top -
                        this.margins.bottom,
                    ]),
                    (this.relativeContainer = n)))
              : (this.containment = null);
        },
        _convertPositionTo: function (o, t) {
          t = t || this.position;
          var a = "absolute" === o ? 1 : -1,
            s = this._isRootNode(this.scrollParent[0]);
          return {
            top:
              t.top +
              this.offset.relative.top * a +
              this.offset.parent.top * a -
              ("fixed" === this.cssPosition
                ? -this.offset.scroll.top
                : s
                ? 0
                : this.offset.scroll.top) *
                a,
            left:
              t.left +
              this.offset.relative.left * a +
              this.offset.parent.left * a -
              ("fixed" === this.cssPosition
                ? -this.offset.scroll.left
                : s
                ? 0
                : this.offset.scroll.left) *
                a,
          };
        },
        _generatePosition: function (d, t) {
          var e,
            p,
            c,
            u,
            m = this.options,
            r = this._isRootNode(this.scrollParent[0]),
            l = d.pageX,
            g = d.pageY;
          return (
            (r && this.offset.scroll) ||
              (this.offset.scroll = {
                top: this.scrollParent.scrollTop(),
                left: this.scrollParent.scrollLeft(),
              }),
            t &&
              (this.containment &&
                ((e = this.relativeContainer
                  ? ((p = this.relativeContainer.offset()),
                    [
                      this.containment[0] + p.left,
                      this.containment[1] + p.top,
                      this.containment[2] + p.left,
                      this.containment[3] + p.top,
                    ])
                  : this.containment),
                d.pageX - this.offset.click.left < e[0] &&
                  (l = e[0] + this.offset.click.left),
                d.pageY - this.offset.click.top < e[1] &&
                  (g = e[1] + this.offset.click.top),
                d.pageX - this.offset.click.left > e[2] &&
                  (l = e[2] + this.offset.click.left),
                d.pageY - this.offset.click.top > e[3] &&
                  (g = e[3] + this.offset.click.top)),
              m.grid &&
                ((c = m.grid[1]
                  ? this.originalPageY +
                    Math.round((g - this.originalPageY) / m.grid[1]) * m.grid[1]
                  : this.originalPageY),
                (g = e
                  ? c - this.offset.click.top >= e[1] ||
                    c - this.offset.click.top > e[3]
                    ? c
                    : c - this.offset.click.top >= e[1]
                    ? c - m.grid[1]
                    : c + m.grid[1]
                  : c),
                (u = m.grid[0]
                  ? this.originalPageX +
                    Math.round((l - this.originalPageX) / m.grid[0]) * m.grid[0]
                  : this.originalPageX),
                (l = e
                  ? u - this.offset.click.left >= e[0] ||
                    u - this.offset.click.left > e[2]
                    ? u
                    : u - this.offset.click.left >= e[0]
                    ? u - m.grid[0]
                    : u + m.grid[0]
                  : u)),
              "y" === m.axis && (l = this.originalPageX),
              "x" === m.axis && (g = this.originalPageY)),
            {
              top:
                g -
                this.offset.click.top -
                this.offset.relative.top -
                this.offset.parent.top +
                ("fixed" === this.cssPosition
                  ? -this.offset.scroll.top
                  : r
                  ? 0
                  : this.offset.scroll.top),
              left:
                l -
                this.offset.click.left -
                this.offset.relative.left -
                this.offset.parent.left +
                ("fixed" === this.cssPosition
                  ? -this.offset.scroll.left
                  : r
                  ? 0
                  : this.offset.scroll.left),
            }
          );
        },
        _clear: function () {
          this.helper.removeClass("ui-draggable-dragging"),
            this.helper[0] === this.element[0] ||
              this.cancelHelperRemoval ||
              this.helper.remove(),
            (this.helper = null),
            (this.cancelHelperRemoval = !1),
            this.destroyOnClear && this.destroy();
        },
        _normalizeRightBottom: function () {
          "y" !== this.options.axis &&
            "auto" !== this.helper.css("right") &&
            (this.helper.width(this.helper.width()),
            this.helper.css("right", "auto")),
            "x" !== this.options.axis &&
              "auto" !== this.helper.css("bottom") &&
              (this.helper.height(this.helper.height()),
              this.helper.css("bottom", "auto"));
        },
        _trigger: function (o, t, e) {
          return (
            (e = e || this._uiHash()),
            b.ui.plugin.call(this, o, [t, e, this], !0),
            /^(drag|start|stop)/.test(o) &&
              ((this.positionAbs = this._convertPositionTo("absolute")),
              (e.offset = this.positionAbs)),
            b.Widget.prototype._trigger.call(this, o, t, e)
          );
        },
        plugins: {},
        _uiHash: function () {
          return {
            helper: this.helper,
            position: this.position,
            originalPosition: this.originalPosition,
            offset: this.positionAbs,
          };
        },
      }),
      b.ui.plugin.add("draggable", "connectToSortable", {
        start: function (o, e, a) {
          var s = b.extend({}, e, { item: a.element });
          (a.sortables = []),
            b(a.options.connectToSortable).each(function () {
              var e = b(this).sortable("instance");
              e &&
                !e.options.disabled &&
                (a.sortables.push(e),
                e.refreshPositions(),
                e._trigger("activate", o, s));
            });
        },
        stop: function (o, e, a) {
          var s = b.extend({}, e, { item: a.element });
          (a.cancelHelperRemoval = !1),
            b.each(a.sortables, function () {
              var e = this;
              e.isOver
                ? ((e.isOver = 0),
                  (a.cancelHelperRemoval = !0),
                  (e.cancelHelperRemoval = !1),
                  (e._storedCSS = {
                    position: e.placeholder.css("position"),
                    top: e.placeholder.css("top"),
                    left: e.placeholder.css("left"),
                  }),
                  e._mouseStop(o),
                  (e.options.helper = e.options._helper))
                : ((e.cancelHelperRemoval = !0),
                  e._trigger("deactivate", o, s));
            });
        },
        drag: function (a, s, i) {
          b.each(i.sortables, function () {
            var o = !1,
              n = this;
            (n.positionAbs = i.positionAbs),
              (n.helperProportions = i.helperProportions),
              (n.offset.click = i.offset.click),
              n._intersectsWith(n.containerCache) &&
                ((o = !0),
                b.each(i.sortables, function () {
                  return (
                    (this.positionAbs = i.positionAbs),
                    (this.helperProportions = i.helperProportions),
                    (this.offset.click = i.offset.click),
                    this !== n &&
                      this._intersectsWith(this.containerCache) &&
                      b.contains(n.element[0], this.element[0]) &&
                      (o = !1),
                    o
                  );
                })),
              o
                ? (n.isOver ||
                    ((n.isOver = 1),
                    (i._parent = s.helper.parent()),
                    (n.currentItem = s.helper
                      .appendTo(n.element)
                      .data("ui-sortable-item", !0)),
                    (n.options._helper = n.options.helper),
                    (n.options.helper = function () {
                      return s.helper[0];
                    }),
                    (a.target = n.currentItem[0]),
                    n._mouseCapture(a, !0),
                    n._mouseStart(a, !0, !0),
                    (n.offset.click.top = i.offset.click.top),
                    (n.offset.click.left = i.offset.click.left),
                    (n.offset.parent.left -=
                      i.offset.parent.left - n.offset.parent.left),
                    (n.offset.parent.top -=
                      i.offset.parent.top - n.offset.parent.top),
                    i._trigger("toSortable", a),
                    (i.dropped = n.element),
                    b.each(i.sortables, function () {
                      this.refreshPositions();
                    }),
                    (i.currentItem = i.element),
                    (n.fromOutside = i)),
                  n.currentItem && (n._mouseDrag(a), (s.position = n.position)))
                : n.isOver &&
                  ((n.isOver = 0),
                  (n.cancelHelperRemoval = !0),
                  (n.options._revert = n.options.revert),
                  (n.options.revert = !1),
                  n._trigger("out", a, n._uiHash(n)),
                  n._mouseStop(a, !0),
                  (n.options.revert = n.options._revert),
                  (n.options.helper = n.options._helper),
                  n.placeholder && n.placeholder.remove(),
                  s.helper.appendTo(i._parent),
                  i._refreshOffsets(a),
                  (s.position = i._generatePosition(a, !0)),
                  i._trigger("fromSortable", a),
                  (i.dropped = !1),
                  b.each(i.sortables, function () {
                    this.refreshPositions();
                  }));
          });
        },
      }),
      b.ui.plugin.add("draggable", "cursor", {
        start: function (a, t, e) {
          var s = b("body"),
            i = e.options;
          s.css("cursor") && (i._cursor = s.css("cursor")),
            s.css("cursor", i.cursor);
        },
        stop: function (o, t, e) {
          var a = e.options;
          a._cursor && b("body").css("cursor", a._cursor);
        },
      }),
      b.ui.plugin.add("draggable", "opacity", {
        start: function (a, t, e) {
          var s = b(t.helper),
            i = e.options;
          s.css("opacity") && (i._opacity = s.css("opacity")),
            s.css("opacity", i.opacity);
        },
        stop: function (o, t, e) {
          var a = e.options;
          a._opacity && b(t.helper).css("opacity", a._opacity);
        },
      }),
      b.ui.plugin.add("draggable", "scroll", {
        start: function (o, t, e) {
          e.scrollParentNotHidden ||
            (e.scrollParentNotHidden = e.helper.scrollParent(!1)),
            e.scrollParentNotHidden[0] !== e.document[0] &&
              "HTML" !== e.scrollParentNotHidden[0].tagName &&
              (e.overflowOffset = e.scrollParentNotHidden.offset());
        },
        drag: function (a, t, e) {
          var s = e.options,
            i = !1,
            l = e.scrollParentNotHidden[0],
            n = e.document[0];
          l !== n && "HTML" !== l.tagName
            ? ((s.axis && "x" === s.axis) ||
                (e.overflowOffset.top + l.offsetHeight - a.pageY <
                s.scrollSensitivity
                  ? (l.scrollTop = i = l.scrollTop + s.scrollSpeed)
                  : a.pageY - e.overflowOffset.top < s.scrollSensitivity &&
                    (l.scrollTop = i = l.scrollTop - s.scrollSpeed)),
              (s.axis && "y" === s.axis) ||
                (e.overflowOffset.left + l.offsetWidth - a.pageX <
                s.scrollSensitivity
                  ? (l.scrollLeft = i = l.scrollLeft + s.scrollSpeed)
                  : a.pageX - e.overflowOffset.left < s.scrollSensitivity &&
                    (l.scrollLeft = i = l.scrollLeft - s.scrollSpeed)))
            : ((s.axis && "x" === s.axis) ||
                (a.pageY - b(n).scrollTop() < s.scrollSensitivity
                  ? (i = b(n).scrollTop(b(n).scrollTop() - s.scrollSpeed))
                  : b(window).height() - (a.pageY - b(n).scrollTop()) <
                      s.scrollSensitivity &&
                    (i = b(n).scrollTop(b(n).scrollTop() + s.scrollSpeed))),
              (s.axis && "y" === s.axis) ||
                (a.pageX - b(n).scrollLeft() < s.scrollSensitivity
                  ? (i = b(n).scrollLeft(b(n).scrollLeft() - s.scrollSpeed))
                  : b(window).width() - (a.pageX - b(n).scrollLeft()) <
                      s.scrollSensitivity &&
                    (i = b(n).scrollLeft(b(n).scrollLeft() + s.scrollSpeed)))),
            !1 !== i &&
              b.ui.ddmanager &&
              !s.dropBehaviour &&
              b.ui.ddmanager.prepareOffsets(e, a);
        },
      }),
      b.ui.plugin.add("draggable", "snap", {
        start: function (o, t, a) {
          var e = a.options;
          (a.snapElements = []),
            b(
              e.snap.constructor === String
                ? e.snap
                : e.snap.items || ":data(ui-draggable)"
            ).each(function () {
              var o = b(this),
                t = o.offset();
              this !== a.element[0] &&
                a.snapElements.push({
                  item: this,
                  width: o.outerWidth(),
                  height: o.outerHeight(),
                  top: t.top,
                  left: t.left,
                });
            });
        },
        drag: function (y, t, e) {
          var s,
            C,
            w,
            x,
            k,
            S,
            E,
            P,
            D,
            T,
            A = e.options,
            d = A.snapTolerance,
            g = t.offset.left,
            u = g + e.helperProportions.width,
            m = t.offset.top,
            v = m + e.helperProportions.height;
          for (D = e.snapElements.length - 1; 0 <= D; D--)
            (S =
              (k = e.snapElements[D].left - e.margins.left) +
              e.snapElements[D].width),
              (P =
                (E = e.snapElements[D].top - e.margins.top) +
                e.snapElements[D].height),
              u < k - d ||
              S + d < g ||
              v < E - d ||
              P + d < m ||
              !b.contains(
                e.snapElements[D].item.ownerDocument,
                e.snapElements[D].item
              )
                ? (e.snapElements[D].snapping &&
                    e.options.snap.release &&
                    e.options.snap.release.call(
                      e.element,
                      y,
                      b.extend(e._uiHash(), {
                        snapItem: e.snapElements[D].item,
                      })
                    ),
                  (e.snapElements[D].snapping = !1))
                : ("inner" !== A.snapMode &&
                    ((s = Math.abs(E - v) <= d),
                    (C = Math.abs(P - m) <= d),
                    (w = Math.abs(k - u) <= d),
                    (x = Math.abs(S - g) <= d),
                    s &&
                      (t.position.top = e._convertPositionTo("relative", {
                        top: E - e.helperProportions.height,
                        left: 0,
                      }).top),
                    C &&
                      (t.position.top = e._convertPositionTo("relative", {
                        top: P,
                        left: 0,
                      }).top),
                    w &&
                      (t.position.left = e._convertPositionTo("relative", {
                        top: 0,
                        left: k - e.helperProportions.width,
                      }).left),
                    x &&
                      (t.position.left = e._convertPositionTo("relative", {
                        top: 0,
                        left: S,
                      }).left)),
                  (T = s || C || w || x),
                  "outer" !== A.snapMode &&
                    ((s = Math.abs(E - m) <= d),
                    (C = Math.abs(P - v) <= d),
                    (w = Math.abs(k - g) <= d),
                    (x = Math.abs(S - u) <= d),
                    s &&
                      (t.position.top = e._convertPositionTo("relative", {
                        top: E,
                        left: 0,
                      }).top),
                    C &&
                      (t.position.top = e._convertPositionTo("relative", {
                        top: P - e.helperProportions.height,
                        left: 0,
                      }).top),
                    w &&
                      (t.position.left = e._convertPositionTo("relative", {
                        top: 0,
                        left: k,
                      }).left),
                    x &&
                      (t.position.left = e._convertPositionTo("relative", {
                        top: 0,
                        left: S - e.helperProportions.width,
                      }).left)),
                  !e.snapElements[D].snapping &&
                    (s || C || w || x || T) &&
                    e.options.snap.snap &&
                    e.options.snap.snap.call(
                      e.element,
                      y,
                      b.extend(e._uiHash(), {
                        snapItem: e.snapElements[D].item,
                      })
                    ),
                  (e.snapElements[D].snapping = s || C || w || x || T));
        },
      }),
      b.ui.plugin.add("draggable", "stack", {
        start: function (a, t, e) {
          var s,
            r = e.options,
            o = b.makeArray(b(r.stack)).sort(function (o, t) {
              return (
                (parseInt(b(o).css("zIndex"), 10) || 0) -
                (parseInt(b(t).css("zIndex"), 10) || 0)
              );
            });
          o.length &&
            ((s = parseInt(b(o[0]).css("zIndex"), 10) || 0),
            b(o).each(function (e) {
              b(this).css("zIndex", s + e);
            }),
            this.css("zIndex", s + o.length));
        },
      }),
      b.ui.plugin.add("draggable", "zIndex", {
        start: function (a, t, e) {
          var s = b(t.helper),
            i = e.options;
          s.css("zIndex") && (i._zIndex = s.css("zIndex")),
            s.css("zIndex", i.zIndex);
        },
        stop: function (o, t, e) {
          var a = e.options;
          a._zIndex && b(t.helper).css("zIndex", a._zIndex);
        },
      }),
      b.ui.draggable
    );
  }),
  "CSS" in window || (window.CSS = {}),
  "supports" in window.CSS ||
    ((window.CSS._cacheSupports = {}),
    (window.CSS.supports = function (e, t) {
      var o = [e, t].toString();
      return o in window.CSS._cacheSupports
        ? window.CSS._cacheSupports[o]
        : (window.CSS._cacheSupports[o] = (function (t, o) {
            var i = document.createElement("div").style;
            if ("undefined" == typeof o) {
              function e(e, t) {
                var o = e.split(t);
                if (1 < o.length)
                  return o
                    .map(function (e, t, o) {
                      return 0 == t % 2 ? e + o[t + 1] : "";
                    })
                    .filter(Boolean);
              }
              var a = e(t, /([)])\s*or\s*([(])/gi);
              if (a)
                return a.some(function (e) {
                  return window.CSS.supports(e);
                });
              var s = e(t, /([)])\s*and\s*([(])/gi);
              if (s)
                return s.every(function (e) {
                  return window.CSS.supports(e);
                });
              i.cssText = t.replace("(", "").replace(/[)]$/, "");
            } else i.cssText = t + ":" + o;
            return !!i.length;
          })(e, t));
    })),
  (function (e, o) {
    var a = function (e, t) {
      return this instanceof a ? this._init(e, t) : new a(e, t);
    };
    a.fn = a.prototype = {
      _color: 0,
      _alpha: 1,
      error: !1,
      _hsl: { h: 0, s: 0, l: 0 },
      _hsv: { h: 0, s: 0, v: 0 },
      _hSpace: "hsl",
      _init: function (e) {
        var t = "noop";
        switch (typeof e) {
          case "object":
            return (
              e.a !== o && this.a(e.a),
              (t =
                e.r === o
                  ? e.l === o
                    ? e.v === o
                      ? t
                      : "fromHsv"
                    : "fromHsl"
                  : "fromRgb"),
              this[t](e)
            );
          case "string":
            return this.fromCSS(e);
          case "number":
            return this.fromInt(parseInt(e, 10));
        }
        return this;
      },
      _error: function () {
        return (this.error = !0), this;
      },
      clone: function () {
        for (
          var e = new a(this.toInt()),
            t = ["_alpha", "_hSpace", "_hsl", "_hsv", "error"],
            o = t.length - 1;
          0 <= o;
          o--
        )
          e[t[o]] = this[t[o]];
        return e;
      },
      setHSpace: function (e) {
        return (this._hSpace = "hsv" === e ? e : "hsl"), this;
      },
      noop: function () {
        return this;
      },
      fromCSS: function (e) {
        var t,
          o = /^(rgb|hs(l|v))a?\(/;
        if (
          ((this.error = !1),
          (e = e.replace(/^\s+/, "").replace(/\s+$/, "").replace(/;$/, "")),
          e.match(o) && e.match(/\)$/))
        ) {
          if (
            ((t = e
              .replace(/(\s|%)/g, "")
              .replace(o, "")
              .replace(/,?\);?$/, "")
              .split(",")),
            3 > t.length)
          )
            return this._error();
          if (4 === t.length && (this.a(parseFloat(t.pop())), this.error))
            return this;
          for (var a = t.length - 1; 0 <= a; a--)
            if (((t[a] = parseInt(t[a], 10)), isNaN(t[a])))
              return this._error();
          return e.match(/^rgb/)
            ? this.fromRgb({ r: t[0], g: t[1], b: t[2] })
            : e.match(/^hsv/)
            ? this.fromHsv({ h: t[0], s: t[1], v: t[2] })
            : this.fromHsl({ h: t[0], s: t[1], l: t[2] });
        }
        return this.fromHex(e);
      },
      fromRgb: function (e, t) {
        return "object" != typeof e || e.r === o || e.g === o || e.b === o
          ? this._error()
          : ((this.error = !1),
            this.fromInt(parseInt((e.r << 16) + (e.g << 8) + e.b, 10), t));
      },
      fromHex: function (e) {
        return (
          (e = e.replace(/^#/, "").replace(/^0x/, "")),
          3 === e.length && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]),
          (this.error = !/^[0-9A-F]{6}$/i.test(e)),
          this.fromInt(parseInt(e, 16))
        );
      },
      fromHsl: function (e) {
        var t, i, a, n, d, c, u, m;
        return "object" != typeof e || e.h === o || e.s === o || e.l === o
          ? this._error()
          : ((this._hsl = e),
            (this._hSpace = "hsl"),
            (c = e.h / 360),
            (u = e.s / 100),
            (m = e.l / 100),
            0 === u
              ? (t = i = a = m)
              : ((n = 0.5 > m ? m * (1 + u) : m + u - m * u),
                (d = 2 * m - n),
                (t = this.hue2rgb(d, n, c + 1 / 3)),
                (i = this.hue2rgb(d, n, c)),
                (a = this.hue2rgb(d, n, c - 1 / 3))),
            this.fromRgb({ r: 255 * t, g: 255 * i, b: 255 * a }, !0));
      },
      fromHsv: function (e) {
        var a, n, l, d, c, u, m, _, y, C, w;
        if ("object" != typeof e || e.h === o || e.s === o || e.v === o)
          return this._error();
        switch (
          ((this._hsv = e),
          (this._hSpace = "hsv"),
          (a = e.h / 360),
          (n = e.s / 100),
          (l = e.v / 100),
          (m = Math.floor(6 * a)),
          (_ = 6 * a - m),
          (y = l * (1 - n)),
          (C = l * (1 - _ * n)),
          (w = l * (1 - (1 - _) * n)),
          m % 6)
        ) {
          case 0:
            (d = l), (c = w), (u = y);
            break;
          case 1:
            (d = C), (c = l), (u = y);
            break;
          case 2:
            (d = y), (c = l), (u = w);
            break;
          case 3:
            (d = y), (c = C), (u = l);
            break;
          case 4:
            (d = w), (c = y), (u = l);
            break;
          case 5:
            (d = l), (c = y), (u = C);
        }
        return this.fromRgb({ r: 255 * d, g: 255 * c, b: 255 * u }, !0);
      },
      fromInt: function (e, t) {
        return (
          (this._color = parseInt(e, 10)),
          isNaN(this._color) && (this._color = 0),
          16777215 < this._color
            ? (this._color = 16777215)
            : 0 > this._color && (this._color = 0),
          t === o &&
            (this._hsv.h = this._hsv.s = this._hsl.h = this._hsl.s = 0),
          this
        );
      },
      hue2rgb: function (e, o, i) {
        return (
          0 > i && (i += 1),
          1 < i && (i -= 1),
          i < 1 / 6
            ? e + 6 * (o - e) * i
            : i < 1 / 2
            ? o
            : i < 2 / 3
            ? e + 6 * ((o - e) * (2 / 3 - i))
            : e
        );
      },
      toString: function () {
        var e = parseInt(this._color, 10).toString(16);
        if (this.error) return "";
        if (6 > e.length)
          for (var t = 6 - e.length - 1; 0 <= t; t--) e = "0" + e;
        return "#" + e;
      },
      toCSS: function (e, t) {
        switch (((e = e || "hex"), (t = parseFloat(t || this._alpha)), e)) {
          case "rgb":
          case "rgba":
            var o = this.toRgb();
            return 1 > t
              ? "rgba( " + o.r + ", " + o.g + ", " + o.b + ", " + t + " )"
              : "rgb( " + o.r + ", " + o.g + ", " + o.b + " )";
            break;
          case "hsl":
          case "hsla":
            var i = this.toHsl();
            return 1 > t
              ? "hsla( " + i.h + ", " + i.s + "%, " + i.l + "%, " + t + " )"
              : "hsl( " + i.h + ", " + i.s + "%, " + i.l + "% )";
            break;
          default:
            return this.toString();
        }
      },
      toRgb: function () {
        return {
          r: 255 & (this._color >> 16),
          g: 255 & (this._color >> 8),
          b: 255 & this._color,
        };
      },
      toHsl: function () {
        var e,
          t,
          o = this.toRgb(),
          i = o.r / 255,
          a = o.g / 255,
          n = o.b / 255,
          r = Math.max(i, a, n),
          p = Math.min(i, a, n),
          c = (r + p) / 2;
        if (r === p) e = t = 0;
        else {
          var l = r - p;
          (t = 0.5 < c ? l / (2 - r - p) : l / (r + p)),
            r === i
              ? (e = (a - n) / l + (a < n ? 6 : 0))
              : r === a
              ? (e = (n - i) / l + 2)
              : r === n
              ? (e = (i - a) / l + 4)
              : void 0,
            (e /= 6);
        }
        return (
          (e = Math.round(360 * e)),
          0 === e && this._hsl.h !== e && (e = this._hsl.h),
          (t = Math.round(100 * t)),
          0 === t && this._hsl.s && (t = this._hsl.s),
          { h: e, s: t, l: Math.round(100 * c) }
        );
      },
      toHsv: function () {
        var e,
          t,
          o = this.toRgb(),
          i = o.r / 255,
          a = o.g / 255,
          n = o.b / 255,
          r = Math.max(i, a, n),
          l = Math.min(i, a, n),
          p = r - l;
        return (
          (t = 0 === r ? 0 : p / r),
          r === l
            ? (e = t = 0)
            : (r === i
                ? (e = (a - n) / p + (a < n ? 6 : 0))
                : r === a
                ? (e = (n - i) / p + 2)
                : r === n
                ? (e = (i - a) / p + 4)
                : void 0,
              (e /= 6)),
          ((e = Math.round(360 * e)),
          0 === e && this._hsv.h !== e && (e = this._hsv.h),
          (t = Math.round(100 * t)),
          0 === t && this._hsv.s && (t = this._hsv.s),
          { h: e, s: t, v: Math.round(100 * r) })
        );
      },
      toInt: function () {
        return this._color;
      },
      toIEOctoHex: function () {
        var e = this.toString(),
          t = parseInt(255 * this._alpha, 10).toString(16);
        return 1 === t.length && (t = "0" + t), "#" + t + e.replace(/^#/, "");
      },
      toLuminosity: function () {
        var e = this.toRgb();
        return (
          0.2126 * Math.pow(e.r / 255, 2.2) +
          0.7152 * Math.pow(e.g / 255, 2.2) +
          0.0722 * Math.pow(e.b / 255, 2.2)
        );
      },
      getDistanceLuminosityFrom: function (e) {
        if (!(e instanceof a))
          throw "getDistanceLuminosityFrom requires a Color object";
        var t = this.toLuminosity(),
          o = e.toLuminosity();
        return t > o ? (t + 0.05) / (o + 0.05) : (o + 0.05) / (t + 0.05);
      },
      getMaxContrastColor: function () {
        var e = this.toLuminosity(),
          t = 0.5 <= e ? "000000" : "ffffff";
        return new a(t);
      },
      getReadableContrastingColor: function (e, t) {
        if (!e instanceof a) return this;
        var i = t === o ? 5 : t,
          s = e.getDistanceLuminosityFrom(this),
          n = e.getMaxContrastColor(),
          r = n.getDistanceLuminosityFrom(e);
        if (r <= i) return n;
        if (s >= i) return this;
        for (
          var l = 0 === n.toInt() ? -1 : 1;
          s < i &&
          (this.l(l, !0),
          (s = this.getDistanceLuminosityFrom(e)),
          0 !== this._color && 16777215 !== this._color);

        );
        return this;
      },
      a: function (e) {
        if (e === o) return this._alpha;
        var t = parseFloat(e);
        return isNaN(t) ? this._error() : ((this._alpha = t), this);
      },
      darken: function (e) {
        return (e = e || 5), this.l(-e, !0);
      },
      lighten: function (e) {
        return (e = e || 5), this.l(e, !0);
      },
      saturate: function (e) {
        return (e = e || 15), this.s(e, !0);
      },
      desaturate: function (e) {
        return (e = e || 15), this.s(-e, !0);
      },
      toGrayscale: function () {
        return this.setHSpace("hsl").s(0);
      },
      getComplement: function () {
        return this.h(180, !0);
      },
      getSplitComplement: function (e) {
        e = e || 1;
        var t = 180 + 30 * e;
        return this.h(t, !0);
      },
      getAnalog: function (e) {
        e = e || 1;
        var t = 30 * e;
        return this.h(t, !0);
      },
      getTetrad: function (e) {
        e = e || 1;
        var t = 60 * e;
        return this.h(t, !0);
      },
      getTriad: function (e) {
        e = e || 1;
        var t = 120 * e;
        return this.h(t, !0);
      },
      _partial: function (e) {
        var t = s[e];
        return function (i, a) {
          var s = this._spaceFunc("to", t.space);
          return i === o
            ? s[e]
            : (!0 === a && (i = s[e] + i),
              t.mod && (i %= t.mod),
              t.range &&
                (i =
                  i < t.range[0]
                    ? t.range[0]
                    : i > t.range[1]
                    ? t.range[1]
                    : i),
              (s[e] = i),
              this._spaceFunc("from", t.space, s));
        };
      },
      _spaceFunc: function (e, t, o) {
        var i = t || this._hSpace,
          a = e + i.charAt(0).toUpperCase() + i.substr(1);
        return this[a](o);
      },
    };
    var s = {
      h: { mod: 360 },
      s: { range: [0, 100] },
      l: { space: "hsl", range: [0, 100] },
      v: { space: "hsv", range: [0, 100] },
      r: { space: "rgb", range: [0, 255] },
      g: { space: "rgb", range: [0, 255] },
      b: { space: "rgb", range: [0, 255] },
    };
    for (var n in s) s.hasOwnProperty(n) && (a.fn[n] = a.fn._partial(n));
    "object" == typeof exports ? (module.exports = a) : (e.Color = a);
  })(this),
  (function (e, t) {
    function o() {
      var t, o;
      d
        ? (p = "filter")
        : ((t = e('<div id="iris-gradtest" />')),
          (o = "linear-gradient(top,#fff,#000)"),
          e.each(c, function (e, i) {
            if (
              (t.css("backgroundImage", i + o),
              t.css("backgroundImage").match("gradient"))
            )
              return (p = e), !1;
          }),
          !1 === p &&
            (t.css(
              "background",
              "-webkit-gradient(linear,0% 0%,0% 100%,from(#fff),to(#000))"
            ),
            t.css("backgroundImage").match("gradient") && (p = "webkit")),
          t.remove());
    }
    function i(t, o) {
      return (
        (t = "top" === t ? "top" : "left"),
        (o = e.isArray(o) ? o : Array.prototype.slice.call(arguments, 1)),
        "webkit" === p
          ? s(t, o)
          : c[p] + "linear-gradient(" + t + ", " + o.join(", ") + ")"
      );
    }
    function a(t, o) {
      var a, s, r, l, d, p, c, u, m;
      (t = "top" === t ? "top" : "left"),
        (o = e.isArray(o) ? o : Array.prototype.slice.call(arguments, 1)),
        (a = "top" === t ? 0 : 1),
        (s = e(this)),
        (r = o.length - 1),
        (l = "filter"),
        (d = 1 === a ? "left" : "top"),
        (p = 1 === a ? "right" : "bottom"),
        (c = 1 === a ? "height" : "width"),
        (u =
          '<div class="iris-ie-gradient-shim" style="position:absolute;' +
          c +
          ":100%;" +
          d +
          ":%start%;" +
          p +
          ":%end%;" +
          l +
          ':%filter%;" data-color:"%color%"></div>'),
        (m = ""),
        "static" === s.css("position") && s.css({ position: "relative" }),
        (o = n(o)),
        e.each(o, function (e, t) {
          var i, s, n;
          return (
            e !== r &&
            void ((i = o[e + 1]),
            t.stop === i.stop ||
              ((s = 100 - parseFloat(i.stop) + "%"),
              (t.octoHex = new Color(t.color).toIEOctoHex()),
              (i.octoHex = new Color(i.color).toIEOctoHex()),
              (n =
                "progid:DXImageTransform.Microsoft.Gradient(GradientType=" +
                a +
                ", StartColorStr='" +
                t.octoHex +
                "', EndColorStr='" +
                i.octoHex +
                "')"),
              (m += u
                .replace("%start%", t.stop)
                .replace("%end%", s)
                .replace("%filter%", n))))
          );
        }),
        s.find(".iris-ie-gradient-shim").remove(),
        e(m).prependTo(s);
    }
    function s(t, o) {
      var a = [];
      return (
        (t = "top" === t ? "0% 0%,0% 100%," : "0% 100%,100% 100%,"),
        (o = n(o)),
        e.each(o, function (e, t) {
          a.push(
            "color-stop(" + parseFloat(t.stop) / 100 + ", " + t.color + ")"
          );
        }),
        "-webkit-gradient(linear," + t + a.join(",") + ")"
      );
    }
    function n(t) {
      var o = [],
        a = [],
        s = [],
        n = t.length - 1;
      return (
        e.each(t, function (e, t) {
          var i = t,
            s = !1,
            n = t.match(/1?[0-9]{1,2}%$/);
          n && ((i = t.replace(/\s?1?[0-9]{1,2}%$/, "")), (s = n.shift())),
            o.push(i),
            a.push(s);
        }),
        !1 === a[0] && (a[0] = "0%"),
        !1 === a[n] && (a[n] = "100%"),
        (a = r(a)),
        e.each(a, function (e) {
          s[e] = { color: o[e], stop: a[e] };
        }),
        s
      );
    }
    function r(t) {
      var o,
        a,
        s,
        n,
        l = 0,
        d = t.length - 1,
        p = 0,
        c = !1;
      if (2 >= t.length || 0 > e.inArray(!1, t)) return t;
      for (; p < t.length - 1; )
        c || !1 !== t[p]
          ? c && !1 !== t[p] && ((d = p), (p = t.length))
          : ((l = p - 1), (c = !0)),
          p++;
      for (
        a = d - l,
          n = parseInt(t[l].replace("%"), 10),
          o = (parseFloat(t[d].replace("%")) - n) / a,
          p = l + 1,
          s = 1;
        p < d;

      )
        (t[p] = n + s * o + "%"), s++, p++;
      return r(t);
    }
    var l, d, p, c, u, m, g, f, h;
    return (
      (l =
        '<div class="iris-picker"><div class="iris-picker-inner"><div class="iris-square"><a class="iris-square-value"><span class="iris-square-handle ui-slider-handle"></span></a><div class="iris-square-inner iris-square-horiz"></div><div class="iris-square-inner iris-square-vert"></div></div><div class="iris-controls"><div class="iris-color-preview"><div></div></div><div class="iris-sliders"><div class="iris-slider iris-strip"><div class="iris-slider-offset"></div></div><div class="cs-alpha-wrap"><div class="cs-alpha-slider"></div><div class="cs-alpha-slider-offset"></div></div></div></div><div class="information hex"><div class="information-item hex"><div class="input-field hex"><input class="input" type="text" /><div class="title">HEX</div></div></div><div class="information-item rgb"><div class="input-field rgb-r"><input class="input" type="text"><div class="title">R</div></div><div class="input-field rgb-g"><input class="input" type="text"><div class="title">G</div></div><div class="input-field rgb-b"><input class="input" type="text"><div class="title">B</div></div><div class="input-field rgb-a"><input class="input" type="text"><div class="title">A</div></div></div><div class="information-change"><button type="button" class="format-change-button arrow-button"></button></div></div><div class="iris-color-control flat"><div class="colors-changer"><span class="flat">Flat</span><span class="meterial">Meterial</span><span class="soft">Soft</span><span class="page">Page Colors</span><button type="button" class="format-change-palette-button arrow-button"></button></div><div class="iris-color-list"><span class="iris-color flat" data-color="#1abc9c" style="background:#1abc9c"></span><span class="iris-color flat" data-color="#2ecc71" style="background:#2ecc71"></span><span class="iris-color flat" data-color="#3498db" style="background:#3498db"></span><span class="iris-color flat" data-color="#9b59b6" style="background:#9b59b6"></span><span class="iris-color flat" data-color="#34495e" style="background:#34495e"></span><span class="iris-color flat" data-color="#16a085" style="background:#16a085"></span><span class="iris-color flat" data-color="#27ae60" style="background:#27ae60"></span><span class="iris-color flat" data-color="#2980b9" style="background:#2980b9"></span><span class="iris-color flat" data-color="#8e44ad" style="background:#8e44ad"></span><span class="iris-color flat" data-color="#2c3e50" style="background:#2c3e50"></span><span class="iris-color flat" data-color="#f1c40f" style="background:#f1c40f"></span><span class="iris-color flat" data-color="#e67e22" style="background:#e67e22"></span><span class="iris-color flat" data-color="#e74c3c" style="background:#e74c3c"></span><span class="iris-color flat" data-color="#ecf0f1" style="background:#ecf0f1"></span><span class="iris-color flat" data-color="#95a5a6" style="background:#95a5a6"></span><span class="iris-color flat" data-color="#f39c12" style="background:#f39c12"></span><span class="iris-color flat" data-color="#d35400" style="background:#d35400"></span><span class="iris-color flat" data-color="#c0392b" style="background:#c0392b"></span><span class="iris-color flat" data-color="#bdc3c7" style="background:#bdc3c7"></span><span class="iris-color flat" data-color="#7f8c8d" style="background:#7f8c8d"></span><span class="iris-color meterial" data-color="#F44336" style="background:#F44336"></span><span class="iris-color meterial" data-color="#E91E63" style="background:#E91E63"></span><span class="iris-color meterial" data-color="#9C27B0" style="background:#9C27B0"></span><span class="iris-color meterial" data-color="#673AB7" style="background:#673AB7"></span><span class="iris-color meterial" data-color="#3F51B5" style="background:#3F51B5"></span><span class="iris-color meterial" data-color="#2196F3" style="background:#2196F3"></span><span class="iris-color meterial" data-color="#03A9F4" style="background:#03A9F4"></span><span class="iris-color meterial" data-color="#00BCD4" style="background:#00BCD4"></span><span class="iris-color meterial" data-color="#009688" style="background:#009688"></span><span class="iris-color meterial" data-color="#4CAF50" style="background:#4CAF50"></span><span class="iris-color meterial" data-color="#8BC34A" style="background:#8BC34A"></span><span class="iris-color meterial" data-color="#CDDC39" style="background:#CDDC39"></span><span class="iris-color meterial" data-color="#FFEB3B" style="background:#FFEB3B"></span><span class="iris-color meterial" data-color="#FFC107" style="background:#FFC107"></span><span class="iris-color meterial" data-color="#FF9800" style="background:#FF9800"></span><span class="iris-color meterial" data-color="#FF5722" style="background:#FF5722"></span><span class="iris-color meterial" data-color="#795548" style="background:#795548"></span><span class="iris-color meterial" data-color="#9E9E9E" style="background:#9E9E9E"></span><span class="iris-color meterial" data-color="#607D8B" style="background:#607D8B"></span><span class="iris-color meterial" data-color="#BEC2C3" style="background:#BEC2C3"></span><span class="iris-color soft" data-color="#69D2E7" style="background:#69D2E7"></span><span class="iris-color soft" data-color="#A7DBD8" style="background:#A7DBD8"></span><span class="iris-color soft" data-color="#E0E4CC" style="background:#E0E4CC"></span><span class="iris-color soft" data-color="#F38630" style="background:#F38630"></span><span class="iris-color soft" data-color="#FA6900" style="background:#FA6900"></span><span class="iris-color soft" data-color="#ECD078" style="background:#ECD078"></span><span class="iris-color soft" data-color="#D95B43" style="background:#D95B43"></span><span class="iris-color soft" data-color="#C02942" style="background:#C02942"></span><span class="iris-color soft" data-color="#542437" style="background:#542437"></span><span class="iris-color soft" data-color="#53777A" style="background:#53777A"></span><span class="iris-color soft" data-color="#CFF09E" style="background:#CFF09E"></span><span class="iris-color soft" data-color="#A8DBA8" style="background:#A8DBA8"></span><span class="iris-color soft" data-color="#79BD9A" style="background:#79BD9A"></span><span class="iris-color soft" data-color="#3B8686" style="background:#3B8686"></span><span class="iris-color soft" data-color="#0B486B" style="background:#0B486B"></span><span class="iris-color soft" data-color="#556270" style="background:#556270"></span><span class="iris-color soft" data-color="#4ECDC4" style="background:#4ECDC4"></span><span class="iris-color soft" data-color="#C7F464" style="background:#C7F464"></span><span class="iris-color soft" data-color="#FF6B6B" style="background:#FF6B6B"></span><span class="iris-color soft" data-color="#C44D58" style="background:#C44D58"></span></div></div></div></div>'),
      (u = ""),
      (g = navigator.userAgent.toLowerCase()),
      (f = "Microsoft Internet Explorer" === navigator.appName),
      (h = f ? parseFloat(g.match(/msie ([0-9]{1,}[\.0-9]{0,})/)[1]) : 0),
      (d = f && 10 > h),
      (p = !1),
      (c = ["-moz-", "-webkit-", "-o-", "-ms-"]),
      d && 7 >= h
        ? ((e.fn.iris = e.noop), void (e.support.iris = !1))
        : void ((e.support.iris = !0),
          (e.fn.gradient = function () {
            var t = arguments;
            return this.each(function () {
              d
                ? a.apply(this, t)
                : e(this).css("backgroundImage", i.apply(this, t));
            });
          }),
          (m = {
            options: {
              color: !1,
              mode: "hsl",
              controls: { horiz: "s", vert: "l", strip: "h" },
              hide: !0,
              border: !0,
              target: !1,
              width: 200,
              palettes: !1,
            },
            _color: "",
            _palettes: [
              "#000",
              "#fff",
              "#d33",
              "#d93",
              "#ee2",
              "#81d742",
              "#1e73be",
              "#8224e3",
            ],
            _inited: !1,
            _defaultHSLControls: { horiz: "s", vert: "l", strip: "h" },
            _defaultHSVControls: { horiz: "h", vert: "v", strip: "s" },
            _scale: { h: 360, s: 100, l: 100, v: 100 },
            _create: function () {
              var t = this,
                i = t.element,
                a = t.options.color || i.val();
              !1 === p && o(),
                i.is("input")
                  ? ((t.picker = t.options.target
                      ? e(l).appendTo(t.options.target)
                      : e(l).insertAfter(i)),
                    t._addInputListeners(i))
                  : (i.append(l), (t.picker = i.find(".iris-picker"))),
                f
                  ? 9 === h
                    ? t.picker.addClass("iris-ie-9")
                    : 8 >= h && t.picker.addClass("iris-ie-lt9")
                  : 0 > g.indexOf("compatible") &&
                    0 > g.indexOf("khtml") &&
                    g.match(/mozilla/) &&
                    t.picker.addClass("iris-mozilla"),
                t.options.palettes && t._addPalettes(),
                (t._color = new Color(a).setHSpace(t.options.mode)),
                (t.options.color = t._color.toString()),
                (t.controls = {
                  square: t.picker.find(".iris-square"),
                  squareDrag: t.picker.find(".iris-square-value"),
                  horiz: t.picker.find(".iris-square-horiz"),
                  vert: t.picker.find(".iris-square-vert"),
                  strip: t.picker.find(".iris-strip"),
                  stripSlider: t.picker.find(".iris-strip .iris-slider-offset"),
                }),
                "hsv" === t.options.mode && t._has("l", t.options.controls)
                  ? (t.options.controls = t._defaultHSVControls)
                  : "hsl" === t.options.mode &&
                    t._has("v", t.options.controls) &&
                    (t.options.controls = t._defaultHSLControls),
                (t.hue = t._color.h()),
                t.options.hide && t.picker.hide(),
                t.options.border && t.picker.addClass("iris-border"),
                t._initControls(),
                (t.active = "external"),
                t._dimensions(),
                t._change();
            },
            _has: function (t, o) {
              var a = !1;
              return (
                e.each(o, function (e, o) {
                  if (t === o) return (a = !0), !1;
                }),
                a
              );
            },
            _addPalettes: function () {
              var t = e('<div class="iris-palette-container" />'),
                o = e('<a class="iris-palette" tabindex="0" />'),
                i = e.isArray(this.options.palettes)
                  ? this.options.palettes
                  : this._palettes;
              this.picker.find(".iris-palette-container").length &&
                (t = this.picker
                  .find(".iris-palette-container")
                  .detach()
                  .html("")),
                e.each(i, function (e, i) {
                  o.clone()
                    .data("color", i)
                    .css("backgroundColor", i)
                    .appendTo(t)
                    .height(10)
                    .width(10);
                }),
                this.picker.append(t);
            },
            _paint: function () {
              var e = this;
              e._paintDimension("left", "strip"),
                e._paintDimension("top", "vert"),
                e._paintDimension("left", "horiz");
            },
            _paintDimension: function (e, t) {
              var o,
                i = this,
                a = i._color,
                s = i.options.mode,
                n = i._getHSpaceColor(),
                r = i.controls[t],
                l = i.options.controls;
              if (t !== i.active && ("square" !== i.active || "strip" === t))
                switch (l[t]) {
                  case "h":
                    "hsv" === s
                      ? ((n = a.clone()),
                        "horiz" === t
                          ? n[l.vert](100)
                          : "vert" === t
                          ? n[l.horiz](100)
                          : "strip" === t
                          ? n.setHSpace("hsl")
                          : void 0,
                        (o = n.toHsl()))
                      : (o =
                          "strip" === t
                            ? { s: n.s, l: n.l }
                            : { s: 100, l: n.l });
                    break;
                  case "s":
                    "hsv" === s
                      ? "vert" === t
                        ? (o = [
                            a.clone().a(0).s(0).toCSS("rgba"),
                            a.clone().a(1).s(0).toCSS("rgba"),
                          ])
                        : "strip" === t
                        ? (o = [
                            a.clone().s(100).toCSS("hsl"),
                            a.clone().s(0).toCSS("hsl"),
                          ])
                        : "horiz" == t &&
                          (o = ["#fff", "hsl(" + n.h + ",100%,50%)"])
                      : "vert" === t && "h" === i.options.controls.horiz
                      ? (o = [
                          "hsla(0, 0%, " + n.l + "%, 0)",
                          "hsla(0, 0%, " + n.l + "%, 1)",
                        ])
                      : (o = [
                          "hsl(" + n.h + ",0%,50%)",
                          "hsl(" + n.h + ",100%,50%)",
                        ]),
                      r.gradient(e, o);
                    break;
                  case "l":
                    (o =
                      "strip" === t
                        ? [
                            "hsl(" + n.h + ",100%,100%)",
                            "hsl(" + n.h + ", " + n.s + "%,50%)",
                            "hsl(" + n.h + ",100%,0%)",
                          ]
                        : [
                            "#fff",
                            "rgba(255,255,255,0) 50%",
                            "rgba(0,0,0,0) 50%",
                            "rgba(0,0,0,1)",
                          ]),
                      r.gradient(e, o);
                    break;
                  case "v":
                    (o =
                      "strip" === t
                        ? [a.clone().v(100).toCSS(), a.clone().v(0).toCSS()]
                        : ["rgba(0,0,0,0)", "#000"]),
                      r.gradient(e, o);
                    break;
                  default:
                }
            },
            _getHSpaceColor: function () {
              return "hsv" === this.options.mode
                ? this._color.toHsv()
                : this._color.toHsl();
            },
            _dimensions: function () {},
            _addInputListeners: function (e) {
              var t = this,
                o = function (o) {
                  var i = new Color(e.val()),
                    a = e.val().replace(/^#/, "");
                  e.removeClass("iris-error"),
                    i.error
                      ? "" !== a && e.addClass("iris-error")
                      : i.toString() !== t._color.toString() &&
                        !("keyup" === o.type && a.match(/^[0-9a-fA-F]{3}$/)) &&
                        t._setOption("color", i.toString());
                };
              e.on("change", o).on("keyup", t._debounce(o, 100)),
                t.options.hide &&
                  e.one("focus", function () {
                    t.show();
                  });
            },
            _initControls: function () {
              var t = this,
                o = t.controls,
                i = o.square,
                a = t.options.controls,
                s = t._scale[a.strip];
              o.stripSlider.slider({
                orientation: "horizontal ",
                max: s,
                slide: function (e, o) {
                  (t.active = "strip"),
                    "h" === a.strip && (o.value = s - o.value),
                    t._color[a.strip](o.value),
                    t._change.apply(t, arguments);
                },
              }),
                o.squareDrag
                  .draggable({
                    containment: o.square.find(".iris-square-inner"),
                    zIndex: 1e3,
                    cursor: "move",
                    drag: function (e, o) {
                      t._squareDrag(e, o);
                    },
                    start: function () {
                      i.addClass("iris-dragging"),
                        e(this).addClass("ui-state-focus");
                    },
                    stop: function () {
                      i.removeClass("iris-dragging"),
                        e(this).removeClass("ui-state-focus");
                    },
                  })
                  .on("mousedown mouseup", function (o) {
                    o.preventDefault(),
                      "mousedown" === o.type
                        ? (t.picker
                            .find(".ui-state-focus")
                            .removeClass("ui-state-focus")
                            .blur(),
                          e(this).addClass("ui-state-focus").focus())
                        : e(this).removeClass("ui-state-focus");
                  })
                  .on("keydown", function (e) {
                    var i = o.square,
                      a = o.squareDrag,
                      s = a.position(),
                      n = t.options.width / 100;
                    switch ((e.altKey && (n *= 10), e.keyCode)) {
                      case 37:
                        s.left -= n;
                        break;
                      case 38:
                        s.top -= n;
                        break;
                      case 39:
                        s.left += n;
                        break;
                      case 40:
                        s.top += n;
                        break;
                      default:
                        return !0;
                    }
                    (s.left = Math.max(0, Math.min(s.left, i.width()))),
                      (s.top = Math.max(0, Math.min(s.top, i.height()))),
                      a.css(s),
                      t._squareDrag(e, { position: s }),
                      e.preventDefault();
                  }),
                i.mousedown(function (o) {
                  var i, a;
                  1 === o.which &&
                    e(o.target).is("div") &&
                    ((i = t.controls.square.offset()),
                    (a = { top: o.pageY - i.top, left: o.pageX - i.left }),
                    o.preventDefault(),
                    t._squareDrag(o, { position: a }),
                    (o.target = t.controls.squareDrag.get(0)),
                    t.controls.squareDrag.css(a).trigger(o));
                }),
                t.options.palettes && t._paletteListeners();
            },
            _paletteListeners: function () {
              var t = this;
              t.picker
                .find(".iris-palette-container")
                .on("click.palette", ".iris-palette", function () {
                  t._color.fromCSS(e(this).data("color")),
                    (t.active = "external"),
                    t._change();
                })
                .on("keydown.palette", ".iris-palette", function (t) {
                  return (
                    (13 !== t.keyCode && 32 !== t.keyCode) ||
                    void (t.stopPropagation(), e(this).click())
                  );
                });
            },
            _squareDrag: function (e, t) {
              var o = this,
                i = o.options.controls,
                a = o._squareDimensions(),
                s = Math.round(
                  ((a.h - t.position.top) / a.h) * o._scale[i.vert]
                ),
                n =
                  o._scale[i.horiz] -
                  Math.round(
                    ((a.w - t.position.left) / a.w) * o._scale[i.horiz]
                  );
              o._color[i.horiz](n)[i.vert](s),
                (o.active = "square"),
                o._change.apply(o, arguments);
            },
            _setOption: function (t, o) {
              var i,
                a,
                s,
                n = this,
                r = n.options[t],
                l = !1;
              switch (((n.options[t] = o), t)) {
                case "color":
                  (o = "" + o),
                    (i = o.replace(/^#/, "")),
                    (a = new Color(o).setHSpace(n.options.mode)),
                    a.error
                      ? (n.options[t] = r)
                      : ((n._color = a),
                        (n.options.color = n.options[t] = n._color.toString()),
                        (n.active = "external"),
                        n._change());
                  break;
                case "palettes":
                  (l = !0),
                    o
                      ? n._addPalettes()
                      : n.picker.find(".iris-palette-container").remove(),
                    r || n._paletteListeners();
                  break;
                case "width":
                  l = !0;
                  break;
                case "border":
                  (l = !0),
                    (s = o ? "addClass" : "removeClass"),
                    n.picker[s]("iris-border");
                  break;
                case "mode":
                case "controls":
                  return r === o
                    ? void 0
                    : ((s = n.element),
                      (r = n.options),
                      (r.hide = !n.picker.is(":visible")),
                      n.destroy(),
                      n.picker.remove(),
                      e(n.element).iris(r));
              }
              l && n._dimensions(!0);
            },
            _squareDimensions: function (e) {
              var o,
                i,
                a = this.controls.square;
              return e !== t && a.data("dimensions")
                ? a.data("dimensions")
                : ((i = this.controls.squareDrag),
                  (o = { w: a.width(), h: a.height() }),
                  a.data("dimensions", o),
                  o);
            },
            _isNonHueControl: function (e, t) {
              return (
                !("square" !== e || "h" !== this.options.controls.strip) ||
                ("external" !== t && ("h" !== t || "strip" !== e))
              );
            },
            _change: function () {
              var t = this,
                o = t.controls,
                i = t._getHSpaceColor(),
                a = ["square", "strip"],
                s = t.options.controls,
                n = s[t.active] || "external",
                r = t.hue;
              "strip" === t.active
                ? (a = [])
                : "external" !== t.active && a.pop(),
                e.each(a, function (e, a) {
                  var n, r, l;
                  a !== t.active &&
                    ("strip" === a
                      ? ((n =
                          "h" === s.strip
                            ? t._scale[s.strip] - i[s.strip]
                            : i[s.strip]),
                        o.stripSlider.slider("value", n))
                      : "square" === a
                      ? ((r = t._squareDimensions()),
                        (l = {
                          left: (i[s.horiz] / t._scale[s.horiz]) * r.w,
                          top: r.h - (i[s.vert] / t._scale[s.vert]) * r.h,
                        }),
                        t.controls.squareDrag.css(l))
                      : void 0);
                }),
                i.h !== r && t._isNonHueControl(t.active, n) && t._color.h(r),
                (t.hue = t._color.h()),
                (t.options.color = t._color.toString()),
                t._inited &&
                  t._trigger("change", { type: t.active }, { color: t._color }),
                t.element.is(":input") &&
                  !t._color.error &&
                  (t.element.removeClass("iris-error"),
                  t.element.val() !== t._color.toString() &&
                    t.element.val(t._color.toString())),
                t._paint(),
                (t._inited = !0),
                (t.active = !1);
            },
            _debounce: function (e, t, o) {
              var i, a;
              return function () {
                var s,
                  n,
                  r = this,
                  l = arguments;
                return (
                  (s = function () {
                    (i = null), o || (a = e.apply(r, l));
                  }),
                  (n = o && !i),
                  clearTimeout(i),
                  (i = setTimeout(s, t)),
                  n && (a = e.apply(r, l)),
                  a
                );
              };
            },
            show: function () {
              this.picker.show();
            },
            hide: function () {
              this.picker.hide();
            },
            toggle: function () {
              this.picker.toggle();
            },
            color: function (e) {
              return !0 === e
                ? this._color.clone()
                : e === t
                ? this._color.toString()
                : void this.option("color", e);
            },
          }),
          e.widget("a8c.iris", m))
    );
  })(jQuery),
  !(function (o, t) {
    "use strict";
    void 0 !== typeof Color.fn.toString &&
      (Color.fn.toString = function () {
        if (1 > this._alpha)
          return this.toCSS("rgba", this._alpha).replace(/\s+/g, "");
        var e = parseInt(this._color, 10).toString(16);
        if (this.error) return "";
        if (6 > e.length)
          for (var t = 6 - e.length - 1; 0 <= t; t--) e = "0" + e;
        return "#" + e;
      }),
      (o.cs_ParseColorValue = function (e) {
        var t = e.replace(/\s+/g, ""),
          o =
            -1 === t.indexOf("rgba")
              ? 100
              : parseFloat(100 * t.replace(/^.*,(.+)\)/, "$1"));
        return { value: t, alpha: o, rgba: 100 > o };
      }),
      (o.fn.cs_iris = function (e) {
        return this.each(function () {
          var l = o(this);
          if ("color" == e) return l.iris(e), !1;
          if (!1 !== l.data("rgba")) {
            var n = o.cs_ParseColorValue(l.val());
            l.iris({
              hide: !0,
              change: function (e, o) {
                var a = o.color.toString();
                l.parent().find(".co-sw-co").css("background-color", a),
                  l
                    .next(".iris-picker")
                    .find(".cs-alpha-slider-offset")
                    .css(
                      "background-image",
                      "linear-gradient(to right, rgba(255,255,255,0) 0%, " +
                        a +
                        " 100%)"
                    ),
                  t.iris_global_change_callback(e, o);
              },
              create: function () {
                var t = l.data("a8cIris"),
                  e = l.next(".iris-picker"),
                  s = l.next(".iris-picker").find(".cs-alpha-wrap"),
                  a = s.find(".cs-alpha-slider"),
                  i = s.find(".cs-alpha-slider-offset");
                a.slider({
                  slide: function (e, o) {
                    var a = parseFloat(o.value / 100);
                    (t._color._alpha = a), l.iris("color", t._color.toString());
                  },
                  change: function (e) {
                    e.originalEvent && l.trigger("change");
                  },
                  create: function () {
                    parseFloat(n.alpha / 100),
                      i.css("background-color", n.value);
                  },
                  value: n.alpha,
                  step: 1,
                  min: 0,
                  max: 100,
                });
              },
            });
          } else l.iris(e);
        });
      });
  })(jQuery, window, document),
  !(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? e(require("jquery"))
      : "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : e(t.jQuery);
  })(this, function (m) {
    "use strict";
    function i(e) {
      var o = this;
      if (
        (1 === arguments.length && "function" == typeof e && (e = [e]),
        !(e instanceof Array))
      )
        throw new SyntaxError(
          "isInViewport: Argument(s) passed to .do/.run should be a function or an array of functions"
        );
      return (
        e.forEach(function (e) {
          "function" == typeof e
            ? [].slice.call(o).forEach(function (o) {
                return e.call(m(o));
              })
            : (console.warn(
                "isInViewport: Argument(s) passed to .do/.run should be a function or an array of functions"
              ),
              console.warn(
                "isInViewport: Ignoring non-function values in array and moving on"
              ));
        }),
        this
      );
    }
    function a(e) {
      var i = m("<div></div>").css({ width: "100%" });
      e.append(i);
      var t = e.width() - i.width();
      return i.remove(), t;
    }
    function s(e, t) {
      var o = e.getBoundingClientRect(),
        i = o.top,
        n = o.bottom,
        r = o.left,
        g = o.right,
        _ = m.extend({ tolerance: 0, viewport: window }, t),
        b = !1,
        y = _.viewport.jquery ? _.viewport : m(_.viewport);
      y.length ||
        (console.warn(
          "isInViewport: The viewport selector you have provided matches no element on page."
        ),
        console.warn("isInViewport: Defaulting to viewport as window"),
        (y = m(window)));
      var C = y.height(),
        p = y.width(),
        x = y[0].toString();
      if (
        y[0] !== window &&
        "[object Window]" !== x &&
        "[object DOMWindow]" !== x
      ) {
        var h = y[0].getBoundingClientRect();
        (i -= h.top),
          (n -= h.top),
          (r -= h.left),
          (g -= h.left),
          (s.scrollBarWidth = s.scrollBarWidth || a(y)),
          (p -= s.scrollBarWidth);
      }
      return (
        (_.tolerance = ~~Math.round(parseFloat(_.tolerance))),
        0 > _.tolerance && (_.tolerance = C + _.tolerance),
        0 >= g || r >= p
          ? b
          : (b = _.tolerance
              ? i <= _.tolerance && n >= _.tolerance
              : 0 < n && i <= C)
      );
    }
    function o(e) {
      if (e) {
        var o = e.split(",");
        return (
          1 === o.length && isNaN(o[0]) && ((o[1] = o[0]), (o[0] = void 0)),
          {
            tolerance: o[0] ? o[0].trim() : void 0,
            viewport: o[1] ? m(o[1].trim()) : void 0,
          }
        );
      }
      return {};
    }
    (m = m && m.hasOwnProperty("default") ? m.default : m),
      m.extend(m.expr.pseudos || m.expr[":"], {
        "in-viewport": m.expr.createPseudo
          ? m.expr.createPseudo(function (t) {
              return function (e) {
                return s(e, o(t));
              };
            })
          : function (i, e, a) {
              return s(i, o(a[3]));
            },
      }),
      (m.fn.isInViewport = function (o) {
        return this.filter(function (e, i) {
          return s(i, o);
        });
      }),
      (m.fn.run = i);
  }),
  "undefined" == typeof jQuery)
)
  throw new Error("Bootstrap's JavaScript requires jQuery");
+(function (o) {
  "use strict";
  var t = o.fn.jquery.split(" ")[0].split(".");
  if ((2 > t[0] && 9 > t[1]) || (1 == t[0] && 9 == t[1] && 1 > t[2]))
    throw new Error(
      "Bootstrap's JavaScript requires jQuery version 1.9.1 or higher"
    );
})(jQuery),
  +(function (m) {
    "use strict";
    function t(t) {
      return this.each(function () {
        var e = m(this),
          o = e.data("bs.tooltip");
        (o || !/destroy|hide/.test(t)) &&
          (o ||
            e.data("bs.tooltip", (o = new _(this, "object" == typeof t && t))),
          "string" == typeof t && o[t]());
      });
    }
    var _ = function (o, t) {
      (this.type = null),
        (this.options = null),
        (this.enabled = null),
        (this.timeout = null),
        (this.hoverState = null),
        (this.$element = null),
        (this.inState = null),
        this.init("tooltip", o, t);
    };
    (_.VERSION = "3.3.5"),
      (_.TRANSITION_DURATION = 150),
      (_.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template:
          '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: { selector: "body", padding: 0 },
      }),
      (_.prototype.init = function (t, e, o) {
        if (
          ((this.enabled = !0),
          (this.type = t),
          (this.$element = m(e)),
          (this.options = this.getOptions(o)),
          (this.$viewport =
            this.options.viewport &&
            m(
              m.isFunction(this.options.viewport)
                ? this.options.viewport.call(this, this.$element)
                : this.options.viewport.selector || this.options.viewport
            )),
          (this.inState = { click: !1, hover: !1, focus: !1 }),
          this.$element[0] instanceof document.constructor &&
            !this.options.selector)
        )
          throw new Error(
            "`selector` option must be specified when initializing " +
              this.type +
              " on the window.document object!"
          );
        for (var i, l = this.options.trigger.split(" "), n = l.length; n--; )
          if (((i = l[n]), "click" == i))
            this.$element.on(
              "click." + this.type,
              this.options.selector,
              m.proxy(this.toggle, this)
            );
          else if ("manual" != i) {
            var d = "hover" == i ? "mouseenter" : "focusin",
              p = "hover" == i ? "mouseleave" : "focusout";
            this.$element.on(
              d + "." + this.type,
              this.options.selector,
              m.proxy(this.enter, this)
            ),
              this.$element.on(
                p + "." + this.type,
                this.options.selector,
                m.proxy(this.leave, this)
              );
          }
        this.options.selector
          ? (this._options = m.extend({}, this.options, {
              trigger: "manual",
              selector: "",
            }))
          : this.fixTitle();
      }),
      (_.prototype.getDefaults = function () {
        return _.DEFAULTS;
      }),
      (_.prototype.getOptions = function (t) {
        return (
          (t = m.extend({}, this.getDefaults(), this.$element.data(), t)),
          t.delay &&
            "number" == typeof t.delay &&
            (t.delay = { show: t.delay, hide: t.delay }),
          t
        );
      }),
      (_.prototype.getDelegateOptions = function () {
        var a = {},
          e = this.getDefaults();
        return (
          this._options &&
            m.each(this._options, function (o, t) {
              e[o] != t && (a[o] = t);
            }),
          a
        );
      }),
      (_.prototype.enter = function (t) {
        var e =
          t instanceof this.constructor
            ? t
            : m(t.currentTarget).data("bs." + this.type);
        return (
          e ||
            ((e = new this.constructor(
              t.currentTarget,
              this.getDelegateOptions()
            )),
            m(t.currentTarget).data("bs." + this.type, e)),
          t instanceof m.Event &&
            (e.inState["focusin" == t.type ? "focus" : "hover"] = !0),
          e.tip().hasClass("in") || "in" == e.hoverState
            ? void (e.hoverState = "in")
            : (clearTimeout(e.timeout),
              (e.hoverState = "in"),
              e.options.delay && e.options.delay.show
                ? void (e.timeout = setTimeout(function () {
                    "in" == e.hoverState && e.show();
                  }, e.options.delay.show))
                : e.show())
        );
      }),
      (_.prototype.isInStateTrue = function () {
        for (var e in this.inState) if (this.inState[e]) return !0;
        return !1;
      }),
      (_.prototype.leave = function (t) {
        var e =
          t instanceof this.constructor
            ? t
            : m(t.currentTarget).data("bs." + this.type);
        return (
          e ||
            ((e = new this.constructor(
              t.currentTarget,
              this.getDelegateOptions()
            )),
            m(t.currentTarget).data("bs." + this.type, e)),
          t instanceof m.Event &&
            (e.inState["focusout" == t.type ? "focus" : "hover"] = !1),
          e.isInStateTrue()
            ? void 0
            : (clearTimeout(e.timeout),
              (e.hoverState = "out"),
              e.options.delay && e.options.delay.hide
                ? void (e.timeout = setTimeout(function () {
                    "out" == e.hoverState && e.hide();
                  }, e.options.delay.hide))
                : e.hide())
        );
      }),
      (_.prototype.show = function () {
        var t = m.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
          this.$element.trigger(t);
          var e = m.contains(
            this.$element[0].ownerDocument.documentElement,
            this.$element[0]
          );
          if (t.isDefaultPrevented() || !e) return;
          var o = this,
            i = this.tip(),
            s = this.getUID(this.type);
          this.setContent(),
            i.attr("id", s),
            this.$element.attr("aria-describedby", s),
            this.options.animation && i.addClass("fade");
          var n =
              "function" == typeof this.options.placement
                ? this.options.placement.call(this, i[0], this.$element[0])
                : this.options.placement,
            r = /\s?auto?\s?/i,
            a = r.test(n);
          a && (n = n.replace(r, "") || "top"),
            i
              .detach()
              .css({ top: 0, left: 0, display: "block" })
              .addClass(n)
              .data("bs." + this.type, this),
            this.options.container
              ? i.appendTo(this.options.container)
              : i.insertAfter(this.$element),
            this.$element.trigger("inserted.bs." + this.type);
          var l = this.getPosition(),
            h = i[0].offsetWidth,
            f = i[0].offsetHeight;
          if (a) {
            var c = n,
              u = this.getPosition(this.$viewport);
            (n =
              "bottom" == n && l.bottom + f > u.bottom
                ? "top"
                : "top" == n && l.top - f < u.top
                ? "bottom"
                : "right" == n && l.right + h > u.width
                ? "left"
                : "left" == n && l.left - h < u.left
                ? "right"
                : n),
              i.removeClass(c).addClass(n);
          }
          var d = this.getCalculatedOffset(n, l, h, f);
          this.applyPlacement(d, n);
          var v = function () {
            var e = o.hoverState;
            o.$element.trigger("shown.bs." + o.type),
              (o.hoverState = null),
              "out" == e && o.leave(o);
          };
          m.support.transition && this.$tip.hasClass("fade")
            ? i
                .one("bsTransitionEnd", v)
                .emulateTransitionEnd(_.TRANSITION_DURATION)
            : v();
        }
      }),
      (_.prototype.applyPlacement = function (t, e) {
        var o = this.tip(),
          i = o[0].offsetWidth,
          n = o[0].offsetHeight,
          s = parseInt(o.css("margin-top"), 10),
          d = parseInt(o.css("margin-left"), 10);
        isNaN(s) && (s = 0),
          isNaN(d) && (d = 0),
          (t.top += s),
          (t.left += d),
          m.offset.setOffset(
            o[0],
            m.extend(
              {
                using: function (e) {
                  o.css({ top: Math.round(e.top), left: Math.round(e.left) });
                },
              },
              t
            ),
            0
          ),
          o.addClass("in");
        var g = o[0].offsetWidth,
          a = o[0].offsetHeight;
        "top" == e && a != n && (t.top = t.top + n - a);
        var l = this.getViewportAdjustedDelta(e, t, g, a);
        l.left ? (t.left += l.left) : (t.top += l.top);
        var h = /top|bottom/.test(e),
          f = h ? 2 * l.left - i + g : 2 * l.top - n + a,
          c = h ? "offsetWidth" : "offsetHeight";
        o.offset(t), this.replaceArrow(f, o[0][c], h);
      }),
      (_.prototype.replaceArrow = function (i, t, e) {
        this.arrow()
          .css(e ? "left" : "top", 50 * (1 - i / t) + "%")
          .css(e ? "top" : "left", "");
      }),
      (_.prototype.setContent = function () {
        var o = this.tip(),
          t = this.getTitle();
        o.find(".tooltip-inner")[this.options.html ? "html" : "text"](t),
          o.removeClass("fade in top bottom left right");
      }),
      (_.prototype.hide = function (t) {
        function e() {
          "in" != o.hoverState && i.detach(),
            o.$element
              .removeAttr("aria-describedby")
              .trigger("hidden.bs." + o.type),
            t && t();
        }
        var o = this,
          i = m(this.$tip),
          a = m.Event("hide.bs." + this.type);
        return (
          this.$element.trigger(a),
          a.isDefaultPrevented()
            ? void 0
            : (i.removeClass("in"),
              m.support.transition && i.hasClass("fade")
                ? i
                    .one("bsTransitionEnd", e)
                    .emulateTransitionEnd(_.TRANSITION_DURATION)
                : e(),
              (this.hoverState = null),
              this)
        );
      }),
      (_.prototype.fixTitle = function () {
        var e = this.$element;
        (e.attr("title") || "string" != typeof e.attr("data-original-title")) &&
          e
            .attr("data-original-title", e.attr("title") || "")
            .attr("title", "");
      }),
      (_.prototype.hasContent = function () {
        return this.getTitle();
      }),
      (_.prototype.getPosition = function (t) {
        t = t || this.$element;
        var a = t[0],
          o = "BODY" == a.tagName,
          i = a.getBoundingClientRect();
        null == i.width &&
          (i = m.extend({}, i, {
            width: i.right - i.left,
            height: i.bottom - i.top,
          }));
        var l = o ? { top: 0, left: 0 } : t.offset(),
          s = {
            scroll: o
              ? document.documentElement.scrollTop || document.body.scrollTop
              : t.scrollTop(),
          },
          r = o
            ? { width: m(window).width(), height: m(window).height() }
            : null;
        return m.extend({}, i, s, r, l);
      }),
      (_.prototype.getCalculatedOffset = function (a, t, e, o) {
        return "bottom" == a
          ? { top: t.top + t.height, left: t.left + t.width / 2 - e / 2 }
          : "top" == a
          ? { top: t.top - o, left: t.left + t.width / 2 - e / 2 }
          : "left" == a
          ? { top: t.top + t.height / 2 - o / 2, left: t.left - e }
          : { top: t.top + t.height / 2 - o / 2, left: t.left + t.width };
      }),
      (_.prototype.getViewportAdjustedDelta = function (d, t, e, o) {
        var i = { top: 0, left: 0 };
        if (!this.$viewport) return i;
        var n = (this.options.viewport && this.options.viewport.padding) || 0,
          s = this.getPosition(this.$viewport);
        if (/right|left/.test(d)) {
          var r = t.top - n - s.scroll,
            p = t.top + n - s.scroll + o;
          r < s.top
            ? (i.top = s.top - r)
            : p > s.top + s.height && (i.top = s.top + s.height - p);
        } else {
          var a = t.left - n,
            l = t.left + n + e;
          a < s.left
            ? (i.left = s.left - a)
            : l > s.right && (i.left = s.left + s.width - l);
        }
        return i;
      }),
      (_.prototype.getTitle = function () {
        var i,
          a = this.$element,
          e = this.options;
        return (i =
          a.attr("data-original-title") ||
          ("function" == typeof e.title ? e.title.call(a[0]) : e.title));
      }),
      (_.prototype.getUID = function (e) {
        do e += ~~(1e6 * Math.random());
        while (document.getElementById(e));
        return e;
      }),
      (_.prototype.tip = function () {
        if (
          !this.$tip &&
          ((this.$tip = m(this.options.template)), 1 != this.$tip.length)
        )
          throw new Error(
            this.type +
              " `template` option must consist of exactly 1 top-level element!"
          );
        return this.$tip;
      }),
      (_.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"));
      }),
      (_.prototype.enable = function () {
        this.enabled = !0;
      }),
      (_.prototype.disable = function () {
        this.enabled = !1;
      }),
      (_.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled;
      }),
      (_.prototype.toggle = function (t) {
        var e = this;
        t &&
          ((e = m(t.currentTarget).data("bs." + this.type)),
          e ||
            ((e = new this.constructor(
              t.currentTarget,
              this.getDelegateOptions()
            )),
            m(t.currentTarget).data("bs." + this.type, e))),
          t
            ? ((e.inState.click = !e.inState.click),
              e.isInStateTrue() ? e.enter(e) : e.leave(e))
            : e.tip().hasClass("in")
            ? e.leave(e)
            : e.enter(e);
      }),
      (_.prototype.destroy = function () {
        var e = this;
        clearTimeout(this.timeout),
          this.hide(function () {
            e.$element.off("." + e.type).removeData("bs." + e.type),
              e.$tip && e.$tip.detach(),
              (e.$tip = null),
              (e.$arrow = null),
              (e.$viewport = null);
          });
      });
    var e = m.fn.tooltip;
    (m.fn.tooltip = t),
      (m.fn.tooltip.Constructor = _),
      (m.fn.tooltip.noConflict = function () {
        return (m.fn.tooltip = e), this;
      });
  })(jQuery),
  +(function (a) {
    "use strict";
    function t(t) {
      return this.each(function () {
        var e = a(this),
          o = e.data("bs.popover");
        (o || !/destroy|hide/.test(t)) &&
          (o ||
            e.data("bs.popover", (o = new s(this, "object" == typeof t && t))),
          "string" == typeof t && o[t]());
      });
    }
    var s = function (o, t) {
      this.init("popover", o, t);
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    (s.VERSION = "3.3.5"),
      (s.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template:
          '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
      })),
      (s.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype)),
      (s.prototype.constructor = s),
      (s.prototype.getDefaults = function () {
        return s.DEFAULTS;
      }),
      (s.prototype.setContent = function () {
        var i = this.tip(),
          t = this.getTitle(),
          e = this.getContent();
        i.find(".popover-title")[this.options.html ? "html" : "text"](t),
          i
            .find(".popover-content")
            .children()
            .detach()
            .end()
            [
              this.options.html
                ? "string" == typeof e
                  ? "html"
                  : "append"
                : "text"
            ](e),
          i.removeClass("fade top bottom left right in"),
          i.find(".popover-title").html() || i.find(".popover-title").hide();
      }),
      (s.prototype.hasContent = function () {
        return this.getTitle() || this.getContent();
      }),
      (s.prototype.getContent = function () {
        var o = this.$element,
          t = this.options;
        return (
          o.attr("data-content") ||
          ("function" == typeof t.content ? t.content.call(o[0]) : t.content)
        );
      }),
      (s.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".arrow"));
      });
    var e = a.fn.popover;
    (a.fn.popover = t),
      (a.fn.popover.Constructor = s),
      (a.fn.popover.noConflict = function () {
        return (a.fn.popover = e), this;
      });
  })(jQuery),
  (String.prototype.plural = function () {
    if (/\d/g.test(this.substr(this.length - 1))) return this;
    var t,
      o = {
        "(quiz)$": "$1zes",
        "^(ox)$": "$1en",
        "([m|l])ouse$": "$1ice",
        "(matr|vert|ind)ix|ex$": "$1ices",
        "(x|ch|ss|sh)$": "$1es",
        "([^aeiouy]|qu)y$": "$1ies",
        "(hive)$": "$1s",
        "(?:([^f])fe|([lr])f)$": "$1$2ves",
        "(shea|lea|loa|thie)f$": "$1ves",
        sis$: "ses",
        "([ti])um$": "$1a",
        "(tomat|potat|ech|her|vet)o$": "$1oes",
        "(bu)s$": "$1ses",
        "(alias)$": "$1es",
        "(octop)us$": "$1i",
        "(ax|test)is$": "$1es",
        "(us)$": "$1es",
        "([^s]+)$": "$1s",
      };
    for (t in o) {
      var e = new RegExp(t, "i");
      if (e.test(this)) return this.replace(e, o[t]);
    }
    return this;
  }),
  ($.urlParam = function (t) {
    var e = new RegExp("[?&]" + t + "=([^&#]*)").exec(window.location.href);
    return null == e ? null : decodeURI(e[1]) || 0;
  }),
  (function (s) {
    var l = (function () {
        try {
          return !!Symbol.iterator;
        } catch (t) {
          return !1;
        }
      })(),
      e = function (o) {
        var t = {
          next: function () {
            var t = o.shift();
            return { done: void 0 === t, value: t };
          },
        };
        return (
          l &&
            (t[Symbol.iterator] = function () {
              return t;
            }),
          t
        );
      },
      a = function (t) {
        return encodeURIComponent(t).replace(/%20/g, "+");
      },
      r = function (t) {
        return decodeURIComponent((t + "").replace(/\+/g, " "));
      };
    (function () {
      try {
        var t = s.URLSearchParams;
        return (
          "a=1" === new t("?a=1").toString() &&
          "function" == typeof t.prototype.set &&
          "function" == typeof t.prototype.entries
        );
      } catch (t) {
        return !1;
      }
    })() ||
      (function () {
        var d = function (a) {
            Object.defineProperty(this, "_entries", {
              writable: !0,
              value: {},
            });
            var e = typeof a;
            if ("undefined" == e);
            else if ("string" === e) "" != a && this._fromString(a);
            else if (a instanceof d) {
              var s = this;
              a.forEach(function (o, e) {
                s.append(e, o);
              });
            } else if (!(null !== a && "object" === e))
              throw new TypeError(
                "Unsupported input's type for URLSearchParams"
              );
            else if ("[object Array]" === Object.prototype.toString.call(a)) {
              for (var t, r = 0; r < a.length; r++)
                if (
                  ((t = a[r]),
                  "[object Array]" === Object.prototype.toString.call(t) ||
                    2 !== t.length)
                )
                  this.append(t[0], t[1]);
                else
                  throw new TypeError(
                    "Expected [string, any] as entry at index " +
                      r +
                      " of URLSearchParams's input"
                  );
            } else for (var l in a) a.hasOwnProperty(l) && this.append(l, a[l]);
          },
          t = d.prototype;
        (t.append = function (o, e) {
          o in this._entries
            ? this._entries[o].push(e + "")
            : (this._entries[o] = [e + ""]);
        }),
          (t.delete = function (t) {
            delete this._entries[t];
          }),
          (t.get = function (t) {
            return t in this._entries ? this._entries[t][0] : null;
          }),
          (t.getAll = function (t) {
            return t in this._entries ? this._entries[t].slice(0) : [];
          }),
          (t.has = function (t) {
            return t in this._entries;
          }),
          (t.set = function (o, e) {
            this._entries[o] = [e + ""];
          }),
          (t.forEach = function (o, e) {
            var t;
            for (var a in this._entries)
              if (this._entries.hasOwnProperty(a)) {
                t = this._entries[a];
                for (var s = 0; s < t.length; s++) o.call(e, t[s], a, this);
              }
          }),
          (t.keys = function () {
            var o = [];
            return (
              this.forEach(function (i, e) {
                o.push(e);
              }),
              e(o)
            );
          }),
          (t.values = function () {
            var o = [];
            return (
              this.forEach(function (t) {
                o.push(t);
              }),
              e(o)
            );
          }),
          (t.entries = function () {
            var o = [];
            return (
              this.forEach(function (i, e) {
                o.push([e, i]);
              }),
              e(o)
            );
          }),
          l && (t[Symbol.iterator] = t.entries),
          (t.toString = function () {
            var o = [];
            return (
              this.forEach(function (i, e) {
                o.push(a(e) + "=" + a(i));
              }),
              o.join("&")
            );
          }),
          (s.URLSearchParams = d);
      })();
    var t = s.URLSearchParams.prototype;
    "function" != typeof t.sort &&
      (t.sort = function () {
        var o = this,
          i = [];
        this.forEach(function (a, e) {
          i.push([e, a]), o._entries || o.delete(e);
        }),
          i.sort(function (o, e) {
            return o[0] < e[0] ? -1 : o[0] > e[0] ? 1 : 0;
          }),
          o._entries && (o._entries = {});
        for (var t = 0; t < i.length; t++) this.append(i[t][0], i[t][1]);
      }),
      "function" != typeof t._fromString &&
        Object.defineProperty(t, "_fromString", {
          enumerable: !1,
          configurable: !1,
          writable: !1,
          value: function (o) {
            if (this._entries) this._entries = {};
            else {
              var a = [];
              this.forEach(function (o, e) {
                a.push(e);
              });
              for (var s = 0; s < a.length; s++) this.delete(a[s]);
            }
            o = o.replace(/^\?/, "");
            for (var l, d = o.split("&"), s = 0; s < d.length; s++)
              (l = d[s].split("=")),
                this.append(r(l[0]), 1 < l.length ? r(l[1]) : "");
          },
        });
  })(
    "undefined" == typeof global
      ? "undefined" == typeof window
        ? "undefined" == typeof self
          ? this
          : self
        : window
      : global
  ),
  (function (l) {
    if (
      ((function () {
        try {
          var t = new l.URL("b", "http://a");
          return (
            (t.pathname = "c d"), "http://a/c%20d" === t.href && t.searchParams
          );
        } catch (t) {
          return !1;
        }
      })() ||
        (function () {
          var o = l.URL,
            t = function (d, p) {
              "string" != typeof d && (d += ""),
                p && "string" != typeof p && (p += "");
              var u,
                m = document;
              if (p && (void 0 === l.location || p !== l.location.href)) {
                (p = p.toLowerCase()),
                  (m = document.implementation.createHTMLDocument("")),
                  (u = m.createElement("base")),
                  (u.href = p),
                  m.head.appendChild(u);
                try {
                  if (0 !== u.href.indexOf(p)) throw new Error(u.href);
                } catch (t) {
                  throw new Error(
                    "URL unable to set base " + p + " due to " + t
                  );
                }
              }
              var g = m.createElement("a");
              (g.href = d), u && (m.body.appendChild(g), (g.href = g.href));
              var i = m.createElement("input");
              if (
                ((i.type = "url"),
                (i.value = d),
                ":" === g.protocol ||
                  !/:/.test(g.href) ||
                  (!i.checkValidity() && !p))
              )
                throw new TypeError("Invalid URL");
              Object.defineProperty(this, "_anchorElement", { value: g });
              var o = new l.URLSearchParams(this.search),
                a = !0,
                v = !0,
                _ = this;
              ["append", "delete", "set"].forEach(function (i) {
                var e = o[i];
                o[i] = function () {
                  e.apply(o, arguments),
                    a && ((v = !1), (_.search = o.toString()), (v = !0));
                };
              }),
                Object.defineProperty(this, "searchParams", {
                  value: o,
                  enumerable: !0,
                });
              var c;
              Object.defineProperty(this, "_updateSearchParams", {
                enumerable: !1,
                configurable: !1,
                writable: !1,
                value: function () {
                  this.search !== c &&
                    ((c = this.search),
                    v &&
                      ((a = !1),
                      this.searchParams._fromString(this.search),
                      (a = !0)));
                },
              });
            },
            e = t.prototype,
            i = function (o) {
              Object.defineProperty(e, o, {
                get: function () {
                  return this._anchorElement[o];
                },
                set: function (t) {
                  this._anchorElement[o] = t;
                },
                enumerable: !0,
              });
            };
          ["hash", "host", "hostname", "port", "protocol"].forEach(function (
            t
          ) {
            i(t);
          }),
            Object.defineProperty(e, "search", {
              get: function () {
                return this._anchorElement.search;
              },
              set: function (t) {
                (this._anchorElement.search = t), this._updateSearchParams();
              },
              enumerable: !0,
            }),
            Object.defineProperties(e, {
              toString: {
                get: function () {
                  var t = this;
                  return function () {
                    return t.href;
                  };
                },
              },
              href: {
                get: function () {
                  return this._anchorElement.href.replace(/\?$/, "");
                },
                set: function (t) {
                  (this._anchorElement.href = t), this._updateSearchParams();
                },
                enumerable: !0,
              },
              pathname: {
                get: function () {
                  return this._anchorElement.pathname.replace(/(^\/?)/, "/");
                },
                set: function (t) {
                  this._anchorElement.pathname = t;
                },
                enumerable: !0,
              },
              origin: {
                get: function () {
                  var o = { "http:": 80, "https:": 443, "ftp:": 21 }[
                      this._anchorElement.protocol
                    ],
                    e =
                      this._anchorElement.port != o &&
                      "" !== this._anchorElement.port;
                  return (
                    this._anchorElement.protocol +
                    "//" +
                    this._anchorElement.hostname +
                    (e ? ":" + this._anchorElement.port : "")
                  );
                },
                enumerable: !0,
              },
              password: {
                get: function () {
                  return "";
                },
                set: function () {},
                enumerable: !0,
              },
              username: {
                get: function () {
                  return "";
                },
                set: function () {},
                enumerable: !0,
              },
            }),
            (t.createObjectURL = function () {
              return o.createObjectURL.apply(o, arguments);
            }),
            (t.revokeObjectURL = function () {
              return o.revokeObjectURL.apply(o, arguments);
            }),
            (l.URL = t);
        })(),
      void 0 !== l.location && !("origin" in l.location))
    ) {
      var e = function () {
        return (
          l.location.protocol +
          "//" +
          l.location.hostname +
          (l.location.port ? ":" + l.location.port : "")
        );
      };
      try {
        Object.defineProperty(l.location, "origin", { get: e, enumerable: !0 });
      } catch (t) {
        setInterval(function () {
          l.location.origin = e();
        }, 100);
      }
    }
  })(
    "undefined" == typeof global
      ? "undefined" == typeof window
        ? "undefined" == typeof self
          ? this
          : self
        : window
      : global
  ),
  ($.fn.nodeText = function () {
    return this.clone().children().remove().end().text();
  }),
  (function (e) {
    e.extend({
      debounce: function (t, o, i, a) {
        3 == arguments.length && "boolean" != typeof i && ((a = i), (i = !1));
        var s;
        return function () {
          var e = arguments;
          (a = a || this),
            i && !s && t.apply(a, e),
            clearTimeout(s),
            (s = setTimeout(function () {
              i || t.apply(a, e), (s = null);
            }, o));
        };
      },
      throttle: function (t, o, i) {
        var a, s, n;
        return function () {
          (s = arguments),
            (n = !0),
            (i = i || this),
            a ||
              (function () {
                n
                  ? (t.apply(i, s),
                    (n = !1),
                    (a = setTimeout(arguments.callee, o)))
                  : (a = null);
              })();
        };
      },
    });
  })(jQuery);
