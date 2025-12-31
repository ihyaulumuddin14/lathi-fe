import { accessTokenDummy } from "@/utils/constant";
import { create } from "zustand";

export type User = {
  id: string,
  name: string,
  email: string
}

type AuthProps = {
  accessToken: string | null,
  setAccessToken: (accessToken: string | null) => void
}

export const useAuthStore = create<AuthProps>(set => ({
  accessToken: accessTokenDummy,
  setAccessToken: (accessToken: string | null) => set({ accessToken })
}))