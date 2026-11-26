---
id: debtors
title: Who owes us and who to remind
shelf: business
time_to_run: 10 minutes
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads the file you attach, writes nothing
  live: reads invoices, prepares reminder previews, sends one only on your yes for that invoice
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-25
    - Claude Haiku, without code execution, 2026-11-25
  live:
    - Orla personal MCP connection, tools called by a test harness on a seeded test space, no AI model, 2026-11-25
last_checked: 2026-11-25
next_check: 2027-02-25
video: none yet
related: [bills-due, cash-forecast, monday-checks]
---

# Who owes us and who to remind

## 1. The job

Every week, find out which clients are late with payment, decide the next step with each of them,
and have the reminder emails drafted.

## 2. Run it

- **On a file, in any AI model:** copy the prompt from [`prompt.md`](prompt.md), set today's date,
  attach your receivables export.
- **On live books, with Orla connected:** install the skill and ask "who owes us and who should we
  remind?". The skill is [`SKILL.md`](SKILL.md).

## 3. Who it is for and what you get

For the person who runs a company's finances: a finance manager, an operations lead, a founder.
In about ten minutes you get a list of overdue invoices by client, the next step for each one, an
aging summary per currency, and reminder drafts ready to edit and send.

## 4. What to give it

A CSV or spreadsheet export of invoices from your accounting system with these columns: invoice
number, client, contact email, issue date, due date, amount, currency, amount paid, status, date of
the last reminder, notes. The notes column matters: write disputes and promised payment dates there.

Sample input on invented data: [`sample/receivables.csv`](sample/receivables.csv).

Before you paste a client export into a model, remove what the job does not need: bank account
numbers, street addresses, tax ids.

## 5. The recipe

1. Export open and recently paid invoices from your accounting system.
2. Fill the notes column for anything the system does not know: a dispute, a promise made on a call.
3. Paste the prompt, set the date, attach the file.
4. Read the control block first. If the rows do not add up to your file, stop and ask the model why.
5. Go through "overdue by client" from the top: it is ordered by what to do first.
6. Answer the model's questions (same client under two names? apply the credit note?).
7. Edit the drafts, add your payment link, send them from your own mailbox.

With Orla connected, steps 1 to 3 disappear: the skill reads the invoices from your books, and step 7
becomes a preview you approve invoice by invoice.

## 6. What comes out

Runs on the sample file, unedited:

- [Claude Sonnet, with code](runs/2026-11-25-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-25-file-claude-haiku-nocode.md)

Calls to the Orla connection on a seeded test space: the tools were called by a test harness, with no AI model and no person signing in; the answer was assembled by hand from the connection's replies.

The figures a correct run must reach on the sample are in
[`sample/answer-key.md`](sample/answer-key.md).

## 7. Check by hand before you trust it

- **Recount two or three rows.** Days late and still owed, with a calendar and a calculator. A model
  without code can slip on day counts.
- **Match the overdue total per currency with your accounting system.** If they differ, find the row.
- **Look for money that arrived but is not matched yet.** A client who paid yesterday must not get a
  reminder today.
- **Check disputes and payment plans** agreed by phone or in a chat. If they are not in the notes
  column, the model does not know about them.
- **Check every invoice number and email in the drafts** against the file. Nothing in a draft should
  be new to you.
- **Late fees and interest:** the recipe never states them. If you charge them, take the rate from
  your contract and add it yourself.
- **If the client is a consumer or a sole trader**, different rules on collecting debts can apply in
  your country. Write to them yourself.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on a file |
| Works with Orla | Yes, on live books |
| What it does with your data | Reads. Prepares drafts for a person. Never moves money |
| Checked on | Claude Sonnet and Claude Haiku (file) |
| Not checked on | ChatGPT, Gemini and other models: the prompt is written for any model, but nobody at Orla has run it there yet. Live mode with a real AI client and a person signed in: the connection's tools were only called by a test harness on a seeded test space |
| Last checked | 25 November 2026 |

## 9. Next to this one

- Bills due this week and what can wait
- Cash forecast and runway
- The Monday finance check in ten minutes

[Run it on your live books in Orla](https://orla.finance/)
