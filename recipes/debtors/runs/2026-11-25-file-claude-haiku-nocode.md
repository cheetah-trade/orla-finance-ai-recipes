Run: file mode, Claude Haiku, no code execution, 2026-11-25.

## 1. Control block

- Columns used: invoice_number = invoice number; client = client; contact_email = contact email; issue_date = issue date; due_date = due date; amount = amount; currency = currency; paid_amount = amount paid; status = status; last_reminder_date = date of last reminder; notes = notes. All expected columns are present under those names.
- Rows in the file: 14
- Rows counted as overdue: 8 (INV-1033, INV-1038, INV-1041, INV-1047, INV-1049, INV-1052, INV-1055, INV-1056)
- Rows not due yet: 2 (INV-1058, INV-1059)
- Rows left out: 4. Paid: 2 (INV-1044, INV-1050). Draft: 1 (INV-1060). Credit: 1 (CN-0007, not applied, shown under Kestrel Freight Ltd).
- Check: 8 + 2 + 4 = 14.
- Overdue total per currency: USD 30,800.00 (credit note CN-0007 not netted); EUR 6,750.00.
- Possible duplicate client: "Kestrel Freight Ltd" and "kestrel freight" share the email ap@kestrelfreight.example. Kept separate until you answer (see questions).
- Empty last_reminder_date on INV-1047, INV-1049, INV-1055, INV-1056 is treated as "no data"; I assume no reminder was sent.

## Working table (one row per invoice; days late = 2026-11-25 minus due date)

Days late example: 2026-08-19 to 2026-11-25 = 12 days (rest of August) + 30 (September) + 31 (October) + 25 (November) = 98.

| Invoice | Client | Cur | Amount | Paid | Still owed | Status | Due | Days late | Counted as |
|---|---|---|---|---|---|---|---|---|---|
| INV-1033 | Harbor Lane Design | USD | 1,250.00 | 0.00 | 1,250.00 | sent | 2026-08-19 | 98 | overdue |
| INV-1038 | Marlow & Reyes Architects | USD | 12,600.00 | 0.00 | 12,600.00 | sent | 2026-09-14 | 72 | overdue |
| INV-1041 | Kestrel Freight Ltd | USD | 8,400.00 | 0.00 | 8,400.00 | sent | 2026-09-27 | 59 | overdue |
| INV-1044 | Osprey Robotics GmbH | EUR | 6,750.00 | 6,750.00 | 0.00 | paid | 2026-10-10 | - | left out: paid |
| INV-1047 | Kestrel Freight Ltd | USD | 3,150.00 | 0.00 | 3,150.00 | sent | 2026-10-30 | 26 | overdue |
| INV-1049 | Osprey Robotics GmbH | EUR | 6,750.00 | 0.00 | 6,750.00 | sent | 2026-11-04 | 21 | overdue |
| INV-1050 | Tidewater Events | USD | 2,400.00 | 2,400.00 | 0.00 | paid | 2026-11-05 | - | left out: paid |
| INV-1052 | Juniper Dental Group | USD | 4,200.00 | 1,500.00 | 2,700.00 | partial | 2026-10-31 | 25 | overdue |
| INV-1055 | Tidewater Events | USD | 1,980.00 | 0.00 | 1,980.00 | sent | 2026-11-19 | 6 | overdue |
| INV-1056 | kestrel freight | USD | 720.00 | 0.00 | 720.00 | sent | 2026-11-24 | 1 | overdue |
| INV-1058 | Lumen Bakery Co | USD | 950.00 | 0.00 | 950.00 | sent | 2026-12-03 | -8 | not due yet |
| INV-1059 | Juniper Dental Group | USD | 4,200.00 | 0.00 | 4,200.00 | sent | 2026-12-10 | -15 | not due yet |
| INV-1060 | Lumen Bakery Co | USD | 430.00 | 0.00 | 430.00 | draft | no data | - | left out: draft |
| CN-0007 | Kestrel Freight Ltd | USD | -400.00 | 0.00 | -400.00 | credit | no data | - | left out: credit, not applied |

## 2. Overdue by client (order: what to do first, largest and oldest on top)

**1. Marlow & Reyes Architects**

| Invoice | Still owed | Due date | Days late | Last reminder | Next step |
|---|---|---|---|---|---|
| INV-1038 | USD 12,600.00 | 2026-09-14 | 72 | 2026-10-01 | Disputed: line 3 (extra revision round). No reminder. Settle the dispute first. I need from you: what was agreed for the extra round and your decision on line 3. |

**2. Kestrel Freight Ltd**

| Invoice | Still owed | Due date | Days late | Last reminder | Next step |
|---|---|---|---|---|---|
| INV-1041 | USD 8,400.00 | 2026-09-27 | 59 | 2026-10-20 | Unapplied credit CN-0007 (-400.00) points at this invoice. Reconcile first; nobody writes to the client until then. After that: firm reminder asking for a payment date, and phone them this week (over 30 days late). |
| INV-1047 | USD 3,150.00 | 2026-10-30 | 26 | none on file | Same reconcile-first step; then firm reminder asking for a payment date. |

Client total: USD 11,550.00 without the credit note; USD 11,150.00 with CN-0007 applied. The credit note is not applied and is not netted here. Do you want it applied?

**3. Osprey Robotics GmbH**

| Invoice | Still owed | Due date | Days late | Last reminder | Next step |
|---|---|---|---|---|---|
| INV-1049 | EUR 6,750.00 | 2026-11-04 | 21 | none on file | Firm reminder asking for a payment date (Draft 1). |

