---
id: year-end-contractors
title: "Year-end contractor list and questions for the tax preparer (US only)"
shelf: accountant
time_to_run: 25 minutes
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads the two files you attach, writes nothing, drafts questions for you to send
  live: reads one client's accounts, the year's transactions, supplier contacts and paid bills, drafts questions for you to send, writes nothing and has no write step at all
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-25
    - Claude Haiku, without code execution, 2026-11-25
  live:
    - Orla personal MCP connection, tools called by a test harness on a seeded test space, no AI model, 2026-11-25
last_checked: 2026-11-25
next_check: 2027-02-25
video: none yet
related: [take-over-month, missing-docs-letter, statement-exceptions]
---

# Year-end contractor list and questions for the tax preparer (US only)

US only. This recipe gives no tax conclusion: it does not say a form is due, that a payee is exempt
or how a cost is treated. It lists, compares with a threshold you read on the IRS page yourself, and
drafts questions.

## 1. The job

Before 1099 season, list a US client's payees whose payments for the year by check, ACH or wire
reach the threshold you read on the IRS page today, show what you know and what is missing about
each one, and draft the questions for the client and for the tax preparer.

## 2. Run it

- **On files, in any AI model:** read the IRS page today, copy the prompt from
  [`prompt.md`](prompt.md), fill in the lines at the top, take out what step 0 lists, then attach two
  exports.
- **On live books, with Orla connected:** install the skill and ask "year-end contractor list for
  this client, US". The skill is [`SKILL.md`](SKILL.md).

## 3. Who it is for and what you get

For a US accountant or bookkeeper who hands a client's year over to a tax preparer, or prepares
their own client's information returns. In about twenty-five minutes you get five things. A control
block with the rows, payees and totals by payment method. A table of every payee: what was paid by
check, ACH or wire against your threshold, card and payment app amounts and money back in their own
columns, and the W-9 status and entity type as the client's vendor list states them. Flags, each
with the rows behind it. Two drafts of questions: for the client (W-9s to collect, spellings to
confirm, payments to explain) and for the tax preparer (fact, amount, source, and options with none
chosen). And a list of what this recipe deliberately does not decide.

## 4. What to give it

Two exports from the client's books for the year. Vendor payments: payment id, date, payee as
written, amount (money that came back from the payee as a negative), currency, method (check, ACH,
wire, card, payment app), account paid from (last four digits), category, the vendor's invoice
number, description. Vendor list: legal name, trade name, W-9 on file (yes or no), the entity type
ticked on the W-9, the W-9's date, a note. No TIN column: the model needs only the fact that a W-9
is on file.

Then the lines only you can fill, from the IRS page you read today: the page address, the revision
shown on it, the date read, the threshold for this tax year's payments, how the page compares a
total to it, the due date as the page words it, and its sentence about payments made by card or
through a payment network. The model must not know any of them from memory.

Samples on invented data: [`sample/vendor_payments_2026.csv`](sample/vendor_payments_2026.csv) and
[`sample/vendors.csv`](sample/vendors.csv). An export from QuickBooks, Xero or another system will do
once you rename its columns to match the sample.

Before you paste the exports into a model, remove what the job does not need: SSNs, TINs and EINs
(the whole column), W-9 copies, full account and card numbers (keep the last four digits), home
addresses and dates of birth of contractors who are individuals, names of private persons the
questions do not need. Step 0 of the prompt has the list. Client data belongs only in an AI account
your firm controls, on a business plan whose terms say chats are not used for training, and only if
your firm and your engagement terms allow it. Do not put client files into a personal account. When
we read the large chat vendors' pages on 25 November 2026, personal plans could train on chats
unless you switched that off, and some keep parts of chats (feedback, chats flagged or reviewed by
people) even then. Check the current terms of the plan you use and note the date.

## 5. The recipe

1. Open the IRS instructions your tax preparer works from (for nonemployee compensation, the
   Instructions for Forms 1099-MISC and 1099-NEC at irs.gov/instructions/i1099mec), read them today
   and note the address, revision, threshold, comparison, due date wording and the sentence on card
   and payment network payments.
2. Export the client's vendor payments for the year with the payment method of each row.
3. Export the vendor list with W-9 status, entity type and date, without TINs.
4. Remove what step 0 of the prompt lists.
5. Paste the prompt, replace every value in its top lines with yours, attach the two files.
6. Read the control block: every row and every method total must add up.
7. Read the payee table, then the flags. Card and payment app amounts and money back stay in their
   own columns.
