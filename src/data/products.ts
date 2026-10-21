import type { Lang } from "@/i18n";
import catalog from "./catalog.json";

export type CategoryKey = "leggings" | "pants" | "shorts" | "bras-tops" | "sets" | "unitards" | "outer-jogger";

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
  name: Record<Lang, string>;
  highlight: Record<Lang, string>;
}

export const STYLES: Style[] = catalog.styles as Style[];

export const bySlug = (slug: string) => STYLES.find((s) => s.slug === slug);

export const CATEGORY_KEYS: CategoryKey[] = ["leggings", "pants", "shorts", "bras-tops", "sets", "unitards", "outer-jogger"];

export const HOT_STYLES = STYLES.filter((s) => s.hot);

export const related = (s: Style, n = 4) =>
  STYLES.filter((x) => x.cat === s.cat && x.slug !== s.slug).slice(0, n);

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
};

export const styleColorCount = (s: Style) => 6 + ((s.slug.length * 7) % 26);
