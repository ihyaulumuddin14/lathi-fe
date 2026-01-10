'use client'

import GameStats from "@/components/game-stats/GameStats"
import { Button } from "@/components/ui/button"
import { useSession } from "@/hooks/useSession"
import { useSlides } from "@/hooks/useSlides"
import { Slide } from "@/schema/GameSchema"
import { actionStory } from "@/services/stories.service"
import { useGameInfo } from "@/stores/useGameInfo"
import { useTypingAnimation } from "@/stores/useTypingAnimation"
import { AxiosError } from "axios"
import { AnimatePresence, motion } from "motion/react"
import { useCallback, useEffect, useReducer, useState } from "react"
import { toast } from "sonner"
import CharDialog from "./CharDialog"
import Choice from "./Choice"
import Dictionary from "./Dictionary"
import EndingDisplay from "./EndingDisplay"
import GameMenuOption from "./GameMenuOption"
import Log from "./Log"

export type charReaction = "normal" | "angry" | "happy"

export default function StoryPage({ shouldFetch, mode }: { shouldFetch: boolean, mode: "new" | "continue" }) {
   const { slides } = useSlides(shouldFetch)
   const { sessionData, mutateSession } = useSession()
   const { selectedChapterId } = useGameInfo()
   const [ isSendingChoice, setIsSendingChoice ] = useState<boolean>(false)
   const { animationDone } = useTypingAnimation()
   const [isAuto, setIsAuto] = useState(false)
   const [characterReaction, setCharacterReaction] = useState<charReaction | string>("normal")
   const [endingMessage, setEndingMessage] = useState<string | undefined>(undefined)


   /*
      slide management
      using reducer to control the next slide
      base on user choice or default next slide
   */ 
   const slideReducer = (_slides: Slide | undefined, action: { nextSlideId: string }) => {
      if (slides == undefined) return 
      return slides.find(slide => slide.id === action.nextSlideId)
   }
   
   const [slide, dispatch] = useReducer(slideReducer, (
      slides && sessionData && slides.find(slide => slide.id === sessionData.current_slide_id)
   ))
   
   
   useEffect(() => {
      if (slides && sessionData) {
         dispatch({ nextSlideId: sessionData.current_slide_id })
      }
   }, [slides, sessionData])


   /*
      warning massage popped,
      when the hearts have been reduced
   */
   const warningMessageGenerator = (remainingHearts: number) => {
      const mediumWarning = [
         "Hubungan mulai memudar...",
         "Kepercayaan tokoh mulai terkikis.",
         "Ada rasa kecewa yang terselip.",
         "Lawan bicara mulai tersinggung.",
         "Hati-hati, satu detak jantung hilang."
      ]
      const criticalWarning = [
         "Kesempatanmu kian menipis.",
         "Waspada, nyawamu kini tersisa 1.",
         "Kata-katamu melukai perasaannya.",
         "Suasana mendadak dingin.",
         "Nyawa berkurang! Berhati-hatilah."
      ]
      const goodByToast = [
         "Detak jantung terakhirmu memudar..",
         "Napasmu terhenti, tak ada harapan lagi..",
         "Habis sudah kesempatanmu kali ini.",
         "Sudah saatnya belajar lebih sopan.",
         "Rasa hormat mereka padamu telah sirna."
      ]

      const index = ((Math.floor(Math.random() * 10) + 1)) % 5
      
      switch (remainingHearts) {
         case 2: return mediumWarning[index]
         case 1: return criticalWarning[index]
         default: return goodByToast[index]
      }
   }


   /*
      action that called to switch the another slide
      handle game reaction, like character expression, hearts warning toast, etc.
   */
   const handleActionStory = useCallback(async (choice: number | null) => {
      if (!selectedChapterId || !slide) return

      if (choice !== null) setIsSendingChoice(true)

      try {
         const response = await actionStory(selectedChapterId, slide?.id, choice)
         
         if (response.success) {
            if (choice !== null) {
               if (response.data.remaining_hearts < sessionData.current_hearts) {
                  const warningMessage = warningMessageGenerator(response.data.remaining_hearts)
                  toast.warning(warningMessage)
                  setCharacterReaction("angry")
               } else {
                  setCharacterReaction("happy")
               }
            } else {
               setCharacterReaction("normal")
            }

            mutateSession(
               {
                  ...sessionData,
                  current_slide_id: response.data.next_slide_id,
                  current_hearts: response.data.remaining_hearts,
                  is_game_over: response.data.is_game_over,
                  is_completed: response.data.is_completed,
                  history_log: response.data.history_log
               },
               true
            )
         }

         if (response.data.is_game_over || response.data.is_completed) {
            setEndingMessage(response.data.message)
         }
      } catch (error) {
         if (error instanceof AxiosError) {
            toast.error(error.response?.data?.error.detail || "Terjadi kesalahan pada sistem")
         } else {
            toast.error("Terjadi kesalahan pada sistem")
         }
      } finally {
         setIsSendingChoice(false)
      }
   }, [mutateSession, selectedChapterId, sessionData, slide]) 


   /*
      read time for user
      when auto was enabled
   */
   useEffect(() => {
      let timeoutReadDialog: NodeJS.Timeout;

      if (isAuto && animationDone && sessionData) {
         if (slide && !slide.choices && !(sessionData.is_completed || sessionData.is_game_over)) {
            timeoutReadDialog = setTimeout(() => {
               handleActionStory(null)
            }, 2000)
         }
      }

      return () => {
         clearTimeout(timeoutReadDialog)
      }
   }, [isAuto, animationDone, slide, handleActionStory, sessionData])


   /*
      the loading screen, showed when user has hard refreshed screen on the middle of game,
      but it doesn't showed when the user opened this page from loby, too fast data fetching
   */
   if (!slides) {
      return (
         <div className="bg-neutral-950 w-full h-screen flex flex-col gap-2 items-center justify-center">
            <p className="text-secondary">100 %</p>
            <p className="text-secondary">Menyiapkan Lakon...</p>
         </div>
      )
   }

   return (
      <div className='w-full h-screen bg-secondary relative'>
         {/* background */}
         <img src={(slide && slide?.background_image_url) ?? ""} alt="story_background_image" className="w-full h-screen object-cover brightness-50 z-0"/>

         {/* top navbar */}
         <div className="z-5 w-full h-[100px] px-[4vw] absolute top-5 left-1/2 -translate-x-1/2 flex justify-between items-center">
            {/* chapter title and stats */}
            <GameStats />

            {/* menu and log */}
            <div className="flex flex-col gap-3 w-fit h-full items-end">
               <GameMenuOption />
               <Log/>
               {slide && <Dictionary slide={slide}/>}
            </div>
         </div>

         {/* character container */}
         <div className="z-1 absolute bottom-20 lg:bottom-5 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full overflow-visible">
            {/* character a */}
            <AnimatePresence mode="popLayout">
               {slide?.characters && slide?.characters[0] && (
                  <motion.div
                     key="char-a"
                     initial={{ opacity: 0 }}
                     exit={{ opacity: 0 }}
                     animate={{
                        opacity: slide.characters[0].is_active ? 1 : 0.5,
                        x: slide.characters[0].is_active ? 0 : -200,
                        scale: slide.characters[0].is_active ? 1.3 : 1
                      }}
                     transition={{ duration: 0.5, ease: "easeInOut" }}
                     className={`h-[60vh] aspect-3/5 absolute bottom-0 left-0 mask-b-from-70`}>
                        <img
                           src={(slide && slide?.characters[0].image_url) ?? ""}
                           alt="char_img_1" className="object-cover w-full"
                           />
                  </motion.div>
               )}
            </AnimatePresence>

            {/* character b */}
            <AnimatePresence mode="popLayout">
               {slide?.characters && slide.characters[1] && (
                  <motion.div
                     key="char-b"
                     initial={{ opacity: 0 }}
                     exit={{ opacity: 0 }}
                     animate={{
                        opacity: slide.characters[1].is_active ? 1 : 0.5,
                        x: slide.characters[1].is_active ? 0 : 200,
                        scale: slide.characters[1].is_active ? 1.3 : 1
                      }}
                     transition={{ duration: 0.5, ease: "easeInOut" }}
                     className={`h-[60vh] aspect-3/5 absolute bottom-0 right-0 mask-b-from-70%`}>
                        <img
                           src={(slide && slide?.characters[1].image_url) ?? ""}
                           alt="char_img_2" className="w-full object-cover"
                           />
                  </motion.div>
               )}
            </AnimatePresence>
         </div>

         {/* choice */}
         {slide && <Choice isSendingChoice={isSendingChoice} slide={slide} handleActionChoice={handleActionStory}/>}

         {/* dialog box */}
         {slide && <CharDialog slide={slide} characterReaction={characterReaction}/>}

         {/* bottom navbar */}
         <div className="z-3 w-full max-w-[1280px] h-[50px] px-[4vw] absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-between items-center">
            <div className="flex gap-3 w-fit h-full items-center">
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
               <p className="font-bold text-lg text-secondary text-shadow-md text-shadow-primary">Auto</p>
            </div>

            {!slide?.choices && animationDone && !isAuto && (sessionData && !(sessionData.is_completed || sessionData.is_game_over)) && (
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

         {/* ending display */}
         {(sessionData && (sessionData.is_game_over || sessionData.is_completed)) && animationDone && <EndingDisplay message={endingMessage} />}
      </div>
   )
}
