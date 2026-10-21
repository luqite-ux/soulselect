import { useEffect, useState } from "react";
import { DICTS, LANGS, LANG_NAMES, type Lang } from "@/i18n";

export function Header({ lang }: { lang: Lang }) {
  const t = DICTS[lang];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#products", label: t.nav.products },
    { href: "#factory", label: t.nav.factory },
    { href: "#process", label: t.nav.process },
    { href: "#why", label: t.nav.why },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ];

  const langHref = (l: Lang) => (l === "en" ? "/en/" : `/${l}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0b1220]/90 backdrop-blur-md shadow-lg shadow-black/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href={`/${lang === "en" ? "en" : lang}/`} className="flex items-center gap-3">
          <img src="/logo.png" alt="SoulSelect Athletic Solutions" className="h-10 w-10 rounded-full bg-white object-contain p-0.5" />
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold tracking-wide text-white">SoulSelect</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-white/60">
              Athletic Solutions
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-white/80 transition hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center overflow-hidden rounded-full border border-white/20">
            {LANGS.map((l) => (
              <a
                key={l}
                href={langHref(l)}
                className={`px-3 py-1.5 text-xs font-semibold uppercase transition ${
                  l === lang ? "bg-white text-[#0b1220]" : "text-white/70 hover:text-white"
                }`}
              >
                {l}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="rounded-full bg-sunset px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-900/30 transition hover:brightness-110"
          >
            {t.nav.rfq}
          </a>
        </div>

        <button
          className="rounded-md p-2 text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
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
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-white/85 hover:bg-white/10"
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center gap-2 px-3 pt-2">
              {LANGS.map((l) => (
                <a
                  key={l}
                  href={langHref(l)}
                  className={`rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase ${
                    l === lang ? "bg-white text-[#0b1220]" : "text-white/70"
                  }`}
                >
                  {LANG_NAMES[l]}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full bg-sunset px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              {t.nav.rfq}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
