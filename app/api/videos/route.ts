import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "../../lib/auth";

// Proxy endpoint to fetch videos from Flask backend
export const GET = withAuth(async (req: NextRequest) => {
  try {
    // Forward the request to the Flask backend
    const flaskResponse = await fetch("http://localhost:5000/videos", {
      method: "GET",
      headers: {
        // Pass any necessary headers (e.g., Flask might require auth tokens in the future)
        "Content-Type": "application/json",
        // If Flask uses the same session ID mechanism, pass it along
        "x-session-id": req.headers.get("x-session-id") || "",
      },
    });

    // Check if the Flask response is successful
    if (!flaskResponse.ok) {
      const errorData = await flaskResponse.json();
      return NextResponse.json(
        {
          error: errorData.error || "Failed to fetch videos from Flask backend",
        },
        { status: flaskResponse.status },
      );
    }

    // Parse the Flask response data
    const videoData = await flaskResponse.json();

    // Return the data to the frontend
    return NextResponse.json(videoData);
  } catch (error) {
    console.error("Error fetching videos from Flask backend:", error);
    return NextResponse.json(
      { error: "Internal server error while fetching videos" },
      { status: 500 },
    );
  }
});
