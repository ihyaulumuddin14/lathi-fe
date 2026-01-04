'use client'

import GameStats from "@/components/game-stats/GameStats"
import CharDialog from "./CharDialog"
import GameMenuOption from "./GameMenuOption"
import Log from "./Log"
import Dictionary from "./Dictionary"
import Choice from "./Choice"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useSession } from "@/hooks/useSession"
import { useSlides } from "@/hooks/useSlides"
import { Session, Slide } from "@/schema/GameSchema"
import { Volume2, VolumeX } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useReducer, useState } from "react"
import { useGameInfo } from "@/stores/useGameInfo";
import { actionStory } from "@/services/stories.service"
import { AxiosError } from "axios"
import { toast } from "sonner"

export type charReaction = "normal" | "angry" | "happy"

export default function StoryPage({ shouldFetch }: { shouldFetch: boolean }) {
   const { slides } = useSlides(shouldFetch)
   const { sessionData, error, mutateSession } = useSession()
   const [isMuted, setIsMuted] = useState(false)
   const [isAuto, setIsAuto] = useState(false)
   const [characterReaction, setCharacterReaction] = useState<charReaction | string>("normal")
   const { selectedChapterId } = useGameInfo()
   const [ isSendingChoice, setIsSendingChoice ] = useState<boolean>(false)
   const [plotSlideId, setPlotSlideId] = useState<string[]>([])

   const slideReducer = (_slides: Slide | undefined, action: { nextSlideId: string }) => {
      if (slides == undefined) return 
      return slides.find(slide => slide.id === action.nextSlideId)
   }

   const [slide, dispatch] = useReducer(slideReducer, slides.find(slide => slide.id === sessionData.current_slide_id))
    
   useEffect(() => {
      if (slides) {
         dispatch({ nextSlideId: sessionData.current_slide_id })
      }
   }, [sessionData, slides])

   useEffect(() => {
      if (slide != undefined) {
         setPlotSlideId(prev => [...prev, slide.id])
      }
   }, [slide])

   const handleActionStory = async (choice: number | null) => {
      if (!selectedChapterId || !slide) return

      if (choice !== null) setIsSendingChoice(true)

      try {
         const response = await actionStory(selectedChapterId, slide?.id, choice)

         if (response) {
            mutateSession(
               {...sessionData, current_slide_id: response.next_slide_id},
               false
            )
            if (choice !== null) {
               setCharacterReaction(response.character_reaction)
            }
            console.log(response.character_reaction)
         }
      } catch (error) {
         if (error instanceof AxiosError) {
            toast.error(error.response?.data?.message || "Terjadi kesalahan pada sistem")
         } else {
            toast.error("Terjadi kesalahan pada sistem")
         }
      } finally {
         setIsSendingChoice(false)
      }
   }

   return (
      <div className='w-full h-screen bg-secondary relative'>
         {/* background */}
         <Image src={"/game_bg_dummy.webp"} alt="story_background_image" fill className="object-cover brightness-50 z-0"/>

         {/* character container */}
         <div className="z-1 absolute bottom-20 lg:bottom-5 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full overflow-visible">
            {/* character a */}
            <AnimatePresence mode="popLayout">
               {slide?.character_on_screen[0] && (
                  <motion.div
                     key="char-a"
                     initial={{ opacity: 0 }}
                     exit={{ opacity: 0 }}
                     animate={{
                        opacity: slide.character_on_screen[0].is_active ? 1 : 0.5,
                        x: slide.character_on_screen[0].is_active ? 0 : -200,
                        scale: slide.character_on_screen[0].is_active ? 1.3 : 1
                      }}
                     transition={{ duration: 0.5, ease: "easeInOut" }}
                     className={`h-[60vh] aspect-3/5 absolute bottom-0 left-0 mask-b-from-70`}>
                        <Image src={slide?.character_on_screen[0].image_url} fill alt="char_img" className="object-cover"/>
                  </motion.div>
               )}
            </AnimatePresence>

            {/* character b */}
            <AnimatePresence mode="popLayout">
               {slide?.character_on_screen[1] && (
                  <motion.div
                     key="char-b"
                     initial={{ opacity: 0 }}
                     exit={{ opacity: 0 }}
                     animate={{
                        opacity: slide.character_on_screen[1].is_active ? 1 : 0.5,
                        x: slide.character_on_screen[1].is_active ? 0 : 200,
                        scale: slide.character_on_screen[1].is_active ? 1.3 : 1
                      }}
                     transition={{ duration: 0.5, ease: "easeInOut" }}
                     className={`h-[60vh] aspect-3/5 absolute bottom-0 right-0 mask-b-from-70%`}>
                        <Image src={slide.character_on_screen[1].image_url} fill alt="char_img" className="object-cover"/>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>

         {/* dialog box */}
         {slide !== undefined && <CharDialog
               slide={slide}
               characterReaction={characterReaction}
            />
         }

         {/* choice */}
         {slide !== undefined && <Choice
               isSendingChoice={isSendingChoice}
               slide={slide}
               handleActionChoice={handleActionStory}
            />
         }

         {/* top navbar */}
         <div className="z-3 w-full h-[100px] px-[4vw] absolute top-5 left-1/2 -translate-x-1/2 flex justify-between items-center">
            {/* chapter title and stats */}
            <GameStats />

            {/* menu and log */}
            <div className="flex flex-col gap-3 w-fit h-full items-end">
               <GameMenuOption />
               <Log slides={slides} plotSlideId={plotSlideId}/>
               {slide && <Dictionary slide={slide}/>}
            </div>
         </div>

         {/* bottom navbar */}
         <div className="z-3 w-full max-w-[1280px] h-[50px] px-[4vw] absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-between items-center">
            <div className="flex gap-3 w-fit h-full items-center">
               <AnimatePresence mode="popLayout">
                  <motion.button
                     className="bg-secondary rounded-full cursor-pointer p-2 flex justify-between items-center"
                     onClick={() => setIsMuted(prev => !prev)}
                     key={isMuted ? "mute" : "unmute"}
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     exit={{ scale: 0 }}
                     transition={{ duration: 0.2, ease: "easeInOut" }}
                     >
                     {isMuted ? <VolumeX size={32} color="#3F2305"/> : <Volume2 size={32} color="#3F2305"/> }
                  </motion.button>
               </AnimatePresence>

               <AnimatePresence mode="popLayout">
                  <motion.button
                     className="bg-secondary rounded-full cursor-pointer flex justify-between items-center"
                     onClick={() => setIsAuto(prev => !prev)}
                     key={isAuto ? "auto" : "manual"}
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     exit={{ scale: 0 }}
                     transition={{ duration: 0.2, ease: "easeInOut" }}
                     >
                     {isAuto ? (
                        <svg className="h-12 aspect-square" xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="#3F2305" d="M6.9 17h1.9l1-2.8h4.4l1 2.8h1.9L13 6h-2zm3.45-4.4l1.6-4.55h.1l1.6 4.55zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                     ) : (
                        <svg className="h-12 aspect-square" xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="#3F2305" d="M9.8 14.2h4.4l.8 2.225q.1.275.325.425t.5.15q.475 0 .738-.387t.087-.813l-3.425-9.2q-.1-.275-.337-.437T12.35 6h-.7q-.3 0-.537.163t-.338.437L7.35 15.825q-.175.425.088.8t.737.375q.275 0 .5-.162T9 16.4zm.55-1.6l1.6-4.55h.1l1.6 4.55zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.325 0 5.663-2.337T20 12t-2.337-5.663T12 4T6.337 6.338T4 12t2.338 5.663T12 20"/></svg>
                     ) }
                  </motion.button>
               </AnimatePresence>
            </div>

            {slide?.choices.length == 0 && (
               <Button
                  className="text-2xl py-5 px-6 font-bold text-primary border-4 border-muted shadow-md shadow-secondary"
                  variant={"secondary"}
                  onClick={() => {
                     handleActionStory(null)
                  }}
                  >
                     Lanjut
               </Button>
            )}
         </div>
      </div>
   )
}
