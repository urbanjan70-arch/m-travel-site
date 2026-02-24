// lib/pricing.ts
import { products, DurationChoice, ProductId, LanguageId } from "@/data/catalog";

export type PlanInput = {
  cityId: "prague"; // MVP
  pax: number; // 1..4
  duration: DurationChoice;
  addJewishQuarter: boolean;
  dinnersCount: number; // 0..days
  includeTransfer: boolean;
};

export type PriceBreakdownLine = {
  label: string;
  amount: number;
};

export type PriceQuote = {
  currency: "EUR";
  subtotal: number;
  estimateLow: number;
  estimateHigh: number;
  lines: PriceBreakdownLine[];
};

const PRICE_LABELS: Record<LanguageId, any> = {
  "zh-Hant": {
    tour4h: "布拉格私人導覽（4小時）",
    tour8h: "布拉格私人導覽（8小時）",
    tour2d: "布拉格私人導覽（2天 × 8小時）",
    tour3d: "布拉格私人導覽（3天 × 8小時）",
    jewish: "猶太區加購（2小時）",
    meal: "餐廳三道式晚餐",
    mealSuffix: (n: number, perPax: number) => `（×${n} 次，€${perPax}/人）`,
    transfer: (pax: number) => `私人接送（${pax} 人）`,
  },
  "zh-Hans": {
    tour4h: "布拉格私人导览（4小时）",
    tour8h: "布拉格私人导览（8小时）",
    tour2d: "布拉格私人导览（2天 × 8小时）",
    tour3d: "布拉格私人导览（3天 × 8小时）",
    jewish: "犹太区加购（2小时）",
    meal: "餐厅三道式晚餐",
    mealSuffix: (n: number, perPax: number) => `（×${n} 次，€${perPax}/人）`,
    transfer: (pax: number) => `私人接送（${pax} 人）`,
  },
  en: {
    tour4h: "Prague private tour (4h)",
    tour8h: "Prague private tour (8h)",
    tour2d: "Prague private tour (2 days × 8h)",
    tour3d: "Prague private tour (3 days × 8h)",
    jewish: "Jewish Quarter add-on (2h)",
    meal: "Restaurant set menu dinner",
    mealSuffix: (n: number, perPax: number) => `(x${n}, €${perPax}/pax)`,
    transfer: (pax: number) => `Private transfer (for ${pax} pax)`,
  },
  ko: {
    tour4h: "프라하 프라이빗 투어 (4시간)",
    tour8h: "프라하 프라이빗 투어 (8시간)",
    tour2d: "프라하 프라이빗 투어 (2일 × 8시간)",
    tour3d: "프라하 프라이빗 투어 (3일 × 8시간)",
    jewish: "유대인 지구 추가 (2시간)",
    meal: "레스토랑 세트 메뉴 저녁",
    mealSuffix: (n: number, perPax: number) => `(x${n}, €${perPax}/인)`,
    transfer: (pax: number) => `프라이빗 이동 (${pax}인)`,
  },
};

function roundTo5(n: number) {
  return Math.round(n / 5) * 5;
}

function getFlatAmount(id: ProductId): number {
  const p = products.find((x) => x.id === id);
  if (!p) throw new Error(`Missing product ${id}`);
  if (p.pricing.kind !== "flat") throw new Error(`Expected flat pricing for ${id}`);
  return p.pricing.amount ?? 0;
}

function getMealPerPax(): number {
  const p = products.find((x) => x.id === "meal_restaurant_3course");
  if (!p || p.pricing.kind !== "per_pax") throw new Error("Missing meal price");
  return p.pricing.amount ?? 0;
}

function getTransferPrice(pax: number): number {
  const p = products.find((x) => x.id === "transfer_private");
  if (!p || p.pricing.kind !== "tiered" || !p.pricing.tiers) throw new Error("Missing transfer tiers");
  const tier = p.pricing.tiers.find((t) => pax <= t.maxPax);
  if (!tier) throw new Error("No transfer tier for pax");
  return tier.amount;
}

export function computeQuote(input: PlanInput, lang: LanguageId): PriceQuote {
  if (input.pax < 1 || input.pax > 4) throw new Error("Pax must be 1..4");

  const L = PRICE_LABELS[lang] ?? PRICE_LABELS["en"];
  const lines: PriceBreakdownLine[] = [];

  // Base tour
  if (input.duration === "half_day") {
    const base = getFlatAmount("prague_tour_halfday_4h");
    lines.push({ label: L.tour4h, amount: base });
  } else if (input.duration === "full_day") {
    const base = getFlatAmount("prague_tour_fullday_8h");
    lines.push({ label: L.tour8h, amount: base });
  } else if (input.duration === "two_days") {
    const base = 2 * getFlatAmount("prague_tour_fullday_8h");
    lines.push({ label: L.tour2d, amount: base });
  } else if (input.duration === "three_days") {
    const base = 3 * getFlatAmount("prague_tour_fullday_8h");
    lines.push({ label: L.tour3d, amount: base });
  }

  // Add-on: Jewish Quarter
  if (input.addJewishQuarter) {
    lines.push({ label: L.jewish, amount: getFlatAmount("prague_addon_jewish_2h") });
  }

  // Meals: dinners count * pax * €25
  const dinners = Math.max(0, Math.floor(input.dinnersCount));
  if (dinners > 0) {
    const perPax = getMealPerPax();
    const mealTotal = dinners * input.pax * perPax;
    lines.push({ label: `${L.meal} ${L.mealSuffix(dinners, perPax)}`, amount: mealTotal });
  }

  // Transfer
  if (input.includeTransfer) {
    const t = getTransferPrice(input.pax);
    lines.push({ label: L.transfer(input.pax), amount: t });
  }

  const subtotalRaw = lines.reduce((s, l) => s + l.amount, 0);

  // Estimate range buffer
  const subtotal = roundTo5(subtotalRaw);
  const low = roundTo5(subtotalRaw * 0.95);
  const high = roundTo5(subtotalRaw * 1.1);

  return {
    currency: "EUR",
    subtotal,
    estimateLow: low,
    estimateHigh: high,
    lines,
  };
}