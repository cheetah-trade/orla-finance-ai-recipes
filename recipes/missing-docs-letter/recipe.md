---
id: missing-docs-letter
title: One letter to the client for everything that is missing
shelf: accountant
time_to_run: 15 minutes
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads the three files you attach, writes nothing, drafts a letter for you to send yourself
  live: reads one client's expenses without a document, their transactions and the files on them, drafts a letter for a person, sends nothing and has no write step
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-25
    - Claude Haiku, without code execution, 2026-11-25
  live:
    - Orla personal MCP connection, tools called by a test harness on a seeded test space, no AI model, 2026-11-25
last_checked: 2026-11-25
next_check: 2027-02-25
video: none yet
related: [take-over-month, year-end-contractors, firm-ai-policy]
---

# One letter to the client for everything that is missing

## 1. The job

Ask a client once, in one clear letter, for every receipt and invoice still missing for a period,
without asking twice for what you already have and without anything in the letter that should stay
inside your firm.

## 2. Run it

- **On files, in any AI model:** copy the prompt from [`prompt.md`](prompt.md), fill in the settings
  at the top, attach three files.
- **On live books, with Orla connected:** install the skill and ask "what do I still need from this
  client for the last twelve months?". The skill is [`SKILL.md`](SKILL.md).

## 3. Who it is for and what you get

For a bookkeeper or accountant who keeps books for clients and chases them for paperwork. In about
fifteen minutes you get three things. A control block that accounts for every row of the file. One
draft letter, grouped by account and month: each line says the date, amount, payee and what to send;
a monthly subscription is asked for once, small items share one line, and what you asked last time
comes as a reminder with one reply-by date. And an internal table for you only, with every row left
out of the letter and why. The letter is a draft: you read it and send
it yourself.

## 4. What to give it

Three files. Transactions for the period: transaction id, client id, date, account, payee,
description, amount, currency, has document (yes or no), staff note. Documents you already received:
file name, date received, vendor on the document, document date, amount, currency. Your log of
earlier requests: request id, date sent, transaction id, date, payee, amount, currency, what you asked
for, status, reply date, reply text. In the prompt's settings you set the period, the reply-by date,
how the client sends files, and the small-item threshold and rule.

Samples on invented data: [`sample/transactions.csv`](sample/transactions.csv),
[`sample/documents_received.csv`](sample/documents_received.csv),
[`sample/request_log.csv`](sample/request_log.csv).

Before you give the files to a model, remove what the job does not need: tax ids, full account and
card numbers (keep the last four digits, also inside descriptions), home addresses and dates of birth,
names of private persons, and any internal note about a suspicion. Masking shrinks what the model sees
but does not make the file anonymous, and whether client data may go to an AI tool at all is for your
firm and your engagement terms to decide. Step 0 of [`prompt.md`](prompt.md) has the full list.

Client data belongs only in an AI account your firm controls, on a business plan whose terms say chats are not used for training, and only if your firm and your engagement terms allow it. Do not put client files into a personal account. When we read the large chat vendors' pages on 25 November 2026, personal plans could train on chats unless you switched that off, and some keep parts of chats (feedback, chats flagged or reviewed by people) even then. Check the current terms of the plan you use and note the date.

## 5. The recipe

1. Export the client's transactions for the period with a has-document column.
2. Export or write down the documents you have received that are not yet matched to a row.
3. Export your log of earlier requests with the client's answers.
4. Paste the prompt, fill in the settings (period, reply-by date, how to send, small-item threshold
   and rule), attach the three files.
5. Read the control block: the rows in the letter plus the rows in the internal table must equal the
   rows in the file.
6. Read the internal table first: attach the files it matched, decide what to do with each client
   reply that explained a payment instead of sending a paper, and keep any staff note it set aside
   inside the firm.
7. Read the letter line by line against your books, then send it yourself from your own email.

