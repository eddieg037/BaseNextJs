import { Person } from "../../data/definitions";

const fs = require("fs");

// people in JSON file for simplicity, store in a db for production applications
let people = require("@/data/people.json");

export const peopleRepo = {
  getAll: () => people,
  getById: (id: number) =>
    people.find((person: Person) => person.id.toString() === id.toString()),
  find: (person: Person) => people.find(person),
  create,
  update,
  delete: _delete,
  importPeople,
};

function importPeople(allPeople: Person[]) {
  people = [...allPeople];
  saveData();
}

function create(person: Person) {
  // generate new person id
  person.id = people.length
    ? Math.max(...people.map((person: Person) => person.id)) + 1
    : 1;
  // add and save person
  people.push(person);
  saveData();
}

function update(id: number, params: Person) {
  const person = people.find(
    (person: Person) => person.id.toString() === id.toString()
  );

  // set date updated
  person.dateUpdated = new Date().toISOString();

  // update and save
  Object.assign(person, params);
  saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id: number) {
  // filter out deleted person and save
  people = people.filter((x: Person) => x.id.toString() !== id.toString());
  saveData();
}

// private helper functions
function saveData() {
  fs.writeFileSync("data/people.json", JSON.stringify(people, null, 4));
}
