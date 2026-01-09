import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import { User } from "@/schema/AuthSchema"

export const useUser = () => {
  const { data, error, isLoading, isValidating, mutate: mutateUser } = useSWR(
    "/users/profile",
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: true
    }
  )

  return {
    user: data?.data as User,
    error,
    isLoading,
    isValidating,
    mutateUser
  }
}