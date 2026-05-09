import React, { useState, useEffect, useRef } from "react";
import {
  Bike,
  Plus,
  Heart,
  Calendar,
  MapPin,
  Camera,
  Search,
  Trash2,
  Edit3,
  X,
  Check,
  Moon,
  Sun,
  Share2,
  Route,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const INITIAL_BIKES = [
  {
    id: 1,
    name: "Royal Enfield Classic 350",
    year: "2023",
    place: "Ladakh Trip",
    memory:
      "One of the best rides through the mountains with unforgettable memories.",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop",
    rating: 5,
    km: "2400",
    liked: false,
    tag: "Mountain",
  },
  {
    id: 2,
    name: "KTM Duke 390",
    year: "2022",
    place: "Goa Ride",
    memory:
      "Beach roads, sunsets, and late-night rides made this trip special.",
    image:
      "https://images.unsplash.com/photo-1517846693594-1567da72af75?q=80&w=1200&auto=format&fit=crop",
    rating: 4,
    km: "1800",
    liked: false,
    tag: "Coastal",
  },
];

const TAGS = ["All", "Mountain", "Coastal", "City", "Highway", "Offroad", "Other"];

// Featured gallery images for the homepage
const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop",
    label: "Mountain Roads",
    sub: "Ladakh, India",
  },
  {
    url: "https://images.unsplash.com/photo-1611241893603-3c359704e0ee?q=80&w=800&auto=format&fit=crop",
    label: "Desert Trails",
    sub: "Rajasthan, India",
  },
  {
    url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop",
    label: "Coastal Cruising",
    sub: "Goa, India",
  },
  {
    url: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?q=80&w=800&auto=format&fit=crop",
    label: "City Nights",
    sub: "Mumbai, India",
  },
  {
    url: "https://images.unsplash.com/photo-1580341289255-5b47c98a59dd?q=80&w=800&auto=format&fit=crop",
    label: "Forest Paths",
    sub: "Coorg, India",
  },
  {
    url: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=800&auto=format&fit=crop",
    label: "Highway Freedom",
    sub: "NH44, India",
  },
];

