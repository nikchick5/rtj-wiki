import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getDb, saveDb, initialize, seed, queryAll, queryOne } from './database.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;
const distPath = path.join(__dirname, 'dist');
const isProduction = process.env.NODE_ENV === 'production' || fs.existsSync(path.join(distPath, 'index.html'));

app.use(express.json());

// Serve public folder for uploaded images (accessible in all environments)
app.use(express.static(path.join(__dirname, 'public')));

// Serve built React app in production
if (isProduction) {
  app.use(express.static(distPath));
}

// --- API Routes ---

// Get all articles (with optional module/role filters)
app.get('/api/articles', async (req, res) => {
  const db = await getDb();
  const { module, role } = req.query;

  let sql = `SELECT a.id, a.title, a.module, a.keywords, a.role, a.date_updated, a.version, a.cc_version,
    COALESCE(v.up, 0) as votes_up, COALESCE(v.down, 0) as votes_down
    FROM articles a
    LEFT JOIN (
      SELECT article_id,
        SUM(CASE WHEN vote = 1 THEN 1 ELSE 0 END) as up,
        SUM(CASE WHEN vote = -1 THEN 1 ELSE 0 END) as down
      FROM votes GROUP BY article_id
    ) v ON v.article_id = a.id
    WHERE 1=1`;
  const params = [];

  if (module) {
    sql += ' AND a.module = ?';
    params.push(module);
  }
  if (role) {
    sql += ' AND a.role = ?';
    params.push(role);
  }

  sql += ' ORDER BY a.date_updated DESC';

  const articles = queryAll(db, sql, params);
  res.json(articles);
});

// Get recently updated articles (top N)
app.get('/api/articles/recent', async (req, res) => {
  const db = await getDb();
  const limit = Math.min(parseInt(req.query.limit) || 5, 10);
  const articles = queryAll(db,
    `SELECT a.id, a.title, a.module, a.keywords, a.role, a.date_updated, a.version, a.cc_version,
      COALESCE(v.up, 0) as votes_up, COALESCE(v.down, 0) as votes_down
    FROM articles a
    LEFT JOIN (
      SELECT article_id,
        SUM(CASE WHEN vote = 1 THEN 1 ELSE 0 END) as up,
        SUM(CASE WHEN vote = -1 THEN 1 ELSE 0 END) as down
      FROM votes GROUP BY article_id
    ) v ON v.article_id = a.id
    ORDER BY a.date_updated DESC LIMIT ?`,
    [limit]
  );
  res.json(articles);
});

// Get all articles with full content (for client-side search indexing)
app.get('/api/articles/search-index', async (req, res) => {
  const db = await getDb();
  const articles = queryAll(db,
    'SELECT id, title, content, module, keywords, role, date_updated, version, cc_version FROM articles'
  );
  res.json(articles);
});

// Get single article by ID (includes manual related + keyword-based suggestions)
app.get('/api/articles/:id', async (req, res) => {
  const db = await getDb();
  const articleId = Number(req.params.id);
  const article = queryOne(db, 'SELECT * FROM articles WHERE id = ?', [articleId]);

  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }

  // Get manually linked related articles
  const manualRelated = queryAll(db, `
    SELECT a.id, a.title, a.module
    FROM related_articles ra
    JOIN articles a ON a.id = ra.related_id
    WHERE ra.article_id = ?
  `, [articleId]);

  // Get keyword-based suggestions: find articles sharing keywords with this one
  const manualIds = manualRelated.map(r => r.id);
  const excludeIds = [articleId, ...manualIds];
  let keywordRelated = [];

  if (article.keywords) {
    const kws = article.keywords.split(',').map(k => k.trim().toLowerCase()).filter(Boolean);
    if (kws.length > 0) {
      // Build LIKE conditions for each keyword
      const likeClauses = kws.map(() => 'LOWER(keywords) LIKE ?');
      const likeParams = kws.map(k => `%${k}%`);
      const placeholders = excludeIds.map(() => '?').join(',');

      // Parameter order must match SQL order: SELECT LIKEs, then WHERE NOT IN, then WHERE LIKEs
      const sql = `
        SELECT id, title, module,
          (${likeClauses.join(' + ')}) as match_count
        FROM articles
        WHERE id NOT IN (${placeholders})
          AND (${likeClauses.join(' OR ')})
        ORDER BY match_count DESC
        LIMIT 4
      `;

      keywordRelated = queryAll(db, sql, [...likeParams, ...excludeIds, ...likeParams]);
    }
  }

  // Get vote counts
  const voteCounts = queryOne(db, `
    SELECT
      COALESCE(SUM(CASE WHEN vote = 1 THEN 1 ELSE 0 END), 0) as up,
      COALESCE(SUM(CASE WHEN vote = -1 THEN 1 ELSE 0 END), 0) as down
    FROM votes WHERE article_id = ?
  `, [articleId]);

  // Get People Also Asked questions
  const questions = queryAll(db,
    'SELECT id, question, answer FROM article_questions WHERE article_id = ? ORDER BY id',
    [articleId]
  );

  // Get media embeds
  const media = queryAll(db,
    'SELECT id, type, url, caption FROM article_media WHERE article_id = ? ORDER BY sort_order',
    [articleId]
  );

  res.json({
    ...article,
    related: manualRelated,
    keywordRelated,
    votes: voteCounts || { up: 0, down: 0 },
    questions,
    media
  });
});

