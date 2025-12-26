import { create } from "zustand"

type MenuProps = {
  isOpenMenu: boolean
  setIsOpenMenu: (open: boolean) => void
}

export const useMenu = create<MenuProps>(set => ({
  isOpenMenu: false,
  setIsOpenMenu: (open: boolean) => set({ isOpenMenu: open })
}))