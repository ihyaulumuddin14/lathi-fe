import { useGameInfo } from "@/stores/useGameInfo";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useSession = () => {
   const { selectedChapterId } = useGameInfo()
   const { data, error, isLoading, mutate } = useSWR(
      selectedChapterId ? `/stories/chapters/${selectedChapterId}/session` : null,
      fetcher,
      {
         revalidateOnReconnect: true,
         shouldRetryOnError: false
      }
   )

   return {
      sessionData: data,
      error,
      isLoading,
      mutateSession: mutate
   }
}