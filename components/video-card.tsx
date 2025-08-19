import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Eye, Calendar } from "lucide-react"
import type { YouTubeVideo } from "./youtube-trending"

interface VideoCardProps {
  video: YouTubeVideo
  rank: number
}

export function VideoCard({ video, rank }: VideoCardProps) {
  // Format view count for display
  const formatViewCount = (count: string | undefined) => {
    if (!count) return ""
    const num = Number.parseInt(count)
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M views`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K views`
    }
    return `${num} views`
  }

  // Format date for display
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return ""
    try {
      return new Date(dateString).toLocaleDateString()
    } catch {
      return ""
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border bg-card">
      <CardContent className="p-0">
        <div className="relative">
          {/* Rank badge */}
          <div className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-sm font-bold px-2 py-1 rounded-full">
            #{rank}
          </div>

          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden rounded-t-lg">
            <img
              src={video.thumbnail || `/placeholder.svg?height=360&width=640&query=YouTube video thumbnail`}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* Video title - clickable link */}
          <a href={video.url} target="_blank" rel="noopener noreferrer" className="block group/link">
            <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover/link:text-primary transition-colors duration-200 leading-tight">
              {video.title}
              <ExternalLink className="inline-block ml-1 h-4 w-4 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200" />
            </h3>
          </a>

          {/* Channel and metadata */}
          <div className="space-y-2 text-sm text-muted-foreground">
            {video.channelTitle && <p className="font-medium text-card-foreground">{video.channelTitle}</p>}

            <div className="flex items-center gap-4 text-xs">
              {video.viewCount && (
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{formatViewCount(video.viewCount)}</span>
                </div>
              )}

              {video.publishedAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(video.publishedAt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
