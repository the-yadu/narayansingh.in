export type HobbyProject = {
  name: string;
  href: string;
  tagline: string;
  summary: string;
};

export const hobbyProjects: HobbyProject[] = [
  {
    name: "LikeThis",
    href: "https://github.com/the-yadu/likethis",
    tagline: "AI-powered personalized photo generation",
    summary:
      "A Next.js app that turns user photos into polished family, portrait, vacation, and cinematic images with template-guided AI generation.",
  },
  {
    name: "Astral Copilot",
    href: "https://github.com/the-yadu/astral-copilot",
    tagline: "Interactive lesson generation with AI",
    summary:
      "An AI-first education product that converts lesson ideas into interactive React lessons using OpenAI, Supabase, and dynamic component rendering.",
  },
  {
    name: "Plus530 Adventure",
    href: "https://github.com/the-yadu/plus530adventure",
    tagline: "Premium travel brand website",
    summary:
      "A polished Next.js website for Himalayan overlanding and self-drive adventures with dynamic routes, editorial content, and strong visual storytelling.",
  },
  {
    name: "tinyjson",
    href: "https://github.com/the-yadu/tinyjson",
    tagline: "Schema-based JSON compression library",
    summary:
      "A published JavaScript library that reduces repetitive JSON payload size by separating schema from data for leaner transport and storage.",
  },
];

export const hobbyProjectsPrompt = hobbyProjects
  .map(
    (project) =>
      `- ${project.name}: ${project.tagline}. ${project.summary} Repository: ${project.href}`,
  )
  .join("\n");
