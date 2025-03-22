"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, DragEvent } from "react";
import { Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ShortPage() {
  const [uploadStatus, setUploadStatus] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [youtubeInput, setYoutubeInput] = useState("");
  const [youtubeUploadStatus, setYoutubeUploadStatus] = useState("");

  // --- Video file form submission handler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadStatus("uploading");

    // Create FormData to send file
    const formData = new FormData();
    const videoInput = (e.currentTarget as HTMLFormElement).elements.namedItem(
      "video",
    ) as HTMLInputElement;
    if (videoInput && videoInput.files && videoInput.files[0]) {
      formData.append("video", videoInput.files[0]);
    }

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus("Upload successful!");
        setVideoUrl(data.video_url);
      } else {
        setUploadStatus(`Upload failed: ${data.error || "Unknown error"}`);
        setVideoUrl(null);
      }
    } catch (error: any) {
      setUploadStatus(`Upload failed: ${error.message || "Network error"}`);
      setVideoUrl(null);
    }
  };

  // --- YouTube URL form submission handler ---
  const handleYoutubeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setYoutubeUploadStatus("uploading");

    try {
      const response = await fetch("http://localhost:5000/upload_youtube", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ youtube_url: youtubeInput }),
      });

      const data = await response.json();

      if (response.ok) {
        setYoutubeUploadStatus("Upload successful!");
      } else {
        setYoutubeUploadStatus(
          `Upload failed: ${data.error || "Unknown error"}`,
        );
      }
    } catch (error: any) {
      setYoutubeUploadStatus(
        `Upload failed: ${error.message || "Network error"}`,
      );
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleVideoDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-left">Upload Video</h1>
        </header>
        <Card>
          <CardHeader>
            <CardTitle>Upload Video File</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                onDragOver={handleDragOver}
                onDrop={handleVideoDrop}
                onClick={() => document.getElementById("video")?.click()}
                className="border-2 border-dashed border-gray-400 p-4 rounded-md cursor-pointer flex flex-col items-center justify-center min-h-[150px]"
              >
                <p className="text-center">
                  Drag and drop your <strong>VIDEO</strong> file here, or click
                  to select.
                </p>
                <Input
                  type="file"
                  id="video"
                  name="video"
                  accept="video/*"
                  className="hidden"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={uploadStatus === "uploading"}
              >
                {uploadStatus === "uploading" ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <Circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                  </svg>
                ) : null}
                {uploadStatus === "uploading" ? "Uploading..." : "Upload Video"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="my-8 border-b" />

        <Card>
          <CardHeader>
            <CardTitle>Enter YouTube URL</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleYoutubeSubmit} className="space-y-6">
              <Input
                type="text"
                name="youtubeUrl"
                placeholder="https://www.youtube.com/..."
                value={youtubeInput}
                onChange={(e) => setYoutubeInput(e.target.value)}
                className="w-full"
              />
              <Button
                type="submit"
                className="w-full"
                disabled={youtubeUploadStatus === "uploading"}
              >
                {youtubeUploadStatus === "uploading"
                  ? "Uploading..."
                  : "Upload Video"}
              </Button>
            </form>
          </CardContent>
        </Card>
        {(uploadStatus || youtubeUploadStatus) && (
          <p className="mt-4 text-lg text-center">
            {uploadStatus}
            {videoUrl && uploadStatus === "Upload successful!" && (
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {" "}
                View on YouTube
              </a>
            )}
            {youtubeUploadStatus && (
              <span className="ml-2">{youtubeUploadStatus}</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
