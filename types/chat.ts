import type { Message } from "ai";

export type PersonalityMode = "founder" | "systems" | "mentor";

export type Conversation = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: Message[];
};
