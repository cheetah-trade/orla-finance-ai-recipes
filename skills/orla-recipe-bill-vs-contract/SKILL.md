---
name: orla-recipe-bill-vs-contract
description: "Checks supplier bills against what was agreed in the contract before they are paid: unit prices against the contract prices and any price review clause, extra charges, the arithmetic of lines, tax and total, the due date against the payment term, the currency, bank details against the ones on file, and the same bill arriving twice. Works two ways: on live books through the Orla MCP connection (reads the bills, Orla's warnings about new bank details and look-alike bills, and the bills due), with the contract terms the person attaches; or on files when Orla is not connected. Use when the user asks to check, approve or review supplier bills or invoices against a contract, a price list or agreed rates, or got an email about a supplier's new bank details."
---

# Check a supplier's bill against the contract

It reads, compares and calculates. It never pays, never changes bank details, never marks a bill
paid and never replies to a supplier.

## Pick the mode

1. Call `orla_whoami`. If the Orla tools are there and a space is in reach, use **live books** for
   the bills, and ask the person for the contract terms from the signed contract: the connection
   does not read contracts with suppliers.
2. If there are no Orla tools, use **files**: ask for the bills, the contract terms and any email
   about bank details, and follow `prompt.md` in this folder word for word. Ask for today's date if
   the person did not give it.

## Live books

All calls take the `space_id` from `orla_whoami`. If more than one business space is in reach, ask
which one.

1. Ask which supplier, or which bills, and for the contract terms of each supplier: prices, payment
   term, price review clause, contract currency, bank details on file.
2. `orla_list_bills` for the open bills of that supplier (or `orla_get_bills_due` for the coming
   week). Then `orla_read_bill` for each bill: number, dates, currency, `line_items`, tax, total,
   `left_to_pay`, and `requisites` when the connection shows full details.
3. Read Orla's own warnings on each bill as they are:
   - `details_changed`: the payment this bill is in goes to bank details this supplier was never
     paid on through Orla. Quote `said`, `on`, `held` and `confirmed`. Outcome "Stop" until the
     person confirms the details by phone on a number they already had. A hold in Orla is released
     by someone who may sign, in Orla; never by you.
   - `looks_like`: another bill or a payment that matches this one. Name it and what matched. Outcome
     "Stop" until a person decides which one is real.
4. Recompute every line, the tax at the bill's own rate and the total; compare prices, the due date
   and the currency with the contract terms, by the rules in `prompt.md`.
5. If `requisites` is not in the answer, the connection does not show full bank details: say so and
   ask the person to compare the bank details with the contract in Orla themselves.
6. Answer in the format of `prompt.md`.

Stop there. That is the end of the recipe.

## What the connection does not show

- Contracts with suppliers, even those kept on the Bills page in Orla: the person attaches the terms.
- Full bank details, unless the connection was set up with full details on.
- Releasing a held payment or confirming new bank details: only a person who may sign, in Orla.

## Never

- Never pay, schedule a payment, mark a bill paid outside Orla, or create a bill.
- Never update a supplier's bank details, and never confirm new details by replying to the email
  that sent them.
- Never call a supplier a fraud, and never name laws, penalties or interest.
