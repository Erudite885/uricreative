import type { NextApiRequest, NextApiResponse } from "next";
import { trendData } from "../../../mocks/trendData";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { hashtag } = req.query;

  console.log("Received hashtag:", hashtag);

  if (!hashtag || typeof hashtag !== "string") {
    return res.status(400).json({ error: "Invalid hashtag" });
  }

  if (hashtag.toLowerCase() === "uri") {
    return res.status(200).json(trendData);
  }

  return res.status(404).json({ error: "Hashtag not found" });
}
