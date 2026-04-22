"use client";
import { useState, useRef } from "react";

// ─── AFFILIATE PRODUCT DATA ───────────────────────────────────────────────────
const AFFILIATE_PRODUCTS = {
  "no-show": [
    { name: "Bombas No-Show 6-Pack", price: "$48", store: "Amazon", img: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=200&h=200&fit=crop", url: "https://amazon.com/?tag=YOUR_TAG", tag: "Best Seller" },
    { name: "Nike Everyday No-Show", price: "$14", store: "Amazon", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop", url: "https://amazon.com/?tag=YOUR_TAG", tag: "Budget Pick" },
    { name: "Stance Icon No-Show", price: "$16", store: "Amazon", img: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=200&h=200&fit=crop", url: "https://amazon.com/?tag=YOUR_TAG", tag: "Premium" },
  ],
  "ankle": [
    { name: "Happy Socks Solid Ankle", price: "$12", store: "Happy Socks", img: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=200&h=200&fit=crop", url: "https://amazon.com/?tag=YOUR_TAG", tag: "Colorful" },
    { name: "Bombas Ankle 4-Pack", price: "$48", store: "Amazon", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop", url: "https://amazon.com/?tag=YOUR_TAG", tag: "Best Seller" },
    { name: "Adidas Cushioned Ankle", price: "$18", store: "Amazon", img: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=200&h=200&fit=crop", url: "https://amazon.com/?tag=YOUR_TAG", tag: "Athletic" },
  ],
  "crew": [
    { name: "Darn Tough Merino Crew", price: "$22", store: "Amazon", img: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=200&h=200&fit=crop", url: "https://amazon.com/?tag=YOUR_TAG", tag: "Premium" },
    { name: "Happy Socks Stripe Crew", price: "$14", store: "Happy Socks", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop", url: "https://amazon.com/?tag=YOUR_TAG", tag: "Fun Pattern" },
    { name: "Uniqlo Supima Cotton Crew", price: "$10", store: "Uniqlo", img: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=200&h=200&fit=crop", url: "https://amazon.com/?tag=YOUR_TAG", tag: "Value" },
  ],
  "dress": [
    { name: "Gold Toe Over-the-Calf", price: "$20", store: "Amazon", img: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=200&h=200&fit=crop", url: "https://amazon.com/?tag=YOUR_TAG", tag: "Classic" },
    { name: "Pantherella Merino Dress", price: "$28", store: "Amazon", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop", url: "https://amazon.com/?tag=YOUR_TAG", tag: "Luxury" },
    { name: "Brooks Brothers Ribbed", price: "$18", store: "Amazon", img: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=200&h=200&fit=crop", url: "https://amazon.com/?tag=YOUR_TAG", tag: "Business" },
  ],
  "athletic": [
    { name: "Balega Hidden Comfort", price: "$14", store: "Amazon", img: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=200&h=200&fit=crop", url: "https://amazon.com/?tag=YOUR_TAG", tag: "Runner's Fave" },
    { name: "Nike Dri-FIT Crew 6-Pack", price: "$22", store: "Amazon", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop", url: "https://amazon.com/?tag=YOUR_TAG", tag: "Best Seller" },
    { name: "Feetures Elite Cushion", price: "$19", store: "Amazon", img: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=200&h=200&fit=crop", url: "https://amazon.com/?tag=YOUR_TAG", tag: "Performance" },
  ],
  "fun": [
    { name: "Happy Socks Gift Box 4-Pack", price: "$46", store: "Happy Socks", img: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=200&h=200&fit=crop", url: "https://amazon.com/?tag=YOUR_TAG", tag: "Gift Ready" },
    { name: "Stance Butter Blend Crew", price: "$18", store: "Amazon", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop", url: "https://amazon.com/?tag=YOUR_TAG", tag: "Premium" },
    { name: "Odd Sox Novelty Crew", price: "$12", store: "Amazon", img: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=200&h=200&fit=crop", url: "https://amazon.com/?tag=YOUR_TAG", tag: "Statement" },
  ],
};

const STYLE_OPTIONS = {
  top: ["Suit & Tie", "Dress Shirt", "Button-down Casual", "Polo", "Crewneck Sweater", "Turtleneck", "Hoodie", "Graphic Tee", "Plain Tee", "Blazer", "Cardigan"],
  bottom: ["Formal Trousers", "Chinos / Slacks", "Dark Jeans", "Light Jeans", "Shorts", "Joggers", "Skirt / Dress"],
  shoes: ["Oxford / Derby", "Loafers", "Chelsea Boots", "Ankle Boots", "Clean Sneakers", "Bold Sneakers", "Running Shoes", "Sandals", "Boat Shoes", "Heels / Flats"],
  occasion: ["Work / Office", "Formal Event", "Casual Hangout", "Date Night", "Gym / Sports", "Travel", "Wedding / Gala"],
};

const steps = ["top", "bottom", "shoes", "occasion"];
const stepMeta = [
  { label: "What's on top?", icon: "👕" },
  { label: "What's on bottom?", icon: "👖" },
  { label: "What shoes?", icon: "👟" },
  { label: "What's the occasion?", icon: "📍" },
];

function ProductCard({ product }) {
  return (
    <a href={product.url} target="_blank" rel="noopener noreferrer" style={{
      display: "flex", gap: 12, padding: "14px", background: "#111",
      border: "1px solid #222", borderRadius: 10, textDecoration: "none",
      transition: "all 0.2s", cursor: "pointer",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9A96E"; e.currentTarget.style.background = "#151310"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.background = "#111"; }}
    >
      <img src={product.img} alt={product.name} style={{ width: 52, height: 52, borderRadius: 6, objectFit: "cover", flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, color: "#D4CAC0", marginBottom: 3, lineHeight: 1.3 }}>{product.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14, color: "#C9A96E", fontWeight: 600 }}>{product.price}</span>
          <span style={{ fontSize: 10, color: "#5A5550" }}>{product.store}</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between", flexShrink: 0 }}>
        <span style={{ fontSize: 9, letterSpacing: "1px", color: "#7B9E87", background: "#7B9E8722", border: "1px solid #7B9E8744", borderRadius: 10, padding: "2px 7px" }}>{product.tag}</span>
        <span style={{ fontSize: 11, color: "#C9A96E" }}>Shop →</span>
      </div>
    </a>
  );
}

function ShareCard({ result, outfit, onClose }) {
  const [copied, setCopied] = useState(false);
  const text = `🥷 Sock Ninja says:\n"${result.headline}"\n\n${result.primaryRecommendation}\n\nGet your free sock advice → sockninja.vercel.app`;
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#0E0E0E", border: "1px solid #3A3020", borderRadius: 16, padding: 32, maxWidth: 420, width: "100%" }}>
        <div style={{ background: "linear-gradient(135deg, #1A1612, #0E0C0A)", border: "1px solid #3A3020", borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🥷🧦</div>
          <div style={{ fontSize: 11, letterSpacing: "3px", color: "#C9A96E", textTransform: "uppercase", marginBottom: 12 }}>Sock Ninja</div>
          <div style={{ fontSize: 18, color: "#F0EDE6", marginBottom: 10, fontFamily: "Georgia, serif" }}>{result.headline}</div>
          <div style={{ fontSize: 13, color: "#A09480", lineHeight: 1.6 }}>{result.primaryRecommendation}</div>
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #2A2520", fontSize: 11, color: "#4A4540" }}>
            {outfit.top} · {outfit.bottom} · {outfit.shoes}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={copy} style={{ flex: 1, padding: "12px", background: copied ? "#3A6A46" : "#C9A96E", color: "#0E0E0E", border: "none", borderRadius: 8, fontSize: 13, fontFamily: "Georgia, serif", cursor: "pointer", fontWeight: 600, transition: "background 0.3s" }}>
            {copied ? "✓ Copied!" : "📋 Copy to Share"}
          </button>
          <button onClick={onClose} style={{ padding: "12px 16px", background: "transparent", color: "#6B6560", border: "1px solid #2A2A2A", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>✕</button>
        </div>
        <p style={{ fontSize: 11, color: "#3A3530", textAlign: "center", marginTop: 12 }}>Share on TikTok, Instagram, or Twitter 🎯</p>
      </div>
    </div>
  );
}

export default function SockNinja() {
  const [selections, setSelections] = useState({ top: "", bottom: "", shoes: "", occasion: "" });
  const [result, setResult] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [showShare, setShowShare] = useState(false);
  const [usesLeft, setUsesLeft] = useState(() => {
    try { return parseInt(localStorage.getItem("sockNinjaUses") || "3"); } catch { return 3; }
  });
  const resultRef = useRef(null);

  const pickProducts = (sockType) => {
    const key = sockType?.toLowerCase();
    const map = { "no-show": "no-show", "no show": "no-show", "ankle": "ankle", "crew": "crew", "dress": "dress", "over-the-calf": "dress", "athletic": "athletic", "sport": "athletic", "fun": "fun", "statement": "fun", "bold": "fun" };
    for (const [k, v] of Object.entries(map)) { if (key?.includes(k)) return AFFILIATE_PRODUCTS[v]; }
    return AFFILIATE_PRODUCTS["crew"];
  };

  const select = (key, val) => {
    const updated = { ...selections, [key]: val };
    setSelections(updated);
    if (step < steps.length - 1) setTimeout(() => setStep(step + 1), 280);
  };

  const getAdvice = async () => {
    if (usesLeft <= 0) return;
    setLoading(true);
    setResult(null);
    setProducts([]);
    const newUses = usesLeft - 1;
    setUsesLeft(newUses);
    try { localStorage.setItem("sockNinjaUses", newUses.toString()); } catch {}

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ outfit: selections }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.result);
        setProducts(pickProducts(data.result.sockType));
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      } else {
        setResult({ error: true, headline: "Style malfunction 😅", primaryRecommendation: "Something went wrong. Try again!" });
      }
    } catch {
      setResult({ error: true, headline: "Style malfunction 😅", primaryRecommendation: "Something went wrong. Try again!" });
    }
    setLoading(false);
  };

  const reset = () => { setSelections({ top: "", bottom: "", shoes: "", occasion: "" }); setResult(null); setProducts([]); setStep(0); };
  const allSelected = steps.every(s => selections[s]);
  const confidenceColors = { Conservative: "#7B9E87", Stylish: "#D4A843", Bold: "#C1523C" };

  return (
    <div style={{ minHeight: "100vh", background: "#080808", fontFamily: "Georgia, 'Times New Roman', serif", color: "#F0EDE6", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .dot1 { animation: pulse 1.2s ease-in-out infinite; }
        .dot2 { animation: pulse 1.2s ease-in-out 0.2s infinite; }
        .dot3 { animation: pulse 1.2s ease-in-out 0.4s infinite; }
      `}</style>

      <div style={{ maxWidth: 660, margin: "0 auto", padding: "48px 20px 100px", position: "relative", zIndex: 1 }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: 52 }} className="fade-up">
          <div style={{ fontSize: 48, marginBottom: 10 }}>🥷🧦</div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(34px, 7vw, 56px)", fontWeight: 400, letterSpacing: "-1px", margin: "0 0 8px", lineHeight: 1.1, background: "linear-gradient(135deg, #F0EDE6 30%, #8A7A6A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Sock Ninja
          </h1>
          <p style={{ color: "#4A4540", fontSize: 12, letterSpacing: "4px", textTransform: "uppercase", margin: "0 0 20px" }}>AI-Powered Sock Intelligence</p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#111", border: "1px solid #222", borderRadius: 20, padding: "6px 16px" }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i < usesLeft ? "#C9A96E" : "#2A2A2A", transition: "background 0.3s" }} />
            ))}
            <span style={{ fontSize: 12, color: "#5A5550", marginLeft: 4 }}>
              {usesLeft > 0 ? `${usesLeft} free look${usesLeft !== 1 ? "s" : ""} left` : "Share to unlock more"}
            </span>
          </div>
        </div>

        {/* SELECTOR */}
        {!result && (
          <div>
            <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
              {steps.map((s, i) => (
                <div key={s} style={{ flex: 1, height: 2, borderRadius: 1, background: i <= step ? "#C9A96E" : "#1E1E1E", transition: "background 0.4s", cursor: i < step ? "pointer" : "default" }} onClick={() => i < step && setStep(i)} />
              ))}
            </div>

            <div style={{ marginBottom: 16 }}>
              {steps.slice(0, step).map((s, i) => (
                selections[s] && (
                  <div key={s} onClick={() => setStep(i)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", marginBottom: 6, background: "#101010", border: "1px solid #1E1E1E", borderRadius: 8, cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "#C9A96E"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "#1E1E1E"}>
                    <span style={{ fontSize: 16 }}>{stepMeta[i].icon}</span>
                    <span style={{ fontSize: 11, color: "#3A3530", textTransform: "uppercase", letterSpacing: "2px", width: 60 }}>{s}</span>
                    <span style={{ fontSize: 14, color: "#C9A96E" }}>{selections[s]}</span>
                    <span style={{ marginLeft: "auto", fontSize: 10, color: "#2A2520", letterSpacing: "1px" }}>EDIT</span>
                  </div>
                )
              ))}
            </div>

            <div className="fade-up" key={step} style={{ background: "#0D0D0D", border: "1px solid #252525", borderRadius: 14, padding: "28px 22px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 24 }}>{stepMeta[step].icon}</span>
                <h2 style={{ fontSize: 17, fontWeight: 400, margin: 0, color: "#D4CAC0", fontFamily: "'Playfair Display', serif" }}>{stepMeta[step].label}</h2>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {STYLE_OPTIONS[steps[step]].map(opt => (
                  <button key={opt} onClick={() => select(steps[step], opt)} style={{
                    padding: "8px 15px",
                    background: selections[steps[step]] === opt ? "#C9A96E" : "#151515",
                    color: selections[steps[step]] === opt ? "#0A0A0A" : "#8A8078",
                    border: `1px solid ${selections[steps[step]] === opt ? "#C9A96E" : "#252525"}`,
                    borderRadius: 6, cursor: "pointer", fontSize: 13, fontFamily: "Georgia, serif",
                    transition: "all 0.15s", fontWeight: selections[steps[step]] === opt ? 600 : 400,
                  }}
                    onMouseEnter={e => { if (selections[steps[step]] !== opt) { e.currentTarget.style.borderColor = "#4A4040"; e.currentTarget.style.color = "#C4BCB2"; } }}
                    onMouseLeave={e => { if (selections[steps[step]] !== opt) { e.currentTarget.style.borderColor = "#252525"; e.currentTarget.style.color = "#8A8078"; } }}
                  >{opt}</button>
                ))}
              </div>
            </div>

            {allSelected && (
              <div className="fade-up">
                {usesLeft > 0 ? (
                  <button onClick={getAdvice} disabled={loading} style={{
                    width: "100%", padding: "18px",
                    background: loading ? "#181818" : "linear-gradient(135deg, #C9A96E 0%, #A07840 100%)",
                    color: loading ? "#4A4540" : "#080808",
                    border: "none", borderRadius: 10, fontSize: 15,
                    fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600,
                    cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s",
                  }}>
                    {loading ? (
                      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                        <span className="dot1" style={{ width: 6, height: 6, background: "#4A4540", borderRadius: "50%", display: "inline-block" }} />
                        <span className="dot2" style={{ width: 6, height: 6, background: "#4A4540", borderRadius: "50%", display: "inline-block" }} />
                        <span className="dot3" style={{ width: 6, height: 6, background: "#4A4540", borderRadius: "50%", display: "inline-block" }} />
                        <span style={{ marginLeft: 8 }}>The ninja is thinking...</span>
                      </span>
                    ) : "🥷 Get My Sock Recommendation"}
                  </button>
                ) : (
                  <div style={{ background: "#0D0D0D", border: "1px solid #2A2A2A", borderRadius: 10, padding: 24, textAlign: "center" }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>🔒</div>
                    <p style={{ color: "#A09480", fontSize: 14, marginBottom: 16 }}>You've used your 3 free looks.</p>
                    <p style={{ color: "#6B6560", fontSize: 13, marginBottom: 16 }}>Share your last result on social media to unlock 3 more.</p>
                    <button onClick={reset} style={{ padding: "10px 24px", background: "transparent", color: "#C9A96E", border: "1px solid #C9A96E33", borderRadius: 6, cursor: "pointer", fontSize: 13, fontFamily: "Georgia, serif" }}>↩ Start Over</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* RESULTS */}
        {result && !result.error && (
          <div ref={resultRef} className="fade-up">
            <div style={{ background: "linear-gradient(145deg, #120F0A 0%, #0A0806 100%)", border: "1px solid #3A3020", borderRadius: 16, padding: "32px 28px", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
                <span style={{ fontSize: 40 }}>{result.sockEmoji}</span>
                <span style={{ fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", padding: "4px 12px", borderRadius: 20, background: `${confidenceColors[result.confidenceLevel]}18`, color: confidenceColors[result.confidenceLevel], border: `1px solid ${confidenceColors[result.confidenceLevel]}33` }}>{result.confidenceLevel}</span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 400, margin: "0 0 14px", color: "#F0EDE6", lineHeight: 1.2 }}>{result.headline}</h2>
              <p style={{ color: "#A09480", fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>{result.primaryRecommendation}</p>
              {result.tiktokCaption && (
                <div style={{ background: "#0A0808", border: "1px solid #1E1A14", borderRadius: 8, padding: "10px 14px" }}>
                  <span style={{ fontSize: 10, color: "#4A4030", letterSpacing: "2px", textTransform: "uppercase" }}>TikTok Caption</span>
                  <p style={{ fontSize: 13, color: "#7A7060", marginTop: 4, fontStyle: "italic" }}>"{result.tiktokCaption}"</p>
                </div>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div style={{ background: "#0C0C0C", border: "1px solid #1E2A1E", borderRadius: 12, padding: "20px 18px" }}>
                <h3 style={{ fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: "#7B9E87", marginBottom: 14 }}>✓ Go For It</h3>
                {result.doThis?.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 9 }}>
                    <span style={{ color: "#3A6A46", fontSize: 14, flexShrink: 0 }}>→</span>
                    <span style={{ color: "#9A9288", fontSize: 12, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "#0C0C0C", border: "1px solid #2A1E1E", borderRadius: 12, padding: "20px 18px" }}>
                <h3 style={{ fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: "#9E7B7B", marginBottom: 14 }}>✗ Avoid</h3>
                {result.avoidThis?.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 9 }}>
                    <span style={{ color: "#6A3A3A", fontSize: 14, flexShrink: 0 }}>×</span>
                    <span style={{ color: "#8A8078", fontSize: 12, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {result.boldMove && (
              <div style={{ background: "linear-gradient(135deg, #120E08, #0E0A06)", border: "1px solid #4A3820", borderRadius: 12, padding: "20px 22px", marginBottom: 14 }}>
                <h3 style={{ fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: "#C9A96E", marginBottom: 8 }}>⚡ Bold Move</h3>
                <p style={{ color: "#BCA870", fontSize: 14, lineHeight: 1.65 }}>{result.boldMove}</p>
              </div>
            )}

            {products.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ flex: 1, height: 1, background: "#1A1A1A" }} />
                  <span style={{ fontSize: 10, letterSpacing: "3px", color: "#3A3530", textTransform: "uppercase", whiteSpace: "nowrap" }}>Shop The Look</span>
                  <div style={{ flex: 1, height: 1, background: "#1A1A1A" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {products.map((p, i) => <ProductCard key={i} product={p} />)}
                </div>
                <p style={{ fontSize: 10, color: "#2A2520", textAlign: "center", marginTop: 10 }}>↑ Affiliate links — we earn a small commission at no cost to you</p>
              </div>
            )}

            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              <button onClick={() => setShowShare(true)} style={{ flex: 1, padding: "14px", background: "#111", color: "#C9A96E", border: "1px solid #C9A96E33", borderRadius: 8, fontSize: 13, fontFamily: "Georgia, serif", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#161210"; e.currentTarget.style.borderColor = "#C9A96E66"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.borderColor = "#C9A96E33"; }}>
                📤 Share Result
              </button>
              <button onClick={reset} style={{ flex: 1, padding: "14px", background: "transparent", color: "#6B6560", border: "1px solid #222", borderRadius: 8, fontSize: 13, fontFamily: "Georgia, serif", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#3A3530"; e.currentTarget.style.color = "#9A9590"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.color = "#6B6560"; }}>
                ↩ New Outfit
              </button>
            </div>

            <div style={{ background: "#0A0A0A", border: "1px solid #161616", borderRadius: 8, padding: "12px 16px", textAlign: "center" }}>
              <span style={{ fontSize: 11, color: "#2A2520", letterSpacing: "1px" }}>{selections.top} · {selections.bottom} · {selections.shoes} · {selections.occasion}</span>
            </div>
          </div>
        )}

        {result?.error && (
          <div className="fade-up" style={{ textAlign: "center", padding: 40 }}>
            <p style={{ fontSize: 18, color: "#C9A96E", marginBottom: 8 }}>{result.headline}</p>
            <p style={{ color: "#6B6560", marginBottom: 24 }}>{result.primaryRecommendation}</p>
            <button onClick={reset} style={{ padding: "12px 28px", background: "transparent", color: "#C9A96E", border: "1px solid #C9A96E44", borderRadius: 8, cursor: "pointer", fontFamily: "Georgia, serif", fontSize: 13 }}>Try Again</button>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 48, paddingTop: 32, borderTop: "1px solid #141414" }}>
          <p style={{ fontSize: 11, color: "#2A2520", letterSpacing: "2px", textTransform: "uppercase" }}>Sock Ninja · AI Fashion Intelligence</p>
        </div>
      </div>

      {showShare && result && <ShareCard result={result} outfit={selections} onClose={() => setShowShare(false)} />}
    </div>
  );
}
