import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Zap, ArrowRight, Calendar, MapPin, Clock, Play,
  Users, Star, TrendingUp, Shield
} from "lucide-react";
import EventCard from "../components/ui/EventCard";
import TestimonialCard from "../components/ui/TestimonialCard";
import { EVENTS_DATA, TESTIMONIALS, SPONSORS } from "../data/mockData";
import "../styles/components.css";

/* ── Floating particles ── */
const PARTICLE_COUNT = 20;

const HeroParticles = () => (
  <div className="hero-particles" aria-hidden="true">
    {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          animationDuration: `${8 + Math.random() * 12}s`,
          animationDelay: `${Math.random() * 10}s`,
          width: `${2 + Math.random() * 4}px`,
          height: `${2 + Math.random() * 4}px`,
          opacity: 0.4 + Math.random() * 0.4,
          background: i % 3 === 0 ? "rgba(124,58,237,0.7)" : i % 3 === 1 ? "rgba(6,182,212,0.7)" : "rgba(245,158,11,0.6)",
        }}
      />
    ))}
  </div>
);

/* ── Stats ── */
const STATS = [
  { number: "50K+", label: "Happy Attendees" },
  { number: "1.2K", label: "Events Hosted" },
  { number: "98%", label: "Satisfaction Rate" },
];

