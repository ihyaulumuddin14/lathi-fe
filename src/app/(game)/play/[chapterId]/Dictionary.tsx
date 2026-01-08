import { Button } from "@/components/ui/button"
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
} from "@/components/ui/drawer"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuRadioGroup,
   DropdownMenuRadioItem,
   DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Slide } from "@/schema/GameSchema"
import { BookSearch, SlidersHorizontal } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

type DictionaryProps = {
   slide: Slide
}

export default function Dictionary({ slide }: DictionaryProps) {
   const [isDictOpen, setIsDictOpen] = useState(false)
   const [sortBy, setSortBy] = useState<"ASC" | "DESC" | string>("NONE")
   const [searchKey, setSearchKey] = useState<string>("")

   return (
      <>
         <div className='flex flex-row-reverse items-center gap-2'>
            <AnimatePresence mode="popLayout">
               <motion.button
                  className={`${isDictOpen ? "bg-primary" : "bg-secondary"} p-2 rounded-full cursor-pointer flex justify-between items-center`}
                  onClick={() => setIsDictOpen(prev => !prev)}
                  key={isDictOpen ? "openDict" : "closeDict"}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                  {isDictOpen ? (
                     <BookSearch size={20} color="#F2EAD3"/>
                  ) : (
                     <BookSearch size={20} color="#3F2305"/>
                  ) }
               </motion.button>
               <p className="text-secondary text-shadow-md text-shadow-primary">Kata Sulit</p>
            </AnimatePresence>
         </div>

         <Drawer open={isDictOpen} onOpenChange={setIsDictOpen} direction='right'>
            <DrawerContent className='bg-secondary py-4'>
               <DrawerHeader>
                  <DrawerTitle className='text-2xl text-primary mb-3'>Bausastra Saku</DrawerTitle>
                  <DrawerDescription className='pb-3'>Temukan arti kata sulit yang Anda temukan pada dialog karakter.</DrawerDescription>

                  {/* option */}
                  <div className="w-full rounded-md bg-primary/10 pb-0 p-3">
                     {/* search input */}
                     <div className="w-full flex items-center gap-2 border-b border-b-muted-foreground/50 pb-5">
                        <Input className="bg-secondary" placeholder="Cari kata sulit.." onChange={(e) => setSearchKey(e.target.value)}/>
                        <Button variant={"default"}>Cari</Button>
                     </div>

                     {/* sorter */}
                     <div className='w-full p-2 flex justify-between items-center text-primary border-b border-b-muted'>
                        <p className='font-bold'>Urutkan</p>
                        <div className='flex gap-2 items-center'>
                           {sortBy === "ASC" ? "Menaik" : "Menurun"}
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild className="hover:bg-secondary p-2 rounded-md active:scale-95 duration-200 ease-in-out cursor-pointer">
                                 <SlidersHorizontal size={35}/>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-30 mr-5">
                              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                                 <DropdownMenuRadioItem value="ASC">Menaik</DropdownMenuRadioItem>
                                 <DropdownMenuRadioItem value="DESC">Menurun</DropdownMenuRadioItem>
                              </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </div>
                     </div>
                  </div>

               </DrawerHeader>

               <main className='h-full overflow-y-auto px-4 flex flex-col gap-2'>
                  {slide?.vocabularies ? (sortBy === "ASC" ? 
                     slide?.vocabularies.sort((a, b) => a.word_krama.localeCompare(b.word_krama)) : 
                     slide?.vocabularies.sort((a, b) => b.word_krama.localeCompare(a.word_krama)))
                        .filter(vocab => {
                           if (searchKey !== "") {
                              if (
                              vocab.word_indo.toLowerCase().includes(searchKey.toLowerCase()) || 
                              vocab.word_krama.toLowerCase().includes(searchKey.toLowerCase()) || 
                              vocab.word_ngoko.toLowerCase().includes(searchKey.toLowerCase())) {
                                 return vocab
                              }
                           } else {
                              return vocab
                           }
                        })
                        .map((vocab, index) => {
                           return (
                              <div key={index} className="grid grid-cols-[25px_1fr] w-full rounded-r-lg overflow-hidden shadow-md bg-secondary">
                                 <div className="w-full bg-primary h-full flex justify-center items-center">
                                    <p className="-rotate-90 origin-center text-secondary">Krama</p>
                                 </div>
                                 <div className="w-full p-3">
                                    <h3 className="text-2xl font-bold pb-2 px-4">{vocab.word_krama}</h3>
                                    <table className="w-full border rounded-md">
                                       <thead className="border">
                                          <tr className="w-full">
                                             <th className="border">Indonesia</th>
                                             <th className="border">Ngoko</th>
                                          </tr>
                                       </thead>
                                       <tbody className="border text-center">
                                          <tr className="w-full">
                                             <td className="border">{vocab.word_indo}</td>
                                             <td className="border">{vocab.word_ngoko}</td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           )
                     }
                  ) : (
                     <div className='w-full my-3 flex justify-center items-center'>Tidak ada kata sulit</div>
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
