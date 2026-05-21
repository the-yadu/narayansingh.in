"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Blocks, Compass, Lightbulb, Map, Rocket, Waypoints } from "lucide-react";
import { Card } from "@/components/ui/card";

const prompts = [
  {
    title: "Validate a startup idea",
    body: "Pressure-test a concept, market wedge, and distribution path.",
    prompt: "Help me validate a startup idea",
    icon: Rocket,
  },
  {
    title: "Build mobility products",
    body: "Explore the playbook for launching in travel or transportation.",
    prompt: "How would you build a mobility startup?",
    icon: Waypoints,
  },
  {
    title: "Personal hobby projects",
    body: "See which public experiments reflect the strongest product instincts.",
    prompt: "Which personal hobby projects are you most proud of?",
    icon: Blocks,
  },
  {
    title: "Engineering philosophy",
    body: "Understand how systems, simplicity, and execution fit together.",
    prompt: "What’s your engineering philosophy?",
    icon: Lightbulb,
  },
  {
    title: "Tech and life balance",
    body: "Ask about grounding ambition with family, travel, and reflection.",
    prompt: "How do you balance tech and life?",
    icon: Compass,
  },
  {
    title: "Plan a family trip",
    body: "Tap into a practical, builder-style approach to travel planning.",
    prompt: "Plan a Europe family trip",
    icon: Map,
  },
];

export function SuggestedPrompts({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
      {prompts.map((item, i) => {
        const Icon = item.icon;

        return (
          <motion.button
            key={item.prompt}
            onClick={() => onSelect(item.prompt)}
            className="text-left"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + i * 0.04, duration: 0.35 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.99 }}
          >
            <Card className="h-full rounded-[1.5rem] border-white/10 bg-white/[0.035] p-4 text-left hover:border-white/20 hover:bg-white/[0.06]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/7 text-cyan-200">
                  <Icon className="h-4 w-4" />
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 text-white/35" />
              </div>
              <p className="mt-4 text-sm font-medium text-white">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-white/52">{item.body}</p>
            </Card>
          </motion.button>
        );
      })}
    </div>
  );
}
