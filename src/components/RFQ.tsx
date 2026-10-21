import { useState } from "react";
import { DICTS, type Lang } from "@/i18n";
import { CATEGORY_KEYS, productDisplayName, type Product } from "@/data/products";

interface Props {
  lang: Lang;
  presetProduct: Product | null;
}

export function RFQ({ lang, presetProduct }: Props) {
  const t = DICTS[lang].contact;
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const lines = [
      `Name / 姓名: ${fd.get("name")}`,
      `Company / 公司: ${fd.get("company")}`,
      `Email / 邮箱: ${fd.get("email")}`,
      `WhatsApp / 电话: ${fd.get("whatsapp") || "-"}`,
      `Interested in / 意向产品: ${fd.get("interest") || "-"}`,
      `Estimated quantity / 预估数量: ${fd.get("qty") || "-"} pcs`,
      ``,
      `Message / 留言:`,
      `${fd.get("message") || "-"}`,
    ];
    const subject = encodeURIComponent(`[soulselect.cn RFQ] ${fd.get("company") || ""} — ${fd.get("name") || ""}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:info@soulselect.cn?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inputCls =
    "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <section id="contact" className="scroll-mt-16 bg-ink py-20 text-white lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2">
          <div className="fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sunset">{t.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              {t.title}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70">{t.sub}</p>
            <p className="mt-6 border-l-2 border-sunset pl-4 font-display text-lg italic text-white/75">{t.moto}</p>

            <ul className="mt-10 space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <svg className="h-4 w-4 text-sunset" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z" opacity="0"/><path d="M22 6l-10 7L2 6"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                </span>
                <a href={`mailto:${t.direct.email}`} className="text-white/85 hover:text-white">{t.direct.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <svg className="h-4 w-4 text-sunset" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
                </span>
                <a href="tel:+8613726671114" className="text-white/85 hover:text-white">{t.direct.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <svg className="h-4 w-4 text-sunset" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <span className="text-white/85">{t.direct.addr}</span>
              </li>
            </ul>

            <div className="mt-10 flex items-center gap-4">
              <img src="/logo.png" alt="SoulSelect logo" className="h-14 w-14 rounded-full bg-white object-contain p-1" />
              <div className="text-xs leading-relaxed text-white/50">
                <p className="font-display text-sm font-semibold text-white">SoulSelect Athletic Solutions</p>
                <p>Hangzhou Huantong Tianmi New Materials Co., Ltd.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="fade-up rounded-3xl border border-white/10 bg-white p-7 text-foreground shadow-2xl lg:p-9">
            <div className="grid gap-4 sm:grid-cols-2">
              <input required name="name" placeholder={t.name} className={inputCls} />
              <input name="company" placeholder={t.company} className={inputCls} />
              <input required type="email" name="email" placeholder={t.email} className={inputCls} />
              <input name="whatsapp" placeholder={t.whatsapp} className={inputCls} />
              <select name="interest" defaultValue={presetProduct ? presetProduct.category : ""} className={inputCls}>
                <option value="" disabled>
                  {t.selectPlaceholder}
                </option>
                {CATEGORY_KEYS.map((c) => (
                  <option key={c} value={DICTS.en.products.categories[c]}>
                    {DICTS[lang].products.categories[c]}
                  </option>
                ))}
              </select>
              <input name="qty" type="number" min={0} placeholder={t.qty} className={inputCls} />
            </div>
            {presetProduct && (
              <p className="mt-3 rounded-xl bg-sand px-4 py-3 text-xs text-ink/80">
                {DICTS[lang].products.inquiryFor}:{" "}
                <span className="font-semibold">{productDisplayName(presetProduct, lang)}</span> ({presetProduct.id})
              </p>
            )}
            <textarea
              name="message"
              rows={5}
              defaultValue={
                presetProduct
                  ? `${DICTS[lang].products.inquiryFor}: ${productDisplayName(presetProduct, lang)} (${presetProduct.id}). `
                  : ""
              }
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
              <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-xs leading-relaxed text-green-700">
                {t.success} <a className="font-semibold underline" href={`mailto:${t.direct.email}`}>{t.direct.email}</a> ·{" "}
                <a className="font-semibold underline" href="tel:+8613726671114">{t.direct.phone}</a>
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
