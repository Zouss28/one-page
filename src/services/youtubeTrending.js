// Service to fetch YouTube trending videos (top 5)
// Strategy: First try YouTube Data API v3 if YT_API_KEY is set.
// Fallback: Unofficial scraping of https://www.youtube.com/feed/trending using lightweight parsing.

const https = require('node:https');

function buildTrendingUrl() {
  const region = process.env.YT_REGION || 'US';
  const url = new URL('https://www.youtube.com/feed/trending');
  url.searchParams.set('gl', region);
  url.searchParams.set('hl', 'en');
  return url.toString();
}

/**
 * Fetch helper using Node's https to avoid extra deps. Returns text body.
 */
function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        const status = res.statusCode || 0;
        if (status >= 400) {
          reject(new Error(`HTTP ${status}`));
          return;
        }
        const chunks = [];
        res.on('data', (d) => chunks.push(d));
        res.on('end', () => {
          const body = Buffer.concat(chunks).toString('utf8');
          resolve(body);
        });
      })
      .on('error', reject);
  });
}

/**
 * Try official YouTube Data API v3 (if YT_API_KEY provided).
 */
async function fetchViaOfficialApi() {
  const apiKey = process.env.YT_API_KEY || process.env.YOUTUBE_API_KEY;
  if (!apiKey) return null;

  const params = new URLSearchParams({
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: '5',
    regionCode: process.env.YT_REGION || 'US',
    key: apiKey,
  });

  const url = `https://www.googleapis.com/youtube/v3/videos?${params.toString()}`;
  console.log(url);
  const text = await fetchText(url);
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new Error('Invalid JSON from YouTube API');
  }

  const items = Array.isArray(data.items) ? data.items : [];
  return items.slice(0, 5).map((item) => {
    const id = item.id;
    const title = item?.snippet?.title || 'Untitled';
    const thumb = item?.snippet?.thumbnails?.high?.url || item?.snippet?.thumbnails?.medium?.url || item?.snippet?.thumbnails?.default?.url || '';
    return {
      title,
      url: `https://www.youtube.com/watch?v=${id}`,
      thumbnail: thumb || `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    };
  });
}

/**
 * Lightweight trending page scraping as fallback.
 * Parses ytInitialData JSON from the HTML and extracts top videos.
 */
async function fetchViaScrape() {
  const html = await fetchText(buildTrendingUrl());

  // Find ytInitialData JSON blob - try several common patterns
  const markers = [
    'var ytInitialData = ',
    'window["ytInitialData"] = ',
    "window['ytInitialData'] = ",
    'window.ytInitialData = ',
  ];
  let jsonStr = null;
  for (const marker of markers) {
    const idx = html.indexOf(marker);
    if (idx !== -1) {
      const start = idx + marker.length;
      const end = html.indexOf(';', start);
      jsonStr = html.slice(start, end);
      break;
    }
  }
  if (!jsonStr) throw new Error('ytInitialData not found');

  let data;
  try {
    data = JSON.parse(jsonStr);
  } catch (e) {
    throw new Error('Failed to parse ytInitialData');
  }

  // Heuristic path to videoRenderer nodes
  const videoRenderers = [];
  function walk(node) {
    if (!node || typeof node !== 'object') return;
    if (node.videoRenderer) videoRenderers.push(node.videoRenderer);
    for (const key of Object.keys(node)) {
      walk(node[key]);
    }
  }
  walk(data);

  const results = [];
  for (const vr of videoRenderers) {
    const id = vr?.videoId;
    const title = vr?.title?.runs?.[0]?.text || vr?.headline?.simpleText || 'Untitled';
    const thumbs = vr?.thumbnail?.thumbnails || [];
    const bestThumb = thumbs[thumbs.length - 1]?.url || '';
    if (id && title) {
      results.push({
        title,
        url: `https://www.youtube.com/watch?v=${id}`,
        thumbnail: bestThumb || `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      });
    }
    if (results.length >= 5) break;
  }

  return results;
}

async function fetchTrendingYouTube() {
  // Try official API first if available
  try {
    const viaApi = await fetchViaOfficialApi();
    if (viaApi && viaApi.length > 0) return viaApi;
  } catch (e) {
    // fall through to scraping
  }

  // Fallback: scrape trending page
  const viaScrape = await fetchViaScrape();
  return viaScrape;
}
 
module.exports = { fetchTrendingYouTube };

