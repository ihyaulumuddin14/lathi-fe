'use client'

import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { title } from "process";

const Teaser = () => {
  const teaserTitleRef = useRef<HTMLHeadingElement>(null)
  const teaserDescRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    const run = () => {
      gsap.registerPlugin(ScrollTrigger)

      const fadeText = SplitText.create(teaserDescRef.current, {
        type: "words"
      })
      const titleText = SplitText.create(teaserTitleRef.current, {
        type: "chars"
      })
  
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#teaser",
          start: "top top",
          end: "top -=200%",
          scrub: true
        }
      })
  
      gsap.to("#teaser", {
        scrollTrigger: {
          trigger: "#teaser",
          start: "top top",
          end: "top -=150%",
          scrub: true,
          pin: true
        }
      })

      gsap.from(titleText.chars, {
        scrollTrigger: {
          trigger: "#teaser",
          start: "top center",
        },
        yPercent: 100,
        autoAlpha: 0,
        stagger: 0.05,
        ease: "sine.inOut",
        duration: 1
      })

      gsap.set(fadeText.words, {autoAlpha: 0.1})
  
      timeline.to(teaserTitleRef.current, {
        scale: 1.3,
        duration: 1
      }, "start").to(".img", {
        yPercent: -50,
        autoAlpha: 0.3,
        scale: 0.5,
        duration: 1,
        ease: "sine.inOut"
      }, "start").to(fadeText.words, {
        autoAlpha: 1,
        stagger: {
          amount: 1
        },
        duration: 1
      }, "start")
    }

    run()
  }, [])

  return (
    <section id="teaser" className="section-wrapper relative z-1 bg-background p-[3vw] flex flex-col justify-center items-center gap-4">
      <h2 className="uppercase text-center">Misi Utama:</h2>
      <h1 ref={teaserTitleRef} className="uppercase text-center text-4xl sm:text-6xl md:text-7xl xl:text-8xl leading-9 sm:leading-12 md:leading-14 xl:leading-20 font-extrabold tracking-tighter overflow-hidden origin-top z-2">Sowan <br /> Calon Mertua</h1>
      <p ref={teaserDescRef} className="mt-15 w-full max-w-md">
        Bayangkan kamu duduk di ruang tamu Joglo, berhadapan dengan Bapaknya pacarmu yang <i>killer</i>.
        Salah satu kata, restu melayang. <br /><br />
        <strong>Lathi </strong> melatihmu menghadapi situasi <i>high-stakes </i> seperti ini tanpa risiko nyata. 
        Salah di sini bisa diulang, salah di dunia nyata? <i>Ajum jum..</i>
      </p>

      <Image src={"/logo.png"} height={200} width={200} alt="logo" className="absolute top-20 left-10 z-1 img"/>
      <Image src={"/logo.png"} height={200} width={200} alt="logo" className="absolute bottom-10 left-5 z-1 img"/>
      <Image src={"/logo.png"} height={200} width={200} alt="logo" className="absolute bottom-5 right-0 z-1 img"/>
      <Image src={"/logo.png"} height={200} width={200} alt="logo" className="absolute top-0 right-10 z-1 img"/>
    </section>
  )
};

export default Teaser;