function StarRating({ value, onChange, readOnly }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readOnly && onChange && onChange(star)}
          style={{ cursor: readOnly ? "default" : "pointer", fontSize: "18px", background: "none", border: "none", padding: "0 1px", transition: "transform 0.15s", color: star <= value ? "#facc15" : "#d1d5db" }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function BikeCard({ bike, onDelete, onToggleLike, onEdit, darkMode }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const cardBg = darkMode ? "#1f2937" : "#ffffff";
  const textMuted = darkMode ? "#9ca3af" : "#6b7280";

  return (
    <div style={{ background: cardBg, borderRadius: "24px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.10)", transition: "box-shadow 0.3s", display: "flex", flexDirection: "column" }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.18)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.10)"}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={bike.image}
          alt={bike.name}
          style={{ height: "220px", width: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s" }}
          onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
          onError={(e) => e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"}
        />
        {bike.tag && (
          <span style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "11px", padding: "4px 10px", borderRadius: "99px", backdropFilter: "blur(4px)" }}>
            {bike.tag}
          </span>
        )}
        <div style={{ position: "absolute", top: "12px", right: "12px", display: "flex", gap: "6px" }}>
          <button onClick={() => onToggleLike(bike.id)}
            style={{ padding: "7px", borderRadius: "50%", border: "none", cursor: "pointer", backdropFilter: "blur(4px)", background: bike.liked ? "#ef4444" : "rgba(0,0,0,0.4)", color: "#fff", display: "flex", alignItems: "center", transition: "background 0.2s" }}>
            <Heart size={15} fill={bike.liked ? "white" : "none"} />
          </button>
          <button onClick={() => onEdit(bike)}
            style={{ padding: "7px", borderRadius: "50%", border: "none", cursor: "pointer", backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.4)", color: "#fff", display: "flex", alignItems: "center" }}>
            <Edit3 size={15} />
          </button>
          {!showConfirm ? (
            <button onClick={() => setShowConfirm(true)}
              style={{ padding: "7px", borderRadius: "50%", border: "none", cursor: "pointer", backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.4)", color: "#fff", display: "flex", alignItems: "center" }}>
              <Trash2 size={15} />
            </button>
          ) : (
            <>
              <button onClick={() => onDelete(bike.id)}
                style={{ padding: "7px", borderRadius: "50%", border: "none", cursor: "pointer", background: "#dc2626", color: "#fff", display: "flex", alignItems: "center" }}>
                <Check size={15} />
              </button>
              <button onClick={() => setShowConfirm(false)}
                style={{ padding: "7px", borderRadius: "50%", border: "none", cursor: "pointer", background: "#4b5563", color: "#fff", display: "flex", alignItems: "center" }}>
                <X size={15} />
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontWeight: 800, fontSize: "18px", marginBottom: "6px", color: darkMode ? "#f9fafb" : "#111827" }}>{bike.name}</div>
        <StarRating value={bike.rating || 0} readOnly />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "10px", color: textMuted, fontSize: "13px" }}>
          {bike.year && <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Calendar size={13} />{bike.year}</span>}
          {bike.place && <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={13} />{bike.place}</span>}
          {bike.km && <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Route size={13} />{bike.km} km</span>}
        </div>
        <p style={{ marginTop: "12px", fontSize: "13px", lineHeight: "1.65", color: darkMode ? "#d1d5db" : "#4b5563", flex: 1 }}>
          {expanded || bike.memory.length <= 100 ? bike.memory : bike.memory.slice(0, 100) + "…"}
          {bike.memory.length > 100 && (
            <button onClick={() => setExpanded(!expanded)} style={{ marginLeft: "4px", color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
              {expanded ? "less" : "more"}
            </button>
          )}
        </p>
        <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
          <button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", background: "#ef4444", color: "#fff", border: "none", padding: "10px", borderRadius: "12px", cursor: "pointer", fontWeight: 600, fontSize: "13px", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#dc2626"}
            onMouseLeave={e => e.currentTarget.style.background = "#ef4444"}>
            <Camera size={14} /> View
          </button>
          <button
            onClick={() => navigator.clipboard?.writeText(`${bike.name} — ${bike.place} (${bike.year})\n${bike.memory}`)}
            style={{ padding: "10px 14px", borderRadius: "12px", border: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", color: darkMode ? "#9ca3af" : "#6b7280", transition: "background 0.2s" }}
            title="Copy to clipboard">
            <Share2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function EditModal({ bike, onSave, onClose, darkMode }) {
  const [form, setForm] = useState({ ...bike });
  const bg = darkMode ? "#1f2937" : "#ffffff";
  const inputStyle = { border: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`, borderRadius: "12px", padding: "12px 14px", outline: "none", fontSize: "13px", background: darkMode ? "#111827" : "#f9fafb", color: darkMode ? "#f9fafb" : "#111827", width: "100%", boxSizing: "border-box" };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}>
      <div style={{ width: "100%", maxWidth: "480px", background: bg, borderRadius: "24px", padding: "32px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", color: darkMode ? "#f9fafb" : "#111827" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h3 style={{ fontWeight: 800, fontSize: "20px" }}>Edit Memory</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: darkMode ? "#9ca3af" : "#6b7280" }}><X size={20} /></button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {["name", "year", "place", "km"].map(f => (
            <input key={f} style={inputStyle} placeholder={f.charAt(0).toUpperCase() + f.slice(1)} value={form[f] || ""} onChange={e => setForm({ ...form, [f]: e.target.value })} />
          ))}
          <input style={{ ...inputStyle, gridColumn: "1 / -1" }} placeholder="Image URL" value={form.image || ""} onChange={e => setForm({ ...form, image: e.target.value })} />
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "6px", color: darkMode ? "#9ca3af" : "#6b7280" }}>Rating</div>
            <StarRating value={form.rating} onChange={v => setForm({ ...form, rating: v })} />
          </div>
          <textarea rows={3} style={{ ...inputStyle, gridColumn: "1 / -1", resize: "none" }} value={form.memory} onChange={e => setForm({ ...form, memory: e.target.value })} />
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button onClick={() => onSave(form)} style={{ flex: 1, background: "#ef4444", color: "#fff", border: "none", padding: "12px", borderRadius: "12px", fontWeight: 700, cursor: "pointer" }}>Save Changes</button>
          <button onClick={onClose} style={{ flex: 1, background: "transparent", border: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`, padding: "12px", borderRadius: "12px", fontWeight: 700, cursor: "pointer", color: darkMode ? "#f9fafb" : "#111827" }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── NEW: Homepage Gallery Carousel ───────────────────────────────────────────
function HomeGallery() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const total = GALLERY_IMAGES.length;

  const prev = () => setActive(i => (i - 1 + total) % total);
  const next = () => setActive(i => (i + 1) % total);

  // auto-advance every 3.5 s
  useEffect(() => {
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, []);

  const navBtn = (onClick, children) => (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        background: "rgba(0,0,0,0.55)",
        border: "none",
        color: "#fff",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        backdropFilter: "blur(4px)",
        transition: "background 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.85)"}
      onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.55)"}
    >
      {children}
    </button>
  );

  return (
    <section style={{ background: "#0a0a0a", paddingBottom: "64px" }}>
      {/* section header */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Camera size={20} color="#ef4444" />
          <span style={{ color: "#fff", fontWeight: 800, fontSize: "20px" }}>Ride Gallery</span>
          <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "99px", background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)", fontWeight: 700, letterSpacing: "0.5px" }}>
            Featured
          </span>
        </div>
        <p style={{ color: "#6b7280", fontSize: "13px", marginTop: "6px" }}>Iconic routes and bikes from our community</p>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", alignItems: "start" }}>

        {/* ── Main featured image ── */}
        <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", aspectRatio: "4/3" }}>
          {navBtn(<ChevronLeft size={18} />, <ChevronLeft size={18} />)}
          <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}>
            {navBtn(prev, <ChevronLeft size={18} />)}
          </div>
          <div style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}>
            {navBtn(next, <ChevronRight size={18} />)}
          </div>

          <img
            key={active}
            src={GALLERY_IMAGES[active].url}
            alt={GALLERY_IMAGES[active].label}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", animation: "fadeIn 0.5s ease" }}
            onError={e => e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"}
          />

          {/* gradient overlay + caption */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)" }} />
          <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: "20px", marginBottom: "4px" }}>{GALLERY_IMAGES[active].label}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#9ca3af", fontSize: "13px" }}>
              <MapPin size={12} />{GALLERY_IMAGES[active].sub}
            </div>
          </div>

          {/* dot indicators */}
          <div style={{ position: "absolute", bottom: "14px", right: "16px", display: "flex", gap: "5px" }}>
            {GALLERY_IMAGES.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{ width: i === active ? "22px" : "7px", height: "7px", borderRadius: "99px", border: "none", background: i === active ? "#ef4444" : "rgba(255,255,255,0.4)", cursor: "pointer", padding: 0, transition: "all 0.3s" }} />
            ))}
          </div>
        </div>

        {/* ── Thumbnail grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "relative",
                borderRadius: "14px",
                overflow: "hidden",
                aspectRatio: "16/10",
                cursor: "pointer",
                outline: i === active ? "2px solid #ef4444" : "2px solid transparent",
                outlineOffset: "2px",
                transition: "outline 0.2s, transform 0.2s",
                transform: hovered === i ? "scale(1.03)" : "scale(1)",
              }}
            >
              <img
                src={img.url}
                alt={img.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: i === active ? "none" : "brightness(0.65)", transition: "filter 0.3s" }}
                onError={e => e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop"}
              />
              <div style={{ position: "absolute", bottom: "7px", left: "8px", right: "8px" }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: "11px", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>{img.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* keyframe injection */}
      <style>{`@keyframes fadeIn { from { opacity: 0.4; transform: scale(1.03); } to { opacity: 1; transform: scale(1); } }`}</style>
    </section>
  );
}

