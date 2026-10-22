import { DICTS, type Lang } from "@/i18n";
import { CATEGORY_COVER, CATEGORY_KEYS, catCount, HOT_STYLES, STYLES } from "@/data/products";
import { hrefFor } from "@/router";
import { btn, Container, fmt, CtaBanner, Icon, SectionHead, StyleCard } from "@/components/Shared";

export function HomePage({ lang }: { lang: Lang }) {
  const d = DICTS[lang];
  const t = d.home;
  const trending = [...HOT_STYLES].sort((a, b) => Number(!!b.studio) - Number(!!a.studio)).slice(0, 8);
  const faq = d.services.faq.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-blush">
        <Container className="grid items-center gap-10 pb-12 pt-24 lg:grid-cols-12 lg:gap-8 lg:pb-0 lg:pt-20">
          <div className="lg:col-span-6 lg:py-24">
            <p className="fade-up eyebrow !text-ink/70">{t.eyebrow}</p>
            <h1 className="fade-up mt-5 font-display text-[2.6rem] font-normal leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.4rem]">
              {t.titleA}
              <br />
              <em className="font-normal text-sunset">{t.titleB}</em>
            </h1>
            <p className="fade-up mt-6 max-w-lg text-base leading-relaxed text-ink/75 sm:text-lg">{t.sub}</p>
            <div className="fade-up mt-8 flex flex-wrap gap-3">
              <a href={hrefFor(lang, "contact")} className={btn.primary}>
                {t.ctaPrimary} {Icon.arrow()}
              </a>
              <a href={hrefFor(lang, "products")} className={btn.ghost}>
                {t.ctaSecondary}
              </a>
            </div>
            <ul className="fade-up mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-ink/80">
              {t.proof.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-brand">{Icon.check("h-3 w-3")}</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative lg:col-span-6 lg:self-end">
            <div className="grid grid-cols-5 items-end gap-3">
              <img
                src="/images/studio/cx1003-cream-full.webp"
                alt="Model in a cream crew-neck long-sleeve top and brown high-rise leggings, photographed in the SoulSelect studio"
                className="col-span-3 aspect-[2/3] w-full rounded-t-[999px] object-cover object-top lg:rounded-b-none"
                fetchPriority="high"
                width={1067}
                height={1600}
              />
              <div className="col-span-2 space-y-3 pb-0 lg:pb-12">
                <img src="/images/studio/rs1003-yoga.webp" alt="Model stretching in black high-rise leggings and sports top" className="aspect-square w-full rounded-lg object-cover" loading="eager" />
                <img src="/images/studio/cx1001-black.webp" alt="Model in a black seamless zip-up jacket and leggings" className="aspect-square w-full rounded-lg object-cover object-[50%_20%]" loading="eager" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-border bg-white">
        <Container>
          <dl className="grid grid-cols-2 divide-border sm:grid-cols-4 sm:divide-x">
            {t.stats.map((s) => (
              <div key={s.label} className="px-2 py-6 text-center sm:py-8">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl text-ink sm:text-4xl">{s.value}</dd>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* TRENDING */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHead
            eyebrow={t.trendEyebrow}
            title={t.trendTitle}
            sub={t.trendSub}
            action={
              <a href={hrefFor(lang, "products")} className={btn.ghost}>
                {t.viewAll} ({STYLES.length}) {Icon.arrow()}
              </a>
            }
          />
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {trending.map((s) => (
              <StyleCard key={s.slug} lang={lang} s={s} />
            ))}
          </div>
        </Container>
      </section>

      {/* AUDIENCE */}
      <section className="bg-sand py-20 lg:py-28">
        <Container>
          <SectionHead eyebrow={t.audienceEyebrow} title={t.audienceTitle} />
          <div className="mt-12 grid gap-4 md:grid-cols-3 lg:gap-6">
            {t.audience.map((a, i) => (
              <div key={a.t} className="fade-up flex flex-col rounded-xl bg-white p-7 lg:p-8">
                <span className="font-display text-sm text-sunset">0{i + 1}</span>
                <h3 className="mt-3 font-display text-2xl leading-tight text-ink">{a.t}</h3>
                <ul className="mt-5 flex-1 space-y-3 text-[15px] text-ink/80">
                  {a.pts.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <span className="mt-1 text-brand">{Icon.check("h-4 w-4")}</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <a href={`${hrefFor(lang, "contact")}?role=${a.role}`} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink underline-offset-4 hover:underline">
                  {a.cta} {Icon.arrow()}
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHead eyebrow={t.catsEyebrow} title={t.catsTitle} sub={t.catsSub} />
          <div className="no-scrollbar -mx-4 mt-12 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0">
            {CATEGORY_KEYS.map((c) => (
              <a key={c} href={`${hrefFor(lang, "products")}?cat=${c}`} className="fade-up group relative block w-40 shrink-0 snap-start overflow-hidden rounded-lg bg-sand sm:w-auto">
                <img src={CATEGORY_COVER[c]} alt="" loading="lazy" className="aspect-[3/4] w-full object-cover object-top transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 via-ink/25 to-transparent p-4 pt-12 text-white">
                  <p className="font-display text-lg leading-tight sm:text-xl">{d.categories[c]}</p>
                  <p className="mt-0.5 text-xs text-white/80">{fmt(d.ui.results, { n: catCount(c) })}</p>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* STUDIO / REAL PHOTOS */}
      <section className="relative">
        <div className="grid lg:grid-cols-2">
          <img src="/images/studio/rs1003-olive-wide.webp" alt="Model in olive high-rise leggings and matching tank in the SoulSelect photo studio" loading="lazy" className="h-72 w-full object-cover sm:h-96 lg:h-full" />
          <div className="bg-blush px-6 py-16 sm:px-12 lg:px-16 lg:py-24">
            <p className="eyebrow">{t.studioEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-[2.6rem]">{t.studioTitle}</h2>
            <p className="mt-5 max-w-lg leading-relaxed text-ink/75">{t.studioSub}</p>
            <div className="mt-8 grid max-w-md grid-cols-3 gap-3">
              {["/images/studio/cx1004-brown.webp", "/images/studio/cx1001-grey.webp", "/images/studio/a23j204-black.webp"].map((src) => (
                <img key={src} src={src} alt="" loading="lazy" className="aspect-[3/4] w-full rounded-md object-cover object-top" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHead eyebrow={t.stepsEyebrow} title={t.stepsTitle} />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {t.steps.map((s, i) => (
              <li key={s.t} className="fade-up bg-white p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sand font-display text-ink">{i + 1}</span>
                <h3 className="mt-4 text-base font-semibold text-ink">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* PRIVATE LABEL */}
      <section className="bg-sand py-20 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow={t.plEyebrow} title={t.plTitle} sub={t.plSub} />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {t.plItems.map((it) => (
                <li key={it.t} className="fade-up border-t border-ink/15 pt-4">
                  <h3 className="font-semibold text-ink">{it.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
                </li>
              ))}
            </ul>
            <a href={hrefFor(lang, "services")} className={`${btn.dark} mt-10`}>
              {t.servicesCta} {Icon.arrow()}
            </a>
          </div>
          <div className="fade-up grid grid-cols-2 gap-3">
            <img src="/images/studio/factory-fabric-stock.webp" alt="Bundles of cut activewear panels and fabric stock on the production floor" loading="lazy" className="aspect-[3/4] w-full rounded-lg object-cover" />
            <img src="/images/factory/packing.webp" alt="Packed export cartons ready for shipment" loading="lazy" className="mt-10 aspect-[3/4] w-full rounded-lg object-cover" />
          </div>
        </Container>
      </section>

      {/* PRODUCTION */}
      <section className="py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead eyebrow={t.factoryEyebrow} title={t.factoryTitle} sub={t.factorySub} />
            <a href={hrefFor(lang, "factory")} className={`${btn.ghost} mt-8`}>
              {t.factoryCta} {Icon.arrow()}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:col-span-7">
            {[
              ["/images/factory/knitting.webp", d.factory.items[0].t],
              ["/images/factory/finishing.webp", d.factory.items[1].t],
              ["/images/factory/inspect.webp", d.factory.items[2].t],
              ["/images/factory/warehouse.webp", d.factory.items[3].t],
            ].map(([src, cap]) => (
              <figure key={src} className="fade-up relative overflow-hidden rounded-lg">
                <img src={src} alt={cap} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                <figcaption className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-ink">{cap}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead eyebrow={t.faqEyebrow} title={t.faqTitle} />
          </div>
          <div className="divide-y divide-border border-y border-border lg:col-span-8">
            {faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink marker:hidden">
                  {f.q}
                  <span className="shrink-0 text-muted-foreground transition-transform group-open:rotate-45">{Icon.plus("h-5 w-5")}</span>
                </summary>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner lang={lang} />
    </>
  );
}
