'use client'

import { useChapter } from "@/hooks/useChapter";
import { useGameInfo } from "@/stores/useGameInfo";
import { LockKeyhole } from "lucide-react";
import Image from "next/image";
import { useShallow } from "zustand/shallow";

export default function ChaptersPage() {
   const {selectedChapterId, setSelectedChapterId} = useGameInfo(
      useShallow(state => ({
         selectedChapterId: state.selectedChapterId,
         setSelectedChapterId: state.setSelectedChapterId
      }))
   )
   const {chapters} = useChapter()

   return (
      <section className='pt-10 lg:pt-40 p-[3vw] w-full h-fit flex flex-col items-center lg:items-start xl:items-center gap-15'>
         <h1 className='font-extrabold text-3xl lg:text-5xl xl:text-center text-secondary w-fit bg-primary px-5 py-3 rounded-xl -rotate-3 shadow-xl shadow-accent-foreground'>Pilihan Babak</h1>
         
         <div className='w-full h-full gap-5 lg:gap-10 grid grid-cols-[repeat(auto-fill,175px)] lg:grid-cols-[repeat(auto-fill,300px)] justify-center'>
            {chapters.map(chapter => (
               <div
                  key={chapter.id}
                  onClick={() => setSelectedChapterId(chapter.id)}
                  className={`
                     w-full max-w-sm aspect-3/4 border rounded-2xl bg-primary flex justify-center items-center
                     ${chapter.is_locked ? "opacity-30 cursor-not-allowed pointer-events-none" : "hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out active:scale-100"}
                     relative`
                     }
                  >
                  <div className='w-9/10 aspect-3/4 border-3 rounded-md border-secondary relative overflow-visible'>
                     <Image src={"/bg-hero.webp"} fill alt="chapter_image" className="object-cover object-center"/>
                     <h1 className="absolute -top-3 lg:top-2 lg:left-2 lg:text-2xl bg-secondary px-3 py-1 rounded-md border-2 border-">{chapter.title}</h1>

                     <LockKeyhole className={`${chapter.is_locked ? "block" : "hidden"} absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`} size={"3em"}/>
                  </div>
                  <h2 className="absolute border-3 -bottom-2 lg:bottom-2 lg:right-1/2 lg:translate-x-1/2 text-xl lg:text-3xl text-secondary bg-primary px-3 py-1 rounded-md">Chapter {chapter.order_index}</h2>
                  {chapter.id === selectedChapterId && (
                     <p className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-ring text-secondary rotate-3 lg:rotate-6 px-3 py-1 rounded-md lg:text-2xl uppercase shadow-lg shadow-accent-foreground">Terpilih</p>
                  )}
               </div>
            ))}
         </div>
      </section>
   )
}
