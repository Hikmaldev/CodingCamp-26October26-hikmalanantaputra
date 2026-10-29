# Implementation Plan

## Overview

Build a mobile-friendly **Expense & Budget Visualizer** web app using HTML, CSS, and Vanilla JavaScript. The app allows users to track daily spending, view a total balance, manage a transaction history, and visualize spending by category via a pie chart. Data persists in the browser's LocalStorage. Three optional challenges are included: sort transactions, spending limit highlight, and dark/light mode toggle.

**Author:** Hikmal Ananta Putra  
**Date:** October 29, 2026

---

## Task Dependency Graph

```
1.1 Create folder structure
 └── 1.2 Create index.html
      └── 1.3 Link CSS and JS files
           └── 1.4 Add Chart.js CDN
                ├── 2.1 Build input form
                │    ├── 2.2 Form validation
                │    └── 2.3 Add transaction logic
                │         └── 2.4 Render transaction list
                │              ├── 2.5 Delete button per item
                │              └── 2.6 Total balance display
                │                   └── 2.7 Render pie chart
                │                        └── 2.8 Auto-update chart
                │
                ├── 3.1 Save transactions to localStorage
                │    └── 3.2 Load on init
                │         ├── 3.3 Save/restore spending limit
                │         ├── 3.4 Save/restore custom categories
                │         └── 3.5 Save/restore theme preference
                │
                ├── 4.1 Sort dropdown (depends on 2.4)
                │    └── 4.2 Re-render on sort change
                ├── 4.3 Spending limit input (depends on 2.6)
                │    ├── 4.4 Limit status message
                │    └── 4.5 Highlight items on warning/over
                ├── 4.6 Dark/light toggle button
                │    ├── 4.7 CSS variable theming
                │    └── 4.8 Sync chart legend color
                └── 4.9 Custom categories (depends on 2.1)
                     └── 5.1 XSS protection
                          ├── 5.2 Mobile-responsive layout
                          ├── 5.3 Write README.md
                          └── 5.4 Write .kiro spec files
                               └── 5.5 Push to GitHub
                                    └── 5.6 Deploy GitHub Pages
```

---

## Tasks

### Phase 1 — Project Setup

- [x] **Task 1.1** — Create folder structure (`css/`, `js/`)
- [x] **Task 1.2** — Create `index.html` base template with semantic HTML
- [x] **Task 1.3** — Link `css/style.css` and `js/app.js` in HTML
- [x] **Task 1.4** — Add Chart.js v4 via CDN

### Phase 2 — Core MVP Features

- [x] **Task 2.1** — Build input form with fields: Item Name, Amount, Category
- [x] **Task 2.2** — Add form validation — all fields required before submit
- [x] **Task 2.3** — Implement add transaction logic (push to array, save, render)
- [x] **Task 2.4** — Render scrollable transaction list showing name, amount, category, date
- [x] **Task 2.5** — Add delete button per transaction item
- [x] **Task 2.6** — Display total balance and auto-update on add/delete
- [x] **Task 2.7** — Render pie chart by category using Chart.js
- [x] **Task 2.8** — Auto-update chart whenever transactions change

### Phase 3 — Data Persistence

- [x] **Task 3.1** — Save transactions array to localStorage on every mutation
- [x] **Task 3.2** — Load and restore transactions from localStorage on page init
- [x] **Task 3.3** — Save and restore spending limit value
- [x] **Task 3.4** — Save and restore custom category list
- [x] **Task 3.5** — Save and restore dark/light theme preference

### Phase 4 — Optional Challenges

- [x] **Task 4.1** — Add sort dropdown (Date Newest/Oldest, Amount High/Low, Category A–Z)
- [x] **Task 4.2** — Re-render transaction list immediately on sort option change
- [x] **Task 4.3** — Add spending limit input field and Set button
- [x] **Task 4.4** — Show limit status message with safe / warning / over states
- [x] **Task 4.5** — Highlight transaction items yellow (≥80%) or red (over limit)
- [x] **Task 4.6** — Add dark/light mode toggle button (fixed top-right)
- [x] **Task 4.7** — Implement CSS variable theming for dark mode (`[data-theme="dark"]`)
- [x] **Task 4.8** — Sync Chart.js legend label color with active theme
- [x] **Task 4.9** — Support adding custom categories via "Add Custom..." option in form

### Phase 5 — Polish & Documentation

- [x] **Task 5.1** — Add `escapeHTML()` helper to prevent XSS on user input
- [x] **Task 5.2** — Ensure mobile-responsive layout (max-width 480px, touch targets)
- [x] **Task 5.3** — Write `README.md` with project description and deploy instructions
- [x] **Task 5.4** — Write `.kiro/specs` files (requirements.md, design.md, tasks.md)
- [x] **Task 5.5** — Push all files to GitHub
- [x] **Task 5.6** — Deploy via GitHub Pages

---

## Notes

- All tasks in Phases 1–5 (except 5.6) are complete and pushed to GitHub.
- Task 5.6 (GitHub Pages deployment) requires manual setup: go to **Settings → Pages** in the GitHub repo, set source to `main` branch, root folder `/`, and save.
- Only **1 CSS file** (`css/style.css`) and **1 JS file** (`js/app.js`) are used, following the folder rules in the task spec.
- Chart.js is loaded via CDN — no npm or build step needed.
- Three optional challenges were selected: **Sort**, **Spending Limit Highlight**, and **Dark/Light Mode Toggle**.
