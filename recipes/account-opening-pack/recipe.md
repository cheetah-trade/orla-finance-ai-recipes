---
id: account-opening-pack
title: Check your documents for a new business account or a bank's periodic review
shelf: business
section: compliance
time_to_run: 20 minutes, plus the time to collect new documents
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads the bank's list, your application draft, the register extract, share registers and a list of document fields you attach, writes nothing
  live: the same files, plus the state of an account opened through Orla and your monthly money in and out; writes nothing and sends nothing
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-25
    - Claude Haiku, without code execution, 2026-11-25
  live:
    - Orla personal MCP connection, tools called by a test harness on a seeded test space, no AI model, 2026-11-25
last_checked: 2026-11-25
next_check: 2027-02-25
video: none yet
related: [bank-request-reply, counterparty-precheck, bank-eyes-check]
---

# Check your documents for a new business account or a bank's periodic review

## 1. The job

Check your company's documents against your bank's own list before you submit: what is missing, out
of date or inconsistent, who the owners are once you look through every holding company, and a
description of the business that your documents actually support.

## 2. Run it

- **On files, in any AI model:** copy the prompt from [`prompt.md`](prompt.md), set today's date,
  attach the bank's list, your application draft, the register extract, the share registers and a
  list of your documents' fields.
- **With Orla connected:** install the skill and ask "check our pack for the bank". The skill is
  [`SKILL.md`](SKILL.md). It works on the same files and adds what Orla holds.

## 3. Who it is for and what you get

For the person who prepares a company's bank account application or answers the bank's periodic
review of the company. In about twenty minutes you get:

- the bank's list item by item, with your file for each;
- every date checked against the bank's own time limits;
- names and addresses that differ, side by side;
- directors in the register against the application;
- the real owners, traced through every holding company to people, with the sums shown;
- a business description built only from your documents, with each claim in your draft marked
  supported or not found;
- the gap between your expected turnover and what your contracts show;
- a to-do list, most blocking first.

## 4. What to give it

- The bank's own list of requirements, copied from its page or letter. It is the only authority on
  what this bank wants.
- Your application answers so far.
- The company register extract and the share registers of the company and of every company that
  holds its shares.
- One line per document: what it is, whose, the name and address as written, issue and expiry dates
  (see `sample/documents-index.csv`). Not the documents themselves.
- Contracts or invoices that show what the business does, and the website as it is today.

A full sample on invented data: `sample/`.

Never attach passports, ID cards or their photos: the model compares fields, so write the fields
down. For people's home addresses write "home address present". Leave out document numbers, dates of
birth, nationality and personal tax numbers. This shrinks what the model sees; it does not make the
files anonymous. Whether company data may go to an AI tool at all is your decision and your
company's rules.

## 5. The recipe

1. Copy the bank's list of requirements word for word. Do not work from a general checklist: each
   bank sets its own.
2. Write the documents list: one line per document, fields as written on it.
3. Paste the prompt, set the date, attach everything.
4. Read the bank's list table. Request new documents first: they take longest.
5. Read the owners table. Check the multiplication yourself; ask the bank how it counts holdings
   through other companies and control.
6. Replace the business description in your draft with one your documents support, in your words.
   Give the turnover you actually expect and how you estimated it.
7. Where the answer says a lawyer should advise before you submit, do that first.
8. Submit through the bank's own channel. Redo the date checks if you submit later.

With Orla connected, nothing in steps 1 to 3 disappears: Orla does not hold your register extract,
share registers or identity documents. The skill adds the state of an account you open through Orla
and, for a periodic review, your money in and out by month from your books.

## 6. What comes out

Runs on the sample, unedited:

- [Claude Sonnet, with code](runs/2026-11-25-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-25-file-claude-haiku-nocode.md)
- Both runs before a fix that makes a lawyer the first item of the to-do list after a refusal, kept as they were:
  [Sonnet](runs/2026-11-25-file-claude-sonnet-code-before-fix.md),
  [Haiku](runs/2026-11-25-file-claude-haiku-nocode-before-fix.md)

Calls to the Orla connection on a seeded test space: the tools were called by
a test harness, with no AI model and no person signing in; the answer was assembled by hand from the
connection's replies.

What a correct run must find on the sample: [`sample/answer-key.md`](sample/answer-key.md).

## 7. Check by hand before you trust it

- **Recount the owners.** Multiply the shares along every path and add the paths for the same
  person. A person at 24% through one company and 5% directly is at 29%. How the bank counts control
  is for the bank to say.
- **Unknown owners stay unknown.** If a fund or a trust holds shares and you do not have its owners,
  the answer says "not found". Ask the holder; do not guess.
- **Dates move.** A document that is in date today may be out of date on the day you submit. Redo
  the counts from the submission date.
- **Names and addresses exactly as written.** "Ltd" and "Limited", "Suite 4" and no suite: the answer
  shows them side by side. Use the register's form, and be ready to explain any difference.
- **The description is only what your documents show.** Plans and ambitions are not facts. A website
  that says "coming soon" is a fact the bank can see.
- **The recipe does not tell you how to get accepted.** It never suggests changing who is shown as a
  director or owner, how the business is described, or when to apply so that the bank sees something
  else. If someone asks you to present the company differently from its documents, talk to a lawyer
  before you submit anything.
- **Nothing here predicts the bank's decision.** Opening an account is the bank's call.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on files |
| Works with Orla | Yes, on the same files; adds the state of an account opened through Orla and your monthly turnover |
| What it does with your data | Reads. Prepares a checklist and a description for a person. Sends nothing, submits nothing |
| Checked on | Claude Sonnet and Claude Haiku (files) |
| Not checked on | ChatGPT, Gemini and other models: the prompt is written for any model, but nobody at Orla has run it there yet. Not checked on real company documents or a real bank's list. Live mode with a real AI client and a person signed in: the connection's tools were only called by a test harness on a seeded test space |
| Not legal advice | It checks your pack against the bank's own list. It does not say what the law or a register requires, and does not predict the bank's decision |
| Last checked | 25 November 2026 |

## 9. Next to this one

- Find the document behind every unusual payment, before your bank asks
- Answer a bank's request for information about your account
- Check a new client or supplier before the first payment

[Run it on your live books in Orla](https://orla.finance/)
