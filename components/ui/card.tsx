import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("hero-glass luminous-border rounded-2xl bg-card/40 text-card-foreground shadow-xl", className)}
      {...props}
    />
  );
}
