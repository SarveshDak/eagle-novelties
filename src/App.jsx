import React, { useState, useEffect, useRef, useCallback } from "react";
import Preloader from "./components/Preloader";

/* ============================================================
   EAGLE NOVELTIES — Premium Product Catalog
   Design tokens:
   Color: --bg #F6F1E9 (warm ivory), --surface #EFE7D8 (soft sand),
          --surface-2 #E4D9C4 (taupe), --ink #2B2723 (soft charcoal),
          --ink-dim #6E655A (secondary text), --line rgba(43,39,35,0.12)
   Type: "Fraunces" (serif, editorial headings) + "Inter" (sans, UI/body)
   Layout: generous whitespace, asymmetric editorial grid, no cards/shadows
   ============================================================ */
const FONT_LINK_ID = "eagle-gift-fonts";

function useGoogleFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_LINK_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_LINK_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Inter:wght@300;400;500&display=swap";
    document.head.appendChild(link);
  }, []);
}

/* ---------- Placeholder product data ---------- */
/* Replace `image` / `highResolutionImage` with real photo URLs later. */
const PRODUCTS = [
  {
    id: 1,
    name: "Prestige Executive Set",
    category: "CORPORATE",
    description: "Designed for distinguished corporate gifting, the Prestige Executive Set brings together coordinated everyday essentials in a sophisticated presentation. The set includes a textured notebook, matching card holder, keychain, and premium writing pen, arranged in a structured gift box for a polished and memorable presentation.",
    tone: "#C9A876",
    tall: true,
    image: "/images/diaryset.png",
    highResolutionImage: "/images/diaryset.png",
  },
  {
    id: 2,
    name: "Urban Luxe Carryall",
    category: "CORPORATE",
    description: "A sophisticated felt-finish corporate tote designed to bring together practicality and understated elegance. Its structured silhouette provides a polished, professional appearance, while the contrasting leather accents on the handles and front detail add a refined touch. The spacious design makes it well suited for carrying everyday essentials, documents, and work accessories, making it a versatile choice for corporate events, employee gifting, conferences, and brand promotions.",
    tone: "#B7B49A",
    image: "/images/bag.png",
    highResolutionImage: "/images/bag.png",
  },
  {
    id: 3,
    name: "Linen Heritage Tote",
    category: "CORPORATE",
    description: "The Linen Heritage Tote brings a timeless, understated character to everyday corporate essentials. Crafted with a natural textured canvas appearance, its clean structured form and softly rounded handles create a balanced blend of practicality and elegance. The spacious silhouette makes it suitable for carrying work essentials, event materials, and everyday belongings.Its generous front surface also provides an excellent area for corporate logo placement and personalized branding, making it well suited for conferences, employee gifting, promotional campaigns, and premium corporate events.",
    tone: "#D6A15A",
    image: "/images/bag2.png",
    highResolutionImage: "/images/bag2.png",
  },
  {
    id: 4,
    name: "Luxe Carry Tiffin",
    category: "CORPORATE",
    description: "The Luxe Carry Tiffin combines contemporary design with everyday practicality. Its compact structured form, soft matte finish, and contrasting dark accents create a clean and sophisticated appearance. Designed for convenient everyday carrying, it offers a polished alternative to conventional lunch containers. With its generous front surface, the case can also be customized with corporate logos, names, or branding, making it well suited for employee gifting, corporate events, conferences, and promotional campaigns.",
    tone: "#8E8676",
    tall: true,
    image: "/images/tiffin.png",
    highResolutionImage: "/images/tiffin.png",
  },
  {
    id: 5,
    name: "Ecru Luxe Canvas Tote",
    category: "SPECIAL OCCASIONS",
    description: "A refined and versatile canvas tote designed with a clean, minimalist aesthetic. Crafted in a soft ecru finish, the bag features a spacious structured body, reinforced fabric handles, and a smooth, durable construction suited for everyday corporate and lifestyle use. Its understated appearance provides an elegant canvas for custom branding, making it ideal for company events, promotional gifting, conferences, employee welcome kits, and premium corporate merchandise. The generous interior offers practical carrying space while maintaining a sophisticated silhouette.",
    tone: "#C7BFA9",
    image: "/images/apple.png",
    highResolutionImage: "/images/apple.png",
  },
  {
    id: 6,
    name: "Thermal Bottle",
    category: "PREMIUM",
    description: "A sophisticated reusable bottle designed with a refined, contemporary silhouette and a premium two-tone finish. The smooth ivory upper body is complemented by a warm taupe lower section with subtle vertical ribbed detailing, creating an elegant and distinctive appearance. A matching screw cap and integrated fabric carry strap add everyday convenience while maintaining the bottle’s polished aesthetic. Its clean surface also provides an excellent canvas for customized corporate branding, making it well suited for executive gifting, conferences, employee kits, wellness programs, and premium promotional collections.",
    tone: "#A98F65",
    image: "/images/bottle.png",
    highResolutionImage: "/images/bottle.png",
  },
  {
    id: 7,
    name: "Signature Cotton Cap",
    category: "FESTIVE",
    description: "A classic six-panel cotton cap designed with a clean, versatile silhouette and a comfortable everyday fit. Available in timeless white and black, the cap features a curved brim, structured crown, and adjustable back closure for a practical and adaptable fit. Its smooth fabric surface provides an ideal base for detailed embroidery or customized brand printing, making it well suited for corporate uniforms, promotional campaigns, outdoor events, travel merchandise, employee kits, and branded giveaways. The understated construction allows custom logos and artwork to remain the visual focus while maintaining a polished appearance.",
    tone: "#BFA980",
    tall: true,
    image: "/images/cap.png",
    highResolutionImage: "/images/cap.png",
  },
  {
    id: 8,
    name: "Royalwood Ganesha Plaque",
    category: "CORPORATE",
    description: "A sophisticated decorative wooden plaque featuring an intricately crafted Lord Ganesha motif, presented on a warm natural wood panel and framed with a rich, polished wooden border. The layered frame adds depth and a timeless character, while the contrasting central artwork creates a refined focal point. A personalized branding plate at the bottom makes it especially suitable for customized corporate gifting, festive occasions, business inaugurations, awards, anniversaries, and milestone celebrations. Its elegant wooden finish allows it to complement both traditional and contemporary interiors.",
    tone: "#9C8F6E",
    image: "/images/frame.png",
    highResolutionImage: "/images/frame.png",
  },
  {
    id: 9,
    name: "Vivid Pro Click Pen",
    category: "SPECIAL OCCASIONS",
    description: "A vibrant and contemporary retractable ball pen designed to bring a fresh, energetic look to everyday writing. The pen features a distinctive green upper clip section paired with a bright yellow barrel, complemented by sleek metallic accents at the top and tip. Its streamlined profile offers a comfortable, practical form while providing a generous surface area for customized corporate branding and logo printing. The bold color combination makes it especially suitable for promotional campaigns, employee stationery kits, conferences, educational events, trade shows, and branded corporate gifting.",
    tone: "#CDB68E",
    image: "/images/pen.png",
    highResolutionImage: "/images/pen.png",
  },
  {
    id: 10,
    name: "Regal Noir Executive Pen",
    category: "PREMIUM",
    description: "A premium executive ball pen designed with a sophisticated black body and striking metallic detailing. The pen features a polished black barrel complemented by finely textured silver-toned grip sections, creating a distinctive contrast between gloss and precision detailing. Its sleek metal clip and tapered metallic tip enhance the refined appearance, while the balanced cylindrical profile makes it suitable for professional everyday writing. The central barrel offers a clean area for customized logo printing or branding, making it an elegant choice for corporate gifting, executive stationery sets, conferences, and business events",
    tone: "#B2A488",
    image: "/images/pen2.png",
    highResolutionImage: "/images/pen2.png",
  },
  {
    id: 11,
    name: "AeroFlex Active Shorts",
    category: "SPECIAL OCCASIONS",
    description: "A sporty and versatile pair of performance shorts designed for active everyday wear. The deep navy body is complemented by crisp white side panels and subtle yellow piping, creating a clean athletic aesthetic. An elasticated waistband with an adjustable drawstring provides a secure and comfortable fit, while the relaxed silhouette allows ease of movement. The practical side pockets add everyday functionality, making these shorts suitable for sportswear collections, fitness events, employee activity programs, promotional campaigns, and customized corporate merchandise.",
    tone: "#AE9873",
    tall: true,
    image: "/images/shorts.png",
    highResolutionImage: "/images/shorts.png",
  },
  {
    id: 12,
    name: "EcoSnap Recycled Pen",
    category: "FESTIVE",
    description: "A sleek and vibrant promotional pen designed with a distinctive two-tone green and yellow finish. Its streamlined cylindrical body provides a comfortable, lightweight profile, while the matching yellow cap with integrated clip gives the pen a clean and practical appearance. The bright color combination creates strong visual appeal and makes the pen easy to incorporate into branded stationery collections. A generous barrel surface allows for customized logo printing, making it suitable for corporate campaigns, educational programs, conferences, promotional events, and everyday office use.",
    tone: "#C2A165",
    image: "/images/pen3.png",
    highResolutionImage: "/images/pen3.png",
  },
];

