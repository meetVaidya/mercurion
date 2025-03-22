"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(" flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function PricingSections() {
  return (
    <div className="space-y-32 py-24 dark:bg-black flex justify-center">
      {/* Style 5: Feature Matrix */}
      <section className="container px-4">
        <Card className="p-6">
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            className="grid gap-6"
          >
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1" />
              {["Basic", "Pro", "Business"].map((plan) => (
                <motion.div
                  key={plan}
                  transition={{ duration: 0.5 }} // 将 transition 放在外部
                  variants={fadeIn}
                  className="text-center"
                >
                  <h3 className="font-semibold">{plan}</h3>
                  <p className="text-2xl font-bold mt-2">
                    ${plan === "Basic" ? "29" : plan === "Pro" ? "59" : "99"}
                  </p>
                </motion.div>
              ))}
            </div>
            {[
              "Core Features",
              "Advanced Analytics",
              "Priority Support",
              "Custom Domain",
              "API Access",
            ].map((feature, i) => (
              <motion.div
                key={feature}
                variants={fadeIn}
                className="grid grid-cols-4 gap-4 py-3 border-t border-border"
              >
                <span className="text-muted-foreground">{feature}</span>
                {[1, 2, 3].map((level) => (
                  <div key={level} className="flex justify-center">
                    {level >= Math.ceil(i / 2) + 1 ? (
                      <Check className="size-5 text-primary" />
                    ) : (
                      <div className="size-5" />
                    )}
                  </div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </Card>
      </section>
    </div>
  );
}
