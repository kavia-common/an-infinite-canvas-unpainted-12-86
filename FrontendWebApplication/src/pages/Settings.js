import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  return (
    <div className="grid">
      <section className="card">
        <h2 className="section-title">Profile</h2>
        <div className="grid grid-2">
          <div className="card">
            <div className="field">
              <label className="muted">Name</label>
              <input className="input" value={user?.name || ''} readOnly />
            </div>
            <div className="field">
              <label className="muted">Email</label>
              <input className="input" value={user?.email || ''} readOnly />
            </div>
            <div className="field">
              <label className="muted">Role</label>
              <input className="input" value={user?.role || ''} readOnly />
            </div>
            <p className="muted">Profile management integrates with backend identity provider.</p>
          </div>
          <div className="card">
            <h3>Access Control</h3>
            <ul>
              <li><strong>viewer</strong>: read-only reports and dashboard</li>
              <li><strong>editor</strong>: ideation, media, campaigns</li>
              <li><strong>admin</strong>: all features</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
