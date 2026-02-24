// lib/itinerary-builder.ts
import { LanguageId, DurationChoice } from "@/data/catalog";
import { PlanInput } from "@/lib/pricing";

export type ItineraryDay = {
  title: string;
  blocks: Array<{ time: string; text: string }>;
  notes?: string[];
};

export type Itinerary = {
  city: string;
  days: ItineraryDay[];
};

const ITIN_COPY: Record<LanguageId, any> = {
  "zh-Hant": {
    city: "布拉格",
    day: (n: number) => `第 ${n} 天（布拉格）`,
    meet: "與導覽員會合／飯店接送（可調整）",
    oldTown: "老城區精華（浪漫拍照節奏）",
    coffee: "咖啡休息／暖室內停留（冬季友善）",
    castle: "布拉格城堡區（景觀＋經典地標）",
    hidden: "私房街景＋慢步調（溫暖、細緻）",
    choose: "依你的偏好：景觀點／博物館／咖啡時光",
    flexible: "彈性安排：購物、藝術、散步或補足景點",
    jewish: "猶太區加購（歷史文化）",
    notes1: "路線與時間可依步調調整。",
    notes2: "我們會保留舒適節奏，也可安排暖身休息。",
    notes3: "最終內容將於真人確認檔期後定案。",
    transferNote: "可安排城市間私人接送（時間將於確認後提供）。",
  },
  "zh-Hans": {
    city: "布拉格",
    day: (n: number) => `第 ${n} 天（布拉格）`,
    meet: "与导览员会合／饭店接送（可调整）",
    oldTown: "老城区精华（浪漫拍照节奏）",
    coffee: "咖啡休息／室内暖身（冬季友善）",
    castle: "布拉格城堡区（景观＋经典地标）",
    hidden: "私房街景＋慢节奏（温暖、细致）",
    choose: "按偏好：观景点／博物馆／咖啡时光",
    flexible: "弹性安排：购物、艺术、散步或补足景点",
    jewish: "犹太区加购（历史文化）",
    notes1: "路线与时间可依步调调整。",
    notes2: "我们会保留舒适节奏，也可安排休息。",
    notes3: "最终内容将于真人确认档期后定案。",
    transferNote: "可安排城市间私人接送（时间将于确认后提供）。",
  },
  en: {
    city: "Prague",
    day: (n: number) => `Day ${n} (Prague)`,
    meet: "Meet your guide / hotel pickup (flexible)",
    oldTown: "Old Town highlights (romantic photo-friendly pace)",
    coffee: "Coffee break / warm indoor stop (winter-friendly)",
    castle: "Prague Castle area (views + iconic spots)",
    hidden: "Hidden corners + charming streets (boutique pace)",
    choose: "Your choice: viewpoints, museums, or café time",
    flexible: "Flexible day: shopping, art, parks, or extra highlights",
    jewish: "Jewish Quarter add-on (history & culture)",
    notes1: "Route and timing can be adjusted to your pace.",
    notes2: "We keep the day comfortable with warm breaks if needed.",
    notes3: "Final details confirmed after availability check.",
    transferNote: "Private transfer can be scheduled between cities (timing confirmed after request).",
  },
  ko: {
    city: "프라하",
    day: (n: number) => `${n}일차 (프라하)`,
    meet: "가이드 미팅 / 호텔 픽업(조정 가능)",
    oldTown: "구시가지 하이라이트(로맨틱 사진 템포)",
    coffee: "커피 휴식 / 실내 워밍업(겨울 친화)",
    castle: "프라하 성 주변(뷰 + 대표 명소)",
    hidden: "숨은 골목 + 감성적인 거리(부티크 템포)",
    choose: "선호에 따라: 전망대/박물관/카페 타임",
    flexible: "유연한 일정: 쇼핑, 예술, 산책 또는 추가 명소",
    jewish: "유대인 지구 추가(역사/문화)",
    notes1: "동선과 시간은 페이스에 맞게 조정 가능합니다.",
    notes2: "무리하지 않고 따뜻한 휴식 포함 가능.",
    notes3: "최종 내용은 가능 여부 확인 후 확정됩니다.",
    transferNote: "도시 간 프라이빗 이동 가능(시간은 확인 후 안내).",
  },
};

export function buildItinerary(input: PlanInput, lang: LanguageId): Itinerary {
  const C = ITIN_COPY[lang] ?? ITIN_COPY.en;

  const daysCount =
    input.duration === "half_day"
      ? 1
      : input.duration === "full_day"
        ? 1
        : input.duration === "two_days"
          ? 2
          : 3;

  const days: ItineraryDay[] = [];

  // Day 1 base
  const day1: ItineraryDay = {
    title: C.day(1),
    blocks: [
      { time: "09:30", text: C.meet },
      { time: "10:00", text: C.oldTown },
      { time: "12:00", text: C.coffee },
      { time: "13:00", text: C.castle },
    ],
    notes: [C.notes1],
  };

  // Half-day version
  if (input.duration === "half_day") {
    day1.blocks = [
      { time: "09:30", text: C.meet },
      { time: "10:00", text: C.oldTown },
      { time: "11:30", text: C.castle },
    ];
  }

  if (input.addJewishQuarter) {
    day1.blocks.push({ time: "+2h", text: C.jewish });
  }

  days.push(day1);

  if (daysCount >= 2) {
    days.push({
      title: C.day(2),
      blocks: [
        { time: "10:00", text: C.hidden },
        { time: "12:00", text: lang.startsWith("zh") ? "可加訂午餐／咖啡" : lang === "ko" ? "점심/카페 예약(선택)" : "Optional lunch/café reservation" },
        { time: "14:00", text: C.choose },
      ],
      notes: [C.notes2],
    });
  }

  if (daysCount >= 3) {
    days.push({
      title: C.day(3),
      blocks: [
        { time: "10:00", text: C.flexible },
        { time: "12:30", text: lang.startsWith("zh") ? "可安排精選餐廳（三道式）" : lang === "ko" ? "레스토랑 코스(선택)" : "Optional restaurant set menu" },
        { time: "15:00", text: lang.startsWith("zh") ? "輕鬆收尾，不趕行程" : lang === "ko" ? "무리하지 않고 여유롭게 마무리" : "Easy finish — no rush" },
      ],
      notes: [C.notes3],
    });
  }

  if (input.includeTransfer) {
    const last = days[days.length - 1];
    last.notes = last.notes ?? [];
    last.notes.push(C.transferNote);
  }

  return { city: C.city, days };
}