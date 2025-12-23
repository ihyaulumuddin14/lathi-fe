"use client"

import { animatePageOut } from '@/utils/animation'
import { LinkProps } from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTransitionRouter } from 'next-view-transitions'

interface TransitionLinkProps extends LinkProps {
  href: string,
  children: React.ReactNode,
  transitionType?: "template" | "page"
}

const TransitionLink = ({ href, children, transitionType = "template" }: TransitionLinkProps) => {
  const router = useRouter()
  const transitionRouter = useTransitionRouter()
  const pathname = usePathname()

  const handleClick = () => {
    if (href !== pathname) {

      if (transitionType === "template") {
        animatePageOut(href, router)
      } else {
        transitionRouter.push(href, {
          onTransitionReady: () => {
            pageAnimation()
          }
        })
      }
    }
  }

  return (
    <button
      className='text-neutral-950 hover:text-neutral-600 uppercase'
      onClick={handleClick}
      >
        {children}
    </button>
  )
}



const pageAnimation = () => {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        scale: 1,
        transform: 'translateY(0)'
      },
      {
        opacity: 0,
        scale: 0.8,
        transform: 'translateY(100px)'
      }
    ], {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)"
    }
  )

  document.documentElement.animate(
    [
      {
        transform: 'translateY(100%)'
      },
      {
        transform: 'translateY(0)'
      }
    ], {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)"
    }
  )
}


export default TransitionLink