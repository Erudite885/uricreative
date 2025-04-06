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

  // Create an array for marker sizes
  const markerSizes = sentiments.map((_, index) => 
    index === minIndex || index === maxIndex ? 6 : 0
  );

  // Create custom colors for the markers
  const markerColors = sentiments.map((_, index) => 
    index === minIndex ? "red" : index === maxIndex ? "green" : "#1976d2"
  );

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
            valueFormatter: (value, context) => {
              // This is primarily for tooltips
              return `${value.toFixed(1)}`;
            },
            // Using marker configuration instead of callback functions
            marker: {
              size: markerSizes,
              color: markerColors,
            },
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
