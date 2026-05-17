"use client";

import { useMemo, useState } from "react";
import { Mic, Paperclip, SendHorizonal } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroInput({ onSend }: { onSend: (value: string) => void }) {
  const [value, setValue] = useState("");

  const glowClass = useMemo(() => (value.trim() ? "ring-2 ring-primary/55" : "ring-1 ring-white/15"), [value]);

  const submit = () => {
    const v = value.trim();
    if (!v) return;
    onSend(v);
    setValue("");
  };

  const handleVoice = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) return;
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

  return (
    <motion.div
      className={`hero-glass luminous-border flex w-full items-center gap-2 rounded-3xl p-2 ${glowClass}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2 }}
    >
      <Button size="icon" variant="ghost" className="rounded-2xl text-muted-foreground" aria-label="Attach file">
        <Paperclip className="h-4 w-4" />
      </Button>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        placeholder="Ask Narayan AI about startups, engineering, systems, travel, or life..."
        className="h-14 border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
      />
      <Button size="icon" variant="ghost" className="rounded-2xl text-muted-foreground" onClick={handleVoice} aria-label="Voice input">
        <Mic className="h-4 w-4" />
      </Button>
      <Button size="icon" onClick={submit} className="rounded-2xl" aria-label="Send message">
        <SendHorizonal className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}
