import { streamText } from "ai";
import { defaultOpenRouterModel, openrouter } from "@/api/openrouter";
import { getSystemPrompt } from "@/lib/system-prompt";
import type { PersonalityMode } from "@/types/chat";

const validModes: PersonalityMode[] = ["founder", "systems", "mentor"];

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body || !Array.isArray(body.messages)) {
    return new Response(JSON.stringify({ error: "Invalid request payload" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const mode = validModes.includes(body.personalityMode) ? body.personalityMode : "founder";
  const model = typeof body.model === "string" && body.model.trim() ? body.model : defaultOpenRouterModel;

  const result = streamText({
    model: openrouter(model),
    system: getSystemPrompt(mode),
    messages: body.messages,
    temperature: 0.7,
  });

  return result.toDataStreamResponse();
}
