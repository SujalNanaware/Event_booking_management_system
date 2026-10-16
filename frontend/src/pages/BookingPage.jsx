import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  User, Mail, Phone, Hash, Tag,
  CheckCircle, X, AlertCircle, Ticket
} from "lucide-react";
import { EVENTS_DATA } from "../data/mockData";
import { useSnackbar } from "../components/ui/Snackbar";

/* ── Validation helpers ── */
const validators = {
  fullName: (v) => {
    if (!v.trim()) return "Full name is required";
    if (v.trim().length < 3) return "Name must be at least 3 characters";
    return "";
  },
  email: (v) => {
    if (!v.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address";
    return "";
  },
  mobile: (v) => {
    if (!v.trim()) return "Mobile number is required";
    if (!/^\+?[\d\s\-()]{8,15}$/.test(v)) return "Enter a valid mobile number";
    return "";
  },
  quantity: (v) => {
    if (!v || v < 1) return "At least 1 ticket required";
    if (v > 10) return "Maximum 10 tickets per booking";
    return "";
  },
  event: (v) => {
    if (!v) return "Please select an event";
    return "";
  },
};

/* ── Success Modal ── */
const SuccessModal = ({ booking, onClose }) => (
  <>
    <div className="overlay" onClick={onClose} />
    <div className="modal">
      <div className="modal-content">
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "rgba(16,185,129,0.15)",
          border: "2px solid var(--success)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 1.5rem",
          animation: "glow-pulse 2s infinite",
        }}>
          <CheckCircle size={36} color="var(--success)" />
        </div>
        <h2 style={{ marginBottom: "0.5rem" }}>Booking Confirmed! 🎉</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
          Your booking has been successfully processed. Check your email for confirmation details.
        </p>

        <div style={{ background: "var(--bg-secondary)", borderRadius: "var(--radius-lg)", padding: "1.25rem", marginBottom: "1.5rem", textAlign: "left" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { label: "Booking ID", value: `BK${Date.now().toString().slice(-6)}` },
              { label: "Event", value: booking.eventName },
              { label: "Tickets", value: `${booking.quantity} × $${booking.price}` },
              { label: "Total", value: `$${booking.total}`, highlight: true },
            ].map(({ label, value, highlight }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{label}</span>
                <span style={{ fontSize: "0.875rem", fontWeight: 700, color: highlight ? "var(--primary-light)" : "var(--text-primary)" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="btn btn-primary" style={{ width: "100%" }} onClick={onClose} id="booking-success-close">
          <Ticket size={16} /> View My Bookings
        </button>
      </div>
    </div>
  </>
);

/* ── Main Booking Page ── */
const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addSnack } = useSnackbar();
  const preselectedEventId = searchParams.get("event") || "";

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    quantity: 1,
    event: preselectedEventId,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(null);

  const selectedEvent = EVENTS_DATA.find((e) => e.id === form.event);
  const total = selectedEvent ? selectedEvent.price * form.quantity : 0;

  const validate = (name, value) => {
    return validators[name] ? validators[name](value) : "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newVal = name === "quantity" ? parseInt(value) || 1 : value;
    setForm((p) => ({ ...p, [name]: newVal }));
    if (touched[name]) {
      setErrors((p) => ({ ...p, [name]: validate(name, newVal) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const err = validate(key, form[key]);
      if (err) newErrors[key] = err;
    });

    setErrors(newErrors);
    setTouched({ fullName: true, email: true, mobile: true, quantity: true, event: true });

    if (Object.keys(newErrors).length > 0) {
      addSnack("Please fix the errors below before submitting.", "error");
      return;
    }

    setLoading(true);
    addSnack("Processing your booking...", "info");

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800));

    setLoading(false);
    setSuccessModal({
      eventName: selectedEvent.title,
      quantity: form.quantity,
      price: selectedEvent.price,
      total,
    });
    addSnack("Booking confirmed! 🎉", "success");
  };

  const handleModalClose = () => {
    setSuccessModal(null);
    navigate("/dashboard");
  };

  const FormField = ({ name, label, icon: Icon, type = "text", placeholder, as }) => (
    <div className="form-group">
      <label className="form-label" htmlFor={`booking-${name}`}>
        <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <Icon size={13} /> {label}
        </span>
      </label>
      {as === "select" ? (
        <select
          id={`booking-${name}`}
          name={name}
          value={form[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-input form-select${errors[name] && touched[name] ? " error" : ""}`}
        >
          <option value="">Select an event...</option>
          {EVENTS_DATA.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.title} — ${ev.price}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={`booking-${name}`}
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`form-input${errors[name] && touched[name] ? " error" : ""}`}
          min={name === "quantity" ? 1 : undefined}
          max={name === "quantity" ? 10 : undefined}
        />
      )}
      {errors[name] && touched[name] && (
        <div className="form-error">
          <AlertCircle size={12} /> {errors[name]}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ paddingTop: "70px", minHeight: "100vh" }}>
      {/* Header */}
      <section style={{ background: "var(--bg-secondary)", padding: "3.5rem 0 2.5rem", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div className="overline" style={{ marginBottom: "0.5rem" }}>✦ Secure Checkout</div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            Book Your <span className="text-gradient">Ticket</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.75rem" }}>
            Complete the form below to reserve your spot. Instant confirmation guaranteed.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "2.5rem", alignItems: "start" }}>

            {/* ── Booking Form ── */}
            <div>
              <div className="card" style={{ padding: "2.5rem" }}>
                <h2 style={{ fontSize: "1.3rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Ticket size={20} color="var(--primary-light)" />
                  Booking Details
                </h2>

                <form onSubmit={handleSubmit} noValidate id="booking-form">
                  <div className="grid grid-2">
                    <FormField name="fullName" label="Full Name" icon={User} placeholder="John Doe" />
                    <FormField name="email" label="Email Address" icon={Mail} type="email" placeholder="john@example.com" />
                  </div>
                  <div className="grid grid-2">
                    <FormField name="mobile" label="Mobile Number" icon={Phone} placeholder="+1 (555) 000-0000" />
                    <FormField name="quantity" label="Ticket Quantity" icon={Hash} type="number" placeholder="1" />
                  </div>
                  <FormField name="event" label="Select Event" icon={Tag} as="select" />

                  {/* Terms */}
                  <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "rgba(124,58,237,0.06)", borderRadius: "var(--radius-md)", border: "1px solid rgba(124,58,237,0.15)", fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                    🔒 By booking, you agree to our Terms of Service and Privacy Policy. Your payment details are encrypted and secure.
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ width: "100%" }}
                    disabled={loading}
                    id="booking-submit-btn"
                  >
                    {loading ? (
                      <>
                        <div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "rotate 0.7s linear infinite" }} />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Ticket size={18} /> Confirm Booking — ${total.toLocaleString()}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* ── Order Summary ── */}
            <div style={{ position: "sticky", top: "90px" }}>
              <div className="card" style={{ padding: "1.75rem" }}>
                <h3 style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>Order Summary</h3>

                {selectedEvent ? (
                  <>
                    <img
                      src={selectedEvent.image}
                      alt={selectedEvent.title}
                      style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: "var(--radius-md)", marginBottom: "1.25rem", border: "1px solid var(--border-subtle)" }}
                    />
                    <h4 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>{selectedEvent.title}</h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                      {new Date(selectedEvent.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      &nbsp;·&nbsp; {selectedEvent.location}
                    </p>
                  </>
                ) : (
                  <div style={{ height: 160, background: "var(--bg-secondary)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", border: "2px dashed var(--border-subtle)" }}>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Select an event</p>
                  </div>
                )}

                <div className="divider" />

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                    <span>Price per ticket</span>
                    <span style={{ fontWeight: 600 }}>${selectedEvent?.price ?? "—"}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                    <span>Quantity</span>
                    <span style={{ fontWeight: 600 }}>× {form.quantity}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                    <span>Service fee</span>
                    <span style={{ fontWeight: 600 }}>$0</span>
                  </div>
                </div>

                <div className="divider" />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: "1rem" }}>Total</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 900 }} className="text-gradient">
                    ${total.toLocaleString()}
                  </span>
                </div>

                {/* Perks */}
                <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {["Instant confirmation email", "Free cancellation (48hrs)", "QR code ticket delivery"].map((perk) => (
                    <div key={perk} style={{ display: "flex", gap: "0.5rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      <CheckCircle size={14} color="var(--success)" style={{ flexShrink: 0, marginTop: 1 }} />
                      {perk}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {successModal && <SuccessModal booking={successModal} onClose={handleModalClose} />}
    </div>
  );
};

export default BookingPage;
