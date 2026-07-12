"use client";

import { KeyboardEvent, useMemo, useState } from "react";
import { ArrowUpRight, Mic } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-local-storage";

export function HeroInput({ onSend }: { onSend: (value: string) => void }) {
  const mounted = useMounted();
  const [value, setValue] = useState("");

  const focusClass = useMemo(
    () => (value.trim() ? "border-primary/60 ring-2 ring-ring/30" : "border-border"),
    [value],
  );
  const voiceSupported = useMemo(
    () => mounted && typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window),
    [mounted],
  );

  const submit = () => {
    const v = value.trim();
    if (!v) return;
    onSend(v);
    setValue("");
  };

  const handleVoice = () => {
    if (!voiceSupported) return;
    const RecognitionCtor = window.webkitSpeechRecognition || window.SpeechRecognition;
    if (!RecognitionCtor) return;
    const recognition = new RecognitionCtor();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      setValue(event.results[0][0].transcript);
    };
    recognition.start();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <motion.div
      className={`overflow-hidden rounded-2xl border bg-card p-3 transition-colors sm:p-4 ${focusClass}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={3}
        placeholder="Message Narayan AI..."
        className="min-h-[108px] w-full resize-none border-0 bg-transparent px-2 py-2 text-base leading-7 text-foreground outline-none placeholder:text-subtle-foreground"
      />

      <div className="mt-3 flex items-center justify-between border-t border-border px-1 pt-3">
        <div className="flex items-center gap-2 text-xs text-subtle-foreground">
          <span className="rounded-full border border-border bg-background/40 px-3 py-1.5">Enter to send</span>
          <span className="hidden rounded-full border border-border bg-background/40 px-3 py-1.5 sm:inline-flex">Shift + Enter for newline</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-xl"
            onClick={handleVoice}
            disabled={!voiceSupported}
            aria-label="Voice input"
            title={voiceSupported ? "Use voice input" : "Voice input is unavailable in this browser"}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button onClick={submit} className="rounded-xl px-4" aria-label="Send message">
            Start chat
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
