#!/usr/bin/env node
/**
 * Bakes the engine repository's commit history into src/lib/contributions.json
 * for the landing page skyline. The page ships a snapshot, not a live call, so
 * it stays fast and works offline; re-run this when the snapshot looks stale.
 *
 *   node scripts/sync-contributions.mjs        # GITHUB_TOKEN raises the rate limit
 */
import { writeFile } from "node:fs/promises";

const REPO = "unhuman-engine/UNHUMAN";
const OUT = new URL("../src/lib/contributions.json", import.meta.url);

const headers = { accept: "application/vnd.github+json", "user-agent": "unhumanweb-sync" };
if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const days = new Map();
for (let page = 1; ; page++) {
  const res = await fetch(`https://api.github.com/repos/${REPO}/commits?per_page=100&page=${page}`, { headers });
  if (!res.ok) throw new Error(`GitHub ${res.status} on page ${page}: ${await res.text()}`);
  const batch = await res.json();
  for (const c of batch) {
    const date = (c.commit?.author?.date ?? c.commit?.committer?.date ?? "").slice(0, 10);
    if (date) days.set(date, (days.get(date) ?? 0) + 1);
  }
  if (batch.length < 100) break;
}

const payload = {
  repo: REPO,
  generated: new Date().toISOString().slice(0, 10),
  days: [...days]
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([date, count]) => ({ date, count })),
};

// One day per line: the file is committed, so keep the diff readable.
const json = `{
  "repo": ${JSON.stringify(payload.repo)},
  "generated": ${JSON.stringify(payload.generated)},
  "days": [
${payload.days.map((d) => "    " + JSON.stringify(d)).join(",\n")}
  ]
}
`;

await writeFile(OUT, json);
console.log(
  `${payload.days.length} days, ${payload.days.reduce((n, d) => n + d.count, 0)} commits → ${OUT.pathname}`
);
