[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)
# Track Real Profit, FX Exposure, Credit Risk, and Working Capital Across Europe–Africa Trade Operations

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange.svg)

**A free, no-install decision-support framework for calculating deal-level profitability, FX realization risk, customer credit exposure, supplier financing costs, and working capital across multi-currency import/export operations.**

**No signup. No installation. Free in your browser.**

Try the browser version for free. If you need the Excel version, you can buy it with a 30-day, no-questions-asked money-back guarantee.
>
> 🌐 **Open in Browser** → [HTML version](https://hyvoid.github.io/Multi-Currency-Trade-Financial-Analyzer/)
>
> 📥 **Download Excel** → GitHub Release / [Website](https://www.theseusworkshop.com/) version
>
> Available in both **browser-based HTML** and **native Excel** formats.

---

## What It Helps You Track

* Actual realized profit after foreign exchange conversion rather than paper profit at invoice date.
* Customer deposits, installment payments, outstanding balances, and overdue credit exposure.
* Supplier financing costs and their impact on transaction profitability.
* Working capital position across cash, receivables, and liabilities.
* Foreign exchange losses hidden between sale execution and currency conversion.
* Profitability, liquidity, and financing performance at individual deal level.

---

## Why I Built This

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

* **[rolling-cashflow-forecast](https://github.com/HyVoid/rolling-cashflow-forecast)** — Why is cash always tight? — Forecast future liquidity under changing operational and financial assumptions.
* **[RTL_Loan_Sizer_Pricer](https://github.com/HyVoid/RTL_Loan_Sizer_Pricer)** — What financing structure is supportable under different borrower and collateral scenarios? — Compare lending scenarios using risk-adjusted financing assumptions.
* **[Personal-Business-Dual-Track-Budget-Manager](https://github.com/HyVoid/Personal-Business-Dual-Track-Budget-Manager)** — Where is personal and business cash being mixed or misallocated? — Separate personal and business cash flows into independently tracked budget tracks.
* **[Multifamily-Value-Add-Acquisition-Model](https://github.com/HyVoid/Multifamily-Value-Add-Acquisition-Model)** — Does this real estate acquisition still create equity value after renovation and operating assumptions? — Evaluate multifamily acquisition returns under renovation financing and operating scenarios.
* **[Real-Estate-Valuation-all-in-one-calculator](https://github.com/HyVoid/Real-Estate-Valuation-all-in-one-calculator)** — What is a property worth under different valuation methods? — Calculate property value across multiple valuation methods with tax and capital expenditure modeling.
* **[multi-entity-expense-allocation](https://github.com/HyVoid/multi-entity-expense-allocation)** — Are shared costs being allocated fairly across entities or are some assets overburdened while others escape their true cost exposure? — Distribute supplier invoices across multiple legal entities and operating assets using configurable allocation methodologies.
* **[investment-pool-nav-excel-template](https://github.com/HyVoid/investment-pool-nav-excel-template)** — What is each participant actually owed based on their entry timing and current pool value? — Track investment pool ownership continuously using NAV-based unit accounting.
* **[shopify-cash-flow-forecast-excel-toolkit](https://github.com/HyVoid/shopify-cash-flow-forecast-excel-toolkit)** — Which operational commitments will create a cash problem in the next twelve weeks? — Connect Shopify sales bank transactions advertising spend and inventory purchasing into a unified cash flow decision framework.
* **[Revenue-Management-Decision-Engine](https://github.com/HyVoid/Revenue-Management-Decision-Engine)** — Has enough meaningful information changed to justify a pricing adjustment? — Govern pricing recommendations through configurable guard rails that prevent unnecessary revenue volatility.
* **[amazon-wbr-sqp-analytics-template](https://github.com/HyVoid/amazon-wbr-sqp-analytics-template)** — What actually changed in the business this period and which products or keywords drove the change? — Transform Amazon Seller Central SQP and Sellerboard exports into standardized executive business reviews.
* **[food-manufacturing-cost-calculator-excel](https://github.com/HyVoid/food-manufacturing-cost-calculator-excel)** — Which products are actually profitable after all manufacturing costs are allocated and which are destroying margin? — Allocate factory labor utilities overhead and material costs to every SKU for true unit manufacturing economics.
* **[ecommerce-profit-calculator-excel](https://github.com/HyVoid/ecommerce-profit-calculator-excel)** — Which orders are actually profitable after all hidden costs and where is money leaking across channels and currencies? — Reconstruct true order-level profitability by reconciling sales payouts shipping costs payment fees and marketplace commissions across multi-channel e-commerce operations.
* **[construction-job-costing-excel-template](https://github.com/HyVoid/construction-job-costing-excel-template)** — Which contractor projects and customers are actually profitable after all job costs? — Connect lead estimation, job execution, and actual cost tracking into a unified contractor profitability framework.
* **[Flora-Pastry-Coffee-Shop-Operating-Control-System](https://github.com/HyVoid/Flora-Pastry-Coffee-Shop-Operating-Control-System)** — Is the shop genuinely profitable after all ingredient, labor, and operating costs? — Connect recipe costing, sales, inventory consumption, and operating expenses into a unified profitability and cash flow framework.
* **[freight-forwarder-job-costing-excel](https://github.com/HyVoid/freight-forwarder-job-costing-excel)** — Which freight bookings are actually profitable after all costs, fees, and currency conversion? — Measure booking-level freight profitability by reconciling revenue, COGS, bank fees, and container costs across mixed-currency transactions.
* **[cross-entity-logistics-console](https://github.com/HyVoid/cross-entity-logistics-console)** — Which containers and customers are actually profitable across customs and fleet operations? — Consolidate customs clearance and fleet execution data into a single container-level profitability view.
* **[family-loan-tracker-excel](https://github.com/HyVoid/family-loan-tracker-excel)** — What is actually owed today after years of transfers and accrued interest? — Reconcile long-term fund transfers and interest accruals into a current outstanding balance.
* **[3-statement-financial-model-excel](https://github.com/HyVoid/3-statement-financial-model-excel)** — What will our financial statements look like under different operating and financing scenarios? — Forecast integrated financial statements by linking revenue, expenses, working capital, and debt into a unified model.
* **[assisted-living-cost-allocation-excel](https://github.com/HyVoid/assisted-living-cost-allocation-excel)** — How much of each building's reported margin is actually generated by that building versus by the way corporate costs were allocated? — Allocate shared expenses across operating units while preserving source transactions and reconciling unit-level results to company totals.
* **[real-estate-development-feasibility-excel](https://github.com/HyVoid/real-estate-development-feasibility-excel)** — At what maximum land acquisition price does this development project become a bankable investment? — Evaluate residential development opportunities by screening land comparables, estimating construction costs, and calculating profit-on-cost thresholds.
* **[uk-residential-costing-software](https://github.com/HyVoid/uk-residential-costing-software)** — Will this construction project actually hit its target margin once site logistics, waste factors, and trade rate changes are accounted for? — Separate physical building quantities from volatile trade rates and site preliminaries to cascade commercial markups across tender budgets and client quotations.
* **[b2b-pricing-landed-cost-excel-model](https://github.com/HyVoid/b2b-pricing-landed-cost-excel-model)** — Which wholesale prices and customer segments actually preserve margin once freight, duties, payment terms, and FX are fully costed? — Calculate SKU-level landed costs, cost-to-serve, and pocket-margin price waterfalls to simulate cross-border wholesale profitability.
* **[custom-label-pricing-calculator](https://github.com/HyVoid/custom-label-pricing-calculator)** — What should we charge for a custom label order at each quantity tier to stay competitive and profitable? — Calculate parametric label pricing by modeling substrate square-inch costs, setup charges, and quantity-tier discount breaks against competitor benchmarks.
* **[landed-cost-calculator-retail-deduction-excel](https://github.com/HyVoid/landed-cost-calculator-retail-deduction-excel)** — What is the true net margin on each SKU once actual landed costs and retailer deductions are accounted for? — Reconcile PO-estimated landed costs against actual freight, duty, FX, and drayage charges while auditing retailer remittance deductions to expose SKU-level net margin.
* **[saas-finance-mrr-burn-rate-excel](https://github.com/HyVoid/saas-finance-mrr-burn-rate-excel)** — Can we make this week's hiring, marketing, and vendor commitments without running out of cash before the books close? — Track weekly cash burn pacing, MRR/ARR waterfall variance, retention metrics, and payroll costs against budget before month-end close.
* **[startup-financial-model-excel](https://github.com/HyVoid/startup-financial-model-excel)** — Will our growth plan run out of cash before cohort monetization catches up? — Forecast multi-year cash burn, runway, unit economics, and fundraising dilution from bottom-up cohort and headcount assumptions.
* **[shopify-pnl-reconciliation-excel](https://github.com/HyVoid/shopify-pnl-reconciliation-excel)** — Is each Shopify storefront actually profitable once true SKU-level costs, shared expenses, and bank charges are reconciled? — Reconcile multi-store Shopify sales exports against SKU-level COGS, allocated multi-currency OPEX, and bank statements to produce a trustworthy monthly P&L.
* **[travel-agency-accounting-excel-template](https://github.com/HyVoid/travel-agency-accounting-excel-template)** — Which tour bookings actually generate net profit and positive cash flow after supplier costs and B2B collections? — Calculate per-booking tour job costs, gross margins, AR/AP settlement, and operating cash flow across multiple currencies.

More tools available via GitHub profile and release repository.

---

## License

This project is licensed under the **Apache License 2.0**.

See the LICENSE file for details.
