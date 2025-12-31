"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import MainButton from "./MainButton";
import TransitionLink from "./TransitionLink";
import { useAlertDialogIntercept } from "@/stores/useAlertDialogIntercept";
import { useMenu } from "@/stores/useMenu";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUser } from "@/hooks/useUser";
import { ChevronLeft, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { logoutService } from "@/services/auth.service";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { animatePageOut } from "@/utils/animation";

export default function Navbar() {
  const pathname = usePathname();
  const { isOpenMenu } = useMenu();

  return (
    <nav
      id="navbar"
      className={`w-full h-fit transition-all duration-300 ease-in-out fixed top-0 left-0 z-48
      ${ isOpenMenu ? "bg-background" : "bg-transparent"}
      ${ pathname.startsWith("/play") ? "border-b border-muted" : ""}
      `}
    >
      {pathname.startsWith("/play") ? <PlayNavbar /> : <MainNavbar />}
    </nav>
  );
}

const PlayNavbar = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back()
  }

  return (
    <ul className="w-full flex items-center gap-3 py-3 px-7 sm:px-10">
      <div onClick={handleBack} className="p-2 border border-muted rounded-md hover:bg-muted cursor-pointer">
        <ChevronLeft />
      </div>
      <p className="text-lg font-bold">Kembali</p>
    </ul>
  );
};

const MainNavbar = () => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname()

  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const { setAlertDialogType } = useAlertDialogIntercept();
  const { isOpenMenu, setIsOpenMenu } = useMenu();

  const { accessToken } = useAuthStore();
  const { user, mutateUser } = useUser();

  const handleLogout = async () => {
    try {
      await logoutService();
      mutateUser(null, false);

      if (pathname !== "/") {
         router.push("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || "Terjadi kesalahan sistem"
        );
      } else {
        toast.error("Terjadi kesalahan sistem");
      }
    }
  };

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  useGSAP(() => {
    const run = () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(navRef.current, {
        scrollTrigger: {
          trigger: "#features",
          start: "top top",
          end: "25% top",
          scrub: true,
        },
        backgroundColor: "var(--background)",
        ease: "none",
      });
    };

    run();
  }, [isMobile]);

  if (isMobile === null) return null;

  return (
    <div
      ref={navRef}
      className="w-full flex justify-between items-center text-blend-difference py-3 px-7 sm:px-10"
    >
      {isMobile ? (
        <HamburgerMenu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
      ) : (
        <>
          <TransitionLink
            href={"/"}
            componentType="button-outline"
            className="py-[0em]"
          >
            <Image
              src={"/logo.png"}
              width={40}
              height={40}
              alt="Logo"
              className="rounded-full hover:scale-110 duration-75 transition-all ease-in-out"
            />
          </TransitionLink>

          {user && accessToken && (
            <ul className="flex gap-10">
              <TransitionLink href={"/collection"}>Koleksi Kata</TransitionLink>
              <TransitionLink href={"/leaderboard"}>
                Papan Peringkat
              </TransitionLink>
              <TransitionLink href={"/profile"}>Profil</TransitionLink>
            </ul>
          )}
        </>
      )}

      {user && accessToken ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <div className="w-fit rounded-full bg-background hover:scale-105 duration-75 transition-all ease-in-out active:scale-100 p-2 hover:bg-muted cursor-pointer">
              <User color="#3F2305" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="-translate-x-1/2 w-fit">
            <DropdownMenuLabel className="text-center text-muted-foreground">
              {user.username}
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => {
                  animatePageOut({
                     href: "/profile",
                     router,
                     animate: "stagger"
                  })
              }}>
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleLogout} variant="destructive">
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="w-fit flex gap-2">
          <MainButton
            variant="primary"
            onClick={() => setAlertDialogType("login")}
          >
            Masuk
          </MainButton>
          <MainButton
            variant="outline"
            onClick={() => setAlertDialogType("register")}
          >
            Daftar
          </MainButton>
        </div>
      )}
    </div>
  );
};
