import { useCallback, useEffect, useState } from "react";
import { detectLang, DICTS } from "@/i18n";
import { useReveal } from "@/hooks/useReveal";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { Factory } from "@/components/Factory";
import { Process, Why } from "@/components/Process";
import { FAQ } from "@/components/FAQ";
import { RFQ } from "@/components/RFQ";
import { Footer, FloatingCTA } from "@/components/Footer";
import type { Product } from "@/data/products";

export default function App() {
  const [lang, setLang] = useState(() => detectLang(window.location.pathname));
  const [presetProduct, setPresetProduct] = useState<Product | null>(null);

  useReveal();

  // keep <html lang> in sync (matters for SEO + fonts)
  useEffect(() => {
    document.documentElement.lang = lang;
    const dict = DICTS[lang];
    document.title = dict.seo.title;
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", dict.seo.description);
  }, [lang]);

  // respond to back/forward navigation between language routes
  useEffect(() => {
    const onPop = () => setLang(detectLang(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const onInquiry = useCallback((p: Product) => {
    setPresetProduct(p);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background font-body">
      <Header lang={lang} />
      <main>
        <Hero lang={lang} />
        <Products lang={lang} onInquiry={onInquiry} />
        <Factory lang={lang} />
        <Process lang={lang} />
        <Why lang={lang} />
        <FAQ lang={lang} />
        <RFQ lang={lang} presetProduct={presetProduct} />
      </main>
      <Footer lang={lang} />
      <FloatingCTA lang={lang} />
    </div>
  );
}
