'use client'


import AlertDialogIntercept from "@/components/AlertDialogIntercept"
import MenuOverlay from "@/components/MenuOverlay"
import { useAlertDialog } from "@/stores/useAlertDialog"
import { animatePageIn, notAnimatePageIn } from "@/utils/animation"
import Lenis from "lenis"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { useShallow } from "zustand/shallow"

const Template = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const { open, onOpenChange } = useAlertDialog(
    useShallow(state => ({
      open: state.open,
      onOpenChange: state.onOpenChange
    }))
  )

  useEffect(() => {
    const run = () => {
      if (pathname === '/play') {
        notAnimatePageIn()
      } else {
        animatePageIn()
      }
    }

    const lenis = new Lenis()

    if (open) {
      lenis.stop()
    } else {
      lenis.start()
      if (document.readyState === "complete") {
        run()
      } else {
        window.addEventListener("load", run)
      }
    }

    function raf(time: number) {
      lenis.raf(time*0.9)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)


    return () => {
      window.removeEventListener("load", run)
      lenis.destroy()
    }
  }, [pathname, open, onOpenChange])

  return (
    <div>
      <AlertDialogIntercept />
      <MenuOverlay />

      <div id='banner-1' className="min-h-screen bg-neutral-950 z-50 fixed top-0 left-0 w-1/4"/>
      <div id='banner-2' className="min-h-screen bg-neutral-950 z-50 fixed top-0 left-1/4 w-1/4"/>
      <div id='banner-3' className="min-h-screen bg-neutral-950 z-50 fixed top-0 left-2/4 w-1/4"/>
      <div id='banner-4' className="min-h-screen bg-neutral-950 z-50 fixed top-0 left-3/4 w-1/4"/>
      { children }
    </div>
  )
}

export default Template