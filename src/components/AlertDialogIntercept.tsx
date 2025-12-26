'use client'

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
import { Send, X } from "lucide-react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useShallow } from "zustand/shallow"
import LoginForm from "./auth/LoginForm"
import RegisterForm from "./auth/RegisterForm"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

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
  const [countRedirect, setCountRedirect] = useState(30)

  useEffect(() => {
    if (alertDialogType !== "email-sent") return

    setCountRedirect(30)
    
    const interval = setInterval(() => {
      setCountRedirect(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          onOpenChange(false)
          router.replace("/")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [alertDialogType, onOpenChange, router])
  
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
            {alertDialogType === "email-sent" && (
              <div className="w-full flex flex-col gap-5 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="7em" height="7em" viewBox="0 0 24 24"><mask id="SVGWqb65B7o"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1"><path stroke-dasharray="64" stroke-dashoffset="64" d="M4 5h16c0.55 0 1 0.45 1 1v12c0 0.55 -0.45 1 -1 1h-16c-0.55 0 -1 -0.45 -1 -1v-12c0 -0.55 0.45 -1 1 -1Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.08s" values="64;0"/></path><path stroke-dasharray="24" stroke-dashoffset="24" d="M3 6.5l9 5.5l9 -5.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.08s" dur="0.36s" values="24;0"/></path><path fill="#fff" fill-opacity="0" stroke="none" d="M12 11l-8 -5h16l-8 5Z"><animate fill="freeze" attributeName="fill-opacity" begin="1.8s" dur="0.27s" values="0;0.5"/></path><path fill="#000" fill-opacity="0" stroke="none" d="M19 13c3.31 0 6 2.69 6 6c0 3.31 -2.69 6 -6 6c-3.31 0 -6 -2.69 -6 -6c0 -3.31 2.69 -6 6 -6Z"><set fill="freeze" attributeName="fill-opacity" begin="1.44s" to="1"/></path><path stroke-dasharray="10" stroke-dashoffset="10" d="M16 19l1.75 1.75l3.75 -3.75"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.44s" dur="0.36s" values="10;0"/></path></g></mask><rect width="24" height="24" fill="#3F2305" mask="url(#SVGWqb65B7o)"/></svg>
                <h1>
                  Tautan verifikasi telah terkirim
                </h1>
              </div>
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

          <AlertDialogDescription className={alertDialogType === "warning" ? "text-center mb-10" : "mb-5"}>
            {alertDialogType === "login" && (
              <>Senang melihatmu kembali di Lathi. Yuk, masuk sebentar untuk melanjutkan/memulai Lakonmu.</>
            )}

            {alertDialogType === "register" && (
              <>Selangkah lagi untuk menjadi &quot;Mantu Idaman&quot;. Buat akunmu sekarang agar setiap kata krama yang kamu temukan bisa tersimpan.</>
            )}

            {alertDialogType === "warning" && (
              <>Sepertinya kamu belum terdaftar. Masuk dulu yuk, biar progres ceritamu tidak hilang terbawa angin.</>
            )}

            {alertDialogType === "email-sent" && (
              <>Akun kamu berhasil terdaftar, silakan cek email kamu untuk dapat melakukan verifikasi akun. Kamu akan diarahkan kembali ke Beranda secara otomatis dalam ({countRedirect}) detik.</>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* body */}
        {alertDialogType === "warning" && (
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
        {alertDialogType === "login" && <LoginForm />}
        {alertDialogType === "register" && <RegisterForm />}

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
          {alertDialogType === "email-sent" && (
            <Button variant={"outline"} className="w-full" onClick={() => onOpenChange(false)}>Tutup</Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertDialogIntercept