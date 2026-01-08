'use client'

import { create } from "zustand"

type useGameInfoProps = {
   selectedChapterId: string | null,
   isEndingChapter: boolean,
   musicValue: number,
   sfxValue: number,
   setSelectedChapterId: (id: string) => void,
   setIsEndingChapter: (isEndingChapter: boolean) => void,
   setMusicValue: (musicValue: number) => void,
   setSfxValue: (sfxValue: number) => void
}

export const useGameInfo = create<useGameInfoProps>(set => ({
   selectedChapterId: null,
   isEndingChapter: false,
   musicValue: 0.5,
   sfxValue: 0.5,
   setSelectedChapterId: (id: string) => {
      set({
         selectedChapterId: id
      })
   },
   setIsEndingChapter: (isEndingChapter: boolean) => {
      set({isEndingChapter})
   },
   setMusicValue: (musicValue: number) => {
      set({ musicValue })
   },
   setSfxValue: (sfxValue: number) => {
      set({ sfxValue })
   }
}))