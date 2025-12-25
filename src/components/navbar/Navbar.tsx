'use client'

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import HamburgerMenu from '../HamburgerMenu'
import MainButton from '../MainButton'
import TransitionLink from '../TransitionLink'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav id='navbar' className='w-full h-fit bg-transparent py-3 sm:py-1 px-7 sm:px-10 fixed top-0 left-0 z-40'>
      {pathname === '/play' ? <PlayNavbar /> : <MainNavbar />}
    </nav>
  )
}


const PlayNavbar = () => {
  return (
    <ul className='flex justify-between items-center'>
      <HamburgerMenu />

      <h1>Sowan Calon Mertua</h1>

      <button className='px-4 py-2 bg-linear-to-r to-violet-700 from-purple-600 text-white rounded-md font-semibold cursor-pointer'>
        Sign in
      </button>
    </ul>
  )
}

const MainNavbar = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640)
    }

    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])
  
  useGSAP(() => {
    const run = () => {
      gsap.registerPlugin(ScrollTrigger)
      
      gsap.to("#navbar", {
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
    
    if (typeof window !== undefined) {
      run()
    }
  }, [])
  
  if (isMobile === null) return null

  return (
    <div className='flex justify-between items-center text-blend-difference'>
      { isMobile ? 
        (
          <HamburgerMenu />
        ) : ( <>
          <TransitionLink href={"/"} componentType='button-outline'>
            <Image src={"/logo.png"} width={50} height={50} alt="Logo" className='rounded-full border'/>
          </TransitionLink>

          <ul className='flex gap-10'>
            <TransitionLink href={"/collection"}>Bausastra Saku</TransitionLink>
            <TransitionLink href={"/leaderboard"}>Papan Peringkat</TransitionLink>
            <TransitionLink href={"/profile"}>Profil</TransitionLink>
          </ul>
        </>
        )
      }

      <div className='w-fit flex gap-2'>
        <MainButton variant="primary">Log in</MainButton>
        <MainButton variant="outline">Sign in</MainButton>
      </div>
    </div>
  )
}