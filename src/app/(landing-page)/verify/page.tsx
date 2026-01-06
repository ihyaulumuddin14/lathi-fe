"use client"

import { verifyService } from "@/services/auth.service"
import { AxiosError } from "axios"
import { redirect, useSearchParams } from "next/navigation"
import { toast } from "sonner"

const Verify = () => {
   const searchParams = useSearchParams()
   const token = searchParams.get("token")

   const redirectToLogin = async (token: string) => {
      console.log(token)
      try {
         const response = await verifyService({ token })

         if (response.success) {
            redirect("/home?verified=true")
         } else {
            throw Error()
         }
      } catch (error) {
         if (error instanceof AxiosError) {
            toast.error(error.response?.data.error.message || "Terjadi kesalahan pada sistem")
         } else {
            toast.error("Terjadi kesalahan pada sistem")
         }
      }
   }

   if (token) redirectToLogin(token)

}

export default Verify