const CATEGORIES = ["ALL", "CORPORATE", "PREMIUM", "FESTIVE", "SPECIAL OCCASIONS"];

/* ---------- Placeholder image (SVG data URI) ----------
   Swap PRODUCTS[i].image / highResolutionImage with real photo paths,
   and this placeholder generator will simply be unused. */
function placeholderImage(tone, seed) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="1100" viewBox="0 0 900 1100">
    <rect width="900" height="1100" fill="${tone}22"/>
    <rect x="0" y="0" width="900" height="1100" fill="none"/>
    <ellipse cx="450" cy="560" rx="160" ry="260" fill="${tone}" opacity="0.85"/>
    <rect x="390" y="330" width="120" height="60" rx="10" fill="${tone}" opacity="0.6"/>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

/* ---------- Reveal-on-scroll hook ---------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "", as: Tag = "div", style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.9s cubic-bezier(.22,.61,.36,1) ${delay}s, transform 0.9s cubic-bezier(.22,.61,.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* ============================== HEADER ============================== */
function Header({ onNav, active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "home", label: "Home" },
    { id: "collection", label: "Collection" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: scrolled ? "rgba(246,241,233,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(43,39,35,0.08)" : "1px solid transparent",
        transition: "background 0.5s ease, border-color 0.5s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: scrolled ? "12px 32px" : "18px 32px",
          transition: "padding 0.5s ease",
        }}
      >
       <button
  onClick={() => onNav("home")}
  style={{
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
  }}
