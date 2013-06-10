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
            element.height(element.width() / ratio);
            scope.$apply();
          };

      angular.element('<img>').load(function() {
        resize();
        angular.element(window).on('resize', resize);
      }).attr('src', bg);
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
                isWithin = viewportHeight < withinTop;

            if (isWithin) {
              element.css({
                position: 'fixed',
                top: 'auto',
                bottom: 0
              });
            }
            else {
              element.css({
                position: 'absolute',
                top: withinTop - element.outerHeight(includeMargin),
                bottom: 'auto'
              });
            }

            // TODO: externalize
            element.find('.scroll-instruction').toggleClass('show-instruction', isWithin);
          },

          dimsToWatch = function() {
            return element.add(withinEl).map(dims).toArray();
          },

          deepEquals = true;

      scope.$watch(dimsToWatch, scrollBottom, deepEquals);
      angular.element(document).on('scroll', scrollBottom);
    };
  });

(function() {
  var disqus_loaded = false,
      load_disqus = function() {
        var dsq;

        window.disqus_shortname = 'johnkurkowski';

        dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
      };

  window.onscroll = function(evt) {
    var disqus_thread,
        load_range_px = 600;

    if (!disqus_loaded && (disqus_thread = document.getElementById('disqus_thread')) && (window.innerHeight || document.documentElement.clientHeight) + load_range_px >= disqus_thread.getBoundingClientRect().top) {
      disqus_loaded = true;
      load_disqus();
    }
  };
})();
