"use client";

// import { useAlertDialogIntercept } from "@/stores/useAlertDialogIntercept"
// import AlertDialogIntercept from "@/components/AlertDialogIntercept";
import MenuOverlay from "@/components/MenuOverlay";
import { refreshService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { animatePageIn } from "@/utils/animation";
import { AxiosError } from "axios";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

const notAnimatePageIn = ["/play/chapters", "/play/rules"];

const Template = ({ children }: { children: React.ReactNode }) => {
   const pathname = usePathname();
   const { accessToken, setAccessToken } = useAuthStore(
      useShallow(state => ({
         accessToken: state.accessToken,
         setAccessToken: state.setAccessToken
      }))
   )

   useEffect(() => {
      const fetchRefresh = async () => {
         const response = await refreshService()

         if (response.success) {
            setAccessToken(response.data.access_token)
            toast.success(response.message)
         }
      }

      if (!accessToken) fetchRefresh()
   }, [accessToken, setAccessToken])

  useEffect(() => {
    const run = () => {
      if (notAnimatePageIn.includes(pathname)) {
        animatePageIn({ animate: "none" });
      } else if (pathname.startsWith("/play")) {
        animatePageIn({ animate: "fade" });
      } else {
        animatePageIn({ animate: "stagger" });
      }
    };

    // Disable Lenis for routes gameplay area (cuz too heavy)
    const shouldDisableLenis = notAnimatePageIn.includes(pathname);
    
    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    if (!shouldDisableLenis) {
      lenis = new Lenis();
      lenis.start();
      
      function raf(time: number) {
        if (lenis) {
          lenis.raf(time * 0.5);
          rafId = requestAnimationFrame(raf);
        }
      }

      rafId = requestAnimationFrame(raf);
    }

    if (document.readyState === "complete") {
      run();
    } else {
      window.addEventListener("load", run);
    }

    return () => {
      window.removeEventListener("load", run);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (lenis) {
        lenis.destroy();
      }
    };
  }, [pathname]);

  return (
    <div>
      <MenuOverlay />

      <div
        id="banner-1"
        className="min-h-screen bg-neutral-950 z-50 fixed top-0 left-0 w-1/4"
      />
      <div
        id="banner-2"
        className="min-h-screen bg-neutral-950 z-50 fixed top-0 left-1/4 w-1/4"
      />
      <div
        id="banner-3"
        className="min-h-screen bg-neutral-950 z-50 fixed top-0 left-2/4 w-1/4"
      />
      <div
        id="banner-4"
        className="min-h-screen bg-neutral-950 z-50 fixed top-0 left-3/4 w-1/4"
      />
      {children}
    </div>
  );
};

export default Template;
