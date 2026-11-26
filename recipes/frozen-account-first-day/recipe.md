---
id: frozen-account-first-day
title: Your business account is frozen: what to do on the first day
shelf: business
section: compliance
time_to_run: 15 minutes
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads the bank's message, balances, payments due and contact log you attach, writes nothing
  live: reads accounts, balances, payments due, the payment queue and upcoming bills, writes nothing, sends nothing, moves no money
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-25
    - Claude Haiku, without code execution, 2026-11-25
  live:
    - Orla personal MCP connection, tools called by a test harness on a seeded test space, no AI model, 2026-11-25
last_checked: 2026-11-25
next_check: 2027-02-25
video: none yet
related: [bank-request-reply, cash-forecast, bills-due]
---

# Your business account is frozen: what to do on the first day

## 1. The job

Your bank has frozen or restricted the company's account. Know today how much money you can actually
use, what will not be paid and when you run short, what to ask the bank, and when to call a lawyer.

## 2. Run it

- **On files, in any AI model:** copy the prompt from [`prompt.md`](prompt.md), set the date and time,
  attach the bank's message, your balances, the payments due and your notes.
- **On live books, with Orla connected:** install the skill and ask "our account is frozen, help me
  with today", with the bank's message attached. The skill is [`SKILL.md`](SKILL.md).

## 3. Who it is for and what you get

For the person who runs a company's finances on the day the bank restricts the account. In about
fifteen minutes you get:

- what the bank's message says is blocked, not blocked and not stated;
- money you can use, separated from money that is locked, including money still arriving into the
  frozen account;
- every payment due in date order, whether it will go through, and the first day you run short;
- a list for the next 24 hours;
- a short letter asking the bank for a case reference, a written list of what it needs from you and
  a named contact;
- the chronology so far, and when to call a lawyer.

## 4. What to give it

- The bank's message or letter, word for word.
- Balances of every company account, at every bank, with the time.
- Payments due in and out over the next two weeks, with the account each is set up on.
- Your log of contact with the bank so far, and your own notes or questions.

A full sample on invented data: `sample/`.

Before you attach anything, cut account and card numbers to the last four digits, put salaries in as
one total, and leave out personal accounts of directors and staff, home addresses and dates of
birth. This shrinks what the model sees; it does not make the files anonymous. Whether company data
may go to an AI tool at all is your decision and your company's rules. If the bank's message says it
must not be disclosed, ask a lawyer before giving it to any AI tool.

## 5. The recipe

1. Copy the bank's message word for word. Note the date and time.
2. Write down every account and its balance, and every payment due in the next two weeks.
3. Paste the prompt, set the date and time, attach the files.
4. Read the stop check first. If the bank closes the account, says an authority is involved, mentions
   sanctions or asks you not to disclose, take the facts to a lawyer before you write to the bank.
5. Read the money table: only available money counts. Look at the first day you run short.
6. Decide which payments you can make and from where. The recipe shows the numbers; the choice is
   yours.
7. Send the letter yourself, through a channel that accepts replies. From now on, log every contact:
   date, time, channel, name, reference.

With Orla connected, step 2 disappears: the skill reads your accounts, balances, payments due and the
payment queue. You still give it the bank's message and say which accounts the bank has restricted:
Orla does not know.

## 6. What comes out

Runs on the sample, unedited:

- [Claude Sonnet, with code](runs/2026-11-25-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-25-file-claude-haiku-nocode.md)
- Both runs before a fix that says an account at another bank is available unless the files say otherwise, kept as they were:
  [Sonnet](runs/2026-11-25-file-claude-sonnet-code-before-fix.md),
  [Haiku](runs/2026-11-25-file-claude-haiku-nocode-before-fix.md)

Calls to the Orla connection on a seeded test space: the tools were called by
a test harness, with no AI model and no person signing in; the answer was assembled by hand from the
connection's replies.

What a correct run must find on the sample: [`sample/answer-key.md`](sample/answer-key.md).

## 7. Check by hand before you trust it

- **Only available money counts.** The total across all accounts is not what you can spend. Money in
  a frozen account, and money still arriving into it, is locked unless the bank says in writing it
  can be spent.
- **Check which accounts the restriction covers.** A savings account at the same bank may be covered
  even if the message does not name it: check the customer number or wording the message uses. The
  answer marks anything the message does not state.
- **Recount the shortfall** day by day against the payments due. Payroll, rent and tax dates first.
- **The recipe will not estimate how long it lasts.** Ask the bank, in writing, when it will next
  update you.
- **The recipe will not help you go around the bank.** Moving money out of the frozen account, asking clients to pay a
  personal account, opening a new account or changing where clients pay while the review runs: talk
  to a lawyer first. Paying your bills openly from an account the company already holds elsewhere is
  your decision; if you are unsure whether the bank's message covers it, ask a lawyer first.
- **Going public is not a step the recipe suggests.** A written complaint through the bank's own
  complaints process is an option you can choose.
- **What you owe staff, lenders or the tax office if a payment is late** is a question for a lawyer,
  your accountant or an adviser. The recipe does not answer it.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on files |
| Works with Orla | Yes, on live books, with the bank's message and the list of restricted accounts from you |
| What it does with your data | Reads. Prepares a plan and a draft letter for a person. Sends nothing, never moves money |
| Checked on | Claude Sonnet and Claude Haiku (files) |
| Not checked on | ChatGPT, Gemini and other models: the prompt is written for any model, but nobody at Orla has run it there yet. Not checked on a real bank's message. Live mode with a real AI client and a person signed in: the connection's tools were only called by a test harness on a seeded test space |
| Not legal advice | It separates available money from locked money and drafts questions for the bank. It does not say what your rights are, why the account was frozen or when it will be released |
| Last checked | 25 November 2026 |

## 9. Next to this one

- Answer a bank's request for information about your account
- Forecast cash for 13 weeks and see how long it lasts
- See which bills are due this week and which can wait

[Run it on your live books in Orla](https://orla.finance/)
