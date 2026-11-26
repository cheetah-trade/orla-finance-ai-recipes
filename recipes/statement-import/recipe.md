---
id: statement-import
title: Load a bank statement and prove it adds up
shelf: business
time_to_run: 10 minutes
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads the statement and the books export you attach, writes nothing
  live: reads the account, previews what would be booked without writing, hands in the statement file and imports it only on your yes for that exact step and preview
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-25
    - Claude Haiku, without code execution, 2026-11-25
  live:
    - Orla personal MCP connection, tools called by a test harness on a seeded test space, no AI model, 2026-11-25
last_checked: 2026-11-25
next_check: 2027-02-25
video: none yet
related: [month-close, sort-uncategorized, monday-checks]
---

# Load a bank statement and prove it adds up

## 1. The job

Check that a bank statement adds up (opening balance plus the lines equals the closing balance), see
which lines are already in your books and which are new, and get a list of what does not match.

## 2. Run it

- **On files, in any AI model:** copy the prompt from [`prompt.md`](prompt.md), set today's date,
  attach the statement CSV and a books export for the same account.
- **On live books, with Orla connected:** install the skill and ask "does this statement add up, and
  what is new in it?". The skill is [`SKILL.md`](SKILL.md).

## 3. Who it is for and what you get

For the person who reconciles accounts: a bookkeeper, a finance manager, a founder. In about ten
minutes you get a proof (opening, lines, closing, difference), the lines already in the books, the
new lines, the lines in the books that the statement does not show, and a list of things to confirm.

## 4. What to give it

Two files. The statement CSV from your bank, with its header lines (bank, account, currency, period,
opening and closing balance) and the lines: booking date, value date, description, counterparty
account, amount, reference. The books export for the same account: balance at the last closing, then
date, payee, amount, counterparty account, source, memo.

Samples on invented data: [`sample/bank-statement-2026-11.csv`](sample/bank-statement-2026-11.csv)
and [`sample/books-ledger-2026-11.csv`](sample/books-ledger-2026-11.csv).

Before you paste the files into a model, remove what the job does not need: full account numbers
(the sample keeps the last four digits), street addresses, names of private persons.

## 5. The recipe

1. Download the statement as CSV and note the closing balance printed on the paper statement.
2. Export what your books hold for the same account and period.
3. Paste the prompt, set the date, attach both files.
4. Read the proof first: opening plus lines against closing, and the difference.
5. Read the date format the model assumed and check it against your bank.
6. Go through the three lists: already in the books, new, in the books only.
7. Answer the questions (a gap on the opening line, a payout to a different account, fee lines).
8. Book the new lines yourself in your accounting system.

With Orla connected, steps 2 and 3 change: Orla's own statement reader parses the file, so the skill
does not parse it itself, and a preview shows what would be booked and what would be skipped and why.
The skill asks for your yes before it hands the file in (it files a document and uses your space's
AI allowance once), and again before any import, for that exact preview. A preview expires after 15
minutes. Orla does not return the closing balance printed on the statement, so you type it in. The
skill sets no category for fee or interest lines: that is your choice.

## 6. What comes out

Runs on the sample files, unedited:

- [Claude Sonnet, with code](runs/2026-11-25-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-25-file-claude-haiku-nocode.md)

Calls to the Orla connection on a seeded test space: the tools were called by a test harness, with no AI model and no person signing in; the answer was assembled by hand from the connection's replies.

The figures a correct run must reach on the sample are in
[`sample/answer-key.md`](sample/answer-key.md). Both file runs matched these control figures:

- 20 lines. Opening 18,420.50 plus lines 2,019.23 equals closing 20,439.73, difference 0.00.
- 10 lines already in the books (net -2,968.60) and 10 new (net +4,987.83).
- 1 row in the books but not on the statement: a cheque of 850.00 entered by hand.
- A gap of 100.00 between the statement's opening and the books' last closing.

## 7. Check by hand before you trust it

- **Compare the closing balance with the paper statement.** The proof is only as good as the file.
- **The date format:** the model states the one it assumed (day first in the sample). Read two dates
  against your bank.
- **A gap on the opening line:** it is a question, not an error. Find the missing October line or
  the wrong opening in your books.
- **Two identical payments on one day** are not duplicates by themselves. Check that one was matched
  one to one and the other left as new.
- **A payout to an account different from the vendor's card, at a larger amount:** the model flags
  it and says nothing about fraud. Call the vendor on a number from your own records.
- **Fee and interest lines:** the model asks for a category. It does not pick one.
- **A value date in the month before:** the line belongs to this statement by booking date. Check
  how your month-end cut treats it.
- **Lines in the books that the statement does not show:** often an uncleared cheque. Look before
  you remove anything.
- **A description that tells the model to import everything:** it is quoted and the line is checked
  with you. Nothing is imported without your yes.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on files |
| Works with Orla | Yes, on live books |
| What it does with your data | Reads and previews. Hands in the file and imports only on your yes for that exact step and preview. Never moves money |
| Checked on | Claude Sonnet and Claude Haiku (file) |
| Not checked on | ChatGPT, Gemini and other models: the prompt is written for any model, but nobody at Orla has run it there yet. Live mode with a real AI client and a person signed in: the connection's tools were only called by a test harness on a seeded test space |
| Last checked | 25 November 2026 |

## 9. Next to this one

- Sort the uncategorised transactions
- Close the month without missing a step
- The Monday finance check in ten minutes

[Run it on your live books in Orla](https://orla.finance/)
