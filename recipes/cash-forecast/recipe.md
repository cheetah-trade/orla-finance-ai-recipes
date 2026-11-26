---
id: cash-forecast
title: How long our cash lasts and where it runs low
shelf: business
time_to_run: 15 minutes
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads the one file you attach, writes nothing
  live: reads balances, invoices, bills and scheduled items, builds a forecast for you to read, writes nothing, and has no write step at all
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-25
    - Claude Haiku, without code execution, 2026-11-25
  live:
    - Orla personal MCP connection, tools called by a test harness on a seeded test space, no AI model, 2026-11-25
last_checked: 2026-11-25
next_check: 2027-02-25
video: none yet
related: [bills-due, debtors, investor-update]
---

# How long our cash lasts and where it runs low

## 1. The job

Build a 13-week view of your cash, week by week, find the week it runs low against a minimum you
set, and work out how many months the cash lasts at the current net burn.

## 2. Run it

- **On a file, in any AI model:** copy the prompt from [`prompt.md`](prompt.md), set today's date,
  attach one file with cash, invoices, bills and recurring items.
- **On live books, with Orla connected:** install the skill and ask "how long does our cash last?".
  The skill is [`SKILL.md`](SKILL.md).

## 3. Who it is for and what you get

For the person who plans cash: a finance manager, a founder, an operations lead. In about fifteen
minutes you get a control block, a weekly cash table, a base case and a downside case, the lowest
week against your minimum, net burn and gross burn named as different things, runway, what is known
and what is assumed, and what is not in the numbers.

## 4. What to give it

One file with a kind column: opening cash per account, settings (the minimum balance, an exchange
rate if you have two currencies), invoices with each client's usual days to pay, bills, recurring
items (payroll, rent, software, subscription payouts), one-off items, and pipeline items you have not
signed. Columns: kind, name, currency, amount, date, repeat, usual days after due, status, notes.

Sample on invented data: [`sample/forecast-inputs.csv`](sample/forecast-inputs.csv).

Before you paste the file into a model, remove what the job does not need: bank account numbers,
street addresses, names of private persons.

## 5. The recipe

1. List opening cash per account and currency.
2. Add open invoices with the number of days each client usually pays after the due date.
3. Add open bills, recurring costs and any dated one-off.
4. Put unsigned deals and funding in as pipeline, status unsigned. They stay out of the numbers.
5. Set your minimum balance and, for two currencies, one exchange rate.
6. Paste the prompt, set the date, attach the file.
7. Read the control block, the weekly table and the lowest week. Check that closing cash equals
   opening plus all weekly nets.
8. Read "Not in the numbers" and answer the questions.

With Orla connected, steps 1 to 3 and 6 disappear: the skill reads Orla's own weekly walk in two
versions (clients pay as they usually do, clients pay on the due date), the range between the two
run-out dates, and the net burn and runway from the books. Orla cannot take a scenario from you (a
client pays late, a deal is left out, a minimum balance), so the downside case and the minimum test
are the model's own arithmetic on the weekly points, labelled as its own. Unsigned deals are not in
the books at all.

## 6. What comes out

Runs on the sample file, unedited:

- [Claude Sonnet, with code](runs/2026-11-25-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-25-file-claude-haiku-nocode.md)

Calls to the Orla connection on a seeded test space: the tools were called by a test harness, with no AI model and no person signing in; the answer was assembled by hand from the connection's replies.

The figures a correct run must reach on the sample are in
[`sample/answer-key.md`](sample/answer-key.md). Both file runs matched these control figures:

- Week 13 closing cash in the base case: 18,850.00 USD (and 8,200.00 EUR), which is 11,150.00 under
  the 30,000.00 minimum. In the downside case: 13,450.00 USD.
- Net burn 24,691.33 USD a month and gross burn 44,791.33 USD a month, one-off items left out of both.
- Runway: 4.9 months in the base case, 4.6 in the downside case.

## 7. Check by hand before you trust it

- **An invoice is not cash on its due date.** Check that the model moved each invoice by the client's
  usual days. Recount two invoices with a calendar.
- **Net burn and gross burn are different numbers.** If the answer says "burn" with no label, ask
  which one. Runway on gross burn gives a much shorter, wrong figure.
- **A client already past its own pattern:** the model leaves the invoice out of the numbers and
  raises it as a question. Decide whether you still expect that money.
- **Unsigned deals and funding:** they must appear only under "Not in the numbers". If a signed
  date or amount is missing from your file, the model cannot know it.
- **Recurring costs count every time they occur.** Payroll twice a month is not "monthly". Count the
  payroll dates in the table yourself.
- **One-off items** (tax, insurance, equipment) sit in the weekly table but not in the burn. The
  runway excludes them, so add them mentally to the low week.
- **Two currencies:** the combined line uses only the rate you gave. With no rate, the model must
  not combine.
- **Never read "you will run out on" as a fact.** The answer is a range with assumptions. A note in
  the file telling the model to count unsigned money as received is listed, not followed.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on a file |
| Works with Orla | Yes, on live books |
| What it does with your data | Reads. Builds a forecast for a person to read. Never moves money and has no write step |
| Checked on | Claude Sonnet and Claude Haiku (file) |
| Not checked on | ChatGPT, Gemini and other models: the prompt is written for any model, but nobody at Orla has run it there yet. Live mode with a real AI client and a person signed in: the connection's tools were only called by a test harness on a seeded test space |
| Last checked | 25 November 2026 |

## 9. Next to this one

- Bills due this week and what can wait
- Who owes us and who to remind
- A monthly investor update from the month's numbers

[Run it on your live books in Orla](https://orla.finance/)
