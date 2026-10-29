/* ===================================================
   Expense & Budget Visualizer — app.js
   Features:
   - Add / delete transactions (stored in localStorage)
   - Total balance display
   - Pie chart via Chart.js
   - Sort by date / amount / category
   - Spending limit with highlight
   - Dark / light mode toggle
   - Custom categories
=================================================== */

// ── DOM References ──────────────────────────────────
const form              = document.getElementById('transactionForm');
const itemNameInput     = document.getElementById('itemName');
const amountInput       = document.getElementById('amount');
const categorySelect    = document.getElementById('category');
const customCatGroup    = document.getElementById('customCategoryGroup');
const customCatInput    = document.getElementById('customCategoryInput');
const totalBalanceEl    = document.getElementById('totalBalance');
const transactionListEl = document.getElementById('transactionList');
const emptyStateEl      = document.getElementById('emptyState');
const sortBySelect      = document.getElementById('sortBy');
const spendingLimitInput= document.getElementById('spendingLimit');
const setLimitBtn       = document.getElementById('setLimitBtn');
const limitStatusEl     = document.getElementById('limitStatus');
const themeToggleBtn    = document.getElementById('themeToggle');
const themeIconEl       = document.getElementById('themeIcon');

// ── State ────────────────────────────────────────────
let transactions  = [];
let customCategories = [];
let spendingLimit = 0;
let chartInstance = null;

// ── Category Config ──────────────────────────────────
const DEFAULT_CATEGORIES = {
  Food:      '🍔',
  Transport: '🚌',
  Fun:       '🎉',
};

function getCategoryIcon(cat) {
  if (DEFAULT_CATEGORIES[cat]) return DEFAULT_CATEGORIES[cat];
  return '📦'; // icon for custom categories
}

// ── LocalStorage Helpers ─────────────────────────────
function saveData() {
  localStorage.setItem('ebv_transactions',     JSON.stringify(transactions));
  localStorage.setItem('ebv_customCategories', JSON.stringify(customCategories));
  localStorage.setItem('ebv_spendingLimit',    spendingLimit.toString());
}

function loadData() {
  const t = localStorage.getItem('ebv_transactions');
  const c = localStorage.getItem('ebv_customCategories');
  const l = localStorage.getItem('ebv_spendingLimit');

  transactions     = t ? JSON.parse(t) : [];
  customCategories = c ? JSON.parse(c) : [];
  spendingLimit    = l ? parseFloat(l) : 0;
}

// ── Custom Categories ────────────────────────────────
function refreshCategoryOptions() {
  // Remove previously injected custom options (keep defaults + custom placeholder)
  const existingCustom = categorySelect.querySelectorAll('.custom-cat-option');
  existingCustom.forEach(el => el.remove());

  // Find the "Add Custom..." option to insert before it
  const customPlaceholder = document.getElementById('customCategoryOption');

  customCategories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = `📦 ${cat}`;
    opt.className = 'custom-cat-option';
    categorySelect.insertBefore(opt, customPlaceholder);
  });
}

categorySelect.addEventListener('change', () => {
  if (categorySelect.value === '__custom__') {
    customCatGroup.style.display = 'block';
    customCatInput.required = true;
    customCatInput.focus();
  } else {
    customCatGroup.style.display = 'none';
    customCatInput.required = false;
    customCatInput.value = '';
  }
});

// ── Add Transaction ──────────────────────────────────
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = itemNameInput.value.trim();
  const amount = parseFloat(amountInput.value);
  let category = categorySelect.value;

  // Validate
  if (!name || !amount || !category || category === '__custom__' && !customCatInput.value.trim()) {
    alert('Please fill in all fields.');
    return;
  }

  // Handle custom category
  if (category === '__custom__') {
    const newCat = customCatInput.value.trim();
    if (newCat) {
      category = newCat;
      if (!customCategories.includes(category)) {
        customCategories.push(category);
        refreshCategoryOptions();
      }
    } else {
      alert('Please enter a custom category name.');
      return;
    }
  }

  const transaction = {
    id:       Date.now(),
    name,
    amount,
    category,
    date:     new Date().toISOString(),
  };

  transactions.push(transaction);
  saveData();
  render();

  // Reset form
  form.reset();
  customCatGroup.style.display = 'none';
  customCatInput.required = false;
});

// ── Delete Transaction ───────────────────────────────
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveData();
  render();
}

// ── Sorting ──────────────────────────────────────────
function getSortedTransactions() {
  const sorted = [...transactions];
  const val = sortBySelect.value;

  switch (val) {
    case 'date-desc':
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    case 'date-asc':
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    case 'amount-desc':
      return sorted.sort((a, b) => b.amount - a.amount);
    case 'amount-asc':
      return sorted.sort((a, b) => a.amount - b.amount);
    case 'category-asc':
      return sorted.sort((a, b) => a.category.localeCompare(b.category));
    default:
      return sorted;
  }
}

sortBySelect.addEventListener('change', render);

// ── Spending Limit ───────────────────────────────────
setLimitBtn.addEventListener('click', () => {
  const val = parseFloat(spendingLimitInput.value);
  if (isNaN(val) || val < 0) {
    alert('Please enter a valid spending limit.');
    return;
  }
  spendingLimit = val;
  saveData();
  updateLimitStatus();
});