>
  <img
    src="/images/eagle-logo.png"
    alt="Eagle Novelties"
    className="eg-logo"
  />
</button>

        <nav
          style={{
            display: "flex",
            gap: 40,
            fontFamily: "'Inter', sans-serif",
          }}
          className="eg-nav-desktop"
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => onNav(l.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 13.5,
                letterSpacing: "0.04em",
                color: active === l.id ? "#2B2723" : "#6E655A",
                padding: "6px 0",
                position: "relative",
              }}
            >
              {l.label}
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  height: 1,
                  width: active === l.id ? "100%" : "0%",
                  background: "#2B2723",
                  transition: "width 0.35s ease",
                }}
              />
            </button>
          ))}
        </nav>

        <button
          onClick={() => onNav("contact")}
          className="eg-nav-desktop"
          style={{
            background: "none",
            border: "1px solid rgba(43,39,35,0.28)",
            borderRadius: 2,
            padding: "9px 20px",
            fontSize: 12.5,
            letterSpacing: "0.06em",
            color: "#2B2723",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            transition: "background 0.3s ease, border-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(43,39,35,0.06)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        >
          Enquire
        </button>

        <button
          className="eg-nav-mobile"
          onClick={() => setMenuOpen((m) => !m)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            flexDirection: "column",
            gap: 5,
            padding: 6,
          }}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span style={{ width: 22, height: 1, background: "#2B2723" }} />
          <span style={{ width: 22, height: 1, background: "#2B2723" }} />
        </button>
      </div>

      {menuOpen && (
        <div
          className="eg-nav-mobile"
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#F6F1E9",
            borderTop: "1px solid rgba(43,39,35,0.08)",
            padding: "8px 32px 24px",
          }}
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                onNav(l.id);
                setMenuOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                padding: "14px 0",
                fontSize: 15,
                color: "#2B2723",
                borderBottom: "1px solid rgba(43,39,35,0.06)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ============================== HERO ============================== */
function Hero({ onExplore }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const stage = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 1s cubic-bezier(.22,.61,.36,1) ${delay}s, transform 1s cubic-bezier(.22,.61,.36,1) ${delay}s`,
  });

  return (
    <section
      id="home"
      style={{
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        padding: "160px 32px 80px",
        maxWidth: 1280,
        margin: "0 auto",
      }}
    >
      <div style={{ maxWidth: 760 }}>
        <div
          style={{
            ...stage(0),
            fontFamily: "'Inter', sans-serif",
            fontSize: 12.5,
            letterSpacing: "0.14em",
            color: "#6E655A",
            marginBottom: 26,
          }}
        >
          The Eagle Novelties Collection
        </div>
        <h1
          style={{
            ...stage(0.12),
            fontFamily: "'Fraunces', serif",
            fontWeight: 400,
            fontSize: "clamp(38px, 6vw, 68px)",
            lineHeight: 1.08,
            color: "#2B2723",
            margin: "0 0 28px",
            letterSpacing: "-0.01em",
          }}
        >
          Where Corporate Gifting Meets Your Brand.
        </h1>
        <p
          style={{
            ...stage(0.24),
            fontFamily: "'Inter', sans-serif",
            fontSize: 16.5,
            lineHeight: 1.7,
            color: "#544E45",
            maxWidth: 520,
            marginBottom: 44,
          }}
        >
          Eagle Novelties curates refined corporate gifts that bring together thoughtful design, quality, and your brand identity — created for meaningful celebrations, valued relationships, and moments worth remembering.
        </p>
        <div style={stage(0.36)}>
          <button
            onClick={onExplore}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13.5,
              letterSpacing: "0.06em",
              color: "#F6F1E9",
              background: "#2B2723",
              border: "none",
              padding: "16px 34px",
              cursor: "pointer",
              borderRadius: 2,
              transition: "transform 0.4s cubic-bezier(.22,.61,.36,1), background 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#413a32";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#2B2723";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Explore Collection
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================== FILTER BAR ============================== */
function FilterBar({ active, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Filter products by category"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 28,
        marginBottom: 56,
      }}
    >
      {CATEGORIES.map((c) => (
        <button
          key={c}
          role="tab"
          aria-selected={active === c}
          onClick={() => onChange(c)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 0",
            fontFamily: "'Inter', sans-serif",
            fontSize: 12.5,
            letterSpacing: "0.08em",
            color: active === c ? "#2B2723" : "#948C7E",
            borderBottom: active === c ? "1px solid #2B2723" : "1px solid transparent",
            transition: "color 0.3s ease, border-color 0.3s ease",
          }}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

/* ============================== PRODUCT CARD ============================== */
function ProductCard({ product, index, onOpen }) {
  const [hover, setHover] = useState(false);
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(.22,.61,.36,1) ${(index % 3) * 0.08}s, transform 0.8s cubic-bezier(.22,.61,.36,1) ${(index % 3) * 0.08}s`,
        gridRow: product.tall ? "span 1" : "span 1",
      }}
    >
      <button
        onClick={() => onOpen(product)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          all: "unset",
          cursor: "pointer",
          display: "block",
          width: "100%",
        }}
        aria-label={`View ${product.name}`}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: product.tall ? "3 / 4.2" : "3 / 3.6",
            background: `${product.tone}18`,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
  src={product.image}
  alt={product.name}
  loading="lazy"
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: hover ? "scale(1.035)" : "scale(1)",
    transition: "transform 0.9s cubic-bezier(.22,.61,.36,1)",
    display: "block",
  }}
