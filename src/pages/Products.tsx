import { useMemo, useState } from "react";
import { DICTS, type Lang } from "@/i18n";
import {
  bySlug,
  CATEGORY_KEYS,
  CLOTHING_KEYS,
  COLOR_NAMES,
  FEATURE_LABELS,
  imageForColor,
  related,
  STYLES,
  type CategoryKey,
} from "@/data/products";
import { hrefFor } from "@/router";
import { AddToInquiryButton, Breadcrumbs, btn, Container, CtaBanner, fmt, Icon, StyleCard, Swatch } from "@/components/Shared";
import { drawer, inquiry, whatsappLink } from "@/lib/inquiry";

/* ------------------------------ index page ------------------------------ */

export function ProductsPage({ lang, search }: { lang: Lang; search: string }) {
  const d = DICTS[lang];
  const t = d.productsPage;
  const ui = d.ui;
  const initialCat = new URLSearchParams(search).get("cat") as CategoryKey | null;
  const [cat, setCat] = useState<CategoryKey | "all">(initialCat && CATEGORY_KEYS.includes(initialCat) ? initialCat : "all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"popularity" | "az">("popularity");

  const setCategory = (c: CategoryKey | "all") => {
    setCat(c);
    const url = c === "all" ? hrefFor(lang, "products") : `${hrefFor(lang, "products")}?cat=${c}`;
    window.history.replaceState({}, "", url);
  };

  const filtered = useMemo(() => {
    let list = STYLES.filter((s) => (cat === "all" ? true : s.cat === cat));
    const needle = q.trim().toLowerCase();
    if (needle) {
      list = list.filter((s) =>
        needle
          .split(/\s+/)
          .every((w) =>
            [s.code, s.slug, s.name.en, s.name.zh, s.name.es, s.fabric, s.highlight[lang], ...s.features.map((f) => FEATURE_LABELS[f]?.[lang] ?? f)]
              .join(" ")
              .toLowerCase()
              .includes(w)
          )
      );
    }
    const sorted = [...list];
    if (sort === "az") sorted.sort((a, b) => a.name[lang].localeCompare(b.name[lang]));
    else
      sorted.sort(
        (a, b) =>
          Number(!!b.hot) - Number(!!a.hot) || Number(!!b.studio) - Number(!!a.studio) || Number(!!b.isNew) - Number(!!a.isNew)
      );
    return sorted;
  }, [cat, q, sort, lang]);

  const chip = (active: boolean) =>
    `shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition min-h-[40px] ${active ? "border-ink bg-ink text-white" : "border-border bg-white text-ink/80 hover:border-ink/40"}`;

  return (
    <div className="min-h-screen">
      <section className="page-hero pb-10 pt-28 lg:pt-36">
        <Container>
          <Breadcrumbs lang={lang} items={[{ label: d.common.productsCrumb }]} />
          <h1 className="mt-5 font-display text-4xl font-normal tracking-tight text-ink sm:text-6xl">{t.title}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground sm:text-lg">{t.sub}</p>
        </Container>
      </section>

      <div className="sticky top-16 z-30 border-b border-border lg:top-[72px]" style={{ backgroundColor: "hsl(var(--paper) / 0.96)" }}>
        <Container className="flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:px-0">
            <button onClick={() => setCategory("all")} className={chip(cat === "all")}>
              {t.filterAll}
            </button>
            <span className="hidden self-center px-1 text-xs uppercase tracking-wider text-muted-foreground lg:inline">{ui.clothing}</span>
            {CLOTHING_KEYS.map((k) => (
              <button key={k} onClick={() => setCategory(k)} className={chip(cat === k)}>
                {d.categories[k]}
              </button>
            ))}
            <span className="hidden self-center px-1 text-xs uppercase tracking-wider text-muted-foreground lg:inline">{ui.accessories}</span>
            <button onClick={() => setCategory("accessories")} className={chip(cat === "accessories")}>
              {d.categories.accessories}
            </button>
          </div>
          <div className="flex gap-2">
            <label className="relative flex-1 lg:w-60 lg:flex-none">
              <span className="sr-only">{t.searchPlaceholder}</span>
              <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="h-10 w-full rounded-full border border-border bg-white pl-9 pr-4 text-sm outline-none focus:border-brand"
              />
            </label>
            <select value={sort} onChange={(e) => setSort(e.target.value as "popularity" | "az")} className="h-10 rounded-full border border-border bg-white px-3 text-sm outline-none focus:border-brand" aria-label="Sort">
              <option value="popularity">{t.sortPopular}</option>
              <option value="az">{t.sortAZ}</option>
            </select>
          </div>
        </Container>
      </div>

      <Container className="py-10 lg:py-14">
        <p className="text-sm text-muted-foreground">{fmt(ui.results, { n: filtered.length })}</p>
        {filtered.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-border bg-white p-10 text-center text-sm text-muted-foreground">{d.common.noResult}</div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {filtered.map((s) => (
              <StyleCard key={s.slug} lang={lang} s={s} />
            ))}
          </div>
        )}
      </Container>
      <CtaBanner lang={lang} />
    </div>
  );
}

/* ------------------------------ detail page ------------------------------ */

