---
name: orla-recipe-contract-review
description: "Reads contracts for the payment term, automatic renewal, the notice period and how notice must be given, and computes the last day to give notice and how many days are left, with every term quoted from its clause. Works on any contract the person attaches; on live books through the Orla MCP connection it also compares what Orla holds for a client contract (payment days, end date, rates) with the paper. Use when the user asks when a contract renews, how to get out of a contract, the notice deadline, the payment terms of a contract, or to check a contracts register. It gives no legal advice."
---

# Read a contract for payment terms, automatic renewal and the last day to cancel

It reads, quotes and computes dates. It never sends a notice, never cancels, signs or changes a
contract, and never says whether a clause is enforceable.

## Pick the mode

1. Ask for the contracts and their amendments as files: the wording is the source of every answer,
   and the Orla connection does not hand over a contract's text.
2. Call `orla_whoami`. If the Orla tools are there and a space is in reach, also compare **client
   contracts** with what Orla holds for them (below). The connection reads the contracts the space
   bills its clients under; it does not read the contracts with suppliers kept on the Bills page.
   If there are no Orla tools, skip that comparison: the files are enough for the recipe.
3. Ask for today's date if the person did not give it. Then follow `prompt.md` in this folder word
   for word for every contract.

## Live books, for client contracts

All calls take the `space_id` from `orla_whoami`. If more than one business space is in reach, ask
which one.

1. `orla_list_contracts`, with `q` set to the client's name, for each client contract the person
   attached. If two come back, show both and ask which one; never pick one yourself. If none comes
   back, say Orla holds no contract for that client.
2. `orla_get_contract` for each one. Compare with the paper, field by field:
   - `terms.due_days` against the contract's payment term;
   - `starts_on` and `ends_on` against the contract's term;
   - `terms.rates`, `terms.lines` and `amount_per_period` against the contract's prices;
   - `currency` against the contract's currency;
   - `pending_amendment`: a change in Orla waiting to be confirmed.
3. List every difference as "Orla holds" against "the contract says", with the clause. A difference
   in payment days means Orla's reminders and due dates follow the wrong term: the person corrects
   the contract in Orla themselves (`open_in_orla`).

Stop there. That is the end of the recipe.

## What the connection does not show

- The text of a contract, its renewal and notice clauses: they come from the person's files.
- Contracts with suppliers: they are on the Bills page in Orla (Contracts), not on the connection.
- Changing a contract in Orla: only the person, on its page.

## Never

- Never send, draft as sent, or schedule a notice of non-renewal or termination.
- Never change, end or amend a contract in Orla.
- Never say whether a clause is valid or enforceable, or what a missed deadline costs. Send the
  person to a lawyer with the facts.
