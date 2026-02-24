export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { filename, imageBase64, message } = req.body;
  if (!filename || !imageBase64) {
    return res.status(400).json({ error: 'Missing filename or imageBase64' });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'Server not configured — GITHUB_TOKEN missing' });
  }

  const owner = 'nikchick5';
  const repo = 'rtj-wiki';
  const path = `screenshots/${filename}`;
  const branch = 'main';
  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const headers = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.v3+json',
  };

  try {
    // Check if file already exists (need SHA for updates)
    let sha = null;
    const fileRes = await fetch(`${apiBase}?ref=${branch}`, { headers });
    if (fileRes.ok) {
      const fileData = await fileRes.json();
      sha = fileData.sha;
    }

    // Commit the image file
    const body = {
      message: message || `Add screenshot ${filename}`,
      content: imageBase64,
      branch,
    };
    if (sha) body.sha = sha;

    const updateRes = await fetch(apiBase, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });

    if (updateRes.ok) {
      return res.status(200).json({ success: true });
    } else {
      const err = await updateRes.text();
      return res.status(500).json({ error: 'Failed to upload image', details: err });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}
