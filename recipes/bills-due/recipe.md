---
id: bills-due
title: Bills due this week and what can wait
shelf: business
time_to_run: 10 minutes
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads the bills file and the cash line you attach, writes nothing
  live: reads open bills, balances and payments waiting for a signature, prepares a proposal for you, writes nothing, and has no write step at all
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-25
    - Claude Haiku, without code execution, 2026-11-25
  live:
    - Orla personal MCP connection, tools called by a test harness on a seeded test space, no AI model, 2026-11-25
last_checked: 2026-11-25
next_check: 2027-02-25
video: none yet
related: [monday-checks, cash-forecast, debtors]
---

# Bills due this week and what can wait

## 1. The job

Every week, decide which supplier bills to pay now against the cash you have and the minimum balance
you want to keep, which can wait, and which need a human look first.

## 2. Run it

- **On a file, in any AI model:** copy the prompt from [`prompt.md`](prompt.md), set today's date,
  attach your open bills export and a cash line.
- **On live books, with Orla connected:** install the skill and ask "which bills should we pay this
  week, and which can wait?". The skill is [`SKILL.md`](SKILL.md).

## 3. Who it is for and what you get

For the person who prepares the weekly payment run: an accounts payable clerk, a finance manager, a
founder. In about ten minutes you get a control block, a hold list (changed bank details, probable
duplicates), a proposed pay-now list with the running cash above your minimum, a can-wait list with
what waiting costs according to the data, and open questions. Everything is a proposal: you pay.

## 4. What to give it

A CSV or spreadsheet export of open bills: bill number, vendor, category, bill date, payment terms,
due date, amount, currency, amount paid, status, critical (yes or no), early-pay discount, late fee
as stated on the bill, the date the vendor's bank details last changed, notes. Plus a second small
file, or two typed lines: cash on hand, the minimum to keep, the date, per currency.

Samples on invented data: [`sample/bills.csv`](sample/bills.csv) and
[`sample/cash.csv`](sample/cash.csv).

Before you paste the export into a model, remove what the job does not need: vendor bank account
numbers, street addresses, tax ids.

## 5. The recipe

1. Export open and partly paid bills from your accounting system.
2. Mark which bills are critical, and fill late fees and discounts only where the bill states them.
3. Write cash on hand and the minimum balance per currency.
4. Paste the prompt, set the date, attach both files.
5. Read the control block, then the hold list. Resolve the holds before anything else.
6. Read the pay-now list against the running cash above the minimum, then the can-wait list.
7. Answer the model's questions (a discount that does not fit, a hold you have cleared).
8. Make the payments yourself in your bank or your payment tool.

With Orla connected, steps 1 and 4 disappear: the skill reads open bills, balances and Orla's own
weekly payment view from your books, and shows payments already waiting for a signature. Orla still
cannot see a changed bank detail, a late fee, an early-pay discount, a critical supplier flag or a
minimum balance, so steps 2 and 3 stay yours. Its payment-week view counts no money that has not
arrived and no tax deadline, and a connection narrowed to some accounts cannot run the bills report.

## 6. What comes out

Runs on the sample files, unedited:

- [Claude Sonnet, with code](runs/2026-11-25-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-25-file-claude-haiku-nocode.md)

Calls to the Orla connection on a seeded test space: the tools were called by a test harness, with no AI model and no person signing in; the answer was assembled by hand from the connection's replies.

The figures a correct run must reach on the sample are in
[`sample/answer-key.md`](sample/answer-key.md). Both file runs matched these control figures:

- 18 rows: 2 left out (paid, void) and 16 open.
- Cash above the minimum: USD 21,000.00 (31,000.00 minus 10,000.00) and EUR 3,000.00.
- Pay-now list in USD: 20,950.00, payroll, tax and rent, leaving 50.00 above the minimum.
- 24,275.00 USD enters the cash test, after holding 1,150.00 (changed bank details) and counting the
  duplicate 640.00 only once.

## 7. Check by hand before you trust it

- **A bill with changed bank details:** the model puts it on hold and never says the details are
  genuine or fake. Call the supplier on a number from your own records.
- **Two rows that look like one bill:** the model counts the pair once and asks which is real. Open
  both before you pay either.
- **Due dates worked out from terms:** "net 10" or "due on receipt" is marked as worked out. Check the
  bill date and terms on those rows yourself.
- **Late fees and discounts:** only figures written in your data are used. If a cell is empty, the
  answer is "no data", not zero. Check the bills that matter against the paper.
- **The cash test is against your minimum, not against zero.** If the plan would take you under it,
  that is a question for you, and the model must not quietly pay everything.
- **Partly paid bills:** the amount owed is the bill minus what was paid. Recount one.
- **Tax and payroll dates outside the file** are missing from the list. Add them from your calendar.
- **A note that tells the model to ignore the minimum or approve bills:** it is listed as text that
  tried to instruct it. Open that bill yourself.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on a file |
| Works with Orla | Yes, on live books |
| What it does with your data | Reads. Prepares a proposal for a person. Never moves money and has no write step |
| Checked on | Claude Sonnet and Claude Haiku (file) |
| Not checked on | ChatGPT, Gemini and other models: the prompt is written for any model, but nobody at Orla has run it there yet. Live mode with a real AI client and a person signed in: the connection's tools were only called by a test harness on a seeded test space |
| Last checked | 25 November 2026 |

## 9. Next to this one

- The Monday finance check in ten minutes
- Cash forecast and runway
- Who owes us and who to remind

[Run it on your live books in Orla](https://orla.finance/)
