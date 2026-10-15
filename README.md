# UnhumanWeb

Marketing and documentation site for [Unhuman Engine](https://github.com/unhuman-engine/UNHUMAN) —
an open-source, hand-written C++23 real-time 3D engine for robotics and games (Vulkan RHI,
Slang → SPIR-V shaders, entt ECS, Jolt/Box2D physics, ImGui editor). MIT.

Live: <https://www.unhumanengine.xyz>

## Stack

React 18 · TypeScript · Vite · Tailwind CSS · lucide-react · react-router.
Two routes: `/` (landing: liquid-sculpture hero, spec strip, capture viewport, commit skyline,
engine loop, subsystems) and `/docs` (build, presets, tests, source layout, status, contributing) —
all docs content mirrors the engine repository.

Type: Geist (UI and headings), Instrument Serif italic (`.accent` — one phrase per heading),
JetBrains Mono (code, spec values, status chips).

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # -> dist/
npm run preview   # serve dist/
```

## Theme

Paper by default, ink when `.dark` is on `<html>`. The class is set before first paint by the inline
script in `index.html` from `prefers-color-scheme`, then owned by `ThemeProvider` (`src/lib/theme.tsx`)
and flipped by the nav switch. Every colour in `src/index.css` is a bare HSL triplet in both blocks,
so a new surface means one token, not a `dark:` variant in every component.

Three levels keep the page from reading as one flat sheet, measured as contrast against the paper:

| Level | Token | Light | Against paper |
|---|---|---|---|
| Ground | `--background` | `#EBE9E5` | — |
| Surface | `--card` | `#DBD8D1` | 1.16:1 |
| Rule | `--border` | `#CDC9C1` | 1.34:1 |
| Shell | `--code` | `#111110` | 15.9:1 |

`.ink` re-binds those tokens for one band — the capture chapter — so the dark footage is native
rather than a hole in the paper; in dark mode (where the page is already ink) `.dark .ink` raises the
band to graphite instead, whose frame is the black video. The same trick scopes `.code-block`, which
is ink in both themes so every shell block is a terminal on the page.

The accent is the engine's signal lime, used functionally and never as decoration: lime **fills**
carry ink type (the docs release pill), lime **marks** (status dots, the active-section rule, link
underlines) use `--accent-text`, which is a deep olive on paper and lime on ink — lime type on cream
sits at 1.1:1 and is unreadable, which is the whole reason for the second token.

## Where things live

| Path | What |
|---|---|
| `src/lib/site.ts` | every repository link and the version string in the status bar |
| `src/lib/theme.tsx` | light/dark mode, applied to `<html class="dark">` |
| `src/components/Nav.tsx`, `Footer.tsx` | chrome: toolbar (with the theme switch) and status bar |
| `src/components/kit.tsx` | shared micro-UI: `MonoLabel`, `SectionHeading`, `CodeBlock`, `GithubMark` |
| `src/components/EngineDiagram.tsx` | frame-pipeline schematic; every node is a link, hover or tab shows what it does |
| `src/components/ui/liquid-sculpture-hero.tsx` | the hero: WebGL2 GPGPU particle sculpture |
| `src/components/ui/scroll-expansion-video.tsx` | the capture: grows from a card to a full-width frame on scroll |
| `src/components/ui/contribution-skyline.tsx` | commit heat map that folds up into an isometric skyline |
| `src/lib/contributions.json` | the commit snapshot the skyline renders (`npm run contributions`) |
| `src/components/ui/button.tsx` | shadcn/ui primitive (see `components.json`) |
| `src/pages/Home.tsx`, `Docs.tsx` | the two routes |
| `src/index.css` | design tokens, `.mono-label`/`.accent`/`.panel`/`.code-block` |

## Editing docs

`src/pages/Docs.tsx` carries the engine facts inline (build presets, source layout, status matrix).
When the engine repo changes, update the matching array in that file and the release tag in
`src/lib/site.ts`. Facts to keep honest: the status matrix is a dated snapshot, and anything marked
"in progress" stays marked until the repo says otherwise.

## Hero

`liquid-sculpture-hero.tsx` samples the sculpture image into ~100k GPU particles and turns the
material liquid under the cursor; without WebGL2, or if the image is not CORS-readable, it falls
back to the static image. Home passes `showNav={false}` (the site toolbar is the only nav),
`loadFonts={false}` (index.html loads the fonts) and `linkComponent` so the CTAs route client-side.
Both scripts are local, so the canvas is never tainted: re-fetch it if the background walk fails.
Props are documented on `SculptureHeroProps` — tune `strength`, `radius`, `particleDensity`,
`turbulence` and `liquid` there rather than in the engine.

The `backdropText` word is the window onto the sculpture, not a watermark behind it: one SVG
`<text>` in a `<clipPath>` clips the stage, and an identical `<text>` in front draws the
letterforms (hairline outline plus a 7 % wash). Because both are the same text node, the clip and
the letters cannot drift apart; `relayout()` sizes them from the band and sets the baseline from the
glyph metrics, so the tight glyph box — not the line box — centres on the band.

Home runs the hero with `still`: the image is the whole hero, with no WebGL context, no particle
build, no simulation and nothing animating after first paint (two screenshots of the band 1.6 s
apart are byte-identical). Drop `still` and the engine, cursor stirring and the `intro`/`ambient`
options all come back — the props are unchanged either way. `clip-path: url(#…)` on an HTML element
is Chromium/Firefox; a browser that ignores it shows the unmasked image with the word over it,
which is still a whole hero.

## Capture

`scroll-expansion-video.tsx` grows the sandbox capture from a card to a near-full-width frame as
its section scrolls past: the section is a tall track (`240vh`) with a viewport-sized sticky stage,
so progress is read from the track's own position. The 21st.dev original bound wheel/touch on
`window` and called `window.scrollTo(0, 0)` until it was expanded — that only works for media that
owns scroll position 0, which a mid-page section never does, so it scrolls nothing but itself here.
Two other adaptations: `next/image` and `framer-motion` are gone (plain `<img>` semantics and two
opacity styles), and the frame is clamped by one scale factor so a phone gets a landscape card
instead of a portrait crop of the capture. `prefers-reduced-motion` collapses the track to the open
frame.

The `sticky` stage depends on the app root using `overflow-x-clip`, not `overflow-x-hidden`: a
hidden axis makes that element a scroll container and silently disables every `sticky` inside it
(the docs sidebar was already affected).

## Commit history

The landing page skyline renders `src/lib/contributions.json`, one `{ date, count }` per active day
of `unhuman-engine/UNHUMAN`, ending on the snapshot date. It is a committed snapshot, not a live
GitHub call: the page stays fast, works offline and never eats an API rate limit. A day of drift is
invisible, so refresh it when the snapshot is more than a milestone behind:

```bash
npm run contributions        # GITHUB_TOKEN=… raises the 60/hour anonymous limit
```

That rewrites the JSON from the GitHub commits API (author dates, UTC days) — commit the diff with
the change that prompted it, and keep the snapshot date in the section copy honest.

## Assets

- `public/icon.png` — 256px mark, used in the toolbar, the footer and as the favicon. Drawn white,
  so `.brand-mark` inverts it on paper.
- `public/logo.png` — 1200px mark, used as the `og:image` / `twitter:image` preview.
- `public/demo.webm` — editor capture, 3.4 MB, the landing-page viewport.
- `public/demo-poster.webp` — its first frame (1280×720, 34 KB), shown until playback starts.
- `public/sandbox-2026-09-12.mp4` — 22 s OBS capture of the sandbox with the editor docked, 1920×1080
  60 fps with an audio track. Not referenced by the app yet.
- `public/sculpture.webp`, `public/sculpture-dark.webp` — the hero sculpture (1983×793, matching flat
  backgrounds for the paper and ink themes). The engine detects the flat background from the image
  corners, so a replacement needs one flat, uniform background colour.
