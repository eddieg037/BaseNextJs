import { transactionsRepo } from "@/helpers/repos/transactions-repo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const result = transactionsRepo.create(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        error: `failed to create transaction`,
      });
    }
  } else {
    res.status(404).json({
      error: `Specified endpoint not found`,
    });
  }
}
