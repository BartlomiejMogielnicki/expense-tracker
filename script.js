const balance = document.getElementById('balance');
const income = document.getElementById('money-income');
const expense = document.getElementById('money-expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const addText = document.getElementById('text');
const addAmount = document.getElementById('amount');

// Temporary data
const fakeTransactions = [{
        id: 1,
        text: 'Bills',
        amount: -500
    },
    {
        id: 2,
        text: 'Salary',
        amount: 1200
    },
    {
        id: 3,
        text: 'TV',
        amount: -250
    },
    {
        id: 4,
        text: 'Fuel',
        amount: -100
    }
];

let transactions = fakeTransactions;

// Add transactions
const addTransaction = (transaction) => {
    // Income or expense
    const sign = transaction.amount < 0 ? 'expense' : 'income';

    // Add item to list
    const item = document.createElement('li');
    item.classList.add(sign === 'expense' ? 'expense' : 'income');
    item.innerHTML = `${transaction.text} <span>${transaction.amount}</span><button class="delete-btn" id="delete-btn">x</button>`

    list.appendChild(item);
}

// Update balance, expense and income
const updateValues = () => {
    const amounts = transactions.map(transaction => transaction.amount);
    // Balance
    const balanceValue = amounts.reduce((acc, item) => acc + item).toFixed(2);

    // Total expense
    const expenseValue = amounts
        .filter(item => item < 0)
        .reduce((acc, item) => acc + item)
        .toFixed(2);

    // Total income
    const incomeValue = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item)
        .toFixed(2);

    // Update DOM 
    balance.textContent = `$${balanceValue}`;
    income.textContent = `$${incomeValue}`;
    expense.textContent = `$${Math.abs(expenseValue)}`;
}

// Init app
const init = () => {
    list.innerHTML = ""

    transactions.forEach(item => {
        addTransaction(item);
    })
    updateValues();
}

init();