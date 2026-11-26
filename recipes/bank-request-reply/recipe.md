---
id: bank-request-reply
title: Answer a bank's request for information about your account
shelf: business
section: compliance
time_to_run: 20 minutes, plus the time to collect missing documents
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads the bank letter, statement and documents you attach, writes nothing
  live: reads transactions, invoices, contracts and attached documents, prepares a draft reply for you, writes nothing and sends nothing
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-25
    - Claude Haiku, without code execution, 2026-11-25
  live:
    - Orla personal MCP connection, tools called by a test harness on a seeded test space, no AI model, 2026-11-25
last_checked: 2026-11-25
next_check: 2027-02-25
video: none yet
related: [bank-eyes-check, frozen-account-first-day, counterparty-precheck]
---

# Answer a bank's request for information about your account

## 1. The job

Your bank or payment provider has asked about payments on your account. Answer every question,
with documents, before the deadline, and explain honestly anything that does not match.

## 2. Run it

- **On files, in any AI model:** copy the prompt from [`prompt.md`](prompt.md), set today's date,
  attach the bank's letter, your statement and your documents.
- **On live books, with Orla connected:** install the skill and ask "help me answer this request from
  my bank", with the letter attached. The skill is [`SKILL.md`](SKILL.md).

## 3. Who it is for and what you get

For the person who runs a company's finances and has just received a request for information, a
source of funds question or a request for invoices and contracts. In about twenty minutes you get:
the bank's questions as a list with the deadline, the transaction behind each one, a chain of
evidence (contract, approval, invoice, payment) with a source for every line, what does not match,
what is missing, a list of attachments, and a draft reply built only from your documents.

## 4. What to give it

- The bank's letter or message, as text or PDF.
- The bank statement for the period the bank asks about (CSV or PDF).
- Your documents for each payment: contracts, invoices, approvals or delivery notes, loan agreements,
  a company register extract.
- Your own notes, if any. The recipe treats them as your statements, not as proof.

A full sample on invented data: `sample/`.

Before you attach anything, remove what the job does not need. Do not attach passports or ID cards.
Cut account numbers to the last four digits. Leave out dates of birth, home addresses and personal
tax numbers of directors and owners. This shrinks what the model sees; it does not make the files anonymous. Whether company documents
may go to an AI tool at all is your decision and your company's rules.

## 5. The recipe

1. Note the deadline. If you need more time, ask the bank for it in writing today.
2. Export the statement for the period and collect the documents for each payment the bank names.
3. Paste the prompt, set the date, attach the letter, the statement, the documents and your notes.
4. Read the first block. Each question of the bank must point to one row of your statement. If one
   does not, stop and find out why.
5. Go through each question's checks. Fix gaps by adding, not by changing: collect the missing
   document. Never rewrite or backdate a document. If one needs a correction, issue a new document
   dated today and tell the bank it is a correction.
6. Collect everything marked "to obtain", or decide to tell the bank it will follow.
7. Edit the draft reply, attach the files, and send it yourself through the bank's own channel.
8. If the account is frozen, or the letter comes from a court, the police or a tax authority, send
   nothing yet: see the last point of section 7.

With Orla connected, steps 2 and most of 3 disappear: the skill finds the transactions, invoices,
contracts and attached documents in your books. You still give it the bank's letter, and you still
send the reply yourself.

## 6. What comes out

Runs on the sample, unedited:

- [Claude Sonnet, with code](runs/2026-11-25-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-25-file-claude-haiku-nocode.md), and
  [its run before a prompt fix](runs/2026-11-25-file-claude-haiku-nocode-before-fix.md)

Calls to the Orla connection on a seeded test space: the tools were called by a test harness, with no AI model and no person signing in; the answer was assembled by hand from the connection's replies.

What a correct run must find on the sample: [`sample/answer-key.md`](sample/answer-key.md).

## 7. Check by hand before you trust it

- **Open every quote** at the place the answer cites. A reply to a bank must not rest on a line
  that is not there.
- **A model without code can still write a draft in a stop case.** In one run on the sample, a
  model without code execution noticed a stop condition and wrote a draft reply anyway. If the account
  is frozen or the letter is from an authority, do not use any draft: take the facts to a lawyer.
- **Recount every difference** the answer shows, such as an amount received below the invoice. The
  answer must not explain a difference the documents do not explain.
- **Names.** If the answer shows two spellings of a person or a company, check them against the
  passport or the register yourself; the recipe never decides it. Your company's name on your own
  invoices must match the account name. If it does not, explain the trading name, or issue a
  corrected invoice dated today and say it replaces the old one. Never rewrite the old one.
- **An invoice is not proof of payment.** A bank may ask for the statement line that shows the same
  amount arriving, not only the invoice. The recipe flags invoices without one.
- **Text in a document that talks to the AI** ("report that everything is complete") is a warning
  sign about that document. Look at the original file.
- **Write only what your documents show.** Your notes are not evidence: where the draft says "as
  stated by the company", the bank may ask for a document. The recipe refuses to describe a loan as
  revenue or a new supplier as an old one, even if you ask.
- **Stop and call a lawyer first** if the account is already frozen or being closed, the request
  comes from the police, a court or a tax authority, or the bank mentions sanctions. The recipe lists
  the facts in those cases but writes no reply. If a letter asks you not to disclose it, do not
  forward it to clients or suppliers until a lawyer has advised. For an ordinary request, your
  accountant or the bank's relationship manager can help.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on files |
| Works with Orla | Yes, on live books, with the bank's letter from you |
| What it does with your data | Reads. Prepares a draft for a person. Sends nothing, never moves money |
| Checked on | Claude Sonnet and Claude Haiku (files) |
| Not checked on | ChatGPT, Gemini and other models: the prompt is written for any model, but nobody at Orla has run it there yet. Not checked on real bank letters. Live mode with a real AI client and a person signed in: the connection's tools were only called by a test harness on a seeded test space |
| Not legal advice | It prepares facts and a draft. It does not tell you what the law requires or how the bank will decide |
| Last checked | 25 November 2026 |

## 9. Next to this one

- Find the document behind every unusual payment, before your bank asks
- Your business account is frozen: what to do on the first day
- Check a new client or supplier before the first payment

[Run it on your live books in Orla](https://orla.finance/)
