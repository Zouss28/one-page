import { YouTubeTrending } from "@/components/youtube-trending"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">YouTube Trending</h1>
          <p className="text-muted-foreground text-lg">Discover the top 5 trending videos on YouTube</p>
        </div>
        <YouTubeTrending />
      </div>
    </main>
  )
}
