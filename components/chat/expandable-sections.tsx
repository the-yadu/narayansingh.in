"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const sections = [
  {
    title: "About Narayan",
    body: "Senior engineer and founder-minded builder focused on useful AI-native products, robust systems, and real-world outcomes.",
  },
  {
    title: "Projects",
    body: "From software platforms to mobility ideas, each project is built with practical execution and long-term systems thinking.",
  },
  {
    title: "AI Experiments",
    body: "Rapid prototypes around AI copilots, decision support, and productivity workflows that blend intelligence with utility.",
  },
  {
    title: "Travel & Life",
    body: "Mountains, roads, family trips, and reflective pauses shape a grounded perspective on ambition and creativity.",
  },
  {
    title: "Thoughts & Philosophy",
    body: "Build what matters, simplify relentlessly, and optimize for sustained outcomes over short-term hype.",
  },
  {
    title: "Building in Public",
    body: "Sharing lessons from startup execution, engineering trade-offs, and product strategy with honest reflection.",
  },
  {
    title: "Contact",
    body: "Collaborations, product ideas, and meaningful conversations are always welcome.",
  },
];

export function ExpandableSections() {
  return (
    <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">
      {sections.map((section, i) => (
        <motion.details
          key={section.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: i * 0.04, duration: 0.35 }}
          className="group"
        >
          <Card className="cursor-pointer px-4 py-3 transition hover:border-white/25">
            <summary className="list-none text-sm font-medium marker:hidden">{section.title}</summary>
            <p className="mt-2 text-sm text-muted-foreground">{section.body}</p>
          </Card>
        </motion.details>
      ))}
    </div>
  );
}
