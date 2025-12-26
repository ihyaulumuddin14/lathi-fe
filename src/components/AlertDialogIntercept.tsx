'use client'

import AuthForm from "@/components/AuthForm"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { useAlertDialog } from "@/stores/useAlertDialog"
import { X } from "lucide-react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useShallow } from "zustand/shallow"

const AlertDialogIntercept = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { open, onOpenChange, alertDialogType, setAlertDialogType } = useAlertDialog(
    useShallow(state => ({
      open: state.open,
      onOpenChange: state.onOpenChange,
      alertDialogType: state.alertDialogType,
      setAlertDialogType: state.setAlertDialogType
    }))
  )
  
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        {/* header */}
        <AlertDialogHeader className="relative">
          <AlertDialogTitle className="text-center flex flex-col items-center">
            {alertDialogType === "login" && "Selamat datang kembali!"}
            {alertDialogType === "register" && "Mulai Jati Dirimu"}
            {alertDialogType === "warning" && (
              <>
                <Image src={"/logo.png"} alt="logo" width={100} height={100}/>
                <h1>
                  Permisi..
                </h1>
              </>
            )}
          </AlertDialogTitle>

          {/* close */}
          {alertDialogType !== "warning" && (
            <div className="close w-fit h-fit p-1 absolute -top-3 -right-3 active:scale-90 border border-[#7373737a] rounded-md cursor-pointer" onClick={() => {
              onOpenChange(false)
              if (pathname.startsWith("/play")) {
                router.replace("/")
              }
            }}>
              <X color="#737373" size={20}/>
            </div>
          )}

          <AlertDialogDescription className={alertDialogType === "warning" ? "text-center mb-10" : ""}>
            {alertDialogType === "login" && (
              <>Senang melihatmu kembali di Lathi. Yuk, masuk sebentar untuk melanjutkan/memulai Lakonmu.</>
            )}

            {alertDialogType === "register" && (
              <>Selangkah lagi untuk menjadi &quot;Mantu Idaman&quot;. Buat akunmu sekarang agar setiap kata krama yang kamu temukan bisa tersimpan.</>
            )}

            {alertDialogType === "warning" && (
              <>Sepertinya kamu belum terdaftar. Masuk dulu yuk, biar progres ceritamu tidak hilang terbawa angin.</>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* body */}
        {alertDialogType !== "warning" ? (        
          <AuthForm formType={alertDialogType!}/>
        ) : (
          <div className="flex flex-col gap-2">
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                setAlertDialogType("login")
              }}
            >
              Login Sekarang
            </AlertDialogAction>

            <AlertDialogCancel
              className="border-0"
              onClick={(e) => {
                e.preventDefault()
                onOpenChange(false)
                router.replace("/")
              }}
            >
              Nanti Saja
            </AlertDialogCancel>
          </div>
        )}

        {/* footer */}
        <AlertDialogFooter>
          {alertDialogType === "login" && (
            <p className="text-muted-foreground text-sm mx-auto cursor-pointer">
              Belum punya akun?{" "}
              <span className="opacity-100 hover:opacity-55 transition-opacity ease-in-out" onClick={() => setAlertDialogType("register")}>
                Daftar dulu
              </span>
            </p>
          )}

          {alertDialogType === "register" && (
            <p className="text-muted-foreground text-sm mx-auto cursor-pointer">
              Sudah punya akun?{" "}
              <span className="opacity-100 hover:opacity-55 transition-opacity ease-in-out" onClick={() => setAlertDialogType("login")}>
                Masuk
              </span>
            </p>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertDialogIntercept