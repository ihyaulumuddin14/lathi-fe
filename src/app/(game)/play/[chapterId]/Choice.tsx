import Loader from '@/components/Loader'
import { useSession } from '@/hooks/useSession'
import { Slide } from '@/schema/GameSchema'
import { useTypingAnimation } from '@/stores/useTypingAnimation'
import { AnimatePresence, motion } from 'motion/react'
import React, { unstable_SuspenseList } from 'react'

export default function Choice({
   isSendingChoice,
   slide,
   handleActionChoice
}: {
   isSendingChoice: boolean
   slide: Slide,
   handleActionChoice: (choice: number | null) => void
}) {
   const { sessionData, mutateSession } = useSession()
   const { animationDone } = useTypingAnimation()

   return (
      <AnimatePresence>
         {slide !== undefined && animationDone && (slide?.choices.length > 0 || isSendingChoice) && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.3, ease: "easeInOut" }}
               className="absolute z-4 inset-0 bg-black/70 w-full flex flex-col justify-center items-center gap-5 sm:gap-10"
               >
                  {slide.choices.map((choice, index) => {
                     return (
                        <motion.button
                           onClick={() => handleActionChoice(index)}
                           key={index}
                           initial={{ opacity: 0, scale: 0.5 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.5 }}
                           className={`text-secondary relative text-md sm:text-xl cursor-pointer group hover:scale-110 duration-200 ease-in-out transition-all active:scale-105 ${isSendingChoice ? "opacity-10" : ""}`}
                           >
                              {/* background */}
                              <div className="absolute -z-1 w-full h-full bg-tertiary blur-md group-hover:blur-2xl transition-all duration-200 ease-in-out"></div>
                              {choice.text}
                        </motion.button>
                     )
                  })}

                  {isSendingChoice && (
                     <Loader className='absolute top-1/2 border-muted w-[30px] border-4 -translate-y-1/2 left-1/2 -translate-x-1/2'/>
                  )}
            </motion.div>
         )}
      </AnimatePresence>
   )
}
