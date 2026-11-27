/**
 * Shared by the repository check (check.mjs) and by the export that builds this
 * repository from Orla's recipe workshop. No dependencies: Node 20 or newer.
 */
import { readdirSync, readFileSync, lstatSync, existsSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { createHash } from "node:crypto";

/** The front matter of a card, in the small YAML subset the cards use. */
export function frontMatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) throw new Error("no front matter");
  const out = {};
  let top = null;
  let sub = null;
  const value = (v) => (v.startsWith("[") ? v.replace(/[[\]]/g, "").split(",").map((s) => s.trim()).filter(Boolean) : v);
  for (const raw of m[1].split("\n")) {
    if (!raw.trim()) continue;
    const indent = raw.length - raw.trimStart().length;
    const line = raw.trim();
    if (line.startsWith("- ")) {
      if (!top || !sub) throw new Error(`list item outside a key: ${line}`);
      out[top][sub] = Array.isArray(out[top][sub]) ? out[top][sub] : [];
      out[top][sub].push(line.slice(2).trim());
      continue;
    }
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) throw new Error(`front matter line not understood: ${line}`);
    const [, k, v] = kv;
    if (indent === 0) {
      top = k;
      sub = null;
      out[k] = v === "" ? {} : value(v);
    } else {
      if (!top || typeof out[top] !== "object" || Array.isArray(out[top])) throw new Error(`nested key under a plain value: ${line}`);
      sub = k;
      out[top][k] = v === "" ? [] : value(v);
    }
  }
  return out;
}

/** The skill's own front matter: `name` and `description`, nothing else. */
export function skillFrontMatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) throw new Error("no front matter");
  const out = {};
  for (const line of m[1].split("\n")) {
    if (!line.trim()) continue;
    const kv = line.match(/^([a-z-]+):\s*(.*)$/);
    if (!kv) throw new Error(`skill front matter line not understood: ${line}`);
    out[kv[1]] = kv[2].replace(/^"(.*)"$/, "$1");
  }
  return out;
}

/** Every file under a folder, as paths relative to it, sorted. Symlinks are returned too, so a check can refuse them. */
export function walk(root, dir = root) {
  const out = [];
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    const st = lstatSync(p);
    if (st.isSymbolicLink()) out.push(relative(root, p));
    else if (st.isDirectory()) out.push(...walk(root, p));
    else out.push(relative(root, p));
  }
  return out;
}

export const SHELVES = new Set(["business", "accountant"]);
export const SECTIONS = new Set(["compliance", "back-office"]);
export const TEXT_EXT = new Set([".md", ".csv", ".txt"]);
const DATE = /\b(\d{4}-\d{2}-\d{2})\b/;

/** Run files the public repository keeps: runs where a model read the sample file. */
export const FILE_RUN = /^\d{4}-\d{2}-\d{2}-file-[a-z0-9-]+-(code|nocode)(-before-fix)?\.md$/;

/** Sample inputs: everything under sample/ but the answer key. */
export function sampleInputs(recipeDir) {
  const s = join(recipeDir, "sample");
  if (!existsSync(s)) return [];
  return walk(s).filter((f) => f !== "answer-key.md" && f !== "key.lock");
}

