export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { content, message } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Missing content' });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'Server not configured — GITHUB_TOKEN missing' });
  }

  const owner = 'nikchick5';
  const repo = 'rtj-wiki';
  const path = 'articles.js';
  const branch = 'main';
  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const headers = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.v3+json',
  };

  try {
    // Get current file SHA (required by GitHub API for updates)
    const fileRes = await fetch(`${apiBase}?ref=${branch}`, { headers });
    if (!fileRes.ok) {
      const err = await fileRes.text();
      return res.status(500).json({ error: 'Failed to read current file', details: err });
    }
    const fileData = await fileRes.json();

    // Base64 encode the content
    const encoded = Buffer.from(content, 'utf-8').toString('base64');

    // Commit the updated file
    const updateRes = await fetch(apiBase, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: message || 'Update article via wiki editor',
        content: encoded,
        sha: fileData.sha,
        branch,
      }),
    });

    if (updateRes.ok) {
      return res.status(200).json({ success: true });
    } else {
      const err = await updateRes.text();
      return res.status(500).json({ error: 'Failed to commit', details: err });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}
