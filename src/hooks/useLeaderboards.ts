import { LeaderboardItem } from "@/schema/GameSchema";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useLeaderboards = () => {
   const { data, error, isLoading } = useSWR(
      "/leaderboards",
      fetcher,
      {
         revalidateOnReconnect: true,
         shouldRetryOnError: true
      }
   )

   return {
      topUsers: data?.data.top_users as LeaderboardItem[],
      error,
      isLoading
   }
}