/** The metadata of one recipe, as catalog.json carries it; throws a list of problems. */
export function recipeMeta(recipeDir, id) {
  const problems = [];
  const say = (m) => problems.push(`${id}: ${m}`);
  const card = readFileSync(join(recipeDir, "recipe.md"), "utf8");
  let fm;
  try {
    fm = frontMatter(card);
  } catch (e) {
    throw [`${id}: recipe.md ${e.message}`];
  }
  for (const k of ["id", "title", "shelf", "time_to_run", "modes", "data_access", "checked_on", "last_checked", "next_check", "video", "related"]) {
    if (fm[k] === undefined || fm[k] === "") say(`recipe.md front matter has no ${k}`);
  }
  if (fm.id !== id) say(`front matter id "${fm.id}" is not the folder name`);
  if (fm.shelf && !SHELVES.has(fm.shelf)) say(`shelf "${fm.shelf}" is not one of ${[...SHELVES].join(", ")}`);
  if (fm.section !== undefined && !SECTIONS.has(fm.section)) say(`section "${fm.section}" is not one of ${[...SECTIONS].join(", ")}`);
  for (const mode of ["file", "live"]) {
    const f = fm.modes?.[mode];
    if (!f) say(`modes.${mode} is missing`);
    else if (f !== "none" && !existsSync(join(recipeDir, f))) say(`modes.${mode} names ${f}, which is not in the folder`);
    if (!fm.data_access?.[mode]) say(`data_access.${mode} is missing: say what the recipe does with data`);
  }
  if (fm.modes?.file === "none") say("modes.file is none: a recipe must work on a file in any model");
  const fileChecks = Array.isArray(fm.checked_on?.file) ? fm.checked_on.file : [];
  if (fileChecks.length < 2) say("checked_on.file needs at least two runs");
  if (!fileChecks.some((c) => /without code/i.test(c))) say("checked_on.file needs one run without code execution");
  for (const c of [...fileChecks, ...(Array.isArray(fm.checked_on?.live) ? fm.checked_on.live : [])]) if (!DATE.test(c)) say(`checked_on entry without a date: ${c}`);
  for (const k of ["last_checked", "next_check"]) if (fm[k] && !/^\d{4}-\d{2}-\d{2}$/.test(fm[k])) say(`${k} is not a YYYY-MM-DD date`);
  if (fm.last_checked && fm.next_check && fm.next_check <= fm.last_checked) say("next_check is not after last_checked");
  for (let n = 1; n <= 9; n++) if (!new RegExp(`^## ${n}\\. `, "m").test(card)) say(`recipe.md has no block "## ${n}."`);

  const prompt = existsSync(join(recipeDir, "prompt.md")) ? readFileSync(join(recipeDir, "prompt.md"), "utf8") : "";
  if (!prompt) say("prompt.md is missing");
  else if (!/(Today|Now) is:/.test(prompt)) say('prompt.md does not open with an explicit "Today is:" date');

  let skill = null;
  if (existsSync(join(recipeDir, "SKILL.md"))) {
    try {
      const sf = skillFrontMatter(readFileSync(join(recipeDir, "SKILL.md"), "utf8"));
      const extra = Object.keys(sf).filter((k) => k !== "name" && k !== "description");
      if (extra.length) say(`SKILL.md front matter carries ${extra.join(", ")}: only name and description are accepted`);
      if (sf.name !== `orla-recipe-${id}`) say(`SKILL.md name "${sf.name}" is not orla-recipe-${id}: one name per recipe, so it never collides with the Orla plugin's own skills`);
      if (!sf.description) say("SKILL.md has no description");
      skill = sf.name;
    } catch (e) {
      say(`SKILL.md ${e.message}`);
    }
  } else say("SKILL.md is missing");

  const inputs = sampleInputs(recipeDir);
  if (!inputs.length) say("sample/ has no input file");
  if (!existsSync(join(recipeDir, "sample", "answer-key.md"))) say("sample/answer-key.md is missing");
  const runs = existsSync(join(recipeDir, "runs")) ? readdirSync(join(recipeDir, "runs")).sort() : [];
  const fileRuns = runs.filter((f) => FILE_RUN.test(f) && !f.includes("-before-fix"));
  if (fileRuns.length < 2) say("runs/ needs at least two file runs");
  if (!fileRuns.some((f) => f.includes("-nocode"))) say("runs/ needs a file run without code execution");

  if (problems.length) throw problems;
  const meta = {
    id,
    title: fm.title,
    shelf: fm.shelf,
    ...(fm.section ? { section: fm.section } : {}),
    time_to_run: fm.time_to_run,
    modes: { file: fm.modes.file, live: fm.modes.live },
    data_access: { file: fm.data_access.file, live: fm.data_access.live },
    checked_on: { file: fileChecks, live: Array.isArray(fm.checked_on.live) ? fm.checked_on.live : [] },
    last_checked: fm.last_checked,
    next_check: fm.next_check,
    video: fm.video,
    related: fm.related,
    skill,
    files: {
      card: `recipes/${id}/recipe.md`,
      prompt: `recipes/${id}/prompt.md`,
      skill: `recipes/${id}/SKILL.md`,
      sample: inputs.map((f) => `recipes/${id}/sample/${f}`),
      answer_key: `recipes/${id}/sample/answer-key.md`,
      runs: runs.map((f) => `recipes/${id}/runs/${f}`),
    },
  };
  return meta;
}

