# Finance AI recipes

Ready prompts and skills for the person who runs a company's finances: who owes us, which bills to
pay this week, how long the cash lasts, closing the month, answering a bank's questions. Each recipe
works on a file you export from your own systems, in any AI model. Each one was run on an invented
sample file and checked against an answer key counted by hand, and the runs are here unedited.

Made by [Orla](https://orla.finance). The same recipes, with pictures, are at
[orla.finance/en/recipes](https://orla.finance/en/recipes).

## Run a recipe on a file, in any model

1. Open the recipe's folder under [`recipes/`](recipes/) and its `prompt.md`.
2. Copy the prompt block into ChatGPT, Claude, Gemini or any other model. Set the date on its first
   line.
3. Attach your export. The `sample/` folder shows the columns the recipe expects; try the sample
   first if you want to see what a good answer looks like.
4. Read the control block at the top of the answer before anything else: rows in the file, rows
   counted, totals per currency. If they do not match your file, stop and ask the model why.

Before you attach a real export, remove what the job does not need: bank account numbers, street
addresses, tax ids. Each card says what to remove for its job.

## Install the recipes as skills

In Claude Code:

```
/plugin marketplace add cheetah-trade/finance-ai-recipes
/plugin install finance-ai-recipes@finance-ai-recipes
```

That installs every recipe as a skill, named `orla-recipe-<recipe>`, so it never collides with the Orla plugin's own skills. Ask in your own words ("who owes us
and who should we remind?") and the matching skill picks itself up. In Cursor, the same folder is a
plugin through `.cursor-plugin/plugin.json`. Any other agent that reads skills can take a folder
from [`skills/`](skills/) as it is: each holds `SKILL.md` and the `prompt.md` it follows.

The skills are text only. They bring no server, no script and no network access. On their own they
ask you for a file and follow the recipe's prompt. If the
[Orla plugin](https://github.com/cheetah-trade/orla-cli) is installed and connected, the same skills
read your live books in Orla instead. They read first; anything that would send something or write
to your books is shown to you as a preview and happens only after your yes on that item. Nothing
moves money.

## Check an answer against the key

Every recipe has `sample/answer-key.md`: the figures a correct run must reach on the sample and the
traps it must handle (a partial payment, a credit note, two spellings of one client, two
currencies). Run the recipe on the sample in your model and compare. If your model misses a trap
there, it will miss it on your data too. `runs/` holds our own runs on the sample, pasted unedited,
including the ones that got something wrong before we fixed the prompt (`-before-fix`).

Each card's "Labels" block says which models a recipe was checked on, and which it was not.

## The recipes

| Recipe | Shelf | Time |
|---|---|---|
| [Check your documents for a new business account or a bank's periodic review](recipes/account-opening-pack/recipe.md) | Business, compliance | 20 minutes, plus the time to collect new documents |
| [Find the document behind every unusual payment, before your bank asks](recipes/bank-eyes-check/recipe.md) | Business, compliance | 15 minutes, plus the time to collect missing documents |
| [Answer a bank's request for information about your account](recipes/bank-request-reply/recipe.md) | Business, compliance | 20 minutes, plus the time to collect missing documents |
| [Bills due this week and what can wait](recipes/bills-due/recipe.md) | Business | 10 minutes |
| [How long our cash lasts and where it runs low](recipes/cash-forecast/recipe.md) | Business | 15 minutes |
| [Check a new client or supplier before the first payment](recipes/counterparty-precheck/recipe.md) | Business, compliance | 15 minutes for the lookups, 5 minutes for the run |
| [Who owes us and who to remind](recipes/debtors/recipe.md) | Business | 10 minutes |
| [Draft an AI policy for your firm in two pages](recipes/firm-ai-policy/recipe.md) | Accountant | 15 minutes, plus the time your people need to answer the questionnaire (about 30 minutes if you fill it in together) |
| [Your business account is frozen: what to do on the first day](recipes/frozen-account-first-day/recipe.md) | Business, compliance | 15 minutes |
| [A monthly investor update from the month's numbers](recipes/investor-update/recipe.md) | Business | 15 minutes |
| [One letter to the client for everything that is missing](recipes/missing-docs-letter/recipe.md) | Accountant | 15 minutes |
| [What needs my attention on Monday, in ten minutes](recipes/monday-checks/recipe.md) | Business | 10 minutes |
| [Close the month without missing a step](recipes/month-close/recipe.md) | Business | 20 minutes |
| [Sort the transactions that have no category](recipes/sort-uncategorized/recipe.md) | Business | 10 minutes |
| [Reconcile a client's bank statement to their books and sort the exceptions](recipes/statement-exceptions/recipe.md) | Accountant | 15 minutes |
| [Load a bank statement and prove it adds up](recipes/statement-import/recipe.md) | Business | 10 minutes |
| ["Take over a client's month: what is missing and what does not add up"](recipes/take-over-month/recipe.md) | Accountant | 20 minutes |
| ["Year-end contractor list and questions for the tax preparer (US only)"](recipes/year-end-contractors/recipe.md) | Accountant | 25 minutes |

## Machine-readable list

[`catalog.json`](catalog.json) lists every recipe with its shelf, section, modes, what it does with
your data, the models and dates it was checked on, and its files. It is built from the cards'
front matter by `node scripts/catalog.mjs`, and the check below fails if it drifts.

## What a recipe never does

- Move money, pay, transfer, or change anything in your books without your yes for that exact item.
- Send an email or contact anyone. It writes drafts for you.
- Name amounts that are not in your data (late fees, interest, penalties) or tell you what the law
  says.

## Contributing

New recipes and fixes are welcome: see [`CONTRIBUTING.md`](CONTRIBUTING.md). Every pull request runs
`node scripts/check.mjs`: card metadata, the catalog, no secrets or real-looking personal data in
samples, and samples that still match their answer keys.

## License

Recipes (cards, prompts, skills, samples, keys, runs) under CC BY-NC 4.0, code under MIT. The
texts are free to use for your own work; using them in a commercial product is allowed only with
Orla's permission: write to support@orla.finance. See [`LICENSE-CONTENT.md`](LICENSE-CONTENT.md)
and [`LICENSE`](LICENSE).
