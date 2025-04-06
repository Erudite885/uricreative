// pages/insights/[hashtag].tsx
import { useRouter, usePathname } from "next/navigation";
import HashtagTrendCard from "../../components/HashtagTrendCard";
import { Box, Button, Select, MenuItem } from "@mui/material";

export default function HashtagInsightsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { hashtag } = router.query;

  const handleHashtagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedHashtag = event.target.value;
    router.push(`/insights/${selectedHashtag}`);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Select
          value={hashtag || ""}
          onChange={handleHashtagChange}
          label="Select Hashtag"
          fullWidth
        >
          <MenuItem value="uri">#uri</MenuItem>
          <MenuItem value="example">#example</MenuItem>
          <MenuItem value="test">#test</MenuItem>
        </Select>
      </Box>
      <HashtagTrendCard hashtag={hashtag as string} />
    </Box>
  );
}
