'use client'

import { useMenu } from "@/stores/useMenu";
import React, { useRef } from "react";
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { listLinkShortcut } from "@/app/(home-sections)/Footer";
import TransitionLink from "./TransitionLink";
import { usePathname } from "next/navigation";

const MenuOverlay = () => {
  const { isOpenMenu, setIsOpenMenu } = useMenu();
  const menuRef = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()

  useGSAP(() => {
    if (isOpenMenu) {
      gsap.fromTo(menuRef.current, {
        duration: 2.5,
        clipPath: "circle(0% at 50% 50%)",
        ease: "expo.out",
      }, {
        clipPath: "circle(100% at 50% 50%)",
      })
    } else {
      gsap.fromTo(menuRef.current, {
        duration: 2.5,
        clipPath: "circle(100% at 50% 50%)",
        ease: "expo.out",
      }, {
        clipPath: "circle(0% at 50% 50%)",
      })
    }
    
  }, [isOpenMenu, setIsOpenMenu])

  return (
    <section
      ref={menuRef}
      className={`
        bg-primary inset-0 fixed z-48 ${isOpenMenu ? "" : "pointer-events-none"}
        flex justify-center items-center
      `}
    >
      <ul className="text-primary-foreground w-full flex flex-col items-center gap-0 lg:gap-1">
        {listLinkShortcut.map((link, index) => (
          <TransitionLink
            up="group-hover:-translate-y-[1.3em]"
            componentType="button-primary"
            transitionType={link.url === "/play" ? "page" : "template"}
            className={`uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl py-[0em] ${pathname.split("/")[1] === link.url.split("/")[1] ? "border-x" : ""}`}
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
