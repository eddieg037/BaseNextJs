import { transactionsRepo } from "@/helpers/repos/transactions-repo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = transactionsRepo.getAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: `failed to execute get all transactions`,
    });
  }
}
