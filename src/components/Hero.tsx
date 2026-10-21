import { DICTS, type Lang } from "@/i18n";

export function Hero({ lang }: { lang: Lang }) {
  const t = DICTS[lang];

  return (
    <section className="relative overflow-hidden bg-ink grain">
      {/* backdrop image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.webp"
          alt="SoulSelect premium yoga leggings collection"
          className="h-full w-full object-cover opacity-40"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220] via-[#0b1220]/80 to-[#0b1220]/30" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b1220] to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24 lg:pt-40">
        <div className="max-w-2xl">
          <p className="fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-sunset" />
            {t.hero.eyebrow}
          </p>

          <h1 className="fade-up font-display text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            {t.hero.titleA}
            <br />
            <span className="text-sunset">{t.hero.titleB}</span>
          </h1>

          <p className="fade-up mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            {t.hero.sub}
          </p>

          <div className="fade-up mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="rounded-full bg-sunset px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-orange-950/40 transition hover:brightness-110"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#products"
              className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>

          <p className="fade-up mt-8 border-l-2 border-sunset pl-4 font-display text-lg italic text-white/70">
            {t.hero.motto}
          </p>
        </div>

        <dl className="fade-up mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
          {t.hero.stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl font-semibold text-white sm:text-4xl">{s.value}</dd>
              <dd className="mt-1 text-xs uppercase tracking-wider text-white/55">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* trust marquee */}
      <div className="relative border-t border-white/10 bg-black/30 py-4">
        <p className="sr-only">{t.hero.trust}</p>
        <div className="overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap px-6">
            {[...t.trustCerts, ...t.trustCerts].map((c, i) => (
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
  );
}
