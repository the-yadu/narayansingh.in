"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function TypingIndicator() {
  return (
    <Card className="inline-flex w-fit items-center gap-2 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-indigo-300/80"
          animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </Card>
  );
}
