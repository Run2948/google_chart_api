(function ($) {
  $.scrollTo = function (a, b) {
    return $('html,body').scrollTo(a, b)
  };
  $.scrollTo.defaults = {
    axis: 'y',
    speed: 1
  };
  $.fn.scrollTo = function (d, e) {
    e = $.extend({},
      $.scrollTo.defaults, e);
    e.queue = e.queue && e.axis.length == 2;
    if (e.queue) e.speed = Math.ceil(e.speed / 2);
    if (typeof e.offset == 'number') e.offset = {
      left: e.offset,
      top: e.offset
    };
    return this.each(function () {
      var c = $(this),
        t = d,
        q,
        r = {};
      switch (typeof t) {
        case 'number':
        case 'string':
          if (/^([+-]=)?\d+(px)?$/.test(t)) {
            t = {
              top: t,
              left: t
            };
            break
          }
          t = $(t, this);
        case 'object':
          if (t.is || t.style) q = (t = $(t)).offset()
      }
      $.each(e.axis.split(''), parse);
      animate(e.onAfter);
      function parse (i, b) {
        var P = b == 'x' ? 'Left' : 'Top',
          p = P.toLowerCase(),
          k = 'scroll' + P,
          a = c[0][k];
        r[k] = q ? q[p] + (c.is('html,body') ? 0 : a - c.offset()[p]) : t[p];
        if (e.margin && t.css) r[k] -= parseInt(t.css('margin' + P)) || 0;
        if (e.offset && e.offset[p]) r[k] += e.offset[p];
        if (!i && e.queue) {
          if (a != r[k]) animate(e.onAfterFirst);
          delete r[k]
        }
      };
      function animate (a) {
        c.animate(r, e.speed, e.easing,
          function () {
            if (a) a.call(this, c, r, t)
          })
      }
    })
  }
})(jQuery);
$(document).ready(function () {
  var maxWidth = 760;
  if ($.browser.msie && $.browser.version < 7) {
    $("#wrap").width(Math.min($(window).width(), maxWidth))
  }
  $("#lastModified").text(document.lastModified);
  var url = "https://github.com/Run2948/google_chart_api/blob/master/api.html";
  var contents = "";
  $("div.section h4:has(a)").each(function () {
    contents += '<li><a href="' + url + '#' + $(this).children("a:first").attr("name") + '" scrollto="' + $(this).children("a:first").attr("name") + '">' + $(this).text() + '</a></li>'
  }).css("cursor", "pointer").click(function () {
    $(this).next("div.scrap").slideToggle("fast")
  });
  contents = '<ol>' + contents + '</ol>';
  $("#content").html(contents);
  var backtocontent = '<p class="backToTop">';
  backtocontent += '<a href="' + url + '#contents" scrollto="contents">↑返回目录</a>';
  backtocontent += '</p>';
  $("h5,h6").before(backtocontent);
  $("div.scrap").append(backtocontent);
  $("a[scrollto!=]").click(function () {
    $.scrollTo("a[name=" + $(this).attr("scrollto") + "]", {
      speed: 500,
      axis: 'y',
      offset: {
        top: -24,
        left: 0
      }
    });
    return false
  });
  $("a:not([href^=https://github.com/Run2948/])").attr("target", "_blank");
  $(window).resize(function () {
    $("#wrap").width(Math.min($(window).width(), maxWidth))
  });
  $.getScript("http://www.google-analytics.com/urchin.js",
    function () {
      _uacct = "UA-3179915-1";
      urchinTracker()
    })
});