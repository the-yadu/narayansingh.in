# Narayan Singh – Portfolio

A modern, minimal, and accessible portfolio website for Narayan Singh, Full Stack Engineer. Built with [Astro](https://astro.build/), [Tailwind CSS](https://tailwindcss.com/), and deployed on [Cloudflare Workers](https://workers.cloudflare.com/).

## 🚀 Features
- Clean, responsive, and accessible design
- Blog, Projects, About, and Contact sections
- Styled with Tailwind CSS utility classes
- Astro Islands architecture for fast performance
- Easily deployable to Cloudflare Workers

## 🗂️ Project Structure

```
/
├── public/           # Static assets (images, favicon, etc.)
├── src/
│   ├── assets/       # Custom images and styles
│   ├── components/   # Astro components
│   ├── layouts/      # Main layout file
│   ├── pages/        # Site pages (index, blog, about, etc.)
│   └── content/      # Content helpers (optional)
├── package.json      # Project metadata and scripts
├── astro.config.mjs  # Astro configuration
├── tailwind.config.js# Tailwind CSS configuration
├── wrangler.jsonc    # Cloudflare Worker deployment config
└── ...
```

## 🧞 Commands

All commands are run from the root of the project:

| Command              | Action                                      |
|----------------------|---------------------------------------------|
| `npm install`        | Install dependencies                        |
| `npm run dev`        | Start local dev server at `localhost:4321`  |
| `npm run build`      | Build your production site to `./dist/`     |
| `npm run preview`    | Preview your build locally                  |
| `npx wrangler deploy`| Deploy to Cloudflare Workers                |

## 🌐 Deployment (Cloudflare Workers)
1. Configure your `wrangler.jsonc` with your Cloudflare account and domain.
2. Build the site: `npm run build` (or let Wrangler do it automatically).
3. Deploy: `npx wrangler deploy`
4. Visit your domain to see your live portfolio!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
