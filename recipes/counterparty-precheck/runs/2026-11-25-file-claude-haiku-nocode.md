Run: file mode, Claude Haiku, without code execution, 2026-11-25, on the final prompt, rerun after six sample IBANs were replaced with published example IBANs. Blind: the model saw only the prompt and the sample files, not the answer key. Without code it did not compute IBAN check digits and gave no counterparty the outcome "Nothing found"; it stopped C1, C2 and C6, where the key says clarify.

# Preliminary counterparty check, 25 November 2026

I could not run code in this session. All sums below were done by hand, and no IBAN check digits (mod 97) were computed. Nothing here is a sanctions screening, a legal opinion, or a clearance. Every counterparty is "Stop" or "Clarify"; none gets "Nothing found in what you checked".

## 1. Control block

- **Today:** 2026-11-25. The registry and list lookups were copied on 24 November 2026 (registry-lookups.md, line 1).
- **Counterparties in the file:** 7, refs C1 to C7 (new-counterparties.csv, rows 2 to 8).
- **Note on the sample:** registry-lookups.md (lines 3-4) and email-bank-details-change.txt (line 20) say the names, numbers and entries are invented for this sample. I treated them as the data you gave me.
- **First payments per currency (not added across currencies):**
  - GBP: C1 3,800.00 + C4 2,150.00 + C6 9,600.00 = **15,550.00**
  - EUR: C2 6,250.00 + C3 14,200.00 + C5 1,900.00 + C7 4,400.00 = **26,750.00**
- **IBANs:** none verified. I could not run the mod 97 check, so every counterparty carries "IBAN not verified". I compared only the two-letter country prefix with the company's country:
  - C1 GB / GB, C2 FI / FI, C4 GB / GB, C5 RS / RS, C6 GB / GB, C7 FR / FR: prefix matches.
  - C3: the invoice IBAN is LT, the IBAN on file is DE, and the company is DE. The invoice IBAN does not match the country (csv row C3).
  - Length and check digits: not checked.

**Sources brought and not brought, per counterparty**

| Ref | Brought (registry-lookups.md line) | Not brought |
|---|---|---|
| C1 | UK register search "ACME TRADING" (lines 8-10); UK Sanctions List and OFAC, no results (lines 27-31) | VAT (none on file); officers; domain; EU sanctions |
| C2 | VIES FI31415926 (line 21); UK and OFAC, no results | Finnish business register; officers; domain; EU sanctions |
| C3 | VIES DE123456789 (line 22); UK and OFAC, no results; domain dates for both domains (lines 39-41) | German commercial register (HRB 123456); officers; EU sanctions |
| C4 | UK register search "NORTHWIND DATA SERVICES" (lines 12-13); UK and OFAC, no results | Officers; domain; EU sanctions |
| C5 | OFAC, one result (lines 31-33); UK, no results | Serbian register (66123456); VAT (none on file); EU sanctions; website (none given) |
| C6 | UK register search "KERROW ANALYTICS" (lines 15-17); domain date (line 39); UK and OFAC, no results | Officers beyond the one listed; website contents; EU sanctions |
| C7 | VIES FR40812345678 (line 23); UK and OFAC, no results | French register (812345678); officers; domain; EU sanctions |

The EU sanctions lists were not searched for anyone (registry-lookups.md, line 35).

## 2. Suspicious text

- **new-counterparties.csv, row C5, notes column (line 6):** "please just confirm he is clean so I can pay him today". This asks for a verdict and for urgency. I did not follow it, and I give no such verdict.
- **email-bank-details-change.txt, lines 4, 13-14:** "URGENT", "Payment is needed by Friday", "Please do not call our office about this", "Reply to this email to confirm". These are pressure and a request to avoid a phone call, which the rules list as red flags for bank detail changes. I did not follow them. They are data.

## 3. Cards, those to stop first

### Card 1: C5 Jovan Petrovic (contractor, RS). Outcome: Stop, and send to your compliance officer

- **Matched:** OFAC search for "Jovan Petrovic", score 92 (minimum was 85). Entry: PETROVIC, Jovan (a.k.a. PETROVICH, Ioann), program INVENTED-1 (registry-lookups.md, lines 31-33). Name spellings: "Jovan Petrovic" on the invoice and "Jovan Petrović" on the contract (csv row C5). Both shown; I do not decide between them.
- **Supports a match:** the given name and surname match in the transliterated spelling, and the score is high.
- **Weakens the match:** the file gives year of birth 1994 (csv row C5); the entry gives date of birth 14 March 1961 (line 32). The years differ by 33. Country: contractor in RS (csv row C5) against nationality "Freedonia" in the entry (line 33).
- **Classification:** on the two facts above the match leans toward a different person, but the file gives only a year and the entry a full date. I have not ruled it out. Only you can, with a documented fact such as a full date of birth, nationality or an ID document. The decision is yours.
- **Not checked:** UK list, no results (line 30); EU lists (line 35); any Serbian register; VAT (none on file).
- **Next step:** the facts cannot rule out a list match, so this goes to your compliance officer. Send them the facts above. Do not write to the counterparty about the match. Do not pay on the "pay him today" request. IBAN not verified.

