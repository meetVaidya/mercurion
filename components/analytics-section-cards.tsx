"use client";

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SectionCardsProps {
  videoId: string | null;
}

interface AnalyticsData {
  comments_sentiment?:
    | { comment: string; sentiment: string }[]
    | { error: string };
  video_stats?:
    | { title: string; views: number; likes: number; comments: number }
    | { error: string };
  peak_engagement_time?:
    | { date: string; views: number; likes: number; comments: number }[]
    | { data: any[]; message: string }
    | { error: string };
  audience_retention?:
    | { date: string; avg_view_duration: number; views: number }[]
    | { data: any[]; message: string }
    | { error: string };
  error?: string;
  details?: any;
}

export function SectionCards({ videoId }: SectionCardsProps) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null,
  );
  const [loadingAnalytics, setLoadingAnalytics] = useState<boolean>(false);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!videoId) {
        setAnalyticsData(null);
        return;
      }

      setLoadingAnalytics(true);
      setAnalyticsError(null);
      try {
        const response = await fetch(
          `http://localhost:5000/video-analytics?video_id=${videoId}`,
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `HTTP error! status: ${response.status}, details: ${errorData.error || "Unknown error"}`,
          );
        }
        const data: AnalyticsData = await response.json();
        setAnalyticsData(data);
      } catch (error: any) {
        console.error("Could not fetch video analytics:", error);
        setAnalyticsError(
          `Failed to load video analytics. ${error.message || "Please try again."}`,
        );
        setAnalyticsData(null);
      } finally {
        setLoadingAnalytics(false);
      }
    };

    fetchAnalytics();
  }, [videoId]);

  if (loadingAnalytics) {
    return <div>Loading analytics...</div>;
  }

  if (analyticsError) {
    return <div className="text-red-500">{analyticsError}</div>;
  }

  if (
    !analyticsData ||
    !analyticsData.video_stats ||
    "error" in analyticsData.video_stats
  ) {
    return <div>No analytics data available for this video.</div>;
  }

  const viewCount = analyticsData.video_stats.views || "N/A";
  const likeCount = analyticsData.video_stats.likes || "N/A";
  const commentCount = analyticsData.video_stats.comments || "N/A";

  // Calculate average view duration from audience_retention if available
  const avgViewDuration = Array.isArray(analyticsData.audience_retention)
    ? analyticsData.audience_retention.length > 0
      ? (
          analyticsData.audience_retention.reduce(
            (sum, day) => sum + day.avg_view_duration,
            0,
          ) / analyticsData.audience_retention.length
        ).toFixed(2) + "s"
      : "N/A"
    : "N/A";

  // Calculate a simple sentiment score from comments_sentiment
  const sentimentScore = Array.isArray(analyticsData.comments_sentiment)
    ? analyticsData.comments_sentiment.length > 0
      ? (
          analyticsData.comments_sentiment.reduce((sum, comment) => {
            return (
              sum +
              (comment.sentiment === "positive"
                ? 1
                : comment.sentiment === "negative"
                  ? -1
                  : 0)
            );
          }, 0) / analyticsData.comments_sentiment.length
        ).toFixed(2)
      : "N/A"
    : "N/A";

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Views</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {viewCount}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total views for this video
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Likes</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {likeCount}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total likes received
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Comments</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {commentCount}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total comments on the video
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Avg. View Duration</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {avgViewDuration}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Average time users watched the video
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Comment Sentiment Score</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {parseFloat(sentimentScore) * 100}%
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Overall sentiment of comments (higher is more positive)
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
