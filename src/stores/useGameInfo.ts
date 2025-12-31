'use client'

import { create } from "zustand"

type useGameInfoProps = {
   selectedChapterId: string | null,
   setSelectedChapterId: (id: string) => void,
}

export const useGameInfo = create<useGameInfoProps>(set => ({
   selectedChapterId: null,
   setSelectedChapterId: (id: string) => {
      set({
         selectedChapterId: id
      })
   }
}))