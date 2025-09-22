import React, { useMemo, useRef, useState } from 'react';
import { assets as seed } from '../utils/mockData';
import { useAuth } from '../context/AuthContext';

function Compatibility({ status }) {
  const map = { ok: 'success', warn: 'warning', fail: 'danger' };
  const label = { ok: 'Compliant', warn: 'Review', fail: 'Not compliant' };
  return <span className={`pill ${map[status]}`}>{label[status]}</span>;
}

export default function MediaManager() {
  const [assets, setAssets] = useState(seed);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const inputRef = useRef(null);
  const { user } = useAuth();

  const filtered = useMemo(() => {
    return assets.filter(a => {
      const matchesQuery = a.name.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === 'all' ? true : Object.values(a.compatibility).includes(filter);
      return matchesQuery && matchesFilter;
    });
  }, [assets, query, filter]);

  const onUpload = (evt) => {
    const files = Array.from(evt.target.files || []);
    const newOnes = files.map((f, idx) => ({
      id: `local-${Date.now()}-${idx}`,
      name: f.name,
      type: f.type.startsWith('video') ? 'video' : 'image',
      size: `${(f.size/1024/1024).toFixed(1)}MB`,
      duration: f.type.startsWith('video') ? '00:15' : '-',
      resolution: f.type.startsWith('video') ? '1080x1920' : '1920x1080',
      tags: ['uploaded'],
      compatibility: { tiktok: 'warn', meta: 'ok', youtube: 'ok' }, // mock
      file: f,
    }));
    setAssets(prev => [...newOnes, ...prev]);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="grid">
      <section className="card">
        <h2 className="section-title">Media Asset Management</h2>
        <div className="grid grid-2">
          <div className="card">
            <div className="field">
              <label className="muted">Upload Images/Videos</label>
              <input ref={inputRef} type="file" accept="image/*,video/*" multiple onChange={onUpload} className="input" aria-label="Upload media" />
              <p className="muted">Files are listed immediately. Compatibility indicators will help you optimize.</p>
            </div>
          </div>
          <div className="card">
            <div className="field">
              <label className="muted" htmlFor="q">Search</label>
              <input id="q" className="input" placeholder="Search by name..." value={query} onChange={e => setQuery(e.target.value)} />
            </div>
            <div className="field">
              <label className="muted" htmlFor="f">Filter by compatibility</label>
              <select id="f" className="select" value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="ok">Compliant</option>
                <option value="warn">Needs review</option>
                <option value="fail">Not compliant</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="section-title">Assets</h2>
        <div className="grid">
          <table className="table" role="table" aria-label="Assets table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Duration</th>
                <th>Resolution</th>
                <th>Tags</th>
                <th>Meta</th>
                <th>TikTok</th>
                <th>YouTube</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(asset => (
                <tr key={asset.id}>
                  <td>{asset.name}</td>
                  <td>{asset.type}</td>
                  <td>{asset.size}</td>
                  <td>{asset.duration}</td>
                  <td>{asset.resolution}</td>
                  <td>{asset.tags.map(t => <span key={t} className="pill" style={{marginRight:6}}>{t}</span>)}</td>
                  <td><Compatibility status={asset.compatibility.meta} /></td>
                  <td><Compatibility status={asset.compatibility.tiktok} /></td>
                  <td><Compatibility status={asset.compatibility.youtube} /></td>
                  <td>
                    <div className="flex gap-8">
                      <button className="btn secondary">Feedback</button>
                      <button className="btn">Upload to Platform</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="10"><em>No assets found.</em></td></tr>
              )}
            </tbody>
          </table>
          <p className="muted">Note: Actions call backend APIs. Your role is "{user?.role}".</p>
        </div>
      </section>
    </div>
  );
}
