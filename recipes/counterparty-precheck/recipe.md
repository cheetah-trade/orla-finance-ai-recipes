---
id: counterparty-precheck
title: Check a new client or supplier before the first payment
shelf: business
section: compliance
time_to_run: 15 minutes for the lookups, 5 minutes for the run
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads the list and the lookups you attach, writes nothing
  live: reads contacts, Orla's screening result for each one and the payments waiting, writes nothing, starts no paid check
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-25
    - Claude Haiku, without code execution, 2026-11-25
  live:
    - Orla personal MCP connection, tools called by a test harness on a seeded test space, no AI model, 2026-11-25
last_checked: 2026-11-25
next_check: 2027-02-25
video: none yet
related: [account-opening-pack, bank-request-reply, bills-due]
---

# Check a new client or supplier before the first payment

## 1. The job

Before you pay a new supplier, take money from a new client, or pay an existing supplier on new bank
details, check that they are who they say they are and that the bank details agree with what you
already hold.

## 2. Run it

- **On files, in any AI model:** look the counterparties up in the free official sources listed in
  [`prompt.md`](prompt.md), copy what you found, then paste the prompt and attach your list and your
  lookups.
- **On live books, with Orla connected:** install the skill and ask "check these suppliers before we
  pay them". The skill is [`SKILL.md`](SKILL.md).

## 3. Who it is for and what you get

For the person who approves payments in a company. In about twenty minutes, most of it spent on the
lookups, you get one card per counterparty: what matched, what did not, what was not checked, and an
outcome in plain words (nothing found in what you checked, clarify before paying, or stop), plus
short questions to send to the counterparties that need to clarify.

This is a preliminary check, not a sanctions screening and not a legal opinion. If your business must
screen customers by law, this does not replace that process.

## 4. What to give it

- A list of the counterparties: name on the invoice, legal name on the contract, country,
  registration and VAT numbers, IBAN on the invoice and the IBAN you had before, email domain,
  website, signatory, the first payment.
- What you looked up, copied as text with the date: the company register, the VAT check, the
  sanctions lists, the domain registration date.
- Any email that changes bank details.

A full sample on invented data: `sample/`.

The model cannot open registers or lists for you. If you did not look something up, the answer says
"not checked"; it never fills the gap from memory. You do not need to know how IBAN check digits
work: the model computes them or says it cannot.

Before you attach anything, remove what the job does not need: passport numbers, full dates of birth
(the year is often enough to compare with a list entry), home addresses of sole traders.
This shrinks what the model sees; it does not make the files anonymous. Whether company documents
may go to an AI tool at all is your decision and your company's rules.

## 5. The recipe

1. List the counterparties you are about to pay for the first time, or on new bank details.
2. Look each one up in the official sources at the end of `prompt.md` and copy what you see, with
   the date.
3. Paste the prompt, set the date, attach the list, the lookups and any email about bank details.
4. Read the control block: every counterparty counted, every source you did not bring listed.
5. Handle the "stop" cards first. Changed bank details are confirmed by phone on a number you
   already had, never one from the email that announced the change.
6. Send the clarifying questions, and do not pay until the answers arrive. Keep them neutral: no
   words about suspicion, sanctions or checks. If you suspect fraud or money laundering, or your
   business is itself regulated for anti-money-laundering (an accountant, for example), talk to your
   compliance officer before you send the counterparty anything.
7. When you enter the payment, read the name check your bank shows. A close match or no match:
   stop. A match only means the name fits the account, not that the counterparty is trustworthy.

With Orla connected, the skill reads each contact from your books, Orla's own screening result for
it (including when it is out of date or has open matches) and the payments waiting for it. You still
bring the lookups Orla does not hold, and you start any new screening in Orla yourself.

## 6. What comes out

Runs on the sample, unedited:

- [Claude Sonnet, with code](runs/2026-11-25-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-25-file-claude-haiku-nocode.md): it cannot compute IBAN
  check digits, so it marks every IBAN not verified, and it stops C1, C2 and C6 where the key says
  clarify

Calls to the Orla connection on a seeded test space: the tools were called by a test harness, with no AI model and no person signing in; the answer was assembled by hand from the connection's replies.

What a correct run must find on the sample: [`sample/answer-key.md`](sample/answer-key.md).

## 7. Check by hand before you trust it

- **"Nothing found" is not "clean".** It means nothing came up in the sources you brought. The answer
  lists the sources you did not bring; read that list.
- **Look-alike names.** One letter can be a different company, sometimes a dissolved one. Check the
  registration number, not only the name.
- **A sanctions match.** Read the reasons the answer gives (date of birth, country, aliases). If you
  cannot rule a match out with facts, do not pay, and ask your bank or a compliance adviser.
- **IBAN check digits.** A model without code cannot compute them; the recipe then marks every IBAN
  as not verified. In the runs on the sample it therefore did not find the IBAN with a typo: check
  each IBAN in your bank's payment screen yourself. A passing IBAN only means the number is well formed, not that it belongs to that
  company.
- **New bank details by email** are the most common way money goes to the wrong place. Call a number
  you already had. Do not reply to the email.
- **VAT check without a name** is normal for some countries and is not a mismatch.
- **A name search does not show who owns a company.** Ownership and control are outside this
  recipe: ask your bank or a compliance adviser if they matter for the payment.
- **Lists change every week.** A check is as old as its date: check again before a large payment.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on your list and lookups |
| Works with Orla | Yes, on your contacts, with Orla's screening result for each |
| What it does with your data | Reads. Prepares questions for a person. Pays nothing, contacts nobody, starts no paid check |
| Checked on | Claude Sonnet and Claude Haiku (files) |
| Not checked on | ChatGPT, Gemini and other models; real register and list outputs (the sample's lookups are invented). Live mode with a real AI client and a person signed in: the connection's tools were only called by a test harness on a seeded test space |
| Not a screening | It is a preliminary check of what you brought. It does not replace a sanctions screening your business may be required to run |
| Last checked | 25 November 2026 |

## 9. Next to this one

- Check your documents for a new business account or a bank's periodic review
- Answer a bank's request for information about your account
- Bills due this week and what can wait

[Run it on your live books in Orla](https://orla.finance/)
