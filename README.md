# Mohith H — personal website

Source for [mohith-h.vercel.app](https://mohith-h.vercel.app): research, publications and writing. Built with Next.js and Tailwind CSS and deployed on Vercel; every push to `main` deploys automatically.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000, drafts visible
npm run build      # production build, drafts hidden
```

## Where things live

| What | Where |
| --- | --- |
| Intro, publications, research, projects, experience, awards, interests | `lib/data.ts` |
| Blog posts | `content/writing/*.md` |
| Images for posts | `public/writing/<post-name>/` |
| Research figures | `public/research/`, referenced from `figure` in `lib/data.ts` |
| CV | `public/cv.pdf` (the CV link appears once this file exists) |
| Profile photo | `public/profile.jpeg` |

Publications are defined once in `lib/data.ts` and reused by the homepage, the Research page and each research page.

## Writing a post

1. Copy `content/writing/example-post.md` to `content/writing/<post-name>.md`. The file name becomes the URL (`/writing/<post-name>`), so don't rename it after publishing.
2. Edit the front matter:

   ```yaml
   ---
   title: "Why differentiability helps charge partitioning"
   description: "One or two sentences for the post list and RSS feed."
   date: 2026-11-01
   updated: 2026-11-10   # optional
   tags: [research-note]
   draft: true           # remove or set to false to publish
   ---
   ```

3. Preview with `npm run dev`. Drafts are labelled and never appear in production or the feed.
4. Commit and push; Vercel deploys it.

Supported: `$inline$` and `$$display$$` maths (KaTeX), fenced code with syntax highlighting, GitHub tables, footnotes (`[^1]`), and captioned figures:

```markdown
![Alt text for screen readers](/writing/my-post/plot.png "Figure 1. Caption shown under the image.")
```

The **Writing** menu item, the homepage "Recent writing" section and the RSS feed (`/writing/rss.xml`) appear once at least one post is published.

## Spotify (`/vibes`)

The Vibes page reads `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_REFRESH_TOKEN`. Set them in Vercel → Project → Settings → Environment Variables, and locally in `.env.local`, which is git-ignored and must never be committed.
