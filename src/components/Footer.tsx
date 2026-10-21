import { DICTS, type Lang } from "@/i18n";
import { hrefFor } from "@/router";
import { whatsappLink } from "@/lib/inquiry";
import { bySlug } from "@/data/products";
import { Icon } from "@/components/Shared";

export function Footer({ lang }: { lang: Lang }) {
  const t = DICTS[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink py-14 text-white">
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
            <p className="mt-4 font-display text-sm italic text-white/45">“{DICTS[lang].about.motto}”</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t.footer.navTitle}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href={hrefFor(lang, "products")} className="text-white/75 hover:text-white">{t.footer.products}</a></li>
              <li><a href={hrefFor(lang, "factory")} className="text-white/75 hover:text-white">{t.footer.factory}</a></li>
              <li><a href={hrefFor(lang, "services")} className="text-white/75 hover:text-white">{t.footer.services}</a></li>
              <li><a href={hrefFor(lang, "about")} className="text-white/75 hover:text-white">{t.footer.aboutL}</a></li>
              <li><a href={hrefFor(lang, "contact")} className="text-white/75 hover:text-white">{t.footer.contact}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t.footer.contactTitle}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              <li><a href="mailto:info@soulselect.cn" className="hover:text-white">info@soulselect.cn</a></li>
              <li><a href={whatsappLink(t.ui.waText)} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 hover:text-white">{Icon.whatsapp("h-4 w-4")} +86 137 2667 1114</a></li>
              <li className="leading-relaxed text-white/55">{t.contact.directAddr}</li>
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
  const ui = DICTS[lang].ui;
  const slug = typeof window !== "undefined" ? window.location.pathname.match(/\/products\/([^/]+)/)?.[1] : undefined;
  const code = slug ? bySlug(slug)?.code : undefined;
  const text = code ? ui.waStyle.replace("{code}", code) : ui.waText;
  return (
    <a
      href={whatsappLink(text)}
      target="_blank"
      rel="noopener"
      aria-label={ui.whatsapp}
      className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 transition hover:scale-105 sm:bottom-6 sm:right-6 sm:h-auto sm:w-auto sm:gap-2 sm:px-5 sm:py-3.5"
    >
      {Icon.whatsapp("h-6 w-6 sm:h-5 sm:w-5")}
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </a>
  );
}
