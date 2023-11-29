
var ua = navigator.userAgent; /Safari|iPhone/i.test(ua) && 0 == /chrome/i.test(ua) && $("#aside-nav").addClass("no-filter");
var drags = { down: !1, x: 0, y: 0, winWid: 0, winHei: 0, clientX: 0, clientY: 0 },
  asideNav = $("#aside-nav")[0],
  getCss = function (a, e) { return a.currentStyle ? a.currentStyle[e] : document.defaultView.getComputedStyle(a, !1)[e] };
$("#aside-nav").on("mousedown", function (a) {
  drags.down = !0,
    drags.clientX = a.clientX,
    drags.clientY = a.clientY,
    drags.x = getCss(this, "right"),
    drags.y = getCss(this, "top"),
    drags.winHei = $(window).height(),
    drags.winWid = $(window).width(),
    $(document).on("mousemove", function (a) {
      if (drags.winWid > 640 && (a.clientX < 120 || a.clientX > drags.winWid - 50))//50px
        return !1 /*,console.log(!1)*/;
      if (a.clientY < 180 || a.clientY > drags.winHei - 120)//导航高度
        return !1;
      var e = a.clientX - drags.clientX,
        t = a.clientY - drags.clientY;
      asideNav.style.top = parseInt(drags.y) + t + "px";
      asideNav.style.right = parseInt(drags.x) - e + "px";
    })
}).on("mouseup", function () { drags.down = !1, $(document).off("mousemove") });


(function ($) {
  'use strict';
  $.fn.scrollupmenu = function () {
    var $window = $(window),
      $document = $(document),
      $menu = this,
      timeout,
      lastY = 0; // Keep track of the last Y to detect scroll direction.

    $window.scroll(function () {
       // Cancel the event fired by the previous scroll.
       if (timeout) {
        clearTimeout(timeout);
      }
      var y = $window.scrollTop();
      // Ignore elastic scrolling.
      if (y < 0 || y > ($document.height() - $window.height())) {
        return;
      }
      if (y < lastY) { // Scrolling up
        //show
        if (lastY - y > 10) {
          if (!$menu.is(":visible")) {
            $menu.show();
            timeout = setTimeout(function () {
              $menu.hide();
            }, 10000);//hidden in 10s
          }
        }
      } else { // Scrolling down
        //hidden
        if (y - lastY > 10) {
          if ($menu.is(":visible")) {
            $menu.fadeOut(1000);
          }
        }
      }
      lastY = y;
    });
    return this;
  };
})(jQuery);





