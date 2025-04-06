import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useHashtagTrend = (hashtag: string) => {
  return useQuery({
    queryKey: ["hashtagTrend", hashtag],
    queryFn: async () => {
      const { data } = await axios.get(`/api/trends/${hashtag}`);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
