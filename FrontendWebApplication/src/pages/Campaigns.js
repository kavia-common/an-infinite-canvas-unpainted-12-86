import React, { useMemo, useState } from 'react';
import { assets as seed } from '../utils/mockData';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function Campaigns() {
  const [assets] = useState(seed);
  const [selected, setSelected] = useState({});
  const [platforms, setPlatforms] = useState({ meta: true, tiktok: true, youtube: false });
  const [status, setStatus] = useState([]);
  const { token } = useAuth();

  const compliantAssets = useMemo(() => {
    return assets.filter(a => Object.entries(platforms).every(([k, v]) => !v || a.compatibility[k] === 'ok'));
  }, [assets, platforms]);

  const toggleSel = (id) => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const launch = async () => {
    const selectedIds = Object.entries(selected).filter(([_, v]) => v).map(([id]) => id);
    if (selectedIds.length === 0) {
      setStatus([{ type: 'danger', message: 'No assets selected.' }]);
      return;
    }
    setStatus([{ type: 'warning', message: 'Launching campaign...'}]);
    try {
      // const res = await api.post('/campaigns/launch', { assets: selectedIds, platforms }, { token });
      await new Promise(r => setTimeout(r, 800)); // mock
      setStatus([
        { type: 'success', message: `Launched to: ${Object.keys(platforms).filter(p => platforms[p]).join(', ')}` },
        { type: 'success', message: `Assets: ${selectedIds.join(', ')}` }
      ]);
    } catch (e) {
      setStatus([{ type: 'danger', message: e.message }]);
    }
  };

  return (
    <div className="grid">
      <section className="card">
        <h2 className="section-title">Ad Creation & Multi-Platform Launch</h2>
        <div className="grid grid-2">
          <div className="card">
            <h3>Platforms</h3>
            {['meta','tiktok','youtube'].map(p => (
              <label key={p} className="flex items-center gap-8 mb-8">
                <input type="checkbox" checked={platforms[p]} onChange={e => setPlatforms(prev => ({ ...prev, [p]: e.target.checked }))} />
                {p[0].toUpperCase()+p.slice(1)}
              </label>
            ))}
            <p className="muted">Only compliant assets remain selectable.</p>
          </div>
          <div className="card">
            <h3>Select Assets</h3>
            <ul>
              {compliantAssets.map(a => (
                <li key={a.id} className="flex items-center justify-between mb-8">
                  <label className="flex items-center gap-8">
                    <input type="checkbox" checked={!!selected[a.id]} onChange={() => toggleSel(a.id)} />
                    {a.name}
                  </label>
                  <span className="pill success">Compliant</span>
                </li>
              ))}
              {compliantAssets.length === 0 && <li><em>No compliant assets for selected platforms.</em></li>}
            </ul>
            <button className="btn" onClick={launch}>Launch Campaign</button>
          </div>
        </div>
      </section>

      {status.length > 0 && (
        <section className="card">
          <h3>Deployment Status</h3>
          <ul>
            {status.map((s, idx) => <li key={idx}><span className={`pill ${s.type}`}>{s.type.toUpperCase()}</span> {s.message}</li>)}
          </ul>
        </section>
      )}
    </div>
  );
}
