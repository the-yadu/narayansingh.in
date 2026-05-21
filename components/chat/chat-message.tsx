"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Bot, User2 } from "lucide-react";
import type { Message } from "ai";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ChatMessage({ message }: { message: Message }) {
  const assistant = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex w-full gap-3", assistant ? "justify-start" : "justify-end")}
    >
      {assistant && (
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/7 text-cyan-200">
          <Bot className="h-4 w-4" />
        </div>
      )}

      <div className={cn("flex max-w-[92%] flex-col gap-2 sm:max-w-[82%]", assistant ? "items-start" : "items-end")}>
        <span className="px-1 text-[11px] uppercase tracking-[0.2em] text-white/34">{assistant ? "Narayan AI" : "You"}</span>
        <Card
          className={cn(
            "rounded-[1.6rem] px-4 py-3 sm:px-5 sm:py-4",
            assistant
              ? "border-white/10 bg-white/[0.05]"
              : "border-primary/25 bg-[linear-gradient(135deg,rgba(79,70,229,0.34),rgba(6,182,212,0.12))]",
          )}
        >
          <div className="prose prose-invert max-w-none text-sm leading-7 text-white/90 prose-p:my-2 prose-strong:text-white prose-li:my-1">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </Card>
      </div>

      {!assistant && (
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-primary/18 text-white">
          <User2 className="h-4 w-4" />
        </div>
      )}
    </motion.div>
  );
}
