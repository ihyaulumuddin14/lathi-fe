'use client'

import { Slide, Vocabulary } from '@/schema/GameSchema'
import { AnimatePresence, motion } from 'motion/react'
import { Meh, Smile, Angry } from "lucide-react"
import { useEffect, useRef, useState } from 'react'
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
 } from "@/components/ui/popover"
import { charReaction } from './StoryPage'
import gsap from "gsap"
import SplitText from 'gsap/src/SplitText'
import { useGSAP } from '@gsap/react'
import { useTypingAnimation } from '@/stores/useTypingAnimation'

type CharDialogProps = {
   slide: Slide,
   characterReaction: charReaction | string
}

export default function CharDialog({ slide, characterReaction }: CharDialogProps ) {
   const [vocabs, setVocabs] = useState<Vocabulary[]>([])
   const dialogRef = useRef<HTMLParagraphElement>(null)
   const { animationDone, setAnimationDone } = useTypingAnimation()

   useEffect(() => {
      setAnimationDone(false)
   }, [slide.id])    
   
   useEffect(() => {
      if (slide) {
         setVocabs(slide.vocabularies as Vocabulary[])
      }
   }, [slide])

   useGSAP(() => {
      if (!dialogRef.current || animationDone) return
    
      const split = SplitText.create(dialogRef.current, {
        type: "chars, words"
      })
    
      gsap.set(split.chars, { visibility: "hidden" })
    
      gsap.to(split.chars, {
        visibility: "visible",
        stagger: 0.07,
        ease: "none",
        onComplete: () => {
          split.revert()
          setAnimationDone(true)
        }
      })
    
      return () => {
        split.revert()
      }
    }, [slide.id, animationDone])
    
   
   let vocabIndex = 0;
   
   const finalContent = slide.content?.split(" ").map((word, index) => {
      const clean = word.replace(/[{}]/g, "")
      const isVocab = word.includes("{") && word.includes("}")
    
      if (!isVocab) {
        return <span key={index}>{clean} </span>
      }
    
      const vocab = vocabs[vocabIndex++]
      if (!vocab) return <span key={index}>{clean} </span>
    
      return (
        <Popover key={index}>
          <PopoverTrigger asChild>
            <span className="cursor-pointer">
              <strong>{clean}</strong>{" "}
            </span>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-fit">
            <p><b>Krama:</b> {vocab.word_krama}</p>
            <p><b>Ngoko:</b> {vocab.word_ngoko}</p>
            <p><b>Indonesia:</b> {vocab.word_indo}</p>
          </PopoverContent>
        </Popover>
      )
    })

   const rawContent = slide.content?.split(" ").map((word, index) => {
      const clean = word.replace(/[{}]/g, "")
      const isVocab = word.includes("{") && word.includes("}")
    
      return (
        <span key={index}>
          {isVocab ? (
            <strong><u>{clean}</u></strong>
          ) : (
            clean
          )}{" "}
        </span>
      )
   })

   return (
      <div className="z-5 w-[90vw] max-w-3xl min-h-[150px] border-2 border-secondary bg-primary absolute bottom-20 lg:bottom-5 left-1/2 -translate-x-1/2 rounded-b-xl sm:rounded-b-2xl h-fit sm:text-xl text-base">
         <div className="w-full h-full bg-secondary absolute -z-1 mask-b-from-30% mask-b-to-200% rounded-b-xl sm:rounded-b-2xl overflow-hidden">
            <div className="w-full h-full bg-[url(/game_dialog_bg.webp)] bg-cover bg-center absolute opacity-40 mask-t-from-30% mask-t-to-150%"></div>
         </div>
         <motion.p
            ref={dialogRef}
            key={animationDone ? "final" : "raw"}
            className="relative z-1 p-5 pt-7"
            >
            {animationDone ? finalContent : rawContent}
         </motion.p>

         <AnimatePresence mode="popLayout">
            {slide?.character_on_screen[0]?.is_active && (
               <motion.h1
                  key="char-a"
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
                  key="char-b"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute -top-8 sm:-top-6 right-3 sm:right-10 text-2xl font-bold italic uppercase bg-primary text-secondary py-1 px-3 rounded-md z-3 shadow-md shadow-muted-foreground">
                     <div className={`p-1 rounded-full absolute top-0 -left-2 -translate-x-full ${characterReaction === "normal" ? "bg-gray-500" : characterReaction === "angry" ? "bg-destructive" : "bg-green-500"}`}>
                        {
                        characterReaction === "normal" ? 
                           <Meh color='#fff' size={30} /> : 
                           characterReaction === "angry" ? 
                              <Angry color='#fff' size={30}/> : 
                              <Smile color='#fff' size={30}/>}
                     </div>
                     {slide?.speaker_name}
               </motion.h1>
            )}
         </AnimatePresence>
      </div>
   )
}
