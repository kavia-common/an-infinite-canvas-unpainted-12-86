import React from 'react';
import { attributesEnglish, attributesTalent, performers } from '../utils/mockData';

export default function Reports() {
  return (
    <div className="grid">
      <section className="card">
        <h2 className="section-title">Reporting & Analytics</h2>
        <div className="grid grid-3">
          <div className="card">
            <div className="muted">Spend</div>
            <h3 style={{margin:0}}>$128,400</h3>
          </div>
          <div className="card">
            <div className="muted">Impressions</div>
            <h3 style={{margin:0}}>14.2M</h3>
          </div>
          <div className="card">
            <div className="muted">Conversions</div>
            <h3 style={{margin:0}}>6,320</h3>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="section-title">Attributes Summary</h2>
        <div className="grid grid-2">
          <div className="card">
            <h3>Top Wingman English Attributes</h3>
            <ul>
              {attributesEnglish.map(a => <li key={a.attribute} className="flex items-center justify-between mb-8"><span>{a.attribute}</span><span className="pill success">{a.score}</span></li>)}
            </ul>
          </div>
          <div className="card">
            <h3>Top Wingman Talent Attributes</h3>
            <ul>
              {attributesTalent.map(a => <li key={a.attribute} className="flex items-center justify-between mb-8"><span>{a.attribute}</span><span className="pill success">{a.score}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="section-title">Content Over and Under Performers</h2>
        <div className="grid grid-2">
          <div className="card">
            <h3>Players</h3>
            {performers.players.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between mb-8">
                <span>{p.name}</span><span className={`pill ${p.type}`}>{p.delta}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <h3>Non-Players</h3>
            {performers.nonPlayers.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between mb-8">
                <span>{p.name}</span><span className={`pill ${p.type}`}>{p.delta}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
