"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "ai/react";
import { motion } from "framer-motion";
import { Copy, SendHorizonal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/components/chat/chat-message";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { useChatStore } from "@/store/chat-store";
import type { PersonalityMode } from "@/types/chat";
import type { Message } from "ai";

export function ChatShell({ conversationId, starter }: { conversationId: string; starter?: string }) {
  const [starterSent, setStarterSent] = useState(false);
  const [shareStatus, setShareStatus] = useState<"idle" | "ok" | "error">("idle");
  const updateConversationMessages = useChatStore((s) => s.updateConversationMessages);
  const personalityMode = useChatStore((s) => s.personalityMode);
  const messagesRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, append, isLoading } = useChat({
    api: "/api/chat",
    body: { personalityMode },
    id: conversationId,
  });

  useEffect(() => {
    updateConversationMessages(conversationId, messages as Message[]);
    const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [conversationId, messages, updateConversationMessages]);

  useEffect(() => {
    if (!starter || starterSent) return;
    setStarterSent(true);
    void append({ role: "user", content: starter });
  }, [append, starter, starterSent]);

  const personalityLabel = useMemo<Record<PersonalityMode, string>>(
    () => ({
      founder: "Founder mode",
      systems: "Systems mode",
      mentor: "Mentor mode",
    }),
    [],
  );

  const shareConversation = async () => {
    try {
      const transcript = messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n");
      await navigator.clipboard.writeText(transcript);
      setShareStatus("ok");
    } catch {
      setShareStatus("error");
    }
    window.setTimeout(() => setShareStatus("idle"), 1800);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!input.trim()) return e.preventDefault();
    handleSubmit(e);
  };

  return (
    <motion.section
      className="mx-auto flex w-full max-w-6xl flex-col gap-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="hero-glass luminous-border flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-indigo-300" />
          <span>{personalityLabel[personalityMode]}</span>
          {shareStatus === "ok" && <span className="text-xs text-emerald-300">Copied</span>}
          {shareStatus === "error" && <span className="text-xs text-rose-300">Copy failed</span>}
        </div>
        <Button variant="ghost" size="icon" onClick={shareConversation} aria-label="Share conversation">
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      <div ref={messagesRef} className="chat-scroll hero-glass luminous-border h-[52vh] space-y-4 overflow-y-auto rounded-3xl p-4 sm:p-6">
        {messages.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">Start with a question to talk with Narayan AI.</div>
        )}
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>

      <form onSubmit={onSubmit} className="hero-glass luminous-border flex items-center gap-2 rounded-2xl p-2">
        <Input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          placeholder="Continue the conversation..."
          className="h-12 border-0 bg-transparent focus-visible:ring-0"
        />
        <Button size="icon" type="submit" aria-label="Send">
          <SendHorizonal className="h-4 w-4" />
        </Button>
      </form>
    </motion.section>
  );
}