**4. Juniper Dental Group**

| Invoice | Still owed | Due date | Days late | Last reminder | Next step |
|---|---|---|---|---|---|
| INV-1052 | USD 2,700.00 | 2026-10-31 | 25 | 2026-11-10 | Client promised the rest by month end, which has not passed (I read "month end" as 2026-11-30; please confirm). No reminder today. Check on 2026-12-01. When you write, thank them for the USD 1,500.00 paid on 12 Nov and ask only for the rest. |

**5. Tidewater Events**

| Invoice | Still owed | Due date | Days late | Last reminder | Next step |
|---|---|---|---|---|---|
| INV-1055 | USD 1,980.00 | 2026-11-19 | 6 | none on file | Friendly reminder; assume it was missed and ask whether anything is holding the payment up (Draft 2). |

**6. Harbor Lane Design**

| Invoice | Still owed | Due date | Days late | Last reminder | Next step |
|---|---|---|---|---|---|
| INV-1033 | USD 1,250.00 | 2026-08-19 | 98 | 2026-10-01 | Two reminders with no reply: no repeat email. Phone call this week and a second, more senior contact at the client (none on file). Escalation note in Draft 3. Over 90 days: flagged for your decision. |

**7. kestrel freight (kept separate from Kestrel Freight Ltd)**

| Invoice | Still owed | Due date | Days late | Last reminder | Next step |
|---|---|---|---|---|---|
| INV-1056 | USD 720.00 | 2026-11-24 | 1 | none on file | If this is the same company as Kestrel Freight Ltd: reconcile first, no message yet. If it is a separate client: friendly reminder. No draft today until you answer. |

## 3. Aging per currency (days late, still owed)

USD
- 1-30 days: 8,550.00 (INV-1047 3,150.00; INV-1052 2,700.00; INV-1055 1,980.00; INV-1056 720.00)
- 31-60 days: 8,400.00 (INV-1041)
- 61-90 days: 12,600.00 (INV-1038)
- Over 90 days: 1,250.00 (INV-1033)
- Total: 30,800.00

EUR
- 1-30 days: 6,750.00 (INV-1049)
- Total: 6,750.00

Credit note CN-0007 (-400.00 USD) is not in any bucket.

## 4. Not due yet

- INV-1058, Lumen Bakery Co: USD 950.00, due 2026-12-03 (8 days from today)
- INV-1059, Juniper Dental Group: USD 4,200.00, due 2026-12-10 (15 days from today)

## 5. Drafts

Draft 1: Osprey Robotics GmbH

To: rechnung@ospreyrobotics.example
Subject: Overdue: INV-1049, EUR 6,750.00 still owed

Hello,

Invoice INV-1049 is overdue.
- Invoice: INV-1049
- Amount still owed: EUR 6,750.00
- Due date: 4 November 2026
- Days late: 21

[payment link or bank details]

Please pay the amount, or reply with the date the payment will be sent. If you have already paid, please reply to this email so we can match your payment.

Kind regards,
[your name]

Draft 2: Tidewater Events

To: finance@tidewaterevents.example
Subject: Overdue: INV-1055, USD 1,980.00 still owed

Hello,

Invoice INV-1055 is overdue.
- Invoice: INV-1055
- Amount still owed: USD 1,980.00
- Due date: 19 November 2026
- Days late: 6

[payment link or bank details]

We may have missed this. Is anything holding up the payment? Please pay, or reply with the date it will be sent. If you have already paid, please reply so we can match it.

Kind regards,
[your name]

Draft 3: Harbor Lane Design (escalation note for you to adapt; not a reminder email)

To: hello@harborlane.example (company contact on file). Senior contact: no contact on file.
Subject: Overdue: INV-1033, USD 1,250.00 still owed

Note for the phone call and the senior contact:

We wrote to you on 1 September and 1 October about invoice INV-1033 (USD 1,250.00 still owed, due 19 August 2026, 98 days late) and have not had a reply. We would like to understand what is holding the payment up. Please reply to this email or call [call-back details] to discuss.

No drafts today for Kestrel Freight Ltd and kestrel freight (reconcile first), Marlow & Reyes Architects (disputed) or Juniper Dental Group (promised date not passed).

## 6. Questions for you and things I could not work out from the file

1. Are "Kestrel Freight Ltd" and "kestrel freight" the same company? Same email (ap@kestrelfreight.example), one spelled shorter. Shown separately until you answer.
2. Credit note CN-0007 (-400.00 USD, against INV-1041) is not applied. Should it be applied to Kestrel Freight Ltd? Totals: USD 11,550.00 without, USD 11,150.00 with.
3. INV-1033 (Harbor Lane Design) is 98 days late, over 90 days. Flagged for your decision.
4. INV-1038 (Marlow & Reyes Architects): the dispute on line 3 needs your input before any reminder. What do you need to decide, and what evidence do you have?
5. INV-1052 (Juniper Dental Group): I read "month end" as 2026-11-30. Please confirm.
6. Harbor Lane Design has no second, senior contact on file.
7. Empty last_reminder_date on INV-1047, INV-1049, INV-1055, INV-1056 is treated as no reminder sent. Tell me if one was.
8. INV-1060 (Lumen Bakery Co) is a draft with no due date. Left out; no data.
9. Osprey Robotics GmbH invoices are in EUR and Tidewater, Kestrel and the others in USD. No conversion is made; totals are per currency.
