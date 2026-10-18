[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Rastrea la ganancia real, la exposición cambiaria, el riesgo crediticio y el capital de trabajo en operaciones comerciales Europa–África

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange.svg)

**Un marco gratuito de apoyo a la decisión, sin instalación, para calcular la rentabilidad a nivel de operación, el riesgo de realización cambiaria, la exposición al crédito de clientes, los costes de financiación de proveedores y el capital de trabajo en operaciones de importación/exportación multidivisa.**

**Sin registro. Sin instalación. Gratis en tu navegador.**

Prueba la versión de navegador gratis. Si necesitas la versión Excel, puedes comprarla con garantía de devolución de 30 días, sin preguntas.
>
> 🌐 **Abrir en el navegador** → [versión HTML](https://hyvoid.github.io/Multi-Currency-Trade-Financial-Analyzer/)
>
> 📥 **Descargar Excel** → versión de GitHub Release / [sitio web](https://www.theseusworkshop.com/)
>
> Disponible en formato **HTML basado en navegador** y **Excel nativo**.

---

## Qué te ayuda a rastrear

* La ganancia realmente realizada tras la conversión de divisas, en lugar de la ganancia en papel a la fecha de factura.
* Depósitos de clientes, pagos a plazos, saldos pendientes y exposición crediticia vencida.
* Costes de financiación de proveedores y su impacto en la rentabilidad de la transacción.
* La posición de capital de trabajo sobre efectivo, cuentas por cobrar y pasivos.
* Pérdidas cambiarias ocultas entre la ejecución de la venta y la conversión de la divisa.
* Rentabilidad, liquidez y desempeño de financiación a nivel de operación individual.

---

## Por qué construí esto

Muchas empresas comerciales Europa–África en realidad no tienen un problema de contabilidad.

Tienen un **problema de visibilidad para la decisión**.

Una transacción típica puede comenzar con la compra de inventario en EUR o USD, el financiamiento parcial de esa compra mediante crédito de proveedor, la venta de productos en NGN, KES o XOF, el cobro de pagos mediante depósitos y cuotas, y finalmente la conversión de la moneda local de vuelta a EUR o USD.

En papel, la transacción parece rentable.

En realidad, los movimientos del tipo de cambio, las cobranzas retrasadas, los costes de financiación y las liquidaciones parciales a menudo destruyen la rentabilidad mucho antes de que la dirección se dé cuenta de lo que ha pasado.

El fracaso analítico ocurre porque la información financiera suele estar organizada por categoría contable:

* compras,
* ventas,
* préstamos,
* pagos,
* divisas.

Pero las decisiones de gestión se toman por **transacción**, no por cuenta contable.

Construí este libro como un marco de razonamiento reutilizable que reconstruye cada transacción a través de un **Deal ID** común, permitiendo evaluar todo el ciclo de vida económico de una operación comercial como una unidad única.

### Ejemplo

| Antes                     | Después                     |
| -------------------------- | ------------------------- |
| Compra: €40.000          | Compra: €40.000         |
| Venta: ₦85.000.000          | Venta: ₦85.000.000         |
| Tipo de cambio supuesto: 1 EUR = ₦2.000 | Tipo de cambio real: 1 EUR = ₦2.450 |
| Ganancia estimada: €2.500   | Ganancia realizada: -€3.800  |

Sin conciliación a nivel de transacción, la dirección concluye:

```text
This deal was profitable.
```

Tras reconstruir los flujos de liquidación reales:

```text
Currency depreciation erased the margin.
The transaction generated a loss.
```

Por tanto, este libro no es una plantilla de hoja de cálculo.

Es un **marco analítico productizado para reconstruir la realidad económica en operaciones comerciales multidivisa**.

---

## Problemas del comercio multidivisa que resuelve

| Problema                                                | Sin esta herramienta                                  | Con esta herramienta                                     |
| ------------------------------------------------------ | -------------------------------------------------- | -------------------------------------------------- |
| Pérdidas de liquidación cambiaria ocultas en los saldos contables | Las ganancias en papel siguen sobrestimadas                    | La exposición cambiaria realizada y no realizada se hace visible |
| Seguimiento de cuotas de clientes | Los saldos pendientes son difíciles de conciliar | Las cuentas por cobrar se rastrean automáticamente por Deal ID       |
| Costes de financiación de proveedor ignorados                       | Los costes de financiación destruyen márgenes silenciosamente | Los costes de interés se asignan a cada transacción       |
| Visibilidad del capital de trabajo                             | Las faltas de efectivo aparecen inesperadamente                 | Efectivo, cuentas por cobrar y pasivos se ven juntos |
| Análisis de rentabilidad transfronteriza                      | La dirección depende de informes agregados            | Rentabilidad analizada a nivel de transacción        |
| Monitoreo de la exposición crediticia                     | Los clientes morosos siguen sin detectarse             | El análisis de antigüedad y las alertas de pago se hacen visibles   |

---

## Para quién es esto

Este marco está diseñado para:

* Empresas de importación/exportación Europa–África.
* Comerciantes de materias primas que operan en múltiples divisas.
* Propietarios de pymes que financian inventario mediante crédito de proveedor.
* Consultores de financiación comercial.
* Directores financieros que gestionan la exposición cambiaria.
* Empresas comerciales familiares que necesitan visibilidad financiera operativa.

Este marco **no está diseñado para**:

* Proyectos de reemplazo de ERP.
* Sistemas contables empresariales multiusuario.
* Integraciones bancarias automatizadas.
* Operaciones de tesorería de alta frecuencia.

No se requiere experiencia en hojas de cálculo.

Abre la versión de navegador o el libro de Excel y empieza a registrar transacciones de inmediato.

---

## Acerca de

Construyo herramientas ligeras de apoyo a la decisión para situaciones de negocio donde simplemente hay demasiadas piezas en movimiento para mantenerlas todas en la cabeza a la vez.

La pregunta detrás de cada proyecto es siempre la misma:

> **¿Qué información necesita existir en un solo lugar para que la próxima decisión se tome con confianza?**

Este marco de rentabilidad del comercio multidivisa es un ejemplo de ese enfoque: reducir la complejidad operativa a un modelo analítico reutilizable en lugar de construir otra plataforma de software.

---

## Detalles técnicos

<details>
<summary>Para revisores técnicos, practicantes de Excel y colaboradores</summary>

---

### Arquitectura del libro

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

| Hoja                 | Función                                        |
| --------------------- | ----------------------------------------------- |
| 0_Dashboard           | Panel financiero ejecutivo                   |
| 1_Config              | Tipos de cambio, contrapartes, ajustes del sistema |
| 2_Purchases_Suppliers | Compras y financiación de proveedores                |
| 3_Sales_Clients       | Ventas y cobranzas de clientes                  |
| 4_Expenses_FX         | Gastos y liquidaciones cambiarias                     |
| 5_Calculation_Engine  | Motor de reconstrucción de transacciones               |

### Flujo de validación

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

### Tres trampas que atrapan incluso a operadores comerciales experimentados

---

#### Trampa 1 — Confundir ganancia de factura con ganancia realizada

Se ejecutó una compra por €40.000.

Las ventas generaron ₦85.000.000.

La dirección supuso:

```text
EUR/NGN = 2,000
```

Ganancia esperada:

```text
€2,500
```

La liquidación real ocurrió cuatro meses después:

```text
EUR/NGN = 2,450
```

Ganancia real:

```text
-€3,800
```

| Enfoque incorrecto                             | Enfoque correcto                            |
| ------------------------------------------ | ------------------------------------------- |
| Ganancia calculada al tipo de cambio de factura | Ganancia calculada al tipo de cambio de liquidación real |
| Ignorar el momento de la realización de la divisa | Reconstruir el ciclo de vida completo de la transacción |

<details>
<summary>Lógica de la fórmula</summary>

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

#### Trampa 2 — Ignorar el coste de financiación del proveedor

Decisión:

```text
Supplier financing increased purchasing capacity.
```

Suposición oculta:

```text
Financing cost is negligible.
```

Ejemplo:

| Partida      | Valor    |
| --------- | -------- |
| Principal | €100.000 |
| Tasa      | 18%      |
| Duración  | 180 días |

Coste de intereses:

```text
€8,877
```

Sin asignación del coste de financiación:

```text
Deal appears profitable.
```

Tras la asignación:

```text
Deal margin becomes negative.
```

<details>
<summary>Lógica de la fórmula</summary>

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

#### Trampa 3 — Medir la liquidez solo con el efectivo

Decisión:

```text
Cash balance indicates healthy liquidity.
```

Problema oculto:

```text
Receivables and debt obligations ignored.
```

Ejemplo:

| Partida          | Importe   |
| ------------- | -------- |
| Efectivo          | €60.000  |
| Cuentas por cobrar   | €180.000 |
| Deuda con proveedores | €240.000 |

Vista de efectivo:

```text
Healthy.
```

Vista de capital de trabajo:

```text
Negative €0.
```

El negocio está totalmente expuesto a los retrasos en la cobranza.

<details>
<summary>Lógica de la fórmula</summary>

```excel
Working Capital =
Cash
+ Receivables
- Payables
```

</details>

---

### Escenario de ejemplo

Un distribuidor compra generadores en Europa.

#### Entradas

| Variable         | Valor        |
| ---------------- | ------------ |
| Deal ID          | DEAL-24017   |
| Compra         | €52.000      |
| Financiación        | €30.000      |
| Interés         | 15% anual   |
| Venta             | ₦120.000.000 |
| Depósito de cliente | ₦30.000.000  |
| Cobranza final | ₦90.000.000  |
| Tipo de cambio de liquidación    | 2,420        |

#### Cálculos intermedios

| Cálculo          | Resultado  |
| -------------------- | ------- |
| EUR realmente recuperados | €49.587 |
| Gasto por intereses     | €1.973  |
| Gastos operativos   | €2.400  |
| Beneficio neto           | -€6.786 |

#### Interpretación

La dirección observó inicialmente:

```text
Large nominal sales volume.
```

El modelo analítico reveló:

* depreciación de la moneda,
* costes de financiación,
* cobranzas retrasadas,

que en conjunto destruyeron la rentabilidad.

#### Recomendación

```text
Reduce customer credit period.
Increase deposit requirements.
Hedge currency exposure.
Reduce supplier leverage.
```

#### Implicación para la decisión

El problema no fue el desempeño de ventas.

El problema fue la estructura de la transacción.

---

### Referencia de fórmulas

<details>
<summary>Cuentas por cobrar de clientes</summary>

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
<summary>Búsqueda de divisas</summary>

```excel
=XLOOKUP(
TEXT(Date,"yyyy-mm")&Currency,
FX_Date&FX_Currency,
FX_Rate
)
```

</details>

<details>
<summary>Intereses del proveedor</summary>

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
<summary>Capital de trabajo</summary>

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

### Reglas de validación

| Campo             | Regla                                | Comportamiento ante error   |
| ----------------- | ----------------------------------- | ---------------- |
| Deal ID           | Obligatorio y único                | Entrada rechazada   |
| Divisa          | Solo menú desplegable                       | Error de validación |
| Cliente            | Solo lista maestra                    | Error de validación |
| Proveedor            | Solo lista maestra                    | Error de validación |
| Tasa de interés     | 0–100%                              | Advertencia          |
| Importe de liquidación | No puede exceder el saldo               | Entrada bloqueada    |
| Tipo de cambio           | Solo valor positivo                 | Entrada rechazada   |
| Fecha de pago      | No puede ser anterior a la fecha de factura         | Advertencia          |
| Reembolso del préstamo    | No puede exceder el principal pendiente | Entrada bloqueada    |

</details>

---

## Otras herramientas de esta serie

* **Consola de planificación de inventario y control de reabastecimiento** — asignación de inventario y decisiones de compra.
* **Panel de cumplimiento de IVA multiplataforma** — cálculo de IVA y apoyo a la declaración.
* **Asignación de costes de proyecto y análisis de mano de obra** — reconstrucción de la rentabilidad de proyectos.
* **Consola de gobernanza de inventario de moda DTC** — gestión de demanda, devoluciones y riesgo de inventario.

Más herramientas disponibles a través del perfil de GitHub y el repositorio de versiones.

---

## Licencia

Este proyecto está licenciado bajo la **Apache License 2.0**.

Consulta el archivo LICENSE para más detalles.
