'use client'

import { listLinkShortcut } from "@/app/(landing-page)/home/(home-sections)/Footer";
import { useMenu } from "@/stores/useMenu";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import TransitionLink from "./TransitionLink";

const MenuOverlay = () => {
  const { isOpenMenu, setIsOpenMenu } = useMenu();
  const menuRef = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()
  const skipAnimationRef = useRef(true)

  useLayoutEffect(() => {
    skipAnimationRef.current = true

    gsap.set(menuRef.current, {
      clipPath: "circle(0% at 50% 50%)",
    })
    setIsOpenMenu(false)

  }, [pathname])

  useGSAP(() => {
    if (!menuRef.current) return

    if (skipAnimationRef.current) {
      skipAnimationRef.current = false
      return
    }

    const timeline = gsap.timeline()

    if (isOpenMenu) {
      timeline.fromTo(menuRef.current, {
        duration: 2.5,
        clipPath: "circle(0% at 50% 50%)",
        ease: "expo.out",
      }, {
        clipPath: "circle(100% at 50% 50%)",
      })
    } else {
      timeline.fromTo(menuRef.current, {
        duration: 2.5,
        clipPath: "circle(100% at 50% 50%)",
        ease: "expo.out",
      }, {
        clipPath: "circle(0% at 50% 50%)",
      })
    }
  }, [isOpenMenu])

  return (
    <section
      ref={menuRef}
      className={`
        bg-primary inset-0 fixed z-48 ${isOpenMenu ? "" : "pointer-events-none"}
        flex justify-center items-center transition-all duration-1500
      `}
    >
      <ul className="text-primary-foreground w-full flex flex-col items-center gap-0 lg:gap-1">
        {listLinkShortcut.map((link, index) => (
          <TransitionLink
            up="group-hover:-translate-y-[1.1em]"
            componentType="button-primary"
            transitionType={link.url === "/play" ? "fade" : "stagger"}
            className={`link-nav uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl py-[0em] ${pathname.split("/")[1] === link.url.split("/")[1] ? "border-x" : ""}`}
            key={index}
            href={link.url}
            onClick={() => setIsOpenMenu(false)}
            >
              {link.title}
          </TransitionLink>
        ))}
      </ul>
    </section>
  )
};

export default MenuOverlay;
