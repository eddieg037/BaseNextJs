import { Transfer } from "../../data/definitions";

const fs = require("fs");

// transfers in JSON file for simplicity, TODO: store in a db for production applications
let transfers = require("@/data/transfers.json");

export const transfersRepo = {
  getAll: () => transfers,
  getById: (id: number) =>
    transfers.find(
      (transfer: Transfer) => transfer.id.toString() === id.toString()
    ),
  find: (transfer: Transfer) => transfers.find(transfer),
  create,
  update,
  delete: _delete,
  importTransfers,
};

function importTransfers(allTransfers: Transfer[]) {
  transfers = [...allTransfers];
  saveData();
}

function create(transfer: Transfer) {
  // generate new transfer id
  transfer.id = transfers.length
    ? Math.max(...transfers.map((transfer: Transfer) => transfer.id)) + 1
    : 1;
  // add and save transfer
  transfers.push(transfer);
  saveData();
}

function update(id: number, params: Transfer) {
  const transfer = transfers.find(
    (transfer: Transfer) => transfer.id.toString() === id.toString()
  );
  Object.assign(transfer, params);
  saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id: number) {
  // filter out deleted transfer and save
  transfers = transfers.filter(
    (transfer: Transfer) => transfer.id.toString() !== id.toString()
  );
  saveData();
}

// private helper functions
function saveData() {
  fs.writeFileSync("data/transfers.json", JSON.stringify(transfers, null, 4));
}
