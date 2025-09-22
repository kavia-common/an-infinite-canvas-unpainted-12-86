import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('viewer@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/home';

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="grid" style={{maxWidth: 520, margin: '40px auto'}}>
      <section className="card">
        <h2 className="section-title">Sign in</h2>
        <form onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="email" className="muted">Email</label>
            <input id="email" type="email" className="input" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="password" className="muted">Password</label>
            <input id="password" type="password" className="input" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <div role="alert" className="pill danger" style={{marginBottom:12}}>{error}</div>}
          <button className="btn" type="submit">Sign in</button>
          <p className="muted mt-16">
            Tip: Use emails like admin@example.com (admin), edit@example.com (editor), viewer@example.com (viewer) to simulate roles.
          </p>
        </form>
      </section>
    </div>
  );
}
