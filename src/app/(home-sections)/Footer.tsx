'use client'

import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { ChevronLast } from "lucide-react";
import Image from "next/image";

const listLinkShortcut = [
  {
    title: "Beranda",
    url: "/",
  },
  {
    title: "Lakon",
    url: "/play",
  },
  {
    title: "Bausastra Saku",
    url: "/collection",
  },
  {
    title: "Leaderboard",
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
            <Link className="uppercase text-md sm:text-lg md:text-xl lg:text-2xl" key={index} href={link.url}>{link.title}</Link>
          ))}
        </ul>
        <p className="text-primary-foreground tracking-widest sm:col-span-2">Copyright &copy; 2025 Lathi</p>
      </footer>

      <article id="team" className="w-full h-fit p-[3vw] flex flex-col gap-5">
        <header className="little-title uppercase text-left flex gap-2">
          <ChevronLast />
          Meet the Team
        </header>

        <main className="w-full flex sm:flex-row flex-col gap-5 text-left justify-center items-center">
          <div className="w-fit h-fit img-team">
            <Image src={"/ulum-photo.webp"} width={200} height={300} alt="developer_photo" className="saturate-50"/>
            <h3 className="font-extrabold mt-3">Ihya' Ulumuddin</h3>
            <p>Frontend Developer</p>
          </div>
          <div className="w-fit h-fit img-team">
            <Image src={"/ulum-photo.webp"} width={200} height={300} alt="developer_photo" className="saturate-50"/>
            <h3 className="font-extrabold mt-3">M. Hafizh Faiqunnabil</h3>
            <p>Backend Developer</p>
          </div>
        </main>
      </article>
    </section>
  )
};

export default Footer;
