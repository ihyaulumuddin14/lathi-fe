import { Suspense } from "react";
import BausastraSaku from "./BausastraSaku";
import { Loader } from "lucide-react";
import { Metadata } from "next";
import ProtectedRoute from "../ProtectedRoute";

export const metadata: Metadata = {
   title: "Bausastra Saku",
   description: "Kumpulan kata yang ditemukan pemain ketika menjalani permainan disertai dengan makna dan pencarian kata secara spesifik"
}

export default function BausastraSakuPage() {
  return (
      <ProtectedRoute>
         <Suspense fallback={<section className="w-full min-h-screen flex justify-center items-center bg-secondary"><Loader /></section>}>
            <BausastraSaku />
         </Suspense>
      </ProtectedRoute>
  );
}
