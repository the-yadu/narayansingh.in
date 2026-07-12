"use client";

import { motion } from "framer-motion";

const prompts = [
  "Help me validate a startup idea",
  "How would you build a mobility startup?",
  "Which personal hobby projects are you most proud of?",
  "What’s your engineering philosophy?",
  "How do you balance tech and life?",
  "Plan a Europe family trip",
];

export function SuggestedPrompts({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-2.5">
      {prompts.map((prompt, i) => (
        <motion.button
          key={prompt}
          onClick={() => onSelect(prompt)}
          className="rounded-full border border-border bg-background/40 px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:border-border-strong hover:bg-card-hover hover:text-foreground sm:text-sm"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 + i * 0.035, duration: 0.28 }}
          whileTap={{ scale: 0.98 }}
        >
          {prompt}
        </motion.button>
      ))}
    </div>
  );
}
