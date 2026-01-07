import { Slide } from "@/schema/GameSchema";
import { useGameInfo } from "@/stores/useGameInfo";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useSlides = (shouldFetch: boolean) => {
   const { selectedChapterId } = useGameInfo()
   const { data, error, isLoading } = useSWR(
      selectedChapterId && shouldFetch ? `/stories/chapters/${selectedChapterId}/content` : null,
      fetcher,
      {
         revalidateOnFocus: false
      }
   )

   return {
      slides: data?.data?.slides as Slide[],
      error,
      isLoading
   }
}