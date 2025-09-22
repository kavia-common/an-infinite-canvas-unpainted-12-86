import React from 'react';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { theme, toggleTheme } = useUI();
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="topbar" role="banner">
      <div className="left">
        <h1 className="app-title">Blu Creative Suite</h1>
      </div>
      <div className="right">
        <label className="visually-hidden" htmlFor="search">Search</label>
        <input id="search" className="input" placeholder="Search projects, assets, campaigns..." />
        <button className="btn secondary" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        {isAuthenticated && <span className="pill" aria-live="polite">Signed in as {user?.name}</span>}
      </div>
      <style>{`
        .topbar {
          position: sticky; top: 0; z-index: 10;
          background: var(--card);
          border-bottom: 1px solid var(--border);
          padding: 12px 24px;
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
        }
        .app-title { font-size: 18px; color: var(--blue-600); margin: 0; }
        .right { display: flex; gap: 8px; align-items: center; }
        @media (max-width: 640px) {
          .app-title { font-size: 16px; }
          #search { display: none; }
        }
      `}</style>
    </header>
  );
}
