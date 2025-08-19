"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

interface ErrorStateProps {
  error: string
  onRetry: () => void
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-destructive/20 bg-destructive/5">
        <CardContent className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />

          <h3 className="text-lg font-semibold text-card-foreground mb-2">Failed to Load Trending Videos</h3>

          <p className="text-muted-foreground mb-6">{error}</p>

          <Button onClick={onRetry} variant="outline" className="gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg text-left">
            <h4 className="font-medium text-card-foreground mb-2">Troubleshooting Tips:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Check if your backend API is running</li>
              <li>• Verify the API URL is correct</li>
              <li>• Ensure CORS is properly configured</li>
              <li>• Check your network connection</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