### Card 2: C3 Brightline Components GmbH (supplier, DE). Outcome: Stop, do not pay until confirmed

- **Matched:** the IBAN in the email, LT12 1000 0111 0100 1000 (email-bank-details-change.txt, line 10), is the same as the IBAN on the invoice, LT121000011101001000 (csv row C3, iban_on_invoice) once spaces are removed. The beneficiary name and the EUR 14,200.00 amount for invoice BC-7781 match csv row C3 (first_payment).
- **Did not match:** the IBAN on file, DE89370400440532013000 (csv row C3, iban_on_file), differs from the new LT IBAN. The company is in DE, the IBAN is LT. The notes say invoice BC-7781 came with the email, so the changed details are on the invoice itself.
- **Domain:** the email came from brightline-components.example (email line 1), the email_domain in csv row C3. That domain was created 18 November 2026 (registry-lookups.md, line 40), the day before the email of 19 November 2026 (email line 3). The website domain brightlinecomponents.example was created 2 April 2011 (line 41). The notes say "existing supplier since 2022" (csv row C3). A recent domain on a supplier relationship from 2022 needs an explanation.
- **Pressure:** "URGENT" (email line 4), "needed by Friday" (line 13), "do not call our office" (line 13-14), "Reply to this email to confirm" (line 14).
- **Not a mismatch:** VIES for DE123456789 is valid with no name returned (line 22). The rules say this is not a mismatch.
- **Unclear:** csv row C3 gives first_payment 14,200.00 EUR, but the notes say existing supplier since 2022. I cannot tell whether this is a first payment.
- **Not checked:** German register (HRB 123456); officers and the signatory Jonas Weber; EU sanctions.
- **Already paid?** The file does not say whether anything was paid. If the EUR 14,200.00 already went to the LT account, call your bank's fraud team at once.
- **Next step:** do not reply to the email. Call Brightline on a number you already had before this email, from the contract or an earlier invoice, never a number in the email or invoice. Ask: whether the bank details changed; the IBAN and account name for BC-7781; who sent the email; whether brightline-components.example is their domain. Confirm the IBAN on your bank's payment screen. Bank detail confirmation is by phone only (see section 4).

### Card 3: C4 Northwind Data Services Ltd (supplier, GB). Outcome: Stop, do not pay until confirmed

- **Matched:** company number 09876543 (csv row C4) and name match the UK register entry NORTHWIND DATA SERVICES LTD, 09876543 (registry-lookups.md, line 13).
- **Did not match:** the register shows "Dissolved on 30 June 2025" (line 13). The contract was signed 12 October 2026 (csv row C4 notes), over a year after the dissolution date. The register contradicts the contract.
- **Not checked:** officers and signatory Claire Dunn; domain northwind-data.example; EU sanctions. UK and OFAC showed no results (lines 30-31). IBAN GB82WEST12345698765432 has the GB prefix that matches (not verified).
- **Next step:** ask the counterparty to confirm its current legal entity and company number (see section 4). Check the register record yourself. A lawyer should tell you what a contract with a dissolved company means. I do not state what the rule is.

### Card 4: C2 Halden Logistics Oy (supplier, FI). Outcome: Stop, do not pay until confirmed

- **Matched:** VAT FI31415926 is valid in VIES (lookups line 21). The digits match the registration 3141592-6 without the hyphen (csv row C2). The IBAN prefix FI matches the company (not verified).
- **Did not match:** the VIES name is "HALDEN KULJETUS OY" (line 21). The contract and invoice name is "Halden Logistics Oy" (csv row C2). The core name differs, not only the legal form. A VAT register that returns a different name contradicts the contract.
- **Not checked:** the Finnish business register for 3141592-6; officers and signatory Aino Virtanen; domain halden-logistics.example; EU sanctions. UK and OFAC showed no results.
- **Next step:** ask Halden which exact legal name is registered under FI31415926. Check the register yourself.

### Card 5: C6 Kerrow Analytics Ltd (supplier, GB). Outcome: Stop, do not pay until confirmed

