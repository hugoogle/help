!(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery", "./core", "./mouse", "./widget"], a)
    : a(jQuery);
})(function (b) {
  return (
    b.widget("ui.resizable", b.ui.mouse, {
      version: "1.11.4",
      widgetEventPrefix: "resize",
      options: {
        alsoResize: !1,
        animate: !1,
        animateDuration: "slow",
        animateEasing: "swing",
        aspectRatio: !1,
        autoHide: !1,
        containment: !1,
        ghost: !1,
        grid: !1,
        handles: "e,s,se",
        helper: !1,
        maxHeight: null,
        maxWidth: null,
        minHeight: 10,
        minWidth: 10,
        zIndex: 90,
        resize: null,
        start: null,
        stop: null,
      },
      _num: function (a) {
        return parseInt(a, 10) || 0;
      },
      _isNumber: function (a) {
        return !isNaN(parseInt(a, 10));
      },
      _hasScroll: function (a, c) {
        if ("hidden" === b(a).css("overflow")) return !1;
        var d,
          f = c && "left" === c ? "scrollLeft" : "scrollTop";
        return 0 < a[f] || ((a[f] = 1), (d = 0 < a[f]), (a[f] = 0), d);
      },
      _create: function () {
        var a,
          c,
          d,
          f,
          g = this,
          j = this.options;
        if (
          (this.element.addClass("ui-resizable"),
          b.extend(this, {
            _aspectRatio: !!j.aspectRatio,
            aspectRatio: j.aspectRatio,
            originalElement: this.element,
            _proportionallyResizeElements: [],
            _helper:
              j.helper || j.ghost || j.animate
                ? j.helper || "ui-resizable-helper"
                : null,
          }),
          this.element[0].nodeName.match(
            /^(canvas|textarea|input|select|button|img)$/i
          ) &&
            (this.element.wrap(
              b("<div class='ui-wrapper' style='overflow: hidden;'></div>").css(
                {
                  position: this.element.css("position"),
                  width: this.element.outerWidth(),
                  height: this.element.outerHeight(),
                  top: this.element.css("top"),
                  left: this.element.css("left"),
                }
              )
            ),
            (this.element = this.element
              .parent()
              .data("ui-resizable", this.element.resizable("instance"))),
            (this.elementIsWrapper = !0),
            this.element.css({
              marginLeft: this.originalElement.css("marginLeft"),
              marginTop: this.originalElement.css("marginTop"),
              marginRight: this.originalElement.css("marginRight"),
              marginBottom: this.originalElement.css("marginBottom"),
            }),
            this.originalElement.css({
              marginLeft: 0,
              marginTop: 0,
              marginRight: 0,
              marginBottom: 0,
            }),
            (this.originalResizeStyle = this.originalElement.css("resize")),
            this.originalElement.css("resize", "none"),
            this._proportionallyResizeElements.push(
              this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block",
              })
            ),
            this.originalElement.css({
              margin: this.originalElement.css("margin"),
            }),
            this._proportionallyResize()),
          (this.handles =
            j.handles ||
            (b(".ui-resizable-handle", this.element).length
              ? {
                  n: ".ui-resizable-n",
                  e: ".ui-resizable-e",
                  s: ".ui-resizable-s",
                  w: ".ui-resizable-w",
                  se: ".ui-resizable-se",
                  sw: ".ui-resizable-sw",
                  ne: ".ui-resizable-ne",
                  nw: ".ui-resizable-nw",
                }
              : "e,s,se")),
          (this._handles = b()),
          this.handles.constructor === String)
        )
          for (
            "all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"),
              a = this.handles.split(","),
              this.handles = {},
              c = 0;
            c < a.length;
            c++
          )
            (d = b.trim(a[c])),
              (f = b(
                "<div class='ui-resizable-handle ui-resizable-" + d + "'></div>"
              )).css({ zIndex: j.zIndex }),
              "se" === d && f.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),
              (this.handles[d] = ".ui-resizable-" + d),
              this.element.append(f);
        (this._renderAxis = function (a) {
          var c, d, f, j;
          for (c in ((a = a || this.element), this.handles))
            this.handles[c].constructor === String
              ? (this.handles[c] = this.element
                  .children(this.handles[c])
                  .first()
                  .show())
              : (this.handles[c].jquery || this.handles[c].nodeType) &&
                ((this.handles[c] = b(this.handles[c])),
                this._on(this.handles[c], { mousedown: g._mouseDown })),
              this.elementIsWrapper &&
                this.originalElement[0].nodeName.match(
                  /^(textarea|input|select|button)$/i
                ) &&
                ((d = b(this.handles[c], this.element)),
                (j = /sw|ne|nw|se|n|s/.test(c)
                  ? d.outerHeight()
                  : d.outerWidth()),
                (f = [
                  "padding",
                  /ne|nw|n/.test(c)
                    ? "Top"
                    : /se|sw|s/.test(c)
                    ? "Bottom"
                    : /^e$/.test(c)
                    ? "Right"
                    : "Left",
                ].join("")),
                a.css(f, j),
                this._proportionallyResize()),
              (this._handles = this._handles.add(this.handles[c]));
        }),
          this._renderAxis(this.element),
          (this._handles = this._handles.add(
            this.element.find(".ui-resizable-handle")
          )),
          this._handles.disableSelection(),
          this._handles.mouseover(function () {
            g.resizing ||
              (this.className &&
                (f = this.className.match(
                  /ui-resizable-(se|sw|ne|nw|n|e|s|w)/i
                )),
              (g.axis = f && f[1] ? f[1] : "se"));
          }),
          j.autoHide &&
            (this._handles.hide(),
            b(this.element)
              .addClass("ui-resizable-autohide")
              .mouseenter(function () {
                j.disabled ||
                  (b(this).removeClass("ui-resizable-autohide"),
                  g._handles.show());
              })
              .mouseleave(function () {
                j.disabled ||
                  g.resizing ||
                  (b(this).addClass("ui-resizable-autohide"),
                  g._handles.hide());
              })),
          this._mouseInit();
      },
      _destroy: function () {
        function a(a) {
          b(a)
            .removeClass(
              "ui-resizable ui-resizable-disabled ui-resizable-resizing"
            )
            .removeData("resizable")
            .removeData("ui-resizable")
            .unbind(".resizable")
            .find(".ui-resizable-handle")
            .remove();
        }
        this._mouseDestroy();
        var c;
        return (
          this.elementIsWrapper &&
            (a(this.element),
            (c = this.element),
            this.originalElement
              .css({
                position: c.css("position"),
                width: c.outerWidth(),
                height: c.outerHeight(),
                top: c.css("top"),
                left: c.css("left"),
              })
              .insertAfter(c),
            c.remove()),
          this.originalElement.css("resize", this.originalResizeStyle),
          a(this.originalElement),
          this
        );
      },
      _mouseCapture: function (a) {
        var c,
          d,
          f = !1;
        for (c in this.handles)
          ((d = b(this.handles[c])[0]) === a.target ||
            b.contains(d, a.target)) &&
            (f = !0);
        return !this.options.disabled && f;
      },
      _mouseStart: function (a) {
        var c,
          d,
          f,
          g = this.options,
          h = this.element;
        return (
          (this.resizing = !0),
          this._renderProxy(),
          (c = this._num(this.helper.css("left"))),
          (d = this._num(this.helper.css("top"))),
          g.containment &&
            ((c += b(g.containment).scrollLeft() || 0),
            (d += b(g.containment).scrollTop() || 0)),
          (this.offset = this.helper.offset()),
          (this.position = { left: c, top: d }),
          (this.size = this._helper
            ? { width: this.helper.width(), height: this.helper.height() }
            : { width: h.width(), height: h.height() }),
          (this.originalSize = this._helper
            ? { width: h.outerWidth(), height: h.outerHeight() }
            : { width: h.width(), height: h.height() }),
          (this.sizeDiff = {
            width: h.outerWidth() - h.width(),
            height: h.outerHeight() - h.height(),
          }),
          (this.originalPosition = { left: c, top: d }),
          (this.originalMousePosition = { left: a.pageX, top: a.pageY }),
          (this.aspectRatio =
            "number" == typeof g.aspectRatio
              ? g.aspectRatio
              : this.originalSize.width / this.originalSize.height || 1),
          (f = b(".ui-resizable-" + this.axis).css("cursor")),
          b("body").css("cursor", "auto" === f ? this.axis + "-resize" : f),
          h.addClass("ui-resizable-resizing"),
          this._propagate("start", a),
          !0
        );
      },
      _mouseDrag: function (c) {
        var d,
          f,
          g = this.originalMousePosition,
          j = this.axis,
          h = c.pageX - g.left || 0,
          k = c.pageY - g.top || 0,
          l = this._change[j];
        return (
          this._updatePrevProperties(),
          l &&
            ((d = l.apply(this, [c, h, k])),
            this._updateVirtualBoundaries(c.shiftKey),
            (this._aspectRatio || c.shiftKey) && (d = this._updateRatio(d, c)),
            (d = this._respectSize(d, c)),
            this._updateCache(d),
            this._propagate("resize", c),
            (f = this._applyChanges()),
            !this._helper &&
              this._proportionallyResizeElements.length &&
              this._proportionallyResize(),
            b.isEmptyObject(f) ||
              (this._updatePrevProperties(),
              this._trigger("resize", c, this.ui()),
              this._applyChanges())),
          !1
        );
      },
      _mouseStop: function (c) {
        this.resizing = !1;
        var d,
          f,
          g,
          j,
          k,
          m,
          p,
          q = this.options,
          l = this;
        return (
          this._helper &&
            ((g =
              (f =
                (d = this._proportionallyResizeElements).length &&
                /textarea/i.test(d[0].nodeName)) &&
              this._hasScroll(d[0], "left")
                ? 0
                : l.sizeDiff.height),
            (j = f ? 0 : l.sizeDiff.width),
            (k = {
              width: l.helper.width() - j,
              height: l.helper.height() - g,
            }),
            (m =
              parseInt(l.element.css("left"), 10) +
                (l.position.left - l.originalPosition.left) || null),
            (p =
              parseInt(l.element.css("top"), 10) +
                (l.position.top - l.originalPosition.top) || null),
            q.animate || this.element.css(b.extend(k, { top: p, left: m })),
            l.helper.height(l.size.height),
            l.helper.width(l.size.width),
            this._helper && !q.animate && this._proportionallyResize()),
          b("body").css("cursor", "auto"),
          this.element.removeClass("ui-resizable-resizing"),
          this._propagate("stop", c),
          this._helper && this.helper.remove(),
          !1
        );
      },
      _updatePrevProperties: function () {
        (this.prevPosition = {
          top: this.position.top,
          left: this.position.left,
        }),
          (this.prevSize = {
            width: this.size.width,
            height: this.size.height,
          });
      },
      _applyChanges: function () {
        var a = {};
        return (
          this.position.top !== this.prevPosition.top &&
            (a.top = this.position.top + "px"),
          this.position.left !== this.prevPosition.left &&
            (a.left = this.position.left + "px"),
          this.size.width !== this.prevSize.width &&
            (a.width = this.size.width + "px"),
          this.size.height !== this.prevSize.height &&
            (a.height = this.size.height + "px"),
          this.helper.css(a),
          a
        );
      },
      _updateVirtualBoundaries: function (a) {
        var b,
          c,
          d,
          f,
          g,
          j = this.options;
        (g = {
          minWidth: this._isNumber(j.minWidth) ? j.minWidth : 0,
          maxWidth: this._isNumber(j.maxWidth) ? j.maxWidth : 1 / 0,
          minHeight: this._isNumber(j.minHeight) ? j.minHeight : 0,
          maxHeight: this._isNumber(j.maxHeight) ? j.maxHeight : 1 / 0,
        }),
          (this._aspectRatio || a) &&
            ((b = g.minHeight * this.aspectRatio),
            (d = g.minWidth / this.aspectRatio),
            (c = g.maxHeight * this.aspectRatio),
            (f = g.maxWidth / this.aspectRatio),
            b > g.minWidth && (g.minWidth = b),
            d > g.minHeight && (g.minHeight = d),
            c < g.maxWidth && (g.maxWidth = c),
            f < g.maxHeight && (g.maxHeight = f)),
          (this._vBoundaries = g);
      },
      _updateCache: function (a) {
        (this.offset = this.helper.offset()),
          this._isNumber(a.left) && (this.position.left = a.left),
          this._isNumber(a.top) && (this.position.top = a.top),
          this._isNumber(a.height) && (this.size.height = a.height),
          this._isNumber(a.width) && (this.size.width = a.width);
      },
      _updateRatio: function (a) {
        var b = this.position,
          c = this.size,
          d = this.axis;
        return (
          this._isNumber(a.height)
            ? (a.width = a.height * this.aspectRatio)
            : this._isNumber(a.width) &&
              (a.height = a.width / this.aspectRatio),
          "sw" === d &&
            ((a.left = b.left + (c.width - a.width)), (a.top = null)),
          "nw" === d &&
            ((a.top = b.top + (c.height - a.height)),
            (a.left = b.left + (c.width - a.width))),
          a
        );
      },
      _respectSize: function (b) {
        var c = this._vBoundaries,
          d = this.axis,
          e = this._isNumber(b.width) && c.maxWidth && c.maxWidth < b.width,
          f = this._isNumber(b.height) && c.maxHeight && c.maxHeight < b.height,
          g = this._isNumber(b.width) && c.minWidth && c.minWidth > b.width,
          h = this._isNumber(b.height) && c.minHeight && c.minHeight > b.height,
          i = this.originalPosition.left + this.originalSize.width,
          a = this.position.top + this.size.height,
          j = /sw|nw|w/.test(d),
          k = /nw|ne|n/.test(d);
        return (
          g && (b.width = c.minWidth),
          h && (b.height = c.minHeight),
          e && (b.width = c.maxWidth),
          f && (b.height = c.maxHeight),
          g && j && (b.left = i - c.minWidth),
          e && j && (b.left = i - c.maxWidth),
          h && k && (b.top = a - c.minHeight),
          f && k && (b.top = a - c.maxHeight),
          b.width || b.height || b.left || !b.top
            ? b.width || b.height || b.top || !b.left || (b.left = null)
            : (b.top = null),
          b
        );
      },
      _getPaddingPlusBorderDimensions: function (a) {
        for (
          var b = 0,
            c = [],
            d = [
              a.css("borderTopWidth"),
              a.css("borderRightWidth"),
              a.css("borderBottomWidth"),
              a.css("borderLeftWidth"),
            ],
            e = [
              a.css("paddingTop"),
              a.css("paddingRight"),
              a.css("paddingBottom"),
              a.css("paddingLeft"),
            ];
          4 > b;
          b++
        )
          (c[b] = parseInt(d[b], 10) || 0), (c[b] += parseInt(e[b], 10) || 0);
        return { height: c[0] + c[2], width: c[1] + c[3] };
      },
      _proportionallyResize: function () {
        if (this._proportionallyResizeElements.length)
          for (
            var a, b = 0, c = this.helper || this.element;
            b < this._proportionallyResizeElements.length;
            b++
          )
            (a = this._proportionallyResizeElements[b]),
              this.outerDimensions ||
                (this.outerDimensions =
                  this._getPaddingPlusBorderDimensions(a)),
              a.css({
                height: c.height() - this.outerDimensions.height || 0,
                width: c.width() - this.outerDimensions.width || 0,
              });
      },
      _renderProxy: function () {
        var a = this.element,
          c = this.options;
        (this.elementOffset = a.offset()),
          this._helper
            ? ((this.helper =
                this.helper || b("<div style='overflow:hidden;'></div>")),
              this.helper.addClass(this._helper).css({
                width: this.element.outerWidth() - 1,
                height: this.element.outerHeight() - 1,
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++c.zIndex,
              }),
              this.helper.appendTo("body").disableSelection())
            : (this.helper = this.element);
      },
      _change: {
        e: function (a, b) {
          return { width: this.originalSize.width + b };
        },
        w: function (a, b) {
          var c = this.originalSize;
          return { left: this.originalPosition.left + b, width: c.width - b };
        },
        n: function (a, b, c) {
          var d = this.originalSize;
          return { top: this.originalPosition.top + c, height: d.height - c };
        },
        s: function (a, b, c) {
          return { height: this.originalSize.height + c };
        },
        se: function (a, c, d) {
          return b.extend(
            this._change.s.apply(this, arguments),
            this._change.e.apply(this, [a, c, d])
          );
        },
        sw: function (a, c, d) {
          return b.extend(
            this._change.s.apply(this, arguments),
            this._change.w.apply(this, [a, c, d])
          );
        },
        ne: function (a, c, d) {
          return b.extend(
            this._change.n.apply(this, arguments),
            this._change.e.apply(this, [a, c, d])
          );
        },
        nw: function (a, c, d) {
          return b.extend(
            this._change.n.apply(this, arguments),
            this._change.w.apply(this, [a, c, d])
          );
        },
      },
      _propagate: function (a, c) {
        b.ui.plugin.call(this, a, [c, this.ui()]),
          "resize" !== a && this._trigger(a, c, this.ui());
      },
      plugins: {},
      ui: function () {
        return {
          originalElement: this.originalElement,
          element: this.element,
          helper: this.helper,
          position: this.position,
          size: this.size,
          originalSize: this.originalSize,
          originalPosition: this.originalPosition,
        };
      },
    }),
    b.ui.plugin.add("resizable", "animate", {
      stop: function (c) {
        var d = b(this).resizable("instance"),
          e = d.options,
          f = d._proportionallyResizeElements,
          g = f.length && /textarea/i.test(f[0].nodeName),
          h = g && d._hasScroll(f[0], "left") ? 0 : d.sizeDiff.height,
          i = g ? 0 : d.sizeDiff.width,
          j = { width: d.size.width - i, height: d.size.height - h },
          a =
            parseInt(d.element.css("left"), 10) +
              (d.position.left - d.originalPosition.left) || null,
          k =
            parseInt(d.element.css("top"), 10) +
              (d.position.top - d.originalPosition.top) || null;
        d.element.animate(b.extend(j, k && a ? { top: k, left: a } : {}), {
          duration: e.animateDuration,
          easing: e.animateEasing,
          step: function () {
            var a = {
              width: parseInt(d.element.css("width"), 10),
              height: parseInt(d.element.css("height"), 10),
              top: parseInt(d.element.css("top"), 10),
              left: parseInt(d.element.css("left"), 10),
            };
            f && f.length && b(f[0]).css({ width: a.width, height: a.height }),
              d._updateCache(a),
              d._propagate("resize", c);
          },
        });
      },
    }),
    b.ui.plugin.add("resizable", "containment", {
      start: function () {
        var c,
          f,
          g,
          j,
          k,
          m,
          q,
          u = b(this).resizable("instance"),
          a = u.options,
          l = u.element,
          r = a.containment,
          p =
            r instanceof b
              ? r.get(0)
              : /parent/.test(r)
              ? l.parent().get(0)
              : r;
        p &&
          ((u.containerElement = b(p)),
          /document/.test(r) || r === document
            ? ((u.containerOffset = { left: 0, top: 0 }),
              (u.containerPosition = { left: 0, top: 0 }),
              (u.parentData = {
                element: b(document),
                left: 0,
                top: 0,
                width: b(document).width(),
                height:
                  b(document).height() || document.body.parentNode.scrollHeight,
              }))
            : ((c = b(p)),
              (f = []),
              b(["Top", "Right", "Left", "Bottom"]).each(function (a, b) {
                f[a] = u._num(c.css("padding" + b));
              }),
              (u.containerOffset = c.offset()),
              (u.containerPosition = c.position()),
              (u.containerSize = {
                height: c.innerHeight() - f[3],
                width: c.innerWidth() - f[1],
              }),
              (g = u.containerOffset),
              (j = u.containerSize.height),
              (k = u.containerSize.width),
              (m = u._hasScroll(p, "left") ? p.scrollWidth : k),
              (q = u._hasScroll(p) ? p.scrollHeight : j),
              (u.parentData = {
                element: p,
                left: g.left,
                top: g.top,
                width: m,
                height: q,
              })));
      },
      resize: function (c) {
        var f,
          j,
          k,
          m,
          q = b(this).resizable("instance"),
          n = q.options,
          o = q.containerOffset,
          a = q.position,
          l = q._aspectRatio || c.shiftKey,
          r = { top: 0, left: 0 },
          t = q.containerElement,
          d = !0;
        t[0] !== document && /static/.test(t.css("position")) && (r = o),
          a.left < (q._helper ? o.left : 0) &&
            ((q.size.width += q._helper
              ? q.position.left - o.left
              : q.position.left - r.left),
            l && ((q.size.height = q.size.width / q.aspectRatio), (d = !1)),
            (q.position.left = n.helper ? o.left : 0)),
          a.top < (q._helper ? o.top : 0) &&
            ((q.size.height += q._helper
              ? q.position.top - o.top
              : q.position.top),
            l && ((q.size.width = q.size.height * q.aspectRatio), (d = !1)),
            (q.position.top = q._helper ? o.top : 0)),
          (k = q.containerElement.get(0) === q.element.parent().get(0)),
          (m = /relative|absolute/.test(q.containerElement.css("position"))),
          k && m
            ? ((q.offset.left = q.parentData.left + q.position.left),
              (q.offset.top = q.parentData.top + q.position.top))
            : ((q.offset.left = q.element.offset().left),
              (q.offset.top = q.element.offset().top)),
          (f = Math.abs(
            q.sizeDiff.width +
              (q._helper ? q.offset.left - r.left : q.offset.left - o.left)
          )),
          (j = Math.abs(
            q.sizeDiff.height +
              (q._helper ? q.offset.top - r.top : q.offset.top - o.top)
          )),
          f + q.size.width >= q.parentData.width &&
            ((q.size.width = q.parentData.width - f),
            l && ((q.size.height = q.size.width / q.aspectRatio), (d = !1))),
          j + q.size.height >= q.parentData.height &&
            ((q.size.height = q.parentData.height - j),
            l && ((q.size.width = q.size.height * q.aspectRatio), (d = !1))),
          d ||
            ((q.position.left = q.prevPosition.left),
            (q.position.top = q.prevPosition.top),
            (q.size.width = q.prevSize.width),
            (q.size.height = q.prevSize.height));
      },
      stop: function () {
        var c = b(this).resizable("instance"),
          d = c.options,
          f = c.containerOffset,
          e = c.containerPosition,
          g = c.containerElement,
          h = b(c.helper),
          i = h.offset(),
          j = h.outerWidth() - c.sizeDiff.width,
          a = h.outerHeight() - c.sizeDiff.height;
        c._helper &&
          !d.animate &&
          /relative/.test(g.css("position")) &&
          b(this).css({ left: i.left - e.left - f.left, width: j, height: a }),
          c._helper &&
            !d.animate &&
            /static/.test(g.css("position")) &&
            b(this).css({
              left: i.left - e.left - f.left,
              width: j,
              height: a,
            });
      },
    }),
    b.ui.plugin.add("resizable", "alsoResize", {
      start: function () {
        var a = b(this).resizable("instance").options;
        b(a.alsoResize).each(function () {
          var a = b(this);
          a.data("ui-resizable-alsoresize", {
            width: parseInt(a.width(), 10),
            height: parseInt(a.height(), 10),
            left: parseInt(a.css("left"), 10),
            top: parseInt(a.css("top"), 10),
          });
        });
      },
      resize: function (a, c) {
        var d = b(this).resizable("instance"),
          e = d.options,
          f = d.originalSize,
          g = d.originalPosition,
          j = {
            height: d.size.height - f.height || 0,
            width: d.size.width - f.width || 0,
            top: d.position.top - g.top || 0,
            left: d.position.left - g.left || 0,
          };
        b(e.alsoResize).each(function () {
          var a = b(this),
            d = b(this).data("ui-resizable-alsoresize"),
            f = {},
            e = a.parents(c.originalElement[0]).length
              ? ["width", "height"]
              : ["width", "height", "top", "left"];
          b.each(e, function (a, b) {
            var c = (d[b] || 0) + (j[b] || 0);
            c && 0 <= c && (f[b] = c || null);
          }),
            a.css(f);
        });
      },
      stop: function () {
        b(this).removeData("resizable-alsoresize");
      },
    }),
    b.ui.plugin.add("resizable", "ghost", {
      start: function () {
        var a = b(this).resizable("instance"),
          c = a.options,
          d = a.size;
        (a.ghost = a.originalElement.clone()),
          a.ghost
            .css({
              opacity: 0.25,
              display: "block",
              position: "relative",
              height: d.height,
              width: d.width,
              margin: 0,
              left: 0,
              top: 0,
            })
            .addClass("ui-resizable-ghost")
            .addClass("string" == typeof c.ghost ? c.ghost : ""),
          a.ghost.appendTo(a.helper);
      },
      resize: function () {
        var a = b(this).resizable("instance");
        a.ghost &&
          a.ghost.css({
            position: "relative",
            height: a.size.height,
            width: a.size.width,
          });
      },
      stop: function () {
        var a = b(this).resizable("instance");
        a.ghost && a.helper && a.helper.get(0).removeChild(a.ghost.get(0));
      },
    }),
    b.ui.plugin.add("resizable", "grid", {
      resize: function () {
        var j,
          k = b(this).resizable("instance"),
          i = k.options,
          e = k.size,
          q = k.originalSize,
          h = k.originalPosition,
          n = k.axis,
          o = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid,
          a = o[0] || 1,
          l = o[1] || 1,
          r = Math.round((e.width - q.width) / a) * a,
          p = Math.round((e.height - q.height) / l) * l,
          d = q.width + r,
          s = q.height + p,
          v = i.maxWidth && i.maxWidth < d,
          m = i.maxHeight && i.maxHeight < s,
          f = i.minWidth && i.minWidth > d,
          c = i.minHeight && i.minHeight > s;
        (i.grid = o),
          f && (d += a),
          c && (s += l),
          v && (d -= a),
          m && (s -= l),
          /^(se|s|e)$/.test(n)
            ? ((k.size.width = d), (k.size.height = s))
            : /^(ne)$/.test(n)
            ? ((k.size.width = d),
              (k.size.height = s),
              (k.position.top = h.top - p))
            : /^(sw)$/.test(n)
            ? ((k.size.width = d),
              (k.size.height = s),
              (k.position.left = h.left - r))
            : ((0 >= s - l || 0 >= d - a) &&
                (j = k._getPaddingPlusBorderDimensions(this)),
              0 < s - l
                ? ((k.size.height = s), (k.position.top = h.top - p))
                : ((s = l - j.height),
                  (k.size.height = s),
                  (k.position.top = h.top + q.height - s)),
              0 < d - a
                ? ((k.size.width = d), (k.position.left = h.left - r))
                : ((d = a - j.width),
                  (k.size.width = d),
                  (k.position.left = h.left + q.width - d)));
      },
    }),
    b.ui.resizable
  );
}),
  !(function (b, j) {
    function e(b) {
      for (var c, d = b.split(/\s+/), e = [], a = 0; (c = d[a]); a++)
        (c = c[0].toUpperCase()), e.push(c);
      return e;
    }
    function k(a) {
      return (a.id && b('label[for="' + a.id + '"]').val()) || a.name;
    }
    function a(d, c, e) {
      return (
        e || (e = 0),
        c.each(function () {
          var f,
            g,
            h = b(this),
            m = this,
            n = this.nodeName.toLowerCase();
          switch (
            ("label" == n &&
              h.find("input, textarea, select").length &&
              ((f = h.text()),
              (h = h.children().first()),
              (m = h.get(0)),
              (n = m.nodeName.toLowerCase())),
            n)
          ) {
            case "menu":
              (g = { name: h.attr("label"), items: {} }),
                (e = a(g.items, h.children(), e));
              break;
            case "a":
            case "button":
              g = {
                name: h.text(),
                disabled: !!h.attr("disabled"),
                callback: function () {
                  h.click();
                },
              };
              break;
            case "menuitem":
            case "command":
              switch (h.attr("type")) {
                case j:
                case "command":
                case "menuitem":
                  g = {
                    name: h.attr("label"),
                    disabled: !!h.attr("disabled"),
                    callback: function () {
                      h.click();
                    },
                  };
                  break;
                case "checkbox":
                  g = {
                    type: "checkbox",
                    disabled: !!h.attr("disabled"),
                    name: h.attr("label"),
                    selected: !!h.attr("checked"),
                  };
                  break;
                case "radio":
                  g = {
                    type: "radio",
                    disabled: !!h.attr("disabled"),
                    name: h.attr("label"),
                    radio: h.attr("radiogroup"),
                    value: h.attr("id"),
                    selected: !!h.attr("checked"),
                  };
                  break;
                default:
                  g = j;
              }
              break;
            case "hr":
              g = "-------";
              break;
            case "input":
              switch (h.attr("type")) {
                case "text":
                  g = {
                    type: "text",
                    name: f || k(m),
                    disabled: !!h.attr("disabled"),
                    value: h.val(),
                  };
                  break;
                case "checkbox":
                  g = {
                    type: "checkbox",
                    name: f || k(m),
                    disabled: !!h.attr("disabled"),
                    selected: !!h.attr("checked"),
                  };
                  break;
                case "radio":
                  g = {
                    type: "radio",
                    name: f || k(m),
                    disabled: !!h.attr("disabled"),
                    radio: !!h.attr("name"),
                    value: h.val(),
                    selected: !!h.attr("checked"),
                  };
                  break;
                default:
                  g = j;
              }
              break;
            case "select":
              (g = {
                type: "select",
                name: f || k(m),
                disabled: !!h.attr("disabled"),
                selected: h.val(),
                options: {},
              }),
                h.children().each(function () {
                  g.options[this.value] = b(this).text();
                });
              break;
            case "textarea":
              g = {
                type: "textarea",
                name: f || k(m),
                disabled: !!h.attr("disabled"),
                value: h.val(),
              };
              break;
            case "label":
              break;
            default:
              g = { type: "html", html: h.clone(!0) };
          }
          g && (e++, (d["key" + e] = g));
        }),
        e
      );
    }
    if (
      ((b.support.htmlMenuitem = "HTMLMenuItemElement" in window),
      (b.support.htmlCommand = "HTMLCommandElement" in window),
      (b.support.eventSelectstart =
        "onselectstart" in document.documentElement),
      !b.ui || !b.ui.widget)
    ) {
      var o = b.cleanData;
      b.cleanData = function (c) {
        for (var d, e = 0; null != (d = c[e]); e++)
          try {
            b(d).triggerHandler("remove");
          } catch (a) {}
        o(c);
      };
    }
    var q = null,
      t = !1,
      v = b(window),
      w = 0,
      y = {},
      z = {},
      n = {},
      A = {
        selector: null,
        appendTo: null,
        trigger: "right",
        autoHide: !1,
        delay: 0,
        reposition: !0,
        determinePosition: function (a) {
          if (b.ui && b.ui.position)
            a.css("display", "block")
              .position({
                my: "center top",
                at: "center bottom",
                of: this,
                offset: "0 5",
                collision: "fit",
              })
              .css("display", "none");
          else {
            var c = this.offset();
            (c.top += this.outerHeight()),
              (c.left += this.outerWidth() / 2 - a.outerWidth() / 2),
              a.css(c);
          }
        },
        position: function (e, f, g) {
          var h;
          if (f || g) {
            if ("maintain" === f && "maintain" === g) h = e.$menu.position();
            else {
              var j = b(b("#iframe").contents().get(0)),
                i = j.find("body");
              b(document.body).add(i),
                (h = { top: (g -= j.scrollTop()), left: f });
            }
            var k = v.scrollTop() + v.height(),
              c = v.scrollLeft() + v.width(),
              l = e.$menu.height(),
              m = e.$menu.width();
            h.top + l > k && (h.top -= l),
              h.left + m > c && (h.left -= m),
              e.$menu.css(h);
          } else e.determinePosition.call(this, e.$menu);
        },
        positionSubmenu: function (a) {
          if (b.ui && b.ui.position)
            a.css("display", "block")
              .position({
                my: "left top",
                at: "right top",
                of: this,
                collision: "flipfit fit",
              })
              .css("display", "");
          else {
            var c = { top: 0, left: this.outerWidth() };
            a.css(c);
          }
        },
        zIndex: 1,
        animation: { duration: 0, show: "show", hide: "hide" },
        events: { show: b.noop, hide: b.noop },
        callback: null,
        items: {},
      },
      i = { timer: null, pageX: null, pageY: null },
      h = function (a) {
        for (
          var b = 0, c = a;
          (b = Math.max(b, parseInt(c.css("z-index"), 10) || 0)),
            (c = c.parent()) &&
              c.length &&
              !(-1 < "html body".indexOf(c.prop("nodeName").toLowerCase()));

        );
        return b;
      },
      f = {
        abortevent: function (a) {
          a.preventDefault(), a.stopImmediatePropagation();
        },
        contextmenu: function (c) {
          var d = b(this);
          if (
            (c.preventDefault(),
            c.stopImmediatePropagation(),
            !(
              ("right" != c.data.trigger && c.originalEvent) ||
              d.hasClass("context-menu-active") ||
              d.hasClass("context-menu-disabled")
            ))
          ) {
            if (((q = d), c.data.build)) {
              var e = c.data.build(q, c);
              if (!1 === e) return;
              if (
                ((c.data = b.extend(!0, {}, A, c.data, e || {})),
                !c.data.items || b.isEmptyObject(c.data.items))
              )
                throw (
                  (window.console &&
                    (console.error || console.log)(
                      "No items specified to show in contextMenu"
                    ),
                  new Error("No Items specified"))
                );
              (c.data.$trigger = q), p.create(c.data);
            }
            p.show.call(d, c.data, c.pageX, c.pageY);
          }
        },
        click: function (a) {
          a.preventDefault(),
            a.stopImmediatePropagation(),
            b(this).trigger(
              b.Event("contextmenu", {
                data: a.data,
                pageX: a.pageX,
                pageY: a.pageY,
              })
            );
        },
        mousedown: function (a) {
          var c = b(this);
          q &&
            q.length &&
            !q.is(c) &&
            q.data("contextMenu").$menu.trigger("contextmenu:hide"),
            2 == a.button && (q = c.data("contextMenuActive", !0));
        },
        mouseup: function (a) {
          var c = b(this);
          c.data("contextMenuActive") &&
            q &&
            q.length &&
            q.is(c) &&
            !c.hasClass("context-menu-disabled") &&
            (a.preventDefault(),
            a.stopImmediatePropagation(),
            (q = c),
            c.trigger(
              b.Event("contextmenu", {
                data: a.data,
                pageX: a.pageX,
                pageY: a.pageY,
              })
            )),
            c.removeData("contextMenuActive");
        },
        mouseenter: function (c) {
          var d = b(this),
            e = b(c.relatedTarget),
            a = b(document);
          e.is(".context-menu-list") ||
            e.closest(".context-menu-list").length ||
            (q && q.length) ||
            ((i.pageX = c.pageX),
            (i.pageY = c.pageY),
            (i.data = c.data),
            a.on("mousemove.contextMenuShow", f.mousemove),
            (i.timer = setTimeout(function () {
              (i.timer = null),
                a.off("mousemove.contextMenuShow"),
                (q = d),
                d.trigger(
                  b.Event("contextmenu", {
                    data: i.data,
                    pageX: i.pageX,
                    pageY: i.pageY,
                  })
                );
            }, c.data.delay)));
        },
        mousemove: function (a) {
          (i.pageX = a.pageX), (i.pageY = a.pageY);
        },
        mouseleave: function (a) {
          var c = b(a.relatedTarget);
          if (
            !c.is(".context-menu-list") &&
            !c.closest(".context-menu-list").length
          ) {
            try {
              clearTimeout(i.timer);
            } catch (a) {}
            i.timer = null;
          }
        },
        layerClick: function (d) {
          var e,
            f,
            g = b(this).data("contextMenuRoot"),
            h = d.button,
            i = d.pageX,
            j = d.pageY;
          d.preventDefault(),
            d.stopImmediatePropagation(),
            setTimeout(function () {
              var a,
                c =
                  ("left" == g.trigger && 0 === h) ||
                  ("right" == g.trigger && 2 === h);
              if (
                (document.elementFromPoint &&
                  (g.$layer.hide(),
                  (e = document.elementFromPoint(
                    i - v.scrollLeft(),
                    j - v.scrollTop()
                  )),
                  g.$layer.show()),
                g.reposition && c)
              )
                if (document.elementFromPoint) {
                  if (g.$trigger.is(e) || g.$trigger.has(e).length)
                    return void g.position.call(g.$trigger, g, i, j);
                } else if (
                  ((f = g.$trigger.offset()),
                  (a = b(window)),
                  (f.top += a.scrollTop()),
                  f.top <= d.pageY &&
                    ((f.left += a.scrollLeft()),
                    f.left <= d.pageX &&
                      ((f.bottom = f.top + g.$trigger.outerHeight()),
                      f.bottom >= d.pageY &&
                        ((f.right = f.left + g.$trigger.outerWidth()),
                        f.right >= d.pageX))))
                )
                  return void g.position.call(g.$trigger, g, i, j);
              e &&
                c &&
                g.$trigger.one("contextmenu:hidden", function () {
                  b(e).contextMenu({ x: i, y: j });
                }),
                g.$menu.trigger("contextmenu:hide");
            }, 1);
        },
        keyStop: function (a, b) {
          b.isInput || a.preventDefault(), a.stopPropagation();
        },
        key: function (b) {
          var c = q.data("contextMenu") || {};
          switch (b.keyCode) {
            case 9:
            case 38:
              if ((f.keyStop(b, c), c.isInput)) {
                if (9 == b.keyCode && b.shiftKey)
                  return (
                    b.preventDefault(),
                    c.$selected &&
                      c.$selected.find("input, textarea, select").blur(),
                    void c.$menu.trigger("prevcommand")
                  );
                if (
                  38 == b.keyCode &&
                  "checkbox" ==
                    c.$selected.find("input, textarea, select").prop("type")
                )
                  return void b.preventDefault();
              } else if (9 != b.keyCode || b.shiftKey)
                return void c.$menu.trigger("prevcommand");
            case 40:
              if ((f.keyStop(b, c), !c.isInput))
                return void c.$menu.trigger("nextcommand");
              if (9 == b.keyCode)
                return (
                  b.preventDefault(),
                  c.$selected &&
                    c.$selected.find("input, textarea, select").blur(),
                  void c.$menu.trigger("nextcommand")
                );
              if (
                40 == b.keyCode &&
                "checkbox" ==
                  c.$selected.find("input, textarea, select").prop("type")
              )
                return void b.preventDefault();
              break;
            case 37:
              if (
                (f.keyStop(b, c),
                c.isInput || !c.$selected || !c.$selected.length)
              )
                break;
              if (!c.$selected.parent().hasClass("context-menu-root")) {
                var d = c.$selected.parent().parent();
                return (
                  c.$selected.trigger("contextmenu:blur"),
                  void (c.$selected = d)
                );
              }
              break;
            case 39:
              if (
                (f.keyStop(b, c),
                c.isInput || !c.$selected || !c.$selected.length)
              )
                break;
              var e = c.$selected.data("contextMenu") || {};
              if (e.$menu && c.$selected.hasClass("context-menu-submenu"))
                return (
                  (c.$selected = null),
                  (e.$selected = null),
                  void e.$menu.trigger("nextcommand")
                );
              break;
            case 35:
            case 36:
              return c.$selected &&
                c.$selected.find("input, textarea, select").length
                ? void 0
                : (((c.$selected && c.$selected.parent()) || c.$menu)
                    .children(":not(.disabled, .not-selectable)")
                    [36 == b.keyCode ? "first" : "last"]()
                    .trigger("contextmenu:focus"),
                  void b.preventDefault());
            case 13:
              if ((f.keyStop(b, c), c.isInput)) {
                if (c.$selected && !c.$selected.is("textarea, select"))
                  return void b.preventDefault();
                break;
              }
              return void (c.$selected && c.$selected.trigger("mouseup"));
            case 32:
            case 33:
            case 34:
              return void f.keyStop(b, c);
            case 27:
              return f.keyStop(b, c), void c.$menu.trigger("contextmenu:hide");
            default:
              var a = String.fromCharCode(b.keyCode).toUpperCase();
              if (c.accesskeys[a])
                return void c.accesskeys[a].$node.trigger(
                  c.accesskeys[a].$menu ? "contextmenu:focus" : "mouseup"
                );
          }
          b.stopPropagation(), c.$selected && c.$selected.trigger(b);
        },
        prevItem: function (d) {
          d.stopPropagation();
          var e = b(this).data("contextMenu") || {};
          if (e.$selected) {
            var g = e.$selected;
            (e = e.$selected.parent().data("contextMenu") || {}).$selected = g;
          }
          for (
            var a = e.$menu.children(),
              h =
                e.$selected && e.$selected.prev().length
                  ? e.$selected.prev()
                  : a.last(),
              j = h;
            h.hasClass("disabled") || h.hasClass("not-selectable");

          )
            if ((h = h.prev().length ? h.prev() : a.last()).is(j)) return;
          e.$selected && f.itemMouseleave.call(e.$selected.get(0), d),
            f.itemMouseenter.call(h.get(0), d);
          var k = h.find("input, textarea, select");
          k.length && k.focus();
        },
        nextItem: function (d) {
          d.stopPropagation();
          var e = b(this).data("contextMenu") || {};
          if (e.$selected) {
            var g = e.$selected;
            (e = e.$selected.parent().data("contextMenu") || {}).$selected = g;
          }
          for (
            var a = e.$menu.children(),
              h =
                e.$selected && e.$selected.next().length
                  ? e.$selected.next()
                  : a.first(),
              j = h;
            h.hasClass("disabled") || h.hasClass("not-selectable");

          )
            if ((h = h.next().length ? h.next() : a.first()).is(j)) return;
          e.$selected && f.itemMouseleave.call(e.$selected.get(0), d),
            f.itemMouseenter.call(h.get(0), d);
          var k = h.find("input, textarea, select");
          k.length && k.focus();
        },
        focusInput: function () {
          var c = b(this).closest(".context-menu-item"),
            d = c.data(),
            e = d.contextMenu,
            a = d.contextMenuRoot;
          (a.$selected = e.$selected = c), (a.isInput = e.isInput = !0);
        },
        blurInput: function () {
          var a = b(this).closest(".context-menu-item").data(),
            c = a.contextMenu;
          a.contextMenuRoot.isInput = c.isInput = !1;
        },
        menuMouseenter: function () {
          b(this).data().contextMenuRoot.hovering = !0;
        },
        menuMouseleave: function (a) {
          var c = b(this).data().contextMenuRoot;
          c.$layer && c.$layer.is(a.relatedTarget) && (c.hovering = !1);
        },
        itemMouseenter: function (c) {
          var d = b(this),
            e = d.data(),
            a = e.contextMenu,
            f = e.contextMenuRoot;
          return (
            (f.hovering = !0),
            c &&
              f.$layer &&
              f.$layer.is(c.relatedTarget) &&
              (c.preventDefault(), c.stopImmediatePropagation()),
            (a.$menu ? a : f).$menu
              .children(".hover")
              .trigger("contextmenu:blur"),
            d.hasClass("disabled") || d.hasClass("not-selectable")
              ? void (a.$selected = null)
              : void d.trigger("contextmenu:focus")
          );
        },
        itemMouseleave: function (c) {
          var d = b(this),
            e = d.data(),
            a = e.contextMenu,
            f = e.contextMenuRoot;
          return f !== a && f.$layer && f.$layer.is(c.relatedTarget)
            ? (f.$selected && f.$selected.trigger("contextmenu:blur"),
              c.preventDefault(),
              c.stopImmediatePropagation(),
              void (f.$selected = a.$selected = a.$node))
            : void d.trigger("contextmenu:blur");
        },
        itemClick: function (d) {
          var e,
            f = b(this),
            a = f.data(),
            g = a.contextMenu,
            h = a.contextMenuRoot,
            i = a.contextMenuKey;
          if (
            g.items[i] &&
            !f.is(
              ".disabled, .context-menu-submenu, .context-menu-separator, .not-selectable"
            )
          ) {
            if (
              (d.preventDefault(),
              d.stopImmediatePropagation(),
              b.isFunction(h.callbacks[i]) &&
                Object.prototype.hasOwnProperty.call(h.callbacks, i))
            )
              e = h.callbacks[i];
            else {
              if (!b.isFunction(h.callback)) return;
              e = h.callback;
            }
            h.$menu.hasClass("dom_contextmenu")
              ? !1 === e.call(h.$trigger, i, h)
                ? h.$menu.parent().length && p.update.call(h.$trigger, h)
                : h.$menu.trigger("contextmenu:hide")
              : e.call(h.$trigger, i, h);
          }
        },
        inputClick: function (a) {
          a.stopImmediatePropagation();
        },
        hideMenu: function (c, d) {
          var e = b(this).data("contextMenuRoot");
          p.hide.call(e.$trigger, e, d && d.force);
        },
        focusItem: function (c) {
          c.stopPropagation();
          var d = b(this),
            e = d.data(),
            a = e.contextMenu,
            f = e.contextMenuRoot;
          d.addClass("hover").siblings(".hover").trigger("contextmenu:blur"),
            (a.$selected = f.$selected = d),
            a.$node && f.positionSubmenu.call(a.$node, a.$menu);
        },
        blurItem: function (c) {
          c.stopPropagation();
          var d = b(this),
            e = d.data(),
            a = e.contextMenu;
          e.contextMenuRoot, d.removeClass("hover"), (a.$selected = null);
        },
      },
      p = {
        show: function (c, d, e) {
          var a = b(this),
            g = {};
          return (
            b("#context-menu-layer").trigger("mousedown"),
            (c.$trigger = a),
            !1 === c.events.show.call(a, c)
              ? void (q = null)
              : (p.update.call(a, c),
                c.position.call(a, c, d, e),
                c.zIndex && (g.zIndex = h(a) + c.zIndex),
                p.layer.call(c.$menu, c, g.zIndex),
                c.$menu.find("ul").css("zIndex", g.zIndex + 1),
                c.$menu
                  .css(g)
                  [c.animation.show](c.animation.duration, function () {
                    a.trigger("contextmenu:visible");
                  }),
                a.data("contextMenu", c).addClass("context-menu-active"),
                b(document)
                  .off("keydown.contextMenu")
                  .on("keydown.contextMenu", f.key),
                void (
                  c.autoHide &&
                  b(document).on("mousemove.contextMenuAutoHide", function (b) {
                    var d = a.offset();
                    (d.right = d.left + a.outerWidth()),
                      (d.bottom = d.top + a.outerHeight()),
                      !c.$layer ||
                        c.hovering ||
                        (b.pageX >= d.left &&
                          b.pageX <= d.right &&
                          b.pageY >= d.top &&
                          b.pageY <= d.bottom) ||
                        c.$menu.trigger("contextmenu:hide");
                  })
                ))
          );
        },
        hide: function (c, d) {
          var a = b(this);
          if (
            (c || (c = a.data("contextMenu") || {}),
            d || !c.events || !1 !== c.events.hide.call(a, c))
          ) {
            if (
              (a.removeData("contextMenu").removeClass("context-menu-active"),
              c.$layer)
            ) {
              setTimeout(
                (function (a) {
                  return function () {
                    a.remove();
                  };
                })(c.$layer),
                10
              );
              try {
                delete c.$layer;
              } catch (a) {
                c.$layer = null;
              }
            }
            (q = null),
              c.$menu.find(".hover").trigger("contextmenu:blur"),
              (c.$selected = null),
              b(document)
                .off(".contextMenuAutoHide")
                .off("keydown.contextMenu"),
              c.$menu &&
                c.$menu[c.animation.hide](c.animation.duration, function () {
                  c.build &&
                    (c.$menu.remove(),
                    b.each(c, function (a) {
                      switch (a) {
                        case "ns":
                        case "selector":
                        case "build":
                        case "trigger":
                          return !0;
                        default:
                          c[a] = j;
                          try {
                            delete c[a];
                          } catch (a) {}
                          return !0;
                      }
                    })),
                    setTimeout(function () {
                      a.trigger("contextmenu:hidden");
                    }, 10);
                });
          }
        },
        create: function (g, a) {
          a === j && (a = g),
            (g.$menu = b('<ul class="context-menu-list"></ul>')
              .addClass(g.className || "")
              .data({ contextMenu: g, contextMenuRoot: a })),
            b.each(["callbacks", "commands", "inputs"], function (b, c) {
              (g[c] = {}), a[c] || (a[c] = {});
            }),
            a.accesskeys || (a.accesskeys = {}),
            b.each(g.items, function (h, j) {
              var i = b('<li class="context-menu-item"></li>').addClass(
                  j.className || ""
                ),
                k = null,
                m = null;
              if (
                (i.on("click", b.noop),
                (j.$node = i.data({
                  contextMenu: g,
                  contextMenuRoot: a,
                  contextMenuKey: h,
                })),
                j.accesskey)
              )
                for (var o, q = e(j.accesskey), s = 0; (o = q[s]); s++)
                  if (!a.accesskeys[o]) {
                    (a.accesskeys[o] = j),
                      (j._name = j.name.replace(
                        new RegExp("(" + o + ")", "i"),
                        '<span class="context-menu-accesskey">$1</span>'
                      ));
                    break;
                  }
              if ("string" == typeof j)
                i.addClass("context-menu-separator not-selectable");
              else if (j.type && n[j.type])
                n[j.type].call(i, j, g, a),
                  b.each([g, a], function (c, d) {
                    (d.commands[h] = j),
                      b.isFunction(j.callback) && (d.callbacks[h] = j.callback);
                  });
              else {
                switch (
                  ("html" == j.type
                    ? i.addClass("context-menu-html not-selectable")
                    : j.type
                    ? ((k = b("<label></label>").appendTo(i)),
                      b("<span></span>")
                        .html(j._name || j.name)
                        .appendTo(k),
                      i.addClass("context-menu-input"),
                      (g.hasTypes = !0),
                      b.each([g, a], function (a, b) {
                        (b.commands[h] = j), (b.inputs[h] = j);
                      }))
                    : j.items && (j.type = "sub"),
                  j.type)
                ) {
                  case "text":
                    m = b('<input type="text" value="1" name="" value="">')
                      .attr("name", "context-menu-input-" + h)
                      .val(j.value || "")
                      .appendTo(k);
                    break;
                  case "textarea":
                    (m = b('<textarea name=""></textarea>')
                      .attr("name", "context-menu-input-" + h)
                      .val(j.value || "")
                      .appendTo(k)),
                      j.height && m.height(j.height);
                    break;
                  case "checkbox":
                    m = b('<input type="checkbox" value="1" name="" value="">')
                      .attr("name", "context-menu-input-" + h)
                      .val(j.value || "")
                      .prop("checked", !!j.selected)
                      .prependTo(k);
                    break;
                  case "radio":
                    m = b('<input type="radio" value="1" name="" value="">')
                      .attr("name", "context-menu-input-" + j.radio)
                      .val(j.value || "")
                      .prop("checked", !!j.selected)
                      .prependTo(k);
                    break;
                  case "select":
                    (m = b('<select name="">')
                      .attr("name", "context-menu-input-" + h)
                      .appendTo(k)),
                      j.options &&
                        (b.each(j.options, function (a, c) {
                          b("<option></option>").val(a).text(c).appendTo(m);
                        }),
                        m.val(j.selected));
                    break;
                  case "sub":
                    b("<span></span>")
                      .html(j._name || j.name)
                      .appendTo(i),
                      (j.appendTo = j.$node),
                      p.create(j, a),
                      i.data("contextMenu", j).addClass("context-menu-submenu"),
                      (j.callback = null);
                    break;
                  case "html":
                    b(j.html).appendTo(i);
                    break;
                  default:
                    b.each([g, a], function (c, d) {
                      (d.commands[h] = j),
                        b.isFunction(j.callback) &&
                          (d.callbacks[h] = j.callback);
                    }),
                      b("<span></span>")
                        .html(j._name || j.name || "")
                        .appendTo(i);
                }
                j.type &&
                  "sub" != j.type &&
                  "html" != j.type &&
                  (m.on("focus", f.focusInput).on("blur", f.blurInput),
                  j.events && m.on(j.events, g)),
                  j.icon && i.addClass("icon icon-" + j.icon);
              }
              (j.$input = m),
                (j.$label = k),
                i.appendTo(g.$menu),
                !g.hasTypes &&
                  b.support.eventSelectstart &&
                  i.on("selectstart.disableTextSelect", f.abortevent);
            }),
            g.$node ||
              g.$menu.css("display", "none").addClass("context-menu-root"),
            g.$menu.appendTo(g.appendTo || document.body);
        },
        resize: function (a, c) {
          a.css({ position: "absolute", display: "block" }),
            a.data("width", Math.ceil(a.width()) + 1),
            a.css({
              position: "static",
              minWidth: "0px",
              maxWidth: "100000px",
            }),
            a.find("> li > ul").each(function () {
              p.resize(b(this), !0);
            }),
            c ||
              a
                .find("ul")
                .add(a)
                .css({ position: "", display: "", minWidth: "", maxWidth: "" })
                .width(function () {
                  return b(this).data("width");
                });
        },
        update: function (d, e) {
          var f = this;
          e === j && ((e = d), p.resize(d.$menu)),
            d.$menu.children().each(function () {
              var a = b(this),
                g = a.data("contextMenuKey"),
                h = d.items[g],
                i =
                  (b.isFunction(h.disabled) && h.disabled.call(f, g, e)) ||
                  !0 === h.disabled;
              if ((a[i ? "addClass" : "removeClass"]("disabled"), h.type))
                switch (
                  (a.find("input, select, textarea").prop("disabled", i),
                  h.type)
                ) {
                  case "text":
                  case "textarea":
                    h.$input.val(h.value || "");
                    break;
                  case "checkbox":
                  case "radio":
                    h.$input.val(h.value || "").prop("checked", !!h.selected);
                    break;
                  case "select":
                    h.$input.val(h.selected || "");
                }
              h.$menu && p.update.call(f, h, e);
            });
        },
        layer: function (c, d) {
          var e = (c.$layer = b(
            '<div id="context-menu-layer" style="position:fixed; z-index:' +
              d +
              '; top:0; left:0; opacity: 0; filter: alpha(opacity=0); background-color: #000;"></div>'
          )
            .css({ height: v.height(), width: v.width(), display: "block" })
            .data("contextMenuRoot", c)
            .insertBefore(this)
            .on("contextmenu", f.abortevent)
            .on("click", f.layerClick));
          return (
            b.support.fixedPosition ||
              e.css({ position: "absolute", height: b(document).height() }),
            e
          );
        },
      };
    (b.fn.contextMenu = function (c) {
      if (c === j) this.first().trigger("contextmenu");
      else if (c.x && c.y)
        this.first().trigger(
          b.Event("contextmenu", { pageX: c.x, pageY: c.y })
        );
      else if (!("hide" === c))
        "destroy" === c
          ? b.contextMenu("destroy", { context: this })
          : b.isPlainObject(c)
          ? ((c.context = this), b.contextMenu("create", c))
          : c
          ? this.removeClass("context-menu-disabled")
          : c || this.addClass("context-menu-disabled");
      else if (null != this.data("contextMenu")) {
        var d = this.data("contextMenu").$menu;
        d && d.trigger("contextmenu:hide");
      }
      return this;
    }),
      (b.contextMenu = function (c, d) {
        "string" != typeof c && ((d = c), (c = "create")),
          "string" == typeof d ? (d = { selector: d }) : d === j && (d = {});
        var g = b.extend(!0, {}, A, d || {}),
          e = b(document),
          i = b(document).add(b("#iframe").contents()),
          k = !1;
        switch (
          (g.context && g.context.length
            ? ((i = b(g.context).first()),
              (g.context = i.get(0)),
              (k = g.context !== document))
            : (g.context = document),
          c)
        ) {
          case "create":
            if (!g.selector) throw new Error("No selector specified");
            if (g.selector.match(/.context-menu-(list|item|input)($|\s)/))
              throw new Error(
                'Cannot bind to selector "' +
                  g.selector +
                  '" as it contains a reserved className'
              );
            if (!g.build && (!g.items || b.isEmptyObject(g.items)))
              throw new Error("No Items specified");
            switch (
              (w++,
              (g.ns = ".contextMenu" + w),
              k || (y[g.selector] = g.ns),
              (z[g.ns] = g),
              g.trigger || (g.trigger = "right"),
              t ||
                (e
                  .on(
                    {
                      "contextmenu:hide.contextMenu": f.hideMenu,
                      "prevcommand.contextMenu": f.prevItem,
                      "nextcommand.contextMenu": f.nextItem,
                      "contextmenu.contextMenu": f.abortevent,
                      "mouseenter.contextMenu": f.menuMouseenter,
                      "mouseleave.contextMenu": f.menuMouseleave,
                    },
                    ".context-menu-list"
                  )
                  .on(
                    "mouseup.contextMenu",
                    ".context-menu-input",
                    f.inputClick
                  )
                  .on(
                    {
                      "mouseup.contextMenu": f.itemClick,
                      "contextmenu:focus.contextMenu": f.focusItem,
                      "contextmenu:blur.contextMenu": f.blurItem,
                      "contextmenu.contextMenu": f.abortevent,
                      "mouseenter.contextMenu": f.itemMouseenter,
                      "mouseleave.contextMenu": f.itemMouseleave,
                    },
                    ".context-menu-item"
                  ),
                (t = !0)),
              i.on("contextmenu" + g.ns, g.selector, g, f.contextmenu),
              k &&
                i.on("remove" + g.ns, function () {
                  b(this).contextMenu("destroy");
                }),
              g.trigger)
            ) {
              case "hover":
                i.on("mouseenter" + g.ns, g.selector, g, f.mouseenter).on(
                  "mouseleave" + g.ns,
                  g.selector,
                  g,
                  f.mouseleave
                );
                break;
              case "left":
                i.on("click" + g.ns, g.selector, g, f.click);
            }
            g.build || p.create(g);
            break;
          case "destroy":
            var l;
            if (k) {
              var o = g.context;
              b.each(z, function (a, c) {
                if (c.context !== o) return !0;
                (l = b(".context-menu-list").filter(":visible")).length &&
                  l
                    .data()
                    .contextMenuRoot.$trigger.is(
                      b(c.context).find(c.selector)
                    ) &&
                  l.trigger("contextmenu:hide", { force: !0 });
                try {
                  z[c.ns].$menu && z[c.ns].$menu.remove(), delete z[c.ns];
                } catch (a) {
                  z[c.ns] = null;
                }
                return b(c.context).off(c.ns), !0;
              });
            } else if (!g.selector)
              e.off(".contextMenu .contextMenuAutoHide"),
                b.each(z, function (a, c) {
                  b(c.context).off(c.ns);
                }),
                (y = {}),
                (z = {}),
                (w = 0),
                (t = !1),
                b("#context-menu-layer, .context-menu-list").remove();
            else if (y[g.selector]) {
              (l = b(".context-menu-list").filter(":visible")).length &&
                l.data().contextMenuRoot.$trigger.is(g.selector) &&
                l.trigger("contextmenu:hide", { force: !0 });
              try {
                z[y[g.selector]].$menu && z[y[g.selector]].$menu.remove(),
                  delete z[y[g.selector]];
              } catch (a) {
                z[y[g.selector]] = null;
              }
              e.off(y[g.selector]);
            }
            break;
          case "html5":
            ((b.support.htmlCommand || b.support.htmlMenuitem) &&
              ("boolean" != typeof d || !d)) ||
              b('menu[type="context"]')
                .each(function () {
                  this.id &&
                    b.contextMenu({
                      selector: "[contextmenu=" + this.id + "]",
                      items: b.contextMenu.fromMenu(this),
                    });
                })
                .css("display", "none");
            break;
          default:
            throw new Error('Unknown operation "' + c + '"');
        }
        return this;
      }),
      (b.contextMenu.setInputValues = function (c, d) {
        d === j && (d = {}),
          b.each(c.inputs, function (a, b) {
            switch (b.type) {
              case "text":
              case "textarea":
                b.value = d[a] || "";
                break;
              case "checkbox":
                b.selected = !!d[a];
                break;
              case "radio":
                b.selected = (d[b.radio] || "") == b.value;
                break;
              case "select":
                b.selected = d[a] || "";
            }
          });
      }),
      (b.contextMenu.getInputValues = function (c, d) {
        return (
          d === j && (d = {}),
          b.each(c.inputs, function (a, b) {
            switch (b.type) {
              case "text":
              case "textarea":
              case "select":
                d[a] = b.$input.val();
                break;
              case "checkbox":
                d[a] = b.$input.prop("checked");
                break;
              case "radio":
                b.$input.prop("checked") && (d[b.radio] = b.value);
            }
          }),
          d
        );
      }),
      (b.contextMenu.fromMenu = function (c) {
        var d = {};
        return a(d, b(c).children()), d;
      }),
      (b.contextMenu.defaults = A),
      (b.contextMenu.types = n),
      (b.contextMenu.handle = f),
      (b.contextMenu.op = p),
      (b.contextMenu.menus = z);
  })(jQuery),
  !(function (a, b) {
    "object" == typeof exports && "object" == typeof module
      ? (module.exports = b())
      : "function" == typeof define && define.amd
      ? define([], b)
      : "object" == typeof exports
      ? (exports.ClipboardJS = b())
      : (a.ClipboardJS = b());
  })(this, function () {
    return (function (a) {
      function b(d) {
        if (c[d]) return c[d].exports;
        var e = (c[d] = { i: d, l: !1, exports: {} });
        return a[d].call(e.exports, e, e.exports, b), (e.l = !0), e.exports;
      }
      var c = {};
      return (
        (b.m = a),
        (b.c = c),
        (b.i = function (a) {
          return a;
        }),
        (b.d = function (a, c, d) {
          b.o(a, c) ||
            Object.defineProperty(a, c, {
              configurable: !1,
              enumerable: !0,
              get: d,
            });
        }),
        (b.n = function (a) {
          var c =
            a && a.__esModule
              ? function () {
                  return a.default;
                }
              : function () {
                  return a;
                };
          return b.d(c, "a", c), c;
        }),
        (b.o = function (a, b) {
          return Object.prototype.hasOwnProperty.call(a, b);
        }),
        (b.p = ""),
        b((b.s = 3))
      );
    })([
      function (b, d, e) {
        var f, g, h;
        !(function (i, a) {
          (g = [b, e(7)]),
            (f = a),
            void 0 !== (h = "function" == typeof f ? f.apply(d, g) : f) &&
              (b.exports = h);
        })(0, function (b, c) {
          "use strict";
          function d(a, b) {
            if (!(a instanceof b))
              throw new TypeError("Cannot call a class as a function");
          }
          var f = (function (a) {
              return a && a.__esModule ? a : { default: a };
            })(c),
            e =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (a) {
                    return typeof a;
                  }
                : function (a) {
                    return a &&
                      "function" == typeof Symbol &&
                      a.constructor === Symbol &&
                      a !== Symbol.prototype
                      ? "symbol"
                      : typeof a;
                  },
            g = (function () {
              function a(a, b) {
                for (var c, d = 0; d < b.length; d++)
                  (c = b[d]),
                    (c.enumerable = c.enumerable || !1),
                    (c.configurable = !0),
                    "value" in c && (c.writable = !0),
                    Object.defineProperty(a, c.key, c);
              }
              return function (b, c, d) {
                return c && a(b.prototype, c), d && a(b, d), b;
              };
            })(),
            h = (function () {
              function a(b) {
                d(this, a), this.resolveOptions(b), this.initSelection();
              }
              return (
                g(a, [
                  {
                    key: "resolveOptions",
                    value: function () {
                      var a =
                        0 < arguments.length && void 0 !== arguments[0]
                          ? arguments[0]
                          : {};
                      (this.action = a.action),
                        (this.container = a.container),
                        (this.emitter = a.emitter),
                        (this.target = a.target),
                        (this.text = a.text),
                        (this.trigger = a.trigger),
                        (this.selectedText = "");
                    },
                  },
                  {
                    key: "initSelection",
                    value: function () {
                      this.text
                        ? this.selectFake()
                        : this.target && this.selectTarget();
                    },
                  },
                  {
                    key: "selectFake",
                    value: function () {
                      var a = this,
                        b =
                          "rtl" == document.documentElement.getAttribute("dir");
                      this.removeFake(),
                        (this.fakeHandlerCallback = function () {
                          return a.removeFake();
                        }),
                        (this.fakeHandler =
                          this.container.addEventListener(
                            "click",
                            this.fakeHandlerCallback
                          ) || !0),
                        (this.fakeElem = document.createElement("textarea")),
                        (this.fakeElem.style.fontSize = "12pt"),
                        (this.fakeElem.style.border = "0"),
                        (this.fakeElem.style.padding = "0"),
                        (this.fakeElem.style.margin = "0"),
                        (this.fakeElem.style.position = "absolute"),
                        (this.fakeElem.style[b ? "right" : "left"] = "-9999px");
                      var c =
                        window.pageYOffset ||
                        document.documentElement.scrollTop;
                      (this.fakeElem.style.top = c + "px"),
                        this.fakeElem.setAttribute("readonly", ""),
                        (this.fakeElem.value = this.text),
                        this.container.appendChild(this.fakeElem),
                        (this.selectedText = (0, f.default)(this.fakeElem)),
                        this.copyText();
                    },
                  },
                  {
                    key: "removeFake",
                    value: function () {
                      this.fakeHandler &&
                        (this.container.removeEventListener(
                          "click",
                          this.fakeHandlerCallback
                        ),
                        (this.fakeHandler = null),
                        (this.fakeHandlerCallback = null)),
                        this.fakeElem &&
                          (this.container.removeChild(this.fakeElem),
                          (this.fakeElem = null));
                    },
                  },
                  {
                    key: "selectTarget",
                    value: function () {
                      (this.selectedText = (0, f.default)(this.target)),
                        this.copyText();
                    },
                  },
                  {
                    key: "copyText",
                    value: function () {
                      var a;
                      try {
                        a = document.execCommand(this.action);
                      } catch (b) {
                        a = !1;
                      }
                      this.handleResult(a);
                    },
                  },
                  {
                    key: "handleResult",
                    value: function (a) {
                      this.emitter.emit(a ? "success" : "error", {
                        action: this.action,
                        text: this.selectedText,
                        trigger: this.trigger,
                        clearSelection: this.clearSelection.bind(this),
                      });
                    },
                  },
                  {
                    key: "clearSelection",
                    value: function () {
                      this.trigger && this.trigger.focus(),
                        window.getSelection().removeAllRanges();
                    },
                  },
                  {
                    key: "destroy",
                    value: function () {
                      this.removeFake();
                    },
                  },
                  {
                    key: "action",
                    set: function () {
                      var a =
                        0 < arguments.length && void 0 !== arguments[0]
                          ? arguments[0]
                          : "copy";
                      if (
                        ((this._action = a),
                        "copy" !== this._action && "cut" !== this._action)
                      )
                        throw new Error(
                          'Invalid "action" value, use either "copy" or "cut"'
                        );
                    },
                    get: function () {
                      return this._action;
                    },
                  },
                  {
                    key: "target",
                    set: function (a) {
                      if (void 0 !== a) {
                        if (
                          !a ||
                          "object" !== (void 0 === a ? "undefined" : e(a)) ||
                          1 !== a.nodeType
                        )
                          throw new Error(
                            'Invalid "target" value, use a valid Element'
                          );
                        if (
                          "copy" === this.action &&
                          a.hasAttribute("disabled")
                        )
                          throw new Error(
                            'Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute'
                          );
                        if (
                          "cut" === this.action &&
                          (a.hasAttribute("readonly") ||
                            a.hasAttribute("disabled"))
                        )
                          throw new Error(
                            'Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes'
                          );
                        this._target = a;
                      }
                    },
                    get: function () {
                      return this._target;
                    },
                  },
                ]),
                a
              );
            })();
          b.exports = h;
        });
      },
      function (b, d, e) {
        function f(a, b, c) {
          return (
            a.addEventListener(b, c),
            {
              destroy: function () {
                a.removeEventListener(b, c);
              },
            }
          );
        }
        function g(a, b, c) {
          return (
            Array.prototype.forEach.call(a, function (a) {
              a.addEventListener(b, c);
            }),
            {
              destroy: function () {
                Array.prototype.forEach.call(a, function (a) {
                  a.removeEventListener(b, c);
                });
              },
            }
          );
        }
        function h(a, b, d) {
          return c(document.body, a, b, d);
        }
        var a = e(6),
          c = e(5);
        b.exports = function (b, c, d) {
          if (!b && !c && !d) throw new Error("Missing required arguments");
          if (!a.string(c))
            throw new TypeError("Second argument must be a String");
          if (!a.fn(d))
            throw new TypeError("Third argument must be a Function");
          if (a.node(b)) return f(b, c, d);
          if (a.nodeList(b)) return g(b, c, d);
          if (a.string(b)) return h(b, c, d);
          throw new TypeError(
            "First argument must be a String, HTMLElement, HTMLCollection, or NodeList"
          );
        };
      },
      function (a) {
        function b() {}
        (b.prototype = {
          on: function (a, b, c) {
            var d = this.e || (this.e = {});
            return (d[a] || (d[a] = [])).push({ fn: b, ctx: c }), this;
          },
          once: function (a, b, c) {
            function d() {
              e.off(a, d), b.apply(c, arguments);
            }
            var e = this;
            return (d._ = b), this.on(a, d, c);
          },
          emit: function (a) {
            var b = [].slice.call(arguments, 1),
              c = ((this.e || (this.e = {}))[a] || []).slice(),
              d = 0,
              e = c.length;
            for (d; d < e; d++) c[d].fn.apply(c[d].ctx, b);
            return this;
          },
          off: function (b, c) {
            var d = this.e || (this.e = {}),
              e = d[b],
              f = [];
            if (e && c)
              for (var g = 0, h = e.length; g < h; g++)
                e[g].fn !== c && e[g].fn._ !== c && f.push(e[g]);
            return f.length ? (d[b] = f) : delete d[b], this;
          },
        }),
          (a.exports = b);
      },
      function (b, d, e) {
        var f, g, h;
        !(function (i, a) {
          (g = [b, e(0), e(2), e(1)]),
            (f = a),
            void 0 !== (h = "function" == typeof f ? f.apply(d, g) : f) &&
              (b.exports = h);
        })(0, function (b, g, e, j) {
          "use strict";
          function k(a) {
            return a && a.__esModule ? a : { default: a };
          }
          function m(a, b) {
            if (!(a instanceof b))
              throw new TypeError("Cannot call a class as a function");
          }
          function i(a, b) {
            if (!a)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return b && ("object" == typeof b || "function" == typeof b)
              ? b
              : a;
          }
          function a(a, b) {
            if ("function" != typeof b && null !== b)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof b
              );
            (a.prototype = Object.create(b && b.prototype, {
              constructor: {
                value: a,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
              b &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(a, b)
                  : (a.__proto__ = b));
          }
          function c(a, b) {
            var c = "data-clipboard-" + a;
            if (b.hasAttribute(c)) return b.getAttribute(c);
          }
          var n = k(g),
            l = k(e),
            o = k(j),
            f =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (a) {
                    return typeof a;
                  }
                : function (a) {
                    return a &&
                      "function" == typeof Symbol &&
                      a.constructor === Symbol &&
                      a !== Symbol.prototype
                      ? "symbol"
                      : typeof a;
                  },
            d = (function () {
              function a(a, b) {
                for (var c, d = 0; d < b.length; d++)
                  (c = b[d]),
                    (c.enumerable = c.enumerable || !1),
                    (c.configurable = !0),
                    "value" in c && (c.writable = !0),
                    Object.defineProperty(a, c.key, c);
              }
              return function (b, c, d) {
                return c && a(b.prototype, c), d && a(b, d), b;
              };
            })(),
            h = (function (b) {
              function g(a, b) {
                m(this, g);
                var c = i(
                  this,
                  (g.__proto__ || Object.getPrototypeOf(g)).call(this)
                );
                return c.resolveOptions(b), c.listenClick(a), c;
              }
              return (
                a(g, b),
                d(
                  g,
                  [
                    {
                      key: "resolveOptions",
                      value: function () {
                        var a =
                          0 < arguments.length && void 0 !== arguments[0]
                            ? arguments[0]
                            : {};
                        (this.action =
                          "function" == typeof a.action
                            ? a.action
                            : this.defaultAction),
                          (this.target =
                            "function" == typeof a.target
                              ? a.target
                              : this.defaultTarget),
                          (this.text =
                            "function" == typeof a.text
                              ? a.text
                              : this.defaultText),
                          (this.container =
                            "object" === f(a.container)
                              ? a.container
                              : document.body);
                      },
                    },
                    {
                      key: "listenClick",
                      value: function (a) {
                        var b = this;
                        this.listener = (0, o.default)(
                          a,
                          "click",
                          function (a) {
                            return b.onClick(a);
                          }
                        );
                      },
                    },
                    {
                      key: "onClick",
                      value: function (a) {
                        var b = a.delegateTarget || a.currentTarget;
                        this.clipboardAction && (this.clipboardAction = null),
                          (this.clipboardAction = new n.default({
                            action: this.action(b),
                            target: this.target(b),
                            text: this.text(b),
                            container: this.container,
                            trigger: b,
                            emitter: this,
                          }));
                      },
                    },
                    {
                      key: "defaultAction",
                      value: function (a) {
                        return c("action", a);
                      },
                    },
                    {
                      key: "defaultTarget",
                      value: function (a) {
                        var b = c("target", a);
                        if (b) return document.querySelector(b);
                      },
                    },
                    {
                      key: "defaultText",
                      value: function (a) {
                        return c("text", a);
                      },
                    },
                    {
                      key: "destroy",
                      value: function () {
                        this.listener.destroy(),
                          this.clipboardAction &&
                            (this.clipboardAction.destroy(),
                            (this.clipboardAction = null));
                      },
                    },
                  ],
                  [
                    {
                      key: "isSupported",
                      value: function () {
                        var a =
                            0 < arguments.length && void 0 !== arguments[0]
                              ? arguments[0]
                              : ["copy", "cut"],
                          b = "string" == typeof a ? [a] : a,
                          c = !!document.queryCommandSupported;
                        return (
                          b.forEach(function (a) {
                            c = c && !!document.queryCommandSupported(a);
                          }),
                          c
                        );
                      },
                    },
                  ]
                ),
                g
              );
            })(l.default);
          b.exports = h;
        });
      },
      function (a) {
        if ("undefined" != typeof Element && !Element.prototype.matches) {
          var b = Element.prototype;
          b.matches =
            b.matchesSelector ||
            b.mozMatchesSelector ||
            b.msMatchesSelector ||
            b.oMatchesSelector ||
            b.webkitMatchesSelector;
        }
        a.exports = function (a, b) {
          for (; a && a.nodeType !== 9; ) {
            if ("function" == typeof a.matches && a.matches(b)) return a;
            a = a.parentNode;
          }
        };
      },
      function (b, c, d) {
        function f(b, c, d, e, f) {
          var h = g.apply(this, arguments);
          return (
            b.addEventListener(d, h, f),
            {
              destroy: function () {
                b.removeEventListener(d, h, f);
              },
            }
          );
        }
        function e(a, b, c, d, e) {
          return "function" == typeof a.addEventListener
            ? f.apply(null, arguments)
            : "function" == typeof c
            ? f.bind(null, document).apply(null, arguments)
            : ("string" == typeof a && (a = document.querySelectorAll(a)),
              Array.prototype.map.call(a, function (a) {
                return f(a, b, c, d, e);
              }));
        }
        function g(a, b, c, d) {
          return function (c) {
            (c.delegateTarget = h(c.target, b)),
              c.delegateTarget && d.call(a, c);
          };
        }
        var h = d(4);
        b.exports = e;
      },
      function (a, b) {
        (b.node = function (a) {
          return void 0 !== a && a instanceof HTMLElement && 1 === a.nodeType;
        }),
          (b.nodeList = function (a) {
            var c = Object.prototype.toString.call(a);
            return (
              void 0 !== a &&
              ("[object NodeList]" === c || "[object HTMLCollection]" === c) &&
              "length" in a &&
              (0 === a.length || b.node(a[0]))
            );
          }),
          (b.string = function (a) {
            return "string" == typeof a || a instanceof String;
          }),
          (b.fn = function (a) {
            return "[object Function]" === Object.prototype.toString.call(a);
          });
      },
      function (a) {
        function b(a) {
          var b;
          if ("SELECT" === a.nodeName) a.focus(), (b = a.value);
          else if ("INPUT" === a.nodeName || "TEXTAREA" === a.nodeName) {
            var c = a.hasAttribute("readonly");
            c || a.setAttribute("readonly", ""),
              a.select(),
              a.setSelectionRange(0, a.value.length),
              c || a.removeAttribute("readonly"),
              (b = a.value);
          } else {
            a.hasAttribute("contenteditable") && a.focus();
            var d = window.getSelection(),
              f = document.createRange();
            f.selectNodeContents(a),
              d.removeAllRanges(),
              d.addRange(f),
              (b = d.toString());
          }
          return b;
        }
        a.exports = b;
      },
    ]);
  }),
  !(function (b) {
    var d = "oninput" in document.createElement("input") ? "input" : "keydown";
    b.fn.autoGrowInput = function (f) {
      var g = b.extend({ maxWidth: 500, minWidth: 20, comfortZone: 0 }, f);
      return (
        this.each(function () {
          var e = b(this),
            h = " ",
            i =
              f && "comfortZone" in f
                ? g.comfortZone
                : parseInt(e.css("fontSize")),
            j = b("<span/>")
              .css({
                position: "absolute",
                top: -9999,
                left: -9999,
                width: "auto",
                fontSize: e.css("fontSize"),
                fontFamily: e.css("fontFamily"),
                fontWeight: e.css("fontWeight"),
                letterSpacing: e.css("letterSpacing"),
                textTransform: e.css("textTransform"),
                whiteSpace: "nowrap",
                ariaHidden: !0,
              })
              .appendTo("body"),
            c = function (a) {
              if (h !== (h = e.val()) || "autogrow" === a.type) {
                h || (h = e.attr("placeholder") || ""),
                  j.html(
                    h
                      .replace(/&/g, "&amp;")
                      .replace(/\s/g, "&nbsp;")
                      .replace(/</g, "&lt;")
                      .replace(/>/g, "&gt;")
                  );
                var b = j.width() + i,
                  c =
                    "function" == typeof g.maxWidth ? g.maxWidth() : g.maxWidth;
                b > c ? (b = c) : b < g.minWidth && (b = g.minWidth),
                  b != e.width() && e.width(b);
              }
            };
          e.on(d + ".autogrow autogrow", c), c();
        }),
        this
      );
    };
  })(jQuery),
  (window.GradientParser = (function () {
    function H(b) {
      var a = new Error(J + ": " + b);
      throw ((a.source = J), a);
    }
    function c() {
      var b = d();
      return 0 < J.length && H("Invalid input not EOF"), b;
    }
    function d() {
      return s(e);
    }
    function e() {
      return (
        f("linear-gradient", I.linearGradient, h) ||
        f("repeating-linear-gradient", I.repeatingLinearGradient, h) ||
        f("radial-gradient", I.radialGradient, k) ||
        f("repeating-radial-gradient", I.repeatingRadialGradient, k)
      );
    }
    function f(a, b, c) {
      return g(b, function () {
        var b = c();
        return (
          b && (E(I.comma) || H("Missing comma before color stops")),
          { type: a, orientation: b, colorStops: s(t) }
        );
      });
    }
    function g(a, b) {
      var c = E(a);
      if (c)
        return (
          E(I.startCall) || H("Missing ("),
          (G = b(c)),
          E(I.endCall) || H("Missing )"),
          G
        );
    }
    function h() {
      return i() || j();
    }
    function i() {
      return D("directional", I.sideOrCorner, 1);
    }
    function j() {
      return D("angular", I.angleValue, 1);
    }
    function k() {
      var a,
        b,
        f = l();
      return (
        f &&
          ((a = []),
          a.push(f),
          (b = J),
          E(I.comma) && ((f = l()), f ? a.push(f) : (J = b))),
        a
      );
    }
    function l() {
      var e = m() || n();
      if (e) e.at = p();
      else {
        var f = o();
        if (f) {
          e = f;
          var b = p();
          b && (e.at = b);
        } else {
          var c = q();
          c && (e = { type: "default-radial", at: c });
        }
      }
      return e;
    }
    function m() {
      var b = D("shape", /^(circle)/i, 0);
      return b && (b.style = C() || o()), b;
    }
    function n() {
      var b = D("shape", /^(ellipse)/i, 0);
      return b && (b.style = A() || o()), b;
    }
    function o() {
      return D("extent-keyword", I.extentKeywords, 1);
    }
    function p() {
      if (D("position", /^at/, 0)) {
        var b = q();
        return b || H("Missing positioning value"), b;
      }
    }
    function q() {
      var b = r();
      if (b.x || b.y) return { type: "position", value: b };
    }
    function r() {
      return { x: A(), y: A() };
    }
    function s(a) {
      var b = a(),
        c = [];
      if (b)
        for (c.push(b); E(I.comma); )
          (b = a()), b ? c.push(b) : H("One extra comma");
      return c;
    }
    function t() {
      var b = u();
      return b || H("Expected color definition"), (b.length = A()), b;
    }
    function u() {
      return w() || y() || x() || v();
    }
    function v() {
      return D("literal", I.literalColor, 0);
    }
    function w() {
      return D("hex", I.hexColor, 1);
    }
    function x() {
      return g(I.rgbColor, function () {
        return { type: "rgb", value: s(z) };
      });
    }
    function y() {
      return g(I.rgbaColor, function () {
        return { type: "rgba", value: s(z) };
      });
    }
    function z() {
      return E(I.number)[1];
    }
    function A() {
      return D("%", I.percentageValue, 1) || B() || C();
    }
    function B() {
      return D("position-keyword", I.positionKeywords, 1);
    }
    function C() {
      return D("px", I.pixelValue, 1) || D("em", I.emValue, 1);
    }
    function D(e, a, b) {
      var c = E(a);
      if (c) return { type: e, value: c[b] };
    }
    function E(b) {
      var a, e;
      return (
        (e = /^[\n\r\t\s]+/.exec(J)),
        e && F(e[0].length),
        (a = b.exec(J)),
        a && F(a[0].length),
        a
      );
    }
    function F(b) {
      J = J.substr(b);
    }
    var G,
      I = {
        linearGradient: /^(\-(webkit|o|ms|moz)\-)?(linear\-gradient)/i,
        repeatingLinearGradient:
          /^(\-(webkit|o|ms|moz)\-)?(repeating\-linear\-gradient)/i,
        radialGradient: /^(\-(webkit|o|ms|moz)\-)?(radial\-gradient)/i,
        repeatingRadialGradient:
          /^(\-(webkit|o|ms|moz)\-)?(repeating\-radial\-gradient)/i,
        sideOrCorner:
          /^to (left (top|bottom)|right (top|bottom)|left|right|top|bottom)/i,
        extentKeywords:
          /^(closest\-side|closest\-corner|farthest\-side|farthest\-corner|contain|cover)/,
        positionKeywords: /^(left|center|right|top|bottom)/i,
        pixelValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))px/,
        percentageValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))\%/,
        emValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))em/,
        angleValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))deg/,
        startCall: /^\(/,
        endCall: /^\)/,
        comma: /^,/,
        hexColor: /^\#([0-9a-fA-F]+)/,
        literalColor: /^([a-zA-Z]+)/,
        rgbColor: /^rgb/i,
        rgbaColor: /^rgba/i,
        number: /^(([0-9]*\.[0-9]+)|([0-9]+\.?))/,
      },
      J = "";
    return function (b) {
      return (J = b.toString()), c();
    };
  })());
