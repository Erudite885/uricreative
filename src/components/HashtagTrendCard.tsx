// components/HashtagTrendCard.tsx
import { Box, Typography, Stack, CircularProgress, Alert } from "@mui/material";
import SentimentChart from "./SentimentChart";
import { useHashtagTrend } from "../hooks/useHashtagTrend";
import { memo } from "react";

interface HashtagTrendCardProps {
  hashtag: string;
}

const HashtagTrendCard: React.FC<HashtagTrendCardProps> = ({ hashtag }) => {
  const { data, isLoading, isError, error } = useHashtagTrend(hashtag);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        Failed to load data: {(error as Error).message || "Unknown error"}
      </Alert>
    );
  }

  const trendData = data?.trend || [];
  const range = data?.range || "";
  const lastSentiment = trendData[trendData.length - 1]?.sentiment || 0;
  const trendIndicator = lastSentiment > 0 ? "📈" : "📉";

  return (
    <Stack
      spacing={2}
      sx={{ p: 2, bgcolor: "background.paper", borderRadius: 2 }}
    >
      <Typography variant="h5">{`#${hashtag}`}</Typography>
      <Typography variant="body1">{range}</Typography>
      <SentimentChart data={trendData} />
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        {`${trendIndicator} Sentiment Trend`}
      </Typography>
    </Stack>
  );
};

export default memo(HashtagTrendCard);