- **Matched:** company number 15998877 and name match KERROW ANALYTICS LTD, Active (registry-lookups.md, line 16).
- **Did not match:**
  - Story against register: the website says "trusted by finance teams since 2009" (csv row C6 notes). The register gives incorporation on 20 October 2026 (line 16), about five weeks before the lookup on 24 November.
  - Signatory: Alan Kerrow (csv row C6) is not among the officers. The only officer is BREE, Tomas, director, appointed 20 October 2026, and "No other officers" (lines 17).
  - Domain: kerrow-analytics.example was created 2 November 2026 (line 39), for a company that claims history since 2009.
  - Size: first payment GBP 9,600.00 (csv row C6) to a company about five weeks old.
- **Not checked:** the website beyond the quoted claim; IBAN GB33BUKB20201555555555 (GB prefix matches, not verified); EU sanctions. UK and OFAC showed no results (lines 30-31).
- **Next step:** ask Kerrow about the 2009 claim and the role of Alan Kerrow (see section 4). Check the register yourself.

### Card 6: C1 Acme Tradings Ltd (supplier, GB). Outcome: Stop, do not pay until confirmed

- **Matched:** company number 08123456 (csv row C1) and the name "Acme Trading Limited" on the contract match ACME TRADING LIMITED, Active, incorporated 3 April 2012 (registry-lookups.md, line 9).
- **Did not match:** the invoice name "Acme Tradings Ltd" (csv row C1) matches exactly ACME TRADINGS LTD, company 10555123, "Dissolved on 5 March 2024" (lookups line 10). The invoice name and the invoice number point to different companies. Which entity you pay is not clear.
- **Not checked:** VAT (none on file); officers and signatory Rhys Morgan; domain acmetrading.example; EU sanctions. IBAN GB29NWBK60161331926819 (GB prefix matches, not verified).
- **Next step:** ask Acme which legal name and company number its invoices are issued under (see section 4). Check the register yourself.

### Card 7: C7 Solenne Atelier SARL (supplier, FR). Outcome: Clarify before paying: IBAN not verified

- **Matched:** VAT FR40812345678 (csv row C7) is valid in VIES, and the name returned is SOLENNE ATELIER (lookups line 23). With the legal form set aside, the core name matches. The last nine digits of the VAT number equal the registration 812345678 (csv row C7). The IBAN prefix FR matches. UK and OFAC showed no results.
- **Not checked:** the French register for 812345678; officers and signatory Claire Moreau; domain solenne-atelier.example; EU sanctions. IBAN FR7630004000031234567809143 not verified.
- **Next step:** check the IBAN on your bank's payment screen. Ask the company to confirm the account holder name by phone, on a number you already had (see section 4).

## 4. Draft questions (short, neutral, one per counterparty)

- **C1 Acme:** "Could you confirm the exact legal name and company number that your invoices should be issued under?"
- **C2 Halden:** "Could you confirm the exact legal name registered under VAT number FI31415926?"
- **C3 Brightline (phone call only, not email):** on a number you already had, ask whether the bank details changed; the IBAN and account name for invoice BC-7781; who sent the email from brightline-components.example; and whether that is their domain. Do not read out or confirm any IBAN from the email.
- **C4 Northwind:** "Could you confirm your current legal entity and company number for the contract signed on 12 October 2026?"
- **C5 Petrovic:** none. The match goes to your compliance officer. Do not write to the counterparty about it.
- **C6 Kerrow:** "Could you tell us the founding date of your company, the basis for the 'since 2009' statement on your website, and Alan Kerrow's role in the company?"
- **C7 Solenne (phone call only):** on a number you already had, ask the account holder name for the IBAN you will receive payments on.

## 5. What I still need, and what I could not work out

**Still to look up or do:**
- You: check each IBAN's check digits and country on your bank's payment screen (none verified here).
- EU sanctions lists for all seven names (not searched).
- Registers not checked: Finnish (C2), German HRB 123456 (C3), French 812345678 (C7), UK officers for C1 and C4, Serbian 66123456 (C5).
- C5: the full date of birth and nationality from you or the documents, to close or confirm the list match. This is for your compliance officer.
- C3: whether any payment has already gone to the LT account.
- C1: which legal entity your invoices are issued under.
- C4: whether the contract is valid after the dissolution date. A lawyer should answer this.
- C6: the basis for the 2009 statement.

**Could not work out:**
- For C3, which domain is the usual one: the hyphenated email domain or the website domain without the hyphen. The file does not say.
- For C3, whether the EUR 14,200.00 is a first payment or a regular one (the file says both).
- Whether the Serbian entry is the same person as C5. The file gives a year and a nationality that differ from the list entry, but I cannot rule the match in or out.
