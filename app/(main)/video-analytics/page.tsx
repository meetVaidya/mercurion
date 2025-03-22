"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SectionCards } from "@/components/analytics-section-cards";
import { ChartAreaInteractive } from "@/components/analytics-chart";

interface Video {
  id: string;
  title: string;
  description: string;
  tags: string[];
  privacy_status: string;
  scheduled_time: string | null;
  thumbnail_url: string | null;
  view_count: string;
  like_count: string;
  comment_count: string;
}

export default function Page() {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loadingVideos, setLoadingVideos] = useState<boolean>(true);
  const [videoError, setVideoError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideosData = async () => {
      setLoadingVideos(true);
      setVideoError(null);
      try {
        const response = await fetch("http://localhost:5000/videos"); // Adjust URL if needed
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVideos(data);
      } catch (error: any) {
        console.error("Could not fetch videos:", error);
        setVideoError(
          "Failed to load videos. Please check the backend and try again.",
        );
      } finally {
        setLoadingVideos(false);
      }
    };

    fetchVideosData();
  }, []);

  const handleVideoCardClick = (videoId: string) => {
    setSelectedVideoId(videoId);
  };

  const renderVideoList = () => {
    if (loadingVideos) {
      return <div>Loading videos...</div>;
    }

    if (videoError) {
      return <div className="text-red-500">{videoError}</div>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...videos]
          .sort(
            (a, b) => parseInt(b.view_count, 10) - parseInt(a.view_count, 10),
          )
          .map((video) => (
            <Card
              key={video.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleVideoCardClick(video.id)}
            >
              <CardHeader className="flex flex-col items-center">
                {video.thumbnail_url && (
                  <Image
                    src={video.thumbnail_url}
                    alt={`Thumbnail for ${video.title}`}
                    width={240}
                    height={180}
                    className="rounded-md mb-2"
                  />
                )}
                <CardTitle className="text-lg text-center">
                  {video.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="font-semibold">Privacy:</div>
                  <div>{video.privacy_status}</div>
                </div>
                <div>
                  <div className="font-semibold">Views:</div>
                  <div>{video.view_count}</div>
                </div>
                <div>
                  <div className="font-semibold">Likes:</div>
                  <div>{video.like_count}</div>
                </div>
                <div>
                  <div className="font-semibold">Comments:</div>
                  <div>{video.comment_count}</div>
                </div>
                {video.scheduled_time && (
                  <div>
                    <div className="font-semibold">Scheduled:</div>
                    <div>{video.scheduled_time}</div>
                  </div>
                )}
                {video.tags && video.tags.length > 0 && (
                  <div className="col-span-2">
                    <div className="font-semibold">Tags:</div>
                    <div>{video.tags.join(", ")}</div>
                  </div>
                )}
                <div className="col-span-2 mt-2">
                  <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
                    {video.description}
                  </CardDescription>
                </div>
              </CardContent>
              <CardFooter>
                <CardDescription>Video ID: {video.id}</CardDescription>
              </CardFooter>
            </Card>
          ))}
      </div>
    );
  };

  const renderVideoAnalytics = (videoId: string) => {
    return (
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards videoId={videoId} /> {/* Pass videoId prop */}
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive videoId={videoId} />
              {/* Pass videoId prop */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Video Analytics Dashboard</h1>
      {selectedVideoId ? (
        <div className="space-y-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setSelectedVideoId(null)}
          >
            Back to Video List
          </Button>
          {renderVideoAnalytics(selectedVideoId)}
        </div>
      ) : (
        renderVideoList()
      )}
    </div>
  );
}
