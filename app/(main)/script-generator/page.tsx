"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  PackageIcon,
  ThermometerIcon,
  RulerIcon,
  CoffeeIcon,
} from "lucide-react"; // Import icons

export default function Page() {
  // Title input state
  const [title, setTitle] = useState("");

  // Simulated backend response (replace with your actual fetched data)
  const generatedData = {
    title:
      "Brewing the Perfect Cup: A Beginner's Guide to Making Coffee at Home",
    steps: [
      {
        description:
          "Before you start, make sure you have everything you need: Freshly roasted coffee beans (whole or ground), a coffee maker (drip, French press, pour-over, etc.), a coffee grinder (if using whole beans), water, and a mug.",
        step_number: 1,
        title: "Gather Your Supplies",
        visual_suggestions:
          "Shot of various coffee beans, different types of coffee makers lined up, a grinder, and a selection of mugs.",
      },
      {
        description:
          "If using whole beans, grind them to the correct consistency for your chosen brewing method. A coarser grind is best for French press, a medium grind for drip coffee, and a finer grind for espresso or pour-over.",
        step_number: 2,
        title: "Grind Your Beans (If Necessary)",
        visual_suggestions:
          "Close-up of coffee beans being poured into a grinder, the grinder in action, and shots of different grind sizes with labels (coarse, medium, fine).",
      },
      {
        description:
          "Heat fresh, filtered water to the ideal temperature: between 195-205°F (90-96°C). Use a kettle with a temperature gauge or bring the water to a boil and let it sit for a minute before brewing.",
        step_number: 3,
        title: "Heat Your Water",
        visual_suggestions:
          "Water being poured into a kettle, a close-up of a temperature gauge on a kettle, steam rising from hot water.",
      },
      {
        description:
          "Measure the correct amount of coffee grounds for your chosen brewing method. A general guideline is 2 tablespoons of ground coffee per 6 ounces of water. Adjust to your taste preferences.",
        step_number: 4,
        title: "Measure Coffee Grounds",
        visual_suggestions:
          "A measuring spoon scooping coffee grounds, a close-up of the grounds being poured into the coffee maker or filter.",
      },
      {
        description:
          "Follow the instructions for your chosen brewing method. For drip coffee, add the coffee grounds to the filter, pour water into the reservoir, and turn on the machine. For French press, add coffee grounds to the carafe, pour in hot water, stir gently, let steep for 4 minutes, and then press the plunger down slowly. For pour-over, slowly pour hot water over the grounds in a circular motion.",
        step_number: 5,
        title: "Brew Your Coffee",
        visual_suggestions:
          "Time-lapse of a drip coffee maker brewing, step-by-step instructions for French press with visuals, demonstration of the pour-over technique.",
      },
      {
        description:
          "Once the coffee is brewed, pour it into your mug and enjoy! Add milk, sugar, or other sweeteners to your taste. Experiment with different beans and brewing methods to find your perfect cup.",
        step_number: 6,
        title: "Serve and Enjoy",
        visual_suggestions:
          "Coffee being poured into a mug, someone adding milk and sugar, a close-up of a steaming cup of coffee, various coffee drinks being enjoyed.",
      },
    ],
  };

  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return PackageIcon;
      case 2:
        return CoffeeIcon;
      case 3:
        return ThermometerIcon;
      case 4:
        return RulerIcon;
      case 5:
        return CoffeeIcon;
      case 6:
        return CoffeeIcon;
      default:
        return null; // Or a default icon
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
        </Card>

        {/* Generated Output Section Card */}
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
            {generatedData.steps.map((step) => {
              const StepIcon = getStepIcon(step.step_number);
              return (
                <Card key={step.step_number} className="bg-muted border">
                  <CardHeader className="flex flex-row items-center space-x-3">
                    {StepIcon && <StepIcon className="w-6 h-6 text-primary" />}
                    <CardTitle className="text-lg font-semibold">
                      Step {step.step_number}: {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      {step.description}
                    </p>
                    <Badge variant="secondary">
                      Visual Suggestions: {step.visual_suggestions}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
