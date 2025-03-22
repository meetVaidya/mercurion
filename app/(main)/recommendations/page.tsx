"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface ContentIdea {
  title: string;
  description: string;
  relevant_trends: string[];
}

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<string[] | null>(null);
  const [ideas, setIdeas] = useState<ContentIdea[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecommendations = async () => {
    setLoading(true);
    setError(null);
    setRecommendations(null); // Clear previous recommendations
    setIdeas(null); // Clear previous ideas

    try {
      const response = await fetch("http://localhost:5000/top_recommendations");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to generate recommendations: ${response.status} - ${
            errorData?.error || "Unknown error"
          }`,
        );
      }
      const data = await response.json();
      setRecommendations(data.top_3_recommendations);
      setIdeas(data.content_creation_ideas);
    } catch (e: any) {
      console.error("Error fetching recommendations:", e);
      setError(
        e.message || "Failed to generate recommendations. Please try again.",
      );
      setRecommendations(null);
      setIdeas(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            YouTube Video Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button onClick={handleGenerateRecommendations} disabled={loading}>
            {loading
              ? "Generating Recommendations..."
              : "Generate Recommendations"}
          </Button>

          {error && <div className="text-red-500">{error}</div>}

          {loading && !error && <div>Loading recommendations...</div>}

          {recommendations && recommendations.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">
                Top 3 Video Title Recommendations:
              </h2>
              <ul className="list-disc list-inside">
                {recommendations.map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                ))}
              </ul>
            </div>
          )}

          {ideas && ideas.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">
                Content Creation Ideas:
              </h2>
              <ul className="list-disc list-inside">
                {ideas.map((idea, index) => (
                  <li key={index} className="mb-4">
                    <h3 className="font-semibold">{idea.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {idea.description}
                    </p>
                    {idea.relevant_trends &&
                      idea.relevant_trends.length > 0 && (
                        <div className="mt-2">
                          <h4 className="text-xs font-semibold">
                            Relevant Trends:
                          </h4>
                          <ul className="list-disc list-inside text-xs">
                            {idea.relevant_trends.map((trend, trendIndex) => (
                              <li key={trendIndex}>{trend}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recommendations &&
            recommendations.length === 0 &&
            ideas &&
            ideas.length === 0 &&
            !loading &&
            !error && <div>No recommendations or ideas generated.</div>}
        </CardContent>
      </Card>
    </div>
  );
}
