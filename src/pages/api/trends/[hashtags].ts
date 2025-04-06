// pages/api/trends/[hashtag].ts
import { mockTrendData } from "../../../mocks/trendData";

export default function handler(req, res) {
  // Simulate fetching data based on the hashtag
  const { hashtag } = req.query;

  if (hashtag === "uri") {
    res.status(200).json(mockTrendData);
  } else {
    res.status(404).json({ error: "Hashtag not found" });
  }
}