/>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(43,39,35,0.03)",
              opacity: hover ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 20,
              bottom: 18,
              fontFamily: "'Inter', sans-serif",
              fontSize: 11.5,
              letterSpacing: "0.08em",
              color: "#2B2723",
              opacity: hover ? 1 : 0,
              transform: hover ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
              background: "rgba(246,241,233,0.85)",
              padding: "6px 12px",
            }}
          >
            View Product
          </span>
        </div>
        <div style={{ padding: "20px 2px 0", textAlign: "left" }}>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10.5,
              letterSpacing: "0.1em",
              color: "#948C7E",
              marginBottom: 8,
            }}
          >
            {product.category}
          </div>
          <div
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 20,
              color: "#2B2723",
              marginBottom: 6,
            }}
          >
            {product.name}
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13.5,
              lineHeight: 1.5,
              color: "#6E655A",
              maxWidth: 320,
            }}
          >
            {product.description}
          </div>
        </div>
      </button>
    </div>
  );
}

/* ============================== PRODUCT GRID ============================== */
function ProductGrid({ onOpen }) {
  const [filter, setFilter] = useState("ALL");
  const filtered =
    filter === "ALL" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  return (
    <section
      id="collection"
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "120px 32px 60px",
      }}
    >
      <Reveal>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12.5,
            letterSpacing: "0.12em",
            color: "#6E655A",
            marginBottom: 18,
          }}
        >
          The Collection
        </div>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 400,
            fontSize: "clamp(28px, 3.4vw, 42px)",
            color: "#2B2723",
            marginBottom: 56,
            maxWidth: 640,
            lineHeight: 1.2,
          }}
        >
          Twelve pieces, chosen with care.
        </h2>
      </Reveal>

      <FilterBar active={filter} onChange={setFilter} />

      <div
        className="eg-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "56px 32px",
        }}
      >
        {filtered.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

/* ============================== PRODUCT DETAIL / ZOOM VIEWER ============================== */
function ProductDetail({ product, onClose, onPrev, onNext }) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const zoomRef = useRef(1);
  const targetZoomRef = useRef(1);
  const animationRef = useRef(null);
  const zoomTarget = useRef(1);
  const zoomAnimation = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";

      if (zoomAnimation.current) {
        cancelAnimationFrame(zoomAnimation.current);
        zoomAnimation.current = null;
      }
    };
  }, [onClose, onPrev, onNext]);

  // Reset when changing product
  useEffect(() => {
  zoomRef.current = 1;
  targetZoomRef.current = 1;

  setZoom(1);
  setPan({ x: 0, y: 0 });
}, [product]);

