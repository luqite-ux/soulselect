import { DICTS, type Lang } from "@/i18n";

export function Process({ lang }: { lang: Lang }) {
  const t = DICTS[lang].process;

  return (
    <section id="process" className="scroll-mt-16 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="fade-up flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sunset">{t.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-5xl">
              {t.title}
            </h2>
          </div>
          <a
            href="#contact"
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
          >
            {t.cta} →
          </a>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {t.steps.map((s, i) => (
            <li key={s.t} className="fade-up group relative rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/5">
              <span className="font-display text-4xl font-semibold text-sand transition group-hover:text-sunset/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              {i < t.steps.length - 1 && (
                <svg className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-border lg:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Why({ lang }: { lang: Lang }) {
  const t = DICTS[lang].why;

  return (
    <section id="why" className="scroll-mt-16 bg-sand/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="fade-up max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sunset">{t.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-5xl">
            {t.title}
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {t.items.map((it, i) => (
            <div key={it.t} className="fade-up flex gap-5 rounded-2xl border border-border bg-white p-7">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink font-display text-lg font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">{it.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="fade-up mt-12 text-center font-display text-2xl font-semibold italic text-brand-deep">
          “{t.principle}”
        </p>
      </div>
    </section>
  );
}
