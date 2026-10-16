import React from "react";
import { Link } from "react-router-dom";
import { Zap, GitBranch, Send, Link2, Share2, Mail, Phone, MapPin } from "lucide-react";
import "../../styles/components.css";

const FOOTER_LINKS = {
  Events: [
    { label: "Browse Events", path: "/events" },
    { label: "Featured Events", path: "/events" },
    { label: "Book Tickets", path: "/booking" },
    { label: "My Dashboard", path: "/dashboard" },
  ],
  Company: [
    { label: "About Us", path: "/" },
    { label: "Careers", path: "/" },
    { label: "Blog", path: "/" },
    { label: "Press", path: "/" },
  ],
  Support: [
    { label: "Help Center", path: "/" },
    { label: "Contact Us", path: "/" },
    { label: "Privacy Policy", path: "/" },
    { label: "Terms of Service", path: "/" },
  ],
};

const SOCIALS = [
  { icon: Share2, label: "Twitter" },
  { icon: GitBranch, label: "GitHub" },
  { icon: Link2, label: "LinkedIn" },
  { icon: Send, label: "Instagram" },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="navbar-logo" style={{ fontSize: "1.4rem", display: "inline-flex" }}>
              <div className="logo-icon">
                <Zap size={18} color="#fff" fill="#fff" />
              </div>
              <span className="text-gradient">EventPulse</span>
            </Link>
            <p>
              Discover, book, and experience the world's most exciting events. Connect with communities
              that share your passions.
            </p>
            <div className="footer-socials">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <button key={label} className="footer-social-btn" aria-label={label}>
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="footer-col">
              <h4>{title}</h4>
              <ul className="footer-links">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <Mail size={14} style={{ color: "var(--primary-light)" }} /> hello@eventpulse.com
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <Phone size={14} style={{ color: "var(--primary-light)" }} /> +1 (555) 234-5678
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <MapPin size={14} style={{ color: "var(--primary-light)" }} /> San Francisco, CA 94102
          </span>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p>© 2026 EventPulse. All rights reserved.</p>
          <p>Crafted with ♥ for the community</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
