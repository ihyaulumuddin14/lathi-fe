import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Slider } from "@/components/ui/slider"
import { useSession } from "@/hooks/useSession"
import { startStory } from "@/services/stories.service"
import { useGameInfo } from "@/stores/useGameInfo"
import { useMenu } from "@/stores/useMenu"
import { useTypingAnimation } from "@/stores/useTypingAnimation"
import { animatePageOut } from "@/utils/animation"
import { AxiosError } from "axios"
import { HeadphoneOff, Headphones, LogOut, Menu, MessageSquareWarning, RotateCcw, StepForward, Volume2, VolumeX } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useShallow } from "zustand/shallow"

export default function GameMenuOption() {
   const { isOpenGameMenu, setIsOpenGameMenu } = useMenu(
      useShallow(state => ({
         isOpenGameMenu: state.isOpenGameMenu,
         setIsOpenGameMenu: state.setIsOpenGameMenu
      }))
   )
   const { musicValue, sfxValue, setMusicValue, setSfxValue } = useGameInfo(
      useShallow(state => ({
         musicValue: state.musicValue,
         sfxValue: state.sfxValue,
         setMusicValue: state.setMusicValue,
         setSfxValue: state.setSfxValue
      }))
   )
   const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
   const [isMusicMuted, setIsMusicMuted] = useState(false)
   const [isSfxMuted, setIsSfxMuted] = useState(false)
   const { animationDone, setAnimationDone } = useTypingAnimation()
   const { selectedChapterId } = useGameInfo()
   const { mutateSession } = useSession()
   const router = useRouter()

   useEffect(() => {
      if (isMusicMuted) {
         setMusicValue(0)
      }
   }, [isMusicMuted])
   
   useEffect(() => {
      if (musicValue === 0) {
         setIsMusicMuted(true)
      } else {
         setIsMusicMuted(false)
      }
   }, [musicValue])

   useEffect(() => {
      if (isSfxMuted) {
         setSfxValue(0)
      }
   }, [isSfxMuted])
   
   useEffect(() => {
      if (sfxValue === 0) {
         setIsSfxMuted(true)
      } else {
         setIsSfxMuted(false)
      }
   }, [sfxValue])

   const handleRestartSession = async () => {
      if (!selectedChapterId) return

      try {
         setIsOpenGameMenu(false)

         const response = await startStory(selectedChapterId)

         if (response.success) {
            if (!animationDone) setAnimationDone(true)
            mutateSession()
         } else {
            throw Error()
         }
      } catch (error) {
         if (error instanceof AxiosError) {
            toast.error(error.response?.data?.message || "Terjadi kesalahan pada sistem")
         } else {
            toast.error("Terjadi kesalahan pada sistem")
         }
      }
   }

   return (
      <>
         {/* icon */}
         <AnimatePresence mode="popLayout">
            <motion.button
               className={`${isOpenGameMenu ? "bg-primary border-2 border-secondary" : "bg-secondary"} p-2 rounded-sm cursor-pointer flex justify-between items-center`}
               onClick={() => setIsOpenGameMenu(!isOpenGameMenu)}
               key={isOpenGameMenu ? "openMenu" : "closeMenu"}
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               exit={{ scale: 0 }}
               transition={{ duration: 0.2, ease: "easeInOut" }}
               >
               {isOpenGameMenu ? (
                  <Menu size={32} color="#F2EAD3"/>
               ) : (
                  <Menu size={32} color="#3F2305"/>
               ) }
            </motion.button>
         </AnimatePresence>

         {/* dialog menu */}
         <AlertDialog open={isOpenGameMenu} onOpenChange={setIsOpenGameMenu}>
            <AlertDialogContent>
               <div className="w-full h-full bg-secondary absolute -z-1 mask-b-from-30% mask-b-to-150% rounded-xl sm:rounded-2xl overflow-hidden">
                  <div className="w-full h-full bg-[url(/game_dialog_bg.webp)] bg-cover bg-center absolute opacity-60 mask-t-from-30% mask-t-to-100%"/>
               </div>
               <AlertDialogHeader className="relative">
                  <AlertDialogTitle className="text-center uppercase">
                     Menu
                  </AlertDialogTitle>
               </AlertDialogHeader>

               
               {/* music settings */}
               <div className="w-full h-fit rounded-md flex gap-4 justify-center items-center">
                  <AnimatePresence mode="popLayout">
                     <motion.button
                        className="bg-secondary rounded-full border-2 border-primary cursor-pointer p-2 flex justify-between items-center"
                        onClick={() => setIsMusicMuted(prev => !prev)}
                        key={isMusicMuted ? "mute" : "unmute"}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                        {isMusicMuted ? <HeadphoneOff size={25} color="#3F2305"/> : <Headphones size={25} color="#3F2305"/> }
                     </motion.button>
                  </AnimatePresence>
                  <p className="font-bold text-lg text-primary w-[100px]">Musik</p>
                  <div className="w-full h-full flex justify-start items-center">
                     <Slider
                        value={[musicValue]}
                        onValueChange={(val) => setMusicValue(val[0])}
                        max={1}
                        min={0}
                        step={0.001}
                        className="w-full"
                     />
                  </div>
               </div>

               {/* sfx settings */}
               <div className="w-full h-fit rounded-md flex gap-4 justify-center items-center">
                  <AnimatePresence mode="popLayout">
                     <motion.button
                        className="bg-secondary rounded-full border-2 border-primary cursor-pointer p-2 flex justify-between items-center"
                        onClick={() => setIsSfxMuted(prev => !prev)}
                        key={isSfxMuted ? "mute" : "unmute"}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                        {isSfxMuted ? <VolumeX size={25} color="#3F2305"/> : <Volume2 size={25} color="#3F2305"/> }
                     </motion.button>
                  </AnimatePresence>
                  <p className="font-bold text-lg text-primary w-[100px]">SFX</p>
                  <div className="w-full h-full flex justify-start items-center">
                     <Slider
                        value={[sfxValue]}
                        onValueChange={(val) => setSfxValue(val[0])}
                        max={1}
                        min={0}
                        step={0.001}
                        className="w-full"
                     />
                  </div>
               </div>
               

               {/* body */}
               <div className="w-full h-fit border-t-muted-foreground border-t flex justify-evenly items-center p-7 gap-5">
                  {/* resume */}
                  <div className="h-full aspect-square flex flex-col items-center justify-center relative">
                     <button onClick={() => setIsOpenGameMenu(false)} className="rounded-full p-3 bg-primary border-2 border-secondary flex justify-center items-center hover:scale-105 hover:shadow-md shadow-muted-foreground cursor-pointer active:scale-100 transition-all duration-150 ease-in-out">
                        <StepForward size={30} color="#F2EAD3"/>
                     </button>

                     <p className="font-bold text-lg text-primary absolute -bottom-7">Lanjutkan</p>
                  </div>

                  {/* restart */}
                  <div className="h-full aspect-square flex flex-col items-center justify-center relative">
                     <button onClick={() => setIsConfirmationOpen(true)} className="rounded-full p-3 bg-primary border-2 border-secondary flex justify-center items-center hover:scale-105 hover:shadow-md shadow-muted-foreground cursor-pointer active:scale-100 transition-all duration-150 ease-in-out">
                        <RotateCcw size={30} color="#F2EAD3"/>
                     </button>

                     <p className="font-bold text-lg text-primary absolute -bottom-7">Ulangi</p>
                  </div>

                  {/* exit */}
                  <div className="h-full aspect-square flex flex-col items-center justify-center relative">
                     <button
                        onClick={() => {
                           setIsOpenGameMenu(false)
                           animatePageOut({
                              href: "/play",
                              router,
                              animate: "fade"
                           })
                        }}
                        className="rounded-full p-3 bg-primary border-2 border-secondary flex justify-center items-center hover:scale-105 hover:shadow-md shadow-muted-foreground cursor-pointer active:scale-100 transition-all duration-150 ease-in-out">
                           <LogOut size={30} color="#F2EAD3"/>
                     </button>

                     <p className="font-bold text-lg text-primary absolute -bottom-7">Keluar</p>
                  </div>
               </div>

            </AlertDialogContent>
         </AlertDialog>

         {/* dialog restart confirmation */}
         <AlertDialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
            <AlertDialogContent>
               <AlertDialogHeader className='w-full flex flex-col justify-center items-center'>
                  <MessageSquareWarning size={40} className='my-7'/>
                  <AlertDialogTitle className='text-2xl font-bold'>
                     Hapus Progres dan Ulangi Lakon?
                  </AlertDialogTitle>
                  <AlertDialogDescription className='my-3 text-center'>Perhatian: Memulai bab ini dari awal akan menghapus progres tersimpan Anda. Perjalanan Anda sebelumnya tidak dapat dipulihkan.</AlertDialogDescription>
               </AlertDialogHeader>

               <AlertDialogFooter className='w-full h-fit flex flex-col sm:flex-col'>
                  <AlertDialogAction
                     onClick={handleRestartSession}
                     className='w-full'>
                        Mulai Baru
                  </AlertDialogAction>
                  <AlertDialogCancel
                     className='w-full'>
                        Kembali
                  </AlertDialogCancel>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </>
   )
}
