'use client'

import { useRef } from "react";
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const Quote = () => {
  const quoteTextRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)

    const quoteText = SplitText.create(quoteTextRef.current, {
      type: "chars"
    })

    gsap.set(quoteText.chars, {
      autoAlpha: 0,
      y: 100,
    })

    gsap.to(quoteText.chars, {
      scrollTrigger: {
        trigger: "#quote",
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      stagger: 0.05,
      autoAlpha: 1,
      y: 0,
    })

    gsap.set(quoteTextRef.current, {
      xPercent: 90
    })

    gsap.to("#quote", {
      scrollTrigger: {
        trigger: "#quote",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true
      }
    })

    gsap.to(quoteTextRef.current, {
      scrollTrigger: {
        trigger: "#quote",
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      xPercent: -50,
      ease: "none"
    })
  }, [])

  return (
    <section id="quote" className="section-wrapper bg-background flex justify-center items-center">
      <h1 ref={quoteTextRef} className="text-[clamp(5rem,10vw,10rem)] font-extrabold whitespace-nowrap tracking-tighter">GAUL BOLEH, SOPAN WAJIB</h1>
    </section>
  )
};

export default Quote;
