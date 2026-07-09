import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("surface rounded-2xl text-card-foreground", className)}
      {...props}
    />
  );
}
