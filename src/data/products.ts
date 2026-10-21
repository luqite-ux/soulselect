import type { Lang } from "@/i18n";

export type CategoryKey = "leggings" | "flare" | "shorts" | "joggers" | "sets" | "bras";

export interface Product {
  id: string;
  familyKey: string;
  category: CategoryKey;
  image: string;
  /** localized base name, filled at build */
  name: Record<Lang, string>;
  colorKey: string;
  fabric: string;
  gsm: number;
  sizes: string;
  colorCount: number;
  features: string[];
  moq: number;
  priceMin: number;
  priceMax: number;
  hot: boolean;
  isNew: boolean;
  popularity: number;
}

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
  camo: { en: "Sage Camo Print", zh: "灰绿迷彩", es: "Estampado camuflaje" },
  abstract: { en: "Abstract Print", zh: "抽象印花", es: "Estampado abstracto" },
  tiedye: { en: "Tie-Dye", zh: "扎染色", es: "Tie-dye" },
  leopard: { en: "Leopard Print", zh: "豹纹印花", es: "Estampado leopardo" },
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
  recycled: { en: "Recycled nylon", zh: "再生尼龙", es: "Nailon reciclado" },
  brushed: { en: "Brushed inside", zh: "内里磨毛", es: "Interior peinado" },
  ribbed: { en: "Ribbed texture", zh: "罗纹肌理", es: "Canalé" },
  opaque: { en: "100% opaque", zh: "100% 不透光", es: "100% opaco" },
  gusset: { en: "Gusseted crotch", zh: "裆部插片", es: "Entrepierna reforzada" },
  warm: { en: "Brushed warm", zh: "加绒保暖", es: "Abrigo interior" },
  vback: { en: "V-back design", zh: "V 型后腰", es: "Espalda en V" },
  lined: { en: "Built-in liner", zh: "内置衬裤", es: "Forro interior" },
  overbelly: { en: "Over-belly panel", zh: "过腹托腹", es: "Panel de panza" },
  upf: { en: "UPF 50+", zh: "UPF 50+ 防晒", es: "UPF 50+" },
};

interface Family {
  key: string;
  cat: CategoryKey;
  img: string;
  name: Record<Lang, string>;
  fabric: string;
  gsm: number;
  sizes: string;
  colors: string[]; // variant color keys (1 per SKU)
  features: string[];
  moq: number;
  pMin: number;
  pMax: number;
  hot?: boolean;
  isNew?: boolean;
  pop: number; // 0-100 base popularity
}

const IMG = {
  highwaist: "/images/p-highwaist-black.webp",
  butter: "/images/p-butterluxe-sage.webp",
  scrunch: "/images/p-scrunch-charcoal.webp",
  flare: "/images/p-flare-navy.webp",
  biker: "/images/p-biker-black.webp",
  ribbed: "/images/p-ribbed-set.webp",
  camo: "/images/p-camo-print.webp",
  jogger: "/images/p-jogger.webp",
  braset: "/images/p-bra-set-blush.webp",
};

const NYLON = "80% Nylon / 20% Spandex, 40D matte";
const NYLON_SOFT = "75% Nylon / 25% Spandex, double-sided brushed";
const POLY = "75% Polyester / 25% Spandex, interlock";
const SEAMLESS_F = "92% Nylon / 8% Spandex, seamless tube knit";

