import { create } from "zustand"

type MenuProps = {
  isOpenMenu: boolean
  isOpenGameMenu: boolean
  setIsOpenMenu: (open: boolean) => void
  setIsOpenGameMenu: (open: boolean) => void
}

export const useMenu = create<MenuProps>(set => ({
  isOpenMenu: false,
  isOpenGameMenu: false,
  setIsOpenMenu: (open: boolean) => set({ isOpenMenu: open }),
  setIsOpenGameMenu: (open: boolean) => set({ isOpenGameMenu: open }),
}))