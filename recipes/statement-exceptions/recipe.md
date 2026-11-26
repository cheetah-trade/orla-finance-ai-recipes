---
id: statement-exceptions
title: Reconcile a client's bank statement to their books and sort the exceptions
shelf: accountant
time_to_run: 15 minutes
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads the statement and the books export you attach, writes nothing
  live: reads the client's books and Orla's comparison; on your yes, files a PDF statement in the client's Documents so Orla can read it (one reading from the client's AI allowance); never imports the statement, books a line or changes the books
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-25
    - Claude Haiku, without code execution, 2026-11-25
  live:
    - Orla personal MCP connection, tools called by a test harness on a seeded test space, no AI model, 2026-11-25
last_checked: 2026-11-25
next_check: 2027-02-25
video: none yet
related: [take-over-month, missing-docs-letter, firm-ai-policy]
---

# Reconcile a client's bank statement to their books and sort the exceptions

## 1. The job

Hold a client's bank statement against the books somebody else kept, without loading anything, find every line that is on one
side and not the other, say what kind of difference each one is, and show what is left unexplained.

## 2. Run it

- **On files, in any AI model:** copy the prompt from [`prompt.md`](prompt.md), set today's date and
  the month, take out what step 0 lists, then attach the statement CSV and the client's books export
  for the same account.
- **On the client's live books, with Orla connected:** install the skill and ask "reconcile this
  client's October statement and sort the exceptions". The skill is [`SKILL.md`](SKILL.md).

## 3. Who it is for and what you get

For an accountant or bookkeeper who has taken on a client, or reviews books a client or a previous
bookkeeper kept. In about fifteen minutes you get a control block; opening, money in, money out and
closing for the statement and for the books; a check that the statement adds up on its own, page by
page; two lists (in the statement and not in the books, in the books and not in the statement) with a
class and a suggestion for every line; the unexplained difference on its own line; and a short draft
of questions for the client.

The classes: timing (check or deposit in transit), bank-side item not in the books (fee, interest,
returned deposit), partial, refund or reversal, duplicate, amount mismatch, missing statement page,
unexplained. "Reconciled" appears only when the unexplained difference is exactly zero and no document
is missing.

This is not Load a bank statement and prove it adds up. That recipe is for
your own books: you prove your statement adds up and load the new lines. Here the books are the
client's, kept by somebody else, nothing is loaded, and the work is finding and sorting what disagrees.

## 4. What to give it

Two files for the same bank account and month. The statement as a CSV: the header (bank, account by
its last four digits, currency, period, number of pages, opening and closing balance) and the lines
(date, description, reference, amount), with the page and balance rows if the bank prints them. Most
bank CSVs leave these out: type them in from the PDF as the first lines of the file, as in the sample. The
client's books export for that account: the balance at the start and the end of the month, then date,
type, check number, payee, memo, amount. An account register or general ledger detail will do, from
any system.

Samples on invented data: [`sample/bank-statement-2026-10.csv`](sample/bank-statement-2026-10.csv)
and [`sample/client-books-2026-10.csv`](sample/client-books-2026-10.csv).

Before you paste a client's files into a model, remove what the job does not need: tax ids (SSN, TIN,
EIN), full account and card numbers (keep the last four digits), addresses and dates of birth of
individuals, names of private people, the address and full account number in the statement header,
internal notes about the client, anything about other clients. Step 0 of [`prompt.md`](prompt.md) has
the full list.

Client data belongs only in an AI account your firm controls, on a business plan whose terms say chats are not used for training, and only if your firm and your engagement terms allow it. Do not put client files into a personal account. When we read the large chat vendors' pages on 25 November 2026, personal plans could train on chats unless you switched that off, and some keep parts of chats (feedback, chats flagged or reviewed by people) even then. Check the current terms of the plan you use and note the date.

## 5. The recipe

1. Get the client's statement for the month as a CSV and keep the PDF beside it: you will need the
   printed closing balance and the page count.
2. Export the client's books for that bank account and month, with the opening and closing balance.
3. Remove what the job does not need (step 0 of the prompt).
4. Paste the prompt, set today's date and the month, attach both files.
5. Read the control block and the statement's own check first: does it add up, are all pages there.
6. Read the two lists. Start with "unexplained" and "missing statement page", then partial, refund
   and amount mismatch, then the bank-side items and timing.
