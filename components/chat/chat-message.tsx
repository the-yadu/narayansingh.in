"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Message } from "ai";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ChatMessage({ message }: { message: Message }) {
  const assistant = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex w-full", assistant ? "justify-start" : "justify-end")}
    >
      <Card
        className={cn(
          "max-w-[92%] px-4 py-3 sm:max-w-[80%]",
          assistant
            ? "border-white/20 bg-white/[0.06]"
            : "border-primary/30 bg-gradient-to-br from-indigo-500/30 via-indigo-500/15 to-cyan-500/20",
        )}
      >
        <div className="prose prose-invert max-w-none text-sm leading-7">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {message.content}
          </ReactMarkdown>
        </div>
      </Card>
    </motion.div>
  );
}
