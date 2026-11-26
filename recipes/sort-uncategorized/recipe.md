---
id: sort-uncategorized
title: Sort the transactions that have no category
shelf: business
time_to_run: 10 minutes
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads the two files you attach, writes nothing
  live: reads uncategorised rows and your categories, previews changes without writing, and changes rows or creates a rule only on your yes for that exact item
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-25
    - Claude Haiku, without code execution, 2026-11-25
  live:
    - Orla personal MCP connection, tools called by a test harness on a seeded test space, no AI model, 2026-11-25
last_checked: 2026-11-25
next_check: 2027-02-25
video: none yet
related: [month-close, statement-import, monday-checks]
---

# Sort the transactions that have no category

## 1. The job

Take the bank lines that have no category yet and get a proposed category for each, with a confidence
and a reason, a short queue for the doubtful ones, and the rules worth suggesting.

## 2. Run it

- **On files, in any AI model:** copy the prompt from [`prompt.md`](prompt.md), set today's date,
  attach the uncategorised rows and your category list.
- **On live books, with Orla connected:** install the skill and ask "sort my uncategorised
  transactions". The skill is [`SKILL.md`](SKILL.md).

## 3. Who it is for and what you get

For the person who keeps the books: a bookkeeper, a finance manager, a founder. In about ten
minutes you get a count line, a proposed category for each row with a confidence and a reason, a
review queue with one question per row, rows left alone and why, rules to consider with the rows
each would touch, and red flags. Every proposal is a draft until you decide.

## 4. What to give it

Two files. The rows to sort: transaction id, date, account, payee, description, amount, currency,
note. Your context: your list of categories (id, name, kind) plus some rows you have already
categorised (date, payee, amount, currency, category), because the model learns your habits from
them.

Samples on invented data: [`sample/uncategorized.csv`](sample/uncategorized.csv) and
[`sample/context.csv`](sample/context.csv).

Before you paste the exports into a model, remove what the job does not need: bank account numbers,
card numbers, street addresses, names of private persons.

## 5. The recipe

1. Export the transactions with no category.
2. Export your category list and 20 to 50 rows you have already sorted.
3. Paste the prompt, set the date, attach both files.
4. Read the count line. The groups must add up to the number of rows in your file.
5. Go through high-confidence rows first, then the review queue, one question at a time.
6. Decide on each rule suggestion. A rule files future rows by payee.
7. Apply the categories you agree with in your own accounting system.

With Orla connected, steps 1 to 3 disappear: the skill reads your categories and uncategorised rows,
looks at how each payee was sorted before, and asks Orla to preview every group without writing. The
preview carries Orla's own confidence and its basis, and a row Orla marks low is asked about on its
own. Orla has no way to create a new category: a row that fits none is left alone until you add one.
Changing rows, or creating a rule, happens only on your yes for that exact item.

## 6. What comes out

Runs on the sample files, unedited:

- [Claude Sonnet, with code](runs/2026-11-25-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-25-file-claude-haiku-nocode.md)

Calls to the Orla connection on a seeded test space: the tools were called by a test harness, with no AI model and no person signing in; the answer was assembled by hand from the connection's replies.

The figures a correct run must reach on the sample are in
[`sample/answer-key.md`](sample/answer-key.md). Both file runs matched these control figures:

- 25 rows: 9 high confidence, 6 medium, 5 low, 3 with no category proposed, 2 own transfers left
  alone (9 + 6 + 5 + 3 + 2 = 25).
- Review queue of 14 rows; 7 rules suggested, touching exactly the 9 high-confidence rows.
- Nothing applied and no category invented (the sample has no "Owner draw" category).

## 7. Check by hand before you trust it

- **A merchant filed in several categories** (the sample has one): the model sends every row to the
  queue and offers no rule. Look at the history before you pick one.
- **Own transfers:** two legs between your own accounts are neither spending nor income. Check that
  the model left both alone.
- **A payee one letter off a known vendor** at the usual amount: the model flags it and does not file
  it. Check the vendor before you categorise or pay anything.
- **Payouts net of fees:** the fee may exist only in a note. Decide yourself how fees are booked.
- **Tax and loan lines** never rise above low confidence. Which tax, which period, and the split
  between principal and interest are yours to decide.
- **Refunds:** the model states the direction caveat. Check which category you want for the reversal.
- **A rule on a prefix** can catch lookalikes. Check the rule uses the exact payee and look at the
  rows it would touch.
- **A note telling the model to apply a category to every row:** it is quoted, not obeyed, and the
  row stays in the queue. Open that row yourself.
- **Budgets count categorised rows only**, so they are understated until the open rows are sorted.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on files |
| Works with Orla | Yes, on live books |
| What it does with your data | Reads. Proposes categories and rules for a person. Changes rows or creates a rule only on your yes for that exact item. Never moves money |
| Checked on | Claude Sonnet and Claude Haiku (file) |
| Not checked on | ChatGPT, Gemini and other models: the prompt is written for any model, but nobody at Orla has run it there yet. Live mode with a real AI client and a person signed in: the connection's tools were only called by a test harness on a seeded test space |
| Last checked | 25 November 2026 |

## 9. Next to this one

- Close the month without missing a step
- Load a bank statement and prove it adds up
- The Monday finance check in ten minutes

[Run it on your live books in Orla](https://orla.finance/)
