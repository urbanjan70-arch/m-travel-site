// lib/pricing.ts
import { products, DurationChoice, ProductId } from "@/data/catalog";

export type PlanInput = {
  cityId: "prague"; // MVP
  pax: number; // 1..4
  duration: DurationChoice;
  addJewishQuarter: boolean;
  dinnersCount: number; // 0..N
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

function roundTo5(n: number) {
  return Math.round(n / 5) * 5;
}

function getProductAmount(id: ProductId): number {
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

export function computeQuote(input: PlanInput): PriceQuote {
  if (input.pax < 1 || input.pax > 4) throw new Error("Pax must be 1..4");

  const lines: PriceBreakdownLine[] = [];

  // Base tour logic
  let base = 0;
  if (input.duration === "half_day") {
    base = getProductAmount("prague_tour_halfday_4h");
    lines.push({ label: "Prague private tour (4h)", amount: base });
  } else if (input.duration === "full_day") {
    base = getProductAmount("prague_tour_fullday_8h");
    lines.push({ label: "Prague private tour (8h)", amount: base });
  } else if (input.duration === "two_days") {
    base = 2 * getProductAmount("prague_tour_fullday_8h");
    lines.push({ label: "Prague private tour (2 days x 8h)", amount: base });
  } else if (input.duration === "three_days") {
    base = 3 * getProductAmount("prague_tour_fullday_8h");
    lines.push({ label: "Prague private tour (3 days x 8h)", amount: base });
  }

  // Add-ons
  if (input.addJewishQuarter) {
    const add = getProductAmount("prague_addon_jewish_2h");
    lines.push({ label: "Jewish Quarter add-on (2h)", amount: add });
  }

  // Meals
  const dinners = Math.max(0, Math.floor(input.dinnersCount));
  if (dinners > 0) {
    const perPax = getMealPerPax();
    const mealTotal = dinners * input.pax * perPax;
    lines.push({ label: `Restaurant set menu (x${dinners} dinners, €${perPax}/pax)`, amount: mealTotal });
  }

  // Transfer
  if (input.includeTransfer) {
    const t = getTransferPrice(input.pax);
    lines.push({ label: `Private transfer (up to ${input.pax} pax)`, amount: t });
  }

  const subtotal = lines.reduce((s, l) => s + l.amount, 0);

  // Estimate range buffer (protects edge cases + keeps it “pending confirmation”)
  const low = roundTo5(subtotal * 0.95);
  const high = roundTo5(subtotal * 1.1);

  return {
    currency: "EUR",
    subtotal: roundTo5(subtotal),
    estimateLow: low,
    estimateHigh: high,
    lines,
  };
}