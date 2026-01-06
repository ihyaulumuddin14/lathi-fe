import { create } from "zustand";

export type User = {
   id: string,
   username: string,
   email: string
}

type AuthProps = {
  accessToken: string | null,
  setAccessToken: (accessToken: string | null) => void
}

export const useAuthStore = create<AuthProps>(set => ({
  accessToken: null,
  setAccessToken: (accessToken: string | null) => set({ accessToken })
}))