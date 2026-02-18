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
    alert("Inquiry sent (demo mode). We will connect this to email soon.");
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#f8fafc", color: "#111" }}>
      
      {/* Header */}
      <header style={{ padding: "20px 40px", borderBottom: "1px solid #eee", background: "#fff" }}>
        <h2>{agency.name} <span style={{ color: "#777" }}>{agency.cnName}</span></h2>
      </header>

      {/* Hero */}
      <section style={{ padding: "80px 40px", textAlign: "center" }}>
        <h1 style={{ fontSize: "42px", marginBottom: "20px" }}>
          布拉格，為你精心安排 — 輕奢的細緻感
        </h1>

        <p style={{ fontSize: "18px", marginBottom: "10px" }}>
          {agency.taglineZh}
        </p>

        <p style={{ color: "#666", marginBottom: "30px" }}>
          {agency.taglineEn}
        </p>

        <a
          href="#contact"
          style={{
            padding: "12px 24px",
            background: "#111",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          立即詢價 / Request a quote
        </a>
      </section>

      {/* Services */}
      <section style={{ padding: "60px 40px", background: "#fff" }}>
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          服務 / Services
        </h2>

        <ul style={{ maxWidth: "800px", margin: "0 auto", lineHeight: "1.8" }}>
          <li>老城＋布拉格城堡（半日）</li>
          <li>加購：猶太區（延伸路線）</li>
          <li>一日全程陪同（彈性安排）</li>
          <li>2–3 日方案（含餐廳安排）</li>
          <li>城市間私人接送與餐廳停靠</li>
        </ul>
      </section>

      {/* Team */}
      <section style={{ padding: "60px 40px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          認識我們 / Meet the Team
        </h2>

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p>
            <strong>Jan Urban</strong> — 帶團領隊  
            <br />
            Czech, Chinese, English, German
          </p>

          <br />

          <p>
            <strong>Alice Chen (陳艾麗絲)</strong> — 創辦人 & 帶團領隊  
            <br />
            Chinese, English, Taiwanese, Cantonese
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "60px 40px", background: "#fff" }}>
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          聯絡我們 / Contact
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "600px", margin: "0 auto", display: "grid", gap: "15px" }}
        >
          <input
            placeholder="姓名 / Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />

          <input
            type="email"
            placeholder="Email / 電子郵件"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />

          <input
            placeholder="電話 / WhatsApp（選填）"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />

          <textarea
            rows={4}
            placeholder="日期、人數、語言、興趣（例：老城＋城堡＋午餐）"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />

          <button
            type="submit"
            style={{
              padding: "12px",
              background: "#111",
              color: "#fff",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            送出詢問 / Send inquiry
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer style={{ padding: "30px", textAlign: "center", fontSize: "14px", color: "#666" }}>
        © {new Date().getFullYear()} {agency.name} 嘉泰 — Prague Boutique Travel
      </footer>
    </div>
  );
}
