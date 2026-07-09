"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Blocks, Compass, MessageSquareText, Orbit, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { hobbyProjects } from "@/lib/profile-content";

const overviewCards = [
  {
    title: "About Narayan",
    body: "Senior engineer and founder-minded builder focused on useful AI-native products, robust systems, and real-world outcomes.",
    icon: Sparkles,
  },
  {
    title: "Building in public",
    body: "Sharing lessons from startup execution, engineering trade-offs, and product strategy with honest reflection.",
    icon: Orbit,
  },
  {
    title: "Travel & life",
    body: "Mountains, roads, and family trips shape a grounded perspective on ambition, creativity, and pace.",
    icon: Compass,
  },
  {
    title: "Thoughts & philosophy",
    body: "Build what matters, simplify relentlessly, and optimize for sustained outcomes over short-term hype.",
    icon: MessageSquareText,
  },
];

const featuredProjects = hobbyProjects.slice(0, 6);
const remainingProjects = hobbyProjects.slice(6);

export function ExpandableSections() {
  return (
    <div className="mx-auto mt-12 flex w-full max-w-6xl flex-col gap-6 pb-2">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
            >
              <Card className="h-full rounded-2xl p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/40 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-base font-medium text-foreground">{card.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.body}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="rounded-3xl p-5 sm:p-6">
          <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-primary">
                <Blocks className="h-4 w-4" />
                Selected personal hobby projects
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">A tighter view of the work behind the profile</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                Featured builds span AI-native products, early experiments, and purposeful utilities. The rest of the public repos remain accessible as a compact index below.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-muted-foreground">
              <span className="block text-lg font-semibold text-foreground">{hobbyProjects.length}</span>
              public personal hobby projects
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <motion.a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.04, duration: 0.3 }}
                className="group rounded-2xl border border-border bg-background/30 p-5 transition-all hover:-translate-y-0.5 hover:border-border-strong hover:bg-card-hover"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-medium text-foreground">{project.name}</p>
                    <p className="mt-1 text-sm text-primary/80">{project.tagline}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-subtle-foreground transition-colors group-hover:text-foreground" />
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{project.summary}</p>
              </motion.a>
            ))}
          </div>

          <div className="surface-inset mt-6 rounded-2xl p-4 sm:p-5">
            <p className="text-sm font-medium text-foreground">More public repos</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {remainingProjects.map((project) => (
                <a
                  key={project.name}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border bg-card px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
                >
                  {project.name}
                </a>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
