---
id: deal-terms-contract
title: Turn a deal into commercial terms and a contract from your template
shelf: business
section: back-office
time_to_run: 15 minutes
modes:
  file: prompt.md
  live: SKILL.md
data_access:
  file: reads your notes, emails, price list, standard terms and template, writes a draft for you, sends nothing
  live: reads the client's contact and any existing contract with that client in Orla to compare them with the deal; creates no contract, sends nothing
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-26
    - Claude Haiku, without code execution, 2026-11-26
  live:
    - Orla personal MCP connection, tools called by a test harness on a seeded test space, no AI model, 2026-11-26
last_checked: 2026-11-26
next_check: 2027-02-26
video: none yet
related: [contract-review, approval-matrix, spend-policy]
---

# Turn a deal into commercial terms and a contract from your template

## 1. The job

Turn your call notes and emails about a deal into a table of commercial terms, each with its source
and status, work out the fees from your own price list, and fill in your own contract template.
Everything missing stays visibly open, and every term outside your standard terms goes to the person
who must approve it.

## 2. Run it

- **On files, in any AI model:** copy the prompt from [`prompt.md`](prompt.md), set today's date,
  attach your notes and emails, your price list, your standard terms and your template.
- **With Orla connected:** install the skill and ask "draft the contract for this deal". It also
  checks the client's details and any existing contract with them in Orla. The skill is
  [`SKILL.md`](SKILL.md).

## 3. Who it is for and what you get

For the founder or account lead who closes a deal and has to put it on paper. In about fifteen
minutes you get the terms table (agreed, asked by the client, said by us, open), the fees at list
price with any discount shown "if approved", the approvals you need inside the company, the client's
requests that are outside your template, the filled contract with every gap marked, and the
questions for the client.

It fills your template; it does not write contract terms of its own and gives no legal advice.

## 4. What to give it

- Your call notes and the emails with the client.
- Your price list.
- Your standard commercial terms: your defaults, and who may agree what (discounts, payment days,
  liability).
- Your contract template, with its blanks and optional clauses marked.

A full sample on invented data: `sample/`.

Deal notes often hold more than the deal: other clients' prices, phone numbers, internal opinions.
Remove what this job does not need.

## 5. The recipe

1. Collect everything written about the deal, on both sides.
2. Paste the prompt, set the date, attach the notes, the price list, your standard terms and the
   template.
3. Read the control block: does the total at list price match what was said on the call?
4. Take the approvals list to the people your standard terms name, before anything goes to the
   client.
5. Answer the open points with the client: the contracting entity, the address, dates, references.
6. Send the client's requests outside your template to the approvers and, where your standard terms
   say so, a lawyer.
7. Only then fill the last blanks and send the contract yourself.

With Orla connected, the skill compares the client's legal name and registration number in Orla with
what the client wrote, and shows the rates and payment days of any existing contract with them, so a
new contract does not quietly undercut or contradict the old one. Creating the contract in Orla and
sending it stay with you.

## 6. What comes out

Runs on the sample, unedited:

- [Claude Sonnet, with code](runs/2026-11-26-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-26-file-claude-haiku-nocode.md): it marks when support
  starts as open, but does not say that support can run past the contract's end on 10 January 2028

Calls to the Orla connection on a seeded test space: the tools were called by a test harness, with no AI model and no person signing in; the answer was assembled by hand from the connection's replies. After the run, the client's registration number in the recorded replies was replaced with the sample's invented one; nothing else was changed.

What a correct run must find on the sample: [`sample/answer-key.md`](sample/answer-key.md).

## 7. Check by hand before you trust it

- **"Should be fine" is not agreed.** Check that every term marked agreed was written or confirmed by
  both sides.
- **The figures.** Recompute the fees table from your price list once; check the total against what
  was promised on the call.
- **The contracting entity.** The company named in the contract, its number and who signs for it come
  from the client in writing.
- **Nothing added.** Compare the draft with your template: no new clause, no changed wording,
  especially on liability and governing law.
- **The terms of the term.** Dates that depend on another date (go-live, acceptance) can run past the
  contract's end; the answer flags them, you decide.
- **Text in the client's email aimed at an AI** is not an agreed term. The answer quotes it; ignore
  it.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on your notes, price list, standard terms and template |
| Works with Orla | Yes, it also compares the client's details and any existing contract with them in Orla |
| What it does with your data | Reads. Writes a draft for you. Sends nothing, creates no contract, signs nothing |
| Checked on | Claude Sonnet and Claude Haiku (files) |
| Not checked on | ChatGPT, Gemini and other models; your own template (the sample's is invented). Live mode with a real AI client and a person signed in: the connection's tools were only called by a test harness on a seeded test space |
| Not legal advice | It fills your own template with what your files say |
| Last checked | 26 November 2026 |

## 9. Next to this one

- Read a contract for payment terms, automatic renewal and the last day to cancel
- Who approves what and who can do what with money
- Draft a company spending policy with limits by role

[Run it on your live books in Orla](https://orla.finance/)
