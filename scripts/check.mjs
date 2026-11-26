#!/usr/bin/env node
/**
 * The check this repository runs on every pull request and every push.
 *
 *   node scripts/check.mjs              check everything, exit 1 naming each problem
 *   node scripts/check.mjs --relock ID  rewrite recipes/ID/sample/key.lock after you
 *                                       recounted the answer key for a changed sample
 *
 * What it holds:
 * 1. Every recipe has the card metadata the catalog needs (shelf, section, modes,
 *    what it does with data, models and dates it was checked on), and catalog.json
 *    says the same as the cards.
 * 2. Nothing in the repository looks like a secret, a real email address, a card
 *    number, a valid IBAN nobody approved, a link to an unknown host, hidden text or
 *    a path from somebody's machine.
 * 3. A sample and its answer key do not drift apart: sample/key.lock records both,
 *    a changed sample needs a recounted key, and a key that names an invoice the
 *    sample does not have is red.
 * 4. The installable skills under skills/ are byte copies of the recipes' SKILL.md
 *    and prompt.md, and run nothing when they load.
 * 5. Only text files, no symlinks, nothing executable outside scripts/.
 */
import { readFileSync, readdirSync, existsSync, writeFileSync, lstatSync, statSync } from "node:fs";
import { join, dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  recipeMeta,
  contentProblems,
  skillProblems,
  keyCodesMissing,
  keyLock,
  parseLock,
  walk,
  readmeWithRecipes,
} from "./lib.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const RECIPES = join(ROOT, "recipes");
const problems = [];

