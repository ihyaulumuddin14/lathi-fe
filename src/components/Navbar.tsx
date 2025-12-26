'use client'

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import HamburgerMenu from './HamburgerMenu'
import MainButton from './MainButton'
import TransitionLink from './TransitionLink'
import { useAlertDialog } from "@/stores/useAlertDialog"
import { useMenu } from "@/stores/useMenu"

export default function Navbar() {
  const pathname = usePathname()
  const { isOpenMenu } = useMenu()

  return (
    <nav id='navbar' className={`w-full h-fit ${isOpenMenu ? 'bg-background' : 'bg-transparent'} transition-all duration-300 ease-in-out fixed top-0 left-0 z-50`}>
      {pathname === '/play' ? <PlayNavbar /> : <MainNavbar />}
    </nav>
  )
}


const PlayNavbar = () => {
  const { isOpenMenu, setIsOpenMenu } = useMenu()

  return (
    <ul className='w-full flex justify-between items-center py-3 sm:py-1 px-7 sm:px-10'>
      <HamburgerMenu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />

      <h1>Sowan Calon Mertua</h1>

      <button className='px-4 py-2 bg-linear-to-r to-violet-700 from-purple-600 text-white rounded-md font-semibold cursor-pointer'>
        Sign in
      </button>
    </ul>
  )
}

const MainNavbar = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const { setAlertDialogType } = useAlertDialog()
  const { isOpenMenu, setIsOpenMenu } = useMenu()
  const navRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768)
    }

    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])
  
  useGSAP(() => {
    const run = () => {
      gsap.registerPlugin(ScrollTrigger)
      
      gsap.to(navRef.current, {
        scrollTrigger: {
          trigger: "#features",
          start: "top top",
          end: "25% top",
          scrub: true
        },
        backgroundColor: "var(--background)",
        ease: "none",
      })
    }
    
    run()
  }, [isMobile])
  
  if (isMobile === null) return null

  return (
    <div ref={navRef} className='w-full flex justify-between items-center text-blend-difference py-3 px-7 sm:px-10'>
      { isMobile ? 
        (
          <HamburgerMenu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
        ) : ( <>
          <TransitionLink href={"/"} componentType='button-outline' className="py-[0em]">
            <Image src={"/logo.png"} width={40} height={40} alt="Logo" className='rounded-full hover:scale-110 duration-75 transition-all ease-in-out'/>
          </TransitionLink>

          <ul className='flex gap-10'>
            <TransitionLink href={"/collection"}>Koleksi Kata</TransitionLink>
            <TransitionLink href={"/leaderboard"}>Papan Peringkat</TransitionLink>
            <TransitionLink href={"/profile"}>Profil</TransitionLink>
          </ul>
        </>
        )
      }

      <div className='w-fit flex gap-2'>
        <MainButton variant="primary" onClick={() => setAlertDialogType("login")}>Masuk</MainButton>
        <MainButton variant="outline" onClick={() => setAlertDialogType("register")}>Daftar</MainButton>
      </div>
    </div>
  )
}