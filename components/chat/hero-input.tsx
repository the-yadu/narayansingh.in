"use client";

import { KeyboardEvent, useMemo, useState } from "react";
import { ArrowUpRight, Mic, Paperclip } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-local-storage";

export function HeroInput({ onSend }: { onSend: (value: string) => void }) {
  const mounted = useMounted();
  const [value, setValue] = useState("");

  const glowClass = useMemo(() => (value.trim() ? "ring-2 ring-primary/45 shadow-[0_0_50px_rgba(96,165,250,0.15)]" : "ring-1 ring-white/12"), [value]);
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
      className={`hero-glass luminous-border overflow-hidden rounded-[1.75rem] bg-black/20 p-3 ${glowClass}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.16 }}
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={4}
        placeholder="Ask Narayan AI about startups, engineering, systems, travel, or life..."
        className="min-h-[132px] w-full resize-none border-0 bg-transparent px-2 py-2 text-base leading-7 text-white outline-none placeholder:text-white/35"
      />

      <div className="mt-4 flex flex-col gap-3 border-t border-white/10 px-1 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-white/45">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Shift + Enter for a new line</span>
          <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 sm:inline-flex">
            Context from public work and interests
          </span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button size="icon" variant="ghost" className="rounded-2xl text-white/55 hover:text-white" aria-label="Attach file">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-2xl text-white/55 hover:text-white"
            onClick={handleVoice}
            disabled={!voiceSupported}
            aria-label="Voice input"
            title={voiceSupported ? "Use voice input" : "Voice input is unavailable in this browser"}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button onClick={submit} className="rounded-2xl px-4" aria-label="Send message">
            Start chat
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
