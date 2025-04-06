import { Box, Typography, Paper } from "@mui/material";
import { memo } from "react";

type Props = {
  hashtag: string;
  range: string;
  sentiment: number[];
};

function getTrendDirection(sentiment: number[]) {
  if (sentiment[sentiment.length - 1] > sentiment[0]) return "📈";
  if (sentiment[sentiment.length - 1] < sentiment[0]) return "📉";
  return "➖";
}

const HashtagTrendCard = ({ hashtag, range, sentiment }: Props) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h5">
        {hashtag} {getTrendDirection(sentiment)}
      </Typography>
      <Typography variant="subtitle1">{range}</Typography>
    </Paper>
  );
};

export default memo(HashtagTrendCard);
