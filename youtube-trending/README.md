# YouTube Trending Videos Frontend

A clean, responsive React frontend that displays the top 5 trending YouTube videos fetched from your backend API.

## Features

- 🎥 Displays top 5 trending YouTube videos
- 📱 Fully responsive design (mobile & desktop)
- ⚡ Loading states with skeleton UI
- 🚨 Error handling with retry functionality
- 🎨 Clean, minimal design using Tailwind CSS
- 🔗 Clickable video titles that open in new tabs
- 📊 Video metadata display (views, publish date, channel)

## Setup

### Environment Variables

Create a `.env.local` file in your project root:

\`\`\`env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
\`\`\`

Replace `https://your-backend-url.com` with your actual backend URL.

### Expected API Response Format

Your backend API at `/api/trending/youtube` should return an array of video objects:

\`\`\`json
[
  {
    "id": "video_id",
    "title": "Video Title",
    "thumbnail": "https://img.youtube.com/vi/video_id/maxresdefault.jpg",
    "url": "https://www.youtube.com/watch?v=video_id",
    "channelTitle": "Channel Name",
    "publishedAt": "2024-01-01T00:00:00Z",
    "viewCount": "1000000"
  }
]
\`\`\`

## Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment on Vercel

### Option 1: Deploy from GitHub

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repository
4. Add your environment variables in the Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_API_URL` with your backend URL
5. Deploy!

### Option 2: Deploy using Vercel CLI

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_API_URL
\`\`\`

### Option 3: Deploy directly from v0

1. Click the "Deploy" button in the top right of the v0 interface
2. Follow the prompts to connect your Vercel account
3. Add your environment variables during the deployment process

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Main page component
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── youtube-trending.tsx  # Main trending component
│   ├── video-card.tsx        # Individual video card
│   ├── loading-state.tsx     # Loading skeleton UI
│   └── error-state.tsx       # Error handling UI
└── README.md
\`\`\`

## Customization

### Styling
- Colors and themes are defined in `app/globals.css`
- Component styles use Tailwind CSS classes
- Responsive breakpoints: `md:` (768px+), `lg:` (1024px+)

### API Integration
- Update the `API_URL` in `components/youtube-trending.tsx`
- Modify the `YouTubeVideo` interface if your API returns different data
- Adjust error handling in the `fetchTrendingVideos` function

### UI Components
- Video cards are fully customizable in `components/video-card.tsx`
- Loading states can be modified in `components/loading-state.tsx`
- Error messages can be customized in `components/error-state.tsx`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design works on all screen sizes

## Performance

- Images are lazy-loaded for better performance
- Skeleton loading states provide immediate feedback
- Optimized for Core Web Vitals
