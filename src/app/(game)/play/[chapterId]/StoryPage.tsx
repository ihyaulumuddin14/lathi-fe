'use client'

import CharDialog from "./CharDialog"
import GameStats from "@/components/game-stats/GameStats"
import GameMenuOption from "./GameMenuOption"
import { Button } from "@/components/ui/button"
import { useSession } from "@/hooks/useSession"
import { useSlides } from "@/hooks/useSlides"
import { Slide } from "@/schema/GameSchema"
import { Menu, ScrollText, Volume2, VolumeX } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import { useEffect, useReducer, useState } from "react"

export default function StoryPage({ shouldFetch }: { shouldFetch: boolean }) {
   const { slides } = useSlides(shouldFetch)
   const { sessionData, error, mutateSession } = useSession()
   const [isMuted, setIsMuted] = useState(false)
   const [isAuto, setIsAuto] = useState(false)
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const [isLogOpen, setIsLogOpen] = useState(false)

   const slideReducer = (_slide: Slide, action: { nextSlideId: string }) => {
      return slides.find(slide => slide.id === action.nextSlideId) as Slide
   }

   const [slide, dispatch] = useReducer(slideReducer, slides?.find(slide => slide.id === sessionData.current_slide_id) as Slide)

   useEffect(() => {
      if (sessionData) {
         dispatch({ nextSlideId: sessionData.current_slide_id })
      }
   }, [sessionData])
   
   // const slide = useMemo(() => {
   //    return slides.find(slide => slide.id === sessionData.current_slide_id)
   // }, [slides, sessionData])

   return (
      <div className='w-full h-screen bg-secondary relative'>
         <Image src={"/game_bg_dummy.webp"} alt="background_story" fill className="object-cover brightness-50 z-0"/>

         {/* character container */}
         <div className="z-1 absolute bottom-20 lg:bottom-5 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full overflow-visible">
            {/* character a */}
            <AnimatePresence mode="popLayout">
               {slide?.character_on_screen[0] && (
                  <motion.div
                     key={slide?.id}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.5, ease: "easeInOut" }}
                     className={`h-[60vh] aspect-3/5 absolute bottom-0 left-0 mask-b-from-70 ${slide?.character_on_screen[0].is_active ? "translate-x-0 opacity-100 sm:scale-130" : "-translate-x-full sm:translate-x-0 opacity-50 sm:scale-100"} transition-all duration-500 ease-in-out`}>
                        <Image src={slide?.character_on_screen[0].image_url} fill alt="char_img" className="object-cover"/>
                  </motion.div>
               )}
            </AnimatePresence>

            {/* character b */}
            <AnimatePresence mode="popLayout">
               {slide?.character_on_screen[1] && (
                  <motion.div
                     key={slide?.id}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.5, ease: "easeInOut" }}
                     className={`h-[60vh] aspect-3/5 absolute bottom-0 right-0 mask-b-from-70% ${slide?.character_on_screen[1].is_active ? "translate-x-0 opacity-100 sm:scale-130" : "translate-x-full sm:translate-x-0 opacity-50 sm:scale-100"} transition-all duration-500 ease-in-out`}>
                        <Image src={slide?.character_on_screen[1].image_url} fill alt="char_img" className="object-cover"/>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>


         {/* dialog box */}
         <CharDialog slide={slide}/>


         {/* top navbar */}
         <div className="z-3 w-full h-[100px] px-[4vw] absolute top-5 left-1/2 -translate-x-1/2 flex justify-between items-center">
            {/* chapter title and stats */}
            <GameStats />

            {/* menu and log */}
            <div className="flex flex-col gap-3 w-fit h-full items-center">
               <GameMenuOption />

               <AnimatePresence mode="popLayout">
                  <motion.button
                     className={`${isLogOpen ? "bg-primary" : "bg-secondary"} p-2 rounded-full cursor-pointer flex justify-between items-center`}
                     onClick={() => setIsLogOpen(prev => !prev)}
                     key={isLogOpen ? "openMenu" : "closeMenu"}
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     exit={{ scale: 0 }}
                     transition={{ duration: 0.2, ease: "easeInOut" }}
                     >
                     {isLogOpen ? (
                        <ScrollText size={20} color="#F2EAD3"/>
                     ) : (
                        <ScrollText size={20} color="#3F2305"/>
                     ) }
                  </motion.button>
                  <p className="-mt-3 text-secondary text-shadow-2xs text-shadow-primary">Log</p>
               </AnimatePresence>
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

            <Button
               className="text-2xl py-5 px-6 font-bold text-primary border-4 border-muted shadow-md shadow-secondary"
               variant={"secondary"}
               onClick={() => {
                  mutateSession({ ...sessionData, current_slide_id: slide.next_slide_id }, false)
               }}
               >
                  Lanjut
            </Button>
         </div>
      </div>
   )
}
