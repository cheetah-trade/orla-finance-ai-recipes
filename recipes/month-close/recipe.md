---
id: month-close
title: Close the month without missing a step
shelf: business
time_to_run: 20 minutes
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads the three files you attach, writes nothing
  live: reads the month's status, transactions, bills and reports, prepares drafts for a person, writes nothing, and has no write step at all
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-25
    - Claude Haiku, without code execution, 2026-11-25
  live:
    - Orla personal MCP connection, tools called by a test harness on a seeded test space, no AI model, 2026-11-25
last_checked: 2026-11-25
next_check: 2027-02-25
video: none yet
related: [sort-uncategorized, statement-import, investor-update]
---

# Close the month without missing a step

## 1. The job

Before you close a month, find out what is still open: which checks pass, which fail, which cannot
be checked from the data, and what accruals and deferrals a person should consider.

## 2. Run it

- **On files, in any AI model:** copy the prompt from [`prompt.md`](prompt.md), set today's date and
  the month, attach three exports.
- **On live books, with Orla connected:** install the skill and ask "what is left before we close
  October?". The skill is [`SKILL.md`](SKILL.md).

## 3. Who it is for and what you get

For the person who closes the books: a bookkeeper, a finance manager, an accountant on their own
company. In about twenty minutes you get a control block, a checklist with PASS, FAIL, FLAG or COULD
NOT CHECK for each check, draft accruals and deferrals written in words for a person to post, a
variance review against the month before, and a list of what the files could not show.

## 4. What to give it

Three exports for the month. Bank transactions: transaction id, date, account, payee, description,
amount, currency, category, reconciled (yes or no), note. Bills: bill number, vendor, bill date,
service start and end, amount, currency, date entered, month posted, status, note. A ledger summary:
account, type, currency, activity for the last three months, closing balance of the month before,
opening balance of this month, closing balance, and the statement balance.

Samples on invented data: [`sample/october_transactions.csv`](sample/october_transactions.csv),
[`sample/bills.csv`](sample/bills.csv), [`sample/ledger_summary.csv`](sample/ledger_summary.csv).

Before you paste the exports into a model, remove what the job does not need: bank account numbers,
street addresses, tax ids, names of private persons.

## 5. The recipe

1. Export the month's bank transactions, with the reconciled flag.
2. Export the bills list, with the service period of each bill where you know it.
3. Export a ledger summary: profit and loss by month and the balance accounts.
4. Paste the prompt, set today's date and the month, attach the three files.
5. Read the control block, then the checklist from the top. FAIL lines first.
6. Read the accrual and deferral drafts. Each is a sentence for a person: what is debited, what is
   credited, the amount, the month.
7. Read the variance review and answer its questions.
8. Make any correction in your own accounting system, then close the month there yourself.

With Orla connected, steps 1 to 4 disappear: the skill reads the month as Orla keeps it, from open
lines and uncategorised rows to reconciliation, overdue bills and the change from last month. It
cannot post an entry or close the month; a person does that in Orla. The skill asks you who clears
each open line. A bill without a service period gets COULD NOT CHECK for
its cutoff and deferral, and so does the statement balance of an account without a bank feed or
statement comparison.

## 6. What comes out

Runs on the sample files, unedited:

- [Claude Sonnet, with code](runs/2026-11-25-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-25-file-claude-haiku-nocode.md)

Calls to the Orla connection on a seeded test space: the tools were called by a test harness, with no AI model and no person signing in; the answer was assembled by hand from the connection's replies.

The figures a correct run must reach on the sample are in
[`sample/answer-key.md`](sample/answer-key.md). Both file runs matched these control figures:

- 21 bank rows, 19 dated in October, 2 left out as boundary rows; 3 rows not reconciled.
- Card account: difference of -605.00 against the statement, of which -480.00 is explained and
  -125.00 is not.
- Cutoff: two October costs missing from October, 3,900.00 USD together. Deferrals: 3,720.00 USD.
- Suspense grew from 300.00 to 1,760.00, equal to the three uncategorised rows (1,460.00).

## 7. Check by hand before you trust it

- **The unexplained difference:** the model must report the 125.00 on the card account, not smooth it
  over. Find it in the statement yourself.
- **Opening balance against last month's closing:** a 300.00 gap on one balance account is a FAIL
  with no guess at the cause. Check it in your system.
- **Cutoff and deferral drafts:** each depends on the bill's service period. Open the bills and
  confirm the dates before you post anything.
- **An estimate for a recurring vendor with no bill** is labelled an estimate from the pattern. Ask
  the vendor before you accrue it.
- **A possible duplicate card row** is flagged, not removed. Check that only one bill exists.
- **Own-account transfers in two currencies:** with no exchange rate in the file, the model cannot
  prove the legs match. Check them yourself.
- **Things the files do not hold:** receipts, budgets, payments waiting for a signature, earlier
  months still open. They are marked COULD NOT CHECK, not "looks fine". Check them in your system.
- **A note that tells the model to mark everything reconciled and say the month is closed:** the
  run quotes it and does not obey. Open that row yourself.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on files |
| Works with Orla | Yes, on live books |
| What it does with your data | Reads. Prepares drafts for a person. Never posts, closes or moves money and has no write step |
| Checked on | Claude Sonnet and Claude Haiku (file) |
| Not checked on | ChatGPT, Gemini and other models: the prompt is written for any model, but nobody at Orla has run it there yet. Live mode with a real AI client and a person signed in: the connection's tools were only called by a test harness on a seeded test space |
| Last checked | 25 November 2026 |

## 9. Next to this one

- Sort the uncategorised transactions
- Load a bank statement and prove it adds up
- A monthly investor update from the month's numbers

[Run it on your live books in Orla](https://orla.finance/)