/* ------------------------------------------------------------------ */
/* What must never be in this repository                               */
/* ------------------------------------------------------------------ */

function luhn(digits) {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i]);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}

function ibanValid(iban) {
  const s = iban.slice(4) + iban.slice(0, 4);
  let r = 0;
  for (const ch of s) {
    const v = /\d/.test(ch) ? ch : String(ch.charCodeAt(0) - 55);
    for (const c of v) r = (r * 10 + Number(c)) % 97;
  }
  return r === 1;
}

const SECRET_PATTERNS = [
  ["API key (sk-)", /\bsk-(?:ant-)?[A-Za-z0-9_-]{20,}/],
  ["GitHub token", /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}|\bgithub_pat_[A-Za-z0-9_]{20,}/],
  ["AWS access key", /\bAKIA[0-9A-Z]{16}\b/],
  ["Slack token", /\bxox[abprs]-[A-Za-z0-9-]{10,}/],
  ["Stripe key", /\b(?:sk|rk|pk)_(?:live|test)_[A-Za-z0-9]{10,}/],
  ["JSON web token", /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{5,}/],
  ["private key", /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ["bearer token", /\bBearer\s+[A-Za-z0-9._-]{20,}/],
];

/** Words that only Orla's private workshop uses: their presence means something internal leaked. */
const INTERNAL = [
  ["a private repository name", /\bledgerly\b/i],
  ["a local path", /\/Users\/|\/home\/[a-z]|[A-Z]:\\Users\\/],
  ["a workshop path", /\bdocs\/(?:house|qa|security|recipes-library)\b|\bbackend\/ledgerly\b/],
  ["a local server", /\blocalhost\b|\b127\.0\.0\.1\b/],
  ["an Orla space id", /\bspc_[A-Za-z0-9]{6,}/],
];

/** Invisible or direction-changing characters: a way to hide instructions in a skill. */
const HIDDEN = /[​-‏‪-‮⁠-⁤﻿]/;

/**
 * Problems with one text file's content. `allowedHosts` are the link hosts this
 * repository accepts; `allowedIbans` are the well-formed IBANs a recipe needs on
 * purpose (a check-digit trap), each listed with its reason.
 */
export function contentProblems(path, text, allowedHosts, allowedIbans = new Set()) {
  const out = [];
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    const at = `${path}:${i + 1}`;
    for (const [what, re] of SECRET_PATTERNS) if (re.test(line)) out.push(`${at}: looks like a ${what}`);
    for (const [what, re] of INTERNAL) if (re.test(line)) out.push(`${at}: ${what}`);
    if (HIDDEN.test(line)) out.push(`${at}: invisible or bidirectional character`);
    if (/<!--/.test(line)) out.push(`${at}: HTML comment (hidden text is not accepted)`);
    if (/—/.test(line)) out.push(`${at}: long dash, use a colon, a comma or a full stop`);
    for (const m of line.matchAll(/[A-Za-z0-9._%+-]+@([A-Za-z0-9.-]+\.[A-Za-z]{2,})/g)) {
      const host = m[1].toLowerCase();
      if (!/(^|\.)example$/.test(host) && !/^example\.(com|org|net)$/.test(host) && m[0].toLowerCase() !== "support@orla.finance") out.push(`${at}: email ${m[0]} is not on an .example domain`);
    }
    for (const m of line.matchAll(/https?:\/\/([^/\s)>"'`]+)([^\s)>"'`]*)/g)) {
      const host = m[1].toLowerCase();
      const ok = allowedHosts.some((h) => (h.includes("/") ? `${host}${m[2]}`.startsWith(h) : host === h));
      if (!ok) out.push(`${at}: link to ${host}, which is not in scripts/allowed-hosts.txt`);
    }
    for (const m of line.matchAll(/\b(?:\d[ -]?){12,18}\d\b/g)) {
      const d = m[0].replace(/[ -]/g, "");
      if (d.length >= 13 && d.length <= 19 && luhn(d) && !/^(\d)\1+$/.test(d)) out.push(`${at}: ${m[0]} passes the card number check`);
    }
    for (const m of line.matchAll(/\b([A-Z]{2}\d{2}(?: ?[A-Z0-9]{4}){2,7}(?: ?[A-Z0-9]{1,4})?)\b/g)) {
      const iban = m[1].replace(/ /g, "");
      if (iban.length >= 15 && iban.length <= 34 && ibanValid(iban) && !allowedIbans.has(iban)) out.push(`${at}: ${m[1]} passes the IBAN check digits and is not in scripts/allowed-ibans.txt`);
    }
  });
  return out;
}

