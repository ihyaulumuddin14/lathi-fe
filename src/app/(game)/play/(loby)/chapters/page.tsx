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
         <h1 className='font-extrabold text-3xl lg:text-5xl xl:text-center text-secondary w-fit bg-primary px-5 py-3 rounded-xl -rotate-3 shadow-xl shadow-accent-foreground'>Pilihan Bagian</h1>
         
         <div className='w-full h-full gap-x-5 gap-y-10 lg:gap-10 grid grid-cols-[repeat(auto-fill,175px)] lg:grid-cols-[repeat(auto-fill,300px)] justify-center'>
            {chapters && chapters.map((chapter) => (
               <div
                  key={chapter.id}
                  onClick={() => setSelectedChapterId(chapter.id)}
                  className={`
                     w-full max-w-sm aspect-3/4 border rounded-2xl bg-primary flex justify-center items-center
                     ${chapter.is_locked ? "pointer-events-none" : "hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out active:scale-100"}
                     relative`
                     }
                  >
                  <div className={`w-9/10 aspect-3/4 border-3 rounded-md border-secondary relative ${chapter.is_locked ? "saturate-0 opacity-20" : ""}`}>
                     <Image src={"/bg-hero.webp"} fill alt="chapter_image" className="object-cover object-center"/>
                  </div>

                  <LockKeyhole className={`${chapter.is_locked ? "block" : "hidden"} absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`} size={"3em"} color="#b0b0b0"/>

                  <h1 className="absolute -top-3 lg:top-2 lg:left-2 lg:text-xl bg-secondary px-3 py-1 rounded-md border-2 max-w-[200px]">{chapter.title}</h1>
                  <p>{}</p>
                  <h2 className="absolute border-3 -bottom-2 lg:bottom-2 lg:right-1/2 lg:translate-x-1/2 text-xl lg:text-3xl text-secondary bg-primary px-3 py-1 rounded-md">Bagian {chapter.order_index}</h2>

                  {chapter.id === selectedChapterId && (
                     <p className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-ring text-secondary rotate-3 lg:rotate-6 px-3 py-1 rounded-md lg:text-2xl uppercase shadow-lg shadow-accent-foreground">Terpilih</p>
                  )}
               </div>
            ))}

            {!chapters && [...Array(4)].map((_,index) => (
               <div key={index} className="w-full max-w-sm aspect-3/4 rounded-2xl bg-neutral-300 animate-pulse relative flex justify-center items-center">
                  <div className="w-9/10 aspect-3/4 rounded-md bg-neutral-400 animate-pulse" />
                  <span className="absolute -top-3 lg:top-2 lg:left-2 px-3 py-1 rounded-md w-full max-w-[200px] h-[50px] bg-neutral-500 animate-pulse"/>
                  <span className="absolute -bottom-2 lg:bottom-2 lg:right-1/2 lg:translate-x-1/2 bg-neutral-500 animate-pulse px-3 py-1 rounded-md w-full max-w-[100px] h-[40px]"/>
               </div>
            )) }
         </div>
      </section>
   )
}
