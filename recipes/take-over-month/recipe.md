---
id: take-over-month
title: "Take over a client's month: what is missing and what does not add up"
shelf: accountant
time_to_run: 20 minutes
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads the two files you attach, writes nothing, drafts questions for you to send
  live: reads one client's month, accounts, transactions and reconciliation answers, drafts questions for you to send, writes nothing and has no write step at all
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-25
    - Claude Haiku, without code execution, 2026-11-25
  live:
    - Orla personal MCP connection, tools called by a test harness on a seeded test space, no AI model, 2026-11-25
last_checked: 2026-11-25
next_check: 2027-02-25
video: none yet
related: [statement-exceptions, missing-docs-letter, year-end-contractors]
---

# Take over a client's month: what is missing and what does not add up

## 1. The job

When you take over a client's month that someone else kept, find out what you can accept as it is,
what is broken and why, and what to ask the client.

## 2. Run it

- **On files, in any AI model:** copy the prompt from [`prompt.md`](prompt.md), set today's date and
  the month, take out what step 0 lists, then attach two exports.
- **On live books, with Orla connected:** install the skill and ask "take over October for this
  client". The skill is [`SKILL.md`](SKILL.md).

## 3. Who it is for and what you get

For an outside accountant or bookkeeper picking up a client whose books the client or an earlier
bookkeeper kept. In about twenty minutes you get a control block, an acceptance light for each check
(GREEN, AMBER, RED or COULD NOT CHECK). Every RED says what kind of defect it is and which rows are
behind it, never just "12 items to review". You also get a short list of questions for the client in
plain words, and a list of what the files do not show. It does not draft accruals and does not close
the month.

This is not Reconcile a client's bank statement to their books. That
recipe goes line by line through one account's statement. This one looks at the whole month on every
account and tells you what you can accept.

## 4. What to give it

Two exports from the client's books for the month. Transactions on every account: id, date,
account, payee, description, amount, currency, category, reconciled (yes or no), last modified date
if your system exports one, note. Balances, one row per account: account type, currency, how the
balance is signed (whether a positive balance means money held or money owed), last month's closing balance as closed and the date it was closed, the book's
opening and closing balance this month, and the statement's closing balance.

Samples on invented data: [`sample/transactions.csv`](sample/transactions.csv) and
[`sample/balances.csv`](sample/balances.csv). An export from QuickBooks, Xero or another system will
do once you rename its columns to match the sample.

Before you paste the exports into a model, remove what the job does not need: SSNs, TINs and EINs,
full account and card numbers (keep the last four digits), home addresses and dates of birth, names
of private persons the questions do not need. Whether this client's data may go to an AI tool at all
is for your firm and your engagement with the client to decide. Step 0 of the prompt has the list.

Client data belongs only in an AI account your firm controls, on a business plan whose terms say chats are not used for training, and only if your firm and your engagement terms allow it. Do not put client files into a personal account. When we read the large chat vendors' pages on 25 November 2026, personal plans could train on chats unless you switched that off, and some keep parts of chats (feedback, chats flagged or reviewed by people) even then. Check the current terms of the plan you use and note the date.

## 5. The recipe

1. Export the month's transactions on every account of the client, with the reconciled flag, the
   category and, if you can, the last modified date.
2. Write or export one row per account: last month's close, this month's opening and closing in the
   book, the statement's closing balance.
3. Remove what step 0 of the prompt lists.
4. Paste the prompt, set today's date and the month, attach the two files.
5. Read the control block at the top (the row counts and totals): every row of the file must be accounted for.
6. Read the acceptance light, red first. Each red names the defect and the rows.
7. Edit the client questions and send them yourself.
8. Fix what is yours to fix in the books, then do the close as a separate step.

With Orla connected, steps 1 to 4 disappear: the skill reads the client's month status, whether last
month changed after it was handed over in Orla (the month's package downloaded for the accountant)
and which rows moved, each account against its bank feed, the uncategorised rows and the month
against the one before. If last month was never handed over in Orla, the skill says so and that
check cannot be made. Comparing accounts with the bank feed needs Month close and reconciliation on
the client's plan (Pro and above); on a lower plan the skill says so and marks that check COULD NOT
CHECK. It reviews one client per run and asks
which one when you reach several. It cannot see a reconciled flag per row, a statement balance for
an account with no feed and no statement in Orla, or last month's closing balance as a number, and
it says so. It sends nothing to the client and changes nothing.

## 6. What comes out

Runs on the sample files, unedited:

- [Claude Sonnet, with code](runs/2026-11-25-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-25-file-claude-haiku-nocode.md), and
  [its run before a prompt fix](runs/2026-11-25-file-claude-haiku-nocode-before-fix.md): it marked
  the parking categories AMBER instead of RED and asked the client whether past entries were
  changed, which is the accountant's to read; the prompt now makes parking categories RED and limits
  what the client is asked.

Calls to the Orla connection on a seeded test space: the tools were called by a test harness, with no AI model and no person signing in; the answer was assembled by hand from the connection's replies.

The figures a correct run must reach on the sample are in
[`sample/answer-key.md`](sample/answer-key.md). Both file runs matched these control figures:

- 25 transaction rows, 22 dated in October, 3 left out as boundary rows; 3 October rows not
  reconciled.
- Checking: opening 250.00 below September's close, with one September row changed after the close
  named as the candidate; book 17,990.00 above the statement, equal to a second opening balance of
  18,240.00 less that 250.00, nothing unexplained.
- Own transfer of 5,000.00 booked as income on one account and an expense on the other; a processor
  payout booked net, fees 147.60.
- Card with no statement, in credit by 640.00; three rows in parking categories, 2,500.00 in and
  1,297.43 out.

## 7. Check by hand before you trust it

- **The opening gap and its candidate:** the model names the row changed after last month's close,
  not the cause. Open the row's history in the client's system to see who changed it and what it was
  before; that is yours to read, not a question for the client.
- **The book against statement reading:** the files hold the statement's closing balance, not its
  rows. Confirm the explanation against the statement itself before you remove an opening balance
  entry.
- **Repeat or duplicate payments:** two equal payments on one day may be two jobs. Wait for the
  client's answer; the recipe removes nothing.
- **Possibly personal spending:** the model flags it from the payee, day and note. Only the client
  can say what it was.
- **The client questions:** read every one before sending. No suspicions, no defect names, no full
  numbers, nothing about other clients.
- **Things the files do not hold:** receipts, invoices, payroll detail, sales tax, loans and owner
  draws, earlier months. They are listed as not in the files, never as fine.
- **A description that tells the model to mark everything reconciled and call the month clean:** the
  run quotes it and does not obey, and it stays out of the client questions. Open that row yourself.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on files |
| Works with Orla | Yes, on live books, one client per run |
| What it does with your data | Reads. Drafts questions for you to send. Never changes, deletes, closes or sends anything and has no write step |
| Checked on | Claude Sonnet with code execution and Claude Haiku without code execution (files), 25 November 2026 |
| Not checked on | ChatGPT, Gemini and other models: the prompt is written for any model, but nobody at Orla has run it there yet. Live mode with a real AI client and a person signed in: the connection's tools were only called by a test harness on a seeded test space |
| Last checked | 25 November 2026 |

## 9. Next to this one

- Reconcile a client's statement against their books and sort the exceptions
- One letter to the client about everything that is missing
- Year-end contractor list and questions for the tax preparer (US only)

[Run it on your client's live books in Orla](https://orla.finance/)
