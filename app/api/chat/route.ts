import { streamText } from "ai";
import { defaultOpenRouterModel, openrouter } from "@/api/openrouter";
import { getSystemPrompt } from "@/lib/system-prompt";
import type { PersonalityMode } from "@/types/chat";

export async function POST(req: Request) {
  const { messages, personalityMode = "founder", model } = await req.json();

  const result = streamText({
    model: openrouter(model || defaultOpenRouterModel),
    system: getSystemPrompt(personalityMode as PersonalityMode),
    messages,
    temperature: 0.7,
  });

  return result.toDataStreamResponse();
}
