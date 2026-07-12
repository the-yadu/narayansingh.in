"use client";

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "ai/react";
import { motion } from "framer-motion";
import { Copy, SendHorizonal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/components/chat/chat-message";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { useChatStore } from "@/store/chat-store";
import type { PersonalityMode } from "@/types/chat";
import type { Message } from "ai";

const personalityLabel: Record<PersonalityMode, { title: string; detail: string }> = {
  founder: { title: "Founder mode", detail: "Direct, product-focused, and strategic." },
  systems: { title: "Systems mode", detail: "Structured thinking, architecture, and trade-offs." },
  mentor: { title: "Mentor mode", detail: "Supportive guidance with practical depth." },
};

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

  const modeDetails = useMemo(() => personalityLabel[personalityMode], [personalityMode]);

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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!input.trim()) return event.preventDefault();
    handleSubmit(event);
  };

  const onComposerKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const form = event.currentTarget.form;
      if (!form || !input.trim()) return;
      form.requestSubmit();
    }
  };

  return (
    <motion.section
      className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="surface-raised flex flex-col gap-4 rounded-3xl p-4 sm:p-5">
        <div className="flex flex-col gap-4 border-b border-border pb-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              {modeDetails.title}
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Conversation with Narayan AI</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{modeDetails.detail}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs text-muted-foreground">
              {messages.length} message{messages.length === 1 ? "" : "s"}
            </div>
            <Button variant="ghost" onClick={shareConversation} aria-label="Share conversation" className="rounded-xl px-3">
              <Copy className="mr-2 h-4 w-4" />
              Copy transcript
            </Button>
            {shareStatus === "ok" && <span className="text-xs text-emerald-400">Copied</span>}
            {shareStatus === "error" && <span className="text-xs text-rose-400">Copy failed</span>}
          </div>
        </div>

        <div ref={messagesRef} className="chat-scroll surface-inset relative min-h-[58vh] space-y-4 overflow-y-auto rounded-2xl p-4 sm:p-6">
          {messages.length === 0 && (
            <div className="relative flex min-h-[42vh] flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 text-center">
              <p className="text-lg font-medium text-foreground">Start with a question to talk with Narayan AI.</p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-subtle-foreground">
                Ask for product advice, engineering trade-offs, travel ideas, lessons from building, or a sharper view of the personal hobby projects.
              </p>
            </div>
          )}
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && <TypingIndicator />}
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-3">
          <textarea
            name="prompt"
            value={input}
            onChange={handleInputChange}
            onKeyDown={onComposerKeyDown}
            rows={3}
            placeholder="Continue the conversation..."
            className="min-h-[92px] w-full resize-none border-0 bg-transparent px-2 py-2 text-base leading-7 text-foreground outline-none placeholder:text-subtle-foreground"
          />
          <div className="mt-3 flex flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-subtle-foreground">
              <span className="rounded-full border border-border bg-background/40 px-3 py-1.5">Enter to send</span>
              <span className="rounded-full border border-border bg-background/40 px-3 py-1.5">Shift + Enter for newline</span>
            </div>
            <Button type="submit" className="self-end rounded-xl px-4 sm:self-auto" aria-label="Send">
              Send message
              <SendHorizonal className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </motion.section>
  );
}
