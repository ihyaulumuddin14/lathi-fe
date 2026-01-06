'use client'

import { useChapter } from "@/hooks/useChapter";
import { useGameInfo } from '@/stores/useGameInfo';
import { useEffect } from 'react';

export default function GameLayout({ children }: { children: React.ReactNode }) {
   const { selectedChapterId, setSelectedChapterId } = useGameInfo()
   const { chapters } = useChapter()

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
