import { useMemo, useState } from "react";
import { DICTS, type Lang } from "@/i18n";
import {
  CATEGORY_KEYS,
  FEATURE_LABELS,
  PRODUCTS,
  productDisplayName,
  type CategoryKey,
  type Product,
} from "@/data/products";

const PAGE_SIZE = 12;

type SortKey = "popularity" | "priceAsc" | "priceDesc";

export function Products({ lang, onInquiry }: { lang: Lang; onInquiry: (product: Product) => void }) {
  const t = DICTS[lang].products;
  const [cat, setCat] = useState<CategoryKey | "all">("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("popularity");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => (cat === "all" ? true : p.category === cat));
    const needle = q.trim().toLowerCase();
    if (needle) {
      list = list.filter((p) => {
        const hay = [
          p.id,
          p.name.en,
          p.name.zh,
          p.name.es,
          p.fabric,
          ...p.features.map((f) => FEATURE_LABELS[f]?.en ?? f),
          ...p.features.map((f) => FEATURE_LABELS[f]?.[lang] ?? f),
        ]
          .join(" ")
          .toLowerCase();
        return needle.split(/\s+/).every((w) => hay.includes(w));
      });
    }
    const sorted = [...list];
    if (sort === "priceAsc") sorted.sort((a, b) => a.priceMin - b.priceMin);
    else if (sort === "priceDesc") sorted.sort((a, b) => b.priceMax - a.priceMax);
    else sorted.sort((a, b) => b.popularity - a.popularity);
    return sorted;
  }, [cat, q, sort, lang]);

  const shown = filtered.slice(0, visible);

  return (
    <section id="products" className="paper scroll-mt-16 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="fade-up max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sunset">{t.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-5xl">
            {t.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.sub}</p>
        </div>

        {/* controls */}
        <div className="fade-up mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setCat("all"); setVisible(PAGE_SIZE); }}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                cat === "all"
                  ? "border-transparent bg-ink text-white"
                  : "border-border bg-white text-foreground hover:border-ink/40"
              }`}
            >
              {t.filterAll}
            </button>
            {CATEGORY_KEYS.map((c) => (
              <button
                key={c}
                onClick={() => { setCat(c); setVisible(PAGE_SIZE); }}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  cat === c
                    ? "border-transparent bg-ink text-white"
                    : "border-border bg-white text-foreground hover:border-ink/40"
                }`}
              >
                {t.categories[c]}
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
                onChange={(e) => { setQ(e.target.value); setVisible(PAGE_SIZE); }}
                placeholder={t.searchPlaceholder}
                className="w-full rounded-full border border-border bg-white py-2 pl-9 pr-4 text-sm outline-none transition focus:border-brand lg:w-64"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-border bg-white px-3 py-2 text-sm outline-none focus:border-brand"
            >
              <option value="popularity">{t.sortPopular}</option>
              <option value="priceAsc">{t.sortLow}</option>
              <option value="priceDesc">{t.sortHigh}</option>
            </select>
          </div>
        </div>

        <p className="fade-up mt-6 text-xs text-muted-foreground">
          {t.showing} <span className="font-semibold text-foreground">{shown.length}</span> {t.of}{" "}
          <span className="font-semibold text-foreground">{filtered.length}</span>
        </p>

        {/* grid */}
        {shown.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-white p-10 text-center text-sm text-muted-foreground">
            {t.noResult}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {shown.map((p) => (
              <article
                key={p.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                  <img
                    src={p.image}
                    alt={productDisplayName(p, lang)}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                    {p.hot && (
                      <span className="rounded-full bg-sunset px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                        {t.badgeHot}
                      </span>
                    )}
                    {p.isNew && (
                      <span className="rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                        {t.badgeNew}
                      </span>
                    )}
                  </div>
                  <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                    {p.id}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-semibold leading-snug text-ink">{productDisplayName(p, lang)}</h3>

                  <p className="mt-1.5 text-[11px] text-muted-foreground">
                    {t.fabricLabel}: {p.fabric} · {t.gsm} {p.gsm}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {p.features.slice(0, 3).map((f) => (
                      <span key={f} className="rounded bg-sand px-1.5 py-0.5 text-[10px] font-medium text-ink/70">
                        {FEATURE_LABELS[f]?.[lang] ?? f}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex items-end justify-between border-t border-border pt-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        {t.moq} {p.moq} {t.pieces}
                      </p>
                      <p className="font-display text-lg font-semibold text-ink">
                        ${p.priceMin.toFixed(2)}–{p.priceMax.toFixed(2)}
                        <span className="ml-1 text-[11px] font-normal text-muted-foreground">{t.perPiece}</span>
                      </p>
                    </div>
                    <div className="text-right text-[10px] leading-tight text-muted-foreground">
                      <p>
                        {t.sizes}: {p.sizes}
                      </p>
                      <p>
                        {p.colorCount} {t.colors}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onInquiry(p)}
                    className="mt-3 w-full rounded-full bg-ink py-2.5 text-xs font-semibold text-white transition hover:bg-brand-deep"
                  >
                    {t.requestQuote} →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {filtered.length > visible && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="rounded-full border-2 border-ink px-8 py-3 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white"
            >
              {t.loadMore} ({filtered.length - visible})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
