(function() {
  var disqus_loaded = false,
    load_disqus = function () {
      var dsq
      var disqus_shortname

      disqus_shortname = window.disqus_shortname = 'johnkurkowski'

      dsq = document.createElement('script')
      dsq.type = 'text/javascript'
      dsq.async = true
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js'
      ;(
        document.getElementsByTagName('head')[0] ||
        document.getElementsByTagName('body')[0]
      ).appendChild(dsq)
    }

  window.onscroll = function () {
    if (disqus_loaded) {
      return
    }

    const disqus_thread = document.getElementById('disqus_thread')
    if (!disqus_thread) {
      return
    }

    const load_range_px = 600
    const scroll_height =
      window.innerHeight || document.documentElement.clientHeight
    const disqus_top = disqus_thread.getBoundingClientRect().top
    if (scroll_height + load_range_px >= disqus_top) {
      disqus_loaded = true
      load_disqus()
    }
  }
})()
