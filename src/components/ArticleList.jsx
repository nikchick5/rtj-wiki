import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const MODULE_COLORS = {
  'F&B': '#e67e22',
  'Membership': '#3498db',
  'Tee Sheet': '#27ae60',
  'Reports': '#9b59b6',
  'Register': '#e74c3c'
};

const MODULE_ICONS = {
  'F&B': (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  'Membership': (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  'Tee Sheet': (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  'Reports': (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  'Register': (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  )
};

function ArticleCard({ article }) {
  const color = MODULE_COLORS[article.module] || '#666';
  const icon = MODULE_ICONS[article.module];

  // Generate a short description from content (first ~120 chars of text)
  const desc = article.content
    ? article.content.replace(/[#*_\[\]`>-]/g, '').substring(0, 120).trim() + '...'
    : '';

  return (
    <Link to={`/article/${article.id}`} className="article-card">
      <span className="article-module-text" style={{ color }}>{article.module}</span>
      <h3 className="article-card-title">{article.title}</h3>
      {desc && <p className="article-card-desc">{desc}</p>}
      <div className="article-card-meta">
        <span className="article-date">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {new Date(article.date_updated + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>
    </Link>
  );
}

function HeroSearch({ onSearch }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <section className="hero-search">
      <h1 className="hero-search-label">How can we help you?</h1>
      <form className="hero-search-form" onSubmit={handleSubmit}>
        <div className="hero-search-wrapper">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="hero-search-input"
            placeholder='Search articles, keywords... (press "/" to focus)'
            value={query}
            onChange={handleChange}
          />
          {query && (
            <button type="button" className="hero-search-clear" onClick={handleClear} aria-label="Clear search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
          <button type="submit" className="hero-search-btn">Search</button>
        </div>
      </form>
    </section>
  );
}

function RecentlyUpdated() {
  const [recent, setRecent] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/articles/recent?limit=5')
      .then(r => r.json())
      .then(data => { setRecent(data); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, []);

  if (!loaded || recent.length === 0) return null;

  return (
    <section className="recently-updated">
      <div className="recently-updated-header">
        <h3>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Recently Updated
        </h3>
      </div>
      <div className="recently-updated-list">
        {recent.map(article => {
          const color = MODULE_COLORS[article.module] || '#666';
          return (
            <Link key={article.id} to={`/article/${article.id}`} className="recent-item">
              <span className="article-module-text" style={{ color }}>
                {article.module}
              </span>
              <span className="recent-item-title">{article.title}</span>
              <span className="recent-item-date">
                {new Date(article.date_updated + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default function ArticleList({ articles, loading, searchActive, activeModule, onSearch }) {
  if (loading) {
    return (
      <div className="article-list-empty">
        <div className="spinner" />
        <p>Loading articles...</p>
      </div>
    );
  }

  const heading = searchActive
    ? `Search Results (${articles.length})`
    : activeModule
      ? `${activeModule} Articles`
      : 'All Articles';

  const showRecent = !searchActive && !activeModule;

  return (
    <div className="article-list">
      {!searchActive && <HeroSearch onSearch={onSearch} />}

      <div style={{ paddingTop: searchActive ? '0' : '32px' }}>
        {showRecent && <RecentlyUpdated />}

        <div className="article-list-header">
          <h2>{heading}</h2>
          <span className="article-count">{articles.length} article{articles.length !== 1 ? 's' : ''}</span>
        </div>

        {articles.length === 0 ? (
          <div className="article-list-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p>No articles found.</p>
            <p className="text-muted">Try a different search term or filter.</p>
          </div>
        ) : (
          <div className="article-grid">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
