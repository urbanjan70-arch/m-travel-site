"use client";

import React, { useMemo, useState } from "react";
import { cities, LanguageId, DurationChoice } from "@/data/catalog";
import { buildItinerary } from "@/lib/itinerary-builder";
import { computeQuote, PlanInput } from "@/lib/pricing";

type Interests = {
  history: boolean;
  architecture: boolean;
  romantic: boolean;
  food: boolean;
  relaxed: boolean;
};

const UI: Record<LanguageId, any> = {
  "zh-Hant": {
    title: "行程規劃｜你的線上旅行顧問",
    subtitle: "快速回答幾個問題，我們會用嘉泰 M Travel 的服務目錄生成行程草案與費用估算。",
    step: "步驟",
    next: "下一步",
    back: "上一步",
    city: "城市",
    pax: "人數（1–4）",
    duration: "行程天數 / 時長",
    interests: "偏好",
    addons: "加購與服務",
    summary: "行程草案與估算",
    request: "送出確認需求（由真人確認）",
    estimate: "預估總價",
    pending: "（最終價格需確認檔期與細節）",
    breakdown: "明細",
    subtotal: "小計",
    humanTitle: "真人確認，避免不合理安排",
    humanText: "系統依內部服務目錄生成草案；最終行程與價格將由真人確認，以確保安排順暢。",
    jewish: "猶太區加購（+€60 / 2小時）",
    transfer: "私人接送（依人數估價）",
    dinners: "餐廳三道式晚餐（€25/人）次數",
    interestsLabels: {
      history: "歷史",
      architecture: "建築",
      romantic: "浪漫氛圍",
      food: "美食與餐廳",
      relaxed: "輕鬆步調",
    },
    durationLabels: {
      half_day: "半日（4小時）",
      full_day: "一日（8小時）",
      two_days: "2 天（2 × 8小時）",
      three_days: "3 天（3 × 8小時）",
    },
    toastSubmitted: "已送出（示範版）。下一步：帳號＋儲存偏好＋Email通知。",
    pragueMvp: "EUR 估價 • 布拉格 MVP",
    dinnersHint: (max: number) => `0 – ${max}（依行程天數）`,
  },
  "zh-Hans": {
    title: "行程规划｜你的线上旅行顾问",
    subtitle: "快速回答几个问题，我们会用嘉泰 M Travel 的服务目录生成行程草案与费用估算。",
    step: "步骤",
    next: "下一步",
    back: "上一步",
    city: "城市",
    pax: "人数（1–4）",
    duration: "行程天数 / 时长",
    interests: "偏好",
    addons: "加购与服务",
    summary: "行程草案与估算",
    request: "提交确认需求（由真人确认）",
    estimate: "预估总价",
    pending: "（最终价格需确认档期与细节）",
    breakdown: "明细",
    subtotal: "小计",
    humanTitle: "真人确认，避免不合理安排",
    humanText: "系统依内部服务目录生成草案；最终行程与价格将由真人确认，以确保安排顺畅。",
    jewish: "犹太区加购（+€60 / 2小时）",
    transfer: "私人接送（按人数估价）",
    dinners: "餐厅三道式晚餐（€25/人）次数",
    interestsLabels: {
      history: "历史",
      architecture: "建筑",
      romantic: "浪漫氛围",
      food: "美食与餐厅",
      relaxed: "轻松节奏",
    },
    durationLabels: {
      half_day: "半日（4小时）",
      full_day: "一日（8小时）",
      two_days: "2 天（2 × 8小时）",
      three_days: "3 天（3 × 8小时）",
    },
    toastSubmitted: "已提交（示范版）。下一步：账号＋保存偏好＋Email通知。",
    pragueMvp: "EUR 估价 • 布拉格 MVP",
    dinnersHint: (max: number) => `0 – ${max}（按行程天数）`,
  },
  en: {
    title: "Plan your trip — your online travel advisor",
    subtitle: "Answer a few questions. We generate a draft itinerary and EUR estimate from M Travel’s internal catalog.",
    step: "Step",
    next: "Next",
    back: "Back",
    city: "City",
    pax: "Group size (1–4)",
    duration: "Trip length",
    interests: "Preferences",
    addons: "Add-ons",
    summary: "Draft itinerary & estimate",
    request: "Request confirmation (human checked)",
    estimate: "Estimated total",
    pending: "(final price confirmed after availability check)",
    breakdown: "Breakdown",
    subtotal: "Subtotal",
    humanTitle: "Human-checked booking",
    humanText: "The advisor generates a draft from our internal catalog. Final itinerary and pricing are confirmed by a real human to ensure smooth logistics.",
    jewish: "Jewish Quarter add-on (+€60 / 2h)",
    transfer: "Private transfer (priced by pax)",
    dinners: "Restaurant set menu dinners (€25/pax) count",
    interestsLabels: {
      history: "History",
      architecture: "Architecture",
      romantic: "Romantic atmosphere",
      food: "Food & restaurants",
      relaxed: "Relaxed pace",
    },
    durationLabels: {
      half_day: "Half-day (4h)",
      full_day: "Full day (8h)",
      two_days: "2 days (2 × 8h)",
      three_days: "3 days (3 × 8h)",
    },
    toastSubmitted: "Submitted (demo). Next: accounts + saved preferences + email notifications.",
    pragueMvp: "EUR estimate • Prague MVP",
    dinnersHint: (max: number) => `0 – ${max} (based on trip length)`,
  },
  ko: {
    title: "여행 플래너 — 온라인 여행 어드바이저",
    subtitle: "몇 가지 질문에 답하면 내부 카탈로그 기반 일정 초안과 EUR 견적을 제공합니다.",
    step: "단계",
    next: "다음",
    back: "이전",
    city: "도시",
    pax: "인원(1–4)",
    duration: "여행 기간",
    interests: "선호",
    addons: "추가 옵션",
    summary: "일정 초안 & 견적",
    request: "확인 요청(사람이 검토)",
    estimate: "예상 총액",
    pending: "(최종 금액은 가능 여부 확인 후 확정)",
    breakdown: "내역",
    subtotal: "소계",
    humanTitle: "사람이 확인하는 예약",
    humanText: "내부 카탈로그 기반 초안이며, 최종 일정과 가격은 원활한 진행을 위해 사람이 확인합니다.",
    jewish: "유대인 지구 추가(+€60 / 2시간)",
    transfer: "프라이빗 이동(인원별 가격)",
    dinners: "레스토랑 3코스 저녁(€25/인) 횟수",
    interestsLabels: {
      history: "역사",
      architecture: "건축",
      romantic: "로맨틱 분위기",
      food: "음식 & 레스토랑",
      relaxed: "여유로운 속도",
    },
    durationLabels: {
      half_day: "반일(4시간)",
      full_day: "하루(8시간)",
      two_days: "2일(2 × 8시간)",
      three_days: "3일(3 × 8시간)",
    },
    toastSubmitted: "제출 완료(데모). 다음: 계정 + 선호 저장 + 이메일 알림.",
    pragueMvp: "EUR 견적 • 프라하 MVP",
    dinnersHint: (max: number) => `0 – ${max} (일정 기준)`,
  },
};

