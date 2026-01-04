import { ArrowDownUp, ArrowUpDown, ScrollText } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import Image from "next/image"
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
 } from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'
import { Slide } from '@/schema/GameSchema'

type LogProps = {
   slides: Slide[],
   plotSlideId: string[] | []
}

export default function Log({ slides, plotSlideId }: LogProps) {
   const [isLogOpen, setIsLogOpen] = useState(false)
   const [isAscending, setIsAscending] = useState(true)

   const listLogStory = [
      // char content
      {
         speaker_name: "Andi",
         image_url: "/game_char_dummy.webp",
         content: "Sore itu, Budi berniat sowan ke rumah Pak Lurah",
         choice: null
      },
      // full content + choice
      {
         speaker_name: "Andi",
         image_url: "/game_char_dummy.webp",
         content: "Sore itu, Budi berniat sowan ke rumah Pak Lurah",
         choice: "Aku rapopo"
      },
      // naration
      {
         speaker_name: null,
         image_url: null,
         content: "Warung menika namanipun \"Warmindo Andi\". Ingkang gadhah, satunggaling nom-noman ingkang grapyak lan remen guyon.",
         choice: null
      }
   ]

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
            <p className="text-secondary text-shadow-2xs text-shadow-primary">Riwayat</p>
         </div>

         <Drawer open={isLogOpen} onOpenChange={setIsLogOpen} direction='right'>
            <DrawerContent className='bg-secondary py-4'>
               <DrawerHeader>
                  <DrawerTitle className='text-2xl text-primary mb-3'>Riwayat Lakon</DrawerTitle>
                  <DrawerDescription className='pb-3'>Jangan khawatir kehilangan arah dalam cerita. Melalui <strong>Riwayat Lakon</strong>, Anda dapat meninjau kembali setiap percakapan dan narasi yang telah terlewati</DrawerDescription>

                  {/* sorter */}
                  <div className='w-full p-2 flex justify-between text-primary border-b border-b-muted bg-primary/10 rounded-md'>
                     <p className='font-bold'>Urutkan</p>
                     <div className='flex gap-2'>
                        {isAscending ? <span>Terlama ke Terbaru</span> : <span>Terbaru ke Terlama</span>}
                        <AnimatePresence mode='popLayout'>
                           <motion.p
                              key={isAscending ? "asc" : "desc"}
                              className='cursor-pointer'
                              onClick={() => setIsAscending(prev => !prev)}
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              transition={{ duration: 0.1, ease: "easeInOut" }}
                           >
                              {isAscending ? <ArrowDownUp/> : <ArrowUpDown/>}
                           </motion.p>
                        </AnimatePresence>
                     </div>
                  </div>
               </DrawerHeader>

               <main className='h-full overflow-y-auto px-4'>
                  {(isAscending ? listLogStory : listLogStory.reverse()).map((log, index) => {
                     if (log?.speaker_name) {
                        return (
                           <div key={index} className='p-3 border-b border-b-muted w-full h-fit grid grid-cols-[40px_1fr] gap-x-3 relative hover:bg-primary/10'>
                              <Image src={log.image_url} width={50} height={50} alt='char_img' className='w-[40px] aspect-square rounded-full border border-primary object-contain'/>
                              <div className='w-full h-full'>
                                 <h3 className='font-bold text-lg'>{log.speaker_name}</h3>
                                 <p className='leading-5'>{log.content}</p>
                              </div>
                              {log.choice && (
                                 <p className='font-bold col-span-2 text-center py-3'>Pilihan: {log.choice}</p>
                              )}
                           </div>
                        )
                     } else {
                        return (
                           <div key={index} className='p-3 border-b border-b-muted text-center hover:bg-primary/10 italic'>
                              {log.content}
                           </div>
                        )
                     }
                  })}
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