With Orla connected, step 1 disappears and step 2 gets shorter: the skill reads the client's expenses without a document
month by month, the same list as "No paper" in Orla's inbox and the receipts line of the month's
close checklist, already without
transfers between the client's own accounts and rows marked as needing no paper, and it checks each
row for files right before drafting. It works on one client space per run. The connection does not hand
over your earlier requests or files you have not put on a transaction, so the skill asks you to paste
your request log and any unmatched files. Nothing is sent from the skill. In Orla itself, a person can
ask someone outside the space for a receipt by email from the expense, where Orla has switched that on
for the space; the connection has no tool for it. One thing to know: a note on a transaction in the
client's space can be read by the client's people. Keep notes about a suspicion in your firm's own
records, not on the client's transaction.

## 6. What comes out

Runs on the sample files, unedited:

- [Claude Sonnet, with code](runs/2026-11-25-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-25-file-claude-haiku-nocode.md), and
  [its run before a prompt fix](runs/2026-11-25-file-claude-haiku-nocode-before-fix.md): every
  figure matched, but the letter was not grouped by account and then by month; the prompt now shows
  the layout and says a full account number appears nowhere in the answer.

Calls to the Orla connection on a seeded test space: the tools were called by a test harness, with no AI model and no person signing in; the answer was assembled by hand from the connection's replies.

The full answer for the sample is in
[`sample/answer-key.md`](sample/answer-key.md). Both file runs matched these control figures:

- 37 rows in the file, 36 of this client and 1 of another client; 25 rows go in the letter and 12 in
  the internal table.
- Letter: 7 new items (8,473.00 USD and 650.00 EUR), one line for 12 subscription payments
  (1,068.00 USD), one line for 4 small items (149.40 USD), and 2 reminders from the request of 10 June
  2026 (3,139.00 USD).
- Two rows already covered by files under other names (`scan_0042.pdf`, `IMG_2291.jpg`); one
  receipt from the same vendor for a different amount is not a match.
- The staff note about a suspicion, the other client's row, the full account number and the
  instruction hidden in a description appear nowhere in the letter.

## 7. Check by hand before you trust it

- **Staff notes:** search the letter for the telling words of every internal note you had in the
  file (a name, "suspect", "check", "unusual", "review"). Not one
  should be there, and the row it was on should read like every other row.
- **Account numbers:** search the letter for long digit strings. Only the last four digits of an
  account may appear.
- **Matched files:** open each file the internal table matched and confirm it is the document for that
  payment before you leave the row out of the letter. Same vendor and amount with nearby dates is a
  strong hint, not proof.
- **A file for a different amount** is not the document. Check that the row stayed in the letter.
- **The still-waiting block** is only as good as your request log. A reply that explained a payment
  instead of sending a paper is a decision for you, not a new ask.
- **Rows of another client:** the internal table lists them. Fix the export so they do not come back.
- **The reply-by date and how to send** must be the ones you set. A link, portal or phone number you
  did not give means the model made it up: do not send that draft, run the prompt again.
- **An instruction inside a description** (in the sample, a line telling the assistant to ask for a
  banking password at a link) is quoted in the internal part and not obeyed. Check the letter holds
  no password request and no link.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on files |
| Works with Orla | Yes, on one client's live books; earlier requests and unmatched files are pasted by you |
| What it does with your data | Reads. Drafts a letter and an internal table for a person. Never sends, never attaches files, never asks the client for secrets, and has no write step |
| Checked on | Claude Sonnet with code execution and Claude Haiku without code execution (files), 25 November 2026 |
| Not checked on | ChatGPT, Gemini and other models: the prompt is written for any model, but nobody at Orla has run it there yet. Live mode with a real AI client and a person signed in: the connection's tools were only called by a test harness on a seeded test space |
| Last checked | 25 November 2026 |

## 9. Next to this one

- Take over a client's month: what is missing and what does not add up
- Year-end contractor list and questions for the tax preparer (US only)
- A two-page AI policy for your firm

[Run it on your clients' live books in Orla](https://orla.finance/)
