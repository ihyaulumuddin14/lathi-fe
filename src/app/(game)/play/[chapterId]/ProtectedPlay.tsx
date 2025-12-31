'use client'

import { useChapter } from "@/hooks/useChapter"
import { useGameInfo } from "@/stores/useGameInfo"

export default function ProtectedPlay({ children }: { children: React.ReactNode }) {
   const { selectedChapterId } = useGameInfo()
   const { chapters } = useChapter()

   const isChapterValid = selectedChapterId && !chapters.find(chapter => chapter.id === selectedChapterId)?.is_locked

   if (!isChapterValid) return null

   return <div className="bg-neutral-950">{children}</div>
}