// pages/insights/[hashtag].tsx
import { useRouter } from "next/router";
import HashtagTrendCard from "../../components/HashtagTrendCard";

export default function HashtagInsightsPage() {
  const router = useRouter();
  const { hashtag } = router.query;

  if (!hashtag) {
    return <div>Loading...</div>;
  }

  return <HashtagTrendCard hashtag={hashtag as string} />;
}
