'use client'

import TransitionLink from "@/components/TransitionLink";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronLast } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export const listLinkShortcut = [
  {
    title: "Beranda",
    url: "/",
  },
  {
    title: "Lakon",
    url: "/play",
  },
  {
    title: "Koleksi Kata",
    url: "/collection",
  },
  {
    title: "Papan Peringkat",
    url: "/leaderboard",
  },
  {
    title: "Profil",
    url: "/profile",
  }
]


const Footer = () => {
  const footerTitleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    gsap.fromTo(footerTitleRef.current, {
      yPercent: -100,
      scale: 0.8
    }, {
      scrollTrigger: {
        trigger: "#footer",
        start: "top bottom",
        end: "top top",
        scrub: true
      },
      yPercent: 0,
      scale: 1,
      ease: "expo.out"
    })

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#team",
        start: "top 80%",
      }
    })

    timeline.from(".little-title", {
      xPercent: -100,
      duration: 1,
      delay: 0.5,
      ease: "power4.out"
    }).fromTo(".img-team", {
      filter: "blur(100px)",
    }, {
      filter: "blur(0px)",
      duration: 2,
      stagger: 0.2,
      ease: "power4.out"
    })
  }, [])

  return (
    <section className="w-full h-fit relative z-1">
      <footer id="footer" className="w-full max-w-[98vw] mx-auto h-fit rounded-2xl px-[3vw] py-[1vw] grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] sm:gap-0 gap-5 bg-primary relative z-1 divide-y overflow-hidden">
        <h1 ref={footerTitleRef} className="uppercase text-primary-foreground text-[clamp(7em,15vw,20em)] leading-[clamp(6rem,12vw,12rem)] w-full flex items-end justify-center sm:justify-end mask-b-from-90%">
          Lathi
        </h1>
        <ul className="text-primary-foreground w-full flex flex-col justify-end items-start gap-0 lg:gap-1 p-5 sm:px-5 sm:py-0 border-y sm:border-0">
          {listLinkShortcut.map((link, index) => (
            <TransitionLink
              up="group-hover:-translate-y-[1.4em]"
              componentType="button-primary"
              // transitionType={link.url === "/play" ? "page" : "template"}
              className="uppercase text-md sm:text-lg md:text-xl lg:text-2xl py-[0em] scale-100 hover:scale-100 active:scale-100"
              key={index}
              href={link.url}>
                {link.title}
            </TransitionLink>
          ))}
        </ul>
        <p className="text-primary-foreground tracking-widest sm:col-span-2">Copyright &copy; 2025 Lathi</p>
      </footer>

      <article id="team" className="w-full h-fit p-[3vw] flex flex-col gap-5">
        <header className="little-title uppercase text-left flex gap-2">
          <ChevronLast />
          Tim Pengembang
        </header>

        <main className="w-full grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] gap-5 text-left justify-center items-center">
          <div className="w-full h-fit img-team flex gap-3">
            <div className="relative w-full aspect-4/5">
              <Image src={"/ulum-photo.webp"} fill alt="developer_photo" className="saturate-50 object-cover"/>
            </div>
            <div className="w-full">
              <h3 className="font-extrabold mt-3 text-lg lg:text-2xl leading-5">Ihya&apos; Ulumuddin</h3>
              <p className="text-md lg:text-xl leading-10">Frontend Developer</p>
            </div>
          </div>
          <div className="w-full h-fit img-team flex gap-3">
            <div className="relative w-full aspect-4/5">
              <Image src={"/abil-photo.webp"} fill alt="developer_photo" className="saturate-50 object-cover"/>
            </div>
            <div className="w-full">
              <h3 className="font-extrabold mt-3 text-lg lg:text-2xl leading-5">Muhammad Hafizh Faiqunnabil</h3>
              <p className="text-md lg:text-xl leading-10">Backend Developer</p>
            </div>
          </div>
        </main>
      </article>
    </section>
  )
};

export default Footer;