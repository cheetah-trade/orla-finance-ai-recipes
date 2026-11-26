Run: file mode, Claude Sonnet, code execution allowed, 2026-11-25.

Columns: all eleven expected columns are present under the expected names (invoice_number, client, contact_email, issue_date, due_date, amount, currency, paid_amount, status, last_reminder_date, notes). I used paid_amount as "amount paid" and last_reminder_date as "date of the last reminder". All figures below were computed with code.

## 1. Control block

- Rows in the file: 14
- Counted as overdue: 8 (INV-1033, 1038, 1041, 1047, 1049, 1052, 1055, 1056)
- Not due yet: 2 (INV-1058, INV-1059)
- Left out: 4 (INV-1044 paid, INV-1050 paid, INV-1060 draft, CN-0007 credit note)
- Check: 8 + 2 + 4 = 14
- Overdue total, still owed: USD 30,800.00; EUR 6,750.00

## 2. Overdue by client (most important first)

Marlow & Reyes Architects, accounts@marlowreyes.example

| Invoice | Still owed | Due date | Days late | Last reminder | Next step |
|---|---|---|---|---|---|
| INV-1038 | USD 12,600.00 | 2026-09-14 | 72 | 2026-10-01 | Disputed (line 3, extra revision round). No reminder. Settle the dispute first. |

What I need from you: your position on line 3 (is the extra revision round billable, was it agreed, is there a document that shows it), and who talks to the client about it. The part of the invoice that is not disputed is not separated in the file, so I do not know how much of the 12,600.00 is undisputed. Over 60 days late.

Kestrel Freight Ltd, ap@kestrelfreight.example

| Invoice | Still owed | Due date | Days late | Last reminder | Next step |
|---|---|---|---|---|---|
| INV-1041 | USD 8,400.00 | 2026-09-27 | 59 | 2026-10-20 | Reconcile first (see below) |
| INV-1047 | USD 3,150.00 | 2026-10-30 | 26 | no data | Reconcile first |
| INV-1056 (listed as "kestrel freight") | USD 720.00 | 2026-11-24 | 1 | no data | Reconcile first, and confirm it is the same client |

- Unapplied credit: CN-0007, USD -400.00, a credit note against INV-1041, not applied yet. It is not an overdue invoice.
- Client total of the two invoices under "Kestrel Freight Ltd": USD 11,550.00 without the credit, USD 11,150.00 with it.
- If "kestrel freight" is the same company (same email, different spelling), the total is USD 12,270.00 without the credit and USD 11,870.00 with it. Until you answer I show the 720.00 invoice separately and have not merged it.
- No reminder draft for this client: the credit has to be reconciled before anyone writes to them. INV-1041 is 59 days late, so once it is reconciled the ladder says a firm reminder plus "phone them this week" (it was reminded once on 2026-10-20).

Harbor Lane Design, hello@harborlane.example

| Invoice | Still owed | Due date | Days late | Last reminder | Next step |
|---|---|---|---|---|---|
| INV-1033 | USD 1,250.00 | 2026-08-19 | 98 | 2026-10-01 | Two reminders (1 Sep, 1 Oct), no reply: no third identical email. Phone them this week and find a second, more senior contact. Escalation note below. Over 90 days late: flagged for your decision. |

Osprey Robotics GmbH, rechnung@ospreyrobotics.example

| Invoice | Still owed | Due date | Days late | Last reminder | Next step |
|---|---|---|---|---|---|
| INV-1049 | EUR 6,750.00 | 2026-11-04 | 21 | no data | Firm reminder that asks for a payment date. Draft 1 below. |

INV-1044 (EUR 6,750.00) is paid and left out. It has the same amount as INV-1049, which I mention only so you can check that the payment was matched to the right invoice.

Juniper Dental Group, billing@juniperdental.example

| Invoice | Still owed | Due date | Days late | Last reminder | Next step |
|---|---|---|---|---|---|
| INV-1052 | USD 2,700.00 (4,200.00 minus 1,500.00 paid) | 2026-10-31 | 25 | 2026-11-10 | The client paid part and promised the rest "by month end". No reminder today. Check on the day after that date. If month end means 2026-11-30, that is 2026-12-01. |

When you do write: thank them for the 1,500.00 and ask only for the 2,700.00.

Tidewater Events, finance@tidewaterevents.example

| Invoice | Still owed | Due date | Days late | Last reminder | Next step |
|---|---|---|---|---|---|
| INV-1055 | USD 1,980.00 | 2026-11-19 | 6 | no data | Friendly reminder. Draft 2 below. |

