## YouTube Trending API (Express + Serverless)

Provides a single endpoint to fetch the top 5 trending YouTube videos.

### Endpoint
- GET `/api/trending/youtube`

Response format:
```json
{
  "videos": [
    {
      "title": "Video Title",
      "url": "https://youtube.com/...",
      "thumbnail": "https://img.youtube.com/..."
    }
  ]
}
```

### Data Sources
- Official: YouTube Data API v3 (preferred if `YT_API_KEY` or `YOUTUBE_API_KEY` is set)
- Fallback: Scrapes `https://www.youtube.com/feed/trending` and parses `ytInitialData`

### Setup
1. Requirements: Node.js 18+
2. Install deps (pnpm preferred):
```bash
pnpm install
```
3. Create a `.env` file in the project root (optional if scraping only):
```bash
YT_API_KEY=YOUR_YOUTUBE_DATA_API_KEY
# Optional: set region code (default US)
YT_REGION=US
```

### Running Locally
- Dev server with hot-reload:
```bash
pnpm run dev
```
- Prod server:
```bash
pnpm run server
```
- The server listens on `http://localhost:3000`. Test with:
```bash
curl http://localhost:3000/api/trending/youtube | jq
```

### Deployment
- Vercel: `vercel.json` and `api/trending/youtube.js` provided.
- Railway/Render: use `server.js` as the entrypoint with `pnpm run server`. Ensure `PORT` is provided by the platform.

### Notes & Error Handling
- Returns `502` with `{ "error": "..." }` on network failures, invalid responses, or empty results.
- If the official API is unavailable or errors, the service automatically falls back to scraping.
- Scraping may break if YouTube changes markup. Prefer using an API key in production.

### Environment Variables
- `YT_API_KEY` or `YOUTUBE_API_KEY`: YouTube Data API v3 key
- `YT_REGION` (optional): Region code like `US`, `GB`, `IN`
- `PORT` (optional for self-hosted): defaults to `3000`

### License
MIT


