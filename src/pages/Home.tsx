import { DICTS, type Lang } from "@/i18n";
import { CATEGORY_KEYS, HOT_STYLES, STYLES } from "@/data/products";
import { hrefFor } from "@/router";
import { StyleCard, CtaBanner } from "@/components/Shared";

export function HomePage({ lang }: { lang: Lang }) {
  const d = DICTS[lang];
  const t = d.home;
  const catCount = (c: string) => STYLES.filter((s) => s.cat === c).length;

  return (
    <>
      {/* HERO — editorial split */}
      <section className="paper relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-36">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-ink/70 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-sunset" />
                {t.eyebrow}
              </p>
              <h1 className="fade-up font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]">
                {t.titleA}
                <br />
                <span className="text-sunset">{t.titleB}</span>
              </h1>
              <p className="fade-up mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{t.sub}</p>
              <div className="fade-up mt-8 flex flex-wrap items-center gap-4">
                <a href={hrefFor(lang, "contact")} className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-ink/20 transition hover:bg-brand-deep">
                  {t.ctaPrimary}
                </a>
                <a href={hrefFor(lang, "products")} className="rounded-full border border-ink/15 bg-white px-7 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/40">
                  {t.ctaSecondary}
                </a>
              </div>
              <p className="fade-up mt-8 border-l-2 border-sunset pl-4 font-display text-lg italic text-ink/70">{t.motto}</p>

              <dl className="fade-up mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
                {t.stats.map((s) => (
                  <div key={s.label}>
                    <dd className="font-display text-3xl font-semibold text-ink sm:text-4xl">{s.value}</dd>
                    <dd className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="fade-up relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="absolute -inset-3 rotate-2 rounded-[2rem] border border-sunset/25" aria-hidden="true" />
              <div className="absolute -inset-3 -rotate-1 rounded-[2rem] border border-ink/10" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.75rem] shadow-2xl shadow-ink/20">
                <img
                  src="/images/real/r-hero.webp"
                  alt="SoulSelect seamless activewear set — factory direct"
                  className="aspect-[4/5] w-full object-cover"
                  fetchPriority="high"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 rounded-2xl border border-border bg-white p-5 shadow-xl sm:-left-8">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">OEM / ODM</p>
                <p className="mt-1 font-display text-2xl font-semibold text-ink">MOQ 200</p>
                <p className="text-xs text-muted-foreground">48h sampling · OEKO-TEX fabrics</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-ink/10 bg-ink py-4">
          <div className="overflow-hidden">
            <div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap px-6">
              {[...d.trustCerts, ...d.trustCerts].map((c, i) => (
                <span key={i} className="flex items-center gap-3 text-sm font-medium text-white/60">
                  <svg className="h-4 w-4 text-sunset" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="paper py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="fade-up max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sunset">{t.catsEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">{t.catsTitle}</h2>
            <p className="mt-4 text-muted-foreground">{t.catsSub}</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORY_KEYS.map((c) => (
              <a
                key={c}
                href={`${hrefFor(lang, "products")}?cat=${c}`}
                className="fade-up group rounded-2xl border border-border bg-white p-5 text-center transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
              >
                <p className="font-display text-3xl font-semibold text-sunset/80 group-hover:text-sunset">{catCount(c)}</p>
                <p className="mt-2 text-sm font-semibold text-ink">{d.categories[c]}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* HOT STYLES */}
      <section className="bg-sand/50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="fade-up flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sunset">{t.hotEyebrow}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">{t.hotTitle}</h2>
              <p className="mt-4 text-muted-foreground">{t.hotSub}</p>
            </div>
            <a href={hrefFor(lang, "products")} className="rounded-full border-2 border-ink px-6 py-2.5 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white">
              {d.nav.products} →
            </a>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOT_STYLES.slice(0, 8).map((s) => (
              <StyleCard key={s.slug} lang={lang} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* FACTORY PREVIEW */}
      <section className="bg-ink py-20 text-white lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="fade-up">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sunset">{t.factoryEyebrow}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{t.factoryTitle}</h2>
              <p className="mt-4 text-white/70">{t.factorySub}</p>
              <a href={hrefFor(lang, "factory")} className="mt-8 inline-block rounded-full bg-sunset px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110">
                {t.factoryCta} →
              </a>
            </div>
            <div className="fade-up grid grid-cols-2 gap-3">
              {["/images/factory-floor.webp", "/images/factory-sewing.webp", "/images/factory-qc.webp", "/images/factory-showroom.webp"].map((src) => (
                <img key={src} src={src} alt={t.factoryTitle} loading="lazy" className="aspect-square w-full rounded-xl border border-white/10 object-cover" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="paper py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="fade-up text-center font-display text-3xl font-semibold text-ink sm:text-4xl">{t.whyTitle}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.whyItems.map((it, i) => (
              <div key={it.t} className="fade-up rounded-2xl border border-border bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-display text-lg font-semibold text-white">{i + 1}</span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{it.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              </div>
            ))}
          </div>
          <p className="fade-up mt-12 text-center font-display text-2xl font-semibold italic text-brand-deep">“{t.principle}”</p>
        </div>
      </section>

      <CtaBanner lang={lang} />
    </>
  );
}
