'use client'

import { useAudio } from "@/hooks/useAudio";
import { useChapter } from "@/hooks/useChapter";
import { useGameInfo } from '@/stores/useGameInfo';
import { useEffect } from 'react';
import { useShallow } from "zustand/shallow";


export default function GameLayout({ children }: { children: React.ReactNode }) {
   const { selectedChapterId, isEndingChapter, setSelectedChapterId } = useGameInfo(
      useShallow(state => ({
         selectedChapterId: state.selectedChapterId,
         isEndingChapter: state.isEndingChapter,
         setSelectedChapterId: state.setSelectedChapterId
      }))
   )
   const { chapters } = useChapter()
   const { musicValue } = useGameInfo()
   const { play, pause, stop } = useAudio({ src: "/sound/sfx_game.mp3", baseVolume: musicValue, loop: true })

   useEffect(() => {
      if (isEndingChapter) {
         pause()
      } else {
         play()
      }

      return () => stop()
   }, [isEndingChapter])

   useEffect(() => {
      if (!chapters) return

      const id = JSON.parse(localStorage.getItem("selectedChapterId") || "null")

      if (id) {
         setSelectedChapterId(id)
      } else {
         setSelectedChapterId(chapters[0].id)
      }
   }, [chapters, setSelectedChapterId])

   useEffect(() => {
      if (!selectedChapterId) return

      localStorage.setItem("selectedChapterId", JSON.stringify(selectedChapterId))
   }, [selectedChapterId])

   return (
      <>{children}</>
   )
}
