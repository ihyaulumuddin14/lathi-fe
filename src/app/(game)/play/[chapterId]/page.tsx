'use client'

import { useSlides } from "@/hooks/useSlides"
import { useEffect, useState } from "react"
import ProtectedPlay from "./ProtectedPlay"
import { AnimatePresence, motion } from "motion/react";
import { useGameInfo } from "@/stores/useGameInfo";
import { startStory } from "@/services/stories.service";
import { toast } from "sonner";
import { AxiosError } from "axios";


export default function PlaySessionPage() {
   const [progress, setProgress] = useState(0)
   const [shouldFetch, setShouldFetch] = useState(false)
   const { selectedChapterId } = useGameInfo()
   const { slides, error, isLoading } = useSlides(shouldFetch)

   useEffect(() => {
      if (!selectedChapterId) return
      
      const handleStartStory = async () => {
         try {
            await startStory(selectedChapterId)
            
            setShouldFetch(true)
         } catch (error) {
            if (error instanceof AxiosError) {
               toast.error(error.response?.data?.message || "Terjadi kesalahan pada sistem")
            } else {
               toast.error("Terjadi kesalahan pada sistem")
            }
         }
      }

      handleStartStory()
   }, [selectedChapterId])

   useEffect(() => {
      if (!shouldFetch) return

      let intervalProgress: NodeJS.Timeout;

      if (isLoading) {
         intervalProgress = setInterval(() => {
            setProgress(prev => prev < 90 ? prev + 4 : prev)
         }, 100)
      } else {
         setProgress(100)
      }

      return () => {
         setProgress(0)
         clearInterval(intervalProgress)
      }
   }, [isLoading, shouldFetch])

   return (
      <ProtectedPlay>
         <AnimatePresence mode="popLayout">
            {(progress < 100) ? (
               <motion.section
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="bg-neutral-950 w-full h-screen flex items-center justify-center"
               >
                  <p className="text-secondary">{progress} %</p>
               </motion.section>
            ) : (
               <motion.section
                  key="game"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="bg-neutral-950 w-full h-screen flex items-center justify-center"
               >
                  <p className="text-secondary">GAME UI</p>
               </motion.section>
            )}
         </AnimatePresence>
      </ProtectedPlay>
   )
}
