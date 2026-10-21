import { useEffect, useState } from "react";
import { DICTS, LANGS, type Lang } from "@/i18n";
import { hrefFor, samePageOtherLang, type PageKey } from "@/router";
import { drawer, useInquiry } from "@/lib/inquiry";
import { btn, Icon } from "@/components/Shared";

export function Header({ lang, page }: { lang: Lang; page: PageKey }) {
  const t = DICTS[lang];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const count = useInquiry().length;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [page]);

  const links: { page: PageKey; label: string }[] = [
    { page: "products", label: t.nav.products },
    { page: "services", label: t.nav.services },
    { page: "factory", label: t.nav.factory },
    { page: "about", label: t.nav.about },
    { page: "contact", label: t.nav.contact },
  ];
  const isActive = (p: PageKey) => page === p || (p === "products" && page === "product");

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? "border-b border-border backdrop-blur-md" : "bg-transparent"}`} style={scrolled || open ? { backgroundColor: "hsl(var(--paper) / 0.95)" } : undefined}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <a href={hrefFor(lang, "home")} className="flex items-center gap-2.5" aria-label="SoulSelect home">
          <img src="/logo.png" alt="" className="h-9 w-9 rounded-full bg-white object-contain p-0.5 ring-1 ring-ink/10" />
          <span className="leading-none">
            <span className="block font-display text-[19px] text-ink">SoulSelect</span>
            <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Athletic Solutions</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.page}
              href={hrefFor(lang, l.page)}
              aria-current={isActive(l.page) ? "page" : undefined}
              className={`relative py-2 text-sm font-medium transition ${isActive(l.page) ? "text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-sunset" : "text-ink/70 hover:text-ink"}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-full border border-ink/15 p-0.5 sm:flex">
            {LANGS.map((l) => (
              <a
                key={l}
                href={samePageOtherLang(window.location.pathname, l)}
                hrefLang={l}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase transition ${l === lang ? "bg-ink text-white" : "text-ink/60 hover:text-ink"}`}
              >
                {l}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={drawer.open}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-ink/5"
            aria-label={`${t.ui.inquiryList} (${count})`}
          >
            {Icon.list()}
            {count > 0 && (
              <span className="absolute right-1 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-sunset px-1 text-[10px] font-bold text-white">{count}</span>
            )}
          </button>
          <a href={hrefFor(lang, "contact")} className={`${btn.primary} hidden !min-h-[40px] !px-5 md:inline-flex`}>
            {t.nav.rfq}
          </a>
          <button className="flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border lg:hidden" style={{ backgroundColor: "hsl(var(--paper))" }}>
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {links.map((l) => (
              <a key={l.page} href={hrefFor(lang, l.page)} className="block rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-sand">
                {l.label}
              </a>
            ))}
            <div className="flex items-center gap-2 px-3 pt-3">
              {LANGS.map((l) => (
                <a key={l} href={samePageOtherLang(window.location.pathname, l)} className={`rounded-full border border-ink/15 px-3 py-1.5 text-xs font-semibold uppercase ${l === lang ? "bg-ink text-white" : "text-ink/70"}`}>
                  {l}
                </a>
              ))}
            </div>
            <a href={hrefFor(lang, "contact")} className={`${btn.primary} mt-3 w-full`}>
              {t.nav.rfq}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
