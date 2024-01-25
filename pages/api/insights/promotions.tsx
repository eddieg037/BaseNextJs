import { TotalPromotions } from "@/data/definitions";
import { promotionsRepo } from "@/helpers/repos/promotions-repo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const promotions = promotionsRepo.getAll();
    let totalPromotions: TotalPromotions = {
      totalYes: 0,
      totalNo: 0,
    };
    for (const promotion of promotions) {
      promotion.responded === "No"
        ? ++totalPromotions.totalNo
        : ++totalPromotions.totalYes;
    }

    res.status(200).json(totalPromotions);
  } catch (error) {
    res.status(500).json({
      error: `failed to execute get all people`,
    });
  }
}
