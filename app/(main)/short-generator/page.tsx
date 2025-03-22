"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CalendarIcon, Circle, X } from "lucide-react";
import { ChangeEvent, DragEvent, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ShortPage() {
  // File and preview states
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // Text states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Tag states
  const [tagInput, setTagInput] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);

  // Calendar state (publish date)
  const today = new Date().toISOString().split("T")[0];
  const [publishDate, setPublishDate] = useState<Date | null>(new Date());

  // Privacy status and schedule
  const [privacyStatus, setPrivacyStatus] = useState("public");
  const [day, setDay] = useState(0);

  // Status message after submission
  const [uploadStatus, setUploadStatus] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // State to store video URL from response

  // --- Handlers for file drops/selection ---
  const handleVideoFileSelect = (file: File) => {
    if (file) {
      setVideoFile(file);
    }
  };

  const handleThumbnailFileSelect = (file: File) => {
    if (file) {
      setThumbnailFile(file);
    }
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleVideoFileSelect(e.target.files[0]);
    }
  };

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleThumbnailFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleVideoDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleVideoFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleThumbnailDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleThumbnailFileSelect(e.dataTransfer.files[0]);
    }
  };

  // --- Tag input handlers ---
  const handleTagInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInput(value);

    // Check if a comma was typed
    if (value.includes(",")) {
      const newTag = value.split(",")[0].trim();
      if (newTag && !tagList.includes(newTag)) {
        setTagList([...tagList, newTag]);
      }
      setTagInput("");
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tagList.includes(tagInput.trim())) {
        setTagList([...tagList, tagInput.trim()]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTagList(tagList.filter((tag) => tag !== tagToRemove));
  };

  // --- Form submission handler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadStatus("uploading"); // Set status to uploading

    // Create FormData to send files and meta-data
    const formData = new FormData();
    if (videoFile) formData.append("video", videoFile);
    if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tagList.join(",")); // Changed to comma-separated string
    formData.append("privacy_status", privacyStatus); // Changed to match backend
    formData.append("day", day.toString()); // Changed to match backend

    try {
      const response = await fetch("/upload", {
        // Changed endpoint to /upload
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus("Upload successful!");
        setVideoUrl(data.video_url); // Store the video URL
        // Optionally reset form fields after successful upload
        setVideoFile(null);
        setThumbnailFile(null);
        setTitle("");
        setDescription("");
        setTagList([]);
        setTagInput("");
        setPublishDate(new Date());
        setPrivacyStatus("public");
        setDay(0);
      } else {
        setUploadStatus(`Upload failed: ${data.error || "Unknown error"}`); // Show error from backend or generic message
        setVideoUrl(null);
      }
    } catch (error: any) {
      setUploadStatus(`Upload failed: ${error.message || "Network error"}`); // Handle network errors
      setVideoUrl(null);
    }
  };

  useEffect(() => {
    const loadDefaultVideo = async () => {
      try {
        const response = await fetch("/5_final_output.mp4");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        const defaultVideoFile = new File([blob], "default-video.mp4", {
          type: "video/mp4",
        });
        setVideoFile(defaultVideoFile);
      } catch (error) {
        console.error("Error loading default video:", error);
      }
    };

    loadDefaultVideo();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-left">
            Upload Video to YouTube
          </h1>
        </header>

        <div
          className="
            grid
            md:grid-cols-[1fr_1fr]
            gap-4
          "
        >
          {/* Middle Column: Two Stacked Cards */}
          <div className="flex flex-col gap-6">
            {/* Video File Card */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Video File</CardTitle>
                <CardDescription>
                  Drag and drop your video or click to select.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleVideoDrop}
                  onClick={() => document.getElementById("video")?.click()}
                  className="border-2 border-dashed border-gray-400 p-4 rounded-md cursor-pointer flex flex-col items-center justify-center min-h-[150px]"
                >
                  <p className="text-center">
                    Drag and drop your <strong>VIDEO</strong> file here, or
                    click to select.
                  </p>
                  <Input
                    type="file"
                    id="video"
                    onChange={handleVideoChange}
                    accept="video/*"
                    className="hidden"
                  />
                </div>
                <div className="mt-4 flex items-center justify-center border rounded-md p-2">
                  {videoFile ? (
                    <video
                      src={URL.createObjectURL(videoFile)}
                      controls
                      className="max-h-40 w-full object-contain"
                    />
                  ) : (
                    <p className="text-center text-gray-500">
                      Video preview will appear here.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Thumbnail File Card */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Thumbnail</CardTitle>
                <CardDescription>
                  Drag and drop your thumbnail or click to select.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleThumbnailDrop}
                  onClick={() => document.getElementById("thumbnail")?.click()}
                  className="border-2 border-dashed border-gray-400 p-4 rounded-md cursor-pointer flex flex-col items-center justify-center min-h-[150px]"
                >
                  <p className="text-center">
                    Drag and drop your <strong>THUMBNAIL</strong> file here, or
                    click to select.
                  </p>
                  <Input
                    type="file"
                    id="thumbnail"
                    onChange={handleThumbnailChange}
                    accept="image/jpeg,image/png"
                    className="hidden"
                  />
                </div>
                <div className="mt-4 flex items-center justify-center border rounded-md p-2">
                  {thumbnailFile ? (
                    <img
                      src={URL.createObjectURL(thumbnailFile)}
                      alt="Thumbnail preview"
                      className="max-h-40 w-full object-contain"
                    />
                  ) : (
                    <p className="text-center text-gray-500">
                      Thumbnail preview will appear here.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Form Card */}
          <Card>
            <CardHeader>
              <CardTitle>Video Details</CardTitle>
              <CardDescription>
                Enter video information and publishing options.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Video Title"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Video Description"
                  />
                </div>

                {/* Tags with Badge Preview */}
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {tagList.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="flex items-center gap-1 dark:bg-white dark:text-gray-800"
                        >
                          {tag}
                          <X
                            size={14}
                            className="cursor-pointer"
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                    <Input
                      type="text"
                      id="tags"
                      value={tagInput}
                      onChange={handleTagInput}
                      onKeyDown={handleTagKeyDown}
                      placeholder="Type a tag and press comma or Enter to add"
                    />
                  </div>
                </div>

                {/* Publish Date */}
                <div className="space-y-2">
                  <Label htmlFor="publishDate">Publish Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-[240px] pl-3 text-left font-normal")}
                      >
                        {publishDate ? (
                          <span>{publishDate.toLocaleDateString()}</span>
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={publishDate}
                        onSelect={setPublishDate}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Privacy Status */}
                <div className="space-y-2">
                  <Label htmlFor="privacy_status">Privacy Status</Label>
                  <Select
                    onValueChange={(value) => setPrivacyStatus(value)}
                    defaultValue={privacyStatus}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select privacy status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">
                        Private (scheduled)
                      </SelectItem>
                      <SelectItem value="unlisted">Unlisted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Scheduled Days (if private) */}
                {privacyStatus === "private" && (
                  <div className="space-y-2">
                    <Label htmlFor="day">Schedule Days from Now</Label>
                    <Input
                      type="number"
                      id="day"
                      value={day}
                      onChange={(e) => setDay(Number(e.target.value))}
                      placeholder="0"
                    />
                  </div>
                )}
              </form>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                form=""
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
            </CardFooter>
          </Card>
        </div>

        {uploadStatus && (
          <p className="mt-4 text-lg text-center">
            {uploadStatus}{" "}
            {videoUrl && uploadStatus === "Upload successful!" && (
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View on YouTube
              </a>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
