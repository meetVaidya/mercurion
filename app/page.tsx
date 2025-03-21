"use client"; // This is a client component

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [privacyStatus, setPrivacyStatus] = useState<
    "public" | "private" | "unlisted"
  >("public");
  const [scheduleDays, setScheduleDays] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5000/check_auth_status"); // Adjust URL if your backend is different
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.authenticated);
          if (data.authenticated) {
            router.push("/dashboard"); // Redirect to dashboard if authenticated
          }
        } else {
          console.error("Failed to check auth status");
        }
      } catch (e) {
        console.error("Error checking auth status:", e);
      }
    };
    checkAuth();
  }, [router]); // Add router to dependency array

  const handleAuthClick = async () => {
    window.location.href = "http://localhost:5000/authenticate"; // Redirect to backend auth route
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        YouTube Video Uploader
      </h1>

      {!isAuthenticated ? (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <p style={{ marginBottom: "10px" }}>
            Please authenticate with YouTube to upload videos.
          </p>
          <button
            onClick={handleAuthClick}
            style={{
              padding: "10px 15px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Authenticate with YouTube
          </button>
        </div>
      ) : (
        <div>retry</div>
      )}
    </div>
  );
};

export default HomePage;
