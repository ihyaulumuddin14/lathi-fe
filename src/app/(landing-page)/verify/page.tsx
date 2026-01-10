import { Metadata } from "next"
import Verify from "./Verify"
import { Suspense } from "react"
import Loader from "@/components/Loader"

export const metadata: Metadata = {
   title: "Verifikasi",
   description: "Proses verifikasi akun pengguna untuk mengaktifasi akun sehingga dapat menggunakan fitur dari platform dengan baik"
}

const VerifyPage = () => {
   return (
      <Suspense fallback={<section className="w-full min-h-screen flex justify-center items-center bg-secondary"><Loader /></section>}>
         <Verify />
      </Suspense>
   )
}

export default VerifyPage