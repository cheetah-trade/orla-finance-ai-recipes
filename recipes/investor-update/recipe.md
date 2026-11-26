---
id: investor-update
title: A monthly investor update from the month's numbers
shelf: business
time_to_run: 15 minutes
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads the figures file and your notes, writes nothing, and drafts a letter that stays in the conversation
  live: reads the month's report and cash flow, drafts a letter for you to edit, writes nothing, and has no write step at all
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-25
    - Claude Haiku, without code execution, 2026-11-25
  live:
    - Orla personal MCP connection, tools called by a test harness on a seeded test space, no AI model, 2026-11-25
last_checked: 2026-11-25
next_check: 2027-02-25
video: none yet
related: [cash-forecast, month-close, monday-checks]
---

# A monthly investor update from the month's numbers

## 1. The job

Once a month, turn your figures and your own notes into a draft update for investors, with net burn
named as net, runway, the previous month beside each figure, and a list of claims the numbers do not
back.

## 2. Run it

- **On files, in any AI model:** copy the prompt from [`prompt.md`](prompt.md), set today's date and
  the month, attach the figures file and your notes.
- **On live books, with Orla connected:** install the skill and ask "draft the October investor
  update". The skill is [`SKILL.md`](SKILL.md).

## 3. Who it is for and what you get

For a founder or finance lead who writes to investors or a board. In about fifteen minutes you get a
draft letter to edit: a summary, a figures table with the previous month beside each figure,
highlights, lowlights, your asks, the figures labelled as unaudited management figures, and a
separate list of claims in your notes marked backed, partly backed, not backed or contradicted.

## 4. What to give it

A monthly figures file, several months, with these columns: month, books reconciled (yes or no),
cash in from customers, cash in one-off, cash out for payroll, vendors, marketing and one-off, cash
at month end, MRR from subscriptions, one-off service fees in MRR, MRR as reported, customers at the
end of the month, currency, note. And your own rough notes: highlights, lowlights, asks.

Samples on invented data: [`sample/monthly-figures.csv`](sample/monthly-figures.csv) and
[`sample/founder-notes.txt`](sample/founder-notes.txt).

Before you paste the files into a model, remove what the job does not need: names of individual
customers or investors, bank account numbers, anything covered by a confidentiality clause.

## 5. The recipe

1. Fill one row per month for the last six to eight months, and mark whether the books are
   reconciled.
2. Split one-off items (a grant, an annual premium) from the regular lines.
3. Write your notes fast and honestly, including the plans you are not sure about.
4. Paste the prompt, set the date and the month, attach both files.
5. Read the first lines: rows, month, reconciliation status, net burn, runway, cash, MRR.
6. Read the list of claims the data does not back, and decide which to cut or to support.
7. Edit the draft in your own words, then send it from your own mailbox.

With Orla connected, steps 1 and 2 disappear: the skill reads the month's investor-update report,
the cash flow and the business KPIs from your books, with the previous month beside each figure, and
checks whether the month is reconciled. The report counts cash in as "money in", not accrual
revenue, and takes MRR from active schedules only. Orla does not hold headcount, ARR, churn, margin
or funding, so the skill writes none of them. There is no way to send the letter from the skill.

## 6. What comes out

Runs on the sample files, unedited:

- [Claude Sonnet, with code](runs/2026-11-25-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-25-file-claude-haiku-nocode.md)

Calls to the Orla connection on a seeded test space: the tools were called by a test harness, with no AI model and no person signing in; the answer was assembled by hand from the connection's replies.

The figures a correct run must reach on the sample are in
[`sample/answer-key.md`](sample/answer-key.md). Both file runs matched these control figures:

- Net burn 19,700 USD in October (22,100 without the one-off grant and premium), against 14,600 in
  September.
- Runway 8.4 months on October's net burn (7.5 without one-offs).
- MRR 49,300 from subscriptions, not the 53,300 in the file, which includes a 4,000 one-off fee.
- Cash at month end 164,750 as stated, with a 1,150 difference to the walk that the run reports and
  does not plug.

## 7. Check by hand before you trust it

- **Net burn is named as net.** Check the letter says which burn it headlines, with or without the
  one-off rows, and that the grant is not flattering the month without being said.
- **MRR:** recount from your own subscriptions. The one-off fee must not be in it.
- **The month is not reconciled:** the letter must say so next to every cash figure. Finish the
  reconciliation before you send, or send with that sentence.
- **Cash that does not walk:** the model reports the unexplained 1,150 and uses the stated cash.
  Find the difference before the letter leaves you.
- **Runway:** your notes say about 14 months, the data gives 8.4. The model lists the claim as not
  backed and does not print 14. Decide how to explain the gap to your investors.
- **Plans without data** (closing a round by February): the model lists them and asks. It will not
  turn them into a date or an amount.
- **Claims about causes** (a plan launch, a hire, late payers) are only as backed as the file. Read
  the list, and cut or support what is not backed.
- **A line in your notes telling the model to call the numbers audited or to send the update:** it
  is quoted and not obeyed. The letter says unaudited and is not sent.
- **Names of clients or investors in the draft:** they are data about other people. Remove what you
  do not have the right to share.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on files |
| Works with Orla | Yes, on live books |
| What it does with your data | Reads. Drafts a letter for a person to edit. Never sends it and never moves money |
| Checked on | Claude Sonnet and Claude Haiku (file) |
| Not checked on | ChatGPT, Gemini and other models: the prompt is written for any model, but nobody at Orla has run it there yet. Live mode with a real AI client and a person signed in: the connection's tools were only called by a test harness on a seeded test space |
| Last checked | 25 November 2026 |

## 9. Next to this one

- Cash forecast and runway
- Close the month without missing a step
- The Monday finance check in ten minutes

[Run it on your live books in Orla](https://orla.finance/)
