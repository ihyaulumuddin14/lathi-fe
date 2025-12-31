import { Slide } from "@/schema/GameSchema";
import { useGameInfo } from "@/stores/useGameInfo";
import { slidesDummy } from "@/utils/constant";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

const fetcherSlide = async (url: string) => {
   console.log("lagi fetching")
   await new Promise(res => {
      setTimeout(res, 3000)
   })

   return {
      data: {
         slides: slidesDummy
      }
   }
}

export const useSlides = (shouldFetch: boolean) => {
   const { selectedChapterId } = useGameInfo()
   const { data, error, isLoading } = useSWR(
      selectedChapterId && shouldFetch ? `/stories/chapters/${selectedChapterId}/content` : null,
      fetcherSlide,
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