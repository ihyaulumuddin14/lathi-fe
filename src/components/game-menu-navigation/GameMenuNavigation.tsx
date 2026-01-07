'use client'

import { useSession } from '@/hooks/useSession'
import { usePathname, useRouter } from 'next/navigation'
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { animatePageOut } from '@/utils/animation'
import Loader from '../Loader'
import { useGameInfo } from '@/stores/useGameInfo'
import { toast } from 'sonner'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog'
import { MessageSquareWarning } from 'lucide-react'

const lobyMenuLists = [
  {
    title: "Lanjut Lakon",
    url: "/play",
    iconType: "continue"
  },
  {
    title: "Mulai Lakon Baru",
    url: "/play",
    iconType: "new"
  },
  {
    title: "Pilih Bagian",
    url: "/play/chapters",
    iconType: "chapter"
  },
  {
    title: "Panduan & Aturan",
    url: "/play/rules",
    iconType: "rules"
  },
  {
    title: "Keluar",
    url: "/home",
    iconType: "exit"
  }
]

const MenuIcon = ({ type, color }: { type: "continue" | "new" | "rules" | "chapter" | "exit" | string, color?: string }) => {
  return (
    <>
      {type === "continue" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill={color} d="m14.578 7.149l-7-4.963A1 1 0 0 0 6 3.002v10.001a1.001 1.001 0 0 0 1.585.812l7-5.038a1 1 0 0 0-.006-1.627zM7.5 12.027V3.969l5.64 3.999zm-4-9.277v10.5a.75.75 0 0 1-1.5 0V2.75a.75.75 0 0 1 1.5 0"/></svg>
      )}
      {type === "new" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill={color} d="M7.5 4a.5.5 0 0 1 .5.5V7h2.5a.5.5 0 0 1 0 1H8v2.5a.5.5 0 0 1-1 0V8H4.5a.5.5 0 0 1 0-1H7V4.5a.5.5 0 0 1 .5-.5"/><path fill={color} fillRule="evenodd" d="M0 6.4c0-2.24 0-3.36.436-4.22A4.03 4.03 0 0 1 2.186.43c.856-.436 1.98-.436 4.22-.436h2.2c2.24 0 3.36 0 4.22.436c.753.383 1.36.995 1.75 1.75c.436.856.436 1.98.436 4.22v2.2c0 2.24 0 3.36-.436 4.22a4.03 4.03 0 0 1-1.75 1.75c-.856.436-1.98.436-4.22.436h-2.2c-2.24 0-3.36 0-4.22-.436a4.03 4.03 0 0 1-1.75-1.75C0 11.964 0 10.84 0 8.6zM6.4 1h2.2c1.14 0 1.93 0 2.55.051c.605.05.953.142 1.22.276a3.02 3.02 0 0 1 1.31 1.31c.134.263.226.611.276 1.22c.05.617.051 1.41.051 2.55v2.2c0 1.14 0 1.93-.051 2.55c-.05.605-.142.953-.276 1.22a3 3 0 0 1-1.31 1.31c-.263.134-.611.226-1.22.276c-.617.05-1.41.051-2.55.051H6.4c-1.14 0-1.93 0-2.55-.05c-.605-.05-.953-.143-1.22-.277a3 3 0 0 1-1.31-1.31c-.134-.263-.226-.61-.276-1.22c-.05-.617-.051-1.41-.051-2.55v-2.2c0-1.14 0-1.93.051-2.55c.05-.605.142-.953.276-1.22a3.02 3.02 0 0 1 1.31-1.31c.263-.134.611-.226 1.22-.276C4.467 1.001 5.26 1 6.4 1" clipRule="evenodd"/></svg>
      )}
      {type === "rules" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill={color}><path d="M6 6a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1m1 3a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2zm-1 5a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1"/><path fillRule="evenodd" d="M2 4a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3zm3-1h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1" clipRule="evenodd"/></g></svg>
      )}
      {type === "chapter" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke={color} strokeLinecap="round" strokeWidth="1.5"><path d="m11.777 10l4.83 1.294M11 12.898l2.898.776m6.414-1.027c-.605 2.255-.907 3.383-1.592 4.114a4 4 0 0 1-2.01 1.161q-.145.034-.295.052c-.915.113-2.032-.186-4.064-.73c-2.255-.605-3.383-.907-4.114-1.592a4 4 0 0 1-1.161-2.011c-.228-.976.074-2.103.679-4.358l.517-1.932l.244-.905c.455-1.666.761-2.583 1.348-3.21a4 4 0 0 1 2.01-1.16c.976-.228 2.104.074 4.36.679c2.254.604 3.382.906 4.113 1.59a4 4 0 0 1 1.161 2.012c.161.69.057 1.456-.231 2.643"/><path strokeLinejoin="round" d="M3.272 16.647c.604 2.255.907 3.383 1.592 4.114a4 4 0 0 0 2.01 1.161c.976.227 2.104-.075 4.36-.679c2.254-.604 3.382-.906 4.113-1.591a4 4 0 0 0 1.068-1.678M8.516 6.445q-.527.137-1.165.31c-2.255.604-3.383.906-4.114 1.59a4 4 0 0 0-1.161 2.012c-.161.69-.057 1.456.231 2.643"/></g></svg>
      )}
      {type === "exit" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 12h9m0 0l-3.333-4M22 12l-3.333 4M14 7V5.174a2 2 0 0 0-2.166-1.993l-8 .666A2 2 0 0 0 2 5.84v12.32a2 2 0 0 0 1.834 1.993l8 .667A2 2 0 0 0 14 18.826V17"/></svg>
      )}
    </>
  )
}

