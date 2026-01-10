/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import TransitionLink from "@/components/TransitionLink";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "Lakon",
    description: "Bukan sekadar baca cerita. Tapi penentuan nasib ada di tanganmu sendiri lewat pilihan katamu. Salah ucap? Wassalam",
    url: "/play",
    image_url: "/features/lakon_capture.webp"
  },
  {
    title: "Bausastra Saku",
    description: "Koleksi kosa kata \"Sakti\" yang kamu temukan sepanjang cerita. Lengkapi koleksimu dari level Common sampai Legendary",
    url: "/collection",
    image_url: "/features/bausastra_saku_capture.webp"
  }, {
    title: "Leaderboard",
    description: "Buktikan siapa yang paling njawani. Saingkan score sopan-santunmu dengan teman se-Jawa mu",
    url: "/leaderboard",
    image_url: "/features/leaderboard_capture.webp"
  }, {
    title: "Profil",
    description: "Pantau progresmu. Apakah kamu masih 'Cah Polos' atau sudah layak dipanggil 'Priyayi'?",
    url: "/profile",
    image_url: "/features/profile_capture.webp"
  }
]

const Features = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [title, setTitle] = useState(api?.selectedScrollSnap() ? features[api?.selectedScrollSnap()].title : features[0].title);
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const fadeTextRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
      setTitle(features[api.selectedScrollSnap()].title)
    })
  }, [api])

  useEffect(() => {
   if (!api) return

   api.scrollTo(current - 1)
  }, [api, current])

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)

    const fadeText = SplitText.create(fadeTextRef.current, {
      type: "chars"
    })
    
    gsap.fromTo(".first-section", {
      scale: 0.9,
      yPercent: -100,
    }, {
      scrollTrigger: {
        trigger: "#features",
        start: "top bottom",
        end: "center top",
        scrub: true
      },
      scale: 1,
      yPercent: 100,
      backgroundColor: "var(--foreground)",
      ease: "none",
    })
    
    gsap.to(".first-section", {
      scrollTrigger: {
        trigger: "#features",
        start: "center top",
        end: "bottom -=200%",
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    })

    gsap.set(fadeText.chars, { autoAlpha: 0, filter: "blur(100px)", color: "var(--background)" })

    gsap.to(fadeText.chars, {
      scrollTrigger: {
        trigger: "#features",
        start: "center center",
        end: "bottom -=100%",
        scrub: true,
        onUpdate: self => {
         const currentSlideTarget = Math.floor((self.progress * 4) + 1)
         switch (currentSlideTarget) {
            case 1:
               setCurrent(currentSlideTarget)
               break
            case 2: 
               setCurrent(currentSlideTarget)
               break;
            case 3:
               setCurrent(currentSlideTarget)
               break;
            case 4:
               setCurrent(currentSlideTarget)
               break
         }
        }
      },
      autoAlpha: 1,
      filter: "blur(0px)",
      ease: "none",
      stagger: 0.05,
    })

    ScrollTrigger.refresh()
  }, [])
  

  return (
    <section id="features" className="w-full h-[200vh] relative z-0 ">
      <div className="first-section section-wrapper bg-background origin-center z-0"/>

      <div className="second-section relative section-wrapper bg-transparent px-[3vw] pt-22 pb-0 text-justify flex flex-col gap-5">
        <header className="w-full h-fit">
            <AnimatePresence mode="popLayout">
               <motion.h2
                  key={title}
                  initial={{ opacity: 0, scale: 0.5, origin: "center" }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="uppercase text-3xl md:text-5xl lg:text-6xl z-1 text-primary-foreground sm:pl-[10vw] font-bold">
                     {title}
               </motion.h2>
            </AnimatePresence>
        </header>

        <main className="w-full h-[clamp(10rem,26vw,20rem)] sm:h-fit sm:mask-x-from-90% pl-10">
          <div className="mx-auto max-w-5xl z-1">
            <Carousel setApi={setApi} className="w-full max-w-50 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              <CarouselContent>
                {features.map((feature, index) => (
                  <CarouselItem key={index}>
                    <Card className={`${current === index + 1 ? "opacity-100" : "opacity-50"} transition-all duration-300 ease-in-out cursor-grab active:cursor-grabbing`}>
                      <CardContent className={`flex ${current === index + 1 ? "aspect-4/2" : "aspect-3/1"} transition-all duration-500 ease-in items-center justify-center relative`}>
                        <Image src={feature.image_url} fill className="object-cover object-center" alt="feature_img" loading="eager"/>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </main>
        
        <footer className="z-1 w-full h-full flex-1 flex sm:flex-row flex-col justify-between overflow-visible">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl p-6">
            <motion.p
               key={features[current - 1]?.description}
               initial={{opacity: 0}}
               animate={{opacity: 1}}
               exit={{opacity: 0}}
               transition={{duration: 0.5, ease: "easeInOut"}}
               className="text-primary-foreground text-sm sm:text-md lg:text-lg h-25 sm:h-30" >
                  {features[current - 1]?.description}
            </motion.p>
            <TransitionLink href={features[current - 1]?.url} componentType="button-secondary">Buka Halaman</TransitionLink>
          </div>
          <h1 ref={fadeTextRef} className="text-[clamp(7em,12vw,11em)] leading-tight text-primary-foreground w-full flex items-end justify-center sm:justify-end mask-b-from-10% overflow-visible whitespace-nowrap">FITUR</h1>
        </footer>
      </div>
    </section>
  )
};

export default Features;

