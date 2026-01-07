'use client'

import { useSlides } from "@/hooks/useSlides"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react";
import { useGameInfo } from "@/stores/useGameInfo";
import { startStory } from "@/services/stories.service";
import { toast } from "sonner";
import { AxiosError } from "axios";
import StoryPage from "./StoryPage";
import { useSearchParams } from "next/navigation";

type modeType = "new" | "continue"

export default function PlaySessionPage() {
   const searchParams = useSearchParams()
   const mode = searchParams.get("mode")

   const [progress, setProgress] = useState(0)
   const [shouldFetch, setShouldFetch] = useState(false)
   const { selectedChapterId } = useGameInfo()
   const { slides, error } = useSlides(shouldFetch)

   useEffect(() => {
      const handleStartStory = async () => {
         if (!selectedChapterId) return
         
         try {
            const response = await startStory(selectedChapterId)
            if (response.success) {
               setShouldFetch(true)
            } else {
               throw Error()
            }
         } catch (error) {
            if (error instanceof AxiosError) {
               toast.error(error.response?.data?.error.message || "Terjadi kesalahan pada sistem")
            } else {
               toast.error("Terjadi kesalahan pada sistem")
            }
         }
      }

      if (mode === "new") {
         handleStartStory()
      } else if (mode === "continue") {
         setShouldFetch(true)
      }
   }, [selectedChapterId, mode])

   useEffect(() => {
      const intervalProgress = setInterval(() => {
         setProgress(prev => prev < 99 ? prev + 1 : prev)
      }, 100);

      if (slides) {
         setProgress(100)
      }

      return () => {
         if (intervalProgress) {
            clearInterval(intervalProgress)
         }
      }
   }, [slides, error])
   

   return (
      <AnimatePresence mode="wait" initial={false}>
         {!slides ? (
            <motion.section
               key="loading"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 1, ease: "easeInOut" }}
               className="bg-neutral-950 w-full h-screen flex flex-col gap-2 items-center justify-center"
            >
               <p className="text-secondary">{progress} %</p>
               <p className="text-secondary">Menyiapkan Lakon...</p>
            </motion.section>
         ) : (
            <motion.section
               key="game"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 1, ease: "easeInOut" }}
               className="overflow-hidden bg-secondary w-full h-screen flex items-center justify-center"
            >
               {/* main page */}
               <StoryPage shouldFetch={shouldFetch} mode={mode as modeType}/>
            </motion.section>
         )}
      </AnimatePresence>
   )
}