function moneyEUR(n: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function PlanPage() {
  const [lang, setLang] = useState<LanguageId>("zh-Hant");
  const t = UI[lang];

  const [step, setStep] = useState(1);

  const [cityId, setCityId] = useState<"prague">("prague");
  const [pax, setPax] = useState(2);
  const [duration, setDuration] = useState<DurationChoice>("full_day");

  const [interests, setInterests] = useState<Interests>({
    history: true,
    architecture: true,
    romantic: true,
    food: false,
    relaxed: true,
  });

  const [addJewishQuarter, setAddJewishQuarter] = useState(false);
  const [includeTransfer, setIncludeTransfer] = useState(false);
  const [dinnersCount, setDinnersCount] = useState(1);

  const daysCount = useMemo(() => {
    if (duration === "half_day" || duration === "full_day") return 1;
    if (duration === "two_days") return 2;
    return 3;
  }, [duration]);

  const maxDinners = daysCount;

  const input: PlanInput = useMemo(
    () => ({
      cityId,
      pax,
      duration,
      addJewishQuarter,
      includeTransfer,
      dinnersCount: Math.max(0, Math.min(dinnersCount, maxDinners)),
    }),
    [cityId, pax, duration, addJewishQuarter, includeTransfer, dinnersCount, maxDinners]
  );

  const quote = useMemo(() => computeQuote(input, lang), [input, lang]);
  const itinerary = useMemo(() => buildItinerary(input, lang), [input, lang]);

  const canNext = useMemo(() => {
    if (step === 1) return pax >= 1 && pax <= 4;
    return true;
  }, [step, pax]);

  function next() {
    if (!canNext) return;
    setStep((s) => Math.min(5, s + 1));
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  function submitRequest() {
    const payload = {
      lang,
      cityId,
      pax,
      duration,
      interests,
      addJewishQuarter,
      includeTransfer,
      dinnersCount: Math.max(0, Math.min(dinnersCount, maxDinners)),
      quote,
      itinerary,
      createdAt: new Date().toISOString(),
    };

    console.log("Trip request payload:", payload);
    alert(t.toastSubmitted);
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 18px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, letterSpacing: "-0.02em" }}>{t.title}</h1>
          <p style={{ marginTop: 8, color: "#64748b", lineHeight: 1.6 }}>{t.subtitle}</p>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <select value={lang} onChange={(e) => setLang(e.target.value as LanguageId)} style={selectStyle}>
            <option value="zh-Hant">繁體中文</option>
            <option value="zh-Hans">简体中文</option>
            <option value="en">English</option>
            <option value="ko">한국어</option>
          </select>
        </div>
      </header>

      <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 14 }}>
        {/* LEFT: steps */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div style={{ fontWeight: 800 }}>
              {t.step} {step} / 5
            </div>
            <div style={{ color: "#64748b", fontSize: 13 }}>{t.pragueMvp}</div>
          </div>

          <div style={{ marginTop: 14 }}>
            {step === 1 && (
              <div style={{ display: "grid", gap: 12 }}>
                <Field label={t.city}>
                  <select value={cityId} onChange={(e) => setCityId(e.target.value as "prague")} style={selectStyle}>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id} disabled={c.status !== "available"}>
                        {c.name[lang]}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label={t.pax}>
                  <input
                    type="number"
                    min={1}
                    max={4}
                    value={pax}
                    onChange={(e) => setPax(Number(e.target.value))}
                    style={inputStyle}
                  />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: "grid", gap: 12 }}>
                <Field label={t.duration}>
                  <div style={{ display: "grid", gap: 10 }}>
                    <Radio
                      name="duration"
                      checked={duration === "half_day"}
                      onChange={() => setDuration("half_day")}
                      label={t.durationLabels.half_day}
                    />
                    <Radio
                      name="duration"
                      checked={duration === "full_day"}
                      onChange={() => setDuration("full_day")}
                      label={t.durationLabels.full_day}
                    />
                    <Radio
                      name="duration"
                      checked={duration === "two_days"}
                      onChange={() => setDuration("two_days")}
                      label={t.durationLabels.two_days}
                    />
                    <Radio
                      name="duration"
                      checked={duration === "three_days"}
                      onChange={() => setDuration("three_days")}
                      label={t.durationLabels.three_days}
                    />
                  </div>
                </Field>
              </div>
            )}

            {step === 3 && (
              <div style={{ display: "grid", gap: 12 }}>
                <Field label={t.interests}>
                  <div style={{ display: "grid", gap: 8 }}>
                    <Check
                      checked={interests.history}
                      onChange={(v) => setInterests((s) => ({ ...s, history: v }))}
                      label={t.interestsLabels.history}
                    />
                    <Check
                      checked={interests.architecture}
                      onChange={(v) => setInterests((s) => ({ ...s, architecture: v }))}
                      label={t.interestsLabels.architecture}
                    />
                    <Check
                      checked={interests.romantic}
                      onChange={(v) => setInterests((s) => ({ ...s, romantic: v }))}
                      label={t.interestsLabels.romantic}
                    />
                    <Check
                      checked={interests.food}
                      onChange={(v) => setInterests((s) => ({ ...s, food: v }))}
                      label={t.interestsLabels.food}
                    />
                    <Check
                      checked={interests.relaxed}
                      onChange={(v) => setInterests((s) => ({ ...s, relaxed: v }))}
                      label={t.interestsLabels.relaxed}
                    />
                  </div>
                </Field>
              </div>
            )}

            {step === 4 && (
              <div style={{ display: "grid", gap: 12 }}>
                <Field label={t.addons}>
                  <div style={{ display: "grid", gap: 10 }}>
                    <Check checked={addJewishQuarter} onChange={setAddJewishQuarter} label={t.jewish} />
                    <Check checked={includeTransfer} onChange={setIncludeTransfer} label={t.transfer} />

                    <div style={{ marginTop: 8, paddingTop: 10, borderTop: "1px solid rgba(15,23,42,0.08)" }}>
                      <div style={{ fontWeight: 800, marginBottom: 6 }}>{t.dinners}</div>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <input
                          type="range"
                          min={0}
                          max={maxDinners}
                          step={1}
                          value={Math.max(0, Math.min(dinnersCount, maxDinners))}
                          onChange={(e) => setDinnersCount(Number(e.target.value))}
                          style={{ width: "100%" }}
                        />
                        <div style={{ width: 44, textAlign: "right", fontWeight: 900 }}>
                          {Math.max(0, Math.min(dinnersCount, maxDinners))}
                        </div>
                      </div>
                      <div style={{ color: "#64748b", fontSize: 13, marginTop: 6 }}>
                        {t.dinnersHint(maxDinners)}
                      </div>
                    </div>
                  </div>
                </Field>
              </div>
            )}

            {step === 5 && (
              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ fontWeight: 900, fontSize: 16 }}>{t.summary}</div>

                <div style={{ display: "grid", gap: 10 }}>
                  {itinerary.days.map((d, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: 12,
                        borderRadius: 14,
                        background: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(15,23,42,0.08)",
                      }}
                    >
                      <div style={{ fontWeight: 900 }}>{d.title}</div>

                      <div style={{ marginTop: 8, display: "grid", gap: 6, color: "#334155" }}>
                        {d.blocks.map((b, i) => (
                          <div key={i}>
                            <span style={{ fontWeight: 800, marginRight: 8 }}>{b.time}</span>
                            <span>{b.text}</span>
                          </div>
                        ))}
                      </div>

                      {d.notes?.length ? (
                        <ul style={{ marginTop: 10, marginBottom: 0, paddingLeft: 18, color: "#64748b", lineHeight: 1.6 }}>
                          {d.notes.map((n, i) => (
                            <li key={i}>{n}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>

                <button onClick={submitRequest} style={primaryBtn}>
                  {t.request}
                </button>
              </div>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18, gap: 10 }}>
            <button onClick={back} disabled={step === 1} style={{ ...secondaryBtn, opacity: step === 1 ? 0.5 : 1 }}>
              {t.back}
            </button>
            <button onClick={next} disabled={!canNext || step === 5} style={{ ...primaryBtn, opacity: !canNext || step === 5 ? 0.6 : 1 }}>
              {t.next}
            </button>
          </div>
        </div>

        {/* RIGHT: quote */}
        <div style={cardStyle}>
          <div style={{ fontWeight: 900, fontSize: 16 }}>{t.estimate}</div>
          <div style={{ marginTop: 10, fontSize: 28, fontWeight: 950, letterSpacing: "-0.02em" }}>
            {moneyEUR(quote.estimateLow)} – {moneyEUR(quote.estimateHigh)}
          </div>
          <div style={{ color: "#64748b", marginTop: 6, lineHeight: 1.5 }}>{t.pending}</div>

          <div style={{ marginTop: 16, borderTop: "1px solid rgba(15,23,42,0.08)", paddingTop: 12 }}>
            <div style={{ fontWeight: 900, marginBottom: 8 }}>{t.breakdown}</div>

            <div style={{ display: "grid", gap: 8 }}>
              {quote.lines.map((l, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", gap: 10, color: "#334155" }}>
                  <span style={{ fontSize: 13 }}>{l.label}</span>
                  <span style={{ fontWeight: 900 }}>{moneyEUR(l.amount)}</span>
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 10,
                  marginTop: 6,
                  paddingTop: 10,
                  borderTop: "1px dashed rgba(15,23,42,0.18)",
                }}
              >
                <span style={{ fontWeight: 950 }}>{t.subtotal}</span>
                <span style={{ fontWeight: 950 }}>{moneyEUR(quote.subtotal)}</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 16, borderTop: "1px solid rgba(15,23,42,0.08)", paddingTop: 12, color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>
            <div style={{ fontWeight: 900, color: "#334155", marginBottom: 6 }}>{t.humanTitle}</div>
            {t.humanText}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontWeight: 900, marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );
}

function Radio({ name, checked, onChange, label }: any) {
  return (
    <label style={{ display: "flex", gap: 10, alignItems: "center", cursor: "pointer" }}>
      <input type="radio" name={name} checked={checked} onChange={onChange} />
      <span style={{ color: "#334155" }}>{label}</span>
    </label>
  );
}

function Check({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label style={{ display: "flex", gap: 10, alignItems: "center", cursor: "pointer" }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span style={{ color: "#334155" }}>{label}</span>
    </label>
  );
}

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.85)",
  border: "1px solid rgba(15,23,42,0.08)",
  borderRadius: 18,
  padding: 16,
  backdropFilter: "blur(10px)",
};

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 14,
  border: "1px solid rgba(15,23,42,0.12)",
  background: "#fff",
  fontSize: 14,
  width: "100%",
};

const selectStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 14,
  border: "1px solid rgba(15,23,42,0.12)",
  background: "#fff",
  fontSize: 14,
};

const primaryBtn: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 999,
  border: "none",
  cursor: "pointer",
  background: "#0f172a",
  color: "#fff",
  fontWeight: 900,
};

const secondaryBtn: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 999,
  border: "1px solid rgba(15,23,42,0.18)",
  cursor: "pointer",
  background: "transparent",
  color: "#0f172a",
  fontWeight: 900,
};