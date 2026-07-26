(function () {
  var PAGES = [{"path":"/","title":"House & Office Cleaning Lincoln & Kearney NE | Reef Cleaning","description":"Reef Cleaning — Lincoln & Kearney's trusted cleaners. Residential, commercial, deep, move-in/out cleaning & subscription plans. Call (402) 235-6046 for a free quote.","canonical":"https://dirtyreefcleaning.com/"},{"path":"/lincoln","title":"House Cleaning Lincoln NE | Commercial & Deep Clean | Reef Cleaning","description":"Top-rated house & office cleaning in Lincoln, Nebraska — South, North, East & West Lincoln. Deep clean, move-out, subscriptions. Free quote: (402) 235-6046.","canonical":"https://dirtyreefcleaning.com/lincoln"},{"path":"/kearney","title":"House Cleaning Kearney NE | Office & Move-Out Clean | Reef Cleaning","description":"Professional cleaning in Kearney, NE — Central, Downtown & all neighborhoods. Residential, commercial, move-out & subscription plans. Free quote: (402) 235-6046.","canonical":"https://dirtyreefcleaning.com/kearney"}];
  var OG_IMAGE = "https://dirtyreefcleaning.com/assets/1_reef_cleaning_truck_1785021570012-DQ92KwYj.png";

  function setMeta(attr, key, value) {
    if (!value) return;
    var el = document.querySelector('meta[' + attr + '="' + key + '"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", value);
  }

  function apply(pathname) {
    var path = pathname || location.pathname;
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
    var page = PAGES.find(function (p) { return p.path === path; }) || PAGES[0];
    document.title = page.title;
    setMeta("name", "description", page.description);
    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    setMeta("property", "og:url", page.canonical);
    setMeta("name", "twitter:title", page.title);
    setMeta("name", "twitter:description", page.description);
    setMeta("property", "og:image", OG_IMAGE);
    var link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = page.canonical;
  }

  apply(location.pathname);
  window.addEventListener("popstate", function () { apply(location.pathname); });
  var push = history.pushState;
  var replace = history.replaceState;
  history.pushState = function () {
    var r = push.apply(this, arguments);
    apply(location.pathname);
    return r;
  };
  history.replaceState = function () {
    var r = replace.apply(this, arguments);
    apply(location.pathname);
    return r;
  };
})();