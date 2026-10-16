import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Add registration logic here
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required />
        </div>
        <button type="submit" className="btn-primary">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}