import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";
import {
  User, Ticket, TrendingUp, Star, Calendar, MapPin,
  Clock, ArrowRight, Edit, Settings, Bell, Award
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { BOOKINGS_DATA, EVENTS_DATA } from "../data/mockData";

/* ── Chart Data ── */
const monthlyData = [
  { month: "Jun", bookings: 2, spent: 450 },
  { month: "Jul", bookings: 1, spent: 149 },
  { month: "Aug", bookings: 3, spent: 890 },
  { month: "Sep", bookings: 2, spent: 598 },
  { month: "Oct", bookings: 4, spent: 1340 },
  { month: "Nov", bookings: 2, spent: 748 },
];

const categoryData = [
  { name: "Technology", value: 3, color: "#7c3aed" },
  { name: "Music", value: 2, color: "#06b6d4" },
  { name: "Business", value: 1, color: "#f59e0b" },
  { name: "Gaming", value: 1, color: "#10b981" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "0.75rem 1rem", boxShadow: "var(--shadow-md)" }}>
        <p style={{ fontWeight: 700, marginBottom: "0.25rem", fontSize: "0.85rem" }}>{label}</p>
        {payload.map((p) => (
          <p key={p.dataKey} style={{ fontSize: "0.8rem", color: p.color }}>
            {p.dataKey === "spent" ? `$${p.value}` : `${p.value} bookings`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/* ── Status Badge ── */
const StatusBadge = ({ status }) => {
  const map = {
    confirmed: { class: "badge-success", label: "Confirmed" },
    pending: { class: "badge-warning", label: "Pending" },
    cancelled: { class: "badge-danger", label: "Cancelled" },
  };
  const { class: cls, label } = map[status] || map.pending;
  return <span className={`badge ${cls}`}>{label}</span>;
};

/* ── Stat Card ── */
const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <div className="card" style={{ padding: "1.5rem" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
      <div style={{
        width: 44, height: 44, borderRadius: "var(--radius-md)",
        background: `${color}20`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={20} color={color} />
      </div>
      <span style={{ fontSize: "0.72rem", color: "var(--success)", fontWeight: 700 }}>{sub}</span>
    </div>
    <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, marginBottom: "0.25rem" }} className="text-gradient">
      {value}
    </div>
    <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{label}</div>
  </div>
);

/* ── Dashboard ── */
const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalSpent = BOOKINGS_DATA.filter(b => b.status !== "cancelled").reduce((acc, b) => acc + b.amount, 0);
  const confirmedCount = BOOKINGS_DATA.filter(b => b.status === "confirmed").length;
  const upcomingEvents = EVENTS_DATA.slice(0, 3);

  const STATS = [
    { icon: Ticket, label: "Total Bookings", value: BOOKINGS_DATA.length, sub: "+2 this month", color: "#7c3aed" },
    { icon: TrendingUp, label: "Total Spent", value: `$${totalSpent.toLocaleString()}`, sub: "+$598 this month", color: "#06b6d4" },
    { icon: Star, label: "Events Attended", value: confirmedCount, sub: "This year", color: "#f59e0b" },
    { icon: Award, label: "Member Level", value: "Gold", sub: "Top 10%", color: "#10b981" },
  ];

  return (
    <div style={{ paddingTop: "70px", minHeight: "100vh" }}>
      {/* ── Header ── */}
      <section style={{ background: "var(--bg-secondary)", padding: "3rem 0 2rem", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div className="overline" style={{ marginBottom: "0.5rem" }}>✦ Personal Dashboard</div>
              <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
                Welcome back, <span className="text-gradient">{user?.name?.split(" ")[0]}</span> 👋
              </h1>
              <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                Here's what's happening with your events and bookings.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button className="btn btn-secondary btn-sm" id="dashboard-settings">
                <Settings size={14} /> Settings
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => navigate("/events")} id="dashboard-browse">
                <Calendar size={14} /> Browse Events
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "2rem", alignItems: "start" }}>

            {/* ── Left: Profile Card ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Profile */}
              <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
                <div style={{ position: "relative", display: "inline-block", marginBottom: "1.25rem" }}>
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    style={{ width: 80, height: 80, borderRadius: "50%", border: "3px solid var(--primary)", margin: "0 auto" }}
                  />
                  <div style={{
                    position: "absolute", bottom: 0, right: 0,
                    width: 24, height: 24, background: "var(--success)",
                    borderRadius: "50%", border: "2px solid var(--bg-card)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{ width: 8, height: 8, background: "#fff", borderRadius: "50%" }} />
                  </div>
                </div>

                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>{user?.name}</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>{user?.email}</p>
                <span className="badge badge-primary" style={{ margin: "0 auto 1.25rem" }}>
                  <Award size={10} style={{ marginRight: "0.25rem" }} /> Gold Member
                </span>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  {[
                    { label: "Bookings", value: BOOKINGS_DATA.length },
                    { label: "Reviews", value: "12" },
                    { label: "Following", value: "34" },
                    { label: "Wishlist", value: "8" },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ background: "var(--bg-secondary)", borderRadius: "var(--radius-md)", padding: "0.75rem", textAlign: "center" }}>
                      <div style={{ fontWeight: 800, fontFamily: "var(--font-display)", fontSize: "1.2rem" }} className="text-gradient">{value}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{label}</div>
                    </div>
                  ))}
                </div>

                <button className="btn btn-secondary" style={{ width: "100%" }} id="edit-profile-btn">
                  <Edit size={14} /> Edit Profile
                </button>
              </div>

              {/* Quick Actions */}
              <div className="card" style={{ padding: "1.5rem" }}>
                <h4 style={{ marginBottom: "1rem", fontSize: "0.9rem" }}>Quick Actions</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {[
                    { icon: Ticket, label: "My Tickets", action: () => {} },
                    { icon: Bell, label: "Notifications", action: () => {} },
                    { icon: Star, label: "Wishlist", action: () => {} },
                    { icon: Calendar, label: "Browse Events", action: () => navigate("/events") },
                  ].map(({ icon: Icon, label, action }) => (
                    <button
                      key={label}
                      onClick={action}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.75rem",
                        padding: "0.65rem 0.75rem", borderRadius: "var(--radius-md)",
                        background: "transparent", border: "none", color: "var(--text-secondary)",
                        cursor: "pointer", transition: "all 0.2s", textAlign: "left", width: "100%",
                        fontSize: "0.875rem",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(124,58,237,0.1)"; e.currentTarget.style.color = "var(--primary-light)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                    >
                      <Icon size={16} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: Main Content ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {/* Stat Cards */}
              <div className="grid grid-4">
                {STATS.map((s) => (
                  <StatCard key={s.label} {...s} />
                ))}
              </div>

              {/* Charts */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                {/* Monthly Bookings Chart */}
                <div className="card" style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "1rem", marginBottom: "1.25rem" }}>Monthly Activity</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                      <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="bookings" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Category Pie Chart */}
                <div className="card" style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "1rem", marginBottom: "1.25rem" }}>Events by Category</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {categoryData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        formatter={(value) => <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Spending Line Chart */}
              <div className="card" style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1rem", marginBottom: "1.25rem" }}>Spending Trend</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                    <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="spent"
                      stroke="#06b6d4"
                      strokeWidth={2.5}
                      dot={{ fill: "#06b6d4", r: 4 }}
                      activeDot={{ r: 6, fill: "#06b6d4" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* My Bookings Table */}
              <div className="card" style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                  <h3 style={{ fontSize: "1rem" }}>My Bookings</h3>
                  <button className="btn btn-ghost btn-sm" onClick={() => navigate("/events")} id="view-all-events-btn">
                    View All <ArrowRight size={14} />
                  </button>
                </div>
                <div className="table-wrapper">
                  <table id="bookings-table">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Event</th>
                        <th>Date</th>
                        <th>Tickets</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {BOOKINGS_DATA.map((booking) => (
                        <tr key={booking.id}>
                          <td><span style={{ fontFamily: "monospace", color: "var(--primary-light)", fontSize: "0.8rem" }}>{booking.id}</span></td>
                          <td>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text-primary)" }}>{booking.event}</div>
                              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.2rem" }}>
                                <MapPin size={10} /> {booking.location}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8rem" }}>
                              <Calendar size={12} color="var(--primary-light)" />
                              {new Date(booking.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </div>
                          </td>
                          <td><span style={{ fontWeight: 700 }}>{booking.tickets}</span></td>
                          <td><span style={{ fontWeight: 700, color: "var(--primary-light)" }}>${booking.amount}</span></td>
                          <td><StatusBadge status={booking.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="card" style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                  <h3 style={{ fontSize: "1rem" }}>Upcoming Events</h3>
                  <button className="btn btn-ghost btn-sm" onClick={() => navigate("/events")}>
                    Browse <ArrowRight size={14} />
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      style={{
                        display: "flex", gap: "1rem", alignItems: "center",
                        padding: "1rem", background: "var(--bg-secondary)",
                        borderRadius: "var(--radius-md)", cursor: "pointer",
                        border: "1px solid var(--border-subtle)",
                        transition: "all 0.2s",
                      }}
                      onClick={() => navigate(`/events/${event.id}`)}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.transform = "none"; }}
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        style={{ width: 60, height: 60, borderRadius: "var(--radius-md)", objectFit: "cover", flexShrink: 0 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.25rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{event.title}</h4>
                        <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <Calendar size={10} /> {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <MapPin size={10} /> {event.location.split(",")[0]}
                          </span>
                        </div>
                      </div>
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem" }} className="text-gradient">${event.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