/** The SKILL.md of a recipe may not run anything when it loads. */
export function skillProblems(path, text) {
  const out = [];
  text.split("\n").forEach((line, i) => {
    if (/!`[^`]+`/.test(line)) out.push(`${path}:${i + 1}: inline command (!\`...\`) runs when the skill loads`);
  });
  if (/^(allowed-tools|hooks|effort|model):/m.test(text.split(/\n---\n/)[0] || "")) out.push(`${path}: front matter grants tools, hooks, effort or a model`);
  // This plugin ships no server: a skill that names Orla's tools must say what it does when they are not there.
  if (/\borla_[a-z_]+/.test(text) && !/no Orla tools|With the Orla tools connected/.test(text))
    out.push(`${path}: names Orla tools but has no path for when they are not connected ("If there are no Orla tools, ...")`);
  return out;
}

/**
 * Codes in an answer key (INV-1056, RFI-88213, CN-0007) that no sample file
 * mentions: a key that names an invoice the sample does not have was counted
 * on another sample. Lines that describe a gap ("not in the list", "missing")
 * name absent codes on purpose and are skipped.
 */
export function keyCodesMissing(recipeDir) {
  const key = readFileSync(join(recipeDir, "sample", "answer-key.md"), "utf8");
  const sample = sampleInputs(recipeDir)
    .map((f) => readFileSync(join(recipeDir, "sample", f), "utf8"))
    .join("\n");
  const codes = new Set();
  for (const line of key.split("\n")) {
    if (/\b(not in|missing|absent|gaps?)\b/i.test(line)) continue;
    for (const m of line.matchAll(/\b[A-Z]{2,5}-[A-Z0-9]*\d[A-Z0-9-]*\b/g)) codes.add(m[0].replace(/-+$/, ""));
  }
  return [...codes].filter((c) => !sample.includes(c));
}

/** sha256 of each sample input and of the answer key, as sample/key.lock records them. */
export function keyLock(recipeDir) {
  const lines = [...sampleInputs(recipeDir), "answer-key.md"].map(
    (f) => `${createHash("sha256").update(readFileSync(join(recipeDir, "sample", f))).digest("hex")}  ${f}`,
  );
  return lines.join("\n") + "\n";
}

export function parseLock(text) {
  const out = new Map();
  for (const l of text.trim().split("\n")) {
    const m = l.match(/^([0-9a-f]{64})  (.+)$/);
    if (m) out.set(m[2], m[1]);
  }
  return out;
}

/** README.md with its "## The recipes" table rebuilt from the catalog. */
export function readmeWithRecipes(readme, recipes) {
  const head = "## The recipes\n\n";
  const i = readme.indexOf(head);
  if (i < 0) throw new Error('README.md has no "## The recipes" section');
  const j = readme.indexOf("\n## ", i + head.length);
  const shelf = (r) => (r.shelf === "business" ? "Business" : "Accountant") + (r.section ? `, ${r.section}` : "");
  const rows = recipes.map((r) => `| [${r.title}](recipes/${r.id}/recipe.md) | ${shelf(r)} | ${r.time_to_run} |`);
  const table = ["| Recipe | Shelf | Time |", "|---|---|---|", ...rows].join("\n") + "\n";
  return readme.slice(0, i + head.length) + table + readme.slice(j);
}

export { extname };
