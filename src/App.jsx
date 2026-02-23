import { useState, useEffect, useCallback, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ArticleList from './components/ArticleList';
import ArticleView from './components/ArticleView';
import Admin from './components/Admin';

const FUSE_OPTIONS = {
  keys: [
    { name: 'title', weight: 0.35 },
    { name: 'keywords', weight: 0.3 },
    { name: 'content', weight: 0.25 },
    { name: 'module', weight: 0.1 }
  ],
  threshold: 0.4,
  distance: 200,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2
};

export default function App() {
  const [articles, setArticles] = useState([]);
  const [modules, setModules] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [activeRole, setActiveRole] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fuse, setFuse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load search index and modules on mount
  useEffect(() => {
    Promise.all([
      fetch('/api/articles/search-index').then(r => r.json()),
      fetch('/api/modules').then(r => r.json())
    ]).then(([articlesData, modulesData]) => {
      setArticles(articlesData);
      setModules(modulesData);
      setFuse(new Fuse(articlesData, FUSE_OPTIONS));
      setLoading(false);
    });
  }, []);

  // Debounced search for performance with many articles
  const searchTimer = useRef(null);
  const handleSearch = useCallback((query) => {
    if (!query.trim()) {
      setSearchResults(null);
      if (searchTimer.current) clearTimeout(searchTimer.current);
      return;
    }
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      if (fuse) {
        const results = fuse.search(query);
        setSearchResults(results.map(r => ({ ...r.item, score: r.score })));
      }
    }, 150);
  }, [fuse]);

  const handleModuleFilter = useCallback((mod) => {
    setActiveModule(mod === activeModule ? null : mod);
    setSearchResults(null);
    navigate('/');
  }, [activeModule, navigate]);

  const handleRoleFilter = useCallback((role) => {
    setActiveRole(role === activeRole ? null : role);
  }, [activeRole]);

  const handleGoHome = () => {
    setSearchResults(null);
    setActiveModule(null);
  };

  const filteredArticles = (searchResults || articles).filter(a => {
    if (activeModule && a.module !== activeModule) return false;
    if (activeRole && a.role !== activeRole) return false;
    return true;
  });

  return (
    <div className="app">
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onGoHome={handleGoHome}
      />
      <div className="app-body">
        <Sidebar
          modules={modules}
          activeModule={activeModule}
          activeRole={activeRole}
          onModuleFilter={handleModuleFilter}
          onRoleFilter={handleRoleFilter}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <ArticleList
                  articles={filteredArticles}
                  loading={loading}
                  searchActive={searchResults !== null}
                  activeModule={activeModule}
                  onSearch={handleSearch}
                />
              }
            />
            <Route path="/article/:id" element={<ArticleView />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
