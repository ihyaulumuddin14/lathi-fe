import { Button } from '@/components/ui/button'
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
} from "@/components/ui/drawer"
import { useSession } from '@/hooks/useSession'
import { ScrollText } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

export default function Log() {
   const [isLogOpen, setIsLogOpen] = useState(false)
   const { sessionData } = useSession()

   return (
      <>
         <div className='flex flex-row-reverse items-center gap-2'>
            <AnimatePresence mode="popLayout">
               <motion.button
                  className={`${isLogOpen ? "bg-primary" : "bg-secondary"} p-2 rounded-full cursor-pointer flex justify-between items-center`}
                  onClick={() => setIsLogOpen(prev => !prev)}
                  key={isLogOpen ? "openMenu" : "closeMenu"}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                  {isLogOpen ? (
                     <ScrollText size={20} color="#F2EAD3"/>
                  ) : (
                     <ScrollText size={20} color="#3F2305"/>
                  ) }
               </motion.button>
            </AnimatePresence>
            <p className="text-secondary text-shadow-md text-shadow-primary ">Riwayat</p>
         </div>

         <Drawer open={isLogOpen} onOpenChange={setIsLogOpen} direction='right'>
            <DrawerContent className='bg-secondary py-4 h-dvh' onWheel={(e) => e.stopPropagation()}>
               <DrawerHeader>
                  <DrawerTitle className='text-2xl text-primary mb-3'>Riwayat Lakon</DrawerTitle>
                  <DrawerDescription className='pb-3'>Jangan khawatir kehilangan arah dalam cerita. Melalui <strong>Riwayat Lakon</strong>, Anda dapat meninjau kembali setiap percakapan dan narasi yang telah terlewati</DrawerDescription>
               </DrawerHeader>

               <main className='h-full overflow-y-auto px-4 z-1 relative no-scrollbar'>
                   {sessionData && (sessionData.history_log.length > 0 ?
                      ((sessionData.history_log)
                        .map((log, index) => {
                           const content = log.text.split(" ").map((word, index) => {
                              const clean = word.replace(/[{}]/g, "")
                              const isVocab = word.includes("{") && word.includes("}")

                              if (isVocab) {
                                 return <span key={index}><strong>{clean} </strong></span>
                              } else {
                                 return <span key={index}>{clean} </span>
                              }
                           })

                           if (log.speaker.toLowerCase() === "narator") {
                              return (
                                 <div key={index} className='p-3 border-b border-b-muted text-center hover:bg-primary/10 italic'>
                                    {content}
                                    <span className='inline-block w-full text-right'>
                                       {new Date(log.timestamp).toLocaleTimeString("id-ID", {
                                          hour: "2-digit",
                                          minute: "2-digit"
                                       })}
                                    </span>
                                 </div>
                              )
                           } else if (log.speaker.toLowerCase() === "andi") {
                              return (
                                 <div key={index} className='p-3 border-b border-b-muted w-full h-fit gap-x-3 relative hover:bg-primary/10'>
                                    {log.is_user && <span className='font-bold inline-block w-full text-center'>Jawaban Pilihan: </span>}

                                    <h3 className='font-bold text-lg text-left'>
                                       {log.speaker}{" "}
                                    </h3>
                                    <p className='leading-5 text-left max-w-[90%]'>{content}</p>

                                    <span className='inline-block w-full text-right'>
                                       {new Date(log.timestamp).toLocaleTimeString("id-ID", {
                                          hour: "2-digit",
                                          minute: "2-digit"
                                       })}
                                    </span>
                                 </div>
                              )
                           } else {
                              return (
                                 <div key={index} className='p-3 border-b border-b-muted w-full h-fit flex flex-col items-end gap-x-3 relative hover:bg-primary/10'>
                                    <h3 className='font-bold text-lg'>{log.speaker}</h3>
                                    <p className='leading-5 max-w-[90%]'>{content}</p>

                                    <span className='inline-block w-full text-right'>
                                       {new Date(log.timestamp).toLocaleTimeString("id-ID", {
                                          hour: "2-digit",
                                          minute: "2-digit"
                                       })}
                                    </span>
                                 </div>
                              )
                           }
                        })
                      ) : (
                        <div className='w-full my-3 flex justify-center items-center'>Tidak ada riwayat</div>
                      )
                   )}
               </main>

               <DrawerFooter>
                  <DrawerClose>
                     <Button variant="outline" className='w-full'>Tutup</Button>
                  </DrawerClose>
               </DrawerFooter>
            </DrawerContent>
         </Drawer>
      </>
   )
}
