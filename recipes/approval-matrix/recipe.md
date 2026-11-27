---
id: approval-matrix
title: Who approves what and who can do what with money
shelf: business
section: back-office
time_to_run: 15 minutes, most of it copying the team and the rules
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads the team list, the approval rules and your wishes that you attach, writes nothing
  live: none for the rules, because the Orla connection does not read a space's team, roles or approval rules; the skill runs on what you copy from Team & access and can show the payments waiting for a signature
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-26
    - Claude Haiku, without code execution, 2026-11-26
  live: []
last_checked: 2026-11-26
next_check: 2027-02-26
video: none yet
related: [spend-policy, deal-terms-contract, bill-vs-contract]
---

# Who approves what and who can do what with money

## 1. The job

See, for each person in the company, who can propose, execute and approve payments, change a
payee's bank details and manage the team; walk your payment approval rules from the smallest amount
to the largest; and find where they differ from how you want approvals to work.

## 2. Run it

- **On files, in any AI model:** copy the team and the approval rules from the Team & access page in
  Orla (or from your bank or other system) into two tables, write down how you want approvals to
  work, then paste the prompt from [`prompt.md`](prompt.md), set today's date and attach the three.
- **As a skill:** install [`SKILL.md`](SKILL.md) and ask "check who can approve our payments". It
  runs the same prompt on what you copied.

## 3. Who it is for and what you get

For the owner or the person who set up the team and the rules. In about fifteen minutes you get the
matrix of people and actions, the amount bands for each person who may propose a payment (who signs,
how many, and where a payment is refused or blocked), your wishes one by one with a verdict, the
conflicts of duties, most serious first, and the changes to make, one line each.

It explains; it changes nothing. You make the changes on the Team & access page.

## 4. What to give it

- The people: role, switches turned on or off beyond the role (in Orla, "Approve payments",
  "Propose payments" and the rest), two-factor sign-in, last sign-in, a note for anyone who left.
- The approval rules: the amount each covers (over what, up to what), the signatures, who signs,
  whom it applies to, whether it is on, its priority.
- How you want it to work, in your own words.

A full sample on invented data: `sample/`. If your roles come from another system, attach
what each role may do there and delete the two Orla sections from the prompt.

The job needs names, roles, rights and sign-in facts; remove email addresses, phone numbers and
salaries. Keep the answer to the people who manage the team.

## 5. The recipe

1. Copy the people and the rules into two tables, exactly as the page shows them.
2. Write your wishes as numbered lines: amounts, signatures, who never does what.
3. Paste the prompt, set the date, attach the three files.
4. Read the amount bands first: a band where a payment is refused or blocked stops real payments
   today.
5. Then the conflicts: the same person changing bank details and approving, approvers without
   two-factor, people who left.
6. Make the changes yourself on the Team & access page, one at a time, and run the recipe again.

In Orla, the Team & access page already warns about a rule that cannot be met, and refuses a payment
that falls between two rules' bands instead of letting it out unsigned. This recipe puts every rule,
every person and your own wishes side by side, which no single screen does.

## 6. What comes out

Runs on the sample, unedited:

- [Claude Sonnet, with code](runs/2026-11-26-file-claude-sonnet-code.md): one of its suggested
  changes offers to switch a rule off, which in Orla blocks the payments that rule covers
- [Claude Haiku, without code](runs/2026-11-26-file-claude-haiku-nocode.md): it calls the first wish
  not met because of Dev's limit, which is stricter than the wish, not against it

What a correct run must find on the sample: [`sample/answer-key.md`](sample/answer-key.md).

## 7. Check by hand before you trust it

- **Copy the rules exactly.** "Over 1,000" and "from 1,000" are different bands; one wrong edge moves
  a payment into a gap.
- **Switched-off rules still count.** In Orla a switched-off rule that would cover a payment blocks
  it. Do not leave a rule off to "disable" it: delete it.
- **Priority decides.** A rule checked first can replace a stricter one. Read the band table for each
  proposer, not the rules one by one.
- **Nobody signs their own payment.** A rule that names two signers cannot pass a payment either of
  them proposes.
- **Positions and budgets.** If your space uses positions with budgets, Orla applies them as well;
  this recipe reads only the rules you copied.
- **Currency.** Rules in Orla are in US dollars; a payment in another currency is counted at the
  rate of the day it was proposed and at today's, and the stricter answer wins.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on the tables you copy |
| Works with Orla | No live mode for the rules: the connection does not read the team, roles or approval rules. The skill runs on what you copy and may show the payments waiting for a signature |
| What it does with your data | Reads and explains. Changes no role, switch or rule, invites and removes nobody |
| Checked on | Claude Sonnet and Claude Haiku (files) |
| Not checked on | ChatGPT, Gemini and other models; roles of systems other than Orla. The skill's one live call, the payments waiting for a signature, has not been run, by a test harness or by a real AI client |
| Last checked | 26 November 2026 |

## 9. Next to this one

- Draft a company spending policy with limits by role
- Turn a deal into commercial terms and a contract from your template
- Check a supplier's bill against the contract before you pay

[Run it on your live books in Orla](https://orla.finance/)
