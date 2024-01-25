import {
  Person,
  Promotion,
  Transaction,
  Transfer,
  ImportTemplate,
} from "@/data/definitions";
import { fileParser } from "@/helpers/file-parser";
import { peopleRepo } from "@/helpers/repos/people-repo";
import { promotionsRepo } from "@/helpers/repos/promotions-repo";
import { transactionsRepo } from "@/helpers/repos/transactions-repo";
import { transfersRepo } from "@/helpers/repos/transfers-repo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const file1 = "./data/datafiles/people.json";
      const file2 = "./data/datafiles/transactions.xml";
      const file3 = "./data/datafiles/promotions.csv";
      const file4 = "./data/datafiles/people.yml";
      const file5 = "./data/datafiles/transfers.csv";
      const filePaths = [file1, file2, file3, file4, file5];

      let people: Person[] = [];
      let promotions: Promotion[] = [];
      let transactions: Transaction[] = [];
      let transfers: Transfer[] = [];

      fileParser
        .readAndParseFiles(filePaths)
        .then(async (fileContents) => {
          for (const file of fileContents) {
            if (file.people) {
              const normalizedPeople = file.people.map((person: any) => {
                if (person.firstName) {
                  return {
                    id: parseInt(person.id),
                    firstName: person.firstName,
                    surname: person.surname,
                    email: person.email,
                    city: person.location.city,
                    country: person.location.country,
                    telephone: person.telephone,
                    devices: person.devices,
                  };
                } else {
                  const splitName = person.name.split(" ");
                  const splitLocation = person.city.split(", ");
                  let devices = [];
                  if (person.iPhone) devices.push("iPhone");
                  if (person.Android) devices.push("Android");
                  if (person.Desktop) devices.push("Desktop");
                  return {
                    id: parseInt(person.id),
                    firstName: splitName[0],
                    surname: splitName.slice(1).join(" "),
                    email: person.email,
                    city: splitLocation[0],
                    country: splitLocation.slice(1).join(" "),
                    telephone: person.phone,
                    devices,
                  };
                }
              });
              // Remove duplicate people *Very sneaky*
              const allPeople = [...people, ...normalizedPeople];
              people = allPeople.filter((person, index) => {
                return index === allPeople.findIndex((p) => person.id === p.id);
              });
            } else if (file[0].client_email) {
              // Add Id to make it searchable
              let id = promotions.length;
              const normalizedPromotions = file.map((_promotion: any) => {
                return {
                  id: ++id,
                  clientEmail: _promotion.client_email,
                  telephone: _promotion.telephone,
                  promotion: _promotion.promotion,
                  responded: _promotion.responded,
                };
              });
              promotions = [...promotions, ...normalizedPromotions];
            } else if (file[0].item) {
              transactions = [...transactions, ...file];
            } else {
              // Add id to make it searchable
              let id = transactions.length;
              const normalizedTransfers = file.map((transfer: any) => ({
                id: ++id,
                senderId: transfer.sender_id,
                recipientId: transfer.recipient_id,
                amount: transfer.amount,
                date: transfer.date,
              }));
              transfers = [...transfers, ...normalizedTransfers];
            }
          }
          peopleRepo.importPeople(people);
          promotionsRepo.importPromotions(promotions);
          transactionsRepo.importTransactions(transactions);
          transfersRepo.importTransfers(transfers);
        })
        .catch((error) => {
          console.error("Error while preparing data:", error);
        });
      res.status(200).json({ message: "Import has been succesfull" });
    } catch (error) {
      res.status(500).json({
        error: `failed to import data`,
      });
    }
  } else if (req.method === "DELETE") {
    try {
      peopleRepo.importPeople([]);
      promotionsRepo.importPromotions([]);
      transactionsRepo.importTransactions([]);
      transfersRepo.importTransfers([]);
      res.status(200).json({ message: "Delete has been succesfull" });
    } catch (error) {
      res.status(500).json({
        error: `failed to import data`,
      });
    }
  } else {
    res.status(404).json({
      error: `Specified endpoint not found`,
    });
  }
}

const file1 = "../data/people.json";
const file2 = "../data/transactions.xml";
const file3 = "../data/promotions.csv";
const file4 = "../data/people.yml";
const file5 = "../data/transfers.csv";
const filePaths = [file1, file2, file3, file4, file5];

let people: Person[] = [];
let promotions: Promotion[] = [];
let transactions: Transaction[] = [];
let transfers: Transfer[] = [];

fileParser
  .readAndParseFiles(filePaths)
  .then(async (fileContents) => {
    for (const file of fileContents) {
      if (file.people) {
        const normalizedPeople = file.people.map((person: any) => {
          if (person.firstName) {
            return {
              id: person.id,
              firstName: person.firstName,
              surname: person.surname,
              email: person.email,
              city: person.location.city,
              country: person.location.country,
              telephone: person.telephone,
              devices: person.devices,
            };
          } else {
            const splitName = person.name.split(" ");
            const splitLocation = person.city.split(", ");
            let devices = [];
            if (person.iPhone) devices.push("iPhone");
            if (person.Android) devices.push("Android");
            if (person.Desktop) devices.push("Desktop");
            return {
              id: person.id,
              firstName: splitName[0],
              surname: splitName.slice(1).join(" "),
              email: person.email,
              city: splitLocation[0],
              country: splitLocation.slice(1).join(" "),
              telephone: person.phone,
              devices,
            };
          }
        });

        people = [...people, ...normalizedPeople];
      } else if (file[0].client_email) {
        const normalizedPromotions = file.map((_promotion: any) => {
          return {
            clientEmail: _promotion.client_email,
            telephone: _promotion.telephone,
            promotion: _promotion.promotion,
            responded: _promotion.responded,
          };
        });
        promotions = [...promotions, ...normalizedPromotions];
      } else if (file[0].item) {
        transactions = [...transactions, ...file];
      } else {
        const normalizedTransfers = file.map((transfer: any) => ({
          senderId: transfer.sender_id,
          recipientId: transfer.recipient_id,
          amount: transfer.amount,
          date: transfer.date,
        }));
        transfers = [...transfers, ...normalizedTransfers];
      }
    }
    const importObj: ImportTemplate = {
      people,
      promotions,
      transactions,
      transfers,
    };
    return importObj;
  })
  .catch((error) => {
    console.error("Error:", error);
  });
