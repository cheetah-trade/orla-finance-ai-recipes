---
id: bill-vs-contract
title: Check a supplier's bill against the contract before you pay
shelf: business
section: back-office
time_to_run: 10 minutes
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads the bills, the contract terms and any email you attach, writes nothing
  live: reads the supplier bills in Orla with Orla's warnings about new bank details and look-alike bills, and the bills due; you attach the contract terms; pays nothing, changes no bank details
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-26
    - Claude Haiku, without code execution, 2026-11-26
  live:
    - Orla personal MCP connection, tools called by a test harness on a seeded test space, no AI model, 2026-11-26
last_checked: 2026-11-26
next_check: 2027-02-26
video: none yet
related: [counterparty-precheck, bills-due, contract-review]
---

# Check a supplier's bill against the contract before you pay

## 1. The job

Before you pay a supplier's bill, check it against what you agreed: the price of each line, any
extra charge, the sums, the due date, the currency and the bank details. Stop the bills that look
like a copy of one you already have, or that ask you to pay a new account.

## 2. Run it

- **On files, in any AI model:** copy the prompt from [`prompt.md`](prompt.md), set today's date,
  attach the bills, the terms you agreed with each supplier and any email about bank details.
- **On live books, with Orla connected:** install the skill and ask "check this week's supplier
  bills against our contracts". The skill is [`SKILL.md`](SKILL.md).

## 3. Who it is for and what you get

For the person who approves supplier bills. In about ten minutes you get a table of every bill with
its outcome (matches the contract, clarify before paying, or stop), the bills to stop first with the
call to make, the amount in question on each bill to clarify, and a short neutral message per
supplier.

## 4. What to give it

- The bills: number, date, due date, currency, lines (quantity, unit price, amount), tax, total and
  the bank details printed on the bill.
- What you agreed with each supplier: the prices, the payment term, the clause on price changes or
  extra charges, the contract currency and the bank details from the signed contract.
- Any email that changes a supplier's bank details.

A full sample on invented data: `sample/`.

Before you attach anything, remove what the job does not need: card numbers, the names and contact
details of the supplier's people other than the accounts contact, anything about your own staff.

## 5. The recipe

1. Collect the bills you are about to pay and, for each supplier, the terms from the signed
   contract.
2. Paste the prompt, set the date, attach the bills, the terms and any email about bank details.
3. Read the control block: every bill counted, the totals per currency on the bills and recomputed.
4. Handle the "stop" bills first. New bank details are confirmed by phone on a number you already
   had, never one from the email that announced them. Do not reply to that email.
5. Send the questions on the "clarify" bills, and pay only what matches the contract until the
   answers arrive.
6. Pay the bills that match, through your normal approval.

With Orla connected, the skill reads the bills from your books together with Orla's own warnings:
a payment to bank details this supplier was never paid on, and, where the duplicate check is
switched on for the space, a bill that looks like one already in your books. The bank details
printed on a bill come through only on a connection approved to see full details; otherwise
compare them with the contract in Orla yourself. You still attach the contract terms: the connection does not read your contracts with
suppliers.

## 6. What comes out

Runs on the sample, unedited:

- [Claude Sonnet, with code](runs/2026-11-26-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-26-file-claude-haiku-nocode.md): it cannot compute IBAN
  check digits, so it marks every bill "Clarify before paying: IBAN not verified" where nothing
  else is wrong

Calls to the Orla connection on a seeded test space: the tools were called by a test harness, with no AI model and no person signing in; the answer was assembled by hand from the connection's replies.

What a correct run must find on the sample: [`sample/answer-key.md`](sample/answer-key.md).

## 7. Check by hand before you trust it

- **New bank details.** The answer stops the bill; you make the call, on a number from the contract
  or earlier letters. Never the number in the email that changed the details.
- **A passing IBAN is not the supplier's account.** The check digits only prove the number is well
  formed. Compare it with the contract, character by character, and read your bank's name check when
  you enter the payment.
- **Price clauses.** Read the clause yourself when the answer says a rise is above the cap or
  without notice: a notice you received by letter may not be in your files.
- **Tax.** The answer checks only the arithmetic of the tax on the bill, not whether the rate or the
  treatment is right. That is your accountant's question.
- **Currency.** A bill in another currency than the contract is a question for the supplier; the
  answer does not convert it.
- **Duplicates.** "Looks like" is not "is". Decide which bill is real before you pay either.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on your bills and contract terms |
| Works with Orla | Yes, on the supplier bills in your books, with Orla's warnings about new bank details and look-alike bills; the contract terms come from you |
| What it does with your data | Reads. Prepares questions for a person. Pays nothing, changes no bank details, contacts nobody |
| Checked on | Claude Sonnet and Claude Haiku (files) |
| Not checked on | ChatGPT, Gemini and other models. Live mode with a real AI client and a person signed in: the connection's tools were only called by a test harness on a seeded test space |
| Last checked | 26 November 2026 |

## 9. Next to this one

- Check a new client or supplier before the first payment
- Bills due this week and what can wait
- Read a contract for payment terms, automatic renewal and the last day to cancel

[Run it on your live books in Orla](https://orla.finance/)
