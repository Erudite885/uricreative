// components/SentimentChart.tsx
import { useMemo } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "@mui/x-charts";

interface SentimentChartProps {
  data: { date: string; sentiment: number }[];
}

export const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  const chartData = useMemo(
    () =>
      data.map((point) => ({
        x: new Date(point.date),
        y: point.sentiment,
      })),
    [data]
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis
          dataKey="x"
          scale="time"
          tickFormatter={(date) => date.toLocaleDateString()}
        />
        <YAxis domain={[-1, 1]} />
        <Tooltip formatter={(value) => `${value}`} />
      </LineChart>
    </ResponsiveContainer>
  );
};
