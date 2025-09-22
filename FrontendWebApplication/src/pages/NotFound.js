import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="grid" style={{maxWidth: 600, margin: '40px auto'}}>
      <section className="card" role="alert">
        <h2 className="section-title">Page not found</h2>
        <p>We couldn't find what you're looking for.</p>
        <Link className="btn" to="/home">Go to Dashboard</Link>
      </section>
    </div>
  );
}
