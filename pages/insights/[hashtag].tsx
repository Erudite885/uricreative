import { useRouter } from "next/router";

import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { useHashtagTrend } from "../../hooks/useHashtagTrend";
import HashtagTrendCard from "../../components/HashtagTrendCard";
import SentimentChart from "../../components/SentimentChart";

export default function HashtagPage() {
  const { isReady, query } = useRouter();

   const hashtag = typeof query.hashtag === "string" ? query.hashtag : null;

  const { data, isLoading, isError, refetch } = useHashtagTrend(hashtag || "");

  
  if (!isReady || !hashtag) {
    return (
      <Box p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isLoading)
    return (
      <Box p={4}>
        <CircularProgress />
      </Box>
    );
  if (isError || !data)
    return (
      <Box p={4}>
        <Typography color="error">Error loading data.</Typography>
        <Button variant="outlined" onClick={() => refetch()}>
          Retry
        </Button>
      </Box>
    );

  return (
    <Box p={2}>
      <HashtagTrendCard
        hashtag={data.hashtag}
        range={data.range}
        sentiment={data.trend.map((t: any) => t.sentiment)}
      />
      <SentimentChart data={data.trend} />
    </Box>
  );
}
