# Requirements — Expense & Budget Visualizer

**Author:** Hikmal Ananta Putra  
**Date:** October 29, 2026

---

## 1. Introduction

### 1.1 Purpose
Build a mobile-friendly web app called **Expense & Budget Visualizer** that helps users track daily spending, view their total balance, browse transaction history, and visualize spending by category.

### 1.2 Scope
A standalone client-side web page. No backend or server required. Data persists via the browser's LocalStorage API.

---

## 2. Functional Requirements

### FR-1: Input Form
- FR-1.1: The form must include fields for **Item Name**, **Amount**, and **Category**.
- FR-1.2: Default categories available: **Food**, **Transport**, **Fun**.
- FR-1.3: All fields must be filled before a transaction can be submitted (validation).
- FR-1.4: On valid submission, the transaction is added to the list and the form resets.

### FR-2: Transaction List
- FR-2.1: Display all added transactions in a scrollable list.
- FR-2.2: Each item shows: item name, amount, category, and date.
- FR-2.3: Each item has a **delete** button to remove it from the list.
- FR-2.4: Deleting a transaction updates the balance and chart immediately.

### FR-3: Total Balance
- FR-3.1: Display the total sum of all transaction amounts at the top of the page.
- FR-3.2: The balance updates automatically when transactions are added or deleted.

### FR-4: Visual Chart
- FR-4.1: Display a **pie chart** showing spending distribution by category.
- FR-4.2: The chart updates automatically whenever transactions change.
- FR-4.3: Use **Chart.js** (loaded via CDN) for rendering.

---

## 3. Optional Challenges (3 of 5 selected)

### OC-1: Sort Transactions
- OC-1.1: Provide a sort dropdown above the transaction list.
- OC-1.2: Sort options: Date (Newest), Date (Oldest), Amount (High→Low), Amount (Low→High), Category (A→Z).
- OC-1.3: List re-renders immediately when sort option changes.

### OC-2: Highlight Spending Over a Set Limit
- OC-2.1: User can set a spending limit (in Rp) via an input field.
- OC-2.2: A status message shows current total vs. limit with percentage.
- OC-2.3: When total spending reaches **80%** of limit, items are highlighted **yellow** (warning).
- OC-2.4: When total spending **exceeds** the limit, items are highlighted **red** (over limit).
- OC-2.5: The spending limit persists in LocalStorage.

### OC-3: Dark / Light Mode Toggle
- OC-3.1: A toggle button (🌙/☀️) fixed at the top-right corner of the page.
- OC-3.2: Clicking it switches between dark and light themes.
- OC-3.3: The selected theme persists in LocalStorage across page reloads.
- OC-3.4: Chart legend color updates to match the active theme.

---

## 4. Technical Constraints

| ID   | Constraint |
|------|------------|
| TC-1 | HTML, CSS, Vanilla JavaScript only — no frameworks (React, Vue, etc.) |
| TC-2 | All data stored in browser **LocalStorage** — no backend |
| TC-3 | Must work in modern browsers: Chrome, Firefox, Edge, Safari |
| TC-4 | Only **1 CSS file** inside `css/` |
| TC-5 | Only **1 JavaScript file** inside `js/` |

---

## 5. Non-Functional Requirements

| ID    | Requirement |
|-------|-------------|
| NFR-1 | Clean, minimal interface — easy to understand without instructions |
| NFR-2 | Fast load time, responsive UI, no noticeable lag when updating data |
| NFR-3 | Mobile-friendly layout (max-width container, touch-friendly buttons) |
| NFR-4 | Clear visual hierarchy and readable typography |
| NFR-5 | No test setup required |

---

## 6. Data Model

```
Transaction {
  id:       number   // timestamp (Date.now())
  name:     string   // item name
  amount:   number   // spending amount in Rp
  category: string   // Food | Transport | Fun | <custom>
  date:     string   // ISO 8601 date string
}
```

**LocalStorage keys:**
- `ebv_transactions` — JSON array of Transaction objects
- `ebv_customCategories` — JSON array of custom category name strings
- `ebv_spendingLimit` — number string
- `ebv_theme` — `"light"` or `"dark"`

---

## 7. File Structure

```
/
├── index.html              # App entry point
├── css/
│   └── style.css           # All styles including CSS variables for theming
├── js/
│   └── app.js              # All application logic
├── README.md               # Project documentation
└── .kiro/
    └── specs/
        └── expense-visualizer/
            ├── requirements.md   ← this file
            ├── design.md
            └── tasks.md
```
