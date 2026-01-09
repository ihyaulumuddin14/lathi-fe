"use client"

import {
   AlertDialog,
   AlertDialogContent,
   AlertDialogHeader,
   AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { useChapter } from "@/hooks/useChapter";
import { useSession } from "@/hooks/useSession";
import { Chapter } from "@/schema/GameSchema";
import { useGameInfo } from "@/stores/useGameInfo";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "sonner";
import Loader from "../Loader";

export type statusType = "NOT_PLAYED" | "COMPLETED" | "PLAYING" | "GAMEOVER"
export const heartTotal = 3

const ChapterInfo = () => {
   const [isOpen, setIsOpen] = useState(false);
   const { selectedChapterId } = useGameInfo()
   const { chapters, error } = useChapter()
   const { sessionData } = useSession()

   const status: statusType = useMemo(() => {
      if (sessionData) {
         if (sessionData.is_completed && !sessionData.is_game_over) return "COMPLETED"
         else if (!sessionData.is_completed && sessionData.is_game_over) return "GAMEOVER"
         else if (!sessionData.is_completed && !sessionData.is_game_over) return "PLAYING"
      }
      return "NOT_PLAYED"
   }, [sessionData])

   const chapterReducer = (
      _chapter: Chapter | null,
      action: { id: string }
   ): Chapter | null => {
      return chapters.find(chapter => chapter.id === action.id) || null
   }

   const [chapter, dispatch] = useReducer(
      chapterReducer,
      chapters && (chapters.find(chapter => chapter.id === selectedChapterId) || chapters[0]) as Chapter
   )

   useEffect(() => {
      if (selectedChapterId) {
         dispatch({ id: selectedChapterId })
      }
   }, [selectedChapterId])
   
   if (!chapters) {
      return <div className="flex justify-center items-center w-full max-w-50 text-secondary-foreground relative aspect-square rounded-full shadow-2xl hover:scale-102 active:scale-97 transition-all duration-200 cubic-bezier(0.65,-0.67,0.27,0.99) cursor-pointer -rotate-5 shadow-accent-foreground bg-secondary">
         <Loader />
      </div>
   }

   return (
      <>
         <div
            onClick={() => {
               if (selectedChapterId) setIsOpen(true)
               else toast.error("Silakan pilih Chapter untuk dimainkan")
            }}
            className="w-full max-w-50 text-secondary-foreground relative aspect-square rounded-full shadow-2xl hover:scale-102 active:scale-97 transition-all duration-200 cubic-bezier(0.65,-0.67,0.27,0.99) cursor-pointer -rotate-5 shadow-accent-foreground bg-secondary"
         >
            {selectedChapterId ? (
            <>
               <p className="relative z-1 text-sm sm:text-lg text-primary bg-secondary font-bold px-4 py-1 rounded-md w-fit rotate-5 shadow-2xl shadow-accent-foreground">Saat ini</p>
               <h2 className="absolute z-2 text-md sm:text-xl italic uppercase text-secondary font-bold  bg-primary px-4 py-1 rounded-md shadow-lg shadow-accent-foreground w-fit">
                  Bagian {chapters.find(chapter => chapter.id === selectedChapterId)?.order_index}
               </h2>
               {chapter && (
                  <img src={(chapter && chapter.cover_image_url) ?? ""} alt="chapter_image" className="rounded-full z-0 object-cover w-full"/>
               )}
               {sessionData && (
                  <p
                     className={`
                     z-1 text-secondary text-md absolute bottom-0 left-1/2 -translate-x-1/2 px-3 rounded-md whitespace-nowrap rotate-5
                     ${status === "PLAYING" && " bg-muted-foreground border-2 border-muted"}
                     ${status === "GAMEOVER" && " bg-destructive text-uppercase text-xl border-2 border-secondary"}
                     ${status === "COMPLETED" && " bg-ring text-uppercase text-xl px-5 border-2 border-secondary"}
                     `}>
                        {status === "PLAYING" && "Sedang dimainkan"}
                        {status === "GAMEOVER" && "GAGAL"}
                        {status === "COMPLETED" && "TAMAT"}
                  </p>
               )}
            </>
         ) : (
            <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-2xl text-center font-semibold">Silakan pilih Bagian</p>
         )}
         </div>

         <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
               <div className="w-full h-full bg-secondary absolute -z-1 mask-b-from-50% mask-b-to-100% rounded-xl sm:rounded-2xl overflow-hidden">
                  <div className="w-full h-full bg-[url(/game_dialog_bg.webp)] bg-cover bg-center absolute opacity-30 mask-t-from-30% mask-t-to-100%"/>
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
                     Bagian{" "}
                     {chapter?.order_index}
                  </AlertDialogTitle>
               </AlertDialogHeader>
               <div className="w-full grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <img src={(chapter && chapter?.cover_image_url) ?? ""} alt="chapter_image" className="rounded-lg w-full max-w-[150px] aspect-3/4 object-cover border justify-self-center" loading="lazy"/>
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
                                 if (index < sessionData.current_hearts) {
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
                              {status === "GAMEOVER" && "GAGAL"}
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

export default ChapterInfo