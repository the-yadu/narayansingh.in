"use client";

import type { Message } from "ai";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Conversation, PersonalityMode } from "@/types/chat";

type ChatState = {
  conversations: Conversation[];
  activeConversationId: string | null;
  personalityMode: PersonalityMode;
  setPersonalityMode: (mode: PersonalityMode) => void;
  createConversation: (seed?: string) => string;
  setActiveConversation: (id: string) => void;
  updateConversationMessages: (id: string, messages: Message[]) => void;
};

const MAX_CONVERSATION_TITLE_LENGTH = 52;

const titleFromSeed = (seed?: string) => {
  if (!seed?.trim()) return "New conversation";
  return seed.trim().slice(0, MAX_CONVERSATION_TITLE_LENGTH);
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      conversations: [],
      activeConversationId: null,
      personalityMode: "founder",
      setPersonalityMode: (mode) => set({ personalityMode: mode }),
      createConversation: (seed) => {
        const id = crypto.randomUUID();
        const now = Date.now();
        set((state) => ({
          activeConversationId: id,
          conversations: [
            {
              id,
              title: titleFromSeed(seed),
              createdAt: now,
              updatedAt: now,
              messages: [],
            },
            ...state.conversations,
          ],
        }));
        return id;
      },
      setActiveConversation: (id) => set({ activeConversationId: id }),
      updateConversationMessages: (id, messages) =>
        set((state) => ({
          conversations: state.conversations.map((conversation) =>
            conversation.id === id
              ? {
                  ...conversation,
                  title:
                    conversation.title === "New conversation" && messages[0]?.content
                      ? titleFromSeed(typeof messages[0].content === "string" ? messages[0].content : "")
                      : conversation.title,
                  messages,
                  updatedAt: Date.now(),
                }
              : conversation,
          ),
        })),
    }),
    {
      name: "narayan-ai-chat-store",
      partialize: ({ conversations, activeConversationId, personalityMode }) => ({
        conversations,
        activeConversationId,
        personalityMode,
      }),
    },
  ),
);
