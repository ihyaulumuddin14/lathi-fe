import { Metadata } from "next"
import Verify from "./Verify"

export const metadata: Metadata = {
   title: "Verifikasi",
   description: "Proses verifikasi akun pengguna untuk mengaktifasi akun sehingga dapat menggunakan fitur dari platform dengan baik"
}

const VerifyPage = () => {
   return (
      <>
         <Verify />
      </>
   )
}

export default VerifyPage