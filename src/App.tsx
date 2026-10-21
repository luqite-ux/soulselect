import { useEffect, useState } from "react";
import { DICTS } from "@/i18n";
import { parseRoute } from "@/router";
import { useReveal } from "@/hooks/useReveal";
import { Header } from "@/components/Header";
import { Footer, FloatingCTA } from "@/components/Footer";
import { HomePage } from "@/pages/Home";
import { ProductsPage, ProductDetailPage } from "@/pages/Products";
import { FactoryPage, ServicesPage, AboutPage, ContactPage } from "@/pages/Company";
import { bySlug } from "@/data/products";

export default function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.pathname, window.location.search));

  useReveal();

  // client-side navigation: intercept same-origin link clicks
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.download || e.metaKey || e.ctrlKey) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      e.preventDefault();
      window.history.pushState({}, "", url.pathname + url.search);
      setRoute(parseRoute(url.pathname, url.search));
    };
    const onPop = () => setRoute(parseRoute(window.location.pathname, window.location.search));
    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  // scroll to top on route change + per-page SEO meta
  useEffect(() => {
    window.scrollTo(0, 0);
    const { lang, page, slug } = route;
    document.documentElement.lang = lang;
    const seo = DICTS[lang].seo;
    let title = seo.pages[page === "product" ? "products" : page].t;
    let desc = seo.pages[page === "product" ? "products" : page].d;
    let canonicalPath = window.location.pathname;
    if (page === "product" && slug) {
      const s = bySlug(slug);
      if (s) {
        title = seo.productTitle(s.name[lang]);
        desc = seo.productDesc(s.name.en, s.fabric);
      }
    }
    document.title = title;
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", desc);
    const canonical = `https://soulselect.cn${canonicalPath === "/" ? "/en/" : canonicalPath}`;
    const lc = document.querySelector('link[rel="canonical"]');
    if (lc) lc.setAttribute("href", canonical);
  }, [route]);

  const { lang, page, slug, search } = route;

  return (
    <div className="min-h-screen bg-background font-body">
      <Header lang={lang} page={page} />
      <main>
        {page === "home" && <HomePage lang={lang} />}
        {page === "products" && <ProductsPage lang={lang} search={search} />}
        {page === "product" && <ProductDetailPage lang={lang} slug={slug ?? ""} />}
        {page === "factory" && <FactoryPage lang={lang} />}
        {page === "services" && <ServicesPage lang={lang} />}
        {page === "about" && <AboutPage lang={lang} />}
        {page === "contact" && <ContactPage lang={lang} search={search} />}
      </main>
      <Footer lang={lang} />
      <FloatingCTA lang={lang} />
    </div>
  );
}
