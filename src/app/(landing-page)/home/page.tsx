import Hero from "@/app/(landing-page)/home/(home-sections)/Hero";
import Features from "@/app/(landing-page)/home/(home-sections)/Features";
import Problem from "@/app/(landing-page)/home/(home-sections)/Problem";
import Teaser from "@/app/(landing-page)/home/(home-sections)/Teaser";
import Quote from "@/app/(landing-page)/home/(home-sections)/Quote";
import CTA from "@/app/(landing-page)/home/(home-sections)/CTA";
import Footer from "@/app/(landing-page)/home/(home-sections)/Footer";

type HomeProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home({ searchParams } : HomeProps) {
  const { verified } = await searchParams
  const verificationResult = verified === "true"

  return (
    <main className="w-full h-fit text-center min-h-screen relative overflow-x-hidden text-lg">
      <div className="w-full h-screen fixed top-0 left-0 bg-[url(/bg-hero.webp)] bg-cover opacity-10 z-0"/>
      <Hero verified={verificationResult}/>
      <Features />
      <Problem />
      <Teaser />
      <Quote />
      <CTA />
      <Footer />
    </main>
  );
}
