const express = require('express');
const { fetchTrendingYouTube } = require('../src/services/youtubeTrending');

const router = express.Router();

// Health
router.get('/health', (_req, res) => res.json({ ok: true }));

// YouTube trending endpoint
router.get('/trending/youtube', async (_req, res) => {
  try {
    const videos = await fetchTrendingYouTube();
    if (!Array.isArray(videos) || videos.length === 0) {
      return res.status(502).json({ error: 'No trending videos found' });
    }
    return res.json({ videos });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(502).json({ error: `Failed to fetch trending videos: ${message}` });
  }
});

module.exports = router;


