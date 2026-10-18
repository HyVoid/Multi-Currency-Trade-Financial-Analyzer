[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Suivre le profit réel, l'exposition FX, le risque de crédit et le fonds de roulement sur les opérations commerciales Europe–Afrique

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange.svg)

**Un cadre gratuit d'aide à la décision, sans installation, pour calculer la rentabilité au niveau de chaque affaire, le risque de réalisation des changes, l'exposition au crédit client, les coûts de financement des fournisseurs et le fonds de roulement sur des opérations d'import/export multidevises.**

**Aucune inscription. Aucune installation. Gratuit dans votre navigateur.**

Essayez gratuitement la version navigateur. Si vous avez besoin de la version Excel, vous pouvez l'acheter avec une garantie de remboursement de 30 jours, sans questions.
>
> 🌐 **Ouvrir dans le navigateur** → [version HTML](https://hyvoid.github.io/Multi-Currency-Trade-Financial-Analyzer/)
>
> 📥 **Télécharger Excel** → version GitHub Release / [site web](https://www.theseusworkshop.com/)
>
> Disponible aux deux formats : **HTML en navigateur** et **Excel natif**.

---

## Ce qu'il aide à suivre

* Le profit réellement réalisé après conversion des devises, plutôt que le profit sur papier à la date de facturation.
* Les acomptes clients, les paiements échelonnés, les soldes impayés et l'exposition de crédit en retard.
* Les coûts de financement des fournisseurs et leur impact sur la rentabilité des transactions.
* La position de fonds de roulement sur la trésorerie, les créances et les passifs.
* Les pertes de change cachées entre l'exécution de la vente et la conversion des devises.
* La rentabilité, la liquidité et la performance de financement au niveau de chaque affaire.

---

## Pourquoi j'ai conçu ceci

Beaucoup d'entreprises commerciales Europe–Afrique n'ont en réalité pas de problème de comptabilité.

Elles ont un **problème de visibilité décisionnelle**.

Une transaction typique peut commencer par l'achat d'un stock en EUR ou USD, le financement partiel de cet achat par crédit fournisseur, la vente de produits en NGN, KES ou XOF, l'encaissement des paiements par acomptes et échéances, et finalement la conversion de la devise locale en EUR ou USD.

Sur papier, la transaction apparaît rentable.

En réalité, les mouvements de taux de change, les retards d'encaissement, les coûts de financement et les règlements partiels détruisent souvent la rentabilité bien avant que la direction ne réalise ce qui s'est passé.

L'échec analytique survient parce que l'information financière est généralement organisée par catégorie comptable :

* les achats,
* les ventes,
* les emprunts,
* les paiements,
* les changes.

Mais les décisions de gestion se prennent par **transaction**, pas par compte comptable.

J'ai construit ce classeur comme un cadre de raisonnement réutilisable qui reconstruit chaque transaction via un **Deal ID** commun, permettant d'évaluer l'ensemble du cycle de vie économique d'un commerce comme une unité unique.

### Exemple

| Avant                     | Après                     |
| -------------------------- | ------------------------- |
| Achat : €40 000          | Achat : €40 000         |
| Vente : ₦85 000 000          | Vente : ₦85 000 000         |
| FX supposé : 1 EUR = ₦2 000 | FX réel : 1 EUR = ₦2 450 |
| Profit estimé : €2 500   | Profit réalisé : -€3 800  |

Sans rapprochement au niveau transactionnel, la direction conclut :

```text
This deal was profitable.
```

Après reconstruction des flux de règlement réels :

```text
Currency depreciation erased the margin.
The transaction generated a loss.
```

Ce classeur n'est donc pas un simple modèle tableur.

C'est un **cadre analytique produit pour reconstruire la réalité économique sur des opérations commerciales multidevises**.

---

## Problèmes du commerce multidevises résolus par cet outil

| Problème                                                | Sans cet outil                                  | Avec cet outil                                     |
| ------------------------------------------------------ | -------------------------------------------------- | -------------------------------------------------- |
| Pertes de règlement FX cachées dans les soldes comptables | Les profits sur papier restent surestimés                    | L'exposition FX réalisée et non réalisée devient visible |
| Suivi des échéances clients | Les soldes impayés deviennent difficiles à rapprocher | Les créances suivies automatiquement par Deal ID       |
| Coûts de financement fournisseur ignorés                       | Les coûts de financement détruisent silencieusement les marges | Les intérêts alloués à chaque transaction       |
| Visibilité du fonds de roulement                             | Les pénuries de trésorerie apparaissent inopinément                 | Trésorerie, créances et passifs visualisés ensemble |
| Analyse de rentabilité transfrontalière                      | La direction s'appuie sur des rapports agrégés            | Rentabilité analysée au niveau transactionnel        |
| Surveillance de l'exposition de crédit                     | Les clients en défaut restent non détectés             | L'analyse par ancienneté et les alertes de paiement deviennent visibles   |

---

## À qui ceci s'adresse

Ce cadre est conçu pour :

* Les entreprises d'import/export Europe–Afrique.
* Les négociants en matières premières opérant sur plusieurs devises.
* Les propriétaires de PME finançant leur stock par crédit fournisseur.
* Les consultants en financement du commerce.
* Les directeurs financiers gérant l'exposition aux changes.
* Les entreprises commerciales familiales ayant besoin d'une visibilité financière opérationnelle.

Ce cadre n'est **pas conçu pour** :

* Les projets de remplacement d'ERP.
* Les systèmes comptables d'entreprise multiutilisateurs.
* Les intégrations bancaires automatisées.
* Les opérations de trésorerie à haute fréquence.

Aucune expertise tableur n'est requise.

Ouvrez la version navigateur ou le classeur Excel et commencez immédiatement à enregistrer des transactions.

---

## À propos

Je conçois des outils légers d'aide à la décision pour des situations professionnelles où il y a tout simplement trop de pièces mobiles à garder simultanément en tête.

La question derrière chaque projet est toujours la même :

> **Quelles informations doivent coexister en un seul endroit pour que la prochaine décision soit prise avec confiance ?**

Ce cadre de rentabilité du commerce multidevises est un exemple de cette approche : réduire la complexité opérationnelle en un modèle analytique réutilisable plutôt que de construire une autre plateforme logicielle.

---

## Détails techniques

<details>
<summary>Pour les relecteurs techniques, les praticiens d'Excel et les collaborateurs</summary>

---

### Architecture du classeur

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

| Feuille                 | Fonction                                        |
| --------------------- | ----------------------------------------------- |
| 0_Dashboard           | Tableau de bord financier exécutif                   |
| 1_Config              | Taux de change, contreparties, paramètres système |
| 2_Purchases_Suppliers | Achats et financement fournisseur                |
| 3_Sales_Clients       | Ventes et encaissements clients                  |
| 4_Expenses_FX         | Dépenses et règlements de change                     |
| 5_Calculation_Engine  | Moteur de reconstruction des transactions               |

### Flux de validation

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

### Trois pièges qui capturent même les opérateurs commerciaux expérimentés

---

#### Piège 1 — Confondre profit facturé et profit réalisé

Un achat a été exécuté à €40 000.

Les ventes ont généré ₦85 000 000.

La direction a supposé :

```text
EUR/NGN = 2,000
```

Profit attendu :

```text
€2,500
```

Le règlement réel est survenu quatre mois plus tard :

```text
EUR/NGN = 2,450
```

Profit réel :

```text
-€3,800
```

| Approche incorrecte                             | Approche correcte                            |
| ------------------------------------------ | ------------------------------------------- |
| Profit calculé au taux de change de facturation | Profit calculé au taux de règlement réel |
| Ignorer le calendrier de réalisation des devises | Reconstruire le cycle de vie transactionnel complet |

<details>
<summary>Logique de formule</summary>

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

#### Piège 2 — Ignorer le coût de financement fournisseur

Décision :

```text
Supplier financing increased purchasing capacity.
```

Hypothèse cachée :

```text
Financing cost is negligible.
```

Exemple :

| Poste      | Valeur    |
| --------- | -------- |
| Principal | €100 000 |
| Taux      | 18 %      |
| Durée  | 180 jours |

Coût des intérêts :

```text
€8,877
```

Sans allocation du coût de financement :

```text
Deal appears profitable.
```

Après allocation :

```text
Deal margin becomes negative.
```

<details>
<summary>Logique de formule</summary>

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

#### Piège 3 — Mesurer la liquidité par la seule trésorerie

Décision :

```text
Cash balance indicates healthy liquidity.
```

Problème caché :

```text
Receivables and debt obligations ignored.
```

Exemple :

| Poste          | Montant   |
| ------------- | -------- |
| Trésorerie          | €60 000  |
| Créances   | €180 000 |
| Dette fournisseur | €240 000 |

Vue trésorerie :

```text
Healthy.
```

Vue fonds de roulement :

```text
Negative €0.
```

L'entreprise est entièrement exposée aux retards d'encaissement.

<details>
<summary>Logique de formule</summary>

```excel
Working Capital =
Cash
+ Receivables
- Payables
```

</details>

---

### Scénario d'exemple

Un distributeur achète des générateurs en Europe.

#### Entrées

| Variable         | Valeur        |
| ---------------- | ------------ |
| Deal ID          | DEAL-24017   |
| Achat         | €52 000      |
| Financement        | €30 000      |
| Intérêts         | 15 % annuel   |
| Vente             | ₦120 000 000 |
| Acompte client | ₦30 000 000  |
| Encaissement final | ₦90 000 000  |
| FX de règlement    | 2,420        |

#### Calculs intermédiaires

| Calcul          | Résultat  |
| -------------------- | ------- |
| EUR réellement récupérés | €49 587 |
| Charge d'intérêts     | €1 973  |
| Dépenses d'exploitation   | €2 400  |
| Bénéfice net           | -€6 786 |

#### Interprétation

La direction a initialement observé :

```text
Large nominal sales volume.
```

Le modèle analytique a révélé :

* la dépréciation monétaire,
* les coûts de financement,
* les retards d'encaissement,

qui ont collectivement détruit la rentabilité.

#### Recommandation

```text
Reduce customer credit period.
Increase deposit requirements.
Hedge currency exposure.
Reduce supplier leverage.
```

#### Implication décisionnelle

Le problème n'était pas la performance commerciale.

Le problème était la structure de la transaction.

---

### Référence des formules

<details>
<summary>Créances clients</summary>

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
<summary>Recherche FX</summary>

```excel
=XLOOKUP(
TEXT(Date,"yyyy-mm")&Currency,
FX_Date&FX_Currency,
FX_Rate
)
```

</details>

<details>
<summary>Intérêts fournisseur</summary>

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
<summary>Fonds de roulement</summary>

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

### Règles de validation

| Champ             | Règle                                | Comportement d'erreur   |
| ----------------- | ----------------------------------- | ---------------- |
| Deal ID           | Obligatoire et unique                | Saisie rejetée   |
| Devise          | Liste déroulante uniquement                       | Erreur de validation |
| Client            | Liste maîtresse uniquement                    | Erreur de validation |
| Fournisseur            | Liste maîtresse uniquement                    | Erreur de validation |
| Taux d'intérêt     | 0–100 %                              | Avertissement          |
| Montant de règlement | Ne peut dépasser le solde               | Saisie bloquée    |
| Taux FX           | Valeur positive uniquement                 | Saisie rejetée   |
| Date de paiement      | Ne peut précéder la date de facture         | Avertissement          |
| Remboursement de prêt    | Ne peut dépasser le principal impayé | Saisie bloquée    |

</details>

---

## Autres outils de cette série

* **Console de planification des stocks et de contrôle du réapprovisionnement** — allocation des stocks et décisions d'achat.
* **Tableau de bord de conformité TVA multiplateforme** — calcul de TVA et support de déclaration.
* **Allocation des coûts de projet et analyse de la main-d'œuvre** — reconstruction de la rentabilité des projets.
* **Console de gouvernance des stocks mode DTC** — gestion de la demande, des retours et des risques de stock.

D'autres outils sont disponibles via le profil GitHub et le dépôt des releases.

---

## Licence

Ce projet est sous licence **Apache License 2.0**.

Voir le fichier LICENSE pour plus de détails.
