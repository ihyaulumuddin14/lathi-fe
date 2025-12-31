import { Slide } from "@/schema/GameSchema";
import { useGameInfo } from "@/stores/useGameInfo";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useSlides = () => {
   const { selectedChapterId } = useGameInfo()
   const { data, error, isLoading } = useSWR(
      `/stories/chapters/${selectedChapterId}/content`,
      fetcher,
      {
         revalidateOnFocus: false
      }
   )

   return {
      slides: data.data?.slides as Slide[],
      error,
      isLoading
   }
}