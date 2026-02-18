"use client";

import React, { useMemo, useState } from "react";

export default function Page() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const agency = useMemo(
    () => ({
      name: "M Travel",
      cnName: "嘉泰",
      taglineZh: "布拉格精品私人旅行服務｜溫暖、細緻、輕奢不浮誇。",
      taglineEn: "Friendly boutique travel in Prague — with a touch of luxury.",
    }),
    []
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("已送出（示範版）。下一步我們會把表單連到你的 Email/CRM。");
  }

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        background: "#f8fafc",
        color: "#0f172a",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "18px 22px",
          borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
          background: "rgba(255,255,255,0.9)",
          position: "sticky",
          top: 0,
          backdropFilter: "blur(10px)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" }}>
              {agency.name}
            </span>
            <span style={{ color: "#64748b", fontSize: 14 }}>{agency.cnName}</span>
          </div>

          <nav style={{ display: "flex", gap: 16, fontSize: 13 }}>
            <a href="#services" style={{ color: "#475569", textDecoration: "none" }}>
              服務 / Services
            </a>
            <a href="#team" style={{ color: "#475569", textDecoration: "none" }}>
              團隊 / Team
            </a>
            <a href="#contact" style={{ color: "#475569", textDecoration: "none" }}>
              聯絡 / Contact
            </a>
          </nav>
        </div>
      </header>

      {/* HERO (animated background via globals.css classes) */}
      <section style={{ padding: "42px 18px 8px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="hero">
            <div className="hero-content" style={{ padding: "74px 26px", textAlign: "center" }}>
              <div
                style={{
                  display: "inline-flex",
                  gap: 8,
                  flexWrap: "wrap",
                  justifyContent: "center",
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.18)",
                    fontSize: 12,
                  }}
                >
                  私人行程
                </span>
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.18)",
                    fontSize: 12,
                  }}
                >
                  精品 / 輕奢
                </span>
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.18)",
                    fontSize: 12,
                  }}
                >
                  布拉格在地團隊
                </span>
              </div>

              <h1
                style={{
                  fontSize: 44,
                  lineHeight: 1.08,
                  margin: "8px 0 12px",
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                布拉格，為你精心安排 — 輕奢的細緻感
              </h1>

              <p style={{ fontSize: 18, marginBottom: 10, color: "rgba(255,255,255,0.92)" }}>
                {agency.taglineZh}
              </p>

              <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 22 }}>
                {agency.taglineEn}
              </p>

              <a
                href="#contact"
                style={{
                  display: "inline-block",
                  padding: "12px 22px",
                  background: "rgba(255,255,255,0.95)",
                  color: "#111",
                  borderRadius: 999,
                  textDecoration: "none",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                立即詢價 / Request a quote
              </a>

              <p style={{ marginTop: 14, fontSize: 12, color: "rgba(255,255,255,0.75)" }}>
                官網直訂最划算 — 更彈性、加購選項更多。<br />
                <span style={{ fontSize: 11 }}>
                  Best value when booking direct — more flexibility and custom add-ons.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: "44px 18px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, letterSpacing: "-0.02em", marginBottom: 10 }}>
            服務 / Services
          </h2>
          <p style={{ color: "#64748b", marginTop: 0, marginBottom: 22, lineHeight: 1.6 }}>
            你可以選擇經典路線，也可以讓我們做多日客製：交通接送、餐廳安排、細節控管一次到位。
            <br />
            <span style={{ fontSize: 13 }}>
              Choose a classic tour, or let us build a multi-day plan with transfers, meals, and smooth logistics.
            </span>
          </p>

          <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            <ServiceCard
              title="布拉格導覽｜Prague Tours"
              items={[
                "老城＋布拉格城堡（半日）",
                "加購：猶太區（延伸路線）",
                "一日全程陪同（彈性安排）",
                "2–3 日方案（含餐廳/用餐安排）",
              ]}
            />
            <ServiceCard
              title="其他城市導覽｜Other Cities"
              items={[
                "一日或多城市行程",
                "私人成團導覽",
                "飯店/時間協調",
                "舒適節奏、適合拍照",
              ]}
            />
            <ServiceCard
              title="城市接送＋餐廳安排｜Transfers + Stops"
              items={[
                "城市間私人接送",
                "精選餐廳停靠/餐食",
                "門到門行李協助",
                "家庭與小團最合適",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" style={{ padding: "44px 18px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, letterSpacing: "-0.02em", marginBottom: 10 }}>
            認識我們 / Meet the team
          </h2>
          <p style={{ color: "#64748b", marginTop: 0, marginBottom: 22, lineHeight: 1.6 }}>
            真實的團隊、真實的服務。我們用多種語言帶團，並依你的風格與節奏調整路線。
            <br />
            <span style={{ fontSize: 13 }}>
              Real people, real service. We guide in multiple languages and tailor the experience to your style.
            </span>
          </p>

          <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <PersonCard
              name="Jan Urban"
              role="帶團領隊｜Tour leader"
              langs="Czech, Chinese, English, German"
              bio="在地導覽與行程控管，重視節奏與體驗細節，讓旅程順暢、安心。"
            />
            <PersonCard
              name="Alice Chen (陳艾麗絲)"
              role="帶團領隊＆創辦人｜Tour leader & Owner"
              langs="Chinese, English, Taiwanese, Cantonese"
              bio="用溫暖的精品服務與輕奢質感，帶你以最舒服的方式認識布拉格與周邊城市。"
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "44px 18px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, letterSpacing: "-0.02em", marginBottom: 10 }}>
            聯絡我們 / Contact
          </h2>
          <p style={{ color: "#64748b", marginTop: 0, marginBottom: 22, lineHeight: 1.6 }}>
            告訴我們你的日期與興趣，我們會推薦最適合的路線並協助確認檔期。
            <br />
            <span style={{ fontSize: 13 }}>(Email/domain setup can come next.)</span>
          </p>

          <div
            style={{
              display: "grid",
              gap: 14,
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              alignItems: "start",
            }}
          >
            <div style={{ background: "#fff", borderRadius: 18, border: "1px solid rgba(15, 23, 42, 0.08)", padding: 18 }}>
              <h3 style={{ marginTop: 0, marginBottom: 6 }}>立即詢價 / Request a quote</h3>
              <p style={{ marginTop: 0, marginBottom: 14, color: "#64748b", fontSize: 13 }}>
                通常 24 小時內回覆。
              </p>

              <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
                <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
                  <input
                    placeholder="姓名 / Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    style={inputStyle}
                  />
                  <input
                    type="email"
                    placeholder="Email / 電子郵件"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    style={inputStyle}
                  />
                </div>

                <input
                  placeholder="電話 / WhatsApp（選填）"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  style={inputStyle}
                />

                <textarea
                  rows={5}
                  placeholder="日期、人數、語言、興趣（例：老城＋城堡＋午餐）"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  style={{ ...inputStyle, paddingTop: 10 }}
                />

                <button
                  type="submit"
                  style={{
                    padding: "12px 14px",
                    background: "#0f172a",
                    color: "#fff",
                    borderRadius: 999,
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  送出詢問 / Send inquiry
                </button>
              </form>
            </div>

            <div style={{ borderRadius: 18, border: "1px solid rgba(15, 23, 42, 0.08)", background: "rgba(255,255,255,0.7)", padding: 18 }}>
              <h3 style={{ marginTop: 0, marginBottom: 6 }}>建議提供資訊 / What to include</h3>
              <p style={{ marginTop: 0, marginBottom: 12, color: "#64748b", fontSize: 13 }}>
                方便我們回覆更精準的行程建議。
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, color: "#334155", lineHeight: 1.8 }}>
                <li>布拉格日期（如有其他城市也請註明）</li>
                <li>人數與年齡（若有小孩）</li>
                <li>偏好語言</li>
                <li>興趣（歷史、建築、美食、拍照）</li>
                <li>舒適需求（步調、休息、是否需要車輛支援）</li>
              </ul>

              <div style={{ marginTop: 14, borderRadius: 16, border: "1px solid rgba(15, 23, 42, 0.08)", background: "#fff", padding: 14 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 13 }}>
                  OTA 平台連結（選填） <span style={{ fontWeight: 500, color: "#64748b" }}>/ OTA links</span>
                </p>
                <p style={{ marginTop: 8, marginBottom: 0, color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>
                  之後你提供 GetYourGuide / Viator 連結，我們會把官方按鈕放在這裡。<br />
                  目前先用最精簡的版本，把品牌可信度建立起來。
                </p>
              </div>
            </div>
          </div>

          <footer style={{ padding: "28px 2px 10px", textAlign: "center", fontSize: 13, color: "#64748b" }}>
            © {new Date().getFullYear()} {agency.name} {agency.cnName} — Prague Boutique Travel
          </footer>
        </div>
      </section>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 14,
  border: "1px solid rgba(15, 23, 42, 0.12)",
  background: "#fff",
  outline: "none",
  fontSize: 14,
};

function ServiceCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        border: "1px solid rgba(15, 23, 42, 0.08)",
        padding: 18,
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: 10, letterSpacing: "-0.01em" }}>{title}</h3>
      <ul style={{ margin: 0, paddingLeft: 18, color: "#334155", lineHeight: 1.8 }}>
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

function PersonCard({
  name,
  role,
  langs,
  bio,
}: {
  name: string;
  role: string;
  langs: string;
  bio: string;
}) {
  return (
    <div
      style={{
        background: "#f8fafc",
        borderRadius: 18,
        border: "1px solid rgba(15, 23, 42, 0.08)",
        padding: 18,
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: 6 }}>{name}</h3>
      <p style={{ marginTop: 0, marginBottom: 10, color: "#64748b", fontSize: 13 }}>
        {role}
      </p>
      <p style={{ marginTop: 0, marginBottom: 10, color: "#334155", fontSize: 13 }}>
        <strong>Languages:</strong> {langs}
      </p>
      <p style={{ margin: 0, color: "#334155", lineHeight: 1.7 }}>{bio}</p>
    </div>
  );
}
