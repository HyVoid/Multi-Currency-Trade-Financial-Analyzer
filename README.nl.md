[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Volg echte winst, FX-blootstelling, kredietrisico en werkkapitaal over Europa–Afrika handelsoperaties heen

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange.svg)

**Een gratis beslissingsondersteunend framework zonder installatie voor het berekenen van winstgevendheid op transactieniveau, FX-realisatierisico, blootstelling aan klantkrediet, financieringskosten van leveranciers en werkkapitaal over multivaluta import-/exportoperaties heen.**

**Geen registratie. Geen installatie. Gratis in uw browser.**

Probeer de browserversie gratis. Als u de Excel-versie nodig heeft, kunt u die kopen met 30 dagen geld-terug-garantie, zonder vragen.
>
> 🌐 **Open in browser** → [HTML-versie](https://hyvoid.github.io/Multi-Currency-Trade-Financial-Analyzer/)
>
> 📥 **Download Excel** → GitHub Release / [website](https://www.theseusworkshop.com/)-versie
>
> Beschikbaar in zowel **browsergebaseerde HTML** als **native Excel**-formaten.

---

## Wat het helpt volgen

* Werkelijk gerealiseerde winst na valutakoersomrekening, in plaats van papierwinst op factuurdatum.
* Aanbetalingen van klanten, termijnbetalingen, openstaande saldi's en verlate kredietblootstelling.
* Financieringskosten van leveranciers en hun impact op transactiewinstgevendheid.
* Werkkapitaalpositie over kas, vorderingen en verplichtingen heen.
* Valutaverliezen verborgen tussen verkoopuitvoering en valutakoersomrekening.
* Winstgevendheid, liquiditeit en financieringsprestaties op individueel transactieniveau.

---

## Waarom ik dit heb gebouwd

Veel Europa–Afrika handelsbedrijven hebben in feite geen boekhoudprobleem.

Ze hebben een **beslissingszichtbaarheidsprobleem**.

Een typische transactie kan beginnen met de aankoop van voorraad in EUR of USD, de gedeeltelijke financiering van die aankoop via leverancierskrediet, de verkoop van producten in NGN, KES of XOF, de inning van betalingen via aanbetalingen en termijnen, en uiteindelijk de terugomrekening van lokale valuta naar EUR of USD.

Op papier lijkt de transactie winstgevend.

In werkelijkheid vernietigen wisselkoersbewegingen, vertraagde inningen, financieringskosten en partiele afrekeningen vaak de winstgevendheid lang voordat het management beseft wat er is gebeurd.

Het analytische falen ontstaat omdat financiële informatie meestal per boekhoudcategorie is georganiseerd:

* inkopen,
* verkopen,
* leningen,
* betalingen,
* valuta.

Maar managementbeslissingen worden per **transactie** genomen, niet per boekhoudrekening.

Ik heb dit werkboek gebouwd als een herbruikbaar redeneerkader dat elke transactie reconstrueert via een gemeenschappelijke **Deal-ID**, waardoor de volledige economische levenscyclus van een handel als één geheel kan worden beoordeeld.

### Voorbeeld

| Vooraf                     | Na                     |
| -------------------------- | ------------------------- |
| Inkoop: €40.000          | Inkoop: €40.000         |
| Verkoop: ₦85.000.000          | Verkoop: ₦85.000.000         |
| Veronderstelde FX: 1 EUR = ₦2.000 | Werkelijke FX: 1 EUR = ₦2.450 |
| Geschatte winst: €2.500   | Gerealiseerde winst: -€3.800  |

Zonder afstemming op transactieniveau concludeert het management:

```text
This deal was profitable.
```

Na reconstructie van de werkelijke afrekeningsstromen:

```text
Currency depreciation erased the margin.
The transaction generated a loss.
```

Dit werkboek is daarom geen spreadsheettemplate.

Het is een **geproduceerd analytisch kader voor het reconstrueren van economische realiteit over multivaluta handelsoperaties heen**.

---

## Multivaluta handelsproblemen die dit oplost

| Probleem                                                | Zonder dit hulpmiddel                                  | Met dit hulpmiddel                                     |
| ------------------------------------------------------ | -------------------------------------------------- | -------------------------------------------------- |
| FX-afrekeningsverliezen verborgen in boekhoudsaldi's | Papierwinsten blijven overschat                    | Gerealiseerde en ongerealiseerde FX-blootstelling worden zichtbaar |
| Volgen van klanttermijnen | Openstaande saldi's worden moeilijk af te stemmen | Vorderingen automatisch gevolgd per Deal-ID       |
| Financieringskosten leverancier genegeerd | Financieringskosten vernietigen stilletjes marges | Rentekosten toegewezen aan elke transactie       |
| Zichtbaarheid werkkapitaal | Tekorten aan kas verschijnen onverwacht | Kas, vorderingen en verplichtingen samen bekeken |
| Grensoverschrijdende winstgevendheidsanalyse | Management vertrouwt op geaggregeerde rapportages | Winstgevendheid geanalyseerd op transactieniveau        |
| Toezicht op kredietblootstelling | Achterstallige klanten blijven onopgemerkt | Verouderingsanalyse en betalingswaarschuwingen worden zichtbaar   |

---

## Voor wie dit is

Dit kader is ontworpen voor:

* Europa–Afrika import-/exportbedrijven.
* Grondenhandelaars die over meerdere valuta's opereren.
* MKB-eigenaars die voorraad financieren via leverancierskrediet.
* Handelsfinancieringsadviseurs.
* CFO's die FX-blootstelling beheren.
* Familiebedrijven in de handel die operationele financiële zichtbaarheid nodig hebben.

Dit kader is **niet ontworpen voor**:

* ERP-vervangingsprojecten.
* Multi-user ondernemingsboekhoudsystemen.
* Geautomatiseerde bankintegraties.
* Hogefrequente treasury-operaties.

Geen spreadsheet-expertise vereist.

Open de browserversie of het Excel-werkboek en begin onmiddellijk met het registreren van transacties.

---

## Over

Ik bouw lichtgewicht beslissingsondersteunende hulpmiddelen voor bedrijfssituaties waarin er simpelweg te veel bewegende delen zijn om ze allemaal tegelijk in uw hoofd te houden.

De vraag achter elk project is altijd dezelfde:

> **Welke informatie moet op één plek bestaan zodat de volgende beslissing met vertrouwen kan worden genomen?**

Dit multivaluta handelswinstgevendheidskader is één voorbeeld van die benadering: operationele complexiteit reduceren tot een herbruikbaar analytisch model in plaats van nog een softwareplatform bouwen.

---

## Technische details

<details>
<summary>Voor technische reviewers, Excel-beoefenaars en medewerkers</summary>

---

### Werkboekarchitectuur

```text
Input Layer
│
├── 1_Config
├── 2_Purchases_Suppliers
├── 3_Sales_Clients
└── 4_Expenses_FX
          │
          ▼
Calculation Layer
│
└── 5_Calculation_Engine
          │
          ▼
Output Layer
│
└── 0_Dashboard
```

| Blad                 | Functie                                        |
| --------------------- | ----------------------------------------------- |
| 0_Dashboard           | Financieel managementdashboard                   |
| 1_Config              | Wisselkoersen, tegenpartijen, systeeminstellingen |
| 2_Purchases_Suppliers | Inkopen en leveranciersfinanciering                |
| 3_Sales_Clients       | Verkopen en klantinning                  |
| 4_Expenses_FX         | Uitgaven en FX-afrekeningen                     |
| 5_Calculation_Engine  | Transactiereconstructie-engine               |

### Validatiestroom

```text
Input Validation
       ↓
Deal ID Matching
       ↓
Currency Normalization
       ↓
Interest Calculation
       ↓
Settlement Reconciliation
       ↓
Profit Reconstruction
       ↓
Dashboard Aggregation
```

---

### Drie valkuilen die zelfs ervaren handelsoperatoren vangen

---

#### Valkuil 1 — Factuurwinst verwarren met gerealiseerde winst

Een inkoop werd uitgevoerd tegen €40.000.

Verkopen genereerden ₦85.000.000.

Het management veronderstelde:

```text
EUR/NGN = 2,000
```

Verwachte winst:

```text
€2,500
```

De werkelijke afrekening vond vier maanden later plaats:

```text
EUR/NGN = 2,450
```

Werkelijke winst:

```text
-€3,800
```

| Verkeerde aanpak                             | Juiste aanpak                            |
| ------------------------------------------ | ------------------------------------------- |
| Winst berekend op factuurwisselkoers | Winst berekend op werkelijke afrekeningskoers |
| Tijdstip van valuta-realistatie negeren | Volledige transactielevenscyclus reconstrueren |

<details>
<summary>Formulelogica</summary>

```excel
Actual Profit =
Realized FX(A)
+ Unrealized FX(B × Closing Rate)
- Purchase Cost(A)
- Interest Cost(A)
- Direct Expenses(A)
```

</details>

---

#### Valkuil 2 — Financieringskosten leverancier negeren

Beslissing:

```text
Supplier financing increased purchasing capacity.
```

Verborgen veronderstelling:

```text
Financing cost is negligible.
```

Voorbeeld:

| Post      | Waarde    |
| --------- | -------- |
| Hoofdsom | €100.000 |
| Tarief      | 18%      |
| Looptijd  | 180 dagen |

Rentekosten:

```text
€8,877
```

Zonder toewijzing van financieringskosten:

```text
Deal appears profitable.
```

Na toewijzing:

```text
Deal margin becomes negative.
```

<details>
<summary>Formulelogica</summary>

```excel
Interest =
Principal
*
Annual Rate
*
Days Outstanding
/
365
```

</details>

---

#### Valkuil 3 — Liquiditeit meten met alleen kas

Beslissing:

```text
Cash balance indicates healthy liquidity.
```

Verborgen probleem:

```text
Receivables and debt obligations ignored.
```

Voorbeeld:

| Post          | Bedrag   |
| ------------- | -------- |
| Kas          | €60.000  |
| Vorderingen   | €180.000 |
| Leveranciersschuld | €240.000 |

Kasbeeld:

```text
Healthy.
```

Werkkapitaalbeeld:

```text
Negative €0.
```

Het bedrijf is volledig blootgesteld aan vertragingen in inning.

<details>
<summary>Formulelogica</summary>

```excel
Working Capital =
Cash
+ Receivables
- Payables
```

</details>

---

### Voorbeeldscenario

Een distributeur koop generatoren in Europa.

#### Invoer

| Variabele         | Waarde        |
| ---------------- | ------------ |
| Deal-ID          | DEAL-24017   |
| Inkoop         | €52.000      |
| Financiering        | €30.000      |
| Rente         | 15% jaarlijks   |
| Verkoop             | ₦120.000.000 |
| Aanbetaling klant | ₦30.000.000  |
| Eindinning | ₦90.000.000  |
| Afrekenings-FX    | 2,420        |

#### Tussenliggende berekeningen

| Berekening          | Resultaat  |
| -------------------- | ------- |
| Werkelijk terugekregen EUR | €49.587 |
| Rentelasten     | €1.973  |
| Bedrijfskosten   | €2.400  |
| Nettowinst           | -€6.786 |

#### Interpretatie

Het management observeerde aanvankelijk:

```text
Large nominal sales volume.
```

Het analytische model legde bloot:

* devaluatie van de valuta,
* financieringskosten,
* vertraagde inningen,

die gezamenlijk de winstgevendheid vernietigden.

#### Aanbeveling

```text
Reduce customer credit period.
Increase deposit requirements.
Hedge currency exposure.
Reduce supplier leverage.
```

#### Beslissingsimplicatie

Het probleem was niet de verkoopprestatie.

Het probleem was de transactiestructuur.

---

### Formulereferentie

<details>
<summary>Klantvorderingen</summary>

```excel
Outstanding =
Invoice Amount
-
SUMIFS(
Payments,
Deal_ID,
Current_Deal
)
```

</details>

<details>
<summary>FX-lookup</summary>

```excel
=XLOOKUP(
TEXT(Date,"yyyy-mm")&Currency,
FX_Date&FX_Currency,
FX_Rate
)
```

</details>

<details>
<summary>Leveranciersrente</summary>

```excel
=
Principal
*
Rate
*
(MIN(TODAY(),Repayment_Date)-Start_Date)
/
365
```

</details>

<details>
<summary>Werkkapitaal</summary>

```excel
=
Cash
+
Receivables
-
Payables
```

</details>

---

### Validatieregels

| Veld             | Regel                                | Foutgedrag   |
| ----------------- | ----------------------------------- | ---------------- |
| Deal-ID           | Verplicht en uniek                | Invoer afgewezen   |
| Valuta          | Alleen dropdown                       | Validatiefout |
| Klant            | Alleen masterlijst                    | Validatiefout |
| Leverancier            | Alleen masterlijst                    | Validatiefout |
| Rentevoet     | 0–100%                              | Waarschuwing          |
| Afrekeningsbedrag | Mag saldo niet overschrijden               | Invoer geblokkeerd    |
| FX-koers           | Alleen positieve waarde                 | Invoer afgewezen   |
| Betalingsdatum      | Mag niet voor factuurdatum liggen         | Waarschuwing          |
| Leningterugbetaling    | Mag openstaand hoofdbedrag niet overschrijden | Invoer geblokkeerd    |

</details>

---

## Andere hulpmiddelen in deze serie

* **Voorraadplanning- & aanvullingscontroleconsole** — voorraadallocatie en inkoopbeslissingen.
* **Cross-platform btw-compliance dashboard** — btw-berekening en aangifteondersteuning.
* **Projectkostenallocatie & arbeidsanalyse** — reconstructie van projectwinstgevendheid.
* **DTC modevoorraad-governanceconsole** — vraag-, retour- en voorraadrisicobeheer.

Meer hulpmiddelen beschikbaar via het GitHub-profiel en de release-repository.

---

## Licentie

Dit project is gelicentieerd onder de **Apache License 2.0**.

Zie het LICENSE-bestand voor details.
