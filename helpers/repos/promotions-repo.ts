import { Promotion } from "../../data/definitions";

const fs = require("fs");

// promotions in JSON file for simplicity, store in a db for production applications
let promotions = require("@/data/promotions.json");

export const promotionsRepo = {
  getAll: () => promotions,
  getById: (id: number) =>
    promotions.find(
      (promotion: Promotion) => promotion.id.toString() === id.toString()
    ),
  find: (promotion: Promotion) => promotions.find(promotion),
  create,
  update,
  delete: _delete,
  importPromotions,
};

function importPromotions(allPromotions: Promotion[]) {
  promotions = [...allPromotions];
  saveData();
}

function create(promotion: Promotion) {
  // generate new promotion id
  promotion.id = promotions.length
    ? Math.max(...promotions.map((promotion: Promotion) => promotion.id)) + 1
    : 1;
  // add and save promotion
  promotions.push(promotion);
  saveData();
}

function update(id: number, params: Promotion) {
  const promotion = promotions.find(
    (promotion: Promotion) => promotion.id.toString() === id.toString()
  );

  // update and save
  Object.assign(promotion, params);
  saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id: number) {
  // filter out deleted promotion and save
  promotions = promotions.filter(
    (promotion: Promotion) => promotion.id.toString() !== id.toString()
  );
  saveData();
}

// private helper functions
function saveData() {
  fs.writeFileSync("data/promotions.json", JSON.stringify(promotions, null, 4));
}
