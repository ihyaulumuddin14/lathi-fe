import { Suspense } from "react";
import BausastraSaku from "./BausastraSaku";
import { Loader } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Bausastra Saku",
   description: "Kumpulan kata yang ditemukan pemain ketika menjalani permainan disertai dengan makna dan pencarian kata secara spesifik"
}

export default function Page() {
  return (
    <Suspense fallback={<section className="w-full min-h-screen flex justify-center items-center"><Loader /></section>}>
      <BausastraSaku />
    </Suspense>
  );
}
