"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const prompts = [
  "Help me validate a startup idea",
  "How would you build a mobility startup?",
  "Which hobby projects are you most proud of?",
  "What’s your engineering philosophy?",
  "How do you balance tech and life?",
  "Plan a Europe family trip",
  "What AI tools do you use daily?",
  "How would you architect a scalable app?",
  "What lessons did you learn building products?",
];

export function SuggestedPrompts({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {prompts.map((prompt, i) => (
        <motion.button
          key={prompt}
          onClick={() => onSelect(prompt)}
          className="text-left"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.05, duration: 0.35 }}
          whileHover={{ y: -3, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Card className="h-full border-white/15 px-4 py-3 text-sm text-muted-foreground hover:text-foreground">
            {prompt}
          </Card>
        </motion.button>
      ))}
    </div>
  );
}
