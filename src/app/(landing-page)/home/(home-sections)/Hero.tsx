"use client";

import TransitionLink from "@/components/TransitionLink";
import { useAlertDialogIntercept } from "@/stores/useAlertDialogIntercept";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { Mouse } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const Hero = ({ verified }: { verified?: boolean }) => {
  const heroTitleRef = useRef(null);
  const heroParagraphRef = useRef(null);
  const { setAlertDialogType } = useAlertDialogIntercept();
  const router = useRouter();

  useEffect(() => {
    if (verified) {
      toast.success("Akun berhasil terverifikasi");
      setAlertDialogType("login");
    }
  }, []);

  useGSAP(() => {
    const run = () => {
      const timeline = gsap.timeline();

      const heroTitle = SplitText.create(heroTitleRef.current, {
        type: "chars",
      });
      const heroParagraph = SplitText.create(heroParagraphRef.current, {
        type: "lines",
      });

      timeline
        .from(heroTitle.chars, {
          duration: 2,
          y: 100,
          autoAlpha: 0,
          stagger: 0.05,
          delay: 0.2,
          ease: "expo.out",
        })
        .from(
          heroParagraph.lines,
          {
            duration: 2,
            translateX: 50,
            yPercent: 100,
            autoAlpha: 0,
            stagger: 0.2,
            delay: 0.2,
            ease: "expo.out",
          },
          "<"
        );
    };

    if (document.readyState === "complete") {
      run();
    } else {
      window.addEventListener("load", run);
    }

    return () => {
      window.removeEventListener("load", run);
    };
  }, []);

  return (
    <section
      id="hero"
      className="section-wrapper flex justify-center items-center relative z-1 bg-transparent"
    >
      <div className="wrapper w-full max-w-[80vw] h-fit relative z-3 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-2 sm:gap-[2vw] items-center bg-transparent">
        <div className="font-love-light overflow-hidden flex justify-center md:justify-end px-[1vw] w-full h-fit">
          <h1
            ref={heroTitleRef}
            className="text-[clamp(9rem,15vw,20rem)] leading-[clamp(9rem,14vw,14vw)]"
          >
            Lathi
          </h1>
        </div>
        <div className="w-full h-fit flex justify-center md:justify-start order-3 md:order-2 mt-10 md:mt-0 pb-10">
          <TransitionLink
            onMouseEnter={() => router.prefetch("/play")}
            transitionType="fade"
            href="/play"
            componentType="button-primary"
            className="hero-play-button rounded-xl text-[clamp(1.8rem,3vw,3.5rem)]"
          >
            Mulai Lakon
          </TransitionLink>
        </div>
        <div className="w-full h-fit flex justify-center md:col-span-2 order-2 md:order-3 overflow-hidden">
          <p ref={heroParagraphRef} className="w-full max-w-lg md:pl-20 text-sm sm:text-lg">
            Simulasi interaktif untuk menaklukkan Bahasa Jawa Krama Inggil. Ubah
            rasa canggungmu menjadi <i>unggah-ungguh</i> yang berkelas.
            <i>
              <strong> Aja dadi &quot;Wong Jawa sing ilang Jawane&quot;</strong>
            </i>
          </p>
        </div>
      </div>

      <div
        onClick={() => {
          if (typeof window !== undefined) {
            window.scrollTo({ top: 1750, behavior: "smooth" });
          }
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce overflow-visible flex flex-col items-center gap-1"
      >
        <Mouse size={40} />
        <p className="font-extralight text-sm sm:text-md">Jelajahi Lathi</p>
      </div>
    </section>
  );
};

export default Hero;
