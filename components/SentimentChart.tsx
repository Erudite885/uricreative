// components/SentimentChart.tsx
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";
import { useMemo } from "react";

interface TrendPoint {
  date: string;
  sentiment: number;
}

interface SentimentChartProps {
  data: TrendPoint[];
}

export default function SentimentChart({ data }: SentimentChartProps) {
  const { dates, sentiments } = useMemo(() => {
    const sentiments = data.map((d) => d.sentiment);
    const dates = data.map((d) => d.date);
    return { dates, sentiments };
  }, [data]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        height: { xs: 300, sm: 400 },
        overflowX: "auto",
      }}
    >
      <LineChart
        xAxis={[{ scaleType: "point", data: dates }]}
        series={[
          {
            data: sentiments,
            color: "#1976d2",
            showMark: true,
          },
        ]}
        height={300}
        interaction={{
          zoom: true,
          pan: true,
        }}
      />
    </Box>
  );
}
