"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LoaderIcon,
  FileTextIcon,
  ClipboardIcon,
  XIcon,
  CheckIcon,
} from "lucide-react";
import { toast } from "sonner";

interface Step {
  title: string;
  description: string;
  step_number: number;
  visual_suggestions: string;
}

interface ScriptData {
  title: string;
  steps: Step[];
}

export default function Page() {
  // Title input state
  const [title, setTitle] = useState("");
  // Loading state
  const [loading, setLoading] = useState(false);
  // Error state
  const [error, setError] = useState<string | null>(null);
  // Generated data state
  const [generatedData, setGeneratedData] = useState<ScriptData | null>(null);
  // Copy state
  const [copying, setCopying] = useState(false);

  // Function to handle form submission
  const handleGenerateScript = async () => {
    if (!title.trim()) {
      setError("Please enter a title for your tutorial");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/generate_script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate script");
      }

      const data = await response.json();
      setGeneratedData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
      console.error("Error generating script:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyScript = async () => {
    if (!generatedData) return;

    setCopying(true);
    try {
      const scriptText =
        `${generatedData.title}\n\n` +
        generatedData.steps
          .map(
            (step) =>
              `Step ${step.step_number}: ${step.title}\n${step.description}\n` +
              `Visual Suggestions: ${step.visual_suggestions}\n`,
          )
          .join("\n");

      await navigator.clipboard.writeText(scriptText);
      toast.success("Script Copied!", {
        description: "The tutorial script has been copied to your clipboard.",
      });
    } catch (err) {
      toast.error("Copy Failed", {
        description: "Failed to copy script to clipboard. Please try again.",
      });
    } finally {
      setCopying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="container mx-auto space-y-6">
        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-4">
          Create a New Tutorial Script
        </h1>

        {/* Title Input Card */}
        <Card className="bg-secondary shadow-md">
          <CardHeader>
            <CardTitle>Tutorial Title</CardTitle>
            <CardDescription>
              Enter the title for your tutorial.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="titleInput">Title:</Label>
                <Input
                  id="titleInput"
                  type="text"
                  placeholder="e.g., How to Brew the Perfect Coffee"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleGenerateScript}
              disabled={loading || title.trim() === ""}
              className="w-full"
            >
              {loading ? (
                <>
                  <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                  Generating Script...
                </>
              ) : (
                <>
                  <FileTextIcon className="mr-2 h-4 w-4" />
                  Generate Script
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Error message */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="flex items-center">
              <XIcon className="h-4 w-4 mr-2" />
              {error}
            </span>
          </div>
        )}

        {/* Generated Output Section Card - Only shown when data is available */}
        {generatedData && (
          <Card className="bg-secondary shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {generatedData.title}
              </CardTitle>
              <CardDescription>
                Generated steps for your tutorial script.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {generatedData.steps.map((step) => (
                <Card key={step.step_number} className="bg-muted border">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      Step {step.step_number}: {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      {step.description}
                    </p>
                    <Badge variant="secondary" className="text-wrap text-xs">
                      Visual Suggestions: {step.visual_suggestions}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
            <CardFooter className="justify-end">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleCopyScript}
                disabled={copying}
              >
                {copying ? (
                  <>
                    <LoaderIcon className="h-4 w-4 animate-spin" />
                    Copying...
                  </>
                ) : (
                  <>
                    <ClipboardIcon className="h-4 w-4" />
                    Copy Script
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
