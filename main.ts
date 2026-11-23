import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line office joke: the reply-all loop.
// Setup names the forbidden act, the turn is that everyone agrees
// by committing it, and the punchline is HR formalising the loop.
const JOKE =
  "I replied-all asking everyone to stop replying-all \u2014 now 47 people are replying-all to agree, and HR added it to the agenda.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Gate: entry must be 1-199 UTF-8 characters, one line, not only whitespace.
const chars = [...JOKE].length;
if (chars < 1 || chars > 199 || JOKE.trim().length === 0 || JOKE.includes("\n")) {
  throw new Error(`entry length ${chars} characters is out of range`);
}
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");

// Read back and verify: the file on disk must be byte-identical to the
// joke, so a partial write or encoding slip can never ship silently.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== JOKE) {
  throw new Error("entry.txt on disk does not match the joke");
}
