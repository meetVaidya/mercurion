"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const description = "An interactive area chart";

interface ChartAreaInteractiveProps {
  videoId: string | null;
}

interface AnalyticsData {
  comments_sentiment?: any;
  video_stats?: any;
  peak_engagement_time?: any;
  audience_retention?: any;
  error?: string;
  details?: any;
}

const chartConfig = {
  audienceRetention: {
    label: "Average View Duration (seconds)",
    color: "red", // Brighter red color
  },
  peakEngagementViews: {
    label: "Views",
    color: "green", // Brighter green color
  },
  peakEngagementLikes: {
    label: "Likes",
    color: "orange", // Brighter orange color
  },
  peakEngagementComments: {
    label: "Comments",
    color: "blue", // Brighter blue color (or choose another bright color)
  },
} satisfies ChartConfig;

interface ChartDataPoint {
  date: string; // Date for X-axis
  audienceRetention?: number;
  peakEngagementViews?: number;
  peakEngagementLikes?: number;
  peakEngagementComments?: number;
}

type ChartType = "audienceRetention" | "peakEngagement";
type EngagementMetric = "views" | "likes" | "comments";

export function ChartAreaInteractive({ videoId }: ChartAreaInteractiveProps) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");
  const [analyticsData, setAnalyticsData] =
    React.useState<AnalyticsData | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] =
    React.useState<boolean>(false);
  const [analyticsError, setAnalyticsError] = React.useState<string | null>(
    null,
  );
  const [chartDataPoints, setChartDataPoints] = React.useState<
    ChartDataPoint[]
  >([]);
  const [chartType, setChartType] =
    React.useState<ChartType>("audienceRetention");
  const [engagementMetric, setEngagementMetric] =
    React.useState<EngagementMetric>("views");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  React.useEffect(() => {
    const fetchAnalytics = async () => {
      if (!videoId) {
        setAnalyticsData(null);
        return;
      }

      setLoadingAnalytics(true);
      setAnalyticsError(null);
      try {
        const response = await fetch(
          `http://localhost:5000/video-analytics?video_id=${videoId}`, // Adjust URL if needed
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `HTTP error! status: ${response.status}, details: ${
              errorData.error || "Unknown error"
            }`,
          );
        }
        const data: AnalyticsData = await response.json();
        setAnalyticsData(data);
      } catch (error: any) {
        console.error("Could not fetch video analytics for chart:", error);
        setAnalyticsError(
          `Failed to load video analytics for chart. ${error.message || "Please try again."}`,
        );
        setAnalyticsData(null);
        setChartDataPoints([]);
      } finally {
        setLoadingAnalytics(false);
      }
    };

    fetchAnalytics();
  }, [videoId]);

  React.useEffect(() => {
    if (analyticsData) {
      if (
        chartType === "audienceRetention" &&
        analyticsData.audience_retention
      ) {
        const processedData: ChartDataPoint[] =
          analyticsData.audience_retention.map((item: any) => ({
            date: item.date,
            audienceRetention: item.avg_view_duration,
          }));
        setChartDataPoints(processedData);
      } else if (
        chartType === "peakEngagement" &&
        analyticsData.peak_engagement_time
      ) {
        const processedData: ChartDataPoint[] =
          analyticsData.peak_engagement_time.map((item: any) => ({
            date: item.date,
            peakEngagementViews: item.views,
            peakEngagementLikes: item.likes,
            peakEngagementComments: item.comments,
            // You can add other engagement metrics here if needed
          }));
        setChartDataPoints(processedData);
      } else {
        setChartDataPoints([]);
      }
    }
  }, [analyticsData, chartType, engagementMetric]);

  const filteredData = chartDataPoints;

  if (loadingAnalytics) {
    return <div>Loading analytics chart...</div>;
  }

  if (analyticsError) {
    return <div className="text-red-500">{analyticsError}</div>;
  }

  if (!analyticsData) {
    return <div>No analytics data available.</div>;
  }

  if (
    chartType === "audienceRetention" &&
    (!analyticsData.audience_retention || chartDataPoints.length === 0)
  ) {
    return <div>No audience retention data available for chart.</div>;
  }

  if (
    chartType === "peakEngagement" &&
    (!analyticsData.peak_engagement_time || chartDataPoints.length === 0)
  ) {
    return <div>No peak engagement data available for chart.</div>;
  }

  const renderChart = () => {
    if (chartType === "audienceRetention") {
      return (
        <AreaChart
          data={filteredData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient
              id="fillAudienceRetention"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="var(--color-primary)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-primary)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            label={{
              value: "Avg View Duration (seconds)",
              angle: -90,
              position: "insideLeft",
              offset: -10,
            }}
          />
          <Tooltip
            content={
              <ChartTooltipContent
                labelFormatter={(value) => `Date: ${value}`}
                valueFormatter={(value) => `${value} seconds`}
                itemStyle={{ color: "var(--primary)" }}
              />
            }
          />
          <Area
            dataKey="audienceRetention"
            type="natural"
            fill="url(#fillAudienceRetention)"
            stroke="red" // Use red directly here
            stackId="a"
          />
          <Legend />
        </AreaChart>
      );
    } else if (chartType === "peakEngagement") {
      return (
        <AreaChart
          data={filteredData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <Tooltip
            content={
              <ChartTooltipContent
                labelFormatter={(value) => `Date: ${value}`}
                itemStyle={{ color: "var(--primary)" }}
                formatter={(value, name) => [
                  `${value}`,
                  chartConfig[
                    `peakEngagement${name.charAt(0).toUpperCase() + name.slice(1)}`
                  ]?.label || name,
                ]}
              />
            }
          />
          <Area
            type="monotone"
            dataKey="peakEngagementViews"
            stroke="green" // Use green directly here
            fill="green"
            fillOpacity={0.6}
            name="views"
          />
          <Area
            type="monotone"
            dataKey="peakEngagementLikes"
            stroke="orange" // Use orange directly here
            fill="orange"
            fillOpacity={0.6}
            name="likes"
          />
          <Area
            type="monotone"
            dataKey="peakEngagementComments"
            stroke="blue" // Use blue directly here
            fill="blue"
            fillOpacity={0.6}
            name="comments"
          />
          <Legend />
        </AreaChart>
      );
    }
    return null;
  };

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>
          {chartType === "audienceRetention"
            ? "Audience Retention"
            : "Peak Engagement Time"}
        </CardTitle>
        <CardDescription>
          {chartType === "audienceRetention"
            ? "Video audience retention over time (Average View Duration)"
            : "Video peak engagement metrics over time (Views, Likes, Comments)"}
        </CardDescription>
        <CardAction className="flex gap-2">
          <Select
            value={chartType}
            onValueChange={(value) => setChartType(value as ChartType)}
          >
            <SelectTrigger className="w-[180px]" size="sm">
              <SelectValue placeholder="Audience Retention" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="audienceRetention">
                Audience Retention
              </SelectItem>
              <SelectItem value="peakEngagement">
                Peak Engagement Time
              </SelectItem>
            </SelectContent>
          </Select>
          {chartType === "peakEngagement" && (
            <Select
              value={engagementMetric}
              onValueChange={(value) =>
                setEngagementMetric(value as EngagementMetric)
              }
            >
              <SelectTrigger className="w-[120px]" size="sm">
                <SelectValue placeholder="Views" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="views">Views</SelectItem>
                <SelectItem value="likes">Likes</SelectItem>
                <SelectItem value="comments">Comments</SelectItem>
              </SelectContent>
            </Select>
          )}
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          {renderChart()}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
