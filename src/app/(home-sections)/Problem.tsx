'use client'

import { ChevronLast } from "lucide-react";
import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap"
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Problem = () => {
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroParagraphRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger)

    const run = () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#problem",
          start: "top center"
        }
      })

      const heroTitle = SplitText.create(heroTitleRef.current, {
        type: "lines"
      })
      const heroParagraph = SplitText.create(heroParagraphRef.current, {
        type: "lines"
      })

      if (typeof window !== undefined) {
        gsap.fromTo(".problem-image-wrapper", {
          yPercent: 0
        }, {
          scrollTrigger: {
            trigger: "#problem",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          },
          yPercent: window.innerWidth < 1200 ? 0 : -100,
          ease: "none"
        })
      }
      
      timeline.from(heroTitle.lines, {
        duration: 2,
        y: 100,
        autoAlpha: 0,
        stagger: 0.3,
        ease: "expo.inOut"
      }).from(heroParagraph.lines, {
        duration: 2,
        yPercent: 100,
        autoAlpha: 0,
        stagger: 0.2,
        ease: "expo.inOut"
      }, "<")

      gsap.to("#problem", {
        scrollTrigger: {
          trigger: "#problem",
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        yPercent: 100,
        scale: 0.9,
        autoAlpha: 0,
        ease: "sine.out"
      })
    }

    run()

    ScrollTrigger.refresh()
  }, [])

  return (
   <section id="problem" className="section-wrapper relative z-0 p-[3vw]">
      <header className="flex flex-col gap-6">
         <h1 className="uppercase text-left flex gap-2">
            <ChevronLast />
            Latar Belakang
         </h1>
         <h2 ref={heroTitleRef} className="uppercase text-left text-4xl sm:text-6xl md:text-7xl xl:text-8xl leading-9 sm:leading-12 md:leading-14 xl:leading-20 font-bold tracking-tighter overflow-hidden">
            Ngoko Lancar, <br />Krama Inggil <br /> Ambyar?
         </h2>
      </header>

      <main className="w-full h-fit grid sm:grid-cols-2 gap-10 mt-10 items-center">
        <p ref={heroParagraphRef} className="text-left text-lg w-full max-w-md">
          <span className="pl-10 text-2xl sm:text-3xl font-bold">Kita tahu rasanya. </span><br /><br />
          Lancar dan fasih ngomong ngoko sama teman tongkrongan, 
          tapi langsung kicep, gagap, dan keringat dingin pas harus ngobrol sama orang yang lebih sepuh (tua).  <br /><br />
          <strong> Degradasi</strong> <i>unggah-ungguh</i> itu nyata, Rek! Jangan sampai identitas kita sebagai orang Jawa hilang cuma karena kita takut salah ngomong.
        </p>
        <div className="problem-image-wrapper w-full h-fit flex justify-center">
          <Image src="/bg-hero.webp" width={500} height={500} alt="Problem" className="problem-image aspect-square object-cover rounded-2xl"/>
        </div>
      </main>
   </section>
  )
};

export default Problem;
