"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Accent tone for the icon chip. */
  tone?: "honey" | "sky";
};

/**
 * A reusable feature/value card: icon chip, title, description. Animates up on
 * scroll (as part of a staggered parent) and lifts subtly on hover.
 */
export function FeatureCard({
  icon: Icon,
  title,
  description,
  tone = "honey",
  className,
}: Feature & { className?: string }) {
  return (
    <motion.div variants={fadeUp}>
      <Card
        className={cn(
          "h-full border-border/70 bg-card transition-shadow duration-300 hover:shadow-lg hover:shadow-brand/5",
          className,
        )}
      >
        <CardContent className="flex flex-col gap-4 p-6">
          <span
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-xl",
              tone === "honey"
                ? "bg-honey text-honey-foreground"
                : "bg-sky text-sky-foreground",
            )}
          >
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground text-pretty">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
