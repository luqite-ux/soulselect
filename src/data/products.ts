import type { Lang } from "@/i18n";
import catalog from "./catalog.json";

export type CategoryKey = "leggings" | "pants" | "shorts" | "bras-tops" | "sets" | "unitards" | "outer-jogger" | "accessories";

export interface Style {
  slug: string;
  cat: CategoryKey;
  code: string;
  img: string;
  moq: number;
  fabric: string;
  gsm: number;
  sizes: string;
  colors: string[];
  features: string[];
  hot?: boolean;
  isNew?: boolean;
  /** photographed in our own studio session (vs. catalog reference photo) */
  studio?: boolean;
  images: string[];
  colorImages?: Record<string, string>;
  name: Record<Lang, string>;
  highlight: Record<Lang, string>;
}

export const STYLES: Style[] = catalog.styles as Style[];

export const bySlug = (slug: string) => STYLES.find((s) => s.slug === slug);

export const CLOTHING_KEYS: CategoryKey[] = ["leggings", "pants", "shorts", "bras-tops", "sets", "unitards", "outer-jogger"];
export const CATEGORY_KEYS: CategoryKey[] = [...CLOTHING_KEYS, "accessories"];

export const CATEGORY_COVER: Record<CategoryKey, string> = {
  leggings: "/images/studio/rs1003-charcoal.webp",
  pants: "/images/real/r-crossover.webp",
  shorts: "/images/real/r-biker8.webp",
  "bras-tops": "/images/studio/cx1004-brown.webp",
  sets: "/images/real/r-ribbed-set.webp",
  unitards: "/images/studio/a23j204-black.webp",
  "outer-jogger": "/images/studio/cx1001-cream.webp",
  accessories: "/images/acc/gaiter-camo-model.webp",
};

export const catCount = (c: CategoryKey) => STYLES.filter((s) => s.cat === c).length;

export const HOT_STYLES = STYLES.filter((s) => s.hot);

export const related = (s: Style, n = 4) =>
  STYLES.filter((x) => x.cat === s.cat && x.slug !== s.slug).slice(0, n);

export const COLOR_HEX: Record<string, string> = {
  black: "#1c1c1e", charcoal: "#45434a", graphite: "#8c8a8f", navy: "#1f2a44", sage: "#9aa58f", olive: "#6b6e55",
  blush: "#e8b9b4", sand: "#d9c7ad", terracotta: "#b8603a", mocha: "#6b4636", espresso: "#3d2b24", plum: "#4a2c3d",
  white: "#efe9df", dustyblue: "#b9c7d6", camo: "linear-gradient(135deg,#6b6e55 0 33%,#c7c9a0 33% 66%,#2f3a2e 66%)",
  abstract: "linear-gradient(135deg,#e88fb0,#9ad0c2,#f3d36b)", tiedye: "linear-gradient(135deg,#7a8a9e,#d8dde6,#3d4a5c)",
};

export const COLOR_NAMES: Record<string, Record<Lang, string>> = {
  black: { en: "Black", zh: "经典黑", es: "Negro" },
  charcoal: { en: "Charcoal", zh: "炭灰色", es: "Gris oscuro" },
  graphite: { en: "Graphite", zh: "石墨灰", es: "Grafito" },
  navy: { en: "True Navy", zh: "藏青色", es: "Azul marino" },
  sage: { en: "Grey Sage", zh: "鼠尾草绿", es: "Salvia" },
  olive: { en: "Olive", zh: "橄榄绿", es: "Oliva" },
  blush: { en: "Blush Pink", zh: "腮红粉", es: "Rosa empolvado" },
  sand: { en: "Sand", zh: "沙色", es: "Arena" },
  terracotta: { en: "Terracotta", zh: "陶土色", es: "Terracota" },
  mocha: { en: "Mocha", zh: "摩卡色", es: "Moca" },
  espresso: { en: "Espresso", zh: "深咖色", es: "Café espresso" },
  plum: { en: "Dark Plum", zh: "暗梅紫", es: "Ciruela" },
  white: { en: "Porcelain White", zh: "瓷白色", es: "Blanco porcelana" },
  dustyblue: { en: "Dusty Blue", zh: "灰蓝色", es: "Azul polvoriento" },
  camo: { en: "Sage Camo", zh: "灰绿迷彩", es: "Camuflaje salvia" },
  abstract: { en: "Abstract Print", zh: "抽象印花", es: "Estampado abstracto" },
  tiedye: { en: "Tie-Dye Wash", zh: "扎染水洗", es: "Tie-dye" },
};

export const FEATURE_LABELS: Record<string, Record<Lang, string>> = {
  squat: { en: "Squat-proof", zh: "防透不尴尬", es: "Squat-proof" },
  stretch4: { en: "4-way stretch", zh: "四向拉伸", es: "Stretch 4D" },
  wicking: { en: "Moisture-wicking", zh: "吸湿排汗", es: "Control de humedad" },
  tummy: { en: "Tummy control", zh: "收腹塑形", es: "Control de abdomen" },
  pockets: { en: "Side pockets", zh: "侧袋设计", es: "Bolsillos" },
  seamless: { en: "Seamless knit", zh: "无缝织造", es: "Sin costuras" },
  butter: { en: "Buttery soft", zh: "裸感磨毛", es: "Suave mantequilla" },
  compress: { en: "Compression fit", zh: "压缩支撑", es: "Compresión" },
  quickdry: { en: "Quick-dry", zh: "速干", es: "Secado rápido" },
  highrise: { en: "High-rise waist", zh: "高腰设计", es: "Cintura alta" },
  scrunch: { en: "Scrunch lift", zh: "蜜桃提臀", es: "Efecto push-up" },
  brushed: { en: "Brushed inside", zh: "内里磨毛", es: "Interior peinado" },
  ribbed: { en: "Ribbed texture", zh: "罗纹肌理", es: "Canalé" },
  opaque: { en: "100% opaque", zh: "100% 不透光", es: "100% opaco" },
  warm: { en: "Warm brushed", zh: "加绒保暖", es: "Abrigo interior" },
  vback: { en: "V-back design", zh: "V 型后腰", es: "Espalda en V" },
  lined: { en: "Built-in liner", zh: "内置衬裤", es: "Forro interior" },
  overbelly: { en: "Over-belly panel", zh: "过腹托腹", es: "Panel de panza" },
  upf: { en: "UPF 50+", zh: "UPF 50+ 防晒", es: "UPF 50+" },
  thumbholes: { en: "Thumbholes", zh: "拇指孔", es: "Orificio pulgar" },
  customprint: { en: "Custom print", zh: "可定制印花", es: "Estampado a medida" },
};

export const styleColorCount = (s: Style) => s.colors.length;

/** image for a given color — only returns a real photo of that color, never a stand-in */
export const imageForColor = (s: Style, color: string) => s.colorImages?.[color];