// Submit a vote (thumbs up/down)
app.post('/api/articles/:id/vote', async (req, res) => {
  const db = await getDb();
  const articleId = Number(req.params.id);
  const { vote } = req.body;

  if (vote !== 1 && vote !== -1) {
    return res.status(400).json({ error: 'Vote must be 1 (up) or -1 (down)' });
  }

  const article = queryOne(db, 'SELECT id FROM articles WHERE id = ?', [articleId]);
  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }

  const stmt = db.prepare('INSERT INTO votes (article_id, vote) VALUES (?, ?)');
  stmt.run([articleId, vote]);
  stmt.free();
  saveDb();

  // Return updated counts
  const counts = queryOne(db, `
    SELECT
      COALESCE(SUM(CASE WHEN vote = 1 THEN 1 ELSE 0 END), 0) as up,
      COALESCE(SUM(CASE WHEN vote = -1 THEN 1 ELSE 0 END), 0) as down
    FROM votes WHERE article_id = ?
  `, [articleId]);

  res.json(counts);
});

// Get available modules (from modules table, with article counts)
app.get('/api/modules', async (req, res) => {
  const db = await getDb();
  const modules = queryAll(db,
    `SELECT m.id, m.name as module, COALESCE(a.count, 0) as count
     FROM modules m
     LEFT JOIN (SELECT module, COUNT(*) as count FROM articles GROUP BY module) a ON a.module = m.name
     ORDER BY m.sort_order, m.name`
  );
  res.json(modules);
});

// Create a new module
app.post('/api/admin/modules', async (req, res) => {
  const db = await getDb();
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Module name is required' });
  }

  const existing = queryOne(db, 'SELECT id FROM modules WHERE name = ?', [name.trim()]);
  if (existing) {
    return res.status(409).json({ error: 'A module with that name already exists' });
  }

  const maxOrder = queryOne(db, 'SELECT MAX(sort_order) as mx FROM modules');
  const nextOrder = (maxOrder?.mx || 0) + 1;

  const stmt = db.prepare('INSERT INTO modules (name, sort_order) VALUES (?, ?)');
  stmt.run([name.trim(), nextOrder]);
  stmt.free();
  saveDb();

  const inserted = queryOne(db, 'SELECT last_insert_rowid() as id');
  res.json({ id: inserted.id, name: name.trim(), message: 'Module created' });
});

// Rename a module
app.put('/api/admin/modules/:id', async (req, res) => {
  const db = await getDb();
  const moduleId = Number(req.params.id);
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Module name is required' });
  }

  const existing = queryOne(db, 'SELECT id, name FROM modules WHERE id = ?', [moduleId]);
  if (!existing) {
    return res.status(404).json({ error: 'Module not found' });
  }

  const oldName = existing.name;
  const newName = name.trim();

  if (oldName === newName) {
    return res.json({ message: 'No change needed' });
  }

  // Check for name conflict
  const conflict = queryOne(db, 'SELECT id FROM modules WHERE name = ? AND id != ?', [newName, moduleId]);
  if (conflict) {
    return res.status(409).json({ error: 'A module with that name already exists' });
  }

  // Update module name
  const modStmt = db.prepare('UPDATE modules SET name = ? WHERE id = ?');
  modStmt.run([newName, moduleId]);
  modStmt.free();

  // Update all articles that reference the old module name
  const artStmt = db.prepare('UPDATE articles SET module = ? WHERE module = ?');
  artStmt.run([newName, oldName]);
  artStmt.free();

  saveDb();
  res.json({ message: 'Module renamed', oldName, newName });
});

// Delete a module (only if no articles use it)
app.delete('/api/admin/modules/:id', async (req, res) => {
  const db = await getDb();
  const moduleId = Number(req.params.id);

  const existing = queryOne(db, 'SELECT id, name FROM modules WHERE id = ?', [moduleId]);
  if (!existing) {
    return res.status(404).json({ error: 'Module not found' });
  }

  const articleCount = queryOne(db, 'SELECT COUNT(*) as cnt FROM articles WHERE module = ?', [existing.name]);
  if (articleCount && articleCount.cnt > 0) {
    return res.status(400).json({ error: `Cannot delete module "${existing.name}" — it has ${articleCount.cnt} article(s). Move or delete them first.` });
  }

  const stmt = db.prepare('DELETE FROM modules WHERE id = ?');
  stmt.run([moduleId]);
  stmt.free();
  saveDb();

  res.json({ message: 'Module deleted' });
});

// --- Admin API Routes ---

