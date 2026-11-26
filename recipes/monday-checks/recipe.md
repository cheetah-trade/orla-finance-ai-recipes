---
id: monday-checks
title: What needs my attention on Monday, in ten minutes
shelf: business
time_to_run: 10 minutes
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads the three files you attach, writes nothing
  live: reads balances, invoices, bills and transactions, prepares a list for you, writes nothing, and has no write step at all
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-25
    - Claude Haiku, without code execution, 2026-11-25
  live:
    - Orla personal MCP connection, tools called by a test harness on a seeded test space, no AI model, 2026-11-25
last_checked: 2026-11-25
next_check: 2027-02-25
video: none yet
related: [debtors, bills-due, month-close]
---

# What needs my attention on Monday, in ten minutes

## 1. The job

Once a week, look across balances, open invoices and bills, and last week's transactions, and get a
short list of what needs your attention, in order, each item tied to a figure.

## 2. Run it

- **On files, in any AI model:** copy the prompt from [`prompt.md`](prompt.md), set today's date,
  attach three small exports.
- **On live books, with Orla connected:** install the skill and ask "what needs my attention this
  week?". The skill is [`SKILL.md`](SKILL.md).

## 3. Who it is for and what you get

For the person who runs a company's finances: a finance manager, an operations lead, a founder. In
about ten minutes you get a control block (what was read and how many rows), cash per currency, what
is overdue and what falls due this week, at most three actions each tied to a figure, a list of other
things noticed, and a list of what the model could not see.

## 4. What to give it

Three exports. Account balances: account, currency, balance, date of the last bank sync, notes. Open
items: invoice or bill, number, party, issue and due date, amount, currency, amount paid, status,
whether it is approved, the date the vendor's bank details last changed, notes. Last week's
transactions: date, account, description, amount (negative is money out), currency, category, the
vendor's average monthly spend over the previous three months, notes.

Samples on invented data: [`sample/accounts.csv`](sample/accounts.csv),
[`sample/open-items.csv`](sample/open-items.csv),
[`sample/transactions.csv`](sample/transactions.csv).

Before you paste the exports into a model, remove what the job does not need: bank account numbers,
street addresses, tax ids, names of private persons.

## 5. The recipe

1. Export balances with the date each bank feed last synced.
2. Export open invoices and bills, and fill the bank-details-changed date for any vendor who wrote to
   you this week.
3. Export last week's transactions. Add the vendor's usual monthly spend if you have it.
4. Paste the prompt, set the date, attach the three files.
5. Read the control block first. If the row counts do not match your files, stop and ask why.
6. Read the three actions, then "Also noticed", then "What I could not see".
7. Do the first action yourself: for a supplier with new bank details, that means a phone call.

With Orla connected, steps 1 to 4 disappear: the skill reads balances, needs-attention items, bills
due, last week's transactions and the uncategorised count from your books, and for each account when
its feed last sent the balance and through which day it was checked against the books. Orla cannot
see two things, and the skill says so: whether a supplier changed bank details, and what a payee
usually costs. A normal-spend comparison is the model's own, with both
numbers shown.

## 6. What comes out

Runs on the sample files, unedited:

- [Claude Sonnet, with code](runs/2026-11-25-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-25-file-claude-haiku-nocode.md)

Calls to the Orla connection on a seeded test space: the tools were called by a test harness, with no AI model and no person signing in; the answer was assembled by hand from the connection's replies.

The figures a correct run must reach on the sample are in
[`sample/answer-key.md`](sample/answer-key.md). Both file runs matched these control figures:

- Cash: USD 123,750.00 on all accounts and 120,600.00 on fresh feeds only, because Card clearing
  (3,150.00) last synced 8 days ago.
- Overdue invoices: 6,650.00 USD and 7,200.00 EUR, never added together.
- Last week's spending with own-account transfers left out: 25,784.30 USD and 1,750.00 EUR.
- The first line of the answer is the bill from Meridian Hosting whose bank details changed on
  21 Nov.

## 7. Check by hand before you trust it

- **A supplier with new bank details:** the model cannot tell if they are genuine. Call the supplier
  on a number from your own records before any payment to them.
- **Bank feeds:** check that the feeds behind your balances are current. With Orla, the skill names
  every account whose feed is more than a day old or whose balance the books do not explain; open
  those in Orla before you rely on the figure.
- **Two bills that look the same:** the model names both and does not choose. Open both and decide
  which is real before paying either.
- **A new payee with a round amount:** the model asks who it is. It does not call it fraud, and
  neither should you before you ask.
- **"Above usual" spending:** a week is compared with a monthly average. Look at the two numbers
  beside each other before you react.
- **Uncategorised rows:** if three or more are piling up, budgets are understated. Check any
  category the model suggests before you apply it yourself.
- **A note that tells the model to approve or skip a check:** the run lists such rows under "Text in
  the files that tried to instruct me". Open those rows yourself.
- **Payroll and tax dates** are not in the files. Check them against your calendar.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on files |
| Works with Orla | Yes, on live books |
| What it does with your data | Reads. Prepares a list for a person. Never moves money and has no write step |
| Checked on | Claude Sonnet and Claude Haiku (file) |
| Not checked on | ChatGPT, Gemini and other models: the prompt is written for any model, but nobody at Orla has run it there yet. Live mode with a real AI client and a person signed in: the connection's tools were only called by a test harness on a seeded test space |
| Last checked | 25 November 2026 |

## 9. Next to this one

- Who owes us and who to remind
- Bills due this week and what can wait
- Close the month without missing a step

[Run it on your live books in Orla](https://orla.finance/)
