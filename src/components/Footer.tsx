import { DICTS, type Lang } from "@/i18n";

export function Footer({ lang }: { lang: Lang }) {
  const t = DICTS[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#080e19] py-14 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="SoulSelect" className="h-11 w-11 rounded-full bg-white object-contain p-0.5" />
              <div>
                <p className="font-display text-lg font-semibold">SoulSelect</p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/50">Athletic Solutions</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">{t.footer.about}</p>
            <p className="mt-4 font-display text-sm italic text-white/45">“{t.why.principle}”</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t.footer.company}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#factory" className="text-white/75 hover:text-white">{t.footer.links.factory}</a></li>
              <li><a href="#process" className="text-white/75 hover:text-white">{t.footer.links.process}</a></li>
              <li><a href="#why" className="text-white/75 hover:text-white">{t.footer.links.why}</a></li>
              <li><a href="#faq" className="text-white/75 hover:text-white">{t.footer.links.faq}</a></li>
              <li><a href="#contact" className="text-white/75 hover:text-white">{t.footer.links.rfq}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t.footer.contactTitle}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              <li><a href="mailto:info@soulselect.cn" className="hover:text-white">info@soulselect.cn</a></li>
              <li><a href="tel:+8613726671114" className="hover:text-white">+86 137 2667 1114</a></li>
              <li className="leading-relaxed text-white/55">{t.contact.direct.addr}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>© {year} Hangzhou Huantong Tianmi New Materials Co., Ltd. · {t.footer.rights}</p>
          <p>soulselect.cn · {t.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}

export function FloatingCTA({ lang }: { lang: Lang }) {
  const t = DICTS[lang].floating;
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2">
      <a
        href="#contact"
        className="rounded-full bg-sunset px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-orange-950/40 transition hover:brightness-110"
      >
        {t.rfq}
      </a>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={t.top}
        className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-ink shadow-lg transition hover:bg-ink hover:text-white"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
