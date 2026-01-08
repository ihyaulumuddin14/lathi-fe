import { useChapter } from '@/hooks/useChapter'
import { useSession } from '@/hooks/useSession'
import { startStory } from '@/services/stories.service'
import { useGameInfo } from '@/stores/useGameInfo'
import { AxiosError } from 'axios'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { LogOut, MessageSquareWarning, RotateCcw } from 'lucide-react'
import { AnimatePresence, motion, Variants } from 'motion/react'
import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { animatePageOut } from '@/utils/animation'
import { useRouter } from 'next/navigation'
import { useAudio } from '@/hooks/useAudio'
import { useShallow } from 'zustand/shallow'

export default function EndingDisplay({ message }: { message?: string }) {
   const { sessionData } = useSession()
   const { setIsEndingChapter, musicValue } = useGameInfo(
      useShallow(state => ({
         setIsEndingChapter: state.setIsEndingChapter,
         musicValue: state.musicValue
      }))
   )
   const { play: playCompletedMusic, stop: stopCompletedMusic } = useAudio({ src: "/sound/sfx_completed.mp3", baseVolume: musicValue, loop: true })
   const { play: playGameOverMusic, stop: stopGameOverMusic } = useAudio({ src: "/sound/sfx_gameover.mp3", baseVolume: musicValue, loop: true })
   
   useEffect(() => {
      if (!sessionData) return

      if (sessionData.is_completed) {
         playCompletedMusic()
         setIsEndingChapter(true)
      } else if (sessionData.is_game_over) {
         playGameOverMusic()
         setIsEndingChapter(true)
      }
      
      return () => {
         if (sessionData.is_completed) {
            stopCompletedMusic()
            setIsEndingChapter(false)
         } else if (sessionData.is_game_over) {
            stopGameOverMusic()
            setIsEndingChapter(false)
         }
      }
   }, [sessionData])

   return (
      <AnimatePresence mode='popLayout'>
         {sessionData && (
            <motion.div
               className="absolute inset-0 left-0 top-0 z-6 bg-black/70 flex flex-col justify-center items-center pt-[10vh]"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.2 }}
               >
               <OverlayContent message={message} result={sessionData.is_completed ? "completed" : "gameover"}/>
            </motion.div>
         )}
      </AnimatePresence>
   )
}


const OverlayContent = ({ message, result }: { message?: string, result: "gameover" | "completed" }) => {
   const { chapters } = useChapter()
   const { selectedChapterId } = useGameInfo()
   const { mutateSession, sessionData } = useSession()
   const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
   const router = useRouter()

   const handleRestartSession = async () => {
      if (!selectedChapterId) return

      try {
         setIsConfirmationOpen(false)
         const response = await startStory(selectedChapterId)

         if (response.success) {
            mutateSession()
         } else {
            throw Error()
         }
      } catch (error) {
         if (error instanceof AxiosError) {
            toast.error(error.response?.data?.message || "Terjadi kesalahan pada sistem")
         } else {
            toast.error("Terjadi kesalahan pada sistem")
         }
      }
   }

   /*
      for the last screen need
      game over or completed chapter
   */
   const chapter = useMemo(() => {
      return chapters?.find(chapters => chapters.id === selectedChapterId)
   }, [chapters, selectedChapterId])

   const containerVariants: Variants = {
      hidden: {
         opacity: 1
      },
      visible: {
         opacity: 1,
         transition: {
            duration: 1,
            staggerChildren: 0.8,
            delayChildren: 0.5
         }
      }
   }

   const itemVariants: Variants = {
      hidden: {
         opacity: 0,
         y: 20
      },
      visible: {
         opacity: 1.,
         y: 0,
         transition: {
            duration: 0.3,
            ease: "easeOut"
         }
      }
   }
   
   return (
      <AnimatePresence mode='wait'>
         <motion.div
            className='overlay-content flex flex-col justify-center items-center'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
         >
            <motion.h2
               variants={itemVariants}
               className="text-md sm:text-xl lg:text-3xl font-extrabold uppercase text-secondary">
                  Bagian {chapter?.order_index}: {chapter?.title}
            </motion.h2>
            {result === "completed" ? (
               <motion.h1
                  variants={itemVariants}
                  className="text-4xl sm:text-5xl lg:text-8xl font-extrabold uppercase text-secondary text-shadow-lg text-shadow-secondary text-center mb-5">
                     Lakon Selesai
               </motion.h1>
            ) : (
               <motion.h1
                  variants={itemVariants}
                  className="text-4xl sm:text-5xl lg:text-8xl font-extrabold uppercase text-destructive text-shadow-destructive text-shadow-sm opacity-80 text-center mb-5">
                     Lakon Terhenti
               </motion.h1>
            )}
            {message && (
               <motion.p
                  variants={itemVariants}
                  className="text-secondary text-xs sm:text-sm mb-5">
                     {message}
               </motion.p>
            )}

            <motion.div
               variants={itemVariants}
               className="w-full max-w-[300px] h-fit border-t-muted-foreground border-t flex justify-evenly items-center p-7 gap-5">
                  <div className="h-full aspect-square flex flex-col items-center justify-center relative">
                     <button onClick={() => setIsConfirmationOpen(true)} className="rounded-full p-3 bg-primary border-2 border-secondary flex justify-center items-center hover:scale-105 hover:shadow-md shadow-muted-foreground cursor-pointer active:scale-100 transition-all duration-150 ease-in-out">
                        <RotateCcw size={30} color="#F2EAD3"/>
                     </button>

                     <p className="font-bold text-lg text-secondary absolute -bottom-7">Ulangi</p>
                  </div>

                  <div className="h-full aspect-square flex flex-col items-center justify-center relative">
                     <button
                        onClick={() => {
                           animatePageOut({
                              href: "/play",
                              router,
                              animate: "fade"
                           })
                        }}
                        className="rounded-full p-3 bg-primary border-2 border-secondary flex justify-center items-center hover:scale-105 hover:shadow-md shadow-muted-foreground cursor-pointer active:scale-100 transition-all duration-150 ease-in-out">
                           <LogOut size={30} color="#F2EAD3"/>
                     </button>

                     <p className="font-bold text-lg text-secondary absolute -bottom-7">Keluar</p>
                  </div>
            </motion.div>
         </motion.div>

         {/* dialog restart confirmation */}
         <AlertDialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
            <AlertDialogContent>
               <AlertDialogHeader className='w-full flex flex-col justify-center items-center'>
                  <MessageSquareWarning size={40} className='my-7'/>
                  <AlertDialogTitle className='text-2xl font-bold'>
                     Hapus Progres dan Ulangi Lakon?
                  </AlertDialogTitle>
                  <AlertDialogDescription className='my-3 text-center'>Perhatian: Memulai bab ini dari awal akan menghapus progres tersimpan Anda. Perjalanan Anda sebelumnya tidak dapat dipulihkan.</AlertDialogDescription>
               </AlertDialogHeader>

               <AlertDialogFooter className='w-full h-fit flex flex-col sm:flex-col'>
                  <AlertDialogAction
                     onClick={handleRestartSession}
                     className='w-full'>
                        Mulai Baru
                  </AlertDialogAction>
                  <AlertDialogCancel
                     className='w-full'>
                        Kembali
                  </AlertDialogCancel>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </AnimatePresence>
   )
}