"use client";

import { motion } from "framer-motion";
import { Bot, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useChatStore } from "@/store/chat-store";
import type { PersonalityMode } from "@/types/chat";
import { cn } from "@/lib/utils";

const MAX_VISIBLE_CONVERSATIONS = 6;

const modes: { id: PersonalityMode; label: string }[] = [
  { id: "founder", label: "Founder" },
  { id: "systems", label: "Systems" },
  { id: "mentor", label: "Mentor" },
];

export function ChatSidebar({ onNewChat }: { onNewChat: () => void }) {
  const conversations = useChatStore((s) => s.conversations);
  const activeConversationId = useChatStore((s) => s.activeConversationId);
  const setActiveConversation = useChatStore((s) => s.setActiveConversation);
  const personalityMode = useChatStore((s) => s.personalityMode);
  const setPersonalityMode = useChatStore((s) => s.setPersonalityMode);

  return (
    <Card className="w-full space-y-4 p-4 lg:w-72 lg:min-w-72">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Bot className="h-4 w-4 text-indigo-300" />
          Sessions
        </div>
        <Button size="icon" variant="ghost" onClick={onNewChat} aria-label="New conversation">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {conversations.slice(0, MAX_VISIBLE_CONVERSATIONS).map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => setActiveConversation(conversation.id)}
            className={cn(
              "w-full rounded-xl border px-3 py-2 text-left text-xs transition",
              activeConversationId === conversation.id
                ? "border-primary/50 bg-primary/15 text-foreground"
                : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground",
            )}
          >
            <p className="truncate font-medium">{conversation.title}</p>
            <p className="mt-1 text-[11px] opacity-70">{new Date(conversation.updatedAt).toLocaleString()}</p>
          </button>
        ))}
      </div>

      <div className="space-y-2 pt-1">
        <p className="text-xs text-muted-foreground">Personality</p>
        <div className="grid grid-cols-3 gap-2">
          {modes.map((mode) => (
            <motion.button
              whileTap={{ scale: 0.96 }}
              key={mode.id}
              onClick={() => setPersonalityMode(mode.id)}
              className={cn(
                "rounded-lg border px-2 py-1.5 text-xs",
                personalityMode === mode.id
                  ? "border-primary/60 bg-primary/15 text-foreground"
                  : "border-white/10 bg-white/5 text-muted-foreground",
              )}
            >
              {mode.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-muted-foreground">
        <p className="flex items-center gap-2 text-foreground">
          <Sparkles className="h-3.5 w-3.5 text-indigo-300" /> AI Memory Simulation
        </p>
        <p className="mt-1">Your sessions stay locally in this browser and can be resumed anytime.</p>
      </div>
    </Card>
  );
}
