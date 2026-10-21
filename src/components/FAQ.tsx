import { useState } from "react";
import { DICTS, type Lang } from "@/i18n";

export function FAQ({ lang }: { lang: Lang }) {
  const t = DICTS[lang].faq;
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="scroll-mt-16 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="fade-up text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sunset">{t.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {t.title}
          </h2>
        </div>

        <div className="fade-up mt-12 space-y-3">
          {t.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="overflow-hidden rounded-2xl border border-border bg-white">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold text-ink sm:text-lg">{f.q}</span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition ${
                      isOpen ? "border-sunset bg-sunset text-white" : "border-border text-muted-foreground"
                    }`}
                  >
                    <svg
                      className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
