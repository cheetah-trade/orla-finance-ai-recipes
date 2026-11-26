---
id: bank-eyes-check
title: Find the document behind every unusual payment, before your bank asks
shelf: business
section: compliance
time_to_run: 15 minutes, plus the time to collect missing documents
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads the statement, documents list, profile and emails you attach, writes nothing
  live: reads accounts, transactions, invoices and attachments, writes nothing and sends nothing
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-25
    - Claude Haiku, without code execution, 2026-11-25
  live:
    - Orla personal MCP connection, tools called by a test harness on a seeded test space, no AI model, 2026-11-25
last_checked: 2026-11-25
next_check: 2027-02-25
video: none yet
related: [bank-request-reply, frozen-account-first-day, account-opening-pack]
---

# Find the document behind every unusual payment, before your bank asks

## 1. The job

Find the payments on your account that a bank may ask about, and know which document answers each
one before anyone asks. The goal is that every payment has its document, not that payments look
ordinary.

If your bank has already written to you, use the recipe for answering a bank's request; if it has
frozen the account, use the frozen-account recipe. If the account is frozen or the letter comes from
an authority, see a lawyer first.

## 2. Run it

- **On files, in any AI model:** copy the prompt from [`prompt.md`](prompt.md), set today's date,
  attach your statement, your list of invoices and bills, and what you told the bank about your
  business.
- **On live books, with Orla connected:** install the skill and ask "read our account the way the bank
  would". The skill is [`SKILL.md`](SKILL.md).

## 3. Who it is for and what you get

For the person who runs a company's finances, after an unusual month, before a big payment, or when
a bank review is likely. In about fifteen minutes you get: a control block that counts every row,
money in per month against what you told the bank, the payments a bank may ask about with the reason
in one sentence, the document that explains each one or "not found in the files", what to collect,
where your own notes are contradicted, and the places where several signs meet on the same money.

## 4. What to give it

- The bank statement for the period (CSV or PDF). Three months is a good default.
- A list of your invoices, credit notes, supplier bills, contracts and leases, with party, address,
  country, date, amount and terms. An export from your books is enough.
- What you told the bank when you opened the account: the business, expected money in and out, the
  countries you deal with.
- Emails about changed supplier bank details, and your own notes, if any.

A full sample on invented data: `sample/`.

Before you attach anything, remove what the job does not need. Cut account numbers to the last four
digits and the country. Replace the names of private individuals with labels. Leave out dates of
birth, home addresses and personal tax numbers. This shrinks what the model sees; it does not make
the files anonymous. Whether company data may go to an AI tool at all is your decision and your
company's rules.

## 5. The recipe

1. Export the statement for the period and your documents list.
2. Find what you told the bank at account opening. If you cannot, write down what you would tell it
   today and mark it as that.
3. Paste the prompt, set the date, attach the files. The signs in the prompt are this recipe's own
   starting points, not any bank's rules: a payment that matches none of them can still draw the bank's attention.
4. Read the control block: rows read and rows classified must be equal.
5. Start with the places where several signs meet. One sign on its own proves nothing.
6. For every sign, collect the document the answer names as "to obtain". Fix gaps by adding, not by
   changing: never rewrite or backdate a document.
7. Where money cannot be explained from your documents, talk to a lawyer before you explain it to the
   bank or accept more of it.

With Orla connected, steps 1 and most of 3 disappear: the skill reads the transactions, invoices and
attachments from your books. You still give it what you told the bank about your business.

## 6. What comes out

Runs on the sample, unedited:

- [Claude Sonnet, with code](runs/2026-11-25-file-claude-sonnet-code.md). One model error, kept as it
  came out: it writes "Mr Okafor" once, where the files give only "D OKAFOR"; a title with no source
  breaks the prompt's "No source, no statement".
- [Claude Haiku, without code](runs/2026-11-25-file-claude-haiku-nocode.md)

Calls to the Orla connection on a seeded test space: the tools were called by
a test harness, with no AI model and no person signing in; the answer was assembled by hand from the
connection's replies.

What a correct run must find on the sample: [`sample/answer-key.md`](sample/answer-key.md).

## 7. Check by hand before you trust it

- **Count the rows.** The control block must read and classify every row of the statement. A
  missing row is a missing answer.
- **Open every document the answer cites** and check the amount, the party and the date against the
  statement row. A matching invoice number with a different amount is not an explanation.
- **"Explained by the files" is not "nothing to worry about".** It means a document exists. The bank
  may still ask, and you send that document.
- **Money coming in needs documents too.** It is easy to check only payments out against receipts.
  Check every payment in against an invoice yourself.
- **Your notes are not evidence.** Where the answer says "your note says", a bank will want a
  document, and the answer shows where a row already contradicts the note.
- **A refund sent to a different account from the one that paid** is shown as a sign. Keep the
  payer's written request for it.
- **Changed bank details by email:** confirm them by phone, on a number you already had, before the
  next payment. See the counterparty check recipe.
- **The recipe will not help you make payments less visible.** If you are asked, or tempted, to split,
  time or relabel payments so a bank does not notice them, stop and talk to a lawyer.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on files |
| Works with Orla | Yes, on live books, with what you told the bank about your business, from you |
| What it does with your data | Reads. Prepares a list for a person. Sends nothing, changes nothing, never moves money |
| Checked on | Claude Sonnet and Claude Haiku (files) |
| Not checked on | ChatGPT, Gemini and other models: the prompt is written for any model, but nobody at Orla has run it there yet. Not checked on real statements. Live mode with a real AI client and a person signed in: the connection's tools were only called by a test harness on a seeded test space |
| Not legal advice | It shows what a bank may ask about and which document answers it. It does not say what the law requires or what the bank will do |
| Last checked | 25 November 2026 |

## 9. Next to this one

- Answer a bank's request for information about your account
- Your business account is frozen: what to do on the first day
- Check your documents for a new business account or a bank's periodic review

[Run it on your live books in Orla](https://orla.finance/)
