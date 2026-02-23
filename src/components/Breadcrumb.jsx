import { Link } from 'react-router-dom';

export default function Breadcrumb({ module, title }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link to="/" className="breadcrumb-link">Club Caddie</Link>
        </li>
        <li className="breadcrumb-separator" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/?module=${encodeURIComponent(module)}`} className="breadcrumb-link">
            {module}
          </Link>
        </li>
        <li className="breadcrumb-separator" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </li>
        <li className="breadcrumb-item breadcrumb-current" aria-current="page">
          {title}
        </li>
      </ol>
    </nav>
  );
}
