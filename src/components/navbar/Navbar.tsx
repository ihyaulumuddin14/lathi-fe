'use client'

import Image from 'next/image'
import TransitionLink from '../TransitionLink'
import { usePathname } from 'next/navigation'
import HamburgerMenu from '../HamburgerMenu'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { Button } from '@/components/ui/button'
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav id='navbar' className='w-full h-fit bg-transparent py-3 px-10 fixed top-0 left-0 z-40'>
      {pathname === '/play' ? <PlayNavbar /> : <MainNavbar />}
    </nav>
  )
}


const PlayNavbar = () => {
  return (
    <ul className='flex justify-between'>
      <HamburgerMenu />

      <h1>Sowan Calon Mertua</h1>

      <button className='px-4 py-2 bg-linear-to-r to-violet-700 from-purple-600 text-white rounded-md font-semibold cursor-pointer'>
        Sign in
      </button>
    </ul>
  )
}

const MainNavbar = () => {
  const width = useWindowWidth()

  useGSAP(() => {
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
  }, [])

  return (
    <div className='flex justify-between items-center text-blend-difference'>
      { width! < 640 ? 
        (
          <HamburgerMenu />
        ) : ( <>
          <TransitionLink href={"/"}>
            <Image src={"/logo.png"} width={40} height={40} alt="Logo" className='rounded-full border'/>
          </TransitionLink>

          <ul className='flex gap-10'>
            <TransitionLink transitionType="page" href={"/play"}>Lakon</TransitionLink>
            <TransitionLink href={"/collection"}>Bausastra Saku</TransitionLink>
            <TransitionLink href={"/profile"}>Profil</TransitionLink>
          </ul>
        </>
        )
      }


      <Button>Sign in</Button>
    </div>
  )
}