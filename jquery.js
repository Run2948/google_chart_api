/*
 * jQuery 1.2.2-pre - New Wave Javascript
 *
 * Copyright (c) 2007 John Resig (jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * $Date: 2007-11-30 03:39:49 -0500 (Fri, 30 Nov 2007) $
 * $Rev: 3985 $
 */
(function () {
  if (window.jQuery) var w = window.jQuery;
  var E = window.jQuery = function (a, b) {
    return this instanceof E ? this.init(a, b) : new E(a, b)
  };
  if (window.$) var D = window.$;
  window.$ = E;
  var u = /^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/;
  E.fn = E.prototype = {
    init: function (d, b) {
      d = d || document;
      if (d.nodeType) {
        this[0] = d;
        this.length = 1;
        return this
      } else if (typeof d == "string") {
        var c = u.exec(d);
        if (c && (c[1] || !b)) {
          if (c[1]) d = E.clean([c[1]], b);
          else {
            var a = document.getElementById(c[3]);
            if (a) if (a.id != c[3]) return E().find(d);
            else {
              this[0] = a;
              this.length = 1;
              return this
            } else d = []
          }
        } else return new E(b).find(d)
      } else if (E.isFunction(d)) return new E(document)[E.fn.ready ? "ready" : "load"](d);
      return this.setArray(d.constructor == Array && d || (d.jquery || d.length && d != window && !d.nodeType && d[0] != undefined && d[0].nodeType) && E.makeArray(d) || [d])
    },
    jquery: "1.2.2-pre",
    size: function () {
      return this.length
    },
    length: 0,
    get: function (a) {
      return a == undefined ? E.makeArray(this) : this[a]
    },
    pushStack: function (b) {
      var a = E(b);
      a.prevObject = this;
      return a
    },
    setArray: function (a) {
      this.length = 0;
      Array.prototype.push.apply(this, a);
      return this
    },
    each: function (a, b) {
      return E.each(this, a, b)
    },
    index: function (b) {
      var a = -1;
      this.each(function (i) {
        if (this == b) a = i
      });
      return a
    },
    attr: function (c, a, b) {
      var d = c;
      if (c.constructor == String) if (a == undefined) return this.length && E[b || "attr"](this[0], c) || undefined;
      else {
        d = {};
        d[c] = a
      }
      return this.each(function (i) {
        for (c in d) E.attr(b ? this.style : this, c, E.prop(this, d[c], b, i, c))
      })
    },
    css: function (b, a) {
      if ((b == 'width' || b == 'height') && parseFloat(a) < 0) a = undefined;
      return this.attr(b, a, "curCSS")
    },
    text: function (b) {
      if (typeof b != "object" && b != null) return this.empty().append(document.createTextNode(b));
      var a = "";
      E.each(b || this,
        function () {
          E.each(this.childNodes,
            function () {
              if (this.nodeType != 8) a += this.nodeType != 1 ? this.nodeValue : E.fn.text([this])
            })
        });
      return a
    },
    wrapAll: function (b) {
      if (this[0]) E(b, this[0].ownerDocument).clone().insertBefore(this[0]).map(function () {
        var a = this;
        while (a.firstChild) a = a.firstChild;
        return a
      }).append(this);
      return this
    },
    wrapInner: function (a) {
      return this.each(function () {
        E(this).contents().wrapAll(a)
      })
    },
    wrap: function (a) {
      return this.each(function () {
        E(this).wrapAll(a)
      })
    },
    append: function () {
      return this.domManip(arguments, true, false,
        function (a) {
          this.appendChild(a)
        })
    },
    prepend: function () {
      return this.domManip(arguments, true, true,
        function (a) {
          this.insertBefore(a, this.firstChild)
        })
    },
    before: function () {
      return this.domManip(arguments, false, false,
        function (a) {
          this.parentNode.insertBefore(a, this)
        })
    },
    after: function () {
      return this.domManip(arguments, false, true,
        function (a) {
          this.parentNode.insertBefore(a, this.nextSibling)
        })
    },
    end: function () {
      return this.prevObject || E([])
    },
    find: function (b) {
      var c = E.map(this,
        function (a) {
          return E.find(b, a)
        });
      return this.pushStack(/[^+>] [^+>]/.test(b) || b.indexOf("..") > -1 ? E.unique(c) : c)
    },
    clone: function (e) {
      var f = this.map(function () {
        return this.outerHTML ? E(this.outerHTML)[0] : this.cloneNode(true)
      });
      var d = f.find("*").andSelf().each(function () {
        if (this[F] != undefined) this[F] = null
      });
      if (e === true) this.find("*").andSelf().each(function (i) {
        var c = E.data(this, "events");
        for (var a in c) for (var b in c[a]) E.event.add(d[i], a, c[a][b], c[a][b].data)
      });
      return f
    },
    filter: function (b) {
      return this.pushStack(E.isFunction(b) && E.grep(this,
        function (a, i) {
          return b.call(a, i)
        }) || E.multiFilter(b, this))
    },
    not: function (b) {
      return this.pushStack(b.constructor == String && E.multiFilter(b, this, true) || E.grep(this,
        function (a) {
          return b.constructor == Array || b.jquery ? E.inArray(a, b) < 0 : a != b
        }))
    },
    add: function (a) {
      return this.pushStack(E.merge(this.get(), a.constructor == String ? E(a).get() : a.length != undefined && (!a.nodeName || E.nodeName(a, "form")) ? a : [a]))
    },
    is: function (a) {
      return a ? E.multiFilter(a, this).length > 0 : false
    },
    hasClass: function (a) {
      return this.is("." + a)
    },
    val: function (b) {
      if (b == undefined) {
        if (this.length) {
          var c = this[0];
          if (E.nodeName(c, "select")) {
            var e = c.selectedIndex,
              values = [],
              options = c.options,
              one = c.type == "select-one";
            if (e < 0) return null;
            for (var i = one ? e : 0, max = one ? e + 1 : options.length; i < max; i++) {
              var d = options[i];
              if (d.selected) {
                b = E.browser.msie && !d.attributes.value.specified ? d.text : d.value;
                if (one) return b;
                values.push(b)
              }
            }
            return values
          } else return (this[0].value || "").replace(/\r/g, "")
        }
      } else return this.each(function () {
        if (b.constructor == Array && /radio|checkbox/.test(this.type)) this.checked = (E.inArray(this.value, b) >= 0 || E.inArray(this.name, b) >= 0);
        else if (E.nodeName(this, "select")) {
          var a = b.constructor == Array ? b : [b];
          E("option", this).each(function () {
            this.selected = (E.inArray(this.value, a) >= 0 || E.inArray(this.text, a) >= 0)
          });
          if (!a.length) this.selectedIndex = -1
        } else this.value = b
      })
    },
    html: function (a) {
      return a == undefined ? (this.length ? this[0].innerHTML : null) : this.empty().append(a)
    },
    replaceWith: function (a) {
      return this.after(a).remove()
    },
    eq: function (i) {
      return this.slice(i, i + 1)
    },
    slice: function () {
      return this.pushStack(Array.prototype.slice.apply(this, arguments))
    },
    map: function (b) {
      return this.pushStack(E.map(this,
        function (a, i) {
          return b.call(a, i, a)
        }))
    },
    andSelf: function () {
      return this.add(this.prevObject)
    },
    domManip: function (g, f, h, d) {
      var e = this.length > 1,
        elems;
      return this.each(function () {
        if (!elems) {
          elems = E.clean(g, this.ownerDocument);
          if (h) elems.reverse()
        }
        var b = this;
        if (f && E.nodeName(this, "table") && E.nodeName(elems[0], "tr")) b = this.getElementsByTagName("tbody")[0] || this.appendChild(document.createElement("tbody"));
        var c = E([]);
        E.each(elems,
          function () {
            var a = e ? this.cloneNode(true) : this;
            if (E.nodeName(a, "script")) {
              if (c.length) c = c.add(a);
              else evalScript(0, a)
            } else {
              if (a.nodeType == 1) c = c.add(E("script", a).remove());
              d.call(b, a)
            }
          });
        c.each(evalScript)
      })
    }
  };
  function evalScript (i, a) {
    if (a.src) E.ajax({
      url: a.src,
      async: false,
      dataType: "script"
    });
    else E.globalEval(a.text || a.textContent || a.innerHTML || "");
    if (a.parentNode) a.parentNode.removeChild(a)
  }
  E.extend = E.fn.extend = function () {
    var b = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false,
      options;
    if (b.constructor == Boolean) {
      deep = b;
      b = arguments[1] || {};
      i = 2
    }
    if (typeof b != "object" && typeof b != "function") b = {};
    if (length == 1) {
      b = this;
      i = 0
    }
    for (; i < length; i++) if ((options = arguments[i]) != null) for (var a in options) {
      if (b === options[a]) continue;
      if (deep && options[a] && typeof options[a] == "object" && b[a] && !options[a].nodeType) b[a] = E.extend(b[a], options[a]);
      else if (options[a] != undefined) b[a] = options[a]
    }
    return b
  };
  var F = "jQuery" + (new Date()).getTime(),
    uuid = 0,
    windowData = {};
  var G = /z-?index|font-?weight|opacity|zoom|line-?height/i;
  E.extend({
    noConflict: function (a) {
      window.$ = D;
      if (a) window.jQuery = w;
      return E
    },
    isFunction: function (a) {
      return !!a && typeof a != "string" && !a.nodeName && a.constructor != Array && /function/i.test(a + "")
    },
    isXMLDoc: function (a) {
      return a.documentElement && !a.body || a.tagName && a.ownerDocument && !a.ownerDocument.body
    },
    globalEval: function (a) {
      a = E.trim(a);
      if (a) {
        var b = document.getElementsByTagName("head")[0] || document.documentElement,
          script = document.createElement("script");
        script.type = "text/javascript";
        if (E.browser.msie) script.text = a;
        else script.appendChild(document.createTextNode(a));
        b.appendChild(script);
        b.removeChild(script)
      }
    },
    nodeName: function (b, a) {
      return b.nodeName && b.nodeName.toUpperCase() == a.toUpperCase()
    },
    cache: {},
    data: function (c, d, b) {
      c = c == window ? windowData : c;
      var a = c[F];
      if (!a) a = c[F] = ++uuid;
      if (d && !E.cache[a]) E.cache[a] = {};
      if (b != undefined) E.cache[a][d] = b;
      return d ? E.cache[a][d] : a
    },
    removeData: function (c, b) {
      c = c == window ? windowData : c;
      var a = c[F];
      if (b) {
        if (E.cache[a]) {
          delete E.cache[a][b];
          b = "";
          for (b in E.cache[a]) break;
          if (!b) E.removeData(c)
        }
      } else {
        try {
          delete c[F]
        } catch (e) {
          if (c.removeAttribute) c.removeAttribute(F)
        }
        delete E.cache[a]
      }
    },
    each: function (c, a, b) {
      if (b) {
        if (c.length == undefined) for (var d in c) a.apply(c[d], b);
        else for (var i = 0,
          length = c.length; i < length; i++) if (a.apply(c[i], b) === false) break
      } else {
        if (c.length == undefined) for (var d in c) a.call(c[d], d, c[d]);
        else for (var i = 0,
          length = c.length,
          value = c[0]; i < length && a.call(value, i, value) !== false; value = c[++i]) { }
      }
      return c
    },
    prop: function (b, a, c, i, d) {
      if (E.isFunction(a)) a = a.call(b, i);
      return a && a.constructor == Number && c == "curCSS" && !G.test(d) ? a + "px" : a
    },
    className: {
      add: function (c, b) {
        E.each((b || "").split(/\s+/),
          function (i, a) {
            if (!E.className.has(c.className, a)) c.className += (c.className ? " " : "") + a
          })
      },
      remove: function (c, b) {
        c.className = b != undefined ? E.grep(c.className.split(/\s+/),
          function (a) {
            return !E.className.has(b, a)
          }).join(" ") : ""
      },
      has: function (b, a) {
        return E.inArray(a, (b.className || b).toString().split(/\s+/)) > -1
      }
    },
    swap: function (b, c, a) {
      for (var d in c) {
        b.style["old" + d] = b.style[d];
        b.style[d] = c[d]
      }
      a.call(b);
      for (var d in c) b.style[d] = b.style["old" + d]
    },
    css: function (c, d, b) {
      if (d == "height" || d == "width") {
        var e = {},
          height, width;
        E.each(["Top", "Bottom", "Right", "Left"],
          function () {
            e["padding" + this] = 0;
            e["border" + this + "Width"] = 0
          });
        E.swap(c, e,
          function () {
            if (E(c).is(":visible")) {
              height = c.offsetHeight;
              width = c.offsetWidth
            } else {
              c = E(c.cloneNode(true)).find(":radio").removeAttr("checked").removeAttr("defaultChecked").end().css({
                visibility: "hidden",
                position: "absolute",
                display: "block",
                right: "0",
                left: "0"
              }).appendTo(c.parentNode)[0];
              var a = E.css(c.parentNode, "position") || "static";
              if (a == "static") c.parentNode.style.position = "relative";
              height = c.clientHeight;
              width = c.clientWidth;
              if (a == "static") c.parentNode.style.position = "static";
              c.parentNode.removeChild(c)
            }
          });
        return d == "height" ? height : width
      }
      return E.curCSS(c, d, b)
    },
    curCSS: function (d, j, h) {
      var c;
      function color (b) {
        if (!E.browser.safari) return false;
        var a = document.defaultView.getComputedStyle(b, null);
        return !a || a.getPropertyValue("color") == ""
      }
      if (j == "opacity" && E.browser.msie) {
        c = E.attr(d.style, "opacity");
        return c == "" ? "1" : c
      }
      if (j.match(/float/i)) j = y;
      if (!h && d.style[j]) c = d.style[j];
      else if (document.defaultView && document.defaultView.getComputedStyle) {
        if (j.match(/float/i)) j = "float";
        j = j.replace(/([A-Z])/g, "-$1").toLowerCase();
        var g = document.defaultView.getComputedStyle(d, null);
        if (g && !color(d)) c = g.getPropertyValue(j);
        else {
          var e = [],
            stack = [];
          for (var a = d; a && color(a); a = a.parentNode) stack.unshift(a);
          for (var i = 0; i < stack.length; i++) if (color(stack[i])) {
            e[i] = stack[i].style.display;
            stack[i].style.display = "block"
          }
          c = j == "display" && e[stack.length - 1] != null ? "none" : (g && g.getPropertyValue(j)) || "";
          for (var i = 0; i < e.length; i++) if (e[i] != null) stack[i].style.display = e[i]
        }
        if (j == "opacity" && c == "") c = "1"
      } else if (d.currentStyle) {
        var f = j.replace(/\-(\w)/g,
          function (a, b) {
            return b.toUpperCase()
          });
        c = d.currentStyle[j] || d.currentStyle[f];
        if (!/^\d+(px)?$/i.test(c) && /^\d/.test(c)) {
          var k = d.style.left,
            runtimeStyle = d.runtimeStyle.left;
          d.runtimeStyle.left = d.currentStyle.left;
          d.style.left = c || 0;
          c = d.style.pixelLeft + "px";
          d.style.left = k;
          d.runtimeStyle.left = runtimeStyle
        }
      }
      return c
    },
    clean: function (k, h) {
      var j = [];
      h = h || document;
      E.each(k,
        function (i, d) {
          if (!d) return;
          if (d.constructor == Number) d = d.toString();
          if (typeof d == "string") {
            d = d.replace(/(<(\w+)[^>]*?)\/>/g,
              function (b, a, c) {
                return c.match(/^(abbr|br|col|img|input|link|meta|param|hr|area)$/i) ? b : a + "></" + c + ">"
              });
            var f = E.trim(d).toLowerCase(),
              div = h.createElement("div");
            var e = !f.indexOf("<opt") && [1, "<select multiple='multiple'>", "</select>"] || !f.indexOf("<leg") && [1, "<fieldset>", "</fieldset>"] || f.match(/^<(thead|tbody|tfoot|colg|cap)/) && [1, "<table>", "</table>"] || !f.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!f.indexOf("<td") || !f.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || !f.indexOf("<col") && [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"] || E.browser.msie && [1, "div<div>", "</div>"] || [0, "", ""];
            div.innerHTML = e[1] + d + e[2];
            while (e[0]--) div = div.lastChild;
            if (E.browser.msie) {
              var g = !f.indexOf("<table") && f.indexOf("<tbody") < 0 ? div.firstChild && div.firstChild.childNodes : e[1] == "<table>" && f.indexOf("<tbody") < 0 ? div.childNodes : [];
              for (var i = g.length - 1; i >= 0; --i) if (E.nodeName(g[i], "tbody") && !g[i].childNodes.length) g[i].parentNode.removeChild(g[i]);
              if (/^\s/.test(d)) div.insertBefore(h.createTextNode(d.match(/^\s*/)[0]), div.firstChild)
            }
            d = E.makeArray(div.childNodes)
          }
          if (d.length === 0 && (!E.nodeName(d, "form") && !E.nodeName(d, "select"))) return;
          if (d[0] == undefined || E.nodeName(d, "form") || d.options) j.push(d);
          else j = E.merge(j, d)
        });
      return j
    },
    attr: function (d, e, c) {
      var f = E.isXMLDoc(d) ? {} : E.props;
      if (e == "selected" && E.browser.safari) d.parentNode.selectedIndex;
      if (f[e]) {
        if (c != undefined) d[f[e]] = c;
        return d[f[e]]
      } else if (E.browser.msie && e == "style") return E.attr(d.style, "cssText", c);
      else if (c == undefined && E.browser.msie && E.nodeName(d, "form") && (e == "action" || e == "method")) return d.getAttributeNode(e).nodeValue;
      else if (d.tagName) {
        if (c != undefined) {
          if (e == "type" && E.nodeName(d, "input") && d.parentNode) throw "type property can't be changed";
          d.setAttribute(e, "" + c)
        }
        if (E.browser.msie && /href|src/.test(e) && !E.isXMLDoc(d)) return d.getAttribute(e, 2);
        return d.getAttribute(e)
      } else {
        if (e == "opacity" && E.browser.msie) {
          if (c != undefined) {
            d.zoom = 1;
            d.filter = (d.filter || "").replace(/alpha\([^)]*\)/, "") + (parseFloat(c).toString() == "NaN" ? "" : "alpha(opacity=" + c * 100 + ")")
          }
          return d.filter ? (parseFloat(d.filter.match(/opacity=([^)]*)/)[1]) / 100).toString() : ""
        }
        e = e.replace(/-([a-z])/ig,
          function (a, b) {
            return b.toUpperCase()
          });
        if (c != undefined) d[e] = c;
        return d[e]
      }
    },
    trim: function (a) {
      return (a || "").replace(/^\s+|\s+$/g, "")
    },
    makeArray: function (b) {
      var a = [];
      if (typeof b != "array") for (var i = 0,
        length = b.length; i < length; i++) a.push(b[i]);
      else a = b.slice(0);
      return a
    },
    inArray: function (b, a) {
      for (var i = 0,
        length = a.length; i < length; i++) if (a[i] == b) return i;
      return - 1
    },
    merge: function (a, b) {
      if (E.browser.msie) {
        for (var i = 0; b[i]; i++) if (b[i].nodeType != 8) a.push(b[i])
      } else for (var i = 0; b[i]; i++) a.push(b[i]);
      return a
    },
    unique: function (a) {
      var c = [],
        done = {};
      try {
        for (var i = 0,
          length = a.length; i < length; i++) {
          var b = E.data(a[i]);
          if (!done[b]) {
            done[b] = true;
            c.push(a[i])
          }
        }
      } catch (e) {
        c = a
      }
      return c
    },
    grep: function (c, a, d) {
      if (typeof a == "string") a = eval("false||function(a,i){return " + a + "}");
      var b = [];
      for (var i = 0,
        length = c.length; i < length; i++) if (!d && a(c[i], i) || d && !a(c[i], i)) b.push(c[i]);
      return b
    },
    map: function (d, a) {
      var c = [];
      for (var i = 0,
        length = d.length; i < length; i++) {
        var b = a(d[i], i);
        if (b !== null && b != undefined) {
          if (b.constructor != Array) b = [b];
          c = c.concat(b)
        }
      }
      return c
    }
  });
  var v = navigator.userAgent.toLowerCase();
  E.browser = {
    version: (v.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
    safari: /webkit/.test(v),
    opera: /opera/.test(v),
    msie: /msie/.test(v) && !/opera/.test(v),
    mozilla: /mozilla/.test(v) && !/(compatible|webkit)/.test(v)
  };
  var y = E.browser.msie ? "styleFloat" : "cssFloat";
  E.extend({
    boxModel: !E.browser.msie || document.compatMode == "CSS1Compat",
    props: {
      "for": "htmlFor",
      "class": "className",
      "float": y,
      cssFloat: y,
      styleFloat: y,
      innerHTML: "innerHTML",
      className: "className",
      value: "value",
      disabled: "disabled",
      checked: "checked",
      readonly: "readOnly",
      selected: "selected",
      maxlength: "maxLength",
      selectedIndex: "selectedIndex",
      defaultValue: "defaultValue",
      tagName: "tagName",
      nodeName: "nodeName"
    }
  });
  E.each({
    parent: "elem.parentNode",
    parents: "jQuery.dir(elem,'parentNode')",
    next: "jQuery.nth(elem,2,'nextSibling')",
    prev: "jQuery.nth(elem,2,'previousSibling')",
    nextAll: "jQuery.dir(elem,'nextSibling')",
    prevAll: "jQuery.dir(elem,'previousSibling')",
    siblings: "jQuery.sibling(elem.parentNode.firstChild,elem)",
    children: "jQuery.sibling(elem.firstChild)",
    contents: "jQuery.nodeName(elem,'iframe')?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes)"
  },
    function (c, d) {
      d = eval("false||function(elem){return " + d + "}");
      E.fn[c] = function (b) {
        var a = E.map(this, d);
        if (b && typeof b == "string") a = E.multiFilter(b, a);
        return this.pushStack(E.unique(a))
      }
    });
  E.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  },
    function (c, b) {
      E.fn[c] = function () {
        var a = arguments;
        return this.each(function () {
          for (var i = 0,
            length = a.length; i < length; i++) E(a[i])[b](this)
        })
      }
    });
  E.each({
    removeAttr: function (a) {
      E.attr(this, a, "");
      this.removeAttribute(a)
    },
    addClass: function (a) {
      E.className.add(this, a)
    },
    removeClass: function (a) {
      E.className.remove(this, a)
    },
    toggleClass: function (a) {
      E.className[E.className.has(this, a) ? "remove" : "add"](this, a)
    },
    remove: function (a) {
      if (!a || E.filter(a, [this]).r.length) {
        E("*", this).add(this).each(function () {
          E.event.remove(this);
          E.removeData(this)
        });
        if (this.parentNode) this.parentNode.removeChild(this)
      }
    },
    empty: function () {
      E(">*", this).remove();
      while (this.firstChild) this.removeChild(this.firstChild)
    }
  },
    function (a, b) {
      E.fn[a] = function () {
        return this.each(b, arguments)
      }
    });
  E.each(["Height", "Width"],
    function (i, c) {
      var b = c.toLowerCase();
      E.fn[b] = function (a) {
        return this[0] == window ? E.browser.opera && document.body["client" + c] || E.browser.safari && window["inner" + c] || document.compatMode == "CSS1Compat" && document.documentElement["client" + c] || document.body["client" + c] : this[0] == document ? Math.max(document.body["scroll" + c], document.body["offset" + c]) : a == undefined ? (this.length ? E.css(this[0], b) : null) : this.css(b, a.constructor == String ? a : a + "px")
      }
    });
  var C = E.browser.safari && parseInt(E.browser.version) < 417 ? "(?:[\\w*_-]|\\\\.)" : "(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",
    quickChild = new RegExp("^>\\s*(" + C + "+)"),
    quickID = new RegExp("^(" + C + "+)(#)(" + C + "+)"),
    quickClass = new RegExp("^([#.]?)(" + C + "*)");
  E.extend({
    expr: {
      "": "m[2]=='*'||jQuery.nodeName(a,m[2])",
      "#": "a.getAttribute('id')==m[2]",
      ":": {
        lt: "i<m[3]-0",
        gt: "i>m[3]-0",
        nth: "m[3]-0==i",
        eq: "m[3]-0==i",
        first: "i==0",
        last: "i==r.length-1",
        even: "i%2==0",
        odd: "i%2",
        "first-child": "a.parentNode.getElementsByTagName('*')[0]==a",
        "last-child": "jQuery.nth(a.parentNode.lastChild,1,'previousSibling')==a",
        "only-child": "!jQuery.nth(a.parentNode.lastChild,2,'previousSibling')",
        parent: "a.firstChild",
        empty: "!a.firstChild",
        contains: "(a.textContent||a.innerText||jQuery(a).text()||'').indexOf(m[3])>=0",
        visible: '"hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden"',
        hidden: '"hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden"',
        enabled: "!a.disabled",
        disabled: "a.disabled",
        checked: "a.checked",
        selected: "a.selected||jQuery.attr(a,'selected')",
        text: "'text'==a.type",
        radio: "'radio'==a.type",
        checkbox: "'checkbox'==a.type",
        file: "'file'==a.type",
        password: "'password'==a.type",
        submit: "'submit'==a.type",
        image: "'image'==a.type",
        reset: "'reset'==a.type",
        button: '"button"==a.type||jQuery.nodeName(a,"button")',
        input: "/input|select|textarea|button/i.test(a.nodeName)",
        has: "jQuery.find(m[3],a).length",
        header: "/h\\d/i.test(a.nodeName)",
        animated: "jQuery.grep(jQuery.timers,function(fn){return a==fn.elem;}).length"
      }
    },
    parse: [/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/, /^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/, new RegExp("^([:.#]*)(" + C + "+)")],
    multiFilter: function (a, c, b) {
      var d, cur = [];
      while (a && a != d) {
        d = a;
        var f = E.filter(a, c, b);
        a = f.t.replace(/^\s*,\s*/, "");
        cur = b ? c = f.r : E.merge(cur, f.r)
      }
      return cur
    },
    find: function (t, o) {
      if (typeof t != "string") return [t];
      if (o && !o.nodeType) o = null;
      o = o || document;
      var d = [o],
        done = [],
        last;
      while (t && last != t) {
        var r = [];
        last = t;
        t = E.trim(t);
        var l = false;
        var g = quickChild;
        var m = g.exec(t);
        if (m) {
          var p = m[1].toUpperCase();
          for (var i = 0; d[i]; i++) for (var c = d[i].firstChild; c; c = c.nextSibling) if (c.nodeType == 1 && (p == "*" || c.nodeName.toUpperCase() == p.toUpperCase())) r.push(c);
          d = r;
          t = t.replace(g, "");
          if (t.indexOf(" ") == 0) continue;
          l = true
        } else {
          g = /^([>+~])\s*(\w*)/i;
          if ((m = g.exec(t)) != null) {
            r = [];
            var p = m[2],
              merge = {};
            m = m[1];
            for (var j = 0,
              rl = d.length; j < rl; j++) {
              var n = m == "~" || m == "+" ? d[j].nextSibling : d[j].firstChild;
              for (; n; n = n.nextSibling) if (n.nodeType == 1) {
                var h = E.data(n);
                if (m == "~" && merge[h]) break;
                if (!p || n.nodeName.toUpperCase() == p.toUpperCase()) {
                  if (m == "~") merge[h] = true;
                  r.push(n)
                }
                if (m == "+") break
              }
            }
            d = r;
            t = E.trim(t.replace(g, ""));
            l = true
          }
        }
        if (t && !l) {
          if (!t.indexOf(",")) {
            if (o == d[0]) d.shift();
            done = E.merge(done, d);
            r = d = [o];
            t = " " + t.substr(1, t.length)
          } else {
            var k = quickID;
            var m = k.exec(t);
            if (m) {
              m = [0, m[2], m[3], m[1]]
            } else {
              k = quickClass;
              m = k.exec(t)
            }
            m[2] = m[2].replace(/\\/g, "");
            var f = d[d.length - 1];
            if (m[1] == "#" && f && f.getElementById && !E.isXMLDoc(f)) {
              var q = f.getElementById(m[2]);
              if ((E.browser.msie || E.browser.opera) && q && typeof q.id == "string" && q.id != m[2]) q = E('[@id="' + m[2] + '"]', f)[0];
              d = r = q && (!m[3] || E.nodeName(q, m[3])) ? [q] : []
            } else {
              for (var i = 0; d[i]; i++) {
                var a = m[1] == "#" && m[3] ? m[3] : m[1] != "" || m[0] == "" ? "*" : m[2];
                if (a == "*" && d[i].nodeName.toLowerCase() == "object") a = "param";
                r = E.merge(r, d[i].getElementsByTagName(a))
              }
              if (m[1] == ".") r = E.classFilter(r, m[2]);
              if (m[1] == "#") {
                var e = [];
                for (var i = 0; r[i]; i++) if (r[i].getAttribute("id") == m[2]) {
                  e = [r[i]];
                  break
                }
                r = e
              }
              d = r
            }
            t = t.replace(k, "")
          }
        }
        if (t) {
          var b = E.filter(t, r);
          d = r = b.r;
          t = E.trim(b.t)
        }
      }
      if (t) d = [];
      if (d && o == d[0]) d.shift();
      done = E.merge(done, d);
      return done
    },
    classFilter: function (r, m, a) {
      m = " " + m + " ";
      var c = [];
      for (var i = 0; r[i]; i++) {
        var b = (" " + r[i].className + " ").indexOf(m) >= 0;
        if (!a && b || a && !b) c.push(r[i])
      }
      return c
    },
    filter: function (t, r, h) {
      var d;
      while (t && t != d) {
        d = t;
        var p = E.parse,
          m;
        for (var i = 0; p[i]; i++) {
          m = p[i].exec(t);
          if (m) {
            t = t.substring(m[0].length);
            m[2] = m[2].replace(/\\/g, "");
            break
          }
        }
        if (!m) break;
        if (m[1] == ":" && m[2] == "not") r = E.filter(m[3], r, true).r;
        else if (m[1] == ".") r = E.classFilter(r, m[2], h);
        else if (m[1] == "[") {
          var g = [],
            type = m[3];
          for (var i = 0,
            rl = r.length; i < rl; i++) {
            var a = r[i],
              z = a[E.props[m[2]] || m[2]];
            if (z == null || /href|src|selected/.test(m[2])) z = E.attr(a, m[2]) || '';
            if ((type == "" && !!z || type == "=" && z == m[5] || type == "!=" && z != m[5] || type == "^=" && z && !z.indexOf(m[5]) || type == "$=" && z.substr(z.length - m[5].length) == m[5] || (type == "*=" || type == "~=") && z.indexOf(m[5]) >= 0) ^ h) g.push(a)
          }
          r = g
        } else if (m[1] == ":" && m[2] == "nth-child") {
          var e = {},
            g = [],
            test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3] == "even" && "2n" || m[3] == "odd" && "2n+1" || !/\D/.test(m[3]) && "0n+" + m[3] || m[3]),
            first = (test[1] + (test[2] || 1)) - 0,
            d = test[3] - 0;
          for (var i = 0,
            rl = r.length; i < rl; i++) {
            var j = r[i],
              parentNode = j.parentNode,
              id = E.data(parentNode);
            if (!e[id]) {
              var c = 1;
              for (var n = parentNode.firstChild; n; n = n.nextSibling) if (n.nodeType == 1) n.nodeIndex = c++;
              e[id] = true
            }
            var b = false;
            if (first == 0) {
              if (j.nodeIndex == d) b = true
            } else if ((j.nodeIndex - d) % first == 0 && (j.nodeIndex - d) / first >= 0) b = true;
            if (b ^ h) g.push(j)
          }
          r = g
        } else {
          var f = E.expr[m[1]];
          if (typeof f != "string") f = E.expr[m[1]][m[2]];
          f = eval("false||function(a,i){return " + f + "}");
          r = E.grep(r, f, h)
        }
      }
      return {
        r: r,
        t: t
      }
    },
    dir: function (b, c) {
      var d = [];
      var a = b[c];
      while (a && a != document) {
        if (a.nodeType == 1) d.push(a);
        a = a[c]
      }
      return d
    },
    nth: function (a, e, c, b) {
      e = e || 1;
      var d = 0;
      for (; a; a = a[c]) if (a.nodeType == 1 && ++d == e) break;
      return a
    },
    sibling: function (n, a) {
      var r = [];
      for (; n; n = n.nextSibling) {
        if (n.nodeType == 1 && (!a || n != a)) r.push(n)
      }
      return r
    }
  });
  E.event = {
    add: function (g, e, c, h) {
      if (E.browser.msie && g.setInterval != undefined) g = window;
      if (!c.guid) c.guid = this.guid++;
      if (h != undefined) {
        var d = c;
        c = function () {
          return d.apply(this, arguments)
        };
        c.data = h;
        c.guid = d.guid
      }
      var i = e.split(".");
      e = i[0];
      c.type = i[1];
      var b = E.data(g, "events") || E.data(g, "events", {});
      var f = E.data(g, "handle") || E.data(g, "handle",
        function () {
          var a;
          if (typeof E == "undefined" || E.event.triggered) return a;
          a = E.event.handle.apply(g, arguments);
          return a
        });
      var j = b[e];
      if (!j) {
        j = b[e] = {};
        if (g.addEventListener) g.addEventListener(e, f, false);
        else g.attachEvent("on" + e, f)
      }
      j[c.guid] = c;
      this.global[e] = true
    },
    guid: 1,
    global: {},
    remove: function (d, c, b) {
      var e = E.data(d, "events"),
        ret,
        index;
      if (typeof c == "string") {
        var a = c.split(".");
        c = a[0]
      }
      if (e) {
        if (c && c.type) {
          b = c.handler;
          c = c.type
        }
        if (!c) {
          for (c in e) this.remove(d, c)
        } else if (e[c]) {
          if (b) delete e[c][b.guid];
          else for (b in e[c]) if (!a[1] || e[c][b].type == a[1]) delete e[c][b];
          for (ret in e[c]) break;
          if (!ret) {
            if (d.removeEventListener) d.removeEventListener(c, E.data(d, "handle"), false);
            else d.detachEvent("on" + c, E.data(d, "handle"));
            ret = null;
            delete e[c]
          }
        }
        for (ret in e) break;
        if (!ret) {
          E.removeData(d, "events");
          E.removeData(d, "handle")
        }
      }
    },
    trigger: function (d, b, e, c, f) {
      b = E.makeArray(b || []);
      if (!e) {
        if (this.global[d]) E("*").add([window, document]).trigger(d, b)
      } else {
        var a, ret, fn = E.isFunction(e[d] || null),
          event = !b[0] || !b[0].preventDefault;
        if (event) b.unshift(this.fix({
          type: d,
          target: e
        }));
        b[0].type = d;
        if (E.isFunction(E.data(e, "handle"))) a = E.data(e, "handle").apply(e, b);
        if (!fn && e["on" + d] && e["on" + d].apply(e, b) === false) a = false;
        if (event) b.shift();
        if (f && f.apply(e, b) === false) a = false;
        if (fn && c !== false && a !== false && !(E.nodeName(e, 'a') && d == "click")) {
          this.triggered = true;
          e[d]()
        }
        this.triggered = false
      }
      return a
    },
    handle: function (c) {
      var a;
      c = E.event.fix(c || window.event || {});
      var b = c.type.split(".");
      c.type = b[0];
      var f = E.data(this, "events") && E.data(this, "events")[c.type],
        args = Array.prototype.slice.call(arguments, 1);
      args.unshift(c);
      for (var j in f) {
        var d = f[j];
        args[0].handler = d;
        args[0].data = d.data;
        if (!b[1] || d.type == b[1]) {
          var e = d.apply(this, args);
          if (a !== false) a = e;
          if (e === false) {
            c.preventDefault();
            c.stopPropagation()
          }
        }
      }
      if (E.browser.msie) c.target = c.preventDefault = c.stopPropagation = c.handler = c.data = null;
      return a
    },
    fix: function (c) {
      var a = c;
      c = E.extend({},
        a);
      c.preventDefault = function () {
        if (a.preventDefault) a.preventDefault();
        a.returnValue = false
      };
      c.stopPropagation = function () {
        if (a.stopPropagation) a.stopPropagation();
        a.cancelBubble = true
      };
      if (!c.target) c.target = c.srcElement || document;
      if (c.target.nodeType == 3) c.target = a.target.parentNode;
      if (!c.relatedTarget && c.fromElement) c.relatedTarget = c.fromElement == c.target ? c.toElement : c.fromElement;
      if (c.pageX == null && c.clientX != null) {
        var b = document.documentElement,
          body = document.body;
        c.pageX = c.clientX + (b && b.scrollLeft || body && body.scrollLeft || 0) - (b.clientLeft || 0);
        c.pageY = c.clientY + (b && b.scrollTop || body && body.scrollTop || 0) - (b.clientLeft || 0)
      }
      if (!c.which && (c.charCode || c.keyCode)) c.which = c.charCode || c.keyCode;
      if (!c.metaKey && c.ctrlKey) c.metaKey = c.ctrlKey;
      if (!c.which && c.button) c.which = (c.button & 1 ? 1 : (c.button & 2 ? 3 : (c.button & 4 ? 2 : 0)));
      return c
    }
  };
  E.fn.extend({
    bind: function (c, a, b) {
      return c == "unload" ? this.one(c, a, b) : this.each(function () {
        E.event.add(this, c, b || a, b && a)
      })
    },
    one: function (d, b, c) {
      return this.each(function () {
        E.event.add(this, d,
          function (a) {
            E(this).unbind(a);
            return (c || b).apply(this, arguments)
          },
          c && b)
      })
    },
    unbind: function (a, b) {
      return this.each(function () {
        E.event.remove(this, a, b)
      })
    },
    trigger: function (c, a, b) {
      return this.each(function () {
        E.event.trigger(c, a, this, true, b)
      })
    },
    triggerHandler: function (c, a, b) {
      if (this[0]) return E.event.trigger(c, a, this[0], false, b)
    },
    toggle: function () {
      var b = arguments;
      return this.click(function (a) {
        this.lastToggle = 0 == this.lastToggle ? 1 : 0;
        a.preventDefault();
        return b[this.lastToggle].apply(this, arguments) || false
      })
    },
    hover: function (c, d) {
      function handleHover (a) {
        var b = a.relatedTarget;
        while (b && b != this) try {
          b = b.parentNode
        } catch (error) {
          b = this
        };
        if (b == this) return true;
        return (a.type == "mouseover" ? c : d).apply(this, [a])
      }
      return this.mouseover(handleHover).mouseout(handleHover)
    },
    ready: function (a) {
      bindReady();
      if (E.isReady) a.apply(document, [E]);
      else E.readyList.push(function () {
        return a.apply(this, [E])
      });
      return this
    }
  });
  E.extend({
    isReady: false,
    readyList: [],
    ready: function () {
      if (!E.isReady) {
        E.isReady = true;
        if (E.readyList) {
          E.each(E.readyList,
            function () {
              this.apply(document)
            });
          E.readyList = null
        }
        if (document.removeEventListener) document.removeEventListener("DOMContentLoaded", E.ready, false)
      }
    }
  });
  E.each(("blur,focus,load,resize,scroll,unload,click,dblclick," + "mousedown,mouseup,mousemove,mouseover,mouseout,change,select," + "submit,keydown,keypress,keyup,error").split(","),
    function (i, b) {
      E.fn[b] = function (a) {
        return a ? this.bind(b, a) : this.trigger(b)
      }
    });
  var x = false;
  function bindReady () {
    if (x) return;
    x = true;
    if (document.addEventListener) document.addEventListener("DOMContentLoaded", E.ready, false);
    if (E.browser.msie || E.browser.safari) (function () {
      try {
        if (E.browser.msie || document.readyState != "loaded" && document.readyState != "complete") document.documentElement.doScroll("left")
      } catch (error) {
        return setTimeout(arguments.callee, 0)
      }
      E.ready()
    })();
    E.event.add(window, "load", E.ready)
  }
  E(window).bind("unload",
    function () {
      E("*").add(document).unbind()
    });
  E.fn.extend({
    load: function (g, d, c) {
      if (E.isFunction(g)) return this.bind("load", g);
      var e = g.indexOf(" ");
      if (e >= 0) {
        var i = g.slice(e, g.length);
        g = g.slice(0, e)
      }
      c = c ||
        function () { };
      var f = "GET";
      if (d) if (E.isFunction(d)) {
        c = d;
        d = null
      } else {
        d = E.param(d);
        f = "POST"
      }
      var h = this;
      E.ajax({
        url: g,
        type: f,
        data: d,
        complete: function (a, b) {
          if (b == "success" || b == "notmodified") h.html(i ? E("<div/>").append(a.responseText.replace(/<script(.|\s)*?\/script>/g, "")).find(i) : a.responseText);
          h.each(c, [a.responseText, b, a])
        }
      });
      return this
    },
    serialize: function () {
      return E.param(this.serializeArray())
    },
    serializeArray: function () {
      return this.map(function () {
        return E.nodeName(this, "form") ? E.makeArray(this.elements) : this
      }).filter(function () {
        return this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type))
      }).map(function (i, c) {
        var b = E(this).val();
        return b == null ? null : b.constructor == Array ? E.map(b,
          function (a, i) {
            return {
              name: c.name,
              value: a
            }
          }) : {
            name: c.name,
            value: b
          }
      }).get()
    }
  });
  E.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),
    function (i, o) {
      E.fn[o] = function (f) {
        return this.bind(o, f)
      }
    });
  var B = (new Date).getTime();
  E.extend({
    get: function (d, b, a, c) {
      if (E.isFunction(b)) {
        a = b;
        b = null
      }
      return E.ajax({
        type: "GET",
        url: d,
        data: b,
        success: a,
        dataType: c
      })
    },
    getScript: function (b, a) {
      return E.get(b, null, a, "script")
    },
    getJSON: function (c, b, a) {
      return E.get(c, b, a, "json")
    },
    post: function (d, b, a, c) {
      if (E.isFunction(b)) {
        a = b;
        b = {}
      }
      return E.ajax({
        type: "POST",
        url: d,
        data: b,
        success: a,
        dataType: c
      })
    },
    ajaxSetup: function (a) {
      E.extend(E.ajaxSettings, a)
    },
    ajaxSettings: {
      global: true,
      type: "GET",
      timeout: 0,
      contentType: "application/x-www-form-urlencoded",
      processData: true,
      async: true,
      data: null
    },
    lastModified: {},
    ajax: function (s) {
      var f, jsre = /=(\?|%3F)/g,
        status, data;
      s = E.extend(true, s, E.extend(true, {},
        E.ajaxSettings, s));
      if (s.data && s.processData && typeof s.data != "string") s.data = E.param(s.data);
      if (s.dataType == "jsonp") {
        if (s.type.toLowerCase() == "get") {
          if (!s.url.match(jsre)) s.url += (s.url.match(/\?/) ? "&" : "?") + (s.jsonp || "callback") + "=?"
        } else if (!s.data || !s.data.match(jsre)) s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?";
        s.dataType = "json"
      }
      if (s.dataType == "json" && (s.data && s.data.match(jsre) || s.url.match(jsre))) {
        f = "jsonp" + B++;
        if (s.data) s.data = (s.data + "").replace(jsre, "=" + f);
        s.url = s.url.replace(jsre, "=" + f);
        s.dataType = "script";
        window[f] = function (a) {
          data = a;
          success();
          complete();
          window[f] = undefined;
          try {
            delete window[f]
          } catch (e) { }
        }
      }
      if (s.dataType == "script" && s.cache == null) s.cache = false;
      if (s.cache === false && s.type.toLowerCase() == "get") s.url += (s.url.match(/\?/) ? "&" : "?") + "_=" + (new Date()).getTime();
      if (s.data && s.type.toLowerCase() == "get") {
        s.url += (s.url.match(/\?/) ? "&" : "?") + s.data;
        s.data = null
      }
      if (s.global && !E.active++) E.event.trigger("ajaxStart");
      if (!s.url.indexOf("http") && (s.dataType == "script" || s.dataType == "json")) {
        var h = document.getElementsByTagName("head")[0];
        var g = document.createElement("script");
        g.src = s.url;
        if (!f) {
          var j = false;
          g.onload = g.onreadystatechange = function () {
            if (!j && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
              j = true;
              success();
              complete();
              h.removeChild(g)
            }
          }
        }
        h.appendChild(g);
        return
      }
      var k = false;
      var i = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
      i.open(s.type, s.url, s.async);
      if (s.data) i.setRequestHeader("Content-Type", s.contentType);
      if (s.ifModified) i.setRequestHeader("If-Modified-Since", E.lastModified[s.url] || "Thu, 01 Jan 1970 00:00:00 GMT");
      i.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      if (s.beforeSend) s.beforeSend(i);
      if (s.global) E.event.trigger("ajaxSend", [i, s]);
      var c = function (a) {
        if (!k && i && (i.readyState == 4 || a == "timeout")) {
          k = true;
          if (d) {
            clearInterval(d);
            d = null
          }
          status = a == "timeout" && "timeout" || !E.httpSuccess(i) && "error" || s.ifModified && E.httpNotModified(i, s.url) && "notmodified" || "success";
          if (status == "success") {
            try {
              data = E.httpData(i, s.dataType)
            } catch (e) {
              status = "parsererror"
            }
          }
          if (status == "success") {
            var b;
            try {
              b = i.getResponseHeader("Last-Modified")
            } catch (e) { }
            if (s.ifModified && b) E.lastModified[s.url] = b;
            if (!f) success()
          } else E.handleError(s, i, status);
          complete();
          if (s.async) i = null
        }
      };
      if (s.async) {
        var d = setInterval(c, 13);
        if (s.timeout > 0) setTimeout(function () {
          if (i) {
            i.abort();
            if (!k) c("timeout")
          }
        },
          s.timeout)
      }
      try {
        i.send(s.data)
      } catch (e) {
        E.handleError(s, i, null, e)
      }
      if (!s.async) c();
      return i;
      function success () {
        if (s.success) s.success(data, status);
        if (s.global) E.event.trigger("ajaxSuccess", [i, s])
      }
      function complete () {
        if (s.complete) s.complete(i, status);
        if (s.global) E.event.trigger("ajaxComplete", [i, s]);
        if (s.global && !--E.active) E.event.trigger("ajaxStop")
      }
    },
    handleError: function (s, a, b, e) {
      if (s.error) s.error(a, b, e);
      if (s.global) E.event.trigger("ajaxError", [a, s, e])
    },
    active: 0,
    httpSuccess: function (r) {
      try {
        return !r.status && location.protocol == "file:" || (r.status >= 200 && r.status < 300) || r.status == 304 || r.status == 1223 || E.browser.safari && r.status == undefined
      } catch (e) { }
      return false
    },
    httpNotModified: function (a, c) {
      try {
        var b = a.getResponseHeader("Last-Modified");
        return a.status == 304 || b == E.lastModified[c] || E.browser.safari && a.status == undefined
      } catch (e) { }
      return false
    },
    httpData: function (r, b) {
      var c = r.getResponseHeader("content-type");
      var d = b == "xml" || !b && c && c.indexOf("xml") >= 0;
      var a = d ? r.responseXML : r.responseText;
      if (d && a.documentElement.tagName == "parsererror") throw "parsererror";
      if (b == "script") E.globalEval(a);
      if (b == "json") a = eval("(" + a + ")");
      return a
    },
    param: function (a) {
      var s = [];
      if (a.constructor == Array || a.jquery) E.each(a,
        function () {
          s.push(encodeURIComponent(this.name) + "=" + encodeURIComponent(this.value))
        });
      else for (var j in a) if (a[j] && a[j].constructor == Array) E.each(a[j],
        function () {
          s.push(encodeURIComponent(j) + "=" + encodeURIComponent(this))
        });
      else s.push(encodeURIComponent(j) + "=" + encodeURIComponent(a[j]));
      return s.join("&").replace(/%20/g, "+")
    }
  });
  E.fn.extend({
    show: function (b, a) {
      return b ? this.animate({
        height: "show",
        width: "show",
        opacity: "show"
      },
        b, a) : this.filter(":hidden").each(function () {
          this.style.display = this.oldblock ? this.oldblock : "";
          if (E.css(this, "display") == "none") this.style.display = "block"
        }).end()
    },
    hide: function (b, a) {
      return b ? this.animate({
        height: "hide",
        width: "hide",
        opacity: "hide"
      },
        b, a) : this.filter(":visible").each(function () {
          this.oldblock = this.oldblock || E.css(this, "display");
          if (this.oldblock == "none") this.oldblock = "block";
          this.style.display = "none"
        }).end()
    },
    _toggle: E.fn.toggle,
    toggle: function (a, b) {
      return E.isFunction(a) && E.isFunction(b) ? this._toggle(a, b) : a ? this.animate({
        height: "toggle",
        width: "toggle",
        opacity: "toggle"
      },
        a, b) : this.each(function () {
          E(this)[E(this).is(":hidden") ? "show" : "hide"]()
        })
    },
    slideDown: function (b, a) {
      return this.animate({
        height: "show"
      },
        b, a)
    },
    slideUp: function (b, a) {
      return this.animate({
        height: "hide"
      },
        b, a)
    },
    slideToggle: function (b, a) {
      return this.animate({
        height: "toggle"
      },
        b, a)
    },
    fadeIn: function (b, a) {
      return this.animate({
        opacity: "show"
      },
        b, a)
    },
    fadeOut: function (b, a) {
      return this.animate({
        opacity: "hide"
      },
        b, a)
    },
    fadeTo: function (c, a, b) {
      return this.animate({
        opacity: a
      },
        c, b)
    },
    animate: function (l, k, j, h) {
      var i = E.speed(k, j, h);
      return this[i.queue === false ? "each" : "queue"](function () {
        var g = E.extend({},
          i);
        var f = E(this).is(":hidden"),
          self = this;
        for (var p in l) {
          if (l[p] == "hide" && f || l[p] == "show" && !f) return E.isFunction(g.complete) && g.complete.apply(this);
          if (p == "height" || p == "width") {
            g.display = E.css(this, "display");
            g.overflow = this.style.overflow
          }
        }
        if (g.overflow != null) this.style.overflow = "hidden";
        g.curAnim = E.extend({},
          l);
        E.each(l,
          function (c, a) {
            var e = new E.fx(self, g, c);
            if (/toggle|show|hide/.test(a)) e[a == "toggle" ? f ? "show" : "hide" : a](l);
            else {
              var b = a.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
                start = e.cur(true) || 0;
              if (b) {
                var d = parseFloat(b[2]),
                  unit = b[3] || "px";
                if (unit != "px") {
                  self.style[c] = (d || 1) + unit;
                  start = ((d || 1) / e.cur(true)) * start;
                  self.style[c] = start + unit
                }
                if (b[1]) d = ((b[1] == "-=" ? -1 : 1) * d) + start;
                e.custom(start, d, unit)
              } else e.custom(start, a, "")
            }
          });
        return true
      })
    },
    queue: function (a, b) {
      if (E.isFunction(a) || (a && a.constructor == Array)) {
        b = a;
        a = "fx"
      }
      if (!a || (typeof a == "string" && !b)) return A(this[0], a);
      return this.each(function () {
        if (b.constructor == Array) A(this, a, b);
        else {
          A(this, a).push(b);
          if (A(this, a).length == 1) b.apply(this)
        }
      })
    },
    stop: function (b, c) {
      var a = E.timers;
      if (b) this.queue([]);
      this.each(function () {
        for (var i = a.length - 1; i >= 0; i--) if (a[i].elem == this) {
          if (c) a[i](true);
          a.splice(i, 1)
        }
      });
      if (!c) this.dequeue();
      return this
    }
  });
  var A = function (b, c, a) {
    if (!b) return;
    c = c || "fx";
    var q = E.data(b, c + "queue");
    if (!q || a) q = E.data(b, c + "queue", a ? E.makeArray(a) : []);
    return q
  };
  E.fn.dequeue = function (a) {
    a = a || "fx";
    return this.each(function () {
      var q = A(this, a);
      q.shift();
      if (q.length) q[0].apply(this)
    })
  };
  E.extend({
    speed: function (b, a, c) {
      var d = b && b.constructor == Object ? b : {
        complete: c || !c && a || E.isFunction(b) && b,
        duration: b,
        easing: c && a || a && a.constructor != Function && a
      };
      d.duration = (d.duration && d.duration.constructor == Number ? d.duration : {
        slow: 600,
        fast: 200
      }[d.duration]) || 400;
      d.old = d.complete;
      d.complete = function () {
        if (d.queue !== false) E(this).dequeue();
        if (E.isFunction(d.old)) d.old.apply(this)
      };
      return d
    },
    easing: {
      linear: function (p, n, b, a) {
        return b + a * p
      },
      swing: function (p, n, b, a) {
        return ((- Math.cos(p * Math.PI) / 2) + 0.5) * a + b
      }
    },
    timers: [],
    timerId: null,
    fx: function (b, c, a) {
      this.options = c;
      this.elem = b;
      this.prop = a;
      if (!c.orig) c.orig = {}
    }
  });
  E.fx.prototype = {
    update: function () {
      if (this.options.step) this.options.step.apply(this.elem, [this.now, this]); (E.fx.step[this.prop] || E.fx.step._default)(this);
      if (this.prop == "height" || this.prop == "width") this.elem.style.display = "block"
    },
    cur: function (a) {
      if (this.elem[this.prop] != null && this.elem.style[this.prop] == null) return this.elem[this.prop];
      var r = parseFloat(E.css(this.elem, this.prop, a));
      return r && r > -10000 ? r : parseFloat(E.curCSS(this.elem, this.prop)) || 0
    },
    custom: function (c, b, d) {
      this.startTime = (new Date()).getTime();
      this.start = c;
      this.end = b;
      this.unit = d || this.unit || "px";
      this.now = this.start;
      this.pos = this.state = 0;
      this.update();
      var e = this;
      function t (a) {
        return e.step(a)
      }
      t.elem = this.elem;
      E.timers.push(t);
      if (E.timerId == null) {
        E.timerId = setInterval(function () {
          var a = E.timers;
          for (var i = 0; i < a.length; i++) if (!a[i]()) a.splice(i--, 1);
          if (!a.length) {
            clearInterval(E.timerId);
            E.timerId = null
          }
        },
          13)
      }
    },
    show: function () {
      this.options.orig[this.prop] = E.attr(this.elem.style, this.prop);
      this.options.show = true;
      this.custom(0, this.cur());
      if (this.prop == "width" || this.prop == "height") this.elem.style[this.prop] = "1px";
      E(this.elem).show()
    },
    hide: function () {
      this.options.orig[this.prop] = E.attr(this.elem.style, this.prop);
      this.options.hide = true;
      this.custom(this.cur(), 0)
    },
    step: function (a) {
      var t = (new Date()).getTime();
      if (a || t > this.options.duration + this.startTime) {
        this.now = this.end;
        this.pos = this.state = 1;
        this.update();
        this.options.curAnim[this.prop] = true;
        var b = true;
        for (var i in this.options.curAnim) if (this.options.curAnim[i] !== true) b = false;
        if (b) {
          if (this.options.display != null) {
            this.elem.style.overflow = this.options.overflow;
            this.elem.style.display = this.options.display;
            if (E.css(this.elem, "display") == "none") this.elem.style.display = "block"
          }
          if (this.options.hide) this.elem.style.display = "none";
          if (this.options.hide || this.options.show) for (var p in this.options.curAnim) E.attr(this.elem.style, p, this.options.orig[p])
        }
        if (b && E.isFunction(this.options.complete)) this.options.complete.apply(this.elem);
        return false
      } else {
        var n = t - this.startTime;
        this.state = n / this.options.duration;
        this.pos = E.easing[this.options.easing || (E.easing.swing ? "swing" : "linear")](this.state, n, 0, 1, this.options.duration);
        this.now = this.start + ((this.end - this.start) * this.pos);
        this.update()
      }
      return true
    }
  };
  E.fx.step = {
    scrollLeft: function (a) {
      a.elem.scrollLeft = a.now
    },
    scrollTop: function (a) {
      a.elem.scrollTop = a.now
    },
    opacity: function (a) {
      E.attr(a.elem.style, "opacity", a.now)
    },
    _default: function (a) {
      a.elem.style[a.prop] = a.now + a.unit
    }
  };
  E.fn.offset = function () {
    var b = 0,
      top = 0,
      elem = this[0],
      results;
    if (elem) with (E.browser) {
      var d = elem.parentNode,
        offsetChild = elem,
        offsetParent = elem.offsetParent,
        doc = elem.ownerDocument,
        safari2 = safari && parseInt(version) < 522,
        fixed = E.css(elem, "position") == "fixed";
      if (elem.getBoundingClientRect) {
        var c = elem.getBoundingClientRect();
        add(c.left + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft), c.top + Math.max(doc.documentElement.scrollTop, doc.body.scrollTop));
        if (msie) {
          var e = E("html").css("borderWidth");
          e = (e == "medium" || E.boxModel && parseInt(version) >= 7) && 2 || e;
          add(- e, -e)
        }
      } else {
        add(elem.offsetLeft, elem.offsetTop);
        while (offsetParent) {
          add(offsetParent.offsetLeft, offsetParent.offsetTop);
          if (mozilla && !/^t(able|d|h)$/i.test(offsetParent.tagName) || safari && !safari2) e(offsetParent);
          if (!fixed && E.css(offsetParent, "position") == "fixed") fixed = true;
          offsetChild = /^body$/i.test(offsetParent.tagName) ? offsetChild : offsetParent;
          offsetParent = offsetParent.offsetParent
        }
        while (d.tagName && !/^body|html$/i.test(d.tagName)) {
          if (!/^inline|table-row.*$/i.test(E.css(d, "display"))) add(- d.scrollLeft, -d.scrollTop);
          if (mozilla && E.css(d, "overflow") != "visible") e(d);
          d = d.parentNode
        }
        if ((safari2 && (fixed || E.css(offsetChild, "position") == "absolute")) || (mozilla && E.css(offsetChild, "position") != "absoltue")) add(- doc.body.offsetLeft, -doc.body.offsetTop);
        if (fixed) add(Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft), Math.max(doc.documentElement.scrollTop, doc.body.scrollTop))
      }
      results = {
        top: top,
        left: b
      }
    }
    return results;
    function e (a) {
      add(E.css(a, "borderLeftWidth"), E.css(a, "borderTopWidth"))
    }
    function add (l, t) {
      b += parseInt(l) || 0;
      top += parseInt(t) || 0
    }
  }
})();