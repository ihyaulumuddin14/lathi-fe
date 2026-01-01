import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { Menu, X, StepForward, RotateCcw, LogOut } from "lucide-react"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { startStory } from "@/services/stories.service"
import { useGameInfo } from "@/stores/useGameInfo"
import { AxiosError } from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { animatePageOut } from "@/utils/animation"

export default function GameMenuOption() {
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const { selectedChapterId } = useGameInfo()
   const router = useRouter()

   const handleRestartSession = async () => {
      if (!selectedChapterId) return

      try {
         setIsMenuOpen(false)
         toast.loading("Mengulang progres chapter..")

         await startStory(selectedChapterId)
         toast.dismiss()
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
         <AnimatePresence mode="popLayout">
            <motion.button
               className={`${isMenuOpen ? "bg-primary border-2 border-secondary" : "bg-secondary"} p-2 rounded-sm cursor-pointer flex justify-between items-center`}
               onClick={() => setIsMenuOpen(prev => !prev)}
               key={isMenuOpen ? "openMenu" : "closeMenu"}
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               exit={{ scale: 0 }}
               transition={{ duration: 0.2, ease: "easeInOut" }}
               >
               {isMenuOpen ? (
                  <Menu size={32} color="#F2EAD3"/>
               ) : (
                  <Menu size={32} color="#3F2305"/>
               ) }
            </motion.button>
         </AnimatePresence>

         <AlertDialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <AlertDialogContent>
               <div className="w-full h-full bg-secondary absolute -z-1 mask-b-from-30% mask-b-to-150% rounded-xl sm:rounded-2xl overflow-hidden">
                  <div className="w-full h-full bg-[url(/game_dialog_bg.webp)] bg-cover bg-center absolute opacity-60 mask-t-from-30% mask-t-to-100%"/>
               </div>
               <AlertDialogHeader className="relative">
                  <AlertDialogTitle className="text-center uppercase">
                     Menu
                  </AlertDialogTitle>
               </AlertDialogHeader>


               {/* body */}
               <div className="w-full h-fit border-t-muted-foreground border-t flex justify-evenly items-center p-7 gap-5">
                  {/* resume */}
                  <div className="h-full aspect-square flex flex-col items-center justify-center relative">
                     <button onClick={() => setIsMenuOpen(false)} className="rounded-full p-3 bg-primary border-2 border-secondary flex justify-center items-center hover:scale-105 hover:shadow-md shadow-muted-foreground cursor-pointer active:scale-100 transition-all duration-150 ease-in-out">
                        <StepForward size={30} color="#F2EAD3"/>
                     </button>

                     <p className="font-bold text-lg text-primary absolute -bottom-7">Lanjutkan</p>
                  </div>

                  {/* restart */}
                  <div className="h-full aspect-square flex flex-col items-center justify-center relative">
                     <button onClick={handleRestartSession} className="rounded-full p-3 bg-primary border-2 border-secondary flex justify-center items-center hover:scale-105 hover:shadow-md shadow-muted-foreground cursor-pointer active:scale-100 transition-all duration-150 ease-in-out">
                        <RotateCcw size={30} color="#F2EAD3"/>
                     </button>

                     <p className="font-bold text-lg text-primary absolute -bottom-7">Ulangi</p>
                  </div>

                  {/* exit */}
                  <div className="h-full aspect-square flex flex-col items-center justify-center relative">
                     <button
                        onClick={() => {
                           setIsMenuOpen(false)
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
      </>
   )
}
