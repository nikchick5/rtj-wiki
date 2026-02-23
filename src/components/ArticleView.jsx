import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';

const MODULE_COLORS = {
  'F&B': '#e67e22',
  'Membership': '#3498db',
  'Tee Sheet': '#27ae60',
  'Reports': '#9b59b6',
  'Register': '#e74c3c'
};

// Simple markdown-to-HTML renderer for the subset we use
function renderMarkdown(text) {
  let html = text
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="article-screenshot" loading="lazy" />')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Ordered lists
    .replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>');

  // Blockquotes (lines starting with >)
  html = html.replace(/((?:^>.*$\n?)+)/gm, (match) => {
    const inner = match.replace(/^> ?/gm, '').trim();
    return `<blockquote>${inner}</blockquote>`;
  });

  // Wrap consecutive <li> in <ul> or <ol>
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

  // Paragraphs for remaining text
  html = html.split('\n\n').map(block => {
    if (block.startsWith('<h') || block.startsWith('<ul') || block.startsWith('<ol') || block.startsWith('<blockquote') || block.startsWith('<img')) {
      return block;
    }
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<')) return trimmed;
    return `<p>${trimmed.replace(/\n/g, '<br/>')}</p>`;
  }).join('\n');

  return html;
}

function HelpfulVote({ articleId, initialVotes }) {
  const [votes, setVotes] = useState(initialVotes || { up: 0, down: 0 });
  const [voted, setVoted] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setVotes(initialVotes || { up: 0, down: 0 });
    setVoted(null);
  }, [articleId]);

  const submitVote = async (vote) => {
    if (voted || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/articles/${articleId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vote })
      });
      const data = await res.json();
      setVotes(data);
      setVoted(vote);
    } catch (e) {
      // silently fail
    }
    setSubmitting(false);
  };

  const total = Number(votes.up) + Number(votes.down);
  const pct = total > 0 ? Math.round((Number(votes.up) / total) * 100) : null;

  return (
    <div className="helpful-vote">
      <div className="helpful-vote-question">
        <span>Was this article helpful?</span>
        {pct !== null && (
          <span className="helpful-vote-stat">{pct}% found this helpful</span>
        )}
      </div>
      <div className="helpful-vote-buttons">
        <button
          className={`helpful-btn helpful-btn-up ${voted === 1 ? 'voted' : ''}`}
          onClick={() => submitVote(1)}
          disabled={voted !== null || submitting}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
            <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          Yes ({Number(votes.up)})
        </button>
        <button
          className={`helpful-btn helpful-btn-down ${voted === -1 ? 'voted' : ''}`}
          onClick={() => submitVote(-1)}
          disabled={voted !== null || submitting}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
            <path d="M17 2h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
          </svg>
          No ({Number(votes.down)})
        </button>
      </div>
      {voted && (
        <p className="helpful-vote-thanks">Thanks for your feedback!</p>
      )}
    </div>
  );
}

