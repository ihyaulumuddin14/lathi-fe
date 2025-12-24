'use client'

import { animatePageIn, notAnimatePageIn } from "@/utils/animation"
import Lenis from "lenis"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

const Template = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  useEffect(() => {
    const run = () => {
      setTimeout(() => {
        if (pathname === '/play') {
          notAnimatePageIn()
        } else {
          animatePageIn()
        }
      })
    }

    const lenis = new Lenis()

    lenis.start()

    function raf(time: number) {
      lenis.raf(time*0.9)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    if (document.readyState === "complete") {
      run()
    } else {
      window.addEventListener("load", run)
    }

    return () => {
      window.removeEventListener("load", run)
      lenis.destroy()
    }
  }, [pathname])

  return (
    <div>
      <div id='banner-1' className="min-h-screen bg-neutral-950 z-50 fixed top-0 left-0 w-1/4"/>
      <div id='banner-2' className="min-h-screen bg-neutral-950 z-50 fixed top-0 left-1/4 w-1/4"/>
      <div id='banner-3' className="min-h-screen bg-neutral-950 z-50 fixed top-0 left-2/4 w-1/4"/>
      <div id='banner-4' className="min-h-screen bg-neutral-950 z-50 fixed top-0 left-3/4 w-1/4"/>
      { children }
    </div>
  )
}

export default Template