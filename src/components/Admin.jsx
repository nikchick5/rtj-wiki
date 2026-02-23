import { useState, useEffect, useCallback, useRef } from 'react';

const ROLE_OPTIONS = ['staff', 'manager'];

// Markdown renderer — matches ArticleView so preview shows exact final formatting
function renderMarkdown(text) {
  let html = text
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="article-screenshot" loading="lazy" />')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>')
    .replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/((?:^>.*$\n?)+)/gm, (match) => {
    const inner = match.replace(/^> ?/gm, '').trim();
    return `<blockquote>${inner}</blockquote>`;
  });
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');
  html = html.split('\n\n').map(block => {
    if (block.startsWith('<h') || block.startsWith('<ul') || block.startsWith('<ol') || block.startsWith('<blockquote') || block.startsWith('<img')) return block;
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<')) return trimmed;
    return `<p>${trimmed.replace(/\n/g, '<br/>')}</p>`;
  }).join('\n');
  return html;
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function htmlToMarkdown(html) {
  const div = document.createElement('div');
  div.innerHTML = html;

  // Remove Word junk elements
  div.querySelectorAll('style, meta, link, xml, title, script, comment').forEach(el => el.remove());
  // Remove <o:p>, <w:Sdt>, and other namespaced elements, keeping text
  for (const sel of ['o\\:p', 'w\\:sdt', 'w\\:sdtcontent', 'w\\:sdtpr']) {
    div.querySelectorAll(sel).forEach(el => {
      el.replaceWith(...el.childNodes);
    });
  }
  // Convert Word VML images to standard <img>
  div.querySelectorAll('v\\:shape, v\\:image').forEach(el => {
    const imgData = el.querySelector('v\\:imagedata');
    if (imgData) {
      const src = imgData.getAttribute('src') || imgData.getAttribute('o:href') || '';
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Screenshot';
      el.replaceWith(img);
    } else {
      el.remove();
    }
  });
  // Remove remaining VML elements
  div.querySelectorAll('v\\:rect, v\\:oval, v\\:line, v\\:group, v\\:shapetype').forEach(el => el.remove());

  // Detect Word heading level from class (MsoHeading1, Heading 1, etc.)
  function getHeadingLevel(node) {
    const cls = (node.getAttribute('class') || '').toLowerCase();
    const style = (node.getAttribute('style') || '').toLowerCase();
    if (cls.includes('msotitle') || cls.includes('title')) return 2;
    const headingMatch = cls.match(/(?:mso)?heading\s*(\d)/);
    if (headingMatch) return Math.min(parseInt(headingMatch[1], 10) + 1, 4); // h1->##, h2->###
    // Detect large bold text styled as heading
    if (style.includes('font-size') && style.includes('bold')) {
      const sizeMatch = style.match(/font-size:\s*(\d+)/);
      if (sizeMatch && parseInt(sizeMatch[1], 10) >= 16) return 2;
    }
    return 0;
  }

  function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent.replace(/\r?\n/g, ' ');
    }
    if (node.nodeType === Node.COMMENT_NODE) return '';
    if (node.nodeType !== Node.ELEMENT_NODE) return '';

    const tag = node.tagName.toLowerCase();
    // Skip hidden elements
    const style = node.getAttribute('style') || '';
    if (style.includes('display:none') || style.includes('display: none')) return '';

    const children = Array.from(node.childNodes).map(processNode).join('');

    switch (tag) {
      case 'h1':
      case 'h2':
        return `\n\n## ${children.trim()}\n\n`;
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return `\n\n### ${children.trim()}\n\n`;
      case 'strong':
      case 'b': {
        const t = children.trim();
        return t ? `**${t}**` : '';
      }
      case 'em':
      case 'i': {
        const t = children.trim();
        return t ? `*${t}*` : '';
      }
      case 'u': {
        const t = children.trim();
        return t ? `**${t}**` : ''; // Underline → bold in Markdown
      }
      case 'p': {
        const trimmed = children.trim();
        if (!trimmed) return '\n';
        // Check if Word styled this as a heading
        const headingLvl = getHeadingLevel(node);
        if (headingLvl === 2) return `\n\n## ${trimmed}\n\n`;
        if (headingLvl >= 3) return `\n\n### ${trimmed}\n\n`;
        return `${trimmed}\n\n`;
      }
      case 'br':
        return '\n';
      case 'ul':
        return '\n' + children + '\n';
      case 'ol': {
        let idx = 0;
        return '\n' + Array.from(node.children).map(li => {
          idx++;
          const liContent = Array.from(li.childNodes).map(processNode).join('').trim();
          return `${idx}. ${liContent}`;
        }).join('\n') + '\n\n';
      }
      case 'li':
        return `- ${children.trim()}\n`;
      case 'blockquote':
        return children.trim().split('\n').map(line => `> ${line}`).join('\n') + '\n\n';
      case 'img': {
        const alt = node.getAttribute('alt') || 'Screenshot';
        const src = node.getAttribute('src') || '';
        if (!src) return '';
        return `\n\n![${alt}](${src})\n\n`;
      }
      case 'a': {
        const href = node.getAttribute('href') || '';
        if (!href || href.startsWith('#') || href.startsWith('javascript:')) return children;
        return `[${children.trim()}](${href})`;
      }
      case 'table':
        return '\n' + children + '\n';
      case 'tr':
        return children.replace(/\s*\|\s*$/, '') + '\n';
      case 'td':
      case 'th': {
        const text = children.trim();
        return text ? text + ' | ' : '';
      }
      case 'sup':
        return children;
      case 'sub':
        return children;
      default:
        return children;
    }
  }

  let result = processNode(div);
  // Clean up excessive whitespace
  result = result.replace(/\n{3,}/g, '\n\n');
  // Remove trailing spaces on each line
  result = result.replace(/[ \t]+$/gm, '');
  // Collapse multiple spaces
  result = result.replace(/ {2,}/g, ' ');
  return result.trim();
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function uploadImageBlob(blob, mimeType, slug) {
  const res = await fetch('/api/admin/upload-image', {
    method: 'POST',
    headers: {
      'Content-Type': mimeType,
      'X-Article-Slug': slug
    },
    body: blob
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Upload failed' }));
    throw new Error(err.error || 'Upload failed');
  }
  return res.json();
}

function ArticleForm({ article, onSave, onCancel, moduleOptions }) {
  const [form, setForm] = useState({
    title: '',
    module: moduleOptions[0] || 'F&B',
    content: '',
    keywords: '',
    role: 'staff',
    ...article
  });
  const [uploading, setUploading] = useState(false);
  const [pasteStatus, setPasteStatus] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    onSave(form);
  };

  const insertAtCursor = (text) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setForm(prev => ({ ...prev, content: prev.content + text }));
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = form.content;
    const newContent = current.substring(0, start) + text + current.substring(end);
    setForm(prev => ({ ...prev, content: newContent }));
    requestAnimationFrame(() => {
      textarea.selectionStart = textarea.selectionEnd = start + text.length;
      textarea.focus();
    });
  };

  const handlePaste = async (e) => {
    const clipboardData = e.clipboardData;

    // Collect all clipboard image files
    const clipboardImages = [];
    if (clipboardData.files) {
      for (const file of clipboardData.files) {
        if (file.type.startsWith('image/')) clipboardImages.push(file);
      }
    }
    // Also check clipboardData.items for image blobs not in .files
    if (clipboardData.items) {
      for (const item of clipboardData.items) {
        if (item.type.startsWith('image/') && item.kind === 'file') {
          const file = item.getAsFile();
          if (file && !clipboardImages.some(f => f.size === file.size && f.type === file.type)) {
            clipboardImages.push(file);
          }
        }
      }
    }

    // Check for HTML content
    const html = clipboardData.getData('text/html');

    // Case 1: No HTML, but has images → pure image paste (screenshot Ctrl+V)
    if (!html && clipboardImages.length > 0) {
      e.preventDefault();
      if (!form.title.trim()) {
        alert('Please enter an article title before pasting images.');
        return;
      }
      const slug = generateSlug(form.title);
      setUploading(true);
      for (const file of clipboardImages) {
        try {
          const data = await uploadImageBlob(file, file.type, slug);
          insertAtCursor(`\n\n![Screenshot](${data.url})\n\n`);
        } catch (err) {
          alert('Image upload failed: ' + err.message);
        }
      }
      setUploading(false);
      return;
    }

    // Case 2: No HTML, no images → plain text, let default handle it
    if (!html) return;

    // Case 3: Rich HTML content (Word, Google Docs, web pages, etc.)
    const isRichContent = html.includes('urn:schemas-microsoft-com:office')
      || html.includes('mso-')
      || html.includes('MsoNormal')
      || html.includes('docs-internal-guid')  // Google Docs
      || /<img[^>]+src=/i.test(html)           // Any HTML with images
      || /<h[1-6]/i.test(html)                 // HTML with headings
      || /<(strong|b|em|ul|ol|blockquote)/i.test(html); // Formatted HTML

    if (!isRichContent) return; // Simple text, let default handle it

    e.preventDefault();

    const slug = form.title.trim() ? generateSlug(form.title) : 'untitled';

    // Step 1: Find all image sources in the HTML
    const base64Map = new Map(); // dataUrl → { mimeType }
    const nonBase64Urls = [];    // file://, blob:, etc.

    const allImgRegex = /<img[^>]+src="([^"]+)"/gi;
    const b64Regex = /^data:image\/(png|jpeg|jpg|gif|webp|bmp);base64,/i;
    let match;
    while ((match = allImgRegex.exec(html)) !== null) {
      const src = match[1];
      const b64Match = src.match(b64Regex);
      if (b64Match) {
        base64Map.set(src, { mimeType: `image/${b64Match[1].replace('jpg', 'jpeg')}` });
      } else if (src && !src.startsWith('#')) {
        nonBase64Urls.push(src);
      }
    }

    const totalImages = base64Map.size + Math.max(nonBase64Urls.length, clipboardImages.length);
    if (totalImages > 0 && !form.title.trim()) {
      alert('Please enter an article title before pasting content with images.');
      return;
    }

    setUploading(true);
    setPasteStatus(totalImages > 0 ? `Uploading ${totalImages} image${totalImages > 1 ? 's' : ''}...` : 'Converting...');

    const imageReplacements = []; // { original, serverUrl }

    // Step 2: Upload base64 images from HTML
    for (const [dataUrl, info] of base64Map) {
      try {
        const base64 = dataUrl.split(',')[1];
        const binaryStr = atob(base64);
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: info.mimeType });
        const data = await uploadImageBlob(blob, info.mimeType, slug);
        imageReplacements.push({ original: dataUrl, serverUrl: data.url });
      } catch (err) {
        console.error('Failed to upload base64 image:', err);
      }
    }

    // Step 3: Upload clipboard file images, mapping to non-base64 HTML img sources
    let clipIdx = 0;
    for (const originalUrl of nonBase64Urls) {
      if (clipIdx < clipboardImages.length) {
        try {
          const file = clipboardImages[clipIdx];
          const data = await uploadImageBlob(file, file.type, slug);
          imageReplacements.push({ original: originalUrl, serverUrl: data.url });
          clipIdx++;
        } catch (err) {
          console.error('Failed to upload clipboard image:', err);
        }
      }
    }

    // Step 4: Upload any remaining clipboard images not matched to HTML
    const extraImageUrls = [];
    while (clipIdx < clipboardImages.length) {
      try {
        const file = clipboardImages[clipIdx];
        const data = await uploadImageBlob(file, file.type, slug);
        extraImageUrls.push(data.url);
        clipIdx++;
      } catch (err) {
        console.error('Failed to upload extra image:', err);
      }
    }

    setUploading(false);
    setPasteStatus('');

    // Step 5: Convert HTML to Markdown
    let markdown = htmlToMarkdown(html);

    // Step 6: Replace image URLs with server URLs
    for (const { original, serverUrl } of imageReplacements) {
      const escaped = escapeRegex(original);
      markdown = markdown.replace(
        new RegExp(`!\\[[^\\]]*\\]\\(${escaped}\\)`),
        `![Screenshot](${serverUrl})`
      );
    }

    // Step 7: Append any extra clipboard images at the end
    for (const url of extraImageUrls) {
      markdown += `\n\n![Screenshot](${url})`;
    }

    insertAtCursor(markdown);
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (!form.title.trim()) {
      alert('Please enter an article title before uploading images.');
      e.target.value = '';
      return;
    }

    const slug = generateSlug(form.title);
    setUploading(true);

    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;
      try {
        const data = await uploadImageBlob(file, file.type, slug);
        setForm(prev => ({
          ...prev,
          content: prev.content + `\n\n![Screenshot](${data.url})\n`
        }));
      } catch (err) {
        alert('Upload failed: ' + err.message);
      }
    }

    setUploading(false);
    e.target.value = '';
  };

  return (
    <div className="admin-form-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>{article ? 'Edit Article' : 'New Article'}</h3>

        <div className="form-group">
          <label>Title *</label>
          <input type="text" value={form.title} onChange={handleChange('title')} placeholder="Article title" required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Module *</label>
            <select value={form.module} onChange={handleChange('module')}>
              {moduleOptions.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Role</label>
            <select value={form.role} onChange={handleChange('role')}>
              {ROLE_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Content *</label>
          <div className="content-editor-tabs">
            <button type="button" className={`content-tab ${!showPreview ? 'active' : ''}`} onClick={() => setShowPreview(false)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Write
            </button>
            <button type="button" className={`content-tab ${showPreview ? 'active' : ''}`} onClick={() => setShowPreview(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Preview
            </button>
            <span className="content-tab-hint">Paste from Word with images — formatting is preserved automatically</span>
          </div>

          {!showPreview ? (
            <>
              <textarea
                ref={textareaRef}
                value={form.content}
                onChange={handleChange('content')}
                onPaste={handlePaste}
                placeholder={'Paste from Word or type Markdown here.\n\nFormatting guide:\n## Step 1: Heading\nParagraph text with **bold** and *italic*\n\n> **Note:** Important tip or note\n\n- Bullet list item\n1. Numbered list item\n\n![alt text](image-url)'}
                required
              />
              {(uploading || pasteStatus) && (
                <div className="paste-status">
                  <div className="spinner-sm" />
                  <span>{pasteStatus || 'Processing...'}</span>
                </div>
              )}
              <div className="image-upload-row">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/gif,image/webp"
                  multiple
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
                <p className="form-hint">{"## Heading, **bold**, *italic*, - bullet, 1. numbered, ![alt](url) image, > blockquote"}</p>
              </div>
            </>
          ) : (
            <div className="content-preview article-view-content">
              {form.content.trim() ? (
                <div dangerouslySetInnerHTML={{ __html: renderMarkdown(form.content) }} />
              ) : (
                <p className="preview-empty">Nothing to preview yet. Switch to Write and add content.</p>
              )}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Keywords</label>
          <input type="text" value={form.keywords} onChange={handleChange('keywords')} placeholder="comma, separated, keywords" />
          <p className="form-hint">Comma-separated keywords for search and related article matching</p>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {article ? 'Save Changes' : 'Create Article'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Admin() {
  const [articles, setArticles] = useState([]);
  const [modules, setModules] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [newModuleName, setNewModuleName] = useState('');
  const [editingModule, setEditingModule] = useState(null);
  const [editModuleName, setEditModuleName] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [articlesRes, modulesRes] = await Promise.all([
        fetch('/api/articles').then(r => r.json()),
        fetch('/api/modules').then(r => r.json())
      ]);
      setArticles(articlesRes);
      setModules(modulesRes);
    } catch (e) {
      // silently fail
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  // Articles CRUD
  const saveArticle = async (data) => {
    const url = editing ? `/api/admin/articles/${editing.id}` : '/api/admin/articles';
    const method = editing ? 'PUT' : 'POST';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    setShowForm(false);
    setEditing(null);
    showMessage(editing ? 'Article updated!' : 'Article created!');
    loadData();
  };

  const deleteArticle = async (id) => {
    if (!confirm('Delete this article? This cannot be undone.')) return;
    await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
    showMessage('Article deleted.');
    loadData();
  };

  // Module CRUD
  const createModule = async () => {
    if (!newModuleName.trim()) return;
    const res = await fetch('/api/admin/modules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newModuleName.trim() })
    });
    const data = await res.json();
    if (!res.ok) {
      showMessage(data.error || 'Failed to create module');
      return;
    }
    setNewModuleName('');
    showMessage('Module created!');
    loadData();
  };

  const renameModule = async (mod) => {
    if (!editModuleName.trim() || editModuleName.trim() === mod.module) {
      setEditingModule(null);
      return;
    }
    const res = await fetch(`/api/admin/modules/${mod.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editModuleName.trim() })
    });
    const data = await res.json();
    if (!res.ok) {
      showMessage(data.error || 'Failed to rename module');
      return;
    }
    setEditingModule(null);
    showMessage(`Module renamed to "${editModuleName.trim()}"!`);
    loadData();
  };

  const deleteModule = async (mod) => {
    if (!confirm(`Delete module "${mod.module}"? This only works if no articles use it.`)) return;
    const res = await fetch(`/api/admin/modules/${mod.id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) {
      showMessage(data.error || 'Failed to delete module');
      return;
    }
    showMessage('Module deleted.');
    loadData();
  };

  const openCreate = () => { setEditing(null); setShowForm(true); };
  const openEdit = (item) => { setEditing(item); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  // Filtered data
  const q = search.toLowerCase();
  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(q) || a.module.toLowerCase().includes(q)
  );

  if (loading) {
    return (
      <div className="article-list-empty">
        <div className="spinner" />
        <p>Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="admin">
      <div className="admin-header">
        <h2>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
          Admin Panel
        </h2>
      </div>

      {message && (
        <div className="admin-success">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {message}
        </div>
      )}

      <div className="admin-toolbar">
        <div className="admin-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="btn-primary" onClick={openCreate}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Article
        </button>
      </div>

      {filteredArticles.length === 0 ? (
        <div className="admin-empty">No articles found.</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Module</th>
              <th>Role</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map(a => (
              <tr key={a.id}>
                <td style={{ fontWeight: 500 }}>{a.title}</td>
                <td>{a.module}</td>
                <td>{a.role}</td>
                <td style={{ fontSize: '13px', color: '#64748b' }}>{a.date_updated}</td>
                <td>
                  <div className="admin-table-actions">
                    <button className="btn-icon" title="Edit" onClick={() => {
                      fetch(`/api/articles/${a.id}`).then(r => r.json()).then(full => openEdit(full));
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button className="btn-icon danger" title="Delete" onClick={() => deleteArticle(a.id)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-2 14H7L5 6" />
                        <path d="M10 11v6" /><path d="M14 11v6" />
                        <path d="M9 6V4h6v2" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="admin-section-divider" />

      <div className="admin-header">
        <h2>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
          </svg>
          Modules
        </h2>
      </div>

      <div className="admin-modules">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Module Name</th>
              <th>Articles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {modules.map(mod => (
              <tr key={mod.id}>
                <td style={{ fontWeight: 500 }}>
                  {editingModule === mod.id ? (
                    <input
                      type="text"
                      className="module-edit-input"
                      value={editModuleName}
                      onChange={e => setEditModuleName(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') renameModule(mod);
                        if (e.key === 'Escape') setEditingModule(null);
                      }}
                      autoFocus
                    />
                  ) : (
                    mod.module
                  )}
                </td>
                <td>{mod.count}</td>
                <td>
                  <div className="admin-table-actions">
                    {editingModule === mod.id ? (
                      <>
                        <button className="btn-icon" title="Save" onClick={() => renameModule(mod)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </button>
                        <button className="btn-icon" title="Cancel" onClick={() => setEditingModule(null)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="btn-icon" title="Rename" onClick={() => { setEditingModule(mod.id); setEditModuleName(mod.module); }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button className="btn-icon danger" title="Delete" onClick={() => deleteModule(mod)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-2 14H7L5 6" />
                            <path d="M10 11v6" /><path d="M14 11v6" />
                            <path d="M9 6V4h6v2" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="module-add-row">
          <input
            type="text"
            placeholder="New module name..."
            value={newModuleName}
            onChange={e => setNewModuleName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') createModule(); }}
          />
          <button className="btn-primary btn-sm" onClick={createModule} disabled={!newModuleName.trim()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Module
          </button>
        </div>
      </div>

      {showForm && (
        <ArticleForm article={editing} onSave={saveArticle} onCancel={closeForm} moduleOptions={modules.map(m => m.module)} />
      )}
    </div>
  );
}
