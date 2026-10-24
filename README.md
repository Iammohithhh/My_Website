# Mohith H — personal website

Source for [mohith-h.vercel.app](https://mohith-h.vercel.app): research, notes, projects and a little about me. Built with Next.js and Tailwind CSS and deployed on Vercel; every push to `main` deploys automatically.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000, drafts visible
npm run build      # production build, drafts hidden
```

## Pages

| Page | Content |
| --- | --- |
| `/` | Intro, selected research, recent notes, hobbies and links |
| `/research` | Research projects and publications |
| `/notes` | Notes, written in Obsidian |
| `/projects` | Highlighted and other projects |
| `/about` | Bio, experience, education, awards, news |
| `/hobbies`, `/vibes` | Sketches, sky photos, other interests, Spotify |

## Where things live

| What | Where |
| --- | --- |
| Intro, research, publications, projects, experience, awards, news, hobbies | `lib/data.ts` |
| Notes (the Obsidian vault) | `content/notes/` |
| Images in notes | `content/notes/attachments/` |
| Research and project images | `public/thumbs/<slug>.svg` by default; to use a real figure, add it to `public/` and set `image` on that item in `lib/data.ts` |
| CV | `public/cv.pdf` (the CV link appears once this file exists) |
| Profile photo | `public/profile.jpeg` |

Publications are defined once in `lib/data.ts` and reused on the Research page and each research page. Set `highlight: true` on a project to show it under "Highlighted projects".

## Writing notes in Obsidian

### One-time setup

1. Clone this repo and open the `content/notes` folder as a vault in Obsidian (*Open folder as vault*).
2. **Settings → Files and links**
   - *Default location for new attachments*: **In the folder specified below** → `attachments`
3. **Settings → Core plugins → Templates**: turn it on, then set *Template folder location* to `_templates`.
4. **Settings → Community plugins**: install **Obsidian Git** and enable it.
5. Create a folder called `_drafts` for unfinished notes. It is git-ignored, so drafts never leave your laptop.

### Writing and publishing a note

1. Create a note in `_drafts` and run *Templates: Insert template → Note*. Fill in the properties:

   ```yaml
   ---
   title: "Understanding long-range electrostatics"
   date: 2026-10-25
   updated: 2026-11-02     # optional; shown as "Last updated"
   type: technical         # technical | reading | thoughts
   tags: [DFT, Electrostatics]
   summary: "One line shown in the notes list."
   ---
   ```

2. Write. Paste images straight in; they land in `attachments/`.
3. When it's ready, move the note out of `_drafts` into the vault root (or any folder not starting with `_`).
4. Run **Obsidian Git: Commit and push** from the command palette. Vercel rebuilds the site in about a minute.

To update a note later, edit it, change `updated`, and commit and push again. The URL stays the same as long as the file name doesn't change; set `slug: your-url` in the properties if you want to rename a file without changing its URL.

### What works in notes

- `$inline$` and `$$display$$` maths (KaTeX)
- Fenced code with syntax highlighting, tables, footnotes (`[^1]`) for references
- `[[Other note]]`, `[[Other note|custom text]]` and `[[Other note#Heading]]` links. Links to notes that aren't published show as plain text.
- `![[image.png]]` embeds, and ordinary `![alt](image.png "Caption")` images (the quoted text becomes a caption)
- A table of contents appears on notes with three or more headings, and every note lists the notes that link to it ("Linked from").

### Keep private things private

This repository is public. Anything committed under `content/notes` can be read on GitHub, even if it isn't shown on the site. Keep drafts in `_drafts` and private research notes in a separate vault.

## Spotify (`/vibes`)

The Vibes page reads `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_REFRESH_TOKEN`. Set them in Vercel → Project → Settings → Environment Variables, and locally in `.env.local`, which is git-ignored and must never be committed.
