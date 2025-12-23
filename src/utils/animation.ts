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

export const animatePageIn = () => {
  const bannerOne = document.getElementById("banner-1") as HTMLDivElement;
  const bannerTwo = document.getElementById("banner-2") as HTMLDivElement;
  const bannerThree = document.getElementById("banner-3") as HTMLDivElement;
  const bannerFour = document.getElementById("banner-4") as HTMLDivElement;

  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const timeline = gsap.timeline()

    timeline.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 0
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 100,
      stagger: 0.2,
      ease: "sine.inOut"
    })
  }
}

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const bannerOne = document.getElementById("banner-1") as HTMLDivElement;
  const bannerTwo = document.getElementById("banner-2") as HTMLDivElement;
  const bannerThree = document.getElementById("banner-3") as HTMLDivElement;
  const bannerFour = document.getElementById("banner-4") as HTMLDivElement;
  
  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const timeline = gsap.timeline()
  
    timeline.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 100
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 0,
      stagger: 0.2,
      ease: "sine.inOut",
      onComplete: () => router.push(href)
    })
  }
}