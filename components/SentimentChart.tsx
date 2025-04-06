// components/SentimentChart.tsx
import { LineChart, Zoom } from "@mui/x-charts/LineChart";
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
        overflowX: "auto", // Just in case x-axis labels overflow
      }}
    >
      <Zoom>
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
          margin={{ top: 20, bottom: 40, left: 40, right: 20 }}
          grid={{ vertical: true, horizontal: true }}
          slots={{
            mark: ({ x, y, index }: any) => {
              if (index === minIndex) {
                return <circle cx={x} cy={y} r={6} fill="red" />;
              }
              if (index === maxIndex) {
                return <circle cx={x} cy={y} r={6} fill="green" />;
              }
              return <circle cx={x} cy={y} r={3} fill="#1976d2" />;
            },
          }}
        />
      </Zoom>
    </Box>
  );
}
