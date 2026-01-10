"use client";

import { animatePageOut } from "@/utils/animation";
import { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import { useTransitionRouter } from "next-view-transitions";
import NavigationLink from "./NavigationLink";
import MainButton from "./MainButton";
import { useAuthStore } from "@/stores/useAuthStore";
import { useAlertDialogIntercept } from "@/stores/useAlertDialogIntercept";
import { useUser } from "@/hooks/useUser";

const protectedRouteLists = ["/play", "/collection", "/leaderboard", "/profile"];

interface TransitionLinkProps extends LinkProps {
  href: string;
  children: React.ReactNode;
  transitionType?: "stagger" | "fade" | "none";
  componentType?:
    | "link"
    | "button-primary"
    | "button-secondary"
    | "button-outline";
  className?: string;
  up?: string;
  onClick?: () => void;
}

const TransitionLink = ({
  onClick,
  up,
  href,
  children,
  transitionType = "stagger",
  componentType = "link",
  className,
}: TransitionLinkProps) => {
   // const transitionRouter = useTransitionRouter();
   //   const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken } = useAuthStore();
  const { setAlertDialogType } = useAlertDialogIntercept();

  const handleClick = () => {
    if (href !== pathname) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onClick && onClick();

      if (protectedRouteLists.includes(href)) {
        if (!accessToken) {
          setAlertDialogType("login");
          return;
        }
      }

      // if (transitionType === "template") {
      animatePageOut({
        href,
        router,
        animate: transitionType,
      });
      // } else {
      //   transitionRouter.push(href, {
      //     onTransitionReady: () => {
      //       pageAnimation();
      //     },
      //   });
      // }
    }
  };

  if (componentType === "link") {
    return (
      <NavigationLink
        className={className + " cursor-pointer"}
        onClick={handleClick}
      >
        {children}
      </NavigationLink>
    );
  } else if (componentType === "button-primary") {
    return (
      <MainButton
        up={up}
        variant="primary"
        onClick={handleClick}
        className={className}
      >
        {children}
      </MainButton>
    );
  } else if (componentType === "button-secondary") {
    return (
      <MainButton
        up={up}
        variant="secondary"
        onClick={handleClick}
        className={className}
      >
        {children}
      </MainButton>
    );
  } else if (componentType === "button-outline") {
    return (
      <MainButton
        up={up}
        variant="outline"
        onClick={handleClick}
        className={className}
      >
        {children}
      </MainButton>
    );
  }
};

// const pageAnimation = () => {
//   document.documentElement.animate(
//     [
//       {
//         opacity: 1,
//         scale: 1,
//         transform: "translateY(0)",
//       },
//       {
//         opacity: 0,
//         scale: 0.8,
//         transform: "translateY(100px)",
//       },
//     ],
//     {
//       duration: 1000,
//       easing: "cubic-bezier(0.76, 0, 0.24, 1)",
//       fill: "forwards",
//       pseudoElement: "::view-transition-old(root)",
//     }
//   );

//   document.documentElement.animate(
//     [
//       {
//         transform: "translateY(100%)",
//       },
//       {
//         transform: "translateY(0)",
//       },
//     ],
//     {
//       duration: 1000,
//       easing: "cubic-bezier(0.76, 0, 0.24, 1)",
//       fill: "forwards",
//       pseudoElement: "::view-transition-new(root)",
//     }
//   );
// };

export default TransitionLink;
