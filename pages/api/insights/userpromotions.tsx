import { Person } from "@/data/definitions";
import { peopleRepo } from "@/helpers/repos/people-repo";
import { promotionsRepo } from "@/helpers/repos/promotions-repo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const people = peopleRepo.getAll();
    const promotions = promotionsRepo.getAll();
    const result = people.map((person: any) => {
      person.promotions = [];
      for (const promotion of promotions) {
        if (
          promotion.clientEmail == person.email ||
          promotion.telephone == person.telephone
        ) {
          person.promotions.push(promotion);
        }
      }
      return person;
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: `failed to execute get all people`,
    });
  }
}
