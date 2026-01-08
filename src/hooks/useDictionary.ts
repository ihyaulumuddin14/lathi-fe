import { DictionaryItem, Pagination } from "@/schema/GameSchema";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useDictionary = ({
   search,
   page = 1,
   limit = 10
}: {
   search?: string,
   page?: number,
   limit?: number
}) => {
   const { data, error, isLoading } = useSWR(
      `/dictionaries?search=${search}&page=${page}&limit=${limit}`,
      fetcher,
      {}
   )

   return {
      items: data?.data.items as DictionaryItem[],
      pagination: data?.data.pagination as Pagination,
      error,
      isLoading
   }
}