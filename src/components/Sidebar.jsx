const MODULE_ICONS = {
  'F&B': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  'Membership': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  'Tee Sheet': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  'Reports': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  'Register': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  )
};

import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ modules, activeModule, activeRole, onModuleFilter, onRoleFilter, isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-section">
          <h3 className="sidebar-heading">Modules</h3>
          <ul className="sidebar-list">
            {modules.map(m => (
              <li key={m.module}>
                <button
                  className={`sidebar-item ${activeModule === m.module ? 'active' : ''}`}
                  onClick={() => { onModuleFilter(m.module); onClose(); }}
                >
                  <span className="sidebar-item-icon">{MODULE_ICONS[m.module]}</span>
                  <span className="sidebar-item-label">{m.module}</span>
                  <span className="sidebar-item-count">{m.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar-section">
          <h3 className="sidebar-heading">Role</h3>
          <ul className="sidebar-list">
            {['staff', 'manager'].map(role => (
              <li key={role}>
                <button
                  className={`sidebar-item ${activeRole === role ? 'active' : ''}`}
                  onClick={() => { onRoleFilter(role); onClose(); }}
                >
                  <span className="sidebar-item-icon">
                    {role === 'manager' ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 15l-2 5l9-11h-5l2-5l-9 11h5z" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                      </svg>
                    )}
                  </span>
                  <span className="sidebar-item-label">{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar-section">
          <h3 className="sidebar-heading">Manage</h3>
          <ul className="sidebar-list">
            <li>
              <Link
                to="/admin"
                className={`sidebar-item ${location.pathname === '/admin' ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className="sidebar-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                  </svg>
                </span>
                <span className="sidebar-item-label">Admin Panel</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-section sidebar-footer">
          <p className="sidebar-note">Robert Trent Jones Golf Trail</p>
          <p className="sidebar-note">Club Caddie Documentation</p>
        </div>
      </aside>
    </>
  );
}
