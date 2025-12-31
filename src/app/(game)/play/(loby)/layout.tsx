'use client'

import ChapterInfo from "@/components/chapter-info/ChapterInfo";
import MenuGameList from "@/components/game-menu-navigation/MenuGameList";
import { useChapter } from "@/hooks/useChapter";
import { useGameInfo } from "@/stores/useGameInfo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import ProtectedRoute from "../../../ProtectedRoute";


const PlayLayout = ({ children }: { children: React.ReactNode }) => {
   const logoRef = useRef<HTMLImageElement>(null);
   const lobyContentRef = useRef<HTMLDivElement>(null);
   const { selectedChapterId, setSelectedChapterId } = useGameInfo()
   const { chapters } = useChapter()

   useEffect(() => {
      const id = JSON.parse(localStorage.getItem("selectedChapterId") || "null")
      if (id) setSelectedChapterId(id)
      else setSelectedChapterId(chapters[0].id)
   }, [])

   useEffect(() => {
      localStorage.setItem("selectedChapterId",JSON.stringify(selectedChapterId))
   }, [selectedChapterId])

   useGSAP(() => {
      const timeline = gsap.timeline({
         ease: "power2.out",
      });

      timeline.to(logoRef.current, {
         duration: 4,
         scale: 1.5,
      }).to(logoRef.current, {
         delay: 2,
         duration: 2,
         autoAlpha: 0,
      }, "<")

      gsap.set(lobyContentRef.current, {
         opacity: 0
      })
      
      gsap.to(lobyContentRef.current, {
         delay: 3,
         duration: 1,
         opacity: 1,
         ease: "power2.out"
      })
   }, [])

   return (
      <ProtectedRoute>
         <section className="w-full h-screen relative overflow-y-hidden">
         <Image ref={logoRef} src={"/logo.png"} alt="logo" width={200} height={200} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>

         <div className="w-full h-screen fixed top-0 left-0 bg-[url(/bg-hero.webp)] bg-cover opacity-10 blur-sm"></div>


         {/* WRAPPER NAV MENU */}
         <section ref={lobyContentRef} className="section-wrapper relative">
            <nav className="w-full lg:max-w-sm h-[40vh] lg:h-screen absolute bottom-0 left-0 grid grid-cols-[1.5fr_1fr] lg:flex flex-col gap-4 items-center p-[3vw]">
               <div className="w-full h-full absolute bg-accent-foreground/70 mask-t-from-90% lg:mask-y-from-50%"/>
               {/* LOGO */}
               <Image src={"/logo.png"} alt="logo" width={200} height={200} className="hidden lg:block"/>

               {/* GAME MENU */}
               <MenuGameList />

               <div className="relative z-1 lg:hidden rounded-md w-full h-full flex items-center justify-center">
               {/* CHAPTER INFO */}
               <ChapterInfo />
               </div>

               <p className="absolute bottom-1 left-1 text-secondary lg:text-primary lg:bottom-5 lg:left-5">Version 1.0</p>
            </nav>

            <main className="lg:ml-96 w-full lg:w-[calc(100vw-384px)] h-[60vh] lg:h-screen absolute top-0 left-0 overflow-y-auto overflow-x-hidden lg:mask-b-from-90%">
               { children }
            </main>

            {/* CHAPTER INFO */}
            <aside className="absolute right-10 top-10 hidden rounded-md w-full max-w-50 aspect-square lg:flex items-center">
               <ChapterInfo />
            </aside>
         </section>
         </section>
      </ProtectedRoute>
   );
};

export default PlayLayout;
