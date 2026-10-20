// Clearly labeled Phone pe data. Replace these objects with your own authorized data.
const transactions = [
  // Phone pe ONLY: sample pair for the mock history UI.
  { month: "October 2026", label: "Credit card bill paid", name: "XXXXXXXXXXXX5619", amount: 18000, type: "debit", time: "25 mins ago", icon: "▤", iconType: "card", bank: "∞" },
  { month: "October 2026", label: "Received from", name: "TEEJAMAL GYANI LAL", amount: 18000, type: "credit", time: "26 mins ago", icon: "↙", bank: "∞" },
  { month: "October 2026", label: "Paid to", name: "Ankit Bhaiya", amount: 1, type: "debit", time: "18 mins ago", icon: "💻", iconType: "avatar", bank: "∞" },
  { month: "October 2026", label: "Credit card bill paid", name: "XXXXXXXXXXXX4779", amount: 14900, type: "debit", time: "1 hour ago", icon: "▤", iconType: "card", bank: "∞" },
  { month: "October 2026", label: "Received from", name: "LAXMAN RAMESHCHA...", amount: 14900, type: "credit", time: "1 hour ago", icon: "↙", bank: "∞" },
  { month: "October 2026", label: "Paid to", name: "Ankit Bhaiya", amount: 10400, type: "debit", time: "2 hours ago", icon: "💻", iconType: "avatar", bank: "●" },
  { month: "October 2026", label: "Transfer to", name: "XXXXXXXXX0155", amount: 1, type: "debit", time: "2 hours ago", icon: "∞", bank: "●" },
  { month: "October 2026", label: "Received from", name: "KRISHNA GUPTA", amount: 8400, type: "credit", time: "3 hours ago", icon: "↙", bank: "●" },
  { month: "October 2026", label: "Received from", name: "KRISHNA GUPTA", amount: 2000, type: "credit", time: "3 hours ago", icon: "↙", bank: "●" },
  { month: "October 2026", label: "Paid to", name: "Neeraj Kumar Shukla", amount: 40, type: "debit", time: "5 hours ago", icon: "↗", bank: "●" },
  { month: "October 2026", label: "Transfer to", name: "XXXXXX8689", amount: 9, type: "debit", time: "1 day ago", icon: "●", bank: "K" },
  { month: "October 2026", label: "Paid to", name: "Airtel Payments Bank", amount: 10, type: "debit", time: "1 day ago", icon: "↗", bank: "●" }
];

const list = document.getElementById("transactionList");
const searchInput = document.getElementById("searchInput");

function money(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}

function render(items) {
  list.innerHTML = "";
  if (!items.length) {
    list.innerHTML = '<div class="empty">No matching Phone pe transactions found.</div>';
    return;
  }

  const month = document.createElement("div");
  month.className = "month-row";
  month.innerHTML = `<span>October 2026</span><strong>Phone pe history　›</strong>`;
  list.appendChild(month);

  items.forEach(tx => {
    const row = document.createElement("article");
    row.className = "transaction";
    const iconClass = tx.iconType ? `tx-icon ${tx.iconType}` : "tx-icon";
    const amountClass = tx.type === "credit" ? "tx-amount credit" : "tx-amount";
    const amountText = tx.type === "credit" ? `+ ${money(tx.amount)}` : money(tx.amount);
    row.innerHTML = `
      <div class="${iconClass}">${tx.icon}</div>
      <div class="tx-content">
        <div class="tx-label">${tx.label}</div>
        <div class="tx-name-row">
          <div class="tx-name" title="${tx.name}">${tx.name}</div>
          <div class="${amountClass}">${amountText}</div>
        </div>
        <div class="tx-meta">
          <span>${tx.time}</span>
          <span>${tx.type === "credit" ? "Credited to" : "Debited from"} <span class="bank-mark">${tx.bank}</span></span>
        </div>
      </div>`;
    list.appendChild(row);
  });
}

searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  render(transactions.filter(tx =>
    `${tx.label} ${tx.name} ${tx.amount} ${tx.time}`.toLowerCase().includes(q)
  ));
});

document.getElementById("filterBtn").addEventListener("click", () => {
  const credits = transactions.filter(tx => tx.type === "credit");
  const debits = transactions.filter(tx => tx.type === "debit");
  const showCredits = confirm("OK = show received transactions only. Cancel = show paid transactions only.");
  render(showCredits ? credits : debits);
});

document.querySelectorAll(".nav-item, .scan").forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.tab === "History") render(transactions);
    else alert(`${button.dataset.tab} is a Phone pe navigation item.`);
    document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("active", item === button));
  });
});

render(transactions);
