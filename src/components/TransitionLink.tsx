"use client"

import { animatePageOut } from '@/utils/animation'
import { LinkProps } from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTransitionRouter } from 'next-view-transitions'
import NavigationLink from './NavigationLink'
import MainButton from './MainButton'

interface TransitionLinkProps extends LinkProps {
  href: string,
  children: React.ReactNode,
  transitionType?: "template" | "page",
  componentType?: "link" | "button-primary" | "button-secondary" | "button-outline",
  className?: string,
  up?: string
}

const TransitionLink = ({ up, href, children, transitionType = "template", componentType = "link", className }: TransitionLinkProps) => {
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

  if (componentType === "link") {
    return (
      <NavigationLink
        className={className + " cursor-pointer"}
        onClick={handleClick}
        >
          {children}
      </NavigationLink>
    )
  } else if (componentType === "button-primary") {
    return (
      <MainButton
        up={up}
        variant="primary"
        onClick={handleClick}
        className={className}>
          {children}
      </MainButton>
    )
  } else if (componentType === "button-secondary") {
    return (
      <MainButton
        up={up}
        variant="secondary"
        onClick={handleClick}
        className={className}>
          {children}
      </MainButton>
    )

  } else if (componentType === "button-outline") {
    return (
      <MainButton
        up={up}
        variant="outline"
        onClick={handleClick}
        className={className}>
          {children}
      </MainButton>
    )
  }
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