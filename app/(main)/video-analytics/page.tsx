"use client";

import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
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
        {videos.map((video) => (
          <Card
            key={video.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleVideoCardClick(video.id)}
          >
            <CardHeader className="flex flex-row items-start">
              {video.thumbnail_url && (
                <Image
                  src={video.thumbnail_url}
                  alt={`Thumbnail for ${video.title}`}
                  width={120}
                  height={90}
                  className="rounded-md mr-4"
                />
              )}
              <div>
                <CardTitle>{video.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
                {video.description}
              </CardDescription>
              <div className="mt-2 text-xs">
                <div>
                  <strong>Privacy:</strong> {video.privacy_status}
                </div>
                <div>
                  <strong>Views:</strong> {video.view_count}
                </div>
                <div>
                  <strong>Likes:</strong> {video.like_count}
                </div>
                <div>
                  <strong>Comments:</strong> {video.comment_count}
                </div>
                {video.tags && video.tags.length > 0 && (
                  <div>
                    <strong>Tags:</strong> {video.tags.join(", ")}
                  </div>
                )}
                {video.scheduled_time && (
                  <div>
                    <strong>Scheduled:</strong> {video.scheduled_time}
                  </div>
                )}
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
    // In a real application, you would fetch video details based on videoId here.
    // For now, we'll just pass the videoId down to the components.
    return (
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards videoId={videoId} />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive videoId={videoId} />
              {/* Pass videoId as prop */}
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
