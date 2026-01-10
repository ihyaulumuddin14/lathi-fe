'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PaginationWithLinks } from '@/components/ui/pagination-with-links'
import { useDictionary } from '@/hooks/useDictionary'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import ProtectedRoute from '../ProtectedRoute'
import Skeleton from '@/components/Skeleton'

const BausastraSaku = () => {
   const searchParams = useSearchParams()

   const [search, setSearch] = useState(searchParams.get("search") ?? "")
   const page = Number(searchParams.get("page") ?? 1)
   const limit = Number(searchParams.get("limit") ?? 10)
   const [searchKey, setSearchKey] = useState<string>("")
   const { items, pagination } = useDictionary({ search, page, limit })

   useEffect(() => {
      if (searchKey === "") {
         setSearch("")
      }
   }, [searchKey])

   return (
      <ProtectedRoute>
         <section className='w-full min-h-screen'>
            <div className='bg-[url(/bg_hero.webp)] bg-fixed w-full h-64 opacity-20 mask-b-from-97% z-0'/>

            {/* wrapper */}
            <div className='w-full max-w-6xl h-full mx-auto relative py-[clamp(10px,3vw,30px)] px-[5vw] -translate-y-[18vh] rounded-md sm:rounded-xl bg-white'>
               <header className='w-full grid grid-cols-1 md:gap-10 gap-5 mb-5'>
                  <div className='w-full h-full md:w-1/2 text-center md:text-left flex flex-col justify-center gap-4'>
                     <h1 className='text-4xl font-bold'>Bausastra Saku</h1>
                     <h2 className='text-base text-muted-foreground leading-5'>Temukan arti kata sulit yang Anda temukan pada dialog karakter.</h2>
                  </div>

                  {/* search and filter */}
                  <div className='w-full flex justify-between'>
                     <div className='w-fit flex gap-2 items-center'>
                        <div className="relative w-full max-w-[200px]">
                           <Input
                              value={searchKey}
                              onChange={(e) => {
                                 setSearchKey(e.target.value)
                              }}
                              placeholder='pinarak'
                              className=" font-bold w-full"
                           />
                           <X onClick={() => setSearchKey("")} color="#737373" className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-2 hover:opacity-50 transition-all duration-75"/>
                        </div>
                        <Button
                           onClick={() => {
                              if (searchKey) setSearch(searchKey)
                           }}
                           type="submit">
                              Cari
                        </Button>
                     </div>
                  </div>
               </header>

               <main className='w-full py-5 border-t border-t-muted/20'>
                  {/* vocabs wrapper */}
                  <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5'>
                     {items ? (items.map((item, index) => (
                        <div key={index} className={`grid grid-cols-[25px_1fr] w-full rounded-r-lg overflow-hidden shadow-md bg-secondary ${item.is_locked ? "opacity-30 cursor-not-allowed" : "hover:scale-105 duration-200 ease-in-out transition-all"} relative`}>
                           <div className="w-full bg-primary h-full flex justify-center items-center">
                              <p className="-rotate-90 origin-center text-secondary">Krama</p>
                           </div>
                           <div className="w-full p-3">
                              <h3 className="text-2xl font-bold pb-2 px-4">{item.word_krama}</h3>
                              <table className="w-full border rounded-md">
                                 <thead className="border">
                                    <tr className="w-full">
                                       <th className="border">Indonesia</th>
                                       <th className="border">Ngoko</th>
                                    </tr>
                                 </thead>
                                 <tbody className="border text-center">
                                    <tr className="w-full">
                                       <td className="border">{item.word_indo}</td>
                                       <td className="border">{item.word_ngoko}</td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     ))) : (
                        [...Array(5).map((_, index) => (
                           <Skeleton key={index} className='w-full h-[115px]'/>
                        ))]
                     )}
                  </div>

                  <div className='w-full my-5 flex justify-center'>
                     {pagination && (
                        <PaginationWithLinks
                           page={pagination.current_page}
                           limit={pagination.items_per_page}
                           totalCount={pagination.total_items}
                           navigationMode='router'
                        />
                     )}
                  </div>
               </main>
            </div>
            
            <footer className="w-full mt-20 py-5">
               <p className="text-primary tracking-widest text-center">Copyright &copy; 2025 Lathi.</p>
            </footer>
         </section>
      </ProtectedRoute>
   )
}

export default BausastraSaku