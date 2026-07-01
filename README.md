# Track Real Profit, FX Exposure, Credit Risk, and Working Capital Across Europe–Africa Trade Operations

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange.svg)

**A free, no-install decision-support framework for calculating deal-level profitability, FX realization risk, customer credit exposure, supplier financing costs, and working capital across multi-currency import/export operations.**

> **No signup. No installation. Free.**
>
> 🌐 **Open in Browser** → HTML version (coming soon)
>
> 📥 **Download Excel** → GitHub Release / Gumroad version
>
> Available in both **browser-based HTML** and **native Excel** formats.

---

## Screenshots

### Browser Version

<!-- screenshot: browser version -->

*Operational dashboard showing real-time cash position, customer receivables, supplier liabilities, FX exposure, and deal-level profitability.*

### Excel Version

<!-- screenshot: excel version -->

*Structured workbook interface for recording purchases, sales, financing, foreign exchange settlements, and automated profitability calculations.*

---

## What It Helps You Track

* Actual realized profit after foreign exchange conversion rather than paper profit at invoice date.
* Customer deposits, installment payments, outstanding balances, and overdue credit exposure.
* Supplier financing costs and their impact on transaction profitability.
* Working capital position across cash, receivables, and liabilities.
* Foreign exchange losses hidden between sale execution and currency conversion.
* Profitability, liquidity, and financing performance at individual deal level.

---

# Why I Built This

Many Europe–Africa trading businesses do not actually have a bookkeeping problem.

They have a **decision visibility problem**.

A typical transaction may begin with purchasing inventory in EUR or USD, financing part of that purchase through supplier credit, selling products in NGN, KES, or XOF, collecting payments through deposits and installments, and eventually converting local currency back into EUR or USD.

On paper, the transaction appears profitable.

In reality, exchange rate movements, delayed collections, financing costs, and partial settlements often destroy profitability long before management realizes what happened.

The analytical failure occurs because financial information is usually organized by accounting category:

* purchases,
* sales,
* loans,
* payments,
* foreign exchange.

But management decisions are made by **transaction**, not by accounting account.

I built this workbook as a reusable reasoning framework that reconstructs every transaction through a common **Deal ID**, allowing the entire economic lifecycle of a trade to be evaluated as a single unit.

### Example

| Before                     | After                     |
| -------------------------- | ------------------------- |
| Purchase: €40,000          | Purchase: €40,000         |
| Sale: ₦85,000,000          | Sale: ₦85,000,000         |
| Assumed FX: 1 EUR = ₦2,000 | Actual FX: 1 EUR = ₦2,450 |
| Estimated Profit: €2,500   | Realized Profit: -€3,800  |

Without transaction-level reconciliation, management concludes:

```text
This deal was profitable.
```

After reconstructing actual settlement flows:

```text
Currency depreciation erased the margin.
The transaction generated a loss.
```

This workbook is therefore not a spreadsheet template.

It is a **productized analytical framework for reconstructing economic reality across multi-currency trading operations**.

---

## Common Multi-Currency Trade Problems This Solves

| Problem                                                | Without This Tool                                  | With This Tool                                     |
| ------------------------------------------------------ | -------------------------------------------------- | -------------------------------------------------- |
| FX settlement losses hidden inside accounting balances | Paper profits remain overstated                    | Realized and unrealized FX exposure become visible |
| Customer installment tracking                          | Outstanding balances become difficult to reconcile | Receivables tracked automatically by Deal ID       |
| Supplier financing costs ignored                       | Financing costs silently destroy margins           | Interest costs allocated to each transaction       |
| Working capital visibility                             | Cash shortages appear unexpectedly                 | Cash, receivables, and liabilities viewed together |
| Cross-border profitability analysis                    | Management relies on aggregated reports            | Profitability analyzed at transaction level        |
| Credit exposure monitoring                             | Delinquent customers remain undetected             | Aging analysis and payment alerts become visible   |

---

## Who This Is For

This framework is designed for:

* Europe–Africa import/export businesses.
* Commodity traders operating across multiple currencies.
* SME owners financing inventory through supplier credit.
* Trade finance consultants.
* CFOs managing foreign exchange exposure.
* Family-owned trading companies requiring operational financial visibility.

This framework is **not designed for**:

* ERP replacement projects.
* Multi-user enterprise accounting systems.
* Automated banking integrations.
* High-frequency treasury operations.

No spreadsheet expertise is required.

Open the browser version or Excel workbook and begin recording transactions immediately.

---

## About

I build lightweight decision-support tools for business situations where there are simply too many moving parts to hold in your head simultaneously.

The question behind every project is always the same:

> **What information needs to exist in one place for the next decision to be made confidently?**

This multi-currency trade profitability framework is one example of that approach: reducing operational complexity into a reusable analytical model rather than building another software platform.

---

## Technical Details

<details>
<summary>For technical reviewers, Excel practitioners, and collaborators</summary>

---

### Workbook Architecture

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

