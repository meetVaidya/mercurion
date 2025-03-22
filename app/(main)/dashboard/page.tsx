"use client";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { useEffect, useState } from "react";

interface ChannelStats {
  channelTitle: string;
  subscribers: number;
  views: number;
  videos: number;
  growthRate: string;
}

export default function Page() {
  const [channelStats, setChannelStats] = useState<ChannelStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const channelId = "UCPSx0HjguH7RcqtEz4E4Eiw"; // Replace with your channel ID

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:5000/channel_stats/${channelId}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const dataFromAPI = await response.json();
        const mappedData: ChannelStats = {
          channelTitle: dataFromAPI.title,
          subscribers: dataFromAPI.subscriberCount,
          views: dataFromAPI.viewCount,
          videos: dataFromAPI.videoCount,
          growthRate: dataFromAPI.growthRate,
        };
        setChannelStats(mappedData);
      } catch (e: any) {
        console.error("Could not fetch channel stats:", e);
        setError("Failed to load channel stats.");
        setChannelStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [channelId]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {error && <div className="text-red-500 px-4">{error}</div>}
          {loading && <div className="px-4">Loading channel stats...</div>}
          {!loading && !error && <SectionCards stats={channelStats} />}
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
        </div>
      </div>
    </div>
  );
}
