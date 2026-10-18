[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Echten Gewinn, FX-Exposure, Kreditrisiko und Betriebskapital über Europa–Afrika-Handelsvorgänge hinweg verfolgen

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange.svg)

**Ein kostenloses Decision-Support-Framework ohne Installation zur Berechnung der Deal-Profitabilität, des FX-Realisierungsrisikos, des Kredit-Exposure gegenüber Kunden, der Lieferantenfinanzierungskosten und des Betriebskapitals über multiwährungsbasierte Import-/Exportvorgänge hinweg.**

**Keine Registrierung. Keine Installation. Kostenlos im Browser.**

Testen Sie die Browser-Version kostenlos. Wenn Sie die Excel-Version benötigen, können Sie sie mit 30-tägiger Geld-zurück-Garantie ohne Fragen erwerben.
>
> 🌐 **Im Browser öffnen** → [HTML-Version](https://hyvoid.github.io/Multi-Currency-Trade-Financial-Analyzer/)
>
> 📥 **Excel herunterladen** → GitHub-Release / [Website](https://www.theseusworkshop.com/)-Version
>
> Verfügbar in beiden Formaten: **browserbasiertes HTML** und ** natives Excel**.

---

## Was es zu verfolgen hilft

* Tatsächlich realisierter Gewinn nach Währungsumrechnung statt Buchgewinn zum Rechnungsdatum.
* Kundenanzahlungen, Ratenzahlungen, offene Salden und überfälliges Kredit-Exposure.
* Lieferantenfinanzierungskosten und ihre Auswirkung auf die Transaktionsprofitabilität.
* Betriebskapitalposition über Cash, Forderungen und Verbindlichkeiten hinweg.
* In der Bilanz verborgene Devisenverluste zwischen Geschäftsausführung und Währungsumrechnung.
* Profitabilität, Liquidität und Finanzierungsperformance auf individueller Deal-Ebene.

---

## Warum ich dies gebaut habe

Viele Europa–Afrika-Handelsunternehmen haben gar kein Buchhaltungsproblem.

Sie haben ein **Entscheidungstransparenzproblem**.

Eine typische Transaktion beginnt möglicherweise mit dem Einkauf von Inventar in EUR oder USD, der Teilfinanzierung dieses Einkaufs über Lieferantenkredit, dem Verkauf von Produkten in NGN, KES oder XOF, dem Zahlungseinzug über Anzahlungen und Raten und der eventualen Rückumwandlung der Lokalwährung in EUR oder USD.

Auf dem Papier erscheint die Transaktion profitabel.

In Wirklichkeit zerstören Wechselkursbewegungen, verzögerte Zahlungseingänge, Finanzierungskosten und Teilabrechnungen die Profitabilität oft lange bevor das Management bemerkt, was passiert ist.

Das analytische Versagen entsteht, weil Finanzinformationen üblicherweise nach Buchhaltungskategorie organisiert sind:

* Einkäufe,
* Verkäufe,
* Darlehen,
* Zahlungen,
* Devisen.

Aber Managemententscheidungen werden je **Transaktion** getroffen, nicht je Buchhaltungskonto.

Ich habe diese Arbeitsmappe als wiederverwendbares Reasoning-Framework gebaut, das jede Transaktion über eine gemeinsame **Deal-ID** rekonstruiert und so erlaubt, den gesamten Wirtschaftslebenszyklus eines Handels als Einheit zu bewerten.

### Beispiel

| Vorher                     | Nachher                     |
| -------------------------- | ------------------------- |
| Einkauf: €40.000          | Einkauf: €40.000         |
| Verkauf: ₦85.000.000          | Verkauf: ₦85.000.000         |
| Angenommener FX: 1 EUR = ₦2.000 | Tatsächlicher FX: 1 EUR = ₦2.450 |
| Geschätzter Gewinn: €2.500   | Realisierter Gewinn: -€3.800  |

Ohne Transaktionsabgleich auf Deal-Ebene kommt das Management zu folgendem Schluss:

```text
This deal was profitable.
```

Nach Rekonstruktion der tatsächlichen Abwicklungsströme:

```text
Currency depreciation erased the margin.
The transaction generated a loss.
```

Diese Arbeitsmappe ist daher keine Tabellenkalkulationsvorlage.

Sie ist ein **produktisiertes analytisches Framework zur Rekonstruktion der ökonomischen Realität über multiwährungsbasierte Handelsvorgänge hinweg**.

---

## Multiwährungs-Handelsprobleme, die dies löst

| Problem                                                | Ohne dieses Tool                                  | Mit diesem Tool                                     |
| ------------------------------------------------------ | -------------------------------------------------- | -------------------------------------------------- |
| In Buchhaltungssalden verborgene FX-Abwicklungsverluste | Buchgewinne bleiben überhöht                    | Realisiertes und unrealisiertes FX-Exposure werden sichtbar |
| Verfolgung von Kundenraten | Offene Salden sind schwer abzustimmen | Forderungen werden automatisch je Deal-ID verfolgt |
| Lieferantenfinanzierungskosten ignoriert | Finanzierungskosten zerstören Margen unbemerkt | Zinskosten werden jeder Transaktion zugeordnet |
| Transparenz des Betriebskapitals | Liquiditätsengpässe tauchen unerwartet auf | Cash, Forderungen und Verbindlichkeiten werden zusammen betrachtet |
| Grenzüberschreitende Profitabilitätsanalyse | Management verlässt sich auf aggregierte Berichte | Profitabilität wird auf Transaktionsebene analysiert |
| Überwachung des Kredit-Exposure | Säumige Kunden bleiben unentdeckt | Fälligkeitsanalyse und Zahlungswarnungen werden sichtbar |

---

## Für wen dies bestimmt ist

Dieses Framework ist konzipiert für:

* Europa–Afrika-Import-/Exportunternehmen.
* Rohstoffhändler, die über mehrere Währungen agieren.
* KMU-Inhaber, die Inventar über Lieferantenkredit finanzieren.
* Handelsfinanzierungsberater.
* CFOs, die Devisen-Exposure steuern.
* Familiengeführte Handelsunternehmen, die operative Finanztransparenz benötigen.

Dieses Framework ist **nicht konzipiert für**:

* ERP-Ersatzprojekte.
* Mehrbenutzer-Unternehmensbuchhaltungssysteme.
* Automatisierte Bankintegrationen.
* Hochfrequenz-Treasury-Operationen.

Keine Tabellenkalkulations-Expertise erforderlich.

Öffnen Sie die Browser-Version oder die Excel-Arbeitsmappe und beginnen Sie sofort mit der Erfassung von Transaktionen.

---

## Über

Ich baue leichtgewichtige Decision-Support-Tools für Geschäftssituationen, in denen es schlicht zu viele bewegliche Teile gibt, um sie gleichzeitig im Kopf zu behalten.

Die Frage hinter jedem Projekt ist immer dieselbe:

> **Welche Informationen müssen an einem Ort existieren, damit die nächste Entscheidung zuversichtlich getroffen werden kann?**

Dieses Multiwährungs-Handelsprofitabilitäts-Framework ist ein Beispiel für diesen Ansatz: operative Komplexität in ein wiederverwendbares analytisches Modell zu reduzieren statt eine weitere Softwareplattform zu bauen.

---

## Technische Details

<details>
<summary>Für technische Reviewer, Excel-Praktiker und Mitarbeiter</summary>

---

### Arbeitsmappen-Architektur

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

| Blatt                 | Funktion                                        |
| --------------------- | ----------------------------------------------- |
| 0_Dashboard           | Executive-Finanzdashboard                   |
| 1_Config              | Wechselkurse, Gegenparteien, Systemeinstellungen |
| 2_Purchases_Suppliers | Einkäufe und Lieferantenfinanzierung                |
| 3_Sales_Clients       | Verkäufe und Kundeneinzüge                  |
| 4_Expenses_FX         | Ausgaben und FX-Abwicklungen                     |
| 5_Calculation_Engine  | Transaktionsrekonstruktions-Engine               |

### Validierungsfluss

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

### Drei Fallen, die selbst erfahrene Handelsakteure fangen

---

#### Falle 1 — Rechnungsgewinn mit realisiertem Gewinn verwechseln

Ein Einkauf wurde zu €40.000 ausgeführt.

Verkäufe erzielten ₦85.000.000.

Das Management nahm an:

```text
EUR/NGN = 2,000
```

Erwarteter Gewinn:

```text
€2,500
```

Die tatsächliche Abwicklung erfolgte vier Monate später:

```text
EUR/NGN = 2,450
```

Tatsächlicher Gewinn:

```text
-€3,800
```

| Falscher Ansatz                             | Richtiger Ansatz                            |
| ------------------------------------------ | ------------------------------------------- |
| Gewinn berechnet zum Rechnungswechselkurs | Gewinn berechnet zum tatsächlichen Abwicklungskurs |
| Zeitpunkt der Währungsrealisierung ignorieren | Vollständigen Transaktionslebenszyklus rekonstruieren |

<details>
<summary>Formel-Logik</summary>

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

#### Falle 2 — Lieferantenfinanzierungskosten ignorieren

Entscheidung:

```text
Supplier financing increased purchasing capacity.
```

Verborgene Annahme:

```text
Financing cost is negligible.
```

Beispiel:

| Posten      | Wert    |
| --------- | -------- |
| Kapital | €100.000 |
| Zinssatz      | 18%      |
| Dauer  | 180 Tage |

Zinskosten:

```text
€8,877
```

Ohne Allokation der Finanzierungskosten:

```text
Deal appears profitable.
```

Nach Allokation:

```text
Deal margin becomes negative.
```

<details>
<summary>Formel-Logik</summary>

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

#### Falle 3 — Liquidität allein über Cash messen

Entscheidung:

```text
Cash balance indicates healthy liquidity.
```

Verborgene Problem:

```text
Receivables and debt obligations ignored.
```

Beispiel:

| Posten          | Betrag   |
| ------------- | -------- |
| Cash          | €60.000  |
| Forderungen   | €180.000 |
| Lieferantenschuld | €240.000 |

Cash-Sicht:

```text
Healthy.
```

Betriebskapital-Sicht:

```text
Negative €0.
```

Das Unternehmen ist vollständig Zahlungsverzögerungen ausgesetzt.

<details>
<summary>Formel-Logik</summary>

```excel
Working Capital =
Cash
+ Receivables
- Payables
```

</details>

---

### Beispielszenario

Ein Distributor kauft Generatoren aus Europa.

#### Eingaben

| Variable         | Wert        |
| ---------------- | ------------ |
| Deal-ID          | DEAL-24017   |
| Einkauf         | €52.000      |
| Finanzierung        | €30.000      |
| Zinsen         | 15% p.a.   |
| Verkauf             | ₦120.000.000 |
| Kundenanzahlung | ₦30.000.000  |
| Finale Zahlung | ₦90.000.000  |
| Abwicklungs-FX    | 2,420        |

#### Zwischenberechnungen

| Berechnung          | Ergebnis  |
| -------------------- | ------- |
| Tatsächlich zurückgewonnene EUR | €49.587 |
| Zinsaufwand     | €1.973  |
| Betriebsausgaben   | €2.400  |
| Nettogewinn           | -€6.786 |

#### Interpretation

Das Management beobachtete zunächst:

```text
Large nominal sales volume.
```

Das analytische Modell legte offen:

* Währungsabwertung,
* Finanzierungskosten,
* verzögerte Zahlungseingänge,

die gemeinsam die Profitabilität zerstörten.

#### Empfehlung

```text
Reduce customer credit period.
Increase deposit requirements.
Hedge currency exposure.
Reduce supplier leverage.
```

#### Entscheidungsimplikation

Das Problem war nicht die Verkaufsperformance.

Das Problem war die Transaktionsstruktur.

---

### Formelreferenz

<details>
<summary>Kundenforderungen</summary>

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
<summary>FX-Lookup</summary>

```excel
=XLOOKUP(
TEXT(Date,"yyyy-mm")&Currency,
FX_Date&FX_Currency,
FX_Rate
)
```

</details>

<details>
<summary>Lieferantenzinsen</summary>

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
<summary>Betriebskapital</summary>

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

### Validierungsregeln

| Feld             | Regel                                | Fehlerverhalten   |
| ----------------- | ----------------------------------- | ---------------- |
| Deal-ID           | Pflicht und eindeutig                | Eingabe abgewiesen   |
| Währung          | Nur Dropdown                       | Validierungsfehler |
| Kunde            | Nur Stammliste                    | Validierungsfehler |
| Lieferant            | Nur Stammliste                    | Validierungsfehler |
| Zinssatz     | 0–100 %                              | Warnung          |
| Abwicklungsbetrag | Darf Saldo nicht überschreiten               | Eingabe blockiert    |
| FX-Kurs           | Nur positiver Wert                 | Eingabe abgewiesen   |
| Zahlungsdatum      | Darf nicht vor Rechnungsdatum liegen         | Warnung          |
| Darlehensrückzahlung    | Darf ausstehenden Kapitalbetrag nicht überschreiten | Eingabe blockiert    |

</details>

---

## Weitere Tools dieser Serie

* **Inventory-Planning-&-Replenishment-Control-Console** — Bestandsallokation und Einkaufsentscheidungen.
* **Cross-Platform-VAT-Compliance-Dashboard** — Mehrwertsteuerberechnung und Meldungsunterstützung.
* **Project-Cost-Allocation-&-Labor-Analytics** — Rekonstruktion der Projektprofitabilität.
* **DTC-Fashion-Inventory-Governance-Console** — Nachfrage-, Retouren- und Bestandsrisikomanagement.

Weitere Tools verfügbar über das GitHub-Profil und das Release-Repository.

---

## Lizenz

Dieses Projekt ist lizenziert unter der **Apache License 2.0**.

Siehe die LICENSE-Datei für Details.
