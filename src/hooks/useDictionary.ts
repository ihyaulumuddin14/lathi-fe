import { DictionaryItem, Pagination } from "@/schema/GameSchema";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useDictionary = ({
   search,
   page,
   limit = 10
}: {
   search?: string,
   page?: number,
   limit?: number
}) => {
   const params = new URLSearchParams()

   if (search) params.append("search", search)
   if (page) params.append("page", page.toString())
   if (limit) params.append("limit", limit.toString())
 
   const { data, error, isLoading, mutate: mutateDictionary } = useSWR(
      `/dictionaries?${params.toString()}`,
      fetcher,
      {
         shouldRetryOnError: true
      }
   )

   return {
      items: data?.data.items as DictionaryItem[],
      pagination: data?.data.pagination as Pagination,
      error,
      isLoading,
      mutateDictionary
   }
}