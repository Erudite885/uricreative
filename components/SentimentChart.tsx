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
  // Memoized values for performance
  const { dates, sentiments, minIndex, maxIndex } = useMemo(() => {
    const sentiments = data.map((d) => d.sentiment);
    const dates = data.map((d) => d.date);

    const minSentiment = Math.min(...sentiments);
    const maxSentiment = Math.max(...sentiments);

    const minIndex = sentiments.indexOf(minSentiment);
    const maxIndex = sentiments.indexOf(maxSentiment);

    return { dates, sentiments, minIndex, maxIndex };
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
            showMark: ({ index }) => ({
              fill: index === minIndex 
                ? "red" 
                : index === maxIndex 
                ? "green" 
                : "#1976d2",
              stroke: "none",
              size: index === minIndex || index === maxIndex ? 6 : 3,
            }),
            highlightScope: {
              highlighted: "item",
              faded: "global",
            },
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