export default function BikeMemoriesApp() {
  const [bikes, setBikes] = useState(() => {
    try { const s = localStorage.getItem("bike_memories"); return s ? JSON.parse(s) : INITIAL_BIKES; }
    catch { return INITIAL_BIKES; }
  });
  const [formData, setFormData] = useState({ name: "", year: "", place: "", memory: "", image: "", km: "", rating: 5, tag: "Other" });
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterTag, setFilterTag] = useState("All");
  const [darkMode, setDarkMode] = useState(false);
  const [editingBike, setEditingBike] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState("");
  const formRef = useRef(null);

  useEffect(() => { localStorage.setItem("bike_memories", JSON.stringify(bikes)); }, [bikes]);

  const handleSubmit = () => {
    if (!formData.name.trim()) { setFormError("Bike name is required."); return; }
    if (!formData.memory.trim()) { setFormError("Memory description is required."); return; }
    setBikes(prev => [{ id: Date.now(), ...formData, liked: false, image: formData.image.trim() || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop" }, ...prev]);
    setFormData({ name: "", year: "", place: "", memory: "", image: "", km: "", rating: 5, tag: "Other" });
    setFormError("");
    setShowForm(false);
  };

  const filtered = bikes
    .filter(b => {
      const q = search.toLowerCase();
      return (!q || b.name.toLowerCase().includes(q) || (b.place || "").toLowerCase().includes(q) || b.memory.toLowerCase().includes(q))
        && (filterTag === "All" || b.tag === filterTag);
    })
    .sort((a, b) => {
      if (sortBy === "newest") return b.id - a.id;
      if (sortBy === "oldest") return a.id - b.id;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "km") return (Number(b.km) || 0) - (Number(a.km) || 0);
      return 0;
    });

  const totalKm = bikes.reduce((s, b) => s + (Number(b.km) || 0), 0);
  const avgRating = bikes.length ? (bikes.reduce((s, b) => s + (b.rating || 0), 0) / bikes.length).toFixed(1) : "—";

  const bg = darkMode ? "#111827" : "#f3f4f6";
  const cardBg = darkMode ? "#1f2937" : "#ffffff";
  const borderColor = darkMode ? "#374151" : "#e5e7eb";
  const textMain = darkMode ? "#f9fafb" : "#111827";
  const textMuted = darkMode ? "#9ca3af" : "#6b7280";

  const inputBase = { border: `1px solid ${borderColor}`, borderRadius: "14px", padding: "12px 16px", outline: "none", fontSize: "13px", background: cardBg, color: textMain, width: "100%", boxSizing: "border-box" };

  return (
    <div style={{ minHeight: "100vh", background: bg, color: textMain, fontFamily: "'Segoe UI', system-ui, sans-serif", transition: "background 0.3s, color 0.3s" }}>

      {/* NAVBAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 40, borderBottom: `1px solid ${borderColor}`, backdropFilter: "blur(12px)", background: darkMode ? "rgba(17,24,39,0.92)" : "rgba(255,255,255,0.92)", padding: "0 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "14px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Bike size={26} color="#ef4444" />
            <span style={{ fontWeight: 900, fontSize: "18px", letterSpacing: "-0.5px" }}>Bike Memories</span>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => setDarkMode(!darkMode)}
              style={{ padding: "8px 10px", borderRadius: "12px", border: `1px solid ${borderColor}`, background: cardBg, cursor: "pointer", display: "flex", alignItems: "center", color: textMain }}>
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button onClick={() => { setShowForm(true); setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 100); }}
              style={{ display: "flex", alignItems: "center", gap: "6px", background: "#ef4444", color: "#fff", border: "none", padding: "8px 18px", borderRadius: "12px", fontWeight: 700, cursor: "pointer", fontSize: "13px" }}>
              <Plus size={15} /> Add Bike
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "#0a0a0a", color: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
          <div>
            <span style={{ display: "inline-block", background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)", padding: "4px 14px", borderRadius: "99px", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "20px" }}>Your Ride Journal</span>
            <h1 style={{ fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 900, lineHeight: 1, margin: "0 0 20px", letterSpacing: "-2px" }}>Bike<br /><span style={{ color: "#ef4444" }}>Memories</span></h1>
            <p style={{ color: "#9ca3af", fontSize: "16px", lineHeight: 1.7, marginBottom: "32px", maxWidth: "380px" }}>Store your favorite bikes, unforgettable rides, road trip memories, and emotional moments all in one place.</p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button onClick={() => { setShowForm(true); setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 100); }}
                style={{ background: "#ef4444", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "12px", fontWeight: 700, cursor: "pointer", fontSize: "14px" }}>
                Add Your Bike
              </button>
              <button onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", padding: "12px 24px", borderRadius: "12px", fontWeight: 600, cursor: "pointer", fontSize: "14px" }}>
                Explore Collection
              </button>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <img src="https://media.istockphoto.com/id/1202514048/photo/silhouette-of-motorcycle-parking-with-sunset-background.jpg?s=1024x1024&w=is&k=20&c=T4fXKs05MuZvL84RBfTH7N326KPhM8WlxBaK7hlXeIY=" alt="hero bike" style={{ borderRadius: "24px", height: "400px", width: "100%", objectFit: "cover", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }} />
          </div>
        </div>
      </section>

      {/* ── GALLERY (new) ── */}
      <HomeGallery />

      {/* STATS */}
      <section style={{ background: cardBg, borderBottom: `1px solid ${borderColor}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px" }}>
          {[
            { icon: <Bike size={18} color="#ef4444" />, label: "Total Bikes", value: bikes.length, bg: darkMode ? "#1f2937" : "#fef2f2" },
            { icon: <Route size={18} color="#3b82f6" />, label: "Total KM", value: totalKm.toLocaleString(), bg: darkMode ? "#1f2937" : "#eff6ff" },
            { icon: <span style={{ fontSize: "16px" }}>⭐</span>, label: "Avg Rating", value: avgRating, bg: darkMode ? "#1f2937" : "#fefce8" },
            { icon: <Heart size={18} color="#ec4899" />, label: "Favorites", value: bikes.filter(b => b.liked).length, bg: darkMode ? "#1f2937" : "#fdf2f8" },
          ].map(({ icon, label, value, bg: sBg }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ padding: "10px", borderRadius: "12px", background: sBg, display: "flex" }}>{icon}</div>
              <div>
                <div style={{ fontSize: "11px", color: textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</div>
                <div style={{ fontSize: "24px", fontWeight: 900, lineHeight: 1.2 }}>{value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ADD FORM */}
      {showForm && (
        <section ref={formRef} style={{ maxWidth: "900px", margin: "40px auto", padding: "0 24px" }}>
          <div style={{ background: cardBg, borderRadius: "24px", padding: "36px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Plus color="#ef4444" size={22} />
                <h2 style={{ fontWeight: 900, fontSize: "22px" }}>Add New Bike Memory</h2>
              </div>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: textMuted, padding: "4px" }}><X size={20} /></button>
            </div>
            {formError && <div style={{ padding: "12px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", color: "#dc2626", fontSize: "13px", marginBottom: "16px" }}>{formError}</div>}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {[{ k: "name", ph: "Bike Name (e.g. Royal Enfield)" }, { k: "year", ph: "Year (e.g. 2023)" }, { k: "place", ph: "Ride Location" }, { k: "km", ph: "Distance (km)" }].map(({ k, ph }) => (
                <input key={k} style={inputBase} placeholder={ph} value={formData[k]} onChange={e => setFormData({ ...formData, [k]: e.target.value })} />
              ))}
              <input style={{ ...inputBase, gridColumn: "1 / -1" }} placeholder="Image URL (optional)" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
              <div style={{ gridColumn: "1 / -1" }}>
                <div style={{ fontSize: "12px", fontWeight: 700, marginBottom: "8px", color: textMuted, textTransform: "uppercase", letterSpacing: "0.5px" }}>Ride Type</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {TAGS.filter(t => t !== "All").map(t => (
                    <button key={t} type="button" onClick={() => setFormData({ ...formData, tag: t })}
                      style={{ padding: "6px 14px", borderRadius: "99px", border: `1px solid ${formData.tag === t ? "#ef4444" : borderColor}`, background: formData.tag === t ? "#ef4444" : "transparent", color: formData.tag === t ? "#fff" : textMuted, fontWeight: 600, fontSize: "12px", cursor: "pointer", transition: "all 0.15s" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <div style={{ fontSize: "12px", fontWeight: 700, marginBottom: "8px", color: textMuted, textTransform: "uppercase", letterSpacing: "0.5px" }}>Rating</div>
                <StarRating value={formData.rating} onChange={v => setFormData({ ...formData, rating: v })} />
              </div>
              <textarea rows={4} style={{ ...inputBase, gridColumn: "1 / -1", resize: "none" }} placeholder="Write your bike memory…" value={formData.memory} onChange={e => setFormData({ ...formData, memory: e.target.value })} />
              <button type="button" onClick={handleSubmit} style={{ gridColumn: "1 / -1", background: "#111827", color: "#fff", border: "none", padding: "14px", borderRadius: "12px", fontWeight: 700, cursor: "pointer", fontSize: "14px", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#1f2937"}
                onMouseLeave={e => e.currentTarget.style.background = "#111827"}>
                Save Bike Memory
              </button>
            </div>
          </div>
        </section>
      )}

      {/* COLLECTION */}
      <section id="collection" style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px 80px" }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
          <div style={{ flex: 1, minWidth: "200px", display: "flex", alignItems: "center", gap: "10px", border: `1px solid ${borderColor}`, borderRadius: "14px", padding: "10px 16px", background: cardBg }}>
            <Search size={17} color={textMuted} style={{ flexShrink: 0 }} />
            <input style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "13px", color: textMain }} placeholder="Search bikes, places, memories…" value={search} onChange={e => setSearch(e.target.value)} />
            {search && <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: textMuted, display: "flex" }}><X size={15} /></button>}
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            style={{ border: `1px solid ${borderColor}`, borderRadius: "14px", padding: "10px 16px", outline: "none", fontSize: "13px", background: cardBg, color: textMain, fontWeight: 600, cursor: "pointer" }}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating">Top Rated</option>
            <option value="name">A–Z Name</option>
            <option value="km">Most KM</option>
          </select>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
          {TAGS.map(tag => (
            <button key={tag} onClick={() => setFilterTag(tag)}
              style={{ padding: "7px 16px", borderRadius: "99px", border: `1px solid ${filterTag === tag ? "#ef4444" : borderColor}`, background: filterTag === tag ? "#ef4444" : "transparent", color: filterTag === tag ? "#fff" : textMuted, fontWeight: 600, fontSize: "12px", cursor: "pointer", transition: "all 0.15s" }}>
              {tag}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <Heart color="#ef4444" size={22} />
          <h2 style={{ fontWeight: 900, fontSize: "26px" }}>My Bike Collection</h2>
          <span style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "99px", background: darkMode ? "#374151" : "#f3f4f6", color: textMuted, fontWeight: 600 }}>{filtered.length} {filtered.length === 1 ? "bike" : "bikes"}</span>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", borderRadius: "24px", border: `2px dashed ${borderColor}`, color: textMuted }}>
            <Bike size={48} style={{ margin: "0 auto 16px", opacity: 0.3, display: "block" }} />
            <p style={{ fontSize: "16px", fontWeight: 600 }}>No bikes found</p>
            <p style={{ fontSize: "13px", marginTop: "6px" }}>Try adjusting filters or add a new memory!</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "28px" }}>
            {filtered.map(bike => (
              <BikeCard key={bike.id} bike={bike}
                onDelete={id => setBikes(prev => prev.filter(b => b.id !== id))}
                onToggleLike={id => setBikes(prev => prev.map(b => b.id === id ? { ...b, liked: !b.liked } : b))}
                onEdit={setEditingBike}
                darkMode={darkMode}
              />
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0a0a0a", color: "#fff", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "10px" }}>
          <Bike size={20} color="#ef4444" />
          <span style={{ fontWeight: 800, fontSize: "18px" }}>Bike Memories</span>
        </div>
        <p style={{ color: "#6b7280", fontSize: "13px" }}>Preserve every ride, every road, and every unforgettable moment.</p>
        <p style={{ color: "#374151", fontSize: "11px", marginTop: "10px" }}>{bikes.length} memories stored locally</p>
      </footer>

      {editingBike && <EditModal bike={editingBike} onSave={updated => { setBikes(prev => prev.map(b => b.id === updated.id ? updated : b)); setEditingBike(null); }} onClose={() => setEditingBike(null)} darkMode={darkMode} />}
    </div>
  );
}
