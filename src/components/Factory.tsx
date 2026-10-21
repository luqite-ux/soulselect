import { DICTS, type Lang } from "@/i18n";

const FACTORY_IMAGES = [
  { src: "/images/factory-floor.webp", key: "floor" },
  { src: "/images/factory-sewing.webp", key: "sew" },
  { src: "/images/factory-cutting.webp", key: "cut" },
  { src: "/images/factory-qc.webp", key: "qc" },
  { src: "/images/factory-warehouse.webp", key: "wh" },
  { src: "/images/factory-showroom.webp", key: "show" },
];

export function Factory({ lang }: { lang: Lang }) {
  const d = DICTS[lang];
  const t = d.factory;

  return (
    <section id="factory" className="scroll-mt-16 bg-ink py-20 text-white lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="fade-up max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sunset">{t.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            {t.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">{t.sub}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          <div className="fade-up grid grid-cols-2 gap-3 lg:col-span-3">
            {FACTORY_IMAGES.map((im, i) => (
              <figure
                key={im.key}
                className={`group relative overflow-hidden rounded-xl border border-white/10 ${
                  i === 0 ? "col-span-2 aspect-[2/1]" : "aspect-square"
                }`}
              >
                <img
                  src={im.src}
                  alt={`${t.eyebrow} — ${t.items[i]?.t ?? ""}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-xs font-medium text-white/90">
                  {t.items[i]?.t}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="fade-up flex flex-col justify-center gap-6 lg:col-span-2">
            {t.items.map((it, i) => (
              <div key={it.t} className="flex gap-4">
                <span className="font-display text-2xl font-semibold text-sunset/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="border-b border-white/10 pb-5">
                  <h3 className="font-display text-lg font-semibold">{it.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/65">{it.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
