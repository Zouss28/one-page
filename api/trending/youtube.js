// Vercel-style serverless function handler for /api/trending/youtube
const { fetchTrendingYouTube } = require('../../src/services/youtubeTrending');

module.exports = async function handler(req, res) {
  const allowedOrigin = process.env.CORS_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const videos = await fetchTrendingYouTube();
    if (!Array.isArray(videos) || videos.length === 0) {
      return res.status(502).json({ error: 'No trending videos found' });
    }
    return res.status(200).json({ videos });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(502).json({ error: `Failed to fetch trending videos: ${message}` });
  }
}


