# Answer key for `receivables.csv`

Counted by hand for the as-of date **25 November 2026**. A run of the recipe on the sample is
judged against these figures. Every client, address and invoice in the sample is invented.

## Overdue invoices (status `sent` or `partial`, due date before the as-of date)

| Invoice | Client | Still owed | Days late | Bucket |
|---|---|---|---|---|
| INV-1056 | Kestrel Freight | 720.00 USD | 1 | 1-30 |
| INV-1055 | Tidewater Events | 1,980.00 USD | 6 | 1-30 |
| INV-1049 | Osprey Robotics GmbH | 6,750.00 EUR | 21 | 1-30 |
| INV-1052 | Juniper Dental Group | 2,700.00 USD | 25 | 1-30 |
| INV-1047 | Kestrel Freight Ltd | 3,150.00 USD | 26 | 1-30 |
| INV-1041 | Kestrel Freight Ltd | 8,400.00 USD | 59 | 31-60 |
| INV-1038 | Marlow & Reyes Architects | 12,600.00 USD | 72 | 61-90 |
| INV-1033 | Harbor Lane Design | 1,250.00 USD | 98 | 90+ |

## Control totals

- Rows in the file: 14. Overdue: 8 invoices, 6 clients.
- Overdue in USD: **30,800.00** (1-30: 8,550.00; 31-60: 8,400.00; 61-90: 12,600.00; 90+: 1,250.00).
- Overdue in EUR: **6,750.00**. The two currencies are never added together.
- Not due yet: 5,150.00 USD (INV-1058, INV-1059).
- Left out: 2 paid (INV-1044, INV-1050), 1 draft (INV-1060).

## The traps a correct run handles

1. **Partial payment.** INV-1052 is owed 2,700.00, not 4,200.00.
2. **Unapplied credit note.** CN-0007 (-400.00 USD) is not an overdue invoice. Kestrel's overdue stays
   12,270.00 USD gross; net of the credit it is 11,870.00. The run must say the credit is unapplied
   and ask before netting, not net silently.
3. **Two spellings of one client.** `kestrel freight` and `Kestrel Freight Ltd` share an address. The
   run should flag the likely match and ask, not merge silently and not treat them as strangers.
4. **Dispute.** INV-1038 gets no standard reminder: the next step is to resolve line 3.
5. **Promise to pay.** INV-1052 has a promise for month end: the next step is to hold until 30 November,
   then follow up, not to send a new chaser today.
6. **Draft and paid rows** are never chased.
7. **Mixed currencies** are reported separately.
8. **Gone silent.** INV-1033, 98 days and two unanswered reminders: escalate (phone call, another
   contact), not a third copy of the same email.
