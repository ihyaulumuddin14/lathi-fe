import { create } from "zustand";

type AuthProps = {
  accessToken: string | null,
  setAccessToken: (accessToken: string | null) => void
}

export const useAuthStore = create<AuthProps>(set => ({
  accessToken: null,
  setAccessToken: (accessToken: string | null) => set({ accessToken })
}))