/* ── Features ── */
const FEATURES = [
  { icon: Shield, title: "Secure Booking", desc: "End-to-end encrypted transactions with instant confirmation." },
  { icon: Calendar, title: "Smart Discovery", desc: "AI-powered event recommendations tailored to your interests." },
  { icon: Users, title: "Community Driven", desc: "Connect with like-minded people before, during, and after events." },
  { icon: TrendingUp, title: "Real-time Updates", desc: "Live seat availability, schedule changes, and event alerts." },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const featuredEvents = EVENTS_DATA.filter((e) => e.featured);

  return (
    <div>
      {/* ════════════ HERO ════════════ */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
          <HeroParticles />
        </div>

        <div className="hero-content">
          {/* Text */}
          <div className="hero-text">
            <div className="hero-pill">
              <span className="hero-pill-dot" />
              <Zap size={12} />
              Next-Gen Event Booking Platform
            </div>

            <h1 className="hero-title">
              Experience Events{" "}
              <span className="text-gradient">Like Never</span>{" "}
              Before
            </h1>

            <p className="hero-subtitle">
              Discover, book, and experience world-class events — from tech summits to music
              festivals. Your next unforgettable memory is one click away.
            </p>

            <div className="hero-buttons">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => navigate("/events")}
                id="hero-explore-btn"
              >
                Explore Events <ArrowRight size={18} />
              </button>
              <button
                className="btn btn-secondary btn-lg"
                onClick={() => navigate("/booking")}
                id="hero-book-btn"
              >
                <Play size={16} /> Book a Ticket
              </button>
            </div>

            <div className="hero-stats">
              {STATS.map((s) => (
                <div key={s.label} className="hero-stat">
                  <div className="hero-stat-number">{s.number}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Card */}
          <div className="hero-visual">
            <div style={{ position: "relative" }}>
              <div className="hero-card-main">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80"
                  alt="TechSphere Summit"
                  className="hero-card-img"
                />
                <div className="hero-card-body">
                  <div className="hero-card-tag">
                    <Zap size={10} fill="currentColor" /> Featured Event
                  </div>
                  <h3>TechSphere Summit 2026</h3>
                  <div className="hero-card-meta">
                    <span><Calendar size={12} /> Nov 15, 2026</span>
                    <span><MapPin size={12} /> Silicon Valley, CA</span>
                    <span><Clock size={12} /> 09:00 AM</span>
                  </div>
                  <div className="hero-card-footer">
                    <div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Starting from</div>
                      <div className="hero-price">$299</div>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => navigate("/events/1")}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="hero-float-card hero-float-card-1">
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Users size={14} color="#fff" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>2,450</div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.72rem" }}>Registered</div>
                </div>
              </div>

              <div className="hero-float-card hero-float-card-2">
                <Star size={16} color="#f59e0b" fill="#f59e0b" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>4.9 / 5.0</div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.72rem" }}>Avg Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ FEATURED EVENTS ════════════ */}
      <section className="section" id="featured-events">
        <div className="container">
          <div className="section-heading">
            <div className="overline">✦ Handpicked For You</div>
            <h2>
              <span className="text-gradient">Featured</span> Events
            </h2>
            <p>Curated experiences you won't want to miss — from cutting-edge tech to unforgettable live shows.</p>
          </div>

          <div className="grid grid-3">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate("/events")} id="see-all-events-btn">
              See All Events <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ════════════ ABOUT / FEATURES ════════════ */}
      <section className="section" id="about" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            {/* Left: Image Collage */}
            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80",
                "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&q=80",
                "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
              ].map((src, i) => (
                <div key={i} style={{
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  height: i % 2 === 0 ? 200 : 160,
                  marginTop: i % 2 !== 0 ? "2rem" : 0,
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "var(--shadow-md)",
                }}>
                  <img src={src} alt="Event" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}

              {/* Stat badge */}
              <div style={{
                position: "absolute",
                bottom: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                background: "var(--bg-glass)",
                backdropFilter: "blur(16px)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "1rem 1.5rem",
                textAlign: "center",
                whiteSpace: "nowrap",
                boxShadow: "var(--shadow-glow)",
              }}>
                <div style={{ fontSize: "1.75rem", fontWeight: 800, fontFamily: "var(--font-display)" }} className="text-gradient">50,000+</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Events Booked This Year</div>
              </div>
            </div>

            {/* Right: Text */}
            <div>
              <div className="overline" style={{ color: "var(--primary-light)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>
                ✦ About EventPulse
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", marginBottom: "1.25rem" }}>
                Where Experiences <span className="text-gradient">Come Alive</span>
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "2rem" }}>
                EventPulse is more than a booking platform — it's a community hub for curious minds and passionate people.
                We connect event organizers with audiences that truly care, creating moments that last a lifetime.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "2.5rem" }}>
                {FEATURES.map(({ icon: Icon, title, desc }) => (
                  <div key={title} style={{
                    background: "var(--bg-card)",
                    borderRadius: "var(--radius-md)",
                    padding: "1.25rem",
                    border: "1px solid var(--border-subtle)",
                    transition: "all 0.25s ease",
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--border)"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border-subtle)"}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: "var(--radius-md)",
                      background: "rgba(124,58,237,0.15)", display: "flex",
                      alignItems: "center", justifyContent: "center", marginBottom: "0.75rem"
                    }}>
                      <Icon size={18} color="var(--primary-light)" />
                    </div>
                    <h4 style={{ fontSize: "0.9rem", marginBottom: "0.35rem" }}>{title}</h4>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{desc}</p>
                  </div>
                ))}
              </div>

              <button className="btn btn-primary btn-lg" onClick={() => navigate("/events")}>
                Explore Community <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ TESTIMONIALS ════════════ */}
      <section className="section" id="testimonials">
        <div className="container">
          <div className="section-heading">
            <div className="overline">✦ What People Say</div>
            <h2>
              Loved by <span className="text-gradient">Thousands</span>
            </h2>
            <p>Don't just take our word for it — hear from our growing community of event enthusiasts.</p>
          </div>

          <div className="grid grid-4">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ SPONSORS ════════════ */}
      <section className="section-sm" id="sponsors" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <p style={{ textAlign: "center", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "2rem" }}>
            Trusted by World-Class Organizations
          </p>
          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            {SPONSORS.map((sponsor) => (
              <div key={sponsor.name} style={{
                display: "flex", alignItems: "center", gap: "0.6rem",
                padding: "0.75rem 1.5rem",
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                opacity: 0.7,
                transition: "opacity 0.2s",
                cursor: "pointer",
              }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}
              >
                <div style={{
                  width: 30, height: 30, borderRadius: "var(--radius-sm)",
                  background: "var(--gradient-primary)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.65rem", fontWeight: 800, color: "#fff",
                }}>
                  {sponsor.logo}
                </div>
                <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>{sponsor.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CTA BANNER ════════════ */}
      <section className="section" id="cta">
        <div className="container">
          <div style={{
            background: "var(--gradient-primary)",
            borderRadius: "var(--radius-xl)",
            padding: "4rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0, opacity: 0.15,
              backgroundImage: "radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 50%, white 0%, transparent 50%)",
            }} />
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#fff", marginBottom: "1rem", position: "relative" }}>
              Ready to Find Your Next <br />Unforgettable Experience?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "2rem", maxWidth: 500, margin: "0 auto 2rem", lineHeight: 1.7, position: "relative" }}>
              Join over 50,000 event-goers who discover and book amazing events through EventPulse every day.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
              <button
                className="btn btn-lg"
                style={{ background: "#fff", color: "#7c3aed", fontWeight: 700 }}
                onClick={() => navigate("/events")}
                id="cta-browse-btn"
              >
                Browse Events <ArrowRight size={18} />
              </button>
              <button
                className="btn btn-lg"
                style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)" }}
                onClick={() => navigate("/booking")}
                id="cta-book-btn"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
