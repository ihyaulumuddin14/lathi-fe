import { useChapter } from "@/hooks/useChapter"
import { useSession } from "@/hooks/useSession"
import { useGameInfo } from "@/stores/useGameInfo"
import { X } from "lucide-react"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { heartTotal, statusType } from "../chapter-info/ChapterInfo"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"
import { AnimatePresence, motion } from "motion/react"
import { useUser } from "@/hooks/useUser"

export default function GameStats() {
   const { chapters } = useChapter()
   const { selectedChapterId } = useGameInfo()
   const { user } = useUser()
   const { sessionData } = useSession()
   const [ isOpen, setIsOpen ] = useState(false)
   const [displayHearts, setDisplayHearts] = useState<number | null>(sessionData?.current_hearts ?? null)

   // preserve the last known hearts count so UI does not flash the default while session is loading
   useEffect(() => {
      if (sessionData?.current_hearts !== undefined && sessionData?.current_hearts !== null) {
         setDisplayHearts(sessionData.current_hearts)
      }
   }, [sessionData?.current_hearts])

   const heartsToShow = displayHearts ?? sessionData?.current_hearts ?? heartTotal

   const chapter = useMemo(() => {
      return chapters?.find(chapters => chapters.id === selectedChapterId)
   }, [chapters, selectedChapterId])

   const status: statusType = useMemo(() => {
      if (sessionData) {
         if (sessionData.is_completed && !sessionData.is_game_over) return "COMPLETED"
         else if (!sessionData.is_completed && sessionData.is_game_over) return "GAMEOVER"
         else if (!sessionData.is_completed && !sessionData.is_game_over) return "PLAYING"
      }
      return "NOT_PLAYED"
   }, [sessionData])

   return (
      <>
         <div onClick={() => setIsOpen(true)} className="flex flex-col w-full max-w-[200px] h-full max-h-[100px] bg-secondary rounded-lg p-1 cursor-pointer hover:scale-105 transition-all duration-150 ease-in-out">
            <h1 className="text-lg font-bold border-4 border-primary px-2 rounded-md rounded-bl-none">{chapter?.title}</h1>
            <div className="w-full h-full flex">
               {/* chapter box */}
               <div className="text-2xl font-extrabold aspect-square bg-primary text-secondary rounded-md rounded-t-none h-full flex justify-center items-center">
                  {chapter?.order_index}
               </div>

               <div className="w-full flex flex-col gap-1 pl-3">
                  {/* name */}
                  <h2 className="line-clamp-1">{user?.username}</h2>

                  {/* health */}
                  <AnimatePresence mode="popLayout">
                     <motion.span
                        className="flex">
                           {[...Array(heartTotal)].map((_, index) => {
                              if (index < heartsToShow) {
                                 return (
                                    <motion.svg
                                       initial={{ scale:0.5, opacity: 0 }}
                                       animate={{ scale: 1, opacity: 1 }}
                                       exit={{ scale: 1.5, opacity: 0 }}
                                       transition={{ duration: 0.5, ease: "easeInOut", type: "spring", stiffness: 300 }}
                                       key={index + "full"}
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="#ff0202" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"/></motion.svg>
                                 )  
                              } else {
                                 return (
                                    <motion.svg
                                       initial={{ scale:0.5, opacity: 0 }}
                                       animate={{ scale: 1, opacity: 1 }}
                                       exit={{ scale: 0.5, opacity: 0 }}
                                       transition={{ duration: 0.5, ease: "easeInOut", type: "spring", stiffness: 300 }}
                                       key={index + "none"}
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="#ff7272" d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3"/></motion.svg>
                                 )
                              }
                           })}
                     </motion.span>
                  </AnimatePresence>
               </div>
            </div>
         </div>

         <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
               <div className="w-full h-full bg-secondary absolute -z-1 mask-b-from-30% mask-b-to-150% rounded-xl sm:rounded-2xl overflow-hidden">
                  <div className="w-full h-full bg-[url(/game_dialog_bg.webp)] bg-cover bg-center absolute opacity-60 mask-t-from-30% mask-t-to-100%"/>
               </div>

               <AlertDialogHeader className="relative">
                  {/* close */}
                  <div
                     className="close w-fit h-fit p-1 absolute -top-3 -right-3 active:scale-90 border border-[#7373737a] rounded-md cursor-pointer"
                     onClick={() => {setIsOpen(false)}}
                  >
                     <X color="#737373" size={20} />
                  </div>

                  {/* title */}
                  <AlertDialogTitle className="sm:text-left text-center text-lg">
                     Chapter{" "}
                     {chapter?.order_index}
                  </AlertDialogTitle>
               </AlertDialogHeader>


               {/* body */}
               <div className="w-full grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <img src={(chapter && chapter.cover_image_url) ?? ""} alt="chapter_image" className="rounded-lg w-full max-w-[150px] aspect-3/4 object-cover border justify-self-center" loading="lazy"/>
                  <div className="w-full flex flex-col gap-1">
                     <h2 className="font-extrabold sm:text-left text-xl text-center sm:text-2xl uppercase sm:mb-2">{chapter?.title}</h2>
                     <p className="leading-5 mb-2">{chapter?.description}</p>
                  </div>
                  {sessionData && (
                     <div className="flex justify-between items-center sm:items-start gap-3 sm:col-span-2 border-t pt-3 border-muted">
                        <div className="flex flex-col gap-2 leading-5">
                           <span>Sisa manah (nyawa):</span>
                           <span className="flex">
                              {[...Array(heartTotal)].map((_, index) => {
                                 if (index < heartsToShow) {
                                    return (
                                       <svg key={index} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#ff0202" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"/></svg>
                                    )
                                 } else {
                                    return (
                                       <svg key={index} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#ff7272" d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3"/></svg>
                                    )
                                 }
                              })}
                           </span>
                        </div>
                        <p
                           className={`
                           z-1 text-secondary text-md px-3 rounded-md whitespace-nowrap w-fit
                           ${status === "PLAYING" && " bg-muted-foreground border-2 border-muted"}
                           ${status === "GAMEOVER" && " bg-destructive text-uppercase text-xl border-2 border-secondary"}
                           ${status === "COMPLETED" && " bg-ring text-uppercase text-xl px-5 border-2 border-secondary"}
                           `}>
                              {status === "PLAYING" && "Sedang dimainkan"}
                              {status === "GAMEOVER" && "GAME OVER"}
                              {status === "COMPLETED" && "TAMAT"}
                        </p>
                     </div>
                  )}
               </div>
            </AlertDialogContent>
         </AlertDialog>
      </>
   )
}
