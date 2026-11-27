---
id: contract-review
title: Read a contract for payment terms, automatic renewal and the last day to cancel
shelf: business
section: back-office
time_to_run: 10 minutes for up to five contracts
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads the contracts, amendments and register you attach, writes nothing
  live: reads your client contracts in Orla to compare what Orla holds with the paper; the wording comes from the files you attach; sends no notice, changes no contract
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-26
    - Claude Haiku, without code execution, 2026-11-26
  live:
    - Orla personal MCP connection, tools called by a test harness on a seeded test space, no AI model, 2026-11-26
last_checked: 2026-11-26
next_check: 2027-02-26
video: none yet
related: [bill-vs-contract, deal-terms-contract, bills-due]
---

# Read a contract for payment terms, automatic renewal and the last day to cancel

## 1. The job

For each contract, find when you pay or get paid, whether it renews by itself, how to give notice,
the last day to do it, and where your register differs.

## 2. Run it

- **On files, in any AI model:** copy the prompt from [`prompt.md`](prompt.md), set today's date,
  attach the contracts with every amendment, and your register if you keep one.
- **With Orla connected:** install the skill and ask "when can we get out of these contracts?". It
  also compares your client contracts in Orla with the paper. The skill is [`SKILL.md`](SKILL.md).

## 3. Who it is for and what you get

For whoever keeps the company's contracts: a founder, a finance or operations manager. In about ten
minutes you get the deadlines soonest first (passed, act now, coming, no renewal, or cannot compute), one card
per contract with every term quoted from its clause, the differences against your register, and what
the files do not say.

It reads the words and counts the days. It does not say whether a clause holds or what a missed
deadline costs: those are questions for a lawyer, and the answer lists the facts the lawyer needs.

## 4. What to give it

- The contracts as text or PDF, with every amendment and side letter: an amendment can change the
  notice period or the address notice goes to.
- Your register of contracts, if you keep one: what you recorded for each.

A full sample on invented data: `sample/`.

Contracts often hold personal data: names and signatures, home addresses of sole traders, bank
details. Remove what the job does not need, and check the confidentiality clause before a contract
goes to any AI tool.

## 5. The recipe

1. Gather every contract that renews or runs for a term, with its amendments.
2. Paste the prompt, set the date, attach the contracts and your register.
3. Read the deadlines table first. "Act now" means 14 days or fewer.
4. For each deadline you mean to use, read the notice clause yourself: how notice is given (a
   letter, an email, to which address) matters as much as the date.
5. Correct your register where the answer lists a difference.
6. Put the next deadlines in a calendar with a reminder well before each one.

With Orla connected, the skill compares your client contracts in Orla with the paper: payment days,
dates and rates, so Orla's due dates and reminders follow the contract. On the Pro plan and above,
contracts you pay under can be kept on the Bills page in Orla (Contracts), with the renewal date
and the notice; Orla then
reminds owners and admins 14 and 3 days before the last day and on the day itself. You enter them
there yourself: the connection does not read them.

## 6. What comes out

Runs on the sample, unedited:

- [Claude Sonnet, with code](runs/2026-11-26-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-26-file-claude-haiku-nocode.md): it misses that K1 has
  already renewed to 14 December 2027 in the register check

Calls to the Orla connection on a seeded test space: the tools were called by a test harness, with no AI model and no person signing in; the answer was assembled by hand from the connection's replies.

What a correct run must find on the sample: [`sample/answer-key.md`](sample/answer-key.md).

## 7. Check by hand before you trust it

- **Read the notice clause yourself** before you act on a date. The answer quotes it; the wording
  decides.
- **The method of notice.** A contract that wants a letter to the registered office is not served
  by an email, and an amendment may move the address.
- **Day counting.** Whether the last day itself counts, and public holidays in business days, are
  not settled by the answer. When in doubt, act a few days earlier.
- **Amendments.** If you have an amendment the model did not see, its dates may be wrong. When two
  readings exist, the answer gives both; a lawyer says which applies.
- **"Cannot compute"** means a term is missing in the files, not that there is no deadline. Do not
  fill it from what contracts usually say.
- **Price rises on renewal.** A rise that depends on an index is not computed; check the index
  yourself.
- **Set up from the paper in Orla?** Where the paper does not say, Orla's card fills a notice of
  30 days and marks it as not from the paper. Check those fields against this answer.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on your contracts and register |
| Works with Orla | Partly: it compares your client contracts in Orla with the paper. Contracts with suppliers kept on the Bills page are not read by the connection |
| What it does with your data | Reads and counts. Sends no notice, cancels nothing, changes no contract |
| Checked on | Claude Sonnet and Claude Haiku (files) |
| Not checked on | ChatGPT, Gemini and other models; real contracts (the sample is invented). Live mode with a real AI client and a person signed in: the connection's tools were only called by a test harness on a seeded test space |
| Last checked | 26 November 2026 |

## 9. Next to this one

- Check a supplier's bill against the contract before you pay
- Turn a deal into commercial terms and a contract from your template
- Bills due this week and what can wait

[Run it on your live books in Orla](https://orla.finance/)
