import { useState } from "react";
import { DICTS, type Lang } from "@/i18n";
import { FEATURE_LABELS, styleColorCount, type Style } from "@/data/products";
import { hrefFor, type PageKey } from "@/router";

export function Breadcrumbs({ lang, items }: { lang: Lang; items: { label: string; page?: PageKey; slug?: string }[] }) {
  const t = DICTS[lang];
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <a href={hrefFor(lang, "home")} className="hover:text-brand">
            {t.common.homeCrumb}
          </a>
        </li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span>/</span>
            {it.page && i < items.length - 1 ? (
              <a href={hrefFor(lang, it.page, it.slug)} className="hover:text-brand">
                {it.label}
              </a>
            ) : (
              <span className="text-foreground">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function StyleCard({ lang, s }: { lang: Lang; s: Style }) {
  const t = DICTS[lang];
  return (
    <a
      href={hrefFor(lang, "product", s.slug)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        <img
          src={s.img}
          alt={s.name[lang]}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {s.hot && (
            <span className="rounded-full bg-sunset px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
              {t.common.badgeHot}
            </span>
          )}
          {s.isNew && (
            <span className="rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
              {t.common.badgeNew}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{s.code}</p>
        <h3 className="mt-1 text-sm font-semibold leading-snug text-ink">{s.name[lang]}</h3>
        <p className="mt-1.5 line-clamp-1 text-[11px] text-muted-foreground">
          {t.common.fabric}: {s.fabric} · {t.common.gsm} {s.gsm}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {s.features.slice(0, 3).map((f) => (
            <span key={f} className="rounded bg-sand px-1.5 py-0.5 text-[10px] font-medium text-ink/70">
              {FEATURE_LABELS[f]?.[lang] ?? f}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
          <span>
            {t.common.moq} <span className="font-semibold text-ink">{s.moq}</span> {t.common.pieces}
          </span>
          <span>
            {styleColorCount(s)} {t.common.colorsLabel}
          </span>
        </div>
        <span className="mt-3 rounded-full bg-ink py-2.5 text-center text-xs font-semibold text-white transition group-hover:bg-brand-deep">
          {t.common.viewDetails} →
        </span>
      </div>
    </a>
  );
}

export function InquiryForm({ lang, presetText }: { lang: Lang; presetText?: string }) {
  const t = DICTS[lang].contact;
  const c = DICTS[lang].common;
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const lines = [
      `Name: ${fd.get("name")}`,
      `Company: ${fd.get("company")}`,
      `Email: ${fd.get("email")}`,
      `WhatsApp: ${fd.get("whatsapp") || "-"}`,
      `Category: ${fd.get("interest") || "-"}`,
      `Estimated quantity: ${fd.get("qty") || "-"} pcs`,
      ``,
      `Message:`,
      `${fd.get("message") || "-"}`,
    ];
    const subject = encodeURIComponent(`[soulselect.cn] Inquiry — ${fd.get("company") || ""} ${fd.get("name") || ""}`);
    window.location.href = `mailto:info@soulselect.cn?subject=${subject}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  };

  const inputCls =
    "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-white p-7 text-foreground shadow-xl lg:p-9">
      <p className="mb-5 rounded-xl bg-sand px-4 py-3 text-xs text-ink/75">{c.quoteNote}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <input required name="name" placeholder={t.name} className={inputCls} />
        <input name="company" placeholder={t.company} className={inputCls} />
        <input required type="email" name="email" placeholder={t.email} className={inputCls} />
        <input name="whatsapp" placeholder={t.whatsapp} className={inputCls} />
        <input name="qty" type="number" min={0} placeholder={t.qty} className={inputCls} />
      </div>
      <textarea
        name="message"
        rows={5}
        defaultValue={presetText ?? ""}
        placeholder={t.message}
        className={`${inputCls} mt-4 resize-none`}
      />
      <button
        type="submit"
        className="mt-5 w-full rounded-full bg-sunset py-4 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
      >
        {sent ? t.sending : t.submit}
      </button>
      {sent && (
        <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-xs leading-relaxed text-green-700">{t.success}</p>
      )}
    </form>
  );
}

export function CtaBanner({ lang }: { lang: Lang }) {
  const t = DICTS[lang].home;
  return (
    <section className="bg-ink grain relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <h2 className="fade-up font-display text-3xl font-semibold text-white sm:text-4xl">{t.bannerTitle}</h2>
        <p className="fade-up mx-auto mt-4 max-w-xl text-white/70">{t.bannerSub}</p>
        <a
          href={hrefFor(lang, "contact")}
          className="fade-up mt-8 inline-block rounded-full bg-sunset px-8 py-4 text-sm font-semibold text-white shadow-xl transition hover:brightness-110"
        >
          {t.bannerCta} →
        </a>
      </div>
    </section>
  );
}
