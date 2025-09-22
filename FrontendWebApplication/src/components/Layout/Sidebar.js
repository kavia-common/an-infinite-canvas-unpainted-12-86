import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/home', label: 'Home', icon: '🏠', roles: ['viewer','editor','admin'] },
  { to: '/ideation', label: 'Ideation', icon: '🧠', roles: ['editor','admin'] },
  { to: '/media', label: 'Media', icon: '🎞️', roles: ['editor','admin'] },
  { to: '/campaigns', label: 'Campaigns', icon: '🚀', roles: ['editor','admin'] },
  { to: '/reports', label: 'Reports', icon: '📊', roles: ['viewer','editor','admin'] },
  { to: '/settings', label: 'Settings', icon: '⚙️', roles: ['viewer','editor','admin'] },
  { to: '/help', label: 'Help', icon: '❓', roles: ['viewer','editor','admin'] },
];

export default function Sidebar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar" aria-label="Primary">
      <div className="sidebar-brand">
        <div className="brand-icon" aria-hidden>🟦</div>
        <div className="brand-name">Blu Suite</div>
      </div>
      <nav className="sidebar-nav">
        {navItems
          .filter(item => !isAuthenticated ? item.to === '/help' : item.roles.includes(user?.role ?? 'viewer'))
          .map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="icon" aria-hidden>{item.icon}</span>
              <span className="label">{item.label}</span>
            </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        {!isAuthenticated ? (
          <NavLink to="/login" className="btn secondary" aria-label="Log in">Sign in</NavLink>
        ) : (
          <button className="btn ghost" onClick={handleLogout} aria-label="Log out">Log out</button>
        )}
        {isAuthenticated && (
          <div className="user-pill" aria-live="polite">
            <span className="avatar" aria-hidden>{user?.name?.[0]?.toUpperCase() || 'U'}</span>
            <div className="meta">
              <div className="name">{user?.name}</div>
              <div className="role pill">{user?.role}</div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .sidebar {
          background: var(--card);
          border-right: 1px solid var(--border);
          min-height: 100vh;
          padding: 16px 12px;
          display: grid;
          grid-template-rows: auto 1fr auto;
          gap: 12px;
        }
        .sidebar-brand {
          display: flex; align-items: center; gap: 10px;
          font-weight: 800; color: var(--blue-600);
        }
        .brand-icon { font-size: 20px; }
        .brand-name { letter-spacing: .5px; }
        .sidebar-nav { display: grid; gap: 6px; }
        .sidebar-link {
          display: grid; grid-template-columns: 28px 1fr; align-items: center;
          gap: 8px; padding: 10px 10px; border-radius: 10px; color: var(--muted);
          text-decoration: none; border: 1px solid transparent;
        }
        .sidebar-link:hover { background: var(--blue-50); color: var(--blue-600); }
        .sidebar-link.active {
          border-color: var(--blue-400); background: var(--blue-50); color: var(--blue-600);
        }
        .sidebar-footer { display: grid; gap: 10px; }
        .user-pill {
          display: grid; grid-template-columns: 36px 1fr; gap: 8px; align-items: center;
          padding: 8px; border: 1px solid var(--border); border-radius: 12px;
          background: var(--card);
        }
        .avatar {
          width: 32px; height: 32px; border-radius: 999px; background: var(--blue-600);
          display: inline-grid; place-items: center; color: #fff; font-weight: 700;
        }
        .meta .name { font-weight: 700; }
        .meta .role { font-size: 12px; }
        @media (max-width: 1024px) {
          .brand-name, .label { display: none; }
          .sidebar { padding: 16px 8px; }
          .sidebar-link { grid-template-columns: 1fr; justify-items: center; }
        }
      `}</style>
    </aside>
  );
}
