import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">CommunityEvents</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/about">About Us</Link>
        <Link to="/careers">Careers</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
      <div className="navbar-auth">
        <Link to="/login" className="btn-login">Login</Link>
        <Link to="/register" className="btn-register">Register</Link>
      </div>
    </nav>
  );
}