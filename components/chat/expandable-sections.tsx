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
              <Card className="h-full rounded-[1.75rem] border-white/10 bg-white/[0.035] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/7 text-cyan-200">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-base font-medium text-white">{card.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/56">{card.body}</p>
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
        <Card className="rounded-[2rem] border-white/10 bg-white/[0.035] p-5 sm:p-6">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-cyan-200/85">
                <Blocks className="h-4 w-4" />
                Selected personal hobby projects
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">A tighter view of the work behind the profile</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/58">
                Featured builds span AI-native products, early experiments, and purposeful utilities. The rest of the public repos remain accessible as a compact index below.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60">
              <span className="block text-lg font-semibold text-white">{hobbyProjects.length}</span>
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
                className="group rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-medium text-white">{project.name}</p>
                    <p className="mt-1 text-sm text-cyan-200/80">{project.tagline}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/35 transition group-hover:text-white/75" />
                </div>
                <p className="mt-4 text-sm leading-6 text-white/56">{project.summary}</p>
              </motion.a>
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/20 p-4 sm:p-5">
            <p className="text-sm font-medium text-white">More public repos</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {remainingProjects.map((project) => (
                <a
                  key={project.name}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/58 transition hover:border-white/20 hover:text-white"
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
