"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Lock, Sparkles, Wand2 } from "lucide-react";
import { AtmosphericBackground } from "@/components/chat/atmospheric-background";
import { HeroInput } from "@/components/chat/hero-input";
import { SuggestedPrompts } from "@/components/chat/suggested-prompts";
import { ChatShell } from "@/components/chat/chat-shell";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ExpandableSections } from "@/components/chat/expandable-sections";
import { useChatStore } from "@/store/chat-store";
import { useMounted } from "@/hooks/use-local-storage";

const trustSignals = [
  {
    icon: Sparkles,
    label: "AI-native profile",
    detail: "Answers grounded in projects, engineering work, and public writing.",
  },
  {
    icon: BrainCircuit,
    label: "Fast context switching",
    detail: "Move from startups to systems to travel without losing tone or context.",
  },
  {
    icon: Lock,
    label: "Private local memory",
    detail: "Session history stays in your browser for quick resume and exploration.",
  },
];

const stats = [
  { value: "Founder", label: "product and startup lens" },
  { value: "Engineer", label: "systems and architecture depth" },
  { value: "AI-native", label: "built for conversational discovery" },
];

export default function HomePage() {
  const mounted = useMounted();
  const [starter, setStarter] = useState<string | undefined>(undefined);
  const [chatMode, setChatMode] = useState(false);

  const createConversation = useChatStore((s) => s.createConversation);
  const activeConversationId = useChatStore((s) => s.activeConversationId);

  const startConversation = (prompt: string) => {
    if (!prompt.trim()) return;
    const id = createConversation(prompt);
    setStarter(prompt);
    setChatMode(true);
    return id;
  };

  const currentConversationId = useMemo(() => {
    if (!mounted) return null;
    return activeConversationId;
  }, [activeConversationId, mounted]);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <AtmosphericBackground />

      <motion.section
        layout
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col"
      >
        {!chatMode && (
          <>
            <motion.header
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 text-sm text-white/88">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-cyan-300 text-slate-950 shadow-[0_0_30px_rgba(103,232,249,0.2)]">
                  N
                </div>
                <div>
                  <p className="font-medium">Narayan AI</p>
                  <p className="text-xs text-white/50">Personal AI interface</p>
                </div>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                  Live profile context
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65">
                  Founder • Systems • Mentor
                </div>
              </div>
            </motion.header>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mx-auto mt-8 grid min-h-[72vh] w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:items-center"
            >
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/7 px-4 py-2 text-sm text-white/72 backdrop-blur-xl">
                  <Wand2 className="h-4 w-4 text-cyan-300" />
                  Ask anything about Narayan's work, thinking, products, and life
                </div>

                <div className="space-y-5">
                  <h1 className="max-w-4xl bg-gradient-to-b from-white via-white to-white/55 bg-clip-text text-5xl font-semibold tracking-[-0.04em] text-transparent sm:text-6xl lg:text-7xl">
                    A calmer, sharper way to explore a person through conversation.
                  </h1>
                  <p className="max-w-3xl text-pretty text-base leading-8 text-white/64 sm:text-lg">
                    Narayan AI turns a portfolio into an interface — one that feels closer to Claude and ChatGPT than a static personal site. Ask about products, startups, engineering, mobility, travel, or the ideas behind the work.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div key={stat.value} className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
                      <p className="text-sm font-medium text-white">{stat.value}</p>
                      <p className="mt-1 text-sm leading-6 text-white/52">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero-panel space-y-5 rounded-[2rem] p-4 sm:p-6">
                <div className="space-y-3 px-1">
                  <div className="flex items-center gap-2 text-sm text-cyan-200/85">
                    <Sparkles className="h-4 w-4" />
                    Start with a high-signal prompt
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">Talk with Narayan AI</h2>
                  <p className="text-sm leading-6 text-white/58">
                    Get concise, context-aware responses across engineering, startups, systems design, travel, and builder philosophy.
                  </p>
                </div>

                <HeroInput onSend={(value) => void startConversation(value)} />
                <SuggestedPrompts onSelect={(prompt) => void startConversation(prompt)} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr]"
            >
              {trustSignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <div key={signal.label} className="hero-glass rounded-[1.75rem] p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-base font-medium text-white">{signal.label}</p>
                    <p className="mt-2 text-sm leading-6 text-white/56">{signal.detail}</p>
                  </div>
                );
              })}
            </motion.div>
          </>
        )}

        {chatMode && currentConversationId && (
          <motion.div className="flex w-full flex-col gap-5 pt-2 lg:flex-row lg:items-start">
            <ChatSidebar onNewChat={() => setChatMode(false)} />
            <ChatShell key={currentConversationId} conversationId={currentConversationId} starter={starter} />
          </motion.div>
        )}

        <ExpandableSections />
      </motion.section>
    </main>
  );
}
