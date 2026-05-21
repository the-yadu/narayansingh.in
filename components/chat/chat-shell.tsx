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
      <div className="hero-panel flex flex-col gap-4 rounded-[2rem] p-4 sm:p-5">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-cyan-200/85">
              <Sparkles className="h-4 w-4" />
              {modeDetails.title}
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Conversation with Narayan AI</h2>
            <p className="mt-1 text-sm leading-6 text-white/54">{modeDetails.detail}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/54">
              {messages.length} message{messages.length === 1 ? "" : "s"}
            </div>
            <Button variant="ghost" onClick={shareConversation} aria-label="Share conversation" className="rounded-2xl px-3 text-white/72 hover:text-white">
              <Copy className="mr-2 h-4 w-4" />
              Copy transcript
            </Button>
            {shareStatus === "ok" && <span className="text-xs text-emerald-300">Copied</span>}
            {shareStatus === "error" && <span className="text-xs text-rose-300">Copy failed</span>}
          </div>
        </div>

        <div ref={messagesRef} className="chat-scroll relative min-h-[58vh] space-y-4 overflow-y-auto rounded-[1.75rem] border border-white/10 bg-black/20 p-4 sm:p-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/[0.03] to-transparent" />
          {messages.length === 0 && (
            <div className="relative flex min-h-[42vh] flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-white/10 bg-white/[0.025] px-6 text-center">
              <p className="text-lg font-medium text-white">Start with a question to talk with Narayan AI.</p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">
                Ask for product advice, engineering trade-offs, travel ideas, lessons from building, or a sharper view of the personal hobby projects.
              </p>
            </div>
          )}
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && <TypingIndicator />}
        </div>

        <form onSubmit={onSubmit} className="rounded-[1.75rem] border border-white/10 bg-black/25 p-3">
          <textarea
            name="prompt"
            value={input}
            onChange={handleInputChange}
            onKeyDown={onComposerKeyDown}
            rows={3}
            placeholder="Continue the conversation..."
            className="min-h-[92px] w-full resize-none border-0 bg-transparent px-2 py-2 text-base leading-7 text-white outline-none placeholder:text-white/35"
          />
          <div className="mt-3 flex flex-col gap-3 border-t border-white/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-white/42">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Enter to send</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Shift + Enter for newline</span>
            </div>
            <Button type="submit" className="self-end rounded-2xl px-4 sm:self-auto" aria-label="Send">
              Send message
              <SendHorizonal className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </motion.section>
  );
}
