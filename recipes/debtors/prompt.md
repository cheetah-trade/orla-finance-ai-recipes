# Prompt: who owes us and who to remind (works in any model, on a file)

Copy everything in the block below into your AI model, set the date on the first line, and attach
your receivables export (CSV or spreadsheet). The sample file next to this prompt shows the columns.

```text
Today is: 2026-11-25   <- replace with today's date, YYYY-MM-DD

You are helping me run my weekly receivables review. The attached file lists invoices I issued to
clients. Tell me who owes us money and is late, and what the next step is with each client. Prepare
reminder drafts. Send nothing and contact nobody: everything you write is a draft for me.

HOW TO READ THE FILE
- Columns I expect: invoice number, client, contact email, issue date, due date, amount, currency,
  amount paid, status, date of the last reminder, notes. If a column is missing or named differently,
  tell me which one you used for what before you go on. If a value is empty, write "no data". Never
  guess a date, an amount, an email or a name.
- Still owed = amount minus amount paid.
- An invoice is overdue only if its status is sent or partial, something is still owed, and the due
  date is before today. Paid, draft, void and cancelled rows are never overdue. Rows not due yet go in
  their own short list.
- Days late = today minus the due date, in calendar days.
- A credit note or a negative row is not an overdue invoice. List it under the client it belongs to,
  say that it is not applied yet, show the client's total both with and without it, and ask me whether
  to apply it. Do not net it silently.
- Never add amounts in different currencies. Give every total per currency.
- If two client names look like the same company (same address, same email domain, one spelled
  shorter), say so and ask me. Until I answer, show them next to each other, not merged.

HOW TO COUNT
- If you can run code or spreadsheet formulas, compute days late, still owed and every total that
  way, not in your head. If you cannot, show a working table with one row per invoice so I can check
  each figure.
- Start your answer with a control block: rows in the file, rows counted as overdue, rows not due
  yet, rows left out and why (paid, draft, credit), and the overdue total per currency. The rows must
  add up to the rows in the file.

NEXT STEP FOR EACH CLIENT (read the notes column first, it overrides the ladder)
- Note says the invoice is disputed: no reminder. Next step is to settle the dispute. Tell me what
  is disputed and what you need from me.
- Note says the client promised a payment date that has not passed: no reminder today. Next step is
  to check on the day after that date.
- Part was paid: thank them for the part, ask only for the rest.
- There is an unapplied credit or a payment that may not be matched: next step is to reconcile first,
  before anyone writes to the client.
- 1 to 14 days late and no reminder yet: a friendly reminder. Assume it was missed, ask whether
  anything is holding the payment up.
- 15 to 45 days late, or already reminded once: a firm reminder that asks for a payment date.
- More than 30 days late: add "phone them this week" next to the email.
- Two reminders with no reply, or more than 60 days late: stop repeating the same email. Next step is
  a phone call and a second, more senior contact at the client. Draft a short escalation note I can
  adapt.
- More than 90 days late: flag it for my decision. Do not propose what the decision should be.
Order the clients by what I should do first: the largest amounts and the oldest debts on top.

REMINDER DRAFTS
- One draft per client who gets a reminder today, covering all that client's overdue invoices.
- Subject line: the word "overdue", the invoice number and the amount still owed. Keep it short.
- Under 120 words. For every invoice: number, amount still owed with currency, due date, days late.
- One clear ask: pay, or reply with the date the payment will go out. Add one line asking them to
  reply if they have already paid.
- Right after the invoice details, write [payment link or bank details]. I will fill that in.
- Address it to the contact email in the file. If there is none, write "no contact on file".
- Tone: factual and polite, the tone you would use with a client you want to keep.

NEVER, on your own
- Never state late fees, interest, compensation or any amount that is not in the file.
- Never mention courts, lawyers, collection agencies, credit records or any other threat.
- Never set a deadline or a consequence I did not give you.
- Never suggest pausing work, changing terms or writing a debt off as decided. Those are my decisions:
  you may list them as questions.

FORMAT OF YOUR ANSWER
1. Control block.
2. Overdue by client: a table with invoice, still owed, due date, days late, last reminder, next step.
3. Aging per currency: 1-30, 31-60, 61-90, over 90 days.
4. Not due yet.
5. Drafts.
6. Questions for me and anything you could not work out from the file.
```

## Before you paste a client export into a model

Remove what the task does not need: bank account numbers, street addresses, tax ids, anything about
people other than the billing contact. The recipe needs only the columns listed above. Check your
company's rules on which AI tools may see client data.
