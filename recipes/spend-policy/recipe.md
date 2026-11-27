---
id: spend-policy
title: Draft a company spending policy with limits by role
shelf: business
section: back-office
time_to_run: 15 minutes, plus about 20 minutes to fill in the questionnaire
modes:
  file: prompt.md
  live: none
data_access:
  file: reads the questionnaire and the spending export you attach, writes a draft for the owner, sends nothing
  live: none, because the policy is drafted from the owner's own answers, and the Orla connection does not read cards, limits or the team
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-26
    - Claude Haiku, without code execution, 2026-11-26
  live: []
last_checked: 2026-11-26
next_check: 2027-02-26
video: none yet
related: [approval-matrix, month-close, missing-docs-letter]
---

# Draft a company spending policy with limits by role

## 1. The job

Write down, in two pages, who may spend how much per purchase and per month, who approves whom, what
needs asking first, when receipts are due, and the rules for travel and clients. Then test the
limits on what people actually spent, so they fit before anyone has to live by them.

## 2. Run it

- **On files, in any AI model:** fill in the questionnaire (copy the one in `sample/`),
  export a few months of card spending and expense claims, then paste the prompt from
  [`prompt.md`](prompt.md), set today's date and attach both.

- **As a skill:** install [`SKILL.md`](SKILL.md) and ask "draft our spending policy". It runs the
  same prompt on the same files and calls no Orla tool, even when Orla is connected.

## 3. Who it is for and what you get

For the founder or finance manager of a company with company cards or expense claims. In about
fifteen minutes you get a draft policy with every gap marked [OWNER TO DECIDE], the list of
decisions only the owner can make (contradictions, unclear answers, missing rules), every past
expense that the draft would put outside the rules, and, per role, whether the limits would have
fitted how people really spent.

It drafts; the owner decides. It gives no tax or employment advice and fills in no official rate.

## 4. What to give it

- The questionnaire: people and roles, limits per purchase and per month, who approves whom, what
  needs asking first, receipts, travel, clients and gifts, what is never allowed.
- An export of spending for the last few months: date, person, role, merchant, category, amount,
  receipt yes or no, a note (nights, guests, items).

A full sample on invented data: `sample/`.

The export needs names, roles, amounts, merchants and dates. Remove card numbers, bank details and
home addresses; keep a note only where it gives nights, guests or items.

## 5. The recipe

1. Fill in the questionnaire with the person who approves spending today.
2. Export three months of card spending and expense claims.
3. Paste the prompt, set the date, attach both.
4. Go through "Decisions for the owner" first: a policy with an open contradiction is not ready.
5. Read the test on past spending: where a limit would have been broken every month, change the
   limit or the way of working, not only the wording.
6. Fill in any official figure (a per diem, a mileage rate) from the official source, with your
   accountant.
7. Publish the policy to the team, then set the card limits to match in your card provider.

## 6. What comes out

Runs on the sample, unedited:

- [Claude Sonnet, with code](runs/2026-11-26-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-26-file-claude-haiku-nocode.md): it finds both months
  over the team lead limit, but counts seven team lead months with spending where its own table
  shows eight

What a correct run must find on the sample: [`sample/answer-key.md`](sample/answer-key.md).

## 7. Check by hand before you trust it

- **Official figures.** A per diem, a mileage rate or a tax-free amount never comes from the model.
  Look it up at the official source and confirm it with your accountant.
- **Contradictions.** Check that the draft does not quietly pick one side of a contradiction in the
  questionnaire; each belongs in the owner's decisions.
- **Who approves the top.** The person at the top of the chain needs someone who reviews their
  spending too, even after the fact.
- **Currencies.** Caps in another currency than the card are not checked against the card charges.
- **Past spending is not an accusation.** A row outside the draft means the draft and the habits
  differ; talk about the rule, not the person.
- **What happens when a rule is broken.** Salary deductions and disciplinary steps are for an
  employment adviser, not this draft.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on files |
| Works with Orla | No live mode. The policy comes from the owner's answers, and the Orla connection does not read cards, limits or the team |
| What it does with your data | Reads the questionnaire and the export. Writes a draft for the owner. Changes no card limit, sends nothing |
| Checked on | Claude Sonnet and Claude Haiku (files) |
| Not checked on | ChatGPT, Gemini and other models. There is no live mode to check |
| Last checked | 26 November 2026 |

## 9. Next to this one

- Who approves what and who can do what with money
- Close the month without missing a step
- One letter to the client for everything that is missing

[Run it on your live books in Orla](https://orla.finance/)
