// pages/insights/[hashtag].tsx
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton, useTheme } from "@mui/material";

import { useThemeMode } from "../../context/ThemeContext";
import { useHashtagTrend } from "../../hooks/useHashtagTrend";
import HashtagTrendCard from "../../components/HashtagTrendCard";
// import SentimentChart from "../../components/SentimentChart";

const SentimentChart = dynamic(
  () => import("../../components/SentimentChart"),
  {
    ssr: false,
    loading: () => <p>Loading chart...</p>,
  }
);

const availableHashtags = ["uri", "nextjs", "react", "frontend"]; // Add more as needed

export default function HashtagPage() {
  const theme = useTheme();
  const { toggleMode } = useThemeMode();
  const router = useRouter();
  const { isReady, query, push } = router;
  const hashtag = typeof query.hashtag === "string" ? query.hashtag : null;

  const { data, isLoading, isError, refetch } = useHashtagTrend(hashtag || "");

  const handleChange = (event: any) => {
    const newHashtag = event.target.value;
    push(`/insights/${newHashtag}`);
  };

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
        <Box display="flex" gap={2}>
          <Button variant="outlined" onClick={() => router.back()}>
            Go Back
          </Button>
          <Button variant="contained" onClick={() => refetch()}>
            Retry
          </Button>
        </Box>
      </Box>
    );

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, pt: 2 }}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <IconButton onClick={toggleMode}>
          {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>
      {/* Dropdown to select hashtag */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="hashtag-select-label">Select Hashtag</InputLabel>
        <Select
          labelId="hashtag-select-label"
          value={hashtag}
          label="Select Hashtag"
          onChange={handleChange}
        >
          {availableHashtags.map((tag) => (
            <MenuItem key={tag} value={tag}>
              #{tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <HashtagTrendCard
        hashtag={data.hashtag}
        range={data.range}
        sentiment={data.trend.map((t: any) => t.sentiment)}
      />
      <SentimentChart data={data.trend} />
    </Box>
  );
}
