import { peopleRepo } from "@/helpers/repos/people-repo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = parseInt(String(req.query.id));
  if (id) {
    try {
      if (req.method === "GET") {
        const result = peopleRepo.getById(id);
        res.status(200).json({ result });
      } else if (req.method === "PUT") {
        const result = peopleRepo.update(id, req.body);
        res.status(200).json({ message: "Update Succesfull" });
      } else if (req.method === "DELETE") {
        const result = peopleRepo.delete(id);
        res.status(200).json({ message: "Delete succesfull" });
      }
    } catch (error) {
      res.status(500).json({
        error: `failed to execute ${req.method} on person with id: ${id}`,
      });
    }
  }
}