export function ProductDetailPage({ lang, slug }: { lang: Lang; slug: string }) {
  const d = DICTS[lang];
  const t = d.detail;
  const ui = d.ui;
  const s = bySlug(slug);
  const [color, setColor] = useState<string | null>(null);
  const [active, setActive] = useState(0);

  if (!s) {
    return (
      <div className="paper min-h-screen py-40 text-center">
        <p className="text-muted-foreground">Style not found.</p>
        <a href={hrefFor(lang, "products")} className="mt-4 inline-block text-brand underline">
          {d.common.backToProducts}
        </a>
      </div>
    );
  }

  const colorImg = color ? imageForColor(s, color) : undefined;
  const gallery = s.images;
  const mainSrc = colorImg ?? gallery[active] ?? s.img;
  const rel = related(s, 4);

  return (
    <div className="min-h-screen">
      <Container className="pb-16 pt-24 lg:pt-28">
        <Breadcrumbs
          lang={lang}
          items={[
            { label: d.common.productsCrumb, page: "products" },
            { label: d.categories[s.cat], href: `${hrefFor(lang, "products")}?cat=${s.cat}` },
            { label: s.name[lang] },
          ]}
        />

        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* gallery */}
          <div className="lg:col-span-7">
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              {gallery.length > 1 && (
                <div className="no-scrollbar flex gap-2 overflow-x-auto sm:w-20 sm:flex-col">
                  {gallery.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => {
                        setActive(i);
                        setColor(null);
                      }}
                      className={`shrink-0 overflow-hidden rounded-md ring-offset-2 transition ${!colorImg && active === i ? "ring-2 ring-ink" : "opacity-70 hover:opacity-100"}`}
                      aria-label={`Image ${i + 1}`}
                    >
                      <img src={src} alt="" className="aspect-[4/5] w-16 object-cover object-top sm:w-20" />
                    </button>
                  ))}
                </div>
              )}
              <div className="relative flex-1 overflow-hidden rounded-xl bg-sand">
                <img src={mainSrc} alt={`${s.name.en}${color ? ` in ${COLOR_NAMES[color]?.en ?? color}` : ""} — style ${s.code}`} className="aspect-[4/5] w-full object-cover object-top" />
                {s.studio && (
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                    {Icon.camera()} {ui.studioShot}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* info */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-2">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{s.code}</p>
                {s.hot && <span className="rounded-full bg-sunset/10 px-2.5 py-0.5 text-[11px] font-semibold text-sunset">{ui.trending}</span>}
                {s.isNew && <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand">{d.common.badgeNew}</span>}
              </div>
              <h1 className="mt-2 font-display text-3xl font-normal leading-tight text-ink sm:text-[2.6rem]">{s.name[lang]}</h1>
              <p className="mt-4 leading-relaxed text-muted-foreground">{s.highlight[lang]}</p>

              {/* colors */}
              <div className="mt-6">
                <p className="text-sm text-ink">
                  <span className="font-semibold">{d.common.colorsLabel}:</span> {color ? COLOR_NAMES[color]?.[lang] ?? color : `${s.colors.length}`}
                  <span className="text-muted-foreground"> · {t.colorNote}</span>
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {s.colors.map((c) => (
                    <button key={c} onClick={() => setColor(c === color ? null : c)} className="rounded-full p-0.5" aria-label={COLOR_NAMES[c]?.[lang] ?? c} aria-pressed={c === color} title={COLOR_NAMES[c]?.[lang] ?? c}>
                      <Swatch color={c} size="h-7 w-7" active={c === color} />
                    </button>
                  ))}
                </div>
                {color && !colorImg && <p className="mt-2 text-xs text-muted-foreground">{ui.colorPhotoNote}</p>}
              </div>

              {/* quote box — replaces price */}
              <div className="mt-7 rounded-xl border border-border bg-white p-5">
                <p className="font-display text-xl text-ink">{ui.quoteBoxTitle}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-ink/80">
                  {ui.quoteBoxPts.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <span className="text-brand">{Icon.check()}</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 grid gap-2.5">
                  <a
                    href={`${hrefFor(lang, "contact")}?product=${s.slug}`}
                    onClick={() => inquiry.add(s.slug)}
                    className={`${btn.primary} w-full`}
                  >
                    {ui.getPrice} {Icon.arrow()}
                  </a>
                  <div className="grid grid-cols-2 gap-2.5">
                    <AddToInquiryButton lang={lang} slug={s.slug} variant="detail" />
                    <a href={whatsappLink(ui.waStyle.replace("{code}", s.code))} target="_blank" rel="noopener" className={`${btn.ghost} !px-3`}>
                      {Icon.whatsapp("h-4 w-4 text-[#128C7E]")} WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* specs */}
              <dl className="mt-7 divide-y divide-border border-y border-border text-sm">
                {[
                  [d.common.moq, `${s.moq} ${d.common.pieces} / ${lang === "zh" ? "款" : "style"}`],
                  [d.common.fabric, s.fabric],
                  [`${d.common.gsm} · ${d.common.sizes}`, `${s.gsm} GSM · ${s.sizes}`],
                  [ui.sampleTime, ui.sampleTimeVal],
                  [ui.leadTime, ui.leadTimeVal],
                  [ui.customizable, ui.customizeList.join(" · ")],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-3">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-wrap gap-2">
                {s.features.map((f) => (
                  <span key={f} className="rounded-full bg-sand px-3 py-1.5 text-xs font-medium text-ink/80">
                    {FEATURE_LABELS[f]?.[lang] ?? f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* customization */}
        <section className="mt-20 rounded-xl bg-sand p-8 lg:p-12">
          <h2 className="font-display text-3xl text-ink">{d.common.customTitle}</h2>
          <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {d.common.customItems.map((it) => (
              <li key={it} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
                <span className="mt-1 text-brand">{Icon.check()}</span>
                {it}
              </li>
            ))}
          </ul>
          <button onClick={() => { inquiry.add(s.slug); drawer.open(); }} className={`${btn.dark} mt-8`}>
            {ui.addToInquiry}
          </button>
        </section>

        {rel.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-3xl text-ink">{t.related}</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:gap-x-6">
              {rel.map((r) => (
                <StyleCard key={r.slug} lang={lang} s={r} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
