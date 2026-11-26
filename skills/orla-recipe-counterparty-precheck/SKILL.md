---
name: orla-recipe-counterparty-precheck
description: "Preliminary check of a new client or supplier before the first payment, or of an existing one that sent new bank details: compares names, registration and VAT numbers, IBANs, domains and what the person looked up in public registers and sanctions lists, and says what matches, what does not and what was not checked. Works two ways: on live books through the Orla MCP connection (reads the contact, Orla's own screening verdict and the payments waiting), or on a list the person attaches when Orla is not connected. Use when the user asks to check, vet or verify a counterparty, supplier, vendor, contractor or client before paying them, or got an email about changed bank details. It is not a sanctions screening and not a legal opinion."
---

# Check a new client or supplier before the first payment

A preliminary check. It reads, compares and lists what is missing. It never pays, never contacts the
counterparty, never runs a paid check, and never calls anyone clean, clear, safe or sanctioned.

## Pick the mode

1. Call `orla_whoami`. If the Orla tools are there and a space is in reach, use **live books** for
   what Orla holds, and ask the person for anything else they looked up.
2. If there are no Orla tools, use **a file**: ask for the list of counterparties and what the person
   looked up, and follow `prompt.md` in this folder word for word. Ask for today's date if the person
   did not give it.

## Live books

All calls take the `space_id` from `orla_whoami`. If more than one business space is in reach, ask
which one.

1. Find each counterparty the person names: `orla_find_contacts` with `q` set to the name (and
   `tax_id` if the person gave one). If two contacts come back for one name, show both and ask which
   one; never pick one yourself. If none comes back, say the counterparty is not in Orla yet and
   check it in file mode.
2. `orla_read_contact` for each one: legal name, country, registration number, VAT or tax number,
   roles. Compare them with what the person's invoice or contract says, by the name rules in
   `prompt.md` (legal form set aside, diacritics and transliteration shown, never decided).
3. `orla_counterparty_check` for each contact. Read its answer as it is:
   - `checked: false`: Orla has no screening on file for this contact. Say so, and never call the
     contact clear. The person can run a check from the contact's page in Orla (`open_in_orla`); you
     cannot start it.
   - `stale: true`: the check is older than Orla's limit (30 days). Say how old (`checked_at`) and
     that the person should run it again before paying.
   - `matches_open` above zero: possible matches are waiting for a person's review on the contact
     page. Do not guess who they are: the connection does not give their names. Next step: review them in
     Orla before any payment.
   - `matches_not_fetched` above zero: part of the result was not fetched. Treat the check as
     incomplete.
   - `registry`: whether a company register answered (found, not found, not consulted). "Not
     consulted" means not checked, not "fine".
   Quote `verdict_words` as Orla's words, not yours, with `checked_at`: it is the result of Orla's
   screening on that date, not permission to pay. For an open match Orla's word may be
   "sanctioned" before anyone has reviewed it: say that the match is waiting for review.
4. `orla_get_payment_queue` (and `who` set to the counterparty if the person names one): what is
   waiting to be paid to these counterparties, amounts per currency, never added across currencies.
5. Ask the person for what Orla does not hold: an email that changes bank details, what they found
   in a register, a domain date. Then follow the outcome rules in `prompt.md`: "nothing found in what
   was checked", "clarify before paying", or "stop: do not pay until confirmed".

Stop there. That is the end of the recipe.

## What the connection does not show

- The names behind possible matches: the person sees them on the contact's page in Orla.
- Starting a screening, which may cost the space a check: only the person, in Orla.
- Bank details of the contact and their history: the person checks them in Orla before paying.
- Orla's own fraud monitoring of payouts: in Orla, not through this connection.

## Never

- Never write "clean", "clear", "safe", "sanctioned", "fraud" or "criminal" as a verdict.
- Never contact the counterparty, never confirm new bank details by replying to the email that sent
  them, never pay.
- Never name laws from memory. Send the person to a lawyer, the bank or the compliance officer when a
  sanctions match cannot be ruled out or a payment already went to details that now look wrong.
