"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
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
    // Changed config to reflect audience retention data
    label: "Audience Retention",
  },
  retentionRate: {
    // Assuming retention rate is a key in your audience_retention data
    label: "Retention Rate",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

interface RetentionDataPoint {
  time: number; // Time in seconds or percentage, adjust accordingly
  retentionRate: number; // Retention rate at that time point
}

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
    RetentionDataPoint[]
  >([]);

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

        // Process audience retention data to fit chart format
        if (data.audience_retention && data.audience_retention.retention_data) {
          const processedData: RetentionDataPoint[] = Object.entries(
            data.audience_retention.retention_data,
          ).map(([timePercentage, retentionPercentage]) => ({
            time: parseFloat(timePercentage), // Assuming keys are percentages as strings
            retentionRate: parseFloat(retentionPercentage), // Assuming values are percentages as strings
          }));
          setChartDataPoints(processedData);
        } else {
          setChartDataPoints([]); // No retention data or incorrect format
        }
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

  const filteredData = chartDataPoints; // No time range filtering for audience retention for now

  if (loadingAnalytics) {
    return <div>Loading analytics chart...</div>;
  }

  if (analyticsError) {
    return <div className="text-red-500">{analyticsError}</div>;
  }

  if (
    !analyticsData ||
    !analyticsData.audience_retention ||
    chartDataPoints.length === 0
  ) {
    return <div>No audience retention data available for chart.</div>;
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Audience Retention</CardTitle>
        <CardDescription>Video audience retention over time</CardDescription>
        {/* Time range selection - might not be relevant for audience retention chart */}
        {/* <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction> */}
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            {" "}
            {/* Use fetched and processed chartDataPoints */}
            <defs>
              <linearGradient id="fillRetention" x1="0" y1="0" x2="0" y2="1">
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
              dataKey="time" // Use 'time' from processed data points
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              label={{
                value: "Video Time (%)",
                position: "bottom",
                offset: -10,
              }} // X-axis label
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{
                value: "Retention Rate (%)",
                angle: -90,
                position: "insideLeft",
                offset: -10,
              }} // Y-axis label
            />
            <Tooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `Time: ${value}%`} // Format time in tooltip
                  valueFormatter={(value) => `${value}%`} // Format retention rate in tooltip
                  indicator="dot"
                  itemStyle={{ color: "var(--primary)" }}
                />
              }
            />
            <Area
              dataKey="retentionRate" // Use 'retentionRate' from processed data points
              type="natural"
              fill="url(#fillRetention)"
              stroke="var(--color-primary)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
