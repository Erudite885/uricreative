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

interface LineSeriesType {
  // Define other properties for the series here, if needed
  highlightedMarkStyle?: (args: { index: number }) => { fill: string; r: number };
  color?: string;
  showMark?: boolean;
  highlightScope?: { highlighted: "item"; faded: "global" };
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
        overflowX: "auto", // Just in case x-axis labels overflow
      }}
    >
      <LineChart
        xAxis={[{ scaleType: "point", data: dates }]}
        series={[
          {
            data: sentiments,
            color: "#1976d2",
            showMark: true,
            highlightScope: {
              highlighted: "item",
              faded: "global",
            },
            highlightedMarkStyle: ({ index }) => {
              if (index === minIndex) return { fill: "red", r: 6 };
              if (index === maxIndex) return { fill: "green", r: 6 };
              return { r: 3 };
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
