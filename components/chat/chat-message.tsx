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
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-primary">
          <Bot className="h-4 w-4" />
        </div>
      )}

      <div className={cn("flex max-w-[92%] flex-col gap-2 sm:max-w-[82%]", assistant ? "items-start" : "items-end")}>
        <span className="px-1 text-[11px] uppercase tracking-[0.2em] text-subtle-foreground">{assistant ? "Narayan AI" : "You"}</span>
        <Card
          className={cn(
            "rounded-2xl px-4 py-3 sm:px-5 sm:py-4",
            assistant ? "border-border bg-card" : "border-primary/30 bg-primary/10",
          )}
        >
          <div className="prose prose-invert max-w-none text-sm leading-7 text-foreground/90 prose-p:my-2 prose-strong:text-foreground prose-li:my-1">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </Card>
      </div>

      {!assistant && (
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/15 text-foreground">
          <User2 className="h-4 w-4" />
        </div>
      )}
    </motion.div>
  );
}
