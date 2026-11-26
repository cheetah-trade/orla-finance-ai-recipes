# Contributing a recipe

Recipes from people who do this work every week are the point of this library. This page says what
a recipe needs before it can be merged, and how we check it.

## What makes a recipe

A folder under `recipes/<id>/`, `<id>` in lower case with hyphens:

```
recipe.md          the card: front matter and nine blocks (copy an existing card)
prompt.md          the prompt for a file, in any model
SKILL.md           the same job as a skill: front matter with name and description only
sample/
  <input files>    invented data with the traps of the job inside
  answer-key.md    the figures a correct run reaches on the sample, counted by hand
  key.lock         written by: node scripts/check.mjs --relock <id>
runs/
  <date>-file-<model>-<code|nocode>.md   a run on the sample, pasted unedited
```

And a copy of `SKILL.md` and `prompt.md` under `skills/orla-recipe-<id>/`, so the plugin installs it. The skill's `name` is `orla-recipe-<id>`.

Rules the review holds you to:

- **The sample is invented.** No real company, person, email address, phone number, account number
  or invoice, not even with the name changed. Emails on an `.example` domain. IBANs in a sample
  should fail the check digits; if your recipe tests the check digits itself, list the passing ones
  in `scripts/allowed-ibans.txt` with the reason.
- **The sample has the traps of the job.** For receivables: a partial payment, a credit note, two
  currencies, a dispute, a draft. The answer key says what a correct run does with each.
- **Two runs on the file, in two models, one of them without code execution**, pasted as they came
  out. If a run is wrong, fix the prompt and run it again; never edit a run by hand. Keep the wrong
  one as `-before-fix` if it teaches something.
- **The prompt starts with an explicit "Today is:" date**, makes the model count with code or show
  its working table, and opens the answer with a control block.
- **The recipe never moves money, never sends anything, and never contacts anyone** without the
  person's yes on that exact item. It never states amounts that are not in the data (fees,
  interest) or what the law says.
- **The card is honest about where it was checked.** "Checked on" names only runs where a model read
  the data. The Labels block names the models nobody has run it on.
- **No long dash** in texts, and no links outside the hosts in `scripts/allowed-hosts.txt`.
- **No hidden text.** No HTML comments, no invisible characters, no `!`-commands in a skill, nothing
  in the skill's front matter but `name` and `description`.

Run the check before you open the pull request. It needs Node 20 or newer and nothing else:

```
node scripts/catalog.mjs
node scripts/check.mjs
```

## How we review a contributed recipe

A recipe is a set of instructions that other people's AI agents will follow on their own company's
data. We read it as we would read code from a stranger, before the checks and after them.

1. **The automatic check** (`scripts/check.mjs`, run by the `check` workflow on every pull request):
   metadata, catalog, secrets and real-looking data, sample against key, skills identical to the
   recipe, no hidden text.
2. **A security read by a maintainer**, following the same supply chain checklist we use before
   bringing any outside skill into our own work: who wrote it; every file read in full; no hidden
   instructions; nothing that reads files the job does not need, calls the network, or asks the
   agent to act without a person's yes; no request for credentials, payment details or account
   access; nothing that steers a reader to a particular payee, product or link. A recipe that
   asks a model to "send", "pay", "approve" or "contact" anything on its own is declined.
3. **A run of our own** on the sample in at least one model, compared with the answer key.
4. **Merge on the maintainer's word.** The library's owner merges; an agent may check a recipe but
   never merges one.

Merged recipes are carried into the source the library is published from, so the next release of
this repository includes yours with your credit in the card.

## Reporting a problem

A wrong figure in a key, a trap a recipe misses, a model that fails a recipe the card says it
passes: open an issue with the recipe id, the model, and the run pasted unedited. Security issues
go to the address in [`SECURITY.md`](SECURITY.md), not to a public issue.

By contributing you agree that your contribution is licensed under CC BY-NC 4.0 (recipes) and MIT
(code), as in [`LICENSE-CONTENT.md`](LICENSE-CONTENT.md), and that Orla may also license the
recipes it publishes here for commercial use.