const FAMILIES: Family[] = [
  { key: "nakedfeel-25", cat: "leggings", img: IMG.highwaist, name: { en: 'NakedFeel™ High-Rise Legging 25"', zh: 'NakedFeel™ 高腰裸感紧身裤 25"', es: 'Legging NakedFeel™ tiro alto 25"' }, fabric: NYLON, gsm: 220, sizes: "XXS–3X", colors: ["black", "navy", "graphite"], features: ["squat", "stretch4", "wicking", "highrise", "opaque"], moq: 300, pMin: 4.8, pMax: 6.2, hot: true, pop: 98 },
  { key: "buttersoft-25", cat: "leggings", img: IMG.butter, name: { en: 'ButterSoft Brushed Legging 25"', zh: 'ButterSoft 磨毛黄油裤 25"', es: 'Legging ButterSoft brushed 25"' }, fabric: NYLON_SOFT, gsm: 250, sizes: "XS–2XL", colors: ["sage", "black", "mocha"], features: ["butter", "brushed", "stretch4", "tummy", "highrise"], moq: 300, pMin: 5.2, pMax: 6.8, hot: true, pop: 96 },
  { key: "alignlite-28", cat: "leggings", img: IMG.highwaist, name: { en: 'AlignLite High-Rise Legging 28"', zh: 'AlignLite 高腰紧身裤 28"', es: 'Legging AlignLite tiro alto 28"' }, fabric: NYLON_SOFT, gsm: 230, sizes: "0–20", colors: ["black", "espresso", "dustyblue"], features: ["butter", "stretch4", "squat", "gusset", "opaque"], moq: 300, pMin: 5.0, pMax: 6.5, hot: true, pop: 94 },
  { key: "sculpt-scrunch", cat: "leggings", img: IMG.scrunch, name: { en: "Sculpt Seamless Scrunch Legging", zh: "Sculpt 无缝蜜桃臀紧身裤", es: "Legging Sculpt scrunch sin costuras" }, fabric: SEAMLESS_F, gsm: 260, sizes: "S–XL", colors: ["charcoal", "black", "plum"], features: ["seamless", "scrunch", "compress", "ribbed", "highrise"], moq: 300, pMin: 5.8, pMax: 7.6, hot: true, pop: 97 },
  { key: "powerhold-78", cat: "leggings", img: IMG.highwaist, name: { en: 'PowerHold Compression Legging 7/8"', zh: 'PowerHold 压缩支撑紧身裤 7/8"', es: 'Legging compresión PowerHold 7/8"' }, fabric: POLY, gsm: 280, sizes: "XS–3X", colors: ["black", "graphite"], features: ["compress", "squat", "wicking", "quickdry", "tummy"], moq: 300, pMin: 4.2, pMax: 5.6, pop: 78 },
  { key: "ribbed-seamless", cat: "leggings", img: IMG.ribbed, name: { en: "Ribbed Seamless Legging", zh: "罗纹无缝紧身裤", es: "Legging canalé sin costuras" }, fabric: "90% Nylon / 10% Spandex, ribbed seamless", gsm: 240, sizes: "S–XL", colors: ["sand", "terracotta", "sage"], features: ["ribbed", "seamless", "stretch4", "highrise", "wicking"], moq: 300, pMin: 5.5, pMax: 7.2, isNew: true, pop: 85 },
  { key: "camo-pocket-78", cat: "leggings", img: IMG.camo, name: { en: 'Camo Pocket Legging 7/8"', zh: '迷彩口袋紧身裤 7/8"', es: 'Legging camuflaje con bolsillos 7/8"' }, fabric: "82% Polyester / 18% Spandex, sublimation print", gsm: 260, sizes: "XS–2XL", colors: ["camo", "black"], features: ["pockets", "squat", "wicking", "upf", "stretch4"], moq: 300, pMin: 4.6, pMax: 6.0, pop: 82 },
  { key: "crossover-flare-31", cat: "flare", img: IMG.flare, name: { en: 'Crossover Flare Pant 31"', zh: '交叉腰喇叭裤 31"', es: "Pantalón flare cruzado 31\"" }, fabric: NYLON_SOFT, gsm: 250, sizes: "XS–XL", colors: ["navy", "black", "espresso"], features: ["highrise", "butter", "stretch4", "tummy", "quickdry"], moq: 300, pMin: 5.6, pMax: 7.4, hot: true, pop: 95 },
  { key: "mini-flare-29", cat: "flare", img: IMG.flare, name: { en: 'Mini Flare Legging 29"', zh: '微喇紧身裤 29"', es: 'Legging mini flare 29"' }, fabric: NYLON, gsm: 230, sizes: "XS–2XL", colors: ["black", "graphite"], features: ["scrunch", "vback", "stretch4", "highrise"], moq: 300, pMin: 5.4, pMax: 7.0, isNew: true, pop: 88 },
  { key: "bootcut-32", cat: "flare", img: IMG.flare, name: { en: 'Bootcut Yoga Pant 32"', zh: "直筒微喇瑜伽裤 32\"", es: "Pantalón yoga bootcut 32\"" }, fabric: NYLON_SOFT, gsm: 240, sizes: "XS–3X", colors: ["black", "navy"], features: ["highrise", "tummy", "wicking", "stretch4"], moq: 300, pMin: 5.0, pMax: 6.4, pop: 74 },
  { key: "biker-6", cat: "shorts", img: IMG.biker, name: { en: 'Biker Short 6"', zh: '骑行短裤 6"', es: "Short biker 6\"" }, fabric: NYLON, gsm: 220, sizes: "XS–2XL", colors: ["black", "charcoal", "white"], features: ["squat", "wicking", "highrise", "quickdry", "opaque"], moq: 300, pMin: 3.4, pMax: 4.6, hot: true, pop: 90 },
  { key: "biker-8-pocket", cat: "shorts", img: IMG.biker, name: { en: 'Biker Short 8" with Pockets', zh: '口袋骑行短裤 8"', es: "Short biker 8\" con bolsillos" }, fabric: NYLON, gsm: 240, sizes: "XS–3X", colors: ["black", "navy"], features: ["pockets", "squat", "highrise", "wicking"], moq: 300, pMin: 3.8, pMax: 5.0, pop: 84 },
  { key: "training-short-4", cat: "shorts", img: IMG.biker, name: { en: 'Training Short 4" Lined', zh: '训练短裤 4"（含衬裤）', es: "Short de entrenamiento 4\" forrado" }, fabric: "86% Polyester / 14% Spandex, woven + knit liner", gsm: 180, sizes: "XS–XXL", colors: ["black", "graphite"], features: ["lined", "quickdry", "pockets", "upf"], moq: 500, pMin: 4.0, pMax: 5.4, isNew: true, pop: 70 },
  { key: "highrise-jogger", cat: "joggers", img: IMG.jogger, name: { en: "High-Rise Tapered Jogger", zh: "高腰锥形慢跑裤", es: "Jogger cónico tiro alto" }, fabric: "70% Cotton / 25% Polyester / 5% Spandex French terry", gsm: 320, sizes: "XS–2XL", colors: ["graphite", "sand", "espresso"], features: ["brushed", "pockets", "highrise", "quickdry"], moq: 300, pMin: 5.8, pMax: 7.8, pop: 80 },
  { key: "studio-jogger", cat: "joggers", img: IMG.jogger, name: { en: "Studio Jogger Cuffed", zh: "束脚瑜伽慢跑裤", es: "Jogger deportivo con puños" }, fabric: "78% Nylon / 22% Spandex tech knit", gsm: 280, sizes: "XS–XL", colors: ["black", "olive"], features: ["wicking", "stretch4", "pockets", "quickdry"], moq: 300, pMin: 6.0, pMax: 8.0, pop: 68 },
  { key: "wideleg-crop", cat: "joggers", img: IMG.jogger, name: { en: "Cropped Wide-Leg Pant", zh: "九分阔腿裤", es: "Pantalón ancho cropped" }, fabric: NYLON_SOFT, gsm: 240, sizes: "XS–2XL", colors: ["black", "sage"], features: ["butter", "highrise", "stretch4", "tummy"], moq: 300, pMin: 5.4, pMax: 7.0, isNew: true, pop: 72 },
  { key: "ribbed-2pc", cat: "sets", img: IMG.ribbed, name: { en: "Ribbed Seamless 2-Piece Set", zh: "罗纹无缝两件套", es: "Conjunto 2 piezas canalé" }, fabric: "90% Nylon / 10% Spandex ribbed seamless", gsm: 240, sizes: "S–XL", colors: ["sand", "terracotta", "black"], features: ["ribbed", "seamless", "stretch4", "highrise", "wicking"], moq: 200, pMin: 9.5, pMax: 12.5, hot: true, pop: 92 },
  { key: "buttersoft-set", cat: "sets", img: IMG.braset, name: { en: "ButterSoft Bra + Legging Set", zh: "ButterSoft 内衣长裤套装", es: "Conjunto sujetador + legging ButterSoft" }, fabric: NYLON_SOFT, gsm: 250, sizes: "XS–2XL", colors: ["blush", "sage", "black"], features: ["butter", "brushed", "highrise", "stretch4", "squat"], moq: 200, pMin: 10.5, pMax: 14.0, hot: true, pop: 93 },
  { key: "seamless-scrunch-set", cat: "sets", img: IMG.scrunch, name: { en: "Seamless Scrunch Bra + Legging Set", zh: "无缝蜜桃臀套装", es: "Conjunto scrunch sin costuras" }, fabric: SEAMLESS_F, gsm: 260, sizes: "S–XL", colors: ["charcoal", "black"], features: ["seamless", "scrunch", "compress", "highrise"], moq: 200, pMin: 10.0, pMax: 13.5, pop: 86 },
  { key: "scoop-bra", cat: "bras", img: IMG.braset, name: { en: "Scoop-Neck Sports Bra", zh: "U 领运动内衣", es: "Sujetador deportivo scoop" }, fabric: NYLON_SOFT, gsm: 240, sizes: "XS–2XL", colors: ["blush", "black", "sage"], features: ["butter", "wicking", "stretch4", "quickdry"], moq: 300, pMin: 3.6, pMax: 4.8, pop: 76 },
  { key: "longline-bra", cat: "bras", img: IMG.braset, name: { en: "Longline Bra — Medium Support", zh: "长款运动内衣（中强度支撑）", es: "Sujetador longline soporte medio" }, fabric: NYLON, gsm: 230, sizes: "XS–3X", colors: ["black", "navy"], features: ["compress", "wicking", "stretch4", "highrise"], moq: 300, pMin: 4.0, pMax: 5.2, pop: 71 },
  { key: "maternity-legging", cat: "leggings", img: IMG.butter, name: { en: "Maternity Over-Belly Legging", zh: "孕妇过腹托腹紧身裤", es: "Legging premamá over-belly" }, fabric: NYLON_SOFT, gsm: 230, sizes: "S–XXL", colors: ["black", "graphite"], features: ["overbelly", "butter", "stretch4", "highrise"], moq: 300, pMin: 5.2, pMax: 6.8, pop: 64 },
  { key: "plus-sculpt", cat: "leggings", img: IMG.highwaist, name: { en: "Plus-Size Sculpt Legging 25\"", zh: "大码塑形紧身裤 25\"", es: "Legging Sculpt tallas grandes 25\"" }, fabric: NYLON, gsm: 260, sizes: "1X–4X", colors: ["black", "espresso"], features: ["tummy", "compress", "squat", "stretch4", "highrise"], moq: 300, pMin: 5.4, pMax: 7.0, pop: 66 },
  { key: "capri-21", cat: "leggings", img: IMG.highwaist, name: { en: 'High-Waist Capri 21"', zh: '高腰七分紧身裤 21"', es: 'Capri tiro alto 21"' }, fabric: POLY, gsm: 240, sizes: "XS–2XL", colors: ["black", "charcoal"], features: ["wicking", "quickdry", "squat", "highrise"], moq: 500, pMin: 3.8, pMax: 5.0, pop: 62 },
  { key: "skort-hybrid", cat: "shorts", img: IMG.biker, name: { en: "Tennis Skort-Legging Hybrid", zh: "网球裙裤二合一", es: "Falda-pantalón híbrida tenis" }, fabric: "85% Nylon / 15% Spandex", gsm: 220, sizes: "XS–XXL", colors: ["black", "white"], features: ["pockets", "wicking", "quickdry", "upf"], moq: 300, pMin: 4.8, pMax: 6.4, isNew: true, pop: 69 },
  { key: "mesh-panel", cat: "leggings", img: IMG.highwaist, name: { en: "Mesh-Panel Legging 25\"", zh: "网纱拼接紧身裤 25\"", es: "Legging con paneles de malla 25\"" }, fabric: "78% Nylon / 22% Spandex + power mesh", gsm: 240, sizes: "XS–XL", colors: ["black", "charcoal"], features: ["wicking", "stretch4", "highrise", "quickdry"], moq: 300, pMin: 5.0, pMax: 6.6, pop: 60 },
  { key: "crisscross-waist", cat: "leggings", img: IMG.scrunch, name: { en: "Criss-Cross Waistband Legging", zh: "交叉腰头紧身裤", es: "Legging cintura cruzada" }, fabric: NYLON_SOFT, gsm: 240, sizes: "XS–2XL", colors: ["black", "mocha"], features: ["highrise", "tummy", "butter", "stretch4"], moq: 300, pMin: 5.2, pMax: 6.8, pop: 77 },
  { key: "vback-scrunch", cat: "leggings", img: IMG.scrunch, name: { en: "V-Back Scrunch Legging 26\"", zh: "V 腰蜜桃臀紧身裤 26\"", es: "Legging scrunch espalda V 26\"" }, fabric: SEAMLESS_F, gsm: 260, sizes: "S–XL", colors: ["black", "charcoal", "espresso"], features: ["scrunch", "vback", "seamless", "compress", "highrise"], moq: 300, pMin: 5.8, pMax: 7.6, hot: true, pop: 91 },
  { key: "abstract-print", cat: "leggings", img: IMG.camo, name: { en: 'Abstract Print Legging 7/8"', zh: "抽象印花紧身裤 7/8\"", es: "Legging estampado abstracto 7/8\"" }, fabric: "82% Polyester / 18% Spandex, printed", gsm: 250, sizes: "XS–2XL", colors: ["abstract", "black"], features: ["squat", "wicking", "upf", "stretch4"], moq: 300, pMin: 4.8, pMax: 6.2, pop: 58 },
  { key: "tiedye-lounge", cat: "leggings", img: IMG.butter, name: { en: 'Tie-Dye Lounge Legging 25"', zh: '扎染休闲紧身裤 25"', es: 'Legging lounge tie-dye 25"' }, fabric: NYLON_SOFT, gsm: 240, sizes: "XS–XL", colors: ["tiedye", "black"], features: ["butter", "brushed", "stretch4", "highrise"], moq: 300, pMin: 5.4, pMax: 7.0, pop: 57 },
  { key: "cargo-utility", cat: "joggers", img: IMG.camo, name: { en: "Cargo Utility Legging", zh: "工装风口袋紧身裤", es: "Legging cargo utilitario" }, fabric: "85% Nylon / 15% Spandex ripstop-look", gsm: 260, sizes: "XS–2XL", colors: ["olive", "black"], features: ["pockets", "wicking", "upf", "stretch4"], moq: 300, pMin: 5.8, pMax: 7.6, isNew: true, pop: 63 },
  { key: "fleece-lined", cat: "leggings", img: IMG.jogger, name: { en: "Fleece-Lined Winter Legging", zh: "加绒保暖紧身裤", es: "Legging interior afelpado" }, fabric: "75% Nylon / 25% Spandex + micro fleece", gsm: 300, sizes: "XS–2XL", colors: ["black", "graphite"], features: ["warm", "brushed", "tummy", "squat", "highrise"], moq: 300, pMin: 5.6, pMax: 7.2, pop: 65 },
  { key: "unitard", cat: "sets", img: IMG.ribbed, name: { en: "Seamless Ribbed Unitard", zh: "无缝罗纹连体衣", es: "Enterizo canalé sin costuras" }, fabric: "90% Nylon / 10% Spandex ribbed seamless", gsm: 240, sizes: "S–XL", colors: ["black", "sand"], features: ["ribbed", "seamless", "stretch4", "highrise"], moq: 200, pMin: 7.5, pMax: 9.8, isNew: true, pop: 61 },
  { key: "recycled-eco", cat: "leggings", img: IMG.highwaist, name: { en: 'EcoFlect™ Recycled Nylon Legging 25"', zh: 'EcoFlect™ 再生尼龙紧身裤 25"', es: 'Legging nailon reciclado EcoFlect™ 25"' }, fabric: "75% Recycled Nylon (GRS) / 25% Spandex", gsm: 230, sizes: "XS–2XL", colors: ["black", "sage", "dustyblue"], features: ["recycled", "squat", "wicking", "stretch4", "quickdry"], moq: 300, pMin: 5.6, pMax: 7.4, isNew: true, pop: 83 },
];

