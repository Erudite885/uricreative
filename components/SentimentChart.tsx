import { LineChart } from "@mui/x-charts/LineChart";
import { memo } from "react";

type Props = {
  data: { date: string; sentiment: number }[];
};

const SentimentChart = ({ data }: Props) => {
  return (
    <LineChart
      xAxis={[{ data: data.map((d) => d.date), scaleType: "point" }]}
      series={[{ data: data.map((d) => d.sentiment) }]}
      height={300}
      sx={{ maxWidth: "100%" }}
    />
  );
};

export default memo(SentimentChart);
