import React from 'react';
import { getApiBase } from '../services/api';

export default function Help() {
  return (
    <div className="grid">
      <section className="card">
        <h2 className="section-title">Help & Documentation</h2>
        <p>Welcome to Blu Creative Suite. Use the sidebar to navigate across modules.</p>
        <ul>
          <li>Dashboard: overview, attributes, performers</li>
          <li>Ideation: collaborate on creative concepts</li>
          <li>Media: upload and manage assets</li>
          <li>Campaigns: select compliant assets and launch</li>
          <li>Reports: view performance analytics</li>
          <li>Settings: profile and access</li>
        </ul>
        <p className="muted">API Base: {getApiBase()}</p>
      </section>
    </div>
  );
}