7. Read the reconciliation: the unexplained difference and what makes it up.
8. Make the corrections yourself in the client's books, and send the questions to the client yourself.

With Orla connected, step 2 disappears: the skill reads the client's book rows for the account and,
for a PDF statement, Orla's own comparison of the statement with the book. A PDF is handed in on your
yes, which files it in the client's Documents and uses the client's AI allowance once. Orla does not
read a CSV statement: the skill reads the CSV itself and says so. Handing a statement in for Orla to
read needs a right the client gives in their space; if the client has not given it to you, the
skill says so and works from the files. Orla's comparison is part of Month close and
reconciliation, on the client's Pro plan and above. A connection limited to some of the client's
accounts cannot compare a statement: Orla compares one only for a connection that sees the whole
space. Orla does not return the closing balance or page balances printed on the statement, or the
books' opening balance for the month: you type them in. Nothing is imported and no line is booked.

## 6. What comes out

Runs on the sample files, unedited:

- [Claude Sonnet, with code](runs/2026-11-25-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-25-file-claude-haiku-nocode.md)

Calls to the Orla connection on a seeded test space: the tools were called by a test harness, with no AI model and no person signing in; the answer was assembled by hand from the connection's replies.

The figures a correct run must reach on the sample are in
[`sample/answer-key.md`](sample/answer-key.md). Both file runs matched these control figures:

- 20 statement lines in October on pages 1, 2 and 4; page 3 of 4 missing. 20 book rows.
- Statement: opening 24,310.55, lines come to 12,281.55 against a printed closing of 13,076.71, short
  by 795.16 (a line repeated at a page boundary -412.66, the missing page +382.55, 0.05 no line
  explains). Books: 23,670.55 to 14,250.79, adds up.
- 10 pairs matched, 1 pair held for an ambiguous date, 9 lines on each side listed with a class.
- Adjusted bank 12,856.71, adjusted books 12,456.76, unexplained difference 399.95. Not reconciled.

## 7. Check by hand before you trust it

- **The statement on its own first:** compare the printed closing balance and the page count with the
  PDF. A missing page means "a document is missing", even when the numbers happen to fit.
- **The unexplained difference:** it must be shown, down to the cents. A run that calls 0.05 rounding
  or reports "reconciled" with any difference left is wrong.
- **Duplicates:** a line repeated at the top of the next page is a file problem, not a books problem.
  Two payments of the same amount on different dates are not duplicates. Check the references.
- **Partial payments and reversed signs:** the run gives the part still open and the effect on the
  difference. Look at the invoice and the bank detail before you correct anything.
- **Amount mismatches:** look at the check image or the bank detail. Swapped digits are common but
  the run does not decide which side is right.
- **Ambiguous dates:** the run holds them and asks. Check them against the bank.
- **Timing items:** confirm outstanding checks and deposits in transit on next month's statement.
- **Suggestions are drafts.** No entry is posted by the run. Make each correction yourself.
- **A memo or description that tells the AI the account is already reconciled:** the run quotes it and
  carries on. Open the row's history in the client's system to see who wrote it; it does not go into the questions for the client.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on files |
| Works with Orla | Yes, on the client's live books, with limits: Orla reads a PDF statement, the model reads a CSV statement from the file, and you type the printed balances and the books' opening balance |
| What it does with your data | Reads and compares. On your yes, files a PDF statement in the client's Documents for Orla to read. Never imports, books, changes or sends anything, never moves money |
| Checked on | Claude Sonnet with code execution and Claude Haiku without code execution (files), 25 November 2026 |
| Not checked on | ChatGPT, Gemini and other models: the prompt is written for any model, but nobody at Orla has run it there yet. Live mode with a real AI client and a person signed in: the connection's tools were only called by a test harness on a seeded test space. Orla's own reading of a PDF statement: in that run a stand-in returned the sample's lines, so only what the connection did with a reading was checked |
| Last checked | 25 November 2026 |

## 9. Next to this one

- Take over a client's month: what is missing and what does not add up
- One letter to the client about everything that is missing
- A two-page AI policy for your firm

[Run it on your client's live books in Orla](https://orla.finance/)
