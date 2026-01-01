import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import { User } from "@/stores/useAuthStore"

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
    user: user as User,
    error,
    isLoading,
    mutateUser
  }
}