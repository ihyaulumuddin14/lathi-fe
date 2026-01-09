import { verifyService } from "@/services/auth.service"
import { AxiosError } from "axios"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { toast } from "sonner"

export const metadata: Metadata = {
   title: "Verifikasi",
   description: "Proses verifikasi akun pengguna untuk mengaktifasi akun sehingga dapat menggunakan fitur dari platform dengan baik"
}

const Verify = async ({
   searchParams
}: {
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
   const tokenResult = (await searchParams).token

   const redirectToLogin = async (token: string) => {
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

   if (tokenResult) redirectToLogin(tokenResult as string)

}

export default Verify