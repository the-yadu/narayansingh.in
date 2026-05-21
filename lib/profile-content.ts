export type HobbyProject = {
  name: string;
  href: string;
  tagline: string;
  summary: string;
};

export const hobbyProjects: HobbyProject[] = [
  {
    name: "Lekh Webapp",
    href: "https://github.com/the-yadu/lekh-webapp",
    tagline: "Minimalist blogging platform",
    summary:
      "A Sapper and Svelte writing product described in the repo as 'Blogger for minimalists', with editor-driven publishing and Tailwind-based styling.",
  },
  {
    name: "The People Webapp",
    href: "https://github.com/the-yadu/the-people-webapp",
    tagline: "Early Next.js web app prototype",
    summary:
      "A lightweight Next.js and Tailwind starter-stage web application that represents an early product experiment on the public profile.",
  },
  {
    name: "Narayan AI",
    href: "https://github.com/the-yadu/narayansingh.in",
    tagline: "AI-native personal website",
    summary:
      "This Next.js personal site turns Narayan's public profile, projects, and worldview into an interactive AI experience.",
  },
  {
    name: "Astral Copilot",
    href: "https://github.com/the-yadu/astral-copilot",
    tagline: "AI lesson and content generation",
    summary:
      "A Next.js app that transforms lesson ideas into interactive educational experiences using OpenAI, Supabase, and dynamic React rendering.",
  },
  {
    name: "LikeThis",
    href: "https://github.com/the-yadu/likethis",
    tagline: "AI-powered personalized photo generation",
    summary:
      "A Next.js app that turns user photos into polished family portraits, vacation shots, and cinematic images with template-guided AI generation.",
  },
  {
    name: "Plus530 Adventure",
    href: "https://github.com/the-yadu/plus530adventure",
    tagline: "Premium Himalayan travel website",
    summary:
      "A polished Next.js website for Himalayan overlanding and self-drive adventures with dynamic routes, editorial content, and premium visual storytelling.",
  },
  {
    name: "mongoose-multi-currency",
    href: "https://github.com/the-yadu/mongoose-multi-currency",
    tagline: "Mongoose multi-currency support",
    summary:
      "A focused utility repository for adding multi-currency support patterns around Mongoose-based data models.",
  },
  {
    name: "nodejs-cloud-build-with-env",
    href: "https://github.com/the-yadu/nodejs-cloud-build-with-env",
    tagline: "Cloud build environment experiment",
    summary:
      "A small JavaScript repository used to test or validate cloud build behavior when environment configuration is involved.",
  },
  {
    name: "India",
    href: "https://github.com/the-yadu/india",
    tagline: "Legacy deployed web experiment",
    summary:
      "An older JavaScript site deployed to india.vercel.app that remains on the public profile as an early frontend project.",
  },
  {
    name: "twitter-bot",
    href: "https://github.com/the-yadu/twitter-bot",
    tagline: "Automation bot for posting to Twitter",
    summary:
      "A compact JavaScript bot project built to post updates automatically on Narayan's behalf.",
  },
  {
    name: "the-yadu profile",
    href: "https://github.com/the-yadu/the-yadu",
    tagline: "Profile README repository",
    summary:
      "The special profile repository that powers the public GitHub bio, current focus areas, and profile-level social links.",
  },
  {
    name: "learning_flutter",
    href: "https://github.com/the-yadu/learning_flutter",
    tagline: "Flutter learning sandbox",
    summary:
      "A starter Flutter repository kept as a learning project while exploring cross-platform app development.",
  },
  {
    name: "tinyjson",
    href: "https://github.com/the-yadu/tinyjson",
    tagline: "Schema-based JSON compression library",
    summary:
      "A published JavaScript library that reduces repetitive JSON payload size by separating schema from data for leaner transport and storage.",
  },
  {
    name: "IamYadu",
    href: "https://github.com/the-yadu/iamyadu",
    tagline: "Earlier personal website",
    summary:
      "An older personal-site repository that shows the progression toward the current AI-native personal website.",
  },
];

export const hobbyProjectsPrompt = hobbyProjects
  .map(
    (project) =>
      `- ${project.name}: ${project.tagline}. ${project.summary} Repository: ${project.href}`,
  )
  .join("\n");
