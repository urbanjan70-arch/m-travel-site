// data/catalog.ts

export type CityId = "prague" | "vienna" | "salzburg" | "hallstatt" | "budapest" | "munich";

export type LanguageId = "zh-Hant" | "zh-Hans" | "en" | "ko";

export type ProductType = "tour" | "addon" | "transfer" | "meal";

export type ProductId =
  | "prague_tour_halfday_4h"
  | "prague_tour_fullday_8h"
  | "prague_addon_jewish_2h"
  | "meal_restaurant_3course"
  | "transfer_private";

export type DurationChoice = "half_day" | "full_day" | "two_days" | "three_days";

export interface Product {
  id: ProductId;
  city: CityId;
  type: ProductType;
  name: Record<LanguageId, string>;
  durationHours?: number;
  pricing: {
    currency: "EUR";
    kind: "flat" | "per_pax" | "tiered";
    amount?: number; // for flat/per_pax
    tiers?: Array<{ maxPax: number; amount: number }>; // for tiered
  };
  constraints?: {
    maxPax?: number;
    requires?: ProductId[]; // dependencies
  };
  tags?: string[];
}

export const cities: Array<{ id: CityId; name: Record<LanguageId, string>; status: "available" | "coming_soon" }> =
  [
    {
      id: "prague",
      status: "available",
      name: { "zh-Hant": "布拉格", "zh-Hans": "布拉格", en: "Prague", ko: "프라하" },
    },
    {
      id: "vienna",
      status: "coming_soon",
      name: { "zh-Hant": "維也納（即將推出）", "zh-Hans": "维也纳（即将推出）", en: "Vienna (coming soon)", ko: "비엔나(출시 예정)" },
    },
    {
      id: "salzburg",
      status: "coming_soon",
      name: { "zh-Hant": "薩爾茨堡（即將推出）", "zh-Hans": "萨尔茨堡（即将推出）", en: "Salzburg (coming soon)", ko: "잘츠부르크(출시 예정)" },
    },
    {
      id: "hallstatt",
      status: "coming_soon",
      name: { "zh-Hant": "哈修塔特（即將推出）", "zh-Hans": "哈尔施塔特（即将推出）", en: "Hallstatt (coming soon)", ko: "할슈타트(출시 예정)" },
    },
    {
      id: "budapest",
      status: "coming_soon",
      name: { "zh-Hant": "布達佩斯（即將推出）", "zh-Hans": "布达佩斯（即将推出）", en: "Budapest (coming soon)", ko: "부다페스트(출시 예정)" },
    },
    {
      id: "munich",
      status: "coming_soon",
      name: { "zh-Hant": "慕尼黑（即將推出）", "zh-Hans": "慕尼黑（即将推出）", en: "Munich (coming soon)", ko: "뮌헨(출시 예정)" },
    },
  ];

export const products: Product[] = [
  {
    id: "prague_tour_halfday_4h",
    city: "prague",
    type: "tour",
    durationHours: 4,
    name: {
      "zh-Hant": "布拉格私人導覽（4 小時）",
      "zh-Hans": "布拉格私人导览（4 小时）",
      en: "Prague Private Tour (4 hours)",
      ko: "프라하 프라이빗 투어 (4시간)",
    },
    pricing: { currency: "EUR", kind: "flat", amount: 125 },
    constraints: { maxPax: 4 },
    tags: ["classic", "first_time"],
  },
  {
    id: "prague_tour_fullday_8h",
    city: "prague",
    type: "tour",
    durationHours: 8,
    name: {
      "zh-Hant": "布拉格全日私人導覽（8 小時）",
      "zh-Hans": "布拉格全天私人导览（8 小时）",
      en: "Prague Full-Day Private Tour (8 hours)",
      ko: "프라하 올데이 프라이빗 투어 (8시간)",
    },
    pricing: { currency: "EUR", kind: "flat", amount: 250 },
    constraints: { maxPax: 4 },
    tags: ["full_day", "relaxed"],
  },
  {
    id: "prague_addon_jewish_2h",
    city: "prague",
    type: "addon",
    durationHours: 2,
    name: {
      "zh-Hant": "猶太區加購（2 小時）",
      "zh-Hans": "犹太区加购（2 小时）",
      en: "Jewish Quarter Add-on (2 hours)",
      ko: "유대인 지구 추가(2시간)",
    },
    pricing: { currency: "EUR", kind: "flat", amount: 60 },
    constraints: { maxPax: 4, requires: ["prague_tour_halfday_4h", "prague_tour_fullday_8h"] },
    tags: ["history", "culture"],
  },
  {
    id: "meal_restaurant_3course",
    city: "prague",
    type: "meal",
    name: {
      "zh-Hant": "精選餐廳三道式（含 2 杯飲品）",
      "zh-Hans": "精选餐厅三道式（含 2 杯饮品）",
      en: "Restaurant 3-course (incl. 2 beverages)",
      ko: "레스토랑 3코스(음료 2잔 포함)",
    },
    pricing: { currency: "EUR", kind: "per_pax", amount: 25 },
    constraints: { maxPax: 4 },
    tags: ["food", "romantic"],
  },
  {
    id: "transfer_private",
    city: "prague",
    type: "transfer",
    name: {
      "zh-Hant": "私人接送（城市間）",
      "zh-Hans": "私人接送（城市间）",
      en: "Private transfer (between cities)",
      ko: "프라이빗 이동(도시 간)",
    },
    pricing: {
      currency: "EUR",
      kind: "tiered",
      tiers: [
        { maxPax: 3, amount: 150 },
        { maxPax: 4, amount: 200 },
      ],
    },
    constraints: { maxPax: 4 },
    tags: ["comfort", "logistics"],
  },
];