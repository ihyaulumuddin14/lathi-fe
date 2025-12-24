'use client'

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { Mouse } from "lucide-react";

const Hero = () => {

  const heroTitleRef = useRef(null)
  const heroParagraphRef = useRef(null)

  useGSAP(() => {
    const run = () => {
      const timeline = gsap.timeline()

      const heroTitle = SplitText.create(heroTitleRef.current, {
        type: "chars"
      })
      const heroParagraph = SplitText.create(heroParagraphRef.current, {
        type: "lines"
      })
  
      timeline.from(heroTitle.chars, {
        duration: 2,
        y: 100,
        autoAlpha: 0,
        stagger: 0.05,
        delay: 0.2,
        ease: "expo.out"
      }).from(heroParagraph.lines, {
        duration: 2,
        translateX: 50,
        yPercent: 100,
        autoAlpha: 0,
        stagger: 0.2,
        delay: 0.2,
        ease: "expo.out"
      }, "<").from(".hero-play-button", {
        duration: 3,
        y: 100,
        autoAlpha: 0,
        delay: 0.2,
        ease: "bounce.out"
      }, "<")
    }

    if (document.readyState === "complete") {
      run()
    } else {
      window.addEventListener("load", run)
    }

    return () => {
      window.removeEventListener("load", run)
    }
  }, [])

  return (
    <section id="hero" className="section-wrapper flex justify-center items-center relative z-1 bg-transparent">
      <div className="wrapper w-full max-w-[80vw] h-fit relative z-3 grid grid-cols-1 sm:grid-cols-[1.3fr_1fr] gap-2 sm:gap-[2vw] items-center bg-transparent">
        <div className="font-love-light overflow-hidden flex justify-center sm:justify-end px-[1vw] w-full h-fit">
          <h1 ref={heroTitleRef} className="text-[clamp(9rem,15vw,20rem)] leading-[clamp(9rem,14vw,14vw)]">
            Lathi
          </h1>
        </div>
        <div className="w-full h-fit sm:flex order-3 sm:order-2 mt-10 sm:mt-0 pb-10 overflow-hidden">
          <button className="hero-play-button h-fit w-fit rounded-lg border text-[clamp(1.8rem,3vw,4rem)] uppercase px-3 py-2">
            Mulai Lakon
          </button>
        </div>
        <div className="w-full h-fit flex justify-center sm:col-span-2 order-2 sm:order-3 overflow-hidden">
          <p ref={heroParagraphRef} className="w-full max-w-lg sm:pl-20">
            Simulasi interaktif untuk menaklukkan Bahasa Jawa Krama Inggil.
            Ubah rasa canggungmu menjadi <i>unggah-ungguh</i> yang berkelas.
            <strong> Aja dadi &quot;Wong Jawa sing ilang Jawane&quot;</strong>
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce overflow-visible flex flex-col items-center gap-1">
        <Mouse size={40} />
        <p className="font-extralight">Jelajahi Lathi</p>
      </div>
    </section>
  )
};

export default Hero;
