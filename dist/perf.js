/** Lazy-load images, prefetch city pages on hover, reduce layout shift helpers */
(function () {
  function optimizeImages() {
    var imgs = document.querySelectorAll("img");
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      if (!img.getAttribute("loading")) {
        img.loading = i === 0 ? "eager" : "lazy";
      }
      img.decoding = "async";
      if (i === 0 && !img.getAttribute("fetchpriority")) {
        img.setAttribute("fetchpriority", "high");
      }
    }
  }

  function prefetchRoutes() {
    var routes = ["/lincoln", "/kearney"];
    function warm(url) {
      var l = document.createElement("link");
      l.rel = "prefetch";
      l.href = url;
      document.head.appendChild(l);
    }
    document.querySelectorAll('a[href="/lincoln"], a[href="/kearney"]').forEach(function (a) {
      a.addEventListener(
        "mouseenter",
        function () {
          warm(a.getAttribute("href"));
        },
        { once: true, passive: true }
      );
    });
    if ("requestIdleCallback" in window) {
      requestIdleCallback(function () {
        routes.forEach(warm);
      });
    }
  }

  var obs = new MutationObserver(function () {
    optimizeImages();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      optimizeImages();
      prefetchRoutes();
      var root = document.getElementById("root");
      if (root) obs.observe(root, { childList: true, subtree: true });
    });
  } else {
    optimizeImages();
    prefetchRoutes();
  }
})();
