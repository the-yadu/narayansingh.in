"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import type { GitHubProject } from "@/lib/profile-content";
import { githubProjects } from "@/lib/profile-content";

type Section = {
  title: string;
  body: string;
  items?: GitHubProject[];
};

const sections: Section[] = [
  {
    title: "About Narayan",
    body: "Senior engineer and founder-minded builder focused on useful AI-native products, robust systems, and real-world outcomes.",
  },
  {
    title: "Projects",
    body: "Public GitHub projects across active builds, product experiments, utilities, and older learning repos.",
    items: githubProjects,
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
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: i * 0.04, duration: 0.35 }}
        >
          <Card className="px-4 py-4">
            <p className="text-sm font-semibold text-foreground">{section.title}</p>
            <p className="mt-1.5 text-sm text-muted-foreground">{section.body}</p>
            {section.items?.length ? (
              <div className="mt-4 space-y-3">
                {section.items.map((project) => (
                  <a
                    key={project.name}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl border border-white/10 bg-white/5 px-3 py-3 transition hover:border-white/20 hover:bg-white/[0.08]"
                  >
                    <p className="text-sm font-medium text-foreground">{project.name}</p>
                    <p className="mt-1 text-xs text-white/70">{project.tagline}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>
                  </a>
                ))}
              </div>
            ) : null}
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
