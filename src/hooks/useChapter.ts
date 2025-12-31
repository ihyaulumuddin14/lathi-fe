import { Chapter } from '@/schema/GameSchema';
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";


export const useChapter = () => {
   const { data: chapters, error, isLoading } = useSWR(
      "api/v1/stories/chapters",
      fetcher,
      {
         revalidateOnFocus: false
      }
   )

   return {
      chapters: chapters as Chapter[],
      error,
      isLoading
   }
}