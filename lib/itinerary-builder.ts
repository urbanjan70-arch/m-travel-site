// lib/itinerary-builder.ts
import { DurationChoice } from "@/data/catalog";
import { PlanInput } from "@/lib/pricing";

export type ItineraryDay = {
  title: string;
  blocks: Array<{ time: string; text: string }>;
  notes?: string[];
};

export type Itinerary = {
  city: "Prague";
  days: ItineraryDay[];
};

export function buildItinerary(input: PlanInput): Itinerary {
  const daysCount =
    input.duration === "half_day" ? 1 :
    input.duration === "full_day" ? 1 :
    input.duration === "two_days" ? 2 :
    3;

  const days: ItineraryDay[] = [];

  const day1: ItineraryDay = {
    title: daysCount === 1 ? "Day 1 (Prague)" : "Day 1 (Prague)",
    blocks: [
      { time: "09:30", text: "Meet your guide / hotel pickup (flexible)" },
      { time: "10:00", text: "Old Town highlights (photo-friendly pace)" },
      { time: "12:00", text: "Coffee break / warm indoor stop (winter-friendly)" },
      { time: "13:00", text: "Prague Castle area (views + iconic spots)" },
    ],
    notes: ["Route and timing can be adjusted to your pace."],
  };

  if (input.duration === "half_day") {
    day1.blocks = [
      { time: "09:30", text: "Meet your guide / start point" },
      { time: "10:00", text: "Old Town + Charles Bridge (romantic photo stops)" },
      { time: "11:30", text: "Castle viewpoints (depending on pace)" },
    ];
  }

  if (input.addJewishQuarter) {
    day1.blocks.push({ time: "＋2h", text: "Jewish Quarter add-on (history & culture)" });
  }

  days.push(day1);

  if (daysCount >= 2) {
    days.push({
      title: "Day 2 (Prague)",
      blocks: [
        { time: "10:00", text: "Hidden corners + charming streets (romantic boutique style)" },
        { time: "12:00", text: "Optional lunch reservation" },
        { time: "14:00", text: "Your choice: views, museums, or relaxed café time" },
      ],
      notes: ["We keep the day comfortable, with warm breaks if needed."],
    });
  }

  if (daysCount >= 3) {
    days.push({
      title: "Day 3 (Prague)",
      blocks: [
        { time: "10:00", text: "Flexible day: shopping, art, parks, or extra highlights" },
        { time: "12:30", text: "Optional restaurant arrangement" },
        { time: "15:00", text: "Easy finish — no rush" },
      ],
      notes: ["We’ll finalize exact content after confirming availability."],
    });
  }

  if (input.includeTransfer) {
    // Add a transfer note to the last day
    const last = days[days.length - 1];
    last.notes = last.notes ?? [];
    last.notes.push("Private transfer can be scheduled between cities (timing confirmed after booking request).");
  }

  return { city: "Prague", days };
}