/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Love_Light } from "next/font/google";
import "./globals.css";
// import { ViewTransitions } from "next-view-transitions";
import AlertDialogIntercept from "@/components/AlertDialogIntercept";
import Loader from "@/components/Loader";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";

const loveLight = Love_Light({
  variable: "--font-love-light",
  subsets: ["latin"],
  weight: "400",
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
   title: {
      default: "Lathi",
      template: "%s | Lathi"
   },
  description: "Platform interaktif belajar bahasa jawa berbasis Visual Novel dengan mentranformasi pembelajaran Bahasa Jawa menjadi petualangan naratif",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en">
         <body
         className={`font-ibm-plex-serif antialiased`}
         >
            <Toaster position="top-center"/>
            <Suspense fallback={<Loader/>}>
               <AlertDialogIntercept />
            </Suspense>
            {children}
         </body>
      </html>
  );
}
