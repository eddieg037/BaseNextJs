import { Transaction } from "../../data/definitions";

const fs = require("fs");

// transactions in JSON file for simplicity, TODO: store in a db for production applications
let transactions = require("@/data/transactions.json");

export const transactionsRepo = {
  getAll: () => transactions,
  getById: (id: number) =>
    transactions.find(
      (transaction: Transaction) => transaction.id.toString() === id.toString()
    ),
  find: (transaction: Transaction) => transactions.find(transaction),
  create,
  update,
  delete: _delete,
  importTransactions,
};

function importTransactions(allTransactions: Transaction[]) {
  transactions = [...allTransactions];
  saveData();
}

function create(transaction: Transaction) {
  // generate new transaction id
  transaction.id = transactions.length
    ? Math.max(
        ...transactions.map((transaction: Transaction) => transaction.id)
      ) + 1
    : 1;
  // add and save transaction
  transactions.push(transaction);
  saveData();
}

function update(id: number, params: Transaction) {
  const transaction = transactions.find(
    (transaction: Transaction) => transaction.id.toString() === id.toString()
  );
  Object.assign(transaction, params);
  saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id: number) {
  // filter out deleted transaction and save
  transactions = transactions.filter(
    (transaction: Transaction) => transaction.id.toString() !== id.toString()
  );
  saveData();
}

// private helper functions
function saveData() {
  fs.writeFileSync(
    "data/transactions.json",
    JSON.stringify(transactions, null, 4)
  );
}
