import { Chapter } from '@/schema/GameSchema';
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";


export const useChapter = () => {
   const { data, error, isLoading, isValidating } = useSWR(
      "/stories/chapters",
      fetcher,
      {
         revalidateOnFocus: false,
         shouldRetryOnError: true
      }
   )

   return {
      chapters: data?.data as Chapter[],
      error,
      isLoading,
      isValidating
   }
}