function PeopleAlsoAsked({ questions }) {
  const [openId, setOpenId] = useState(null);

  if (!questions || questions.length === 0) return null;

  return (
    <div className="people-also-asked">
      <h4>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        People Also Asked
      </h4>
      <div className="paa-list">
        {questions.map(q => (
          <div key={q.id} className={`paa-item ${openId === q.id ? 'open' : ''}`}>
            <button className="paa-question" onClick={() => setOpenId(openId === q.id ? null : q.id)}>
              <span>{q.question}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="paa-chevron">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {openId === q.id && (
              <div className="paa-answer">{q.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MediaSection({ media }) {
  if (!media || media.length === 0) return null;

  const screenshots = media.filter(m => m.type === 'screenshot');
  const videos = media.filter(m => m.type === 'video');

  // Extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="media-section">
      <h4>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="2" y1="7" x2="7" y2="7" />
          <line x1="2" y1="17" x2="7" y2="17" />
          <line x1="17" y1="7" x2="22" y2="7" />
          <line x1="17" y1="17" x2="22" y2="17" />
        </svg>
        Screenshots & Videos
      </h4>
      {screenshots.length > 0 && (
        <div className="media-screenshots">
          {screenshots.map(s => (
            <figure key={s.id} className="media-screenshot">
              <img src={s.url} alt={s.caption} loading="lazy" />
              {s.caption && <figcaption>{s.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
      {videos.length > 0 && (
        <div className="media-videos">
          {videos.map(v => {
            const ytId = getYouTubeId(v.url);
            return (
              <div key={v.id} className="media-video">
                {ytId ? (
                  <div className="video-embed">
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}`}
                      title={v.caption}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <a href={v.url} target="_blank" rel="noopener noreferrer" className="video-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    {v.caption || 'Watch Video'}
                  </a>
                )}
                {v.caption && ytId && <p className="video-caption">{v.caption}</p>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ArticleView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const contentRef = useRef(null);

  // Attach click handlers to screenshots for lightbox
  useEffect(() => {
    if (!contentRef.current) return;
    const imgs = contentRef.current.querySelectorAll('.article-screenshot');
    const handler = (e) => setLightboxSrc(e.target.src);
    imgs.forEach(img => img.addEventListener('click', handler));
    return () => imgs.forEach(img => img.removeEventListener('click', handler));
  }, [article]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/articles/${id}`)
      .then(r => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(data => {
        setArticle(data);
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch(() => {
        setArticle(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="article-view-loading">
        <div className="spinner" />
        <p>Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-view-empty">
        <h2>Article Not Found</h2>
        <p>The article you're looking for doesn't exist.</p>
        <Link to="/" className="btn-back">Back to Articles</Link>
      </div>
    );
  }

  const color = MODULE_COLORS[article.module] || '#666';
  const allRelated = [
    ...(article.related || []),
    ...(article.keywordRelated || []).map(r => ({ ...r, fromKeywords: true }))
  ];

  return (
    <article className="article-view">
      <Breadcrumb module={article.module} title={article.title} />

      <header className="article-view-header">
        <div className="article-view-badges">
          <span className="article-module-badge" style={{ backgroundColor: color }}>
            {article.module}
          </span>
          <span className={`article-role-badge ${article.role}`}>
            {article.role}
          </span>
          <span className="article-version-badge">v{article.version}</span>
        </div>
        <h1 className="article-view-title">{article.title}</h1>
        <div className="article-view-meta">
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Updated {new Date(article.date_updated + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        </header>

      <div
        ref={contentRef}
        className="article-view-content"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
      />

      {lightboxSrc && (
        <div className="lightbox-overlay" onClick={() => setLightboxSrc(null)}>
          <button className="lightbox-close" onClick={() => setLightboxSrc(null)}>&times;</button>
          <img src={lightboxSrc} alt="Screenshot" className="lightbox-img" />
        </div>
      )}

      <MediaSection media={article.media} />

      <HelpfulVote articleId={article.id} initialVotes={article.votes} />

      <PeopleAlsoAsked questions={article.questions} />

      {article.keywords && (
        <div className="article-view-keywords">
          <h4>Keywords</h4>
          <div className="keyword-tags">
            {article.keywords.split(',').map((kw, i) => (
              <span key={i} className="keyword-tag">{kw.trim()}</span>
            ))}
          </div>
        </div>
      )}

      {allRelated.length > 0 && (
        <div className="article-view-related">
          <h4>Related Articles</h4>
          <div className="related-list">
            {allRelated.map(r => (
              <Link key={r.id} to={`/article/${r.id}`} className="related-card">
                <span className="related-module" style={{ backgroundColor: MODULE_COLORS[r.module] || '#666' }}>
                  {r.module}
                </span>
                <span className="related-title">{r.title}</span>
                {r.fromKeywords && (
                  <span className="related-keyword-badge">Shared keywords</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
