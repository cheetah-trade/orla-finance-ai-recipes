---
name: orla-recipe-approval-matrix
description: "Checks who in a company can start, send and approve payments, change payees' bank details, book transactions and manage the team, walks the payment approval rules band by band for each proposer, and compares the result with how the owner wants approvals to work: rules that leave a band without a signature, rules that can never be met, switched-off rules that block payments, conflicts of duties, approvers without two-factor and leavers with access. On files: the team list and rules the person copies from Orla's Team & access page or another system. Use when the user asks who can approve payments, to check the approval matrix, segregation of duties, signing rules or limits by role. It changes nothing."
---

# Who approves what and who can do what

It reads and explains. It never changes a role, a right or a rule, never invites or removes anyone.

## Pick the mode

1. Call `orla_whoami`. The Orla connection does not read a space's team, roles, extra rights or
   approval rules, so this recipe always runs on files: ask the person to copy the people (role,
   extra rights, two-factor, last sign-in) and the approval rules from the Team & access page in
   Orla, and how they want approvals to work, in their words. If there are no Orla tools, ask for the
   same three tables and run the same way.
2. If the Orla tools are there and a space is in reach, `orla_get_payment_queue` shows the payments
   waiting for a signature now: who proposed each, the amount and who may sign. Use it as examples
   of the bands, never as the rules themselves.
3. Ask for today's date if the person did not give it. Then follow `prompt.md` in this folder word
   for word.

Stop there. That is the end of the recipe.

## What the connection does not show

- The team, roles, extra rights and approval rules: the person copies them from Team & access.
- Changing any of them: only an owner or admin, on that page in Orla.

## Never

- Never change a role, a right or a rule, never invite or remove a person.
- Never suggest more rights than the person's own wishes say.
- Never name laws or audit standards; this is a check of the company's own wishes.
