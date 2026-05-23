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
          className="rounded-full border border-white/12 bg-white/[0.045] px-3 py-2 text-left text-xs text-white/70 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white sm:text-sm"
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
