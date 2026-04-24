"use client";
import { useState, useRef } from "react";

const AFFILIATE_PRODUCTS = {
  "no-show": [
    { name: "Bombas No-Show 6-Pack", price: 48, store: "Bombas", img: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Best Seller", brand: "Bombas" },
    { name: "Nike Everyday No-Show", price: 14, store: "Nike", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Budget Pick", brand: "Nike" },
    { name: "Stance Icon No-Show", price: 16, store: "Stance", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Premium", brand: "Stance" },
    { name: "Balega Hidden No-Show", price: 14, store: "Balega", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Runner's Pick", brand: "Balega" },
    { name: "Adidas No-Show 6-Pack", price: 18, store: "Adidas", img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Value Pack", brand: "Adidas" },
    { name: "Feetures No-Show Tab", price: 19, store: "Feetures", img: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Performance", brand: "Feetures" },
  ],
  "ankle": [
    { name: "Happy Socks Ankle Pack", price: 12, store: "Happy Socks", img: "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Colorful", brand: "Happy Socks" },
    { name: "Bombas Ankle 4-Pack", price: 48, store: "Bombas", img: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Best Seller", brand: "Bombas" },
    { name: "Adidas Cushioned Ankle", price: 18, store: "Adidas", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Athletic", brand: "Adidas" },
    { name: "Nike Everyday Ankle", price: 14, store: "Nike", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Everyday", brand: "Nike" },
    { name: "Stance Uncommon Ankle", price: 18, store: "Stance", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Premium", brand: "Stance" },
    { name: "Uniqlo Short Ankle", price: 8, store: "Uniqlo", img: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Budget", brand: "Uniqlo" },
  ],
  "crew": [
    { name: "Darn Tough Merino Crew", price: 22, store: "Darn Tough", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Premium", brand: "Darn Tough" },
    { name: "Happy Socks Stripe Crew", price: 14, store: "Happy Socks", img: "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Fun Pattern", brand: "Happy Socks" },
    { name: "Uniqlo Supima Crew", price: 10, store: "Uniqlo", img: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Budget", brand: "Uniqlo" },
    { name: "Bombas Crew 4-Pack", price: 48, store: "Bombas", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Best Seller", brand: "Bombas" },
    { name: "Stance OG Crew", price: 16, store: "Stance", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Stylish", brand: "Stance" },
    { name: "Nike Dri-FIT Crew 6-Pack", price: 22, store: "Nike", img: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Athletic", brand: "Nike" },
  ],
  "dress": [
    { name: "Pantherella Merino Dress", price: 28, store: "Pantherella", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Luxury", brand: "Pantherella" },
    { name: "Gold Toe Over-the-Calf", price: 20, store: "Gold Toe", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Classic", brand: "Gold Toe" },
    { name: "Brooks Brothers Ribbed", price: 18, store: "Brooks Brothers", img: "https://images.unsplash.com/photo-1555069519-127aadedf1ee?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Business", brand: "Brooks Brothers" },
    { name: "Falke Airport Sock", price: 32, store: "Falke", img: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Ultra Premium", brand: "Falke" },
    { name: "Polo Ralph Lauren Dress", price: 16, store: "Ralph Lauren", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Preppy", brand: "Ralph Lauren" },
    { name: "Amazon Essentials 10-Pack", price: 15, store: "Amazon", img: "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Budget", brand: "Amazon" },
  ],
  "athletic": [
    { name: "Balega Hidden Comfort", price: 14, store: "Balega", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Runner's Fave", brand: "Balega" },
    { name: "Nike Dri-FIT 6-Pack", price: 22, store: "Nike", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Best Seller", brand: "Nike" },
    { name: "Feetures Elite Max", price: 19, store: "Feetures", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Performance", brand: "Feetures" },
    { name: "Adidas Ultraboost Sock", price: 20, store: "Adidas", img: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Premium", brand: "Adidas" },
    { name: "Bombas Athletic Ankle", price: 14, store: "Bombas", img: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Cushioned", brand: "Bombas" },
    { name: "Saucony Bolt 8-Pack", price: 18, store: "Saucony", img: "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Value", brand: "Saucony" },
  ],
  "fun": [
    { name: "Happy Socks Gift Box 4-Pack", price: 46, store: "Happy Socks", img: "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Gift Ready", brand: "Happy Socks" },
    { name: "Stance Butter Blend", price: 18, store: "Stance", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Premium", brand: "Stance" },
    { name: "Odd Sox Novelty Crew", price: 12, store: "Odd Sox", img: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Statement", brand: "Odd Sox" },
    { name: "Hot Sox Novelty Pack", price: 14, store: "Hot Sox", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Fun", brand: "Hot Sox" },
    { name: "Sock It To Me Crew", price: 11, store: "Sock It To Me", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Quirky", brand: "Sock It To Me" },
    { name: "Happy Socks x Pop Art", price: 16, store: "Happy Socks", img: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=600&fit=crop&q=90", url: "https://amazon.com/?tag=sockninja-20", tag: "Art Edition", brand: "Happy Socks" },
  ],
};

const SOCK_IMAGES = {
  "no-show": "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=1400&h=700&fit=crop&q=90",
  "ankle": "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=1400&h=700&fit=crop&q=90",
  "crew": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&h=700&fit=crop&q=90",
  "dress": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1400&h=700&fit=crop&q=90",
  "athletic": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1400&h=700&fit=crop&q=90",
  "fun": "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=1400&h=700&fit=crop&q=90",
};

// Each option uses an emoji icon instead of a photo for 100% clarity
// Icons are clear, instantly recognizable, never mismatched
const STYLE_OPTIONS = {
  top: [
    { label: "Suit & Tie", emoji: "👔", color: "#1a1a2e", desc: "Formal two-piece" },
    { label: "Dress Shirt", emoji: "👕", color: "#16213e", desc: "Collared, tucked" },
    { label: "Button-down Casual", emoji: "🪡", color: "#1a2744", desc: "Relaxed fit" },
    { label: "Polo", emoji: "🎽", color: "#1a3a1a", desc: "Collar, short sleeve" },
    { label: "Crewneck Sweater", emoji: "🧶", color: "#2a1a0e", desc: "Knit, round neck" },
    { label: "Turtleneck", emoji: "🌀", color: "#1a0e2a", desc: "High neck knit" },
    { label: "Hoodie", emoji: "🦘", color: "#1a1a1a", desc: "Hood & drawstring" },
    { label: "Graphic Tee", emoji: "🖼️", color: "#2a1a1a", desc: "Printed design" },
    { label: "Plain Tee", emoji: "⬜", color: "#2a2a2a", desc: "Simple, solid color" },
    { label: "Blazer", emoji: "🥼", color: "#0e1a2a", desc: "Structured jacket" },
    { label: "Cardigan", emoji: "🧥", color: "#1a2a1a", desc: "Open-front knit" },
  ],
  bottom: [
    { label: "Formal Trousers", emoji: "👔", color: "#1a1a2e", desc: "Tailored dress pants" },
    { label: "Chinos / Slacks", emoji: "🟤", color: "#2a1a0e", desc: "Smart casual pants" },
    { label: "Dark Jeans", emoji: "🔵", color: "#0e1a2a", desc: "Deep indigo denim" },
    { label: "Light Jeans", emoji: "🩵", color: "#1a2a3a", desc: "Faded blue denim" },
    { label: "Shorts", emoji: "🩳", color: "#1a2a1a", desc: "Above-the-knee" },
    { label: "Joggers", emoji: "🏃", color: "#1a1a1a", desc: "Elastic waist, tapered" },
    { label: "Skirt / Dress", emoji: "👗", color: "#2a1a2a", desc: "Feminine silhouette" },
  ],
  shoes: [
    { label: "Oxford / Derby", emoji: "👞", color: "#1a0e0e", desc: "Laced dress shoe" },
    { label: "Loafers", emoji: "🥿", color: "#2a1a0e", desc: "Slip-on classic" },
    { label: "Chelsea Boots", emoji: "🥾", color: "#1a1a0e", desc: "Ankle, elastic side" },
    { label: "Ankle Boots", emoji: "👢", color: "#1a0e1a", desc: "Short boot, any style" },
    { label: "Clean Sneakers", emoji: "👟", color: "#2a2a2a", desc: "White / minimal" },
    { label: "Bold Sneakers", emoji: "🌈", color: "#1a0e2a", desc: "Colorful, chunky" },
    { label: "Running Shoes", emoji: "🏃", color: "#1a2a1a", desc: "Athletic, cushioned" },
    { label: "Sandals", emoji: "🩴", color: "#2a1a0e", desc: "Open toe, strapped" },
    { label: "Boat Shoes", emoji: "⛵", color: "#1a2a2a", desc: "Leather, deck style" },
    { label: "Heels / Flats", emoji: "👠", color: "#2a1a1a", desc: "Elevated or flat" },
  ],
  occasion: [
    { label: "Work / Office", emoji: "💼", color: "#0e1a2a", desc: "Professional setting" },
    { label: "Formal Event", emoji: "🎩", color: "#1a1a1a", desc: "Black tie / gala" },
    { label: "Casual Hangout", emoji: "☕", color: "#2a1a0e", desc: "Relaxed, everyday" },
    { label: "Date Night", emoji: "🌹", color: "#2a0e1a", desc: "Romantic evening" },
    { label: "Gym / Sports", emoji: "💪", color: "#0e2a1a", desc: "Active, workout" },
    { label: "Travel", emoji: "✈️", color: "#0e1a2a", desc: "Comfort on the go" },
    { label: "Wedding / Gala", emoji: "💍", color: "#1a1a0e", desc: "Dressed to impress" },
  ],
};

const steps = ["top", "bottom", "shoes", "occasion"];
const stepMeta = [
  { label: "What are you wearing on top?", icon: "👕", color: "#FF6B6B" },
  { label: "What are you wearing on the bottom?", icon: "👖", color: "#FFD93D" },
  { label: "What shoes are you wearing?", icon: "👟", color: "#6BCB77" },
  { label: "What's the occasion?", icon: "📍", color: "#4D96FF" },
];

function EmojiOption({ option, selected, color, onClick }) {
  return (
    <div onClick={onClick} style={{
      cursor: "pointer", borderRadius: 16, overflow: "hidden",
      border: selected ? `2.5px solid ${color}` : "2.5px solid rgba(255,255,255,0.08)",
      boxShadow: selected ? `0 0 24px ${color}66` : "0 2px 8px rgba(0,0,0,0.3)",
      transition: "all 0.2s", transform: selected ? "scale(1.05)" : "scale(1)",
      background: selected ? `${color}18` : option.color,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "18px 8px", gap: 8, minHeight: 100,
    }}
      onMouseEnter={e => { if (!selected) { e.currentTarget.style.borderColor = `${color}66`; e.currentTarget.style.background = `${color}0D`; } }}
      onMouseLeave={e => { if (!selected) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = option.color; } }}
    >
      <span style={{ fontSize: 32, lineHeight: 1 }}>{option.emoji}</span>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 12, color: selected ? color : "rgba(255,255,255,0.9)", fontWeight: selected ? 700 : 600, lineHeight: 1.2, marginBottom: 3 }}>{option.label}</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", lineHeight: 1.2 }}>{option.desc}</div>
      </div>
      {selected && (
        <div style={{ position: "absolute", top: 8, right: 8, width: 20, height: 20, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#000" }}>✓</div>
      )}
    </div>
  );
}

function ShopSection({ products }) {
  const [priceFilter, setPriceFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const brands = ["all", ...new Set(products.map(p => p.brand))];
  const filtered = products.filter(p => {
    const priceOk = priceFilter === "all" || (priceFilter === "budget" && p.price < 20) || (priceFilter === "mid" && p.price >= 20 && p.price < 35) || (priceFilter === "premium" && p.price >= 35);
    const brandOk = brandFilter === "all" || p.brand === brandFilter;
    return priceOk && brandOk;
  });
  const filterBtn = (active, label, onClick) => (
    <button onClick={onClick} style={{ padding: "6px 14px", borderRadius: 50, fontSize: 12, cursor: "pointer", fontWeight: 600, background: active ? "#FFD93D" : "rgba(255,255,255,0.08)", color: active ? "#000" : "rgba(255,255,255,0.6)", border: active ? "2px solid #FFD93D" : "2px solid rgba(255,255,255,0.12)", transition: "all 0.15s", whiteSpace: "nowrap" }}>{label}</button>
  );
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
        <span style={{ fontSize: 11, letterSpacing: "3px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", whiteSpace: "nowrap", fontWeight: 600 }}>🛍️ Shop The Look</span>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>Price</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {filterBtn(priceFilter === "all", "All", () => setPriceFilter("all"))}
          {filterBtn(priceFilter === "budget", "Under $20", () => setPriceFilter("budget"))}
          {filterBtn(priceFilter === "mid", "$20–$35", () => setPriceFilter("mid"))}
          {filterBtn(priceFilter === "premium", "$35+", () => setPriceFilter("premium"))}
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>Brand</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {brands.map(b => filterBtn(brandFilter === b, b === "all" ? "All Brands" : b, () => setBrandFilter(b)))}
        </div>
      </div>
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "32px", color: "rgba(255,255,255,0.3)", fontSize: 14 }}>No products match this filter.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {filtered.map((p, i) => (
            <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", borderRadius: 18, overflow: "hidden", background: "rgba(255,255,255,0.05)", border: "2px solid rgba(255,255,255,0.1)", transition: "all 0.25s", display: "block" }}
              onMouseEnter={e => { e.currentTarget.style.border = "2px solid #FFD93D"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(255,217,61,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.border = "2px solid rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ position: "relative", paddingBottom: "70%", overflow: "hidden" }}>
                <img src={p.img} alt={p.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.06)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }} />
                <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(0,0,0,0.75)", borderRadius: 20, padding: "4px 12px", fontSize: 10, color: "#6BCB77", fontWeight: 700, border: "1px solid rgba(107,203,119,0.4)", backdropFilter: "blur(8px)" }}>{p.tag}</div>
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ fontSize: 13, color: "#fff", fontWeight: 600, marginBottom: 8, lineHeight: 1.4 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: 20, color: "#FFD93D", fontWeight: 800 }}>${p.price}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginLeft: 6 }}>{p.store}</span>
                  </div>
                  <span style={{ fontSize: 12, color: "#FFD93D", fontWeight: 700, background: "rgba(255,217,61,0.12)", padding: "5px 12px", borderRadius: 20, border: "1px solid rgba(255,217,61,0.25)" }}>Buy →</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: 12 }}>↑ Affiliate links — we earn a small commission at no cost to you</p>
    </div>
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
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{outfit.top} · {outfit.bottom} · {outfit.shoes}</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={copy} style={{ flex: 1, padding: "13px", background: copied ? "#6BCB77" : "#FFD93D", color: "#000", border: "none", borderRadius: 10, fontSize: 14, cursor: "pointer", fontWeight: 700, transition: "all 0.3s" }}>{copied ? "✓ Copied!" : "📋 Copy to Share"}</button>
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
  const [usesLeft, setUsesLeft] = useState(() => { try { return parseInt(localStorage.getItem("sockNinjaUses") || "3"); } catch { return 3; } });
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
    if (step < steps.length - 1) setTimeout(() => setStep(step + 1), 350);
  };

  const getAdvice = async () => {
    if (usesLeft <= 0) return;
    setLoading(true); setResult(null); setProducts([]);
    const newUses = usesLeft - 1;
    setUsesLeft(newUses);
    try { localStorage.setItem("sockNinjaUses", newUses.toString()); } catch {}
    try {
      const res = await fetch("/api/recommend", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ outfit: selections }) });
      const data = await res.json();
      if (data.success) {
        setResult(data.result);
        setProducts(pickProducts(data.result.sockType));
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      } else {
        setResult({ error: true, headline: "Style malfunction 😅", primaryRecommendation: "Something went wrong. Try again!" });
      }
    } catch { setResult({ error: true, headline: "Style malfunction 😅", primaryRecommendation: "Something went wrong. Try again!" }); }
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
        .gradient-text { background: linear-gradient(90deg, #FF6B6B, #FFD93D, #6BCB77, #4D96FF); background-size: 300% 300%; animation: gradientShift 4s ease infinite; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      `}</style>

      <div style={{ position: "fixed", top: -100, right: -100, width: 400, height: 400, background: "radial-gradient(circle, rgba(255,107,107,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: -100, left: -100, width: 400, height: 400, background: "radial-gradient(circle, rgba(77,150,255,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "52px 20px 100px", position: "relative", zIndex: 1 }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: 48 }} className="fade-up">
          <div className="float" style={{ fontSize: 64, marginBottom: 16, display: "inline-block" }}>🥷🧦</div>
          <h1 className="gradient-text" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(40px, 8vw, 72px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1, marginBottom: 12 }}>Sock Ninja</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 24 }}>AI-Powered Sock Intelligence</p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 50, padding: "8px 20px" }}>
            {[...Array(3)].map((_, i) => (<div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: i < Math.min(usesLeft, 3) ? "#FFD93D" : "rgba(255,255,255,0.15)", transition: "background 0.3s", boxShadow: i < Math.min(usesLeft, 3) ? "0 0 8px #FFD93D" : "none" }} />))}
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginLeft: 4 }}>{usesLeft > 0 ? `${Math.min(usesLeft, 999)} free look${usesLeft !== 1 ? "s" : ""} left` : "Share to unlock more"}</span>
          </div>
        </div>

        {/* SELECTOR */}
        {!result && (
          <div>
            <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
              {steps.map((s, i) => (<div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? stepMeta[i].color : "rgba(255,255,255,0.1)", transition: "background 0.4s", cursor: i < step ? "pointer" : "default", boxShadow: i <= step ? `0 0 8px ${stepMeta[i].color}` : "none" }} onClick={() => i < step && setStep(i)} />))}
            </div>

            {step > 0 && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                {steps.slice(0, step).map((s, i) => (
                  selections[s] && (
                    <div key={s} onClick={() => setStep(i)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "rgba(255,255,255,0.06)", border: `1px solid ${stepMeta[i].color}44`, borderRadius: 50, cursor: "pointer", transition: "all 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = stepMeta[i].color}
                      onMouseLeave={e => e.currentTarget.style.borderColor = `${stepMeta[i].color}44`}>
                      <span>{STYLE_OPTIONS[s].find(o => o.label === selections[s])?.emoji}</span>
                      <span style={{ fontSize: 12, color: stepMeta[i].color, fontWeight: 600 }}>{selections[s]}</span>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>✕</span>
                    </div>
                  )
                ))}
              </div>
            )}

            <div className="fade-up" key={step} style={{ background: "rgba(255,255,255,0.03)", border: `2px solid ${currentColor}33`, borderRadius: 20, padding: "24px 20px", marginBottom: 20, boxShadow: `0 0 40px ${currentColor}10` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${currentColor}22`, border: `2px solid ${currentColor}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{stepMeta[step].icon}</div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: "'Syne', sans-serif" }}>{stepMeta[step].label}</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, position: "relative" }}>
                {STYLE_OPTIONS[steps[step]].map(opt => (
                  <EmojiOption key={opt.label} option={opt} selected={selections[steps[step]] === opt.label} color={currentColor} onClick={() => select(steps[step], opt.label)} />
                ))}
              </div>
            </div>

            {allSelected && (
              <div className="fade-up">
                {usesLeft > 0 ? (
                  <button onClick={getAdvice} disabled={loading} style={{ width: "100%", padding: "20px", background: loading ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #FF6B6B, #FFD93D)", color: loading ? "rgba(255,255,255,0.3)" : "#000", border: "none", borderRadius: 14, fontSize: 16, fontFamily: "'Syne', sans-serif", fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.3s", boxShadow: loading ? "none" : "0 8px 32px rgba(255,107,107,0.3)" }}>
                    {loading ? (<span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><span className="dot1" style={{ width: 8, height: 8, background: "rgba(255,255,255,0.4)", borderRadius: "50%", display: "inline-block" }} /><span className="dot2" style={{ width: 8, height: 8, background: "rgba(255,255,255,0.4)", borderRadius: "50%", display: "inline-block" }} /><span className="dot3" style={{ width: 8, height: 8, background: "rgba(255,255,255,0.4)", borderRadius: "50%", display: "inline-block" }} /><span style={{ marginLeft: 8 }}>The ninja is thinking...</span></span>) : "🥷 Get My Sock Recommendation"}
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
            <div style={{ background: "linear-gradient(135deg, rgba(255,107,107,0.1), rgba(77,150,255,0.1))", border: "2px solid rgba(255,255,255,0.15)", borderRadius: 24, overflow: "hidden", marginBottom: 16 }}>
              {SOCK_IMAGES[result.sockType] && (
                <div style={{ position: "relative" }}>
                  <img src={SOCK_IMAGES[result.sockType]} alt={result.sockType} style={{ width: "100%", height: 220, objectFit: "cover", display: "block", filter: "brightness(0.65) saturate(1.2)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,12,41,0.97) 0%, rgba(15,12,41,0.3) 60%, transparent 100%)" }} />
                  <div style={{ position: "absolute", bottom: 20, left: 28, right: 28, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 6 }}>Recommended Style</div>
                      <div style={{ fontSize: 26, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#FFD93D", textTransform: "capitalize" }}>{result.sockType} Socks</div>
                    </div>
                    {result.confidenceLevel && (<span style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", padding: "7px 16px", borderRadius: 50, background: `${confidenceColors[result.confidenceLevel]}33`, color: confidenceColors[result.confidenceLevel], border: `1.5px solid ${confidenceColors[result.confidenceLevel]}66`, fontWeight: 700 }}>{result.confidenceLevel}</span>)}
                  </div>
                </div>
              )}
              <div style={{ padding: "24px 28px 28px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
                  <span style={{ fontSize: 40 }}>{result.sockEmoji}</span>
                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>{result.headline}</h2>
                </div>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>{result.primaryRecommendation}</p>
                {result.tiktokCaption && (
                  <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 16px" }}>
                    <span style={{ fontSize: 10, color: "#FFD93D", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700 }}>🎵 TikTok Caption</span>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 6, fontStyle: "italic" }}>"{result.tiktokCaption}"</p>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div style={{ background: "rgba(107,203,119,0.08)", border: "2px solid rgba(107,203,119,0.2)", borderRadius: 16, padding: "20px 18px" }}>
                <h3 style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "#6BCB77", marginBottom: 14, fontWeight: 700 }}>✓ Go For It</h3>
                {result.doThis?.map((item, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 10 }}><span style={{ color: "#6BCB77", fontSize: 14, flexShrink: 0 }}>→</span><span style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, lineHeight: 1.5 }}>{item}</span></div>))}
              </div>
              <div style={{ background: "rgba(255,107,107,0.08)", border: "2px solid rgba(255,107,107,0.2)", borderRadius: 16, padding: "20px 18px" }}>
                <h3 style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "#FF6B6B", marginBottom: 14, fontWeight: 700 }}>✗ Avoid</h3>
                {result.avoidThis?.map((item, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 10 }}><span style={{ color: "#FF6B6B", fontSize: 14, flexShrink: 0 }}>×</span><span style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.5 }}>{item}</span></div>))}
              </div>
            </div>

            {result.boldMove && (
              <div style={{ background: "linear-gradient(135deg, rgba(255,217,61,0.1), rgba(255,107,107,0.1))", border: "2px solid rgba(255,217,61,0.3)", borderRadius: 16, padding: "20px 24px", marginBottom: 16 }}>
                <h3 style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "#FFD93D", marginBottom: 8, fontWeight: 700 }}>⚡ Bold Move</h3>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.7 }}>{result.boldMove}</p>
              </div>
            )}

            {products.length > 0 && <ShopSection products={products} />}

            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <button onClick={() => setShowShare(true)} style={{ flex: 1, padding: "15px", background: "rgba(255,217,61,0.15)", color: "#FFD93D", border: "2px solid rgba(255,217,61,0.3)", borderRadius: 12, fontSize: 14, cursor: "pointer", fontWeight: 600, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,217,61,0.25)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,217,61,0.15)"; e.currentTarget.style.transform = "translateY(0)"; }}>📤 Share Result</button>
              <button onClick={reset} style={{ flex: 1, padding: "15px", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "2px solid rgba(255,255,255,0.12)", borderRadius: 12, fontSize: 14, cursor: "pointer", fontWeight: 500, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}>↩ New Outfit</button>
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
