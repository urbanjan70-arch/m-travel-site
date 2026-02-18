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
    alert("已送出（示範版）。下一步我們會把表單連到你的 Email。");
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
          background: "rgba(255,255,255,0.95)",
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
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: 700 }}>
            {agency.name} <span style={{ color: "#64748b" }}>{agency.cnName}</span>
          </div>

          <nav style={{ display: "flex", gap: 16, fontSize: 13 }}>
            <a href="#services">服務</a>
            <a href="#team">團隊</a>
            <a href="#contact">聯絡</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section style={{ padding: "40px 18px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            className="hero"
            style={{
              minHeight: 560,
              backgroundImage: `url("/images/hero-prague.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 24,
              position: "relative",
            }}
          >
            <div
              className="hero-content"
              style={{
                padding: "90px 24px",
                textAlign: "center",
                color: "white",
              }}
            >
              <h1
                style={{
                  fontSize: 44,
                  marginBottom: 16,
                  letterSpacing: "-0.02em",
                }}
              >
                布拉格，為你精心安排 — 輕奢的細緻感
              </h1>

              <p style={{ fontSize: 18, marginBottom: 8 }}>
                {agency.taglineZh}
              </p>

              <p style={{ opacity: 0.9, marginBottom: 28 }}>
                {agency.taglineEn}
              </p>

              <a
                href="#contact"
                style={{
                  display: "inline-block",
                  padding: "14px 28px",
                  background: "white",
                  color: "#111",
                  borderRadius: 999,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                立即詢價 / Request a quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "60px 18px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, marginBottom: 20 }}>
            服務 / Services
          </h2>

          <div
            style={{
              display: "grid",
              gap: 20,
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            }}
          >
            <Card title="布拉格導覽">
              老城＋布拉格城堡<br />
              猶太區加購<br />
              一日陪同<br />
              2–3 日行程
            </Card>

            <Card title="其他城市">
              CK 小鎮<br />
              卡羅維瓦利<br />
              多日歐洲延伸
            </Card>

            <Card title="城市接送">
              城市間私人接送<br />
              精選餐廳安排<br />
              行李協助
            </Card>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" style={{ padding: "60px 18px", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, marginBottom: 20 }}>
            認識我們 / Meet the team
          </h2>

          <Card title="Jan Urban">
            Tour Leader<br />
            Czech, Chinese, English, German
          </Card>

          <br />

          <Card title="Alice Chen (陳艾麗絲)">
            Owner & Tour Leader<br />
            Chinese, English, Taiwanese, Cantonese
          </Card>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "60px 18px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, marginBottom: 20 }}>
            聯絡我們 / Contact
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gap: 12,
              background: "white",
              padding: 20,
              borderRadius: 20,
            }}
          >
            <input
              placeholder="姓名"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              style={inputStyle}
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              style={inputStyle}
            />

            <textarea
              rows={4}
              placeholder="日期、人數、興趣"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              style={inputStyle}
            />

            <button
              type="submit"
              style={{
                padding: 14,
                background: "#111",
                color: "white",
                borderRadius: 999,
                border: "none",
                fontWeight: 700,
              }}
            >
              送出詢問
            </button>
          </form>
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: 30, color: "#64748b" }}>
        © {new Date().getFullYear()} {agency.name} 嘉泰
      </footer>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: 12,
  borderRadius: 12,
  border: "1px solid #ddd",
};

function Card({ title, children }: any) {
  return (
    <div
      style={{
        padding: 20,
        borderRadius: 20,
        background: "white",
        boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ marginBottom: 10 }}>{title}</h3>
      <div style={{ lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}
