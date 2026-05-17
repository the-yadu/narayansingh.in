import { createOpenAI } from "@ai-sdk/openai";

export const openrouter = createOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  headers: {
    "HTTP-Referer": "https://narayansingh.in",
    "X-Title": "Narayan AI",
  },
});

export const defaultOpenRouterModel = process.env.OPENROUTER_MODEL ?? "openai/gpt-4o-mini";
