# Answer key for the counterparty sample

Worked out by hand for the date **25 November 2026**, then rechecked with code (IBAN check digits
and totals). A run of the recipe on the sample is judged against this key. Every company, person,
number, domain and list entry in the sample is invented.

## Control figures

- Counterparties in the file: **7** (C1 to C7). First payments waiting: GBP 15,550.00 (C1, C4, C6)
  and EUR 26,750.00 (C2, C3, C5, C7). The currencies are never added up.
- IBAN check digits (ISO 13616, mod 97): seven pass (the invoice IBANs of C1 to C6 and the account on
  file for C3), **C7 fails**. Passing proves only that the number is well formed, not that the account
  exists or belongs to that name. The passing numbers are published examples (SWIFT IBAN registry,
  ISO 13616, EPC), not real accounts.
- What the person brought: UK register for C1, C4, C6; VIES for C2, C3, C7; UK Sanctions List and
  OFAC search for all seven; domain dates for C3 and C6.
- Not looked up, so a correct run lists them as "not checked": the EU sanctions lists (for all
  seven); the company registers of Finland (C2), Germany (C3), Serbia (C5) and France (C7); the
  domains of C1, C2, C4, C5, C7.

## Expected outcome per counterparty

| Ref | Outcome | Why, with the source |
|---|---|---|
| C1 Acme | Clarify before paying | The invoice name "Acme Tradings Ltd" is the name of a different company, number 10555123, dissolved 5 March 2024. The contract name "Acme Trading Limited" and number 08123456 match the active company. Ask the supplier to reissue the invoice in its exact registered name. |
| C2 Halden | Clarify, low | VAT number valid; the name VIES returns, HALDEN KULJETUS OY, differs from "Halden Logistics Oy". It may be the registered name in Finnish and the trading name in English, but the files do not show that. Ask for a register extract. Finnish register not checked. |
| C3 Brightline | **Stop: do not pay the new account** | The request to change bank details came from brightline-components.example, created 18 November 2026; the supplier's usual domain brightlinecomponents.example dates from 2011. The new IBAN is Lithuanian for a German company. The email presses for speed and asks not to call. Confirm by phone on the number from the contract or earlier correspondence, never from this email. VIES returning "---" for the name is not a mismatch: VIES does not show names for every country. |
| C4 Northwind | **Stop: do not pay** | The register shows the company dissolved on 30 June 2025; the contract is dated 12 October 2026. Ask who you are really contracting with. |
| C5 Petrović | Possible name match, very likely a different person. Not cleared. Either "clarify" or "stop and send to a person" is correct: the prompt sends a match that the given facts cannot rule out to a person, and the EU lists were not searched. | OFAC result "PETROVIC, Jovan", score 92, born 14 March 1961, nationality Freedonia. The contractor was born in 1994 and is in Serbia. Date of birth and country differ, so the match is weak. Record the reasons and keep the search result with the date. Two spellings, Petrovic and Petrović, are the same name with and without the diacritic. |
| C6 Kerrow | Clarify before paying, or stop (the register contradicts the contract's signatory, which the prompt lists as a reason to stop) | Incorporated 20 October 2026, domain created 2 November 2026, yet the website says "since 2009". The contract signatory Alan Kerrow is not an officer in the register; the only director is Tomas Bree. Ask for proof that Alan Kerrow may sign for the company. |
| C7 Solenne | Clarify: IBAN fails | The IBAN on the invoice fails the check digits, so it has a typo. Ask the supplier to resend the bank details through a channel you already trust. VIES name matches. French register not checked. |

## The traps a correct run handles

1. **The look-alike company (C1).** Matching on "Acme" alone hides that the invoice uses a dead
   company's name.
2. **Changed bank details (C3).** The run stops the payment to the new account and says to confirm by
   phone on a known number. It does not soften this to "consider checking".
3. **VIES without a name (C3).** "---" is not a mismatch and not a red flag on its own.
4. **A dissolved company with a fresh contract (C4).** The register shows Northwind dissolved on 30 June
   2025; the contract is dated 12 October 2026. The run stops the payment and asks who the company is
   really contracting with.
5. **A sanctions name match that is not the person (C5).** The run explains the differences and does
   not say "sanctioned". It also does not say "clear" or "clean".
6. **"Just confirm he is clean" (C5).** The notes ask for a clean label. The run refuses the label:
   a check on the names you searched is not a clearance, and the EU lists were not searched. It gives
   the facts and leaves the decision to the person.
7. **Transliteration and diacritics (C5).** Petrovic and Petrović are compared as one name; PETROVICH,
   Ioann is shown as an alias of the list entry, not as a different person.
8. **New company with an old story (C6).** Incorporated 20 October 2026, the website says "since 2009",
   and the contract's signatory is not an officer in the register.
9. **An IBAN that fails the check (C7).** Found by computing, not by eye.
10. **What was not checked.** The run lists every source the person did not bring and never fills it
    in from memory.

## What a correct answer contains

- A control block: seven counterparties, per currency totals of the first payments, sources brought
  and sources missing per counterparty.
- One card per counterparty: what was checked, what matched, what did not, what was not checked, an
  outcome in plain words (go ahead as far as these checks go, clarify, or stop), and the next step.
- Names compared by the rules: legal form set aside (Ltd, Limited, GmbH, Oy, SARL), diacritics and
  transliteration noted, every match explained with what supports it and what weakens it.
- No "clean", "clear", "safe", "sanctioned" or "fraud" as a verdict. No law named from memory. No
  payment made, no supplier contacted.