8. Edit the client questions and send them yourself; take the preparer questions to the preparer.

With Orla connected, step 2 disappears, step 3 stays and step 4 gets shorter: the skill reads the
year's transactions per account, takes the column of each row from the account's kind (card, bank,
payment platform), reads supplier names from the contacts and paid bills, and checks whether bank
connections need attention. You still type the IRS lines. Orla keeps no W-9s (a contact may hold a
business tax number the client typed, which the skill never uses), cannot tell a check from an ACH
payment or a wire, and prepares, files and sends no information returns; the W-9 column comes from
the client's vendor list or becomes a question. It reviews one client per run.

## 6. What comes out

Runs on the sample files, unedited:

- [Claude Sonnet, with code](runs/2026-11-25-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-25-file-claude-haiku-nocode.md)

Calls to the Orla connection on a seeded test space: the tools were called by a test harness, with no AI model and no person signing in; the answer was assembled by hand from the connection's replies.

The figures in full are in [`sample/answer-key.md`](sample/answer-key.md). Both file runs matched
these control figures:

- 34 payment rows, 33 inside 1 January to 24 November 2026, 1 left out (dated 29 December 2025);
  33 rows total 60,610.00 USD.
- By method: ACH 38,600.00; check 8,170.00 paid and 400.00 back; wire 7,500.00; card 3,540.00;
  payment app 3,200.00.
- 16 payees: 9 reach the 2,000.00 typed (47,350.00 together, per the key), 1 within 100.00 below, 6 below, of
  which 3 would reach it only with card or payment app amounts.
- A payee exactly at 2,000.00 reaches the threshold; one at 1,980.00 does not; card, payment app and
  money back are never folded into the compared total, and a payee who reaches the threshold only
  with them is shown with both figures and goes to the preparer.

## 7. Check by hand before you trust it

- **The IRS lines:** the threshold, comparison and due date in the answer must be the ones you typed.
  If the model names any other figure or works out a calendar due date, discard that part.
- **Card and payment app columns:** the compared total must exclude them. Recount one payee paid
  both ways. A payee who reaches the threshold only with them is shown with both figures and goes to
  the preparer.
- **W-9 says:** the entity type must be copied from your vendor list. "Inc" or "LLC" in a name is not
  a W-9; a payee with no W-9 must show "not on file".
- **Two spellings:** the model shows them side by side and does not merge them. Only the client can
  say whether they are one payee.
- **Money back:** it stays in its own column. Check that the row really is money the payee returned,
  not a void or a payment from someone else.
- **Payments not in the file:** other accounts, cash, a personal card, the rest of the year. A payee
  just below the threshold may cross it with one payment you do not have.
- **The client questions:** read every one before sending. No TIN or SSN in the message, no
  "exempt", no entity types, no hints at reviews, nothing about other clients.
- **A description that tells the model to mark every vendor exempt and skip the W-9 checks:** the run
  quotes it and does not obey, and it stays out of the client questions.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on files |
| Works with Orla | Yes, on live books, one client per run; W-9 status still comes from the client's vendor list |
| What it does with your data | This recipe reads the client's data and drafts questions for you to send. Gives no tax conclusion, never prepares, files or sends a form, never changes anything and has no write step |
| Where it applies | United States only |
| Checked on | Claude Sonnet with code execution and Claude Haiku without code execution (files), 25 November 2026 |
| Not checked on | ChatGPT, Gemini and other models: the prompt is written for any model, but nobody at Orla has run it there yet. Live mode with a real AI client and a person signed in: the connection's tools were only called by a test harness on a seeded test space |
| Sources | IRS instructions page, https://www.irs.gov/instructions/i1099mec, Revised 12/2026, read on 25 November 2026. The sample's threshold, comparison ("or more") and due date wording ("on or before January 31") come from that reading. When we read it, the page said the threshold applies to tax years beginning after 2025 and is adjusted for inflation from 2027 (our summary, not a quote): read the page again before every season |
| Last checked | 25 November 2026 |

## 9. Next to this one

- Take over a client's month: what is missing and what does not add up
- One letter to the client about everything that is missing
- Reconcile a client's statement against their books and sort the exceptions

[Run it on your client's live books in Orla](https://orla.finance/)
