#!/usr/bin/env node
/**
 * Writes catalog.json, and the recipe table in README.md, from the cards' front matter. The cards are the source:
 * edit recipe.md, then run this.
 *
 *   node scripts/catalog.mjs
 */
import { readdirSync, statSync, writeFileSync, readFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { recipeMeta, readmeWithRecipes } from "./lib.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const RECIPES = join(ROOT, "recipes");
const recipes = [];
for (const id of readdirSync(RECIPES).sort()) {
  if (!statSync(join(RECIPES, id)).isDirectory()) continue;
  try {
    recipes.push(recipeMeta(join(RECIPES, id), id));
  } catch (e) {
    console.error((Array.isArray(e) ? e : [e.message]).join("\n"));
    process.exit(1);
  }
}
writeFileSync(join(ROOT, "catalog.json"), JSON.stringify({ recipes }, null, 2) + "\n");
const readme = join(ROOT, "README.md");
writeFileSync(readme, readmeWithRecipes(readFileSync(readme, "utf8"), recipes));
console.log(`catalog.json: ${recipes.length} recipes`);
