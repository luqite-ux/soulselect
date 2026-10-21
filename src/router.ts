import { detectLang, LANGS, type Lang } from "@/i18n";

export type PageKey = "home" | "products" | "product" | "factory" | "services" | "about" | "contact";

export interface Route {
  lang: Lang;
  page: PageKey;
  slug?: string;
  search: string;
}

export function parseRoute(pathname: string, search: string): Route {
  const lang = detectLang(pathname);
  const rest = pathname.replace(/^\/(en|zh|es)(?=\/|$)/, "").replace(/\/+$/, "");
  const seg = rest.split("/").filter(Boolean);
  if (seg.length === 0) return { lang, page: "home", search };
  if (seg[0] === "products") {
    if (seg[1]) return { lang, page: "product", slug: seg[1], search };
    return { lang, page: "products", search };
  }
  const p = seg[0];
  if (p === "factory" || p === "services" || p === "about" || p === "contact") {
    return { lang, page: p, search };
  }
  return { lang, page: "home", search };
}

export const PAGE_PATH: Record<PageKey, string> = {
  home: "/",
  products: "/products/",
  product: "/products/", // + slug
  factory: "/factory/",
  services: "/services/",
  about: "/about/",
  contact: "/contact/",
};

export function hrefFor(lang: Lang, page: PageKey, slug?: string): string {
  const base = `/${lang}${PAGE_PATH[page]}`;
  return page === "product" && slug ? `${base}${slug}/` : base;
}

export function samePageOtherLang(pathname: string, lang: Lang): string {
  const rest = pathname.replace(/^\/(en|zh|es)(?=\/|$)/, "");
  return `/${lang}${rest === "" ? "/" : rest}`;
}

export function isLang(s: string): s is Lang {
  return (LANGS as string[]).includes(s);
}
