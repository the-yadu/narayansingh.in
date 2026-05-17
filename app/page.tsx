"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AtmosphericBackground } from "@/components/chat/atmospheric-background";
import { HeroInput } from "@/components/chat/hero-input";
import { SuggestedPrompts } from "@/components/chat/suggested-prompts";
import { ChatShell } from "@/components/chat/chat-shell";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ExpandableSections } from "@/components/chat/expandable-sections";
import { useChatStore } from "@/store/chat-store";
import { useMounted } from "@/hooks/use-local-storage";

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
    <main className="relative min-h-screen px-4 pb-14 pt-8 sm:px-6 lg:px-10">
      <AtmosphericBackground />

      <motion.section
        layout
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center"
      >
        {!chatMode && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[74vh] w-full flex-col items-center justify-center gap-8"
          >
            <div className="text-center">
              <h1 className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-6xl">
                Talk with Narayan AI
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-pretty text-sm text-muted-foreground sm:text-lg">
                Engineer. Founder. Builder. Systems thinker. Exploring AI, products, mobility, travel, and life.
              </p>
            </div>

            <div className="w-full max-w-4xl space-y-5">
              <HeroInput onSend={(value) => void startConversation(value)} />
              <SuggestedPrompts onSelect={(prompt) => void startConversation(prompt)} />
            </div>
          </motion.div>
        )}

        {chatMode && currentConversationId && (
          <motion.div className="flex w-full flex-col gap-4 lg:flex-row">
            <ChatSidebar onNewChat={() => setChatMode(false)} />
            <ChatShell key={currentConversationId} conversationId={currentConversationId} starter={starter} />
          </motion.div>
        )}

        <ExpandableSections />
      </motion.section>
    </main>
  );
}
