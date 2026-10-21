import { useMemo, useState } from "react";
import { DICTS, type Lang } from "@/i18n";
import {
  bySlug,
  CATEGORY_KEYS,
  COLOR_NAMES,
  FEATURE_LABELS,
  related,
  STYLES,
  styleColorCount,
  type CategoryKey,
} from "@/data/products";
import { hrefFor } from "@/router";
import { Breadcrumbs, StyleCard } from "@/components/Shared";

/* ------------------------------ index page ------------------------------ */

export function ProductsPage({ lang, search }: { lang: Lang; search: string }) {
  const t = DICTS[lang].productsPage;
  const c = DICTS[lang].common;
  const initialCat = new URLSearchParams(search).get("cat") as CategoryKey | null;
  const [cat, setCat] = useState<CategoryKey | "all">(initialCat && CATEGORY_KEYS.includes(initialCat) ? initialCat : "all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"popularity" | "az">("popularity");
  const [visible, setVisible] = useState(18);

  const filtered = useMemo(() => {
    let list = STYLES.filter((s) => (cat === "all" ? true : s.cat === cat));
    const needle = q.trim().toLowerCase();
    if (needle) {
      list = list.filter((s) =>
        needle
          .split(/\s+/)
          .every((w) =>
            [s.slug, s.name.en, s.name.zh, s.name.es, s.fabric, s.highlight[lang], ...s.features.map((f) => FEATURE_LABELS[f]?.[lang] ?? f)]
              .join(" ")
              .toLowerCase()
              .includes(w)
          )
      );
    }
    const sorted = [...list];
    if (sort === "az") sorted.sort((a, b) => a.name.en.localeCompare(b.name.en));
    else sorted.sort((a, b) => Number(b.hot ?? false) - Number(a.hot ?? false) || Number(b.isNew ?? false) - Number(a.isNew ?? false));
    return sorted;
  }, [cat, q, sort, lang]);

  const shown = filtered.slice(0, visible);

  return (
    <div className="paper min-h-screen py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs lang={lang} items={[{ label: c.productsCrumb }]} />
        <header className="fade-up mt-6 max-w-3xl">
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">{t.title}</h1>
          <p className="mt-4 text-muted-foreground">{t.sub}</p>
        </header>

        <div className="fade-up mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setCat("all"); setVisible(18); }}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                cat === "all" ? "border-transparent bg-ink text-white" : "border-border bg-white hover:border-ink/40"
              }`}
            >
              {t.filterAll}
            </button>
            {CATEGORY_KEYS.map((k) => (
              <button
                key={k}
                onClick={() => { setCat(k); setVisible(18); }}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  cat === k ? "border-transparent bg-ink text-white" : "border-border bg-white hover:border-ink/40"
                }`}
              >
                {DICTS[lang].categories[k]}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setVisible(18); }}
                placeholder={t.searchPlaceholder}
                className="w-full rounded-full border border-border bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-brand lg:w-64"
              />
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value as "popularity" | "az")} className="rounded-full border border-border bg-white px-3 py-2 text-sm outline-none focus:border-brand">
              <option value="popularity">{t.sortPopular}</option>
              <option value="az">{t.sortAZ}</option>
            </select>
          </div>
        </div>

        <p className="fade-up mt-6 text-xs text-muted-foreground">
          {c.showing} <span className="font-semibold text-foreground">{shown.length}</span> {c.of}{" "}
          <span className="font-semibold text-foreground">{filtered.length}</span>
        </p>

        {shown.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-white p-10 text-center text-sm text-muted-foreground">{c.noResult}</div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {shown.map((s) => (
              <StyleCard key={s.slug} lang={lang} s={s} />
            ))}
          </div>
        )}

        {filtered.length > visible && (
          <div className="mt-10 text-center">
            <button onClick={() => setVisible((v) => v + 18)} className="rounded-full border-2 border-ink px-8 py-3 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white">
              {c.loadMore} ({filtered.length - visible})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------ detail page ------------------------------ */

export function ProductDetailPage({ lang, slug }: { lang: Lang; slug: string }) {
  const d = DICTS[lang];
  const t = d.detail;
  const s = bySlug(slug);

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

  const rel = related(s, 4);

  return (
    <div className="paper min-h-screen py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          lang={lang}
          items={[
            { label: d.common.productsCrumb, page: "products" },
            { label: d.categories[s.cat], page: "products" },
            { label: s.name[lang] },
          ]}
        />

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div className="fade-up">
            <div className="overflow-hidden rounded-3xl border border-border bg-sand">
              <img src={s.img} alt={s.name[lang]} className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>

          <div className="fade-up">
            <div className="flex gap-2">
              {s.hot && <span className="rounded-full bg-sunset px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">{d.common.badgeHot}</span>}
              {s.isNew && <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">{d.common.badgeNew}</span>}
            </div>
            <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">{s.name[lang]}</h1>
            <p className="mt-4 leading-relaxed text-muted-foreground">{s.highlight[lang]}</p>

            <dl className="mt-8 overflow-hidden rounded-2xl border border-border bg-white">
              <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                <div className="p-5">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{t.sku}</dt>
                  <dd className="mt-1 font-mono text-sm font-semibold text-ink">{s.code}</dd>
                </div>
                <div className="p-5">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{t.minOrder}</dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">{s.moq} {d.common.pieces}</dd>
                </div>
                <div className="p-5">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{d.common.fabric}</dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">{s.fabric}</dd>
                </div>
                <div className="p-5">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{d.common.gsm} / {d.common.sizes}</dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">{s.gsm} GSM · {s.sizes}</dd>
                </div>
              </div>
            </dl>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {d.common.colorsLabel} · {styleColorCount(s)} · <span className="text-brand">{t.colorNote}</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.colors.map((cKey) => (
                  <span key={cKey} className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-ink">
                    {COLOR_NAMES[cKey]?.[lang] ?? cKey}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {s.features.map((f) => (
                <span key={f} className="rounded-full bg-sand px-3 py-1.5 text-xs font-medium text-ink/75">
                  {FEATURE_LABELS[f]?.[lang] ?? f}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`${hrefFor(lang, "contact")}?product=${s.slug}`}
                className="rounded-full bg-sunset px-8 py-4 text-sm font-semibold text-white shadow-xl transition hover:brightness-110"
              >
                {d.common.inquiryCta} →
              </a>
              <a href={hrefFor(lang, "products")} className="text-sm font-medium text-brand underline-offset-4 hover:underline">
                ← {d.common.backToProducts}
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{t.ctaNote}</p>
          </div>
        </div>

        {/* customization */}
        <section className="fade-up mt-16 rounded-3xl border border-border bg-white p-8 lg:p-10">
          <h2 className="font-display text-2xl font-semibold text-ink">{d.common.customTitle}</h2>
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
        </section>

        {/* related */}
        {rel.length > 0 && (
          <section className="mt-16">
            <h2 className="fade-up font-display text-2xl font-semibold text-ink">{t.related}</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {rel.map((r) => (
                <StyleCard key={r.slug} lang={lang} s={r} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
