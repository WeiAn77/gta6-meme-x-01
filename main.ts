// gta6-meme-x-01 entry (Node 22, standard library only).
//
// The entry is the X post itself: a GTA 6 meme whose picture carries
// make.fun's ghost, posted from @weian_77 with make.fun and the play
// code in its text. This program only hands the post's address to the
// grader: it reads POST.json from the repository root, checks that it
// names a real X status URL, and copies it to /output/POST.json.
// It reads nothing else, uses no network and no wall clock, so two
// runs always write the same bytes.
//
// Run locally:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const STATUS_URL =
  /^https:\/\/(x\.com|twitter\.com)\/[A-Za-z0-9_]+\/status\/[0-9]+$/;

const postPath = join(BOT_DIR, "POST.json");
const post = JSON.parse(readFileSync(postPath, "utf8")) as { url?: unknown };

if (typeof post.url !== "string" || !STATUS_URL.test(post.url)) {
  console.error(`POST.json must name an X status URL, got: ${String(post.url)}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(postPath, join(OUTPUT_DIR, "POST.json"));
console.log(`Handed in post: ${post.url}`);
