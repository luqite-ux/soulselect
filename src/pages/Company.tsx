import { DICTS, type Lang } from "@/i18n";
import { bySlug } from "@/data/products";
import { hrefFor } from "@/router";
import { CtaBanner, InquiryForm, PageHero } from "@/components/Shared";
import { whatsappLink } from "@/lib/inquiry";

/* -------------------------------- factory ------------------------------- */

const FACTORY_IMAGES: [string, number][] = [
  ["/images/studio/factory-fabric-stock.webp", 3],
  ["/images/factory-cutting.webp", 0],
  ["/images/factory-floor.webp", 1],
  ["/images/factory-qc.webp", 2],
  ["/images/factory-sewing.webp", 1],
  ["/images/factory-warehouse.webp", 3],
];

export function FactoryPage({ lang }: { lang: Lang }) {
  const d = DICTS[lang];
  const t = d.factory;

  return (
    <div className="min-h-screen">
      <PageHero lang={lang} crumb={d.nav.factory} title={t.title} sub={t.sub} />

      <section className="paper py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FACTORY_IMAGES.map(([src, k], i) => (
              <figure key={src} className={`fade-up group relative overflow-hidden rounded-xl border border-border ${i === 0 ? "sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto" : "aspect-[4/3]"}`}>
                <img src={src} alt={`${t.title} — ${t.items[k].t}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 text-sm font-medium text-white">
                  {t.items[k].t}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="fade-up mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.items.map((it, i) => (
              <div key={it.t} className="rounded-xl border border-border bg-white p-6">
                <span className="font-display text-3xl font-semibold text-sunset/80">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-3 text-base font-semibold text-ink">{it.t}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-2">
            <section className="fade-up">
              <h2 className="font-display text-3xl font-normal text-ink sm:text-3xl">{t.equipmentTitle}</h2>
              <table className="mt-6 w-full overflow-hidden rounded-xl border border-border bg-white text-sm">
                <tbody className="divide-y divide-border">
                  {t.equipment.map(([k, v]) => (
                    <tr key={k}>
                      <td className="px-5 py-3.5 text-muted-foreground">{k}</td>
                      <td className="px-5 py-3.5 text-right font-semibold text-ink">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            <section className="fade-up">
              <h2 className="font-display text-3xl font-normal text-ink sm:text-3xl">{t.qcTitle}</h2>
              <ol className="mt-6 space-y-4">
                {t.qc.map((q, i) => (
                  <li key={q.t} className="flex gap-4 rounded-xl border border-border bg-white p-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm font-semibold text-white">{i + 1}</span>
                    <div>
                      <h3 className="font-semibold text-ink">{q.t}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{q.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </section>

      <CtaBanner lang={lang} />
    </div>
  );
}

/* ------------------------------- services ------------------------------- */

export function ServicesPage({ lang }: { lang: Lang }) {
  const d = DICTS[lang];
  const t = d.services;

  return (
    <div className="min-h-screen">
      <PageHero lang={lang} crumb={d.nav.services} title={t.title} sub={t.sub} />

      <section className="paper py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="fade-up font-display text-3xl font-normal text-ink sm:text-3xl">{t.stepsTitle}</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {t.steps.map((s, i) => (
              <li key={s.t} className="fade-up rounded-xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
                <span className="font-display text-4xl font-semibold text-sand">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-base font-semibold text-ink">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>

          <section className="fade-up mt-16 rounded-xl border border-border bg-white p-8 lg:p-10">
            <h2 className="font-display text-3xl font-normal text-ink">{t.customizeTitle}</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {d.common.customItems.map((it) => (
                <li key={it} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-sunset" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {it}
                </li>
              ))}
            </ul>
            <a href={hrefFor(lang, "contact")} className="mt-8 inline-block rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep">
              {d.nav.rfq} →
            </a>
          </section>

          <section className="mt-16">
            <h2 className="fade-up font-display text-3xl font-normal text-ink sm:text-3xl">{t.faqTitle}</h2>
            <div className="mt-8 max-w-3xl space-y-3">
              {t.faq.map((f) => (
                <details key={f.q} className="group rounded-xl border border-border bg-white px-6 py-4 open:pb-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-ink marker:hidden">
                    {f.q}
                    <svg className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </section>

      <CtaBanner lang={lang} />
    </div>
  );
}

/* --------------------------------- about -------------------------------- */

export function AboutPage({ lang }: { lang: Lang }) {
  const d = DICTS[lang];
  const t = d.about;

  return (
    <div className="min-h-screen">
      <PageHero lang={lang} crumb={d.nav.about} title={t.title} />

      <section className="paper py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="fade-up lg:col-span-3">
              <p className="text-lg leading-relaxed text-ink/90">{t.p1}</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">{t.p2}</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">{t.p3}</p>
              <blockquote className="mt-8 border-l-2 border-sunset pl-5">
                <p className="font-display text-xl font-semibold italic text-brand-deep">“{t.motto}”</p>
                <p className="mt-2 text-sm text-muted-foreground">{t.principle}</p>
              </blockquote>
            </div>
            <div className="fade-up lg:col-span-2">
              <div className="overflow-hidden rounded-xl border border-border">
                <img src="/images/factory-showroom.webp" alt={t.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              </div>
              <div className="mt-6 rounded-xl border border-border bg-white p-7">
                <h2 className="font-display text-xl font-semibold text-ink">{t.factsTitle}</h2>
                <dl className="mt-4 space-y-3">
                  {t.facts.map(([k, v]) => (
                    <div key={k} className="border-b border-border pb-3 last:border-0">
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{k}</dt>
                      <dd className="mt-0.5 text-sm font-medium text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <div className="fade-up mt-14 rounded-xl border border-border bg-white p-7">
            <h2 className="font-display text-xl font-semibold text-ink">{t.addressTitle}</h2>
            <p className="mt-3 flex items-start gap-3 text-sm text-muted-foreground">
              <svg className="mt-0.5 h-5 w-5 shrink-0 text-sunset" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {d.contact.directAddr}
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {d.home.whyItems.map((it, i) => (
              <div key={it.t} className="fade-up flex gap-4 rounded-xl border border-border bg-white p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-base font-semibold text-white">{i + 1}</span>
                <div>
                  <h3 className="text-base font-semibold text-ink">{it.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner lang={lang} />
    </div>
  );
}

/* -------------------------------- contact ------------------------------- */

export function ContactPage({ lang, search }: { lang: Lang; search: string }) {
  const d = DICTS[lang];
  const t = d.contact;
  const params = new URLSearchParams(search);
  const productSlug = params.get("product");
  const presetSlugs = productSlug && bySlug(productSlug) ? [productSlug] : [];
  const roleKey = params.get("role");
  const presetRole = d.ui.roles.find(([k]) => k === roleKey)?.[1];

  return (
    <div className="min-h-screen">
      <PageHero lang={lang} crumb={d.nav.contact} title={t.title} sub={t.sub} />

      <section className="paper py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="fade-up lg:col-span-2">
              <ul className="space-y-5">
                <li className="flex items-start gap-3 rounded-xl border border-border bg-white p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand">
                    <svg className="h-5 w-5 text-sunset" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Email</p>
                    <a href={`mailto:${t.directEmail}`} className="font-medium text-ink hover:text-brand">{t.directEmail}</a>
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-xl border border-border bg-white p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand">
                    <svg className="h-5 w-5 text-sunset" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">WhatsApp / Phone</p>
                    <a href={whatsappLink(d.ui.waText)} target="_blank" rel="noopener" className="font-medium text-ink hover:text-brand">{t.directPhone}</a>
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-xl border border-border bg-white p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand">
                    <svg className="h-5 w-5 text-sunset" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{d.about.addressTitle}</p>
                    <p className="font-medium text-ink">{t.directAddr}</p>
                  </div>
                </li>
              </ul>
              <div className="mt-6 flex items-center gap-4 rounded-xl border border-border bg-white p-5">
                <img src="/logo.png" alt="SoulSelect logo" className="h-12 w-12 rounded-full bg-white object-contain" />
                <div className="text-xs leading-relaxed text-muted-foreground">
                  <p className="font-display text-sm font-semibold text-ink">SoulSelect Athletic Solutions</p>
                  <p>Hangzhou Huantong Tianmi New Materials Co., Ltd.</p>
                </div>
              </div>
            </div>
            <div className="fade-up lg:col-span-3">
              <InquiryForm lang={lang} presetSlugs={presetSlugs} presetRole={presetRole} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
