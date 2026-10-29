# Design — Expense & Budget Visualizer

**Author:** Hikmal Ananta Putra  
**Date:** October 29, 2026

---

## 1. Architecture Overview

Single-page application (SPA) with no build step or bundler. All logic lives in one HTML file + one CSS file + one JS file.

```
index.html
  └── loads css/style.css
  └── loads Chart.js (CDN)
  └── loads js/app.js
```

Data flow:
```
User Action → app.js (state mutation) → saveData() → localStorage
                                      → render()   → DOM update + Chart update
```

---

## 2. Component Layout

```
┌─────────────────────────────┐
│  🌙  (theme toggle)         │  fixed top-right
├─────────────────────────────┤
│        💰 Budget Tracker    │  header
├─────────────────────────────┤
│   Total Balance: Rp xxx     │  gradient card
├─────────────────────────────┤
│   ⚠️ Spending Limit         │  input + Set button
│   status message            │
├─────────────────────────────┤
│   Add Transaction (form)    │
│   - Item Name               │
│   - Amount                  │
│   - Category (select)       │
│   - Custom category input   │  hidden unless "Add Custom..." selected
│   [ Add Transaction ]       │
├─────────────────────────────┤
│   Transactions  [Sort ▾]    │
│   ┌─────────────────────┐   │
│   │ 🍔 Lunch   Rp 25k 🗑│   │  scrollable list
│   │ 🚌 Grab    Rp 15k 🗑│   │
│   └─────────────────────┘   │
├─────────────────────────────┤
│   Spending by Category      │
│         [Pie Chart]         │
└─────────────────────────────┘
```

---

## 3. Theming System

CSS custom properties (`--var`) defined on `:root` (light) and `[data-theme="dark"]`.  
JavaScript toggles `data-theme` attribute on `<html>`.

Key variables:
- `--bg` — page background
- `--surface` — card background
- `--primary` — accent color (indigo)
- `--text`, `--text-muted` — typography
- `--border`, `--shadow` — decoration
- `--warning-bg`, `--over-limit-bg` — highlight states

---

## 4. State Management

All state is held in module-level variables in `app.js`:

| Variable           | Type       | Description                        |
|--------------------|------------|------------------------------------|
| `transactions`     | `Array`    | List of transaction objects        |
| `customCategories` | `Array`    | User-defined category names        |
| `spendingLimit`    | `number`   | Budget cap in Rp                   |
| `chartInstance`    | `Chart`    | Chart.js instance (singleton)      |

`render()` is the single function that redraws balance, list, chart, and limit status.

---

## 5. Key Functions

| Function                  | Responsibility                                      |
|---------------------------|-----------------------------------------------------|
| `init()`                  | Load from localStorage, restore theme, call render  |
| `render()`                | Orchestrates all UI updates                         |
| `renderBalance()`         | Sums all amounts, updates DOM                       |
| `renderTransactions()`    | Sorts list, builds item DOM nodes                   |
| `renderChart()`           | Aggregates by category, creates/updates Chart.js    |
| `updateLimitStatus()`     | Compares total to limit, sets status class          |
| `deleteTransaction(id)`   | Filters array, saves, re-renders                    |
| `saveData()`              | Serialises state to localStorage                    |
| `loadData()`              | Deserialises state from localStorage                |
| `applyTheme(theme)`       | Sets data-theme attr, saves preference, updates chart|
| `refreshCategoryOptions()`| Injects custom <option> elements into select        |
| `getSortedTransactions()` | Returns sorted copy of transactions array           |
| `escapeHTML(str)`         | Prevents XSS when injecting user input into DOM     |

---

## 6. Chart Design

- Type: **Pie**
- Library: **Chart.js v4** via CDN
- Singleton pattern — chart is created once, then `.update()` is called on data changes
- Colors: fixed 10-color palette, cycling if categories exceed 10
- Legend: positioned bottom, color syncs with active theme

---

## 7. Spending Limit Highlight Logic

```
total = sum of all transaction amounts

if limit not set:
    no highlight

else if total > limit:
    transaction items → class "over-limit"  (red background)
    status → "🚨 Over limit!"

else if total / limit >= 0.80:
    transaction items → class "near-limit"  (yellow background)
    status → "⚠️ Approaching limit"

else:
    no highlight on items
    status → "✅ Within limit"
```

---

## 8. Responsive Design

- Container max-width: `480px`, centered, padding `16px`
- All inputs/buttons are full-width on mobile
- Transaction list max-height `400px` with custom scrollbar
- Theme toggle is `position: fixed` so it's always accessible