// Upload image for an article
app.post('/api/admin/upload-image',
  express.raw({ type: 'image/*', limit: '10mb' }),
  (req, res) => {
    const slug = (req.headers['x-article-slug'] || '').trim();
    if (!slug) {
      return res.status(400).json({ error: 'X-Article-Slug header is required' });
    }

    const sanitizedSlug = slug
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    if (!sanitizedSlug) {
      return res.status(400).json({ error: 'Invalid slug' });
    }

    const contentType = req.headers['content-type'] || '';
    const extMap = { 'image/png': '.png', 'image/jpeg': '.jpg', 'image/gif': '.gif', 'image/webp': '.webp' };
    const ext = extMap[contentType];
    if (!ext) {
      return res.status(400).json({ error: 'Unsupported image type: ' + contentType });
    }

    if (!req.body || req.body.length === 0) {
      return res.status(400).json({ error: 'Empty image body' });
    }

    const dirPath = path.join(__dirname, 'public', 'images', sanitizedSlug);
    try {
      fs.mkdirSync(dirPath, { recursive: true });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to create directory' });
    }

    // Find next step number
    let maxStep = 0;
    try {
      const existing = fs.readdirSync(dirPath);
      for (const f of existing) {
        const match = f.match(/^step-(\d+)\./);
        if (match) maxStep = Math.max(maxStep, parseInt(match[1], 10));
      }
    } catch (e) { /* empty dir */ }

    const nextNum = String(maxStep + 1).padStart(2, '0');
    const filename = `step-${nextNum}${ext}`;
    const filePath = path.join(dirPath, filename);

    try {
      fs.writeFileSync(filePath, req.body);
    } catch (e) {
      return res.status(500).json({ error: 'Failed to write image' });
    }

    res.json({ url: `/images/${sanitizedSlug}/${filename}`, filename });
  }
);

// Create article
app.post('/api/admin/articles', async (req, res) => {
  const db = await getDb();
  const { title, content, module, keywords, role, cc_version } = req.body;

  if (!title || !content || !module) {
    return res.status(400).json({ error: 'Title, content, and module are required' });
  }

  const dateUpdated = new Date().toISOString().split('T')[0];
  const stmt = db.prepare(
    'INSERT INTO articles (title, content, module, keywords, role, date_updated, version, cc_version) VALUES (?, ?, ?, ?, ?, ?, 1, ?)'
  );
  stmt.run([title, content, module, keywords || '', role || 'staff', dateUpdated, cc_version || '25.1']);
  stmt.free();
  saveDb();

  const inserted = queryOne(db, 'SELECT last_insert_rowid() as id');
  res.json({ id: inserted.id, message: 'Article created' });
});

// Update article
app.put('/api/admin/articles/:id', async (req, res) => {
  const db = await getDb();
  const articleId = Number(req.params.id);
  const { title, content, module, keywords, role, cc_version } = req.body;

  const existing = queryOne(db, 'SELECT * FROM articles WHERE id = ?', [articleId]);
  if (!existing) {
    return res.status(404).json({ error: 'Article not found' });
  }

  const dateUpdated = new Date().toISOString().split('T')[0];
  const newVersion = (existing.version || 1) + 1;

  const stmt = db.prepare(
    'UPDATE articles SET title = ?, content = ?, module = ?, keywords = ?, role = ?, date_updated = ?, version = ?, cc_version = ? WHERE id = ?'
  );
  stmt.run([
    title || existing.title,
    content || existing.content,
    module || existing.module,
    keywords !== undefined ? keywords : existing.keywords,
    role || existing.role,
    dateUpdated,
    newVersion,
    cc_version || existing.cc_version,
    articleId
  ]);
  stmt.free();
  saveDb();

  res.json({ message: 'Article updated', version: newVersion });
});

// Delete article
app.delete('/api/admin/articles/:id', async (req, res) => {
  const db = await getDb();
  const articleId = Number(req.params.id);

  const existing = queryOne(db, 'SELECT id FROM articles WHERE id = ?', [articleId]);
  if (!existing) {
    return res.status(404).json({ error: 'Article not found' });
  }

  // Clean up related data
  for (const table of ['votes', 'article_questions', 'article_media']) {
    const delStmt = db.prepare(`DELETE FROM ${table} WHERE article_id = ?`);
    delStmt.run([articleId]);
    delStmt.free();
  }
  const relStmt1 = db.prepare('DELETE FROM related_articles WHERE article_id = ? OR related_id = ?');
  relStmt1.run([articleId, articleId]);
  relStmt1.free();

  const delArticle = db.prepare('DELETE FROM articles WHERE id = ?');
  delArticle.run([articleId]);
  delArticle.free();
  saveDb();

  res.json({ message: 'Article deleted' });
});

// Catch-all for React Router (production, local only)
if (isProduction && !process.env.VERCEL) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Initialize DB (top-level await ensures DB is ready before any requests)
await initialize();
await seed();

// Start local server (skip on Vercel — it uses the exported app)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`RTJ Wiki server running on http://localhost:${PORT}`);
    if (isProduction) {
      console.log('Serving production build from ./dist');
    }
  });
}

export default app;
