'use client'

import { ChevronLast } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

const CTA = () => {
  const CTATitleRef = useRef<HTMLHeadingElement>(null)
  const CTAParagraphRef = useRef<HTMLParagraphElement>(null)

    useGSAP(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger)

    const run = () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#cta",
          start: "top center"
        }
      })

      const CTATitle = SplitText.create(CTATitleRef.current, {
        type: "lines"
      })
      const CTAParagraph = SplitText.create(CTAParagraphRef.current, {
        type: "lines"
      })

      if (window !== undefined) {
        gsap.fromTo(".cta-image-wrapper", {
          yPercent: 0
        }, {
          scrollTrigger: {
            trigger: "#cta",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          },
          yPercent: window.innerWidth < 1200 ? 0 : -100,
          ease: "none"
        })
      }
      
      timeline.from(CTATitle.lines, {
        duration: 2,
        y: 100,
        autoAlpha: 0,
        stagger: 0.3,
        ease: "expo.inOut"
      }).from(CTAParagraph.lines, {
        duration: 2,
        yPercent: 100,
        autoAlpha: 0,
        stagger: 0.2,
        ease: "expo.inOut"
      }, "<")
    }

    run()

    ScrollTrigger.refresh()
  }, [])

  return (
   <section id="cta" className="section-wrapper relative z-1 p-[3vw]">
      <header className="flex flex-col gap-6">
         <h1 className="uppercase text-left flex gap-2">
            <ChevronLast />
            Our Vision
         </h1>
         <h2 ref={CTATitleRef} className="uppercase text-left text-4xl sm:text-6xl md:text-7xl xl:text-8xl leading-9 sm:leading-12 md:leading-14 xl:leading-20 font-bold tracking-tighter overflow-hidden">
            Kejar Gelar <br /> &quot;Mantu Idaman&quot;
         </h2>
      </header>

      <main className="w-full h-fit grid sm:grid-cols-2 gap-10 mt-10 items-center">
        <div className="w-full h-fit flex flex-col gap-4">
          <p ref={CTAParagraphRef} className="text-left w-full max-w-md">
            <span className="text-2xl sm:text-3xl font-bold">Jangan mau selamanya jadi &quot;Cah Wingit&quot; </span><br /><br />
            Temukan kata-kata tersembunyi, naikkan level sosialmu, dan jadilah pemuncak di <strong>Leaderboard </strong>
            minggu ini.
          </p>

          <div className="w-full flex gap-3">
            <Button>Cek Peringkat</Button>
            <Button>Mainkan</Button>
          </div>
        </div>
        <div className="cta-image-wrapper w-full h-fit flex justify-center">
          <Image src="/logo.png" width={500} height={500} alt="Problem" className="problem-image aspect-square object-cover rounded-2xl"/>
        </div>
      </main>
   </section>
  )
};

export default CTA;
