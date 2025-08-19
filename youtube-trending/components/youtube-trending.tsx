"use client"

import { useState, useEffect } from "react"
import { VideoCard } from "./video-card"
import { LoadingState } from "./loading-state"
import { ErrorState } from "./error-state"

// Type definitions for YouTube video data
export interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  url: string
  channelTitle?: string
  publishedAt?: string
  viewCount?: string
}

export function YouTubeTrending() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Frontend and backend share the same URL
  const API_URL = ""

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/trending/youtube`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Ensure we only show top 5 videos
        const topVideos = Array.isArray(data.videos) ? data.videos.slice(0, 5) : []
        setVideos(topVideos)
      } catch (err) {
        console.error("Error fetching trending videos:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch trending videos")
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingVideos()
  }, [API_URL])

  // Show loading state
  if (loading) {
    return <LoadingState />
  }

  // Show error state
  if (error) {
    return <ErrorState error={error} onRetry={() => window.location.reload()} />
  }

  // Show empty state if no videos
  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No trending videos found</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {videos.map((video, index) => (
          <VideoCard key={video.id || index} video={video} rank={index + 1} />
        ))}
      </div>
    </div>
  )
}
