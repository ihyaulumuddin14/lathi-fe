import Hero from "@/app/(home-sections)/Hero";
import Features from "@/app/(home-sections)/Features";
import Problem from "@/app/(home-sections)/Problem";
import Teaser from "@/app/(home-sections)/Teaser";
import Quote from "@/app/(home-sections)/Quote";
import CTA from "@/app/(home-sections)/CTA";
import Footer from "@/app/(home-sections)/Footer";

export default function Home() {
  return (
    <main className="w-full h-fit text-center min-h-screen relative overflow-x-hidden">
      <div className="w-full h-screen fixed top-0 left-0 bg-[url(/bg-hero.webp)] bg-cover opacity-10 z-0"/>
      <Hero />
      <Features />
      <Problem />
      <Teaser />
      <Quote />
      <CTA />
      <Footer />
    </main>
  );
}
