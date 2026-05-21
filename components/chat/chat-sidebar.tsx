"use client";

import { motion } from "framer-motion";
import { Bot, Clock3, MessageSquareDashed, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useChatStore } from "@/store/chat-store";
import type { PersonalityMode } from "@/types/chat";
import { cn } from "@/lib/utils";

const MAX_VISIBLE_CONVERSATIONS = 6;

const modes: { id: PersonalityMode; label: string; hint: string }[] = [
  { id: "founder", label: "Founder", hint: "strategy and products" },
  { id: "systems", label: "Systems", hint: "architecture and trade-offs" },
  { id: "mentor", label: "Mentor", hint: "clarity and guidance" },
];

const timestampFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const formatTimestamp = (value: number) => timestampFormatter.format(value);

export function ChatSidebar({ onNewChat }: { onNewChat: () => void }) {
  const conversations = useChatStore((s) => s.conversations);
  const activeConversationId = useChatStore((s) => s.activeConversationId);
  const setActiveConversation = useChatStore((s) => s.setActiveConversation);
  const personalityMode = useChatStore((s) => s.personalityMode);
  const setPersonalityMode = useChatStore((s) => s.setPersonalityMode);

  return (
    <Card className="w-full rounded-[2rem] border-white/10 bg-white/[0.035] p-4 lg:sticky lg:top-6 lg:w-[320px] lg:min-w-[320px] lg:self-start">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-white">
            <Bot className="h-4 w-4 text-cyan-200" />
            Conversation space
          </p>
          <p className="mt-1 text-xs text-white/45">Switch sessions or reset back to the landing experience.</p>
        </div>
        <Button size="icon" variant="ghost" onClick={onNewChat} aria-label="New conversation" className="rounded-2xl">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-5 space-y-2">
        <p className="text-xs uppercase tracking-[0.24em] text-white/35">Recent chats</p>
        {conversations.length ? (
          conversations.slice(0, MAX_VISIBLE_CONVERSATIONS).map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setActiveConversation(conversation.id)}
              className={cn(
                "w-full rounded-[1.35rem] border px-4 py-3 text-left transition",
                activeConversationId === conversation.id
                  ? "border-primary/40 bg-primary/12 text-white shadow-[0_15px_40px_rgba(79,70,229,0.12)]"
                  : "border-white/10 bg-white/[0.035] text-white/58 hover:border-white/20 hover:text-white",
              )}
            >
              <p className="truncate text-sm font-medium">{conversation.title}</p>
              <div className="mt-2 flex items-center gap-2 text-[11px] text-white/40">
                <Clock3 className="h-3.5 w-3.5" />
                {formatTimestamp(conversation.updatedAt)}
              </div>
            </button>
          ))
        ) : (
          <div className="rounded-[1.35rem] border border-dashed border-white/10 bg-white/[0.025] p-4 text-sm text-white/45">
            Your first conversation will appear here.
          </div>
        )}
      </div>

      <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
        <p className="text-xs uppercase tracking-[0.24em] text-white/35">Response style</p>
        <div className="space-y-2">
          {modes.map((mode) => (
            <motion.button
              whileTap={{ scale: 0.98 }}
              key={mode.id}
              onClick={() => setPersonalityMode(mode.id)}
              className={cn(
                "w-full rounded-[1.35rem] border px-4 py-3 text-left transition",
                personalityMode === mode.id
                  ? "border-primary/40 bg-primary/12 text-white"
                  : "border-white/10 bg-white/[0.035] text-white/58 hover:border-white/20 hover:text-white",
              )}
            >
              <p className="text-sm font-medium">{mode.label}</p>
              <p className="mt-1 text-xs text-white/42">{mode.hint}</p>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/20 p-4 text-sm text-white/52">
        <p className="flex items-center gap-2 text-white">
          <Sparkles className="h-4 w-4 text-cyan-200" /> Local memory simulation
        </p>
        <p className="mt-2 leading-6">Sessions are stored in this browser so you can return to previous chats without leaving the interface.</p>
        <div className="mt-3 flex items-center gap-2 text-xs text-white/40">
          <MessageSquareDashed className="h-3.5 w-3.5" />
          Resume anytime from this device
        </div>
      </div>
    </Card>
  );
}
