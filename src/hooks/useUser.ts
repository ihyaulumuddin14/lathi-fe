import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useUser = () => {
  const { data: user, error, isLoading, mutate: mutateUser } = useSWR(
    "/api/v1/me",
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false
    }
  )

  return {
    user,
    error,
    isLoading,
    mutateUser
  }
}