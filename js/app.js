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
