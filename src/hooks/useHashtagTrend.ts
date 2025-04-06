// hooks/useHashtagTrend.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTrendData = async (hashtag: string) => {
  const response = await axios.get(`/api/trends/${hashtag}`);
  return response.data;
};

export function useHashtagTrend(hashtag: string) {
  return useQuery(["trend", hashtag], () => fetchTrendData(hashtag), {
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });
}
