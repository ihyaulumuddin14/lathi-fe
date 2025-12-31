import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const notAnimatePageIn = () => {
  const bannerOne = document.getElementById("banner-1") as HTMLDivElement;
  const bannerTwo = document.getElementById("banner-2") as HTMLDivElement;
  const bannerThree = document.getElementById("banner-3") as HTMLDivElement;
  const bannerFour = document.getElementById("banner-4") as HTMLDivElement;
  
  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    gsap.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      visibility: "hidden"
    })
  }
}

export const animatePageIn = ({ animate }: { animate: "stagger" | "fade" | "none" }) => {
  const bannerOne = document.getElementById("banner-1") as HTMLDivElement;
  const bannerTwo = document.getElementById("banner-2") as HTMLDivElement;
  const bannerThree = document.getElementById("banner-3") as HTMLDivElement;
  const bannerFour = document.getElementById("banner-4") as HTMLDivElement;

  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    if (animate === "stagger") {
      const timeline = gsap.timeline()
      
      timeline.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
        yPercent: 0
      }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
        yPercent: 100,
        stagger: 0.2,
        ease: "sine.inOut"
      })
    } else if (animate === "fade") {
      gsap.to([bannerOne, bannerTwo, bannerThree, bannerFour], {
        opacity: 0,
        duration: 1,
        pointerEvents: "none",
        ease: "sine.inOut"
      })
    } else if (animate === "none") {
      gsap.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
        visibility: "hidden"
      })
    }

  }
}

export const animatePageOut = ({
  href,
  router,
  animate
}: {
  href: string,
  router: AppRouterInstance,
  animate: "stagger" | "fade" | "none"
}) => {const bannerOne = document.getElementById("banner-1") as HTMLDivElement;
  const bannerTwo = document.getElementById("banner-2") as HTMLDivElement;
  const bannerThree = document.getElementById("banner-3") as HTMLDivElement;
  const bannerFour = document.getElementById("banner-4") as HTMLDivElement;
  
  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    if (animate === "stagger") {
      const timeline = gsap.timeline()
    
      timeline.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
        yPercent: 100
      }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
        yPercent: 0,
        stagger: 0.2,
        ease: "sine.inOut",
        onComplete: () => router.push(href)
      })
    } else if (animate === "fade") {
      gsap.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
        autoAlpha: 0
      })
      gsap.to([bannerOne, bannerTwo, bannerThree, bannerFour], {
        autoAlpha: 100,
        duration: 2,
        ease: "sine.inOut",
        onComplete: () => router.push(href)
      })
    } else if (animate === "none") {
      gsap.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
        visibility: "hidden"
      })
      router.push(href)
    }
  }
}