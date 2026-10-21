import { useEffect, useState } from "react";
import { DICTS, LANGS, type Lang } from "@/i18n";
import { hrefFor, samePageOtherLang, type PageKey } from "@/router";

export function Header({ lang, page }: { lang: Lang; page: PageKey }) {
  const t = DICTS[lang];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // pages without a dark hero band need a solid header from the start
  const solid = page !== "home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: { page: PageKey; label: string }[] = [
    { page: "products", label: t.nav.products },
    { page: "factory", label: t.nav.factory },
    { page: "services", label: t.nav.services },
    { page: "about", label: t.nav.about },
    { page: "contact", label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid || scrolled ? "bg-[#0b1220]/95 shadow-lg shadow-black/10 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href={hrefFor(lang, "home")} className="flex items-center gap-3" aria-label="SoulSelect home">
          <img src="/logo.png" alt="SoulSelect Athletic Solutions" className="h-10 w-10 rounded-full bg-white object-contain p-0.5" />
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold tracking-wide text-white">SoulSelect</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-white/60">Athletic Solutions</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.page}
              href={hrefFor(lang, l.page)}
              className={`text-sm font-medium transition ${
                page === l.page || (l.page === "products" && page === "product")
                  ? "text-sunset"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center overflow-hidden rounded-full border border-white/20">
            {LANGS.map((l) => (
              <a
                key={l}
                href={samePageOtherLang(window.location.pathname, l)}
                className={`px-3 py-1.5 text-xs font-semibold uppercase transition ${
                  l === lang ? "bg-white text-[#0b1220]" : "text-white/70 hover:text-white"
                }`}
              >
                {l}
              </a>
            ))}
          </div>
          <a
            href={hrefFor(lang, "contact")}
            className="rounded-full bg-sunset px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-900/30 transition hover:brightness-110"
          >
            {t.nav.rfq}
          </a>
        </div>

        <button className="rounded-md p-2 text-white lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#0b1220]/95 backdrop-blur-md lg:hidden">
          <nav className="space-y-1 px-4 py-4">
            {links.map((l) => (
              <a
                key={l.page}
                href={hrefFor(lang, l.page)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-white/85 hover:bg-white/10"
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center gap-2 px-3 pt-2">
              {LANGS.map((l) => (
                <a
                  key={l}
                  href={samePageOtherLang(window.location.pathname, l)}
                  className={`rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase ${
                    l === lang ? "bg-white text-[#0b1220]" : "text-white/70"
                  }`}
                >
                  {l}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
