import { Link, useLocation } from 'react-router-dom';

export default function Header({ onToggleSidebar, onGoHome }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onToggleSidebar} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <Link to="/" className="logo" onClick={onGoHome}>
          <img src="/rtj-logo.png" alt="RTJ Golf Trail" className="logo-img" />
        </Link>
      </div>

      <nav className="header-nav">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Knowledge Base
        </Link>
        <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
          Admin
        </Link>
      </nav>
    </header>
  );
}
