import { Slide, Vocabulary } from '@/schema/GameSchema'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
 } from "@/components/ui/popover"

type CharDialogProps = {
   slide: Slide
}

export default function CharDialog({ slide }: CharDialogProps ) {

   const [vocabs, setVocabs] = useState<Vocabulary[] | []>(slide?.vocabularies || [])
   const braces = ["{", "}"];

   let validVocabsIndex = 0;

   const content = <>
      {
         slide.content?.split(" ").map((word, index) => {
            const isValidVocabs = braces.every(brace => {
               return word.includes(brace)
            })
         
            if (isValidVocabs) {
               return (
                  <Popover key={index}>
                     <PopoverTrigger asChild>
                        <span>
                           <strong className='cursor-pointer underline hover:opacity-70 transition-all duration-100 ease-in-out active:scale-90 inline-block'>
                              {word
                                 .split("")
                                 .filter(char => (char != "{" && char != "}") )
                                 .join("")
                              }
                           </strong>
                           {" "}
                        </span>
                     </PopoverTrigger>
                     <PopoverContent className='w-fit h-fit border-0 shadow-md shadow-muted-foreground rounded-md' side='top'>
                        <p><b>Krama:</b> {vocabs[validVocabsIndex]?.word_krama}</p>
                        <p><b>Ngoko:</b> {vocabs[validVocabsIndex]?.word_ngoko}</p>
                        <p><b>Indonesia:</b> {vocabs[validVocabsIndex++]?.word_indo}</p>
                     </PopoverContent>
                  </Popover>
               )
            } else {
               return <span key={index}>{word}{" "}</span>
            }
         })
      }
   </>

   // useEffect(() => {
   //    if (!slide) return

   //    const vocabsResult: string[] = [];


   //    if (vocabsResult.length > 0) setVocabs(vocabsResult)
   // }, [slide])

   return (
      <div className="z-2 w-[90vw] max-w-3xl min-h-[150px] border-2 border-secondary bg-primary absolute bottom-20 lg:bottom-5 left-1/2 -translate-x-1/2 rounded-b-xl sm:rounded-b-2xl h-fit sm:text-xl text-base">
         <div className="w-full h-full bg-secondary absolute -z-1 mask-b-from-30% mask-b-to-150% rounded-b-xl sm:rounded-b-2xl overflow-hidden">
            <div className="w-full h-full bg-[url(/game_dialog_bg.webp)] bg-cover bg-center absolute opacity-60 mask-t-from-30% mask-t-to-100%"></div>
         </div>
         <p className="relative z-1 p-5 pt-7 sm:pt-6">{content}</p>

         {/* char name left */}
         <AnimatePresence mode="popLayout">
            {slide?.character_on_screen[0]?.is_active && (
               <motion.h1
                  key={slide?.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute -top-8 sm:-top-6 left-3 sm:left-10 text-2xl font-bold italic uppercase bg-primary text-secondary py-1 px-3 rounded-md z-3 shadow-md shadow-muted-foreground">
                     {slide?.speaker_name}
               </motion.h1>
            )}
            {slide?.character_on_screen[1]?.is_active && (
               <motion.h1
                  key={slide?.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute -top-8 sm:-top-6 right-3 sm:right-10 text-2xl font-bold italic uppercase bg-primary text-secondary py-1 px-3 rounded-md z-3 shadow-md shadow-muted-foreground">
                     {slide?.speaker_name}
               </motion.h1>
            )}
         </AnimatePresence>
      </div>
   )
}
