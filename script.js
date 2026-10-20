// Clearly labeled PhonePe-style demo data.
// Replace these objects only with your own authorized data.
const transactions = [
  // PhonePe ONLY: sample pair for the mock history UI.
  { month: "October 2026", label: "Credit card bill paid", name: "XXXXXXXXXXXX5619", amount: 18000, type: "debit", time: "4 hours ago", icon: "▤", iconType: "card", bank: "∞" },
  { month: "October 2026", label: "Received from", name: "TEEJAMAL GYANI LAL", amount: 18000, type: "credit", time: "4 hours ago", icon: "↙", bank: "∞" },
  { month: "October 2026", label: "Paid to", name: "Ankit Bhaiya", amount: 1, type: "debit", time: "4 hours ago", icon: "💻", iconType: "avatar", bank: "∞" },
  { month: "October 2026", label: "Credit card bill paid", name: "XXXXXXXXXXXX4779", amount: 14900, type: "debit", time: "1 hour ago", icon: "▤", iconType: "card", bank: "∞" },
  { month: "October 2026", label: "Received from", name: "LAXMAN RAMESHCHA...", amount: 14900, type: "credit", time: "1 hour ago", icon: "↙", bank: "∞" },
  { month: "October 2026", label: "Paid to", name: "Ankit Bhaiya", amount: 10400, type: "debit", time: "2 hours ago", icon: "💻", iconType: "avatar", bank: "●" },
  { month: "October 2026", label: "Transfer to", name: "XXXXXXXXX0155", amount: 1, type: "debit", time: "5 hours ago", icon: "∞", bank: "●" },
  { month: "October 2026", label: "Received from", name: "KRISHNA GUPTA", amount: 8400, type: "credit", time: "6 hours ago", icon: "↙", bank: "●" },
  { month: "October 2026", label: "Received from", name: "KRISHNA GUPTA", amount: 2000, type: "credit", time: "6 hours ago", icon: "↙", bank: "●" },
  { month: "October 2026", label: "Paid to", name: "Neeraj Kumar Shukla", amount: 40, type: "debit", time: "8 hours ago", icon: "↗", bank: "●" },
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
    list.innerHTML = '<div class="empty">No matching demo transactions found.</div>';
    return;
  }

  const month = document.createElement("div");
  month.className = "month-row";
  month.innerHTML = `<span>October 2026</span><strong>Demo history　›</strong>`;
  list.appendChild(month);

  items.forEach(tx => {
    const row = document.createElement("article");
    row.className = "transaction";

    const iconClass = tx.iconType ? `tx-icon ${tx.iconType}` : "tx-icon";
    const amountClass = tx.type === "credit" ? "tx-amount credit" : "tx-amount";
    const amountText = tx.type === "credit"
      ? `+ ${money(tx.amount)}`
      : money(tx.amount);

    // Use textContent for user-controlled strings to avoid injecting HTML.
    const icon = document.createElement("div");
    icon.className = iconClass;
    icon.textContent = tx.icon;

    const content = document.createElement("div");
    content.className = "tx-content";

    const label = document.createElement("div");
    label.className = "tx-label";
    label.textContent = tx.label;

    const nameRow = document.createElement("div");
    nameRow.className = "tx-name-row";

    const name = document.createElement("div");
    name.className = "tx-name";
    name.title = tx.name;
    name.textContent = tx.name;

    const amount = document.createElement("div");
    amount.className = amountClass;
    amount.textContent = amountText;

    const meta = document.createElement("div");
    meta.className = "tx-meta";

    const time = document.createElement("span");
    time.textContent = tx.time;

    const bankInfo = document.createElement("span");
    bankInfo.append(
      document.createTextNode(
        `${tx.type === "credit" ? "Credited to" : "Debited from"} `
      )
    );

    const bankMark = document.createElement("span");
    bankMark.className = "bank-mark";
    bankMark.textContent = tx.bank;
    bankInfo.appendChild(bankMark);

    nameRow.append(name, amount);
    meta.append(time, bankInfo);
    content.append(label, nameRow, meta);
    row.append(icon, content);
    list.appendChild(row);
  });
}

searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();

  render(transactions.filter(tx =>
    `${tx.label} ${tx.name} ${tx.amount} ${tx.time}`
      .toLowerCase()
      .includes(q)
  ));
});

document.getElementById("filterBtn").addEventListener("click", () => {
  const credits = transactions.filter(tx => tx.type === "credit");
  const debits = transactions.filter(tx => tx.type === "debit");

  const showCredits = confirm(
    "OK = show received demo transactions only. Cancel = show paid demo transactions only."
  );

  render(showCredits ? credits : debits);
});

document.querySelectorAll(".nav-item, .scan").forEach(button => {
  button.addEventListener("click", () => {
    const tab = button.dataset.tab || button.textContent.trim();

    if (tab === "History") {
      render(transactions);
    } else {
      alert(`${tab} is a demo navigation item.`);
    }

    document.querySelectorAll(".nav-item").forEach(item => {
      item.classList.toggle("active", item === button);
    });
  });
});

render(transactions);
