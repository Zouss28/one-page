import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function LoadingState() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Loading indicator */}
      <div className="text-center mb-8">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">Loading trending videos...</p>
      </div>

      {/* Skeleton cards */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="border-border bg-card">
            <CardContent className="p-0">
              {/* Skeleton thumbnail */}
              <div className="aspect-video bg-muted animate-pulse rounded-t-lg" />

              <div className="p-4 space-y-3">
                {/* Skeleton title */}
                <div className="space-y-2">
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                </div>

                {/* Skeleton metadata */}
                <div className="space-y-2">
                  <div className="h-3 bg-muted animate-pulse rounded w-1/3" />
                  <div className="h-3 bg-muted animate-pulse rounded w-1/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
