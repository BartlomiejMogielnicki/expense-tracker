const balance = document.getElementById('balance');
const income = document.getElementById('money-income');
const expense = document.getElementById('money-expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const addText = document.getElementById('text');
const addAmount = document.getElementById('amount');

// Get data from local storage
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Get new id
const getID = () => {
    return Math.floor(Math.random() * 10000000);
}

// Add transaction
const addTransaction = (e) => {
    e.preventDefault();

    // Create new transaction object
    const transaction = {
        id: getID(),
        text: addText.value,
        amount: +addAmount.value
    }

    // Push object to transactions array and update DOM
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    // Clear inputs
    addText.value = "";
    addAmount.value = "";
}

// Add transactions to DOM
const addTransactionDOM = (transaction) => {
    // Income or expense
    const sign = transaction.amount < 0 ? 'expense' : 'income';

    // Add item to list
    const item = document.createElement('li');
    item.classList.add(sign === 'expense' ? 'expense' : 'income');
    item.innerHTML = `${transaction.text} <span>${transaction.amount}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`

    list.appendChild(item);
}

// Update balance, expense and income
const updateValues = () => {
    const amounts = transactions.map(transaction => transaction.amount);
    // Balance
    const balanceValue = amounts
        .reduce((acc, item) => (acc + item), 0)
        .toFixed(2);

    // Total expense
    const expenseValue = amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc + item), 0)
        .toFixed(2);

    // Total income
    const incomeValue = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc + item), 0)
        .toFixed(2);

    // Update DOM 
    balance.textContent = `$${balanceValue}`;
    income.textContent = `$${incomeValue}`;
    expense.textContent = `$${Math.abs(expenseValue).toFixed(2)}`;
}

// Remove transaction
const removeTransaction = (id) => {
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
    updateLocalStorage();
}

// Update local storage
const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
const init = () => {
    list.innerHTML = ""

    transactions.forEach(item => {
        addTransactionDOM(item);
    })
    updateValues();
}

init();

// Event listeners
form.addEventListener('submit', addTransaction);