useEffect(() => {
  return () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };
}, []);

  // Smooth zoom animation
  const animateZoom = () => {
    setZoom((currentZoom) => {
      const target = zoomTarget.current;
      const difference = target - currentZoom;

      if (Math.abs(difference) < 0.001) {
        zoomAnimation.current = null;
        return target;
      }

      zoomAnimation.current = requestAnimationFrame(animateZoom);

      // Smooth easing
      return currentZoom + difference * 0.10;
    });
  };

  // Mouse wheel zoom
  const handleWheel = (e) => {
  e.preventDefault();

  const direction = e.deltaY > 0 ? -1 : 1;
  const scrollSpeed = Math.abs(e.deltaY);

  const zoomAmount =
    Math.min(scrollSpeed * 0.0012, 0.12);

  const newTargetZoom = Math.min(
    5,
    Math.max(
      1,
      targetZoomRef.current + direction * zoomAmount
    )
  );

  targetZoomRef.current = newTargetZoom;

  // If zooming OUT, smoothly bring product back toward center
  if (direction === -1) {
    setPan((currentPan) => ({
      x: currentPan.x * 0.82,
      y: currentPan.y * 0.82,
    }));
  }

  if (!animationRef.current) {
    const animate = () => {
      const current = zoomRef.current;
      const target = targetZoomRef.current;

      const next =
        current + (target - current) * 0.18;

      zoomRef.current = next;
      setZoom(next);

      // Keep centering while zooming out
      if (target < current) {
        setPan((currentPan) => ({
          x: currentPan.x * 0.90,
          y: currentPan.y * 0.90,
        }));
      }

      if (Math.abs(target - next) > 0.0005) {
        animationRef.current =
          requestAnimationFrame(animate);
      } else {
        zoomRef.current = target;
        setZoom(target);

        // Completely centered at 1x
        if (target <= 1.001) {
          setPan({ x: 0, y: 0 });
        }

        animationRef.current = null;
      }
    };

    animationRef.current =
      requestAnimationFrame(animate);
  }
};

  // Drag image when zoomed
  const handleDrag = (e) => {
    if (zoom <= 1) return;

    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;

    const origin = { ...pan };

    const move = (ev) => {
      setPan({
        x: origin.x + (ev.clientX - startX),
        y: origin.y + (ev.clientY - startY),
      });
    };

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  if (!product) return null;

  const resetZoom = () => {
    zoomTarget.current = 1;
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} detail view`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(246,241,233,0.98)",
        display: "flex",
        flexDirection: "column",
        animation: "eg-fade-in 0.4s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 32px",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11.5,
            letterSpacing: "0.1em",
            color: "#948C7E",
          }}
        >
          {product.category}
        </span>

        <button
          onClick={onClose}
          aria-label="Close product view"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            letterSpacing: "0.06em",
            color: "#2B2723",
          }}
        >
          Close ✕
        </button>
      </div>

      <div
        className="eg-detail-body"
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
          padding: "0 32px 40px",
          gap: 48,
        }}
      >
        {/* IMAGE VIEWER */}
        <div
  onMouseDown={handleDrag}
  onWheel={handleWheel}
  onClick={() => {
    if (zoom === 1) {
      zoomTarget.current = 1.25;

      if (!zoomAnimation.current) {
        zoomAnimation.current =
          requestAnimationFrame(animateZoom);
      }
    }
  }}
  style={{
    flex: "1.65",
    minWidth: 0,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    overflow: "hidden",

    cursor:
      zoom > 1
        ? pan.x || pan.y
          ? "grabbing"
          : "grab"
        : "zoom-in",

    background: `${product.tone}12`,
    position: "relative",
  }}
>
          <img
  src={product.highResolutionImage || product.image}
  alt={`${product.name} — high resolution view`}
  style={{
    width: "100%",
    height: "100%",

    objectFit: "contain",

    transform: `
      translate(${pan.x}px, ${pan.y}px)
      scale(${zoom})
    `,

    transformOrigin: "center center",
    transition: "none",

    userSelect: "none",
    WebkitUserSelect: "none",

    display: "block",
    willChange: "transform",
    pointerEvents: "none",
  }}
  draggable={false}
/>

          {zoom > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetZoom();
              }}
              style={{
                position: "absolute",
                bottom: 20,
                right: 20,
                background: "rgba(43,39,35,0.85)",
                color: "#F6F1E9",
                border: "none",
                borderRadius: 2,
                padding: "8px 16px",
                fontSize: 12,
                fontFamily: "'Inter', sans-serif",
                cursor: "pointer",
              }}
            >
              Reset zoom
            </button>
          )}
        </div>

        {/* PRODUCT INFORMATION */}
        <div
          className="eg-detail-info"
          style={{
  flex: "0.72",
  maxWidth: 400,
  minWidth: 320,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}}
        >
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 400,
              fontSize: 34,
              color: "#2B2723",
              margin: "0 0 20px",
            }}
          >
            {product.name}
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              lineHeight: 1.75,
              color: "#544E45",
              marginBottom: 32,
            }}
          >
            {product.description} Each piece is inspected individually before
            it's presented as part of the Eagle Novelties collection.
          </p>

          <button
            style={{
              alignSelf: "flex-start",
              background: "none",
              border: "1px solid rgba(43,39,35,0.28)",
              borderRadius: 2,
              padding: "13px 26px",
              fontSize: 12.5,
              letterSpacing: "0.06em",
              color: "#2B2723",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Enquire About This Piece
          </button>
        </div>
      </div>

      {/* PREVIOUS / NEXT */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 32px 28px",
          borderTop: "1px solid rgba(43,39,35,0.08)",
        }}
      >
        <button
          onClick={onPrev}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            fontSize: 12.5,
            letterSpacing: "0.06em",
            color: "#544E45",
          }}
        >
          ← Previous
        </button>

        <button
          onClick={onNext}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            fontSize: 12.5,
            letterSpacing: "0.06em",
            color: "#544E45",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}



/* ============================== ABOUT ============================== */
/* ============================== ABOUT ============================== */
function About() {
  return (
    <section
      id="about"
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "140px 32px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
        alignItems: "center",
      }}
      className="eg-two-col"
    >
      <Reveal>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12.5,
            letterSpacing: "0.12em",
            color: "#6E655A",
            marginBottom: 20,
          }}
        >
          About Eagle Novelties
        </div>

        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 400,
            fontSize: "clamp(28px, 3.2vw, 40px)",
            color: "#2B2723",
            lineHeight: 1.25,
            marginBottom: 28,
          }}
        >
          We create gifts that carry your brand forward.
        </h2>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15.5,
            lineHeight: 1.8,
            color: "#544E45",
            maxWidth: 480,
          }}
        >
          Eagle Novelties curates refined corporate gifts that bring together
          thoughtful design, quality, and your brand identity — created for
          meaningful celebrations, valued relationships, and moments worth
          remembering.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div
          style={{
            width: "100%",
            aspectRatio: "4 / 5",
            overflow: "hidden",
            background: "#EFE7D8",
          }}
        >
          <img
            src="/images/poster.png"
            alt="Eagle Novelties corporate gifting collection"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </Reveal>
    </section>
  );
}

/* ============================== BRAND STORY ============================== */
function BrandStory() {
  return (
    <section
      style={{
        background: "#EFE7D8",
        padding: "140px 32px",
      }}
    >
      <Reveal>
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 400,
              fontSize: "clamp(30px, 4vw, 46px)",
              color: "#2B2723",
              lineHeight: 1.25,
              marginBottom: 28,
            }}
          >
            Thoughtful gifting. Beautifully presented.
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              lineHeight: 1.8,
              color: "#544E45",
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            A gift is rarely just an object. It carries appreciation,
            marks a celebration, or holds the memory of a moment two people
            shared. We design the collection, and the experience around it,
            with that in mind.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================== CONTACT ============================== */
function Contact() {
  return (
    <section
      id="contact"
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "140px 32px",
      }}
    >
      <Reveal>
        <div style={{ maxWidth: 640, marginBottom: 64 }}>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12.5,
              letterSpacing: "0.12em",
              color: "#6E655A",
              marginBottom: 20,
            }}
          >
            Contact
          </div>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 400,
              fontSize: "clamp(28px, 3.6vw, 44px)",
              color: "#2B2723",
              lineHeight: 1.2,
              marginBottom: 28,
            }}
          >
            Let's create something worth remembering.
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15.5,
              lineHeight: 1.8,
              color: "#544E45",
              marginBottom: 36,
            }}
          >
            Reach out to discuss the collection, corporate orders, or a
            custom gifting arrangement for an occasion of your own.
          </p>
          <button
            style={{
              background: "#2B2723",
              color: "#F6F1E9",
              border: "none",
              borderRadius: 2,
              padding: "16px 32px",
              fontSize: 13,
              letterSpacing: "0.06em",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Enquire About Our Collection
          </button>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          className="eg-contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
            borderTop: "1px solid rgba(43,39,35,0.1)",
            paddingTop: 40,
          }}
        >
          {[
            ["Phone", "+91 80580 60101"],
            ["Email", "sarveshdak13@gmail.com"],
            ["WhatsApp", "+91 80580 60101"],
            ["Address", "Udaipur, Rajasthan"],
          ].map(([label, value]) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: "#948C7E",
                  marginBottom: 10,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14.5,
                  color: "#2B2723",
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ============================== FOOTER ============================== */
function Footer({ onNav }) {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(43,39,35,0.1)",
        padding: "56px 32px 40px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 32,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 18,
              letterSpacing: "0.1em",
              color: "#2B2723",
              marginBottom: 12,
            }}
          >
            EAGLE NOVELTIES
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: "#6E655A",
              maxWidth: 280,
            }}
          >
            A considered collection of gifts for corporate, festive, and
            personal occasions.
          </div>
        </div>

        <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
          <div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "#948C7E",
                marginBottom: 14,
              }}
            >
              Navigate
            </div>
            {["home", "collection", "about", "contact"].map((id) => (
              <button
                key={id}
                onClick={() => onNav(id)}
                style={{
                  display: "block",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "5px 0",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13.5,
                  color: "#544E45",
                  textTransform: "capitalize",
                }}
              >
                {id}
              </button>
            ))}
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "#948C7E",
                marginBottom: 14,
              }}
            >
              Connect
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: "#544E45", lineHeight: 2 }}>
              Instagram<br />saveshdak13@gmail.com
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          maxWidth: 1280,
          margin: "48px auto 0",
          paddingTop: 24,
          borderTop: "1px solid rgba(43,39,35,0.08)",
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          color: "#948C7E",
        }}
      >
        © {new Date().getFullYear()} Eagle Novelties. All rights reserved.
      </div>
    </footer>
  );
}

/* ============================== APP ============================== */
export default function App() {
  useGoogleFonts();

  const [activeSection, setActiveSection] = useState("home");
  const [selected, setSelected] = useState(null);

  const scrollTo = useCallback((id) => {
    setActiveSection(id);

    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, []);

  const openProduct = (p) => setSelected(p);

  const closeProduct = () => setSelected(null);

  const step = (dir) => {
    setSelected((cur) => {
      if (!cur) return cur;

      const idx = PRODUCTS.findIndex(
        (p) => p.id === cur.id
      );

      const next =
        (idx + dir + PRODUCTS.length) % PRODUCTS.length;

      return PRODUCTS[next];
    });
  };

  return (
    <>
      {/* ================= PRELOADER ================= */}
      <Preloader />

      {/* ================= MAIN WEBSITE ================= */}
      <div
        style={{
          background: "#F6F1E9",
          color: "#2B2723",
          minHeight: "100vh",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <style>{`
          @keyframes eg-fade-in {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }

          * {
            box-sizing: border-box;
          }

          button:focus-visible,
          a:focus-visible {
            outline: 2px solid #2B2723;
            outline-offset: 3px;
          }

          img {
            max-width: 100%;
          }

          @media (max-width: 900px) {
            .eg-nav-desktop {
              display: none !important;
            }

            .eg-nav-mobile {
              display: flex !important;
            }

            .eg-grid {
              grid-template-columns: 1fr !important;
            }

            .eg-two-col {
              grid-template-columns: 1fr !important;
            }

            .eg-contact-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }

            .eg-detail-body {
              flex-direction: column !important;
              overflow-y: auto !important;
            }
          }

          @media (min-width: 901px) and (max-width: 1200px) {
            .eg-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          .eg-logo {
  width: 220px;
  height: auto;
  display: block;
  background: transparent;
}

@media (max-width: 900px) {
  .eg-logo {
    width: 160px;
  }
}  
        `}</style>

        {/* ================= HEADER ================= */}
        <Header
          onNav={scrollTo}
          active={activeSection}
        />

        {/* ================= HERO ================= */}
        <Hero
          onExplore={() => scrollTo("collection")}
        />

        {/* ================= PRODUCTS ================= */}
        <ProductGrid
          onOpen={openProduct}
        />

        {/* ================= ABOUT ================= */}
        <About />

        {/* ================= BRAND STORY ================= */}
        <BrandStory />

        {/* ================= CONTACT ================= */}
        <Contact />

        {/* ================= FOOTER ================= */}
        <Footer
          onNav={scrollTo}
        />

        {/* ================= PRODUCT DETAIL ================= */}
        {selected && (
          <ProductDetail
            product={selected}
            onClose={closeProduct}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />
        )}
      </div>
    </>
  );
}