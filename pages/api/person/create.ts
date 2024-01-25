import { peopleRepo } from "@/helpers/repos/people-repo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const result = peopleRepo.create(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        error: `failed to create person`,
      });
    }
  } else {
    res.status(404).json({
      error: `Specified endpoint not found`,
    });
  }
}