const listFile = (name) =>
  readFileSync(join(ROOT, "scripts", name), "utf8")
    .split("\n")
    .map((l) => l.replace(/#.*$/, "").trim())
    .filter(Boolean);

const ids = () => readdirSync(RECIPES).filter((d) => statSync(join(RECIPES, d)).isDirectory()).sort();

if (process.argv[2] === "--relock") {
  const id = process.argv[3];
  const dir = join(RECIPES, id || "");
  if (!id || !existsSync(join(dir, "recipe.md"))) {
    console.error("usage: node scripts/check.mjs --relock <recipe id>");
    process.exit(2);
  }
  const lockPath = join(dir, "sample", "key.lock");
  const old = existsSync(lockPath) ? parseLock(readFileSync(lockPath, "utf8")) : new Map();
  const now = parseLock(keyLock(dir));
  const inputsChanged = [...now].some(([f, h]) => f !== "answer-key.md" && old.get(f) !== h) || [...old.keys()].some((f) => !now.has(f));
  if (old.size && inputsChanged && old.get("answer-key.md") === now.get("answer-key.md")) {
    console.error(`${id}: the sample changed but answer-key.md did not. Recount the key by hand for the new sample first.`);
    process.exit(1);
  }
  writeFileSync(lockPath, keyLock(dir));
  console.log(`${id}: sample/key.lock written`);
  process.exit(0);
}

// 5. files
const ALLOWED_EXT = new Set([".md", ".csv", ".txt", ".json", ".yml", ".mjs", ".lock", ".png", ""]);
for (const f of walk(ROOT)) {
  if (f.startsWith(".git/") || f === ".git") continue;
  const p = join(ROOT, f);
  const st = lstatSync(p);
  if (st.isSymbolicLink()) problems.push(`${f}: symlink`);
  else if (!ALLOWED_EXT.has(extname(f))) problems.push(`${f}: file type ${extname(f) || "(none)"} is not accepted`);
  else if (extname(f) === "" && !["LICENSE", ".gitignore"].includes(f)) problems.push(`${f}: file without an extension`);
  else if ((st.mode & 0o111) !== 0 && !f.startsWith("scripts/")) problems.push(`${f}: executable outside scripts/`);
  else if (st.size > 512 * 1024) problems.push(`${f}: larger than 512 KB`);
}

// 2. content
const hosts = listFile("allowed-hosts.txt");
const ibans = new Set(listFile("allowed-ibans.txt").map((l) => l.split(/\s+/)[0]));
for (const f of walk(ROOT)) {
  if (f.startsWith(".git/") || f.startsWith("scripts/") || extname(f) === ".png") continue;
  if (lstatSync(join(ROOT, f)).isSymbolicLink()) continue;
  problems.push(...contentProblems(f, readFileSync(join(ROOT, f), "utf8"), hosts, ibans));
}

// 1. metadata, 3. keys, 4. skills
const catalog = [];
for (const id of ids()) {
  const dir = join(RECIPES, id);
  let meta;
  try {
    meta = recipeMeta(dir, id);
  } catch (e) {
    problems.push(...(Array.isArray(e) ? e : [`${id}: ${e.message}`]));
    continue;
  }
  catalog.push(meta);
  for (const f of walk(join(dir, "runs"))) {
    if (!/^\d{4}-\d{2}-\d{2}-file-[a-z0-9-]+-(code|nocode)(-before-fix)?\.md$/.test(f)) problems.push(`recipes/${id}/runs/${f}: only file runs (<date>-file-<model>-<code|nocode>.md) are kept here`);
  }
  for (const c of keyCodesMissing(dir)) problems.push(`recipes/${id}/sample/answer-key.md: names ${c}, which no sample file has`);
  const lockPath = join(dir, "sample", "key.lock");
  if (!existsSync(lockPath)) problems.push(`recipes/${id}/sample/key.lock is missing: node scripts/check.mjs --relock ${id}`);
  else if (readFileSync(lockPath, "utf8") !== keyLock(dir))
    problems.push(`recipes/${id}/sample: the sample or the answer key changed since key.lock. Recount the key by hand, then node scripts/check.mjs --relock ${id}`);

  const skillDir = join(ROOT, "skills", meta.skill);
  for (const f of ["SKILL.md", "prompt.md"]) {
    const src = readFileSync(join(dir, f));
    const p = join(skillDir, f);
    if (!existsSync(p)) problems.push(`skills/${meta.skill}/${f} is missing`);
    else if (!readFileSync(p).equals(src)) problems.push(`skills/${meta.skill}/${f} differs from recipes/${id}/${f}`);
  }
  problems.push(...skillProblems(`recipes/${id}/SKILL.md`, readFileSync(join(dir, "SKILL.md"), "utf8")));
  for (const r of meta.related) if (!existsSync(join(RECIPES, r))) problems.push(`recipes/${id}: related recipe "${r}" is not in recipes/`);
}
const skillDirs = existsSync(join(ROOT, "skills")) ? readdirSync(join(ROOT, "skills")).sort() : [];
for (const s of skillDirs) {
  if (!catalog.some((m) => m.skill === s)) problems.push(`skills/${s}: no recipe owns this skill`);
  for (const f of readdirSync(join(ROOT, "skills", s))) if (!["SKILL.md", "prompt.md"].includes(f)) problems.push(`skills/${s}/${f}: a skill folder holds SKILL.md and prompt.md only`);
}

const want = JSON.stringify({ recipes: catalog }, null, 2) + "\n";
const catPath = join(ROOT, "catalog.json");
if (!existsSync(catPath)) problems.push("catalog.json is missing");
else if (readFileSync(catPath, "utf8") !== want) problems.push("catalog.json does not match the cards: node scripts/catalog.mjs");
const readme = readFileSync(join(ROOT, "README.md"), "utf8");
try {
  if (readmeWithRecipes(readme, catalog) !== readme) problems.push("README.md recipe table does not match the cards: node scripts/catalog.mjs");
} catch (e) {
  problems.push(e.message);
}

// the plugin manifests name this repository's skills folder and no server
for (const m of [".claude-plugin/plugin.json", ".cursor-plugin/plugin.json"]) {
  const p = join(ROOT, m);
  if (!existsSync(p)) {
    problems.push(`${m} is missing`);
    continue;
  }
  const j = JSON.parse(readFileSync(p, "utf8"));
  for (const k of ["mcpServers", "hooks", "commands", "agents"]) if (j[k] !== undefined) problems.push(`${m}: carries ${k}; this plugin ships skills only`);
}

if (problems.length) {
  console.error(problems.map((p) => `- ${p}`).join("\n"));
  console.error(`\n${problems.length} problem(s).`);
  process.exit(1);
}
console.log(`ok: ${catalog.length} recipes, ${skillDirs.length} skills`);
