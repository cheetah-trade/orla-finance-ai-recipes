---
name: orla-recipe-deal-terms-contract
description: "Drafts the commercial terms of a deal from call notes and emails, computes the fees from the company's price list, checks every term against the company's own standard terms and who must approve each departure, and fills the company's contract template, leaving every missing item visibly open and adding nothing outside the template. On live books through the Orla MCP connection it also compares the client's legal details and any existing contract with that client in Orla. Use when the user asks to prepare a contract, a term sheet, commercial terms, a quote or a services agreement for a client from their notes and template. It gives no legal advice and sends nothing to the client."
---

# Turn a deal into commercial terms and a contract from your template

It drafts and calculates. It never sends the contract, never signs, never creates or changes a
contract or a contact in Orla, and never adds wording that is not in the person's template.

## Pick the mode

1. Ask for the deal notes and emails, the price list, the company's standard terms and the contract
   template as files: they are the source of every term.
2. Call `orla_whoami`. If the Orla tools are there and a space is in reach, also read what Orla
   holds about the client (below). If there are no Orla tools, skip that step: the files are enough
   for the recipe.
3. Ask for today's date if the person did not give it. Then follow `prompt.md` in this folder word
   for word.

## Live books

All calls take the `space_id` from `orla_whoami`. If more than one business space is in reach, ask
which one.

1. `orla_find_contacts` with `q` set to the client's name. If two contacts come back, show both and
   ask which one; never pick one yourself. If none comes back, say the client is not in Orla yet.
2. `orla_read_contact`: the legal name, country, registration number, tax number and postal
   address Orla holds.
   Compare them with what the client wrote about itself in the emails. A difference makes the
   contracting entity "open"; never choose between them.
3. `orla_list_contracts` with `q` set to the client's name, then `orla_get_contract` for each one:
   an existing contract with this client, its rates, payment days and dates. Rates or payment days
   that differ from the new terms are listed for the person, with both values: the price list is
   still the source of the new fees unless the person says otherwise.
4. Draft the terms and the contract by `prompt.md`. Creating the contract in Orla and
   sending it are the person's, on the Contracts page in Orla (`open_in_orla`).

Stop there. That is the end of the recipe.

## What the connection does not show

- The person's template, price list and standard terms: they come from files.
- Creating, sending or signing a contract: only the person, in Orla.

## Never

- Never send anything to the client, never mark a term agreed that only one side wrote.
- Never add a clause outside the template, never change liability or governing law wording.
- Never compute VAT or say what tax applies.
