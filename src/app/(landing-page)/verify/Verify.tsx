'use client'

import { verifyService } from "@/services/auth.service"
import { AxiosError } from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"
import Loader from "@/components/Loader"

export default function Verify() {
   const params = useSearchParams()
   const tokenResult = params.get("token")
   const router = useRouter()

   useEffect(() => {
      const redirectToLogin = async (token: string) => {
         try {
            const response = await verifyService({ token })
   
            if (response.success) {
               router.replace("/home?verified=true")
            } else {
               throw Error()
            }
         } catch (error) {
            if (error instanceof AxiosError) {
               toast.error(error.response?.data.error.detail || "Terjadi kesalahan pada sistem")
            } else {
               toast.error("Terjadi kesalahan pada sistem")
            }
            router.replace("/home")
         }
      }

      if (tokenResult) redirectToLogin(tokenResult as string)
   }, [tokenResult])

   return <section className="w-full min-h-screen flex justify-center items-center bg-secondary"><Loader /></section>
}
