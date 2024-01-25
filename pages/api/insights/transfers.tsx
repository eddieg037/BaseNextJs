import { AllTransfers, Transfer } from "@/data/definitions";
import { peopleRepo } from "@/helpers/repos/people-repo";
import { transfersRepo } from "@/helpers/repos/transfers-repo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const transfers = transfersRepo.getAll();
    const people = peopleRepo.getAll();
    const peopleMap = new Map<number, string>();
    const allTransfers: AllTransfers[] = transfers.map((transfer: Transfer) => {
      let recipient;
      let sender;
      if (peopleMap.has(transfer.recipientId)) {
        recipient = peopleMap.get(transfer.recipientId);
      } else {
        for (const person of people) {
          if (person.id == transfer.recipientId) {
            let fullName = person.firstName + " " + person.surname;
            peopleMap.set(transfer.recipientId, fullName);
            recipient = fullName;
            break;
          }
        }
      }
      if (peopleMap.has(transfer.senderId)) {
        sender = peopleMap.get(transfer.senderId);
      } else {
        for (const person of people) {
          if (person.id == transfer.senderId) {
            let fullName = person.firstName + " " + person.surname;
            peopleMap.set(
              transfer.senderId,
              person.firstName + " " + person.surname
            );
            sender = fullName;
            break;
          }
        }
      }
      return {
        sender,
        recipient,
        amount: transfer.amount,
        date: transfer.date,
      };
    });
    res.status(200).json(allTransfers);
  } catch (error) {
    res.status(500).json({
      error: `failed to execute get transfer insights`,
    });
  }
}
