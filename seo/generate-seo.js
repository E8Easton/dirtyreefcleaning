const fs = require("fs");
const path = require("path");
const { SITE, SERVICES, FAQ, PAGES } = require("./site-config");

function absUrl(pathname) {
  return SITE.url + pathname;
}

function buildJsonLd(page) {
  const isHome = page.path === "/";
  const pageUrl = absUrl(page.path === "/" ? "/" : page.path);

  const cleaningService = {
    "@type": "CleaningService",
    "@id": `${SITE.url}/#cleaning-service`,
    name: SITE.name,
    alternateName: "Reef Cleaning Lincoln Kearney",
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    image: absUrl(SITE.ogImage),
    logo: absUrl(SITE.logo),
    description: SITE.tagline,
    priceRange: "$$",
    areaServed: [
      {
        "@type": "City",
        name: "Lincoln",
        containedInPlace: { "@type": "State", name: "Nebraska" },
      },
      {
        "@type": "City",
        name: "Kearney",
        containedInPlace: { "@type": "State", name: "Nebraska" },
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning services",
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
          provider: { "@id": `${SITE.url}/#cleaning-service` },
          areaServed: ["Lincoln, NE", "Kearney, NE"],
        },
      })),
    },
  };

  const webSite = {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.tagline,
    publisher: { "@id": `${SITE.url}/#cleaning-service` },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.title,
    description: page.description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#cleaning-service` },
    inLanguage: "en-US",
  };

  const breadcrumbs = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.url + "/",
      },
    ],
  };
  if (page.path === "/lincoln" || page.path === "/kearney") {
    breadcrumbs.itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: page.breadcrumb,
      item: pageUrl,
    });
  }

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const graph = [cleaningService, webSite, webPage, breadcrumbs, faqPage];

  if (page.path === "/lincoln") {
    graph.push({
      "@type": "Service",
      name: "House cleaning Lincoln NE",
      serviceType: "Residential and commercial cleaning",
      provider: { "@id": `${SITE.url}/#cleaning-service` },
      areaServed: {
        "@type": "City",
        name: "Lincoln",
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE.locales.lincoln.lat,
          longitude: SITE.locales.lincoln.lng,
        },
      },
      description: page.intro,
    });
  }

  if (page.path === "/kearney") {
    graph.push({
      "@type": "Service",
      name: "House cleaning Kearney NE",
      serviceType: "Residential and commercial cleaning",
      provider: { "@id": `${SITE.url}/#cleaning-service` },
      areaServed: {
        "@type": "City",
        name: "Kearney",
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE.locales.kearney.lat,
          longitude: SITE.locales.kearney.lng,
        },
      },
      description: page.intro,
    });
  }

  if (isHome) {
    graph.push({
      "@type": "ItemList",
      name: "Service areas",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          url: absUrl("/lincoln"),
          name: "Cleaning services in Lincoln, Nebraska",
        },
        {
          "@type": "ListItem",
          position: 2,
          url: absUrl("/kearney"),
          name: "Cleaning services in Kearney, Nebraska",
        },
      ],
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function buildHtml(page) {
  const canonical = absUrl(page.path === "/" ? "/" : page.path);
  const ogImage = absUrl(SITE.ogImage);
  const jsonLd = JSON.stringify(buildJsonLd(page)).replace(/</g, "\\u003c");

  const serviceList = SERVICES.map((s) => `<li><strong>${s.name}</strong> — ${s.description}</li>`).join(
    "\n        "
  );

  const faqHtml = FAQ.map(
    (f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`
  ).join("\n        ");

  const areaLinks =
    page.path === "/"
      ? `<p><a href="/lincoln">House cleaning in Lincoln, NE</a> · <a href="/kearney">House cleaning in Kearney, NE</a></p>`
      : "";

  return `<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${page.title}</title>
    <meta name="description" content="${page.description}" />
    <meta name="keywords" content="${page.keywords}" />
    <meta name="author" content="${SITE.name}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow" />
    <meta name="geo.region" content="US-NE" />
    <meta name="geo.placename" content="${page.path === "/kearney" ? "Kearney" : page.path === "/lincoln" ? "Lincoln" : "Lincoln; Kearney"}, Nebraska" />
    <link rel="canonical" href="${canonical}" />
    <link rel="sitemap" type="application/xml" title="Sitemap" href="${absUrl("/sitemap.xml")}" />
    <link rel="alternate" hreflang="en-us" href="${canonical}" />
    <link rel="alternate" hreflang="x-default" href="${absUrl("/")}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${SITE.name}" />
    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:alt" content="${SITE.name} professional cleaning truck in Nebraska" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${page.title}" />
    <meta name="twitter:description" content="${page.description}" />
    <meta name="twitter:image" content="${ogImage}" />
    <meta name="theme-color" content="#F55648" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="${absUrl(SITE.logo)}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <script type="application/ld+json">${jsonLd}</script>
    <script src="/reef-config.js"></script>
    <script src="/form-bridge.js"></script>
    <script src="/seo-head.js" defer></script>
    <script type="module" crossorigin src="/assets/index-BsA_WY1o.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-pBWu_KKI.css" />
  </head>
  <body>
    <div id="root"></div>
    <noscript>
      <article id="seo-fallback" style="max-width: 48rem; margin: 2rem auto; padding: 0 1rem; font-family: system-ui, sans-serif; line-height: 1.6">
        <header>
          <p><strong>${SITE.name}</strong> · ${SITE.phoneDisplay} · <a href="mailto:${SITE.email}">${SITE.email}</a></p>
          <h1>${page.h1}</h1>
          <p>${page.intro}</p>
          ${areaLinks}
        </header>
        <section aria-label="Cleaning services">
          <h2>Cleaning services in Lincoln &amp; Kearney, Nebraska</h2>
          <ul>
        ${serviceList}
          </ul>
        </section>
        <section aria-label="Frequently asked questions">
          <h2>Frequently asked questions</h2>
        ${faqHtml}
        </section>
        <p><a href="${canonical}">View full ${SITE.name} website</a></p>
      </article>
    </noscript>
  </body>
</html>
`;
}

function writeSeoHeadJs(distDir) {
  const payload = JSON.stringify(
    PAGES.map((p) => ({
      path: p.path,
      title: p.title,
      description: p.description,
      canonical: absUrl(p.path === "/" ? "/" : p.path),
    }))
  );

  const js = `(function () {
  var PAGES = ${payload};
  var OG_IMAGE = ${JSON.stringify(absUrl(SITE.ogImage))};

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
})();`;

  fs.writeFileSync(path.join(distDir, "seo-head.js"), js);
}

function writeRobots(distDir) {
  const txt = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: ${absUrl("/sitemap.xml")}
`;
  fs.writeFileSync(path.join(distDir, "robots.txt"), txt);
}

function writeSitemap(distDir) {
  const urls = PAGES.map((p) => {
    const loc = absUrl(p.path === "/" ? "/" : p.path);
    const priority = p.path === "/" ? "1.0" : "0.9";
    const changefreq = "weekly";
    return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), xml);
}

function writeHeaders(distDir) {
  const headers = `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/sitemap.xml
  Cache-Control: public, max-age=3600

/robots.txt
  Cache-Control: public, max-age=3600
`;
  fs.writeFileSync(path.join(distDir, "_headers"), headers);
}

function main() {
  const distDir = path.join(__dirname, "..", "dist");
  fs.mkdirSync(distDir, { recursive: true });

  for (const page of PAGES) {
    const html = buildHtml(page);
    if (page.path === "/") {
      fs.writeFileSync(path.join(distDir, "index.html"), html);
    } else {
      const dir = path.join(distDir, page.path.slice(1));
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "index.html"), html);
    }
  }

  writeSeoHeadJs(distDir);
  writeRobots(distDir);
  writeSitemap(distDir);
  writeHeaders(distDir);
  console.log("SEO: generated HTML, sitemap, robots, seo-head.js for", PAGES.length, "pages");
}

main();
