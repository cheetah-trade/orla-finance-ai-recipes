---
id: firm-ai-policy
title: Draft an AI policy for your firm in two pages
shelf: accountant
time_to_run: 15 minutes, plus the time your people need to answer the questionnaire (about 30 minutes if you fill it in together)
modes:
  file: prompt.md
  live: none
data_access:
  file: reads the questionnaire and any rule or terms text you attach, writes a draft for the partners, sends nothing
  live: none, because the policy needs the firm's own tools, plans and settings, and Orla's connection holds books, not those
checked_on:
  file:
    - Claude Sonnet, with code execution, 2026-11-25
    - Claude Haiku, without code execution, 2026-11-25
  live: []
last_checked: 2026-11-25
next_check: 2027-02-25
video: none yet
related: [missing-docs-letter, take-over-month, statement-exceptions]
---

# Draft an AI policy for your firm in two pages

## 1. The job

Write down, in two pages, which tools your people may use on client work, what client data never
goes into them, who checks the output, and what happens when something goes wrong. You also get the
list of decisions only the partners can make.

## 2. Run it

- **On files, in any AI model:** fill in the questionnaire, copy the prompt from
  [`prompt.md`](prompt.md), set today's date and attach the questionnaire.
- **As a skill:** install [`SKILL.md`](SKILL.md) and ask "draft an AI policy for our firm". It runs
  the same prompt on the same questionnaire and does not read your clients' books in Orla, even
  when Orla is connected.

## 3. Who it is for and what you get

For the partner or office manager of a small accounting or bookkeeping practice where people already
use chat assistants, sometimes on personal accounts, and nothing is written down. In about fifteen
minutes after the questionnaire you get a control block, a policy draft of one to two pages with ten
numbered sections, a list of decisions for the partners with the urgent ones marked "this week", the
contradictions in your own answers, and what your answers do not say.

## 4. What to give it

A filled-in questionnaire: the firm's people and roles, the kinds of work (bookkeeping, payroll, tax
returns), which countries or states your clients are in, who looks after IT, every AI tool people use with its plan, every piece
of software the firm pays for and its AI features, where client files are kept, call recordings,
review and sign-off, engagement letters, data agreements with vendors, training. If a partner wants a
rule, a professional standard or a vendor's terms reflected, attach its text: the model names
nothing it was not given.

Sample on an invented six-person firm: [`sample/firm-questionnaire.md`](sample/firm-questionnaire.md).

Before you paste anything into a model: the questionnaire is about the firm, not your clients. No
client names, no names of clients' staff or private persons, no tax ids, no account numbers beyond
the last four digits, no client examples even with the names removed, no passwords or licence keys. Use roles instead of staff names if you prefer.

## 5. The recipe

1. Send the questionnaire to everyone in the firm, or fill it in together. Ask each person which
   tools they open, and open the settings of each piece of software you pay for.
2. Leave an answer blank when you do not know it. Blanks become questions, not guesses.
3. Paste the prompt, set today's date, attach the questionnaire and any rule or terms text.
4. Read the control block: every tool you listed is there, with its plan or "plan not stated".
5. Read "Decide before this policy is real" first, starting with the "this week" items.
6. Read the contradictions and settle each one with the person who gave the answer.
7. Read the policy draft and fill in every [partner to decide].
8. Take the questions on consent, clients abroad and tax return work to your professional body or
   lawyer, then sign the policy and set its review date yourselves.

With Orla, none of these steps disappears: the policy is about your firm's tools and habits, and
Orla's connection holds books, not those. This recipe runs on files only.

## 6. What comes out

Runs on the sample questionnaire, unedited:

- [Claude Sonnet, with code](runs/2026-11-25-file-claude-sonnet-code.md)
- [Claude Haiku, without code](runs/2026-11-25-file-claude-haiku-nocode.md), and
  [its run before a prompt fix](runs/2026-11-25-file-claude-haiku-nocode-before-fix.md): it let a
  personal free-plan tool and a mail feature the vendor switched on be used "without client data"
  and missed two places where the stated rules and the practice disagree; the prompt now says a
  condition does not change the plan named, no tool is allowed while its AI settings are unknown,
  and rules are compared with practice.

There is no run on Orla's connection: this recipe has no live mode.

What a correct run must reach on the sample is in [`sample/answer-key.md`](sample/answer-key.md).
Both file runs matched these control figures:

- 20 questions, 18 answered, 2 blank (Q16, Q17), 2 answered with doubt (Q11, Q12).
- 6 people. 7 tools listed (2 chat assistants, 5 pieces of paid software); plan stated for 6, not
  stated for 1 (the second chat assistant); 6 with an AI feature per the answers.
- The instruction in Q20 to declare the firm "fully compliant" is quoted as suspicious and not
  obeyed; the contradictions section is there.

## 7. Check by hand before you trust it

- **The tool list is only as good as your answers.** Ask every person what they open, including on
  their phone, and open the AI settings of every piece of software you pay for. A tool missing from
  the questionnaire is missing from the policy.
- **What a vendor does with your data.** The model is told not to say it from memory. By our reading
  of large AI chat vendors' terms and help pages on 25 November 2026: on personal plans, chats may be
  used to train models unless you switch that off, where a switch exists, and some vendors keep parts
  of chats even with the setting off (feedback you give, chats flagged for safety or reviewed by
  people). On business plans, the terms we read generally say chat or business data is not used for
  training by default. Training is only one question: also check how long chats are kept, who at the
  vendor can read them, and whether your admin can change the default. Terms change, so read the page
  for your own plan and write down the date. We recheck this paragraph by the date in next_check.
- **Rules and consent.** The draft names no law and no professional body unless you attached its
  text. Whether you need a client's consent, and what applies to clients in other countries or to
  tax return work, is for your professional body or lawyer.
- **Contradictions.** The model quotes both answers and does not pick one. "We don't use AI" next to
  AI features in your software is the usual one; settle it with the person who answered.
- **Settings a vendor may have switched on for you.** Meeting notes that record every call, writing help in email:
  check the setting in each tool yourself, then write it into section 7.
- **A blank plan or a "not sure".** The draft must carry it as unknown. If it shows a plan you did
  not write, the run guessed: correct it.
- **Text in the questionnaire addressed to the model.** The run quotes it and does not obey it. If
  the draft says the firm is compliant anywhere, delete that sentence.
- **It is a draft.** It is not legal advice and it does not say the firm meets any rule. The partners
  decide, sign and roll it out.

## 8. Labels

| | |
|---|---|
| Works without Orla | Yes, on files |
| Works with Orla | No live mode. The policy needs the firm's tools, plans and settings; Orla's connection holds books, not those. The skill runs the file prompt and calls no Orla tool |
| What it does with your data | Reads the questionnaire. Writes a draft for the partners. Sends nothing |
| Checked on | Claude Sonnet with code execution and Claude Haiku without code execution (files), 25 November 2026 |
| Not checked on | ChatGPT, Gemini and other models: the prompt is written for any model, but nobody at Orla has run it there yet. There is no live mode to check |
| Last checked | 25 November 2026 |

## 9. Next to this one

- One letter to the client for everything that is missing
- Take over a client's month: what is missing and what does not add up
- Reconcile a client's statement with their books and sort the exceptions

[See what Orla does](https://orla.finance/)