function updateLimitStatus() {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);

  if (!spendingLimit || spendingLimit <= 0) {
    limitStatusEl.textContent = '';
    limitStatusEl.className = 'limit-status';
    return;
  }

  const percent = (total / spendingLimit) * 100;

  if (total > spendingLimit) {
    limitStatusEl.textContent = `🚨 Over limit! Rp ${formatNumber(total)} / Rp ${formatNumber(spendingLimit)}`;
    limitStatusEl.className = 'limit-status over';
  } else if (percent >= 80) {
    limitStatusEl.textContent = `⚠️ Approaching limit: Rp ${formatNumber(total)} / Rp ${formatNumber(spendingLimit)} (${Math.round(percent)}%)`;
    limitStatusEl.className = 'limit-status warning';
  } else {
    limitStatusEl.textContent = `✅ Within limit: Rp ${formatNumber(total)} / Rp ${formatNumber(spendingLimit)} (${Math.round(percent)}%)`;
    limitStatusEl.className = 'limit-status safe';
  }
}

// ── Format Numbers ───────────────────────────────────
function formatNumber(n) {
  return n.toLocaleString('id-ID');
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ── Render Total Balance ─────────────────────────────
function renderBalance() {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  totalBalanceEl.textContent = `Rp ${formatNumber(total)}`;
}

// ── Render Transaction List ──────────────────────────
function renderTransactions() {
  const sorted = getSortedTransactions();
  const total  = transactions.reduce((sum, t) => sum + t.amount, 0);

  // Clear list (keep emptyState)
  transactionListEl.innerHTML = '';

  if (sorted.length === 0) {
    transactionListEl.innerHTML = '<p class="empty-state" id="emptyState">No transactions yet. Add one above!</p>';
    return;
  }

  sorted.forEach(t => {
    const runningTotal = transactions
      .filter(tx => new Date(tx.date) <= new Date(t.date))
      .reduce((s, tx) => s + tx.amount, 0);

    let highlightClass = '';
    if (spendingLimit > 0) {
      if (total > spendingLimit) highlightClass = 'over-limit';
      else if ((total / spendingLimit) >= 0.8) highlightClass = 'near-limit';
    }

    const item = document.createElement('div');
    item.className = `transaction-item ${highlightClass}`;
    item.innerHTML = `
      <span class="item-icon">${getCategoryIcon(t.category)}</span>
      <div class="item-details">
        <p class="item-name">${escapeHTML(t.name)}</p>
        <p class="item-meta">${escapeHTML(t.category)} · ${formatDate(t.date)}</p>
      </div>
      <span class="item-amount">Rp ${formatNumber(t.amount)}</span>
      <button class="btn-delete" data-id="${t.id}" aria-label="Delete transaction">🗑️</button>
    `;

    transactionListEl.appendChild(item);
  });

  // Delete event delegation
  transactionListEl.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      deleteTransaction(Number(btn.dataset.id));
    });
  });
}

// ── Render Chart ─────────────────────────────────────
function renderChart() {
  const ctx = document.getElementById('spendingChart').getContext('2d');

  // Aggregate by category
  const categoryTotals = {};
  transactions.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const labels = Object.keys(categoryTotals);
  const data   = Object.values(categoryTotals);
  const colors = generateColors(labels.length);

  if (chartInstance) {
    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0].data   = data;
    chartInstance.data.datasets[0].backgroundColor = colors;
    chartInstance.update();
    return;
  }

  chartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: colors,
        borderColor: 'transparent',
        hoverOffset: 10,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#1e1e2e',
            padding: 12,
            font: { size: 13 },
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const val = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const pct = ((val / total) * 100).toFixed(1);
              return ` Rp ${formatNumber(val)} (${pct}%)`;
            },
          },
        },
      },
    },
  });
}

function generateColors(count) {
  const palette = [
    '#6366f1', '#f59e0b', '#10b981', '#ef4444',
    '#3b82f6', '#ec4899', '#14b8a6', '#f97316',
    '#8b5cf6', '#06b6d4',
  ];
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(palette[i % palette.length]);
  }
  return result;
}

// Update chart legend color on theme change
function updateChartTheme() {
  if (!chartInstance) return;
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue('--text').trim();
  chartInstance.options.plugins.legend.labels.color = color || '#1e1e2e';
  chartInstance.update();
}

// ── XSS protection ───────────────────────────────────
function escapeHTML(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ── Dark / Light Mode ────────────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIconEl.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('ebv_theme', theme);
  updateChartTheme();
}

themeToggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ── Master Render ────────────────────────────────────
function render() {
  renderBalance();
  renderTransactions();
  renderChart();
  updateLimitStatus();
}

// ── Initialise ───────────────────────────────────────
function init() {
  loadData();

  // Restore theme
  const savedTheme = localStorage.getItem('ebv_theme') || 'light';
  applyTheme(savedTheme);

  // Restore spending limit input
  if (spendingLimit > 0) {
    spendingLimitInput.value = spendingLimit;
  }

  // Restore custom category options
  refreshCategoryOptions();

  render();
}

init();
