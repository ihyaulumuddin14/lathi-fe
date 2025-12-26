import { create } from "zustand";

export type User = {
  id: string,
  name: string,
  email: string
}

type AuthProps = {
  user: User | null
  setUser: (params: User | null) => void
  accessToken: string | null,
  setAccessToken: (accessToken: string | null) => void
}

export const useAuth = create<AuthProps>(set => ({
  user: {
    id: "123543214",
    name: "Ulum",
    email: "ulum@gmail.com"
  } as User,
  setUser: (user: User | null) => set({ user }),
  accessToken: null,
  setAccessToken: (accessToken: string | null) => set({ accessToken })
}))