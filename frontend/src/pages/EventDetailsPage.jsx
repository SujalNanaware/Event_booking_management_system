import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar, MapPin, Clock, Users, Tag, ArrowLeft,
  ChevronLeft, ChevronRight, Check, Mic, Image
} from "lucide-react";
import { EVENTS_DATA } from "../data/mockData";

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = EVENTS_DATA.find((e) => e.id === id);
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!event) {
    return (
      <div style={{ paddingTop: "70px", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
        <div style={{ fontSize: "4rem" }}>😕</div>
        <h2>Event not found</h2>
        <button className="btn btn-primary" onClick={() => navigate("/events")}>Back to Events</button>
      </div>
    );
  }

  const capacityPercent = Math.round((event.attendees / event.maxCapacity) * 100);

  return (
    <div style={{ paddingTop: "70px", minHeight: "100vh" }}>
      {/* ── Full Width Banner ── */}
      <section style={{ position: "relative", height: "60vh", minHeight: 380, overflow: "hidden" }}>
        <img
          src={event.image}
          alt={event.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(8,8,18,0.95) 0%, rgba(8,8,18,0.4) 60%, transparent 100%)"
        }} />

        {/* Back Button */}
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigate(-1)}
          style={{ position: "absolute", top: "2rem", left: "2rem", backdropFilter: "blur(10px)" }}
          id="back-btn"
        >
          <ArrowLeft size={14} /> Back
        </button>

        {/* Banner Content */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem" }}>
          <div className="container">
            <span className="badge badge-primary" style={{ marginBottom: "0.75rem", display: "inline-flex" }}>{event.category}</span>
            <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", color: "#fff", marginBottom: "1rem", maxWidth: 700 }}>
              {event.title}
            </h1>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {[
                { icon: Calendar, text: `${new Date(event.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}` },
                { icon: Clock, text: event.time },
                { icon: MapPin, text: event.location },
                { icon: Users, text: `${event.attendees.toLocaleString()} attending` },
              ].map(({ icon: Icon, text }) => (
                <span key={text} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.85)" }}>
                  <Icon size={14} color="var(--primary-light)" /> {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="section-sm">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "2.5rem", alignItems: "start" }}>

            {/* ── Left Column ── */}
            <div>
              {/* Tags */}
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
                {event.tags.map((tag) => (
                  <span key={tag} className="tag"><Tag size={10} /> {tag}</span>
                ))}
              </div>

              {/* Description */}
              <div style={{ marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>About This Event</h2>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>{event.fullDescription}</p>
              </div>

              {/* Speakers */}
              <div style={{ marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "1.4rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Mic size={20} color="var(--primary-light)" /> Speakers
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.25rem" }}>
                  {event.speakers.map((speaker) => (
                    <div key={speaker.name} style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-lg)",
                      padding: "1.5rem",
                      textAlign: "center",
                      transition: "all 0.25s",
                    }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.transform = "none"; }}
                    >
                      <img
                        src={speaker.avatar}
                        alt={speaker.name}
                        style={{ width: 64, height: 64, borderRadius: "50%", margin: "0 auto 0.75rem", border: "2px solid var(--border)" }}
                      />
                      <h4 style={{ fontSize: "0.95rem", marginBottom: "0.25rem" }}>{speaker.name}</h4>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>{speaker.role}</p>
                      <span className="badge badge-primary" style={{ fontSize: "0.65rem" }}>{speaker.topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule Timeline */}
              <div style={{ marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "1.4rem", marginBottom: "1.5rem" }}>Event Schedule</h2>
                <div style={{ position: "relative" }}>
                  {/* Timeline line */}
                  <div style={{
                    position: "absolute", left: 19, top: 0, bottom: 0,
                    width: 2, background: "var(--border-subtle)",
                  }} />

                  <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {event.schedule.map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: "1.25rem", paddingLeft: "0.5rem" }}>
                        {/* Dot */}
                        <div style={{
                          width: 38, height: 38, borderRadius: "50%",
                          background: i === 0 ? "var(--gradient-primary)" : "var(--bg-card)",
                          border: `2px solid ${i === 0 ? "var(--primary)" : "var(--border-subtle)"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0, zIndex: 1,
                          boxShadow: i === 0 ? "var(--shadow-glow)" : "none",
                        }}>
                          {i === 0
                            ? <Check size={16} color="#fff" />
                            : <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)" }}>{i + 1}</span>
                          }
                        </div>

                        <div style={{ background: "var(--bg-card)", borderRadius: "var(--radius-md)", padding: "1rem 1.25rem", border: "1px solid var(--border-subtle)", flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                            <h4 style={{ fontSize: "0.95rem" }}>{item.title}</h4>
                            <span style={{ fontSize: "0.75rem", color: "var(--primary-light)", fontWeight: 700, background: "rgba(124,58,237,0.1)", padding: "0.2rem 0.6rem", borderRadius: "var(--radius-full)" }}>
                              {item.time}
                            </span>
                          </div>
                          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div>
                <h2 style={{ fontSize: "1.4rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Image size={20} color="var(--primary-light)" /> Gallery
                </h2>
                <div style={{ position: "relative" }}>
                  <img
                    src={event.gallery[galleryIndex]}
                    alt={`Gallery ${galleryIndex + 1}`}
                    style={{ width: "100%", height: 320, objectFit: "cover", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)" }}
                  />
                  {/* Gallery nav */}
                  <button className="btn btn-secondary btn-sm" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }}
                    onClick={() => setGalleryIndex((p) => (p - 1 + event.gallery.length) % event.gallery.length)}>
                    <ChevronLeft size={16} />
                  </button>
                  <button className="btn btn-secondary btn-sm" style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)" }}
                    onClick={() => setGalleryIndex((p) => (p + 1) % event.gallery.length)}>
                    <ChevronRight size={16} />
                  </button>
                  <div style={{ position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.4rem" }}>
                    {event.gallery.map((_, i) => (
                      <button key={i} onClick={() => setGalleryIndex(i)} style={{
                        width: galleryIndex === i ? 20 : 8, height: 8,
                        borderRadius: "4px", background: galleryIndex === i ? "var(--primary)" : "rgba(255,255,255,0.5)",
                        border: "none", cursor: "pointer", transition: "all 0.3s",
                      }} />
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
                  {event.gallery.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      onClick={() => setGalleryIndex(i)}
                      style={{
                        width: 72, height: 72, objectFit: "cover",
                        borderRadius: "var(--radius-md)",
                        cursor: "pointer",
                        border: `2px solid ${galleryIndex === i ? "var(--primary)" : "var(--border-subtle)"}`,
                        transition: "border-color 0.2s",
                        opacity: galleryIndex === i ? 1 : 0.65,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right Column: Booking Card ── */}
            <div style={{ position: "sticky", top: "90px" }}>
              <div className="card" style={{ padding: "1.75rem" }}>
                {/* Price */}
                <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Starting from</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 900 }} className="text-gradient">
                    ${event.price}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>per person</div>
                </div>

                {/* Info */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  {[
                    { icon: Calendar, label: "Date", value: new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) },
                    { icon: Clock, label: "Time", value: event.time },
                    { icon: MapPin, label: "Venue", value: event.location },
                    { icon: Users, label: "Capacity", value: `${event.attendees.toLocaleString()} / ${event.maxCapacity.toLocaleString()}` },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} style={{ display: "flex", gap: "0.75rem", padding: "0.75rem", background: "var(--bg-secondary)", borderRadius: "var(--radius-md)" }}>
                      <Icon size={16} color="var(--primary-light)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "0.1rem" }}>{label}</div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>{value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Capacity Bar */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.4rem" }}>
                    <span>Availability</span>
                    <span style={{ color: capacityPercent > 80 ? "var(--danger)" : "var(--success)", fontWeight: 700 }}>
                      {capacityPercent}% filled
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${capacityPercent}%`, background: capacityPercent > 80 ? "linear-gradient(135deg, #ef4444, #f97316)" : undefined }} />
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%" }}
                  onClick={() => navigate(`/booking?event=${event.id}`)}
                  id="book-ticket-btn"
                >
                  <Calendar size={18} /> Book Ticket
                </button>

                <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "1rem" }}>
                  🔒 Secure checkout · Instant confirmation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetailsPage;
