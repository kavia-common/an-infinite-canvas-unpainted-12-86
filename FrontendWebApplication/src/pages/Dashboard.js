import React from 'react';
import { attributesEnglish, attributesTalent, performers } from '../utils/mockData';

export default function Dashboard() {
  return (
    <div className="grid grid-2">
      <section className="card">
        <h2 className="section-title">Brand & Creative People</h2>
        <p className="mb-8">Welcome back! Here is a quick overview of your creative and campaign performance.</p>
        <div className="grid grid-3">
          <div className="card">
            <div className="muted">Active Campaigns</div>
            <h3 style={{margin:0, fontSize:24}}>12</h3>
          </div>
          <div className="card">
            <div className="muted">Assets</div>
            <h3 style={{margin:0, fontSize:24}}>348</h3>
          </div>
          <div className="card">
            <div className="muted">Avg. CTR</div>
            <h3 style={{margin:0, fontSize:24}}>2.9%</h3>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="section-title">Attributes Summary</h2>
        <div className="grid grid-2">
          <div className="card">
            <h3>Top Wingman English Attributes</h3>
            <table className="table" role="table">
              <thead>
                <tr><th>Attribute</th><th>Score</th></tr>
              </thead>
              <tbody>
                {attributesEnglish.map(row => (
                  <tr key={row.attribute}>
                    <td>{row.attribute}</td>
                    <td><span className="pill success">{row.score}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card">
            <h3>Top Wingman Talent Attributes</h3>
            <table className="table" role="table">
              <thead>
                <tr><th>Attribute</th><th>Score</th></tr>
              </thead>
              <tbody>
                {attributesTalent.map(row => (
                  <tr key={row.attribute}>
                    <td>{row.attribute}</td>
                    <td><span className="pill success">{row.score}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="card" style={{gridColumn:'1 / -1'}}>
        <h2 className="section-title">Content Over and Under Performers</h2>
        <div className="grid grid-2">
          <div className="card">
            <h3>Players</h3>
            <ul>
              {performers.players.map((p, idx) => (
                <li key={idx} className="flex items-center justify-between mb-8">
                  <div>
                    <strong>{p.name}</strong>
                    <div className="muted">{p.detail}</div>
                  </div>
                  <span className={`pill ${p.type}`}>{p.delta}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>Non-Players</h3>
            <ul>
              {performers.nonPlayers.map((p, idx) => (
                <li key={idx} className="flex items-center justify-between mb-8">
                  <div>
                    <strong>{p.name}</strong>
                    <div className="muted">{p.detail}</div>
                  </div>
                  <span className={`pill ${p.type}`}>{p.delta}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
