import { useMemo, useState } from "react";
import { DICTS, type Lang } from "@/i18n";
import { bySlug, COLOR_HEX, COLOR_NAMES, FEATURE_LABELS, type Style } from "@/data/products";
import { hrefFor, type PageKey } from "@/router";
import { drawer, inquiry, useDrawerOpen, useInquiry, whatsappLink } from "@/lib/inquiry";

export const fmt = (tpl: string, vars: Record<string, string | number>) =>
  tpl.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

/* -------------------------------- layout -------------------------------- */

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function SectionHead({ eyebrow, title, sub, align = "left", action }: { eyebrow?: string; title: string; sub?: string; align?: "left" | "center"; action?: React.ReactNode }) {
  return (
    <div className={`fade-up flex flex-wrap items-end justify-between gap-6 ${align === "center" ? "flex-col items-center text-center" : ""}`}>
      <div className={align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-3 font-display text-3xl font-normal leading-[1.1] tracking-tight text-ink sm:text-[2.6rem]">{title}</h2>
        {sub && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHero({ lang, crumb, title, sub }: { lang: Lang; crumb: string; title: string; sub?: string }) {
  return (
    <section className="page-hero pb-12 pt-28 lg:pb-16 lg:pt-36">
      <Container>
        <Breadcrumbs lang={lang} items={[{ label: crumb }]} />
        <h1 className="fade-up mt-5 max-w-3xl font-display text-4xl font-normal leading-[1.05] tracking-tight text-ink sm:text-6xl">{title}</h1>
        {sub && <p className="fade-up mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{sub}</p>}
      </Container>
    </section>
  );
}

export function Breadcrumbs({ lang, items }: { lang: Lang; items: { label: string; page?: PageKey; slug?: string; href?: string }[] }) {
  const t = DICTS[lang];
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <a href={hrefFor(lang, "home")} className="hover:text-ink">
            {t.common.homeCrumb}
          </a>
        </li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            {(it.href || it.page) && i < items.length - 1 ? (
              <a href={it.href ?? hrefFor(lang, it.page!, it.slug)} className="hover:text-ink">
                {it.label}
              </a>
            ) : (
              <span className="text-ink">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export const btn = {
  primary:
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-sunset px-6 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunset",
  dark: "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-brand-deep",
  ghost:
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-ink/20 bg-white/60 px-6 text-sm font-semibold text-ink transition hover:border-ink",
};

/* ------------------------------ icons ------------------------------ */

export const Icon = {
  check: (c = "h-4 w-4") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  plus: (c = "h-4 w-4") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  list: (c = "h-5 w-5") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
    </svg>
  ),
  arrow: (c = "h-4 w-4") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  camera: (c = "h-3.5 w-3.5") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  whatsapp: (c = "h-5 w-5") => (
    <svg className={c} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 01-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.39 9.39 0 01-1.44-5.01c0-5.19 4.23-9.42 9.43-9.42 2.52 0 4.88.98 6.66 2.76a9.36 9.36 0 012.76 6.67c0 5.2-4.23 9.42-9.42 9.42zm8.02-17.44A11.25 11.25 0 0012.05.75C5.8.75.7 5.84.7 12.1c0 2 .52 3.95 1.52 5.67L.6 23.25l5.6-1.47a11.33 11.33 0 005.84 1.6h.01c6.25 0 11.34-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.02z" />
    </svg>
  ),
};

/* ------------------------------ swatches ------------------------------ */

export function Swatch({ color, size = "h-4 w-4", active = false }: { color: string; size?: string; active?: boolean }) {
  return (
    <span
      className={`inline-block shrink-0 rounded-full ring-1 ring-ink/15 ${size} ${active ? "ring-2 ring-ink ring-offset-2" : ""}`}
      style={{ background: COLOR_HEX[color] ?? "#ccc" }}
    />
  );
}

/* ------------------------------ product card ------------------------------ */

export function AddToInquiryButton({ lang, slug, variant = "card" }: { lang: Lang; slug: string; variant?: "card" | "detail" }) {
  const ui = DICTS[lang].ui;
  const items = useInquiry();
  const added = items.some((i) => i.slug === slug);
  const cls =
    variant === "card"
      ? `flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-full border text-xs font-semibold transition ${
          added ? "border-brand bg-brand text-white" : "border-ink/20 text-ink hover:border-ink"
        }`
      : `${btn.ghost} ${added ? "!border-brand !bg-brand !text-white" : ""}`;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!added) {
          inquiry.add(slug);
          drawer.open();
        } else inquiry.remove(slug);
      }}
      aria-pressed={added}
      className={cls}
    >
      {added ? Icon.check("h-3.5 w-3.5") : Icon.plus("h-3.5 w-3.5")}
      {added ? ui.inInquiry : ui.addToInquiry}
    </button>
  );
}

export function StyleCard({ lang, s }: { lang: Lang; s: Style }) {
  const t = DICTS[lang];
  const second = s.images[1];
  return (
    <article className="group relative flex flex-col">
      <a href={hrefFor(lang, "product", s.slug)} className="relative block aspect-[4/5] overflow-hidden rounded-lg bg-sand">
        <img
          src={s.img}
          alt={`${s.name.en} — wholesale ${s.cat.replace("-", " ")}`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover object-top transition duration-500 ${second ? "group-hover:opacity-0" : "group-hover:scale-[1.03]"}`}
        />
        {second && (
          <img src={second} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition duration-500 group-hover:opacity-100" />
        )}
        <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
          {s.hot && <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-sunset shadow-sm">{t.ui.trending}</span>}
          {s.isNew && <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-brand shadow-sm">{t.common.badgeNew}</span>}
        </div>
        {s.studio && (
          <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
            {Icon.camera()} {t.ui.studioShot}
          </span>
        )}
      </a>
      <div className="flex flex-1 flex-col pt-3">
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{s.code}</p>
          <div className="flex items-center gap-1" aria-label={`${s.colors.length} ${t.common.colorsLabel}`}>
            {s.colors.slice(0, 5).map((c) => (
              <Swatch key={c} color={c} size="h-3 w-3" />
            ))}
          </div>
        </div>
        <h3 className="mt-1 text-[15px] font-semibold leading-snug text-ink">
          <a href={hrefFor(lang, "product", s.slug)} className="after:absolute after:inset-0 after:content-[''] hover:underline">
            {s.name[lang]}
          </a>
        </h3>
        <p className="mt-1 text-[13px] text-muted-foreground">
          {t.common.moq} {s.moq} {t.common.pieces} · {t.ui.sampling}
        </p>
        <div className="relative z-10 mt-3">
          <AddToInquiryButton lang={lang} slug={s.slug} />
        </div>
      </div>
    </article>
  );
}

/* ------------------------------ inquiry form ------------------------------ */

export function InquiryForm({ lang, presetSlugs = [], presetRole, compact = false }: { lang: Lang; presetSlugs?: string[]; presetRole?: string; compact?: boolean }) {
  const ui = DICTS[lang].ui;
  const t = DICTS[lang].contact;
  const list = useInquiry();
  const [sent, setSent] = useState(false);

  const slugs = useMemo(() => Array.from(new Set([...presetSlugs, ...list.map((i) => i.slug)])), [presetSlugs, list]);
  const styles = slugs.map((sl) => bySlug(sl)).filter(Boolean) as Style[];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website_hp")) return; // honeypot
    const qtyOf = (sl: string) => list.find((i) => i.slug === sl)?.qty;
    const lines = [
      `Name: ${fd.get("name")}`,
      `Email: ${fd.get("email")}`,
      `Company / store: ${fd.get("url") || "-"}`,
      `Buyer type: ${fd.get("role") || "-"}`,
      `WhatsApp: ${fd.get("whatsapp") || "-"}`,
      `Quantity per style: ${fd.get("qty") || "-"}`,
      `Target price: ${fd.get("target") || "-"}`,
      ``,
      `Styles:`,
      ...(styles.length ? styles.map((s) => `- ${s.code} ${s.name.en}${qtyOf(s.slug) ? ` × ${qtyOf(s.slug)}` : ""} (https://soulselect.cn/en/products/${s.slug}/)`) : ["- (none selected)"]),
      ``,
      `Message:`,
      `${fd.get("message") || "-"}`,
    ];
    const subject = encodeURIComponent(`[soulselect.cn] Quote request — ${fd.get("name") || ""}${styles.length ? ` (${styles.length} styles)` : ""}`);
    window.location.href = `mailto:info@soulselect.cn?subject=${subject}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  };

  const input =
    "w-full min-h-[44px] rounded-md border border-input bg-white px-3.5 py-2.5 text-[15px] outline-none transition placeholder:text-muted-foreground/70 focus:border-brand focus:ring-2 focus:ring-brand/20";
  const label = "mb-1.5 block text-[13px] font-medium text-ink";

  return (
    <form onSubmit={onSubmit} className={`rounded-xl border border-border bg-white ${compact ? "p-5" : "p-6 lg:p-8"}`}>
      <input type="text" name="website_hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {styles.length > 0 && (
        <div className="mb-5">
          <p className={label}>{ui.formStyles}</p>
          <ul className="flex flex-wrap gap-2">
            {styles.map((s) => (
              <li key={s.slug} className="flex items-center gap-2 rounded-full border border-border paper py-1 pl-1 pr-3 text-xs">
                <img src={s.img} alt="" className="h-7 w-7 rounded-full object-cover object-top" />
                <span className="font-mono">{s.code}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="f-name">{t.name} *</label>
          <input id="f-name" required name="name" autoComplete="name" className={input} />
        </div>
        <div>
          <label className={label} htmlFor="f-email">{t.email} *</label>
          <input id="f-email" required type="email" name="email" autoComplete="email" className={input} />
        </div>
        <div>
          <label className={label} htmlFor="f-url">{ui.formUrl}</label>
          <input id="f-url" name="url" placeholder="https://" className={input} />
        </div>
        <div>
          <label className={label} htmlFor="f-role">{ui.formRole} *</label>
          <select id="f-role" required name="role" defaultValue={presetRole ?? ""} className={input}>
            <option value="" disabled>{ui.selectPlaceholder}</option>
            {ui.roles.map(([v, l]) => (
              <option key={v} value={l}>{l}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="f-qty">{ui.formQty}</label>
          <select id="f-qty" name="qty" defaultValue="" className={input}>
            <option value="">{ui.selectPlaceholder}</option>
            {ui.qtyOptions.map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="f-wa">{t.whatsapp}</label>
          <input id="f-wa" name="whatsapp" autoComplete="tel" className={input} />
        </div>
        {!compact && (
          <div className="sm:col-span-2">
            <label className={label} htmlFor="f-target">{ui.formTarget}</label>
            <input id="f-target" name="target" className={input} />
          </div>
        )}
      </div>
      <div className="mt-4">
        <label className={label} htmlFor="f-msg">{t.message.split("—")[0].trim()}</label>
        <textarea id="f-msg" name="message" rows={compact ? 3 : 5} placeholder={ui.formMessage} className={`${input} resize-y`} />
      </div>
      <button type="submit" className={`${btn.primary} mt-5 w-full`}>
        {ui.formSubmit} {Icon.arrow()}
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">{ui.formNote}</p>
      {sent && <p className="mt-4 rounded-md bg-brand/10 px-4 py-3 text-sm leading-relaxed text-brand-deep" role="status">{ui.formSuccess}</p>}
      <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        {ui.waAlt}
        <a href={whatsappLink(ui.waText)} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-semibold text-[#128C7E] hover:underline">
          {Icon.whatsapp("h-4 w-4")} WhatsApp
        </a>
      </p>
    </form>
  );
}

/* ------------------------------ inquiry drawer ------------------------------ */

export function InquiryDrawer({ lang }: { lang: Lang }) {
  const ui = DICTS[lang].ui;
  const open = useDrawerOpen();
  const list = useInquiry();
  if (!open) return null;
  const styles = list.map((i) => ({ i, s: bySlug(i.slug) })).filter((x) => x.s) as { i: { slug: string; qty?: string }; s: Style }[];
  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={ui.inquiryList}>
      <button className="absolute inset-0 bg-ink/40" aria-label={ui.close} onClick={drawer.close} />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col paper shadow-2xl">
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-xl text-ink">
            {ui.inquiryList} <span className="text-muted-foreground">({styles.length})</span>
          </h2>
          <button onClick={drawer.close} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-sand" aria-label={ui.close}>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M6 18L18 6" /></svg>
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {styles.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm leading-relaxed text-muted-foreground">{ui.inquiryEmpty}</p>
              <a href={hrefFor(lang, "products")} onClick={drawer.close} className={`${btn.dark} mt-6`}>{ui.browse}</a>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {styles.map(({ i, s }) => (
                <li key={s.slug} className="flex gap-3 py-3">
                  <img src={s.img} alt="" className="h-20 w-16 shrink-0 rounded-md object-cover object-top" />
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] uppercase text-muted-foreground">{s.code}</p>
                    <p className="truncate text-sm font-semibold text-ink">{s.name[lang]}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        value={i.qty ?? ""}
                        onChange={(e) => inquiry.setQty(s.slug, e.target.value)}
                        inputMode="numeric"
                        placeholder={ui.qtyPlaceholder}
                        className="h-9 w-28 rounded-md border border-input bg-white px-2.5 text-sm outline-none focus:border-brand"
                        aria-label={`${ui.qtyPlaceholder} ${s.code}`}
                      />
                      <button onClick={() => inquiry.remove(s.slug)} className="text-xs text-muted-foreground underline-offset-2 hover:text-ink hover:underline">
                        {ui.remove}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {styles.length > 0 && (
          <footer className="space-y-2 border-t border-border px-5 py-4">
            <a href={`${hrefFor(lang, "contact")}?from=list`} onClick={drawer.close} className={`${btn.primary} w-full`}>
              {fmt(ui.requestQuote, { n: styles.length })} {Icon.arrow()}
            </a>
            <a
              href={whatsappLink(`${ui.waText}\n${styles.map(({ i, s }) => `${s.code}${i.qty ? ` × ${i.qty}` : ""}`).join(", ")}`)}
              target="_blank"
              rel="noopener"
              className={`${btn.ghost} w-full`}
            >
              {Icon.whatsapp("h-4 w-4")} {ui.whatsapp}
            </a>
          </footer>
        )}
      </aside>
    </div>
  );
}

/* ------------------------------ CTA banner ------------------------------ */

export function CtaBanner({ lang }: { lang: Lang }) {
  const t = DICTS[lang].home;
  const ui = DICTS[lang].ui;
  return (
    <section className="relative overflow-hidden bg-ink">
      <img src="/images/studio/rs1003-olive-wide.webp" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <Container className="relative py-20 text-center lg:py-28">
        <h2 className="fade-up mx-auto max-w-3xl font-display text-3xl font-normal leading-tight text-white sm:text-5xl">{t.bannerTitle}</h2>
        <p className="fade-up mx-auto mt-5 max-w-xl text-white/80">{t.bannerSub}</p>
        <div className="fade-up mt-8 flex flex-wrap justify-center gap-3">
          <a href={hrefFor(lang, "contact")} className={btn.primary}>
            {t.bannerCta} {Icon.arrow()}
          </a>
          <a href={whatsappLink(ui.waText)} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition hover:bg-white/10">
            {Icon.whatsapp("h-4 w-4")} WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}

export { COLOR_NAMES, FEATURE_LABELS };