const GameMenuNavigation = () => {
   const [isOpen, setIsOpen] = useState(false)
   const [currentMenuIndex, setCurrentMenuIndex] = useState(1)
   const [pressedIndex, setPressedIndex] = useState<number | null>(null)
   const menuWrapperRef = useRef<HTMLUListElement>(null)
   const menuRef = useRef<HTMLButtonElement[]>([])
   const pathname = usePathname()
   const router = useRouter()
   const { sessionData, error, isLoading } = useSession()
   const { selectedChapterId } = useGameInfo()

   const isMenuAvailable = useCallback((index: number) => {
      if (!selectedChapterId) return false
      return sessionData && (!sessionData.is_completed && !sessionData.is_game_over) ? true : index !== 0
   }, [sessionData, selectedChapterId])

   const handleClickMenu = (url: string, index: number) => {
      if (url !== "/play") {
         if (url === "/home") {
            animatePageOut({
               href: url,
               router,
               animate: "fade"
            })
         } else {
            router.push(url)
         }
      } else {
         if (index === 0) {
            if (!sessionData) {
               return
            } else {
               animatePageOut({
                  href: `${url}/${selectedChapterId}?mode=continue`,
                  router,
                  animate: "fade"
               })
            }
         } else if (index === 1) {
            if (sessionData) {
               /*
                  confirmation for restarting chapter,
                  if the user have a session with the chapter
               */ 
               setIsOpen(true)
               return
            } else {
               animatePageOut({
                  href: `${url}/${selectedChapterId}?mode=new`,
                  router,
                  animate: "fade"
               })
            }
         }

      }
   }
   
   const handleSelectedMenu = (e: KeyboardEvent<HTMLUListElement>) => {
      switch(e.key) {
         case "ArrowDown":
            if (currentMenuIndex < lobyMenuLists.length - 1) {
               e.preventDefault()
               setCurrentMenuIndex(currentMenuIndex + 1)
            }
         break;
         case "ArrowUp":
            if (sessionData && !(sessionData.is_completed && sessionData.is_game_over)) {
               if (currentMenuIndex > 0) {
                  e.preventDefault()
                  setCurrentMenuIndex(currentMenuIndex - 1)
               }
            } else {
               if (currentMenuIndex > 1) {
                  e.preventDefault()
                  setCurrentMenuIndex(currentMenuIndex - 1)
               }
            }
         break;
      }
   }
   
   /*
      currentMenuIndex checking,
      filter for the selected chapter with not started yet,
      disable continue lakon button
   */
   useEffect(() => {
      if (!sessionData) return

      const index = 
         (sessionData === null) ? currentMenuIndex :
         (sessionData.is_completed || sessionData.is_game_over) ?
         ((currentMenuIndex === 0) ? 1 : currentMenuIndex) : currentMenuIndex
         
      setCurrentMenuIndex(index)

      menuRef.current[index]?.focus()
   }, [sessionData, currentMenuIndex])

   /*
      focusing button menu on current pathname
   */
   useEffect(() => {
      if (!menuRef.current) return
      
      const index = lobyMenuLists.findIndex(item => item.url === pathname)
      setCurrentMenuIndex(index)
      menuRef.current[index].focus()
   }, [pathname])
   
   if (isLoading) {
      return (
         <div className='w-full h-full flex justify-center items-center'>
            <Loader className='w-[40px] border-4'/>
         </div>
      )
   }

   return (
      <>
         <ul
            onKeyDown={handleSelectedMenu}
            ref={menuWrapperRef}
            className="flex flex-col w-full gap-2 lg:gap-4 items-center relative z-1"
            >
            {lobyMenuLists.map((item, index) => (
            <Button
               key={index}
               onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
                  if (e.key === "Enter") {
                     if (isMenuAvailable(index)) setPressedIndex(index)
                  }
               }}
               onKeyUp={(e: KeyboardEvent<HTMLButtonElement>) => {
                  if (e.key === "Enter") {
                     if (isMenuAvailable(index)) {
                        setPressedIndex(null)
                        handleClickMenu(item.url, index)
                     }
                  }
               }}
               onClick={() => {
                  if (isMenuAvailable(index)) {
                     setCurrentMenuIndex(index)
                     handleClickMenu(item.url, index)
                  }
               }}
               className={`${isMenuAvailable(index) ? "" : "saturate-0 pointer-events-none"} ${index === pressedIndex ? "is-pressed" : ""} ${index === currentMenuIndex && "scale-110"} w-9/10 lg:text-lg lg:h-12 lg:px-6 lg:py-4`}
               variant={index === currentMenuIndex ? "default" : "secondary"}
               ref={(element) => {if (element) menuRef.current[index] = element}}
               tabIndex={index === currentMenuIndex ? 0 : -1}
               >
                  <MenuIcon type={item.iconType} color={index === currentMenuIndex ? "var(--secondary)" : "var(--primary)"}/>
                  {item.title}
            </Button>
            ))}
         </ul>

         <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
                     onClick={() => {
                        animatePageOut({
                           href: `/play/${selectedChapterId}?mode=new`,
                           router,
                           animate: "fade"
                        })
                     }}
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

export default GameMenuNavigation