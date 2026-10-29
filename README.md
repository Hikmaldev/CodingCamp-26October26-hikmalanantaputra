# 💰 Expense & Budget Visualizer

A mobile-friendly web app to track daily spending, visualize spending distribution, and manage your budget — built with pure HTML, CSS, and Vanilla JavaScript.

**Author:** Hikmal Ananta Putra

---

## 📱 Preview

> Open `index.html` directly in your browser — no server needed.

---

## ✨ Features

### Core (MVP)
- **Input Form** — Add transactions with Item Name, Amount, and Category (Food, Transport, Fun)
- **Transaction List** — Scrollable list showing name, amount, category, and date; with delete button
- **Total Balance** — Auto-updates whenever a transaction is added or deleted
- **Pie Chart** — Visual spending distribution by category using Chart.js, auto-updates in real time

### Optional Challenges
- **Sort Transactions** — Sort by Date (newest/oldest), Amount (high/low), or Category (A–Z)
- **Spending Limit Highlight** — Set a budget limit; items turn yellow at 80% and red when over the limit
- **Dark / Light Mode** — Toggle with 🌙/☀️ button at the top right; preference saved automatically
- **Custom Categories** — Add your own category beyond the defaults (Food, Transport, Fun)

---

## 🗂️ Project Structure

```
├── index.html        # Main HTML page
├── css/
│   └── style.css     # All styling (light & dark theme)
├── js/
│   └── app.js        # All logic (transactions, chart, storage)
├── README.md
└── task.md
```

> ⚠️ Folder rules followed: only 1 CSS file inside `css/` and only 1 JS file inside `js/`.

---

## 🛠️ Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Structure  | HTML5               |
| Styling    | CSS3 (CSS Variables)|
| Logic      | Vanilla JavaScript  |
| Chart      | Chart.js v4 (CDN)   |
| Storage    | Browser localStorage|

No frameworks. No build tools. No backend.

---

## 🚀 How to Run

1. Clone or download this repository
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari)
3. Start adding transactions!

---

## 🌐 Deployment (GitHub Pages)

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, root folder `/`
4. Save — your site will be live at `https://<username>.github.io/<repo-name>`

---

## 📦 Browser Compatibility

| Browser | Supported |
|---------|-----------|
| Chrome  | ✅        |
| Firefox | ✅        |
| Edge    | ✅        |
| Safari  | ✅        |

---

## 👤 Author

**Hikmal Ananta Putra**  
CodingCamp — October 26, 2026