function buildProducts(): Product[] {
  const out: Product[] = [];
  let n = 0;
  for (const f of FAMILIES) {
    f.colors.forEach((colorKey, i) => {
      n++;
      const isPrint = ["camo", "abstract", "tiedye", "leopard"].includes(colorKey);
      const bump = isPrint ? 0.4 : 0;
      out.push({
        id: `SS-${2400 + n}`,
        familyKey: f.key,
        category: f.cat,
        image: f.img,
        name: f.name,
        colorKey,
        fabric: f.fabric,
        gsm: f.gsm,
        sizes: f.sizes,
        colorCount: 6 + ((n * 7) % 30),
        features: f.features,
        moq: f.moq,
        priceMin: +(f.pMin + bump).toFixed(1),
        priceMax: +(f.pMax + bump).toFixed(1),
        hot: !!f.hot,
        isNew: !!f.isNew && i === 0,
        popularity: Math.min(100, f.pop + ((i * 3) % 5) - 2),
      });
    });
  }
  return out;
}

export const PRODUCTS: Product[] = buildProducts();

export const productCount = PRODUCTS.length;

export function productDisplayName(p: Product, lang: Lang): string {
  return `${p.name[lang]} · ${COLOR_NAMES[p.colorKey]?.[lang] ?? p.colorKey}`;
}

export const CATEGORY_KEYS: CategoryKey[] = ["leggings", "flare", "shorts", "joggers", "sets", "bras"];

// Sanity check kept for build-time verification
if (PRODUCTS.length !== 100) {
  console.warn(`[catalog] expected 100 products, got ${PRODUCTS.length}`);
}
