import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      {submitted ? (
        <p>If an account exists with {email}, you will receive password reset instructions.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Enter your email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary">Send Reset Link</button>
        </form>
      )}
      <p><Link to="/login">Back to Login</Link></p>
    </div>
  );
}