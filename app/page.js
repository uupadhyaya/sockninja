"use client";
import { useState, useRef } from "react";

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
  { label: "What are you wearing on top?", icon: "👕", color: "#FF6B6B" },
  { label: "What are you wearing on the bottom?", icon: "👖", color: "#FFD93D" },
  { label: "What shoes are you wearing?", icon: "👟", color: "#6BCB77" },
  { label: "What's the occasion?", icon: "📍", color: "#4D96FF" },
];

function ProductCard({ product }) {
  return (
    <a href={product.url} target="_blank" rel="noopener noreferrer" style={{
      display: "flex", gap: 14, padding: "16px", background: "rgba(255,255,255,0.07)",
      border: "2px solid rgba(255,255,255,0.12)", borderRadius: 16, textDecoration: "none",
      transition: "all 0.25s", cursor: "pointer",
    }}
      onMouseEnter={e => { e.currentTarget.style.border = "2px solid #FFD93D"; e.currentTarget.style.background = "rgba(255,217,61,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.border = "2px solid rgba(255,255,255,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <img src={product.img} alt={product.name} style={{ width: 56, height: 56, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, color: "#fff", marginBottom: 4, lineHeight: 1.3, fontWeight: 500 }}>{product.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16, color: "#FFD93D", fontWeight: 700 }}>{product.price}</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{product.store}</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between", flexShrink: 0 }}>
        <span style={{ fontSize: 9, letterSpacing: "1px", color: "#6BCB77", background: "rgba(107,203,119,0.15)", border: "1px solid rgba(107,203,119,0.3)", borderRadius: 10, padding: "3px 8px" }}>{product.tag}</span>
        <span style={{ fontSize: 12, color: "#FFD93D", fontWeight: 600 }}>Shop →</span>
      </div>
    </a>
  );
}

function ShareCard({ result, outfit, onClose }) {
  const [copied, setCopied] = useState(false);
  const text = `🥷 Sock Ninja says:\n"${result.headline}"\n\n${result.primaryRecommendation}\n\nGet your free sock advice → sockninja.vercel.app`;
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", border: "2px solid rgba(255,217,61,0.4)", borderRadius: 24, padding: 32, maxWidth: 420, width: "100%" }}>
        <div style={{ background: "linear-gradient(135deg, rgba(255,107,107,0.15), rgba(77,150,255,0.15))", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 24, marginBottom: 20 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🥷🧦</div>
          <div style={{ fontSize: 11, letterSpacing: "3px", color: "#FFD93D", textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>Sock Ninja</div>
          <div style={{ fontSize: 18, color: "#fff", marginBottom: 10, fontWeight: 700 }}>{result.headline}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{result.primaryRecommendation}</div>
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
            {outfit.top} · {outfit.bottom} · {outfit.shoes}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={copy} style={{ flex: 1, padding: "13px", background: copied ? "#6BCB77" : "#FFD93D", color: "#000", border: "none", borderRadius: 10, fontSize: 14, cursor: "pointer", fontWeight: 700, transition: "all 0.3s" }}>
            {copied ? "✓ Copied!" : "📋 Copy to Share"}
          </button>
          <button onClick={onClose} style={{ padding: "13px 18px", background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, fontSize: 14, cursor: "pointer" }}>✕</button>
        </div>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textAlign: "center", marginTop: 12 }}>Share on TikTok, Instagram, or Twitter 🎯</p>
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
    setLoading(true); setResult(null); setProducts([]);
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
  const confidenceColors = { Conservative: "#6BCB77", Stylish: "#FFD93D", Bold: "#FF6B6B" };
  const currentColor = stepMeta[step]?.color || "#FFD93D";

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", fontFamily: "'DM Sans', system-ui, sans-serif", color: "#fff", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .float { animation: float 3s ease-in-out infinite; }
        .dot1 { animation: pulse 1.2s ease-in-out infinite; }
        .dot2 { animation: pulse 1.2s ease-in-out 0.2s infinite; }
        .dot3 { animation: pulse 1.2s ease-in-out 0.4s infinite; }
        .gradient-text {
          background: linear-gradient(90deg, #FF6B6B, #FFD93D, #6BCB77, #4D96FF);
          background-size: 300% 300%;
          animation: gradientShift 4s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div style={{ position: "fixed", top: -100, right: -100, width: 400, height: 400, background: "radial-gradient(circle, rgba(255,107,107,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: -100, left: -100, width: 400, height: 400, background: "radial-gradient(circle, rgba(77,150,255,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "52px 20px 100px", position: "relative", zIndex: 1 }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: 52 }} className="fade-up">
          <div className="float" style={{ fontSize: 64, marginBottom: 16, display: "inline-block" }}>🥷🧦</div>
          <h1 className="gradient-text" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(40px, 8vw, 72px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1, marginBottom: 12 }}>
            Sock Ninja
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 24 }}>AI-Powered Sock Intelligence</p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 50, padding: "8px 20px" }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: i < Math.min(usesLeft, 3) ? "#FFD93D" : "rgba(255,255,255,0.15)", transition: "background 0.3s", boxShadow: i < Math.min(usesLeft, 3) ? "0 0 8px #FFD93D" : "none" }} />
            ))}
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginLeft: 4 }}>
              {usesLeft > 0 ? `${Math.min(usesLeft, 999)} free look${usesLeft !== 1 ? "s" : ""} left` : "Share to unlock more"}
            </span>
          </div>
        </div>

        {/* SELECTOR */}
        {!result && (
          <div>
            <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
              {steps.map((s, i) => (
                <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? stepMeta[i].color : "rgba(255,255,255,0.1)", transition: "background 0.4s", cursor: i < step ? "pointer" : "default", boxShadow: i <= step ? `0 0 8px ${stepMeta[i].color}` : "none" }}
                  onClick={() => i < step && setStep(i)} />
              ))}
            </div>

            <div style={{ marginBottom: 16 }}>
              {steps.slice(0, step).map((s, i) => (
                selections[s] && (
                  <div key={s} className="fade-up" onClick={() => setStep(i)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", marginBottom: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = stepMeta[i].color; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
                    <span style={{ fontSize: 18 }}>{stepMeta[i].icon}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "2px", width: 60 }}>{s}</span>
                    <span style={{ fontSize: 14, color: stepMeta[i].color, fontWeight: 600 }}>{selections[s]}</span>
                    <span style={{ marginLeft: "auto", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "1px" }}>EDIT</span>
                  </div>
                )
              ))}
            </div>

            <div className="fade-up" key={step} style={{ background: "rgba(255,255,255,0.05)", border: `2px solid ${currentColor}44`, borderRadius: 20, padding: "28px 24px", marginBottom: 20, boxShadow: `0 0 40px ${currentColor}15` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${currentColor}22`, border: `2px solid ${currentColor}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{stepMeta[step].icon}</div>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: "#fff", fontFamily: "'Syne', sans-serif" }}>{stepMeta[step].label}</h2>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {STYLE_OPTIONS[steps[step]].map(opt => (
                  <button key={opt} onClick={() => select(steps[step], opt)} style={{
                    padding: "9px 16px",
                    background: selections[steps[step]] === opt ? currentColor : "rgba(255,255,255,0.08)",
                    color: selections[steps[step]] === opt ? "#000" : "rgba(255,255,255,0.7)",
                    border: `1.5px solid ${selections[steps[step]] === opt ? currentColor : "rgba(255,255,255,0.12)"}`,
                    borderRadius: 50, cursor: "pointer", fontSize: 13,
                    transition: "all 0.15s", fontWeight: selections[steps[step]] === opt ? 700 : 400,
                    boxShadow: selections[steps[step]] === opt ? `0 0 15px ${currentColor}66` : "none",
                  }}
                    onMouseEnter={e => { if (selections[steps[step]] !== opt) { e.currentTarget.style.borderColor = currentColor; e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = `${currentColor}22`; } }}
                    onMouseLeave={e => { if (selections[steps[step]] !== opt) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; } }}
                  >{opt}</button>
                ))}
              </div>
            </div>

            {allSelected && (
              <div className="fade-up">
                {usesLeft > 0 ? (
                  <button onClick={getAdvice} disabled={loading} style={{
                    width: "100%", padding: "20px",
                    background: loading ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #FF6B6B, #FFD93D)",
                    color: loading ? "rgba(255,255,255,0.3)" : "#000",
                    border: "none", borderRadius: 14, fontSize: 16,
                    fontFamily: "'Syne', sans-serif", fontWeight: 800,
                    cursor: loading ? "not-allowed" : "pointer", transition: "all 0.3s",
                    boxShadow: loading ? "none" : "0 8px 32px rgba(255,107,107,0.3)",
                  }}>
                    {loading ? (
                      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                        <span className="dot1" style={{ width: 8, height: 8, background: "rgba(255,255,255,0.4)", borderRadius: "50%", display: "inline-block" }} />
                        <span className="dot2" style={{ width: 8, height: 8, background: "rgba(255,255,255,0.4)", borderRadius: "50%", display: "inline-block" }} />
                        <span className="dot3" style={{ width: 8, height: 8, background: "rgba(255,255,255,0.4)", borderRadius: "50%", display: "inline-block" }} />
                        <span style={{ marginLeft: 8 }}>The ninja is thinking...</span>
                      </span>
                    ) : "🥷 Get My Sock Recommendation"}
                  </button>
                ) : (
                  <div style={{ background: "rgba(255,255,255,0.05)", border: "2px solid rgba(255,107,107,0.3)", borderRadius: 20, padding: 28, textAlign: "center" }}>
                    <div style={{ fontSize: 36, marginBottom: 10 }}>🔒</div>
                    <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, marginBottom: 8, fontWeight: 600 }}>You've used your 3 free looks.</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 20 }}>Share your last result on social media to unlock 3 more.</p>
                    <button onClick={reset} style={{ padding: "12px 28px", background: "rgba(255,217,61,0.15)", color: "#FFD93D", border: "2px solid rgba(255,217,61,0.3)", borderRadius: 50, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>↩ Start Over</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* RESULTS */}
        {result && !result.error && (
          <div ref={resultRef} className="fade-up">
            <div style={{ background: "linear-gradient(135deg, rgba(255,107,107,0.1), rgba(77,150,255,0.1))", border: "2px solid rgba(255,255,255,0.15)", borderRadius: 24, padding: "32px 28px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                <span style={{ fontSize: 48 }}>{result.sockEmoji}</span>
                {result.confidenceLevel && (
                  <span style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", padding: "6px 14px", borderRadius: 50, background: `${confidenceColors[result.confidenceLevel]}22`, color: confidenceColors[result.confidenceLevel], border: `1.5px solid ${confidenceColors[result.confidenceLevel]}44`, fontWeight: 700 }}>{result.confidenceLevel}</span>
                )}
              </div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, margin: "0 0 14px", color: "#fff", lineHeight: 1.2 }}>{result.headline}</h2>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.75, marginBottom: 20 }}>{result.primaryRecommendation}</p>
              {result.tiktokCaption && (
                <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 16px" }}>
                  <span style={{ fontSize: 10, color: "#FFD93D", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700 }}>🎵 TikTok Caption</span>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 6, fontStyle: "italic" }}>"{result.tiktokCaption}"</p>
                </div>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div style={{ background: "rgba(107,203,119,0.08)", border: "2px solid rgba(107,203,119,0.2)", borderRadius: 16, padding: "20px 18px" }}>
                <h3 style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "#6BCB77", marginBottom: 14, fontWeight: 700 }}>✓ Go For It</h3>
                {result.doThis?.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                    <span style={{ color: "#6BCB77", fontSize: 14, flexShrink: 0 }}>→</span>
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(255,107,107,0.08)", border: "2px solid rgba(255,107,107,0.2)", borderRadius: 16, padding: "20px 18px" }}>
                <h3 style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "#FF6B6B", marginBottom: 14, fontWeight: 700 }}>✗ Avoid</h3>
                {result.avoidThis?.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                    <span style={{ color: "#FF6B6B", fontSize: 14, flexShrink: 0 }}>×</span>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {result.boldMove && (
              <div style={{ background: "linear-gradient(135deg, rgba(255,217,61,0.1), rgba(255,107,107,0.1))", border: "2px solid rgba(255,217,61,0.3)", borderRadius: 16, padding: "20px 24px", marginBottom: 16 }}>
                <h3 style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "#FFD93D", marginBottom: 8, fontWeight: 700 }}>⚡ Bold Move</h3>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, lineHeight: 1.65 }}>{result.boldMove}</p>
              </div>
            )}

            {products.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
                  <span style={{ fontSize: 11, letterSpacing: "3px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", whiteSpace: "nowrap", fontWeight: 600 }}>🛍️ Shop The Look</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {products.map((p, i) => <ProductCard key={i} product={p} />)}
                </div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: 10 }}>↑ Affiliate links — we earn a small commission at no cost to you</p>
              </div>
            )}

            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <button onClick={() => setShowShare(true)} style={{ flex: 1, padding: "15px", background: "rgba(255,217,61,0.15)", color: "#FFD93D", border: "2px solid rgba(255,217,61,0.3)", borderRadius: 12, fontSize: 14, cursor: "pointer", fontWeight: 600, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,217,61,0.25)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,217,61,0.15)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                📤 Share Result
              </button>
              <button onClick={reset} style={{ flex: 1, padding: "15px", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "2px solid rgba(255,255,255,0.12)", borderRadius: 12, fontSize: 14, cursor: "pointer", fontWeight: 500, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                ↩ New Outfit
              </button>
            </div>

            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 16px", textAlign: "center" }}>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "1px" }}>{selections.top} · {selections.bottom} · {selections.shoes} · {selections.occasion}</span>
            </div>
          </div>
        )}

        {result?.error && (
          <div className="fade-up" style={{ textAlign: "center", padding: 40 }}>
            <p style={{ fontSize: 20, color: "#FFD93D", marginBottom: 10 }}>{result.headline}</p>
            <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>{result.primaryRecommendation}</p>
            <button onClick={reset} style={{ padding: "13px 32px", background: "rgba(255,217,61,0.15)", color: "#FFD93D", border: "2px solid rgba(255,217,61,0.3)", borderRadius: 50, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Try Again</button>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 52, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", letterSpacing: "3px", textTransform: "uppercase" }}>Sock Ninja · AI Fashion Intelligence</p>
        </div>
      </div>

      {showShare && result && <ShareCard result={result} outfit={selections} onClose={() => setShowShare(false)} />}
    </div>
  );
}
