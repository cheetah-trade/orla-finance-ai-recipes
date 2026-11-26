---
name: orla-recipe-debtors
description: "Weekly receivables review: who owes the business money and is late, the next step with each client, and payment reminder drafts. Works two ways: on live books through the Orla MCP connection (reads invoices, previews reminders, sends one only on the person's yes for that invoice), or on a CSV or spreadsheet export from any accounting system when Orla is not connected. Use when the user asks who owes them money, which invoices are overdue, who to chase or remind, for an aged receivables or AR aging review, or for a payment reminder email."
---

# Who owes us and who to remind

A weekly review of money clients owe. It reads, counts and drafts. It never moves money, and it
sends a reminder only after the person has seen that exact letter and said yes to it.

## Pick the mode

1. Call `orla_whoami`. If the Orla tools are there and a space is in reach, use **live books**.
2. If there are no Orla tools, use **a file**: ask for a receivables export and follow `prompt.md`
   in this folder word for word. Ask for today's date if the person did not give it.

Do not mix the modes in one answer.

## Live books

All calls take the `space_id` from `orla_whoami`. If more than one business space is in reach, ask
which one.

1. `orla_get_debtors`: the clients who are late to pay, as of `as_of`, one row per client in Orla
   (by contact, so two spellings of one client's name on the invoices are one row). Each row has
   what the client owes in each currency (`owed_by_currency`) and in the base currency
   (`owed_in_base`, a conversion), `days_late` on the oldest invoice, the invoice `numbers`,
   `reminders` sent after the due day and `last_reminded_on`, `answered_on`, `promised_on`,
   `reminders_paused_on` (the client replied and reminders wait for the person), how the client
   paid before (`paid_in_year`, `paid_on_time` over the last year, `usual_days_late`), and Orla's
   `next_step` with why in `said`. `said` is in English: say it in the person's language.
   `numbers` is one string of invoice numbers separated by commas. Reminders and answers count
   over the last `history_days`. Invoices named in `unpriced_invoices` are left out of
   `owed_in_base`: name them. Use these figures as they are: do not count days or totals again.
2. Totals: `overdue_by_currency`, one line per currency, never added across currencies.
   `overdue_in_base` is a conversion: say so if you quote it. `not_yet_due` is what is owed and
   not late yet, in the base currency (a conversion too): say so. If `rows_not_shown` is above
   zero, say how many clients are not listed.
3. `contested` lists the late invoices the person marked as disputed. They are not chased: name
   them in their own short list, with `contested_by_currency`, never in a total or a reminder. The
   reason is in Orla. If `contested_not_shown` is above zero, say how many are not listed.
4. `orla_list_invoices` (filter by `contact_id` from the row) or `orla_read_invoice` only when you
   need one invoice's due date, payments or lines to explain a figure.
5. Build the review: overdue by client with invoices, still owed by currency, days late, last
   reminder, the promise or the pause if there is one, and the next step; totals per currency;
   the contested list; what is not due yet.
6. The next step: start from Orla's `next_step` and `said`, and check it against the ladder in
   `prompt.md`. If they differ, show both and say which you recommend and why. `promised_on`
   today or later means wait, not remind; `promised_on` in the past means the promise was
   broken: say so and follow the ladder. A pause (`reminders_paused_on`) means the client
   answered: the person reads the reply in Orla before anything is sent. More than 90 days late
   is the person's decision whatever Orla suggests. `answered_on` and `reminders` do not see a
   reply the client sent by email: ask the person whether the client wrote back by email, and
   about disputes or payment plans agreed outside Orla.
7. For each invoice that should get a reminder today, call `orla_preview_invoice_reminder` with the
   invoice number (for example `invoice: "INV-0042"`). It sends nothing. Show the person who the
   letter goes to (to and cc), the subject, the text and the amount owed. If the answer says
   `allowed_to_send: false`, this connection may not send: tell the person the reminder is sent from
   Orla itself. A client with several late invoices gets one preview per invoice: show them
   together under the client.

Stop there. That is the end of the recipe.

### Sending

Only if the person, after reading a preview, says yes to that invoice: call
`orla_send_invoice_reminder` with the same invoice and its `preview_id`. A yes for one invoice is not
a yes for another. Recipients come from the client's card in Orla: to change them the person edits
the client in Orla, you cannot.

## Never

- Never state late fees, interest, compensation or any amount the books do not show.
- Never mention courts, lawyers, collection agencies or credit records.
- Never present pausing work, changing terms or writing a debt off as decided: list them as questions.
- Never send without a yes for that invoice, and never promise that a sent letter can be recalled.

## What to tell the person to check

- Payments that arrived but are not matched to an invoice yet: reconcile before anyone is chased.
- Disputes and payment plans agreed outside Orla (the ones recorded in Orla are in the answer).
- The recipients on each preview.
