"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { AtmosphericBackground } from "@/components/chat/atmospheric-background";
import { HeroInput } from "@/components/chat/hero-input";
import { SuggestedPrompts } from "@/components/chat/suggested-prompts";
import { ChatShell } from "@/components/chat/chat-shell";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ExpandableSections } from "@/components/chat/expandable-sections";
import { useChatStore } from "@/store/chat-store";
import { useMounted } from "@/hooks/use-local-storage";

const focusSignals = ["Founder lens", "Systems depth", "Personal hobby projects"];

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
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto grid min-h-[76vh] w-full max-w-4xl place-content-center gap-8"
          >
            <div className="space-y-5 text-center">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-4 py-2 text-sm text-white/78 backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-cyan-300" />
                Narayan AI
              </div>
              <h1 className="bg-gradient-to-b from-white via-white to-white/62 bg-clip-text text-5xl font-semibold tracking-[-0.04em] text-transparent sm:text-6xl lg:text-7xl">
                Start with a question.
              </h1>
              <p className="mx-auto max-w-2xl text-pretty text-base leading-8 text-white/60 sm:text-lg">
                Explore Narayan&apos;s work, thinking, startups, and engineering journey through a focused, conversational interface.
              </p>
            </div>

            <div className="hero-panel rounded-[2rem] p-3 sm:p-4">
              <HeroInput onSend={(value) => void startConversation(value)} />
              <div className="mt-3">
                <SuggestedPrompts onSelect={(prompt) => void startConversation(prompt)} />
              </div>
            </div>

            <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-3">
              {focusSignals.map((signal) => (
                <div key={signal} className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1.5 text-xs text-white/60 sm:text-sm">
                  {signal}
                </div>
              ))}
            </div>
          </motion.div>
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