## 3. Aging per currency (still owed, overdue invoices only)

USD

| Bucket | Amount | Invoices |
|---|---|---|
| 1-30 days | 8,550.00 | INV-1047 (26), INV-1052 (25), INV-1055 (6), INV-1056 (1) |
| 31-60 days | 8,400.00 | INV-1041 (59) |
| 61-90 days | 12,600.00 | INV-1038 (72) |
| Over 90 days | 1,250.00 | INV-1033 (98) |
| Total | 30,800.00 | |

EUR

| Bucket | Amount | Invoices |
|---|---|---|
| 1-30 days | 6,750.00 | INV-1049 (21) |
| 31-60 / 61-90 / over 90 | 0.00 | |
| Total | 6,750.00 | |

## 4. Not due yet

| Invoice | Client | Still owed | Due date | Days until due |
|---|---|---|---|---|
| INV-1058 | Lumen Bakery Co | USD 950.00 | 2026-12-03 | 8 |
| INV-1059 | Juniper Dental Group | USD 4,200.00 | 2026-12-10 | 15 |

Total not due yet: USD 5,150.00.

Also left out: INV-1060 (Lumen Bakery Co, USD 430.00) is a draft with no due date. It is not counted anywhere.

## 5. Drafts (nothing is sent)

Draft 1: Osprey Robotics GmbH

To: rechnung@ospreyrobotics.example
Subject: Overdue: INV-1049, EUR 6,750.00

Hello,

Our records show this invoice is still open:

- INV-1049: EUR 6,750.00 still owed, due 2026-11-04, 21 days late.

[payment link or bank details]

Please pay it, or reply with the date the payment will go out. If you have already paid, please reply and we will check on our side.

Thank you,
[your name]

Draft 2: Tidewater Events

To: finance@tidewaterevents.example
Subject: Overdue: INV-1055, USD 1,980.00

Hello,

This is a friendly note: I think INV-1055 may have been missed.

- INV-1055: USD 1,980.00 still owed, due 2026-11-19, 6 days late.

[payment link or bank details]

Please pay it, or reply with the date the payment will go out. Is anything holding it up? If you have already paid, please reply and we will check on our side.

Thank you,
[your name]

Escalation note (Harbor Lane Design, for you to adapt, not a reminder email)

Call talking points: INV-1033, USD 1,250.00, due 2026-08-19, 98 days late. Two written reminders (1 Sep, 1 Oct) got no reply. Ask: is the invoice received and accepted, is anything blocking payment, and who else at Harbor Lane Design handles payments or can decide on them. Ask for a payment date. Note their answer and the second contact's name and email.

Short note to the second contact, to adapt:

Subject: Overdue: INV-1033, USD 1,250.00

Hello [name],

I am writing to you because my earlier emails to hello@harborlane.example about INV-1033 (USD 1,250.00, due 2026-08-19) have had no reply. I would like to find out what is holding it up and agree a payment date. [payment link or bank details] If it has already been paid, please let me know.

Thank you,
[your name]

I did not write a draft for Marlow & Reyes, Kestrel Freight or Juniper Dental, because the next step for each is not a reminder today.

## 6. Questions for you and what I could not work out

1. Harbor Lane Design, INV-1033, 98 days late: this is over 90 days, so it is your decision. I have not proposed what it should be. Decision needed: what do you want to do with this invoice, and who owns the phone call?
2. Is "kestrel freight" (INV-1056, USD 720.00, same email ap@kestrelfreight.example) the same company as "Kestrel Freight Ltd"? Until you say, I show them separately.
3. Do you want CN-0007 (USD -400.00) applied to INV-1041? If yes, INV-1041 would be USD 8,000.00 still owed. I have not applied it. Please also check that nothing else for Kestrel was paid and not yet matched, because the file shows no payments for these three invoices.
4. Marlow & Reyes, INV-1038: what do you need from the client, and is any part of the invoice not in dispute? Do you want me to draft a message that is not a reminder, for example a note that explains the line 3 charge?
5. Juniper Dental Group: the note says "by month end". I assumed 2026-11-30, so the check-in is 2026-12-01. Please confirm. The file also shows a last reminder on 2026-11-10 but the payment note says the part payment came on 12 Nov, so the order of those events is worth a look.
6. Osprey Robotics, INV-1049: no earlier reminder is on file, and I used the firm reminder because it is 21 days late (15-45 range). Tell me if you want a softer tone for this client.
7. Not in the file and so not known: contact names, any payment terms beyond the due dates, and what happened on the calls before the reminders were sent. I did not guess any of them.