| Sheet                 | Function                                        |
| --------------------- | ----------------------------------------------- |
| 0_Dashboard           | Executive financial dashboard                   |
| 1_Config              | Exchange rates, counterparties, system settings |
| 2_Purchases_Suppliers | Purchases and supplier financing                |
| 3_Sales_Clients       | Sales and customer collections                  |
| 4_Expenses_FX         | Expenses and FX settlements                     |
| 5_Calculation_Engine  | Transaction reconstruction engine               |

### Validation Flow

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

### Three Traps That Catch Even Experienced Trade Operators

---

#### Trap 1 — Confusing Invoice Profit With Realized Profit

A purchase was executed at €40,000.

Sales generated ₦85,000,000.

Management assumed:

```text
EUR/NGN = 2,000
```

Expected profit:

```text
€2,500
```

Actual settlement occurred four months later:

```text
EUR/NGN = 2,450
```

Actual profit:

```text
-€3,800
```

| Wrong Approach                             | Correct Approach                            |
| ------------------------------------------ | ------------------------------------------- |
| Profit calculated at invoice exchange rate | Profit calculated at actual settlement rate |
| Ignore currency realization timing         | Reconstruct complete transaction lifecycle  |

<details>
<summary>Formula Logic</summary>

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

#### Trap 2 — Ignoring Supplier Financing Cost

Decision:

```text
Supplier financing increased purchasing capacity.
```

Hidden assumption:

```text
Financing cost is negligible.
```

Example:

| Item      | Value    |
| --------- | -------- |
| Principal | €100,000 |
| Rate      | 18%      |
| Duration  | 180 days |

Interest cost:

```text
€8,877
```

Without financing cost allocation:

```text
Deal appears profitable.
```

After allocation:

```text
Deal margin becomes negative.
```

<details>
<summary>Formula Logic</summary>

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

#### Trap 3 — Measuring Liquidity Using Cash Alone

Decision:

```text
Cash balance indicates healthy liquidity.
```

Hidden problem:

```text
Receivables and debt obligations ignored.
```

Example:

| Item          | Amount   |
| ------------- | -------- |
| Cash          | €60,000  |
| Receivables   | €180,000 |
| Supplier Debt | €240,000 |

Cash view:

```text
Healthy.
```

Working capital view:

```text
Negative €0.
```

The business is fully exposed to collection delays.

<details>
<summary>Formula Logic</summary>

```excel
Working Capital =
Cash
+ Receivables
- Payables
```

</details>

---

### Example Scenario

A distributor purchases generators from Europe.

#### Inputs

| Variable         | Value        |
| ---------------- | ------------ |
| Deal ID          | DEAL-24017   |
| Purchase         | €52,000      |
| Financing        | €30,000      |
| Interest         | 15% annual   |
| Sale             | ₦120,000,000 |
| Customer Deposit | ₦30,000,000  |
| Final Collection | ₦90,000,000  |
| Settlement FX    | 2,420        |

#### Intermediate Calculations

| Calculation          | Result  |
| -------------------- | ------- |
| Actual EUR Recovered | €49,587 |
| Interest Expense     | €1,973  |
| Operating Expenses   | €2,400  |
| Net Profit           | -€6,786 |

#### Interpretation

Management initially observed:

```text
Large nominal sales volume.
```

The analytical model revealed:

* currency depreciation,
* financing costs,
* delayed collections,

collectively destroyed profitability.

#### Recommendation

```text
Reduce customer credit period.
Increase deposit requirements.
Hedge currency exposure.
Reduce supplier leverage.
```

#### Decision Implication

The issue was not sales performance.

The issue was transaction structure.

---

### Formula Reference

<details>
<summary>Customer Receivables</summary>

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
<summary>FX Lookup</summary>

```excel
=XLOOKUP(
TEXT(Date,"yyyy-mm")&Currency,
FX_Date&FX_Currency,
FX_Rate
)
```

</details>

<details>
<summary>Supplier Interest</summary>

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
<summary>Working Capital</summary>

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

### Validation Rules

| Field             | Rule                                | Error Behavior   |
| ----------------- | ----------------------------------- | ---------------- |
| Deal ID           | Mandatory and unique                | Entry rejected   |
| Currency          | Dropdown only                       | Validation error |
| Customer          | Master list only                    | Validation error |
| Supplier          | Master list only                    | Validation error |
| Interest Rate     | 0–100%                              | Warning          |
| Settlement Amount | Cannot exceed balance               | Entry blocked    |
| FX Rate           | Positive value only                 | Entry rejected   |
| Payment Date      | Cannot precede invoice date         | Warning          |
| Loan Repayment    | Cannot exceed outstanding principal | Entry blocked    |

</details>

---

## Other Tools in This Series

* **Inventory Planning & Replenishment Control Console** — inventory allocation and purchasing decisions.
* **Cross-Platform VAT Compliance Dashboard** — VAT calculation and filing support.
* **Project Cost Allocation & Labor Analytics** — project profitability reconstruction.
* **DTC Fashion Inventory Governance Console** — demand, returns, and inventory risk management.

More tools available via GitHub profile and release repository.

---

## License

This project is licensed under the **Apache License 2.0**.

See the LICENSE file for details.
