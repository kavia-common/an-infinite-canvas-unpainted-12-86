import React, { useState } from 'react';
import { attributesEnglish, attributesTalent, performers } from '../utils/mockData';

export default function IdeationBoard() {
  const [ideas, setIdeas] = useState([
    { id: 'i1', title: 'Summer Splash UGC', notes: '15s vertical, captions, strong CTA', comments: ['Love this direction', 'Test with alt hooks'] },
    { id: 'i2', title: 'Founder Story', notes: '30s horizontal, brand-driven', comments: ['Needs tighter intro'] },
  ]);
  const [newIdea, setNewIdea] = useState('');

  const addIdea = () => {
    if (!newIdea.trim()) return;
    setIdeas(prev => [{ id: crypto.randomUUID(), title: newIdea.trim(), notes: '', comments: [] }, ...prev]);
    setNewIdea('');
  };

  return (
    <div className="grid">
      <section className="card">
        <h2 className="section-title">Creative Ideation Workspace</h2>
        <div className="field">
          <label htmlFor="idea" className="muted">Add Idea</label>
          <div className="flex gap-8">
            <input id="idea" className="input" value={newIdea} onChange={e => setNewIdea(e.target.value)} placeholder="New creative concept..." />
            <button className="btn" onClick={addIdea} aria-label="Add idea">Add</button>
          </div>
        </div>
        <div className="grid grid-2 mt-16">
          {ideas.map(card => (
            <div key={card.id} className="card">
              <h3>{card.title}</h3>
              <p className="muted">{card.notes || 'No notes yet.'}</p>
              <div className="mt-16">
                <strong>Comments</strong>
                <ul>
                  {card.comments.map((c, idx) => <li key={idx} className="mb-8">• {c}</li>)}
                </ul>
                <button className="btn secondary">Add comment</button>
              </div>
            </div>
          ))}
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
          <div className="card"><h3>Players</h3>{performers.players.map((p, idx) => <div key={idx} className="flex items-center justify-between mb-8"><span>{p.name}</span><span className={`pill ${p.type}`}>{p.delta}</span></div>)}</div>
          <div className="card"><h3>Non-Players</h3>{performers.nonPlayers.map((p, idx) => <div key={idx} className="flex items-center justify-between mb-8"><span>{p.name}</span><span className={`pill ${p.type}`}>{p.delta}</span></div>)}</div>
        </div>
      </section>
    </div>
  );
}
