---
---

/* global angular */

var dims = function(i, el) {
  return { width: angular.element(el).width(), height: angular.element(el).height() };
};

angular
  .module('johnkurkowski', [])
  /**
   * On window resize, resizes the element's background image height to the
   * attribute's ratio.
   */
  .directive('backgroundResizeHeightRatio', function() {
    return function(scope, element, attrs) {
      var bg = /url[('"]+([^)'"]+)/.exec(element.css('background-image'))[1],
        resize = function() {
          var ratio = parseFloat(attrs.backgroundResizeHeightRatio);
          element.height(Math.floor(element.width() / ratio));
          scope.$apply();
        };

      angular.element('<img>').on('load', function() {
        resize();
        angular.element(window).on('resize', resize);
      }).attr('src', bg);
    };
  })
  .directive('resizeFromSiblings', function() {
    return function(scope, element) {
      var resize = function() {
          var parentRect = element.parent()[0].getBoundingClientRect(),
            prev = element.prev().length ? element.prev()[0].getBoundingClientRect().bottom : parentRect.top,
            next = element.next().length ? element.next()[0].getBoundingClientRect().top : parentRect.bottom;

          element.height(next - prev);
        },
        resizeApply = function() {
          resize();
          scope.$apply();
        },
        dimsToWatch = function() {
          var els = element.parent().add(element.prev()).add(element.next()),
            dims = els.toArray().map(function domRect2Pojo(el) {
              var rect = el.getBoundingClientRect();
              return {
                bottom: rect.bottom,
                left: rect.left,
                right: rect.right,
                top: rect.top,
              };
            });
          return dims;
        },
        deepEquals = true;

      resize();
      angular.element(document).on('scroll', resizeApply);
      scope.$watch(dimsToWatch, resize, deepEquals);
    };
  })
  /**
   * Fixes the element at the bottom of the viewport as long as the viewport is
   * within the element matched by the attribute's selector.
   */
  .directive('scrollBottomWithin', function() {
    return function(scope, element, attrs) {
      var selector = attrs.scrollBottomWithin,
        withinEl = angular.element(selector),

        scrollBottom = function() {
          var win = angular.element(window),
            viewportHeight = win.scrollTop() + win.innerHeight(),
            includeMargin = true,
            withinTop = withinEl.offset().top + withinEl.height(),
            isWithin = viewportHeight < withinTop,
            showScrollInstruction = viewportHeight < withinTop * 1.1;

          if (isWithin) {
            element.css({
              position: 'fixed',
              top: 'auto',
              bottom: 0,
            });
          }
          else {
            element.css({
              position: 'absolute',
              top: withinTop - element.outerHeight(includeMargin),
              bottom: 'auto',
            });
          }

          // TODO: externalize
          element.find('.scroll-instruction').toggleClass('show-instruction', showScrollInstruction);
        },

        dimsToWatch = function() {
          return element.add(withinEl).map(dims).toArray();
        },

        deepEquals = true;

      scope.$watch(dimsToWatch, scrollBottom, deepEquals);
      angular.element(document).on('scroll', scrollBottom);
      angular.element(window).on('resize', scrollBottom);
    };
  });

(function() {
  var disqus_loaded = false,
    load_disqus = function() {
      var dsq;
      var disqus_shortname;

      disqus_shortname = window.disqus_shortname = 'johnkurkowski';

      dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    };

  window.onscroll = function() {
    if (disqus_loaded) {
      return;
    }

    const disqus_thread = document.getElementById('disqus_thread');
    if (!disqus_thread) {
      return;
    }

    const load_range_px = 600;
    const scroll_height = window.innerHeight || document.documentElement.clientHeight;
    const disqus_top = disqus_thread.getBoundingClientRect().top;
    if (scroll_height + load_range_px >= disqus_top) {
      disqus_loaded = true;
      load_disqus();
    }
  };
})();
